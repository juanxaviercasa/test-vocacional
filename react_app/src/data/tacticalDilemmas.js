/**
 * Banco de Dilemas Tácticos e Intereses Operacionales (Pilar 3)
 * Evalúa afinidad real con los teatros de operaciones de las FFAA y PNP.
 * Admite variantes dinámicas adaptadas según restricciones físicas (uso de lentes, edad, estatura).
 */

export const TACTICAL_DILEMMAS = [
  {
    id: "DIL_01",
    titulo: "Respuesta ante Desastre Natural en Alta Montaña",
    teatro: "ANDES PERUANOS // ALTA MONTAÑA",
    bgImage: "/assets/dilemmas/dilemma-mountain-rescue.jpg",
    escenario: "Un sismo de gran magnitud incomunica varias comunidades en los Andes peruanos, destruyendo carreteras y puentes. Tu brigada debe ser desplegada de inmediato para mitigar la emergencia con apoyo aerotransportado y rescate terrestre.",
    opciones: [
      {
        id: "A",
        titulo: "Puente Aéreo Táctico",
        texto: "Pilotar o tripular helicópteros y aviones de transporte para desplegar víveres, hospitales de campaña y evacuar heridos graves desde pistas no preparadas.",
        rama: "FAP",
        requiresFlight: true,
        escuelas: ["EOFAP", "ESOFA"],
        variantes: {
          conLentes: {
            titulo: "Coordinación y Logística Aérea en Tierra",
            texto: "Dirigir desde el puesto de mando en tierra la estiba de suministros, planes de vuelo humanitarios, despacho de aeronaves y mantenimiento de aviónica en hangares de campaña.",
            escuelas: ["EOFAP (Servicios)", "ESOFA"],
            badge: "TIERRA & LOGÍSTICA"
          },
          suboficial: {
            titulo: "Especialista Técnico de Mantenimiento y Rescate (ESOFA)",
            texto: "Operar como especialista de la ESOFA en pista de avanzada: abastecimiento de combustible de aviación, chequeo prevuelo de helicópteros y soporte de carga táctica.",
            escuelas: ["ESOFA"],
            badge: "TÉCNICO ESOFA"
          },
          suboficialConLentes: {
            titulo: "Soporte Técnico de Comunicaciones y Aviónica en Base (ESOFA)",
            texto: "Garantizar la operatividad de los radioenlaces tierra-aire, telemetría meteorológica y mantenimiento de sistemas eléctricos de rescate en la base de despliegue.",
            escuelas: ["ESOFA"],
            badge: "AVIÓNICA EN TIERRA"
          }
        }
      },
      {
        id: "B",
        titulo: "Operación de Rescate Terrestre",
        texto: "Marchar a la vanguardia de una columna de infantería motorizada y blindada para abrir caminos, brindar seguridad perimétrica y auxiliar poblados aislados.",
        rama: "Ejército",
        escuelas: ["EMCH", "ETE"],
        variantes: {
          suboficial: {
            titulo: "Mecatrónica de Convoyes y Zapadores Terrestres (ETE)",
            texto: "Operar maquinaria de ingenieros del Ejército, vehículos tácticos multipropósito y equipos de demolición técnica para habilitar pasos viales bloqueados.",
            escuelas: ["ETE"],
            badge: "ESPECIALISTA ETE"
          }
        }
      },
      {
        id: "C",
        titulo: "Despliegue Naval y Fluvial",
        texto: "Operar lanchas rápidas y buques de apoyo logístico a lo largo de los ríos navegables para abastecer a las zonas fluviales con generadores y potabilizadoras.",
        rama: "Marina",
        escuelas: ["ENP", "CITEN"],
        variantes: {
          suboficial: {
            titulo: "Mando de Máquinas y Operación Fluvial (CITEN)",
            texto: "Operar los sistemas de propulsión de buques auxiliares, generadores eléctricos de emergencia y mantenimiento electromecánico de embarcaciones menores.",
            escuelas: ["CITEN"],
            badge: "ESPECIALISTA CITEN"
          }
        }
      },
      {
        id: "D",
        titulo: "Control de Orden y Seguridad Ciudadana",
        texto: "Desplegarte en los núcleos urbanos y centros de distribución para prevenir disturbios, saqueos y restablecer la ley y la calma comunitaria.",
        rama: "PNP",
        escuelas: ["EO-PNP", "EESTP"],
        variantes: {
          suboficial: {
            titulo: "Patrullaje Integrado y Rescate de Emergencia (EESTP)",
            texto: "Intervención operativa directa en terreno para auxiliar a damnificados, coordinar evacuaciones comunitarias y custodiar depósitos de ayuda humanitaria.",
            escuelas: ["EESTP-PNP"],
            badge: "OPERATIVO EESTP"
          }
        }
      }
    ]
  },
  {
    id: "DIL_02",
    titulo: "Intercepción de Tráfico Ilícito Transnacional",
    teatro: "MAR DE GRAU // 200 MILLAS TERRITORIALES",
    bgImage: "/assets/dilemmas/dilemma-maritime-patrol.jpg",
    escenario: "Se detecta una red transnacional movilizando cargamentos clandestinos que vulneran la soberanía marítima y aérea del Perú. ¿Qué teatro operativo decides comandar?",
    opciones: [
      {
        id: "A",
        titulo: "Interdicción de Intercepción Aérea",
        texto: "Despegar en aeronaves de caza o turbohélice de interceptación para forzar el aterrizaje de aeronaves hostiles que violan el espacio aéreo nacional.",
        rama: "FAP",
        requiresFlight: true,
        escuelas: ["EOFAP", "ESOFA"],
        variantes: {
          conLentes: {
            titulo: "Control Táctico de Intercepción Aérea (C4I)",
            texto: "Guiar desde el centro de control y radares de alerta temprana a las aeronaves de combate, interpretando vectores de interceptación y telemetría de vuelo en tiempo real.",
            escuelas: ["EOFAP (Servicios)", "ESOFA"],
            badge: "RADAR Y CONTROL C4I"
          },
          suboficial: {
            titulo: "Especialista en Armamento y Municionamiento Aéreo (ESOFA)",
            texto: "Preparar, calibrar y montar los sistemas de armas, pods de reconocimiento y cámaras térmicas en las aeronaves de interdicción en la línea de vuelo.",
            escuelas: ["ESOFA"],
            badge: "ARMERO ESOFA"
          },
          suboficialConLentes: {
            titulo: "Mantenimiento de Sensores y Radares Terrestres (ESOFA)",
            texto: "Operar y calibrar estaciones terrestres de radar secundario, radiofaros y enlaces satelitales fijos para la detección de pistas clandestinas.",
            escuelas: ["ESOFA"],
            badge: "ELECTRÓNICA EN TIERRA"
          }
        }
      },
      {
        id: "B",
        titulo: "Patrullaje Marítimo en las 200 Millas",
        texto: "Embarcarte en una fragata misilera o guardacostas en mar territorial para ejecutar maniobras de abordaje táctico a buques extranjeros ilegales.",
        rama: "Marina",
        escuelas: ["ENP", "CITEN"],
        variantes: {
          suboficial: {
            titulo: "Operador de Lanchas de Interdicción y Armas (CITEN)",
            texto: "Tripular botes de asalto marítimo rápido, operar ametralladoras pesadas de cubierta y realizar abordajes directos a embarcaciones sospechosas.",
            escuelas: ["CITEN"],
            badge: "INTERDICCIÓN CITEN"
          }
        }
      },
      {
        id: "C",
        titulo: "Incursión Táctica en Selva / VRAEM",
        texto: "Comandar una patrulla de fuerzas especiales en selva agreste para neutralizar campamentos armados clandestinos y pistas clandestinas terrestres.",
        rama: "Ejército",
        escuelas: ["EMCH", "ETE"],
        variantes: {
          suboficial: {
            titulo: "Especialista de Combate y Comunicaciones en Selva (ETE)",
            texto: "Desplegarte como operador de radio táctico VHF/HF y tirador selecto en patrullas contraterroristas en el valle de los ríos Apurímac, Ene y Mantaro.",
            escuelas: ["ETE"],
            badge: "COMBATE ETE"
          }
        }
      },
      {
        id: "D",
        titulo: "Investigación e Inteligencia Antidrogas",
        texto: "Ejecutar operaciones encubiertas de alta precisión en puertos, aeropuertos y carreteras para desarticular cabecillas y organizaciones criminales.",
        rama: "PNP",
        escuelas: ["EO-PNP", "EESTP"],
        variantes: {
          suboficial: {
            titulo: "Agente de Intervención Táctica Antinarcóticos (EESTP)",
            texto: "Ejecutar allanamientos sorpresivos, registro de contenedores de carga y custodia de estupefacientes incautados en operativos especiales de la DIRANDRO.",
            escuelas: ["EESTP-PNP"],
            badge: "TÁCTICO EESTP"
          }
        }
      }
    ]
  },
  {
    id: "DIL_03",
    titulo: "Defensa Tecnológica y Guerra Electrónica",
    teatro: "CIBERDEFENSA & RADARES // COMANDO CONJUNTO",
    bgImage: "/assets/dilemmas/dilemma-electronic-defense.jpg",
    escenario: "Una amenaza cibernética y electromagnética intenta anular las comunicaciones de defensa del país durante un ejercicio trinacional de alta complejidad.",
    opciones: [
      {
        id: "A",
        titulo: "Guerra Electrónica y Radares Aéreos",
        texto: "Operar sistemas de radar tridimensional de alerta temprana, contramedidas electrónicas y enlace de datos aire-tierra de vanguardia.",
        rama: "FAP",
        requiresFlight: false,
        escuelas: ["EOFAP", "ESOFA"],
        variantes: {
          conLentes: {
            titulo: "Ciberseguridad Aeroespacial y Análisis SIGINT",
            texto: "Blindar los servidores y satélites de defensa militar (PerúSAT-1), descifrar transmisiones enemigas y neutralizar intrusiones cibernéticas desde búnkers fortificados.",
            escuelas: ["EOFAP (Ingeniería)", "ESOFA"],
            badge: "CIBERDEFENSA FAP"
          },
          suboficial: {
            titulo: "Técnico en Aviónica y Diagnóstico Telemático (ESOFA)",
            texto: "Probar microcircuitos de a bordo, consolas digitales multifunción y enlaces datalink de las aeronaves mediante instrumental de laboratorio.",
            escuelas: ["ESOFA"],
            badge: "AVIÓNICA ESOFA"
          },
          suboficialConLentes: {
            titulo: "Técnico en Mantenimiento de Cómputo y Servidores FAP (ESOFA)",
            texto: "Administrar la infraestructura de servidores tácticos, cableado de fibra óptica y sistemas de energía ininterrumpida de los centros de control aéreo.",
            escuelas: ["ESOFA"],
            badge: "SOPORTE DIGITAL ESOFA"
          }
        }
      },
      {
        id: "B",
        titulo: "Sistemas Sonar y Criptografía Submarina",
        texto: "Monitorear acústica pasiva y activa en submarinos Tipo 209 y sistemas de mando y control naval computarizados bajo el mar.",
        rama: "Marina",
        escuelas: ["ENP", "CITEN"],
        variantes: {
          suboficial: {
            titulo: "Técnico Sonarista y Electromecánico Naval (CITEN)",
            texto: "Operar los hidrófonos de profundidad, calibrar sensores de telemetría acústica y reparar sistemas electrónicos en buques y submarinos.",
            escuelas: ["CITEN"],
            badge: "SONARISTA CITEN"
          }
        }
      },
      {
        id: "C",
        titulo: "Comunicaciones Tácticas de Campaña",
        texto: "Establecer redes satelitales blindadas e inhibidores de señales para unidades de artillería e infantería en el frente de batalla.",
        rama: "Ejército",
        escuelas: ["EMCH", "ETE"],
        variantes: {
          suboficial: {
            titulo: "Técnico en Telecomunicaciones y Enlaces Satelitales (ETE)",
            texto: "Instalar antenas parabólicas de campaña, radios tácticos con salto de frecuencia y centros de transmisión para blindados en primera línea.",
            escuelas: ["ETE"],
            badge: "COMUNICACIONES ETE"
          }
        }
      },
      {
        id: "D",
        titulo: "División de Delitos de Alta Tecnología (DIVINDAT)",
        texto: "Rastrear ciberdelitos, ataques a infraestructuras críticas del Estado y evidencia forense digital para llevar a juicio a los agresores.",
        rama: "PNP",
        escuelas: ["EO-PNP", "EESTP"],
        variantes: {
          suboficial: {
            titulo: "Perito Técnico de Extracción Forense Digital (EESTP)",
            texto: "Extracción y clonación pericial de memorias, telefonía móvil y discos duros incautados en operativos contra el crimen organizado y extorsión.",
            escuelas: ["EESTP-PNP"],
            badge: "INFORMÁTICA FORENSE"
          }
        }
      }
    ]
  },
  {
    id: "DIL_04",
    titulo: "Misión de Paz y Estabilidad Internacional (ONU)",
    teatro: "DESPLIEGUE INTERNACIONAL // CASCOS AZULES PERÚ",
    bgImage: "/assets/dilemmas/dilemma-peacekeepers.jpg",
    escenario: "El Perú enviará un contingente de Cascos Azules de las Fuerzas Armadas a una zona de conflicto en el extranjero bajo mandato de las Naciones Unidas.",
    opciones: [
      {
        id: "A",
        titulo: "Comandante de Base y Fuerza de Choque",
        texto: "Asegurar el perímetro de campamentos de refugiados y disuadir a milicias armadas mediante patrullajes armados y disciplina de combate.",
        rama: "Ejército",
        escuelas: ["EMCH", "ETE"],
        variantes: {
          suboficial: {
            titulo: "Conductor Mecánico de Blindados y Fortificaciones (ETE)",
            texto: "Conducir vehículos blindados de transporte de personal con distintivos ONU y construir puestos de observación fortificados en puntos calientes.",
            escuelas: ["ETE"],
            badge: "MECÁNICO BLINDADOS ETE"
          }
        }
      },
      {
        id: "B",
        titulo: "Seguridad Marítima de Convoyes",
        texto: "Proteger buques mercantes con ayuda alimentaria contra la piratería marítima en corredores internacionales estratégicos.",
        rama: "Marina",
        escuelas: ["ENP", "CITEN"],
        variantes: {
          suboficial: {
            titulo: "Especialista de Artillería y Cubierta Naval (CITEN)",
            texto: "Operar cañones automáticos de defensa cercana, equipos contraincendios y maniobras de embarcaciones menores en alta mar.",
            escuelas: ["CITEN"],
            badge: "OPERATIVO CITEN"
          }
        }
      },
      {
        id: "C",
        titulo: "Evacuación Aeromédica (MEDEVAC)",
        texto: "Realizar misiones de extracción de heridos en helicópteros de rescate bajo fuego hostil hasta los centros hospitalarios de retaguardia.",
        rama: "FAP",
        requiresFlight: true,
        escuelas: ["EOFAP", "ESOFA"],
        variantes: {
          conLentes: {
            titulo: "Coordinación de Operaciones Aeromédicas en Puesto de Mando",
            texto: "Planificar los corredores aéreos de rescate, coordinar el triage de heridos con médicos de la ONU y supervisar la logística de oxígeno y suministros aéreos.",
            escuelas: ["EOFAP (Servicios)", "ESOFA"],
            badge: "GESTIÓN DE RESCATE"
          },
          suboficial: {
            titulo: "Técnico Mecánico de Vuelo y Rescatista Aeromédico (ESOFA)",
            texto: "Inspeccionar las turbinas del helicóptero entre misiones y asistir en la izada de camillas mediante grúa de rescate táctica.",
            escuelas: ["ESOFA"],
            badge: "TÉCNICO VUELO ESOFA"
          },
          suboficialConLentes: {
            titulo: "Soporte de Equipamiento Médico y Mantenimiento Terrestre (ESOFA)",
            texto: "Calibrar y mantener los sistemas de soporte vital aéreo, compresores de oxígeno e instrumentación de electromedicina en el hangar de la misión.",
            escuelas: ["ESOFA"],
            badge: "LOGÍSTICA MÉDICA"
          }
        }
      },
      {
        id: "D",
        titulo: "Policía Civil de Naciones Unidas (UNPOL)",
        texto: "Capacitar a fuerzas locales, supervisar el respeto a los derechos humanos y restablecer comisarías en comunidades devastadas.",
        rama: "PNP",
        escuelas: ["EO-PNP", "EESTP"],
        variantes: {
          suboficial: {
            titulo: "Monitor Táctico de Intervención Policial Comunitaria (EESTP)",
            texto: "Patrullaje preventivo de caseríos, mediación en conflictos civiles locales y entrenamiento práctico de defensa personal a agentes policiales anfitriones.",
            escuelas: ["EESTP-PNP"],
            badge: "MONITOR EESTP"
          }
        }
      }
    ]
  }
];

