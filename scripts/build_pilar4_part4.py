#!/usr/bin/env python3
"""
Módulo de generación de preguntas para Pilar 4: Aptitud y Conocimientos
Parte 4: Letras y Humanidades (40 preguntas: HUM_01 a HUM_40)
- Lenguaje y Comunicación (10: HUM_01 a HUM_10)
- Historia del Perú y del Mundo (14: HUM_11 a HUM_24)
- Geografía del Perú (8: HUM_25 a HUM_32)
- Educación Cívica y Derechos Humanos (8: HUM_33 a HUM_40)
"""

def get_letras_humanidades_questions():
    questions = []

    # --- LENGUAJE Y COMUNICACIÓN (10 preguntas: HUM_01 a HUM_10) ---
    q_lenguaje = [
        (
            "HUM_01", "Letras y Humanidades", "Lenguaje - Funciones del Lenguaje",
            "En la orden de operaciones: '¡Soldados, aseguren el perímetro norte inmediatamente!', ¿qué función del lenguaje predomina en el mensaje del oficial al mando?",
            [
                ("A", "Función apelativa o conativa", True),
                ("B", "Función referencial o representativa", False),
                ("C", "Función expresiva o emotiva", False),
                ("D", "Función fática o de contacto", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_02", "Letras y Humanidades", "Lenguaje - Acentuación Diacrítica",
            "Identifique la oración que presenta un uso correcto de la tilde diacrítica en la redacción de informes militares:",
            [
                ("A", "Él comandante le pidió que dé más de sí en la instrucción.", True),
                ("B", "El comandante le pidió que de mas de si en la instrucción.", False),
                ("C", "Él comandante le pidió que de más de si en la instrucción.", False),
                ("D", "El comandante le pidió que dé mas de sí en la instrucción.", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "HUM_03", "Letras y Humanidades", "Lenguaje - Concurrencia Vocálica",
            "En la palabra 'GUARDIA', empleada habitualmente en el servicio militar, ¿qué fenómeno fonético vocálico se presenta en la última sílaba?",
            [
                ("A", "Diptongo creciente", True),
                ("B", "Hiato acentual", False),
                ("C", "Diptongo decreciente", False),
                ("D", "Triptongo homogéneo", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_04", "Letras y Humanidades", "Lenguaje - Signos de Puntuación",
            "En la frase 'Cadetes, mantengan la posición hasta nueva orden', la coma utilizada después de la palabra 'Cadetes' cumple la función de:",
            [
                ("A", "Coma vocativa", True),
                ("B", "Coma elíptica", False),
                ("C", "Coma explicativa o incidental", False),
                ("D", "Coma hiperbática", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_05", "Letras y Humanidades", "Lenguaje - Formación de Palabras",
            "¿Mediante qué proceso morfológico se ha formado el término táctico 'PARACAIDISTA'?",
            [
                ("A", "Parasíntesis", True),
                ("B", "Composición propia", False),
                ("C", "Derivación simple", False),
                ("D", "Prefijación", False)
            ],
            3, ["EMCH", "EOFAP", "ENP", "CITEN"]
        ),
        (
            "HUM_06", "Letras y Humanidades", "Lenguaje - Morfología del Sustantivo y Adjetivo",
            "Señale la alternativa que presenta concordancia gramatical correcta entre sustantivo y adjetivo en el contexto castrense:",
            [
                ("A", "El capitán demostró un valor y una disciplina ejemplares.", True),
                ("B", "El capitán demostró un valor y una disciplina ejemplar.", False),
                ("C", "El capitán demostró un valor y una disciplina ejemplarmente.", False),
                ("D", "El capitán demostró unos valor y disciplina ejemplares.", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "HUM_07", "Letras y Humanidades", "Lenguaje - Accidentes del Verbo",
            "En la orden táctica 'Si las fuerzas especiales avanzaran con sigilo, sorprenderían al enemigo', los verbos subrayados se encuentran respectivamente en los modos:",
            [
                ("A", "Subjuntivo e indicativo", True),
                ("B", "Imperativo e indicativo", False),
                ("C", "Subjuntivo y potencial imperativo", False),
                ("D", "Indicativo y subjuntivo", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "HUM_08", "Letras y Humanidades", "Lenguaje - Sintaxis de la Oración",
            "En la oración 'La patrulla de rescate localizó a los náufragos en altamar', el sintagma 'a los náufragos' cumple la función sintáctica de:",
            [
                ("A", "Objeto directo", True),
                ("B", "Objeto indirecto", False),
                ("C", "Complemento circunstancial de modo", False),
                ("D", "Complemento agente", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_09", "Letras y Humanidades", "Lenguaje - Voz Pasiva y Complemento Agente",
            "En la oración en voz pasiva 'El campamento clandestino fue destruido por la brigada antiterrorista', ¿cuál es el complemento agente?",
            [
                ("A", "por la brigada antiterrorista", True),
                ("B", "fue destruido", False),
                ("C", "El campamento clandestino", False),
                ("D", "clandestino", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_10", "Letras y Humanidades", "Lenguaje - Vicios del Lenguaje",
            "En la frase 'El sargento vio al policía cuando salía de su casa', se comete el vicio de construcción conocido como:",
            [
                ("A", "Anfibología u oscuridad de sentido", True),
                ("B", "Solecismo de régimen", False),
                ("C", "Pleonasmo o redundancia", False),
                ("D", "Barbarismo ortográfico", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        )
    ]

    for item in q_lenguaje:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    # --- HISTORIA DEL PERÚ Y DEL MUNDO (14 preguntas: HUM_11 a HUM_24) ---
    q_historia = [
        (
            "HUM_11", "Letras y Humanidades", "Historia del Perú - Culturas Prehispánicas",
            "¿Qué civilización preincaica destacó por su avanzada ingeniería militar y defensiva amurallada en la costa norte, con fortalezas como Paramonga?",
            [
                ("A", "Cultura Chimú", True),
                ("B", "Cultura Chavín", False),
                ("C", "Cultura Paracas", False),
                ("D", "Cultura Vicús", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_12", "Letras y Humanidades", "Historia del Perú - Tahuantinsuyo",
            "En la organización militar del Imperio Incaico, ¿quiénes eran los mensajeros del Estado que recorrían velozmente los caminos imperiales (Qhapaq Ñan) transmitiendo órdenes estratégicas?",
            [
                ("A", "Los chasquis", True),
                ("B", "Los mitimaes", False),
                ("C", "Los curacas", False),
                ("D", "Los yanaconas", False)
            ],
            1, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_13", "Letras y Humanidades", "Historia del Perú - Rebeliones Anticoloniales",
            "La rebelión indígena y anticolonial de José Gabriel Condorcanqui (Túpac Amaru II) en 1780 se inició con la captura y ajusticiamiento del corregidor de Tinta llamado:",
            [
                ("A", "Antonio de Arriaga", True),
                ("B", "José Antonio de Areche", False),
                ("C", "Agustín de Jáuregui", False),
                ("D", "Manuel Amat y Juniet", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EO-PNP"]
        ),
        (
            "HUM_14", "Letras y Humanidades", "Historia del Perú - Independencia",
            "La consolidación definitiva de la independencia del Perú y de América del Sur se selló el 9 de diciembre de 1824 en la histórica Batalla de:",
            [
                ("A", "Ayacucho", True),
                ("B", "Junín", False),
                ("C", "Pichincha", False),
                ("D", "Boyacá", False)
            ],
            1, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_15", "Letras y Humanidades", "Historia del Perú - Primer Militarismo",
            "El presidente que impulsó la modernización militar del Perú durante la bonanza del guano adquiriendo la fragata 'Amazonas' e inaugurando la Escuela Central de Marina fue:",
            [
                ("A", "Ramón Castilla y Marquesado", True),
                ("B", "José de la Mar", False),
                ("C", "Andrés de Santa Cruz", False),
                ("D", "Felipe Santiago Salaverry", False)
            ],
            2, ["ENP", "CITEN", "EMCH", "EOFAP"]
        ),
        (
            "HUM_16", "Letras y Humanidades", "Historia del Perú - Guerra del Pacífico (Campaña Marítima)",
            "El Almirante Miguel Grau Seminario, máximo héroe naval del Perú conocido como 'El Caballero de los Mares', ofrendó su vida a bordo del monitor Huáscar en el Combate Naval de:",
            [
                ("A", "Angamos (8 de octubre de 1879)", True),
                ("B", "Iquique (21 de mayo de 1879)", False),
                ("C", "Abtao (7 de febrero de 1866)", False),
                ("D", "Callao (2 de mayo de 1866)", False)
            ],
            1, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_17", "Letras y Humanidades", "Historia del Perú - Guerra del Pacífico (Campaña Terrestre)",
            "El Coronel Francisco Bolognesi Cervantes pronunció su célebre frase 'Tengo deberes sagrados que cumplir y los cumpliré hasta quemar el último cartucho' en la defensa de:",
            [
                ("A", "El Morro de Arica (7 de junio de 1880)", True),
                ("B", "El Alto de la Alianza (26 de mayo de 1880)", False),
                ("C", "Tarapacá (27 de noviembre de 1879)", False),
                ("D", "Miraflores (15 de enero de 1881)", False)
            ],
            1, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_18", "Letras y Humanidades", "Historia del Perú - Resistencia de la Breña",
            "¿Qué caudillo militar peruano, conocido como 'El Brujo de los Andes', lideró la victoriosa resistencia de montoneros indígenas contra la invasión enemiga en la sierra central?",
            [
                ("A", "Andrés Avelino Cáceres", True),
                ("B", "Nicolás de Piérola", False),
                ("C", "Lizardo Montero", False),
                ("D", "Justiniano Borgoño", False)
            ],
            1, ["EMCH", "ETE", "ENP", "CITEN", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_19", "Letras y Humanidades", "Historia del Perú - Héroe Nacional de la Aviación",
            "El Capitán FAP José Abelardo Quiñones Gonzales se inmoló heroicamente estrellando su avión caza North American NA-50 contra las baterías enemigas en Quebrada Seca durante el conflicto con el Ecuador en el año:",
            [
                ("A", "1941", True),
                ("B", "1981", False),
                ("C", "1995", False),
                ("D", "1932", False)
            ],
            1, ["EOFAP", "ESOFA", "EMCH", "ENP"]
        ),
        (
            "HUM_20", "Letras y Humanidades", "Historia del Perú - Héroe de la Policía Nacional",
            "¿Qué guardia civil peruano se consagró como héroe nacional al arrebatar el estandarte del regimiento enemigo durante la Batalla de Tarapacá el 27 de noviembre de 1879?",
            [
                ("A", "Mariano Santos Mateo", True),
                ("B", "Alipio Ponce Vásquez", False),
                ("C", "Horacio Patiño Cruzatti", False),
                ("D", "Enrique Torres Valdivia", False)
            ],
            1, ["EO-PNP", "EESTP_PNP", "EMCH", "ENP"]
        ),
        (
            "HUM_21", "Letras y Humanidades", "Historia del Perú - Operación Militar Chavín de Huántar",
            "La exitosa operación militar de rescate de rehenes en la residencia del embajador de Japón ejecutada por comandos de las Fuerzas Armadas en abril de 1997 se denominó:",
            [
                ("A", "Operación Chavín de Huántar", True),
                ("B", "Operación Cordillera del Cóndor", False),
                ("C", "Operación Victoria", False),
                ("D", "Operación Huallaga", False)
            ],
            1, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_22", "Letras y Humanidades", "Historia Universal - Antigüedad Clásica",
            "En las Guerras Médicas de la antigua Grecia, el célebre combate donde 300 soldados espartanos liderados por el rey Leónidas contuvieron heroicamente al ejército persa fue:",
            [
                ("A", "La Batalla de las Termópilas", True),
                ("B", "La Batalla de Maratón", False),
                ("C", "La Batalla de Salamina", False),
                ("D", "La Batalla de Platea", False)
            ],
            2, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "HUM_23", "Letras y Humanidades", "Historia Universal - Segunda Guerra Mundial",
            "El desembarco anfibio militar más grande de la historia moderna, conocido como el 'Día D' (Operación Overlord) en las costas de Normandía, tuvo lugar en el año:",
            [
                ("A", "1944", True),
                ("B", "1942", False),
                ("C", "1945", False),
                ("D", "1939", False)
            ],
            2, ["EMCH", "ENP", "EOFAP", "CITEN"]
        ),
        (
            "HUM_24", "Letras y Humanidades", "Historia Universal - Siglo XX y Guerra Fría",
            "El acontecimiento geopolítico que marcó simbólicamente el inicio del fin de la Guerra Fría en noviembre de 1989 fue:",
            [
                ("A", "La caída del Muro de Berlín", True),
                ("B", "La crisis de los misiles en Cuba", False),
                ("C", "La firma del Tratado de Versalles", False),
                ("D", "La invasión de Bahía de Cochinos", False)
            ],
            2, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        )
    ]

    for item in q_historia:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    # --- GEOGRAFÍA DEL PERÚ (8 preguntas: HUM_25 a HUM_32) ---
    q_geografia = [
        (
            "HUM_25", "Letras y Humanidades", "Geografía del Perú - Ocho Regiones Naturales",
            "Según la tesis del geógrafo Javier Pulgar Vidal, ¿a qué región natural corresponde la franja altitudinal situada entre los 4,000 y 4,800 m.s.n.m., caracterizada por mesetas de pajonales y clima muy frío?",
            [
                ("A", "Región Puna o Altoandina", True),
                ("B", "Región Quechua", False),
                ("C", "Región Suni o Jalca", False),
                ("D", "Región Janca o Cordillera", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_26", "Letras y Humanidades", "Geografía del Perú - Relieve Costero y Selva",
            "¿Cómo se denomina la región geográfica que se ubica en el flanco oriental andino entre los 400 y 1,000 m.s.n.m., caracterizada por valles longitudinales fértiles, pongos y densa vegetación subtropical?",
            [
                ("A", "Rupa Rupa o Selva Alta", True),
                ("B", "Omagua o Selva Baja", False),
                ("C", "Yunga Fluvial", False),
                ("D", "Chala", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_27", "Letras y Humanidades", "Geografía del Perú - Hidrografía",
            "El río más largo del territorio peruano, que se forma por la confluencia de los ríos Tambo y Urubamba y luego se une con el Marañón para formar el Amazonas, es el río:",
            [
                ("A", "Ucayali", True),
                ("B", "Huallaga", False),
                ("C", "Madre de Dios", False),
                ("D", "Mantaro", False)
            ],
            2, ["ENP", "CITEN", "EMCH", "EO-PNP"]
        ),
        (
            "HUM_28", "Letras y Humanidades", "Geografía del Perú - Mar de Grau",
            "El Mar de Grau presenta aguas predominantemente frías y una rica biomasa pesquera en su sector centro-sur debido principalmente al fenómeno oceanográfico de:",
            [
                ("A", "Afloramiento de aguas profundas (upwelling) impulsado por la Corriente Peruana.", True),
                ("B", "La radiación solar tropical ecuatorial permanente.", False),
                ("C", "El descenso exclusivo de aguas dulces de los ríos costeros.", False),
                ("D", "El ingreso de corrientes marinas cálidas procedentes de la Polinesia.", False)
            ],
            3, ["ENP", "CITEN", "EMCH", "EOFAP"]
        ),
        (
            "HUM_29", "Letras y Humanidades", "Geografía del Perú - Límites Fronterizos y Tratados",
            "La delimitación definitiva de la frontera terrestre entre el Perú y el Ecuador se ratificó y consolidó mediante la suscripción del Acta Presidencial de Brasilia en el año:",
            [
                ("A", "1998", True),
                ("B", "1995", False),
                ("C", "1942", False),
                ("D", "2001", False)
            ],
            2, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "HUM_30", "Letras y Humanidades", "Geografía del Perú - Puntos Extremos del Territorio",
            "El punto extremo más oriental (al este) del territorio peruano se localiza en el departamento de Madre de Dios, específicamente en la confluencia de los ríos:",
            [
                ("A", "Heath y Madre de Dios", True),
                ("B", "Putumayo y Amazonas", False),
                ("C", "Güepí y Napo", False),
                ("D", "Yavary y Amazonas", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_31", "Letras y Humanidades", "Geografía del Perú - Geodinámica y Gestión de Desastres",
            "¿Cuál es el organismo técnico del Estado peruano responsable de la formulación de planes de respuesta y ayuda humanitaria ante emergencias y desastres de origen natural?",
            [
                ("A", "INDECI (Instituto Nacional de Defensa Civil)", True),
                ("B", "CENEPRED", False),
                ("C", "IGN (Instituto Geográfico Nacional)", False),
                ("D", "SENAMHI", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_32", "Letras y Humanidades", "Geografía del Perú - Cordillera y Pasos Andinos",
            "El paso o abra de Anticona (Ticlio), que comunica Lima con el valle del Mantaro y la sierra central a más de 4,818 m.s.n.m., atraviesa la Cordillera:",
            [
                ("A", "Occidental de los Andes Centrales", True),
                ("B", "Oriental de los Andes del Norte", False),
                ("C", "De Vilcabamba", False),
                ("D", "Carabaya de los Andes del Sur", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        )
    ]

    for item in q_geografia:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    # --- EDUCACIÓN CÍVICA Y DERECHOS HUMANOS (8 preguntas: HUM_33 a HUM_40) ---
    q_civica = [
        (
            "HUM_33", "Letras y Humanidades", "Educación Cívica - Constitución y FFAA",
            "De acuerdo con el Artículo 165 de la Constitución Política del Perú de 1993, las Fuerzas Armadas tienen como finalidad primordial:",
            [
                ("A", "Garantizar la independencia, la soberanía y la integridad territorial de la República.", True),
                ("B", "Garantizar el orden interno y la prevención del delito común.", False),
                ("C", "Administrar los recursos aduaneros y tributarios en las fronteras.", False),
                ("D", "Ejercer el control político de los poderes públicos del Estado.", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_34", "Letras y Humanidades", "Educación Cívica - Policía Nacional del Perú",
            "Según el Artículo 166 de la Carta Magna, ¿cuál es la finalidad fundamental de la Policía Nacional del Perú?",
            [
                ("A", "Garantizar, mantener y restablecer el orden interno, proteger y prestar ayuda a las personas.", True),
                ("B", "Defender el territorio ante cualquier agresión externa bélica.", False),
                ("C", "Custodiar exclusivamente el Palacio de Gobierno y los ministerios.", False),
                ("D", "Promover el comercio exterior y los tratados bilaterales.", False)
            ],
            2, ["EO-PNP", "EESTP_PNP", "EMCH", "ENP", "EOFAP"]
        ),
        (
            "HUM_35", "Letras y Humanidades", "Educación Cívica - Mando Supremo de las FFAA y PNP",
            "Conforme al Artículo 167 de la Constitución, ¿quién ejerce la Jefatura Suprema de las Fuerzas Armadas y de la Policía Nacional del Perú?",
            [
                ("A", "El Presidente de la República", True),
                ("B", "El Ministro de Defensa", False),
                ("C", "El Jefe del Comando Conjunto de las FFAA", False),
                ("D", "El Presidente del Congreso de la República", False)
            ],
            1, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_36", "Letras y Humanidades", "Educación Cívica - Régimen de Excepción",
            "Durante el Estado de Emergencia decretado según el Artículo 137 de la Constitución, ¿qué derechos fundamentales relativos a la libertad pueden ser suspendidos?",
            [
                ("A", "Libertad y seguridad personales, inviolabilidad del domicilio, y libertad de reunión y de tránsito.", True),
                ("B", "El derecho a la vida, a la integridad física y a la nacionalidad.", False),
                ("C", "El derecho a la propiedad privada y a la libertad de conciencia y culto.", False),
                ("D", "El derecho al sufragio electoral y al debido proceso legal.", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_37", "Letras y Humanidades", "Educación Cívica - Garantías Constitucionales",
            "La garantía constitucional que procede ante el hecho u omisión por parte de cualquier autoridad o persona que vulnera o amenaza la libertad individual de un ciudadano es:",
            [
                ("A", "El proceso de Hábeas Corpus", True),
                ("B", "La Acción de Amparo", False),
                ("C", "El proceso de Hábeas Data", False),
                ("D", "La Acción Popular", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_38", "Letras y Humanidades", "Educación Cívica - Derecho Internacional Humanitario",
            "¿Cuál es el instrumento jurídico internacional suscrito en 1949 que establece las normas para la protección de personas que no participan en las hostilidades bélicas (civiles, médicos y prisioneros de guerra)?",
            [
                ("A", "Los Convenios de Ginebra", True),
                ("B", "El Pacto de San José de Costa Rica", False),
                ("C", "El Tratado de No Proliferación Nuclear", False),
                ("D", "El Estatuto de Roma", False)
            ],
            2, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "HUM_39", "Letras y Humanidades", "Educación Cívica - Generaciones de Derechos Humanos",
            "Los derechos civiles y políticos, tales como el derecho a la vida, a la libertad, a la igualdad ante la ley y al voto ciudadano, corresponden históricamente a los derechos de:",
            [
                ("A", "Primera Generación", True),
                ("B", "Segunda Generación", False),
                ("C", "Tercera Generación", False),
                ("D", "Cuarta Generación", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "HUM_40", "Letras y Humanidades", "Educación Cívica - Organismos Constitucionales Autónomos",
            "El órgano constitucional autónomo encargado de defender los derechos constitucionales y fundamentales de la persona y de la comunidad, y supervisar el cumplimiento de los deberes de la administración estatal es:",
            [
                ("A", "La Defensoría del Pueblo", True),
                ("B", "El Tribunal Constitucional", False),
                ("C", "El Ministerio Público (Fiscalía de la Nación)", False),
                ("D", "La Junta Nacional de Justicia", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        )
    ]

    for item in q_civica:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    return questions

if __name__ == "__main__":
    qs = get_letras_humanidades_questions()
    print(f"Total Letras y Humanidades: {len(qs)}")
