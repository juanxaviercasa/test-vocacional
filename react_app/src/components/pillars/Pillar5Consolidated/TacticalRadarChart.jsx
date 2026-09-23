import React from 'react';

export default function TacticalRadarChart({ userScores, idealScores, labels }) {
  const size = 320;
  const center = size / 2;
  const radius = center - 45;
  const axes = labels || ["Estabilidad", "Liderazgo", "Estrategia", "Disciplina", "Afinidad Rama", "Académico"];
  const totalAxes = axes.length;

  // Convertir score (0-100) a coordenadas (x, y)
  const getCoordinates = (value, index) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Crear cadena de puntos SVG para el polígono
  const userPoints = (userScores || [70, 75, 65, 85, 80, 75])
    .map((val, i) => {
      const { x, y } = getCoordinates(val, i);
      return `${x},${y}`;
    })
    .join(" ");

  const idealPoints = (idealScores || [80, 80, 70, 90, 85, 85])
    .map((val, i) => {
      const { x, y } = getCoordinates(val, i);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Círculos concéntricos de referencia */}
        {[0.25, 0.5, 0.75, 1].map((level, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            strokeDasharray={level === 1 ? "none" : "3 3"}
          />
        ))}

        {/* Ejes radiales y etiquetas */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(100, i);
          const labelCoords = getCoordinates(115, i);
          return (
            <g key={i}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1"
              />
              <text
                x={labelCoords.x}
                y={labelCoords.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] font-rajdhani font-bold fill-slate-300 uppercase tracking-wider"
              >
                {axis}
              </text>
            </g>
          );
        })}

        {/* Polígono Perfil Ideal (Dorado translúcido) */}
        <polygon
          points={idealPoints}
          fill="rgba(255, 215, 0, 0.12)"
          stroke="#FFD700"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Polígono Postulante (Cian Neón) */}
        <polygon
          points={userPoints}
          fill="rgba(0, 240, 255, 0.25)"
          stroke="#00F0FF"
          strokeWidth="2"
          className="filter drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
        />

        {/* Puntos de datos del Postulante */}
        {(userScores || [70, 75, 65, 85, 80, 75]).map((val, i) => {
          const { x, y } = getCoordinates(val, i);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#00F0FF"
              stroke="#0B101E"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>

      {/* Leyenda del Radar */}
      <div className="flex items-center gap-6 mt-4 text-xs font-rajdhani font-bold uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-neon-cyan shadow-cyan-glow"></span>
          <span className="text-white">Vector Postulante</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border border-dashed border-gold-primary bg-yellow-400/20"></span>
          <span className="text-yellow-400">Perfil Ideal Escuela</span>
        </div>
      </div>
    </div>
  );
}
