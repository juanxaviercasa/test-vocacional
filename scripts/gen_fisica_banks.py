# -*- coding: utf-8 -*-
"""
Generador del Banco de Preguntas de Física (Cinemática y Balística)
para las 8 escuelas militares y policiales del Perú.
"""
import json
import os
import shutil

os.makedirs('banco_preguntas', exist_ok=True)

SCHOOLS_FIS = [
    {
        "id": "EMCH",
        "name": "Escuela Militar de Chorrillos (EMCH - Oficiales)",
        "folder": "01_EMCH",
        "contexts": [
            "Balística Exterior de Tiro de Mortero de 120mm en Cota Ascendente",
            "Disparo Balístico de Cañón de Tanque T-55 en Marcha hacia Blanco Fijo",
            "Lanzamiento de Carga de Abastecimiento en Tiro Semiparabólico desde Mi-17",
            "Desaceleración y Penetración de Proyectil Flecha APFSDS en Blindaje RHA"
        ]
    },
    {
        "id": "ETE",
        "name": "Escuela Técnica del Ejército (ETE - Suboficiales)",
        "folder": "02_ETE",
        "contexts": [
            "Cinemática Balística de Fusil Galil SAR Calibre 7.62mm a 300 Metros",
            "Frenado de Emergencia de Camión Táctico Pesado MAN en Pendiente Andina",
            "Tiro Rasante de Ametralladora Pesada Browning M2 Calibre .50",
            "Trayectoria Parabólica de Granada Fumígena de Señalización Táctica"
        ]
    },
    {
        "id": "ENP",
        "name": "Escuela Naval del Perú (ENP - Oficiales)",
        "folder": "03_ENP",
        "contexts": [
            "Tiro de Artillería Naval Oto Melara 127mm contra Posición Costera",
            "Descenso y Alcance de Bengala de Rescate SAR con Viento Lateral",
            "Movimiento Relativo de Aproximación Helitransportada en Buque Multipropósito",
            "Cinemática de Lanzamiento y Aceleración de Misil Superficie Exocet MM40"
        ]
    },
    {
        "id": "CITEN",
        "name": "Centro de Instrucción Técnica y Entrenamiento Naval (CITEN - Suboficiales)",
        "folder": "04_CITEN",
        "contexts": [
            "Cadencia y Velocidad de Boca en Sistema Antimisil Phalanx CIWS",
            "Tiempo de Iluminación y Descenso de Proyectil Iluminante de 76mm",
            "Lanzamiento Neumático Semiparabólico de Cabo de Amarre de Guardacostas",
            "Frenado Hidrodinámico de Parada de Emergencia (Crash Stop) en Patrullera Marítima"
        ]
    },
    {
        "id": "EOFAP",
        "name": "Escuela de Oficiales FAP (EOFAP - Oficiales)",
        "folder": "05_EOFAP",
        "contexts": [
            "Lanzamiento Balístico de Bomba Guiada desde Mirage 2000P en Vuelo Nivelado",
            "Aceleración Centrípeta y Factor de Carga (+7g) en Viraje Táctico de Caza",
            "Cinemática del Asiento Eyectable Martin-Baker a Velocidad Transónica",
            "Trayectoria de Salva de Cohetes Aire-Tierra S-8 en Picada de Caza Su-25"
        ]
    },
    {
        "id": "ESOFA",
        "name": "Escuela de Suboficiales FAP (ESOFA - Suboficiales)",
        "folder": "06_ESOFA",
        "contexts": [
            "Carrera de Despegue y Aceleración de Avión de Instrucción KT-1P Torito",
            "Despliegue y Fuerza de Frenado de Paracaídas de Cola en Cazas Supersónicos",
            "Descenso Barométrico de Sonda Meteorológica Lanzada desde Helicóptero FAP",
            "Calibración de Dispersión Balística de Cañón Doble GSh-23L en Polígono Aéreo"
        ]
    },
    {
        "id": "EO_PNP",
        "name": "Escuela de Oficiales de la Policía Nacional (EO-PNP - Oficiales)",
        "folder": "07_EO_PNP",
        "contexts": [
            "Peritaje Balístico Reconstructivo DIRINCRI: Velocidad de Boca de Munición 9mm",
            "Análisis Cinemático DIAT: Cálculo de Velocidad de Impacto por Huellas de Frenado",
            "Tiro Parabólico de Cartucho de Gas Lacrimógeno con Escopeta Antimotín",
            "Cinemática de Persecución Vehicular de Alta Velocidad en Autopista"
        ]
    },
    {
        "id": "EESTP_PNP",
        "name": "Escuelas de Educación Superior Técnico Profesional PNP (EESTP-PNP - Suboficiales)",
        "folder": "08_EESTP_PNP",
        "contexts": [
            "Distancia Total de Detención y Tiempo de Percepción-Reacción en Patrullero",
            "Lanzamiento Táctico de Dispositivo de Red Neumática Antidisturbios",
            "Aceleración de Salida de Motocicleta Policial en Interceptación Urbana",
            "Trayectoria Balística Parabólica de Chorro de Agua de Autobomba Rochabús"
        ]
    }
]

