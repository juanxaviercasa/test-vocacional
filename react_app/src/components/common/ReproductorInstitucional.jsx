import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, AlertCircle, RotateCcw } from 'lucide-react';

/**
 * Metadatos institucionales y taxonomía de las Escuelas Matrices
 */
const METADATA_HIMNOS = {
  EMCH: {
    titulo: 'Himno de la Escuela Militar de Chorrillos',
    rama: 'Ejército del Perú',
    colorTheme: 'red',
  },
  ETE: {
    titulo: 'Himno de la Escuela Técnica del Ejército',
    rama: 'Ejército del Perú',
    colorTheme: 'red',
  },
  ENP: {
    titulo: 'Himno de la Escuela Naval del Perú',
    rama: 'Marina de Guerra del Perú',
    colorTheme: 'cyan',
  },
  CITEN: {
    titulo: 'Himno del CITEN (Oficiales de Mar)',
    rama: 'Marina de Guerra del Perú',
    colorTheme: 'cyan',
  },
  EOFAP: {
    titulo: 'Himno de la Fuerza Aérea del Perú (EOFAP)',
    rama: 'Fuerza Aérea del Perú',
    colorTheme: 'cyan',
  },
  ESOFA: {
    titulo: 'Himno de la Escuela de Suboficiales FAP',
    rama: 'Fuerza Aérea del Perú',
    colorTheme: 'cyan',
  },
  'EO-PNP': {
    titulo: 'Himno de la Policía Nacional del Perú',
    rama: 'Policía Nacional del Perú',
    colorTheme: 'red',
  },
  EO_PNP: {
    titulo: 'Himno de la Policía Nacional del Perú',
    rama: 'Policía Nacional del Perú',
    colorTheme: 'red',
  },
  'EESTP-PNP': {
    titulo: 'Himno de la EESTP PNP (Suboficiales)',
    rama: 'Policía Nacional del Perú',
    colorTheme: 'red',
  },
  EESTP_PNP: {
    titulo: 'Himno de la EESTP PNP (Suboficiales)',
    rama: 'Policía Nacional del Perú',
    colorTheme: 'red',
  },
  EESTP: {
    titulo: 'Himno de la EESTP PNP (Suboficiales)',
    rama: 'Policía Nacional del Perú',
    colorTheme: 'red',
  },
};

/**
 * Formatea segundos en formato MM:SS
 */
