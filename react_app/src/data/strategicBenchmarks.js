/**
 * Metas físicas mínimas reglamentarias y recomendaciones tácticas por Escuela Matriz.
 * Fuentes: Tablas de Baremo Físico y Aptitud Médica de las FFAA y PNP del Perú (2026/2027).
 */

export const SCHOOL_PHYSICAL_BENCHMARKS = {
  EOFAP: {
    nombre: 'Escuela de Oficiales de la Fuerza Aérea del Perú',
    sigla: 'EOFAP',
    fuerza: 'Fuerza Aérea',
    lema: 'Arriba, Siempre Arriba',
    metaPrincipal: 'Resistencia cardiovascular y tolerancia a fuerzas G',
    trote: {
      distancia: '2,400 metros',
      tiempoMeta: '12 min 00 s (Varones) / 13 min 30 s (Damas)',
      pauta: 'Inicia trote fraccionado de 2,400m en pista atlética. Trabaja series de 800m a ritmo de 3:50/km para elevar tu umbral anaeróbico.'
    },
    natacion: {
      distancia: '50 metros estilo crol continuo',
      tiempoMeta: 'Menos de 48 segundos',
      pauta: 'Prueba eliminatoria sin apoyo en bordes. Perfecciona la patada de propulsión y respiración bilateral.'
    },
    fuerzaTrenSuperior: {
      ejercicio: 'Barras fijas (Dominadas)',
      repeticiones: 'Mínimo 10 a 14 repeticiones estrictas',
      pauta: 'Mentón completamente sobre la barra sin impulso de piernas. Desarrolla dorsal ancho y bíceps.'
    },
    flexionesAbdominales: {
      ejercicio: 'Planchas y Abdominales en 1 minuto',
      repeticiones: '45 planchas / 50 abdominales',
      pauta: 'Ejecución táctica con espalda alineada. Realiza circuitos diarios en progresión de 3 series al fallo técnico.'
    },
    saltoValor: {
      ejercicio: 'Salto de valor (Plataforma 5 metros)',
      requisito: 'Obligatorio e ineludible',
      pauta: 'Evalúa temple y control del pánico antes de instrucción aeronáutica.'
    }
  },

  EMCH: {
    nombre: 'Escuela Militar de Chorrillos',
    sigla: 'EMCH',
    fuerza: 'Ejército del Perú',
    lema: 'Hasta Quemar el Último Cartucho',
    metaPrincipal: 'Resistencia rústica en terreno y combate terrestre',
    trote: {
      distancia: '2,400 metros a campo traviesa',
      tiempoMeta: '11 min 30 s (Varones) / 13 min 00 s (Damas)',
      pauta: 'Meta EMCH: Inicia trote de 2,400m en menos de 11:30 min. Corre en pendientes y terrenos mixtos para fortalecer tendones y resistencia láctica.'
    },
    natacion: {
      distancia: '50 metros estilo pecho o crol',
      tiempoMeta: 'Menos de 50 segundos',
      pauta: 'Dominio en piscina olímpica militar. Requiere resistencia de flotación y técnica continua.'
    },
    fuerzaTrenSuperior: {
      ejercicio: 'Barras de tracción militar',
      repeticiones: 'Mínimo 12 repeticiones limpias',
      pauta: 'Suspensión completa con agarre prono. Entrenamiento con sobrecarga progresiva.'
    },
    flexionesAbdominales: {
      ejercicio: 'Flexo-extensiones y flexiones abdominales',
      repeticiones: '50 planchas / 55 abdominales en 60s',
      pauta: 'Base del combatiente de infantería. Practica en tandas matutinas antes del desayuno.'
    },
    saltoValor: {
      ejercicio: 'Salto al vacío (Torre de 5m)',
      requisito: 'Superación sin vacilación',
      pauta: 'Prueba psicológica de decisión instantánea y temple marcial.'
    }
  },

  ENP: {
    nombre: 'Escuela Naval del Perú',
    sigla: 'ENP',
    fuerza: 'Marina de Guerra',
    lema: 'Caballeros de los Mares',
    metaPrincipal: 'Aptitud anfibia y supervivencia en el mar',
    trote: {
      distancia: '2,400 metros planos',
      tiempoMeta: '11 min 45 s (Varones) / 13 min 15 s (Damas)',
      pauta: 'Entrena intervalos de alta intensidad (HIIT) para optimizar el VO2 máx necesario en maniobras navales.'
    },
    natacion: {
      distancia: '100 metros estilo libre + 10 min flotabilidad',
      tiempoMeta: '100m en menos de 1 min 45 s',
      pauta: 'Meta ENP: Dominio absoluto del agua. 10 minutos de flotación vertical forzada con manos fuera del agua al final.'
    },
    fuerzaTrenSuperior: {
      ejercicio: 'Cabestrillo y Dominadas navales',
      repeticiones: 'Mínimo 12 repeticiones completas',
      pauta: 'Fuerza funcional de trepa para abordaje y escalas verticales en buques de guerra.'
    },
    flexionesAbdominales: {
      ejercicio: 'Planchas y test core naval',
      repeticiones: '48 flexiones de brazos en 1 min',
      pauta: 'Fortalece la zona lumbar y abdominal para soportar las exigencias de la vida a bordo.'
    },
    saltoValor: {
      ejercicio: 'Salto de borda (Plataforma 7.5 metros)',
      requisito: 'Posición de supervivencia en zafarrancho',
      pauta: 'Cruzar brazos al pecho y piernas estiradas al impactar con el agua.'
    }
  },

  CITEN: {
    nombre: 'Instituto Tecnológico Naval',
    sigla: 'CITEN',
    fuerza: 'Marina de Guerra',
    lema: 'Técnica, Disciplina y Lealtad',
    metaPrincipal: 'Acondicionamiento técnico naval y supervivencia marítima',
    trote: {
      distancia: '2,400 metros',
      tiempoMeta: '12 min 15 s (Varones) / 13 min 45 s (Damas)',
      pauta: 'Mantén un ritmo aeróbico constante. 3 sesiones semanales de 5 km a ritmo regenerativo.'
    },
    natacion: {
      distancia: '50 metros libres + 5 min de flotación',
      tiempoMeta: 'Menos de 52 segundos',
      pauta: 'Prueba no negociable. Indispensable para tripulación técnica en fragatas, corbetas y submarinos.'
    },
    fuerzaTrenSuperior: {
      ejercicio: 'Barras fijas',
      repeticiones: '8 a 10 repeticiones mínimas',
      pauta: 'Enfócate en la fase excéntrica lenta (3 segundos de bajada controlada).'
    },
    flexionesAbdominales: {
      ejercicio: 'Flexiones de codo y abdominales',
      repeticiones: '40 planchas / 45 abdominales',
      pauta: 'Consistencia en repeticiones continuas sin detenerse en los primeros 30 segundos.'
    },
    saltoValor: {
      ejercicio: 'Salto de valor (3 metros)',
      requisito: 'Aprobación obligatoria',
      pauta: 'Seguridad en el agua y control del reflejo de inmersión.'
    }
  },

  ESOFA: {
    nombre: 'Escuela de Suboficiales de la FAP',
    sigla: 'ESOFA',
    fuerza: 'Fuerza Aérea',
    lema: 'Ciencia y Técnica para la Victoria',
    metaPrincipal: 'Resistencia aeróbica y agilidad funcional de hangares',
    trote: {
      distancia: '2,400 metros',
      tiempoMeta: '12 min 10 s (Varones) / 13 min 40 s (Damas)',
      pauta: 'Trabaja el fondo aeróbico con salidas de trote continuo de 30 minutos a 140 ppm.'
    },
    natacion: {
      distancia: '50 metros libres',
      tiempoMeta: 'Menos de 55 segundos',
      pauta: 'Resistencia básica acuática reglamentaria para emergencias de base aérea.'
    },
    fuerzaTrenSuperior: {
      ejercicio: 'Barras fijas / Dominadas',
      repeticiones: '8 a 12 repeticiones',
      pauta: 'Fortaleza de hombros y antebrazo para maniobra de herramientas de aviónica y armamento pesado.'
    },
    flexionesAbdominales: {
      ejercicio: 'Flexo-extensiones en suelo',
      repeticiones: '42 planchas / 48 abdominales en 60s',
      pauta: 'Control de cadera y postura neutra para evitar observaciones médicas.'
    },
    saltoValor: {
      ejercicio: 'Salto de confianza (3 metros)',
      requisito: 'Ingreso al agua sin titubear',
      pauta: 'Demostrar aplomo y control emocional.'
    }
  },

  ETE: {
    nombre: 'Escuela Técnica del Ejército',
    sigla: 'ETE',
    fuerza: 'Ejército del Perú',
    lema: 'Técnica Militar al Servicio de la Patria',
    metaPrincipal: 'Fuerza rústica, marcha y resistencia táctica terrestre',
    trote: {
      distancia: '2,400 metros',
      tiempoMeta: '12 min 00 s (Varones) / 13 min 30 s (Damas)',
      pauta: 'Trote continuo con cambios de ritmo cada 400m para acostumbrar al cuerpo a la fatiga del terreno.'
    },
    natacion: {
      distancia: '50 metros libres',
      tiempoMeta: 'Menos de 55 segundos',
      pauta: 'Nado de supervivencia. Desarrolla respiración constante y estilo utilitario.'
    },
    fuerzaTrenSuperior: {
      ejercicio: 'Barras fijas',
      repeticiones: '8 a 12 repeticiones',
      pauta: 'Indispensable para maniobra de equipo pesado, torres de comunicación y blindados.'
    },
    flexionesAbdominales: {
      ejercicio: 'Planchas y abdominales militares',
      repeticiones: '45 planchas / 50 abdominales en 1 min',
      pauta: 'Entrena con metrónomo a 1 repetición por segundo.'
    },
    saltoValor: {
      ejercicio: 'Salto de valor (Plataforma 3.5m)',
      requisito: 'Aprobatorio',
      pauta: 'Superación del miedo y reflejo instantáneo de cumplimiento de órdenes.'
    }
  },

  EO_PNP: {
    nombre: 'Escuela de Oficiales de la Policía Nacional',
    sigla: 'EO-PNP',
    fuerza: 'Policía Nacional',
    lema: 'Dios, Patria y Ley',
    metaPrincipal: 'Aptitud policial de persecución, agilidad y resistencia urbana',
    trote: {
      distancia: '2,400 metros (Test de Cooper policial)',
      tiempoMeta: '11 min 45 s (Varones) / 13 min 15 s (Damas)',
      pauta: 'Meta EO-PNP: Registra 2,400m en menos de 11:45 min. Entrena con cambios bruscos de velocidad simulando persecución a pie.'
    },
    natacion: {
      distancia: '50 metros libres en piscina reglamentaria',
      tiempoMeta: 'Menos de 50 segundos',
      pauta: 'Natación fluida sin apoyos laterales. Requisito indispensable para unidades de rescate y orden público.'
    },
    fuerzaTrenSuperior: {
      ejercicio: 'Barras fijas con agarre prono',
      repeticiones: '10 a 14 repeticiones',
      pauta: 'Mentón sobre la barra en cada repetición. No se computan medias repeticiones.'
    },
    flexionesAbdominales: {
      ejercicio: 'Flexiones y abdominales en 1 minuto',
      repeticiones: '45 planchas / 50 abdominales',
      pauta: 'Foco en resistencia explosiva para maniobras de reducción física e intervención.'
    },
    saltoValor: {
      ejercicio: 'Pista de obstáculos y salto táctico',
      requisito: 'Agilidad y coordinación motriz',
      pauta: 'Equilibrio en viga, salto de zanja y muro táctico de 1.80m.'
    }
  },

  EESTP_PNP: {
    nombre: 'Escuela Técnico Superior PNP',
    sigla: 'EESTP-PNP',
    fuerza: 'Policía Nacional',
    lema: 'Al Servicio de la Comunidad con Valor',
    metaPrincipal: 'Resistencia física y capacidad de patrullaje de choque',
    trote: {
      distancia: '2,400 metros planos',
      tiempoMeta: '12 min 00 s (Varones) / 13 min 30 s (Damas)',
      pauta: 'Realiza trote matutino continuo de 30 a 40 minutos 3 veces por semana.'
    },
    natacion: {
      distancia: '25 metros a 50 metros libres',
      tiempoMeta: 'Menos de 55 segundos (50m)',
      pauta: 'Supervivencia en medio acuático con flotabilidad básica controlada.'
    },
    fuerzaTrenSuperior: {
      ejercicio: 'Barras fijas',
      repeticiones: '8 a 12 repeticiones',
      pauta: 'Dominadas con brazos completamente estirados en la fase de descenso.'
    },
    flexionesAbdominales: {
      ejercicio: 'Flexo-extensiones y abdominales',
      repeticiones: '42 planchas / 48 abdominales en 1 min',
      pauta: 'Control de respiración (inhala al descender, exhala en el empuje explosivo).'
    },
    saltoValor: {
      ejercicio: 'Circuito de agilidad policial',
      requisito: 'Cumplimiento en tiempo límite',
      pauta: 'Prueba de resistencia anaeróbica de corta duración y alta intensidad.'
    }
  }
};

