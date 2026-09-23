// Perfiles Psicométricos Institucionales de las FFAA y PNP del Perú
const INSTITUTIONAL_PROFILES = {
  "FAP": {
    "id": "FAP",
    "code": "FAP",
    "name": "Fuerza Aérea del Perú",
    "badge": "✈️",
    "motto": "«Arriba, siempre arriba» (Capitán FAP José Abelardo Quiñones)",
    "short_desc": "Escuela de Oficiales (EOFAP) y Especialidades Técnicas Aeronáuticas (ESOFA).",
    "mission": "Defensa de la soberanía aérea del Perú, operaciones de alta tecnología, transporte estratégico y búsqueda y salvamento (SAR).",
    "typical_specialties": [
      "Piloto de Caza / Transporte / Helicópteros",
      "Defensa y Operaciones Especiales (DOES)",
      "Inteligencia Aérea",
      "Mantenimiento Aeronáutico",
      "Comunicaciones e Informática"
    ],
    "ideal_domains": {
      "N": 18.0,
      "C": 88.0,
      "O": 70.0,
      "E": 65.0,
      "A": 55.0
    },
    "domain_weights": {
      "N": 0.3,
      "C": 0.3,
      "O": 0.15,
      "E": 0.15,
      "A": 0.1
    },
    "ideal_facets": {
      "vulnerability": 15.0,
      "anxiety": 20.0,
      "anger": 18.0,
      "self_efficacy": 88.0,
      "orderliness": 85.0,
      "dutifulness": 90.0,
      "self_discipline": 90.0,
      "cautiousness": 75.0,
      "intellect": 80.0,
      "assertiveness": 72.0
    },
    "facet_weights": {
      "vulnerability": 0.2,
      "self_discipline": 0.15,
      "dutifulness": 0.15,
      "cautiousness": 0.12,
      "orderliness": 0.1,
      "intellect": 0.1,
      "self_efficacy": 0.1,
      "anxiety": 0.08
    },
    "red_flag_rules": [
      {
        "rule_id": "RF_IMPULSIVITY",
        "severity": "CRITICAL",
        "title": "Riesgo de Impulsividad y Descontrol de Impulsos",
        "description": "Puntaje excesivo en Inmoderación/Impulsividad. Alto riesgo en el manejo de armas de fuego y toma de decisiones tácticas bajo presión.",
        "recommendation": "Entrenamiento riguroso en regulación emocional, control inhibitorio y tolerancia a la frustración.",
        "condition": [
          "facet",
          "immoderation",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_HOSTILITY",
        "severity": "CRITICAL",
        "title": "Elevada Hostilidad e Irritabilidad Incontrolada",
        "description": "Tendencia a experimentar ira reactiva y resentimiento. Incompatible con el servicio de armas y la custodia ciudadana.",
        "recommendation": "Evaluación clínica orientada al manejo de la agresividad y resolución pacífica de conflictos.",
        "condition": [
          "facet",
          "anger",
          ">",
          72
        ]
      },
      {
        "rule_id": "RF_STRESS_VULNERABILITY",
        "severity": "CRITICAL",
        "title": "Alta Vulnerabilidad al Estrés Extremo y Pánico",
        "description": "Susceptibilidad a sufrir bloqueo cognitivo o pérdida de compostura ante emergencias de combate o vuelo.",
        "recommendation": "Sometimiento a simulaciones de sobrecarga cognitiva y desensibilización al estrés operativo.",
        "condition": [
          "facet",
          "vulnerability",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_ETHICAL_DETACHMENT",
        "severity": "CRITICAL",
        "title": "Riesgo en Integridad Ética y Rectitud Moral",
        "description": "Percentil deficiente en Moralidad/Rectitud. Vulnerabilidad a conductas contrarias a la disciplina, la ley o actos de corrupción.",
        "recommendation": "Fortalecimiento axiológico, valores cívicos y adhesión al código de honor de la institución.",
        "condition": [
          "facet",
          "morality",
          "<",
          25
        ]
      },
      {
        "rule_id": "RF_LOW_DUTIFULNESS",
        "severity": "CRITICAL",
        "title": "Bajo Sentido del Deber y Disciplina Normativa",
        "description": "Tendencia al incumplimiento de órdenes jerárquicas o desinterés en el seguimiento estricto de reglamentos militares.",
        "recommendation": "Interiorización de la subordinación militar y el cumplimiento escrupuloso de consignas.",
        "condition": [
          "facet",
          "dutifulness",
          "<",
          25
        ]
      },
      {
        "rule_id": "RF_HIGH_ANXIETY",
        "severity": "WARNING",
        "title": "Nivel Elevado de Ansiedad Anticipatoria",
        "description": "Preocupación y tensión por encima de la media. Puede mermar el rendimiento en los primeros meses del periodo de instrucción militar.",
        "recommendation": "Práctica de técnicas de respiración diafragmática y visualización positiva.",
        "condition": [
          "facet",
          "anxiety",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_LOW_SELF_EFFICACY",
        "severity": "WARNING",
        "title": "Baja Autoeficacia y Seguridad Operativa",
        "description": "Inseguridad en las propias competencias para resolver tareas desafiantes o superar el régimen de internado.",
        "recommendation": "Potenciar el autoconcepto, resiliencia y fijación de micro-objetivos diarios.",
        "condition": [
          "facet",
          "self_efficacy",
          "<",
          30
        ]
      },
      {
        "rule_id": "RF_FAP_IMPRUDENCE",
        "severity": "CRITICAL",
        "title": "Baja Prudencia / Tendencia a la Temeridad Aérea",
        "description": "Percentil muy bajo en Cautela/Prudencia. Incompatible con la seguridad de vuelo y protocolos aeronáuticos donde no se toleran atajos.",
        "recommendation": "Reforzar el apego dogmático a las listas de chequeo (checklists) y la gestión del error humano en aviación.",
        "condition": [
          "facet",
          "cautiousness",
          "<",
          35
        ]
      }
    ],
    "interview_strengths": [
      "Demostrar alta serenidad y claridad mental al describir situaciones de peligro o presión.",
      "Resaltar el apego riguroso al orden, protocolos técnicos y puntualidad estricta.",
      "Evidenciar interés genuino por la tecnología aeronáutica, física, sistemas y geopolítica aérea.",
      "Proyectar confianza tranquila en la autoeficacia sin caer en actitudes de autosuficiencia imprudente."
    ],
    "development_advice": [
      "Practicar pruebas de agudeza perceptiva y toma de decisiones rápida sin perder la calma.",
      "Fortalecer el hábito del orden minucioso en la preparación de material y estudio personal.",
      "Aprender a admitir errores técnicos de inmediato para retroalimentación formativa."
    ]
  },
  "PNP": {
    "id": "PNP",
    "code": "PNP",
    "name": "Policía Nacional del Perú",
    "badge": "👮",
    "motto": "«Dios, Patria, Ley»",
    "short_desc": "Escuela de Oficiales (EO-PNP) y Escuelas Técnico Superiores (EESTP-PNP).",
    "mission": "Garantizar el orden interno, la seguridad ciudadana, la prevención e investigación del delito y el imperio de la ley con estricto respeto a los derechos fundamentales.",
    "typical_specialties": [
      "Orden y Seguridad Pública (Patrullaje / SUAT)",
      "Investigación Criminal (DIRINCRI / DIRANDRO)",
      "Inteligencia Policial",
      "Criminalística",
      "Policía de Tránsito y Turismo"
    ],
    "ideal_domains": {
      "N": 20.0,
      "A": 75.0,
      "C": 80.0,
      "E": 70.0,
      "O": 55.0
    },
    "domain_weights": {
      "N": 0.25,
      "A": 0.25,
      "C": 0.25,
      "E": 0.15,
      "O": 0.1
    },
    "ideal_facets": {
      "morality": 92.0,
      "anger": 15.0,
      "immoderation": 18.0,
      "dutifulness": 88.0,
      "assertiveness": 78.0,
      "cooperation": 75.0,
      "sympathy": 72.0,
      "self_discipline": 80.0
    },
    "facet_weights": {
      "morality": 0.22,
      "anger": 0.18,
      "immoderation": 0.18,
      "dutifulness": 0.16,
      "assertiveness": 0.14,
      "sympathy": 0.12
    },
    "red_flag_rules": [
      {
        "rule_id": "RF_IMPULSIVITY",
        "severity": "CRITICAL",
        "title": "Riesgo de Impulsividad y Descontrol de Impulsos",
        "description": "Puntaje excesivo en Inmoderación/Impulsividad. Alto riesgo en el manejo de armas de fuego y toma de decisiones tácticas bajo presión.",
        "recommendation": "Entrenamiento riguroso en regulación emocional, control inhibitorio y tolerancia a la frustración.",
        "condition": [
          "facet",
          "immoderation",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_HOSTILITY",
        "severity": "CRITICAL",
        "title": "Elevada Hostilidad e Irritabilidad Incontrolada",
        "description": "Tendencia a experimentar ira reactiva y resentimiento. Incompatible con el servicio de armas y la custodia ciudadana.",
        "recommendation": "Evaluación clínica orientada al manejo de la agresividad y resolución pacífica de conflictos.",
        "condition": [
          "facet",
          "anger",
          ">",
          72
        ]
      },
      {
        "rule_id": "RF_STRESS_VULNERABILITY",
        "severity": "CRITICAL",
        "title": "Alta Vulnerabilidad al Estrés Extremo y Pánico",
        "description": "Susceptibilidad a sufrir bloqueo cognitivo o pérdida de compostura ante emergencias de combate o vuelo.",
        "recommendation": "Sometimiento a simulaciones de sobrecarga cognitiva y desensibilización al estrés operativo.",
        "condition": [
          "facet",
          "vulnerability",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_ETHICAL_DETACHMENT",
        "severity": "CRITICAL",
        "title": "Riesgo en Integridad Ética y Rectitud Moral",
        "description": "Percentil deficiente en Moralidad/Rectitud. Vulnerabilidad a conductas contrarias a la disciplina, la ley o actos de corrupción.",
        "recommendation": "Fortalecimiento axiológico, valores cívicos y adhesión al código de honor de la institución.",
        "condition": [
          "facet",
          "morality",
          "<",
          25
        ]
      },
      {
        "rule_id": "RF_LOW_DUTIFULNESS",
        "severity": "CRITICAL",
        "title": "Bajo Sentido del Deber y Disciplina Normativa",
        "description": "Tendencia al incumplimiento de órdenes jerárquicas o desinterés en el seguimiento estricto de reglamentos militares.",
        "recommendation": "Interiorización de la subordinación militar y el cumplimiento escrupuloso de consignas.",
        "condition": [
          "facet",
          "dutifulness",
          "<",
          25
        ]
      },
      {
        "rule_id": "RF_HIGH_ANXIETY",
        "severity": "WARNING",
        "title": "Nivel Elevado de Ansiedad Anticipatoria",
        "description": "Preocupación y tensión por encima de la media. Puede mermar el rendimiento en los primeros meses del periodo de instrucción militar.",
        "recommendation": "Práctica de técnicas de respiración diafragmática y visualización positiva.",
        "condition": [
          "facet",
          "anxiety",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_LOW_SELF_EFFICACY",
        "severity": "WARNING",
        "title": "Baja Autoeficacia y Seguridad Operativa",
        "description": "Inseguridad en las propias competencias para resolver tareas desafiantes o superar el régimen de internado.",
        "recommendation": "Potenciar el autoconcepto, resiliencia y fijación de micro-objetivos diarios.",
        "condition": [
          "facet",
          "self_efficacy",
          "<",
          30
        ]
      },
      {
        "rule_id": "RF_PNP_LOW_MORALITY",
        "severity": "CRITICAL",
        "title": "Riesgo Extremo de Probidad Ética y Corrupción",
        "description": "La función policial requiere una sólida brújula moral. Puntuaciones bajas son motivo de exclusión directa en la entrevista personal.",
        "recommendation": "Alineación absoluta con la deontología policial y el orgullo del uniforme.",
        "condition": [
          "facet",
          "morality",
          "<",
          30
        ]
      }
    ],
    "interview_strengths": [
      "Expresar convicción sólida sobre la rectitud moral, honestidad y rechazo visceral a la corrupción.",
      "Mostrar madurez emocional al responder cómo reaccionaría ante la provocación de manifestantes.",
      "Demostrar vocación auténtica de servicio y protección a los ciudadanos más vulnerables.",
      "Exhibir tono de voz claro, enérgico y postura corporal de seguridad y respeto mutuo."
    ],
    "development_advice": [
      "Entrenar la desescalada verbal de conflictos y técnicas de negociación asertiva.",
      "Reforzar el conocimiento de la Constitución Política del Perú y derechos humanos.",
      "Ejercitar la paciencia activa en situaciones de alta tensión social."
    ]
  },
  "ENM": {
    "id": "ENM",
    "code": "ENM",
    "name": "Marina de Guerra del Perú / Escuela Naval",
    "badge": "⚓",
    "motto": "«Gloria a los Héroes del Huáscar y Angamos» (Gran Almirante Miguel Grau Seminario)",
    "short_desc": "Escuela Naval del Perú (ENM) y Centro de Instrucción Técnica Naval (CITEN).",
    "mission": "Defensa del dominio marítimo, fluvial y lacustre del Perú, operaciones anfibias, fuerzas especiales submarinas y resguardo de la Amazonía.",
    "typical_specialties": [
      "Oficial de Superficie (Fragatas y Corbetas)",
      "Submarinos",
      "Aviación Naval",
      "Infantería de Marina",
      "Fuerzas de Operaciones Especiales (FOES)",
      "Capitanías y Guardacostas"
    ],
    "ideal_domains": {
      "C": 90.0,
      "N": 15.0,
      "A": 70.0,
      "E": 60.0,
      "O": 60.0
    },
    "domain_weights": {
      "C": 0.3,
      "N": 0.3,
      "A": 0.18,
      "E": 0.12,
      "O": 0.1
    },
    "ideal_facets": {
      "orderliness": 92.0,
      "vulnerability": 12.0,
      "depression": 15.0,
      "dutifulness": 94.0,
      "cooperation": 88.0,
      "self_discipline": 90.0,
      "cautiousness": 80.0,
      "trust": 75.0
    },
    "facet_weights": {
      "dutifulness": 0.2,
      "orderliness": 0.2,
      "vulnerability": 0.18,
      "cooperation": 0.16,
      "self_discipline": 0.14,
      "depression": 0.12
    },
    "red_flag_rules": [
      {
        "rule_id": "RF_IMPULSIVITY",
        "severity": "CRITICAL",
        "title": "Riesgo de Impulsividad y Descontrol de Impulsos",
        "description": "Puntaje excesivo en Inmoderación/Impulsividad. Alto riesgo en el manejo de armas de fuego y toma de decisiones tácticas bajo presión.",
        "recommendation": "Entrenamiento riguroso en regulación emocional, control inhibitorio y tolerancia a la frustración.",
        "condition": [
          "facet",
          "immoderation",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_HOSTILITY",
        "severity": "CRITICAL",
        "title": "Elevada Hostilidad e Irritabilidad Incontrolada",
        "description": "Tendencia a experimentar ira reactiva y resentimiento. Incompatible con el servicio de armas y la custodia ciudadana.",
        "recommendation": "Evaluación clínica orientada al manejo de la agresividad y resolución pacífica de conflictos.",
        "condition": [
          "facet",
          "anger",
          ">",
          72
        ]
      },
      {
        "rule_id": "RF_STRESS_VULNERABILITY",
        "severity": "CRITICAL",
        "title": "Alta Vulnerabilidad al Estrés Extremo y Pánico",
        "description": "Susceptibilidad a sufrir bloqueo cognitivo o pérdida de compostura ante emergencias de combate o vuelo.",
        "recommendation": "Sometimiento a simulaciones de sobrecarga cognitiva y desensibilización al estrés operativo.",
        "condition": [
          "facet",
          "vulnerability",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_ETHICAL_DETACHMENT",
        "severity": "CRITICAL",
        "title": "Riesgo en Integridad Ética y Rectitud Moral",
        "description": "Percentil deficiente en Moralidad/Rectitud. Vulnerabilidad a conductas contrarias a la disciplina, la ley o actos de corrupción.",
        "recommendation": "Fortalecimiento axiológico, valores cívicos y adhesión al código de honor de la institución.",
        "condition": [
          "facet",
          "morality",
          "<",
          25
        ]
      },
      {
        "rule_id": "RF_LOW_DUTIFULNESS",
        "severity": "CRITICAL",
        "title": "Bajo Sentido del Deber y Disciplina Normativa",
        "description": "Tendencia al incumplimiento de órdenes jerárquicas o desinterés en el seguimiento estricto de reglamentos militares.",
        "recommendation": "Interiorización de la subordinación militar y el cumplimiento escrupuloso de consignas.",
        "condition": [
          "facet",
          "dutifulness",
          "<",
          25
        ]
      },
      {
        "rule_id": "RF_HIGH_ANXIETY",
        "severity": "WARNING",
        "title": "Nivel Elevado de Ansiedad Anticipatoria",
        "description": "Preocupación y tensión por encima de la media. Puede mermar el rendimiento en los primeros meses del periodo de instrucción militar.",
        "recommendation": "Práctica de técnicas de respiración diafragmática y visualización positiva.",
        "condition": [
          "facet",
          "anxiety",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_LOW_SELF_EFFICACY",
        "severity": "WARNING",
        "title": "Baja Autoeficacia y Seguridad Operativa",
        "description": "Inseguridad en las propias competencias para resolver tareas desafiantes o superar el régimen de internado.",
        "recommendation": "Potenciar el autoconcepto, resiliencia y fijación de micro-objetivos diarios.",
        "condition": [
          "facet",
          "self_efficacy",
          "<",
          30
        ]
      },
      {
        "rule_id": "RF_ENM_ISOLATION_RISK",
        "severity": "CRITICAL",
        "title": "Vulnerabilidad al Aislamiento y Confinamiento Marino",
        "description": "Elevada tendencia al desánimo o necesidad excesiva de estimulación externa. Incompatible con guardias de navegación y misiones submarinas.",
        "recommendation": "Desarrollar estabilidad introspectiva y resistencia al aburrimiento rutinario.",
        "condition": [
          "facet",
          "depression",
          ">",
          68
        ]
      }
    ],
    "interview_strengths": [
      "Resaltar la vocación por la tradición naval y los valores del Caballero de los Mares, Miguel Grau.",
      "Demostrar capacidad para convivir armónicamente en espacios reducidos y bajo régimen riguroso.",
      "Enfatizar la lealtad al grupo, el trabajo en equipo silencioso y la pulcritud personal.",
      "Proyectar templanza, autocontrol y respeto absoluto por la línea de mando náutica."
    ],
    "development_advice": [
      "Mejorar hábitos de orden y mantenimiento de implementos de trabajo.",
      "Desarrollar autonomía personal y fortaleza frente al alejamiento temporal del entorno familiar.",
      "Fortalecer la capacidad de concentración en tareas técnicas prolongadas."
    ]
  },
  "EMCH": {
    "id": "EMCH",
    "code": "EMCH",
    "name": "Ejército del Perú / Escuela Militar de Chorrillos",
    "badge": "⚔️",
    "motto": "«Hasta quemar el último cartucho» (Coronel Francisco Bolognesi Cervantes)",
    "short_desc": "Escuela Militar de Chorrillos (EMCH) e Instituto de Educación Superior del Ejército (ETE).",
    "mission": "Garantizar la soberanía e integridad territorial del Perú en la costa, sierra y selva, pacificación nacional y apoyo al desarrollo socioeconómico.",
    "typical_specialties": [
      "Armas de Maniobra (Infantería, Caballería, Blindados)",
      "Armas de Apoyo (Artillería, Ingeniería, Comunicaciones)",
      "Fuerzas Especiales y Comandos",
      "Servicio de Intendencia y Material de Guerra"
    ],
    "ideal_domains": {
      "C": 88.0,
      "E": 78.0,
      "N": 18.0,
      "A": 55.0,
      "O": 48.0
    },
    "domain_weights": {
      "C": 0.28,
      "E": 0.26,
      "N": 0.26,
      "A": 0.12,
      "O": 0.08
    },
    "ideal_facets": {
      "assertiveness": 90.0,
      "activity_level": 88.0,
      "dutifulness": 92.0,
      "self_discipline": 90.0,
      "vulnerability": 15.0,
      "achievement_striving": 85.0,
      "cooperation": 78.0
    },
    "facet_weights": {
      "assertiveness": 0.22,
      "dutifulness": 0.2,
      "self_discipline": 0.18,
      "vulnerability": 0.16,
      "activity_level": 0.14,
      "achievement_striving": 0.1
    },
    "red_flag_rules": [
      {
        "rule_id": "RF_IMPULSIVITY",
        "severity": "CRITICAL",
        "title": "Riesgo de Impulsividad y Descontrol de Impulsos",
        "description": "Puntaje excesivo en Inmoderación/Impulsividad. Alto riesgo en el manejo de armas de fuego y toma de decisiones tácticas bajo presión.",
        "recommendation": "Entrenamiento riguroso en regulación emocional, control inhibitorio y tolerancia a la frustración.",
        "condition": [
          "facet",
          "immoderation",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_HOSTILITY",
        "severity": "CRITICAL",
        "title": "Elevada Hostilidad e Irritabilidad Incontrolada",
        "description": "Tendencia a experimentar ira reactiva y resentimiento. Incompatible con el servicio de armas y la custodia ciudadana.",
        "recommendation": "Evaluación clínica orientada al manejo de la agresividad y resolución pacífica de conflictos.",
        "condition": [
          "facet",
          "anger",
          ">",
          72
        ]
      },
      {
        "rule_id": "RF_STRESS_VULNERABILITY",
        "severity": "CRITICAL",
        "title": "Alta Vulnerabilidad al Estrés Extremo y Pánico",
        "description": "Susceptibilidad a sufrir bloqueo cognitivo o pérdida de compostura ante emergencias de combate o vuelo.",
        "recommendation": "Sometimiento a simulaciones de sobrecarga cognitiva y desensibilización al estrés operativo.",
        "condition": [
          "facet",
          "vulnerability",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_ETHICAL_DETACHMENT",
        "severity": "CRITICAL",
        "title": "Riesgo en Integridad Ética y Rectitud Moral",
        "description": "Percentil deficiente en Moralidad/Rectitud. Vulnerabilidad a conductas contrarias a la disciplina, la ley o actos de corrupción.",
        "recommendation": "Fortalecimiento axiológico, valores cívicos y adhesión al código de honor de la institución.",
        "condition": [
          "facet",
          "morality",
          "<",
          25
        ]
      },
      {
        "rule_id": "RF_LOW_DUTIFULNESS",
        "severity": "CRITICAL",
        "title": "Bajo Sentido del Deber y Disciplina Normativa",
        "description": "Tendencia al incumplimiento de órdenes jerárquicas o desinterés en el seguimiento estricto de reglamentos militares.",
        "recommendation": "Interiorización de la subordinación militar y el cumplimiento escrupuloso de consignas.",
        "condition": [
          "facet",
          "dutifulness",
          "<",
          25
        ]
      },
      {
        "rule_id": "RF_HIGH_ANXIETY",
        "severity": "WARNING",
        "title": "Nivel Elevado de Ansiedad Anticipatoria",
        "description": "Preocupación y tensión por encima de la media. Puede mermar el rendimiento en los primeros meses del periodo de instrucción militar.",
        "recommendation": "Práctica de técnicas de respiración diafragmática y visualización positiva.",
        "condition": [
          "facet",
          "anxiety",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_LOW_SELF_EFFICACY",
        "severity": "WARNING",
        "title": "Baja Autoeficacia y Seguridad Operativa",
        "description": "Inseguridad en las propias competencias para resolver tareas desafiantes o superar el régimen de internado.",
        "recommendation": "Potenciar el autoconcepto, resiliencia y fijación de micro-objetivos diarios.",
        "condition": [
          "facet",
          "self_efficacy",
          "<",
          30
        ]
      },
      {
        "rule_id": "RF_EMCH_LOW_ASSERTIVENESS",
        "severity": "WARNING",
        "title": "Inseguridad en el Mando y Timidez Táctica",
        "description": "Baja asertividad y dificultad para impartir órdenes firmes. Se requiere voz de mando audible y convicción para liderar una sección o pelotón.",
        "recommendation": "Práctica de oratoria castrense, postura erguida y ejercicios de liderazgo de grupo.",
        "condition": [
          "facet",
          "assertiveness",
          "<",
          35
        ]
      }
    ],
    "interview_strengths": [
      "Demostrar porte militar enérgico, mirada firme, saludo militar impecable y voz enérgica.",
      "Narrar experiencias deportivas, de resistencia física o liderazgo juvenil que evidencien tenacidad.",
      "Expresar admiración fundamentada por los héroes del Ejército (Bolognesi, Cáceres, Quiñones).",
      "Mostrar disposición incondicional para servir en cualquier guarnición del país (costa, sierra o selva)."
    ],
    "development_advice": [
      "Incrementar la tolerancia al esfuerzo físico prolongado y la privación de comodidades.",
      "Desarrollar la capacidad de tomar decisiones rápidas bajo incertidumbre.",
      "Perfeccionar la comunicación asertiva y el tono de voz de mando."
    ]
  },
  "ENAMM": {
    "id": "ENAMM",
    "code": "ENAMM",
    "name": "Escuela Nacional de Marina Mercante (ENAMM / ENCE)",
    "badge": "🚢",
    "motto": "«Proa al Mar, Rumbo al Porvenir»",
    "short_desc": "Formación de Oficiales de la Marina Mercante y Náutica Comercial del Perú.",
    "mission": "Comandar buques de carga, tanqueros, cruceros internacionales y gestionar la logística portuaria y el comercio marítimo global.",
    "typical_specialties": [
      "Oficial de Cubierta / Puente de Navegación",
      "Oficial de Máquinas Navales y Sistemas Térmicos",
      "Administración Marítima y Portuaria"
    ],
    "ideal_domains": {
      "C": 88.0,
      "N": 20.0,
      "O": 65.0,
      "A": 65.0,
      "E": 55.0
    },
    "domain_weights": {
      "C": 0.32,
      "N": 0.28,
      "O": 0.16,
      "A": 0.14,
      "E": 0.1
    },
    "ideal_facets": {
      "orderliness": 90.0,
      "cautiousness": 88.0,
      "self_discipline": 88.0,
      "vulnerability": 18.0,
      "intellect": 78.0,
      "cooperation": 80.0
    },
    "facet_weights": {
      "cautiousness": 0.22,
      "orderliness": 0.2,
      "self_discipline": 0.2,
      "vulnerability": 0.18,
      "intellect": 0.1,
      "cooperation": 0.1
    },
    "red_flag_rules": [
      {
        "rule_id": "RF_IMPULSIVITY",
        "severity": "CRITICAL",
        "title": "Riesgo de Impulsividad y Descontrol de Impulsos",
        "description": "Puntaje excesivo en Inmoderación/Impulsividad. Alto riesgo en el manejo de armas de fuego y toma de decisiones tácticas bajo presión.",
        "recommendation": "Entrenamiento riguroso en regulación emocional, control inhibitorio y tolerancia a la frustración.",
        "condition": [
          "facet",
          "immoderation",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_HOSTILITY",
        "severity": "CRITICAL",
        "title": "Elevada Hostilidad e Irritabilidad Incontrolada",
        "description": "Tendencia a experimentar ira reactiva y resentimiento. Incompatible con el servicio de armas y la custodia ciudadana.",
        "recommendation": "Evaluación clínica orientada al manejo de la agresividad y resolución pacífica de conflictos.",
        "condition": [
          "facet",
          "anger",
          ">",
          72
        ]
      },
      {
        "rule_id": "RF_STRESS_VULNERABILITY",
        "severity": "CRITICAL",
        "title": "Alta Vulnerabilidad al Estrés Extremo y Pánico",
        "description": "Susceptibilidad a sufrir bloqueo cognitivo o pérdida de compostura ante emergencias de combate o vuelo.",
        "recommendation": "Sometimiento a simulaciones de sobrecarga cognitiva y desensibilización al estrés operativo.",
        "condition": [
          "facet",
          "vulnerability",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_ETHICAL_DETACHMENT",
        "severity": "CRITICAL",
        "title": "Riesgo en Integridad Ética y Rectitud Moral",
        "description": "Percentil deficiente en Moralidad/Rectitud. Vulnerabilidad a conductas contrarias a la disciplina, la ley o actos de corrupción.",
        "recommendation": "Fortalecimiento axiológico, valores cívicos y adhesión al código de honor de la institución.",
        "condition": [
          "facet",
          "morality",
          "<",
          25
        ]
      },
      {
        "rule_id": "RF_LOW_DUTIFULNESS",
        "severity": "CRITICAL",
        "title": "Bajo Sentido del Deber y Disciplina Normativa",
        "description": "Tendencia al incumplimiento de órdenes jerárquicas o desinterés en el seguimiento estricto de reglamentos militares.",
        "recommendation": "Interiorización de la subordinación militar y el cumplimiento escrupuloso de consignas.",
        "condition": [
          "facet",
          "dutifulness",
          "<",
          25
        ]
      },
      {
        "rule_id": "RF_HIGH_ANXIETY",
        "severity": "WARNING",
        "title": "Nivel Elevado de Ansiedad Anticipatoria",
        "description": "Preocupación y tensión por encima de la media. Puede mermar el rendimiento en los primeros meses del periodo de instrucción militar.",
        "recommendation": "Práctica de técnicas de respiración diafragmática y visualización positiva.",
        "condition": [
          "facet",
          "anxiety",
          ">",
          75
        ]
      },
      {
        "rule_id": "RF_LOW_SELF_EFFICACY",
        "severity": "WARNING",
        "title": "Baja Autoeficacia y Seguridad Operativa",
        "description": "Inseguridad en las propias competencias para resolver tareas desafiantes o superar el régimen de internado.",
        "recommendation": "Potenciar el autoconcepto, resiliencia y fijación de micro-objetivos diarios.",
        "condition": [
          "facet",
          "self_efficacy",
          "<",
          30
        ]
      }
    ],
    "interview_strengths": [
      "Destacar el interés por la navegación de ultramar, el comercio exterior y la logística marítima.",
      "Evidenciar minuciosidad en el cumplimiento de normas de seguridad industrial y marítima (Convenio SOLAS).",
      "Demostrar vocación por el aprendizaje de idiomas y adaptación a tripulaciones internacionales."
    ],
    "development_advice": [
      "Fomentar el hábito de anticipar contingencias y riesgos operacionales.",
      "Fortalecer el temple psicológico para travesías largas lejos del hogar."
    ]
  },
  "VOCACIONAL_UNIV": {
    "id": "VOCACIONAL_UNIV",
    "code": "UNIV",
    "name": "Perfil Vocacional Universitario y Carreras Técnicas Afines",
    "badge": "🎓",
    "motto": "«Ciencia, Servicio y Liderazgo Profesional»",
    "short_desc": "Orientación vocacional para postulantes civiles o carreras de sanidad, ingeniería y leyes afines a la defensa.",
    "mission": "Desarrollo del talento profesional y vocacional con base en aptitudes cognitivas, estabilidad personal y aspiraciones académicas.",
    "typical_specialties": [
      "Ingeniería de Sistemas / Ciberseguridad",
      "Medicina y Sanidad Militar/Policial",
      "Derecho y Ciencias Políticas",
      "Ingeniería Mecánica / Aeronáutica",
      "Criminología y Criminalística"
    ],
    "ideal_domains": {
      "O": 80.0,
      "C": 78.0,
      "A": 70.0,
      "E": 60.0,
      "N": 30.0
    },
    "domain_weights": {
      "O": 0.3,
      "C": 0.25,
      "A": 0.18,
      "E": 0.15,
      "N": 0.12
    },
    "ideal_facets": {
      "intellect": 88.0,
      "achievement_striving": 85.0,
      "self_efficacy": 82.0,
      "imagination": 78.0,
      "morality": 80.0,
      "self_discipline": 80.0
    },
    "facet_weights": {
      "intellect": 0.25,
      "achievement_striving": 0.2,
      "self_efficacy": 0.2,
      "self_discipline": 0.15,
      "imagination": 0.1,
      "morality": 0.1
    },
    "red_flag_rules": [
      {
        "rule_id": "RF_UNIV_LOW_DISCIPLINE",
        "severity": "WARNING",
        "title": "Bajo Hábito de Estudio y Autodisciplina",
        "description": "Riesgo de deserción universitaria o bajo rendimiento ante materias complejas.",
        "recommendation": "Técnicas de gestión del tiempo (Pomodoro, calendario de entregas) y hábitos de estudio estructurados.",
        "condition": [
          "facet",
          "self_discipline",
          "<",
          30
        ]
      }
    ],
    "interview_strengths": [
      "Exponer con claridad las metas profesionales a 5 y 10 años.",
      "Argumentar con solidez la elección de carrera y su impacto en la sociedad peruana.",
      "Destacar la curiosidad intelectual y proyectos previos de investigación o innovación."
    ],
    "development_advice": [
      "Planificar rutinas de estudio profundas y sistemáticas.",
      "Buscar mentoría con profesionales en ejercicio del campo elegido."
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INSTITUTIONAL_PROFILES };
}
