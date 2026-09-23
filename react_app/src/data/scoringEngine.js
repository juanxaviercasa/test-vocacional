/**
 * Motor Matemático y Algorítmico Consolidado (Scoring Engine Multi-Pilar)
 * Integra los 4 pilares y calcula el perfil de ajuste psicométrico, operacional y académico.
 */

import { INSTITUCIONES_MILITARES, evaluateLegalCandidate } from './legalRequirements.js';
import { PSICOMETRIC_QUESTIONS } from './psychometricQuestions.js';

export function calculatePsychometricScores(answers) {
  // answers: { [id_reactivo]: 1..5 }
  const domainTotals = {
    Neuroticismo: { sum: 0, count: 0 },
    Extraversión: { sum: 0, count: 0 },
    Apertura: { sum: 0, count: 0 },
    Amabilidad: { sum: 0, count: 0 },
    Responsabilidad: { sum: 0, count: 0 }
  };

  PSICOMETRIC_QUESTIONS.forEach(q => {
    const rawVal = answers[q.id] || 3;
    const scoredVal = q.polaridad === 1 ? rawVal : 6 - rawVal;
    if (domainTotals[q.dominio]) {
      domainTotals[q.dominio].sum += scoredVal;
      domainTotals[q.dominio].count += 1;
    }
  });

  // Normalizar a escala percentil 0 a 100
  const percentiles = {
    N: Math.round(((domainTotals.Neuroticismo.sum - domainTotals.Neuroticismo.count) / (domainTotals.Neuroticismo.count * 4)) * 100) || 30,
    E: Math.round(((domainTotals.Extraversión.sum - domainTotals.Extraversión.count) / (domainTotals.Extraversión.count * 4)) * 100) || 70,
    O: Math.round(((domainTotals.Apertura.sum - domainTotals.Apertura.count) / (domainTotals.Apertura.count * 4)) * 100) || 60,
    A: Math.round(((domainTotals.Amabilidad.sum - domainTotals.Amabilidad.count) / (domainTotals.Amabilidad.count * 4)) * 100) || 65,
    C: Math.round(((domainTotals.Responsabilidad.sum - domainTotals.Responsabilidad.count) / (domainTotals.Responsabilidad.count * 4)) * 100) || 85
  };

  return percentiles;
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

export function computeConsolidatedViability(candidate, psychAnswers, interestsAnswers, knowledgeAnswers, dilemmas, knowledgeQuestions) {
  const legalEval = evaluateLegalCandidate(candidate);
  const psychScores = calculatePsychometricScores(psychAnswers);
  const interestsEval = calculateInterestsAffinity(interestsAnswers, dilemmas);
  const knowEval = calculateKnowledgeGrade(knowledgeAnswers, knowledgeQuestions);

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

    // Afinidad de Conocimientos
    const knowFit = Math.min(100, Math.round((knowEval.score20 / 20) * 100));

    // Ponderación multi-pilar: Psicométrico (35%), Intereses (25%), Conocimientos (40%)
    let compatibilidad = Math.round(psychFit * 0.35 + interestFit * 0.25 + knowFit * 0.40);

    // Penalización drástica si no cumple requisitos legales reglamentarios
    if (!item.esApto) {
      compatibilidad = Math.min(compatibilidad, 45);
    }

    return {
      escuela: esc,
      esApto: item.esApto,
      motivo: item.motivo,
      compatibilidad,
      psychFit,
      interestFit,
      knowFit,
      radarData: {
        user: [psychScores.N, psychScores.E, psychScores.O, psychScores.A, psychScores.C, knowFit],
        ideal: [ideal.N, ideal.E, ideal.O, ideal.A, ideal.C, Math.round((ideal.know / 20) * 100)]
      }
    };
  });

  // Ordenar de mayor a menor compatibilidad
  schoolScores.sort((a, b) => b.compatibilidad - a.compatibilidad);

  const topSchool = schoolScores[0];

  return {
    candidate,
    legalEval,
    psychScores,
    interestsEval,
    knowEval,
    schoolScores,
    topSchool
  };
}
