#!/usr/bin/env python3
"""
Motor de Evaluación Cognitiva Superior y Aptitud Mecánica Táctica para las FF.AA. y PNP.
Evalúa:
  - Factor 'g' (Inteligencia Fluida / Matrices de Raven)
  - Razonamiento Mecánico Táctico (Test Bennett: poleas, engranajes, hidrostática, palancas)
  - Velocidad y Precisión de Procesamiento Mental bajo presión temporal
"""

import os
import json
import random
from typing import Dict, Any, List, Optional

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(CURRENT_DIR)
PATH_COGNITIVE_BANK = os.path.join(BASE_DIR, "banco_evaluacion_cognitiva_superior.json")

class MilitaryCognitiveEngine:
    """Motor especializado en baremación cognitiva castrense de alto rendimiento."""

    def __init__(self):
        self._load_bank()

    def _load_bank(self):
        if os.path.exists(PATH_COGNITIVE_BANK):
            with open(PATH_COGNITIVE_BANK, "r", encoding="utf-8") as f:
                self.bank = json.load(f)
        else:
            self.bank = {"items_factor_g_raven": [], "items_aptitud_mecanica_bennett": []}

    def generate_cognitive_sample(self, num_raven: int = 3, num_bennett: int = 3) -> Dict[str, Any]:
        """
        Extrae una muestra calibrada para la prueba rápida:
        - N preguntas de Matrices Abstractas (Raven)
        - N preguntas de Aptitud Mecánica (Bennett)
        Retorna los ítems para el cliente y el answer key seguro.
        """
        all_raven = self.bank.get("items_factor_g_raven", [])
        all_bennett = self.bank.get("items_aptitud_mecanica_bennett", [])

        sample_raven = random.sample(all_raven, min(num_raven, len(all_raven)))
        sample_bennett = random.sample(all_bennett, min(num_bennett, len(all_bennett)))

        combined = sample_raven + sample_bennett
        random.shuffle(combined)

        client_items = []
        answer_key = {}

        for item in combined:
            item_id = item["id"]
            correct_opt = next((o["id"] for o in item["opciones"] if o.get("es_correcta") is True), "A")
            answer_key[item_id] = correct_opt

            client_items.append({
                "id": item_id,
                "tipo": item["tipo"],
                "categoria": item.get("categoria", ""),
                "enunciado": item["enunciado"],
                "subtexto": item.get("subtexto", ""),
                "tiempo_estimado_seg": item.get("tiempo_estimado_seg", 30),
                "dificultad": item.get("dificultad", "INTERMEDIO"),
                "opciones": [
                    {"id": o["id"], "texto": o["texto"]}
                    for o in item["opciones"]
                ]
            })

        return {
            "items": client_items,
            "answer_key": answer_key
        }

    def evaluate_cognitive(self,
                           answers: Dict[str, str],
                           answer_key: Dict[str, str],
                           times_by_item: Optional[Dict[str, float]] = None,
                           escuela_id: str = "EMCH") -> Dict[str, Any]:
        """
        Calcula las métricas psicotécnicas de inteligencia fluida y aptitud técnica.
        Pondera según la escuela objetivo (ej. Marina y FAP demandan mayor componente mecánico).
        """
        if not times_by_item:
            times_by_item = {}

        # Mapear metadatos de los ítems
        item_meta = {}
        for it in self.bank.get("items_factor_g_raven", []):
            item_meta[it["id"]] = {"tipo": "RAVEN", "explicacion": it.get("explicacion", ""), "enunciado": it["enunciado"]}
        for it in self.bank.get("items_aptitud_mecanica_bennett", []):
            item_meta[it["id"]] = {"tipo": "BENNETT", "explicacion": it.get("explicacion", ""), "enunciado": it["enunciado"]}

        total_raven = 0
        hits_raven = 0
        total_bennett = 0
        hits_bennett = 0
        total_time = 0.0
        details = []

        for item_id, correct_opt in answer_key.items():
            user_opt = answers.get(item_id)
            is_correct = (user_opt == correct_opt)
            t_seg = float(times_by_item.get(item_id, 25.0))
            total_time += t_seg

            meta = item_meta.get(item_id, {"tipo": "DESCONOCIDO", "explicacion": ""})
            tipo = meta["tipo"]

            if tipo == "RAVEN":
                total_raven += 1
                if is_correct:
                    hits_raven += 1
            elif tipo == "BENNETT":
                total_bennett += 1
                if is_correct:
                    hits_bennett += 1

            details.append({
                "id": item_id,
                "tipo": tipo,
                "es_correcta": is_correct,
                "respuesta_usuario": user_opt,
                "respuesta_correcta": correct_opt,
                "tiempo_seg": t_seg,
                "explicacion": meta.get("explicacion", "")
            })

        # Puntajes específicos (0-100)
        score_raven = round((hits_raven / max(1, total_raven)) * 100.0, 1) if total_raven > 0 else 70.0
        score_bennett = round((hits_bennett / max(1, total_bennett)) * 100.0, 1) if total_bennett > 0 else 65.0

        # Velocidad de procesamiento: tiempo promedio ideal entre 15 y 30 segundos
        avg_time = total_time / max(1, len(answer_key))
        if avg_time <= 25.0:
            speed_score = 100.0
        elif avg_time <= 45.0:
            speed_score = round(100.0 - (avg_time - 25.0) * 2.0, 1)
        else:
            speed_score = round(max(30.0, 60.0 - (avg_time - 45.0) * 1.5), 1)

        # Ponderación según la Escuela Matriz
        # Marina (ENP/CITEN) y Fuerza Aérea (EOFAP/ESOFA) exigen mayor capacidad técnica/mecánica
        if escuela_id in ["ENP", "CITEN", "EOFAP", "ESOFA"]:
            peso_g = 0.40
            peso_mec = 0.45
            peso_spd = 0.15
        elif escuela_id in ["ETE"]:
            peso_g = 0.35
            peso_mec = 0.50
            peso_spd = 0.15
        else:
            peso_g = 0.50
            peso_mec = 0.30
            peso_spd = 0.20

        global_cognitive_index = round(
            (score_raven * peso_g) +
            (score_bennett * peso_mec) +
            (speed_score * peso_spd),
            1
        )

        observaciones = []
        if global_cognitive_index >= 80.0:
            nivel = "SUPERIOR_ELITE"
            veredicto = "Destacada agilidad mental, aptitud analítica superior y excelente comprensión biomecánica/espacial."
        elif global_cognitive_index >= 55.0:
            nivel = "PROMEDIO_APTO"
            veredicto = "Aptitud cognitiva y técnica dentro del estándar reglamentario exigido por los tribunales de admisión."
        else:
            nivel = "CRITICO_OBSERVADO"
            veredicto = "Riesgo en el examen psicotécnico: lentitud deductiva o dificultades en comprensión de sistemas mecánicos."
            observaciones.append("Se recomienda entrenamiento intensivo en poleas, engranajes y series de matrices 3x3.")

        if score_bennett < 50.0 and escuela_id in ["ENP", "CITEN", "EOFAP", "ETE"]:
            observaciones.append(f"Alerta Técnica: El puntaje en Bennett ({score_bennett}%) está por debajo de la media deseada para especialidades de vuelo, navales o mantenimiento blindado.")

        return {
            "factor_g_raven": score_raven,
            "aptitud_mecanica_bennett": score_bennett,
            "velocidad_procesamiento": speed_score,
            "indice_cognitivo_global": global_cognitive_index,
            "nivel": nivel,
            "veredicto": veredicto,
            "tiempo_promedio_seg": round(avg_time, 1),
            "observaciones": observaciones,
            "detalles_items": details
        }

# Instancia singleton para el sistema
COGNITIVE_ENGINE = MilitaryCognitiveEngine()
