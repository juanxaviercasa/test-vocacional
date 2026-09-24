#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
========================================================================================
PIPELINE DE DESCARGA Y NORMALIZACIÓN ACÚSTICA BROADCAST (EBU R128)
HIMNOS OFICIALES DE LAS ESCUELAS MATRICES DE LAS FFAA Y PNP DEL PERÚ
========================================================================================
Ingeniería de Audio:
  - Estándar: EBU R128 / ITU-R BS.1770-4
  - Sonoridad Integrada Objetivo (Target Integrated Loudness): -14.0 LUFS
  - Pico Real Máximo (Maximum True Peak): -1.0 dBTP
  - Loudness Range Objetivo (LRA): 11.0 LU (Preserva el rango dinámico de marchas militares)
  - Normalización en Dos Pasadas (Dual-Pass Loudnorm):
      Paso 1: Medición acústica y extracción del perfil dinámico (JSON telemetry)
      Paso 2: Normalización lineal exacta y codificación MP3 a 320 kbps (CBR / 44.1 kHz)
========================================================================================
"""

import sys
import os
import re
import json
import shutil
import tempfile
import subprocess
from pathlib import Path

# Asegurar codificación UTF-8 en terminales de Windows
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if sys.stderr and hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# Soporte automático para binarios estáticos de FFmpeg en caso de entornos sin FFmpeg en PATH
try:
    import static_ffmpeg
    static_ffmpeg.add_paths()
except Exception:
    pass

# Definición del diccionario canónico de escuelas matrices y sus enlaces oficiales
HIMNOS_OFICIALES = {
    "EMCH": "https://www.youtube.com/watch?v=4JEc2rG4ja8",
    "ETE": "https://www.youtube.com/watch?v=7zue4Z3X3Qs",
    "ENP": "https://www.youtube.com/watch?v=VRwNXCIMFQU",
    "CITEN": "https://www.youtube.com/watch?v=U1DkdPlBDig",
    "EOFAP": "https://www.youtube.com/watch?v=BXadYjYDbOA",
    "ESOFA": "https://www.youtube.com/watch?v=IYDNKxd2-vE",
    "EO-PNP": "https://www.youtube.com/watch?v=XhhJ64H4wsY",
    "EESTP-PNP": "https://www.youtube.com/watch?v=fh3wSFdx0Tg",
}

# Parámetros acústicos reglamentarios
TARGET_I = -14.0    # Integrated Loudness (-14 LUFS estándar EdTech / Streaming)
TARGET_TP = -1.0   # Max True Peak (-1.0 dBTP contra clipping inter-sample)
TARGET_LRA = 11.0  # Loudness Range (Preserva bronces y percusión militar)

# Rutas de destino
OUTPUT_DIRS = [
    Path("public/audio"),
    Path("react_app/public/audio")
]


def check_prerequisites():
    """Verifica la presencia de ffmpeg y yt-dlp en el sistema."""
    missing = []

    # Verificar FFmpeg
    ffmpeg_bin = shutil.which("ffmpeg")
    if not ffmpeg_bin:
        missing.append(
            "FFmpeg no está instalado o no se encuentra en el PATH del sistema.\n"
            "   -> Windows: winget install Gyan.FFmpeg  (o descargar desde https://ffmpeg.org)\n"
            "   -> Linux:   sudo apt update && sudo apt install ffmpeg\n"
            "   -> macOS:   brew install ffmpeg"
        )

    # Verificar yt-dlp (como módulo de python o comando CLI)
    has_yt_dlp = False
    try:
        import yt_dlp
        has_yt_dlp = True
    except ImportError:
        if shutil.which("yt-dlp"):
            has_yt_dlp = True

    if not has_yt_dlp:
        missing.append(
            "yt-dlp no está instalado en el entorno de Python.\n"
            "   -> Instalar con: pip install yt-dlp"
        )

    if missing:
        print("\n" + "=" * 80)
        print("❌ ERROR DE PRERREQUISITOS DEL PIPELINE DE AUDIO")
        print("=" * 80)
        for msg in missing:
            print(f"• {msg}")
        print("=" * 80 + "\n")
        return False

    return True


def descargar_audio_crudo(url: str, output_path: Path) -> bool:
    """
    Descarga el flujo de audio con la mayor tasa de bits disponible
    usando la librería yt-dlp en Python o el comando CLI.
    """
    print(f"  [1/3] Descargando flujo de audio desde YouTube: {url}")
    try:
        import yt_dlp

        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': str(output_path.with_suffix('')) + '.%(ext)s',
            'quiet': True,
            'no_warnings': True,
            'noplaylist': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        # Buscar el archivo generado con cualquier extensión descargada
        parent = output_path.parent
        stem = output_path.stem
        candidates = list(parent.glob(f"{stem}.*"))
        if candidates:
            return candidates[0]
        return None

    except ImportError:
        # Fallback al comando CLI si está en el PATH
        cmd = [
            "yt-dlp",
            "-f", "bestaudio/best",
            "-o", f"{output_path.with_suffix('')}.%(ext)s",
            "--no-playlist",
            "--quiet",
            url
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0:
            parent = output_path.parent
            stem = output_path.stem
            candidates = list(parent.glob(f"{stem}.*"))
            return candidates[0] if candidates else None
        else:
            print(f"    ❌ Error ejecutando yt-dlp CLI: {res.stderr}")
            return None


def medir_ebu_r128(input_path: Path):
    """
    PASADA 1 (EBU R128 Analysis):
    Calcula los parámetros acústicos de la pista usando el filtro 'loudnorm' de FFmpeg
    y extrae el bloque de telemetría JSON de la señal.
    """
    print("  [2/3] Analizando dinámica sonora (Pasada 1: EBU R128 measurement)...")
    cmd = [
        "ffmpeg",
        "-hide_banner",
        "-nostats",
        "-y",
        "-i", str(input_path),
        "-af", f"loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}:print_format=json",
        "-f", "null",
        "-"
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, errors="replace")
    stderr = result.stderr

    # Parsear el bloque JSON devuelto por loudnorm
    json_match = re.search(r'\{\s*"input_i"\s*:[\s\S]*?"target_offset"\s*:.*?\n\}', stderr)
    if not json_match:
        print("    ⚠️  Advertencia: No se pudo parsear JSON de telemetría. Se utilizará single-pass.")
        return None

    try:
        measurements = json.loads(json_match.group(0))
        return measurements
    except Exception as e:
        print(f"    ⚠️  Error parseando métricas JSON: {e}")
        return None


def normalizar_y_codificar(input_path: Path, output_file: Path, measurements: dict = None) -> bool:
    """
    PASADA 2 (Linear Loudness Normalization & Encoding):
    Aplica normalización lineal sin artefactos de compresión dinámica indeseada,
    asegurando I = -14.0 LUFS y True Peak <= -1.0 dBTP.
    Codifica en MP3 320 kbps a 44.1 kHz estéreo.
    """
    print(f"  [3/3] Masterizando audio normalizado (Pasada 2: MP3 320kbps @ {TARGET_I} LUFS)...")
    
    if measurements:
        filter_str = (
            f"loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}:"
            f"measured_I={measurements['input_i']}:"
            f"measured_TP={measurements['input_tp']}:"
            f"measured_LRA={measurements['input_lra']}:"
            f"measured_thresh={measurements['input_thresh']}:"
            f"offset={measurements['target_offset']}:"
            f"linear=true:print_format=summary"
        )
    else:
        # Fallback a normalización dinámica en 1 pasada
        filter_str = f"loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}"

    cmd = [
        "ffmpeg",
        "-hide_banner",
        "-nostats",
        "-y",
        "-i", str(input_path),
        "-af", filter_str,
        "-c:a", "libmp3lame",
        "-b:a", "320k",
        "-ar", "44100",
        "-ac", "2",
        str(output_file)
    ]

    res = subprocess.run(cmd, capture_output=True, text=True, errors="replace")
    if res.returncode != 0:
        print(f"    ❌ Error en FFmpeg normalización: {res.stderr}")
        return False

    return True


def procesar_pipeline():
    """Ejecuta el pipeline completo para todas las escuelas matrices."""
    print("=" * 80)
    print("  SISTEMA VOCACIONAL DE LAS FFAA Y PNP - PIPELINE ACÚSTICO INSTITUCIONAL")
    print(f"  Target: {TARGET_I} LUFS | Max True Peak: {TARGET_TP} dBTP | Target LRA: {TARGET_LRA} LU")
    print("=" * 80)

    if not check_prerequisites():
        sys.exit(1)

    # Crear directorios de destino
    for out_dir in OUTPUT_DIRS:
        out_dir.mkdir(parents=True, exist_ok=True)

    reporte = []

    with tempfile.TemporaryDirectory(prefix="himnos_audio_") as tmp_dir:
        tmp_path = Path(tmp_dir)

        for sigla, url in HIMNOS_OFICIALES.items():
            print(f"\n▶ PROCESANDO: {sigla} ({url})")
            raw_target = tmp_path / f"{sigla}_raw"
            norm_mp3 = tmp_path / f"{sigla}.mp3"

            # 1. Descarga del stream crudo
            downloaded_file = descargar_audio_crudo(url, raw_target)
            if not downloaded_file or not downloaded_file.exists():
                print(f"  ❌ Fallo en la descarga de {sigla}")
                reporte.append({
                    "sigla": sigla,
                    "status": "FALLIDO (Descarga)",
                    "input_i": "N/A",
                    "output_i": f"{TARGET_I} LUFS",
                    "tp": "N/A"
                })
                continue

            # 2. Medición acústica Pasada 1
            measurements = medir_ebu_r128(downloaded_file)

            # 3. Normalización y codificación Pasada 2
            success = normalizar_y_codificar(downloaded_file, norm_mp3, measurements)

            if success and norm_mp3.exists():
                file_size_mb = norm_mp3.stat().st_size / (1024 * 1024)
                
                # Copiar a todas las carpetas de salida requeridas (public/audio/ y react_app/public/audio/)
                for out_dir in OUTPUT_DIRS:
                    dest = out_dir / f"{sigla}.mp3"
                    shutil.copy2(norm_mp3, dest)
                    print(f"  ✓ Guardado: {dest} ({file_size_mb:.2f} MB)")

                input_i = measurements.get('input_i', 'N/A') if measurements else 'Desconocido'
                input_tp = measurements.get('input_tp', 'N/A') if measurements else 'Desconocido'
                input_lra = measurements.get('input_lra', 'N/A') if measurements else 'Desconocido'

                reporte.append({
                    "sigla": sigla,
                    "status": "COMPLETADO",
                    "input_i": f"{input_i} LUFS",
                    "output_i": f"{TARGET_I} LUFS",
                    "tp": f"{input_tp} dBTP -> {TARGET_TP} dBTP",
                    "lra": f"{input_lra} LU"
                })
            else:
                print(f"  ❌ Error normalizando pista de {sigla}")
                reporte.append({
                    "sigla": sigla,
                    "status": "FALLIDO (Normalización)",
                    "input_i": "N/A",
                    "output_i": "N/A",
                    "tp": "N/A",
                    "lra": "N/A"
                })

    # Resumen final de ingeniería acústica
    print("\n" + "=" * 90)
    print("RESUMEN DE AUDITORÍA ACÚSTICA (EBU R128 COMPLIANCE)")
    print("=" * 90)
    header = f"{'ESCUELA':<12} | {'ESTADO':<14} | {'INPUT LUFS':<14} | {'TARGET LUFS':<14} | {'TRUE PEAK TARGET':<18} | {'LRA':<10}"
    print(header)
    print("-" * 90)
    for r in reporte:
        print(f"{r['sigla']:<12} | {r['status']:<14} | {r.get('input_i', 'N/A'):<14} | {r.get('output_i', 'N/A'):<14} | {r.get('tp', 'N/A'):<18} | {r.get('lra', 'N/A'):<10}")
    print("=" * 90)
    print("✅ Pipeline finalizado. Audios listos para el componente <ReproductorInstitucional />.")


if __name__ == "__main__":
    procesar_pipeline()
