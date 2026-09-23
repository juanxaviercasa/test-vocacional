/**
 * SIMULADOR INTEGRAL DE ADMISIÓN MILITAR Y POLICIAL DEL PERÚ
 * Módulo interactivo de:
 * 1. Examen de Conocimientos y Psicotécnico
 * 2. Calculadora de Rendimiento Físico y Antropometría
 * 3. Dictamen Consolidado de Admisión
 */

(function () {
  'use strict';

  // Estado global del simulador de admisión
  const AdmissionState = {
    currentTab: 'psychometric',
    targetInstitution: 'EMCH',
    institutionsData: {},
    activeExam: null,
    examTimerInterval: null,
    timeRemainingSeconds: 0,
    currentQuestionIndex: 0,
    userAnswers: {},
    examResult: null,
    physicalResult: null,
    psychometricResult: null
  };

  // Inicialización al cargar el DOM
  document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initInstitutionsCatalog();
    initExamModule();
    initPhysicalModule();
    initConsolidatedModule();
    hookPsychometricBridge();
  });

  // =========================================================================
  // 1. NAVEGACIÓN ENTRE PESTAÑAS PRINCIPALES
  // =========================================================================
  function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.main-nav-tab');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        switchMainTab(tabId);
      });
    });
  }

  function switchMainTab(tabId) {
    AdmissionState.currentTab = tabId;

    // Actualizar botones de pestañas
    document.querySelectorAll('.main-nav-tab').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Mostrar/ocultar paneles
    document.querySelectorAll('.tab-panel').forEach(panel => {
      if (panel.id === `panel-${tabId}`) {
        panel.style.display = 'block';
      } else {
        panel.style.display = 'none';
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // 2. CATÁLOGO DE INSTITUCIONES
  // =========================================================================
  async function initInstitutionsCatalog() {
    try {
      const resp = await fetch('/api/institutions');
      if (!resp.ok) return;
      const data = await resp.json();
      const list = data.institutions || [];
      renderInstitutionSelector(list);
    } catch (e) {
      console.warn('Uso de catálogo institucional local');
    }
  }

  function renderInstitutionSelector(list) {
    const grid = document.getElementById('exam-institutions-grid');
    if (!grid) return;

    grid.innerHTML = '';
    list.forEach(inst => {
      const card = document.createElement('div');
      card.className = `inst-select-card ${inst.id === AdmissionState.targetInstitution ? 'selected' : ''}`;
      card.setAttribute('data-id', inst.id);

      card.innerHTML = `
        <div class="inst-card-header">
          <span class="inst-card-rama">${inst.rama}</span>
          <span class="inst-badge-level">${inst.nivel}</span>
        </div>
        <h4 class="inst-card-title">${inst.nombre}</h4>
        <div class="inst-card-meta">
          <span>🎓 ${inst.titulo_civil || 'Título Oficial'}</span>
          <span>⏱️ ${inst.duracion_oficial || '5 años'}</span>
          <span>🎯 Nota Mínima: <strong>${inst.nota_minima}.00</strong></span>
        </div>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.inst-select-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        AdmissionState.targetInstitution = inst.id;
        updateSelectedInstitutionInfo(inst);
      });

      grid.appendChild(card);
    });
  }

  function updateSelectedInstitutionInfo(inst) {
    const titleEl = document.getElementById('exam-target-title');
    if (titleEl) {
      titleEl.textContent = `Simulacro para: ${inst.nombre}`;
    }
    const passingEl = document.getElementById('exam-target-passing');
    if (passingEl) {
      passingEl.textContent = `Nota mínima aprobatoria: ${inst.nota_minima}.00 en escala vigesimal`;
    }
  }

  // =========================================================================
  // 3. MÓDULO DEL EXAMEN DE CONOCIMIENTOS Y PSICOTÉCNICO
  // =========================================================================
  function initExamModule() {
    const btnStart = document.getElementById('btn-start-exam');
    if (btnStart) {
      btnStart.addEventListener('click', startAdmissionExam);
    }

    const btnPrev = document.getElementById('btn-exam-prev');
    const btnNext = document.getElementById('btn-exam-next');
    if (btnPrev) btnPrev.addEventListener('click', () => navigateExamQuestion(-1));
    if (btnNext) btnNext.addEventListener('click', () => navigateExamQuestion(1));

    const btnFinish = document.getElementById('btn-exam-finish');
    if (btnFinish) {
      btnFinish.addEventListener('click', finishExamSubmission);
    }

    const btnRetry = document.getElementById('btn-exam-retry');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        document.getElementById('exam-screen-results').style.display = 'none';
        document.getElementById('exam-screen-setup').style.display = 'block';
      });
    }

    // Soporte para teclas 1 a 5 para marcar opciones
    document.addEventListener('keydown', (e) => {
      if (AdmissionState.currentTab !== 'knowledge' || !AdmissionState.activeExam) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 5) {
        selectExamOption(num - 1);
      } else if (e.key === 'ArrowRight') {
        navigateExamQuestion(1);
      } else if (e.key === 'ArrowLeft') {
        navigateExamQuestion(-1);
      }
    });
  }

  async function startAdmissionExam() {
    const instId = AdmissionState.targetInstitution;
    const numQ = parseInt(document.getElementById('exam-questions-count-select')?.value || '30');

    const setupScreen = document.getElementById('exam-screen-setup');
    const runningScreen = document.getElementById('exam-screen-running');
    const resultsScreen = document.getElementById('exam-screen-results');

    setupScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    runningScreen.style.display = 'block';

    try {
      const resp = await fetch(`/api/exam/generate?institution=${instId}&questions=${numQ}`);
      const examData = await resp.json();

      AdmissionState.activeExam = examData;
      AdmissionState.userAnswers = {};
      AdmissionState.currentQuestionIndex = 0;
      AdmissionState.timeRemainingSeconds = (examData.config.time_minutes || 45) * 60;

      startExamTimer();
      renderExamNavigationGrid();
      displayCurrentExamQuestion();
    } catch (e) {
      alert('Error al generar el examen. Por favor intente nuevamente.');
      setupScreen.style.display = 'block';
      runningScreen.style.display = 'none';
    }
  }

  function startExamTimer() {
    if (AdmissionState.examTimerInterval) {
      clearInterval(AdmissionState.examTimerInterval);
    }

    const timerEl = document.getElementById('exam-timer-display');

    function update() {
      if (AdmissionState.timeRemainingSeconds <= 0) {
        clearInterval(AdmissionState.examTimerInterval);
        alert('⏱️ El tiempo oficial ha finalizado. Se enviarán sus respuestas automáticamente.');
        finishExamSubmission();
        return;
      }
      AdmissionState.timeRemainingSeconds--;
      const min = Math.floor(AdmissionState.timeRemainingSeconds / 60);
      const sec = AdmissionState.timeRemainingSeconds % 60;
      if (timerEl) {
        timerEl.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        if (min < 5) {
          timerEl.style.color = '#ef4444';
          timerEl.style.fontWeight = 'bold';
        } else {
          timerEl.style.color = 'var(--gold-primary)';
        }
      }
    }

    update();
    AdmissionState.examTimerInterval = setInterval(update, 1000);
  }

  function renderExamNavigationGrid() {
    const container = document.getElementById('exam-grid-nav');
    if (!container || !AdmissionState.activeExam) return;

    container.innerHTML = '';
    AdmissionState.activeExam.questions.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.className = `exam-grid-btn ${idx === AdmissionState.currentQuestionIndex ? 'current' : ''}`;
      btn.id = `exam-nav-btn-${idx}`;
      btn.textContent = idx + 1;

      btn.addEventListener('click', () => {
        AdmissionState.currentQuestionIndex = idx;
        displayCurrentExamQuestion();
      });

      container.appendChild(btn);
    });
  }

  function displayCurrentExamQuestion() {
    const exam = AdmissionState.activeExam;
    if (!exam || !exam.questions) return;

    const q = exam.questions[AdmissionState.currentQuestionIndex];
    if (!q) return;

    // Actualizar etiquetas
    const numEl = document.getElementById('exam-q-current-number');
    const totalEl = document.getElementById('exam-q-total-count');
    const subjEl = document.getElementById('exam-q-subject-badge');
    const textEl = document.getElementById('exam-q-text');
    const imgContainer = document.getElementById('exam-q-image-container');
    const optionsContainer = document.getElementById('exam-options-container');

    if (numEl) numEl.textContent = `Pregunta ${AdmissionState.currentQuestionIndex + 1}`;
    if (totalEl) totalEl.textContent = `de ${exam.questions.length}`;
    if (subjEl) subjEl.textContent = formatSubjectName(q.subject || q.area_academica);
    if (textEl) textEl.textContent = q.question || q.enunciado;

    // Renderizar condicionalmente gráfico vectorial si 'imagen_url' está presente
    if (imgContainer) {
      if (q.imagen_url) {
        imgContainer.style.display = 'flex';
        imgContainer.innerHTML = `
          <img src="${q.imagen_url}" alt="${q.imagen_alt || 'Gráfico de la pregunta'}" class="exam-question-image" loading="lazy" />
          ${q.imagen_alt ? `<span class="exam-question-image-caption">${q.imagen_alt}</span>` : ''}
        `;
      } else {
        imgContainer.style.display = 'none';
        imgContainer.innerHTML = '';
      }
    }

    // Renderizar opciones A, B, C, D, E
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D', 'E'];
      const currentSelected = AdmissionState.userAnswers[q.id || q.id_pregunta];

      const rawOpts = q.options || q.opciones || [];
      rawOpts.forEach((optItem, optIdx) => {
        const optText = typeof optItem === 'object' ? (optItem.texto_respuesta || optItem.text) : optItem;
        const optLetter = typeof optItem === 'object' && optItem.id_opcion ? optItem.id_opcion : letters[optIdx];

        const row = document.createElement('div');
        row.className = `exam-option-row ${currentSelected === optIdx ? 'selected' : ''}`;
        row.innerHTML = `
          <div class="exam-option-letter">${optLetter}</div>
          <div class="exam-option-text">${optText}</div>
        `;

        row.addEventListener('click', () => selectExamOption(optIdx));
        optionsContainer.appendChild(row);
      });
    }

    // Procesar sintaxis LaTeX en enunciado y opciones con KaTeX
    renderLatexMath(document.querySelector('.exam-question-card'));

    // Actualizar estados en la grilla
    document.querySelectorAll('.exam-grid-btn').forEach((btn, idx) => {
      btn.classList.remove('current');
      if (idx === AdmissionState.currentQuestionIndex) {
        btn.classList.add('current');
      }
      const qItem = exam.questions[idx];
      const qItemId = qItem.id || qItem.id_pregunta;
      if (AdmissionState.userAnswers[qItemId] !== undefined) {
        btn.classList.add('answered');
      }
    });

    // Controlar botones Anterior / Siguiente
    const btnPrev = document.getElementById('btn-exam-prev');
    const btnNext = document.getElementById('btn-exam-next');
    if (btnPrev) btnPrev.disabled = AdmissionState.currentQuestionIndex === 0;
    if (btnNext) {
      if (AdmissionState.currentQuestionIndex === exam.questions.length - 1) {
        btnNext.textContent = 'Revisar / Finalizar 🏁';
      } else {
        btnNext.textContent = 'Siguiente Pregunta ▸';
      }
    }
  }

  // Helper para renderizar LaTeX de forma segura
  function renderLatexMath(container) {
    if (!container) return;
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(container, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false,
          errorColor: '#f87171'
        });
      } catch (err) {
        console.warn('KaTeX render error:', err);
      }
    }
  }

  function selectExamOption(optIndex) {
    const exam = AdmissionState.activeExam;
    if (!exam) return;
    const q = exam.questions[AdmissionState.currentQuestionIndex];
    if (!q) return;

    AdmissionState.userAnswers[q.id] = optIndex;
    displayCurrentExamQuestion();
  }

  function navigateExamQuestion(delta) {
    const exam = AdmissionState.activeExam;
    if (!exam) return;
    const newIdx = AdmissionState.currentQuestionIndex + delta;
    if (newIdx >= 0 && newIdx < exam.questions.length) {
      AdmissionState.currentQuestionIndex = newIdx;
      displayCurrentExamQuestion();
    }
  }

  async function finishExamSubmission() {
    if (AdmissionState.examTimerInterval) {
      clearInterval(AdmissionState.examTimerInterval);
    }

    const runningScreen = document.getElementById('exam-screen-running');
    const resultsScreen = document.getElementById('exam-screen-results');

    runningScreen.style.display = 'none';
    resultsScreen.style.display = 'block';

    try {
      const payload = {
        institution_id: AdmissionState.targetInstitution,
        answers: AdmissionState.userAnswers
      };

      const resp = await fetch('/api/exam/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json_safe_stringify(payload)
      });

      const result = await resp.json();
      AdmissionState.examResult = result;
      renderExamResults(result);

      // Sincronizar con el Dictamen Consolidado
      updateConsolidatedPreview();
    } catch (e) {
      console.error('Error al calificar examen:', e);
      alert('Hubo un error al procesar las calificaciones.');
    }
  }

  function renderExamResults(result) {
    const summary = result.summary || {};
    const scoreEl = document.getElementById('exam-result-score');
    const verdictEl = document.getElementById('exam-result-verdict');
    const correctEl = document.getElementById('exam-result-correct');
    const incorrectEl = document.getElementById('exam-result-incorrect');
    const blankEl = document.getElementById('exam-result-blank');
    const pctEl = document.getElementById('exam-result-percentage');

    if (scoreEl) scoreEl.textContent = summary.vigesimal_score ? summary.vigesimal_score.toFixed(2) : '0.00';
    if (verdictEl) {
      verdictEl.textContent = summary.verdict || '';
      verdictEl.className = `verdict-status-pill ${summary.is_passed ? 'success' : 'danger'}`;
    }
    if (correctEl) correctEl.textContent = summary.correct || 0;
    if (incorrectEl) incorrectEl.textContent = summary.incorrect || 0;
    if (blankEl) blankEl.textContent = summary.blank || 0;
    if (pctEl) pctEl.textContent = `${summary.percentage || 0}%`;

    // Desglose por materias
    const areasContainer = document.getElementById('exam-areas-feedback-list');
    if (areasContainer && result.areas_feedback) {
      areasContainer.innerHTML = '';
      result.areas_feedback.forEach(area => {
        const item = document.createElement('div');
        item.className = 'area-feedback-item';
        item.innerHTML = `
          <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 0.3rem;">
            <span>${formatSubjectName(area.subject)}</span>
            <span style="color: ${area.accuracy_pct >= 70 ? 'var(--status-success)' : (area.accuracy_pct >= 50 ? 'var(--gold-primary)' : 'var(--status-danger)')};">
              ${area.correct} / ${area.total} (${area.accuracy_pct}%) - ${area.status}
            </span>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width: ${area.accuracy_pct}%; background: ${area.accuracy_pct >= 70 ? 'var(--status-success)' : (area.accuracy_pct >= 50 ? 'var(--gold-primary)' : 'var(--status-danger)')};"></div>
          </div>
        `;
        areasContainer.appendChild(item);
      });
    }

    // Revisión detallada de preguntas y explicaciones
    const reviewContainer = document.getElementById('exam-review-questions-list');
    if (reviewContainer && result.review) {
      reviewContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D', 'E'];

      result.review.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = `exam-review-card ${item.status.toLowerCase()}`;

        const userText = item.user_answer !== null ? `${letters[item.user_answer]}) ${item.options[item.user_answer]}` : 'Sin responder (En blanco)';
        const correctText = `${letters[item.correct_answer]}) ${item.options[item.correct_answer]}`;

        div.innerHTML = `
          <div class="review-q-header">
            <span class="review-q-badge">${idx + 1}. ${formatSubjectName(item.subject)}</span>
            <span class="review-status-tag ${item.status.toLowerCase()}">${item.status === 'CORRECT' ? '✅ Correcta (+1.0)' : (item.status === 'BLANK' ? '⚪ En blanco (0.0)' : '❌ Incorrecta (-0.25)')}</span>
          </div>
          <p class="review-q-text">${item.question}</p>
          <div class="review-answers-box">
            <div style="margin-bottom: 0.3rem;">
              <strong>Su respuesta:</strong> <span style="color: ${item.status === 'CORRECT' ? 'var(--status-success)' : 'var(--status-danger)'};">${userText}</span>
            </div>
            <div>
              <strong>Respuesta oficial:</strong> <span style="color: var(--status-success);">${correctText}</span>
            </div>
          </div>
          <div class="review-explanation-box">
            💡 <strong>Solución pedagógica:</strong> ${item.explanation}
          </div>
        `;
        reviewContainer.appendChild(div);
      });
    }
  }

  // =========================================================================
  // 4. MÓDULO DEL SIMULADOR DE ESFUERZO FÍSICO Y ANTROPOMETRÍA
  // =========================================================================
  function initPhysicalModule() {
    const btnCalc = document.getElementById('btn-calc-physical');
    if (btnCalc) {
      btnCalc.addEventListener('click', calculatePhysicalEvaluation);
    }

    // Escuchar cambios de sexo para alternar campos Barras vs Suspensión
    const sexSelect = document.getElementById('phys-sex');
    if (sexSelect) {
      sexSelect.addEventListener('change', updatePhysicalFormBySex);
    }

    // Cálculo dinámico de IMC mientras el postulante escribe
    const heightInput = document.getElementById('phys-height');
    const weightInput = document.getElementById('phys-weight');
    if (heightInput && weightInput) {
      heightInput.addEventListener('input', updateBmiBadge);
      weightInput.addEventListener('input', updateBmiBadge);
    }
  }

  function updatePhysicalFormBySex() {
    const sex = document.getElementById('phys-sex')?.value || 'M';
    const barrasContainer = document.getElementById('field-group-barras');
    const suspensionContainer = document.getElementById('field-group-suspension');

    if (sex === 'M') {
      if (barrasContainer) barrasContainer.style.display = 'block';
      if (suspensionContainer) suspensionContainer.style.display = 'none';
    } else {
      if (barrasContainer) barrasContainer.style.display = 'none';
      if (suspensionContainer) suspensionContainer.style.display = 'block';
    }
  }

  function updateBmiBadge() {
    const h = parseFloat(document.getElementById('phys-height')?.value || '0');
    const w = parseFloat(document.getElementById('phys-weight')?.value || '0');
    const badge = document.getElementById('phys-bmi-live-badge');
    if (!badge) return;

    if (h > 1.2 && w > 30) {
      const bmi = (w / (h * h)).toFixed(1);
      badge.textContent = `IMC: ${bmi} kg/m²`;
      if (bmi >= 18.5 && bmi <= 24.9) {
        badge.className = 'status-pill-bmi success';
        badge.textContent += ' · Normal / Ideal';
      } else if (bmi > 24.9 && bmi <= 27.5) {
        badge.className = 'status-pill-bmi warning';
        badge.textContent += ' · Tolerancia Límite';
      } else {
        badge.className = 'status-pill-bmi danger';
        badge.textContent += ' · Fuera de Baremos';
      }
    } else {
      badge.textContent = 'Ingrese talla y peso';
      badge.className = 'status-pill-bmi info';
    }
  }

  async function calculatePhysicalEvaluation() {
    const instId = document.getElementById('phys-inst-select')?.value || AdmissionState.targetInstitution;
    const sex = document.getElementById('phys-sex')?.value || 'M';
    const height = parseFloat(document.getElementById('phys-height')?.value || '1.72');
    const weight = parseFloat(document.getElementById('phys-weight')?.value || '68');

    // Parsear tiempos carrera y natación
    const runMin = parseInt(document.getElementById('phys-run-min')?.value || '6');
    const runSec = parseInt(document.getElementById('phys-run-sec')?.value || '10');
    const totalRunSec = runMin * 60 + runSec;

    const natSec = parseFloat(document.getElementById('phys-swim-sec')?.value || '35');

    const marks = {
      carrera: totalRunSec,
      natacion: natSec,
      abdominales: parseFloat(document.getElementById('phys-abs')?.value || '32'),
      planchas: parseFloat(document.getElementById('phys-pushups')?.value || '35'),
      salto_largo: parseFloat(document.getElementById('phys-jump')?.value || '2.10')
    };

    if (sex === 'M') {
      marks.barras = parseFloat(document.getElementById('phys-pullups')?.value || '10');
    } else {
      marks.suspension = parseFloat(document.getElementById('phys-suspension-sec')?.value || '32');
    }

    try {
      const resp = await fetch('/api/physical/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json_safe_stringify({
          institution_id: instId,
          sex: sex,
          height_m: height,
          weight_kg: weight,
          marks: marks
        })
      });

      const data = await resp.json();
      AdmissionState.physicalResult = data;
      renderPhysicalResults(data);

      updateConsolidatedPreview();
    } catch (e) {
      console.error('Error al evaluar prueba física:', e);
      alert('Error al calificar las pruebas físicas.');
    }
  }

  function renderPhysicalResults(data) {
    const resultsCard = document.getElementById('physical-results-display');
    if (resultsCard) resultsCard.style.display = 'block';

    const avgEl = document.getElementById('phys-result-avg');
    const verdictEl = document.getElementById('phys-result-verdict');
    const anthroVerdictEl = document.getElementById('phys-result-anthro');
    const recEl = document.getElementById('phys-result-rec');

    const summary = data.summary || {};
    const anthro = data.anthropometry || {};

    if (avgEl) avgEl.textContent = summary.average_score ? summary.average_score.toFixed(2) : '0.00';
    if (verdictEl) {
      verdictEl.textContent = summary.verdict || '';
      verdictEl.className = `verdict-status-pill ${summary.is_passed ? 'success' : 'danger'}`;
    }
    if (anthroVerdictEl) {
      anthroVerdictEl.textContent = `Talla: ${anthro.height_m}m (Mín: ${anthro.min_height_m}m) | IMC: ${anthro.bmi} (${anthro.bmi_status}) -> ${anthro.final_anthropometric_verdict}`;
      anthroVerdictEl.style.color = anthro.final_anthropometric_verdict === 'APTO' ? 'var(--status-success)' : 'var(--status-danger)';
    }
    if (recEl) {
      recEl.textContent = anthro.recommendation || '';
    }

    // Tabla de disciplinas
    const tbody = document.getElementById('phys-disciplines-tbody');
    if (tbody && data.disciplines) {
      tbody.innerHTML = '';
      data.disciplines.forEach(d => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${formatDisciplineName(d.discipline)}</strong></td>
          <td>${d.mark_value}</td>
          <td><span class="score-badge-table ${d.is_passed ? 'pass' : 'fail'}">${d.score.toFixed(1)} / 20</span></td>
          <td>${d.min_passing}.0</td>
          <td><span style="color: ${d.is_passed ? 'var(--status-success)' : 'var(--status-danger)'}; font-weight: 600;">${d.status}</span></td>
        `;
        tbody.appendChild(tr);
      });
    }

    resultsCard.scrollIntoView({ behavior: 'smooth' });
  }

  // =========================================================================
  // 5. MÓDULO DE VERDICTO CONSOLIDADO DE ADMISIÓN
  // =========================================================================
  function initConsolidatedModule() {
    const btnConsolidate = document.getElementById('btn-generate-consolidated');
    if (btnConsolidate) {
      btnConsolidate.addEventListener('click', generateConsolidatedVerdict);
    }
  }

  function hookPsychometricBridge() {
    // Interceptar finalización del test psicométrico para guardar el score
    window.addEventListener('psychometricEvaluationDone', (e) => {
      const rep = e.detail;
      if (rep && rep.matching && rep.matching.primary_match) {
        AdmissionState.psychometricResult = {
          score_100: rep.matching.primary_match.fit_score || 85.0,
          is_apt: rep.matching.primary_match.fit_score >= 60.0
        };
        updateConsolidatedPreview();
      }
    });
  }

  function updateConsolidatedPreview() {
    const knowScore = AdmissionState.examResult?.summary?.vigesimal_score || 14.5;
    const physScore = AdmissionState.physicalResult?.summary?.average_score || 15.2;
    const psychScore = AdmissionState.psychometricResult?.score_100 || 85.0;

    const elK = document.getElementById('consolidated-preview-know');
    const elP = document.getElementById('consolidated-preview-phys');
    const elPsy = document.getElementById('consolidated-preview-psy');

    if (elK) elK.textContent = `${knowScore.toFixed(1)} / 20`;
    if (elP) elP.textContent = `${physScore.toFixed(1)} / 20`;
    if (elPsy) elPsy.textContent = `${psychScore.toFixed(1)}%`;
  }

  async function generateConsolidatedVerdict() {
    const candidateName = document.getElementById('cand-name')?.value || 'Postulante';
    const instId = AdmissionState.targetInstitution;

    const knowScore = AdmissionState.examResult?.summary?.vigesimal_score || 14.0;
    const knowApt = AdmissionState.examResult?.summary?.is_passed ?? true;

    const physScore = AdmissionState.physicalResult?.summary?.average_score || 15.0;
    const physApt = AdmissionState.physicalResult?.summary?.is_passed ?? true;
    const anthroApt = AdmissionState.physicalResult?.anthropometry?.final_anthropometric_verdict === 'APTO';

    const psychScore = AdmissionState.psychometricResult?.score_100 || 82.0;
    const psychApt = AdmissionState.psychometricResult?.is_apt ?? true;

    try {
      const resp = await fetch('/api/consolidated/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json_safe_stringify({
          candidate: { name: candidateName },
          institution_id: instId,
          knowledge_score: knowScore,
          knowledge_apt: knowApt,
          physical_score: physScore,
          physical_apt: physApt,
          anthropometric_apt: anthroApt,
          psychometric_score: psychScore,
          psychometric_apt: psychApt
        })
      });

      const report = await resp.json();
      renderConsolidatedReport(report);
    } catch (e) {
      console.error('Error al generar informe consolidado:', e);
      alert('Error al generar el informe consolidado.');
    }
  }

  function renderConsolidatedReport(report) {
    const container = document.getElementById('consolidated-report-container');
    if (!container) return;

    container.style.display = 'block';

    const verdictEl = document.getElementById('cons-verdict-title');
    const probEl = document.getElementById('cons-probability-badge');
    const finalScoreEl = document.getElementById('cons-final-score');
    const finalPctEl = document.getElementById('cons-final-pct');
    const instEl = document.getElementById('cons-inst-target-name');

    if (verdictEl) verdictEl.textContent = report.verdict || '';
    if (probEl) {
      probEl.textContent = `Probabilidad Estimada: ${report.probability || ''}`;
      probEl.className = `verdict-status-pill ${report.prob_level || 'success'}`;
    }
    if (finalScoreEl) finalScoreEl.textContent = report.scores.final_composite.vigesimal.toFixed(2);
    if (finalPctEl) finalPctEl.textContent = `${report.scores.final_composite.score_100.toFixed(1)} / 100`;
    if (instEl) instEl.textContent = report.target_institution.nombre || report.target_institution.id;

    // Renderizar tabla de viabilidad para las 8 escuelas matrices (Hard Filter + Baremos)
    const rankingContainer = document.getElementById('cons-schools-ranking-list');
    if (rankingContainer) {
      const schools = [
        { id: 'EMCH', name: 'Escuela Militar de Chorrillos', branch: 'Ejército del Perú', rank: 'Oficial', icon: '⚔️', minH: 1.68, minAge: 15, maxAge: 21 },
        { id: 'ETE', name: 'Escuela Técnica del Ejército', branch: 'Ejército del Perú', rank: 'Suboficial', icon: '🛡️', minH: 1.60, minAge: 15, maxAge: 23 },
        { id: 'ENP', name: 'Escuela Naval del Perú', branch: 'Marina de Guerra', rank: 'Oficial', icon: '⚓', minH: 1.68, minAge: 15, maxAge: 21 },
        { id: 'CITEN', name: 'Instituto Naval - CITEN', branch: 'Marina de Guerra', rank: 'Suboficial', icon: '🚢', minH: 1.60, minAge: 15, maxAge: 23 },
        { id: 'EOFAP', name: 'Escuela de Oficiales FAP', branch: 'Fuerza Aérea', rank: 'Oficial', icon: '✈️', minH: 1.68, minAge: 15, maxAge: 21 },
        { id: 'ESOFA', name: 'Escuela de Suboficiales FAP', branch: 'Fuerza Aérea', rank: 'Suboficial', icon: '🛩️', minH: 1.60, minAge: 15, maxAge: 23 },
        { id: 'EO-PNP', name: 'Escuela de Oficiales PNP', branch: 'Policía Nacional', rank: 'Oficial', icon: '👮', minH: 1.67, minAge: 17, maxAge: 22 },
        { id: 'EESTP', name: 'Escuela Técnico Superior PNP', branch: 'Policía Nacional', rank: 'Suboficial', icon: '🚔', minH: 1.64, minAge: 18, maxAge: 24 }
      ];

      const candHeight = parseFloat(document.getElementById('phys-height')?.value || '1.72');
      const candAge = parseInt(document.getElementById('cand-age')?.value || '19', 10);
      const candSex = document.getElementById('phys-sex')?.value || 'M';

      const knowScore = AdmissionState.examResult?.summary?.vigesimal_score || 14.0;
      const physScore = AdmissionState.physicalResult?.summary?.average_score || 15.0;
      const psychScore = AdmissionState.psychometricResult?.score_100 || 82.0;

      const knowPct = Math.min(100, Math.max(0, (knowScore / 20.0) * 100));
      const physPct = Math.min(100, Math.max(0, (physScore / 20.0) * 100));

      const items = schools.map(esc => {
        const minHeight = candSex === 'F' ? (esc.minH - 0.08) : esc.minH;
        let isHardBlocked = false;
        let reason = '';

        if (candHeight < minHeight) {
          isHardBlocked = true;
          reason = `Talla insuficiente: ${(candHeight * 100).toFixed(0)} cm < ${(minHeight * 100).toFixed(0)} cm exigido`;
        } else if (candAge < esc.minAge || candAge > esc.maxAge) {
          isHardBlocked = true;
          reason = `Edad fuera de rango: ${candAge} años (${esc.minAge}-${esc.maxAge} reglamentario)`;
        }

        let viability = 0;
        if (!isHardBlocked) {
          const schoolFit = esc.id === AdmissionState.targetInstitution ? psychScore : (psychScore * 0.88 + 8);
          viability = Math.round((schoolFit * 0.35) + (knowPct * 0.35) + (physPct * 0.30));
        }

        return {
          ...esc,
          isHardBlocked,
          reason,
          viability,
          psychoVal: Math.round(psychScore),
          knowVal: Math.round(knowPct),
          physVal: Math.round(physPct)
        };
      });

      items.sort((a, b) => b.viability - a.viability);

      rankingContainer.innerHTML = items.map((item, idx) => `
        <div class="ranking-row-card ${idx === 0 && !item.isHardBlocked ? 'winner-row' : ''} ${item.isHardBlocked ? 'blocked-row' : ''}">
          <div class="rank-position-box">
            <span class="rank-number">#${idx + 1}</span>
            <span class="school-icon">${item.icon}</span>
          </div>
          <div class="school-info-box">
            <div class="school-title-line">
              <span class="school-tag">${item.id}</span>
              <strong class="school-name">${item.name}</strong>
              <span class="school-rango-pill">${item.rank}</span>
            </div>
            <div class="school-rama-sub">${item.branch}</div>
            ${item.isHardBlocked ? `<div class="blocked-reason-hint" style="color: #f87171; font-size: 0.8rem; margin-top: 0.2rem;">🚫 ${item.reason}</div>` : ''}
          </div>
          <div class="school-breakdown-box">
            <div class="breakdown-item"><span>Psico:</span> <strong>${item.isHardBlocked ? '-' : item.psychoVal + '%'}</strong></div>
            <div class="breakdown-item"><span>Conoc:</span> <strong>${item.isHardBlocked ? '-' : item.knowVal + '%'}</strong></div>
            <div class="breakdown-item"><span>Físico:</span> <strong>${item.isHardBlocked ? '-' : item.physVal + '%'}</strong></div>
          </div>
          <div class="viability-badge-column">
            <div class="viability-percent ${item.isHardBlocked ? 'blocked' : ''}">
              ${item.isHardBlocked ? '0%' : item.viability + '%'}
            </div>
            <div class="viability-verdict-label">
              ${item.isHardBlocked ? 'DESCALIFICADO' : 'VIABILIDAD'}
            </div>
          </div>
        </div>
      `).join('');
    }

    // Recomendaciones
    const recList = document.getElementById('cons-recommendations-list');
    if (recList && report.strategic_recommendations) {
      recList.innerHTML = '';
      report.strategic_recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recList.appendChild(li);
      });
    }

    container.scrollIntoView({ behavior: 'smooth' });
  }

  // =========================================================================
  // FUNCIONES AUXILIARES
  // =========================================================================
  function formatSubjectName(s) {
    const map = {
      'razonamiento_matematico': 'Razonamiento Matemático',
      'razonamiento_verbal': 'Razonamiento Verbal',
      'matematicas': 'Matemáticas (Aritmética/Álgebra)',
      'geometria_trigonometria': 'Geometría y Trigonometría',
      'ciencias_fisica': 'Física',
      'ciencias_quimica': 'Química',
      'lenguaje_comunicacion': 'Lenguaje y Literatura',
      'historia_peru_militar': 'Historia del Perú y Cultura Militar',
      'geografia_peru': 'Geografía y Realidad Nacional',
      'derechos_humanos_civica': 'Derechos Humanos y Constitución',
      'cta_medio_ambiente': 'Ciencia, Tecnología y Ambiente (CTA)',
      'informatica_tecnologia': 'Informática y Ciberseguridad',
      'ingles_basico': 'Inglés'
    };
    return map[s] || s || 'Materia General';
  }

  function formatDisciplineName(d) {
    const map = {
      'barras': 'Barras de Dominadas (Fuerza de Brazos)',
      'suspension': 'Suspensión en Barra (Segundos)',
      'abdominales': 'Abdominales en 1 Minuto',
      'planchas': 'Flexión de Brazos / Planchas en 1 Minuto',
      'carrera_1500m': 'Carrera 1500 Metros Planos',
      'carrera_1000m': 'Carrera 1000 Metros Planos',
      'natacion_50m': 'Natación 50 Metros Estilo Libre',
      'natacion_25m': 'Natación 25 Metros Estilo Libre',
      'salto_largo': 'Salto Largo Sin Impulso'
    };
    return map[d] || d;
  }

  function json_safe_stringify(obj) {
    return JSON.stringify(obj);
  }

  // Exponer API en ventana para interactividad
  window.AdmissionSimulator = {
    state: AdmissionState,
    switchMainTab: switchMainTab
  };

})();
