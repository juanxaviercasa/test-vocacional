/**
 * Motor de Cálculo Psicométrico y Matching Institucional en JavaScript (ES6).
 * Paridad matemática exacta con engine/ipip_engine.py y profile_matcher.py.
 */

const ScoringEngine = {
  // Constantes de aproximación cúbica empírica IPIP-NEO
  CUBIC_C1: 210.335958661391,
  CUBIC_C2: 16.7379362643389,
  CUBIC_C3: 0.405936512733332,
  CUBIC_C4: 0.00270624341822222,

  NORMS_DOMAINS_120: {
    M: {
      youth: {
        mean: { N: 67.84, E: 80.70, O: 85.98, A: 81.98, C: 79.66 },
        sd:   { N: 15.83, E: 15.37, O: 12.37, A: 14.66, C: 14.49 }
      },
      adult: {
        mean: { N: 60.50, E: 77.20, O: 83.40, A: 82.50, C: 83.10 },
        sd:   { N: 16.10, E: 15.80, O: 13.10, A: 14.20, C: 14.30 }
      }
    },
    F: {
      youth: {
        mean: { N: 74.67, E: 84.18, O: 86.82, A: 88.06, C: 81.18 },
        sd:   { N: 16.63, E: 15.75, O: 12.01, A: 13.57, C: 14.50 }
      },
      adult: {
        mean: { N: 66.80, E: 80.50, O: 84.20, A: 89.10, C: 85.40 },
        sd:   { N: 17.20, E: 15.90, O: 12.50, A: 13.00, C: 14.20 }
      }
    }
  },

  FACET_NORMS_DEFAULT: { mean: 13.5, sd: 3.6 },

  tToPercentile(tScore) {
    if (tScore <= 32) return 1;
    if (tScore >= 73) return 99;
    const pct =
      this.CUBIC_C1 -
      this.CUBIC_C2 * tScore +
      this.CUBIC_C3 * Math.pow(tScore, 2) -
      this.CUBIC_C4 * Math.pow(tScore, 3);
    return Math.max(1, Math.min(99, Math.round(pct)));
  },

  classifyLevel(tScore) {
    if (tScore < 45) return 'Bajo';
    if (tScore > 55) return 'Alto';
    return 'Promedio';
  },

  compute120(answersMap, sex = 'M', age = 19) {
    const questions = typeof QUESTIONS_120 !== 'undefined'
      ? QUESTIONS_120
      : (typeof require !== 'undefined' ? require('./questions_data.js').QUESTIONS_120 : []);
    const s = sex.toUpperCase() === 'F' ? 'F' : 'M';
    const ageGroup = age < 21 ? 'youth' : 'adult';
    const normGroup = this.NORMS_DOMAINS_120[s][ageGroup];

    const domainRaw = { N: 0, E: 0, O: 0, A: 0, C: 0 };
    const facetScores = {};
    const facetMeta = {};

    questions.forEach((q) => {
      const userVal = answersMap[q.id] !== undefined ? Number(answersMap[q.id]) : 3;
      const itemScore = q.reversed ? 6 - userVal : userVal;

      domainRaw[q.domain] += itemScore;

      const fKey = q.facet_key;
      if (!facetScores[fKey]) {
        facetScores[fKey] = 0;
        facetMeta[fKey] = {
          domain: q.domain,
          facet_number: q.facet_number,
          facet_name: q.facet_name,
          facet_description: q.facet_description
        };
      }
      facetScores[fKey] += itemScore;
    });

    const domainNames = {
      N: 'Neuroticismo (Inestabilidad Emocional)',
      E: 'Extraversión (Energía y Mando)',
      O: 'Apertura (Intelecto y Adaptabilidad)',
      A: 'Amabilidad (Ética y Prosocialidad)',
      C: 'Responsabilidad (Disciplina y Deber)'
    };

    const domains = {};
    ['N', 'E', 'O', 'A', 'C'].forEach((dom) => {
      const raw = domainRaw[dom];
      const mean = normGroup.mean[dom];
      const sd = normGroup.sd[dom];
      const tScore = 10.0 * ((raw - mean) / sd) + 50.0;
      const pct = this.tToPercentile(tScore);
      domains[dom] = {
        domain_code: dom,
        name: domainNames[dom],
        raw_score: Math.round(raw * 100) / 100,
        t_score: Math.round(tScore * 100) / 100,
        percentile: pct,
        level: this.classifyLevel(tScore)
      };
    });

    const facets = {};
    Object.keys(facetScores).forEach((fKey) => {
      const rawVal = facetScores[fKey];
      const meta = facetMeta[fKey];
      const tF = 10.0 * ((rawVal - this.FACET_NORMS_DEFAULT.mean) / this.FACET_NORMS_DEFAULT.sd) + 50.0;
      facets[fKey] = {
        key: fKey,
        domain: meta.domain,
        facet_number: meta.facet_number,
        name: meta.facet_name,
        description: meta.facet_description,
        raw_score: Math.round(rawVal * 100) / 100,
        t_score: Math.round(tF * 100) / 100,
        percentile: this.tToPercentile(tF),
        level: this.classifyLevel(tF)
      };
    });

    return {
      test_type: 'IPIP-NEO-120',
      items_answered: Object.keys(answersMap).length,
      candidate: { sex: s, age },
      domains,
      facets
    };
  },

  compute50(answersMap, sex = 'M', age = 19) {
    const questions = typeof QUESTIONS_50 !== 'undefined'
      ? QUESTIONS_50
      : (typeof require !== 'undefined' ? require('./questions_data.js').QUESTIONS_50 : []);
    const domainRaw = { N: 0, E: 0, O: 0, A: 0, C: 0 };
    questions.forEach((q) => {
      const userVal = answersMap[q.id] !== undefined ? Number(answersMap[q.id]) : 3;
      const itemScore = q.reversed ? 6 - userVal : userVal;
      domainRaw[q.domain] += itemScore;
    });

    const domainNames = {
      N: 'Neuroticismo (Inestabilidad Emocional)',
      E: 'Extraversión (Energía y Mando)',
      O: 'Apertura (Intelecto y Adaptabilidad)',
      A: 'Amabilidad (Ética y Prosocialidad)',
      C: 'Responsabilidad (Disciplina y Deber)'
    };

    const domains = {};
    ['N', 'E', 'O', 'A', 'C'].forEach((dom) => {
      const raw = domainRaw[dom];
      const tScore = 10.0 * ((raw - 31.5) / 6.8) + 50.0;
      domains[dom] = {
        domain_code: dom,
        name: domainNames[dom],
        raw_score: Math.round(raw * 100) / 100,
        t_score: Math.round(tScore * 100) / 100,
        percentile: this.tToPercentile(tScore),
        level: this.classifyLevel(tScore)
      };
    });

    return {
      test_type: 'IPIP-50-SCREENING',
      items_answered: Object.keys(answersMap).length,
      candidate: { sex, age },
      domains,
      facets: {}
    };
  },

  matchProfiles(scoringResult, targetInstitutionId = 'FAP') {
    const profiles = typeof INSTITUTIONAL_PROFILES !== 'undefined'
      ? INSTITUTIONAL_PROFILES
      : (typeof require !== 'undefined' ? require('./institutional_profiles.js').INSTITUTIONAL_PROFILES : {});
    const domains = scoringResult.domains;
    const facets = scoringResult.facets || {};
    const hasFacets = Object.keys(facets).length > 0;

    const domPcts = {
      N: domains.N?.percentile || 50,
      E: domains.E?.percentile || 50,
      O: domains.O?.percentile || 50,
      A: domains.A?.percentile || 50,
      C: domains.C?.percentile || 50
    };

    const resultsByInst = {};

    Object.keys(profiles).forEach((instId) => {
      const profile = profiles[instId];

      // 1. Similitud por Dominios
      let diffDomSum = 0;
      let totalDomW = 0;
      Object.keys(profile.ideal_domains).forEach((dom) => {
        const w = profile.domain_weights[dom] || 0.20;
        const actualVal = domPcts[dom];
        const idealVal = profile.ideal_domains[dom];
        diffDomSum += w * Math.abs(actualVal - idealVal);
        totalDomW += w;
      });
      const avgDomDiff = diffDomSum / (totalDomW || 1);
      const domFit = Math.max(0, Math.min(100, 100 - avgDomDiff * 1.15));

      // 2. Similitud por Facetas
      let facetFit = domFit;
      if (hasFacets && profile.ideal_facets) {
        let diffFacSum = 0;
        let totalFacW = 0;
        Object.keys(profile.ideal_facets).forEach((fKey) => {
          if (facets[fKey]) {
            const w = profile.facet_weights[fKey] || 0.10;
            const actualF = facets[fKey].percentile;
            const idealF = profile.ideal_facets[fKey];
            diffFacSum += w * Math.abs(actualF - idealF);
            totalFacW += w;
          }
        });
        if (totalFacW > 0) {
          const avgFacDiff = diffFacSum / totalFacW;
          facetFit = Math.max(0, Math.min(100, 100 - avgFacDiff * 1.15));
        }
      }

      const overallFit = hasFacets ? 0.40 * domFit + 0.60 * facetFit : domFit;

      // 3. Evaluar Banderas Rojas
      const redFlags = [];
      (profile.red_flag_rules || []).forEach((rule) => {
        const [kind, key, op, threshold] = rule.condition;
        let val = null;
        if (kind === 'domain') {
          val = domains[key]?.percentile;
        } else if (kind === 'facet') {
          val = facets[key]?.percentile;
        }

        if (val !== null && val !== undefined) {
          const isTriggered = op === '>' ? val > threshold : val < threshold;
          if (isTriggered) {
            redFlags.push({
              rule_id: rule.rule_id,
              severity: rule.severity,
              title: rule.title,
              description: rule.description,
              recommendation: rule.recommendation,
              tested_value: val,
              threshold,
              operator: op
            });
          }
        }
      });

      const hasCritical = redFlags.some((rf) => rf.severity === 'CRITICAL');
      const hasWarning = redFlags.some((rf) => rf.severity === 'WARNING');

      let adjustedFit = overallFit;
      let verdict = '';
      let verdictColor = '';

      if (hasCritical) {
        adjustedFit = Math.min(adjustedFit, 48.0);
        verdict = 'NO RECOMENDADO / ALERTA CRÍTICA';
        verdictColor = 'danger';
      } else if (adjustedFit >= 78.0) {
        verdict = 'APTO CON ALTA COMPATIBILIDAD';
        verdictColor = 'success';
      } else if (adjustedFit >= 60.0) {
        verdict = 'APTO CONDICIONAL / EN OBSERVACIÓN';
        verdictColor = 'warning';
      } else {
        verdict = 'COMPATIBILIDAD BAJA / PERFIL DIVERGENTE';
        verdictColor = 'secondary';
      }

      resultsByInst[instId] = {
        id: profile.id,
        code: profile.code,
        name: profile.name,
        badge: profile.badge,
        motto: profile.motto,
        short_desc: profile.short_desc,
        mission: profile.mission,
        typical_specialties: profile.typical_specialties,
        overall_fit: Math.round(adjustedFit * 10) / 10,
        unpenalized_fit: Math.round(overallFit * 10) / 10,
        verdict,
        verdict_color: verdictColor,
        has_critical_red_flags: hasCritical,
        has_warning_red_flags: hasWarning,
        red_flags: redFlags,
        interview_strengths: profile.interview_strengths,
        development_advice: profile.development_advice
      };
    });

    const ranked = Object.values(resultsByInst).sort((a, b) => b.overall_fit - a.overall_fit);
    const chosenInst = resultsByInst[targetInstitutionId] || ranked[0];

    const archetype = this.classifyArchetype(domPcts);

    return {
      target_institution: chosenInst,
      top_institution: ranked[0],
      all_institutions: resultsByInst,
      ranking: ranked,
      archetype
    };
  },

  classifyArchetype(domPcts) {
    const { E, C, N, O, A } = domPcts;
    if (E >= 60 && C >= 65 && N <= 40) {
      return {
        id: 'TACTICAL_COMMAND_LEADER',
        name: 'Líder Táctico y de Mando Operativo',
        badge: '🎖️',
        description: 'Perfil de alto dinamismo, firmeza de voz y asertividad social. Destaca en la conducción de tropas, resolución de crisis en el terreno y liderazgo.',
        fit_institutions: ['EMCH (Ejército)', 'EO-PNP (Oficial de Orden)', 'Infantería de Marina (ENM)']
      };
    }
    if (C >= 70 && O >= 58 && N <= 40) {
      return {
        id: 'HIGH_PRECISION_SPECIALIST',
        name: 'Especialista Técnico y Aeronáutico de Alta Precisión',
        badge: '🔬',
        description: 'Perfil meticuloso, ordenado y analítico. Extraordinaria concentración en checklists, sistemas de armas, telemetría y navegación aeronáutica/naval.',
        fit_institutions: ['FAP (Fuerza Aérea)', 'ENAMM (Marina Mercante)', 'Ingeniería Militar y Sistemas']
      };
    }
    if (N <= 25 && C >= 70) {
      return {
        id: 'RESILIENT_TACTICAL_OPERATOR',
        name: 'Operador Táctico Resiliente / Fuerzas Especiales',
        badge: '🛡️',
        description: 'Perfil de excepcional autocontrol y templanza. Inmune a la fatiga, miedo y sobrecarga sensorial. Ideal para misiones de comando, submarinos y vuelo de combate.',
        fit_institutions: ['FOES / Submarinos (ENM)', 'DOES / Caza (FAP)', 'SUAT / Comandos (PNP/EMCH)']
      };
    }
    if (A >= 65 && C >= 65 && N <= 45) {
      return {
        id: 'COMMUNITY_SECURITY_MEDIATOR',
        name: 'Mediador de Seguridad y Orden Ciudadano',
        badge: '🤝',
        description: 'Perfil de probada integridad moral, empatía y prudencia. Especial destreza para desescalar conflictos vecinales y mantener el imperio de la ley.',
        fit_institutions: ['PNP (Policía Nacional)', 'Guardacostas (ENM)', 'Gestión Pública y Seguridad']
      };
    }
    return {
      id: 'VERSATILE_OPERATOR',
      name: 'Operador Versátil y Equilibrado',
      badge: '🧭',
      description: 'Perfil de rasgos armónicos y adaptables. Muestra flexibilidad para desempeñarse tanto en áreas de soporte táctico como en funciones técnicas y administrativas.',
      fit_institutions: ['Especialidades Técnicas de las FFAA', 'Educación Universitaria y Logística']
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScoringEngine;
}
