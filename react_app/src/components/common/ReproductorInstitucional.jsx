import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Volume2, VolumeX, Play, Pause, AlertCircle, Music, Shield } from 'lucide-react';

/**
 * Metadatos y taxonomía sonora de las Escuelas Matrices del Perú
 */
const METADATA_HIMNOS = {
  EMCH: {
    sigla: 'EMCH',
    file: 'EMCH.mp3',
    titulo: 'Himno de la Escuela Militar de Chorrillos',
    rama: 'Ejército del Perú',
    colorTheme: 'red', // Rojo Bandera
  },
  ETE: {
    sigla: 'ETE',
    file: 'ETE.mp3',
    titulo: 'Himno de la Escuela Técnica del Ejército',
    rama: 'Ejército del Perú',
    colorTheme: 'red',
  },
  ENP: {
    sigla: 'ENP',
    file: 'ENP.mp3',
    titulo: 'Himno de la Escuela Naval del Perú',
    rama: 'Marina de Guerra del Perú',
    colorTheme: 'cyan', // Cian Neón
  },
  CITEN: {
    sigla: 'CITEN',
    file: 'CITEN.mp3',
    titulo: 'Himno del CITEN (Oficiales de Mar)',
    rama: 'Marina de Guerra del Perú',
    colorTheme: 'cyan',
  },
  EOFAP: {
    sigla: 'EOFAP',
    file: 'EOFAP.mp3',
    titulo: 'Himno de la Fuerza Aérea del Perú (EOFAP)',
    rama: 'Fuerza Aérea del Perú',
    colorTheme: 'cyan',
  },
  ESOFA: {
    sigla: 'ESOFA',
    file: 'ESOFA.mp3',
    titulo: 'Himno de la Escuela de Suboficiales FAP',
    rama: 'Fuerza Aérea del Perú',
    colorTheme: 'cyan',
  },
  'EO-PNP': {
    sigla: 'EO-PNP',
    file: 'EO-PNP.mp3',
    titulo: 'Himno de la Policía Nacional del Perú',
    rama: 'Policía Nacional del Perú',
    colorTheme: 'red',
  },
  'EESTP-PNP': {
    sigla: 'EESTP-PNP',
    file: 'EESTP-PNP.mp3',
    titulo: 'Himno de la EESTP PNP (Suboficiales)',
    rama: 'Policía Nacional del Perú',
    colorTheme: 'red',
  },
};

/**
 * Normaliza las variantes de siglas (ej: 'EO_PNP' -> 'EO-PNP', 'EESTP' -> 'EESTP-PNP')
 */
function normalizarSigla(escuela) {
  if (!escuela) return 'EMCH';
  const raw = String(escuela).toUpperCase().trim();
  if (raw === 'EO_PNP' || raw === 'EOPNP') return 'EO-PNP';
  if (raw === 'EESTP_PNP' || raw === 'EESTPPNP' || raw === 'EESTP') return 'EESTP-PNP';
  return raw;
}

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
 * Affordance sonora institucional con diseño Glassmorphism Táctico,
 * micro-interacción de ecualizador reactivo, borde pulsante (Cian Neón / Rojo Bandera)
 * y lógica de retención estricta (limpieza de memoria y parada al desmontar).
 */
