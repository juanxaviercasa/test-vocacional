#!/usr/bin/env python3
"""
Motor de Generación y Calificación de Exámenes de Admisión para las Escuelas Militares del Perú.
Alineado con los prospectos oficiales de EMCH, ETE, ENP, CITEN, EOFAP, ESOFA, EO-PNP y EESTP-PNP.
"""

import os
import json
import random
from typing import Dict, List, Any, Optional

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
SYLLABI_PATH = os.path.join(DATA_DIR, "admission_syllabi.json")
QUESTIONS_PATH = os.path.join(DATA_DIR, "admission_questions.json")


class MilitaryExamEngine:
    """Motor que orquesta temarios, selección de preguntas ponderadas y calificación vigesimal."""

    def __init__(self):
        self.syllabi = self._load_json(SYLLABI_PATH).get("institutions", {})
        questions_raw = self._load_json(QUESTIONS_PATH)
        self.questions: List[Dict[str, Any]] = questions_raw.get("questions", [])
        self.questions_by_id = {q["id"]: q for q in self.questions}

    @staticmethod
    def _load_json(path: str) -> Dict[str, Any]:
        if not os.path.exists(path):
            return {}
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    def get_supported_institutions(self) -> List[Dict[str, Any]]:
        """Retorna la lista de instituciones disponibles con su información resumida."""
        res = []
        for inst_id, data in self.syllabi.items():
            res.append({
                "id": inst_id,
                "nombre": data.get("nombre"),
                "rama": data.get("rama"),
                "nivel": data.get("nivel"),
                "nota_minima": data.get("nota_minima_aprobatoria", 12.0),
                "duracion_oficial": data.get("duracion"),
                "titulo_civil": data.get("titulo_civil")
            })
        return res

    def get_syllabus(self, institution_id: str) -> Optional[Dict[str, Any]]:
        """Obtiene el temario y desglose de áreas de una institución específica."""
        return self.syllabi.get(institution_id)

    def generate_exam(
        self,
        institution_id: str,
        num_questions: int = 30,
        random_seed: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Genera un examen estructurado acorde a la escuela seleccionada.
        Oculta las respuestas correctas y explicaciones para el postulante.
        """
        if institution_id not in self.syllabi:
            institution_id = "EMCH"

        inst_info = self.syllabi[institution_id]
        rng = random.Random(random_seed) if random_seed is not None else random.Random()

        # Filtrar preguntas aplicables a esta institución
        candidates = [
            q for q in self.questions
            if institution_id in q.get("institutions", [])
        ]
        if len(candidates) < num_questions:
            # Fallback a todas las preguntas si el pool es menor
            candidates = list(self.questions)

        # Muestreo representativo barajado
        rng.shuffle(candidates)
        selected_questions = candidates[:num_questions]

        # Preparar versión para el estudiante (sin solución)
        client_questions = []
        for idx, q in enumerate(selected_questions, 1):
            q_data = {
                "number": idx,
                "id": q["id"],
                "subject": q.get("subject"),
                "subtopic": q.get("subtopic"),
                "question": q["question"],
                "options": q["options"]
            }
            if q.get("imagen_url"):
                q_data["imagen_url"] = q["imagen_url"]
            if q.get("imagen_alt"):
                q_data["imagen_alt"] = q["imagen_alt"]
            client_questions.append(q_data)

        # Tiempo proporcional (ej. 30 preguntas = 45 minutos; 100 preguntas = 180 min)
        time_minutes = int(round((num_questions / 100.0) * inst_info.get("tiempo_minutos", 180)))
        time_minutes = max(15, min(time_minutes, 180))

        return {
            "exam_id": f"EXAM-{institution_id}-{rng.randint(1000, 9999)}",
            "institution": {
                "id": institution_id,
                "nombre": inst_info.get("nombre"),
                "rama": inst_info.get("rama"),
                "nivel": inst_info.get("nivel"),
                "nota_minima": inst_info.get("nota_minima_aprobatoria", 12.0)
            },
            "config": {
                "total_questions": len(client_questions),
                "time_minutes": time_minutes,
                "penalty_per_wrong": 0.25,
                "points_per_correct": 1.0
            },
            "questions": client_questions
        }

    def evaluate_exam(
        self,
        institution_id: str,
        user_answers: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Califica las respuestas del postulante con baremo oficial militar:
        - Acierto: +1.0
        - Error: -0.25 de penalización
        - En blanco: 0.0
        Escalado a la escala vigesimal peruana (0.00 a 20.00).
        """
        inst_info = self.syllabi.get(institution_id, self.syllabi.get("EMCH", {}))
        min_passing = inst_info.get("nota_minima_aprobatoria", 12.0)

        total_evaluated = len(user_answers)
        if total_evaluated == 0:
            return {"error": "No se recibieron respuestas para evaluar"}

        correct_count = 0
        incorrect_count = 0
        blank_count = 0
        raw_score = 0.0

        subject_stats: Dict[str, Dict[str, int]] = {}
        review_details = []

        for q_id, ans_val in user_answers.items():
            question = self.questions_by_id.get(q_id)
            if not question:
                continue

            subj = question.get("subject", "general")
            if subj not in subject_stats:
                subject_stats[subj] = {"total": 0, "correct": 0, "incorrect": 0, "blank": 0}
            subject_stats[subj]["total"] += 1

            correct_idx = question["correct_index"]
            is_blank = ans_val is None or ans_val == -1 or ans_val == ""

            if is_blank:
                blank_count += 1
                subject_stats[subj]["blank"] += 1
                status = "BLANK"
            elif int(ans_val) == correct_idx:
                correct_count += 1
                raw_score += 1.0
                subject_stats[subj]["correct"] += 1
                status = "CORRECT"
            else:
                incorrect_count += 1
                raw_score -= 0.25
                subject_stats[subj]["incorrect"] += 1
                status = "INCORRECT"

            review_details.append({
                "id": q_id,
                "subject": subj,
                "subtopic": question.get("subtopic"),
                "question": question["question"],
                "options": question["options"],
                "user_answer": None if is_blank else int(ans_val),
                "correct_answer": correct_idx,
                "status": status,
                "explanation": question.get("explanation", "")
            })

        # Evitar puntaje bruto negativo
        raw_score = max(0.0, raw_score)
        num_questions = len(review_details)

        # Escalar a escala vigesimal (0.00 - 20.00)
        max_possible_raw = float(num_questions)
        vigesimal_score = round((raw_score / max_possible_raw) * 20.0, 2) if max_possible_raw > 0 else 0.0

        is_passed = vigesimal_score >= min_passing

        # Diagnóstico por materias
        areas_feedback = []
        for s_key, s_data in subject_stats.items():
            acc = round((s_data["correct"] / s_data["total"]) * 100, 1) if s_data["total"] > 0 else 0.0
            areas_feedback.append({
                "subject": s_key,
                "accuracy_pct": acc,
                "correct": s_data["correct"],
                "total": s_data["total"],
                "status": "ÓPTIMO" if acc >= 70 else ("REGULAR" if acc >= 50 else "CRÍTICO - REFORZAR")
            })

        return {
            "institution": {
                "id": institution_id,
                "nombre": inst_info.get("nombre"),
                "nota_minima_aprobatoria": min_passing
            },
            "summary": {
                "total_questions": num_questions,
                "correct": correct_count,
                "incorrect": incorrect_count,
                "blank": blank_count,
                "raw_score": round(raw_score, 2),
                "vigesimal_score": vigesimal_score,
                "is_passed": is_passed,
                "verdict": "APTO EN CONOCIMIENTOS" if is_passed else "INAPTO EN CONOCIMIENTOS",
                "percentage": round((correct_count / num_questions) * 100, 1) if num_questions > 0 else 0.0
            },
            "areas_feedback": sorted(areas_feedback, key=lambda x: x["accuracy_pct"], reverse=True),
            "review": review_details
        }
