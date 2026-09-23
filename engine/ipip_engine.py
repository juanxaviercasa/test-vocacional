"""
Motor psicométrico IPIP-NEO militar y vocacional.
Adaptado de five-factor-e (John A. Johnson / Lewis Goldberg / Ederson Corbari).
"""

from __future__ import annotations
import json
import os
import math
from typing import Dict, List, Any, Optional, Tuple


class IpipMilitaryEngine:
    """Motor de cálculo psicométrico para IPIP-NEO-120 e IPIP-50 en español."""

    CUBIC_C1 = 210.335958661391
    CUBIC_C2 = 16.7379362643389
    CUBIC_C3 = 0.405936512733332
    CUBIC_C4 = 0.00270624341822222

    # Baremos psicométricos IPIP-NEO-120
    # Medias y Desviaciones Estándar por dominio para Jóvenes (16-20 años) y Adultos (21+)
    # Formato: (Mean_N, Mean_E, Mean_O, Mean_A, Mean_C, SD_N, SD_E, SD_O, SD_A, SD_C)
    NORMS_DOMAINS_120 = {
        "M": {
            "youth": {"mean": {"N": 67.84, "E": 80.70, "O": 85.98, "A": 81.98, "C": 79.66},
                      "sd":   {"N": 15.83, "E": 15.37, "O": 12.37, "A": 14.66, "C": 14.49}},
            "adult": {"mean": {"N": 60.50, "E": 77.20, "O": 83.40, "A": 82.50, "C": 83.10},
                      "sd":   {"N": 16.10, "E": 15.80, "O": 13.10, "A": 14.20, "C": 14.30}}
        },
        "F": {
            "youth": {"mean": {"N": 74.67, "E": 84.18, "O": 86.82, "A": 88.06, "C": 81.18},
                      "sd":   {"N": 16.63, "E": 15.75, "O": 12.01, "A": 13.57, "C": 14.50}},
            "adult": {"mean": {"N": 66.80, "E": 80.50, "O": 84.20, "A": 89.10, "C": 85.40},
                      "sd":   {"N": 17.20, "E": 15.90, "O": 12.50, "A": 13.00, "C": 14.20}}
        }
    }

    # Baremos aproximados de facetas (4 ítems por faceta, rango 4-20)
    # Media promedio ~13.5, SD ~3.5
    FACET_NORMS_DEFAULT = {"mean": 13.5, "sd": 3.6}

    def __init__(self, data_dir: Optional[str] = None):
        if data_dir is None:
            data_dir = os.path.join(os.path.dirname(__file__), "data")
        self.data_dir = data_dir
        self._load_questions()

    def _load_questions(self):
        p120 = os.path.join(self.data_dir, "questions_120_es.json")
        p50 = os.path.join(self.data_dir, "questions_50_es.json")
        with open(p120, encoding="utf-8") as f:
            self.questions_120 = json.load(f)
        with open(p50, encoding="utf-8") as f:
            self.questions_50 = json.load(f)

    @classmethod
    def t_to_percentile(cls, t_score: float) -> int:
        """Convierte puntaje T a percentil (1-99) usando aproximación cúbica empírica."""
        if t_score <= 32:
            return 1
        if t_score >= 73:
            return 99
        pct = (
            cls.CUBIC_C1
            - (cls.CUBIC_C2 * t_score)
            + (cls.CUBIC_C3 * (t_score**2))
            - (cls.CUBIC_C4 * (t_score**3))
        )
        return max(1, min(99, int(round(pct))))

    @staticmethod
    def classify_level(t_score: float) -> str:
        """Clasifica en Bajo, Promedio o Alto según normas estandarizadas."""
        if t_score < 45:
            return "Bajo"
        if t_score > 55:
            return "Alto"
        return "Promedio"

    def compute_120(
        self,
        answers: List[Dict[str, int]] | Dict[int, int],
        sex: str = "M",
        age: int = 19
    ) -> Dict[str, Any]:
        """
        Calcula resultados completos para el test IPIP-NEO de 120 preguntas.
        answers: lista de {'id_question': X, 'id_select': 1..5} o diccionario {id: select}
        """
        # Normalizar formato de answers
        ans_map: Dict[int, int] = {}
        if isinstance(answers, list):
            for a in answers:
                qid = a.get("id_question", a.get("id"))
                val = a.get("id_select", a.get("score"))
                if qid is not None and val is not None:
                    ans_map[int(qid)] = int(val)
        elif isinstance(answers, dict):
            ans_map = {int(k): int(v) for k, v in answers.items()}

        q_dict = {q["id"]: q for q in self.questions_120}

        # Inicializar acumuladores
        facet_scores: Dict[str, float] = {}
        facet_meta: Dict[str, Dict[str, Any]] = {}
        domain_raw: Dict[str, float] = {"N": 0.0, "E": 0.0, "O": 0.0, "A": 0.0, "C": 0.0}

        # Calcular puntuaciones por ítem
        for q in self.questions_120:
            qid = q["id"]
            user_val = ans_map.get(qid, 3)  # default valor medio si faltase
            # Inversión de reactivo
            item_score = (6 - user_val) if q.get("reversed", False) else user_val
            
            f_key = q["facet_key"]
            if f_key not in facet_scores:
                facet_scores[f_key] = 0.0
                facet_meta[f_key] = {
                    "domain": q["domain"],
                    "facet_number": q["facet_number"],
                    "facet_name": q["facet_name"],
                    "facet_description": q["facet_description"]
                }
            facet_scores[f_key] += item_score
            domain_raw[q["domain"]] += item_score

        # Determinar baremo según sexo y edad
        s = "M" if sex.upper() != "F" else "F"
        age_group = "youth" if age < 21 else "adult"
        norm_group = self.NORMS_DOMAINS_120[s][age_group]

        # Calcular T-Scores y Percentiles para Dominios
        domains_result: Dict[str, Dict[str, Any]] = {}
        domain_names = {
            "N": "Neuroticismo (Inestabilidad Emocional)",
            "E": "Extraversión (Energía y Mando)",
            "O": "Apertura (Intelecto y Adaptabilidad)",
            "A": "Amabilidad (Ética y Prosocialidad)",
            "C": "Responsabilidad (Disciplina y Deber)"
        }

        for dom in ["N", "E", "O", "A", "C"]:
            raw = domain_raw[dom]
            mean = norm_group["mean"][dom]
            sd = norm_group["sd"][dom]
            t_score = (10.0 * (raw - mean) / sd) + 50.0
            pct = self.t_to_percentile(t_score)
            level = self.classify_level(t_score)

            domains_result[dom] = {
                "domain_code": dom,
                "name": domain_names[dom],
                "raw_score": round(raw, 2),
                "t_score": round(t_score, 2),
                "percentile": pct,
                "level": level
            }

        # Calcular T-Scores y Percentiles para las 30 Facetas
        facets_result: Dict[str, Dict[str, Any]] = {}
        for f_key, raw_val in facet_scores.items():
            meta = facet_meta[f_key]
            # Faceta: 4 ítems, rango 4 a 20, media ~13.5, sd ~3.6
            f_mean = self.FACET_NORMS_DEFAULT["mean"]
            f_sd = self.FACET_NORMS_DEFAULT["sd"]
            t_f = (10.0 * (raw_val - f_mean) / f_sd) + 50.0
            pct_f = self.t_to_percentile(t_f)
            level_f = self.classify_level(t_f)

            facets_result[f_key] = {
                "key": f_key,
                "domain": meta["domain"],
                "facet_number": meta["facet_number"],
                "name": meta["facet_name"],
                "description": meta["facet_description"],
                "raw_score": round(raw_val, 2),
                "t_score": round(t_f, 2),
                "percentile": pct_f,
                "level": level_f
            }

        return {
            "test_type": "IPIP-NEO-120",
            "items_answered": len(ans_map),
            "candidate": {"sex": s, "age": age},
            "domains": domains_result,
            "facets": facets_result
        }

    def compute_50(
        self,
        answers: List[Dict[str, int]] | Dict[int, int],
        sex: str = "M",
        age: int = 19
    ) -> Dict[str, Any]:
        """Calcula resultados abreviados para el test de 50 preguntas."""
        ans_map: Dict[int, int] = {}
        if isinstance(answers, list):
            for a in answers:
                qid = a.get("id_question", a.get("id"))
                val = a.get("id_select", a.get("score"))
                if qid is not None and val is not None:
                    ans_map[int(qid)] = int(val)
        elif isinstance(answers, dict):
            ans_map = {int(k): int(v) for k, v in answers.items()}

        domain_raw: Dict[str, float] = {"N": 0.0, "E": 0.0, "O": 0.0, "A": 0.0, "C": 0.0}

        for q in self.questions_50:
            qid = q["id"]
            user_val = ans_map.get(qid, 3)
            item_score = (6 - user_val) if q.get("reversed", False) else user_val
            domain_raw[q["domain"]] += item_score

        # Normas estimadas para escala de 50 ítems (10 ítems por dominio, rango 10-50, media ~31, sd ~6.5)
        domains_result: Dict[str, Dict[str, Any]] = {}
        domain_names = {
            "N": "Neuroticismo (Inestabilidad Emocional)",
            "E": "Extraversión (Energía y Mando)",
            "O": "Apertura (Intelecto y Adaptabilidad)",
            "A": "Amabilidad (Ética y Prosocialidad)",
            "C": "Responsabilidad (Disciplina y Deber)"
        }

        for dom in ["N", "E", "O", "A", "C"]:
            raw = domain_raw[dom]
            mean = 31.5
            sd = 6.8
            t_score = (10.0 * (raw - mean) / sd) + 50.0
            pct = self.t_to_percentile(t_score)
            level = self.classify_level(t_score)

            domains_result[dom] = {
                "domain_code": dom,
                "name": domain_names[dom],
                "raw_score": round(raw, 2),
                "t_score": round(t_score, 2),
                "percentile": pct,
                "level": level
            }

        return {
            "test_type": "IPIP-50-SCREENING",
            "items_answered": len(ans_map),
            "candidate": {"sex": sex, "age": age},
            "domains": domains_result,
            "facets": {}
        }