function formatearTiempo(segundos) {
  if (isNaN(segundos) || segundos < 0) return '00:00';
  const mins = Math.floor(segundos / 60);
  const secs = Math.floor(segundos % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Componente: ReproductorInstitucional
 * 
 * Arquitectura de audio resiliente para entornos Vite / Next.js / Python Static Server:
 * 1. Ruta absoluta a la raíz pública (`/audio/${escuela.toUpperCase()}.mp3`).
 * 2. Carga bajo demanda (preload="none") que evita falsos 404 al montar.
 * 3. Limpieza de memoria en useEffect sin reset destructivo de src.
 * 4. Cadena de resolución multi-ruta (absoluta, relativa ./ y subcarpeta /react_app/).
 * 5. Logging explícito con console.error de la ruta intentada.
 * 6. Estado visual deshabilitado (opacity-50 cursor-not-allowed) si falla la reproducción.
 */
export default function ReproductorInstitucional({
  escuela = 'EMCH',
  forceColorTheme = null,
  className = '',
}) {
  const cleanSchool = String(escuela || 'EMCH').toUpperCase().trim();

  // =========================================================================
  // 1. CORRECCIÓN DE RUTAS ABSOLUTAS (Public Folder)
  // =========================================================================
  const audioPath = `/audio/${cleanSchool}.mp3`;

  const meta = METADATA_HIMNOS[cleanSchool] || {
    titulo: `Himno Oficial · ${cleanSchool}`,
    rama: 'Fuerzas Armadas del Perú',
    colorTheme: 'cyan',
  };

  const effectiveTheme = forceColorTheme || meta.colorTheme;

  // Estados reactivos
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // =========================================================================
  // LÓGICA DE RETENCIÓN / CLEANUP: Parada al desmontar o cambiar de escuela
  // (Nota: no asignamos audio.src = '' para evitar que el navegador dispare onError en StrictMode)
  // =========================================================================
  useEffect(() => {
    const audio = audioRef.current;
    setIsPlaying(false);
    setCurrentTime(0);
    setHasError(false);

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [cleanSchool]);

  // =========================================================================
  // 2. MANEJO DE ERRORES EXPLÍCITO Y REPRODUCCIÓN MULTI-RUTA RESILIENTE
  // =========================================================================
  const togglePlay = async () => {
    if (hasError || isLoading) return;

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    // Rutas candidatas para compatibilidad universal (dev server, server estático, subcarpetas)
    const baseDynamic = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || './';
    const cleanBase = baseDynamic.endsWith('/') ? baseDynamic : `${baseDynamic}/`;

    const candidatePaths = [
      audioPath, // 1. Ruta absoluta canónica: /audio/SIGLA.mp3
      `${cleanBase}audio/${cleanSchool}.mp3`, // 2. Base Vite / Next.js
      `./audio/${cleanSchool}.mp3`, // 3. Relativa a la raíz actual
      `audio/${cleanSchool}.mp3`, // 4. Relativa directa
      `/react_app/audio/${cleanSchool}.mp3`, // 5. Servidor montado en /react_app/
      // Fallback con guión reemplazado si aplica
      `/audio/${cleanSchool.replace(/_/g, '-')}.mp3`,
      `./audio/${cleanSchool.replace(/_/g, '-')}.mp3`,
    ];

    let played = false;

    for (const testPath of candidatePaths) {
      try {
        if (!audio.src || !audio.src.endsWith(testPath)) {
          audio.src = testPath;
          audio.load();
        }
        await audio.play();
        played = true;
        setIsPlaying(true);
        setHasError(false);
        break;
      } catch (err) {
        // Intentar siguiente ruta candidata
      }
    }

    if (!played) {
      // 2. Logging explícito según requerimiento
      console.error('Error al cargar audio. Ruta intentada:', audioPath);
      setHasError(true);
      setIsPlaying(false);
    }

    setIsLoading(false);
  };

  const handleAudioError = (e) => {
    // Si ocurre un error durante la reproducción activa
    if (isPlaying) {
      console.error('Error al cargar audio. Ruta intentada:', audioPath);
      setHasError(true);
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
      setHasError(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleRetry = (e) => {
    e.stopPropagation();
    setHasError(false);
    setIsLoading(false);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Clases cosméticas según tema de color táctico
  const themeClasses = useMemo(() => {
    if (effectiveTheme === 'red') {
      return {
        glowActive: 'shadow-[0_0_25px_rgba(217,16,35,0.45)] border-peru-red/80',
        pulseBorder: 'animate-[pulse-red_2s_cubic-bezier(0.4,0,0.6,1)_infinite]',
        barBg: 'bg-gradient-to-t from-peru-red-dark via-peru-red to-peru-red-light',
        btnTextActive: 'text-peru-red-light',
        badgeBg: 'bg-red-950/70 border-peru-red/40 text-red-200',
        progressFill: 'bg-gradient-to-r from-peru-red to-red-400',
      };
    }
    return {
      glowActive: 'shadow-[0_0_25px_rgba(0,240,255,0.45)] border-neon-cyan/80',
      pulseBorder: 'animate-[pulse-cyan_2s_cubic-bezier(0.4,0,0.6,1)_infinite]',
      barBg: 'bg-gradient-to-t from-cyan-600 via-teal-300 to-neon-cyan',
      btnTextActive: 'text-neon-cyan',
      badgeBg: 'bg-cyan-950/70 border-cyan-500/40 text-cyan-200',
      progressFill: 'bg-gradient-to-r from-cyan-500 to-neon-cyan',
    };
  }, [effectiveTheme]);

  return (
    <div
      className={`relative inline-flex flex-col rounded-2xl transition-all duration-300 ${
        isPlaying ? themeClasses.glowActive : 'border-white/15 hover:border-white/30'
      } ${className}`}
    >
      {/* Audio nativo HTML5 con preload="none" para evitar 404 inmediatos al montar */}
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleAudioError}
      />

      {/* ===================================================================== */}
      {/* 3. ESTADO DE CARGA Y FALLBACK VISUAL: BOTÓN DESHABILITADO EN ERROR   */}
      {/* ===================================================================== */}
      <button
        type="button"
        onClick={togglePlay}
        disabled={hasError || isLoading}
        aria-label={`Reproducir himno oficial de ${cleanSchool}`}
        className={`group relative overflow-hidden flex items-center gap-3.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl 
          backdrop-blur-xl bg-slate-950/75 dark:bg-[#0B101E]/80 border transition-all duration-300 select-none text-left
          ${
            hasError
              ? 'opacity-50 cursor-not-allowed border-red-500/40 bg-red-950/20'
              : isPlaying
              ? `${themeClasses.pulseBorder} border-current cursor-pointer`
              : 'border-white/10 hover:bg-slate-900/90 cursor-pointer active:scale-[0.98]'
          }
        `}
      >
        {/* Shimmer decorativo durante reproducción */}
        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />
        )}

        {/* Micro-interacción: Ecualizador de 4 barras o Icono */}
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10">
          {isPlaying ? (
            <div className="flex items-end justify-center gap-[3px] h-4 w-4" aria-hidden="true">
              <span
                className={`w-[3px] rounded-full ${themeClasses.barBg} animate-[eq-bar-1_0.6s_ease-in-out_infinite_alternate]`}
                style={{ height: '35%' }}
              />
              <span
                className={`w-[3px] rounded-full ${themeClasses.barBg} animate-[eq-bar-2_0.4s_ease-in-out_infinite_alternate_0.15s]`}
                style={{ height: '80%' }}
              />
              <span
                className={`w-[3px] rounded-full ${themeClasses.barBg} animate-[eq-bar-3_0.7s_ease-in-out_infinite_alternate_0.3s]`}
                style={{ height: '55%' }}
              />
              <span
                className={`w-[3px] rounded-full ${themeClasses.barBg} animate-[eq-bar-4_0.5s_ease-in-out_infinite_alternate_0.1s]`}
                style={{ height: '90%' }}
              />
            </div>
          ) : hasError ? (
            <AlertCircle className="w-4 h-4 text-alert-red" />
          ) : (
            <span className="text-base select-none group-hover:scale-110 transition-transform">
              🔊
            </span>
          )}
        </div>

        {/* Textos y Etiquetas del Botón */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`font-rajdhani font-black text-xs sm:text-sm tracking-wider uppercase transition-colors ${
                hasError
                  ? 'text-red-400'
                  : isPlaying
                  ? themeClasses.btnTextActive
                  : 'text-slate-100 group-hover:text-white'
              }`}
            >
              {hasError
                ? 'HIMNO NO DISPONIBLE'
                : isPlaying
                ? 'PAUSAR HIMNO OFICIAL'
                : 'ESCUCHAR HIMNO OFICIAL'}
            </span>

            <span
              className={`text-[10px] font-rajdhani font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider ${
                hasError
                  ? 'bg-red-950/60 border-red-500/30 text-red-300'
                  : themeClasses.badgeBg
              }`}
            >
              {cleanSchool}
            </span>
          </div>

          <span className="text-[11px] font-inter text-slate-300 dark:text-slate-400 truncate max-w-[210px] sm:max-w-[280px]">
            {hasError
              ? `No se encontró: ${audioPath}`
              : isPlaying
              ? `${formatearTiempo(currentTime)} / ${formatearTiempo(duration)} · EBU R128 (-14 LUFS)`
              : meta.titulo}
          </span>
        </div>

        {/* Icono de Estado a la derecha */}
        <div className="ml-auto pl-2 flex items-center text-slate-400 group-hover:text-slate-200">
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current opacity-80" />
          ) : (
            <Play className={`w-4 h-4 fill-current ${hasError ? 'opacity-30' : 'opacity-60 group-hover:opacity-100'}`} />
          )}
        </div>

        {/* Barra de progreso inferior */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 overflow-hidden">
            <div
              className={`h-full transition-all duration-200 ease-linear ${themeClasses.progressFill}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </button>

      {/* Fallback de error explícito debajo del botón con opción de reintentar */}
      {hasError && (
        <div className="mt-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 border border-alert-red/40 text-red-200 text-[11px] font-inter flex items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-1.5 truncate">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-alert-red" />
            <span className="truncate">Ruta: <code>{audioPath}</code></span>
          </div>
          <button
            type="button"
            onClick={handleRetry}
            className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-300 hover:text-amber-100 underline cursor-pointer flex-shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reintentar</span>
          </button>
        </div>
      )}

      {/* Animaciones CSS */}
      <style>{`
        @keyframes eq-bar-1 { 0% { height: 25%; } 100% { height: 95%; } }
        @keyframes eq-bar-2 { 0% { height: 40%; } 100% { height: 100%; } }
        @keyframes eq-bar-3 { 0% { height: 15%; } 100% { height: 85%; } }
        @keyframes eq-bar-4 { 0% { height: 30%; } 100% { height: 90%; } }
        @keyframes pulse-cyan {
          0%, 100% {
            border-color: rgba(0, 240, 255, 0.4);
            box-shadow: 0 0 15px rgba(0, 240, 255, 0.25);
          }
          50% {
            border-color: rgba(0, 240, 255, 0.95);
            box-shadow: 0 0 28px rgba(0, 240, 255, 0.55);
          }
        }
        @keyframes pulse-red {
          0%, 100% {
            border-color: rgba(217, 16, 35, 0.4);
            box-shadow: 0 0 15px rgba(217, 16, 35, 0.25);
          }
          50% {
            border-color: rgba(239, 68, 68, 0.95);
            box-shadow: 0 0 28px rgba(239, 68, 68, 0.55);
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
