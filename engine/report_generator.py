"""
Generador de Informes Psicométricos y Vocacionales Militares del Perú.
Produce resúmenes ejecutivos, fichas técnicas y pautas para la entrevista personal.
"""

from typing import Dict, Any, List
from datetime import datetime


class MilitaryReportGenerator:
    """Genera reportes técnicos y orientativos en formato estructurado y texto militar."""

    @classmethod
    def generate_full_report(
        cls,
        candidate_info: Dict[str, Any],
        scoring_result: Dict[str, Any],
        matching_result: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Ensambla el expediente completo de evaluación psicométrica."""
        inst = matching_result["target_institution"]
        archetype = matching_result["archetype"]
        domains = scoring_result.get("domains", {})
        facets = scoring_result.get("facets", {})

        # Recomendaciones personalizadas para la entrevista personal
        interview_prep = cls._build_interview_prep(domains, facets, inst)

        return {
            "metadata": {
                "generated_at": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
                "system": "Sistema Integral de Evaluación Psicométrica Militar y Vocacional (FFAA y PNP del Perú)",
                "framework": "IPIP-NEO-120 / Big-Five Factor Model & Institutional Centroids"
            },
            "candidate": candidate_info,
            "target_institution": inst,
            "archetype": archetype,
            "verdict": {
                "overall_fit_score": inst["overall_fit"],
                "status": inst["verdict"],
                "badge": inst["badge"],
                "has_critical_alerts": inst["has_critical_red_flags"],
                "has_warning_alerts": inst["has_warning_red_flags"],
                "summary": cls._build_verdict_summary(inst, candidate_info)
            },
            "red_flags": inst["red_flags"],
            "ranking": matching_result["ranking"],
            "domains": domains,
            "facets": facets,
            "interview_preparation": interview_prep
        }

    @staticmethod
    def _build_verdict_summary(inst: Dict[str, Any], candidate: Dict[str, Any]) -> str:
        name = candidate.get("name", "El postulante")
        inst_name = inst["name"]
        score = inst["overall_fit"]

        if inst["has_critical_red_flags"]:
            return (
                f"{name} presenta indicadores de incompatibilidad crítica que requieren atención prioritaria "
                f"antes de presentarse al proceso de admisión de la {inst_name}. Existen rasgos que la junta médica o "
                f"psicológica observará severamente."
            )
        elif score >= 80.0:
            return (
                f"{name} exhibe una afinidad psicométrica sobresaliente ({score}%) con el perfil exigido por la {inst_name}. "
                f"Presenta la madurez emocional, disciplina y sentido del deber acordes con la vida castrense/policial."
            )
        elif score >= 65.0:
            return (
                f"{name} cuenta con un perfil favorable ({score}%) para la {inst_name}, con condiciones de adaptabilidad "
                f"adecuadas, requiriendo afinar aspectos de liderazgo, orden o gestión del estrés antes del internado."
            )
        else:
            return (
                f"{name} presenta un perfil ({score}%) con divergencias notables frente al estándar de la {inst_name}. "
                f"Se recomienda contrastar con las otras instituciones o perfiles vocacionales técnicos afines."
            )

    @classmethod
    def _build_interview_prep(
        cls,
        domains: Dict[str, Any],
        facets: Dict[str, Any],
        inst: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Diseña preguntas de entrevista simuladas y argumentos para la junta evaluadora."""
        questions: List[str] = []
        strengths: List[str] = []
        watchouts: List[str] = []

        c_pct = domains.get("C", {}).get("percentile", 50)
        n_pct = domains.get("N", {}).get("percentile", 50)
        e_pct = domains.get("E", {}).get("percentile", 50)
        a_pct = domains.get("A", {}).get("percentile", 50)
        o_pct = domains.get("O", {}).get("percentile", 50)

        # Preguntas según factores
        if n_pct <= 30:
            strengths.append("Excelente templanza y estabilidad ante emergencias o reprensiones de superiores.")
        else:
            watchouts.append("Cuidado con mostrar gestos de nerviosismo o temblor en la voz ante preguntas incisivas de los oficiales evaluadores.")
            questions.append("¿Cómo reacciona usted cuando un superior jerárquico le llama la atención con dureza frente a sus compañeros?")

        if c_pct >= 70:
            strengths.append("Alto sentido del deber y capacidad para cumplir órdenes al detalle.")
            questions.append("Mencione una situación donde prefirió seguir estrictamente el reglamento a pesar de que otros tomaron atajos.")
        else:
            watchouts.append("Debe convencer al jurado de que tolerará el régimen de internado, diana a las 05:00 hrs e inspecciones de uniforme.")
            questions.append("¿Cómo maneja la rutina repetitiva y las exigencias de orden extremo del régimen de internado militar?")

        if e_pct >= 65:
            strengths.append("Buena presencia, contacto visual seguro y facilidad para la voz de mando.")
        else:
            watchouts.append("Practique proyectar la voz con volumen y firmeza militar, evitando respuestas monosilábicas.")

        if a_pct >= 65:
            strengths.append("Excelente vocación de servicio desinteresado y compañerismo.")
        
        # Preguntas institucionales específicas
        code = inst.get("code", "")
        if code == "FAP":
            questions.append("¿Por qué eligió la Fuerza Aérea frente a las otras instituciones armadas y qué significa para usted el sacrificio de Quiñones?")
        elif code == "PNP":
            questions.append("¿Qué haría si un ciudadano o superior intentara ofrecerle una dádiva para omitir un procedimiento policial reglamentario?")
        elif code == "ENM":
            questions.append("¿Qué virtudes del Gran Almirante Miguel Grau considera que debe cultivar un cadete naval moderno?")
        elif code == "EMCH":
            questions.append("¿Cuál es el significado para usted de la consigna 'Hasta quemar el último cartucho' del Coronel Bolognesi?")

        return {
            "predicted_interview_questions": questions[:4],
            "candidate_strengths_to_highlight": strengths,
            "blind_spots_to_control": watchouts,
            "institutional_tips": inst.get("interview_strengths", [])
        }
