#!/usr/bin/env python3
"""
Motor de Calificación de Pruebas Físicas y Antropometría para las Escuelas Militares del Perú.
Baremos oficiales de EMCH, ETE, ENP, CITEN, EOFAP, ESOFA, EO-PNP y EESTP-PNP.
"""

from typing import Dict, Any, List, Optional
import math


class MilitaryPhysicalScoringEngine:
    """Motor de cálculo vigesimal (0-20) y aptitud antropométrica militar y policial."""

    # Tallas mínimas oficiales extraídas de prospectos
    HEIGHT_REQUIREMENTS = {
        "EMCH": {"M": 1.68, "F": 1.58, "min_passing": 12.0},
        "ETE": {"M": 1.65, "F": 1.55, "min_passing": 12.0},
        "ENP": {"M": 1.68, "F": 1.58, "min_passing": 12.0},
        "CITEN": {"M": 1.65, "F": 1.55, "min_passing": 12.0},
        "EOFAP": {"M": 1.68, "F": 1.58, "min_passing": 12.0},
        "ESOFA": {"M": 1.65, "F": 1.55, "min_passing": 12.0},
        "EO_PNP": {"M": 1.68, "F": 1.60, "min_passing": 13.0},
        "EESTP_PNP": {"M": 1.65, "F": 1.58, "min_passing": 13.0}
    }

    # =========================================================================
    # TABLAS DE PUNTUACIÓN DE DISCIPLINAS FÍSICAS (0 A 20)
    # Formato: [(umbral_marca, nota), ...] ordenado de mejor a peor
    # Para tiempos (carrera, natación): marca <= umbral obtiene la nota
    # Para repeticiones (barras, abdominales, planchas) o salto: marca >= umbral obtiene la nota
    # =========================================================================

    BAREMOS = {
        # MARINA (ENP / CITEN) - Baremos oficiales Prospecto 2027
        "ENP": {
            "M": {
                "barras": [
                    (18, 20.0), (16, 19.0), (14, 18.0), (12, 17.0),
                    (10, 16.0), (8, 15.0), (6, 14.0), (5, 13.0), (4, 12.0)
                ],
                "abdominales": [
                    (34, 20.0), (33, 19.0), (32, 18.0), (31, 17.0),
                    (30, 16.0), (29, 15.0), (28, 14.0), (27, 13.0), (26, 12.0)
                ],
                "planchas": [
                    (38, 20.0), (37, 19.0), (36, 18.0), (35, 17.0),
                    (34, 16.0), (33, 15.0), (32, 14.0), (31, 13.0), (30, 12.0)
                ],
                "salto_largo": [
                    (2.40, 20.0), (2.30, 19.0), (2.20, 18.0), (2.10, 17.0),
                    (2.00, 16.0), (1.95, 15.0), (1.90, 14.0), (1.85, 13.0), (1.80, 12.0)
                ],
                "natacion_50m": [ # Segundos (menor es mejor)
                    (28, 20.0), (32, 19.0), (36, 18.0), (40, 17.0),
                    (44, 16.0), (48, 15.0), (52, 14.0), (56, 13.0), (60, 12.0)
                ],
                "carrera_1500m": [ # Segundos (menor es mejor)
                    (350, 20.0), (355, 19.0), (362, 18.0), (365, 17.0),
                    (370, 16.0), (375, 15.0), (380, 14.0), (385, 13.0), (390, 12.0)
                ]
            },
            "F": {
                "suspension": [ # Segundos sostenida en barra
                    (48, 20.0), (44, 19.0), (40, 18.0), (36, 17.0),
                    (34, 16.0), (32, 15.0), (30, 14.0), (28, 13.0), (26, 12.0)
                ],
                "abdominales": [
                    (30, 20.0), (29, 19.0), (28, 18.0), (27, 17.0),
                    (26, 16.0), (25, 15.0), (24, 14.0), (23, 13.0), (22, 12.0)
                ],
                "planchas": [
                    (23, 20.0), (22, 19.0), (21, 18.0), (20, 17.0),
                    (19, 16.0), (18, 15.0), (17, 14.0), (16, 13.0), (15, 12.0)
                ],
                "salto_largo": [
                    (1.90, 20.0), (1.80, 19.0), (1.70, 18.0), (1.60, 17.0),
                    (1.50, 16.0), (1.45, 15.0), (1.40, 14.0), (1.35, 13.0), (1.30, 12.0)
                ],
                "natacion_50m": [
                    (30, 20.0), (35, 19.0), (40, 18.0), (45, 17.0),
                    (50, 16.0), (55, 15.0), (60, 14.0), (65, 13.0), (70, 12.0)
                ],
                "carrera_1500m": [
                    (390, 20.0), (400, 19.0), (410, 18.0), (420, 17.0),
                    (430, 16.0), (440, 15.0), (450, 14.0), (455, 13.0), (460, 12.0)
                ]
            }
        },

        # POLICÍA NACIONAL DEL PERÚ (EO_PNP / EESTP_PNP) - Baremos oficiales PNP
        "PNP": {
            "M": {
                "barras": [
                    (14, 20.0), (13, 19.0), (12, 18.0), (11, 17.0),
                    (10, 16.0), (9, 15.0), (8, 14.0), (7, 13.0)
                ],
                "abdominales": [ # 1 minuto
                    (48, 20.0), (45, 19.0), (42, 18.0), (39, 17.0),
                    (36, 16.0), (33, 15.0), (30, 14.0), (27, 13.0)
                ],
                "planchas": [ # 1 minuto
                    (45, 20.0), (42, 19.0), (39, 18.0), (36, 17.0),
                    (33, 16.0), (30, 15.0), (27, 14.0), (24, 13.0)
                ],
                "carrera_1000m": [ # Segundos
                    (195, 20.0), (205, 19.0), (215, 18.0), (225, 17.0),
                    (235, 16.0), (245, 15.0), (255, 14.0), (265, 13.0)
                ],
                "natacion_25m": [ # Segundos
                    (15, 20.0), (17, 19.0), (19, 18.0), (21, 17.0),
                    (23, 16.0), (25, 15.0), (27, 14.0), (29, 13.0)
                ]
            },
            "F": {
                "suspension": [
                    (45, 20.0), (40, 19.0), (35, 18.0), (30, 17.0),
                    (27, 16.0), (24, 15.0), (21, 14.0), (18, 13.0)
                ],
                "abdominales": [ # 1 minuto
                    (40, 20.0), (37, 19.0), (34, 18.0), (31, 17.0),
                    (28, 16.0), (25, 15.0), (22, 14.0), (20, 13.0)
                ],
                "planchas": [
                    (32, 20.0), (29, 19.0), (26, 18.0), (23, 17.0),
                    (20, 16.0), (18, 15.0), (16, 14.0), (14, 13.0)
                ],
                "carrera_1000m": [ # Segundos
                    (235, 20.0), (245, 19.0), (255, 18.0), (265, 17.0),
                    (275, 16.0), (285, 15.0), (295, 14.0), (305, 13.0)
                ],
                "natacion_25m": [ # Segundos
                    (18, 20.0), (20, 19.0), (22, 18.0), (24, 17.0),
                    (26, 16.0), (28, 15.0), (30, 14.0), (32, 13.0)
                ]
            }
        },

        # FUERZA AÉREA (EOFAP / ESOFA)
        "FAP": {
            "M": {
                "barras": [
                    (16, 20.0), (14, 19.0), (12, 18.0), (10, 17.0),
                    (8, 16.0), (7, 15.0), (6, 14.0), (5, 13.0), (4, 12.0)
                ],
                "abdominales": [
                    (50, 20.0), (46, 19.0), (42, 18.0), (38, 17.0),
                    (35, 16.0), (32, 15.0), (29, 14.0), (26, 13.0), (24, 12.0)
                ],
                "planchas": [
                    (42, 20.0), (39, 19.0), (36, 18.0), (33, 17.0),
                    (30, 16.0), (27, 15.0), (24, 14.0), (22, 13.0), (20, 12.0)
                ],
                "salto_largo": [
                    (2.35, 20.0), (2.25, 19.0), (2.15, 18.0), (2.05, 17.0),
                    (1.95, 16.0), (1.90, 15.0), (1.85, 14.0), (1.80, 13.0), (1.75, 12.0)
                ],
                "natacion_50m": [
                    (30, 20.0), (34, 19.0), (38, 18.0), (42, 17.0),
                    (46, 16.0), (50, 15.0), (54, 14.0), (58, 13.0), (62, 12.0)
                ],
                "carrera_1500m": [
                    (345, 20.0), (355, 19.0), (365, 18.0), (375, 17.0),
                    (385, 16.0), (395, 15.0), (405, 14.0), (415, 13.0), (425, 12.0)
                ]
            },
            "F": {
                "suspension": [
                    (45, 20.0), (40, 19.0), (36, 18.0), (32, 17.0),
                    (28, 16.0), (25, 15.0), (23, 14.0), (21, 13.0), (19, 12.0)
                ],
                "abdominales": [
                    (42, 20.0), (39, 19.0), (36, 18.0), (33, 17.0),
                    (30, 16.0), (27, 15.0), (24, 14.0), (22, 13.0), (20, 12.0)
                ],
                "planchas": [
                    (28, 20.0), (26, 19.0), (24, 18.0), (22, 17.0),
                    (20, 16.0), (18, 15.0), (16, 14.0), (14, 13.0), (12, 12.0)
                ],
                "salto_largo": [
                    (1.85, 20.0), (1.75, 19.0), (1.65, 18.0), (1.55, 17.0),
                    (1.45, 16.0), (1.40, 15.0), (1.35, 14.0), (1.30, 13.0), (1.25, 12.0)
                ],
                "natacion_50m": [
                    (34, 20.0), (38, 19.0), (43, 18.0), (48, 17.0),
                    (53, 16.0), (58, 15.0), (63, 14.0), (68, 13.0), (73, 12.0)
                ],
                "carrera_1500m": [
                    (395, 20.0), (405, 19.0), (415, 18.0), (425, 17.0),
                    (435, 16.0), (445, 15.0), (455, 14.0), (465, 13.0), (475, 12.0)
                ]
            }
        },

        # EJÉRCITO DEL PERÚ (EMCH / ETE)
        "EJERCITO": {
            "M": {
                "barras": [
                    (16, 20.0), (14, 19.0), (12, 18.0), (10, 17.0),
                    (8, 16.0), (7, 15.0), (6, 14.0), (5, 13.0), (4, 12.0)
                ],
                "abdominales": [
                    (48, 20.0), (45, 19.0), (42, 18.0), (39, 17.0),
                    (36, 16.0), (33, 15.0), (30, 14.0), (27, 13.0), (25, 12.0)
                ],
                "planchas": [
                    (42, 20.0), (39, 19.0), (36, 18.0), (33, 17.0),
                    (30, 16.0), (27, 15.0), (24, 14.0), (22, 13.0), (20, 12.0)
                ],
                "salto_largo": [
                    (2.35, 20.0), (2.25, 19.0), (2.15, 18.0), (2.05, 17.0),
                    (1.95, 16.0), (1.90, 15.0), (1.85, 14.0), (1.80, 13.0), (1.75, 12.0)
                ],
                "natacion_50m": [
                    (30, 20.0), (34, 19.0), (38, 18.0), (42, 17.0),
                    (46, 16.0), (50, 15.0), (55, 14.0), (60, 13.0), (65, 12.0)
                ],
                "carrera_1500m": [
                    (350, 20.0), (360, 19.0), (370, 18.0), (380, 17.0),
                    (390, 16.0), (400, 15.0), (410, 14.0), (420, 13.0), (430, 12.0)
                ]
            },
            "F": {
                "suspension": [
                    (42, 20.0), (38, 19.0), (34, 18.0), (30, 17.0),
                    (27, 16.0), (24, 15.0), (21, 14.0), (19, 13.0), (17, 12.0)
                ],
                "abdominales": [
                    (40, 20.0), (37, 19.0), (34, 18.0), (31, 17.0),
                    (28, 16.0), (25, 15.0), (22, 14.0), (20, 13.0), (18, 12.0)
                ],
                "planchas": [
                    (26, 20.0), (24, 19.0), (22, 18.0), (20, 17.0),
                    (18, 16.0), (16, 15.0), (14, 14.0), (12, 13.0), (10, 12.0)
                ],
                "salto_largo": [
                    (1.80, 20.0), (1.70, 19.0), (1.60, 18.0), (1.50, 17.0),
                    (1.40, 16.0), (1.35, 15.0), (1.30, 14.0), (1.25, 13.0), (1.20, 12.0)
                ],
                "natacion_50m": [
                    (35, 20.0), (40, 19.0), (45, 18.0), (50, 17.0),
                    (55, 16.0), (60, 15.0), (65, 14.0), (70, 13.0), (75, 12.0)
                ],
                "carrera_1500m": [
                    (400, 20.0), (410, 19.0), (420, 18.0), (430, 17.0),
                    (440, 16.0), (450, 15.0), (460, 14.0), (470, 13.0), (480, 12.0)
                ]
            }
        }
    }

    @classmethod
    def _get_branch_key(cls, institution_id: str) -> str:
        inst = institution_id.upper()
        if "PNP" in inst:
            return "PNP"
        if "ENP" in inst or "CITEN" in inst or "NAV" in inst:
            return "ENP"
        if "FAP" in inst or "ESOFA" in inst:
            return "FAP"
        return "EJERCITO"

    @classmethod
    def evaluate_anthropometry(
        cls,
        institution_id: str,
        sex: str,
        height_m: float,
        weight_kg: float
    ) -> Dict[str, Any]:
        """
        Evalúa el Índice de Masa Corporal (IMC) y el cumplimiento de la talla mínima.
        """
        sex = "F" if str(sex).upper().startswith("F") else "M"
        req = cls.HEIGHT_REQUIREMENTS.get(institution_id, {"M": 1.65, "F": 1.55, "min_passing": 12.0})
        min_height = req.get(sex, 1.65)

        if height_m <= 0:
            height_m = 1.70

        bmi = round(weight_kg / (height_m ** 2), 2)
        height_ok = height_m >= min_height

        # Clasificación médica militar
        if bmi < 18.5:
            bmi_status = "BAJO PESO (OBSERVADO)"
            is_bmi_apt = False
            rec = "Incrementar masa muscular mediante plan hipercalórico y entrenamiento de fuerza."
        elif 18.5 <= bmi <= 24.9:
            bmi_status = "PESO NORMAL / IDEAL MILITAR"
            is_bmi_apt = True
            rec = "Excelente composición corporal para pruebas de esfuerzo y resistencia táctica."
        elif 25.0 <= bmi <= 27.5:
            bmi_status = "SOBREPESO LEVE (TOLERANCIA LÍMITE)"
            is_bmi_apt = True
            rec = "Se encuentra en el límite superior permitido por las juntas médicas. Se recomienda ajuste nutricional aeróbico."
        else:
            bmi_status = "SOBREPESO SEVERO / OBESIDAD (INAPTO)"
            is_bmi_apt = False
            rec = "Supera los límites establecidos en las tablas antropométricas de las FFAA y PNP."

        is_fully_apt = height_ok and is_bmi_apt

        return {
            "institution_id": institution_id,
            "sex": sex,
            "height_m": height_m,
            "min_height_m": min_height,
            "height_apt": height_ok,
            "weight_kg": weight_kg,
            "bmi": bmi,
            "bmi_status": bmi_status,
            "bmi_apt": is_bmi_apt,
            "final_anthropometric_verdict": "APTO" if is_fully_apt else "NO APTO",
            "recommendation": rec
        }

    @classmethod
    def grade_mark(
        cls,
        institution_id: str,
        sex: str,
        discipline: str,
        mark_value: float
    ) -> Dict[str, Any]:
        """
        Calcula la nota de 0 a 20 para una disciplina específica.
        - Para carrera / natación: menor tiempo es mejor.
        - Para repeticiones / saltos: mayor es mejor.
        """
        sex = "F" if str(sex).upper().startswith("F") else "M"
        branch = cls._get_branch_key(institution_id)
        baremo_branch = cls.BAREMOS.get(branch, cls.BAREMOS["EJERCITO"])
        baremo_sex = baremo_branch.get(sex, baremo_branch["M"])

        # Mapear nombres comunes
        disc_key = discipline.lower().strip()
        if "carrera" in disc_key:
            disc_key = "carrera_1000m" if branch == "PNP" else "carrera_1500m"
        elif "natac" in disc_key:
            disc_key = "natacion_25m" if branch == "PNP" else "natacion_50m"
        elif "barra" in disc_key and sex == "F":
            disc_key = "suspension"
        elif "suspen" in disc_key:
            disc_key = "suspension"

        table = baremo_sex.get(disc_key)
        if not table:
            # Fallback a tabla del Ejército si no se encuentra
            table = cls.BAREMOS["EJERCITO"][sex].get(disc_key, [])

        if not table:
            return {
                "discipline": discipline,
                "score": 0.0,
                "status": "NO EVALUADO",
                "is_passed": False
            }

        is_time_based = ("carrera" in disc_key) or ("natacion" in disc_key)

        score = 0.0
        disqualified = False

        if is_time_based:
            # En tiempos, la tabla está ordenada de menor tiempo a mayor
            # [(tiempo_max, nota), ...]
            matched = False
            for threshold, nota in table:
                if mark_value <= threshold:
                    score = nota
                    matched = True
                    break
            if not matched:
                score = 0.0
                disqualified = True
        else:
            # En repeticiones / distancia, mayor es mejor
            # [(rep_min, nota), ...] ordenada de mayor repetición a menor
            matched = False
            for threshold, nota in table:
                if mark_value >= threshold:
                    score = nota
                    matched = True
                    break
            if not matched:
                score = 0.0
                disqualified = True

        req = cls.HEIGHT_REQUIREMENTS.get(institution_id, {"min_passing": 12.0})
        min_passing = req.get("min_passing", 12.0)
        is_passed = score >= min_passing and not disqualified

        return {
            "discipline": disc_key,
            "mark_value": mark_value,
            "score": round(score, 1),
            "min_passing": min_passing,
            "is_passed": is_passed,
            "status": "APROBADO" if is_passed else ("DESCALIFICADO (POR DEBAJO DEL MÍNIMO)" if disqualified else "DESAPROBADO")
        }

    @classmethod
    def evaluate_full_battery(
        cls,
        institution_id: str,
        sex: str,
        marks: Dict[str, float],
        height_m: float,
        weight_kg: float
    ) -> Dict[str, Any]:
        """
        Evalúa el examen físico completo (antropometría + todas las disciplinas).
        Calcula el promedio general y el veredicto final institucional.
        """
        sex = "F" if str(sex).upper().startswith("F") else "M"
        anthro = cls.evaluate_anthropometry(institution_id, sex, height_m, weight_kg)

        branch = cls._get_branch_key(institution_id)
        req = cls.HEIGHT_REQUIREMENTS.get(institution_id, {"min_passing": 12.0})
        min_passing = req.get("min_passing", 12.0)

        # Determinar batería esperada
        if branch == "PNP":
            expected_tests = ["barras" if sex == "M" else "suspension", "abdominales", "carrera", "natacion"]
        else:
            expected_tests = ["barras" if sex == "M" else "suspension", "abdominales", "planchas", "salto_largo", "natacion", "carrera"]

        disciplines_results = []
        total_score = 0.0
        any_disqualified = False

        for test_name in expected_tests:
            val = marks.get(test_name, 0.0)
            res = cls.grade_mark(institution_id, sex, test_name, float(val))
            disciplines_results.append(res)
            total_score += res["score"]
            if not res["is_passed"]:
                any_disqualified = True

        num_tests = len(disciplines_results)
        average_score = round(total_score / num_tests, 2) if num_tests > 0 else 0.0

        is_physically_fit = (average_score >= min_passing) and not any_disqualified and (anthro["final_anthropometric_verdict"] == "APTO")

        if is_physically_fit:
            if average_score >= 17.0:
                final_verdict = "APTO DESTACADO (ALTO RENDIMIENTO)"
            else:
                final_verdict = "APTO CON RENDIMIENTO SATISFACTORIO"
        else:
            if anthro["final_anthropometric_verdict"] != "APTO":
                final_verdict = "INAPTO EN EVALUACIÓN ANTROPOMÉTRICA"
            elif any_disqualified:
                final_verdict = "ELIMINADO (PRUEBA FÍSICA INDIVIDUAL NO SUPERADA)"
            else:
                final_verdict = "INAPTO POR PROMEDIO INSUFICIENTE"

        return {
            "institution_id": institution_id,
            "branch": branch,
            "sex": sex,
            "anthropometry": anthro,
            "disciplines": disciplines_results,
            "summary": {
                "total_disciplines": num_tests,
                "average_score": average_score,
                "min_passing_required": min_passing,
                "is_passed": is_physically_fit,
                "verdict": final_verdict
            }
        }
