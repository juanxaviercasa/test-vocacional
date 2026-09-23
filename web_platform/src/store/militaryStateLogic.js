/**
 * militaryStateLogic.js
 * Lógica Matemática Central y Reglas de Negocio para Admisión Militar y Policial (FFAA & PNP).
 * Integra:
 * 1. Hard Filter Legal y Antropométrico ('investigacion_2.json')
 * 2. Psicometría IPIP-NEO Big Five con Distancia Euclidiana ('psicometria.json')
 * 3. Muestreo Aleatorio de 20 Preguntas sin Repetición con LaTeX ('conocimientos.json')
 * 4. Ponderación de Viabilidad Definitiva para las 8 Escuelas
 */

// Mapeo oficial de las 8 escuelas matrices del Perú
export const ESCUELAS_MAP = {
  EMCH: {
    id: 'EMCH',
    nombre: 'Escuela Militar de Chorrillos',
    nombre_completo: 'Escuela Militar de Chorrillos "Coronel Francisco Bolognesi"',
    rama: 'Ejército del Perú',
    rango: 'Oficial',
    icono: '⚔️',
    color: '#1b4d3e',
    accent: '#d4af37',
    perfil_key: 'Ejercito_Peru',
    es_oficial: true
  },
  ETE: {
    id: 'ETE',
    nombre: 'Escuela Técnica del Ejército',
    nombre_completo: 'Instituto de Educación Superior Tecnológico Público del Ejército - ETE',
    rama: 'Ejército del Perú',
    rango: 'Suboficial',
    icono: '🛡️',
    color: '#2e4a3d',
    accent: '#8db596',
    perfil_key: 'Ejercito_Peru',
    es_oficial: false
  },
  ENP: {
    id: 'ENP',
    nombre: 'Escuela Naval del Perú',
    nombre_completo: 'Escuela Naval del Perú',
    rama: 'Marina de Guerra del Perú',
    rango: 'Oficial',
    icono: '⚓',
    color: '#0f2b48',
    accent: '#e6c65c',
    perfil_key: 'Marina_Guerra_Peru',
    es_oficial: true
  },
  CITEN: {
    id: 'CITEN',
    nombre: 'Instituto Naval - CITEN',
    nombre_completo: 'Instituto de Educación Superior Tecnológico Público Naval - CITEN',
    rama: 'Marina de Guerra del Perú',
    rango: 'Suboficial',
    icono: '🚢',
    color: '#1c3d5a',
    accent: '#93c5fd',
    perfil_key: 'Marina_Guerra_Peru',
    es_oficial: false
  },
  EOFAP: {
    id: 'EOFAP',
    nombre: 'Escuela de Oficiales FAP',
    nombre_completo: 'Escuela de Oficiales de la Fuerza Aérea del Perú "Capitán FAP José Quiñones"',
    rama: 'Fuerza Aérea del Perú',
    rango: 'Oficial',
    icono: '✈️',
    color: '#1e3a8a',
    accent: '#60a5fa',
    perfil_key: 'Fuerza_Aerea_Peru',
    es_oficial: true
  },
  ESOFA: {
    id: 'ESOFA',
    nombre: 'Escuela de Suboficiales FAP',
    nombre_completo: 'Escuela de Suboficiales de la Fuerza Aérea del Perú',
    rama: 'Fuerza Aérea del Perú',
    rango: 'Suboficial',
    icono: '🛩️',
    color: '#2563eb',
    accent: '#93c5fd',
    perfil_key: 'Fuerza_Aerea_Peru',
    es_oficial: false
  },
  EO_PNP: {
    id: 'EO_PNP',
    nombre: 'Escuela de Oficiales PNP',
    nombre_completo: 'Escuela de Oficiales de la Policía Nacional del Perú',
    rama: 'Policía Nacional del Perú',
    rango: 'Oficial',
    icono: '👮',
    color: '#14532d',
    accent: '#86efac',
    perfil_key: 'Policia_Nacional_Peru',
    es_oficial: true
  },
  EESTP_PNP: {
    id: 'EESTP_PNP',
    nombre: 'Escuela Técnico Superior PNP',
    nombre_completo: 'Escuelas de Educación Superior Técnico Profesional PNP',
    rama: 'Policía Nacional del Perú',
    rango: 'Suboficial',
    icono: '🚔',
    color: '#166534',
    accent: '#4ade80',
    perfil_key: 'Policia_Nacional_Peru',
    es_oficial: false
  }
};

