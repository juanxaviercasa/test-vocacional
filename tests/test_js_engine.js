/**
 * Validación automatizada del motor de cálculo JavaScript en Node.js.
 */
const { QUESTIONS_120, QUESTIONS_50 } = require('../web_platform/js/questions_data.js');
const { INSTITUTIONAL_PROFILES } = require('../web_platform/js/institutional_profiles.js');
const ScoringEngine = require('../web_platform/js/scoring_engine.js');

console.log('=== TEST SUITE JAVASCRIPT / NODE.JS ===');

// 1. Verificar carga de preguntas
console.log(`1. Preguntas cargadas: 120-items = ${QUESTIONS_120.length}, 50-items = ${QUESTIONS_50.length}`);
if (QUESTIONS_120.length !== 120 || QUESTIONS_50.length !== 50) {
  console.error('ERROR: Cantidad incorrecta de reactivos.');
  process.exit(1);
}

// 2. Probar cálculo de 120 preguntas (simulación postulante sereno y disciplinado)
const simulated120 = {};
QUESTIONS_120.forEach(q => {
  // Bajo Neuroticismo, alta Responsabilidad, buena Extraversión y Moralidad
  if (q.domain === 'N') {
    simulated120[q.id] = q.reversed ? 5 : 1;
  } else if (q.domain === 'C') {
    simulated120[q.id] = q.reversed ? 1 : 5;
  } else {
    simulated120[q.id] = q.reversed ? 2 : 4;
  }
});

const scoring120 = ScoringEngine.compute120(simulated120, 'M', 19);
console.log('2. Cálculo 120 items:');
console.log(`   - Neuroticismo Percentil: ${scoring120.domains.N.percentile}% (Nivel: ${scoring120.domains.N.level})`);
console.log(`   - Responsabilidad Percentil: ${scoring120.domains.C.percentile}% (Nivel: ${scoring120.domains.C.level})`);
console.log(`   - Cantidad de facetas calculadas: ${Object.keys(scoring120.facets).length}`);

if (scoring120.domains.N.percentile > 20 || scoring120.domains.C.percentile < 80) {
  console.error('ERROR: Los percentiles calculados en JS divergen de lo esperado.');
  process.exit(1);
}

// 3. Probar Matching Institucional con FAP
const matchingFAP = ScoringEngine.matchProfiles(scoring120, 'FAP');
console.log('3. Matching Institucional FAP:');
console.log(`   - Institución objetivo: ${matchingFAP.target_institution.name}`);
console.log(`   - Ajuste General: ${matchingFAP.target_institution.overall_fit}%`);
console.log(`   - Veredicto: ${matchingFAP.target_institution.verdict}`);
console.log(`   - Banderas rojas críticas: ${matchingFAP.target_institution.has_critical_red_flags ? 'SÍ' : 'NO'}`);
console.log(`   - Arquetipo asignado: ${matchingFAP.archetype.name}`);

if (matchingFAP.target_institution.overall_fit < 75 || matchingFAP.target_institution.has_critical_red_flags) {
  console.error('ERROR: El matching con FAP arrojó un veredicto erróneo.');
  process.exit(1);
}

// 4. Probar detección de Banderas Rojas (Impulsividad alta)
const answersRedFlag = { ...simulated120 };
// Modificar faceta de cólera e impulsividad a nivel máximo
QUESTIONS_120.forEach(q => {
  if (q.facet_key === 'anger' || q.facet_key === 'immoderation') {
    answersRedFlag[q.id] = q.reversed ? 1 : 5;
  }
});

const scoringRF = ScoringEngine.compute120(answersRedFlag, 'M', 20);
const matchingRF = ScoringEngine.matchProfiles(scoringRF, 'PNP');
console.log('4. Prueba de Banderas Rojas en PNP:');
console.log(`   - Banderas rojas detectadas: ${matchingRF.target_institution.red_flags.length}`);
console.log(`   - Alerta crítica: ${matchingRF.target_institution.has_critical_red_flags}`);
console.log(`   - Veredicto: ${matchingRF.target_institution.verdict}`);

if (!matchingRF.target_institution.has_critical_red_flags) {
  console.error('ERROR: No se detectó la bandera roja crítica en PNP.');
  process.exit(1);
}

console.log('=== TODOS LOS TESTS JAVASCRIPT PASARON CON ÉXITO ===');