export const TACTICAL_STUDY_HABITS = [
  {
    id: 'pomodoro_militar',
    titulo: 'Técnica Pomodoro Militar (50/10)',
    subtitulo: 'Bloques de enfoque hiperconcentrado',
    descripcion: 'Dedica 50 minutos ininterrumpidos a resolver reactivos numéricos con cero distracciones digitales (celular en modo avión en otra habitación). Luego, toma exactamente 10 minutos de pausa activa con hidratación y respiración diafragmática. Nunca tomes pantallas en el descanso.',
    badge: 'ENFOQUE MÁXIMO',
    icono: '⏱️'
  },
  {
    id: 'higiene_sueno',
    titulo: 'Protocolo de Sueño Circadiano (7 a 8 Horas)',
    subtitulo: 'Consolidación neuronal y memoria motora',
    descripcion: 'Las fórmulas matemáticas y las respuestas procedimentales se consolidan en el hipocampo durante la fase de sueño REM y de onda lenta. Dormir menos de 6 horas reduce la velocidad de procesamiento cognitivo en un 35% y eleva los niveles de cortisol, afectando tu rendimiento físico.',
    badge: 'RECUPERACIÓN VITAL',
    icono: '🌙'
  },
  {
    id: 'simulacro_presion',
    titulo: 'Simulacros Dominicales a 72 Segundos',
    subtitulo: 'Entrenamiento de fatiga bajo cronómetro',
    descripcion: 'Rinde cada domingo una batería de 20 preguntas con el cronómetro de 72 segundos por pregunta. Entrena a tu mente para no congelarse ante enunciados largos y para tomar decisiones instantáneas entre calcular o descartar alternativas.',
    badge: 'ESTRÉS CONTROLADO',
    icono: '🎯'
  },
  {
    id: 'nutricion_hidratacion',
    titulo: 'Nutrición Táctica e Hidratación Cerebral',
    subtitulo: 'Combustible limpio para la mente y el músculo',
    descripcion: 'Una deshidratación de apenas 2% degrada el razonamiento analítico y el tiempo de reacción. Consume entre 2.5 y 3 litros de agua diaria, evita picos de glucosa (comida ultraprocesada) y prioriza proteínas magras, grasas saludables (palta, frutos secos) y carbohidratos complejos.',
    badge: 'ENERGÍA CONSTANTE',
    icono: '🥗'
  }
];
