import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import { useKnowledgeTest } from '../../../hooks/useKnowledgeTest';
import EnunciadoMatematico from '../../common/EnunciadoMatematico';
import TopoProgressBar from '../../common/TopoProgressBar';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  BarChart3,
  Flame,
  Shield,
  HelpCircle,
  Play
} from 'lucide-react';

const MILITARY_SCHOOLS = [
  {
    id: 'EOFAP',
    sigla: 'EOFAP',
    name: 'Escuela de Oficiales de la Fuerza Aérea del Perú',
    rama: 'Fuerza Aérea',
    rango: 'Oficial',
    icono: '✈️',
    descripcion: 'Balotario oficial para futuros pilotos de caza, transporte, helicópteros y defensa aérea.'
  },
  {
    id: 'EMCH',
    sigla: 'EMCH',
    name: 'Escuela Militar de Chorrillos',
    rama: 'Ejército del Perú',
    rango: 'Oficial',
    icono: '⚔️',
    descripcion: 'Alma mater del Ejército. Ciencias militares, infantería, blindados e ingeniería de combate.'
  },
  {
    id: 'ENP',
    sigla: 'ENP',
    name: 'Escuela Naval del Perú',
    rama: 'Marina de Guerra',
    rango: 'Oficial',
    icono: '⚓',
    descripcion: 'Formación náutica, comando naval, ingeniería de propulsión y operaciones en altamar.'
  },
  {
    id: 'CITEN',
    sigla: 'CITEN',
    name: 'Instituto Tecnológico Naval',
    rama: 'Marina de Guerra',
    rango: 'Suboficial',
    icono: '🚢',
    descripcion: 'Carreras técnicas navales: sistemas de control, electrónica, armamento y maquinaria marina.'
  },
  {
    id: 'ESOFA',
    sigla: 'ESOFA',
    name: 'Escuela de Suboficiales de la FAP',
    rama: 'Fuerza Aérea',
    rango: 'Suboficial',
    icono: '🚀',
    descripcion: 'Mantenimiento de aeronaves de combate, aviónica, radares y telemetría espacial.'
  },
  {
    id: 'ETE',
    sigla: 'ETE',
    name: 'Escuela Técnica del Ejército',
    rama: 'Ejército del Perú',
    rango: 'Suboficial',
    icono: '🛡️',
    descripcion: 'Suboficiales técnicos de armamento, telecomunicaciones tácticas y mecatrónica.'
  },
  {
    id: 'EO_PNP',
    sigla: 'EO-PNP',
    name: 'Escuela de Oficiales PNP',
    rama: 'Policía Nacional',
    rango: 'Oficial',
    icono: '👮',
    descripcion: 'Liderazgo policial, investigación criminalística, orden público y seguridad ciudadana.'
  },
  {
    id: 'EESTP_PNP',
    sigla: 'EESTP-PNP',
    name: 'Escuela Técnico Superior PNP',
    rama: 'Policía Nacional',
    rango: 'Suboficial',
    icono: '🚓',
    descripcion: 'Suboficiales de intervención táctica, tránsito, patrullaje y rescate de emergencia.'
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Pillar4Knowledge() {
  const { nextPillar, prevPillar, answerKnowledgeQuestion } = useAssessmentStore();
  
  // Regla 1: Estado de Examen Iniciado
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState('EOFAP');
  const [slideDirection, setSlideDirection] = useState(1);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const {
    isLoading,
    error,
    questions,
    totalQuestions,
    currentIndex,
    currentQuestion,
    answers,
    currentAnswer,
    isCompleted,
    timeRemaining,
    score,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    restartTest,
    changeSchool,
  } = useKnowledgeTest(selectedSchool);

  // Iniciar Examen para una Escuela Matriz
  const handleStartTest = (schoolId) => {
    setSelectedSchool(schoolId);
    changeSchool(schoolId);
    restartTest();
    setIsTestStarted(true);
  };

  // Abandonar o Cambiar Escuela (regresa a la vista Pre-Test)
  const handleExitTest = () => {
    setIsTestStarted(false);
    restartTest();
  };

  // Registrar respuesta con auto-avance táctico
  const handleAnswerClick = (optionId) => {
    if (isAdvancing || isCompleted) return;
    selectAnswer(optionId);
    if (currentQuestion && answerKnowledgeQuestion) {
      answerKnowledgeQuestion(currentQuestion.id_pregunta, optionId);
    }
    setIsAdvancing(true);
    setTimeout(() => {
      setSlideDirection(1);
      nextQuestion();
      setIsAdvancing(false);
    }, 350);
  };

  const handleNext = () => {
    if (isAdvancing) return;
    setSlideDirection(1);
    nextQuestion();
  };

  const handlePrev = () => {
    if (isAdvancing) return;
    setSlideDirection(-1);
    prevQuestion();
  };

  // Datos de la escuela actualmente activa
  const activeSchoolMeta = MILITARY_SCHOOLS.find(s => s.id === selectedSchool) || MILITARY_SCHOOLS[0];

  // Cálculo del Temporizador
  const timerPercentage = Math.max(0, Math.min(100, (timeRemaining / 72) * 100));
  let timerTheme = {
    color: 'text-neon-cyan',
    border: 'border-neon-cyan/40',
    bg: 'bg-cyan-950/40',
    glow: 'shadow-cyan-glow-sm',
    barColor: 'bg-neon-cyan',
  };

  if (timeRemaining <= 12) {
    timerTheme = {
      color: 'text-alert-red animate-pulse',
      border: 'border-alert-red/70',
      bg: 'bg-red-950/60',
      glow: 'shadow-red-glow',
      barColor: 'bg-alert-red animate-pulse',
    };
  } else if (timeRemaining <= 25) {
    timerTheme = {
      color: 'text-alert-amber',
      border: 'border-alert-amber/50',
      bg: 'bg-amber-950/40',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
      barColor: 'bg-alert-amber',
    };
  }

  // =========================================================================
  // ESTADO DE CARGA
  // =========================================================================
  if (isLoading && isTestStarted) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#141518] p-10 rounded-2xl border border-gray-700 shadow-2xl">
          <div className="w-12 h-12 rounded-full border-4 border-neon-cyan border-t-transparent animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-military font-bold text-white uppercase tracking-wider">
            DESPLEGANDO BALOTARIO MILITAR...
          </h3>
          <p className="text-xs text-gray-300 font-inter mt-2">
            Distribuyendo 20 reactivos académicos equitativos para <strong className="text-white">{activeSchoolMeta.sigla}</strong>.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // ESTADO DE ERROR
  // =========================================================================
  if (error && isTestStarted) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#141518] p-8 rounded-2xl border border-alert-red shadow-2xl">
          <AlertTriangle className="w-10 h-10 text-alert-red mx-auto mb-3" />
          <h3 className="text-lg font-rajdhani font-bold text-white uppercase">Error al Cargar Preguntas</h3>
          <p className="text-xs text-gray-300 my-2">{error}</p>
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={handleExitTest}
              className="px-5 py-2 rounded-xl border border-gray-600 text-gray-300 hover:text-white font-rajdhani font-bold text-xs uppercase"
            >
              Volver al Catálogo
            </button>
            <button
              onClick={restartTest}
              className="px-5 py-2 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-bold text-xs uppercase"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 1. VISTA PRE-TEST (!isTestStarted): CATÁLOGO TÁCTICO DE LAS 8 ESCUELAS
  // =========================================================================
  if (!isTestStarted) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        
        {/* Cabecera Táctica del Pre-Test */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-peru-red/10 border border-peru-red/30 text-peru-red text-xs font-teko font-bold uppercase tracking-widest mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>PILAR 4 // PROTOCOLO DE CONOCIMIENTOS ACADÉMICOS</span>
          </div>

          <h1 className="font-military text-2xl sm:text-4xl text-white uppercase tracking-wide">
            SELECCIONA TU ESCUELA MATRIZ OBJETIVO
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 font-inter mt-2 leading-relaxed">
            Cada institución evalúa con su propio balotario reglamentario 2026/2027. El simulador extraerá 
            <strong className="text-white font-semibold"> 20 preguntas equitativas</strong> con un temporizador de 
            <strong className="text-white font-semibold"> 72 segundos por reactivo</strong>. 
            Aciertos: <span className="text-emerald-400 font-bold">+20 pts</span> | Errores: <span className="text-alert-red font-bold">-1.25 pts</span>.
          </p>
        </div>

        {/* Cuadrícula Limpia de las 8 Escuelas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MILITARY_SCHOOLS.map((esc) => {
            const isOficial = esc.rango.toUpperCase() === 'OFICIAL';
            return (
              <div
                key={esc.id}
                onClick={() => handleStartTest(esc.id)}
                className="group relative bg-[#141518]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-5 cursor-pointer hover:border-[#00F0FF]/50 hover:bg-[#1A1C23] transition-colors duration-300 flex flex-col justify-between select-none"
              >
                <div>
                  {/* Header de la Tarjeta */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl select-none">{esc.icono}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-rajdhani font-bold uppercase tracking-wider border ${
                      isOficial
                        ? "bg-blue-900/30 text-blue-400 border-blue-800"
                        : "bg-teal-900/30 text-teal-400 border-teal-800"
                    }`}>
                      {esc.rango}
                    </span>
                  </div>

                  {/* Títulos de Escuelas (Ej. "EMCH", "EOFAP"): text-white font-bold text-xl */}
                  <h3 className="text-white font-bold text-xl font-military tracking-wide group-hover:text-[#00F0FF] transition-colors">
                    {esc.sigla}
                  </h3>
                  <h4 className="font-rajdhani text-xs text-yellow-400 font-bold uppercase tracking-wider mt-0.5">
                    {esc.rama}
                  </h4>

                  {/* Descripciones: text-gray-300 text-sm leading-relaxed */}
                  <p className="text-gray-300 text-sm leading-relaxed font-inter mt-2.5">
                    {esc.descripcion}
                  </p>
                </div>

                {/* Call to Action: text-[#00F0FF] font-semibold text-xs tracking-wider flex justify-between items-center */}
                <div className="mt-5 pt-3 border-t border-gray-800 text-[#00F0FF] font-semibold text-xs tracking-wider flex justify-between items-center">
                  <span>20 REACTIVOS OFICIALES</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>INICIAR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón Volver al Pilar 3 */}
        <div className="flex justify-start mt-8 pt-4 border-t border-gray-800">
          <button
            type="button"
            onClick={prevPillar}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-800 bg-[#141518]/80 text-gray-300 hover:text-white hover:border-gray-700 font-rajdhani font-bold text-xs tracking-wider uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Pilar 3 (Intereses Operacionales)</span>
          </button>
        </div>

      </div>
    );
  }

  // =========================================================================
  // 2. VISTA DE RESULTADOS (CUANDO CONCLUYEN LAS 20 PREGUNTAS)
  // =========================================================================
  if (isCompleted) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="bg-[#141518] p-6 sm:p-10 rounded-2xl border border-gray-700 shadow-2xl">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan mx-auto mb-4 shadow-cyan-glow">
              <Award className="w-8 h-8" />
            </div>
            <span className="font-teko text-sm text-neon-cyan uppercase font-bold tracking-widest block">
              EVALUACIÓN ACADÉMICA CONCLUIDA // {activeSchoolMeta.sigla}
            </span>
            <h2 className="font-military text-2xl sm:text-3xl text-white uppercase tracking-wider mt-1">
              DICTAMEN DE RENDIMIENTO
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-inter mt-2">
              Baremo oficial aplicado: aciertos bonificados (+20 pts) y errores penalizados (-1.25 pts).
            </p>
          </div>

          {/* Tarjetas de Puntaje */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-[#1b1c22] border border-gray-700 text-center">
              <span className="text-xs font-rajdhani font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Nota Vigesimal (0 - 20)
              </span>
              <div className="text-4xl sm:text-5xl font-military text-neon-cyan leading-tight">
                {score.vigesimalScore.toFixed(2)}
              </div>
              <span className={`inline-block px-2.5 py-0.5 mt-2 rounded text-[11px] font-rajdhani font-bold uppercase tracking-wider ${
                score.isApproved
                  ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-400"
                  : "bg-red-950/80 border border-alert-red/50 text-alert-red"
              }`}>
                {score.isApproved ? "APTO ACADÉMICO" : "EN OBSERVACIÓN"}
              </span>
            </div>

            <div className="p-5 rounded-xl bg-[#1b1c22] border border-gray-700 text-center">
              <span className="text-xs font-rajdhani font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Puntaje Bruto
              </span>
              <div className="text-4xl sm:text-5xl font-military text-white leading-tight">
                {score.rawScore} <span className="text-xs text-gray-500 font-inter">/ {score.maxPossibleScore}</span>
              </div>
              <span className="text-[11px] text-gray-400 block mt-2">
                Precisión: <strong className="text-neon-cyan">{score.accuracy}%</strong>
              </span>
            </div>

            <div className="p-5 rounded-xl bg-[#1b1c22] border border-gray-700 text-center">
              <span className="text-xs font-rajdhani font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Desglose (20 Reactivos)
              </span>
              <div className="flex justify-center items-baseline gap-4 mt-2 font-military">
                <div>
                  <span className="text-2xl text-emerald-400 block">{score.correctCount}</span>
                  <span className="text-[10px] text-gray-400 font-rajdhani uppercase">Aciertos</span>
                </div>
                <div className="text-gray-600 font-bold">/</div>
                <div>
                  <span className="text-2xl text-alert-red block">{score.incorrectCount}</span>
                  <span className="text-[10px] text-gray-400 font-rajdhani uppercase">Errores</span>
                </div>
                <div className="text-gray-600 font-bold">/</div>
                <div>
                  <span className="text-2xl text-gray-400 block">{score.blankCount}</span>
                  <span className="text-[10px] text-gray-400 font-rajdhani uppercase">En Blanco</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desglose por Cursos */}
          <div className="p-5 rounded-xl bg-[#1a1b20] border border-gray-700 mb-8">
            <h4 className="text-xs font-rajdhani font-bold text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-neon-cyan" />
              <span>RENDIMIENTO POR CURSO ({activeSchoolMeta.sigla}):</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(score.courseStats).map(([course, st]) => (
                <div key={course} className="p-3 rounded-lg bg-[#22232a] border border-gray-800">
                  <span className="text-xs font-rajdhani font-bold text-gray-200 block truncate" title={course}>
                    {course}
                  </span>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-gray-400">{st.correct}/{st.total} correctas</span>
                    <span className="font-bold text-neon-cyan">{st.pts > 0 ? `+${st.pts}` : st.pts}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones Finales */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExitTest}
                className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white font-rajdhani font-bold text-xs uppercase transition-colors"
              >
                Elegir Otra Escuela
              </button>
              <button
                type="button"
                onClick={restartTest}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white font-rajdhani font-bold text-xs uppercase hover:bg-white/5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Repetir Simulacro</span>
              </button>
            </div>

            <button
              type="button"
              onClick={nextPillar}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-extrabold text-sm uppercase tracking-wider shadow-cyan-glow hover:bg-cyan-300 transition-all"
            >
              <span>CONTINUAR AL DICTAMEN FINAL (PILAR 5)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. VISTA EXAMEN (isTestStarted): AISLADA, SIN TABS Y CON MÁXIMO CONTRASTE
  // =========================================================================
  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4">
      
      {/* Barra Superior del Examen: Escuela Fijada + TopoProgressBar + Cronómetro 72s */}
      <div className="bg-[#141518] border border-gray-700 rounded-2xl p-4 mb-4">
        
        {/* Fila 1: Escuela Matriz Activa y Botón Abandonar */}
        <div className="flex items-center justify-between gap-3 border-b border-gray-800 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl select-none">{activeSchoolMeta.icono}</span>
            <div>
              <span className="text-[10px] font-teko uppercase font-bold text-peru-red tracking-widest block leading-none">
                SIMULACRO OFICIAL EN CURSO
              </span>
              <h2 className="font-military text-base sm:text-lg text-white uppercase tracking-wider leading-none mt-0.5">
                {activeSchoolMeta.sigla} · <span className="text-gray-400 font-rajdhani text-xs">{activeSchoolMeta.rama}</span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExitTest}
            title="Salir del examen y regresar a la selección de escuelas"
            className="px-3 py-1.5 rounded-lg border border-gray-700 bg-black/40 text-gray-400 hover:text-alert-red hover:border-alert-red/50 text-[11px] font-rajdhani font-bold uppercase transition-colors"
          >
            Cancelar Examen
          </button>
        </div>

        {/* Fila 2: Progreso Topológico y Temporizador de 72s */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1">
            <TopoProgressBar
              current={currentIndex + 1}
              total={totalQuestions}
              label={`PREGUNTA ${currentIndex + 1} DE ${totalQuestions} // ${currentQuestion?.curso?.toUpperCase() || 'GENERAL'}`}
            />
          </div>

          {/* Temporizador Regresivo Militar */}
          <div className={`flex items-center gap-3 px-3.5 py-1.5 rounded-xl border transition-all duration-300 ${timerTheme.border} ${timerTheme.bg} ${timerTheme.glow}`}>
            <Clock className={`w-4 h-4 ${timerTheme.color}`} />
            <div>
              <div className="text-[9px] font-rajdhani font-bold text-gray-400 uppercase tracking-widest leading-none">
                TIEMPO LÍMITE
              </div>
              <div className={`text-lg font-military tracking-wider leading-none mt-0.5 ${timerTheme.color}`}>
                00:{String(timeRemaining).padStart(2, '0')}s
              </div>
            </div>
            <div className="w-12 h-1.5 rounded-full bg-night-deep overflow-hidden border border-white/10">
              <div className={`h-full transition-all duration-1000 ${timerTheme.barColor}`} style={{ width: `${timerPercentage}%` }} />
            </div>
          </div>
        </div>

      </div>

      {/* Contenedor Sólido de la Pregunta (bg-[#141518] sin overlays que oscurezcan) */}
      <div className="relative min-h-[380px]">
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={`q-${currentQuestion?.id_pregunta}-${currentIndex}`}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <div className="bg-[#141518] border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              
              {/* Encabezado del Reactivo */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-gray-700 text-neon-cyan text-xs font-rajdhani font-bold uppercase tracking-wider">
                    {currentQuestion?.curso}
                  </span>
                  <span className="text-xs font-rajdhani font-bold text-gray-300 uppercase tracking-wider">
                    TEMA: {currentQuestion?.tema}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-rajdhani font-bold">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                    +{currentQuestion?.metricas?.pts_correcta ?? 20} PTS
                  </span>
                  <span className="px-2 py-0.5 rounded bg-red-950/60 text-alert-red border border-alert-red/30">
                    {currentQuestion?.metricas?.pts_incorrecta ?? -1.25} PTS
                  </span>
                </div>
              </div>

              {/* Enunciado con Máximo Contraste y Soporte KaTeX */}
              <div className="text-white text-base sm:text-lg font-inter leading-relaxed mb-6 font-normal">
                <EnunciadoMatematico text={currentQuestion?.enunciado} />
              </div>

              {/* Tarjetas de Opciones (A, B, C, D, E) */}
              <div className="space-y-3">
                {currentQuestion?.opciones?.map((opt) => {
                  const isSelected = currentAnswer?.selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAdvancing}
                      onClick={() => handleAnswerClick(opt.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                        isSelected
                          ? "bg-cyan-950/60 border-neon-cyan text-white shadow-cyan-glow-sm"
                          : "bg-[#1a1b20] border-gray-700 text-gray-200 hover:border-neon-cyan hover:bg-[#22252e] hover:text-white"
                      } ${isAdvancing ? 'cursor-default' : ''}`}
                    >
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        {/* Chip con la Letra */}
                        <span className={`w-8 h-8 rounded-lg border font-military text-sm flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected
                            ? "border-neon-cyan bg-neon-cyan text-night-deep font-bold"
                            : "border-gray-600 bg-black/60 text-gray-300"
                        }`}>
                          {opt.id}
                        </span>

                        {/* Texto de la Opción */}
                        <div className="text-sm sm:text-base font-inter leading-snug break-words flex-1">
                          <EnunciadoMatematico text={opt.texto} />
                        </div>
                      </div>

                      {/* Icono de Selección */}
                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-gray-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Alerta de Menos de 15 Segundos */}
              {timeRemaining <= 15 && (
                <div className="mt-5 p-2.5 rounded-xl bg-alert-red/10 border border-alert-red/40 flex items-center gap-2 text-alert-red text-xs font-rajdhani font-bold tracking-wider uppercase animate-pulse">
                  <Flame className="w-4 h-4 flex-shrink-0" />
                  <span>TIEMPO CRÍTICO: MENOS DE 15 SEGUNDOS PARA RESPONDER ANTES DEL BLOQUEO EN BLANCO.</span>
                </div>
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Barra de Navegación Inferior */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-800 mt-4">
        <button
          type="button"
          onClick={() => {
            if (currentIndex > 0) handlePrev();
            else handleExitTest();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white font-rajdhani font-bold text-xs tracking-wider uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{currentIndex > 0 ? "Pregunta Anterior" : "Cambiar de Escuela"}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleNext}
            className="hidden sm:inline-flex items-center px-3.5 py-2 text-gray-400 hover:text-gray-200 text-xs font-rajdhani font-bold uppercase tracking-wider transition-colors"
          >
            Omitir Reactivo (0 Pts)
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-cyan-glow hover:bg-cyan-300 transition-all"
          >
            <span>{currentIndex < totalQuestions - 1 ? "Siguiente Pregunta" : "Finalizar Examen"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
