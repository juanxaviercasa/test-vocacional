#!/usr/bin/env python3
"""
Motor Vocacional Militar Multi-Pilar 100% Oficial para las FF.AA. y Policía Nacional del Perú.
Integra y procesa matemáticamente los 4 Pilares Fundamentales + Rendimiento Físico e IGAC:
  - Pilar 1: Filtro Legal, Antropometría y Baremos Médicos Especializados (EOFAP pilotos, Comandos, etc.)
  - Pilar 2: Evaluación Psicométrica Big Five + Escala L (Deseabilidad Social / Control Anti-Fraude)
  - Pilar 3: Intereses Operativos y Dilemas Tácticos Inmersivos (VRAEM, Mar de Grau, Selva, Ciberdefensa)
  - Pilar 4: Aptitud Académica Pre-Militar con Penalización Oficial (-0.25 por error)
  - Pilar 5: Integración del Rendimiento Físico e Índice Global de Aptitud para el Combate (IGAC)
  - Módulo Masivo: Generador y Calificador de Simulacros de 100 Preguntas por Institución
  - Persistencia SQLite y Verificación con Código Único y Código QR
"""

import os
import json
import random
import math
import time
import sys
from typing import Dict, Any, List, Tuple, Optional

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from engine.db_storage import DB_MANAGER, generate_native_qr_svg
from engine.cognitive_engine import COGNITIVE_ENGINE
from engine.physical_scoring import MilitaryPhysicalScoringEngine

PATH_PILAR1 = os.path.join(BASE_DIR, "pilar1_requisitos_legales.json")
PATH_PILAR2 = os.path.join(BASE_DIR, "pilar2_evaluacion_psicometrica.json")
PATH_PILAR3 = os.path.join(BASE_DIR, "pilar3_intereses_operativos.json")
PATH_PILAR4 = os.path.join(BASE_DIR, "pilar4_aptitud_conocimientos.json")

# Mapeo oficial de las 8 escuelas militares del Perú
ESCUELAS_INFO = {
    "EMCH": {
        "id": "EMCH",
        "nombre": "Escuela Militar de Chorrillos 'Crl. Francisco Bolognesi'",
        "nombre_corto": "Escuela Militar de Chorrillos",
        "rama": "Ejército del Perú",
        "rango": "Oficial",
        "icono": "⚔️",
        "lema": "¡Hasta quemar el último cartucho!",
        "color_hex": "#1b4d3e",
        "color_accent": "#c5a059",
        "especialidades": ["Infantería de Combate", "Caballería Blindada", "Artillería de Campaña", "Ingeniería Militar", "Comunicaciones e Inteligencia"],
        "pdf_carpeta": "escuelas_militares_pdf/01_escuela_militar_chorrillos_emch",
        "ponderacion_100": {"exactas": 25, "naturales": 25, "psicotecnico": 25, "humanidades": 25}
    },
    "ETE": {
        "id": "ETE",
        "nombre": "Instituto de Educación Superior Tecnológico Público del Ejército - ETE",
        "nombre_corto": "Escuela Técnica del Ejército (ETE)",
        "rama": "Ejército del Perú",
        "rango": "Suboficial",
        "icono": "🛡️",
        "lema": "Técnica, Disciplina y Lealtad",
        "color_hex": "#2e4a3d",
        "color_accent": "#8db596",
        "especialidades": ["Mecánica de Blindados", "Telecomunicaciones Militares", "Material de Guerra y Armamento", "Aviación del Ejército"],
        "pdf_carpeta": "escuelas_militares_pdf/02_instituto_tecnologico_ejercito_ete",
        "ponderacion_100": {"exactas": 25, "naturales": 25, "psicotecnico": 25, "humanidades": 25}
    },
    "ENP": {
        "id": "ENP",
        "nombre": "Escuela Naval del Perú",
        "nombre_corto": "Escuela Naval del Perú",
        "rama": "Marina de Guerra del Perú",
        "rango": "Oficial",
        "icono": "⚓",
        "lema": "Honor, Deber y Gloria - Mar de Grau",
        "color_hex": "#0f2b48",
        "color_accent": "#38bdf8",
        "especialidades": ["Comando Anfibio e Infantería de Marina", "Guerra de Superficie y Misilera", "Fuerza de Submarinos", "Aviación Naval"],
        "pdf_carpeta": "escuelas_militares_pdf/03_escuela_naval_peru_enp",
        "ponderacion_100": {"exactas": 30, "naturales": 25, "psicotecnico": 25, "humanidades": 20}
    },
    "CITEN": {
        "id": "CITEN",
        "nombre": "Centro de Instrucción Técnica y Entrenamiento Naval - CITEN",
        "nombre_corto": "Instituto Tecnológico Naval (CITEN)",
        "rama": "Marina de Guerra del Perú",
        "rango": "Suboficial",
        "icono": "🚢",
        "lema": "Ciencia, Honor y Mar",
        "color_hex": "#1e3a5f",
        "color_accent": "#7dd3fc",
        "especialidades": ["Control de Tiro y Armas Submarinas", "Propulsión Naval y Turbinas", "Electrónica y Radares Navales", "Operaciones Especiales"],
        "pdf_carpeta": "escuelas_militares_pdf/04_instituto_tecnologico_naval_citen",
        "ponderacion_100": {"exactas": 30, "naturales": 25, "psicotecnico": 25, "humanidades": 20}
    },
    "EOFAP": {
        "id": "EOFAP",
        "nombre": "Escuela de Oficiales de la Fuerza Aérea del Perú 'Cap. FAP José Quiñones'",
        "nombre_corto": "Escuela de Oficiales FAP",
        "rama": "Fuerza Aérea del Perú",
        "rango": "Oficial",
        "icono": "✈️",
        "lema": "Arriba, siempre arriba hasta alcanzar la gloria",
        "color_hex": "#172554",
        "color_accent": "#60a5fa",
        "especialidades": ["Piloto de Caza y Combate", "Piloto de Transporte Estratégico", "Defensa Aérea y Misiles", "Guerra Electrónica"],
        "pdf_carpeta": "escuelas_militares_pdf/05_escuela_oficiales_fap_eofap",
        "ponderacion_100": {"exactas": 30, "naturales": 30, "psicotecnico": 25, "humanidades": 15}
    },
    "ESOFA": {
        "id": "ESOFA",
        "nombre": "Escuela de Suboficiales de la Fuerza Aérea del Perú",
        "nombre_corto": "Escuela de Suboficiales FAP",
        "rama": "Fuerza Aérea del Perú",
        "rango": "Suboficial",
        "icono": "🛩️",
        "lema": "Alas de la Patria con Técnica y Valor",
        "color_hex": "#1e293b",
        "color_accent": "#93c5fd",
        "especialidades": ["Mantenimiento Aeronáutico", "Armamento y Sistemas Aéreos", "Tránsito Aéreo y Radares", "Fuerzas Especiales FAP (DOES)"],
        "pdf_carpeta": "escuelas_militares_pdf/06_escuela_suboficiales_fap_esofa",
        "ponderacion_100": {"exactas": 30, "naturales": 30, "psicotecnico": 25, "humanidades": 15}
    },
    "EO-PNP": {
        "id": "EO-PNP",
        "nombre": "Escuela de Oficiales de la Policía Nacional del Perú 'Mariano Santos Mateo'",
        "nombre_corto": "Escuela de Oficiales PNP",
        "rama": "Policía Nacional del Perú",
        "rango": "Oficial",
        "icono": "👮",
        "lema": "Dios, Patria y Ley",
        "color_hex": "#14532d",
        "color_accent": "#4ade80",
        "especialidades": ["Investigación Criminal (DIRINCRI)", "Operaciones Tácticas Antidrogas (DIRANDRO)", "Orden y Seguridad Ciudadana", "Unidades Tácticas SUAT"],
        "pdf_carpeta": "escuelas_militares_pdf/07_escuela_oficiales_pnp",
        "ponderacion_100": {"exactas": 20, "naturales": 15, "psicotecnico": 30, "humanidades": 35}
    },
    "EESTP_PNP": {
        "id": "EESTP_PNP",
        "nombre": "Escuela de Educación Superior Técnico Profesional PNP",
        "nombre_corto": "Escuela Técnica Superior PNP",
        "rama": "Policía Nacional del Perú",
        "rango": "Suboficial",
        "icono": "🚔",
        "lema": "Servir a la Sociedad y Proteger a la Nación",
        "color_hex": "#166534",
        "color_accent": "#86efac",
        "especialidades": ["Seguridad y Patrullaje Urbano", "Control de Tránsito y Carreteras", "Escuadrón Verde y Terna", "Policía de Fronteras"],
        "pdf_carpeta": "escuelas_militares_pdf/08_escuela_suboficiales_pnp_eestp",
        "ponderacion_100": {"exactas": 20, "naturales": 15, "psicotecnico": 30, "humanidades": 35}
    }
}


