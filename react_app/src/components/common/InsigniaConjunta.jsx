import React from 'react';

/**
 * Insignia Conjunta de las Fuerzas Armadas del Perú
 * Emblema heráldico vectorial moderno que unifica:
 * 1. Alas supersónicas extendidas de la Fuerza Aérea del Perú (FAP)
 * 2. Ancla naval y corona náutica de la Marina de Guerra del Perú (MGP)
 * 3. Sol Inti Radiante y Espadas/Estrella dorada del Ejército del Perú (EP)
 * 4. Escudo Heráldico Bicolor Peruano (Rojo Bandera #D91023 y Blanco)
 */
export default function InsigniaConjunta({ className = "w-10 h-10", glow = true }) {
  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 select-none ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-peru-red/20 dark:bg-peru-red/30 rounded-full blur-md pointer-events-none scale-110" />
      )}
      
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-md"
        aria-label="Insignia Conjunta Fuerzas Armadas del Perú"
      >
        <defs>
          {/* Gradiente Rojo Peruano */}
          <linearGradient id="peruRedGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#D91023" />
            <stop offset="100%" stopColor="#990B19" />
          </linearGradient>

          {/* Gradiente Dorado Militar / Sol Inti */}
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>

          {/* Gradiente Plateado Acero Alas FAP */}
          <linearGradient id="steelWingsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="60%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Sombra heráldica */}
          <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* ==============================================================
            1. FUERZA AÉREA: ALAS EXTENDIDAS SUPERSÓNICAS (FAP)
            ============================================================== */}
        <g id="alas-fap" filter="url(#shadowFilter)">
          {/* Ala Izquierda */}
          <path
            d="M 60 48 L 14 36 L 6 44 L 28 54 L 8 58 L 18 66 L 44 68 L 56 62 Z"
            fill="url(#steelWingsGrad)"
            stroke="#CBD5E1"
            strokeWidth="0.8"
          />
          {/* Plumas interiores izquierda */}
          <path
            d="M 28 54 L 46 62 M 18 66 L 48 66"
            stroke="#64748B"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Ala Derecha */}
          <path
            d="M 60 48 L 106 36 L 114 44 L 92 54 L 112 58 L 102 66 L 76 68 L 64 62 Z"
            fill="url(#steelWingsGrad)"
            stroke="#CBD5E1"
            strokeWidth="0.8"
          />
          {/* Plumas interiores derecha */}
          <path
            d="M 92 54 L 74 62 M 102 66 L 72 66"
            stroke="#64748B"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        {/* ==============================================================
            2. MARINA DE GUERRA: ANCLA NAVAL SUTIL (MGP)
            ============================================================== */}
        <g id="ancla-naval">
          {/* Ojo/Argolla superior del ancla */}
          <circle cx="60" cy="24" r="5" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" />
          {/* Travesaño horizontal */}
          <path d="M 50 32 L 70 32" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="square" />
          <circle cx="49" cy="32" r="1.5" fill="#D4AF37" />
          <circle cx="71" cy="32" r="1.5" fill="#D4AF37" />
          {/* Caña vertical */}
          <path d="M 60 29 L 60 88" stroke="url(#goldGrad)" strokeWidth="3.5" />
          {/* Brazos inferiores del ancla */}
          <path
            d="M 40 76 Q 60 98 80 76"
            stroke="url(#goldGrad)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Uñas del ancla */}
          <polygon points="38,72 44,78 35,80" fill="url(#goldGrad)" />
          <polygon points="82,72 76,78 85,80" fill="url(#goldGrad)" />
        </g>

        {/* ==============================================================
            3. ESCUDO HERÁLDICO CENTRAL BICOLOR PERUANO
            ============================================================== */}
        <g id="escudo-nacional" filter="url(#shadowFilter)">
          {/* Borde exterior del escudo */}
          <path
            d="M 42 38 L 78 38 Q 80 64 60 86 Q 40 64 42 38 Z"
            fill="#1E293B"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
          />

          {/* Campo Izquierdo Rojo */}
          <path
            d="M 43 39 L 52 39 Q 53 65 60 84 Q 41.5 64 43 39 Z"
            fill="url(#peruRedGrad)"
          />

          {/* Campo Central Blanco */}
          <path
            d="M 52 39 L 68 39 Q 67 65 60 84 Q 53 65 52 39 Z"
            fill="#F8FAFC"
          />

          {/* Campo Derecho Rojo */}
          <path
            d="M 68 39 L 77 39 Q 78.5 64 60 84 Q 67 65 68 39 Z"
            fill="url(#peruRedGrad)"
          />

          {/* Filete heráldico interior dorado */}
          <path
            d="M 45 41 L 75 41 Q 76 63 60 82 Q 44 63 45 41 Z"
            stroke="url(#goldGrad)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.8"
          />
        </g>

        {/* ==============================================================
            4. EJÉRCITO DEL PERÚ: SOL INTI RADIANTE / ESTRELLA (EP)
            ============================================================== */}
        <g id="sol-ejercito">
          {/* Rayos del Sol Radiante */}
          <g stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round">
            <line x1="60" y1="9" x2="60" y2="15" />
            <line x1="60" y1="29" x2="60" y2="35" />
            <line x1="48" y1="22" x2="54" y2="22" />
            <line x1="66" y1="22" x2="72" y2="22" />
            <line x1="51.5" y1="13.5" x2="55.5" y2="17.5" />
            <line x1="68.5" y1="13.5" x2="64.5" y2="17.5" />
            <line x1="51.5" y1="30.5" x2="55.5" y2="26.5" />
            <line x1="68.5" y1="30.5" x2="64.5" y2="26.5" />
          </g>

          {/* Centro del Sol / Estrella de 5 puntas dorada */}
          <circle cx="60" cy="22" r="5" fill="url(#goldGrad)" stroke="#78350F" strokeWidth="0.5" />
          
          {/* Estrella central del blasón */}
          <polygon
            points="60,48 62,54 68,54 63,58 65,64 60,60 55,64 57,58 52,54 58,54"
            fill="url(#goldGrad)"
            stroke="#92400E"
            strokeWidth="0.5"
            filter="url(#shadowFilter)"
          />
        </g>

        {/* Pequeña corona de laureles dorados en la base */}
        <g id="laureles" opacity="0.9">
          <path
            d="M 44 86 Q 60 94 76 86"
            stroke="url(#goldGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="48" cy="88" r="1.2" fill="#D4AF37" />
          <circle cx="60" cy="92" r="1.5" fill="#D4AF37" />
          <circle cx="72" cy="88" r="1.2" fill="#D4AF37" />
        </g>
      </svg>
    </div>
  );
}