// ============================================================================
// 1. HARD FILTER: BAREMOS LEGALES Y ANTROPOMÉTRICOS ('investigacion_2.json')
// ============================================================================
export function evaluateHardFilter(candidateData, investigacionData) {
  const {
    edad = 18,
    sexo = 'M',
    talla_cm = 170,
    peso_kg = 68,
    estado_civil = 'soltero',
    tiene_hijos = false,
    tiene_antecedentes = false,
    secundaria_completa = true
  } = candidateData;

  const imc = Number((peso_kg / Math.pow(talla_cm / 100, 2)).toFixed(1));
  const isImcNormal = imc >= 18.5 && imc <= 27.5;

  const schoolVerdicts = {};
  let totalAptas = 0;

  // Si investigacionData es una lista (de investigacion_2.json)
  const list = Array.isArray(investigacionData) ? investigacionData : [];

  Object.values(ESCUELAS_MAP).forEach(esc => {
    // Buscar la configuración en investigacionData por coincidencia de nombre o rama
    const matchedInst = list.find(item =>
      (item.institucion_nombre && item.institucion_nombre.toLowerCase().includes(esc.id.toLowerCase())) ||
      (item.institucion_nombre && item.institucion_nombre.toLowerCase().includes(esc.nombre.toLowerCase())) ||
      (item.rango_formacion && item.rango_formacion.toLowerCase() === esc.rango.toLowerCase() &&
       item.rama_fuerza && item.rama_fuerza.toLowerCase().includes(esc.rama.toLowerCase().split(' ')[0]))
    );

    const reqs = matchedInst?.requisitos_basicos || {
      edad_minima_anios: esc.es_oficial ? 15 : 15,
      edad_maxima_anios: esc.es_oficial ? 21 : 23,
      talla_minima_masculina_cm: esc.es_oficial ? 168 : 160,
      talla_minima_femenina_cm: esc.es_oficial ? 158 : 155,
    };

    const minTalla = sexo === 'F' ? reqs.talla_minima_femenina_cm : reqs.talla_minima_masculina_cm;
    const minEdad = reqs.edad_minima_anios || 15;
    const maxEdad = reqs.edad_maxima_anios || 22;

    const blockingReasons = [];
    const warnings = [];

    // Validaciones estrictas (Hard Blocks)
    if (talla_cm < minTalla) {
      blockingReasons.push(`Talla insuficiente: ${talla_cm} cm (Mínimo exigido: ${minTalla} cm).`);
    } else if (talla_cm < minTalla + 2) {
      warnings.push(`Talla en el umbral crítico reglamentario (${talla_cm} cm vs ${minTalla} cm).`);
    }

    if (edad < minEdad) {
      blockingReasons.push(`Edad menor a la reglamentaria: ${edad} años (Mínimo: ${minEdad} años).`);
    } else if (edad > maxEdad) {
      blockingReasons.push(`Excede la edad límite de admisión: ${edad} años (Máximo permitido: ${maxEdad} años).`);
    }

    if (estado_civil.toLowerCase() !== 'soltero' && estado_civil.toLowerCase() !== 'soltera') {
      blockingReasons.push(`Estado civil incompatible: Se exige estrictamente soltero(a).`);
    }

    if (tiene_hijos) {
      blockingReasons.push(`Condición familiar: Reglamento prohíbe tener dependientes directos o hijos.`);
    }

    if (tiene_antecedentes) {
      blockingReasons.push(`Descalificación legal: Registro de antecedentes policiales, penales o judiciales.`);
    }

    if (!secundaria_completa) {
      blockingReasons.push(`Grado de instrucción: Requiere constancia oficial de educación secundaria completa.`);
    }

    if (!isImcNormal) {
      warnings.push(`IMC fuera de rango óptimo (${imc} kg/m²). Podría requerir acondicionamiento previo.`);
    }

    const isApto = blockingReasons.length === 0;
    if (isApto) totalAptas++;

    schoolVerdicts[esc.id] = {
      escuela_id: esc.id,
      nombre: esc.nombre,
      rama: esc.rama,
      rango: esc.rango,
      es_apto: isApto,
      motivos_descalificacion: blockingReasons,
      advertencias: warnings,
      min_talla: minTalla,
      min_edad: minEdad,
      max_edad: maxEdad
    };
  });

  return {
    candidate: { ...candidateData, imc, isImcNormal },
    schoolVerdicts,
    totalAptas,
    esElegibleGeneral: totalAptas > 0
  };
}