/**
 * Resuelve y adapta las opciones de un dilema según las restricciones biométricas del usuario.
 * @param {Object} dilemma - Objeto dilema original
 * @param {Object} restrictions - Restricciones del usuario ({ hasGlasses, isSubofficerOnly, isOfficerExcluded })
 * @returns {Array} Opciones adaptadas con metadatos de adaptación
 */
export function resolveDilemmaOptions(dilemma, restrictions = {}) {
  const {
    hasGlasses = false,
    isSubofficerOnly = false
  } = restrictions;

  return dilemma.opciones.map(opt => {
    let chosenVariant = null;
    let badgeText = null;

    if (isSubofficerOnly && hasGlasses && opt.variantes?.suboficialConLentes) {
      chosenVariant = opt.variantes.suboficialConLentes;
      badgeText = chosenVariant.badge || "TÉCNICO EN TIERRA";
    } else if (isSubofficerOnly && opt.variantes?.suboficial) {
      chosenVariant = opt.variantes.suboficial;
      badgeText = chosenVariant.badge || "ESCALAFÓN SUBOFICIAL";
    } else if (hasGlasses && opt.variantes?.conLentes) {
      chosenVariant = opt.variantes.conLentes;
      badgeText = chosenVariant.badge || "PERFIL TIERRA / SERVICIOS";
    }

    if (chosenVariant) {
      return {
        ...opt,
        titulo: chosenVariant.titulo || opt.titulo,
        texto: chosenVariant.texto || opt.texto,
        escuelas: chosenVariant.escuelas || opt.escuelas,
        isAdapted: true,
        adaptationBadge: badgeText
      };
    }

    // Si el usuario está descartado de oficiales pero la opción no tiene variante explícita,
    // garantizamos que las escuelas mostradas reflejen únicamente el escalafón de suboficiales:
    let escuelas = opt.escuelas;
    if (isSubofficerOnly) {
      escuelas = opt.escuelas.filter(e => !["EOFAP", "EMCH", "ENP", "EO-PNP"].includes(e));
      if (escuelas.length === 0) {
        if (opt.rama === "FAP") escuelas = ["ESOFA"];
        else if (opt.rama === "Ejército") escuelas = ["ETE"];
        else if (opt.rama === "Marina") escuelas = ["CITEN"];
        else if (opt.rama === "PNP") escuelas = ["EESTP"];
      }
    }

    return {
      ...opt,
      escuelas,
      isAdapted: false,
      adaptationBadge: null
    };
  });
}

/**
 * Retorna todos los dilemas con sus opciones adaptadas.
 */
export function getAdaptedDilemmas(dilemmas, restrictions = {}) {
  return (dilemmas || TACTICAL_DILEMMAS).map(d => ({
    ...d,
    opciones: resolveDilemmaOptions(d, restrictions)
  }));
}
