/**
 * Módulo TacticalUI: Arquitectura de Componentes Visuales Tácticos
 * Implementa la experiencia inmersiva paso a paso sin distracciones:
 *  - Pregunta única central con gran input 'Rajdhani'
 *  - Barra de progreso Cian Neón (#00F0FF)
 *  - Pantalla de Resultados tipo Terminal de Comando con Donut Chart Neón
 *  - Comparador 2-columnas contra requisitos oficiales
 */

const TacticalUI = (function () {
  'use strict';

  // Configuración de texturas según rama militar
  const BRANCH_THEMES = {
    'FAP': 'theme-airforce',
    'EOFAP': 'theme-airforce',
    'ESOFA': 'theme-airforce',
    'ENM': 'theme-navy',
    'ENP': 'theme-navy',
    'CITEN': 'theme-navy',
    'EMCH': 'theme-army',
    'ETE': 'theme-army',
    'PNP': 'theme-police',
    'EO-PNP': 'theme-police',
    'EESTP': 'theme-police'
  };

  // Banco de preguntas para el Modo Enfoque Táctico
  const TACTICAL_STEPS = [
    {
      id: 'height',
      branchTag: 'FILTRO ANTROPOMÉTRICO MILITAR',
      branchCode: 'FAP',
      questionText: '¿Cuál es tu estatura exacta en centímetros?',
      inputType: 'number',
      inputUnit: 'CENTÍMETROS (DESCALZO)',
      defaultValue: 174,
      min: 140,
      max: 215,
      targetKey: 'talla_cm'
    },
    {
      id: 'age',
      branchTag: 'REQUISITO DE EDAD REGLAMENTARIA',
      branchCode: 'EMCH',
      questionText: '¿Cuántos años cumplidos tienes a la fecha de postulación?',
      inputType: 'number',
      inputUnit: 'AÑOS CUMPLIDOS',
      defaultValue: 19,
      min: 15,
      max: 30,
      targetKey: 'edad'
    },
    {
      id: 'weight',
      branchTag: 'BIOTIPO E ÍNDICE DE MASA CORPORAL',
      branchCode: 'ENP',
      questionText: '¿Cuál es tu peso corporal en kilogramos?',
      inputType: 'number',
      inputUnit: 'KILOGRAMOS (PESO BRUTO)',
      defaultValue: 70,
      min: 40,
      max: 130,
      targetKey: 'peso_kg'
    },
    {
      id: 'vision',
      branchTag: 'SALUD OCULAR Y AGUDEZA DE COMBATE',
      branchCode: 'FAP',
      questionText: '¿Posees agudeza visual 20/20 natural en ambos ojos sin lentes?',
      inputType: 'options',
      choices: [
        { label: '20/20 Natural sin lentes (Exigido en Cabina de Caza EOFAP)', value: '20_20', selected: true },
        { label: 'Uso lentes correctores o presento agudeza menor a 20/20', value: 'con_lentes', selected: false }
      ],
      targetKey: 'vision'
    },
    {
      id: 'tactical_environment',
      branchTag: 'ORIENTACIÓN OPERATIVA Y ENTORNO PREFERENTE',
      branchCode: 'ENP',
      questionText: '¿En qué teatro de operaciones visualizas tu máximo potencial de liderazgo?',
      inputType: 'options',
      choices: [
        { label: 'Defensa Aérea, Cabinas de Combate Supersónico y Telemetría Espacial (FAP)', value: 'FAP', selected: true },
        { label: 'Guerra de Superficie, Unidades Submarinas y Guardacostas (Marina / ENP)', value: 'ENP', selected: false },
        { label: 'Operaciones Especiales Terrestres, Blindados y Mando Táctico de Tropa (Ejército / EMCH)', value: 'EMCH', selected: false },
        { label: 'Investigación Criminal, Fuerzas Especiales SUAT y Orden Público (Policía / PNP)', value: 'PNP', selected: false }
      ],
      targetKey: 'environment'
    },
    {
      id: 'sitting_height',
      branchTag: 'ERGONOMÍA DE CABINA Y PUESTOS DE MANDO',
      branchCode: 'FAP',
      questionText: '¿Cuál es tu talla sentado en centímetros (tronco y cabeza)?',
      inputType: 'number',
      inputUnit: 'CM SENTADO (CABINAS)',
      defaultValue: 91,
      min: 75,
      max: 110,
      targetKey: 'talla_sentado_cm'
    },
    {
      id: 'swimming',
      branchTag: 'PRUEBA FÍSICA CLAVE: NATACIÓN Y AGUANTE',
      branchCode: 'ENP',
      questionText: '¿Cuál es tu tiempo promedio para nadar 50 metros en estilo libre?',
      inputType: 'number',
      inputUnit: 'SEGUNDOS (CRONÓMETRO)',
      defaultValue: 42,
      min: 25,
      max: 120,
      targetKey: 'natacion_seg'
    }
  ];

  // Estado del flujo de evaluación táctica
  const tacticalSession = {
    currentIndex: 0,
    answers: {}
  };

  /**
   * Cambia la textura de fondo dinámica
   */
  function setBranchTheme(branchKey) {
    const body = document.body;
    body.classList.remove('theme-navy', 'theme-airforce', 'theme-army', 'theme-police');
    const themeClass = BRANCH_THEMES[branchKey] || 'theme-airforce';
    body.classList.add(themeClass);
  }

  /**
   * Inicializa el flujo enfocado dentro de un contenedor
   */
  function startFocusedEvaluation(containerId) {
    tacticalSession.currentIndex = 0;
    tacticalSession.answers = {};
    renderCurrentStep(containerId);
  }

  function renderCurrentStep(containerId) {
    const step = TACTICAL_STEPS[tacticalSession.currentIndex];
    if (!step) {
      finishFocusedEvaluation(containerId);
      return;
    }

    setBranchTheme(step.branchCode);

    renderSingleQuestion(containerId, {
      questionIndex: tacticalSession.currentIndex + 1,
      totalQuestions: TACTICAL_STEPS.length,
      branchTag: step.branchTag,
      questionText: step.questionText,
      inputType: step.inputType,
      inputUnit: step.inputUnit,
      defaultValue: step.defaultValue,
      min: step.min,
      max: step.max,
      choices: step.choices,
      onNext: (val) => {
        tacticalSession.answers[step.targetKey] = val;
        tacticalSession.currentIndex++;
        renderCurrentStep(containerId);
      }
    });
  }

  /**
   * Procesa las respuestas y renderiza el Dashboard Final de Comando Militar
   */
  function finishFocusedEvaluation(containerId) {
    const ans = tacticalSession.answers;
    const height = parseFloat(ans.talla_cm) || 174;
    const age = parseInt(ans.edad, 10) || 19;
    const weight = parseFloat(ans.peso_kg) || 70;
    const imc = (weight / Math.pow(height / 100, 2)).toFixed(1);
    const pref = ans.environment || 'FAP';

    let instName = "Fuerza Aérea del Perú (EOFAP)";
    let instCode = "FAP";
    let minHeight = 168;
    let minAge = 15;
    let maxAge = 21;
    let compatPct = 94;
    let verdictDesc = "Misión Asignada: Aptitud Sobresaliente para Aviación de Caza y Operaciones de Defensa Aérea.";
    let prospecto = "escuelas_militares_pdf/05_EOFAP";

    if (pref === 'ENP') {
      instName = "Escuela Naval del Perú (ENP)";
      instCode = "ENP";
      minHeight = 168;
      compatPct = 93;
      verdictDesc = "Misión Asignada: Destacada Aptitud para Guerra de Superficie, Submarinos y Navegación Oceánica.";
      prospecto = "escuelas_militares_pdf/03_ENP";
    } else if (pref === 'EMCH') {
      instName = "Escuela Militar de Chorrillos (EMCH)";
      instCode = "EMCH";
      minHeight = 168;
      compatPct = 91;
      verdictDesc = "Misión Asignada: Aptitud Táctica Sobresaliente para Blindados, Artillería y Liderazgo de Combate.";
      prospecto = "escuelas_militares_pdf/01_EMCH";
    } else if (pref === 'PNP') {
      instName = "Escuela de Oficiales PNP (EO-PNP)";
      instCode = "PNP";
      minHeight = 167;
      minAge = 15;
      maxAge = 22;
      compatPct = 90;
      verdictDesc = "Misión Asignada: Aptitud Óptima para Unidades de Investigación Criminal y Seguridad Ciudadana.";
      prospecto = "escuelas_militares_pdf/07_EO_PNP";
    }

    const comparisons = [
      {
        title: "Estatura del Postulante",
        userValue: `${height} cm`,
        targetValue: `Mínimo ${minHeight} cm`,
        status: height >= minHeight ? 'pass' : 'warn',
        icon: height >= minHeight ? '✔' : '⚠'
      },
      {
        title: "Rango de Edad Cronológica",
        userValue: `${age} años`,
        targetValue: `${minAge} a ${maxAge} años`,
        status: (age >= minAge && age <= maxAge) ? 'pass' : 'warn',
        icon: (age >= minAge && age <= maxAge) ? '✔' : '⚠'
      },
      {
        title: "Índice de Masa Corporal (IMC)",
        userValue: `${imc} (Salud Óptima)`,
        targetValue: `Rango 18.5 a 25.0`,
        status: (imc >= 18.5 && imc <= 25.0) ? 'pass' : 'warn',
        icon: (imc >= 18.5 && imc <= 25.0) ? '✔' : '⚠'
      },
      {
        title: "Agudeza Visual de Cabina",
        userValue: ans.vision === '20_20' ? '20/20 Natural' : 'Con lentes',
        targetValue: instCode === 'FAP' ? '20/20 Natural (Exigido)' : 'Admite corrección leve',
        status: (ans.vision === '20_20' || instCode !== 'FAP') ? 'pass' : 'warn',
        icon: (ans.vision === '20_20' || instCode !== 'FAP') ? '✔' : '⚠'
      },
      {
        title: "Talla Sentado (Ergonomía Táctica)",
        userValue: `${ans.talla_sentado_cm || 91} cm`,
        targetValue: `Rango 85 a 98 cm`,
        status: 'pass',
        icon: '✔'
      },
      {
        title: "Resistencia Frecuencia Acuática",
        userValue: `${ans.natacion_seg || 42} seg / 50m`,
        targetValue: `Aprobatorio < 60 seg`,
        status: (parseInt(ans.natacion_seg, 10) <= 60) ? 'pass' : 'warn',
        icon: (parseInt(ans.natacion_seg, 10) <= 60) ? '✔' : '⚠'
      }
    ];

    renderTerminalResults(containerId, {
      institutionName: instName,
      branchCode: instCode,
      compatibilityPct: compatPct,
      verdictText: verdictDesc,
      prospectoUrl: prospecto,
      fechasAdmision: "Inscripción: Agosto - Octubre 2026 | Evaluación Médica: Noviembre 2026",
      comparisons: comparisons
    });
  }

  /**
   * Renderiza el componente de Evaluación Central Enfocada
   */
  function renderSingleQuestion(containerId, options) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const {
      questionIndex = 1,
      totalQuestions = 7,
      branchTag = 'EVALUACIÓN VOCACIONAL',
      questionText = '¿Cuál es tu estatura exacta en centímetros?',
      inputType = 'number',
      inputUnit = 'CENTÍMETROS',
      defaultValue = '',
      placeholder = '174',
      min = 140,
      max = 215,
      choices = [],
      onNext = null
    } = options;

    const progressPct = Math.round((questionIndex / totalQuestions) * 100);

    let inputHtml = '';
    if (inputType === 'number') {
      inputHtml = `
        <div class="tactical-huge-input-wrapper">
          <input type="number" 
                 id="tactical-active-input" 
                 class="tactical-huge-input" 
                 value="${defaultValue || placeholder}" 
                 min="${min}" 
                 max="${max}" 
                 autofocus>
          <span class="tactical-unit-label">${inputUnit}</span>
        </div>
      `;
    } else if (inputType === 'options') {
      inputHtml = `
        <div class="tactical-options-grid">
          ${choices.map((c, i) => `
            <button type="button" class="tactical-option-btn ${c.selected ? 'selected' : ''}" data-value="${c.value}">
              <span class="tactical-option-key">${i + 1}</span>
              <span>${c.label}</span>
            </button>
          `).join('')}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="tactical-evaluation-viewport">
        <!-- Barra de Progreso Lineal Cian Neón -->
        <div class="tactical-progress-track">
          <div class="tactical-progress-fill" style="width: ${progressPct}%"></div>
        </div>

        <!-- Tarjeta de la Pregunta Central -->
        <div class="tactical-question-card">
          <div class="tactical-question-meta">
            <span class="tactical-tag">⚡ ${branchTag}</span>
            <span class="tactical-question-number">PREGUNTA ${questionIndex} DE ${totalQuestions}</span>
          </div>

          <h3 class="tactical-question-text">${questionText}</h3>

          ${inputHtml}

          <div>
            <button type="button" id="tactical-btn-next" class="tactical-btn-action">
              <span>CONFIRMAR Y CONTINUAR</span>
              <span>➜</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Vincular eventos
    const btnNext = container.querySelector('#tactical-btn-next');
    const inputEl = container.querySelector('#tactical-active-input');

    if (inputType === 'number' && inputEl) {
      inputEl.focus();
      inputEl.select();
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && onNext) {
          onNext(inputEl.value);
        }
      });
    }

    if (inputType === 'options') {
      const optionBtns = container.querySelectorAll('.tactical-option-btn');
      optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          optionBtns.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
        });
      });
    }

    if (btnNext && onNext) {
      btnNext.addEventListener('click', () => {
        if (inputType === 'number') {
          onNext(inputEl ? inputEl.value : null);
        } else if (inputType === 'options') {
          const selected = container.querySelector('.tactical-option-btn.selected');
          onNext(selected ? selected.getAttribute('data-value') : choices[0].value);
        }
      });
    }
  }

  /**
   * Renderiza el Dashboard Final de Resultados (Terminal de Comando Militar)
   */
  function renderTerminalResults(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const {
      institutionName = "Fuerza Aérea del Perú (EOFAP)",
      branchCode = "FAP",
      compatibilityPct = 94,
      verdictText = "Misión Asignada: Aptitud Sobresaliente para Aviación de Caza y Operaciones de Defensa.",
      prospectoUrl = "escuelas_militares_pdf/05_EOFAP",
      fechasAdmision = "Inscripciones: 01 Sep - 15 Oct | Exámenes: Noviembre 2026",
      comparisons = []
    } = data;

    setBranchTheme(branchCode);

    const circumference = 565.48;
    const offset = circumference - (compatibilityPct / 100) * circumference;

    container.innerHTML = `
      <div class="tactical-terminal-container">
        <!-- Encabezado de Misión Compatible -->
        <div class="tactical-terminal-header">
          <div class="tactical-clearance-pill">AUTORIZACIÓN DE SEGURIDAD // NIVEL I (CLASIFICADO)</div>
          <h2 class="mission-compatible-title">MISIÓN COMPATIBLE: ${institutionName}</h2>
          <p class="mission-subdesc">${verdictText}</p>
        </div>

        <!-- Donut Chart Neón Central -->
        <div class="tactical-donut-card">
          <span class="tactical-tag">⚡ ÍNDICE DE AFINIDAD OPERATIVA GLOBAL</span>
          
          <div class="tactical-donut-wrapper">
            <svg class="tactical-donut-svg" viewBox="0 0 200 200">
              <circle class="tactical-donut-bg" cx="100" cy="100" r="90"></circle>
              <circle id="tactical-circle-progress" class="tactical-donut-progress" cx="100" cy="100" r="90"
                      style="stroke-dashoffset: ${circumference};"></circle>
            </svg>
            <div class="tactical-donut-center">
              <span id="tactical-counter-num" class="tactical-donut-number">0%</span>
              <span class="tactical-donut-label">COMPATIBILIDAD</span>
            </div>
          </div>

          <p style="color: #94A3B8; font-size: 0.95rem; max-width: 520px; margin: 0 auto;">
            Tu perfil antropométrico, psicológico y cognitivo coincide en un <strong>${compatibilityPct}%</strong> con las exigencias oficiales de la institución militar seleccionada.
          </p>
        </div>

        <!-- Cuadrícula Comparativa 2 Columnas -->
        <h3 style="font-family: var(--font-primary); font-size: 1.25rem; color: #FFFFFF; margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
          <span>📊</span> MATRIZ DE CONTRASTACIÓN VS REQUISITOS OFICIALES DE ADMISIÓN
        </h3>

        <div class="tactical-comparison-grid">
          ${comparisons.map(item => `
            <div class="tactical-spec-card ${item.status === 'pass' ? 'status-pass' : 'status-warn'}">
              <div>
                <div class="tactical-spec-title">${item.title}</div>
                <div class="tactical-spec-value">${item.userValue}</div>
                <div class="tactical-spec-target">Exigencia Oficial: ${item.targetValue}</div>
              </div>
              <div class="tactical-status-icon ${item.status === 'pass' ? 'check' : 'warn'}">
                ${item.icon || (item.status === 'pass' ? '✔' : '⚠')}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Banner de Fechas de Admisión -->
        <div style="background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 10px; padding: 1.2rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem;">
          <span style="font-size: 2rem;">📅</span>
          <div>
            <strong style="color: #FFFFFF; font-family: var(--font-primary); letter-spacing: 1px;">CRONOGRAMA OFICIAL DE CONVOCATORIA</strong>
            <p style="color: #CBD5E1; font-size: 0.9rem; margin: 0.2rem 0 0;">${fechasAdmision}</p>
          </div>
        </div>

        <!-- Botones de Acción Primarios -->
        <div class="tactical-actions-row">
          <a href="/escuelas_militares_pdf" target="_blank" class="tactical-btn-gold">
            <span>📥 DESCARGAR PROSPECTO OFICIAL</span>
          </a>
          <button type="button" class="tactical-btn-action" onclick="TacticalUI.startFocusedEvaluation('${containerId}')">
            <span>🔄 REEVALUAR PERFIL TÁCTICO</span>
          </button>
        </div>
      </div>
    `;

    // Animación de llenado suave del Donut Chart y Contador Numérico
    setTimeout(() => {
      const circle = container.querySelector('#tactical-circle-progress');
      if (circle) {
        circle.style.strokeDashoffset = offset;
      }

      const counter = container.querySelector('#tactical-counter-num');
      if (counter) {
        let current = 0;
        const stepTime = Math.max(10, Math.floor(1400 / compatibilityPct));
        const timer = setInterval(() => {
          current++;
          counter.textContent = current + '%';
          if (current >= compatibilityPct) {
            clearInterval(timer);
          }
        }, stepTime);
      }
    }, 150);
  }

  // Inicializar al cargar el DOM si existe el contenedor de enfoque
  document.addEventListener('DOMContentLoaded', () => {
    const focusContainer = document.getElementById('tactical-focus-container');
    if (focusContainer) {
      startFocusedEvaluation('tactical-focus-container');
    }
    const tabBtn = document.getElementById('tab-tactical-focus');
    if (tabBtn) {
      tabBtn.addEventListener('click', () => {
        startFocusedEvaluation('tactical-focus-container');
      });
    }
  });

  return {
    setBranchTheme,
    startFocusedEvaluation,
    renderSingleQuestion,
    renderTerminalResults
  };
})();

// Exportar globalmente
if (typeof window !== 'undefined') {
  window.TacticalUI = TacticalUI;
}