// ============================================================================
// 2. TEST PSICOMÉTRICO: IPIP-NEO Y DISTANCIA EUCLIDIANA ('psicometria.json')
// ============================================================================
export function samplePsychometricItems(bancoItems, mode = 'integral_120') {
  const is120 = mode === 'integral_120';
  const perDomain = is120 ? 24 : 10; // 120 total o 50 total (24 x 5 o 10 x 5)

  const domains = ['Neuroticismo', 'Extraversión', 'Apertura', 'Amabilidad', 'Responsabilidad'];
  const sampled = [];

  domains.forEach(dom => {
    const candidates = bancoItems.filter(item =>
      (item.dominio_evaluado || '').toLowerCase().includes(dom.toLowerCase().substring(0, 5))
    );

    // Muestreo sin reemplazo
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    sampled.push(...shuffled.slice(0, perDomain));
  });

  // Barajar todo el conjunto para presentación interactiva
  return sampled.sort(() => 0.5 - Math.random());
}

/**
 * Calcula puntuaciones normalizadas Big Five (0 - 100) y Distancia Euclidiana
 * frente a los perfiles institucionales esperados.
 */
export function calculatePsychometricEuclidean(answers, questions, perfilesIdeales) {
  const domains = ['Neuroticismo', 'Extraversión', 'Apertura', 'Amabilidad', 'Responsabilidad'];
  const domainRawScores = { Neuroticismo: 0, Extraversión: 0, Apertura: 0, Amabilidad: 0, Responsabilidad: 0 };
  const domainCounts = { Neuroticismo: 0, Extraversión: 0, Apertura: 0, Amabilidad: 0, Responsabilidad: 0 };

  // 1. Sumar respuestas ponderadas según polaridad
  questions.forEach(q => {
    const rawVal = answers[q.id_reactivo] !== undefined ? answers[q.id_reactivo] : 3; // default neutral 3
    const polarity = q.polaridad_puntuacion || 1;
    // Si polaridad es +1: 1->1, 5->5. Si es -1: 1->5, 5->1
    const scoredVal = polarity === 1 ? rawVal : (6 - rawVal);

    domains.forEach(dom => {
      if ((q.dominio_evaluado || '').toLowerCase().includes(dom.toLowerCase().substring(0, 5))) {
        domainRawScores[dom] += scoredVal;
        domainCounts[dom]++;
      }
    });
  });

  // 2. Normalizar a escala 0 a 100
  const normalizedScores = {};
  domains.forEach(dom => {
    const count = domainCounts[dom] || 1;
    const avg = domainRawScores[dom] / count; // rango 1.0 a 5.0
    normalizedScores[dom] = Math.round(((avg - 1.0) / 4.0) * 100);
  });

  // 3. Cálculo de Distancia Euclidiana frente a cada escuela
  const compatibilityBySchool = {};
  const maxPossibleDistance = Math.sqrt(5 * Math.pow(100, 2)); // ~223.606

  Object.values(ESCUELAS_MAP).forEach(esc => {
    const profileKey = esc.perfil_key || 'Ejercito_Peru';
    const expected = perfilesIdeales[profileKey] || {
      Neuroticismo: { ideal: 18 },
      Extraversion: { ideal: 78 },
      Apertura: { ideal: 65 },
      Amabilidad: { ideal: 68 },
      Responsabilidad: { ideal: 92 }
    };

    // Ajuste fino según si es Oficial (más liderazgo/apertura) o Suboficial (más técnico/disciplina)
    const idealN = expected.Neuroticismo?.ideal || 18;
    const idealE = esc.es_oficial ? (expected.Extraversion?.ideal || 75) + 3 : (expected.Extraversion?.ideal || 75) - 3;
    const idealO = esc.es_oficial ? (expected.Apertura?.ideal || 70) + 5 : (expected.Apertura?.ideal || 70) - 5;
    const idealA = expected.Amabilidad?.ideal || 68;
    const idealC = esc.es_oficial ? (expected.Responsabilidad?.ideal || 90) : (expected.Responsabilidad?.ideal || 90) + 4;

    const diffN = normalizedScores.Neuroticismo - idealN;
    const diffE = normalizedScores.Extraversión - idealE;
    const diffO = normalizedScores.Apertura - idealO;
    const diffA = normalizedScores.Amabilidad - idealA;
    const diffC = normalizedScores.Responsabilidad - idealC;

    // Distancia Euclidiana en 5 dimensiones
    const euclideanDistance = Math.sqrt(
      Math.pow(diffN, 2) +
      Math.pow(diffE, 2) +
      Math.pow(diffO, 2) +
      Math.pow(diffA, 2) +
      Math.pow(diffC, 2)
    );

    // Afinidad Porcentual Inversamente Proporcional a la Distancia
    const affinityPct = Math.max(0, Math.min(100, Math.round((1 - (euclideanDistance / maxPossibleDistance)) * 100)));

    compatibilityBySchool[esc.id] = {
      escuela_id: esc.id,
      nombre: esc.nombre,
      rama: esc.rama,
      rango: esc.rango,
      euclidean_distance: Number(euclideanDistance.toFixed(2)),
      afinidad_pct: affinityPct,
      perfil_ideal: { N: idealN, E: idealE, O: idealO, A: idealA, C: idealC }
    };
  });

  return {
    normalizedBigFive: normalizedScores,
    compatibilityBySchool
  };
}