export default function ReproductorInstitucional({
  escuela = 'EMCH',
  variant = 'compact', // 'compact' | 'expanded' | 'button-only'
  forceColorTheme = null, // 'cyan' | 'red' | null (auto por rama)
  className = '',
}) {
  const siglaNormalizada = normalizarSigla(escuela);
  const metadata = METADATA_HIMNOS[siglaNormalizada] || {
    sigla: siglaNormalizada,
    file: `${siglaNormalizada}.mp3`,
    titulo: `Himno Oficial · ${siglaNormalizada}`,
    rama: 'Fuerzas Armadas del Perú',
    colorTheme: 'cyan',
  };

  const audioSrc = `/audio/${metadata.file}`;
  const effectiveTheme = forceColorTheme || metadata.colorTheme;

  // Estados del Reproductor
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [audioError, setAudioError] = useState(null);

  // =========================================================================
  // REGLA DE RETENCIÓN / MEMORY MANAGEMENT:
  // Si el usuario cambia de vista o desmonta el componente, el audio se detiene
  // de inmediato y se liberan los recursos del navegador.
  // =========================================================================
  useEffect(() => {
    const audio = audioRef.current;
    
    // Al cambiar de escuela, resetear el estado y pausar el audio anterior
    setIsPlaying(false);
    setCurrentTime(0);
    setAudioError(null);

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = ''; // Libera el buffer en memoria del navegador
      }
    };
  }, [audioSrc]);

  // Manejo de reproducción interactiva (Anti-Autoplay)
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setAudioError(null);
      setIsLoading(true);
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Interacción de audio bloqueada o archivo no disponible:', err);
        setAudioError('Audio en preparación o no disponible.');
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Manejadores de eventos de la etiqueta <audio>
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
      setAudioError(null);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    setAudioError('Archivo de audio en proceso de descarga o normalización.');
  };

  // Cálculo de progreso porcentual
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Clases dinámicas tácticas según el tema (Cian Neón vs Rojo Bandera)
  const themeClasses = useMemo(() => {
    if (effectiveTheme === 'red') {
      return {
        glowActive: 'shadow-[0_0_25px_rgba(217,16,35,0.45)] border-peru-red/80',
        pulseBorder: 'animate-[pulse-red_2s_cubic-bezier(0.4,0,0.6,1)_infinite]',
        barBg: 'bg-gradient-to-t from-peru-red-dark via-peru-red to-peru-red-light',
        btnTextActive: 'text-peru-red-light',
        badgeBg: 'bg-red-950/70 border-peru-red/40 text-red-200',
        progressFill: 'bg-gradient-to-r from-peru-red to-red-400',
        accentText: 'text-red-400',
      };
    }
    return {
      glowActive: 'shadow-[0_0_25px_rgba(0,240,255,0.45)] border-neon-cyan/80',
      pulseBorder: 'animate-[pulse-cyan_2s_cubic-bezier(0.4,0,0.6,1)_infinite]',
      barBg: 'bg-gradient-to-t from-cyan-600 via-teal-300 to-neon-cyan',
      btnTextActive: 'text-neon-cyan',
      badgeBg: 'bg-cyan-950/70 border-cyan-500/40 text-cyan-200',
      progressFill: 'bg-gradient-to-r from-cyan-500 to-neon-cyan',
      accentText: 'text-neon-cyan',
    };
  }, [effectiveTheme]);

  return (
    <div
      className={`relative inline-flex flex-col rounded-2xl transition-all duration-300 ${
        isPlaying ? themeClasses.glowActive : 'border-white/15 hover:border-white/30'
      } ${className}`}
    >
      {/* Elemento de Audio Nativo HTML5 */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
      />

      {/* Botón Principal Interactivo Glassmorphism Táctico */}
      <button
        type="button"
        onClick={togglePlay}
        disabled={isLoading}
        aria-label={`Reproducir himno oficial de ${metadata.sigla}`}
        className={`group relative overflow-hidden flex items-center gap-3.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl 
          backdrop-blur-xl bg-slate-950/75 dark:bg-[#0B101E]/80 border transition-all duration-300 cursor-pointer select-none text-left
          ${isPlaying ? `${themeClasses.pulseBorder} border-current` : 'border-white/10 hover:bg-slate-900/90'}
          active:scale-[0.98]
        `}
      >
        {/* Shimmer de fondo para estado de reproducción */}
        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />
        )}

        {/* Icono / Micro-interacción: Ecualizador de 4 barras o Icono Play */}
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10">
          {isPlaying ? (
            /* Ecualizador animado táctico (4 barras con frecuencias asíncronas) */
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
                isPlaying ? themeClasses.btnTextActive : 'text-slate-100 group-hover:text-white'
              }`}
            >
              {isPlaying ? 'PAUSAR HIMNO OFICIAL' : 'ESCUCHAR HIMNO OFICIAL'}
            </span>

            {/* Badge de Sigla */}
            <span
              className={`text-[10px] font-rajdhani font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider ${themeClasses.badgeBg}`}
            >
              {metadata.sigla}
            </span>
          </div>

          <span className="text-[11px] font-inter text-slate-300 dark:text-slate-400 truncate max-w-[210px] sm:max-w-[280px]">
            {isPlaying
              ? `${formatearTiempo(currentTime)} / ${formatearTiempo(duration)} · EBU R128 (-14 LUFS)`
              : metadata.titulo}
          </span>
        </div>

        {/* Indicador de Estado Play / Pause a la derecha */}
        <div className="ml-auto pl-2 flex items-center text-slate-400 group-hover:text-slate-200">
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current opacity-80" />
          ) : (
            <Play className="w-4 h-4 fill-current opacity-60 group-hover:opacity-100 transition-opacity" />
          )}
        </div>

        {/* Barra de progreso sutil al fondo del botón */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 overflow-hidden">
            <div
              className={`h-full transition-all duration-200 ease-linear ${themeClasses.progressFill}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </button>

      {/* Alerta discreta en caso de archivo no descargado aún */}
      {audioError && (
        <div className="mt-1.5 px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-200 text-[11px] font-inter flex items-center gap-1.5 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
          <span>{audioError}</span>
        </div>
      )}

      {/* Inyección de Keyframes de Animación Táctica (Cero dependencias externas) */}
      <style>{`
        @keyframes eq-bar-1 {
          0% { height: 25%; }
          100% { height: 95%; }
        }
        @keyframes eq-bar-2 {
          0% { height: 40%; }
          100% { height: 100%; }
        }
        @keyframes eq-bar-3 {
          0% { height: 15%; }
          100% { height: 85%; }
        }
        @keyframes eq-bar-4 {
          0% { height: 30%; }
          100% { height: 90%; }
        }
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
