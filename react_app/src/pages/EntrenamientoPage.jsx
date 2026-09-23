import React, { useState, useEffect } from 'react';
import { SCHOOL_PHYSICAL_BENCHMARKS, TACTICAL_STUDY_HABITS } from '../data/strategicBenchmarks';
import { Link } from '../router/AppRouter';
import {
  Brain,
  Dumbbell,
  Compass,
  Clock,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  Flame,
  Award,
  BookOpen,
  Activity,
  Heart,
  Eye,
  Volume2
} from 'lucide-react';

export default function EntrenamientoPage() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'estudio' | 'fisico' | 'psicologico'
  const [selectedSchoolKey, setSelectedSchoolKey] = useState('EMCH');

  // Mini-Widget Interactivo Pomodoro Militar (50/10)
  const [pomodoroSeconds, setPomodoroSeconds] = useState(50 * 60);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isPomodoroActive && pomodoroSeconds > 0) {
      interval = setInterval(() => {
        setPomodoroSeconds((sec) => sec - 1);
      }, 1000);
    } else if (pomodoroSeconds === 0) {
      if (!isBreakTime) {
        setIsBreakTime(true);
        setPomodoroSeconds(10 * 60);
      } else {
        setIsBreakTime(false);
        setPomodoroSeconds(50 * 60);
      }
      setIsPomodoroActive(false);
    }
    return () => clearInterval(interval);
  }, [isPomodoroActive, pomodoroSeconds, isBreakTime]);

  const togglePomodoro = () => setIsPomodoroActive(!isPomodoroActive);
  const resetPomodoro = () => {
    setIsPomodoroActive(false);
    setIsBreakTime(false);
    setPomodoroSeconds(50 * 60);
  };

  const formatTimer = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Mini-Widget Interactivo Box Breathing (4-4-4-4)
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('Inhala (4s)'); // Inhala -> Retén -> Exhala -> Retén
  const [breathingCount, setBreathingCount] = useState(4);

  useEffect(() => {
    let breathTimer = null;
    if (isBreathingActive) {
      breathTimer = setInterval(() => {
        setBreathingCount((prev) => {
          if (prev > 1) return prev - 1;
          // Cambiar de fase
          setBreathingPhase((currentPhase) => {
            if (currentPhase.startsWith('Inhala')) return 'Retén Aire (4s)';
            if (currentPhase.startsWith('Retén Aire')) return 'Exhala Lento (4s)';
            if (currentPhase.startsWith('Exhala')) return 'Retén Vacío (4s)';
            return 'Inhala (4s)';
          });
          return 4;
        });
      }, 1000);
    } else {
      setBreathingCount(4);
      setBreathingPhase('Inhala (4s)');
    }
    return () => clearInterval(breathTimer);
  }, [isBreathingActive]);

  const currentBenchmark = SCHOOL_PHYSICAL_BENCHMARKS[selectedSchoolKey] || SCHOOL_PHYSICAL_BENCHMARKS.EMCH;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-8 space-y-10">
      
      {/* 1. HERO BANNER: HUB ESTRATÉGICO DE PREPARACIÓN */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-700 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B101E] via-[#0B101E]/95 to-[#0B101E]/80 z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs sm:text-sm font-rajdhani font-bold tracking-widest uppercase shadow-sm">
            <Compass className="w-4 h-4 text-neon-cyan" />
            <span>CENTRO DE ENTRENAMIENTO TÁCTICO · HUB DE PREPARACIÓN INTEGRAL 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-black text-white uppercase tracking-tight leading-tight">
            MAPA ESTRATÉGICO DE FORMACIÓN MILITAR & POLICIAL
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-inter max-w-3xl leading-relaxed">
            Ruta de alto rendimiento diseñada para aspirantes a Oficiales y Suboficiales de las Fuerzas Armadas y Policía Nacional. La admisión no se logra memorizando claves: requiere un acondicionamiento integral en tres ejes indisolubles: <strong className="text-cyan-300">cognitivo</strong>, <strong className="text-emerald-300">somático-físico</strong> y <strong className="text-amber-300">psicológico de combate</strong>.
          </p>

          {/* Filtro Rápido de Ejes */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Ruta Completa (3 Nodos)' },
              { id: 'estudio', label: '1. Hábitos y Estudio' },
              { id: 'fisico', label: '2. Planificación Física' },
              { id: 'psicologico', label: '3. Estrategia Psicológica' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-rajdhani font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-neon-cyan text-night-deep shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAPA CONCEPTUAL INTERACTIVO (Ruta Conectada por Líneas Tenues) */}
      <div className="relative">
        
        {/* Línea Conectora SVG de Fondo (Visible en pantallas grandes) */}
        <div className="hidden lg:block absolute top-12 left-10 right-10 h-1 z-0 pointer-events-none">
          <svg className="w-full h-10" viewBox="0 0 1000 40" fill="none">
            <path
              d="M 50 20 L 950 20"
              stroke="#00F0FF"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="opacity-40 animate-pulse"
            />
          </svg>
        </div>

        {/* 3 Nodos Conceptuales de Alto Nivel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          
          {/* NODO 1: COGNITIVO */}
          <div className="p-6 rounded-3xl bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-sans font-black">
                01
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-rajdhani font-bold tracking-wider uppercase">
                EJE COGNITIVO
              </span>
            </div>
            <h3 className="font-sans font-black text-xl text-white uppercase tracking-tight">
              TÉCNICAS Y HÁBITOS DE ESTUDIO
            </h3>
            <p className="text-xs text-slate-300 font-inter mt-2 leading-relaxed">
              Pomodoro militar 50/10, Active Recall sin distractores, simulacros con cronómetro a 72s y protocolo de consolidación circadiana.
            </p>
          </div>

          {/* NODO 2: FÍSICO */}
          <div className="p-6 rounded-3xl bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-sans font-black">
                02
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-rajdhani font-bold tracking-wider uppercase">
                EJE SOMÁTICO
              </span>
            </div>
            <h3 className="font-sans font-black text-xl text-white uppercase tracking-tight">
              PLANIFICACIÓN FÍSICA REGLAMENTARIA
            </h3>
            <p className="text-xs text-slate-300 font-inter mt-2 leading-relaxed">
              Malla de trote 2,400m fraccionado, dominadas estrictas sin balanceo, natación de supervivencia y salto de valor desde 5m.
            </p>
          </div>

          {/* NODO 3: PSICOLÓGICO */}
          <div className="p-6 rounded-3xl bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-amber-500/50 shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 font-sans font-black">
                03
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-[11px] font-rajdhani font-bold tracking-wider uppercase">
                EJE CONDUCTUAL
              </span>
            </div>
            <h3 className="font-sans font-black text-xl text-white uppercase tracking-tight">
              ESTRATEGIA PSICOLÓGICA Y MANDO
            </h3>
            <p className="text-xs text-slate-300 font-inter mt-2 leading-relaxed">
              Respiración Box Breathing (4-4-4-4), control de pánico en entrevista personal, proyección de voz y lenguaje no verbal marcial.
            </p>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* SECCIÓN 1: HÁBITOS Y TÉCNICAS DE ESTUDIO */}
      {/* ========================================================= */}
      {(activeTab === 'all' || activeTab === 'estudio') && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-gray-800 pb-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-rajdhani font-black text-cyan-600 dark:text-neon-cyan uppercase tracking-widest block">
                NODO 01 // METODOLOGÍA COGNITIVA
              </span>
              <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-900 dark:text-white uppercase tracking-tight">
                Hábitos y Técnicas de Estudio Militar
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Widget Interactivo: Pomodoro Militar */}
            <div className="p-6 rounded-3xl bg-[#0B101E]/90 border border-cyan-500/40 backdrop-blur-xl shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-[11px] font-rajdhani font-bold text-cyan-300 uppercase tracking-widest">
                  TEMPORIZADOR TÁCTICO
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  isBreakTime ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                }`}>
                  {isBreakTime ? 'Pausa Activa (10m)' : 'Bloque Operacional (50m)'}
                </span>
              </div>

              {/* Display Numérico Gigante */}
              <div className="my-6">
                <div className="text-5xl sm:text-6xl font-sans font-black text-white tracking-tight drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  {formatTimer(pomodoroSeconds)}
                </div>
                <p className="text-xs text-slate-400 font-inter mt-1">
                  {isBreakTime ? 'Hidrátate, camina y no uses pantallas' : 'Cero notificaciones. Resuelve reactivos continuos.'}
                </p>
              </div>

              {/* Botones de Control */}
              <div className="flex items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={togglePomodoro}
                  className={`flex-1 py-3 px-4 rounded-xl font-rajdhani font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isPomodoroActive
                      ? 'bg-amber-500 text-night-deep hover:bg-amber-400'
                      : 'bg-neon-cyan text-night-deep hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  }`}
                >
                  {isPomodoroActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPomodoroActive ? 'Pausar Bloque' : 'Iniciar Bloque 50/10'}</span>
                </button>

                <button
                  type="button"
                  onClick={resetPomodoro}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Reiniciar temporizador"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tarjeta: Active Recall & Spaced Repetition */}
            <div className="p-6 rounded-3xl bg-[#0B101E]/80 border border-white/10 backdrop-blur-xl shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <Target className="w-5 h-5" />
                <h4 className="font-rajdhani font-bold text-base sm:text-lg text-white uppercase tracking-wider">
                  Active Recall (Resolución Ciega)
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-inter leading-relaxed">
                Nunca leas resúmenes pasivamente con resaltador: el cerebro militar aprende bajo resistencia. Tapa las alternativas de la pregunta, calcula la respuesta o redacta la justificación teórica en papel en blanco, y solo después coteja con la clave oficial.
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
                <div>• Ciclo 1: Resolución a las 24 horas</div>
                <div>• Ciclo 2: Re-evaluación a las 72 horas</div>
                <div>• Ciclo 3: Simulacro ciego a los 7 días</div>
              </div>
            </div>

            {/* Tarjeta: Cronómetro de 72 Segundos & Sueño */}
            <div className="p-6 rounded-3xl bg-[#0B101E]/80 border border-white/10 backdrop-blur-xl shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Clock className="w-5 h-5" />
                <h4 className="font-rajdhani font-bold text-base sm:text-lg text-white uppercase tracking-wider">
                  Ritmo a 72 Segundos & Sueño
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-inter leading-relaxed">
                En el examen real dispones de 72 segundos por pregunta. Entrena descartando distractores absurdos en los primeros 15 segundos para reservar tiempo a problemas cinemáticos o trigonométricos.
              </p>
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200 font-inter">
                <strong>🌙 Neurobiología del Sueño:</strong> Dormir menos de 7 horas anula la fase REM, destruyendo la consolidación de fórmulas matemáticas en el hipocampo.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECCIÓN 2: PLANIFICACIÓN FÍSICA Y BAREMOS */}
      {/* ========================================================= */}
      {(activeTab === 'all' || activeTab === 'fisico') && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-rajdhani font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                  NODO 02 // RENDIMIENTO SOMÁTICO
                </span>
                <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-900 dark:text-white uppercase tracking-tight">
                  Planificación Física y Baremos Oficiales
                </h2>
              </div>
            </div>

            {/* Selector de Escuela para Baremos */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['EMCH', 'EOFAP', 'ENP', 'EO_PNP', 'CITEN', 'ESOFA', 'ETE', 'EESTP_PNP'].map((key) => {
                const isSelected = selectedSchoolKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSchoolKey(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-rajdhani font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-emerald-500 text-night-deep shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {key.replace('_', '-')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid de 4 Baremos Físicos de la Escuela Seleccionada */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Prueba 1: Trote 2,400m */}
            <div className="p-5 rounded-2xl bg-[#0B101E]/80 border border-white/10 backdrop-blur-xl shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xl">🏃</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  AERÓBICO
                </span>
              </div>
              <h4 className="font-rajdhani font-bold text-base text-white uppercase tracking-wider">
                Trote de Cooper ({currentBenchmark.trote.distancia})
              </h4>
              <div className="text-sm font-sans font-black text-emerald-400">
                {currentBenchmark.trote.tiempoMeta}
              </div>
              <p className="text-xs text-slate-300 font-inter leading-relaxed">
                {currentBenchmark.trote.pauta}
              </p>
            </div>

            {/* Prueba 2: Barras Fijas */}
            <div className="p-5 rounded-2xl bg-[#0B101E]/80 border border-white/10 backdrop-blur-xl shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xl">💪</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  FUERZA PURA
                </span>
              </div>
              <h4 className="font-rajdhani font-bold text-base text-white uppercase tracking-wider">
                {currentBenchmark.fuerzaTrenSuperior.ejercicio}
              </h4>
              <div className="text-sm font-sans font-black text-emerald-400">
                {currentBenchmark.fuerzaTrenSuperior.repeticiones}
              </div>
              <p className="text-xs text-slate-300 font-inter leading-relaxed">
                {currentBenchmark.fuerzaTrenSuperior.pauta}
              </p>
            </div>

            {/* Prueba 3: Natación Utilitaria */}
            <div className="p-5 rounded-2xl bg-[#0B101E]/80 border border-white/10 backdrop-blur-xl shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xl">🏊</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  MEDIO ACUÁTICO
                </span>
              </div>
              <h4 className="font-rajdhani font-bold text-base text-white uppercase tracking-wider">
                Natación ({currentBenchmark.natacion.distancia})
              </h4>
              <div className="text-sm font-sans font-black text-emerald-400">
                {currentBenchmark.natacion.tiempoMeta}
              </div>
              <p className="text-xs text-slate-300 font-inter leading-relaxed">
                {currentBenchmark.natacion.pauta}
              </p>
            </div>

            {/* Prueba 4: Salto de Valor / Planchas */}
            <div className="p-5 rounded-2xl bg-[#0B101E]/80 border border-white/10 backdrop-blur-xl shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xl">🎖️</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  TEMPLE MARCIAL
                </span>
              </div>
              <h4 className="font-rajdhani font-bold text-base text-white uppercase tracking-wider">
                {currentBenchmark.saltoValor.ejercicio}
              </h4>
              <div className="text-sm font-sans font-black text-emerald-400">
                {currentBenchmark.saltoValor.requisito}
              </div>
              <p className="text-xs text-slate-300 font-inter leading-relaxed">
                {currentBenchmark.saltoValor.pauta}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECCIÓN 3: ESTRATEGIA PSICOLÓGICA Y MANDO */}
      {/* ========================================================= */}
      {(activeTab === 'all' || activeTab === 'psicologico') && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-gray-800 pb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-rajdhani font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                NODO 03 // ENTRENAMIENTO CONDUCTUAL
              </span>
              <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-900 dark:text-white uppercase tracking-tight">
                Estrategia Psicológica y Entrevista Personal
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Widget Interactivo: Box Breathing Táctico */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0B101E]/90 border border-amber-500/40 backdrop-blur-xl shadow-xl flex flex-col items-center justify-between text-center">
              <div className="w-full flex items-center justify-between mb-4">
                <span className="text-xs font-rajdhani font-bold text-amber-300 uppercase tracking-widest">
                  PROTOCOLOS DE REGULACIÓN DEL SISTEMA NERVIOSO
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-500/30 uppercase">
                  BOX BREATHING 4-4-4-4
                </span>
              </div>

              {/* Animación del Círculo de Respiración */}
              <div className="my-6 relative flex items-center justify-center">
                <div
                  className={`w-40 h-40 rounded-full border-4 border-amber-400/80 flex flex-col items-center justify-center transition-all duration-1000 shadow-[0_0_30px_rgba(245,158,11,0.3)] ${
                    isBreathingActive && breathingPhase.startsWith('Inhala')
                      ? 'scale-115 bg-amber-500/20'
                      : isBreathingActive && breathingPhase.startsWith('Exhala')
                      ? 'scale-90 bg-black/60'
                      : 'scale-100 bg-amber-500/10'
                  }`}
                >
                  <span className="text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-widest">
                    {breathingPhase}
                  </span>
                  <span className="text-4xl font-sans font-black text-white my-1">
                    {breathingCount}s
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono">
                    {isBreathingActive ? 'Sincronizado' : 'En Espera'}
                  </span>
                </div>
              </div>

              {/* Botón de Activación de Respiración Táctica */}
              <button
                type="button"
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-night-deep font-rajdhani font-black text-xs uppercase tracking-wider shadow-md hover:shadow-amber-glow transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isBreathingActive ? 'Detener Ciclo de Respiración' : 'Practicar Respiración de Combate (4-4-4-4)'}</span>
              </button>
            </div>

            {/* Pautas Clave de Entrevista ante el Estado Mayor */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0B101E]/80 border border-white/10 backdrop-blur-xl shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Eye className="w-5 h-5" />
                <h4 className="font-rajdhani font-bold text-lg text-white uppercase tracking-wider">
                  Lenguaje No Verbal ante el Consejo de Admisión
                </h4>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-inter">
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <strong className="text-white font-rajdhani text-sm uppercase block">
                    1. Porte y Posición de Descanso Táctico:
                  </strong>
                  <span>Espalda recta apoyada en el respaldo sin rigidez excesiva, manos sobre los muslos, pies firmes en el suelo en ángulo de 90°. Jamás cruces los brazos ni muevas las piernas (síntoma de ansiedad).</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <strong className="text-white font-rajdhani text-sm uppercase block">
                    2. Mirada Frontal al Evaluador:
                  </strong>
                  <span>Sostén el contacto visual directo con el oficial superior que te formula la pregunta. Si hay un panel de 3 oficiales, inicia respondiendo a quien preguntó y barre la mirada con seguridad hacia los demás.</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <strong className="text-white font-rajdhani text-sm uppercase block">
                    3. Dicción Clara y Modulación Marcial:
                  </strong>
                  <span>Evita muletillas ("este...", "o sea"). Responde con frases asertivas: "Mi Coronel, considero...", "Entendido, señor Almirante". Proyecta la voz desde el diafragma sin gritar.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. FOOTER CON ENLACES DE RETORNO Y EXAMEN */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#121624] border border-slate-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-600 dark:text-slate-300 font-inter">
          ¿Listo para poner a prueba tu nivel académico y velocidad de respuesta? Mide tus conocimientos bajo el cronómetro táctico oficial.
        </p>

        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-600 text-night-deep font-rajdhani font-black text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-transform whitespace-nowrap"
        >
          Ir al Test Vocacional &rarr;
        </Link>
      </div>

    </div>
  );
}