// ============================================================================
// 3. SIMULADOR DE CONOCIMIENTOS: 20 PREGUNTAS SIN REPETIR ('conocimientos.json')
// ============================================================================
export function sampleKnowledge20Questions(bancoPreguntas) {
  const pool = Array.isArray(bancoPreguntas) ? bancoPreguntas : (bancoPreguntas?.banco_preguntas_conocimientos || []);
  
  const areas = ['Psicotécnico', 'Ciencias Exactas', 'Ciencias Naturales', 'Letras y Humanidades'];
  const sampled20 = [];

  areas.forEach(areaName => {
    const candidates = pool.filter(q =>
      (q.area_academica || '').toLowerCase().includes(areaName.toLowerCase().substring(0, 7))
    );

    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    // 5 preguntas de cada una de las 4 áreas = exactamente 20 preguntas sin repetir
    sampled20.push(...shuffled.slice(0, 5));
  });

  // Si por alguna razón alguna área tuviera menos de 5, completar del resto
  if (sampled20.length < 20) {
    const remaining = pool.filter(q => !sampled20.some(s => s.id_pregunta === q.id_pregunta));
    const extra = [...remaining].sort(() => 0.5 - Math.random()).slice(0, 20 - sampled20.length);
    sampled20.push(...extra);
  }

  // Barajar aleatoriamente el orden de presentación
  return sampled20.sort(() => 0.5 - Math.random());
}

