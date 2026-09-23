#!/usr/bin/env python3
"""
Pruebas unitarias y de integración para el Sistema Integral de Admisión Militar del Perú.
Verifica:
1. Motor de Exámenes (MilitaryExamEngine)
2. Motor de Calificación Física y Antropometría (MilitaryPhysicalScoringEngine)
3. Endpoints HTTP y APIs REST en run_server
"""

import unittest
import json
import threading
import time
import urllib.request
import urllib.parse
from http.server import HTTPServer

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from engine.exam_generator import MilitaryExamEngine
from engine.physical_scoring import MilitaryPhysicalScoringEngine
from run_server import MilitaryHttpHandler


class TestAdmissionSystem(unittest.TestCase):

    def setUp(self):
        self.exam_engine = MilitaryExamEngine()
        self.phys_engine = MilitaryPhysicalScoringEngine()

    def test_institutions_count_and_data(self):
        """Verifica que las 8 escuelas matrices estén debidamente configuradas."""
        insts = self.exam_engine.get_supported_institutions()
        self.assertEqual(len(insts), 8)
        ids = {i["id"] for i in insts}
        expected = {"EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO_PNP", "EESTP_PNP"}
        self.assertEqual(ids, expected)

    def test_exam_generation_and_evaluation(self):
        """Verifica la generación de examen y la calificación vigesimal."""
        exam = self.exam_engine.generate_exam("EMCH", num_questions=15, random_seed=123)
        self.assertEqual(len(exam["questions"]), 15)
        self.assertIn("EXAM-EMCH", exam["exam_id"])

        # Verificar que no se filtren las respuestas al cliente
        for q in exam["questions"]:
            self.assertNotIn("correct_index", q)
            self.assertNotIn("explanation", q)

        # Calificar respuestas simuladas
        q_first = exam["questions"][0]
        answers = {q["id"]: 0 for q in exam["questions"]}
        eval_res = self.exam_engine.evaluate_exam("EMCH", answers)

        self.assertIn("summary", eval_res)
        self.assertIn("vigesimal_score", eval_res["summary"])
        self.assertIn("verdict", eval_res["summary"])
        self.assertEqual(len(eval_res["review"]), 15)

    def test_anthropometry_and_physical_scoring(self):
        """Verifica los baremos antropométricos y físicos oficiales."""
        # 1. Talla varón ENP (Mínimo 1.68m)
        ant_ok = self.phys_engine.evaluate_anthropometry("ENP", "M", 1.72, 68.0)
        self.assertEqual(ant_ok["final_anthropometric_verdict"], "APTO")

        ant_fail = self.phys_engine.evaluate_anthropometry("ENP", "M", 1.64, 65.0)
        self.assertEqual(ant_fail["final_anthropometric_verdict"], "NO APTO")
        self.assertFalse(ant_fail["height_apt"])

        # 2. Batería completa ENP
        marks = {
            "barras": 16,        # 19.0
            "abdominales": 34,   # 20.0
            "planchas": 38,      # 20.0
            "salto_largo": 2.30, # 19.0
            "natacion": 30.0,    # 19.0
            "carrera": 355.0     # 19.0
        }
        res = self.phys_engine.evaluate_full_battery("ENP", "M", marks, 1.74, 70.0)
        self.assertTrue(res["summary"]["is_passed"])
        self.assertGreaterEqual(res["summary"]["average_score"], 19.0)

    def test_pnp_physical_battery(self):
        """Verifica los baremos específicos de la Policía Nacional (EO_PNP)."""
        marks_pnp = {
            "barras": 14,       # 20.0
            "abdominales": 48,  # 20.0
            "carrera": 195.0,   # 20.0
            "natacion": 15.0    # 20.0
        }
        res_pnp = self.phys_engine.evaluate_full_battery("EO_PNP", "M", marks_pnp, 1.75, 72.0)
        self.assertTrue(res_pnp["summary"]["is_passed"])
        self.assertEqual(res_pnp["summary"]["average_score"], 20.0)
        self.assertEqual(res_pnp["summary"]["verdict"], "APTO DESTACADO (ALTO RENDIMIENTO)")


class TestHttpServerApis(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.port = 8765
        cls.server = HTTPServer(("127.0.0.1", cls.port), MilitaryHttpHandler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        time.sleep(0.5)

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()

    def test_api_institutions(self):
        url = f"http://127.0.0.1:{self.port}/api/institutions"
        req = urllib.request.urlopen(url)
        self.assertEqual(req.status, 200)
        data = json.loads(req.read().decode("utf-8"))
        self.assertIn("institutions", data)
        self.assertEqual(len(data["institutions"]), 8)

    def test_api_exam_generate_and_evaluate(self):
        # 1. Generar examen
        url_gen = f"http://127.0.0.1:{self.port}/api/exam/generate?institution=EOFAP&questions=10"
        req_gen = urllib.request.urlopen(url_gen)
        self.assertEqual(req_gen.status, 200)
        exam = json.loads(req_gen.read().decode("utf-8"))
        self.assertEqual(len(exam["questions"]), 10)

        # 2. Calificar examen
        url_eval = f"http://127.0.0.1:{self.port}/api/exam/evaluate"
        payload = json.dumps({
            "institution_id": "EOFAP",
            "answers": {q["id"]: 1 for q in exam["questions"]}
        }).encode("utf-8")
        req_eval = urllib.request.Request(url_eval, data=payload, headers={"Content-Type": "application/json"})
        resp_eval = urllib.request.urlopen(req_eval)
        self.assertEqual(resp_eval.status, 200)
        eval_data = json.loads(resp_eval.read().decode("utf-8"))
        self.assertIn("vigesimal_score", eval_data["summary"])

    def test_api_physical_evaluate(self):
        url = f"http://127.0.0.1:{self.port}/api/physical/evaluate"
        payload = json.dumps({
            "institution_id": "EMCH",
            "sex": "M",
            "height_m": 1.75,
            "weight_kg": 70.0,
            "marks": {
                "barras": 12,
                "abdominales": 42,
                "planchas": 36,
                "salto_largo": 2.15,
                "natacion": 38.0,
                "carrera": 370.0
            }
        }).encode("utf-8")
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        resp = urllib.request.urlopen(req)
        self.assertEqual(resp.status, 200)
        data = json.loads(resp.read().decode("utf-8"))
        self.assertTrue(data["summary"]["is_passed"])

    def test_api_consolidated_evaluate(self):
        url = f"http://127.0.0.1:{self.port}/api/consolidated/evaluate"
        payload = json.dumps({
            "candidate": {"name": "Carlos Mendoza"},
            "institution_id": "EMCH",
            "knowledge_score": 16.5,
            "knowledge_apt": True,
            "physical_score": 17.0,
            "physical_apt": True,
            "anthropometric_apt": True,
            "psychometric_score": 88.0,
            "psychometric_apt": True
        }).encode("utf-8")
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        resp = urllib.request.urlopen(req)
        self.assertEqual(resp.status, 200)
        data = json.loads(resp.read().decode("utf-8"))
        self.assertIn("APTO DESTACADO", data["verdict"])
        self.assertGreater(data["scores"]["final_composite"]["vigesimal"], 16.0)


if __name__ == "__main__":
    unittest.main()
