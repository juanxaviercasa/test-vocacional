/**
 * Banco de Reactivos Psicométricos IPIP-NEO (Big Five Militar)
 * Adaptados al contexto de disciplina, resiliencia y mando de las FFAA y PNP.
 */

export const PSICOMETRIC_QUESTIONS = [
  // Neuroticismo (Estabilidad Emocional)
  {
    id: "N_01",
    enunciado: "Mantengo la calma y el autocontrol absoluto incluso en situaciones de alta presión o peligro inminente.",
    dominio: "Neuroticismo",
    polaridad: -1 // Invertida: responder 5 significa bajo neuroticismo / alta estabilidad
  },
  {
    id: "N_02",
    enunciado: "Me recupero con rapidez ante una llamada de atención severa o un revés operacional sin perder el enfoque.",
    dominio: "Neuroticismo",
    polaridad: -1
  },
  {
    id: "N_03",
    enunciado: "Suelo dudar constantemente de mis capacidades cuando debo liderar una maniobra imprevista.",
    dominio: "Neuroticismo",
    polaridad: 1
  },

  // Extraversión (Liderazgo y Energía Táctica)
  {
    id: "E_01",
    enunciado: "Asumo el mando con seguridad y voz firme cuando un grupo se encuentra desorientado.",
    dominio: "Extraversión",
    polaridad: 1
  },
  {
    id: "E_02",
    enunciado: "Me siento energizado y motivado al trabajar en equipo bajo condiciones climáticas y operativas adversas.",
    dominio: "Extraversión",
    polaridad: 1
  },
  {
    id: "E_03",
    enunciado: "Prefiero mantenerme en un segundo plano y evitar comunicarme activamente con mis camaradas.",
    dominio: "Extraversión",
    polaridad: -1
  },

  // Apertura a la Experiencia (Adaptabilidad y Razonamiento Estratégico)
  {
    id: "O_01",
    enunciado: "Me interesa comprender la tecnología militar moderna, tácticas no convencionales y nuevos sistemas de armas.",
    dominio: "Apertura",
    polaridad: 1
  },
  {
    id: "O_02",
    enunciado: "Me adapto con agilidad mental cuando las reglas del combate o del entorno cambian radicalmente.",
    dominio: "Apertura",
    polaridad: 1
  },
  {
    id: "O_03",
    enunciado: "Me incomoda tener que aprender doctrinas o métodos operativos diferentes a los tradicionales.",
    dominio: "Apertura",
    polaridad: -1
  },

  // Amabilidad (Espíritu de Cuerpo y Cohesión)
  {
    id: "A_01",
    enunciado: "Coloco el bienestar y la seguridad de mi patrulla o unidad por encima de mis comodidades personales.",
    dominio: "Amabilidad",
    polaridad: 1
  },
  {
    id: "A_02",
    enunciado: "Confío en la lealtad y el honor de mis superiores y compañeros de arma.",
    dominio: "Amabilidad",
    polaridad: 1
  },
  {
    id: "A_03",
    enunciado: "Priorizo mis intereses individuales antes de respaldar a un compañero en apuros durante el servicio.",
    dominio: "Amabilidad",
    polaridad: -1
  },

  // Responsabilidad / Conciencia (Disciplina y Escrupulosidad)
  {
    id: "C_01",
    enunciado: "Cumplo las órdenes recibidas con precisión milimétrica, sin buscar atajos ni omitir detalles del protocolo.",
    dominio: "Responsabilidad",
    polaridad: 1
  },
  {
    id: "C_02",
    enunciado: "Inspecciono meticulosamente mi equipo, uniforme y armamento antes de iniciar cualquier misión.",
    dominio: "Responsabilidad",
    polaridad: 1
  },
  {
    id: "C_03",
    enunciado: "A veces postergo tareas de mantenimiento asignadas si considero que nadie las supervisará de inmediato.",
    dominio: "Responsabilidad",
    polaridad: -1
  },

  // Escala L (Control de Mentira / Deseabilidad Social)
  {
    id: "VAL_01",
    enunciado: "Jamás en mi vida he sentido rencor, cólera o enojo hacia otra persona, ni he tenido un pensamiento egoísta.",
    dominio: "Control de Validez",
    polaridad: 1,
    esControlMentira: true
  },
  {
    id: "VAL_02",
    enunciado: "Siempre digo la verdad absoluta en todo momento, sin importar las consecuencias o dificultades que me genere.",
    dominio: "Control de Validez",
    polaridad: 1,
    esControlMentira: true
  },
  {
    id: "VAL_03",
    enunciado: "Nunca he desobedecido una orden, norma escolar o indicación de mis padres desde mi infancia.",
    dominio: "Control de Validez",
    polaridad: 1,
    esControlMentira: true
  },

  // Banderas Rojas Clínicas (Seguridad, Impulsos y Confinamiento)
  {
    id: "CLI_ARM_01",
    enunciado: "Cuando alguien me ofende gravemente, siento un impulso casi incontrolable de responder con violencia física o venganza.",
    dominio: "Control Clínico",
    polaridad: 1,
    esClinica: true,
    riesgo: "PORTE_ARMAS",
    umbral: 4
  },
  {
    id: "CLI_CLA_01",
    enunciado: "Estar encerrado en espacios reducidos y sin luz exterior (como un compartimento submarino o tanque blindado) me genera pánico y angustia extrema.",
    dominio: "Control Clínico",
    polaridad: 1,
    esClinica: true,
    riesgo: "CLAUSTROFOBIA",
    umbral: 4
  }
];

export const LIKERT_OPTIONS = [
  { value: 1, label: "Total desacuerdo", short: "1", color: "#EF4444" },
  { value: 2, label: "En desacuerdo", short: "2", color: "#F97316" },
  { value: 3, label: "Neutral / Indeciso", short: "3", color: "#94A3B8" },
  { value: 4, label: "De acuerdo", short: "4", color: "#38BDF8" },
  { value: 5, label: "Total acuerdo", short: "5", color: "#10B981" }
];