export function gradeKnowledgeExam(userAnswers, questions) {
  let aciertos = 0;
  let errores = 0;
  let blancos = 0;

  questions.forEach(q => {
    const userChoice = userAnswers[q.id_pregunta];
    const correctOpt = (q.opciones || []).find(o => o.es_correcta);
    const correctId = correctOpt ? correctOpt.id_opcion : null;

    if (!userChoice) {
      blancos++;
    } else if (userChoice === correctId) {
      aciertos++;
    } else {
      errores++;
    }
  });

  const total = questions.length || 20;
  // Penalización oficial de concurso: Acierto +1.0, Error -0.25, Blanco 0.0
  const puntajeNeto = Math.max(0.0, aciertos * 1.0 - errores * 0.25);
  const notaVigesimal = Number(((puntajeNeto / total) * 20.0).toFixed(2));
  const esAprobado = notaVigesimal >= 12.0;

  return {
    aciertos,
    errores,
    blancos,
    puntajeNeto: Number(puntajeNeto.toFixed(2)),
    notaVigesimal,
    esAprobado,
    porcentajeAcierto: Math.round((puntajeNeto / total) * 100)
  };
}

// ============================================================================
// 4. DICTAMEN CONSOLIDADO: DASHBOARD FINAL Y PORCENTAJE DE VIABILIDAD DEFINITIVO
// ============================================================================
export function computeConsolidatedViability({
  hardFilterResult,
  psychometricResult,
  knowledgeResult,
  physicalScore = 16.0
}) {
  const schoolVerdicts = hardFilterResult?.schoolVerdicts || {};
  const psychoCompat = psychometricResult?.compatibilityBySchool || {};
  const knowledgePct = knowledgeResult?.porcentajeAcierto || 50;

  // Escala física normalizada a 0-100 (nota vigesimal / 20 * 100)
  const physicalPct = Math.min(100, Math.max(0, (physicalScore / 20.0) * 100));

  const viabilityList = [];

  Object.values(ESCUELAS_MAP).forEach(esc => {
    const verdict = schoolVerdicts[esc.id] || { es_apto: true, motivos_descalificacion: [] };
    const isHardBlocked = !verdict.es_apto;

    const psychoScore = psychoCompat[esc.id]?.afinidad_pct || 50;

    let finalViability = 0;
    let statusText = '';
    let badgeType = '';

    if (isHardBlocked) {
      // Hard filter gatekeeper: 0% viabilidad si incumple ley
      finalViability = 0;
      statusText = 'NO APTO POR LEY (DESCALIFICADO)';
      badgeType = 'danger';
    } else {
      // Ponderación multi-pilar:
      // 35% Psicometría (Distancia Euclidiana) + 35% Conocimientos + 30% Esfuerzo Físico
      finalViability = Math.round(
        (psychoScore * 0.35) +
        (knowledgePct * 0.35) +
        (physicalPct * 0.30)
      );

      if (finalViability >= 80) {
        statusText = 'ALTA VOCACIÓN Y VIABILIDAD ÓPTIMA';
        badgeType = 'success';
      } else if (finalViability >= 65) {
        statusText = 'VIABLE CON RECOMENDACIÓN TÁCTICA';
        badgeType = 'warning';
      } else {
        statusText = 'COMPATIBILIDAD MODERADA';
        badgeType = 'info';
      }
    }

    viabilityList.push({
      id: esc.id,
      nombre: esc.nombre,
      nombre_completo: esc.nombre_completo,
      rama: esc.rama,
      rango: esc.rango,
      icono: esc.icono,
      color: esc.color,
      accent: esc.accent,
      isHardBlocked,
      blockingReasons: verdict.motivos_descalificacion || [],
      warnings: verdict.advertencias || [],
      viabilidad_pct: finalViability,
      psico_score: psychoScore,
      euclidean_distance: psychoCompat[esc.id]?.euclidean_distance || 0,
      knowledge_score: knowledgePct,
      physical_score: physicalPct,
      statusText,
      badgeType
    });
  });

  // Ordenar por viabilidad descendente
  viabilityList.sort((a, b) => b.viabilidad_pct - a.viabilidad_pct);

  const winningSchool = viabilityList[0];

  return {
    ranking: viabilityList,
    winningSchool,
    hasEligibleSchool: viabilityList.some(s => !s.isHardBlocked && s.viabilidad_pct >= 60),
    resumen: {
      totalEvaluadas: viabilityList.length,
      aptasLegales: viabilityList.filter(s => !s.isHardBlocked).length,
      bloqueadasLegales: viabilityList.filter(s => s.isHardBlocked).length
    }
  };
}
