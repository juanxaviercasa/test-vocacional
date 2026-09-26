/**
 * Motor Matemático y Algorítmico Consolidado (Scoring Engine Multi-Pilar 360°)
 * Especialista en Evaluación y Diagnóstico Castrense para las FF.AA. y PNP.
 */

import { INSTITUCIONES_MILITARES, evaluateLegalCandidate } from './legalRequirements.js';
import { PSICOMETRIC_QUESTIONS } from './psychometricQuestions.js';
import { COGNITIVE_QUESTIONS } from './cognitiveQuestions.js';

export function calculatePsychometricScores(answers) {
  // answers: { [id_reactivo]: 1..5 }
  const domainTotals = {
    Neuroticismo: { sum: 0, count: 0 },
    Extraversión: { sum: 0, count: 0 },
    Apertura: { sum: 0, count: 0 },
    Amabilidad: { sum: 0, count: 0 },
    Responsabilidad: { sum: 0, count: 0 }
  };

  let valHitsDesirable = 0;
  let totalValItems = 0;
  const alertasClinicas = [];
  let riesgoArmas = false;
  let riesgoClaustrofobia = false;

  PSICOMETRIC_QUESTIONS.forEach(q => {
    const rawVal = answers[q.id] !== undefined ? Number(answers[q.id]) : 3;

    // Escala L (Control de Mentira / Deseabilidad Social)
    if (q.esControlMentira) {
      totalValItems++;
      if (rawVal >= 4) {
        valHitsDesirable++;
      }
      return;
    }

    // Banderas Rojas Clínicas (Seguridad y Confinamiento)
    if (q.esClinica) {
      if (rawVal >= (q.umbral || 4)) {
        if (q.riesgo === 'PORTE_ARMAS') {
          riesgoArmas = true;
          alertasClinicas.push("ALERTA CRÍTICA (Porte de Armas): Indicadores de impulsividad o agresividad reactiva. Requiere evaluación psiquiátrica.");
        } else if (q.riesgo === 'CLAUSTROFOBIA') {
          riesgoClaustrofobia = true;
          alertasClinicas.push("RESTRICCIÓN TÁCTICA: Síntomas de fobia en confinamiento (incompatible con submarinos o blindados cerrados).");
        }
      }
      return;
    }

    const scoredVal = q.polaridad === 1 ? rawVal : (6 - rawVal);
    if (domainTotals[q.dominio]) {
      domainTotals[q.dominio].sum += scoredVal;
      domainTotals[q.dominio].count += 1;
    }
  });

  // Normalizar a escala percentil 0 a 100
  const percentiles = {
    N: domainTotals.Neuroticismo.count > 0 ? Math.round(((domainTotals.Neuroticismo.sum - domainTotals.Neuroticismo.count) / (domainTotals.Neuroticismo.count * 4)) * 100) : 25,
    E: domainTotals.Extraversión.count > 0 ? Math.round(((domainTotals.Extraversión.sum - domainTotals.Extraversión.count) / (domainTotals.Extraversión.count * 4)) * 100) : 75,
    O: domainTotals.Apertura.count > 0 ? Math.round(((domainTotals.Apertura.sum - domainTotals.Apertura.count) / (domainTotals.Apertura.count * 4)) * 100) : 70,
    A: domainTotals.Amabilidad.count > 0 ? Math.round(((domainTotals.Amabilidad.sum - domainTotals.Amabilidad.count) / (domainTotals.Amabilidad.count * 4)) * 100) : 65,
    C: domainTotals.Responsabilidad.count > 0 ? Math.round(((domainTotals.Responsabilidad.sum - domainTotals.Responsabilidad.count) / (domainTotals.Responsabilidad.count * 4)) * 100) : 90
  };

  // Cálculo de Sinceridad Escala L
  const lieRatio = totalValItems > 0 ? valHitsDesirable / totalValItems : 0;
  const indiceSinceridad = Math.round(Math.max(0, (1 - lieRatio) * 100));
  const alertaFalsaVirtud = valHitsDesirable >= 2;

  return {
    ...percentiles,
    indiceSinceridad,
    alertaFalsaVirtud,
    alertasClinicas,
    riesgoArmas,
    riesgoClaustrofobia
  };
}

