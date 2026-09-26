/**
 * Banco de Reactivos de Facultades Cognitivas Superiores
 * - Factor 'g' (Inteligencia Fluida / Matrices Abstractas tipo Raven)
 * - Aptitud Mecánica Táctica (Test Bennett: poleas, engranajes, hidrostática, palancas)
 */

export const COGNITIVE_QUESTIONS = [
  // 1. FACTOR 'G' / MATRICES RAVEN
  {
    id: "COG_RAV_01",
    tipo: "RAVEN_MATRIZ",
    categoria: "Rotación Espacial y Simetría",
    enunciado: "Se observa una matriz de 3x3 donde una figura geométrica gira 45° en sentido horario fila por fila, mientras que sus líneas diagonales internas se alternan entre sólidas y discontinuas.",
    subtexto: "Fila 1: 0° sólida -> 45° discontinua -> 90° sólida. Fila 2: 90° discontinua -> 135° sólida -> 180° discontinua. En la Fila 3, el segundo elemento está a 225° discontinua. ¿Cuál completa la matriz?",
    opciones: [
      { id: "A", texto: "Figura a 270° con líneas diagonales sólidas", esCorrecta: true },
      { id: "B", texto: "Figura a 270° con líneas diagonales discontinuas", esCorrecta: false },
      { id: "C", texto: "Figura a 315° con líneas diagonales sólidas", esCorrecta: false },
      { id: "D", texto: "Figura a 225° invertida con líneas sólidas", esCorrecta: false }
    ],
    tiempoSegundos: 35,
    explicacion: "Cada paso rota 45° horario (+45°) y la alternancia pasa de discontinua a sólida: 225° + 45° = 270° sólida."
  },
  {
    id: "COG_RAV_02",
    tipo: "RAVEN_MATRIZ",
    categoria: "Suma y Resta Lógica Booleana (XOR)",
    enunciado: "En una fila de figuras, el tercer casillero resulta de la superposición de los dos primeros, conservando ÚNICAMENTE los trazos que NO coinciden en ambos (operación XOR o diferencia simétrica).",
    subtexto: "Casillero 1 tiene un círculo y una cruz central (+). Casillero 2 tiene un círculo y una diagonal (/). ¿Qué figura ocupa el Casillero 3?",
    opciones: [
      { id: "A", texto: "El círculo desaparece; queda la cruz (+) y la diagonal (/)", esCorrecta: true },
      { id: "B", texto: "El círculo se conserva con la cruz (+) y la diagonal (/)", esCorrecta: false },
      { id: "C", texto: "Solo se conserva el círculo exterior vacío", esCorrecta: false },
      { id: "D", texto: "La figura queda completamente en blanco", esCorrecta: false }
    ],
    tiempoSegundos: 40,
    explicacion: "Al aplicar la resta lógica XOR, el elemento compartido (círculo) se anula y los elementos únicos (cruz y diagonal) se preservan."
  },
  {
    id: "COG_RAV_03",
    tipo: "RAVEN_MATRIZ",
    categoria: "Progresión Cuantitativa de Elementos",
    enunciado: "Una cuadrícula presenta polígonos regulares donde el número de vértices exteriores aumenta en 1 horizontalmente, mientras que los puntos negros interiores disminuyen en 1 verticalmente.",
    subtexto: "Si la casilla evaluada se encuentra en la posición (Fila 3, Columna 3), y partió en (1,1) con triángulo y 4 puntos:",
    opciones: [
      { id: "A", texto: "Pentágono con 2 puntos negros interiores", esCorrecta: true },
      { id: "B", texto: "Hexágono con 1 punto negro interior", esCorrecta: false },
      { id: "C", texto: "Cuadrado con 3 puntos negros interiores", esCorrecta: false },
      { id: "D", texto: "Pentágono con 1 punto negro interior", esCorrecta: false }
    ],
    tiempoSegundos: 30,
    explicacion: "Vértices: Triángulo (3) -> Cuadrilátero (4) -> Pentágono (5). Puntos: 4 -> 3 -> 2. Resultado: Pentágono con 2 puntos."
  },

  // 2. APTITUD MECÁNICA Y TÉCNICA (BENNETT)
  {
    id: "COG_MEC_01",
    tipo: "BENNETT_MECANICA",
    categoria: "Engranajes y Transmisión de Potencia",
    enunciado: "Un tren de engranajes recto en una lancha de interdicción marítima tiene el Engranaje A (motriz, 20 dientes) girando en sentido HORARIO a 120 RPM. Engrana con B (40 dientes), y este a su vez con C (60 dientes).",
    subtexto: "¿Cuál es el sentido de giro y la velocidad angular del Engranaje C?",
    opciones: [
      { id: "A", texto: "Sentido Horario a 40 RPM", esCorrecta: true },
      { id: "B", texto: "Sentido Antihorario a 40 RPM", esCorrecta: false },
      { id: "C", texto: "Sentido Horario a 360 RPM", esCorrecta: false },
      { id: "D", texto: "Sentido Antihorario a 80 RPM", esCorrecta: false }
    ],
    tiempoSegundos: 35,
    explicacion: "Sentido: A (Horario) -> B (Antihorario) -> C (Horario). RPM: 120 * (20/60) = 40 RPM."
  },
  {
    id: "COG_MEC_02",
    tipo: "BENNETT_MECANICA",
    categoria: "Sistemas de Poleas y Ventaja Mecánica",
    enunciado: "Un equipo de Comandos de Selva necesita izar un cajón de pertrechos de 200 kg mediante un polipasto compuesto por 1 polea fija superior y 2 poleas móviles inferiores.",
    subtexto: "Despreciando la fricción y el peso de las cuerdas (g = 10 m/s²), ¿qué fuerza mínima en Newtons debe ejercer el operador en el extremo libre?",
    opciones: [
      { id: "A", texto: "500 N (Fuerza = Peso / 4)", esCorrecta: true },
      { id: "B", texto: "1,000 N (Fuerza = Peso / 2)", esCorrecta: false },
      { id: "C", texto: "250 N (Fuerza = Peso / 8)", esCorrecta: false },
      { id: "D", texto: "2,000 N (Fuerza = Peso)", esCorrecta: false }
    ],
    tiempoSegundos: 40,
    explicacion: "Peso = 200 kg * 10 = 2,000 N. Con 2 poleas móviles, F = 2,000 / 2² = 500 N."
  },
  {
    id: "COG_MEC_03",
    tipo: "BENNETT_MECANICA",
    categoria: "Hidrostática y Principio de Pascal en Submarinos",
    enunciado: "El sistema hidráulico de timones de inmersión de un submarino tipo 209 utiliza dos pistones comunicados por fluido incompresible. El pistón pequeño tiene radio 5 cm y el pistón mayor radio 20 cm.",
    subtexto: "Si se aplica una fuerza de 100 N en el pistón pequeño, ¿cuánta fuerza generará el pistón mayor sobre el vástago del timón?",
    opciones: [
      { id: "A", texto: "1,600 N (Multiplicación por 16)", esCorrecta: true },
      { id: "B", texto: "400 N (Multiplicación por 4)", esCorrecta: false },
      { id: "C", texto: "800 N (Multiplicación por 8)", esCorrecta: false },
      { id: "D", texto: "2,000 N (Multiplicación por 20)", esCorrecta: false }
    ],
    tiempoSegundos: 45,
    explicacion: "Razón de áreas = (r₂/r₁)² = (20/5)² = 16. F₂ = 100 N * 16 = 1,600 N."
  }
];