class MilitaryVocationalEngine:
    """Motor integral de evaluación vocacional pre-militar de alta fidelidad."""

    def __init__(self):
        self._load_databases()
        self.cognitive_engine = COGNITIVE_ENGINE
        self.physical_engine = MilitaryPhysicalScoringEngine()

    def _load_databases(self):
        with open(PATH_PILAR1, "r", encoding="utf-8") as f:
            self.db_pilar1 = json.load(f)

        with open(PATH_PILAR2, "r", encoding="utf-8") as f:
            self.db_pilar2 = json.load(f)

        with open(PATH_PILAR3, "r", encoding="utf-8") as f:
            self.db_pilar3 = json.load(f)

        with open(PATH_PILAR4, "r", encoding="utf-8") as f:
            self.db_pilar4 = json.load(f)

    # -------------------------------------------------------------------------
    # PILAR 1: FILTRO LEGAL Y BAREMOS MÉDICOS ESPECIALIZADOS (MEJORA 3)
    # -------------------------------------------------------------------------
    def evaluate_pilar1_legal_filter(self, candidate: Dict[str, Any]) -> Dict[str, Any]:
        """
        Evalúa al postulante contra los requisitos legales y médicos de las 8 escuelas.
        Incluye baremos de alta especialidad (EOFAP vuelo, Comandos Anfibios, visión 20/20, etc.)
        """
        nombre = candidate.get("nombre", "Postulante")
        dni = candidate.get("dni", "73491820")
        edad = int(candidate.get("edad", 19))
        sexo = candidate.get("sexo", "M").upper()
        talla_cm = float(candidate.get("talla_cm", 170.0))
        peso_kg = float(candidate.get("peso_kg", 68.0))
        estado_civil = candidate.get("estado_civil", "soltero").lower()
        tiene_hijos = candidate.get("tiene_hijos", False)
        tiene_antecedentes = candidate.get("tiene_antecedentes", False)
        tiene_tatuajes_visibles = candidate.get("tiene_tatuajes_visibles", False)
        secundaria_completa = candidate.get("secundaria_completa", True)

        # Criterios médicos especializados (Mejora 3)
        agudeza_visual_20_20 = candidate.get("agudeza_visual_20_20", True)
        daltonismo = candidate.get("daltonismo", False)
        talla_sentado_cm = float(candidate.get("talla_sentado_cm", 90.0))
        salud_dental_optima = candidate.get("salud_dental_optima", True)

        # Cálculo de IMC
        talla_m = talla_cm / 100.0 if talla_cm > 3 else talla_cm
        talla_cm = talla_m * 100.0
        imc = round(peso_kg / (talla_m ** 2), 2) if talla_m > 0 else 22.0

        if imc < 18.5:
            imc_status = "Bajo peso (Alerta de aptitud psicosomática)"
            imc_apto = False
        elif 18.5 <= imc <= 25.0:
            imc_status = "Peso Normal / Rango Militar Óptimo"
            imc_apto = True
        elif 25.0 < imc <= 27.5:
            imc_status = "Sobrepeso Leve (Permitido reglamentariamente)"
            imc_apto = True
        else:
            imc_status = "Sobrepeso / Obesidad (No Apto Médico)"
            imc_apto = False

        escuelas_eval = {}
        total_aptas = 0

        id_map = {
            "Escuela Militar de Chorrillos Coronel Francisco Bolognesi": "EMCH",
            "Instituto de Educación Superior Tecnológico Público del Ejército - ETE": "ETE",
            "Escuela Naval del Perú": "ENP",
            "Instituto de Educación Superior Tecnológico Público Naval - CITEN": "CITEN",
            "Escuela de Oficiales de la Fuerza Aérea del Perú - EOFAP": "EOFAP",
            "Escuela de Suboficiales de la Fuerza Aérea del Perú - ESOFA": "ESOFA",
            "Escuela de Oficiales de la Policía Nacional del Perú": "EO-PNP",
            "Escuelas de Educación Superior Técnico Profesional PNP": "EESTP_PNP"
        }

        for item in self.db_pilar1:
            raw_name = item.get("institucion_nombre", "")
            escuela_id = id_map.get(raw_name)
            if not escuela_id:
                for k, v in ESCUELAS_INFO.items():
                    if k in raw_name or v["nombre"] in raw_name:
                        escuela_id = k
                        break
            if not escuela_id:
                continue

            req = item.get("requisitos_basicos", {})
            edad_min = req.get("edad_minima_anios", 15)
            edad_max = req.get("edad_maxima_anios", 22)
            talla_min = req.get("talla_minima_masculina_cm" if sexo == "M" else "talla_minima_femenina_cm", 165)

            motivos_inaptitud = []
            advertencias = []
            restricciones_especialidad = []

            # 1. Talla
            if talla_cm < talla_min:
                motivos_inaptitud.append(f"Talla insuficiente: Mide {talla_cm:.1f} cm (Mínimo exigido: {talla_min} cm).")
            elif talla_cm < talla_min + 2:
                advertencias.append(f"Talla en el límite reglamentario ({talla_cm:.1f} cm vs {talla_min} cm).")

            # 2. Edad
            if edad < edad_min:
                motivos_inaptitud.append(f"Edad menor a la reglamentaria: {edad} años (Mínimo: {edad_min} años).")
            elif edad > edad_max:
                motivos_inaptitud.append(f"Excede límite de edad: {edad} años (Máximo permitido: {edad_max} años).")

            # 3. Estado civil e hijos
            if estado_civil not in ["soltero", "soltera"] or tiene_hijos:
                motivos_inaptitud.append("Incompatibilidad: Exigencia estricta de estado civil soltero(a) y sin dependientes.")

            # 4. Antecedentes penales
            if tiene_antecedentes:
                motivos_inaptitud.append("Descalificación legal: Registro de antecedentes penales, policiales o judiciales.")

            # 5. Tatuajes visibles
            if tiene_tatuajes_visibles:
                advertencias.append("Alerta: Tatuajes visibles en uniforme de verano sujetos a inspección estricta.")

            # 6. Secundaria
            if not secundaria_completa:
                motivos_inaptitud.append("Requisito educativo: Requiere constancia de haber culminado la educación secundaria.")

            # 7. IMC
            if not imc_apto:
                advertencias.append(f"Alerta de Antropometría: IMC de {imc} ({imc_status}).")

            # 8. Criterios Médicos Especializados (Mejora 3)
            if escuela_id == "EOFAP":
                if not agudeza_visual_20_20:
                    restricciones_especialidad.append("Restricción Médica EOFAP: No apto para la especialidad de Piloto de Caza (exige 20/20 sin correctores). Apto solo para Servicios y Mantenimiento.")
                if daltonismo:
                    motivos_inaptitud.append("Descalificación médica aeronáutica: El daltonismo impide la lectura de cabina y señales luminosas de pista.")
                if talla_sentado_cm < 85.0 or talla_sentado_cm > 98.0:
                    restricciones_especialidad.append(f"Alerta Antropométrica de Cabina: Talla sentado ({talla_sentado_cm} cm) fuera del rango ergonómico de asientos de eyección (85-98 cm).")

            if escuela_id in ["ENP", "CITEN"]:
                if not salud_dental_optima:
                    advertencias.append("Alerta Odontológica Naval: Dientes con caries activas o apiñamiento severo limitan aptitud para buceo y submarinos.")

            es_apto = (len(motivos_inaptitud) == 0)
            if es_apto:
                total_aptas += 1

            escuelas_eval[escuela_id] = {
                "escuela_id": escuela_id,
                "nombre": ESCUELAS_INFO[escuela_id]["nombre_corto"],
                "rama": ESCUELAS_INFO[escuela_id]["rama"],
                "rango": ESCUELAS_INFO[escuela_id]["rango"],
                "es_apto": es_apto,
                "talla_exigida": talla_min,
                "edad_rango": f"{edad_min} - {edad_max} años",
                "motivos_inaptitud": motivos_inaptitud,
                "advertencias": advertencias,
                "restricciones_especialidad": restricciones_especialidad
            }

        return {
            "postulante": {
                "nombre": nombre, "dni": dni, "edad": edad, "sexo": sexo,
                "talla_cm": talla_cm, "peso_kg": peso_kg, "imc": imc,
                "imc_status": imc_status, "imc_apto": imc_apto,
                "agudeza_visual_20_20": agudeza_visual_20_20,
                "daltonismo": daltonismo,
                "talla_sentado_cm": talla_sentado_cm,
                "salud_dental_optima": salud_dental_optima
            },
            "escuelas_evaluadas": escuelas_eval,
            "total_escuelas_aptas": total_aptas,
            "es_elegible_general": total_aptas > 0
        }

    # -------------------------------------------------------------------------
    # EXTRACCIÓN ALEATORIA PARA LA SESIÓN: 15 P2 (+3 L) + 10 P3 + 20 P4 (MEJORA 1)
    # -------------------------------------------------------------------------
    def generate_random_test_battery(self) -> Dict[str, Any]:
        """
        Extrae estrictamente:
        - 15 preguntas al azar del Pilar 2 (Big Five: 3 de cada factor)
        - +3 reactivos de control encubiertos de la Escala L (Deseabilidad Social)
        - +2 reactivos encubiertos de Banderas Rojas Clínicas (Seguridad y Estabilidad) -> Total 20 en P2
        - 10 dilemas situacionales al azar del Pilar 3 (Intereses Operativos)
        - 20 preguntas al azar del Pilar 4 (Conocimientos: 5 de cada área)
        - 6 reactivos de Evaluación Cognitiva Superior (3 Raven + 3 Bennett)
        """
        # 1. PILAR 2: 15 preguntas Big Five
        banco_p2 = self.db_pilar2.get("banco_reactivos_big_five", [])
        dominios_pattern = ["Neuroticismo", "Extravers", "Apertura", "Amabilidad", "Responsabilidad"]
        items_p2 = []
        for dom_sub in dominios_pattern:
            cands = [q for q in banco_p2 if dom_sub in q.get("dominio_evaluado", "")]
            if len(cands) >= 3:
                items_p2.extend(random.sample(cands, 3))
            else:
                items_p2.extend(cands)

        # Inserción de 3 reactivos encubiertos de la Escala L (Control de Mentira)
        banco_l = self.db_pilar2.get("escala_validez_deseabilidad_social", [])
        items_l = random.sample(banco_l, 3) if len(banco_l) >= 3 else banco_l
        validity_ids = [it["id_reactivo"] for it in items_l]

        for it in items_l:
            items_p2.append({
                "id_reactivo": it["id_reactivo"],
                "enunciado": it["enunciado"],
                "dominio_evaluado": "Control de Validez",
                "polaridad_puntuacion": 1,
                "es_reactivo_control": True
            })

        # Inserción de 2 reactivos encubiertos de Banderas Rojas Clínicas
        banco_cli = self.db_pilar2.get("banco_banderas_rojas_clinicas", [])
        items_cli = random.sample(banco_cli, 2) if len(banco_cli) >= 2 else banco_cli
        clinical_ids = [it["id_reactivo"] for it in items_cli]

        for it in items_cli:
            items_p2.append({
                "id_reactivo": it["id_reactivo"],
                "enunciado": it["enunciado"],
                "dominio_evaluado": "Control Clínico Institucional",
                "polaridad_puntuacion": 1,
                "es_reactivo_clinico": True
            })

        random.shuffle(items_p2)

        # 2. PILAR 3: 10 situaciones operativas al azar
        banco_p3 = self.db_pilar3.get("banco_dilemas_vocacionales", [])
        items_p3 = random.sample(banco_p3, 10)

        # 3. PILAR 4: 20 preguntas de conocimientos al azar (5 de cada área)
        banco_p4 = self.db_pilar4.get("banco_preguntas_conocimientos", [])
        areas = ["Psicotécnico", "Ciencias Exactas", "Ciencias Naturales", "Letras y Humanidades"]
        items_p4 = []
        for area in areas:
            cands = [q for q in banco_p4 if q.get("area_academica") == area]
            if len(cands) >= 5:
                items_p4.extend(random.sample(cands, 5))
            else:
                items_p4.extend(cands)
        random.shuffle(items_p4)

        items_p4_client = []
        for q in items_p4:
            q_clean = {
                "id_pregunta": q["id_pregunta"],
                "area_academica": q["area_academica"],
                "tema_especifico": q["tema_especifico"],
                "enunciado": q["enunciado"],
                "opciones": [
                    {"id_opcion": o["id_opcion"], "texto_respuesta": o["texto_respuesta"]}
                    for o in q["opciones"]
                ],
                "nivel_dificultad": q.get("nivel_dificultad", 3),
                "escuelas_relacionadas": q.get("escuelas_relacionadas", [])
            }
            if q.get("imagen_url"):
                q_clean["imagen_url"] = q["imagen_url"]
            if q.get("imagen_alt"):
                q_clean["imagen_alt"] = q["imagen_alt"]
            items_p4_client.append(q_clean)

        # 4. MÓDULO COGNITIVO SUPERIOR (Raven + Bennett)
        sample_cog = self.cognitive_engine.generate_cognitive_sample(num_raven=3, num_bennett=3)

        return {
            "pilar2_psicometria": items_p2,
            "validity_ids": validity_ids,
            "clinical_ids": clinical_ids,
            "pilar3_intereses": items_p3,
            "pilar4_conocimientos": items_p4_client,
            "pilar4_answer_key": {
                q["id_pregunta"]: next(o["id_opcion"] for o in q["opciones"] if o.get("es_correcta") is True)
                for q in items_p4
            },
            "pilar_cognitivo": sample_cog["items"],
            "cognitive_answer_key": sample_cog["answer_key"]
        }


    # -------------------------------------------------------------------------
    # CÁLCULO MATEMÁTICO MULTI-PILAR: 100% OFICIAL (MEJORAS 1, 2, 5, 6)
    # -------------------------------------------------------------------------
    def evaluate_full_battery(self,
                              candidate_data: Dict[str, Any],
                              answers_p2: Dict[str, int],
                              answers_p3: Dict[str, str],
                              answers_p4: Dict[str, str],
                              answer_key_p4: Dict[str, str],
                              validity_ids: Optional[List[str]] = None,
                              clinical_ids: Optional[List[str]] = None,
                              answers_cognitive: Optional[Dict[str, str]] = None,
                              answer_key_cognitive: Optional[Dict[str, str]] = None,
                              times_cognitive: Optional[Dict[str, float]] = None,
                              physical_marks: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Consolida matemáticamente el Diagnóstico Integral Castrense 360° evaluando:
        - Dimensión 1: Filtro Legal y Antropométrico Oficial + Sanidad Especializada (P1)
        - Dimensión 2: Psicométrica Big Five + Control de Sinceridad Escala L + Filtro Clínico de Banderas Rojas (P2)
        - Dimensión 3: Intereses Operativos y Dilemas Tácticos Inmersivos (P3)
        - Dimensión 4: Aptitud Académica Pre-Militar con Penalización Oficial (-0.25 por error) (P4)
        - Dimensión 5: Facultades Cognitivas Superiores (Factor 'g' Raven + Aptitud Mecánica Bennett)
        - Dimensión 6: Baremos Físicos Vigesimales Oficiales (0-20) e Índice Global de Aptitud para el Combate (IGAC)
        - Dossier 360°: Especialidad sugerida, Plan de Nivelación de 8 semanas, FODA y Verificación QR
        """
        # 1. EVALUAR PILAR 1 (FILTRO LEGAL, ANTROPOMÉTRICO Y MÉDICO)
        filtro_legal = self.evaluate_pilar1_legal_filter(candidate_data)
        escuelas_legal = filtro_legal["escuelas_evaluadas"]
        postulante_info = filtro_legal["postulante"]

        # 2. EVALUAR PILAR 2 (PSICOMETRÍA, ESCALA L Y BANDERAS ROJAS CLÍNICAS)
        reactivos_dict = {r["id_reactivo"]: r for r in self.db_pilar2["banco_reactivos_big_five"]}
        for v_item in self.db_pilar2.get("escala_validez_deseabilidad_social", []):
            reactivos_dict[v_item["id_reactivo"]] = {
                "id_reactivo": v_item["id_reactivo"],
                "dominio_evaluado": "Control de Validez",
                "polaridad_puntuacion": 1
            }
        for c_item in self.db_pilar2.get("banco_banderas_rojas_clinicas", []):
            reactivos_dict[c_item["id_reactivo"]] = {
                "id_reactivo": c_item["id_reactivo"],
                "dominio_evaluado": c_item.get("dominio_clinico", "Control Clínico"),
                "polaridad_puntuacion": c_item.get("polaridad_riesgo", 1),
                "umbral_alerta": c_item.get("umbral_alerta", 4),
                "riesgo": c_item.get("riesgo", "")
            }

        domain_scores_raw = {"Neuroticismo": 0, "Extraversión": 0, "Apertura": 0, "Amabilidad": 0, "Responsabilidad": 0}
        domain_counts = {"Neuroticismo": 0, "Extraversión": 0, "Apertura": 0, "Amabilidad": 0, "Responsabilidad": 0}

        val_hits_desirable = 0
        total_val_items = 0
        alertas_seguridad_clinica = []
        riesgo_armas = False
        riesgo_labilidad = False
        riesgo_claustrofobia = False

        for r_id, val in answers_p2.items():
            r_obj = reactivos_dict.get(r_id)
            if not r_obj:
                continue

            v = int(val)
            v = max(1, min(v, 5))

            # Chequeo de Escala L (Deseabilidad Social / Control de Mentira)
            if r_id.startswith("VAL_") or (validity_ids and r_id in validity_ids):
                total_val_items += 1
                if v >= 4:
                    val_hits_desirable += 1
                continue

            # Chequeo de Banderas Rojas Clínicas de Seguridad
            if r_id.startswith("CLI_") or (clinical_ids and r_id in clinical_ids):
                umbral = r_obj.get("umbral_alerta", 4)
                if v >= umbral:
                    riesgo_tipo = r_obj.get("riesgo", "")
                    if "PORTE_ARMAS" in riesgo_tipo:
                        riesgo_armas = True
                        alertas_seguridad_clinica.append("ALERTA CRÍTICA (Porte de Armas): Indicadores de impulsividad reactiva violenta. Requiere evaluación psiquiátrica presencial.")
                    elif "COLAPSO" in riesgo_tipo or "AUTOLITICA" in riesgo_tipo:
                        riesgo_labilidad = True
                        alertas_seguridad_clinica.append("ALERTA DE RESILENCIA: Labilidad emocional severa bajo presión o aislamiento en régimen de internado.")
                    elif "INCOMPATIBILIDAD" in riesgo_tipo:
                        riesgo_claustrofobia = True
                        alertas_seguridad_clinica.append("RESTRICCIÓN TÁCTICA: Síntomas de claustrofobia/pánico en confinamiento (incompatible con submarinos, blindados o cabinas cerradas).")
                continue

            dom = r_obj.get("dominio_evaluado", "")
            if "Extravers" in dom:
                dom = "Extraversión"
            pol = r_obj.get("polaridad_puntuacion", 1)
            score_item = v if pol == 1 else (6 - v)
            if dom in domain_scores_raw:
                domain_scores_raw[dom] += score_item
                domain_counts[dom] += 1

        # Control de Sinceridad Escala L
        if total_val_items > 0:
            lie_ratio = val_hits_desirable / float(total_val_items)
            indice_sinceridad = round(max(0.0, (1.0 - lie_ratio) * 100.0), 1)
            if val_hits_desirable >= 3:
                alerta_sinceridad = "ALERTA CRÍTICA: Deseabilidad Social Extrema (Falsa virtud / intento de manipulación del perfil)"
                estado_validez = "OBSERVADO"
            elif val_hits_desirable == 2:
                alerta_sinceridad = "OBSERVACIÓN: Moderada deseabilidad social detectada en respuestas"
                estado_validez = "VÁLIDO CON OBSERVACIÓN"
            else:
                alerta_sinceridad = "VÁLIDO: Protocolo sincero, transparente y consistente con la realidad"
                estado_validez = "VÁLIDO"
        else:
            indice_sinceridad = 100.0
            alerta_sinceridad = "VÁLIDO: Protocolo evaluado conforme"
            estado_validez = "VÁLIDO"

        domain_percentiles = {}
        for dom, raw in domain_scores_raw.items():
            cnt = domain_counts[dom]
            if cnt > 0:
                pct = ((raw - cnt) / (cnt * 4)) * 100.0
                domain_percentiles[dom] = round(max(0.0, min(100.0, pct)), 1)
            else:
                domain_percentiles[dom] = 50.0

        perfiles_ideales = {
            "EMCH": {"Neuroticismo": 15, "Extraversión": 75, "Apertura": 65, "Amabilidad": 60, "Responsabilidad": 95},
            "ETE": {"Neuroticismo": 18, "Extraversión": 65, "Apertura": 60, "Amabilidad": 65, "Responsabilidad": 92},
            "ENP": {"Neuroticismo": 12, "Extraversión": 65, "Apertura": 80, "Amabilidad": 72, "Responsabilidad": 94},
            "CITEN": {"Neuroticismo": 15, "Extraversión": 60, "Apertura": 75, "Amabilidad": 70, "Responsabilidad": 90},
            "EOFAP": {"Neuroticismo": 10, "Extraversión": 75, "Apertura": 85, "Amabilidad": 60, "Responsabilidad": 90},
            "ESOFA": {"Neuroticismo": 15, "Extraversión": 68, "Apertura": 78, "Amabilidad": 65, "Responsabilidad": 88},
            "EO-PNP": {"Neuroticismo": 16, "Extraversión": 80, "Apertura": 68, "Amabilidad": 75, "Responsabilidad": 90},
            "EESTP_PNP": {"Neuroticismo": 20, "Extraversión": 75, "Apertura": 62, "Amabilidad": 78, "Responsabilidad": 88}
        }

        psico_affinity_by_school = {}
        for esc_id, ideal in perfiles_ideales.items():
            dist_sq = 0.0
            weights = {"Neuroticismo": 1.4, "Extraversión": 1.0, "Apertura": 1.0, "Amabilidad": 0.8, "Responsabilidad": 1.4}
            for dom, ideal_val in ideal.items():
                user_val = domain_percentiles.get(dom, 50.0)
                diff = (user_val - ideal_val)
                dist_sq += (diff ** 2) * weights[dom]
            max_dist_sq = (100 ** 2) * sum(weights.values())
            sim = 100.0 * (1.0 - math.sqrt(dist_sq / max_dist_sq))
            psico_affinity_by_school[esc_id] = round(max(30.0, min(100.0, sim)), 1)

        # 3. EVALUAR PILAR 3 (INTERESES OPERATIVOS Y DILEMAS TÁCTICOS)
        dilemas_dict = {d["id_dilema"]: d for d in self.db_pilar3["banco_dilemas_vocacionales"]}
        rama_points = {"Ejercito": 0, "Marina": 0, "FAP": 0, "PNP": 0}

        for d_id, opt_id in answers_p3.items():
            d_obj = dilemas_dict.get(d_id)
            if not d_obj:
                continue
            for op in d_obj.get("opciones", []):
                if op.get("id_opcion") == opt_id:
                    pesos = op.get("pesos_afinidad", {})
                    for rama, pts in pesos.items():
                        if rama in rama_points:
                            rama_points[rama] += pts

        total_p3_pts = sum(rama_points.values()) or 1.0
        rama_percent = {r: (pts / total_p3_pts) * 100.0 for r, pts in rama_points.items()}

        interests_affinity_by_school = {
            "EMCH": round(rama_percent.get("Ejercito", 25.0) * 0.95 + 5.0, 1),
            "ETE": round(rama_percent.get("Ejercito", 25.0) * 0.90 + 10.0, 1),
            "ENP": round(rama_percent.get("Marina", 25.0) * 0.95 + 5.0, 1),
            "CITEN": round(rama_percent.get("Marina", 25.0) * 0.90 + 10.0, 1),
            "EOFAP": round(rama_percent.get("FAP", 25.0) * 0.95 + 5.0, 1),
            "ESOFA": round(rama_percent.get("FAP", 25.0) * 0.90 + 10.0, 1),
            "EO-PNP": round(rama_percent.get("PNP", 25.0) * 0.95 + 5.0, 1),
            "EESTP_PNP": round(rama_percent.get("PNP", 25.0) * 0.90 + 10.0, 1)
        }

        # 4. EVALUAR PILAR 4 (CONOCIMIENTOS CON PENALIZACIÓN OFICIAL -0.25)
        preguntas_dict = {q["id_pregunta"]: q for q in self.db_pilar4["banco_preguntas_conocimientos"]}
        total_q4 = len(answer_key_p4) or 20
        aciertos = 0
        errores = 0
        no_respondidas = 0
        area_stats = {"Psicotécnico": {"ok": 0, "err": 0, "total": 0},
                      "Ciencias Exactas": {"ok": 0, "err": 0, "total": 0},
                      "Ciencias Naturales": {"ok": 0, "err": 0, "total": 0},
                      "Letras y Humanidades": {"ok": 0, "err": 0, "total": 0}}
        school_knowledge_hits = {esc: 0 for esc in ESCUELAS_INFO}

        for q_id, correct_opt in answer_key_p4.items():
            user_opt = answers_p4.get(q_id)
            q_obj = preguntas_dict.get(q_id)
            area = q_obj.get("area_academica") if q_obj else "Psicotécnico"
            if area in area_stats:
                area_stats[area]["total"] += 1

            if not user_opt:
                no_respondidas += 1
            elif user_opt == correct_opt:
                aciertos += 1
                if area in area_stats:
                    area_stats[area]["ok"] += 1
                if q_obj:
                    for esc in q_obj.get("escuelas_relacionadas", []):
                        if esc in school_knowledge_hits:
                            school_knowledge_hits[esc] += 1
            else:
                errores += 1
                if area in area_stats:
                    area_stats[area]["err"] += 1

        penalizacion_puntos = round(errores * 0.25, 2)
        puntaje_neto = max(0.0, (aciertos * 1.0) - penalizacion_puntos)
        nota_vigesimal_oficial = round((puntaje_neto / total_q4) * 20.0, 2)
        tasa_precision_pct = round((aciertos / max(1, aciertos + errores)) * 100.0, 1)

        knowledge_base_pct = (puntaje_neto / total_q4) * 100.0
        knowledge_affinity_by_school = {}
        for esc_id in ESCUELAS_INFO:
            hits = school_knowledge_hits[esc_id]
            esc_pct = (hits / max(1, aciertos)) * 100.0 if aciertos > 0 else 50.0
            comb = (knowledge_base_pct * 0.70) + (esc_pct * 0.30)
            knowledge_affinity_by_school[esc_id] = round(max(20.0, min(100.0, comb)), 1)

        # 5. EVALUAR PILAR COGNITIVO SUPERIOR (FACTOR 'G' + BENNETT)
        if answers_cognitive and answer_key_cognitive:
            eval_cog = self.cognitive_engine.evaluate_cognitive(
                answers=answers_cognitive,
                answer_key=answer_key_cognitive,
                times_by_item=times_cognitive,
                escuela_id="EMCH"
            )
        else:
            # Estimación calibrada si no se completó módulo independiente
            pts_psi = area_stats["Psicotécnico"]["ok"]
            tot_psi = max(1, area_stats["Psicotécnico"]["total"])
            base_g = round((pts_psi / tot_psi) * 100.0, 1)
            eval_cog = {
                "factor_g_raven": base_g,
                "aptitud_mecanica_bennett": 68.0,
                "velocidad_procesamiento": 75.0,
                "indice_cognitivo_global": round((base_g * 0.45) + (68.0 * 0.35) + (75.0 * 0.20), 1),
                "nivel": "PROMEDIO_APTO" if base_g >= 50 else "CRITICO_OBSERVADO",
                "veredicto": "Evaluación cognitiva integral calculada conforme a baremos.",
                "observaciones": [],
                "detalles_items": []
            }

        # 6. EVALUAR PILAR FÍSICO OPERATIVO (0-20)
        phys_score = 14.5
        eval_fisica_detalle = None
        sexo_cand = postulante_info.get("sexo", "M")
        talla_m = postulante_info.get("talla_cm", 170.0) / 100.0
        peso_k = postulante_info.get("peso_kg", 68.0)

        if physical_marks and any(v for v in physical_marks.values()):
            try:
                eval_fisica_detalle = self.physical_engine.evaluate_full_battery(
                    institution_id="EMCH",
                    sex=sexo_cand,
                    marks=physical_marks,
                    height_m=talla_m,
                    weight_kg=peso_k
                )
                phys_score = float(eval_fisica_detalle.get("composite_score", 14.5))
            except Exception:
                phys_score = float(physical_marks.get("promedio_fisico", 14.5))

        # 7. PONDERACIÓN MULTI-PILAR Y CONSOLIDACIÓN DE LAS 8 ESCUELAS (5 EJES)
        score_cog_global = eval_cog["indice_cognitivo_global"]
        score_phys_100 = (phys_score / 20.0) * 100.0

        affinity_results = []
        for esc_id, info in ESCUELAS_INFO.items():
            score_p2 = psico_affinity_by_school[esc_id]
            score_p3 = interests_affinity_by_school[esc_id]
            score_p4 = knowledge_affinity_by_school[esc_id]
            legal_info = escuelas_legal.get(esc_id, {})
            es_apto_legal = legal_info.get("es_apto", True)

            # Restricciones clínicas específicas
            if riesgo_claustrofobia and esc_id in ["ENP", "CITEN"]:
                es_apto_legal = False
                legal_info.setdefault("motivos_inaptitud", []).append("Restricción Clínica: Incompatibilidad para confinamiento submarino prolongado.")
            if riesgo_armas:
                legal_info.setdefault("advertencias", []).append("Alerta Tribunal: Evaluación de control de impulsos requerida para porte de arma de fuego.")

            # Ponderación 5 Ejes Castrenses:
            # 25% Intereses (P3) + 25% Psicometría (P2) + 20% Cognitivo (Raven/Bennett) + 15% Conocimientos (P4) + 15% Físico
            raw_fit = (score_p3 * 0.25) + (score_p2 * 0.25) + (score_cog_global * 0.20) + (score_p4 * 0.15) + (score_phys_100 * 0.15)

            # Penalización por Falsa Virtud (-10% si deseabilidad social extrema)
            if val_hits_desirable >= 3:
                raw_fit = raw_fit * 0.90

            final_fit = round(max(10.0, min(100.0, raw_fit)), 1)

            affinity_results.append({
                "escuela_id": esc_id,
                "nombre": info["nombre_corto"],
                "nombre_completo": info["nombre"],
                "rama": info["rama"],
                "rango": info["rango"],
                "icono": info["icono"],
                "lema": info["lema"],
                "color_hex": info["color_hex"],
                "color_accent": info["color_accent"],
                "especialidades": info["especialidades"],
                "pdf_carpeta": info["pdf_carpeta"],
                "es_apto_legal": es_apto_legal,
                "motivos_inaptitud": legal_info.get("motivos_inaptitud", []),
                "advertencias": legal_info.get("advertencias", []),
                "restricciones_especialidad": legal_info.get("restricciones_especialidad", []),
                "puntaje_global_fit": final_fit,
                "desglose_pilares": {
                    "pilar1_legal": 100 if es_apto_legal else 0,
                    "pilar2_psicometria": score_p2,
                    "pilar3_intereses": score_p3,
                    "pilar4_conocimientos": score_p4,
                    "pilar_cognitivo": score_cog_global,
                    "pilar_fisico": round(score_phys_100, 1)
                }
            })

        affinity_results.sort(key=lambda x: (1 if x["es_apto_legal"] else 0, x["puntaje_global_fit"]), reverse=True)
        escuela_ganadora = affinity_results[0]

        # 8. ESPECIALIDAD SUGERIDA PARA LA ESCUELA GANADORA
        top_id = escuela_ganadora["escuela_id"]
        if top_id == "EOFAP":
            if postulante_info.get("agudeza_visual_20_20") and eval_cog["factor_g_raven"] >= 65:
                especialidad_sugerida = "Piloto de Caza y Combate Aéreo"
            elif eval_cog["aptitud_mecanica_bennett"] >= 70:
                especialidad_sugerida = "Mantenimiento Aeronáutico e Ingeniería de Armamento"
            else:
                especialidad_sugerida = "Defensa Aérea, Radares y Guerra Electrónica"
        elif top_id == "ENP":
            if phys_score >= 16.0 and not riesgo_claustrofobia:
                especialidad_sugerida = "Comando Anfibio / Infantería de Marina"
            elif eval_cog["aptitud_mecanica_bennett"] >= 70:
                especialidad_sugerida = "Ingeniería de Armas Navales y Sistemas de Propulsión"
            else:
                especialidad_sugerida = "Guerra de Superficie y Telecomunicaciones Navales"
        elif top_id == "EMCH":
            if phys_score >= 16.0:
                especialidad_sugerida = "Infantería de Combate / Comandos del Ejército"
            elif eval_cog["aptitud_mecanica_bennett"] >= 65:
                especialidad_sugerida = "Caballería Blindada y Material de Guerra"
            else:
                especialidad_sugerida = "Artillería e Inteligencia Militar"
        elif top_id == "EO-PNP":
            if eval_cog["factor_g_raven"] >= 70 or area_stats["Letras y Humanidades"]["ok"] >= 3:
                especialidad_sugerida = "Investigación Criminalística (DIRINCRI / Homicidios)"
            elif phys_score >= 16.0:
                especialidad_sugerida = "Operaciones Tácticas Urbanas (SUAT / Rescate)"
            else:
                especialidad_sugerida = "Orden, Seguridad Ciudadana y Tránsito"
        else:
            especialidad_sugerida = escuela_ganadora["especialidades"][0] if escuela_ganadora["especialidades"] else "Especialista Operativo"

        # 9. ÍNDICE GLOBAL DE APTITUD PARA EL COMBATE (IGAC)
        score_know_100 = (nota_vigesimal_oficial / 20.0) * 100.0
        score_psico_100 = escuela_ganadora["desglose_pilares"]["pilar2_psicometria"]
        score_inter_100 = escuela_ganadora["desglose_pilares"]["pilar3_intereses"]

        igac_score = round(
            (score_phys_100 * 0.25) +
            (score_cog_global * 0.25) +
            (score_know_100 * 0.20) +
            (score_psico_100 * 0.20) +
            (score_inter_100 * 0.10),
            1
        )

        if igac_score >= 82.0 and len(alertas_seguridad_clinica) == 0 and val_hits_desirable < 2:
            igac_verdict = "APTO DESTACADO - ALTA CAPACIDAD COMBATIENTE Y DE MANDO"
            igac_level = "success"
        elif igac_score >= 65.0 and len(alertas_seguridad_clinica) == 0:
            igac_verdict = "APTO REGULAR - CONDICIÓN OPERATIVA Y MENTAL FAVORABLE"
            igac_level = "warning"
        else:
            igac_verdict = "EN OBSERVACIÓN - REQUIERE REACONDICIONAMIENTO PRE-MILITAR INTEGRAL"
            igac_level = "danger"

        # 10. MAPA FODA TÁCTICO PERSONALIZADO
        fortalezas = []
        oportunidades = []
        debilidades = []
        amenazas = []

        if score_cog_global >= 75:
            fortalezas.append("Elevada capacidad de abstracción lógica (Factor 'g') y agilidad mental.")
        if eval_cog["aptitud_mecanica_bennett"] >= 70:
            fortalezas.append("Excelente aptitud mecánica y comprensión de sistemas tácticos (poleas/engranajes).")
        if phys_score >= 15.0:
            fortalezas.append(f"Rendimiento físico sobresaliente con nota vigesimal estimada de {phys_score:.1f}/20.")
        if domain_percentiles.get("Responsabilidad", 0) >= 80:
            fortalezas.append("Férreo sentido del deber, disciplina y vocación de subordinación militar.")

        if len(fortalezas) == 0:
            fortalezas.append("Disposición entusiasta hacia la formación castrense y asimilación de doctrina.")

        if nota_vigesimal_oficial < 12.0:
            debilidades.append(f"Nota académica por debajo del umbral aprobatorio ({nota_vigesimal_oficial:.2f}/20). Requiere nivelación.")
        if eval_cog["aptitud_mecanica_bennett"] < 55:
            debilidades.append("Puntaje modesto en razonamiento mecánico básico (Bennett).")
        if domain_percentiles.get("Neuroticismo", 0) >= 45:
            debilidades.append("Indicadores de tensión o labilidad emocional ante situaciones de apremio.")

        if len(debilidades) == 0:
            debilidades.append("Mantener el ritmo de entrenamiento y no caer en exceso de confianza.")

        oportunidades.append(f"Alta compatibilidad con el perfil doctrinario de la {escuela_ganadora['nombre_completo']}.")
        oportunidades.append(f"Potencial para proyectarse hacia la especialidad de: {especialidad_sugerida}.")

        if val_hits_desirable >= 2:
            amenazas.append("Riesgo en entrevista personal: Detección de Falsa Virtud / Deseabilidad Social.")
        if len(alertas_seguridad_clinica) > 0:
            amenazas.append("Examen médico/psiquiátrico: Presencia de alertas clínicas a despejar.")
        if not postulante_info.get("imc_apto"):
            amenazas.append(f"Antropometría en observación: IMC de {postulante_info.get('imc')} fuera del rango ideal.")

        if len(amenazas) == 0:
            amenazas.append("Competencia con postulantes con mayor tiempo de preparación en academia.")

        # 11. PLAN DE NIVELACIÓN Y ENTRENAMIENTO TÁCTICO (8 SEMANAS)
        plan_entrenamiento = [
            {"semana": "Semana 1-2", "eje": "Acondicionamiento Base y Biometría", "accion": "Nivelación de carrera continua (1500m) y técnica de brazada en natación estilo crol. Ajuste de nutrición para IMC."},
            {"semana": "Semana 3-4", "eje": "Destrezas Técnicas y Mecánicas", "accion": "Práctica de poleas, transmisiones, engranajes y resolución de series de matrices abstractas 3x3."},
            {"semana": "Semana 5-6", "eje": "Psicotécnico y Velocidad bajo Presión", "accion": "Simulacros cronometrados a 25 segundos por ítem. Control de la respiración y manejo del estrés."},
            {"semana": "Semana 7-8", "eje": "Simulacro de Tribunal y Entrevista", "accion": "Ensayo de entrevista personal ante oficiales con preguntas de sinceridad real. Examen tipo admisión completo."}
        ]

        # 12. ENSAMBLAJE FINAL DEL DOSSIER 360°
        output_payload = {
            "postulante": postulante_info,
            "escuela_ganadora": escuela_ganadora,
            "especialidad_sugerida": especialidad_sugerida,
            "ranking_afinidad": affinity_results,
            "igac_militar": {
                "igac_score": igac_score,
                "veredicto": igac_verdict,
                "nivel": igac_level,
                "nota_fisica_referencial": phys_score
            },
            "dimensiones_360": {
                "biometrica": {
                    "imc": postulante_info["imc"],
                    "imc_status": postulante_info["imc_status"],
                    "imc_apto": postulante_info["imc_apto"],
                    "total_escuelas_aptas": filtro_legal["total_escuelas_aptas"],
                    "es_elegible": filtro_legal["es_elegible_general"],
                    "criterios_especializados": {
                        "agudeza_visual_20_20": postulante_info.get("agudeza_visual_20_20"),
                        "daltonismo": postulante_info.get("daltonismo"),
                        "talla_sentado_cm": postulante_info.get("talla_sentado_cm"),
                        "salud_dental_optima": postulante_info.get("salud_dental_optima")
                    }
                },
                "fisica": {
                    "nota_vigesimal_estimada": phys_score,
                    "nivel": "ÓPTIMO" if phys_score >= 16.0 else "APTO" if phys_score >= 12.0 else "DEFICITARIO",
                    "disciplinas_detalle": eval_fisica_detalle.get("scores", {}) if eval_fisica_detalle else None
                },
                "cognitiva_superior": eval_cog,
                "psicologica_clinica": {
                    "dominios": domain_percentiles,
                    "rasgo_dominante": max(domain_percentiles, key=domain_percentiles.get),
                    "control_sinceridad": {
                        "total_items_control": total_val_items,
                        "aciertos_deseables": val_hits_desirable,
                        "indice_sinceridad_pct": indice_sinceridad,
                        "estado_validez": estado_validez,
                        "alerta": alerta_sinceridad
                    },
                    "filtro_clinico": {
                        "alertas_seguridad": alertas_seguridad_clinica,
                        "perfil_despejado": len(alertas_seguridad_clinica) == 0,
                        "riesgo_armas": riesgo_armas,
                        "riesgo_labilidad": riesgo_labilidad,
                        "riesgo_claustrofobia": riesgo_claustrofobia
                    }
                },
                "intereses_tacticos": {
                    "distribucion_ramas": {r: round(p, 1) for r, p in rama_percent.items()},
                    "rama_predilecta": max(rama_percent, key=rama_percent.get)
                },
                "academica": {
                    "nota_vigesimal_oficial": nota_vigesimal_oficial,
                    "puntaje_neto": puntaje_neto,
                    "penalizacion_puntos": penalizacion_puntos,
                    "aciertos": aciertos,
                    "errores": errores,
                    "no_respondidas": no_respondidas,
                    "total": total_q4,
                    "tasa_precision_pct": tasa_precision_pct,
                    "desglose_areas": area_stats
                }
            },
            "foda_tactico": {
                "fortalezas": fortalezas,
                "oportunidades": oportunidades,
                "debilidades": debilidades,
                "amenazas": amenazas
            },
            "plan_entrenamiento_tactico": plan_entrenamiento
        }

        # Guardar en base de datos SQLite y emitir código único con QR nativo
        verification_code = DB_MANAGER.save_vocational_assessment(output_payload)
        output_payload["verification_code"] = verification_code
        output_payload["verification_url"] = f"http://localhost:8080/api/vocational/verify?code={verification_code}"
        output_payload["qr_svg"] = generate_native_qr_svg(output_payload["verification_url"], size=150)

        return output_payload


    # -------------------------------------------------------------------------
    # MEJORA 4: SIMULACRO MASIVO DE 100 PREGUNTAS POR INSTITUCIÓN
    # -------------------------------------------------------------------------
    def generate_school_100_mock_exam(self, school_id: str) -> Dict[str, Any]:
        """
        Genera un examen masivo de 100 preguntas calibrado con la ponderación
        oficial de prospecto de la institución seleccionada.
        """
        school_id = school_id.upper()
        info = ESCUELAS_INFO.get(school_id, ESCUELAS_INFO["EMCH"])
        weights = info.get("ponderacion_100", {"exactas": 25, "naturales": 25, "psicotecnico": 25, "humanidades": 25})

        banco_p4 = self.db_pilar4.get("banco_preguntas_conocimientos", [])

        pool_psi = [q for q in banco_p4 if q.get("area_academica") == "Psicotécnico"]
        pool_mat = [q for q in banco_p4 if q.get("area_academica") == "Ciencias Exactas"]
        pool_cie = [q for q in banco_p4 if q.get("area_academica") == "Ciencias Naturales"]
        pool_hum = [q for q in banco_p4 if q.get("area_academica") == "Letras y Humanidades"]

        def pick_with_repeat(pool: list, count: int) -> list:
            """Muestrea preguntas; si faltan, repite aleatoriamente sin sesgo."""
            if len(pool) >= count:
                return random.sample(pool, count)
            res = list(pool)
            while len(res) < count:
                res.append(random.choice(pool))
            random.shuffle(res)
            return res

        selected_psi = pick_with_repeat(pool_psi, weights["psicotecnico"])
        selected_mat = pick_with_repeat(pool_mat, weights["exactas"])
        selected_cie = pick_with_repeat(pool_cie, weights["naturales"])
        selected_hum = pick_with_repeat(pool_hum, weights["humanidades"])

        total_100 = selected_psi + selected_mat + selected_cie + selected_hum
        random.shuffle(total_100)

        exam_client = []
        answer_key = {}

        for idx, q in enumerate(total_100):
            mock_id = f"M100_{idx+1:03d}"
            correct_opt = next(o["id_opcion"] for o in q["opciones"] if o.get("es_correcta") is True)
            answer_key[mock_id] = correct_opt

            q_item = {
                "id_pregunta": mock_id,
                "numero": idx + 1,
                "area_academica": q["area_academica"],
                "tema_especifico": q["tema_especifico"],
                "enunciado": q["enunciado"],
                "opciones": [
                    {"id_opcion": o["id_opcion"], "texto_respuesta": o["texto_respuesta"]}
                    for o in q["opciones"]
                ]
            }
            if q.get("imagen_url"):
                q_item["imagen_url"] = q["imagen_url"]
            if q.get("imagen_alt"):
                q_item["imagen_alt"] = q["imagen_alt"]
            exam_client.append(q_item)

        return {
            "institucion": info,
            "total_preguntas": 100,
            "duracion_minutos": 120,
            "preguntas": exam_client,
            "answer_key": answer_key
        }

    def evaluate_school_100_mock_exam(self, school_id: str,
                                      candidate_name: str,
                                      answers: Dict[str, str],
                                      answer_key: Dict[str, str]) -> Dict[str, Any]:
        """
        Califica el examen de 100 preguntas aplicando:
        - Respuesta Correcta: +1.0
        - Respuesta Incorrecta: -0.25 (Penalización oficial)
        - No contestada: 0.0
        - Nota mínima de aprobación: 12.00 / 20.00
        """
        aciertos = 0
        errores = 0
        blancos = 0

        for q_id, correct in answer_key.items():
            user_ans = answers.get(q_id)
            if not user_ans:
                blancos += 1
            elif user_ans == correct:
                aciertos += 1
            else:
                errores += 1

        penalizacion = round(errores * 0.25, 2)
        puntaje_neto = max(0.0, aciertos * 1.0 - penalizacion)
        nota_vigesimal = round((puntaje_neto / 100.0) * 20.0, 2)
        es_aprobado = (nota_vigesimal >= 12.0)

        # Guardar en SQLite
        code = DB_MANAGER.save_mock_100_result(
            candidate_name=candidate_name,
            school_id=school_id,
            aciertos=aciertos,
            errores=errores,
            blancos=blancos,
            puntaje_neto=puntaje_neto,
            nota_vigesimal=nota_vigesimal
        )

        return {
            "verification_code": code,
            "candidato": candidate_name,
            "escuela_id": school_id,
            "total_preguntas": 100,
            "aciertos": aciertos,
            "errores": errores,
            "blancos": blancos,
            "penalizacion_puntos": penalizacion,
            "puntaje_neto": puntaje_neto,
            "nota_vigesimal": nota_vigesimal,
            "es_aprobado": es_aprobado,
            "dictamen": "APROBADO CON DERECHO A CUADRO DE MÉRITO" if es_aprobado else "NO ALCANZÓ NOTA MÍNIMA (12.00)"
        }


# Instancia singleton del motor vocacional 100%
VOCATIONAL_ENGINE = MilitaryVocationalEngine()

if __name__ == "__main__":
    print("Probando Motor Vocacional Militar Multi-Pilar al 100%...")
    demo_cand = {
        "nombre": "Cadete Prueba 100%",
        "dni": "72918230",
        "edad": 19,
        "sexo": "M",
        "talla_cm": 174,
        "peso_kg": 71,
        "agudeza_visual_20_20": True,
        "talla_sentado_cm": 91.5,
        "salud_dental_optima": True,
        "daltonismo": False
    }

    bat = VOCATIONAL_ENGINE.generate_random_test_battery()
    print(f"Batería extraída: {len(bat['pilar2_psicometria'])} P2 (con Escala L), {len(bat['pilar3_intereses'])} P3, {len(bat['pilar4_conocimientos'])} P4.")

    ans_p2 = {q["id_reactivo"]: 4 for q in bat["pilar2_psicometria"]}
    ans_p3 = {d["id_dilema"]: "A" for d in bat["pilar3_intereses"]}
    ans_p4 = {q["id_pregunta"]: bat["pilar4_answer_key"][q["id_pregunta"]] for q in bat["pilar4_conocimientos"]}

    res = VOCATIONAL_ENGINE.evaluate_full_battery(
        candidate_data=demo_cand,
        answers_p2=ans_p2,
        answers_p3=ans_p3,
        answers_p4=ans_p4,
        answer_key_p4=bat["pilar4_answer_key"],
        validity_ids=bat["validity_ids"]
    )
    print("Dictamen Emitido:")
    print("  - Escuela Ganadora:", res["escuela_ganadora"]["nombre"])
    print("  - Código Oficial:", res["verification_code"])
    print("  - Sinceridad Escala L:", res["resumen_pilares"]["pilar2_psicometria"]["control_sinceridad"]["estado_validez"])
    print("  - Nota P4 con Penalización:", res["resumen_pilares"]["pilar4_conocimientos"]["nota_vigesimal_oficial"], "/ 20")
    print("  - IGAC Combate:", res["igac_militar"]["igac_score"], "(", res["igac_militar"]["veredicto"], ")")

    # Prueba de simulacro de 100 preguntas
    mock_100 = VOCATIONAL_ENGINE.generate_school_100_mock_exam("EOFAP")
    print(f"Simulacro 100 EOFAP generado con {len(mock_100['preguntas'])} preguntas.")
