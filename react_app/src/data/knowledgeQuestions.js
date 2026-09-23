/**
 * Banco de Preguntas Académicas y Psicotécnicas con Fórmulas LaTeX (Pilar 4)
 * Compatible con KaTeX para renderizado matemático y cronómetro militar.
 */

export const KNOWLEDGE_QUESTIONS = [
  {
    id: "KNOW_01",
    area: "Ciencias Exactas",
    materia: "Física (Cinemática Balística)",
    enunciado: "Un proyectil de mortero es disparado desde el suelo con una velocidad inicial $v_0 = 100\\text{ m/s}$ formando un ángulo de $\\theta = 30^\\circ$ con la horizontal. Considerando $g = 10\\text{ m/s}^2$ y despreciando la resistencia del aire, ¿cuál es el alcance horizontal máximo $X_{\\max}$?",
    formulaLatex: "X_{\\max} = \\frac{v_0^2 \\cdot \\sin(2\\theta)}{g}",
    opciones: [
      { id: "A", texto: "500\\sqrt{3}\\text{ metros}", esCorrecta: true },
      { id: "B", texto: "250\\text{ metros}", esCorrecta: false },
      { id: "C", texto: "1000\\text{ metros}", esCorrecta: false },
      { id: "D", texto: "500\\text{ metros}", esCorrecta: false }
    ],
    explicacion: "Aplicando $X_{\\max} = \\frac{100^2 \\cdot \\sin(60^\\circ)}{10} = 1000 \\cdot \\frac{\\sqrt{3}}{2} = 500\\sqrt{3}\\text{ m}$."
  },
  {
    id: "KNOW_02",
    area: "Ciencias Exactas",
    materia: "Álgebra Lineal / Sistemas Militares",
    enunciado: "En un polígono de tiro militar se contabilizan $x$ fusiles automáticos e $y$ pistolas de puño, sumando en total 45 armas. Si el número de cartuchos requeridos para calibrar cada fusil es de 20 tiros y para cada pistola es de 10 tiros, totalizando 700 cartuchos, ¿cuántos fusiles automáticos $x$ hay en el lote?",
    formulaLatex: "\\begin{cases} x + y = 45 \\\\ 20x + 10y = 700 \\end{cases}",
    opciones: [
      { id: "A", texto: "x = 25\\text{ fusiles}", esCorrecta: true },
      { id: "B", texto: "x = 20\\text{ fusiles}", esCorrecta: false },
      { id: "C", texto: "x = 30\\text{ fusiles}", esCorrecta: false },
      { id: "D", texto: "x = 15\\text{ fusiles}", esCorrecta: false }
    ],
    explicacion: "Multiplicando la primera ecuación por 10: $10x + 10y = 450$. Restando de la segunda: $10x = 250 \\implies x = 25$."
  },
  {
    id: "KNOW_03",
    area: "Psicotécnico",
    materia: "Razonamiento Espacial / Cartografía",
    enunciado: "Una patrulla militar se desplaza desde el Puesto de Vigilancia 6 km al Norte, luego 8 km al Este y finalmente 12 km al Sur. ¿A qué distancia en línea recta se encuentra la patrulla de su punto de partida inicial?",
    formulaLatex: "d = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}",
    opciones: [
      { id: "A", texto: "10\\text{ km}", esCorrecta: true },
      { id: "B", texto: "14\\text{ km}", esCorrecta: false },
      { id: "C", texto: "12\\text{ km}", esCorrecta: false },
      { id: "D", texto: "8\\sqrt{2}\\text{ km}", esCorrecta: false }
    ],
    explicacion: "Desplazamiento neto en Y: $6 - 12 = -6\\text{ km}$ (Sur). Desplazamiento en X: $8\\text{ km}$ (Este). Por Pitágoras: $d = \\sqrt{(-6)^2 + 8^2} = \\sqrt{36 + 64} = 10\\text{ km}$."
  },
  {
    id: "KNOW_04",
    area: "Ciencias Exactas",
    materia: "Trigonometría Aplicada (Navegación)",
    enunciado: "Un radar de defensa aérea detecta una aeronave desconocida a una elevación angular de $\\alpha = 45^\\circ$ y a una distancia visual en línea de mira (hipotenusa) de $R = 1414\\text{ metros}$. Considerando $\\sqrt{2} \\approx 1.414$, ¿a qué altitud de vuelo $h$ se encuentra el objetivo?",
    formulaLatex: "h = R \\cdot \\sin(45^\\circ) = R \\cdot \\frac{\\sqrt{2}}{2}",
    opciones: [
      { id: "A", texto: "h = 1000\\text{ metros}", esCorrecta: true },
      { id: "B", texto: "h = 707\\text{ metros}", esCorrecta: false },
      { id: "C", texto: "h = 1414\\text{ metros}", esCorrecta: false },
      { id: "D", texto: "h = 1200\\text{ metros}", esCorrecta: false }
    ],
    explicacion: "Calculando: $h = 1414 \\cdot \\frac{1.414}{2} \\approx 1414 \\cdot 0.707 = 1000\\text{ m}$."
  },
  {
    id: "KNOW_05",
    area: "Humanidades",
    materia: "Historia Militar del Perú",
    enunciado: "El 8 de octubre de 1879, durante la Guerra del Pacífico, el Almirante Miguel Grau Seminario ofrendó su vida defendiendo la soberanía marítima del Perú a bordo del Monitor Huáscar en el combate de:",
    formulaLatex: "",
    opciones: [
      { id: "A", texto: "Combate de Angamos", esCorrecta: true },
      { id: "B", texto: "Combate de Iquique", esCorrecta: false },
      { id: "C", texto: "Combate del 2 de Mayo", esCorrecta: false },
      { id: "D", texto: "Batalla de Arica", esCorrecta: false }
    ],
    explicacion: "El Almirante Miguel Grau Seminario falleció heroicamente en el Combate Naval de Angamos el 8 de octubre de 1879."
  }
];
