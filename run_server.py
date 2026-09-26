#!/usr/bin/env python3
"""
Servidor local para el Sistema Integral de Admisión y Evaluación Militar del Perú.
Sirve la plataforma web interactiva y expone APIs REST para:
  - /api/evaluate: Evaluación psicométrica IPIP-NEO y matching institucional.
  - /api/institutions: Catálogo de las 8 escuelas con temarios, costos y requisitos.
  - /api/exam/generate: Generador de exámenes de admisión por institución.
  - /api/exam/evaluate: Calificador vigesimal de conocimientos con penalización y feedback.
  - /api/physical/evaluate: Calificador de esfuerzo físico y antropometría militar.
  - /api/consolidated/evaluate: Dictamen integral de admisión militar y cálculo de probabilidad.
"""

import sys
import os
import json
import urllib.parse
import time
import random
import shutil
import re
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from typing import Dict, Any, List, Optional

# Agregar directorio actual al sys.path para importar engine
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

from engine.ipip_engine import IpipMilitaryEngine
from engine.profile_matcher import ProfileMatcher
from engine.report_generator import MilitaryReportGenerator
from engine.exam_generator import MilitaryExamEngine
from engine.physical_scoring import MilitaryPhysicalScoringEngine
from engine.vocational_engine import VOCATIONAL_ENGINE, ESCUELAS_INFO
from engine.db_storage import DB_MANAGER, generate_native_qr_svg

# Inicializar motores
ENGINE = IpipMilitaryEngine()
EXAM_ENGINE = MilitaryExamEngine()
PHYSICAL_ENGINE = MilitaryPhysicalScoringEngine()
WEB_DIR = os.path.join(CURRENT_DIR, "web_platform")

# Almacenes en memoria para sesiones activas
VOCATIONAL_SESSIONS: Dict[str, Any] = {}
MOCK_100_SESSIONS: Dict[str, Any] = {}


