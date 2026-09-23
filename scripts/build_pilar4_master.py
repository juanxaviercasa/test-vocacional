#!/usr/bin/env python3
"""
Ensamblador maestro para el Pilar 4: Aptitud y Conocimientos
Genera el archivo definitivo 'conocimientos_psicotecnico.json'
con 150 preguntas rigurosamente validadas.
"""

import json
import os
import sys

from build_pilar4_part1 import get_psicotecnico_questions
from build_pilar4_part2 import get_ciencias_exactas_questions
from build_pilar4_part3 import get_ciencias_naturales_questions
from build_pilar4_part4 import get_letras_humanidades_questions

def assemble_pilar4():
    print("Iniciando compilación de preguntas de Pilar 4...")

    p1 = get_psicotecnico_questions()
    p2 = get_ciencias_exactas_questions()
    p3 = get_ciencias_naturales_questions()
    p4 = get_letras_humanidades_questions()

    print(f"  - Psicotécnico y Aptitud Académica: {len(p1)} preguntas")
    print(f"  - Ciencias Exactas: {len(p2)} preguntas")
    print(f"  - Ciencias Naturales: {len(p3)} preguntas")
    print(f"  - Letras y Humanidades: {len(p4)} preguntas")

    total_questions = p1 + p2 + p3 + p4
    print(f"Total acumulado: {len(total_questions)} preguntas")

    assert len(total_questions) == 150, f"Error: Se esperaban 150 preguntas, se encontraron {len(total_questions)}"

    # Validaciones rigurosas
    seen_ids = set()
    valid_schools = {"EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"}
    
    for idx, q in enumerate(total_questions):
        # 1. ID único
        q_id = q.get("id_pregunta")
        assert q_id and q_id not in seen_ids, f"ID duplicado o nulo: {q_id} en índice {idx}"
        seen_ids.add(q_id)

        # 2. Campos requeridos
        for field in ["id_pregunta", "area_academica", "tema_especifico", "enunciado", "opciones", "nivel_dificultad", "escuelas_relacionadas"]:
            assert field in q, f"Falta el campo '{field}' en la pregunta {q_id}"

        # 3. Opciones
        opts = q["opciones"]
        assert len(opts) == 4, f"La pregunta {q_id} debe tener exactamente 4 opciones"
        opt_ids = [o["id_opcion"] for o in opts]
        assert opt_ids == ["A", "B", "C", "D"], f"Opciones inválidas en {q_id}: {opt_ids}"
        
        correct_count = sum(1 for o in opts if o.get("es_correcta") is True)
        assert correct_count == 1, f"La pregunta {q_id} tiene {correct_count} opciones correctas (debe ser exactamente 1)"

        # 4. Nivel de dificultad
        dif = q["nivel_dificultad"]
        assert isinstance(dif, int) and 1 <= dif <= 5, f"Dificultad inválida en {q_id}: {dif}"

        # 5. Escuelas relacionadas
        esc = q["escuelas_relacionadas"]
        assert isinstance(esc, list) and len(esc) > 0, f"Lista de escuelas vacía en {q_id}"
        for e in esc:
            assert e in valid_schools, f"Escuela no reconocida '{e}' en {q_id}"

    print("Todas las 150 preguntas pasaron las validaciones de esquema e integridad al 100%.")

    database = {
        "banco_preguntas_conocimientos": total_questions
    }

    target_path = r"C:\Users\cabel\Music\test_vocacional\conocimientos_psicotecnico.json"
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(database, f, ensure_ascii=False, indent=2)

    file_size = os.path.getsize(target_path)
    print(f"Archivo generado exitosamente en: {target_path}")
    print(f"Tamaño del archivo: {file_size:,} bytes")

if __name__ == "__main__":
    assemble_pilar4()