export function calculateInterestsAffinity(interestsAnswers, dilemmas) {
  // interestsAnswers: { [dilemmaId]: optionId }
  const branchCounts = { FAP: 0, Marina: 0, Ejército: 0, PNP: 0 };
  let totalAnswered = 0;

  dilemmas.forEach(dil => {
    const selectedOptId = interestsAnswers[dil.id];
    if (selectedOptId) {
      const opt = dil.opciones.find(o => o.id === selectedOptId);
      if (opt && branchCounts[opt.rama] !== undefined) {
        branchCounts[opt.rama] += 1;
        totalAnswered += 1;
      }
    }
  });

  const affinity = {};
  for (const branch in branchCounts) {
    affinity[branch] = totalAnswered > 0 
      ? Math.round((branchCounts[branch] / totalAnswered) * 100) 
      : 25;
  }

  return { branchCounts, affinity };
}

export function calculateCognitiveScores(cognitiveAnswers, questions = COGNITIVE_QUESTIONS) {
  let ravenHits = 0;
  let ravenTotal = 0;
  let bennettHits = 0;
  let bennettTotal = 0;

  const hasAnswers = Boolean(cognitiveAnswers && Object.keys(cognitiveAnswers).length > 0);

  questions.forEach(q => {
    const chosen = cognitiveAnswers ? cognitiveAnswers[q.id] : null;
    const correctOpt = q.opciones.find(o => o.esCorrecta);
    const isCorrect = chosen && correctOpt && chosen === correctOpt.id;

    if (q.tipo === 'RAVEN_MATRIZ') {
      ravenTotal++;
      if (isCorrect) ravenHits++;
    } else if (q.tipo === 'BENNETT_MECANICA') {
      bennettTotal++;
      if (isCorrect) bennettHits++;
    }
  });

  const factorG = hasAnswers && ravenTotal > 0 ? Math.round((ravenHits / ravenTotal) * 100) : 78;
  const aptitudMecanica = hasAnswers && bennettTotal > 0 ? Math.round((bennettHits / bennettTotal) * 100) : 72;
  const velocidad = 80;
  const globalIndex = Math.round((factorG * 0.45) + (aptitudMecanica * 0.35) + (velocidad * 0.20));

  let nivel = 'PROMEDIO_APTO';
  if (globalIndex >= 80) nivel = 'SUPERIOR_ELITE';
  else if (globalIndex < 55) nivel = 'CRITICO_OBSERVADO';

  return {
    factorG,
    aptitudMecanica,
    velocidad,
    globalIndex,
    nivel
  };
}

export function calculateKnowledgeGrade(knowledgeAnswers, questions) {
  let correctCount = 0;
  const total = questions.length || 1;

  questions.forEach(q => {
    const chosen = knowledgeAnswers[q.id];
    const correctOpt = q.opciones.find(o => o.esCorrecta);
    if (chosen && correctOpt && chosen === correctOpt.id) {
      correctCount++;
    }
  });

  const score20 = parseFloat(((correctCount / total) * 20).toFixed(1));
  const pct = Math.round((correctCount / total) * 100);

  return { correctCount, total, score20, pct };
}

/**
 * Motor Vocacional y Diagnóstico Integral 360° (Módulo 1)
 */