class MilitaryHttpHandler(SimpleHTTPRequestHandler):
    """Manejador HTTP con soporte de archivos estáticos y APIs completas de admisión."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_DIR, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def _send_json_response(self, data: Any, status: int = 200):
        try:
            response_data = json.dumps(data, ensure_ascii=False).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(response_data)))
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.end_headers()
            self.wfile.write(response_data)
        except Exception as e:
            print(f"[ERROR] Error al enviar respuesta JSON: {e}")

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query = urllib.parse.parse_qs(parsed_url.query)

        if path == "/" or path == "/index.html":
            self.send_response(302)
            self.send_header("Location", "/react_app/")
            self.end_headers()
            return

        # Redirección inteligente de rutas cliente (SPA)
        spa_routes = ["/entrenamiento", "/glosario", "/transparencia"]
        clean_path = path.rstrip("/")
        if clean_path in spa_routes:
            self.send_response(302)
            self.send_header("Location", f"/react_app/#{clean_path}")
            self.end_headers()
            return

        if path.startswith("/react_app/") and path not in ["/react_app/", "/react_app/index.html"]:
            sub = path.replace("/react_app", "").rstrip("/")
            if sub in spa_routes:
                self.send_response(302)
                self.send_header("Location", f"/react_app/#{sub}")
                self.end_headers()
                return

        if path == "/api/institutions":
            insts = EXAM_ENGINE.get_supported_institutions()
            self._send_json_response({"institutions": insts})
            return

        if path.startswith("/api/data/") or path.startswith("/data/"):
            fname = os.path.basename(path)
            if not fname.endswith(".json"):
                fname += ".json"
            possible_paths = [
                os.path.join(CURRENT_DIR, fname),
                os.path.join(CURRENT_DIR, "web_platform", "data", fname)
            ]
            for p in possible_paths:
                if os.path.exists(p):
                    with open(p, "r", encoding="utf-8") as f:
                        file_data = json.load(f)
                    self._send_json_response(file_data)
                    return
            self._send_json_response({"error": f"Archivo {fname} no encontrado"}, status=404)
            return

        if path == "/api/vocational/institutions":
            self._send_json_response({"institutions": list(ESCUELAS_INFO.values())})
            return

        if path == "/api/vocational/verify":
            code = query.get("code", [""])[0]
            record = DB_MANAGER.verify_assessment(code)
            if record:
                self._send_json_response(record)
            else:
                self._send_json_response({"error": "Código no encontrado o no válido", "es_autentico": False}, status=404)
            return

        if path == "/api/vocational/qr":
            code = query.get("code", ["VOC-2026"])[0]
            url = f"http://localhost:8080/api/vocational/verify?code={code}"
            svg = generate_native_qr_svg(url, size=180)
            self.send_response(200)
            self.send_header("Content-Type", "image/svg+xml; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(svg.encode("utf-8"))
            return

        if path == "/api/vocational/mock-100":
            school_id = query.get("school", ["EMCH"])[0]
            mock_data = VOCATIONAL_ENGINE.generate_school_100_mock_exam(school_id)
            session_id = f"m100_{int(time.time()*1000)}_{random.randint(1000, 9999)}"
            MOCK_100_SESSIONS[session_id] = {
                "school_id": school_id,
                "answer_key": mock_data["answer_key"]
            }
            self._send_json_response({
                "session_id": session_id,
                "institucion": mock_data["institucion"],
                "total_preguntas": mock_data["total_preguntas"],
                "duracion_minutos": mock_data["duracion_minutos"],
                "preguntas": mock_data["preguntas"]
            })
            return

        if path == "/api/exam/generate":
            inst_id = query.get("institution", ["EMCH"])[0]
            num_q = int(query.get("questions", ["30"])[0])
            num_q = max(5, min(num_q, 100))
            exam = EXAM_ENGINE.generate_exam(inst_id, num_questions=num_q)
            self._send_json_response(exam)
            return

        if path.startswith("/api/syllabus/"):
            inst_id = path.split("/")[-1].upper()
            syl = EXAM_ENGINE.get_syllabus(inst_id)
            if syl:
                self._send_json_response(syl)
            else:
                self._send_json_response({"error": "Institución no encontrada"}, status=404)
            return

        # Servidor dedicado de audios institucionales con soporte Range (bytes)
        if path.startswith("/audio/") or path.startswith("/react_app/audio/"):
            fname = os.path.basename(path)
            candidate_paths = [
                os.path.join(CURRENT_DIR, "audio", fname),
                os.path.join(CURRENT_DIR, "public", "audio", fname),
                os.path.join(CURRENT_DIR, "web_platform", "audio", fname),
                os.path.join(CURRENT_DIR, "web_platform", "react_app", "audio", fname),
                os.path.join(CURRENT_DIR, "react_app", "public", "audio", fname),
            ]
            target_file = None
            for cp in candidate_paths:
                if os.path.exists(cp):
                    target_file = cp
                    break

            if not target_file:
                self.send_error(404, f"Archivo de audio {fname} no localizado")
                return

            file_size = os.path.getsize(target_file)
            range_header = self.headers.get("Range")

            if range_header:
                match = re.match(r"bytes=(\d+)-(\d*)", range_header)
                if match:
                    start = int(match.group(1))
                    end = int(match.group(2)) if match.group(2) else file_size - 1
                    end = min(end, file_size - 1)
                    length = end - start + 1

                    self.send_response(206)
                    self.send_header("Content-Type", "audio/mpeg")
                    self.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
                    self.send_header("Content-Length", str(length))
                    self.send_header("Accept-Ranges", "bytes")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()

                    with open(target_file, "rb") as f:
                        f.seek(start)
                        self.wfile.write(f.read(length))
                    return

            self.send_response(200)
            self.send_header("Content-Type", "audio/mpeg")
            self.send_header("Content-Length", str(file_size))
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            with open(target_file, "rb") as f:
                shutil.copyfileobj(f, self.wfile)
            return

        # Servir archivos estáticos por defecto
        super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")
            payload = json.loads(body) if body else {}
        except Exception as e:
            self._send_json_response({"error": f"Error al procesar payload JSON: {str(e)}"}, status=400)
            return

        if path == "/api/vocational/init":
            self.handle_api_vocational_init(payload)
        elif path == "/api/vocational/evaluate":
            self.handle_api_vocational_evaluate(payload)
        elif path == "/api/vocational/mock-100/evaluate":
            self.handle_api_mock_100_evaluate(payload)
        elif path == "/api/evaluate":
            self.handle_api_evaluate(payload)
        elif path == "/api/exam/evaluate":
            self.handle_api_exam_evaluate(payload)
        elif path == "/api/physical/evaluate":
            self.handle_api_physical_evaluate(payload)
        elif path == "/api/consolidated/evaluate":
            self.handle_api_consolidated_evaluate(payload)
        else:
            self.send_error(404, "Endpoint no encontrado")

    def handle_api_vocational_init(self, payload: Dict[str, Any]):
        """Inicializa la prueba vocacional con los pilares integrales:
        - Evalúa datos básicos y médicos contra el Pilar 1.
        - Extrae 15 Big Five + 3 Escala L + 2 Banderas Clínicas + 10 P3 + 20 P4 + 6 Cognitivos Superiores.
        """
        try:
            candidate = payload.get("candidate", {})
            legal_eval = VOCATIONAL_ENGINE.evaluate_pilar1_legal_filter(candidate)
            battery = VOCATIONAL_ENGINE.generate_random_test_battery()
            session_id = f"voc_{int(time.time()*1000)}_{random.randint(1000, 9999)}"
            VOCATIONAL_SESSIONS[session_id] = {
                "candidate": candidate,
                "legal_eval": legal_eval,
                "validity_ids": battery.get("validity_ids", []),
                "clinical_ids": battery.get("clinical_ids", []),
                "answer_key_p4": battery.get("pilar4_answer_key", {}),
                "answer_key_cognitive": battery.get("cognitive_answer_key", {})
            }
            self._send_json_response({
                "session_id": session_id,
                "legal_evaluation": legal_eval,
                "pilar2_questions": battery["pilar2_psicometria"],
                "pilar3_dilemmas": battery["pilar3_intereses"],
                "pilar4_questions": battery["pilar4_conocimientos"],
                "pilar_cognitivo": battery.get("pilar_cognitivo", [])
            })
        except Exception as e:
            self._send_json_response({"error": str(e)}, status=500)

    def handle_api_vocational_evaluate(self, payload: Dict[str, Any]):
        """Consolida matemáticamente el Diagnóstico Integral 360°:
        Antropometría + Físico 0-20 + Raven/Bennett + Big Five + Escala L + Banderas Rojas + Intereses + Conocimientos.
        """
        try:
            session_id = payload.get("session_id", "")
            session_data = VOCATIONAL_SESSIONS.get(session_id, {})
            candidate = payload.get("candidate") or session_data.get("candidate", {})
            answer_key = session_data.get("answer_key_p4") or payload.get("answer_key_p4", {})
            validity_ids = session_data.get("validity_ids") or payload.get("validity_ids", [])
            clinical_ids = session_data.get("clinical_ids") or payload.get("clinical_ids", [])
            answer_key_cognitive = session_data.get("answer_key_cognitive") or payload.get("answer_key_cognitive", {})

            answers_p2 = payload.get("answers_p2", {})
            answers_p3 = payload.get("answers_p3", {})
            answers_p4 = payload.get("answers_p4", {})
            answers_cognitive = payload.get("answers_cognitive", {})
            times_cognitive = payload.get("times_cognitive", {})
            physical_marks = payload.get("physical_marks", {})

            verdict = VOCATIONAL_ENGINE.evaluate_full_battery(
                candidate_data=candidate,
                answers_p2=answers_p2,
                answers_p3=answers_p3,
                answers_p4=answers_p4,
                answer_key_p4=answer_key,
                validity_ids=validity_ids,
                clinical_ids=clinical_ids,
                answers_cognitive=answers_cognitive,
                answer_key_cognitive=answer_key_cognitive,
                times_cognitive=times_cognitive,
                physical_marks=physical_marks
            )
            self._send_json_response(verdict)
        except Exception as e:
            self._send_json_response({"error": str(e)}, status=500)

    def handle_api_mock_100_evaluate(self, payload: Dict[str, Any]):
        """Califica simulacro masivo de 100 preguntas con penalización -0.25 oficial."""
        try:
            session_id = payload.get("session_id", "")
            sess = MOCK_100_SESSIONS.get(session_id, {})
            school_id = sess.get("school_id") or payload.get("school_id", "EMCH")
            answer_key = sess.get("answer_key") or payload.get("answer_key", {})
            candidate_name = payload.get("candidate_name", "Postulante")
            answers = payload.get("answers", {})

            result = VOCATIONAL_ENGINE.evaluate_school_100_mock_exam(
                school_id=school_id,
                candidate_name=candidate_name,
                answers=answers,
                answer_key=answer_key
            )
            self._send_json_response(result)
        except Exception as e:
            self._send_json_response({"error": str(e)}, status=500)

    def handle_api_evaluate(self, payload: Dict[str, Any]):
        """Evaluación Psicométrica IPIP-NEO."""
        try:
            candidate = payload.get("candidate", {})
            answers = payload.get("answers", {})
            mode = candidate.get("mode", "120")
            sex = candidate.get("sex", "M")
            age = int(candidate.get("age", 19))
            target_inst = candidate.get("target_institution", "FAP")

            if mode == "50":
                scoring = ENGINE.compute_50(answers, sex=sex, age=age)
            else:
                scoring = ENGINE.compute_120(answers, sex=sex, age=age)

            matching = ProfileMatcher.match_all(scoring, target_institution_id=target_inst)
            report = MilitaryReportGenerator.generate_full_report(candidate, scoring, matching)
            self._send_json_response(report)
        except Exception as e:
            self._send_json_response({"error": str(e)}, status=500)

    def handle_api_exam_evaluate(self, payload: Dict[str, Any]):
        """Evaluación de Examen de Conocimientos y Psicotécnico."""
        try:
            institution_id = payload.get("institution_id", "EMCH")
            user_answers = payload.get("answers", {})
            result = EXAM_ENGINE.evaluate_exam(institution_id, user_answers)
            self._send_json_response(result)
        except Exception as e:
            self._send_json_response({"error": str(e)}, status=500)

    def handle_api_physical_evaluate(self, payload: Dict[str, Any]):
        """Evaluación de Pruebas Físicas y Antropometría."""
        try:
            institution_id = payload.get("institution_id", "EMCH")
            sex = payload.get("sex", "M")
            height_m = float(payload.get("height_m", 1.70))
            weight_kg = float(payload.get("weight_kg", 68.0))
            marks = payload.get("marks", {})

            result = PHYSICAL_ENGINE.evaluate_full_battery(
                institution_id=institution_id,
                sex=sex,
                marks=marks,
                height_m=height_m,
                weight_kg=weight_kg
            )
            self._send_json_response(result)
        except Exception as e:
            self._send_json_response({"error": str(e)}, status=500)

    def handle_api_consolidated_evaluate(self, payload: Dict[str, Any]):
        """Dictamen Global Consolidado de Admisión."""
        try:
            candidate = payload.get("candidate", {})
            institution_id = payload.get("institution_id", "EMCH")
            inst_data = EXAM_ENGINE.get_syllabus(institution_id) or {}

            # 1. Puntuación Psicométrica (0 a 100 => escalado a 20)
            psycho_score_100 = float(payload.get("psychometric_score", 75.0))
            psycho_vigesimal = round(psycho_score_100 / 5.0, 2)
            psycho_apt = payload.get("psychometric_apt", True)

            # 2. Puntuación de Conocimientos (0 a 20)
            know_vigesimal = float(payload.get("knowledge_score", 14.0))
            know_apt = payload.get("knowledge_apt", True)

            # 3. Puntuación Física (0 a 20)
            phys_vigesimal = float(payload.get("physical_score", 15.0))
            phys_apt = payload.get("physical_apt", True)
            anthro_apt = payload.get("anthropometric_apt", True)

            # Ponderación oficial de Admisión FFAA / PNP:
            # - Conocimientos y Aptitud Académica: 45%
            # - Rendimiento Físico: 30%
            # - Aptitud Psicométrica: 25%
            final_composite_score = round(
                (know_vigesimal * 0.45) + (phys_vigesimal * 0.30) + (psycho_vigesimal * 0.25),
                2
            )
            final_composite_100 = round(final_composite_score * 5.0, 1)

            min_passing = inst_data.get("nota_minima_aprobatoria", 12.0)
            all_stages_passed = psycho_apt and know_apt and phys_apt and anthro_apt and (final_composite_score >= min_passing)

            if not anthro_apt:
                verdict = "NO APTO MÉDICO (ANTROPOMETRÍA FUERA DE LÍMITES)"
                probability = "0% (DESCALIFICADO EN ETAPA MÉDICA)"
                prob_level = "danger"
            elif not phys_apt:
                verdict = "ELIMINADO EN PRUEBA DE RENDIMIENTO FÍSICO"
                probability = "0% (DESCALIFICADO EN ESFUERZO FÍSICO)"
                prob_level = "danger"
            elif not know_apt:
                verdict = "INAPTO EN EXAMEN DE CONOCIMIENTOS"
                probability = "15% (NOTA POR DEBAJO DEL MÍNIMO APROBATORIO)"
                prob_level = "warning"
            elif not psycho_apt:
                verdict = "NO RECOMENDADO POR PERFIL PSICOMÉTRICO (ALERTA INSTITUCIONAL)"
                probability = "25% (OBSERVADO EN EVALUACIÓN PSICOLÓGICA)"
                prob_level = "warning"
            elif final_composite_score >= 16.0:
                verdict = "APTO DESTACADO - ALTA PROBABILIDAD DE VACANTE"
                probability = "92% - 98% (UBICACIÓN EN TERCIO SUPERIOR DEL CUADRO DE MÉRITO)"
                prob_level = "success"
            elif final_composite_score >= 14.0:
                verdict = "APTO REGULAR - PROBABILIDAD MEDIA-ALTA"
                probability = "70% - 85% (ZONA COMPETITIVA PARA ALCANZAR VACANTE)"
                prob_level = "success"
            else:
                verdict = "APTO AJUSTADO - PROBABILIDAD CONDICIONAL"
                probability = "45% - 60% (EN LÍMITE DE CORTE DE VACANTES)"
                prob_level = "warning"

            consolidated_report = {
                "candidate": candidate,
                "target_institution": {
                    "id": institution_id,
                    "nombre": inst_data.get("nombre", institution_id),
                    "rama": inst_data.get("rama", ""),
                    "nivel": inst_data.get("nivel", ""),
                    "nota_minima_aprobatoria": min_passing
                },
                "scores": {
                    "psychometric": {
                        "score_100": psycho_score_100,
                        "vigesimal": psycho_vigesimal,
                        "weight_pct": 25,
                        "is_apt": psycho_apt
                    },
                    "knowledge": {
                        "vigesimal": know_vigesimal,
                        "weight_pct": 45,
                        "is_apt": know_apt
                    },
                    "physical": {
                        "vigesimal": phys_vigesimal,
                        "weight_pct": 30,
                        "is_apt": phys_apt
                    },
                    "anthropometry": {
                        "is_apt": anthro_apt
                    },
                    "final_composite": {
                        "vigesimal": final_composite_score,
                        "score_100": final_composite_100,
                        "all_passed": all_stages_passed
                    }
                },
                "verdict": verdict,
                "probability": probability,
                "prob_level": prob_level,
                "strategic_recommendations": [
                    "Mantener plan de entrenamiento de resistencia aeróbica (carrera y natación) para asegurar el puntaje máximo en esfuerzo físico.",
                    "Focalizar el estudio en las áreas con menor porcentaje de aciertos en el simulacro de conocimientos.",
                    "Preparar la entrevista personal fundamentando la vocación militar con base en el informe de rasgos de personalidad."
                ]
            }
            self._send_json_response(consolidated_report)
        except Exception as e:
            self._send_json_response({"error": str(e)}, status=500)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


def run_server(port: int = 8080):
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass

    server_address = ("", port)
    httpd = ThreadingHTTPServer(server_address, MilitaryHttpHandler)
    print("=" * 80)
    print("[PERÚ] SISTEMA INTEGRAL DE ADMISIÓN MILITAR Y VOCACIONAL")
    print(f"Servidor web y APIs REST activos en: http://localhost:{port}")
    print("Endpoints disponibles:")
    print("  - GET  /api/institutions")
    print("  - GET  /api/exam/generate?institution=EMCH&questions=30")
    print("  - POST /api/evaluate")
    print("  - POST /api/exam/evaluate")
    print("  - POST /api/physical/evaluate")
    print("  - POST /api/consolidated/evaluate")
    print("Presione Ctrl+C para detener el servidor.")
    print("=" * 80)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
        httpd.server_close()


if __name__ == "__main__":
    port = 8080
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    run_server(port)
