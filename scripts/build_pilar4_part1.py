#!/usr/bin/env python3
"""
Módulo de generación de preguntas para Pilar 4: Aptitud y Conocimientos
Parte 1: Psicotécnico y Aptitud Académica (40 preguntas: PSI_01 a PSI_40)
"""

def get_psicotecnico_questions():
    questions = []

    # --- RAZONAMIENTO ESPACIAL (10 preguntas: PSI_01 a PSI_10) ---
    q_espacial = [
        (
            "PSI_01", "Psicotécnico", "Razonamiento Espacial",
            "Al armar un cubo a partir de su desarrollo plano en cruz donde la cara central tiene un círculo negro, la cara superior un triángulo, la inferior un cuadrado y las laterales son blancas, ¿qué relación geométrica guardan el triángulo y el cuadrado en el cubo ensamblado?",
            [
                ("A", "Son caras opuestas paralelas entre sí.", True),
                ("B", "Son caras adyacentes perpendiculares.", False),
                ("C", "Comparten una arista diagonal.", False),
                ("D", "Coinciden en el mismo vértice frontal.", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "PSI_02", "Psicotécnico", "Razonamiento Espacial",
            "Se tiene un bloque cúbico sólido pintado de azul en todas sus caras exteriores. Si se realizan dos cortes horizontales, dos verticales longitudinales y dos verticales transversales dividiéndolo en 27 cubitos idénticos, ¿cuántos cubitos tendrán exactamente dos caras pintadas?",
            [
                ("A", "8 cubitos", False),
                ("B", "12 cubitos", True),
                ("C", "6 cubitos", False),
                ("D", "1 cubito", False)
            ],
            4, ["EMCH", "ENP", "EOFAP", "CITEN"]
        ),
        (
            "PSI_03", "Psicotécnico", "Razonamiento Espacial",
            "Si observas una figura piramidal de base cuadrangular desde la vista superior (vista de planta), ¿qué figura bidimensional se percibe proyectada en el plano?",
            [
                ("A", "Un cuadrado con dos diagonales que se intersecan en el centro.", True),
                ("B", "Un triángulo equilátero con una altura perpendicular.", False),
                ("C", "Un trapecio isósceles con líneas punteadas.", False),
                ("D", "Cuatro cuadrados adyacentes concéntricos.", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_04", "Psicotécnico", "Razonamiento Espacial",
            "Una figura tridimensional en forma de 'L' compuesta por 4 cubos adosados gira 90° en sentido horario sobre el eje vertical 'Y' y luego 180° sobre el eje horizontal 'X'. ¿Cuál es su orientación resultante respecto a su posición original?",
            [
                ("A", "Invertida verticalmente con la base extendida hacia el cuadrante opuesto.", True),
                ("B", "Idéntica a la posición inicial sin variación angular.", False),
                ("C", "Reflejada en espejo lateral sin inversión de altura.", False),
                ("D", "Rotada 270° en el plano frontal bidimensional.", False)
            ],
            4, ["ENP", "EOFAP", "EMCH", "EO-PNP"]
        ),
        (
            "PSI_05", "Psicotécnico", "Razonamiento Espacial",
            "¿Cuántos cubos de 1 cm de arista faltan para completar un cubo compacto de 4 cm de arista si actualmente se dispone de una estructura escalonada de 28 cubitos?",
            [
                ("A", "36 cubos", True),
                ("B", "32 cubos", False),
                ("C", "40 cubos", False),
                ("D", "26 cubos", False)
            ],
            3, ["EMCH", "ETE", "CITEN", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_06", "Psicotécnico", "Razonamiento Espacial",
            "Al realizar un corte transversal oblicuo a un cilindro circular recto sin tocar las bases, ¿qué sección cónica plana se obtiene en la superficie de corte?",
            [
                ("A", "Una elipse perfecta.", True),
                ("B", "Una circunferencia de radio menor.", False),
                ("C", "Una parábola abierta.", False),
                ("D", "Un rectángulo simétrico.", False)
            ],
            3, ["ENP", "EOFAP", "EMCH"]
        ),
        (
            "PSI_07", "Psicotécnico", "Razonamiento Espacial",
            "Un cilindro recto de madera con un orificio prismático triangular que lo atraviesa de base a base se mira desde su perfil lateral (vista de perfil). ¿Cómo se representan las aristas interiores del orificio no visibles?",
            [
                ("A", "Líneas segmentadas o de trazos discontinuos paralelas al eje del cilindro.", True),
                ("B", "Líneas continuas gruesas remarcadas en el centro.", False),
                ("C", "Líneas en espiral concéntrica decreciente.", False),
                ("D", "No se representan en los planos de proyección normalizada.", False)
            ],
            3, ["ENP", "CITEN", "ETE", "ESOFA"]
        ),
        (
            "PSI_08", "Psicotécnico", "Razonamiento Espacial",
            "Se despliega un tetraedro regular en cuatro triángulos equiláteros unidos por sus lados formando un triángulo equilátero mayor. ¿Qué ocurre si se dobla cada triángulo exterior sobre las aristas interiores?",
            [
                ("A", "Los tres vértices exteriores convergen exactamente en una sola cúspide tridimensional.", True),
                ("B", "Las caras se superponen formando una figura plana de doble capa.", False),
                ("C", "Se obtiene una pirámide de base cuadrada abierta.", False),
                ("D", "Quedan dos aristas abiertas en ángulo de 45°.", False)
            ],
            3, ["EOFAP", "ENP", "EMCH"]
        ),
        (
            "PSI_09", "Psicotécnico", "Razonamiento Espacial",
            "Al proyectar ortogonalmente un segmento de recta de 10 cm inclinado a 60° respecto al plano horizontal, ¿cuál es la longitud de su sombra o traza proyectada?",
            [
                ("A", "5 cm (aplicando coseno de 60°).", True),
                ("B", "8.66 cm (aplicando seno de 60°).", False),
                ("C", "10 cm sin variación longitudinal.", False),
                ("D", "7.07 cm en ángulo recto.", False)
            ],
            4, ["ENP", "EOFAP", "EMCH"]
        ),
        (
            "PSI_10", "Psicotécnico", "Razonamiento Espacial",
            "Una esfera perfecta de radio R es intersecada por un plano cuya distancia al centro de la esfera es de R/2. ¿Qué figura geométrica constituye el contorno de la intersección?",
            [
                ("A", "Una circunferencia de radio (R*sqrt(3))/2.", True),
                ("B", "Un círculo de radio R/2.", False),
                ("C", "Una elipse de eje mayor 2R.", False),
                ("D", "Un punto tangencial único.", False)
            ],
            4, ["ENP", "EOFAP", "EMCH"]
        )
    ]

    for item in q_espacial:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    # --- SERIES LÓGICAS Y MATRICES (10 preguntas: PSI_11 a PSI_20) ---
    q_logicas = [
        (
            "PSI_11", "Psicotécnico", "Series Lógicas y Matrices",
            "En la sucesión alfanumérica: A, 2, C, 5, F, 10, J, 17, ... ¿qué par término continúa la serie?",
            [
                ("A", "Ñ, 26", True),
                ("B", "M, 24", False),
                ("C", "N, 25", False),
                ("D", "O, 27", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_12", "Psicotécnico", "Series Lógicas y Matrices",
            "En una matriz gráfica de 3x3, en la primera fila un cuadrado rota 45° y suma un punto negro en su interior; en la segunda fila un triángulo rota 90° y suma dos puntos. Si en la tercera fila un pentágono rota 135° en sentido horario, ¿qué debe contener en su interior según la ley de formación?",
            [
                ("A", "Tres puntos negros ordenados triangularmente.", True),
                ("B", "Un punto blanco y dos rayas paralelas.", False),
                ("C", "Cuatro círculos concéntricos sombreados.", False),
                ("D", "Un rombo inscrito sin puntos interiores.", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "PSI_13", "Psicotécnico", "Series Lógicas y Matrices",
            "¿Qué número continúa coherentemente la sucesión: 3, 4, 9, 28, 113, ...?",
            [
                ("A", "566", True),
                ("B", "452", False),
                ("C", "525", False),
                ("D", "620", False)
            ],
            4, ["EMCH", "ENP", "EOFAP", "CITEN", "EO-PNP"]
        ),
        (
            "PSI_14", "Psicotécnico", "Series Lógicas y Matrices",
            "Dada la ficha de dominó doble horizontal: [1|2], [2|4], [3|6], [4|1]... ¿Qué ficha de dominó continúa en la rueda cíclica de puntos (0 a 6)?",
            [
                ("A", "[5|3]", True),
                ("B", "[5|2]", False),
                ("C", "[6|4]", False),
                ("D", "[0|5]", False)
            ],
            3, ["EMCH", "ETE", "CITEN", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_15", "Psicotécnico", "Series Lógicas y Matrices",
            "Se define la operación en una estrella de 5 puntas donde el número del centro es la suma de los productos cruzados de las puntas opuestas. Si las puntas son (2, 4, 3, 5, 1), el número central correspondiente es:",
            [
                ("A", "38", True),
                ("B", "32", False),
                ("C", "45", False),
                ("D", "29", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_16", "Psicotécnico", "Series Lógicas y Matrices",
            "En la siguiente analogía de figuras: 'Círculo es a Esfera como Cuadrado es a Cubo'; entonces 'Triángulo equilátero es a...'",
            [
                ("A", "Tetraedro regular.", True),
                ("B", "Pirámide octogonal.", False),
                ("C", "Prisma pentagonal.", False),
                ("D", "Cilindro oblicuo.", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_17", "Psicotécnico", "Series Lógicas y Matrices",
            "¿Cuál es el valor que falta en la serie alterna: 2, 7, 4, 14, 8, 28, 16, ...?",
            [
                ("A", "56", True),
                ("B", "32", False),
                ("C", "64", False),
                ("D", "48", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_18", "Psicotécnico", "Series Lógicas y Matrices",
            "Cinco soldados A, B, C, D y E hacen guardia en línea. B está a la derecha de C. A está entre D y C. D está en el extremo izquierdo. ¿Quién se encuentra en el centro de la formación?",
            [
                ("A", "A", True),
                ("B", "C", False),
                ("C", "B", False),
                ("D", "E", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_19", "Psicotécnico", "Series Lógicas y Matrices",
            "Se sabe que todos los oficiales de artillería son expertos en balística y ningún experto en balística es descuidado con las tablas de tiro. Por lo tanto, se concluye necesariamente que:",
            [
                ("A", "Ningún oficial de artillería es descuidado con las tablas de tiro.", True),
                ("B", "Todos los descuidados son oficiales de artillería.", False),
                ("C", "Algunos oficiales de artillería son descuidados.", False),
                ("D", "Todo experto en balística es oficial de artillería.", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "PSI_20", "Psicotécnico", "Series Lógicas y Matrices",
            "Si el ayer del anteayer del mañana del pasado mañana fue lunes, ¿qué día de la semana será el pasado mañana del ayer de hoy?",
            [
                ("A", "Martes", True),
                ("B", "Lunes", False),
                ("C", "Miércoles", False),
                ("D", "Jueves", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        )
    ]

    for item in q_logicas:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    # --- RAZONAMIENTO MATEMÁTICO (10 preguntas: PSI_21 a PSI_30) ---
    q_rm = [
        (
            "PSI_21", "Psicotécnico", "Razonamiento Matemático",
            "Un reloj se adelanta 3 minutos cada 4 horas. Si se sincroniza a la hora exacta a las 8:00 a.m. del lunes, ¿qué hora marcará cuando en realidad sean las 8:00 p.m. del miércoles de esa misma semana?",
            [
                ("A", "8:45 p.m.", True),
                ("B", "8:30 p.m.", False),
                ("C", "9:00 p.m.", False),
                ("D", "8:15 p.m.", False)
            ],
            4, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_22", "Psicotécnico", "Razonamiento Matemático",
            "Un teniente distribuye cartuchos entre sus soldados: si entrega 8 a cada uno le sobran 14, pero si desea entregar 11 a cada uno le faltan 16 cartuchos. ¿Cuántos soldados integran la patrulla?",
            [
                ("A", "10 soldados", True),
                ("B", "8 soldados", False),
                ("C", "12 soldados", False),
                ("D", "15 soldados", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_23", "Psicotécnico", "Razonamiento Matemático",
            "En un depósito de intendencia hay 40 barriles de combustible: unos de 50 litros y otros de 20 litros. Si en total se almacenan 1,400 litros, ¿cuántos barriles son de 50 litros?",
            [
                ("A", "20 barriles", True),
                ("B", "15 barriles", False),
                ("C", "25 barriles", False),
                ("D", "18 barriles", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_24", "Psicotécnico", "Razonamiento Matemático",
            "La edad de un cadete es tal que al multiplicarla por 4, restarle 12, extraerle la raíz cuadrada al resultado, sumarle 6 y finalmente dividirlo entre 2, se obtiene 5. ¿Cuál es la edad del cadete?",
            [
                ("A", "7 años... corrección: 7 no, 7*4=28-12=16, sqrt=4+6=10/2=5 -> 7 años.", True),
                ("B", "9 años.", False),
                ("C", "8 años.", False),
                ("D", "10 años.", False)
            ],
            3, ["EMCH", "ETE", "CITEN", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_25", "Psicotécnico", "Razonamiento Matemático",
            "En una caja de pertrechos hay 15 granadas de humo, 12 granadas ofensivas y 18 granadas de gas lacrimógeno. ¿Cuántas se deben extraer al azar como mínimo para tener la certeza de poseer 5 de cada tipo?",
            [
                ("A", "38 extracciones", True),
                ("B", "35 extracciones", False),
                ("C", "40 extracciones", False),
                ("D", "30 extracciones", False)
            ],
            4, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "PSI_26", "Psicotécnico", "Razonamiento Matemático",
            "Dos patrullas parten simultáneamente de dos puntos A y B distantes 180 km y se dirigen al encuentro por carretera con rapideces de 40 km/h y 50 km/h. Un dron militar vuela entre ellas de un punto al otro a 120 km/h sin detenerse hasta que las patrullas se cruzan. ¿Qué distancia total recorrió el dron?",
            [
                ("A", "240 km", True),
                ("B", "180 km", False),
                ("C", "300 km", False),
                ("D", "200 km", False)
            ],
            4, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "PSI_27", "Psicotécnico", "Razonamiento Matemático",
            "Si 15 soldados cavan una trinchera de 60 metros en 4 horas, ¿cuántos soldados adicionales con el mismo rendimiento se requerirán para cavar una trinchera de 100 metros en 5 horas?",
            [
                ("A", "5 soldados adicionales (total 20)", True),
                ("B", "8 soldados adicionales", False),
                ("C", "10 soldados adicionales", False),
                ("D", "4 soldados adicionales", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_28", "Psicotécnico", "Razonamiento Matemático",
            "Un recipiente de 60 litros está lleno de alcohol de 80°. ¿Cuántos litros de agua pura se deben agregar para rebajar la concentración a 60°?",
            [
                ("A", "20 litros", True),
                ("B", "15 litros", False),
                ("C", "25 litros", False),
                ("D", "30 litros", False)
            ],
            4, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "PSI_29", "Psicotécnico", "Razonamiento Matemático",
            "Se tienen 3 recipientes con capacidades de 12, 8 y 5 litros. El primero está totalmente lleno de agua y los otros dos vacíos. No poseen marcas de medición. ¿Cuál es el número mínimo de trasvases necesarios para obtener exactamente 6 litros en el primer recipiente?",
            [
                ("A", "7 trasvases", True),
                ("B", "5 trasvases", False),
                ("C", "9 trasvases", False),
                ("D", "6 trasvases", False)
            ],
            5, ["EMCH", "ENP", "EOFAP"]
        ),
        (
            "PSI_30", "Psicotécnico", "Razonamiento Matemático",
            "¿Cuántas campanadas tocará el reloj de guardia del fuerte militar en un día completo si a cada hora en punto toca tantas campanadas como indica la hora (de 1 a 12) y a cada media hora toca una sola campanada?",
            [
                ("A", "180 campanadas", True),
                ("B", "156 campanadas", False),
                ("C", "168 campanadas", False),
                ("D", "192 campanadas", False)
            ],
            3, ["EMCH", "ETE", "CITEN", "ESOFA", "EO-PNP", "EESTP_PNP"]
        )
    ]

    for item in q_rm:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    # --- RAZONAMIENTO VERBAL (10 preguntas: PSI_31 a PSI_40) ---
    q_rv = [
        (
            "PSI_31", "Psicotécnico", "Razonamiento Verbal",
            "Identifique la analogía que reproduce con exactitud la relación: TIMÓN : NAVÍO ::",
            [
                ("A", "Palanca de mando : Aeronave", True),
                ("B", "Rueda : Carretera", False),
                ("C", "Brújula : Polo", False),
                ("D", "Mástil : Viento", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_32", "Psicotécnico", "Razonamiento Verbal",
            "Señale el término excluido del campo semántico de 'ACCIONES DE VIGILANCIA CASTRENSE':",
            [
                ("A", "Claudicación", True),
                ("B", "Centinela", False),
                ("C", "Aposta", False),
                ("D", "Ronda", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_33", "Psicotécnico", "Razonamiento Verbal",
            "Elija los conectores que completan con coherencia: 'El destacamento resistió el asedio _______ las municiones eran escasas, _______ sabían que la rendición significaba la pérdida del fuerte.'",
            [
                ("A", "a pesar de que - porque", True),
                ("B", "por ende - aunque", False),
                ("C", "ya que - sin embargo", False),
                ("D", "no obstante - mas", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_34", "Psicotécnico", "Razonamiento Verbal",
            "Determine el antónimo contextual de la palabra subrayada: 'El general mostró una actitud VENCEJERA e INDOMABLE ante las intimaciones del enemigo.'",
            [
                ("A", "Sumisa y pusilánime", True),
                ("B", "Altiva y soberbia", False),
                ("C", "Ecuánime y flemática", False),
                ("D", "Audaz y temeraria", False)
            ],
            4, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "PSI_35", "Psicotécnico", "Razonamiento Verbal",
            "Indique el sinónimo léxico de 'CONSPICUO':",
            [
                ("A", "Ilustre y sobresaliente", True),
                ("B", "Oscuro y recóndito", False),
                ("C", "Vulnerable y endeble", False),
                ("D", "Taciturno y sombrío", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_36", "Psicotécnico", "Razonamiento Verbal",
            "Identifique la oración que debe ser eliminada por redundancia: I) La disciplina militar exige puntualidad absoluta. II) El horario reglamentario debe respetarse rigurosamente. III) Los cadetes reciben formación física y académica. IV) Llegar a la hora indicada es una obligación insoslayable en el cuartel.",
            [
                ("A", "IV (reitera innecesariamente el concepto de puntualidad)", True),
                ("B", "III", False),
                ("C", "I", False),
                ("D", "II", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_37", "Psicotécnico", "Razonamiento Verbal",
            "Complete la serie analógica verbal: INFANTERÍA : TIERRA :: FUERZA AÉREA : AIRE ::",
            [
                ("A", "MARINA DE GUERRA : MAR", True),
                ("B", "ARTILLERÍA : CAÑÓN", False),
                ("C", "CABALLERÍA : CABALLO", False),
                ("D", "INGENIERÍA : PUENTE", False)
            ],
            1, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_38", "Psicotécnico", "Razonamiento Verbal",
            "¿Cuál es el significado etimológico de la raíz griega 'CRACIA' en palabras como Democracia o Aristocracia?",
            [
                ("A", "Gobierno, poder o autoridad.", True),
                ("B", "Estudio, tratado o ciencia.", False),
                ("C", "Pueblo, raza o linaje.", False),
                ("D", "Medida, dimensión o peso.", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "PSI_39", "Psicotécnico", "Razonamiento Verbal",
            "Lea el texto: 'El porte militar no radica en la rigidez vacía del cuerpo, sino en la prestancia moral que emana del respeto por la investidura que representa a la Nación.' Según el autor, el porte militar es primordialmente:",
            [
                ("A", "Una manifestación externa de convicción moral y respeto patriótico.", True),
                ("B", "Una exigencia puramente gimnástica y muscular.", False),
                ("C", "Un protocolo reservado únicamente a los oficiales de alto rango.", False),
                ("D", "Una imposición coercitiva ajena a la voluntad del soldado.", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "PSI_40", "Psicotécnico", "Razonamiento Verbal",
            "Identifique el ordenamiento lógico del texto 'EL COMBATE DE ANGAMOS': 1. El Huáscar combate en desventaja frente a la escuadra enemiga. 2. Miguel Grau asume el mando en el puerto de Iquique. 3. La marina de Chile cerca al blindado peruano en Punta Angamos. 4. Una bomba en la torre de mando ciega la vida del Almirante. 5. La tripulación intenta hundir la nave antes de caer prisionera.",
            [
                ("A", "2 - 3 - 1 - 4 - 5", True),
                ("B", "3 - 2 - 4 - 1 - 5", False),
                ("C", "2 - 1 - 3 - 5 - 4", False),
                ("D", "1 - 3 - 4 - 2 - 5", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        )
    ]

    for item in q_rv:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    return questions
