# -*- coding: utf-8 -*-
"""
Generador del Banco de Preguntas de Geometría (Triángulos y Relaciones Métricas)
para las 8 escuelas militares y policiales del Perú.
"""
import json
import os
import shutil

os.makedirs('banco_preguntas', exist_ok=True)

SCHOOLS_GEO = [
    {
        "id": "EMCH",
        "name": "Escuela Militar de Chorrillos (EMCH - Oficiales)",
        "folder": "01_EMCH",
        "contexts": [
            "Triangulación Balística de Observación de Artillería Obús D-30",
            "Relaciones Métricas en Posicionamiento de Puesto de Observación Avanzado",
            "Perímetro y Área de Vivac Táctico de Campaña",
            "Ubicación del Centro de Gravedad (Baricentro) de una Zona de Aterrizaje de Helicópteros (LZ)"
        ]
    },
    {
        "id": "ETE",
        "name": "Escuela Técnica del Ejército (ETE - Suboficiales)",
        "folder": "02_ETE",
        "contexts": [
            "Tirantes de Fijación de Antena de Transmisiones de Campaña",
            "Rampa de Desembarco y Carga de Blindados M-113",
            "Cerramiento Perimétrico con Concertina en Base Contrasubversiva",
            "Estructura Triangular de Soporte en Puente Mecano Tipo Bailey"
        ]
    },
    {
        "id": "ENP",
        "name": "Escuela Naval del Perú (ENP - Oficiales)",
        "folder": "03_ENP",
        "contexts": [
            "Triangulación Náutica Radar desde Buque Insignia hacia Contacto Desconocido",
            "Senda de Aproximación Helitransportada a Cubierta de Vuelo de Fragata Misilera",
            "Área de Exploración Triangular Sonar en Búsqueda Antisubmarina",
            "Triángulo de Velocidades de Navegación y Deriva por Viento y Corriente"
        ]
    },
    {
        "id": "CITEN",
        "name": "Centro de Instrucción Técnica y Entrenamiento Naval (CITEN - Suboficiales)",
        "folder": "04_CITEN",
        "contexts": [
            "Ángulo de Izaje en Grúas de Maniobra Naval de SIMA Callao",
            "Trazado y Alineación de Cuadernas Trianguladas en Astillero Naval",
            "Radio de Borneo y Tensión de Cadena de Fondeo en Bahía",
            "Tensores de Mástil de Telecomunicaciones en Estación Costera de Chimbote"
        ]
    },
    {
        "id": "EOFAP",
        "name": "Escuela de Oficiales FAP (EOFAP - Oficiales)",
        "folder": "05_EOFAP",
        "contexts": [
            "Senda de Planeo Instrumental (Glide Slope) de Caza Mirage 2000P",
            "Triangulación Radar 3D TPS-78 en Interceptación de Traza Fronteriza",
            "Sector Triangular de Reconocimiento Aéreo Táctico en el VRAEM",
            "Geometría de Semialas en Flecha y Flecha Triangular en Avión Supersónico"
        ]
    },
    {
        "id": "ESOFA",
        "name": "Escuela de Suboficiales FAP (ESOFA - Suboficiales)",
        "folder": "06_ESOFA",
        "contexts": [
            "Alineación y Simetría Estructural en Aviones de Entrenamiento KT-1P Torito",
            "Triángulo de Apoyo de Gatos Hidráulicos para Mantenimiento de Cazas Su-25",
            "Tensores Estructurales de Hangar Aeronáutico en Base Aérea Las Palmas",
            "Ángulo de Inclinación de Palas de Rotor en Helicópteros Mi-171Sh"
        ]
    },
    {
        "id": "EO_PNP",
        "name": "Escuela de Oficiales de la Policía Nacional (EO-PNP - Oficiales)",
        "folder": "07_EO_PNP",
        "contexts": [
            "Planimetría Forense DIRINCRI: Triangulación de Indicios Balísticos",
            "Cerco Táctico Triangular de Intervención SUAT en Inmueble Confinado",
            "Cono Triangular de Cobertura Óptica en Cámaras de Videovigilancia Urbana",
            "Análisis Planimétrico de Huellas de Frenado en Accidentes de Tránsito (DIAT)"
        ]
    },
    {
        "id": "EESTP_PNP",
        "name": "Escuelas de Educación Superior Técnico Profesional PNP (EESTP-PNP - Suboficiales)",
        "folder": "08_EESTP_PNP",
        "contexts": [
            "Triangulación de Móviles de Radio Patrulla en Cierre de Vías Metropolitanas",
            "Ángulo de Apoyo Seguro de Escalera Táctica de Asalto Policial",
            "Acordonamiento Triangular de Seguridad en Zona de Operaciones de Emergencia",
            "Línea de Visibilidad desde Torreta de Puesto de Vigilancia Fronterizo"
        ]
    }
]

