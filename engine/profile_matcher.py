"""
Algoritmo de Matching de Perfiles, Detección de Banderas Rojas y Clasificación Conductual.
Inspirado en la segmentación multivariada de Big-Five-Personality-Analysis.
"""

from typing import Dict, List, Any, Optional
from .institutional_profiles import INSTITUTIONAL_PROFILES, InstitutionalProfile, RedFlagRule


class ProfileMatcher:
    """Calcula la compatibilidad entre el postulante y las instituciones militares y vocacionales."""

    ARCHETYPES = [
        {
            "id": "TACTICAL_COMMAND_LEADER",
            "name": "Líder Táctico y de Mando Operativo",
            "badge": "🎖️",
            "description": "Perfil de alto dinamismo, firmeza de voz y asertividad social. Destaca en la conducción de personal, toma de decisiones en crisis y liderazgo en el terreno.",
            "fit_institutions": ["EMCH (Ejército)", "EO-PNP (Oficial de Orden)", "Infantería de Marina (ENM)"],
            "criteria": lambda d: d["E"] >= 60 and d["C"] >= 65 and d["N"] <= 40
        },
        {
            "id": "HIGH_PRECISION_SPECIALIST",
            "name": "Especialista Técnico y Aeronáutico de Alta Precisión",
            "badge": "🔬",
            "description": "Perfil meticuloso, ordenado y analítico. Extraordinaria concentración en checklists, sistemas complejos, telemetría, navegación y mantenimiento aeronáutico/naval.",
            "fit_institutions": ["FAP (Fuerza Aérea)", "ENAMM (Marina Mercante)", "Ingeniería de Sistemas/Comunicaciones"],
            "criteria": lambda d: d["C"] >= 70 and d["O"] >= 58 and d["N"] <= 40
        },
        {
            "id": "RESILIENT_TACTICAL_OPERATOR",
            "name": "Operador Táctico Resiliente / Fuerzas Especiales",
            "badge": "🛡️",
            "description": "Perfil de excepcional autocontrol y templanza. Inmune a la fatiga, el miedo y la sobrecarga sensorial. Ideal para misiones de comando, submarinos y aviación de caza.",
            "fit_institutions": ["FOES / Submarinos (ENM)", "DOES / Caza (FAP)", "SUAT / Comandos (PNP/EMCH)"],
            "criteria": lambda d: d["N"] <= 25 and d["C"] >= 70
        },
        {
            "id": "COMMUNITY_SECURITY_MEDIATOR",
            "name": "Mediador de Seguridad y Orden Ciudadano",
            "badge": "🤝",
            "description": "Perfil caracterizado por una alta probidad moral, empatía, prudencia y facilidad para desescalar conflictos con la ciudadanía y mantener la paz social.",
            "fit_institutions": ["PNP (Policía Nacional)", "Guardacostas (ENM)", "Gestión Pública y Seguridad"],
            "criteria": lambda d: d["A"] >= 65 and d["C"] >= 65 and d["N"] <= 45
        }
    ]

    @staticmethod
    def _evaluate_red_flags(
        profile: InstitutionalProfile,
        domains: Dict[str, Any],
        facets: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Evalúa si el postulante activa banderas rojas para una institución dada."""
        triggered: List[Dict[str, Any]] = []

        for rule in profile.red_flag_rules:
            kind, key, op, threshold = rule.condition
            val = None

            if kind == "domain":
                d_obj = domains.get(key)
                if d_obj:
                    val = d_obj.get("percentile", d_obj.get("raw_score"))
            elif kind == "facet":
                f_obj = facets.get(key)
                if f_obj:
                    val = f_obj.get("percentile")

            if val is None:
                continue

            is_match = False
            if op == ">" and val > threshold:
                is_match = True
            elif op == "<" and val < threshold:
                is_match = True

            if is_match:
                triggered.append({
                    "rule_id": rule.rule_id,
                    "severity": rule.severity,
                    "title": rule.title,
                    "description": rule.description,
                    "recommendation": rule.recommendation,
                    "tested_value": val,
                    "threshold": threshold,
                    "operator": op
                })

        return triggered

    @classmethod
    def match_all(
        cls,
        eval_result: Dict[str, Any],
        target_institution_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Calcula la afinidad del postulante con todas las instituciones y detecta banderas rojas.
        """
        domains = eval_result.get("domains", {})
        facets = eval_result.get("facets", {})
        has_facets = bool(facets)

        # Extraer percentiles de dominio
        dom_pcts = {dom: domains[dom]["percentile"] for dom in ["N", "E", "O", "A", "C"] if dom in domains}

        results_by_inst: Dict[str, Dict[str, Any]] = {}

        for inst_id, profile in INSTITUTIONAL_PROFILES.items():
            # 1. Similitud por Dominios
            diff_dom_sum = 0.0
            total_dom_weight = 0.0
            for dom, ideal_val in profile.ideal_domains.items():
                w = profile.domain_weights.get(dom, 0.20)
                actual_val = dom_pcts.get(dom, 50.0)
                # Penalización por distancia
                diff_dom_sum += w * abs(actual_val - ideal_val)
                total_dom_weight += w

            # Normalizar distancia a porcentaje (0 a 100)
            avg_dom_diff = diff_dom_sum / (total_dom_weight if total_dom_weight > 0 else 1.0)
            dom_fit = max(0.0, min(100.0, 100.0 - (avg_dom_diff * 1.15)))

            # 2. Similitud por Facetas (si está disponible)
            facet_fit = dom_fit
            if has_facets and profile.ideal_facets:
                diff_fac_sum = 0.0
                total_fac_weight = 0.0
                for f_key, ideal_f in profile.ideal_facets.items():
                    if f_key in facets:
                        w_f = profile.facet_weights.get(f_key, 0.10)
                        actual_f = facets[f_key]["percentile"]
                        diff_fac_sum += w_f * abs(actual_f - ideal_f)
                        total_fac_weight += w_f
                if total_fac_weight > 0:
                    avg_fac_diff = diff_fac_sum / total_fac_weight
                    facet_fit = max(0.0, min(100.0, 100.0 - (avg_fac_diff * 1.15)))

            # Puntuación combinada
            if has_facets:
                overall_fit = (0.40 * dom_fit) + (0.60 * facet_fit)
            else:
                overall_fit = dom_fit

            # 3. Evaluación de Banderas Rojas
            red_flags = cls._evaluate_red_flags(profile, domains, facets)
            has_critical = any(rf["severity"] == "CRITICAL" for rf in red_flags)
            has_warning = any(rf["severity"] == "WARNING" for rf in red_flags)

            # Aplicar penalización si hay banderas rojas críticas
            adjusted_fit = overall_fit
            if has_critical:
                # El perfil no es apto para servicio armado sin subsanar el factor crítico
                adjusted_fit = min(adjusted_fit, 48.0)
                verdict = "NO RECOMENDADO / ALERTA CRÍTICA"
                verdict_color = "danger"
            elif adjusted_fit >= 78.0:
                verdict = "APTO CON ALTA COMPATIBILIDAD"
                verdict_color = "success"
            elif adjusted_fit >= 60.0:
                verdict = "APTO CONDICIONAL / EN OBSERVACIÓN"
                verdict_color = "warning"
            else:
                verdict = "COMPATIBILIDAD BAJA / PERFIL DIVERGENTE"
                verdict_color = "secondary"

            results_by_inst[inst_id] = {
                "id": profile.id,
                "code": profile.code,
                "name": profile.name,
                "badge": profile.badge,
                "motto": profile.motto,
                "short_desc": profile.short_desc,
                "mission": profile.mission,
                "typical_specialties": profile.typical_specialties,
                "overall_fit": round(adjusted_fit, 1),
                "unpenalized_fit": round(overall_fit, 1),
                "verdict": verdict,
                "verdict_color": verdict_color,
                "has_critical_red_flags": has_critical,
                "has_warning_red_flags": has_warning,
                "red_flags": red_flags,
                "interview_strengths": profile.interview_strengths,
                "development_advice": profile.development_advice
            }

        # Ordenar instituciones por porcentaje de afinidad
        ranked = sorted(results_by_inst.values(), key=lambda x: x["overall_fit"], reverse=True)

        # Clasificación del Arquetipo Conductual
        matched_archetype = cls._classify_archetype(dom_pcts)

        # Institución preferente o recomendada
        top_inst = ranked[0]
        chosen_inst = results_by_inst.get(target_institution_id, top_inst)

        return {
            "target_institution": chosen_inst,
            "top_institution": top_inst,
            "all_institutions": results_by_inst,
            "ranking": ranked,
            "archetype": matched_archetype
        }

    @classmethod
    def _classify_archetype(cls, dom_pcts: Dict[str, float]) -> Dict[str, Any]:
        """Asigna el arquetipo que mejor describe la combinación Big-Five del postulante."""
        for arch in cls.ARCHETYPES:
            if arch["criteria"](dom_pcts):
                return {
                    "id": arch["id"],
                    "name": arch["name"],
                    "badge": arch["badge"],
                    "description": arch["description"],
                    "fit_institutions": arch["fit_institutions"]
                }

        # Arquetipo equilibrado por defecto
        return {
            "id": "VERSATILE_OPERATOR",
            "name": "Operador Versátil y Equilibrado",
            "badge": "🧭",
            "description": "Perfil de rasgos armónicos y adaptables. Muestra flexibilidad para desempeñarse tanto en áreas de soporte operativo como en funciones de gestión y enlace.",
            "fit_institutions": ["Especialidades Técnicas de las FFAA", "Carreras Universitarias y Gestión"]
        }
