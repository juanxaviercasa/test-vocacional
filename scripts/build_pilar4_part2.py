#!/usr/bin/env python3
"""
Módulo de generación de preguntas para Pilar 4: Aptitud y Conocimientos
Parte 2: Ciencias Exactas (40 preguntas: MAT_01 a MAT_40)
- Aritmética (10: MAT_01 a MAT_10)
- Álgebra (10: MAT_11 a MAT_20)
- Geometría (10: MAT_21 a MAT_30)
- Trigonometría (10: MAT_31 a MAT_40)
"""

def get_ciencias_exactas_questions():
    questions = []

    # --- ARITMÉTICA (10 preguntas: MAT_01 a MAT_10) ---
    q_aritmetica = [
        (
            "MAT_01", "Ciencias Exactas", "Aritmética - Conjuntos",
            "De un grupo de 80 cadetes evaluados en instrucción militar, 48 aprobaron Tiro con Fusil, 36 aprobaron Natación de Combate y 12 no aprobaron ninguna de las dos disciplinas. ¿Cuántos cadetes aprobaron ambas disciplinas militares?",
            [
                ("A", "16 cadetes", True),
                ("B", "20 cadetes", False),
                ("C", "14 cadetes", False),
                ("D", "18 cadetes", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "MAT_02", "Ciencias Exactas", "Aritmética - Cuatro Operaciones",
            "En una armería hay 60 piezas entre fusiles Galil y pistolas Beretta. Si el total de piezas de repuesto requeridas es 210, sabiendo que cada fusil requiere 4 piezas y cada pistola 3 piezas, ¿cuántos fusiles Galil se encuentran en la armería?",
            [
                ("A", "30 fusiles", True),
                ("B", "35 fusiles", False),
                ("C", "25 fusiles", False),
                ("D", "40 fusiles", False)
            ],
            3, ["EMCH", "ETE", "CITEN", "ESOFA", "EESTP_PNP"]
        ),
        (
            "MAT_03", "Ciencias Exactas", "Aritmética - Divisibilidad y MCM",
            "Tres patrullas de la Policía de Fronteras parten simultáneamente del Puesto de Vigilancia 'La Tina': la primera retorna cada 12 días, la segunda cada 15 días y la tercera cada 18 días. ¿Después de cuántos días como mínimo volverán a coincidir en el puesto de vigilancia?",
            [
                ("A", "180 días", True),
                ("B", "90 días", False),
                ("C", "120 días", False),
                ("D", "360 días", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "MAT_04", "Ciencias Exactas", "Aritmética - Razones y Proporciones",
            "La razón geométrica entre el número de oficiales y suboficiales en una base aérea es de 3 a 7. Si se incorporan 15 oficiales y se retiran 5 suboficiales, la nueva relación es de 3 a 5. ¿Cuántos efectivos militares había inicialmente en dicha base aérea?",
            [
                ("A", "100 efectivos", True),
                ("B", "90 efectivos", False),
                ("C", "120 efectivos", False),
                ("D", "80 efectivos", False)
            ],
            3, ["EOFAP", "ESOFA", "EMCH", "CITEN"]
        ),
        (
            "MAT_05", "Ciencias Exactas", "Aritmética - Regla de Tres Compuesta",
            "Una patrulla de 20 infantes de marina cuenta con raciones de campaña para 30 días a razón de 3 raciones diarias por efectivo. Si se incorporan 5 infantes más y la ración se reduce a 2 raciones diarias por hombre, ¿para cuántos días alcanzarán los suministros de víveres?",
            [
                ("A", "36 días", True),
                ("B", "32 días", False),
                ("C", "40 días", False),
                ("D", "28 días", False)
            ],
            4, ["ENP", "CITEN", "EMCH", "EOFAP"]
        ),
        (
            "MAT_06", "Ciencias Exactas", "Aritmética - Tanto por Ciento",
            "El comandante de una unidad de ingeniería adquiere repuestos para maquinaria pesada por S/. 12,000. Por pago en efectivo el proveedor militar le otorga dos descuentos sucesivos del 10% y 20%. ¿Cuál fue el precio final neto abonado por la unidad militar?",
            [
                ("A", "S/. 8,640", True),
                ("B", "S/. 8,400", False),
                ("C", "S/. 9,000", False),
                ("D", "S/. 7,800", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EO-PNP"]
        ),
        (
            "MAT_07", "Ciencias Exactas", "Aritmética - Promedios",
            "En una prueba de tiro de combate de 4 rondas, un cadete obtuvo puntajes de 14, 16 y 18 en las tres primeras series de tiro. ¿Qué nota debe obtener en la cuarta ronda para que su promedio final ponderado sea de 17 puntos?",
            [
                ("A", "20 puntos", True),
                ("B", "19 puntos", False),
                ("C", "18 puntos", False),
                ("D", "17 puntos", False)
            ],
            2, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "MAT_08", "Ciencias Exactas", "Aritmética - Fracciones",
            "El depósito principal de combustible de una corbeta misilera se encuentra lleno hasta sus 3/5 de capacidad. Si se consumen 1,200 galones durante una maniobra táctica en alta mar, el nivel desciende a 1/3 de su capacidad total. ¿Cuál es la capacidad total en galones de dicho tanque?",
            [
                ("A", "4,500 galones", True),
                ("B", "3,800 galones", False),
                ("C", "5,000 galones", False),
                ("D", "4,200 galones", False)
            ],
            3, ["ENP", "CITEN", "EOFAP", "ESOFA"]
        ),
        (
            "MAT_09", "Ciencias Exactas", "Aritmética - Sistema de Numeración",
            "Un mensaje táctico codificado en el sistema quinario (base 5) registra la cantidad 432_((5)). Para ser interpretado por la computadora de tiro en el sistema decimal (base 10), ¿qué valor entero representa?",
            [
                ("A", "117", True),
                ("B", "112", False),
                ("C", "125", False),
                ("D", "108", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "CITEN"]
        ),
        (
            "MAT_10", "Ciencias Exactas", "Aritmética - Números Primos y Divisores",
            "¿Cuántos divisores positivos tiene el número 360, que representa los grados de azimut en una rosa náutica militar?",
            [
                ("A", "24 divisores", True),
                ("B", "18 divisores", False),
                ("C", "30 divisores", False),
                ("D", "20 divisores", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        )
    ]

    for item in q_aritmetica:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    # --- ÁLGEBRA (10 preguntas: MAT_11 a MAT_20) ---
    q_algebra = [
        (
            "MAT_11", "Ciencias Exactas", "Álgebra - Leyes de Exponentes",
            "Simplifique la siguiente expresión algebraica de potencia y radicación militar: E = (2^(n+4) - 2 * 2^n) / (2 * 2^(n+3)).",
            [
                ("A", "7/8", True),
                ("B", "3/4", False),
                ("C", "1/2", False),
                ("D", "1", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "CITEN", "ESOFA"]
        ),
        (
            "MAT_12", "Ciencias Exactas", "Álgebra - Productos Notables",
            "Si la suma de dos variables tácticas x + y = 6 y su producto x * y = 7, halle el valor numérico de la suma de sus cubos: E = x^3 + y^3.",
            [
                ("A", "90", True),
                ("B", "102", False),
                ("C", "84", False),
                ("D", "96", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "MAT_13", "Ciencias Exactas", "Álgebra - Polinomios",
            "Dado el polinomio P(x, y) = 3x^(m+1) y^(n-2) + 5x^(m+2) y^n, si su Grado Relativo respecto a x es GR(x) = 7 y su Grado Absoluto GA = 12, halle el valor de (m * n).",
            [
                ("A", "25", True),
                ("B", "20", False),
                ("C", "30", False),
                ("D", "15", False)
            ],
            3, ["EMCH", "ENP", "EOFAP"]
        ),
        (
            "MAT_14", "Ciencias Exactas", "Álgebra - División Algebraica",
            "Al dividir el polinomio dividendo D(x) = 2x^4 + 3x^3 - x^2 + 5x - 2 entre d(x) = x - 2 aplicando la regla de Ruffini o el Teorema del Resto, ¿cuál es el residuo obtenido?",
            [
                ("A", "60", True),
                ("B", "54", False),
                ("C", "48", False),
                ("D", "62", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EO-PNP"]
        ),
        (
            "MAT_15", "Ciencias Exactas", "Álgebra - Factorización",
            "Al factorizar por aspa simple el trinomio P(x) = 6x^2 - 11x - 10, ¿cuál de los siguientes binomios representa uno de sus factores primos lineales?",
            [
                ("A", "2x - 5", True),
                ("B", "3x + 5", False),
                ("C", "2x + 5", False),
                ("D", "6x - 1", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "MAT_16", "Ciencias Exactas", "Álgebra - Ecuaciones de Segundo Grado",
            "Si r_1 y r_2 son las raíces de la ecuación cuadrática 2x^2 - 7x + 3 = 0, calcule el valor de la suma inversa: (1/r_1) + (1/r_2).",
            [
                ("A", "7/3", True),
                ("B", "3/7", False),
                ("C", "7/2", False),
                ("D", "3/2", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "MAT_17", "Ciencias Exactas", "Álgebra - Sistemas de Ecuaciones Lineales",
            "Resuelva el sistema lineal de aprovisionamiento de vehículos blindados:\n2x + 3y = 31\n5x - 2y = 11\n¿Cuál es el valor de la suma de incógnitas (x + y)?",
            [
                ("A", "12", True),
                ("B", "10", False),
                ("C", "14", False),
                ("D", "9", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "MAT_18", "Ciencias Exactas", "Álgebra - Inecuaciones de Segundo Grado",
            "Determine el conjunto solución de la inecuación cuadrática que modela el rango de seguridad de una detonación controlada: x^2 - 4x - 21 <= 0.",
            [
                ("A", "[-3, 7]", True),
                ("B", "<-inf, -3] U [7, +inf>", False),
                ("C", "[-7, 3]", False),
                ("D", "< -3, 7 >", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "MAT_19", "Ciencias Exactas", "Álgebra - Funciones",
            "La trayectoria parabólica de un proyectil de mortero viene dada por la función de altura h(t) = -5t^2 + 40t, donde h se mide en metros y t en segundos. ¿Cuál es la altura máxima alcanzada por el proyectil?",
            [
                ("A", "80 metros", True),
                ("B", "100 metros", False),
                ("C", "60 metros", False),
                ("D", "75 metros", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "CITEN"]
        ),
        (
            "MAT_20", "Ciencias Exactas", "Álgebra - Logaritmos",
            "Calcule el valor de x en la siguiente ecuación logarítmica de frecuencia de transmisión radial: log_2(x + 5) + log_2(x - 2) = 3.",
            [
                ("A", "3", True),
                ("B", "4", False),
                ("C", "2", False),
                ("D", "6", False)
            ],
            4, ["EMCH", "ENP", "EOFAP"]
        )
    ]

    for item in q_algebra:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    # --- GEOMETRÍA (10 preguntas: MAT_21 a MAT_30) ---
    q_geometria = [
        (
            "MAT_21", "Ciencias Exactas", "Geometría - Ángulos entre Paralelas",
            "Dos avenidas paralelas L_1 y L_2 son atravesadas por una vía transversal secante L_3. Si dos ángulos conjugados internos miden (3x + 10°) y (2x + 20°), ¿cuál es el valor del ángulo agudo formado?",
            [
                ("A", "80°", True),
                ("B", "70°", False),
                ("C", "100°", False),
                ("D", "30°", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "MAT_22", "Ciencias Exactas", "Geometría - Triángulos y Líneas Notables",
            "En un triángulo acutángulo ABC de patrullaje táctico, el ángulo exterior en el vértice B mide 130°. Si los ángulos interiores en A y C están en la relación de 2 a 3, ¿cuánto mide el menor ángulo interior de dicho triángulo?",
            [
                ("A", "50°", False),
                ("B", "52°", True),
                ("C", "48°", False),
                ("D", "78°", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "MAT_23", "Ciencias Exactas", "Geometría - Triángulos Notables y Pitágoras",
            "Desde la cúspide de una torre de control militar de 45 metros de altura se observa un vehículo blindado bajo un ángulo visual que forma con el suelo un triángulo rectángulo de 37° y 53°. Si la distancia de la torre al objetivo es el cateto adyacente al ángulo de 37°, ¿a qué distancia de la base de la torre se ubica el vehículo?",
            [
                ("A", "60 metros", True),
                ("B", "55 metros", False),
                ("C", "75 metros", False),
                ("D", "45 metros", False)
            ],
            3, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP"]
        ),
        (
            "MAT_24", "Ciencias Exactas", "Geometría - Congruencia y Semejanza",
            "Un mástil de comunicaciones militares de 8 m de altura proyecta sobre el terreno una sombra de 6 m. A esa misma hora y lugar, un edificio del cuartel general proyecta una sombra de 24 m. ¿Cuál es la altura del edificio militar?",
            [
                ("A", "32 metros", True),
                ("B", "30 metros", False),
                ("C", "28 metros", False),
                ("D", "36 metros", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "MAT_25", "Ciencias Exactas", "Geometría - Cuadriláteros",
            "En un trapecio isósceles que delimita un perímetro de seguridad, la base mayor mide 28 m, la base menor mide 12 m y los lados no paralelos miden 10 m cada uno. Calcule el área del terreno encerrado por dicho trapecio.",
            [
                ("A", "120 m²", False),
                ("B", "160 m²", True),
                ("C", "140 m²", False),
                ("D", "180 m²", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "MAT_26", "Ciencias Exactas", "Geometría - Circunferencia",
            "Desde un punto exterior P situado a 13 cm del centro de una antena de radar circular de radio r = 5 cm, se traza una línea tangente que hace contacto con la circunferencia en el punto T. ¿Cuál es la longitud del segmento tangente PT?",
            [
                ("A", "12 cm", True),
                ("B", "10 cm", False),
                ("C", "11 cm", False),
                ("D", "14 cm", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "CITEN"]
        ),
        (
            "MAT_27", "Ciencias Exactas", "Geometría - Relaciones Métricas",
            "En un triángulo rectángulo ABC recto en B, se traza la altura relativa a la hipotenusa BH. Si las proyecciones de los catetos sobre la hipotenusa son AH = 9 cm y HC = 16 cm, ¿cuál es la longitud de la altura BH?",
            [
                ("A", "12 cm", True),
                ("B", "14 cm", False),
                ("C", "10 cm", False),
                ("D", "15 cm", False)
            ],
            3, ["EMCH", "ENP", "EOFAP"]
        ),
        (
            "MAT_28", "Ciencias Exactas", "Geometría - Áreas de Regiones Poligonales",
            "Un helipuerto militar tiene forma de círculo inscrito exactamente dentro de un terreno cuadrado de 20 metros de lado. Calcule el área de la superficie de aterrizaje circular (considere pi = 3.14).",
            [
                ("A", "314 m²", True),
                ("B", "400 m²", False),
                ("C", "157 m²", False),
                ("D", "628 m²", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "MAT_29", "Ciencias Exactas", "Geometría del Espacio - Cilindro y Prisma",
            "Un tanque cisterna para agua potable en campaña tiene forma cilíndrica circular recta de radio basal r = 2 m y altura h = 5 m. ¿Cuál es el volumen total de agua en metros cúbicos que puede almacenar a capacidad plena? (considere pi).",
            [
                ("A", "20*pi m³", True),
                ("B", "10*pi m³", False),
                ("C", "40*pi m³", False),
                ("D", "25*pi m³", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "CITEN"]
        ),
        (
            "MAT_30", "Ciencias Exactas", "Geometría Analítica Plana",
            "En una cuadrícula cartográfica militar, la base Alfa está ubicada en las coordenadas A(2, 3) y el puesto avanzado Bravo en B(8, 11). Calcule la distancia en línea recta entre ambos emplazamientos tácticos.",
            [
                ("A", "10 unidades", True),
                ("B", "12 unidades", False),
                ("C", "14 unidades", False),
                ("D", "8 unidades", False)
            ],
            2, ["EMCH", "ENP", "EOFAP", "EO-PNP", "CITEN"]
        )
    ]

    for item in q_geometria:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    # --- TRIGONOMETRÍA (10 preguntas: MAT_31 a MAT_40) ---
    q_trigonometria = [
        (
            "MAT_31", "Ciencias Exactas", "Trigonometría - Sistemas de Medición Angular",
            "En un goniómetro de artillería, se detecta un objetivo a un ángulo de 72 grados sexagesimales. ¿A cuántos radianes equivale dicho ángulo de tiro en el sistema radial?",
            [
                ("A", "2*pi / 5 rad", True),
                ("B", "3*pi / 5 rad", False),
                ("C", "pi / 3 rad", False),
                ("D", "4*pi / 5 rad", False)
            ],
            2, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "MAT_32", "Ciencias Exactas", "Trigonometría - Razones de Ángulos Agudos",
            "En un triángulo rectángulo ABC recto en B, se conoce que tg(A) = 5/12. Halle el valor de la función trigonométrica cos(A).",
            [
                ("A", "12/13", True),
                ("B", "5/13", False),
                ("C", "13/12", False),
                ("D", "12/5", False)
            ],
            2, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "MAT_33", "Ciencias Exactas", "Trigonometría - Ángulos Notables",
            "Calcule el valor numérico exacto de la expresión balística: E = sen(30°) + cos(60°) + tg(45°).",
            [
                ("A", "2", True),
                ("B", "1.5", False),
                ("C", "2.5", False),
                ("D", "1", False)
            ],
            1, ["EMCH", "ETE", "ENP", "CITEN", "EOFAP", "ESOFA", "EO-PNP", "EESTP_PNP"]
        ),
        (
            "MAT_34", "Ciencias Exactas", "Trigonometría - Ángulos de Elevación y Depresión",
            "Desde la proa de una fragata patrullera se divisa la cima de un faro costero con un ángulo de elevación de 30°. Si la distancia horizontal desde la nave hasta la base del faro es de 120 metros, ¿cuál es la altura del faro sobre el nivel del mar? (considere tg(30°) = sqrt(3)/3).",
            [
                ("A", "40 * sqrt(3) metros", True),
                ("B", "60 * sqrt(3) metros", False),
                ("C", "30 * sqrt(3) metros", False),
                ("D", "80 metros", False)
            ],
            3, ["ENP", "CITEN", "EMCH", "EOFAP"]
        ),
        (
            "MAT_35", "Ciencias Exactas", "Trigonometría - Ángulos en Posición Normal",
            "Si el punto P(-3, 4) pertenece al lado final de un ángulo en posición normal 'theta', determine el valor numérico de sen(theta) * cos(theta).",
            [
                ("A", "-12/25", True),
                ("B", "12/25", False),
                ("C", "-7/25", False),
                ("D", "-16/25", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "MAT_36", "Ciencias Exactas", "Trigonometría - Reducción al Primer Cuadrante",
            "Reduzca al primer cuadrante y determine el valor exacto de la razón trigonométrica: cos(150°).",
            [
                ("A", "-sqrt(3)/2", True),
                ("B", "sqrt(3)/2", False),
                ("C", "-1/2", False),
                ("D", "1/2", False)
            ],
            3, ["EMCH", "ENP", "EOFAP"]
        ),
        (
            "MAT_37", "Ciencias Exactas", "Trigonometría - Identidades Fundamentales",
            "Simplifique la siguiente expresión trigonométrica: E = (sen^2(x) + cos^2(x)) / (1 + tg^2(x)).",
            [
                ("A", "cos^2(x)", True),
                ("B", "sen^2(x)", False),
                ("C", "sec^2(x)", False),
                ("D", "1", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "CITEN"]
        ),
        (
            "MAT_38", "Ciencias Exactas", "Trigonometría - Razones de Ángulos Compuestos",
            "Calcule el valor exacto de sen(75°) aplicando la identidad del seno de la suma de dos ángulos notables: sen(45° + 30°).",
            [
                ("A", "(sqrt(6) + sqrt(2)) / 4", True),
                ("B", "(sqrt(6) - sqrt(2)) / 4", False),
                ("C", "(sqrt(3) + 1) / 2", False),
                ("D", "sqrt(6) / 4", False)
            ],
            4, ["EMCH", "ENP", "EOFAP"]
        ),
        (
            "MAT_39", "Ciencias Exactas", "Trigonometría - Ángulo Doble",
            "Si sen(x) * cos(x) = 1/4, determine de manera directa el valor del seno del ángulo doble: sen(2x).",
            [
                ("A", "1/2", True),
                ("B", "1/4", False),
                ("C", "1", False),
                ("D", "3/4", False)
            ],
            3, ["EMCH", "ENP", "EOFAP", "EO-PNP"]
        ),
        (
            "MAT_40", "Ciencias Exactas", "Trigonometría - Resolución de Triángulos Oblicuángulos",
            "Dos buques de guerra zarpan del puerto del Callao siguiendo rumbos rectilíneos que forman entre sí un ángulo de 60°. Si uno navega 8 millas y el otro navega 5 millas náuticas, ¿cuál es la distancia en millas que los separa? (Aplique la Ley de Cosenos: c² = a² + b² - 2ab*cos(60°)).",
            [
                ("A", "7 millas", True),
                ("B", "sqrt(65) millas", False),
                ("C", "9 millas", False),
                ("D", "sqrt(89) millas", False)
            ],
            4, ["ENP", "CITEN", "EMCH", "EOFAP"]
        )
    ]

    for item in q_trigonometria:
        id_p, area, tema, enun, opts_raw, dif, esc = item
        options = [{"id_opcion": o[0], "texto_respuesta": o[1], "es_correcta": o[2]} for o in opts_raw]
        questions.append({
            "id_pregunta": id_p, "area_academica": area, "tema_especifico": tema,
            "enunciado": enun, "opciones": options, "nivel_dificultad": dif, "escuelas_relacionadas": esc
        })

    return questions

if __name__ == "__main__":
    qs = get_ciencias_exactas_questions()
    print(f"Total Ciencias Exactas: {len(qs)}")
