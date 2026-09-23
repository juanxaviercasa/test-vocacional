"""
Pruebas automatizadas del motor psicométrico y evaluador militar del Perú.
"""

import unittest
import sys
import os

# Asegurar importación del módulo engine
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from engine.ipip_engine import IpipMilitaryEngine
from engine.institutional_profiles import INSTITUTIONAL_PROFILES
from engine.profile_matcher import ProfileMatcher
from engine.report_generator import MilitaryReportGenerator


class TestMilitaryEngine(unittest.TestCase):

    def setUp(self):
        self.engine = IpipMilitaryEngine()

    def test_load_questions(self):
        """Verifica que los dos cuestionarios se carguen con la cantidad exacta de reactivos."""
        self.assertEqual(len(self.engine.questions_120), 120)
        self.assertEqual(len(self.engine.questions_50), 50)

    def test_scoring_120_items(self):
        """Evalúa un conjunto sintético de 120 respuestas y valida la estructura."""
        # Respuestas simuladas para un postulante disciplinado y sereno (5 en ítems positivos, 1 en negativos)
        simulated_answers = []
        for q in self.engine.questions_120:
            qid = q["id"]
            rev = q.get("reversed", False)
            dom = q["domain"]
            # Si es Neuroticismo, queremos que sea bajo (responder 1 si no es reversed, 5 si es reversed)
            if dom == "N":
                val = 5 if rev else 1
            else:
                val = 1 if rev else 5
            simulated_answers.append({"id_question": qid, "id_select": val})

        result = self.engine.compute_120(simulated_answers, sex="M", age=19)

        # Validaciones de estructura
        self.assertIn("domains", result)
        self.assertIn("facets", result)
        self.assertEqual(len(result["domains"]), 5)
        self.assertEqual(len(result["facets"]), 30)

        # Verificar que Neuroticismo sea bajo y Responsabilidad sea alta
        n_pct = result["domains"]["N"]["percentile"]
        c_pct = result["domains"]["C"]["percentile"]
        self.assertLessEqual(n_pct, 15)
        self.assertGreaterEqual(c_pct, 85)

        # Evaluar compatibilidad con la FAP
        matching = ProfileMatcher.match_all(result, target_institution_id="FAP")
        self.assertIn("target_institution", matching)
        self.assertIn("ranking", matching)

        fap_result = matching["target_institution"]
        # Debe tener alta afinidad con FAP y ninguna bandera roja crítica
        self.assertGreater(fap_result["overall_fit"], 75.0)
        self.assertFalse(fap_result["has_critical_red_flags"])

    def test_red_flag_detection(self):
        """Verifica que un postulante con alta ira o impulsividad active banderas rojas de descalificación."""
        simulated_answers = []
        for q in self.engine.questions_120:
            qid = q["id"]
            rev = q.get("reversed", False)
            f_key = q.get("facet_key")

            # Forzar máxima hostilidad/ira (facet 'anger') e impulsividad ('immoderation')
            if f_key in ["anger", "immoderation"]:
                val = 1 if rev else 5  # respuesta máxima
            else:
                val = 3  # neutro

            simulated_answers.append({"id_question": qid, "id_select": val})

        result = self.engine.compute_120(simulated_answers, sex="M", age=20)
        matching = ProfileMatcher.match_all(result, target_institution_id="PNP")
        pnp_result = matching["target_institution"]

        # Debe disparar alertas críticas de hostilidad o impulsividad
        self.assertTrue(pnp_result["has_critical_red_flags"])
        self.assertIn("NO RECOMENDADO / ALERTA CRÍTICA", pnp_result["verdict"])
        # El puntaje ajustado debe estar penalizado por la junta médica/psicológica
        self.assertLessEqual(pnp_result["overall_fit"], 48.0)

    def test_scoring_50_items(self):
        """Evalúa el test rápido de tamizaje de 50 preguntas."""
        answers_50 = {q["id"]: 4 for q in self.engine.questions_50}
        result = self.engine.compute_50(answers_50, sex="F", age=18)
        self.assertEqual(len(result["domains"]), 5)

        matching = ProfileMatcher.match_all(result, target_institution_id="ENM")
        self.assertIn("target_institution", matching)
        self.assertEqual(len(matching["ranking"]), 6)

    def test_report_generation(self):
        """Verifica la generación del informe completo con recomendaciones de entrevista."""
        answers_50 = {q["id"]: 3 for q in self.engine.questions_50}
        scoring = self.engine.compute_50(answers_50, sex="M", age=19)
        matching = ProfileMatcher.match_all(scoring, target_institution_id="EMCH")

        candidate = {
            "name": "Cadete Aspirante Juan Pérez",
            "dni": "74893210",
            "age": 19,
            "sex": "M",
            "postulating_to": "EMCH"
        }

        report = MilitaryReportGenerator.generate_full_report(candidate, scoring, matching)
        self.assertIn("verdict", report)
        self.assertIn("interview_preparation", report)
        self.assertGreater(len(report["interview_preparation"]["predicted_interview_questions"]), 0)


if __name__ == "__main__":
    unittest.main()
