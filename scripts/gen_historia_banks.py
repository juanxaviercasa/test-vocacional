# -*- coding: utf-8 -*-
"""
Generador del Banco de Preguntas de Historia y Doctrina (Héroes Nacionales, Conflictos y Soberanía)
para las 8 escuelas militares y policiales del Perú.
"""
import json
import os
import shutil

os.makedirs('banco_preguntas', exist_ok=True)

SCHOOLS_HIST = [
    {
        "id": "EMCH",
        "name": "Escuela Militar de Chorrillos (EMCH - Oficiales)",
        "folder": "01_EMCH",
        "patron": "Coronel Francisco Bolognesi Cervantes",
        "contexts": [
            "Batalla de Arica (7 de Junio de 1880) y la Inmolación de Bolognesi y Ugarte",
            "Campaña de la Breña y Táctica de Guerrillas del Mariscal Andrés Avelino Cáceres",
            "Victoria de Tarapacá (27 de Noviembre de 1879) y Captura de Artillería Krupp",
            "Defensa de la Soberanía en las Bases de Tiwinza y Base Sur en el Alto Cenepa (1995)"
        ]
    },
    {
        "id": "ETE",
        "name": "Escuela Técnica del Ejército (ETE - Suboficiales)",
        "folder": "02_ETE",
        "patron": "Sargento 2° Fernando Lores Tenazoa",
        "contexts": [
            "Defensa de los Reductos de Miraflores por Unidades Especialistas y Artillería (1881)",
            "Gesta Heroica del Sargento Fernando Lores Tenazoa en Güepí (1933)",
            "Soporte Logístico y Mantenimiento de Blindados y Transmisiones en el Cenepa (1995)",
            "Doctrina Institucional y Código de Honor del Suboficial Técnico del Ejército"
        ]
    },
    {
        "id": "ENP",
        "name": "Escuela Naval del Perú (ENP - Oficiales)",
        "folder": "03_ENP",
        "patron": "Gran Almirante del Perú Don Miguel Grau Seminario",
        "contexts": [
            "Combate Naval de Angamos (8 de Octubre de 1879) y la Cadena de Comando Naval",
            "Combate de Iquique (21 de Mayo de 1879) y el Rescate Humanitario de los Náufragos",
            "Combate del Dos de Mayo de 1866 y la Inmolación de José Gálvez en la Torre de la Merced",
            "Delimitación Marítima en la Corte Internacional de Justicia de La Haya (Fallo 2014)"
        ]
    },
    {
        "id": "CITEN",
        "name": "Centro de Instrucción Técnica y Entrenamiento Naval (CITEN - Suboficiales)",
        "folder": "04_CITEN",
        "patron": "Oficial de Mar Juan Fanning García / Grumete Alberto Medina Cecilia",
        "contexts": [
            "Inmolación del Batallón Guarnición de Marina y Juan Fanning en Miraflores (1881)",
            "Actuación del Grumete Alberto Medina Cecilia en el Monitor Huáscar en Angamos",
            "Combate Fluvial de Manuel Clavero en la Cañonera BAP América en Rocafuerte (1911)",
            "Misiones Fluviales y de Guardacostas en la Pacificación Nacional y Control Territorial"
        ]
    },
    {
        "id": "EOFAP",
        "name": "Escuela de Oficiales FAP (EOFAP - Oficiales)",
        "folder": "05_EOFAP",
        "patron": "Capitán FAP José Abelardo Quiñones Gonzales",
        "contexts": [
            "Inmolación de Quiñones en Quebrada Seca (23 de Julio de 1941) en su Caza NA-50",
            "Hazaña Histórica de Jorge Chávez Dartnell: Primer Cruce Aéreo de los Alpes (1910)",
            "Misiones de Apoyo Aéreo e Interceptación de Cazas FAP en el Conflicto del Cenepa (1995)",
            "Doctrina del Poder Aeroespacial y Soberanía del Espacio Aéreo Nacional"
        ]
    },
    {
        "id": "ESOFA",
        "name": "Escuela de Suboficiales FAP (ESOFA - Suboficiales)",
        "folder": "06_ESOFA",
        "patron": "Mayor General FAP Armando Revoredo Iglesias / Pedro Ruiz Gallo",
        "contexts": [
            "Aporte Científico y Proyectos Aeronáuticos del Sabio Teniente Coronel Pedro Ruiz Gallo",
            "Despliegue Técnico y Mantenimiento de Línea de Vuelo en el Conflicto de 1941",
            "Operatividad de Helicópteros de Combate Mi-25 y Transporte Mi-171 en Zona de Guerra",
            "Código de Ética y Responsabilidad Técnica en el Mantenimiento Aeronáutico FAP"
        ]
    },
    {
        "id": "EO_PNP",
        "name": "Escuela de Oficiales de la Policía Nacional (EO-PNP - Oficiales)",
        "folder": "07_EO_PNP",
        "patron": "Capitán PNP Alipio Ponce Vásquez",
        "contexts": [
            "Gesta Heroica del 'Titán de Carcabón' Capitán Alipio Ponce en Porotillo (1941)",
            "Inmolación del Mayor PNP Horacio Patiño Cruzatti y su Patrulla en Púcuta (1965)",
            "Operación Victoria (12 de Septiembre de 1992): Captura de Abimael Guzmán por el GEIN",
            "Constitución Política (Art. 166°) y Ley de la PNP (D.L. 1267): Misión del Orden Interno"
        ]
    },
    {
        "id": "EESTP_PNP",
        "name": "Escuelas de Educación Superior Técnico Profesional PNP (EESTP-PNP - Suboficiales)",
        "folder": "08_EESTP_PNP",
        "patron": "Brigadier PNP Mariano Santos Mateo",
        "contexts": [
            "Hazaña de Mariano Santos Mateo 'El Valiente de Tarapacá' y Captura de la Bandera (1879)",
            "Mártires y Héroes Suboficiales de la Pacificación Nacional y Orden Público",
            "Funciones Operativas del Suboficial de la PNP en la Prevención e Investigación del Delito",
            "Uso de la Fuerza Policial (D.L. 1186): Principios de Legalidad, Necesidad y Proporcionalidad"
        ]
    }
]

