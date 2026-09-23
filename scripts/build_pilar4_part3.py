#!/usr/bin/env python3
"""
Módulo de generación de preguntas para Pilar 4: Aptitud y Conocimientos
Parte 3: Ciencias Naturales (30 preguntas: CIE_01 a CIE_30)
- Física (18: CIE_01 a CIE_18)
- Química (12: CIE_19 a CIE_30)
"""

def get_ciencias_naturales_questions():
    questions = []

    # --- FÍSICA (18 preguntas: CIE_01 a CIE_18) ---
    q_fisica = [
        (
            "CIE_01", "Ciencias Naturales", "Física - Análisis Dimensional",
            "En balística militar, la energía cinética de un proyectil viene dada por E = (1/2) * m * v^2. ¿Cuáles son las dimensiones físicas de la energía [E] en el Sistema Internacional de Unidades?",
            [
                ("A", "M * L^2 * T^(-2)", True),
                ("B", "M * L * T^(-2)", False),
                ("C", "M * L^2 * T^(-1)", False),
                ("D", "M * L^(-1) * T^(-2)", False)
            ],
            2, ["EMCH", "ENP", "EOFAP", "CITEN", "ESOFA"]
        ),
        (
            "CIE_02", "Ciencias Naturales", "Física - Vectores",
            "Dos patrullas de rescate de montaña aplican fuerzas de tracción sobre un vehículo atascado en el lodo con magnitudes de 300 N y 400 N formando un ángulo recto (90°) entre sí. ¿Cuál es la magnitud de la fuerza resultante aplicada sobre el móvil?",
            [
                ("A", "500 N", True),
                ("B", "700 N", False),
                ("C", "100 N", False),
                ("D", "350 N", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "CIE_03", "Ciencias Naturales", "Física - Cinemática MRU",
            "Una patrullera fluvial de la Marina viaja en el río Ucayali a una velocidad constante de 36 km/h. ¿Cuántos metros recorre la embarcación táctica durante un patrullaje continuo de 25 segundos?",
            [
                ("A", "250 metros", True),
                ("B", "900 metros", False),
                ("C", "360 metros", False),
                ("D", "180 metros", False)
            ],
            2, ["ENP", "CITEN", "EMCH", "EO-PNP"]
        ),
        (
            "CIE_04", "Ciencias Naturales", "Física - Cinemática MRUV",
            "Un avión de combate Mirage 2000 parte del reposo en la pista de despegue de la Base Aérea de La Joya y acelera de manera constante a razón de 5 m/s² durante 12 segundos antes de levantar vuelo. ¿Qué velocidad alcanza al momento del despegue?",
            [
                ("A", "60 m/s", True),
                ("B", "50 m/s", False),
                ("C", "72 m/s", False),
                ("D", "45 m/s", False)
            ],
            2, ["EOFAP", "ESOFA", "EMCH", "ENP"]
        ),
        (
            "CIE_05", "Ciencias Naturales", "Física - Caída Libre",
            "Desde un helicóptero MI-17 en vuelo estacionario a gran altitud, un paracaidista del Ejército realiza un salto libre. Si desciende en caída libre durante 4 segundos antes de abrir su paracaídas, ¿qué distancia vertical ha descendido? (considere g = 10 m/s²).",
            [
                ("A", "80 metros", True),
                ("B", "40 metros", False),
                ("C", "100 metros", False),
                ("D", "120 metros", False)
            ],
            3, ["EMCH", "EOFAP", "ENP", "ETE"]
        ),
        (
            "CIE_06", "Ciencias Naturales", "Física - Movimiento Parabólico",
            "Un mortero de infantería dispara una granada con una velocidad inicial de 50 m/s y un ángulo de tiro de 37° respecto a la horizontal. Calcule el tiempo total de vuelo del proyectil hasta impactar en el terreno plano. (sen(37°) = 0.6; g = 10 m/s²).",
            [
                ("A", "6 segundos", True),
                ("B", "3 segundos", False),
                ("C", "8 segundos", False),
                ("D", "5 segundos", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "CIE_07", "Ciencias Naturales", "Física - Movimiento Circular",
            "La hélice propulsora de una lancha de interdicción marítima gira uniformemente a 1,200 revoluciones por minuto (RPM). ¿Cuál es la velocidad angular de giro en radianes por segundo?",
            [
                ("A", "40*pi rad/s", True),
                ("B", "20*pi rad/s", False),
                ("C", "60*pi rad/s", False),
                ("D", "120*pi rad/s", False)
            ],
            3, ["ENP", "CITEN", "EOFAP", "ESOFA"]
        ),
        (
            "CIE_08", "Ciencias Naturales", "Física - Estática (Primera Condición)",
            "Un reflector táctico de 60 N de peso cuelga en equilibrio del techo del hangar sostenido simétricamente por dos cuerdas tensas que forman ángulos iguales de 30° con la horizontal. ¿Cuál es el valor de la tensión en cada una de las dos cuerdas? (sen(30°) = 0.5).",
            [
                ("A", "60 N", True),
                ("B", "30 N", False),
                ("C", "120 N", False),
                ("D", "45 N", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "CIE_09", "Ciencias Naturales", "Física - Estática (Segunda Condición - Torque)",
            "Una viga homogénea de 4 metros de longitud y 200 N de peso está apoyada horizontalmente en sus dos extremos A y B. Si una carga militar de 400 N se coloca a 1 metro del extremo A, ¿cuál es la fuerza de reacción ejercida por el soporte en el extremo A?",
            [
                ("A", "400 N", True),
                ("B", "300 N", False),
                ("C", "350 N", False),
                ("D", "500 N", False)
            ],
            4, ["EMCH", "ENP", "EOFAP", "CITEN"]
        ),
        (
            "CIE_10", "Ciencias Naturales", "Física - Dinámica Lineal",
            "Un vehículo blindado de transporte de personal de 4,000 kg de masa se desplaza sobre terreno horizontal. Si el motor ejerce una fuerza de empuje neta constante de 8,000 N, ¿cuál es la aceleración lineal que experimenta el blindado?",
            [
                ("A", "2.0 m/s²", True),
                ("B", "0.5 m/s²", False),
                ("C", "4.0 m/s²", False),
                ("D", "1.5 m/s²", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "CIE_11", "Ciencias Naturales", "Física - Dinámica Circular",
            "Un avión cazabombardero de 8,000 kg efectúa un giro táctico horizontal a 200 m/s describiendo una trayectoria circular de radio 2,000 metros. ¿Cuál es el valor de la fuerza centrípeta requerida para mantener dicho radio de curvatura?",
            [
                ("A", "160,000 N", True),
                ("B", "80,000 N", False),
                ("C", "320,000 N", False),
                ("D", "40,000 N", False)
            ],
            3, ["EOFAP", "ESOFA", "ENP", "EMCH"]
        ),
        (
            "CIE_12", "Ciencias Naturales", "Física - Trabajo y Potencia",
            "Un montacargas militar eleva un lote de pertrechos de 500 kg verticalmente a una altura de 6 metros a velocidad constante durante 15 segundos. ¿Cuál es la potencia media desarrollada por el motor del elevador? (g = 10 m/s²).",
            [
                ("A", "2,000 W", True),
                ("B", "3,000 W", False),
                ("C", "1,500 W", False),
                ("D", "4,500 W", False)
            ],
            3, ["EMCH", "ETE", "CITEN", "ESOFA"]
        ),
        (
            "CIE_13", "Ciencias Naturales", "Física - Conservación de la Energía Mecánica",
            "Un carro oruga de entrenamiento de 200 kg parte del reposo desde lo alto de una colina inclinada a 20 metros de altura sobre el suelo. Si se desprecia la fricción con el terreno, ¿con qué rapidez llega a la base de la colina? (g = 10 m/s²).",
            [
                ("A", "20 m/s", True),
                ("B", "15 m/s", False),
                ("C", "25 m/s", False),
                ("D", "10 m/s", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "CITEN"]
        ),
        (
            "CIE_14", "Ciencias Naturales", "Física - Cantidad de Movimiento e Impulso",
            "Un fusil de asalto de 4 kg de masa dispara un proyectil de 0.02 kg (20 gramos) con una velocidad en boca de fuego de 800 m/s. Por el principio de conservación de la cantidad de movimiento lineal, ¿cuál es la rapidez de retroceso que experimenta el arma?",
            [
                ("A", "4.0 m/s", True),
                ("B", "2.0 m/s", False),
                ("C", "8.0 m/s", False),
                ("D", "1.5 m/s", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EO-PNP"]
        ),
        (
            "CIE_15", "Ciencias Naturales", "Física - Hidrostática (Arquímedes)",
            "Un submarino sumergido en agua de mar (densidad = 1,025 kg/m³) desaloja un volumen de 100 m³. ¿Cuál es la magnitud del empuje hidrostático ascendente que experimenta el casco del submarino? (g = 10 m/s²).",
            [
                ("A", "1,025,000 N", True),
                ("B", "102,500 N", False),
                ("C", "2,050,000 N", False),
                ("D", "512,500 N", False)
            ],
            3, ["ENP", "CITEN", "EMCH", "EOFAP"]
        ),
        (
            "CIE_16", "Ciencias Naturales", "Física - Calorimetría",
            "¿Qué cantidad de calor en calorías se necesita suministrar a 500 gramos de agua pura para elevar su temperatura de 20°C a 70°C en un calentador de campaña? (Calor específico del agua = 1 cal/g°C).",
            [
                ("A", "25,000 calorías", True),
                ("B", "35,000 calorías", False),
                ("C", "15,000 calorías", False),
                ("D", "50,000 calorías", False)
            ],
            2, ["EMCH", "ETE", "CITEN", "ESOFA", "EESTP_PNP"]
        ),
        (
            "CIE_17", "Ciencias Naturales", "Física - Electrostática",
            "Dos cargas eléctricas puntuales de +4 microC y +9 microC se encuentran situadas en el vacío separadas por una distancia de 0.3 metros. Calcule la magnitud de la fuerza electrostática de repulsión entre ambas. (Constante k = 9 x 10^9 N*m²/C²).",
            [
                ("A", "3.6 N", True),
                ("B", "1.2 N", False),
                ("C", "7.2 N", False),
                ("D", "0.9 N", False)
            ],
            3, ["EMCH", "ENP", "EOFAP"]
        ),
        (
            "CIE_18", "Ciencias Naturales", "Física - Circuitos Eléctricos y Ley de Ohm",
            "Un equipo de comunicaciones tácticas HF de la patrulla militar se alimenta con una batería de 24 V de corriente continua. Si el circuito interno presenta una resistencia equivalente de 8 ohmios, ¿cuál es la intensidad de corriente eléctrica que circula por el equipo?",
            [
                ("A", "3 Amperios", True),
                ("B", "4 Amperios", False),
                ("C", "2 Amperios", False),
                ("D", "6 Amperios", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        )
    ]

    for item in q_fisica:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    # --- QUÍMICA (12 preguntas: CIE_19 a CIE_30) ---
    q_quimica = [
        (
            "CIE_19", "Ciencias Naturales", "Química - Materia y Fenómenos Químicos",
            "¿Cuál de los siguientes procesos observados en operaciones tácticas corresponde a un fenómeno o cambio estrictamente químico?",
            [
                ("A", "La combustión de la pólvora sin humo al detonar un cartucho.", True),
                ("B", "La evaporación del rocío matinal sobre el blindaje de un tanque.", False),
                ("C", "La fragmentación de una granada de instrucción en pedazos metálicos.", False),
                ("D", "La disolución de sales de rehidratación oral en agua potable.", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "CIE_20", "Ciencias Naturales", "Química - Estructura Atómica",
            "Un átomo neutro de titanio empleado en aleaciones aeronáuticas militares posee 22 protones y 26 neutrones en su núcleo. ¿Cuáles son su número atómico (Z) y su número de masa (A) respectivamente?",
            [
                ("A", "Z = 22, A = 48", True),
                ("B", "Z = 26, A = 48", False),
                ("C", "Z = 22, A = 26", False),
                ("D", "Z = 48, A = 22", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA"]
        ),
        (
            "CIE_21", "Ciencias Naturales", "Química - Configuración Electrónica",
            "¿Cuál es la configuración electrónica en el estado basal de un átomo de hierro (Fe, Z = 26), elemento clave en la industria de blindajes y cañones militares?",
            [
                ("A", "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶", True),
                ("B", "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d⁷", False),
                ("C", "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁸", False),
                ("D", "1s² 2s² 2p⁶ 3s² 3p⁴ 4s² 3d⁸", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "CITEN"]
        ),
        (
            "CIE_22", "Ciencias Naturales", "Química - Tabla Periódica Moderna",
            "En la Tabla Periódica Moderna, los elementos que pertenecen al Grupo 17 (VIIA), caracterizados por su alta reactividad y por formar sales desinfectantes como el cloro y el yodo, se denominan:",
            [
                ("A", "Halógenos", True),
                ("B", "Metales alcalinotérreos", False),
                ("C", "Gases nobles", False),
                ("D", "Calcógenos o anfígenos", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "CIE_23", "Ciencias Naturales", "Química - Enlace Químico",
            "¿Qué tipo de enlace químico predomina en la estructura del cloruro de sodio (NaCl), sustancia indispensable en la preservación de alimentos y equilibrio hidroelectrolítico de campaña?",
            [
                ("A", "Enlace iónico o electrovalente", True),
                ("B", "Enlace covalente apolar", False),
                ("C", "Enlace metálico puro", False),
                ("D", "Enlace por puente de hidrógeno", False)
            ],
            2, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "CIE_24", "Ciencias Naturales", "Química - Nomenclatura Inorgánica",
            "El hidróxido de aluminio, Al(OH)3, es un compuesto utilizado como retardante de fuego y antiácido estomacal para tropas. ¿Cuál es el estado de oxidación del aluminio en dicho compuesto?",
            [
                ("A", "+3", True),
                ("B", "+2", False),
                ("C", "+1", False),
                ("D", "-3", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EO-PNP"]
        ),
        (
            "CIE_25", "Ciencias Naturales", "Química - Reacciones Químicas y Balance",
            "Balancee por tanteo la reacción de combustión completa del gas propano utilizado en las cocinas de campaña militar:\nC3H8 + O2 -> CO2 + H2O.\n¿Cuál es la suma total de los coeficientes estequiométricos enteros mínimos?",
            [
                ("A", "13", True),
                ("B", "10", False),
                ("C", "12", False),
                ("D", "15", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "CITEN"]
        ),
        (
            "CIE_26", "Ciencias Naturales", "Química - Estequiometría",
            "¿Cuántos moles de dióxido de carbono (CO2) se producen al quemar completamente 2 moles de gas propano (C3H8) según la ecuación: C3H8 + 5 O2 -> 3 CO2 + 4 H2O?",
            [
                ("A", "6 moles", True),
                ("B", "3 moles", False),
                ("C", "5 moles", False),
                ("D", "8 moles", False)
            ],
            3, ["EMCH", "ENP", "EOFAP"]
        ),
        (
            "CIE_27", "Ciencias Naturales", "Química - Gases Ideales",
            "Un cilindro de oxígeno para rescate médico militar de 10 litros de volumen contiene gas a una presión de 4 atmósferas y una temperatura de 300 K. Si el volumen se reduce a la mitad (5 litros) manteniendo la temperatura constante (Ley de Boyle), ¿cuál será la nueva presión del gas?",
            [
                ("A", "8 atmósferas", True),
                ("B", "2 atmósferas", False),
                ("C", "4 atmósferas", False),
                ("D", "16 atmósferas", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "CIE_28", "Ciencias Naturales", "Química - Soluciones Químicas",
            "Para desinfectar las instalaciones de un campamento militar se preparan 2 litros de una solución acuosa de hipoclorito de sodio con una concentración 0.5 Molar. ¿Cuántos moles de soluto contiene dicha solución desinfectante?",
            [
                ("A", "1.0 mol", True),
                ("B", "0.5 moles", False),
                ("C", "2.0 moles", False),
                ("D", "0.25 moles", False)
            ],
            2, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "CIE_29", "Ciencias Naturales", "Química - Ácidos, Bases y pH",
            "Una muestra de agua analizada por el personal de Sanidad en una zona ribereña presenta una concentración de iones hidrógeno [H+] = 10^(-8) M. ¿Cuál es el pH de la muestra y qué carácter químico posee?",
            [
                ("A", "pH = 8, básica o alcalina", True),
                ("B", "pH = 8, ácida", False),
                ("C", "pH = 6, ácida", False),
                ("D", "pH = 7, neutra", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "CIE_30", "Ciencias Naturales", "Química - Química Orgánica (Hidrocarburos)",
            "El octano (C8H18) es un hidrocarburo representativo de las gasolinas de alto octanaje empleadas en vehículos de reconocimiento. ¿A qué serie homóloga de hidrocarburos acíclicos saturados pertenece según su fórmula molecular C_n H_(2n+2)?",
            [
                ("A", "Alcanos o parafinas", True),
                ("B", "Alquenos u olefinas", False),
                ("C", "Alquinos o acetilenos", False),
                ("D", "Cicloalcanos", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        )
    ]

    for item in q_quimica:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    return questions

if __name__ == "__main__":
    qs = get_ciencias_naturales_questions()
    print(f"Total Ciencias Naturales: {len(qs)}")