export function computeVocationalViability(
  candidate,
  psychAnswers,
  interestsAnswers,
  dilemmas,
  cognitiveAnswers = {},
  physicalMarks = {}
) {
  const legalEval = evaluateLegalCandidate(candidate);
  const psychScores = calculatePsychometricScores(psychAnswers);
  const interestsEval = calculateInterestsAffinity(interestsAnswers, dilemmas);
  const cogScores = calculateCognitiveScores(cognitiveAnswers, COGNITIVE_QUESTIONS);

  // Rendimiento físico referencial (0 a 20)
  const physScore = physicalMarks && physicalMarks.promedio_fisico ? Number(physicalMarks.promedio_fisico) : 15.0;
  const physPct = Math.round((physScore / 20) * 100);

  const schoolScores = legalEval.results.map(item => {
    const esc = item.escuela;
    const ideal = esc.perfilIdeal;

    // Distancia Euclidiana normalizada en Big Five (0 a 100%)
    const distSq = 
      Math.pow(psychScores.N - ideal.N, 2) +
      Math.pow(psychScores.E - ideal.E, 2) +
      Math.pow(psychScores.O - ideal.O, 2) +
      Math.pow(psychScores.A - ideal.A, 2) +
      Math.pow(psychScores.C - ideal.C, 2);
    const maxDistSq = 5 * Math.pow(100, 2);
    const psychFit = Math.max(0, Math.min(100, Math.round(100 - (Math.sqrt(distSq) / Math.sqrt(maxDistSq)) * 100)));

    // Afinidad de Intereses (Rama)
    let ramaKey = "Ejército";
    if (esc.rama.includes("Aérea")) ramaKey = "FAP";
    else if (esc.rama.includes("Marina")) ramaKey = "Marina";
    else if (esc.rama.includes("Policía")) ramaKey = "PNP";
    const interestFit = interestsEval.affinity[ramaKey] || 50;

    // Ajuste Cognitivo según la Escuela (Marina y FAP demandan mayor componente mecánico)
    let schoolCogFit = cogScores.globalIndex;
    if (esc.id === 'ENP' || esc.id === 'CITEN' || esc.id === 'EOFAP') {
      schoolCogFit = Math.round(cogScores.factorG * 0.40 + cogScores.aptitudMecanica * 0.60);
    }

    // Ponderación Multi-Pilar 360°:
    // 25% Intereses + 25% Psicometría + 20% Cognitivo + 15% Físico + 15% Normativo
    let compatibilidad = Math.round(
      interestFit * 0.25 +
      psychFit * 0.25 +
      schoolCogFit * 0.20 +
      physPct * 0.15 +
      (item.esApto ? 100 : 0) * 0.15
    );

    // Penalización por Falsa Virtud / Deseabilidad Social extrema (-10%)
    if (psychScores.alertaFalsaVirtud) {
      compatibilidad = Math.round(compatibilidad * 0.90);
    }

    // Restricciones clínicas específicas
    let esAptoFinal = item.esApto;
    let motivoFinal = item.motivo;
    if (psychScores.riesgoClaustrofobia && (esc.id === 'ENP' || esc.id === 'CITEN')) {
      esAptoFinal = false;
      motivoFinal = (motivoFinal ? motivoFinal + ' | ' : '') + 'Restricción Clínica: Fobia en confinamiento submarino.';
      compatibilidad = Math.min(compatibilidad, 40);
    }

    if (!esAptoFinal) {
      compatibilidad = Math.min(compatibilidad, 45);
    }

    return {
      escuela: esc,
      esApto: esAptoFinal,
      motivo: motivoFinal,
      compatibilidad,
      psychFit,
      interestFit,
      cogFit: schoolCogFit,
      physFit: physPct,
      radarData: {
        user: [100 - psychScores.N, psychScores.E, cogScores.factorG, psychScores.C, interestFit, physPct],
        ideal: [100 - ideal.N, ideal.E, 85, ideal.C, 80, 85]
      }
    };
  });

  // Ordenar de mayor a menor compatibilidad
  schoolScores.sort((a, b) => b.compatibilidad - a.compatibilidad);
  const topSchool = schoolScores[0];

  // Especialidad sugerida para la escuela ganadora
  const topId = topSchool.escuela.id;
  let especialidadSugerida = "Oficial de Comando y Operaciones";
  if (topId === 'EOFAP') {
    especialidadSugerida = (candidate.agudeza_visual_20_20 !== false && !candidate.hasGlasses && cogScores.factorG >= 65)
      ? "Piloto de Caza y Combate Aéreo"
      : cogScores.aptitudMecanica >= 70
      ? "Mantenimiento Aeronáutico e Ingeniería de Vuelo"
      : "Defensa Aérea, Radares y Telecomunicaciones";
  } else if (topId === 'ENP') {
    especialidadSugerida = (physScore >= 15.5 && !psychScores.riesgoClaustrofobia)
      ? "Comando Anfibio / Infantería de Marina"
      : cogScores.aptitudMecanica >= 70
      ? "Ingeniería de Armas Navales y Sistemas de Propulsión"
      : "Guerra de Superficie y Guerra Electrónica";
  } else if (topId === 'EMCH') {
    especialidadSugerida = physScore >= 16.0
      ? "Infantería de Combate / Comandos del Ejército"
      : cogScores.aptitudMecanica >= 65
      ? "Caballería Blindada y Material de Guerra"
      : "Ingeniería Militar e Inteligencia Táctica";
  } else if (topId === 'EO_PNP' || topId === 'EO-PNP') {
    especialidadSugerida = cogScores.factorG >= 70
      ? "Investigación Criminal (DIRINCRI / Homicidios)"
      : physScore >= 16.0
      ? "Operaciones Tácticas Urbanas (SUAT / Rescate)"
      : "Seguridad Ciudadana e Inteligencia Policial";
  } else {
    especialidadSugerida = topSchool.escuela.especialidades?.[0] || "Especialista Operativo";
  }

  // IGAC: Índice Global de Aptitud para el Combate
  const igacScore = Math.round(
    (physPct * 0.25) +
    (cogScores.globalIndex * 0.25) +
    (topSchool.psychFit * 0.25) +
    (topSchool.interestFit * 0.15) +
    (psychScores.indiceSinceridad * 0.10)
  );

  let igacVerdict = "APTO REGULAR - CONDICIÓN OPERATIVA Y MENTAL FAVORABLE";
  let igacLevel = "warning";
  if (igacScore >= 82 && psychScores.alertasClinicas.length === 0 && !psychScores.alertaFalsaVirtud) {
    igacVerdict = "APTO DESTACADO - ALTA CAPACIDAD COMBATIENTE Y DE MANDO";
    igacLevel = "success";
  } else if (igacScore < 65 || psychScores.alertasClinicas.length > 0) {
    igacVerdict = "EN OBSERVACIÓN - REQUIERE REACONDICIONAMIENTO PRE-MILITAR INTEGRAL";
    igacLevel = "danger";
  }

  // Plan Táctico de Nivelación de 8 Semanas
  const planEntrenamiento = [
    { semana: "Semana 1-2", eje: "Acondicionamiento Base y Biometría", accion: "Nivelación de carrera continua (1500m) y técnica de brazada en natación estilo crol. Ajuste de nutrición para IMC." },
    { semana: "Semana 3-4", eje: "Destrezas Técnicas y Mecánicas", accion: "Práctica de poleas, transmisiones, engranajes y resolución de series de matrices abstractas 3x3." },
    { semana: "Semana 5-6", eje: "Psicotécnico y Velocidad bajo Presión", accion: "Simulacros cronometrados a 25 segundos por ítem. Control de la respiración y manejo del estrés." },
    { semana: "Semana 7-8", eje: "Simulacro de Tribunal y Entrevista", accion: "Ensayo de entrevista personal ante oficiales con preguntas de sinceridad real. Examen tipo admisión completo." }
  ];

  return {
    candidate,
    legalEval,
    psychScores,
    interestsEval,
    cogScores,
    physScore,
    schoolScores,
    topSchool,
    especialidadSugerida,
    igacMilitar: {
      score: igacScore,
      veredicto: igacVerdict,
      level: igacLevel
    },
    planEntrenamiento,
    verificationCode: `VOC-2026-${Math.floor(1000 + Math.random() * 9000)}`
  };
}

export function computeConsolidatedViability(candidate, psychAnswers, interestsAnswers, knowledgeAnswers, dilemmas, knowledgeQuestions) {
  const baseVoc = computeVocationalViability(candidate, psychAnswers, interestsAnswers, dilemmas);
  const knowEval = calculateKnowledgeGrade(knowledgeAnswers, knowledgeQuestions);

  return {
    ...baseVoc,
    knowEval
  };
}