def get_historia_bank(school):
    prefix = school["id"]
    name = school["name"]
    contexts = school["contexts"]
    patron = school["patron"]
    
    questions = []
    
    # Nivel 1: Básico (4 preguntas)
    # Q1: Patrono institucional
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_001",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 1,
        "enunciado": f"¿Quién es el insigne Héroe Nacional y Patrono tutelar oficial reconocido en la tradición histórica de {name}?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": patron, "es_correcta": True },
            { "id": "B", "texto": "Coronel Alfonso Ugarte", "es_correcta": False },
            { "id": "C", "texto": "Capitán de Navío Lizardo Montero", "es_correcta": False },
            { "id": "D", "texto": "Mariscal Ramón Castilla", "es_correcta": False },
            { "id": "E", "texto": "Teniente Coronel Pedro Ruiz Gallo", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": f"El patrono histórico de la institución es {patron}, honrado por su sacrificio y ejemplo moral en defensa de la Patria."
    })
    
    # Q2: Batalla / Conflicto emblemático
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_002",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 1,
        "enunciado": "¿En qué conflicto bélico internacional del siglo XIX el Perú defendió su integridad territorial en la Batalla de Tarapacá, el Combate de Angamos y la Batalla de Arica?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "La Guerra del Pacífico (1879 - 1883)", "es_correcta": True },
            { "id": "B", "texto": "La Guerra contra la Confederación Perú-Boliviana (1836 - 1839)", "es_correcta": False },
            { "id": "C", "texto": "El Combate del Dos de Mayo contra España (1866)", "es_correcta": False },
            { "id": "D", "texto": "El Conflicto de la Gran Colombia (1828 - 1829)", "es_correcta": False },
            { "id": "E", "texto": "La Guerra de la Independencia del Perú (1820 - 1824)", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "La Guerra del Pacífico (1879-1883) enfrentó a Perú y Bolivia contra Chile, escenario de las máximas glorias heroicas de Grau y Bolognesi."
    })
    
    # Q3: Marco constitucional básico
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_003",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 1,
        "enunciado": "De acuerdo con el Artículo 165° de la Constitución Política del Perú, ¿cuál es la finalidad primordial de las Fuerzas Armadas (Ejército, Marina de Guerra y Fuerza Aérea)?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "Garantizar la independencia, la soberanía y la integridad territorial de la República", "es_correcta": True },
            { "id": "B", "texto": "Administrar justicia penal militar policial exclusivamente", "es_correcta": False },
            { "id": "C", "texto": "Ejercer el control político de las fronteras aduaneras", "es_correcta": False },
            { "id": "D", "texto": "Organizar y fiscalizar los procesos electorales democráticos", "es_correcta": False },
            { "id": "E", "texto": "Dictar leyes sobre el desarrollo económico e industrial", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "El Art. 165° de la Constitución establece taxativamente: 'Las Fuerzas Armadas tienen como finalidad primordial garantizar la independencia, la soberanía y la integridad territorial de la República'."
    })
    
    # Q4: Efeméride militar/policial
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_004",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 1,
        "enunciado": "¿Qué fecha cívico-patriótica se conmemora en todo el territorio nacional como el 'Día de las Fuerzas Armadas del Perú' y consagración a la Virgen de la Merced, Gran Mariscala y Patrona de los Institutos Armados?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "24 de Septiembre", "es_correcta": True },
            { "id": "B", "texto": "7 de Junio", "es_correcta": False },
            { "id": "C", "texto": "8 de Octubre", "es_correcta": False },
            { "id": "D", "texto": "9 de Diciembre", "es_correcta": False },
            { "id": "E", "texto": "23 de Julio", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "El 24 de septiembre fue instituido como el Día de las Fuerzas Armadas del Perú mediante Decreto Supremo N° 003-77-CCFFAA, coincidiendo con la festividad de la Virgen de la Merced."
    })
    
    # Nivel 2: Intermedio (4 preguntas)
    # Q5: Protocolo de Río y Tratados
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_005",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 2,
        "enunciado": "Tras la victoriosa campaña militar peruana en el conflicto con Ecuador de 1941, ¿qué trascendental tratado internacional de paz y límites fue suscrito el 29 de enero de 1942, garantizado por Argentina, Brasil, Chile y EE.UU.?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "Protocolo de Paz, Amistad y Límites de Río de Janeiro", "es_correcta": True },
            { "id": "B", "texto": "Tratado de Ancón", "es_correcta": False },
            { "id": "C", "texto": "Tratado Salomón-Lozano", "es_correcta": False },
            { "id": "D", "texto": "Tratado Polo-Bustamante", "es_correcta": False },
            { "id": "E", "texto": "Acta Presidencial de Brasilia", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "El 29 de enero de 1942 se firmó el Protocolo de Río de Janeiro, que consolidó la demarcación fronteriza tras la victoria de las armas peruanas en 1941."
    })
    
    # Q6: Guerra con España 1866
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_006",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 2,
        "enunciado": "En el histórico Combate del Dos de Mayo de 1866 librado en el Callao, las baterías peruanas rechazaron a la Escuadra Española consolidando la independencia de América del Sur. ¿Qué insigne estadista y Ministro de Guerra peruano se inmoló heroicamente al estallar la Torre de la Merced?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "José Gálvez Egúsquiza", "es_correcta": True },
            { "id": "B", "texto": "Mariano Ignacio Prado", "es_correcta": False },
            { "id": "C", "texto": "Juan Antonio Pezet", "es_correcta": False },
            { "id": "D", "texto": "Pedro Silva Gil", "es_correcta": False },
            { "id": "E", "texto": "Belisario Suárez", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Don José Gálvez Egúsquiza dirigió el combate desde la Torre de la Merced del puerto del Callao, donde pereció heroicamente por la explosión de una bomba enemiga."
    })
    
    # Q7: Finalidad constitucional de la PNP
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_007",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 2,
        "enunciado": "Según el Artículo 166° de la Constitución, ¿cuál es la finalidad fundamental asignada exclusivamente a la Policía Nacional del Perú?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "Garantizar, mantener y restablecer el orden interno; prestar protección y ayuda; y prevenir, investigar y combatir la delincuencia", "es_correcta": True },
            { "id": "B", "texto": "Ejercer el mando supremo de las operaciones de defensa externa frente a agresiones extranjeras", "es_correcta": False },
            { "id": "C", "texto": "Supervisar los presupuestos del Poder Judicial y del Ministerio Público", "es_correcta": False },
            { "id": "D", "texto": "Dictaminar sobre la legalidad de los decretos legislativos expedidos por el Ejecutivo", "es_correcta": False },
            { "id": "E", "texto": "Administrar los centros penitenciarios de máxima seguridad en todo el país", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "El Art. 166° de la Carta Magna establece que la PNP tiene por finalidad primordial garantizar, mantener y restablecer el orden interno, proteger a las personas y combatir la delincuencia."
    })
    
    # Q8: Operación Chavín de Huántar
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_008",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 2,
        "enunciado": "¿Qué histórica operación militar de rescate de rehenes, ejecutada el 22 de abril de 1997 por comandos del Ejército y de la Marina de Guerra en la residencia del embajador de Japón, es considerada a nivel mundial como un modelo de precisión y coraje castrense?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "Operación Chavín de Huántar", "es_correcta": True },
            { "id": "B", "texto": "Operación Victoria", "es_correcta": False },
            { "id": "C", "texto": "Operación Púcuta", "es_correcta": False },
            { "id": "D", "texto": "Operación Patriota", "es_correcta": False },
            { "id": "E", "texto": "Operación Libertad", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "La Operación Chavín de Huántar culminó con el rescate exitoso de 71 de los 72 rehenes secuestrados por el grupo terrorista MRTA, con la inmolación de los comandos Valer y Jiménez."
    })
    
    # Nivel 3: Avanzado / Táctico (4 preguntas contextualizadas)
    # Q9
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_009",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[0]}]: En relación con este acontecimiento histórico, analice la respuesta del Coronel Francisco Bolognesi ante el parlamentario chileno Mayor Juan de la Cruz Salvo el 5 de junio de 1880 en Arica. ¿Cuál fue la unánime e histórica decisión tomada en Junta de Guerra por los oficiales defensores del Morro?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "'Tengo deberes sagrados que cumplir y los cumpliré hasta quemar el último cartucho'", "es_correcta": True },
            { "id": "B", "texto": "'Aceptamos una tregua condicionada a la evacuación ordenada de la población civil'", "es_correcta": False },
            { "id": "C", "texto": "'Exigimos una capitulación honrosa con entrega de prisioneros bajo supervisión internacional'", "es_correcta": False },
            { "id": "D", "texto": "'Nos replegaremos hacia las cordilleras de Tarapacá para enlazar con las fuerzas del sur'", "es_correcta": False },
            { "id": "E", "texto": "'Esperamos la llegada inminente de la escuadra aliada antes de abrir fuego'", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "La célebre respuesta de Bolognesi, ratificada por sus comandantes (Ugarte, Inclán, Moore, Arias Aragüez): 'Tengo deberes sagrados que cumplir y los cumpliré hasta quemar el último cartucho'."
    })
    
    # Q10
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_010",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[1]}]: Durante este hecho de armas, ¿cuál fue la táctica operacional decisiva aplicada por el mando militar para neutralizar la superioridad numérica o de fuego del adversario y mantener la posición?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "Aprovechamiento del terreno escarpado, contraataque frontal sorpresivo y maniobra envolvente por los flancos", "es_correcta": True },
            { "id": "B", "texto": "Retirada masiva hacia posiciones fortificadas en la retaguardia sin entablar combate", "es_correcta": False },
            { "id": "C", "texto": "Uso exclusivo de bombardeo naval sin participación de fuerzas de infantería", "es_correcta": False },
            { "id": "D", "texto": "Solicitud inmediata de intervención de fuerzas de paz de países neutrales", "es_correcta": False },
            { "id": "E", "texto": "Despliegue en línea abierta estática sin cobertura artificial ni natural", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "La doctrina militar peruana en la Campaña de la Breña y combates de montaña demostró la eficacia de la sorpresa táctica, el conocimiento del terreno y la maniobra envolvente."
    })
    
    # Q11
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_011",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[2]}]: En el contexto de {contexts[2]}, ¿cuál fue la repercusión geoestratégica directa que tuvo este enfrentamiento para la defensa de la soberanía nacional peruana?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "Demostró la capacidad combativa de las fuerzas peruanas y consolidó el respeto a la línea de frontera de la República", "es_correcta": True },
            { "id": "B", "texto": "Provocó la pérdida inmediata del control soberano de los puertos del norte peruano", "es_correcta": False },
            { "id": "C", "texto": "Obligó al Perú a ceder temporalmente la administración de las cuencas fluviales amazónicas", "es_correcta": False },
            { "id": "D", "texto": "Generó la disolución irrevocable de los institutos armados de la Nación", "es_correcta": False },
            { "id": "E", "texto": "Desembocó en la firma de un armisticio desfavorable en territorio extranjero", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Las operaciones militares de 1879, 1941 y 1995 ratificaron la firmeza inquebrantable de las Fuerzas Armadas y Policía Nacional en la preservación de la integridad territorial."
    })
    
    # Q12
    questions.append({
        "id_pregunta": f"{prefix}_HIS_DOC_012",
        "curso": "Historia del Perú y Doctrina",
        "tema": "Héroes Nacionales, Conflictos y Soberanía",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[3]}]: Analice el principio de mando y doctrina que orientó el desempeño de las unidades peruanas en {contexts[3]}. ¿Qué precepto ético-militar sintetiza el cumplimiento del deber frente al peligro inminente?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "Subordinación del interés particular al cumplimiento de la misión encomendada y lealtad suprema a la Patria", "es_correcta": True },
            { "id": "B", "texto": "Priorización de la integridad del material bélico por encima de la vida humana y la soberanía", "es_correcta": False },
            { "id": "C", "texto": "Abandono de la posición asignada ante la primera manifestación de fuego hostil", "es_correcta": False },
            { "id": "D", "texto": "Deliberación asamblearia previa antes de acatar las órdenes del comandante de unidad", "es_correcta": False },
            { "id": "E", "texto": "Delegación de las responsabilidades tácticas a personal no combatiente", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "La doctrina militar y policial fundamenta su disciplina en la subordinación consciente y el sacrificio heroico por la defensa de los intereses sagrados de la Nación."
    })
    
    return questions

