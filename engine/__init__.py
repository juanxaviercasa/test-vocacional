"""
Paquete de Evaluación Psicométrica y Vocacional Militar del Perú.
Adaptación de IPIP-NEO (five-factor-e) y análisis multivariado (Big-Five-Personality-Analysis).
"""

from .ipip_engine import IpipMilitaryEngine
from .institutional_profiles import INSTITUTIONAL_PROFILES, RedFlagRule
from .profile_matcher import ProfileMatcher
from .report_generator import MilitaryReportGenerator

__all__ = [
    "IpipMilitaryEngine",
    "INSTITUTIONAL_PROFILES",
    "RedFlagRule",
    "ProfileMatcher",
    "MilitaryReportGenerator",
]
