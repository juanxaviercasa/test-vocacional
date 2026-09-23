/**
 * Controlador Principal de la Aplicación Web de Evaluación Psicométrica Militar.
 * Gestiona el flujo del test, persistencia en LocalStorage, renderizado de reactivos
 * y visualización interactiva del informe con Radar Chart en Canvas nativo.
 */

const App = {
  state: {
    screen: 'REGISTRATION', // 'REGISTRATION' | 'SURVEY' | 'RESULTS'
    candidate: {
      name: '',
      dni: '',
      sex: 'M',
      age: 19,
      target_institution: 'FAP',
      mode: '120' // '120' | '50'
    },
    questions: [],
    answers: {},
    currentIndex: 0,
    questionsPerPage: 3,
    secondsElapsed: 0,
    timerInterval: null,
    resultsData: null
  },

  init() {
    this.bindEvents();
    this.restoreSavedDraft();
    this.setupKeyboardShortcuts();
  },

  bindEvents() {
    // Selector de Modo
    document.querySelectorAll('.mode-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        document.querySelectorAll('.mode-card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        const mode = card.getAttribute('data-mode');
        this.state.candidate.mode = mode;
      });
    });

    // Botón Iniciar
    const btnStart = document.getElementById('btn-start-test');
    if (btnStart) {
      btnStart.addEventListener('click', () => this.startAssessment());
    }

    // Botones de Navegación del Test
    const btnPrev = document.getElementById('btn-prev-page');
    const btnNext = document.getElementById('btn-next-page');
    if (btnPrev) btnPrev.addEventListener('click', () => this.prevPage());
    if (btnNext) btnNext.addEventListener('click', () => this.nextPage());

    // Botón Simulación / Relleno Rápido (Pruebas del Evaluador)
    const btnDemo = document.getElementById('btn-demo-fill');
    if (btnDemo) {
      btnDemo.addEventListener('click', () => this.fillRandomAnswers());
    }

    // Botón Reiniciar
    const btnReset = document.getElementById('btn-restart-app');
    if (btnReset) {
      btnReset.addEventListener('click', () => this.restartAssessment());
    }

    // Botón Imprimir
    const btnPrint = document.getElementById('btn-print-report');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => window.print());
    }
  },

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (this.state.screen !== 'SURVEY') return;

      // Teclas numéricas 1 a 5 para responder preguntas rápidamente
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const activeItem = document.querySelector('.question-item:not(.answered)');
        if (activeItem) {
          const qid = activeItem.getAttribute('data-qid');
          this.setAnswer(qid, Number(e.key));
        }
      }

      // Flechas o Enter para avanzar
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        const btnNext = document.getElementById('btn-next-page');
        if (btnNext && !btnNext.disabled) {
          this.nextPage();
        }
      } else if (e.key === 'ArrowLeft') {
        this.prevPage();
      }
    });
  },

  restoreSavedDraft() {
    try {
      const saved = localStorage.getItem('peru_military_test_draft');
      if (saved) {
        const parsed = jsonParseSafe(saved);
        if (parsed && parsed.answers && Object.keys(parsed.answers).length > 0) {
          const alertDraft = document.getElementById('draft-restore-banner');
          if (alertDraft) {
            alertDraft.style.display = 'flex';
            document.getElementById('btn-accept-draft').onclick = () => {
              this.state.candidate = parsed.candidate || this.state.candidate;
              this.state.answers = parsed.answers || {};
              this.state.currentIndex = parsed.currentIndex || 0;
              this.state.secondsElapsed = parsed.secondsElapsed || 0;
              this.populateCandidateInputs();
              this.startAssessment(true);
            };
            document.getElementById('btn-discard-draft').onclick = () => {
              localStorage.removeItem('peru_military_test_draft');
              alertDraft.style.display = 'none';
            };
          }
        }
      }
    } catch (err) {
      console.warn('Error al restaurar borrador previo:', err);
    }
  },

  populateCandidateInputs() {
    const c = this.state.candidate;
    if (document.getElementById('cand-name')) document.getElementById('cand-name').value = c.name;
    if (document.getElementById('cand-dni')) document.getElementById('cand-dni').value = c.dni;
    if (document.getElementById('cand-age')) document.getElementById('cand-age').value = c.age;
    if (document.getElementById('cand-sex')) document.getElementById('cand-sex').value = c.sex;
    if (document.getElementById('cand-inst')) document.getElementById('cand-inst').value = c.target_institution;
  },

  saveDraft() {
    try {
      const draft = {
        candidate: this.state.candidate,
        answers: this.state.answers,
        currentIndex: this.state.currentIndex,
        secondsElapsed: this.state.secondsElapsed
      };
      localStorage.setItem('peru_military_test_draft', JSON.stringify(draft));
    } catch (e) {
      // Ignorar quota errors
    }
  },

  startAssessment(isRestoring = false) {
    if (!isRestoring) {
      const name = document.getElementById('cand-name')?.value.trim() || 'Aspirante Evaluado';
      const dni = document.getElementById('cand-dni')?.value.trim() || '00000000';
      const age = parseInt(document.getElementById('cand-age')?.value || '19', 10);
      const sex = document.getElementById('cand-sex')?.value || 'M';
      const inst = document.getElementById('cand-inst')?.value || 'FAP';

      this.state.candidate.name = name;
      this.state.candidate.dni = dni;
      this.state.candidate.age = age;
      this.state.candidate.sex = sex;
      this.state.candidate.target_institution = inst;
      this.state.currentIndex = 0;
      this.state.answers = {};
      this.state.secondsElapsed = 0;
    }

    // Asignar lista de preguntas según modo
    if (this.state.candidate.mode === '50') {
      this.state.questions = [...QUESTIONS_50];
    } else {
      this.state.questions = [...QUESTIONS_120];
    }

    // Iniciar cronómetro
    this.startTimer();

    // Cambiar de pantalla
    this.showScreen('SURVEY');
    this.renderCurrentBlock();
  },

  startTimer() {
    if (this.state.timerInterval) clearInterval(this.state.timerInterval);
    this.state.timerInterval = setInterval(() => {
      this.state.secondsElapsed++;
      this.updateTimerDisplay();
    }, 1000);
  },

  updateTimerDisplay() {
    const el = document.getElementById('survey-timer');
    if (!el) return;
    const mins = Math.floor(this.state.secondsElapsed / 60);
    const secs = this.state.secondsElapsed % 60;
    el.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  renderCurrentBlock() {
    const qList = this.state.questions;
    const total = qList.length;
    const start = this.state.currentIndex;
    const end = Math.min(start + this.state.questionsPerPage, total);
    const currentSlice = qList.slice(start, end);

    // Actualizar barra de progreso
    const answeredCount = Object.keys(this.state.answers).length;
    const pct = Math.round((answeredCount / total) * 100);

    const progressFill = document.getElementById('survey-progress-fill');
    const progressLabel = document.getElementById('survey-progress-label');
    const questionsCountLabel = document.getElementById('survey-questions-count');

    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressLabel) progressLabel.textContent = `${pct}% Completado`;
    if (questionsCountLabel) {
      questionsCountLabel.textContent = `Preguntas ${start + 1} - ${end} de ${total}`;
    }

    // Renderizar preguntas
    const container = document.getElementById('questions-block-container');
    if (!container) return;

    container.innerHTML = '';

    currentSlice.forEach((q, idx) => {
      const qNum = start + idx + 1;
      const isAnswered = this.state.answers[q.id] !== undefined;
      const currentVal = this.state.answers[q.id];

      const qCard = document.createElement('div');
      qCard.className = `question-item ${isAnswered ? 'answered' : ''}`;
      qCard.setAttribute('data-qid', q.id);

      const facetTag = q.facet_name ? `<span class="q-facet-tag">${q.facet_name}</span>` : '';

      qCard.innerHTML = `
        <div class="question-meta">
          <span class="q-number">Reactivo ${qNum} de ${total}</span>
          ${facetTag}
        </div>
        <div class="question-text">${q.text}</div>
        <div class="likert-scale-grid" data-qid="${q.id}">
          ${[
            { num: 1, label: 'Muy en desacuerdo' },
            { num: 2, label: 'En desacuerdo' },
            { num: 3, label: 'Neutral / Indeciso' },
            { num: 4, label: 'De acuerdo' },
            { num: 5, label: 'Muy de acuerdo' }
          ]
            .map(
              (opt) => `
            <div class="likert-option ${currentVal === opt.num ? 'selected' : ''}" data-val="${opt.num}">
              <div class="likert-num">${opt.num}</div>
              <div class="likert-label">${opt.label}</div>
            </div>
          `
            )
            .join('')}
        </div>
      `;

      // Eventos de selección de respuesta
      qCard.querySelectorAll('.likert-option').forEach((btn) => {
        btn.addEventListener('click', () => {
          const val = Number(btn.getAttribute('data-val'));
          this.setAnswer(q.id, val);
        });
      });

      container.appendChild(qCard);
    });

    // Actualizar botones de navegación
    const btnPrev = document.getElementById('btn-prev-page');
    const btnNext = document.getElementById('btn-next-page');

    if (btnPrev) btnPrev.disabled = start === 0;

    const blockAnswered = currentSlice.every((q) => this.state.answers[q.id] !== undefined);

    if (btnNext) {
      if (end >= total) {
        btnNext.innerHTML = '🏁 Finalizar Evaluación y Ver Resultados';
        btnNext.className = 'btn-gold';
        btnNext.disabled = !blockAnswered;
      } else {
        btnNext.innerHTML = 'Siguiente Bloque ▸';
        btnNext.className = 'btn-gold';
        btnNext.disabled = !blockAnswered;
      }
    }

    // Auto-scroll suave arriba
    window.scrollTo({ top: 120, behavior: 'smooth' });
  },

  setAnswer(qid, value) {
    this.state.answers[qid] = value;
    this.saveDraft();

    // Actualizar UI del ítem seleccionado
    const card = document.querySelector(`.question-item[data-qid="${qid}"]`);
    if (card) {
      card.classList.add('answered');
      card.querySelectorAll('.likert-option').forEach((opt) => {
        const optVal = Number(opt.getAttribute('data-val'));
        if (optVal === value) {
          opt.classList.add('selected');
        } else {
          opt.classList.remove('selected');
        }
      });
    }

    // Actualizar barra de progreso
    const answeredCount = Object.keys(this.state.answers).length;
    const total = this.state.questions.length;
    const pct = Math.round((answeredCount / total) * 100);

    const progressFill = document.getElementById('survey-progress-fill');
    const progressLabel = document.getElementById('survey-progress-label');
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressLabel) progressLabel.textContent = `${pct}% Completado`;

    // Comprobar si el bloque actual está completo para habilitar botón Siguiente
    const start = this.state.currentIndex;
    const end = Math.min(start + this.state.questionsPerPage, total);
    const currentSlice = this.state.questions.slice(start, end);
    const blockAnswered = currentSlice.every((q) => this.state.answers[q.id] !== undefined);

    const btnNext = document.getElementById('btn-next-page');
    if (btnNext) btnNext.disabled = !blockAnswered;
  },

  prevPage() {
    if (this.state.currentIndex > 0) {
      this.state.currentIndex = Math.max(0, this.state.currentIndex - this.state.questionsPerPage);
      this.renderCurrentBlock();
    }
  },

  nextPage() {
    const total = this.state.questions.length;
    if (this.state.currentIndex + this.state.questionsPerPage < total) {
      this.state.currentIndex += this.state.questionsPerPage;
      this.renderCurrentBlock();
    } else {
      // Fin del test
      this.finishAssessment();
    }
  },

  fillRandomAnswers() {
    // Genera un perfil psicométrico sintético de postulante disciplinado y sereno
    this.state.questions.forEach((q) => {
      const rev = q.reversed;
      const dom = q.domain;
      let val = 3;
      if (dom === 'N') {
        val = rev ? 5 : 1; // bajo neuroticismo
      } else if (dom === 'C') {
        val = rev ? 1 : 5; // alta responsabilidad
      } else if (dom === 'E') {
        val = rev ? 2 : 4; // buena asertividad
      } else if (dom === 'A') {
        val = rev ? 2 : 4; // buena moralidad
      } else if (dom === 'O') {
        val = rev ? 2 : 4; // buena apertura
      }
      this.state.answers[q.id] = val;
    });

    this.saveDraft();
    this.renderCurrentBlock();
  },

  finishAssessment() {
    if (this.state.timerInterval) clearInterval(this.state.timerInterval);

    // Calcular psicometría
    const candidate = this.state.candidate;
    let scoringResult;

    if (candidate.mode === '50') {
      scoringResult = ScoringEngine.compute50(this.state.answers, candidate.sex, candidate.age);
    } else {
      scoringResult = ScoringEngine.compute120(this.state.answers, candidate.sex, candidate.age);
    }

    // Matching institucional
    const matchingResult = ScoringEngine.matchProfiles(scoringResult, candidate.target_institution);

    this.state.resultsData = {
      scoring: scoringResult,
      matching: matchingResult
    };

    // Limpiar borrador completado
    localStorage.removeItem('peru_military_test_draft');

    this.showScreen('RESULTS');
    this.renderResultsDashboard();

    // Notificar al simulador consolidado de admisión
    window.dispatchEvent(new CustomEvent('psychometricEvaluationDone', {
      detail: {
        scoring: scoringResult,
        matching: {
          primary_match: {
            fit_score: targetInst.overall_fit || 80.0,
            institution_id: candidate.target_institution
          }
        }
      }
    }));
  },

  renderResultsDashboard() {
    const { scoring, matching } = this.state.resultsData;
    const targetInst = matching.target_institution;
    const archetype = matching.archetype;
    const candidate = this.state.candidate;

    // 1. Tarjeta Hero de Veredicto
    const heroCard = document.getElementById('results-verdict-card');
    if (heroCard) {
      heroCard.className = `verdict-hero-card ${targetInst.verdict_color}`;
    }

    const gaugeNum = document.getElementById('verdict-fit-score');
    if (gaugeNum) gaugeNum.textContent = targetInst.overall_fit;

    const badgeInst = document.getElementById('verdict-inst-name');
    if (badgeInst) badgeInst.textContent = `${targetInst.badge} ${targetInst.name}`;

    const pillStatus = document.getElementById('verdict-status-pill');
    if (pillStatus) {
      pillStatus.className = `verdict-status-pill ${targetInst.verdict_color}`;
      pillStatus.textContent = targetInst.verdict;
    }

    const summaryP = document.getElementById('verdict-summary-text');
    if (summaryP) {
      let text = '';
      if (targetInst.has_critical_red_flags) {
        text = `ATENCIÓN: Se han detectado alertas rojas psicométricas críticas que representan causa de descalificación en la junta médica/psicológica para la ${targetInst.name}. Requiere subsanación clínica previa.`;
      } else if (targetInst.overall_fit >= 78.0) {
        text = `El postulante ${candidate.name} muestra un perfil sobresaliente y altamente compatible con las exigencias psicofísicas y disciplinarias de la ${targetInst.name} (${targetInst.motto}). Cumple con los estándares de templanza, honor y deber.`;
      } else if (targetInst.overall_fit >= 60.0) {
        text = `El postulante ${candidate.name} presenta un perfil con aptitud condicional para la ${targetInst.name}. Existen rasgos observables en control de presión o disciplina que deben afianzarse antes del internado.`;
      } else {
        text = `El perfil actual del postulante presenta discrepancias marcadas frente al estándar ideal de la ${targetInst.name}. Se aconseja evaluar las instituciones alternativas recomendadas en el ranking general.`;
      }
      summaryP.textContent = text;
    }

    // 2. Dibujar Radar Chart en Canvas Nativo
    this.drawRadarChart(scoring.domains, targetInst.ideal_domains);

    // 3. Renderizar Ranking Institucional
    this.renderRankingList(matching.ranking, targetInst.id);

    // 4. Renderizar Banderas Rojas o Despejado
    this.renderRedFlagsPanel(targetInst.red_flags);

    // 5. Renderizar Arquetipo
    const archBadge = document.getElementById('archetype-badge');
    const archTitle = document.getElementById('archetype-title');
    const archDesc = document.getElementById('archetype-desc');
    if (archBadge) archBadge.textContent = archetype.badge;
    if (archTitle) archTitle.textContent = archetype.name;
    if (archDesc) archDesc.textContent = archetype.description;

    // 6. Renderizar Facetas (para test de 120)
    this.renderFacetsBreakdown(scoring.facets);

    // 7. Renderizar Pautas para Entrevista Personal
    this.renderInterviewPrep(scoring.domains, targetInst);

    // 8. Ficha del Postulante para Imprimir
    const printMeta = document.getElementById('print-candidate-meta');
    if (printMeta) {
      printMeta.textContent = `Postulante: ${candidate.name} | DNI: ${candidate.dni} | Edad: ${candidate.age} años | Institución Evaluada: ${targetInst.name} | Modalidad: Test ${candidate.mode} reactivos`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  drawRadarChart(domains, idealDomains) {
    const canvas = document.getElementById('radarCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = 340;
    const height = 330;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 - 10;
    const radius = 105;

    const labels = [
      { key: 'N', name: 'N: Estabilidad (Inv)' },
      { key: 'E', name: 'E: Extraversión' },
      { key: 'O', name: 'O: Apertura/Intelecto' },
      { key: 'A', name: 'A: Amabilidad/Ética' },
      { key: 'C', name: 'C: Responsabilidad' }
    ];

    const numAxes = labels.length;
    const angleStep = (Math.PI * 2) / numAxes;

    // Dibujar telaraña poligonal concéntrica (4 niveles: 25%, 50%, 75%, 100%)
    [0.25, 0.5, 0.75, 1.0].forEach((level) => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * level);
        const y = centerY + Math.sin(angle) * (radius * level);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    });

    // Dibujar ejes radiales y textos
    ctx.font = '600 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < numAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const xEnd = centerX + Math.cos(angle) * radius;
      const yEnd = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();

      // Posición de la etiqueta
      const labelDist = radius + 22;
      const xLabel = centerX + Math.cos(angle) * labelDist;
      const yLabel = centerY + Math.sin(angle) * labelDist;

      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(labels[i].name, xLabel, yLabel);
    }

    // Función auxiliar para obtener coordenadas de un vector
    const getPolygonPoints = (vals) => {
      return labels.map((l, i) => {
        const angle = i * angleStep - Math.PI / 2;
        // Para Neuroticismo en el gráfico visual invertimos el eje para que más afuera signifique más estabilidad
        let val = vals[l.key] || 50;
        if (l.key === 'N') {
          val = 100 - val;
        }
        const r = (val / 100) * radius;
        return {
          x: centerX + Math.cos(angle) * r,
          y: centerY + Math.sin(angle) * r
        };
      });
    };

    // 1. Polígono Perfil Ideal Institucional (Dorado)
    const idealPoints = getPolygonPoints(idealDomains);
    ctx.beginPath();
    idealPoints.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(245, 158, 11, 0.18)';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Polígono Postulante (Azul Neón)
    const actualVals = {};
    labels.forEach((l) => {
      actualVals[l.key] = domains[l.key]?.percentile || 50;
    });
    const candidatePoints = getPolygonPoints(actualVals);

    ctx.beginPath();
    candidatePoints.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.35)';
    ctx.fill();
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Puntos del postulante
    candidatePoints.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Leyenda inferior
    ctx.font = '600 11px Inter, sans-serif';
    ctx.textAlign = 'left';

    // Candidato
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(centerX - 95, height - 16, 12, 12);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Postulante', centerX - 76, height - 9);

    // Ideal
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX + 25, height - 10);
    ctx.lineTo(centerX + 42, height - 10);
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('Ideal Institucional', centerX + 48, height - 9);
  },

  renderRankingList(ranking, targetInstId) {
    const listEl = document.getElementById('ranking-list-container');
    if (!listEl) return;

    listEl.innerHTML = '';

    ranking.forEach((inst) => {
      const isTarget = inst.id === targetInstId;
      const fit = inst.overall_fit;
      let barColor = 'linear-gradient(90deg, #2563eb, #3b82f6)';
      if (fit >= 78) barColor = 'linear-gradient(90deg, #059669, #10b981)';
      else if (inst.has_critical_red_flags) barColor = '#ef4444';
      else if (fit < 55) barColor = 'linear-gradient(90deg, #64748b, #94a3b8)';

      const row = document.createElement('div');
      row.className = `ranking-item ${isTarget ? 'target' : ''}`;
      row.innerHTML = `
        <div class="ranking-badge">${inst.badge}</div>
        <div class="ranking-info">
          <div class="ranking-header-row">
            <span class="ranking-name">${inst.name} ${isTarget ? '⭐' : ''}</span>
            <span class="ranking-pct">${fit}%</span>
          </div>
          <div class="ranking-bar-track">
            <div class="ranking-bar-fill" style="width: ${fit}%; background: ${barColor};"></div>
          </div>
        </div>
      `;
      listEl.appendChild(row);
    });
  },

  renderRedFlagsPanel(redFlags) {
    const container = document.getElementById('red-flags-container');
    if (!container) return;

    if (!redFlags || redFlags.length === 0) {
      container.innerHTML = `
        <div class="all-clear-box">
          <span style="font-size: 1.5rem;">🛡️</span>
          <div>
            <strong>Perfil Despejado de Banderas Rojas</strong><br>
            <span style="font-size: 0.85rem; color: #a7f3d0;">No se detectaron indicadores clínicos de riesgo descalificante en control de impulsos, hostilidad o probidad moral.</span>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="red-flags-box">
        <div class="rf-header">
          <span>⚠️</span>
          <span>Alertas Psicométricas y Observaciones Institucionales (${redFlags.length})</span>
        </div>
        ${redFlags
          .map(
            (rf) => `
          <div class="rf-item" style="border-left-color: ${rf.severity === 'CRITICAL' ? '#ef4444' : '#f59e0b'};">
            <div class="rf-title" style="color: ${rf.severity === 'CRITICAL' ? '#fca5a5' : '#fde68a'};">
              ${rf.severity === 'CRITICAL' ? '🚨 [DESCALIFICANTE]' : '⚡ [OBSERVACIÓN]'} ${rf.title}
            </div>
            <div class="rf-desc">${rf.description} (Valor obtenido: Pct. ${rf.tested_value})</div>
            <div class="rf-rec">Orientación técnica: ${rf.recommendation}</div>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  },

  renderFacetsBreakdown(facets) {
    const section = document.getElementById('facets-breakdown-section');
    const container = document.getElementById('facets-container');
    if (!section || !container) return;

    if (!facets || Object.keys(facets).length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = 'block';
    container.innerHTML = '';

    // Agrupar por dominio
    const groups = {
      N: { name: 'Neuroticismo (Inestabilidad)', items: [] },
      E: { name: 'Extraversión (Energía y Mando)', items: [] },
      O: { name: 'Apertura (Intelecto y Adaptabilidad)', items: [] },
      A: { name: 'Amabilidad (Ética y Prosocialidad)', items: [] },
      C: { name: 'Responsabilidad (Disciplina y Deber)', items: [] }
    };

    Object.values(facets).forEach((f) => {
      if (groups[f.domain]) {
        groups[f.domain].items.push(f);
      }
    });

    Object.keys(groups).forEach((domKey) => {
      const g = groups[domKey];
      const domHeading = document.createElement('h4');
      domHeading.style.gridColumn = '1 / -1';
      domHeading.style.color = '#fbbf24';
      domHeading.style.marginTop = '1.2rem';
      domHeading.style.fontSize = '1.05rem';
      domHeading.textContent = `Dominio: ${g.name}`;
      container.appendChild(domHeading);

      g.items.forEach((f) => {
        const card = document.createElement('div');
        card.className = 'facet-card';
        card.innerHTML = `
          <div class="facet-header">
            <span class="facet-name">${f.name}</span>
            <span class="facet-level-tag ${f.level}">${f.level}</span>
          </div>
          <div class="facet-desc">${f.description}</div>
          <div class="facet-bar-row">
            <div class="facet-bar-track">
              <div class="facet-bar-fill" style="width: ${f.percentile}%;"></div>
            </div>
            <span class="facet-pct-num">${f.percentile}%</span>
          </div>
        `;
        container.appendChild(card);
      });
    });
  },

  renderInterviewPrep(domains, targetInst) {
    const listStrengths = document.getElementById('interview-strengths-list');
    const listWatchouts = document.getElementById('interview-watchouts-list');
    const listQuestions = document.getElementById('interview-questions-list');

    if (listStrengths) {
      listStrengths.innerHTML = (targetInst.interview_strengths || [])
        .map((s) => `<li>${s}</li>`)
        .join('');
    }

    if (listWatchouts) {
      listWatchouts.innerHTML = (targetInst.development_advice || [])
        .map((w) => `<li>${w}</li>`)
        .join('');
    }

    if (listQuestions) {
      const code = targetInst.code;
      const questionsMap = {
        FAP: [
          '¿Por qué eligió la Fuerza Aérea frente a las demás instituciones y qué representa para usted el sacrificio de Quiñones?',
          'En situaciones de vuelo o emergencia donde el error cuesta vidas, ¿cómo asegura el cumplimiento estricto de las listas de chequeo?',
          '¿Cómo reacciona ante una orden estricta de un superior cuando el tiempo de reacción es crítico?'
        ],
        PNP: [
          '¿Cómo actuaría si en una intervención un ciudadano o manifestante lo insulta e intenta provocarlo físicamente?',
          '¿Qué significa para usted la incorruptibilidad en la función policial y cómo enfrentaría una insinuación indebida?',
          '¿Por qué considera que tiene la templanza para usar un arma de fuego únicamente en defensa de la vida y la ley?'
        ],
        ENM: [
          '¿Qué valores del Gran Almirante Miguel Grau considera indispensables para soportar meses de navegación en altamar?',
          '¿Cómo maneja la convivencia en espacios reducidos y el régimen de estricta jerarquía naval?',
          '¿Por qué aspira a ser oficial de la Marina de Guerra del Perú?'
        ],
        EMCH: [
          '¿Cuál es su concepto del lema "Hasta quemar el último cartucho" de Francisco Bolognesi en el contexto actual?',
          '¿Cómo ha demostrado capacidad de liderazgo y disciplina física y mental en su vida previa?',
          '¿Está dispuesto a servir en las guarniciones más alejadas de la frontera de la patria?'
        ],
        ENAMM: [
          '¿Qué le atrae de la vida en ultramar y cómo se ha preparado para largas temporadas lejos de su familia?',
          '¿Por qué es vital la rigurosa cautela y la seguridad industrial en buques mercantes?'
        ],
        UNIV: [
          '¿Cuáles son sus metas académicas a mediano plazo y cómo organiza sus rutinas de estudio?',
          '¿Cómo contribuye su vocación profesional al desarrollo del Perú?'
        ]
      };

      const qs = questionsMap[code] || questionsMap.FAP;
      listQuestions.innerHTML = qs.map((q) => `<li>${q}</li>`).join('');
    }
  },

  restartAssessment() {
    if (this.state.timerInterval) clearInterval(this.state.timerInterval);
    this.state.answers = {};
    this.state.currentIndex = 0;
    this.state.secondsElapsed = 0;
    this.state.resultsData = null;
    localStorage.removeItem('peru_military_test_draft');
    this.showScreen('REGISTRATION');
  },

  showScreen(name) {
    this.state.screen = name;
    document.querySelectorAll('.screen-section').forEach((sec) => {
      sec.style.display = 'none';
    });
    const target = document.getElementById(`screen-${name.toLowerCase()}`);
    if (target) {
      target.style.display = 'block';
    }
  }
};

function jsonParseSafe(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