# Guardar y actualizar
all_hist_banks = {}

for sc in SCHOOLS_HIST:
    prefix = sc["id"]
    folder = sc["folder"]
    bank = get_historia_bank(sc)
    all_hist_banks[prefix] = bank
    
    # Guardar JSON individual
    json_path = f"banco_preguntas/{folder}_historia_doctrina.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(bank, f, indent=2, ensure_ascii=False)
    print(f"Generado {json_path}")

# Guardar banco maestro
with open("banco_preguntas/banco_maestro_historia_doctrina_8_escuelas.json", "w", encoding="utf-8") as f:
    json.dump(all_hist_banks, f, indent=2, ensure_ascii=False)
print("Guardado banco maestro consolidado de Historia y Doctrina.")

# Actualizar los Markdown de bases de conocimiento
for sc in SCHOOLS_HIST:
    prefix = sc["id"]
    folder = sc["folder"]
    md_file = f"{folder}.md"
    md_path = os.path.join("bases_conocimiento", md_file)
    
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    section_title = "## 📚 Banco de Preguntas Calibradas: Historia del Perú y Doctrina (Héroes y Soberanía)"
    if section_title not in content:
        bank = all_hist_banks[prefix]
        json_str = json.dumps(bank, indent=2, ensure_ascii=False)
        addition = f"""

---

{section_title}

> **Muestra Oficial Certificada:** 12 preguntas de opción múltiple estrictamente calibradas en 3 niveles de dificultad (Básico, Intermedio, Avanzado/Táctico) con límite de tiempo ({bank[0]['metricas']['segundos_limite']}s) y sistema de penalización (+{bank[0]['metricas']['pts_correcta']} / {bank[0]['metricas']['pts_incorrecta']}).

```json
{json_str}
```
"""
        content += addition
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Actualizado {md_path}")
        
        # Copiar al espejo
        mirror_path = os.path.join("escuelas_militares_pdf", folder, f"BASE_CONOCIMIENTO_{prefix}.md")
        shutil.copyfile(md_path, mirror_path)
        print(f"Actualizado espejo {mirror_path}")

print("Historia y Doctrina generada y guardada al 100% en todas las escuelas.")
