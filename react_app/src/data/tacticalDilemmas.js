/**
 * Banco de Dilemas Tácticos e Intereses Operacionales (Pilar 3)
 * Evalúa afinidad real con los teatros de operaciones de las FFAA y PNP.
 */

export const TACTICAL_DILEMMAS = [
  {
    id: "DIL_01",
    titulo: "Respuesta ante Desastre Natural en Alta Montaña",
    escenario: "Un sismo de gran magnitud incomunica varias comunidades en los Andes peruanos, destruyendo carreteras y puentes. Tu brigada debe ser desplegada de inmediato para mitigar la emergencia.",
    opciones: [
      {
        id: "A",
        titulo: "Puente Aéreo Táctico",
        texto: "Pilotar o tripular helicópteros y aviones de transporte para desplegar víveres, hospitales de campaña y evacuar heridos graves desde pistas no preparadas.",
        rama: "FAP",
        escuelas: ["EOFAP", "ESOFA"]
      },
      {
        id: "B",
        titulo: "Operación de Rescate Terrestre",
        texto: "Marchar a la vanguardia de una columna de infantería motorizada y blindada para abrir caminos, brindar seguridad perimétrica y auxiliar poblados aislados.",
        rama: "Ejército",
        escuelas: ["EMCH", "ETE"]
      },
      {
        id: "C",
        titulo: "Despliegue Naval y Fluvial",
        texto: "Operar lanchas rápidas y buques de apoyo logístico a lo largo de los ríos navegables para abastecer a las zonas fluviales con generadores y potabilizadoras.",
        rama: "Marina",
        escuelas: ["ENP", "CITEN"]
      },
      {
        id: "D",
        titulo: "Control de Orden y Seguridad Ciudadana",
        texto: "Desplegarte en los núcleos urbanos y centros de distribución para prevenir disturbios, saqueos y restablecer la ley y la calma comunitaria.",
        rama: "PNP",
        escuelas: ["EO-PNP", "EESTP"]
      }
    ]
  },
  {
    id: "DIL_02",
    titulo: "Intercepción de Tráfico Ilícito Transnacional",
    escenario: "Se detecta una red transnacional movilizando cargamentos no declarados que vulneran la soberanía peruana. ¿Qué misión operativa prefieres liderar?",
    opciones: [
      {
        id: "A",
        titulo: "Interdicción de Intercepción Aérea",
        texto: "Despegar en aeronaves de caza o turbohélice de interceptación para forzar el aterrizaje de aeronaves hostiles que violan el espacio aéreo nacional.",
        rama: "FAP",
        escuelas: ["EOFAP", "ESOFA"]
      },
      {
        id: "B",
        titulo: "Patrullaje Marítimo en las 200 Millas",
        texto: "Embarcarte en una fragata misilera o guardacostas en mar territorial para ejecutar maniobras de abordaje táctico a buques extranjeros ilegales.",
        rama: "Marina",
        escuelas: ["ENP", "CITEN"]
      },
      {
        id: "C",
        titulo: "Incursión Táctica en Selva / VRAEM",
        texto: "Comandar una patrulla de fuerzas especiales en selva agreste para neutralizar campamentos armados clandestinos y pistas clandestinas terrestres.",
        rama: "Ejército",
        escuelas: ["EMCH", "ETE"]
      },
      {
        id: "D",
        titulo: "Investigación e Inteligencia Antidrogas",
        texto: "Ejecutar operaciones encubiertas de alta precisión en puertos, aeropuertos y carreteras para desarticular cabecillas y organizaciones criminales.",
        rama: "PNP",
        escuelas: ["EO-PNP", "EESTP"]
      }
    ]
  },
  {
    id: "DIL_03",
    titulo: "Defensa Tecnológica y Guerra Electrónica",
    escenario: "Una amenaza cibernética y electromagnética intenta anular las comunicaciones de defensa del país durante un ejercicio trinacional.",
    opciones: [
      {
        id: "A",
        titulo: "Guerra Electrónica y Radares Aéreos",
        texto: "Operar sistemas de radar tridimensional de alerta temprana, contramedidas electrónicas y enlace de datos aire-tierra de vanguardia.",
        rama: "FAP",
        escuelas: ["EOFAP", "ESOFA"]
      },
      {
        id: "B",
        titulo: "Sistemas Sonar y Criptografía Submarina",
        texto: "Monitorear acústica pasiva y activa en submarinos Tipo 209 y sistemas de mando y control naval computarizados bajo el mar.",
        rama: "Marina",
        escuelas: ["ENP", "CITEN"]
      },
      {
        id: "C",
        titulo: "Comunicaciones Tácticas de Campaña",
        texto: "Establecer redes satelitales blindadas e inhibidores de señales para unidades de artillería e infantería en el frente de batalla.",
        rama: "Ejército",
        escuelas: ["EMCH", "ETE"]
      },
      {
        id: "D",
        titulo: "División de Delitos de Alta Tecnología (DIVINDAT)",
        texto: "Rastrear ciberdelitos, ataques a infraestructuras críticas del Estado y evidencia forense digital para llevar a juicio a los agresores.",
        rama: "PNP",
        escuelas: ["EO-PNP", "EESTP"]
      }
    ]
  },
  {
    id: "DIL_04",
    titulo: "Misión de Paz y Estabilidad Internacional (ONU)",
    escenario: "El Perú enviará un contingente de Cascos Azules a una zona de conflicto en el extranjero. ¿En qué rol sientes tu mayor vocación?",
    opciones: [
      {
        id: "A",
        titulo: "Comandante de Base y Fuerza de Choque",
        texto: "Asegurar el perímetro de campamentos de refugiados y disuadir a milicias armadas mediante patrullajes armados y disciplina de combate.",
        rama: "Ejército",
        escuelas: ["EMCH", "ETE"]
      },
      {
        id: "B",
        titulo: "Seguridad Marítima de Convoyes",
        texto: "Proteger buques mercantes con ayuda alimentaria contra la piratería marítima en corredores internacionales estratégicos.",
        rama: "Marina",
        escuelas: ["ENP", "CITEN"]
      },
      {
        id: "C",
        titulo: "Evacuación Aeromédica (MEDEVAC)",
        texto: "Realizar misiones de extracción de heridos en helicópteros de rescate bajo fuego hostil hasta los centros hospitalarios de retaguardia.",
        rama: "FAP",
        escuelas: ["EOFAP", "ESOFA"]
      },
      {
        id: "D",
        titulo: "Policía Civil de Naciones Unidas (UNPOL)",
        texto: "Capacitar a fuerzas locales, supervisar el respeto a los derechos humanos y restablecer comisarías en comunidades devastadas.",
        rama: "PNP",
        escuelas: ["EO-PNP", "EESTP"]
      }
    ]
  }
];