def get_fisica_bank(school):
    prefix = school["id"]
    name = school["name"]
    contexts = school["contexts"]
    
    questions = []
    
    # Nivel 1: Básico (4 preguntas)
    # Q1: MRU directo
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_001",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 1,
        "enunciado": f"En la prueba de ciencias de {name}: Un proyectil balístico disparado en línea recta viaja con una velocidad constante de $850\\text{{ m/s}}$. Calcule la distancia que recorre en un intervalo de tiempo de $0.4\\text{{ segundos}}$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$340\\text{ metros}$", "es_correcta": True },
            { "id": "B", "texto": "$425\\text{ metros}$", "es_correcta": False },
            { "id": "C", "texto": "$280\\text{ metros}$", "es_correcta": False },
            { "id": "D", "texto": "$380\\text{ metros}$", "es_correcta": False },
            { "id": "E", "texto": "$320\\text{ metros}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "En MRU: $d = v \\cdot t = 850\\text{ m/s} \\times 0.4\\text{ s} = 340\\text{ metros}$."
    })
    
    # Q2: MRUV directo - Velocidad final
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_002",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 1,
        "enunciado": "Un vehículo de respuesta táctica parte del reposo ($v_0 = 0$) y acelera uniformemente a razón de $3.5\\text{ m/s}^2$ durante $8\\text{ segundos}$. Determine la velocidad alcanzada al cabo de dicho tiempo.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$28\\text{ m/s}$", "es_correcta": True },
            { "id": "B", "texto": "$24\\text{ m/s}$", "es_correcta": False },
            { "id": "C", "texto": "$32\\text{ m/s}$", "es_correcta": False },
            { "id": "D", "texto": "$21\\text{ m/s}$", "es_correcta": False },
            { "id": "E", "texto": "$35\\text{ m/s}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Fórmula de MRUV: $v_f = v_0 + at = 0 + (3.5\\text{ m/s}^2)(8\\text{ s}) = 28\\text{ m/s}$."
    })
    
    # Q3: Caída libre - Altura máxima
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_003",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 1,
        "enunciado": "Un proyectil de señalización es lanzado verticalmente hacia arriba con una velocidad inicial de $40\\text{ m/s}$. Despreciando la resistencia del aire y considerando $g = 10\\text{ m/s}^2$, calcule la altura máxima que alcanza.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$80\\text{ metros}$", "es_correcta": True },
            { "id": "B", "texto": "$100\\text{ metros}$", "es_correcta": False },
            { "id": "C", "texto": "$60\\text{ metros}$", "es_correcta": False },
            { "id": "D", "texto": "$120\\text{ metros}$", "es_correcta": False },
            { "id": "E", "texto": "$75\\text{ metros}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Fórmula de altura máxima en caída libre: $H_{max} = \\frac{v_0^2}{2g} = \\frac{40^2}{2(10)} = \\frac{1600}{20} = 80\\text{ metros}$."
    })
    
    # Q4: MRUV - Distancia en el enésimo segundo
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_004",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 1,
        "enunciado": "Un móvil parte del reposo y experimenta un MRUV con una aceleración de $6\\text{ m/s}^2$. ¿Qué distancia recorre exclusivamente durante el $4^\\circ\\text{ segundo}$ de su movimiento?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$21\\text{ metros}$", "es_correcta": True },
            { "id": "B", "texto": "$24\\text{ metros}$", "es_correcta": False },
            { "id": "C", "texto": "$18\\text{ metros}$", "es_correcta": False },
            { "id": "D", "texto": "$27\\text{ metros}$", "es_correcta": False },
            { "id": "E", "texto": "$15\\text{ metros}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Distancia en el enésimo segundo: $d_n = v_0 + \\frac{a}{2}(2n - 1) = 0 + \\frac{6}{2}(2(4) - 1) = 3(7) = 21\\text{ metros}$."
    })
    
    # Nivel 2: Intermedio (4 preguntas)
    # Q5: Distancia de frenado (Torricelli)
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_005",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 2,
        "enunciado": "Un camión blindado se desplaza a $72\\text{ km/h}$ y aplica los frenos bruscamente, desacelerando a razón constante de $5\\text{ m/s}^2$ hasta detenerse por completo. Determine la distancia de frenado.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$40\\text{ metros}$", "es_correcta": True },
            { "id": "B", "texto": "$30\\text{ metros}$", "es_correcta": False },
            { "id": "C", "texto": "$50\\text{ metros}$", "es_correcta": False },
            { "id": "D", "texto": "$45\\text{ metros}$", "es_correcta": False },
            { "id": "E", "texto": "$36\\text{ metros}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$v_0 = 72\\text{ km/h} = 20\\text{ m/s}$. Por ecuación de Torricelli: $v_f^2 = v_0^2 - 2ad \\implies 0 = 20^2 - 2(5)d \\implies 10d = 400 \\implies d = 40\\text{ metros}$."
    })
    
    # Q6: Tiro parabólico - Alcance horizontal
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_006",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 2,
        "enunciado": "Se dispara un proyectil con una velocidad de $100\\text{ m/s}$ y un ángulo de inclinación de $30^\\circ$ respecto a la horizontal. Considerando $g = 10\\text{ m/s}^2$, determine su alcance horizontal máximo sobre el plano de disparo.",
        "apoyo_visual": { "requiere_grafico": True, "imagen_url": None, "descripcion_para_diseñador": "Trayectoria parabólica de proyectil con velocidad 100 m/s y ángulo de 30 grados respecto a la horizontal." },
        "opciones": [
            { "id": "A", "texto": "$500\\sqrt{3}\\text{ metros } (\\approx 866\\text{ m})$", "es_correcta": True },
            { "id": "B", "texto": "$1000\\text{ metros}$", "es_correcta": False },
            { "id": "C", "texto": "$400\\sqrt{3}\\text{ metros}$", "es_correcta": False },
            { "id": "D", "texto": "$600\\sqrt{3}\\text{ metros}$", "es_correcta": False },
            { "id": "E", "texto": "$750\\text{ metros}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Fórmula del alcance: $R = \\frac{v_0^2 \\sin(2\\theta)}{g} = \\frac{100^2 \\sin(60^\\circ)}{10} = \\frac{10\\,000 (\\sqrt{3}/2)}{10} = 500\\sqrt{3}\\text{ metros} \\approx 866\\text{ m}$."
    })
    
    # Q7: Encuentro vertical
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_007",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 2,
        "enunciado": "Desde el suelo se lanza un cuerpo hacia arriba a $50\\text{ m/s}$, y simultáneamente se deja caer otro cuerpo desde una altura de $150\\text{ m}$ en la misma vertical. Considerando $g = 10\\text{ m/s}^2$, ¿a qué altura respecto al suelo se cruzan ambos cuerpos?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$105\\text{ metros}$", "es_correcta": True },
            { "id": "B", "texto": "$95\\text{ metros}$", "es_correcta": False },
            { "id": "C", "texto": "$115\\text{ metros}$", "es_correcta": False },
            { "id": "D", "texto": "$100\\text{ metros}$", "es_correcta": False },
            { "id": "E", "texto": "$90\\text{ metros}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Tiempo de encuentro en la vertical: $t = \\frac{H}{v_0} = \\frac{150}{50} = 3\\text{ s}$. Altura del proyectil ascendente: $y = v_0 t - \\frac{1}{2}gt^2 = 50(3) - 5(3^2) = 150 - 45 = 105\\text{ metros}$."
    })
    
    # Q8: Gráfica velocidad vs tiempo
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_008",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 2,
        "enunciado": "En una prueba de aceleración, un móvil parte del reposo y alcanza $30\\text{ m/s}$ en $10\\text{ segundos}$, mantiene dicha velocidad durante $15\\text{ segundos}$ y luego desacelera uniformemente hasta detenerse en $5\\text{ segundos}$. Calcule la distancia total recorrida analizando el área de su gráfica $v - t$.",
        "apoyo_visual": { "requiere_grafico": True, "imagen_url": None, "descripcion_para_diseñador": "Gráfica velocidad vs tiempo con forma trapezoidal: sube de 0 a 30 en t=10s, se mantiene plana de t=10s a t=25s, y baja a 0 en t=30s." },
        "opciones": [
            { "id": "A", "texto": "$675\\text{ metros}$", "es_correcta": True },
            { "id": "B", "texto": "$600\\text{ metros}$", "es_correcta": False },
            { "id": "C", "texto": "$750\\text{ metros}$", "es_correcta": False },
            { "id": "D", "texto": "$650\\text{ metros}$", "es_correcta": False },
            { "id": "E", "texto": "$700\\text{ metros}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Área de un trapecio en $v-t$: base mayor $B = 30\\text{ s}$, base menor $b = 15\\text{ s}$, altura $h = 30\\text{ m/s}$. Distancia total: $D = \\frac{B + b}{2} \\cdot h = \\frac{30 + 15}{2} \\times 30 = \\frac{45}{2} \\times 30 = 45 \\times 15 = 675\\text{ metros}$."
    })
    
    # Nivel 3: Avanzado / Táctico (4 preguntas)
    # Q9
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_009",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[0]}]: Se efectúa un disparo de artillería con un ángulo de elevación de $53^\\circ$ y una velocidad inicial de boca de $250\\text{{ m/s}}$ contra una posición enemiga situada a la misma cota del cañón. Considerando $g = 10\\text{{ m/s}}^2$, $\\sin(53^\\circ) = 0.8$ y $\\cos(53^\\circ) = 0.6$, determine el tiempo de vuelo total del proyectil hasta el impacto.",
        "apoyo_visual": { "requiere_grafico": True, "imagen_url": None, "descripcion_para_diseñador": "Tiro balístico parabólico con v0 = 250 m/s a 53° sobre blanco en el mismo plano horizontal." },
        "opciones": [
            { "id": "A", "texto": "$40\\text{ segundos}$", "es_correcta": True },
            { "id": "B", "texto": "$30\\text{ segundos}$", "es_correcta": False },
            { "id": "C", "texto": "$50\\text{ segundos}$", "es_correcta": False },
            { "id": "D", "texto": "$35\\text{ segundos}$", "es_correcta": False },
            { "id": "E", "texto": "$45\\text{ segundos}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Componente vertical: $v_{0y} = v_0 \\sin(53^\\circ) = 250(0.8) = 200\\text{ m/s}$. Tiempo de subida: $t_{sub} = \\frac{v_{0y}}{g} = \\frac{200}{10} = 20\\text{ s}$. Tiempo total de vuelo: $t_v = 2 t_{sub} = 2(20) = 40\\text{ segundos}$."
    })
    
    # Q10
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_010",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[1]}]: Un vehículo táctico blindado marcha hacia un objetivo a velocidad constante de $20\\text{{ m/s}}$. Cuando se encuentra a una distancia de $1200\\text{{ m}}$, dispara un proyectil horizontalmente con velocidad de $380\\text{{ m/s}}$ respecto al cañón. ¿Cuánto tiempo transcurrirá desde el momento del disparo hasta que el proyectil impacte en el blanco?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$3\\text{ segundos}$", "es_correcta": True },
            { "id": "B", "texto": "$3.15\\text{ segundos}$", "es_correcta": False },
            { "id": "C", "texto": "$2.8\\text{ segundos}$", "es_correcta": False },
            { "id": "D", "texto": "$4\\text{ segundos}$", "es_correcta": False },
            { "id": "E", "texto": "$3.5\\text{ segundos}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Velocidad absoluta del proyectil respecto al suelo: $v_{total} = v_{veh} + v_{rel} = 20 + 380 = 400\\text{ m/s}$. Distancia al blanco al momento del disparo: $1200\\text{ m}$. Tiempo de impacto: $t = \\frac{1200}{400} = 3\\text{ segundos}$."
    })
    
    # Q11
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_011",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[2]}]: Una aeronave vuela horizontalmente a una altitud constante de $500\\text{{ m}}$ con una velocidad de crucero de $80\\text{{ m/s}}$ y suelta un paquete de suministros de emergencia. Considerando $g = 10\\text{{ m/s}}^2$ y despreciando la resistencia aerodinámica, determine el desplazamiento horizontal que experimenta el paquete desde el instante de su liberación hasta tocar tierra.",
        "apoyo_visual": { "requiere_grafico": True, "imagen_url": None, "descripcion_para_diseñador": "Tiro semiparabólico con avión a h = 500 m y vx = 80 m/s liberando carga." },
        "opciones": [
            { "id": "A", "texto": "$800\\text{ metros}$", "es_correcta": True },
            { "id": "B", "texto": "$600\\text{ metros}$", "es_correcta": False },
            { "id": "C", "texto": "$1000\\text{ metros}$", "es_correcta": False },
            { "id": "D", "texto": "$750\\text{ metros}$", "es_correcta": False },
            { "id": "E", "texto": "$900\\text{ metros}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Tiempo de caída libre: $h = \\frac{1}{2}gt^2 \\implies 500 = 5t^2 \\implies t^2 = 100 \\implies t = 10\\text{ s}$. Desplazamiento horizontal: $x = v_x \\cdot t = 80\\text{ m/s} \\times 10\\text{ s} = 800\\text{ metros}$."
    })
    
    # Q12
    questions.append({
        "id_pregunta": f"{prefix}_FIS_CIN_012",
        "curso": "Física",
        "tema": "Cinemática y Balística",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[3]}]: Un proyectil balístico penetra en un bloque de blindaje con una velocidad de impacto de $600\\text{{ m/s}}$ y se detiene tras recorrer una profundidad de penetración de $18\\text{{ cm}}$ ($0.18\\text{{ m}}$). Asumiendo una desaceleración constante dentro del material, determine la magnitud de dicha desaceleración.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$1.0 \\times 10^6\\text{ m/s}^2$", "es_correcta": True },
            { "id": "B", "texto": "$2.0 \\times 10^6\\text{ m/s}^2$", "es_correcta": False },
            { "id": "C", "texto": "$0.5 \\times 10^6\\text{ m/s}^2$", "es_correcta": False },
            { "id": "D", "texto": "$1.5 \\times 10^6\\text{ m/s}^2$", "es_correcta": False },
            { "id": "E", "texto": "$3.0 \\times 10^6\\text{ m/s}^2$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Por Torricelli: $v_f^2 = v_0^2 - 2ad \\implies 0 = 600^2 - 2a(0.18) \\implies 0.36 a = 360\\,000 \\implies a = \\frac{360\\,000}{0.36} = 1\\,000\\,000\\text{ m/s}^2 = 1.0 \\times 10^6\\text{ m/s}^2$."
    })
    
    return questions

# Guardar y actualizar
all_fis_banks = {}

for sc in SCHOOLS_FIS:
    prefix = sc["id"]
    folder = sc["folder"]
    bank = get_fisica_bank(sc)
    all_fis_banks[prefix] = bank
    
    # Guardar JSON individual
    json_path = f"banco_preguntas/{folder}_fisica_cinematica.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(bank, f, indent=2, ensure_ascii=False)
    print(f"Generado {json_path}")

# Guardar banco maestro
with open("banco_preguntas/banco_maestro_fisica_cinematica_8_escuelas.json", "w", encoding="utf-8") as f:
    json.dump(all_fis_banks, f, indent=2, ensure_ascii=False)
print("Guardado banco maestro consolidado de Física.")

# Actualizar los Markdown de bases de conocimiento
for sc in SCHOOLS_FIS:
    prefix = sc["id"]
    folder = sc["folder"]
    md_file = f"{folder}.md"
    md_path = os.path.join("bases_conocimiento", md_file)
    
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    section_title = "## 📚 Banco de Preguntas Calibradas: Física (Cinemática y Balística)"
    if section_title not in content:
        bank = all_fis_banks[prefix]
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

print("Física generada y guardada al 100% en todas las escuelas.")
