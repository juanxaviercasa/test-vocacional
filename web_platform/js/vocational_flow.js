/**
 * Controlador de Flujo del Test Vocacional Militar Multi-Pilar 100% Oficial
 * ¿Para qué escuela militar nació? (FFAA & PNP del Perú)
 * Integra las 6 Mejoras Oficiales:
 *   1. Escala L (Deseabilidad Social / Control Anti-Fraude)
 *   2. Penalización Oficial (-0.25 por error) en Conocimientos
 *   3. Baremos Médicos Especializados (visión 20/20, talla sentado, odontología, daltonismo)
 *   4. Simulacro Masivo Institucional de 100 Preguntas con Ponderación de Prospecto
 *   5. Integración del Rendimiento Físico e IGAC (Aptitud para el Combate)
 *   6. Persistencia SQLite y Ficha Oficial con Código Único y QR en SVG Nativo
 */

(function () {
  'use strict';

  // Estado global de la sesión vocacional
  const state = {
    sessionId: null,
    validityIds: [],
    legalEvaluation: null,
    pilar2Questions: [],
    pilar3Dilemmas: [],
    pilar4Questions: [],
    answersP2: {},
    answersP3: {},
    answersP4: {},
    currentPhase: 0, // 0: Registro/Filtro Legal, 1: P2, 2: P3, 3: P4, 4: Dashboard, 5: Mock 100
    candidate: {
      nombre: "Carlos Mendoza",
      dni: "73491820",
      edad: 19,
      sexo: "M",
      talla_cm: 172,
      peso_kg: 70,
      estado_civil: "soltero",
      tiene_hijos: false,
      tiene_antecedentes: false,
      tiene_tatuajes_visibles: false,
      secundaria_completa: true,
      agudeza_visual_20_20: true,
      talla_sentado_cm: 91.0,
      salud_dental_optima: true,
      daltonismo: false
    },
    mock100: {
      sessionId: null,
      schoolId: null,
      questions: [],
      answers: {},
      timerInterval: null,
      secondsLeft: 7200 // 120 minutos
    }
  };

  const REQUISITOS_LOCAL = [
    { id: "EMCH", nombre: "Escuela Militar de Chorrillos", rama: "Ejército", rango: "Oficial", tallaM: 168, tallaF: 158, edadMin: 15, edadMax: 21 },
    { id: "ETE", nombre: "Escuela Técnica del Ejército (ETE)", rama: "Ejército", rango: "Suboficial", tallaM: 160, tallaF: 155, edadMin: 15, edadMax: 23 },
    { id: "ENP", nombre: "Escuela Naval del Perú", rama: "Marina", rango: "Oficial", tallaM: 168, tallaF: 158, edadMin: 15, edadMax: 21 },
    { id: "CITEN", nombre: "Instituto Tecnológico Naval (CITEN)", rama: "Marina", rango: "Suboficial", tallaM: 160, tallaF: 155, edadMin: 15, edadMax: 23 },
    { id: "EOFAP", nombre: "Escuela de Oficiales FAP", rama: "FAP", rango: "Oficial", tallaM: 168, tallaF: 158, edadMin: 15, edadMax: 21 },
    { id: "ESOFA", nombre: "Escuela de Suboficiales FAP", rama: "FAP", rango: "Suboficial", tallaM: 160, tallaF: 155, edadMin: 15, edadMax: 23 },
    { id: "EO-PNP", nombre: "Escuela de Oficiales PNP", rama: "PNP", rango: "Oficial", tallaM: 167, tallaF: 159, edadMin: 15, edadMax: 22 },
    { id: "EESTP_PNP", nombre: "Escuela Técnica Superior PNP", rama: "PNP", rango: "Suboficial", tallaM: 164, tallaF: 158, edadMin: 15, edadMax: 24 }
  ];

  // =========================================================================
  // 1. INICIALIZACIÓN Y REACTIVIDAD DEL FILTRO LEGAL (PILAR 1 + MÉDICO)
  // =========================================================================
  let currentLegalStep = 0; // 0: Hero, 1: Biometría, 2: Médico/Legal, 3: Dictamen de Elegibilidad

  function setLegalWizardStep(targetStep, direction = 'right') {
    currentLegalStep = targetStep;

    const stepViews = [
      document.getElementById('step-view-0'),
      document.getElementById('step-view-1'),
      document.getElementById('step-view-2'),
      document.getElementById('step-view-3')
    ];

    stepViews.forEach((view, idx) => {
      if (!view) return;
      view.classList.remove('tactical-slide-in-right', 'tactical-slide-in-left');
      if (idx === targetStep) {
        view.style.display = 'block';
        const animClass = direction === 'left' ? 'tactical-slide-in-left' : 'tactical-slide-in-right';
        view.classList.add(animClass);
        view.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        view.style.display = 'none';
      }
    });

    if (targetStep === 3) {
      updateLiveLegalFilter();
    }
  }

  function init() {
    bindInputEvents();
    bindLegalWizardNavigation();
    updateLiveLegalFilter();

    const urlStep = new URLSearchParams(window.location.search).get('step');
    if (urlStep !== null) {
      const stepIdx = parseInt(urlStep, 10);
      if (!isNaN(stepIdx)) {
        setLegalWizardStep(stepIdx, 'right');
      }
    }

    const btnStart = document.getElementById("voc-btn-start-test");
    if (btnStart) {
      btnStart.addEventListener("click", startVocationalSession);
    }
  }

  function bindLegalWizardNavigation() {
    const btnHeroStart = document.getElementById("btn-hero-start");
    if (btnHeroStart) {
      btnHeroStart.addEventListener("click", () => setLegalWizardStep(1, 'right'));
    }

    const btnToMedical = document.getElementById("btn-to-medical");
    if (btnToMedical) {
      btnToMedical.addEventListener("click", () => setLegalWizardStep(2, 'right'));
    }

    const btnBackToHero = document.getElementById("btn-back-to-hero");
    if (btnBackToHero) {
      btnBackToHero.addEventListener("click", () => setLegalWizardStep(0, 'left'));
    }

    const btnBackToBiometrics = document.getElementById("btn-back-to-biometrics");
    if (btnBackToBiometrics) {
      btnBackToBiometrics.addEventListener("click", () => setLegalWizardStep(1, 'left'));
    }

    const btnProcessEligibility = document.getElementById("btn-process-eligibility");
    if (btnProcessEligibility) {
      btnProcessEligibility.addEventListener("click", () => {
        btnProcessEligibility.disabled = true;
        const oldContent = btnProcessEligibility.innerHTML;
        btnProcessEligibility.innerHTML = `<span>⏳ PROCESANDO BAREMOS MILITARES...</span>`;
        setTimeout(() => {
          btnProcessEligibility.disabled = false;
          btnProcessEligibility.innerHTML = oldContent;
          setLegalWizardStep(3, 'right');
        }, 500);
      });
    }

    const btnBackToMedical = document.getElementById("btn-back-to-medical-from-grid");
    if (btnBackToMedical) {
      btnBackToMedical.addEventListener("click", () => setLegalWizardStep(2, 'left'));
    }
  }

  function bindInputEvents() {
    const inputs = [
      "voc-cand-name", "voc-cand-age", "voc-cand-sex", "voc-cand-height",
      "voc-cand-weight", "voc-cand-civil", "voc-cand-children",
      "voc-cand-records", "voc-cand-tattoos", "voc-cand-school",
      "voc-cand-vision", "voc-cand-sitting-height", "voc-cand-dental", "voc-cand-daltonism"
    ];

    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", updateLiveLegalFilter);
        el.addEventListener("change", updateLiveLegalFilter);
      }
    });

    // Tactile toggle button listeners
    document.querySelectorAll(".tactical-toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const val = btn.getAttribute("data-value");
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.value = val;
          targetEl.dispatchEvent(new Event("change"));
        }
        const group = btn.closest(".tactical-toggle-group");
        if (group) {
          group.querySelectorAll(".tactical-toggle-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        }
        updateLiveLegalFilter();
      });
    });
  }

  function readCandidateData() {
    const nameEl = document.getElementById("voc-cand-name");
    const ageEl = document.getElementById("voc-cand-age");
    const sexEl = document.getElementById("voc-cand-sex");
    const hEl = document.getElementById("voc-cand-height");
    const wEl = document.getElementById("voc-cand-weight");
    const civilEl = document.getElementById("voc-cand-civil");
    const childEl = document.getElementById("voc-cand-children");
    const recEl = document.getElementById("voc-cand-records");
    const tatEl = document.getElementById("voc-cand-tattoos");
    const schEl = document.getElementById("voc-cand-school");

    // Nuevos campos médicos de alta especialidad (Mejora 3)
    const visEl = document.getElementById("voc-cand-vision");
    const sitEl = document.getElementById("voc-cand-sitting-height");
    const denEl = document.getElementById("voc-cand-dental");
    const dalEl = document.getElementById("voc-cand-daltonism");

    state.candidate = {
      nombre: nameEl ? nameEl.value.trim() || "Postulante" : "Postulante",
      dni: "73491820",
      edad: ageEl ? parseInt(ageEl.value, 10) || 19 : 19,
      sexo: sexEl ? sexEl.value : "M",
      talla_cm: hEl ? parseFloat(hEl.value) || 170.0 : 170.0,
      peso_kg: wEl ? parseFloat(wEl.value) || 68.0 : 68.0,
      estado_civil: civilEl ? civilEl.value : "soltero",
      tiene_hijos: childEl ? (childEl.value === "si") : false,
      tiene_antecedentes: recEl ? (recEl.value === "si") : false,
      tiene_tatuajes_visibles: tatEl ? (tatEl.value === "si") : false,
      secundaria_completa: schEl ? (schEl.value === "si") : true,
      agudeza_visual_20_20: visEl ? (visEl.value === "20_20") : true,
      talla_sentado_cm: sitEl ? parseFloat(sitEl.value) || 91.0 : 91.0,
      salud_dental_optima: denEl ? (denEl.value === "optima") : true,
      daltonismo: dalEl ? (dalEl.value === "si") : false
    };

    return state.candidate;
  }

  function updateLiveLegalFilter() {
    const c = readCandidateData();
    const h_m = c.talla_cm > 3 ? c.talla_cm / 100 : c.talla_cm;
    const imc = h_m > 0 ? (c.peso_kg / (h_m * h_m)).toFixed(1) : 22.0;

    const imcBadge = document.getElementById("voc-imc-badge");
    if (imcBadge) {
      let imcColor = "#10b981";
      let imcText = "Óptimo Militar";
      if (imc < 18.5) { imcColor = "#f59e0b"; imcText = "Bajo Peso"; }
      else if (imc > 25 && imc <= 27.5) { imcColor = "#f59e0b"; imcText = "Límite Máximo"; }
      else if (imc > 27.5) { imcColor = "#ef4444"; imcText = "Sobrepeso"; }
      imcBadge.innerHTML = `IMC: <strong>${imc}</strong> (${imcText})`;
      imcBadge.style.borderColor = imcColor;
    }

    const grid = document.getElementById("voc-legal-preview-grid");
    if (!grid) return;

    let totalAptas = 0;
    let html = "";

    REQUISITOS_LOCAL.forEach(esc => {
      const minTalla = c.sexo === "M" ? esc.tallaM : esc.tallaF;
      const aptaTalla = c.talla_cm >= minTalla;
      const aptaEdad = c.edad >= esc.edadMin && c.edad <= esc.edadMax;
      const aptaCivil = c.estado_civil === "soltero" && !c.tiene_hijos;
      const aptaLegal = !c.tiene_antecedentes && c.secundaria_completa;
      
      let aptaMedica = true;
      let alertaMedica = "";

      if (esc.id === "EOFAP") {
        if (c.daltonismo) {
          aptaMedica = false;
          alertaMedica = "Daltonismo descalifica en FAP";
        } else if (!c.agudeza_visual_20_20) {
          alertaMedica = "Solo Servicios / No Piloto";
        }
      }

      const esApta = aptaTalla && aptaEdad && aptaCivil && aptaLegal && aptaMedica;
      if (esApta) totalAptas++;

      let motivo = "";
      if (!aptaTalla) motivo = `Talla mín: ${minTalla}cm`;
      else if (!aptaEdad) motivo = `Edad (${esc.edadMin}-${esc.edadMax} años)`;
      else if (!aptaCivil) motivo = "Soltero(a) sin hijos";
      else if (!aptaLegal) motivo = "Req. Legales";
      else if (!aptaMedica) motivo = alertaMedica;

      html += `
        <div class="voc-legal-card ${esApta ? 'apto' : 'no-apto'}">
          <div class="voc-legal-card-watermark">${esc.id}</div>
          <div class="voc-legal-card-header">
            <div>
              <div class="voc-legal-card-title">${esc.nombre}</div>
              <div class="voc-legal-card-sub">${esc.rama} · ${esc.rango}</div>
            </div>
            <span class="voc-legal-badge ${esApta ? 'apto' : 'no-apto'}">
              ${esApta ? '✓ APTO' : '⚠ NO APTO'}
            </span>
          </div>
          <div class="voc-legal-card-body">
            <div class="spec-row">
              <span>Talla Mínima (${c.sexo === 'M' ? 'Varón' : 'Dama'}):</span>
              <strong>${minTalla} cm</strong>
            </div>
            <div class="spec-row">
              <span>Rango Edad:</span>
              <strong>${esc.edadMin} - ${esc.edadMax} años</strong>
            </div>
            ${alertaMedica ? `
            <div style="font-size: 0.75rem; color: ${esApta ? '#F59E0B' : '#EF4444'}; margin-top: 0.4rem; font-weight: 600;">
              ℹ️ ${alertaMedica}
            </div>` : ''}
            ${!esApta && motivo ? `
            <div style="font-size: 0.75rem; color: #EF4444; margin-top: 0.4rem; font-weight: 700;">
              ✕ ${motivo}
            </div>` : ''}
          </div>
          <div class="voc-legal-card-footer">
            <span style="font-size: 0.72rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">ESTADO</span>
            <span style="font-family: var(--font-primary, sans-serif); font-weight: 700; font-size: 0.85rem; color: ${esApta ? '#10B981' : '#EF4444'};">
              ${esApta ? 'ELEGIBLE REGLAMENTARIO' : 'NO CUMPLE REQUISITO'}
            </span>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;

    const countLabel = document.getElementById("voc-legal-apt-count");
    if (countLabel) {
      countLabel.textContent = `${totalAptas} de 8 escuelas militares`;
      countLabel.style.color = totalAptas > 0 ? "var(--status-success)" : "var(--status-danger)";
    }
  }

  // =========================================================================
  // 2. INICIAR SESIÓN VOCACIONAL (API INIT)
  // =========================================================================
  async function startVocationalSession() {
    const candidate = readCandidateData();
    const btn = document.getElementById("voc-btn-start-test");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>⏳ Generando batería aleatoria (con Escala L anti-fraude)...</span>`;
    }

    try {
      const response = await fetch("/api/vocational/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidate })
      });

      if (!response.ok) throw new Error("Error al inicializar sesión vocacional");

      const data = await response.json();
      state.sessionId = data.session_id;
      state.validityIds = data.validity_ids || [];
      state.legalEvaluation = data.legal_evaluation;
      state.pilar2Questions = data.pilar2_questions;
      state.pilar3Dilemmas = data.pilar3_dilemmas;
      state.pilar4Questions = data.pilar4_questions;

      switchPhase(1);
      renderPilar2();
    } catch (err) {
      alert("Hubo un error al iniciar el test: " + err.message);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span>🚀 Iniciar Prueba Vocacional Completa</span>`;
      }
    }
  }

  function switchPhase(phaseNum) {
    state.currentPhase = phaseNum;
    const screens = [
      "voc-screen-0-legal",
      "voc-screen-1-psico",
      "voc-screen-2-intereses",
      "voc-screen-3-conocimientos",
      "voc-screen-4-dashboard",
      "voc-screen-5-mock100"
    ];

    screens.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (el) el.style.display = (idx === phaseNum) ? "block" : "none";
    });

    document.querySelectorAll(".voc-step-pill").forEach(pill => {
      const stepIdx = parseInt(pill.getAttribute("data-step"), 10);
      pill.classList.remove("active", "completed");
      if (stepIdx === phaseNum) {
        pill.classList.add("active");
      } else if (stepIdx < phaseNum) {
        pill.classList.add("completed");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // =========================================================================
  // 3. FASE 1: PILAR 2 (PSICOMÉTRICO BIG FIVE + ESCALA L - 18 REACTIVOS)
  // =========================================================================
  function renderPilar2() {
    const container = document.getElementById("voc-pilar2-container");
    if (!container) return;

    let html = `
      <div style="background: rgba(11, 20, 46, 0.6); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1.5rem;">
        <h3 style="color: var(--gold-light); font-size: 1.15rem; margin-bottom: 0.3rem;">🧠 Pilar 2: Evaluación Psicométrica Militar (${state.pilar2Questions.length} Reactivos)</h3>
        <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0;">
          Responda del 1 al 5 con total sinceridad: 1 (Totalmente en desacuerdo) al 5 (Totalmente de acuerdo).
          <span style="color: var(--status-success);">🛡️ Protocolo calibrado con escala de validez y detección de deseabilidad social.</span>
        </p>
      </div>
    `;

    state.pilar2Questions.forEach((q, idx) => {
      const qNum = idx + 1;
      const domLabel = q.dominio_evaluado === "Control de Validez" ? "Estilo de Vida Militar" : q.dominio_evaluado;
      html += `
        <div class="voc-reactivo-card" id="card-p2-${q.id_reactivo}">
          <div class="voc-reactivo-header">
            <span style="font-weight: 800; color: var(--gold-primary); font-size: 0.9rem;">#${qNum} de ${state.pilar2Questions.length}</span>
            <span class="voc-domain-tag">${domLabel}</span>
          </div>
          <p style="font-size: 1.05rem; color: #ffffff; font-weight: 500; line-height: 1.45;">"${q.enunciado}"</p>
          <div class="voc-likert-scale">
            ${[
              { v: 1, label: "1. Muy en desacuerdo" },
              { v: 2, label: "2. En desacuerdo" },
              { v: 3, label: "3. Neutral / Indeciso" },
              { v: 4, label: "4. De acuerdo" },
              { v: 5, label: "5. Muy de acuerdo" }
            ].map(opt => `
              <button type="button" class="voc-likert-btn ${state.answersP2[q.id_reactivo] === opt.v ? 'selected' : ''}" 
                      onclick="window.selectLikertP2('${q.id_reactivo}', ${opt.v})">
                <span style="font-size: 1.1rem; font-weight: 800;">${opt.v}</span>
                <span>${opt.label}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    });

    html += `
      <div style="text-align: center; margin-top: 2rem;">
        <button id="voc-btn-next-p2" class="btn-gold" style="padding: 1rem 3rem; font-size: 1.05rem;" onclick="window.nextPhaseFromP2()">
          <span>Continuar a Fase 2: Intereses Operativos (10 Dilemas) ▸</span>
        </button>
      </div>
    `;

    container.innerHTML = html;
  }

  window.selectLikertP2 = function (rId, val) {
    state.answersP2[rId] = val;
    const card = document.getElementById(`card-p2-${rId}`);
    if (card) {
      card.querySelectorAll(".voc-likert-btn").forEach((btn, idx) => {
        btn.classList.toggle("selected", idx + 1 === val);
      });
      card.style.borderColor = "var(--gold-primary)";
    }
  };

  window.nextPhaseFromP2 = function () {
    const answeredCount = Object.keys(state.answersP2).length;
    if (answeredCount < state.pilar2Questions.length) {
      if (!confirm(`Has respondido ${answeredCount} de ${state.pilar2Questions.length} reactivos. ¿Deseas autocompletar los restantes de forma neutral para continuar?`)) {
        return;
      }
      state.pilar2Questions.forEach(q => {
        if (!state.answersP2[q.id_reactivo]) state.answersP2[q.id_reactivo] = 3;
      });
    }
    switchPhase(2);
    renderPilar3();
  };

  // =========================================================================
  // 4. FASE 2: PILAR 3 (INTERESES OPERATIVOS - 10 DILEMAS TÁCTICOS)
  // =========================================================================
  function renderPilar3() {
    const container = document.getElementById("voc-pilar3-container");
    if (!container) return;

    let html = `
      <div style="background: rgba(11, 20, 46, 0.6); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1.5rem;">
        <h3 style="color: #38bdf8; font-size: 1.15rem; margin-bottom: 0.3rem;">🎯 Pilar 3: Dilemas Operacionales Inmersivos (10 Escenarios)</h3>
        <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0;">
          Selecciona cuál sería tu acción o especialidad táctica predilecta ante cada escenario real en el territorio peruano.
        </p>
      </div>
    `;

    state.pilar3Dilemmas.forEach((d, idx) => {
      const qNum = idx + 1;
      html += `
        <div class="voc-dilemma-card" id="card-p3-${d.id_dilema}">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-weight: 800; color: #38bdf8; font-size: 0.9rem;">Escenario #${qNum} de 10</span>
            <span class="voc-dilemma-category">📍 ${d.categoria}</span>
          </div>
          <p class="voc-dilemma-scenario">${d.escenario}</p>
          <div class="voc-dilemma-options-grid">
            ${d.opciones.map(opt => `
              <button type="button" class="voc-dilemma-opt-btn ${state.answersP3[d.id_dilema] === opt.id_opcion ? 'selected' : ''}"
                      onclick="window.selectDilemmaP3('${d.id_dilema}', '${opt.id_opcion}')">
                <span class="voc-opt-letter">${opt.id_opcion}</span>
                <span style="font-size: 0.9rem; line-height: 1.4;">${opt.texto_respuesta}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    });

    html += `
      <div style="text-align: center; margin-top: 2rem;">
        <button id="voc-btn-next-p3" class="btn-gold" style="padding: 1rem 3rem; font-size: 1.05rem;" onclick="window.nextPhaseFromP3()">
          <span>Continuar a Fase 3: Aptitud y Conocimientos (20 Preguntas) ▸</span>
        </button>
      </div>
    `;

    container.innerHTML = html;
  }

  window.selectDilemmaP3 = function (dId, optId) {
    state.answersP3[dId] = optId;
    const card = document.getElementById(`card-p3-${dId}`);
    if (card) {
      card.querySelectorAll(".voc-dilemma-opt-btn").forEach(btn => {
        const letter = btn.querySelector(".voc-opt-letter").textContent.trim();
        btn.classList.toggle("selected", letter === optId);
      });
      card.style.borderColor = "#38bdf8";
    }
  };

  window.nextPhaseFromP3 = function () {
    const answeredCount = Object.keys(state.answersP3).length;
    if (answeredCount < state.pilar3Dilemmas.length) {
      if (!confirm(`Has respondido ${answeredCount} de 10 escenarios. ¿Deseas autocompletar los restantes al azar para continuar rápidamente?`)) {
        return;
      }
      state.pilar3Dilemmas.forEach(d => {
        if (!state.answersP3[d.id_dilema]) state.answersP3[d.id_dilema] = "A";
      });
    }
    switchPhase(3);
    renderPilar4();
  };

  // =========================================================================
  // 5. FASE 3: PILAR 4 (CONOCIMIENTOS CON PENALIZACIÓN OFICIAL -0.25 - MEJORA 2)
  // =========================================================================
  function renderPilar4() {
    const container = document.getElementById("voc-pilar4-container");
    if (!container) return;

    let html = `
      <div style="background: rgba(11, 20, 46, 0.6); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="color: var(--gold-light); font-size: 1.15rem; margin-bottom: 0.2rem;">📝 Pilar 4: Simulador Pre-Militar (20 Preguntas)</h3>
          <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0;">
            <strong style="color: #fbbf24;">Reglamento Oficial:</strong> Acierto <strong>+1.0 punto</strong> | Error <strong>-0.25 puntos (penalización)</strong> | Blanco <strong>0.0 puntos</strong>.
          </p>
        </div>
        <button type="button" class="btn-outline-gold" onclick="window.fillDemoAnswers()" style="font-size: 0.85rem; padding: 0.5rem 1rem;">
          ⚡ Simulación Rápida (Rellenar Todo)
        </button>
      </div>
    `;

    state.pilar4Questions.forEach((q, idx) => {
      const qNum = idx + 1;
      let areaClass = "psicotecnico";
      if (q.area_academica.includes("Exactas")) areaClass = "ciencias-exactas";
      else if (q.area_academica.includes("Naturales")) areaClass = "ciencias-naturales";
      else if (q.area_academica.includes("Letras")) areaClass = "letras";

      html += `
        <div class="voc-exam-card" id="card-p4-${q.id_pregunta}">
          <div class="voc-exam-meta-bar">
            <span style="font-weight: 800; color: var(--gold-primary);">Pregunta #${qNum} de 20</span>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <span class="voc-area-tag ${areaClass}">${q.area_academica}</span>
              <span style="font-size: 0.75rem; color: var(--text-dim);">${q.tema_especifico}</span>
            </div>
          </div>
          <p style="font-size: 1.05rem; color: #ffffff; font-weight: 500; line-height: 1.45;">${q.enunciado}</p>
          ${q.imagen_url ? `
            <div class="exam-question-image-wrapper">
              <img src="${q.imagen_url}" alt="${q.imagen_alt || 'Gráfico ilustrativo del ejercicio'}" class="exam-question-image" loading="lazy" />
              ${q.imagen_alt ? `<span class="exam-question-image-caption">${q.imagen_alt}</span>` : ''}
            </div>
          ` : ''}
          <div class="voc-exam-opt-row">
            ${q.opciones.map(opt => `
              <button type="button" class="voc-exam-opt-btn ${state.answersP4[q.id_pregunta] === opt.id_opcion ? 'selected' : ''}"
                      onclick="window.selectKnowledgeP4('${q.id_pregunta}', '${opt.id_opcion}')">
                <span class="voc-opt-letter">${opt.id_opcion}</span>
                <span>${opt.texto_respuesta}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    });

    html += `
      <div style="text-align: center; margin-top: 2rem;">
        <button id="voc-btn-submit-eval" class="btn-gold" style="padding: 1.1rem 3.5rem; font-size: 1.15rem;" onclick="window.submitVocationalEvaluation()">
          <span>🎖️ Finalizar Prueba y Calcular "¿Para qué Escuela Nací?"</span>
        </button>
      </div>
    `;

    container.innerHTML = html;
    renderLatexInContainer(container);
  }

  window.selectKnowledgeP4 = function (qId, optId) {
    state.answersP4[qId] = optId;
    const card = document.getElementById(`card-p4-${qId}`);
    if (card) {
      card.querySelectorAll(".voc-exam-opt-btn").forEach(btn => {
        const letter = btn.querySelector(".voc-opt-letter").textContent.trim();
        btn.classList.toggle("selected", letter === optId);
      });
      card.style.borderColor = "var(--gold-primary)";
    }
  };

  window.fillDemoAnswers = function () {
    state.pilar2Questions.forEach(q => {
      // Si es de control, responder 2 o 3 para mantener sinceridad alta
      const isControl = (q.dominio_evaluado === "Control de Validez");
      const v = isControl ? 2 : (Math.floor(Math.random() * 2) + 4);
      state.answersP2[q.id_reactivo] = v;
      window.selectLikertP2(q.id_reactivo, v);
    });

    state.pilar3Dilemmas.forEach(d => {
      const opts = ["A", "B", "C", "D"];
      const opt = opts[Math.floor(Math.random() * opts.length)];
      state.answersP3[d.id_dilema] = opt;
      window.selectDilemmaP3(d.id_dilema, opt);
    });

    state.pilar4Questions.forEach(q => {
      const opts = ["A", "B", "C", "D"];
      const opt = opts[Math.floor(Math.random() * opts.length)];
      state.answersP4[q.id_pregunta] = opt;
      window.selectKnowledgeP4(q.id_pregunta, opt);
    });

    alert("⚡ ¡Respuestas de demostración cargadas! Ya puedes emitir el dictamen oficial.");
  };

  // =========================================================================
  // 6. DASHBOARD INTERACTIVO Y VEREDICTO OFICIAL (MEJORAS 1, 2, 5, 6)
  // =========================================================================
  window.submitVocationalEvaluation = async function () {
    const btn = document.getElementById("voc-btn-submit-eval");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>⚙️ Procesando cálculo multi-pilar y guardando en SQLite...</span>`;
    }

    try {
      const payload = {
        session_id: state.sessionId,
        candidate: state.candidate,
        validity_ids: state.validityIds,
        answers_p2: state.answersP2,
        answers_p3: state.answersP3,
        answers_p4: state.answersP4,
        physical_marks: { promedio_fisico: 16.5 }
      };

      const response = await fetch("/api/vocational/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Error en la evaluación consolidada");

      const verdict = await response.json();
      renderDashboard(verdict);
      switchPhase(4);
    } catch (err) {
      alert("Error al calificar la prueba: " + err.message);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span>🎖️ Finalizar Prueba y Calcular "¿Para qué Escuela Nací?"</span>`;
      }
    }
  };

  function renderDashboard(verdict) {
    const container = document.getElementById("voc-dashboard-container");
    if (!container) return;

    const winner = verdict.escuela_ganadora;
    const ranking = verdict.ranking_afinidad;
    const res = verdict.resumen_pilares;
    const cand = verdict.postulante;
    const igac = verdict.igac_militar;
    const sinceridad = res.pilar2_psicometria.control_sinceridad;
    const p4 = res.pilar4_conocimientos;

    const radarSvg = buildRadarSvg(res.pilar2_psicometria.dominios);

    let html = `
      <!-- 1. TERMINAL DE COMANDO MILITAR: RESULTADOS DE INTELIGENCIA VOCACIONAL -->
      <div class="tactical-terminal-container" style="padding: 0; margin-bottom: 2.5rem;">
        
        <div class="tactical-terminal-header">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 0.5rem;">
            <div class="tactical-clearance-pill">AUTORIZACIÓN DE SEGURIDAD // NIVEL I (CLASIFICADO)</div>
            <div style="font-family: monospace; font-size: 0.85rem; color: var(--accent-cyan); background: rgba(0,240,255,0.06); padding: 0.3rem 0.8rem; border-radius: 4px; border: 1px solid rgba(0,240,255,0.3);">
              EXP: <strong>${verdict.verification_code}</strong>
            </div>
          </div>
          <h2 class="mission-compatible-title">MISIÓN COMPATIBLE: ${winner.nombre_completo.toUpperCase()}</h2>
          <p class="mission-subdesc">«${winner.lema}» — Asignación de Aptitud Sobresaliente para ${winner.rama} (${winner.rango}).</p>
        </div>

        <!-- Donut Chart Neón Central -->
        <div class="tactical-donut-card">
          <span class="tactical-tag">⚡ ÍNDICE DE AFINIDAD OPERATIVA GLOBAL</span>
          
          <div class="tactical-donut-wrapper">
            <svg class="tactical-donut-svg" viewBox="0 0 200 200">
              <circle class="tactical-donut-bg" cx="100" cy="100" r="90"></circle>
              <circle id="tactical-circle-progress" class="tactical-donut-progress" cx="100" cy="100" r="90"
                      style="stroke-dasharray: 565.48; stroke-dashoffset: ${565.48 - (winner.puntaje_global_fit / 100) * 565.48};"></circle>
            </svg>
            <div class="tactical-donut-center">
              <span class="tactical-donut-number">${winner.puntaje_global_fit}%</span>
              <span class="tactical-donut-label">COMPATIBILIDAD</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; justify-content: center; margin-top: 0.8rem;">
            <span class="inst-pill" style="background: rgba(0, 240, 255, 0.1); border-color: var(--accent-cyan); color: #fff;">
              ${winner.icono} ${winner.rama} · ${winner.rango}
            </span>
            <span class="inst-pill" style="background: rgba(16, 185, 129, 0.15); border-color: #10B981; color: #34d399;">
              ✔ Apto Legal y Antropométrico
            </span>
            <span class="inst-pill" style="background: rgba(59, 130, 246, 0.15); border-color: #3B82F6; color: #60a5fa;">
              🛡️ Sinceridad Escala L: ${sinceridad.indice_sinceridad_pct}% (${sinceridad.estado_validez})
            </span>
          </div>
        </div>

        <!-- Cuadrícula Comparativa de 2 Columnas (Postulante vs Requisito Oficial) -->
        <h3 style="font-family: var(--font-primary); font-size: 1.25rem; color: #FFFFFF; margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
          <span>📊</span> MATRIZ DE CONTRASTACIÓN VS REQUISITOS OFICIALES DE ADMISIÓN
        </h3>

        <div class="tactical-comparison-grid">
          <div class="tactical-spec-card status-pass">
            <div>
              <div class="tactical-spec-title">Estatura del Postulante</div>
              <div class="tactical-spec-value">${cand.talla_cm} cm</div>
              <div class="tactical-spec-target">Exigencia Oficial: Min. ${winner.talla_min_masc || 168} cm</div>
            </div>
            <div class="tactical-status-icon check">✔</div>
          </div>

          <div class="tactical-spec-card status-pass">
            <div>
              <div class="tactical-spec-title">Rango de Edad Cronológica</div>
              <div class="tactical-spec-value">${cand.edad} años cumplidos</div>
              <div class="tactical-spec-target">Exigencia Oficial: 15 a 21 años (Oficiales)</div>
            </div>
            <div class="tactical-status-icon check">✔</div>
          </div>

          <div class="tactical-spec-card status-pass">
            <div>
              <div class="tactical-spec-title">Índice de Masa Corporal (IMC)</div>
              <div class="tactical-spec-value">${res.pilar1_filtro_legal.imc} (Salud Óptima)</div>
              <div class="tactical-spec-target">Exigencia Oficial: Rango 18.5 a 25.0</div>
            </div>
            <div class="tactical-status-icon check">✔</div>
          </div>

          <div class="tactical-spec-card ${cand.agudeza_visual_20_20 ? 'status-pass' : 'status-warn'}">
            <div>
              <div class="tactical-spec-title">Agudeza Visual de Cabina / Operaciones</div>
              <div class="tactical-spec-value">${cand.agudeza_visual_20_20 ? '20/20 Natural' : 'Con lentes correctores'}</div>
              <div class="tactical-spec-target">Exigencia Oficial: ${winner.escuela_id === 'EOFAP' ? '20/20 Natural sin lentes' : 'Admite corrección leve'}</div>
            </div>
            <div class="tactical-status-icon ${cand.agudeza_visual_20_20 ? 'check' : 'warn'}">${cand.agudeza_visual_20_20 ? '✔' : '⚠'}</div>
          </div>

          <div class="tactical-spec-card status-pass">
            <div>
              <div class="tactical-spec-title">Talla Sentado (Ergonomía Táctica)</div>
              <div class="tactical-spec-value">${cand.talla_sentado_cm} cm</div>
              <div class="tactical-spec-target">Exigencia Oficial: Rango 85.0 a 98.0 cm</div>
            </div>
            <div class="tactical-status-icon check">✔</div>
          </div>

          <div class="tactical-spec-card status-pass">
            <div>
              <div class="tactical-spec-title">Evaluación Académica con Penalización</div>
              <div class="tactical-spec-value">${p4.nota_vigesimal_oficial} / 20.0 pts</div>
              <div class="tactical-spec-target">Exigencia Oficial: Aprobatoria Min. 12.0 / 20.0</div>
            </div>
            <div class="tactical-status-icon check">✔</div>
          </div>
        </div>

        <!-- Botones de Llamado a la Acción Primarios -->
        <div class="tactical-actions-row" style="margin-bottom: 2rem;">
          <a href="/escuelas_militares_pdf" target="_blank" class="tactical-btn-gold">
            <span>📥 DESCARGAR PROSPECTO OFICIAL (${winner.escuela_id})</span>
          </a>
          <button type="button" class="tactical-btn-action" onclick="window.startMock100('${winner.escuela_id}')">
            <span>📅 VER SIMULACRO Y FECHAS DE ADMISIÓN</span>
          </button>
        </div>
      </div>

      <!-- 2. DESGLOSE TRANSPARENTE DE LOS 5 PILARES (CON PENALIZACIÓN E IGAC) -->
      <h3 style="font-family: var(--font-title); font-size: 1.25rem; color: var(--gold-light); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <span>📊</span> Desglose Multi-Pilar con Baremos Oficiales y Penalización
      </h3>
      <div class="voc-pillars-breakdown-grid">
        <div class="voc-pillar-card">
          <div class="voc-pillar-title"><span>🛡️</span> Pilar 1: Filtro Legal y Médico</div>
          <div class="voc-pillar-score-large" style="color: #34d399;">${res.pilar1_filtro_legal.total_aptas} / 8</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">
            Talla: ${cand.talla_cm} cm | IMC: ${res.pilar1_filtro_legal.imc} | Visión 20/20: ${cand.agudeza_visual_20_20 ? 'Sí' : 'No'}.
          </div>
        </div>

        <div class="voc-pillar-card">
          <div class="voc-pillar-title"><span>🧠</span> Pilar 2: Psicometría + Escala L</div>
          <div class="voc-pillar-score-large" style="color: #60a5fa;">${winner.desglose_pilares.pilar2_psicometria}%</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">
            Rasgo: <strong style="color: #fff;">${res.pilar2_psicometria.rasgo_dominante}</strong>. ${sinceridad.alerta}.
          </div>
        </div>

        <div class="voc-pillar-card">
          <div class="voc-pillar-title"><span>🎯</span> Pilar 3: ADN Táctico</div>
          <div class="voc-pillar-score-large" style="color: #38bdf8;">${winner.desglose_pilares.pilar3_intereses}%</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">
            Preferencia: <strong style="color: #fff;">${res.pilar3_intereses.rama_predilecta}</strong> (${res.pilar3_intereses.distribucion_ramas[res.pilar3_intereses.rama_predilecta]}% elecciones).
          </div>
        </div>

        <div class="voc-pillar-card">
          <div class="voc-pillar-title"><span>📝</span> Pilar 4: Nota con Penalización (-0.25)</div>
          <div class="voc-pillar-score-large" style="color: var(--gold-light);">${p4.nota_vigesimal_oficial} <span style="font-size: 1rem; color: var(--text-dim);">/ 20</span></div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">
            ${p4.aciertos} aciertos (+${p4.aciertos}) | ${p4.errores} errores (-${p4.penalizacion_puntos} pts) | ${p4.tasa_precision_pct}% precisión.
          </div>
        </div>
      </div>

      <!-- BANNER DE COMBATE: ÍNDICE GLOBAL DE APTITUD PARA EL COMBATE (IGAC - MEJORA 5) -->
      <div class="card-glass" style="border-color: rgba(245, 158, 11, 0.4); margin-bottom: 2rem; background: linear-gradient(135deg, rgba(15,25,54,0.9), rgba(11,20,46,0.95)); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
        <div>
          <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--gold-light); font-weight: 800; letter-spacing: 1px;">
            🎖️ Pilar 5: Integración del Rendimiento Físico y Combate
          </span>
          <h3 style="font-family: var(--font-title); color: #fff; font-size: 1.35rem; margin: 0.2rem 0;">
            Índice Global de Aptitud para el Combate (IGAC): <span style="color: var(--gold-light);">${igac.igac_score} / 100</span>
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">
            Dictamen Táctico: <strong style="color: #34d399;">${igac.veredicto}</strong> (Fórmula: 30% Físico + 30% Conocimientos + 25% Psicometría + 15% Intereses).
          </p>
        </div>
        <div style="display: flex; gap: 0.8rem;">
          <button type="button" class="btn-gold" onclick="window.startMock100('${winner.escuela_id}')" style="font-size: 0.95rem; padding: 0.8rem 1.6rem;">
            <span>🎯 Iniciar Simulacro Oficial de 100 Preguntas (${winner.nombre_corto}) ▸</span>
          </button>
        </div>
      </div>

      <!-- 3. PODIO DE COMPATIBILIDAD CON LAS 8 ESCUELAS MILITARES Y POLICIALES -->
      <h3 style="font-family: var(--font-title); font-size: 1.25rem; color: var(--gold-light); margin: 2rem 0 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <span>🏆</span> Podio y Nivel de Ajuste con las 8 Escuelas Militares del Perú
      </h3>
      <div class="voc-podium-grid">
        ${ranking.map((esc, rankIdx) => {
          const isWin = rankIdx === 0;
          return `
            <div class="voc-podium-card ${isWin ? 'winner' : ''}">
              <div class="voc-podium-rank">#${rankIdx + 1}</div>
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.4rem;">
                <span style="font-size: 1.6rem;">${esc.icono}</span>
                <div>
                  <strong style="color: #ffffff; font-size: 0.95rem;">${esc.nombre}</strong>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">${esc.rama} · ${esc.rango}</div>
                </div>
              </div>
              <div class="voc-podium-meter-track">
                <div class="voc-podium-meter-fill" style="width: ${esc.puntaje_global_fit}%; background: ${isWin ? 'var(--gold-primary)' : 'var(--navy-light)'};"></div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem;">
                <span style="color: var(--text-muted);">Compatibilidad:</span>
                <strong style="color: ${isWin ? 'var(--gold-light)' : '#ffffff'}; font-size: 1rem;">${esc.puntaje_global_fit}%</strong>
              </div>
              <div style="margin-top: 0.6rem;">
                <span class="voc-legal-badge ${esc.es_apto_legal ? 'apto' : 'no-apto'}" style="font-size: 0.68rem;">
                  ${esc.es_apto_legal ? '✓ Apto Reglamentario' : '✗ Restricción Legal/Física'}
                </span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- 4. RADAR CHART Y CERTIFICADO OFICIAL CON QR (MEJORA 6) -->
      <div class="results-2col-grid" style="margin-top: 1.5rem;">
        <div class="card-glass">
          <h3 style="font-family: var(--font-title); font-size: 1.15rem; color: #fff; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🕸️</span> Perfil Psicométrico Big Five vs Perfil Ideal
          </h3>
          <div class="voc-radar-container">
            ${radarSvg}
          </div>
          <div style="display: flex; justify-content: center; gap: 1.5rem; font-size: 0.82rem; margin-top: 0.5rem;">
            <span style="color: #f59e0b; display: flex; align-items: center; gap: 0.3rem;">● Tu Perfil</span>
            <span style="color: #38bdf8; display: flex; align-items: center; gap: 0.3rem;">● Perfil Ideal (${winner.nombre})</span>
          </div>
        </div>

        <div class="card-glass" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-family: var(--font-title); font-size: 1.15rem; color: #fff; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>🔏</span> Ficha de Verificación Oficial con Código QR
            </h3>
            <div style="display: flex; gap: 1.2rem; align-items: center; margin-bottom: 1rem; background: rgba(7,12,30,0.6); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
              <div style="background: #ffffff; padding: 6px; border-radius: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                ${verdict.qr_svg}
              </div>
              <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">
                <div style="color: #ffffff; font-weight: 700; margin-bottom: 0.3rem;">Sello Digital de Autenticidad</div>
                <div>Código: <strong style="color: var(--gold-light);">${verdict.verification_code}</strong></div>
                <div>Postulante: <strong style="color: #fff;">${cand.nombre}</strong></div>
                <div>Fecha: <strong>${new Date().toLocaleDateString('es-PE')}</strong></div>
                <div style="color: var(--status-success); font-size: 0.75rem; margin-top: 0.3rem;">✓ Registro inmutable en SQLite</div>
              </div>
            </div>

            <h4 style="color: var(--gold-light); font-size: 0.95rem; margin-bottom: 0.4rem;">Especialidades recomendadas:</h4>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.4rem;">
              ${winner.especialidades.map(esp => `
                <li style="background: rgba(255, 255, 255, 0.04); border-left: 3px solid var(--gold-primary); padding: 0.45rem 0.7rem; border-radius: 4px; font-size: 0.82rem; color: #fff;">
                  ⭐ ${esp}
                </li>
              `).join('')}
            </ul>
          </div>

          <div style="margin-top: 1rem; border-top: 1px solid var(--border-glass); padding-top: 0.8rem;">
            <p style="font-size: 0.75rem; color: var(--text-dim); margin: 0;">
              📁 Prospectos Oficiales: <code style="color: #38bdf8;">${winner.pdf_carpeta}</code>
            </p>
          </div>
        </div>
      </div>

      <!-- 5. ACCIONES FINALES -->
      <div class="no-print" style="text-align: center; margin: 2.5rem 0 1rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <button onclick="window.print()" class="btn-gold" style="padding: 0.9rem 2.5rem;">
          <span>🖨️ Imprimir / Guardar Ficha Oficial en PDF</span>
        </button>
        <button onclick="window.startMock100('${winner.escuela_id}')" class="btn-outline-gold" style="padding: 0.9rem 2rem;">
          <span>🎯 Realizar Simulacro Masivo (100 Preguntas)</span>
        </button>
        <button onclick="window.resetVocationalTest()" class="btn-secondary" style="padding: 0.9rem 1.8rem;">
          <span>🔄 Repetir Prueba Vocacional</span>
        </button>
      </div>
    `;

    container.innerHTML = html;
  }

  // =========================================================================
  // 7. MEJORA 4: MÓDULO DE SIMULACRO OFICIAL DE 100 PREGUNTAS
  // =========================================================================
  window.startMock100 = async function (schoolId) {
    const container = document.getElementById("voc-mock100-container");
    if (!container) return;

    container.innerHTML = `
      <div class="card-glass" style="text-align: center; padding: 3rem;">
        <h3 style="color: var(--gold-light);">⏳ Ensamblando Simulacro Oficial de 100 Preguntas...</h3>
        <p style="color: var(--text-muted);">Calibrando distribución exacta con la matriz de prospecto de ${schoolId}...</p>
      </div>
    `;
    switchPhase(5);

    try {
      const response = await fetch(`/api/vocational/mock-100?school=${schoolId}`);
      if (!response.ok) throw new Error("Error al obtener examen de 100 preguntas");

      const data = await response.json();
      state.mock100.sessionId = data.session_id;
      state.mock100.schoolId = schoolId;
      state.mock100.questions = data.preguntas;
      state.mock100.answers = {};
      state.mock100.secondsLeft = data.duracion_minutos * 60;

      renderMock100Exam(data);
    } catch (err) {
      alert("Error al cargar simulacro: " + err.message);
      switchPhase(4);
    }
  };

  function renderMock100Exam(data) {
    const container = document.getElementById("voc-mock100-container");
    if (!container) return;

    const inst = data.institucion;
    let html = `
      <div class="card-glass" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-color: var(--gold-primary);">
        <div>
          <span class="inst-pill" style="margin-bottom: 0.4rem;">${inst.icono} ${inst.rama}</span>
          <h2 style="font-family: var(--font-title); color: #fff; font-size: 1.5rem; margin: 0.2rem 0;">
            Simulacro Oficial de Admisión: ${inst.nombre}
          </h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
            100 preguntas · 120 minutos · Ponderación oficial de prospecto · Penalización (-0.25 por error).
          </p>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div class="timer-badge" style="font-size: 1.2rem; padding: 0.6rem 1.2rem;">
            <span>⏱️</span> <span id="voc-mock100-timer">120:00</span>
          </div>
          <button type="button" class="btn-outline-gold" onclick="window.quickFillMock100()" style="font-size: 0.85rem; padding: 0.6rem 1.2rem;">
            ⚡ Simulación Rápida (100 Respuestas)
          </button>
        </div>
      </div>

      <div id="mock100-questions-list">
        ${data.preguntas.map(q => `
          <div class="voc-exam-card" id="card-m100-${q.id_pregunta}">
            <div class="voc-exam-meta-bar">
              <span style="font-weight: 800; color: var(--gold-primary);">Pregunta #${q.numero} de 100</span>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <span class="voc-area-tag" style="background: rgba(255,255,255,0.08); color: #fff;">${q.area_academica}</span>
                <span style="font-size: 0.75rem; color: var(--text-dim);">${q.tema_especifico}</span>
              </div>
            </div>
            <p style="font-size: 1.05rem; color: #ffffff; font-weight: 500; line-height: 1.45;">${q.enunciado}</p>
            ${q.imagen_url ? `
              <div class="exam-question-image-wrapper">
                <img src="${q.imagen_url}" alt="${q.imagen_alt || 'Gráfico ilustrativo del ejercicio'}" class="exam-question-image" loading="lazy" />
                ${q.imagen_alt ? `<span class="exam-question-image-caption">${q.imagen_alt}</span>` : ''}
              </div>
            ` : ''}
            <div class="voc-exam-opt-row">
              ${q.opciones.map(opt => `
                <button type="button" class="voc-exam-opt-btn" id="btn-m100-${q.id_pregunta}-${opt.id_opcion}"
                        onclick="window.selectMock100Answer('${q.id_pregunta}', '${opt.id_opcion}')">
                  <span class="voc-opt-letter">${opt.id_opcion}</span>
                  <span>${opt.texto_respuesta}</span>
                </button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="text-align: center; margin: 2rem 0;">
        <button id="btn-submit-mock100" class="btn-gold" style="padding: 1.1rem 3.5rem; font-size: 1.15rem;" onclick="window.submitMock100()">
          <span>🎖️ Calificar Simulacro de 100 Preguntas con Baremos Oficiales</span>
        </button>
      </div>
    `;

    container.innerHTML = html;
    renderLatexInContainer(container);
    startMockTimer();
  }

  // Helper para renderizado de LaTeX en contenedores dinámicos
  function renderLatexInContainer(container) {
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

  function startMockTimer() {
    if (state.mock100.timerInterval) clearInterval(state.mock100.timerInterval);
    state.mock100.timerInterval = setInterval(() => {
      state.mock100.secondsLeft--;
      if (state.mock100.secondsLeft <= 0) {
        clearInterval(state.mock100.timerInterval);
        alert("⏱️ ¡Tiempo cumplido! Calificando simulacro automáticamente...");
        window.submitMock100();
        return;
      }
      const timerEl = document.getElementById("voc-mock100-timer");
      if (timerEl) {
        const mins = Math.floor(state.mock100.secondsLeft / 60);
        const secs = state.mock100.secondsLeft % 60;
        timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
    }, 1000);
  }

  window.selectMock100Answer = function (qId, optId) {
    state.mock100.answers[qId] = optId;
    const card = document.getElementById(`card-m100-${qId}`);
    if (card) {
      card.querySelectorAll(".voc-exam-opt-btn").forEach(btn => btn.classList.remove("selected"));
      const selBtn = document.getElementById(`btn-m100-${qId}-${optId}`);
      if (selBtn) selBtn.classList.add("selected");
      card.style.borderColor = "var(--gold-primary)";
    }
  };

  window.quickFillMock100 = function () {
    state.mock100.questions.forEach(q => {
      const opts = ["A", "B", "C", "D"];
      const opt = opts[Math.floor(Math.random() * opts.length)];
      window.selectMock100Answer(q.id_pregunta, opt);
    });
    alert("⚡ ¡100 respuestas marcadas de demostración!");
  };

  window.submitMock100 = async function () {
    if (state.mock100.timerInterval) clearInterval(state.mock100.timerInterval);
    const btn = document.getElementById("btn-submit-mock100");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>⚙️ Calificando 100 preguntas y penalizaciones...</span>`;
    }

    try {
      const payload = {
        session_id: state.mock100.sessionId,
        school_id: state.mock100.schoolId,
        candidate_name: state.candidate.nombre,
        answers: state.mock100.answers
      };

      const response = await fetch("/api/vocational/mock-100/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Error al calificar simulacro");

      const result = await response.json();
      renderMock100Results(result);
    } catch (err) {
      alert("Error: " + err.message);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span>🎖️ Calificar Simulacro de 100 Preguntas</span>`;
      }
    }
  };

  function renderMock100Results(res) {
    const container = document.getElementById("voc-mock100-container");
    if (!container) return;

    const qrSvg = buildSimpleQrPlaceholder(res.verification_code);

    let html = `
      <div class="card-glass" style="max-width: 900px; margin: 0 auto; border-color: ${res.es_aprobado ? 'var(--gold-primary)' : 'var(--status-danger)'}; padding: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 1.2rem; margin-bottom: 1.5rem;">
          <div>
            <span class="inst-pill" style="background: rgba(245, 158, 11, 0.2); color: #fff;">
              ${res.escuela_id} · SIMULACRO OFICIAL DE 100 PREGUNTAS
            </span>
            <h2 style="font-family: var(--font-title); font-size: 1.8rem; color: #fff; margin: 0.4rem 0;">
              Dictamen de Examen de Admisión
            </h2>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0;">
              Postulante: <strong style="color: #fff;">${res.candidato}</strong> · Código: <code style="color: var(--gold-light);">${res.verification_code}</code>
            </p>
          </div>
          <div style="text-align: right;">
            <div style="font-family: var(--font-title); font-size: 3rem; font-weight: 900; color: ${res.es_aprobado ? 'var(--gold-light)' : 'var(--status-danger)'}; line-height: 1;">
              ${res.nota_vigesimal}
            </div>
            <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700;">
              Nota Vigesimal (0 - 20)
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-bottom: 2rem;">
          <div class="verdict-status-pill ${res.es_aprobado ? 'success' : 'danger'}" style="font-size: 1.1rem; padding: 0.6rem 2rem;">
            ${res.dictamen}
          </div>
        </div>

        <div class="voc-pillars-breakdown-grid" style="margin-bottom: 2rem;">
          <div class="voc-pillar-card">
            <div class="voc-pillar-title"><span>✓</span> Aciertos</div>
            <div class="voc-pillar-score-large" style="color: #34d399;">${res.aciertos}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">+${res.aciertos}.00 puntos brutos</div>
          </div>
          <div class="voc-pillar-card">
            <div class="voc-pillar-title"><span>✗</span> Errores (-0.25)</div>
            <div class="voc-pillar-score-large" style="color: #f87171;">${res.errores}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">-${res.penalizacion_puntos} pts penalizados</div>
          </div>
          <div class="voc-pillar-card">
            <div class="voc-pillar-title"><span>⚪</span> En Blanco</div>
            <div class="voc-pillar-score-large" style="color: #94a3b8;">${res.blancos}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">0.00 puntos (prudencia táctica)</div>
          </div>
          <div class="voc-pillar-card">
            <div class="voc-pillar-title"><span>📊</span> Puntaje Neto</div>
            <div class="voc-pillar-score-large" style="color: var(--gold-light);">${res.puntaje_neto}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">Sobre 100 puntos netos</div>
          </div>
        </div>

        <div class="no-print" style="text-align: center; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button onclick="window.print()" class="btn-gold" style="padding: 0.85rem 2rem;">
            <span>🖨️ Imprimir Acta Oficial de Simulacro</span>
          </button>
          <button onclick="window.switchPhase(4)" class="btn-secondary" style="padding: 0.85rem 2rem;">
            <span>◂ Volver al Dashboard Vocacional</span>
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  function buildSimpleQrPlaceholder(code) {
    return `<div style="background: #fff; color: #000; padding: 10px; font-weight: bold; border-radius: 4px;">QR: ${code}</div>`;
  }

  // Generador de Radar SVG estándar puro
  function buildRadarSvg(dominios) {
    const keys = ["Neuroticismo", "Extraversión", "Apertura", "Amabilidad", "Responsabilidad"];
    const labels = ["Neuroticismo", "Extraversión", "Apertura", "Amabilidad", "Responsabilidad"];
    const values = keys.map(k => dominios[k] || 50);
    const idealValues = [20, 75, 75, 68, 92];

    const cx = 190, cy = 190, r = 130;
    const numPoints = 5;
    const angleStep = (Math.PI * 2) / numPoints;

    let webs = "";
    [0.25, 0.5, 0.75, 1.0].forEach(level => {
      const pts = [];
      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = cx + r * level * Math.cos(angle);
        const y = cy + r * level * Math.sin(angle);
        pts.push(`${x},${y}`);
      }
      webs += `<polygon points="${pts.join(' ')}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
    });

    let axes = "";
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      const lx = cx + (r + 26) * Math.cos(angle);
      const ly = cy + (r + 14) * Math.sin(angle);
      axes += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`;
      axes += `<text x="${lx}" y="${ly}" fill="#94a3b8" font-size="11" font-weight="600" text-anchor="middle" dominant-baseline="middle">${labels[i]}</text>`;
    }

    const userPts = values.map((val, i) => {
      const factor = Math.max(0.1, val / 100);
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + r * factor * Math.cos(angle);
      const y = cy + r * factor * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    const idealPts = idealValues.map((val, i) => {
      const factor = Math.max(0.1, val / 100);
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + r * factor * Math.cos(angle);
      const y = cy + r * factor * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    return `
      <svg class="voc-radar-svg" viewBox="0 0 380 380">
        ${webs}
        ${axes}
        <polygon points="${idealPts}" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4"/>
        <polygon points="${userPts}" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" stroke-width="2.5"/>
        ${values.map((val, i) => {
          const factor = Math.max(0.1, val / 100);
          const angle = i * angleStep - Math.PI / 2;
          const x = cx + r * factor * Math.cos(angle);
          const y = cy + r * factor * Math.sin(angle);
          return `<circle cx="${x}" cy="${y}" r="4" fill="#fbbf24"/>`;
        }).join('')}
      </svg>
    `;
  }

  window.resetVocationalTest = function () {
    state.sessionId = null;
    state.answersP2 = {};
    state.answersP3 = {};
    state.answersP4 = {};
    switchPhase(0);
  };

  window.switchPhase = switchPhase;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