def get_geometria_bank(school):
    prefix = school["id"]
    name = school["name"]
    contexts = school["contexts"]
    
    questions = []
    
    # Nivel 1: Básico (4 preguntas)
    # Q1: Ángulos internos
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_001",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 1,
        "enunciado": f"En el examen de admisión de {name}, se plantea el siguiente problema: En un triángulo $ABC$, las medidas de sus ángulos internos son $x$, $2x + 10^\\circ$ y $3x - 10^\\circ$. Calcule la medida del menor ángulo interno.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$30^\\circ$", "es_correcta": True },
            { "id": "B", "texto": "$25^\\circ$", "es_correcta": False },
            { "id": "C", "texto": "$35^\\circ$", "es_correcta": False },
            { "id": "D", "texto": "$40^\\circ$", "es_correcta": False },
            { "id": "E", "texto": "$20^\\circ$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Suma de ángulos internos: $x + (2x + 10^\\circ) + (3x - 10^\\circ) = 180^\\circ \\implies 6x = 180^\\circ \\implies x = 30^\\circ$. Los ángulos miden $30^\\circ, 70^\\circ, 80^\\circ$. El menor es $30^\\circ$."
    })
    
    # Q2: Teorema de Pitágoras directo
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_002",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 1,
        "enunciado": "En un triángulo rectángulo, la hipotenusa mide $25\\text{ m}$ y uno de sus catetos mide $15\\text{ m}$. Calcule la longitud del otro cateto.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$20\\text{ m}$", "es_correcta": True },
            { "id": "B", "texto": "$18\\text{ m}$", "es_correcta": False },
            { "id": "C", "texto": "$22\\text{ m}$", "es_correcta": False },
            { "id": "D", "texto": "$16\\text{ m}$", "es_correcta": False },
            { "id": "E", "texto": "$12\\text{ m}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Por el teorema de Pitágoras: $c^2 = a^2 + b^2 \\implies 25^2 = 15^2 + b^2 \\implies 625 = 225 + b^2 \\implies b^2 = 400 \\implies b = 20\\text{ m}$."
    })
    
    # Q3: Desigualdad triangular (existencia)
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_003",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 1,
        "enunciado": "Dos lados de un triángulo miden $6\\text{ cm}$ y $11\\text{ cm}$. ¿Cuántos valores enteros puede tomar la longitud del tercer lado?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$11$", "es_correcta": True },
            { "id": "B", "texto": "$10$", "es_correcta": False },
            { "id": "C", "texto": "$12$", "es_correcta": False },
            { "id": "D", "texto": "$9$", "es_correcta": False },
            { "id": "E", "texto": "$8$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Teorema de existencia triangular: $11 - 6 < x < 11 + 6 \\implies 5 < x < 17$. Valores enteros: $x \\in \\{6, 7, \\dots, 16\\}$. Total $= 16 - 6 + 1 = 11$ valores."
    })
    
    # Q4: Triángulo notable 30°-60°
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_004",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 1,
        "enunciado": "En un triángulo rectángulo notable de $30^\\circ$ y $60^\\circ$, el cateto opuesto al ángulo de $30^\\circ$ mide $8\\sqrt{3}\\text{ cm}$. Calcule la longitud del cateto mayor.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$24\\text{ cm}$", "es_correcta": True },
            { "id": "B", "texto": "$16\\sqrt{3}\\text{ cm}$", "es_correcta": False },
            { "id": "C", "texto": "$16\\text{ cm}$", "es_correcta": False },
            { "id": "D", "texto": "$12\\sqrt{3}\\text{ cm}$", "es_correcta": False },
            { "id": "E", "texto": "$18\\text{ cm}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "En el triángulo notable $30^\\circ - 60^\\circ$, los catetos son $k$ y $k\\sqrt{3}$. Si $k = 8\\sqrt{3}\\text{ cm}$, el cateto opuesto a $60^\\circ$ mide $k\\sqrt{3} = 8\\sqrt{3} \\times \\sqrt{3} = 8(3) = 24\\text{ cm}$."
    })
    
    # Nivel 2: Intermedio (4 preguntas)
    # Q5: Relaciones métricas - Altura relativa a la hipotenusa
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_005",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 2,
        "enunciado": "En un triángulo rectángulo, las proyecciones de los catetos sobre la hipotenusa miden $9\\text{ cm}$ y $16\\text{ cm}$. Calcule la longitud de la altura relativa a la hipotenusa.",
        "apoyo_visual": { "requiere_grafico": True, "imagen_url": None, "descripcion_para_diseñador": "Triángulo rectángulo con altura BH trazada a la hipotenusa AC dividida en segmentos AH = 9 cm y HC = 16 cm." },
        "opciones": [
            { "id": "A", "texto": "$12\\text{ cm}$", "es_correcta": True },
            { "id": "B", "texto": "$10\\text{ cm}$", "es_correcta": False },
            { "id": "C", "texto": "$14\\text{ cm}$", "es_correcta": False },
            { "id": "D", "texto": "$15\\text{ cm}$", "es_correcta": False },
            { "id": "E", "texto": "$12.5\\text{ cm}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Por relación métrica: $h^2 = m \\cdot n = 9 \\times 16 = 144 \\implies h = \\sqrt{144} = 12\\text{ cm}$."
    })
    
    # Q6: Teorema de la bisectriz interior
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_006",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 2,
        "enunciado": "En un triángulo $ABC$, los lados $AB$ y $BC$ miden $10\\text{ cm}$ y $15\\text{ cm}$ respectivamente. Si la base $AC$ mide $20\\text{ cm}$ y se traza la bisectriz interior $BD$, calcule la longitud del segmento menor determinado en la base ($AD$).",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$8\\text{ cm}$", "es_correcta": True },
            { "id": "B", "texto": "$12\\text{ cm}$", "es_correcta": False },
            { "id": "C", "texto": "$6\\text{ cm}$", "es_correcta": False },
            { "id": "D", "texto": "$9\\text{ cm}$", "es_correcta": False },
            { "id": "E", "texto": "$7.5\\text{ cm}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Teorema de la bisectriz interior: $\\frac{AB}{BC} = \\frac{AD}{DC} \\implies \\frac{10}{15} = \\frac{2}{3} = \\frac{AD}{DC}$. Con $AD + DC = 20 \\implies 2k + 3k = 20 \\implies 5k = 20 \\implies k = 4$. Por tanto $AD = 2(4) = 8\\text{ cm}$."
    })
    
    # Q7: Mediana relativa a la hipotenusa
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_007",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 2,
        "enunciado": "En un triángulo rectángulo $ABC$ recto en $B$, se traza la mediana relativa a la hipotenusa $BM$ y la altura $BH$. Si $AC = 50\\text{ cm}$ y $BH = 24\\text{ cm}$, calcule la longitud del segmento $HM$.",
        "apoyo_visual": { "requiere_grafico": True, "imagen_url": None, "descripcion_para_diseñador": "Triángulo rectángulo ABC recto en B con hipotenusa AC = 50 cm, altura BH = 24 cm y mediana BM a la hipotenusa." },
        "opciones": [
            { "id": "A", "texto": "$7\\text{ cm}$", "es_correcta": True },
            { "id": "B", "texto": "$9\\text{ cm}$", "es_correcta": False },
            { "id": "C", "texto": "$6\\text{ cm}$", "es_correcta": False },
            { "id": "D", "texto": "$8\\text{ cm}$", "es_correcta": False },
            { "id": "E", "texto": "$10\\text{ cm}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Por teorema de la mediana a la hipotenusa: $BM = \\frac{AC}{2} = 25\\text{ cm}$. En el triángulo rectángulo $BHM$, la hipotenusa es $BM = 25\\text{ cm}$ y el cateto es $BH = 24\\text{ cm}$. Por Pitágoras: $HM = \\sqrt{25^2 - 24^2} = \\sqrt{625 - 576} = \\sqrt{49} = 7\\text{ cm}$."
    })
    
    # Q8: Producto de catetos = hipotenusa por altura
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_008",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 2,
        "enunciado": "Los catetos de un triángulo rectángulo miden $20\\text{ m}$ y $15\\text{ m}$. Calcule la longitud exacta de la altura relativa a la hipotenusa.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$12\\text{ m}$", "es_correcta": True },
            { "id": "B", "texto": "$10\\text{ m}$", "es_correcta": False },
            { "id": "C", "texto": "$14\\text{ m}$", "es_correcta": False },
            { "id": "D", "texto": "$9\\text{ m}$", "es_correcta": False },
            { "id": "E", "texto": "$13.5\\text{ m}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Hipotenusa: $c = \\sqrt{20^2 + 15^2} = \\sqrt{400 + 225} = 25\\text{ m}$. Por relación métrica $a \\cdot b = c \\cdot h \\implies 20 \\times 15 = 25 \\times h \\implies 300 = 25h \\implies h = 12\\text{ m}$."
    })
    
    # Nivel 3: Avanzado / Táctico (4 preguntas)
    # Q9
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_009",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[0]}]: Dos puestos de observación $P_1$ y $P_2$ distanciados $1400\\text{{ m}}$ divisan un objetivo hostil $T$. El ángulo de visión en $P_1$ es de $53^\\circ$ respecto a la línea base $P_1 P_2$ y en $P_2$ es de $37^\\circ$. Sabiendo que forman un triángulo rectángulo ($53^\\circ + 37^\\circ = 90^\\circ$), determine la distancia directa desde el puesto $P_1$ hacia el objetivo $T$.",
        "apoyo_visual": { "requiere_grafico": True, "imagen_url": None, "descripcion_para_diseñador": "Triángulo rectángulo con hipotenusa P1-P2 = 1400 m, ángulo en P1 de 53° y en P2 de 37° con vértice del ángulo recto en T." },
        "opciones": [
            { "id": "A", "texto": "$840\\text{ m}$", "es_correcta": True },
            { "id": "B", "texto": "$1120\\text{ m}$", "es_correcta": False },
            { "id": "C", "texto": "$960\\text{ m}$", "es_correcta": False },
            { "id": "D", "texto": "$700\\text{ m}$", "es_correcta": False },
            { "id": "E", "texto": "$1050\\text{ m}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Como los ángulos son $53^\\circ$ y $37^\\circ$, el ángulo en $T$ es recto ($90^\\circ$). En el triángulo notable $37^\\circ - 53^\\circ$, la hipotenusa es $5k = 1400\\text{ m} \\implies k = 280\\text{ m}$. El cateto adyacente a $53^\\circ$ (distancia $P_1 T$) es opuesto a $37^\\circ$, luego mide $3k = 3(280) = 840\\text{ m}$."
    })
    
    # Q10
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_010",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[1]}]: Un equipo de despliegue establece un perímetro triangular $ABC$ recto en $B$. Desde la posición $B$ se mide la distancia perpendicular hacia la línea de enlace $AC$ (hipotenusa), obteniéndose $h = 60\\text{{ m}}$. Si la proyección de la avanzada izquierda sobre $AC$ es $45\\text{{ m}}$, ¿cuál es la longitud total de la línea de enlace $AC$?",
        "apoyo_visual": { "requiere_grafico": True, "imagen_url": None, "descripcion_para_diseñador": "Triángulo rectángulo ABC recto en B con altura BH = 60 m a la hipotenusa AC y proyección AH = 45 m." },
        "opciones": [
            { "id": "A", "texto": "$125\\text{ m}$", "es_correcta": True },
            { "id": "B", "texto": "$105\\text{ m}$", "es_correcta": False },
            { "id": "C", "texto": "$140\\text{ m}$", "es_correcta": False },
            { "id": "D", "texto": "$115\\text{ m}$", "es_correcta": False },
            { "id": "E", "texto": "$135\\text{ m}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Por relación métrica: $h^2 = m \\cdot n \\implies 60^2 = 45 \\cdot n \\implies 3600 = 45n \\implies n = 80\\text{ m}$. La hipotenusa total $AC = m + n = 45 + 80 = 125\\text{ m}$."
    })
    
    # Q11
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_011",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[2]}]: Un área de confinamiento triangular $ABC$ tiene lados que miden $13\\text{{ m}}$, $14\\text{{ m}}$ y $15\\text{{ m}}$. Determine la longitud de la altura relativa al lado intermedio ($14\\text{{ m}}$) empleada como eje de penetración táctica.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$12\\text{ m}$", "es_correcta": True },
            { "id": "B", "texto": "$10\\text{ m}$", "es_correcta": False },
            { "id": "C", "texto": "$11\\text{ m}$", "es_correcta": False },
            { "id": "D", "texto": "$13\\text{ m}$", "es_correcta": False },
            { "id": "E", "texto": "$9.5\\text{ m}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Por fórmula de Herón: semiperímetro $p = \\frac{13 + 14 + 15}{2} = 21\\text{ m}$. Área $S = \\sqrt{21(21 - 13)(21 - 14)(21 - 15)} = \\sqrt{21 \\times 8 \\times 7 \\times 6} = \\sqrt{7056} = 84\\text{ m}^2$. Como $S = \\frac{b \\cdot h}{2} \\implies 84 = \\frac{14 \\cdot h}{2} \\implies 84 = 7h \\implies h = 12\\text{ m}$."
    })
    
    # Q12
    questions.append({
        "id_pregunta": f"{prefix}_GEO_TRI_012",
        "curso": "Geometría",
        "tema": "Triángulos y Relaciones Métricas",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[3]}]: Se requiere ubicar el centro de abastecimiento en el baricentro $G$ de un sector triangular $ABC$. Si la mediana principal trazada desde el vértice $B$ hacia el lado $AC$ tiene una longitud total de $36\\text{{ metros}}$, determine la distancia desde el vértice $B$ hasta el baricentro $G$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$24\\text{ metros}$", "es_correcta": True },
            { "id": "B", "texto": "$18\\text{ metros}$", "es_correcta": False },
            { "id": "C", "texto": "$12\\text{ metros}$", "es_correcta": False },
            { "id": "D", "texto": "$27\\text{ metros}$", "es_correcta": False },
            { "id": "E", "texto": "$20\\text{ metros}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Propiedad del baricentro: divide a cada mediana en la relación de $2$ a $1$ medida desde el vértice: $BG = 2GM$. Por tanto, $BG = \\frac{2}{3}(BM) = \\frac{2}{3}(36\\text{ m}) = 24\\text{ metros}$."
    })
    
    return questions

# Guardar y actualizar
all_geo_banks = {}

for sc in SCHOOLS_GEO:
    prefix = sc["id"]
    folder = sc["folder"]
    bank = get_geometria_bank(sc)
    all_geo_banks[prefix] = bank
    
    # Guardar JSON individual
    json_path = f"banco_preguntas/{folder}_geometria_triangulos.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(bank, f, indent=2, ensure_ascii=False)
    print(f"Generado {json_path}")

# Guardar banco maestro
with open("banco_preguntas/banco_maestro_geometria_triangulos_8_escuelas.json", "w", encoding="utf-8") as f:
    json.dump(all_geo_banks, f, indent=2, ensure_ascii=False)
print("Guardado banco maestro consolidado de Geometría.")

# Actualizar los Markdown de bases de conocimiento
for sc in SCHOOLS_GEO:
    prefix = sc["id"]
    folder = sc["folder"]
    md_file = f"{folder}.md"
    md_path = os.path.join("bases_conocimiento", md_file)
    
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    section_title = "## 📚 Banco de Preguntas Calibradas: Geometría (Triángulos y Relaciones Métricas)"
    if section_title not in content:
        bank = all_geo_banks[prefix]
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

print("Geometría generada y guardada al 100% en todas las escuelas.")
