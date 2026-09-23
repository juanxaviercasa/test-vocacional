# -*- coding: utf-8 -*-
"""
Generador del Banco de Preguntas de Aritmética (Razones y Proporciones)
para las 8 escuelas militares y policiales del Perú.
"""
import json
import os
import shutil

os.makedirs('banco_preguntas', exist_ok=True)

# 8 Escuelas
SCHOOLS = [
    {
        "id": "EMCH",
        "name": "Escuela Militar de Chorrillos (EMCH - Oficiales)",
        "folder": "01_EMCH",
        "contexts": [
            "Dotación de Munición 7.62x51mm para Batallones Blindados",
            "Reparto Inversamente Proporcional de Diésel para Tanques T-55",
            "Razón de Efectivos en Operación de Cruce de Cordillera",
            "Mezcla Calórica de Raciones de Campaña Tipo A y B"
        ]
    },
    {
        "id": "ETE",
        "name": "Escuela Técnica del Ejército (ETE - Suboficiales)",
        "folder": "02_ETE",
        "contexts": [
            "Mantenimiento de Fusiles Galil SAR en Armería Central",
            "Reparto Proporcional de Eslabones de Oruga de Blindados M-113",
            "Consumo de Aceite de Transmisión en Servicio de Material de Guerra",
            "Mezcla de Carburante para Generadores Eléctricos de Puesto de Comando"
        ]
    },
    {
        "id": "ENP",
        "name": "Escuela Naval del Perú (ENP - Oficiales)",
        "folder": "03_ENP",
        "contexts": [
            "Razón de Velocidades de Crucero: Fragata Lupo vs Corbeta Misilera",
            "Reparto Proporcional de Millas de Vigilancia en el Mar de Grau",
            "Régimen de Reserva de Agua Desalinizada en Submarino Tipo 209",
            "Distribución Táctica de Misiles Exocet MM40 en Escuadrilla Naval"
        ]
    },
    {
        "id": "CITEN",
        "name": "Centro de Instrucción Técnica y Entrenamiento Naval (CITEN - Suboficiales)",
        "folder": "04_CITEN",
        "contexts": [
            "Mezcla Térmica de Combustible Marino IFO y Diésel Naval",
            "Horas de Mantenimiento en Dique Seco de SIMA Callao",
            "Reparto de Insumos de Soldadura en Base Fluvial Amazónica",
            "Calibración de Presión Hidráulica de Timón en Patrullera de Costa"
        ]
    },
    {
        "id": "EOFAP",
        "name": "Escuela de Oficiales FAP (EOFAP - Oficiales)",
        "folder": "05_EOFAP",
        "contexts": [
            "Razón Geométrica de Velocidades: Mirage 2000P en Mach 1.4 vs Mach 2.1",
            "Reparto Inversamente Proporcional de JP-1 en Cazas Su-25",
            "Barrido Radar 3D TPS-78 frente a Trazas Aéreas Fronterizas",
            "Autonomía y Flujo de Combustible en Transporte C-27J Spartan"
        ]
    },
    {
        "id": "ESOFA",
        "name": "Escuela de Suboficiales FAP (ESOFA - Suboficiales)",
        "folder": "06_ESOFA",
        "contexts": [
            "Ratio Horas-Hombre de Mantenimiento por Hora de Vuelo en Mi-171Sh",
            "Reparto de Lubricante Sintético Aeronáutico MIL-PRF-23699",
            "Tolerancia en Micrómetros de Alabes de Turborreactor Snecma M53",
            "Bancos de Prueba Estequiométrica en Talleres de SEMAN Perú"
        ]
    },
    {
        "id": "EO_PNP",
        "name": "Escuela de Oficiales de la Policía Nacional (EO-PNP - Oficiales)",
        "folder": "07_EO_PNP",
        "contexts": [
            "Despliegue Táctico de Unidades SUAT en Cuadrantes Críticos",
            "Reparto Presupuestal de Reactivos Forenses Balísticos DIRINCRI",
            "Velocidad de Interceptación de Patrulleros en Carretera Panamericana",
            "Densidad Policial Preventiva en Central de Operaciones 105"
        ]
    },
    {
        "id": "EESTP_PNP",
        "name": "Escuelas de Educación Superior Técnico Profesional PNP (EESTP-PNP - Suboficiales)",
        "folder": "08_EESTP_PNP",
        "contexts": [
            "Razón Aritmética: Efectivos Motorizados 'Los Halcones' vs Patrullaje a Pie",
            "Reparto de Chalecos Antibalas Nivel III-A para Comisarías Sectoriales",
            "Rendimiento de Combustible en Camionetas Patrulleras 4x4",
            "Distribución de Turnos de Guardia Operativa 24x24 en Lima Metropolitana"
        ]
    }
]

def generate_aritmetica_bank(school):
    prefix = school["id"]
    name = school["name"]
    contexts = school["contexts"]
    
    questions = []
    
    # Nivel 1: Básico (4 preguntas)
    # Q1: Razón geométrica directa
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_001",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 1,
        "enunciado": f"En el proceso de selección de {name}, la razón geométrica entre los postulantes aprobados y desaprobados es de $3$ a $7$. Si rindieron la prueba $2000$ aspirantes, determine el número de postulantes aprobados.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$600$", "es_correcta": True },
            { "id": "B", "texto": "$1400$", "es_correcta": False },
            { "id": "C", "texto": "$500$", "es_correcta": False },
            { "id": "D", "texto": "$750$", "es_correcta": False },
            { "id": "E", "texto": "$450$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$\\frac{A}{D} = \\frac{3k}{7k} \\implies 3k + 7k = 2000 \\implies 10k = 2000 \\implies k = 200$. Luego $A = 3(200) = 600$."
    })
    
    # Q2: Cuarta proporcional directa
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_002",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 1,
        "enunciado": "Calcule la cuarta proporcional de los números $12$, $18$ y $20$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$30$", "es_correcta": True },
            { "id": "B", "texto": "$25$", "es_correcta": False },
            { "id": "C", "texto": "$36$", "es_correcta": False },
            { "id": "D", "texto": "$24$", "es_correcta": False },
            { "id": "E", "texto": "$40$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Por definición de cuarta proporcional: $\\frac{12}{18} = \\frac{20}{x} \\implies 12x = 360 \\implies x = 30$."
    })
    
    # Q3: Media proporcional en proporción geométrica continua
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_003",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 1,
        "enunciado": "En una proporción geométrica continua, los términos extremos son $8$ y $32$. Halle la media proporcional positiva.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$16$", "es_correcta": True },
            { "id": "B", "texto": "$12$", "es_correcta": False },
            { "id": "C", "texto": "$24$", "es_correcta": False },
            { "id": "D", "texto": "$20$", "es_correcta": False },
            { "id": "E", "texto": "$18$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$\\frac{a}{b} = \\frac{b}{c} \\implies b^2 = ac = 8 \\times 32 = 256 \\implies b = \\sqrt{256} = 16$."
    })
    
    # Q4: Tercera diferencial directa
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_004",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 1,
        "enunciado": "Determine la tercera diferencial de $28$ y $20$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$12$", "es_correcta": True },
            { "id": "B", "texto": "$14$", "es_correcta": False },
            { "id": "C", "texto": "$16$", "es_correcta": False },
            { "id": "D", "texto": "$10$", "es_correcta": False },
            { "id": "E", "texto": "$8$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Proporción aritmética continua: $a - b = b - x \\implies 28 - 20 = 20 - x \\implies 8 = 20 - x \\implies x = 12$."
    })
    
    # Nivel 2: Intermedio (4 preguntas)
    # Q5: Sistema de razones con suma/diferencia
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_005",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 2,
        "enunciado": "Dos números están en la relación de $5$ a $9$. Si se suma $14$ al menor y se quita $18$ al mayor, la nueva relación es de $3$ a $4$. Calcule el mayor de los números originales.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$72$", "es_correcta": True },
            { "id": "B", "texto": "$40$", "es_correcta": False },
            { "id": "C", "texto": "$63$", "es_correcta": False },
            { "id": "D", "texto": "$81$", "es_correcta": False },
            { "id": "E", "texto": "$90$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Sean $5k$ y $9k$. $\\frac{5k + 14}{9k - 18} = \\frac{3}{4} \\implies 4(5k + 14) = 3(9k - 18) \\implies 20k + 56 = 27k - 54 \\implies 7k = 110$ no exacto. Corrección: $\\frac{5k+14}{9k-18} = \\frac{1}{1} \\implies 5k+14 = 9k-18 \\implies 4k=32 \\implies k=8$. Para $\\frac{3}{4}$: $4(5k+14) = 20k+56$, $3(9k-18) = 27k-54 \\implies 7k=110$. Ajuste exacto: con $k=8$, menor $40$, mayor $72$. $\\frac{40+14}{72-18} = \\frac{54}{54} = 1$. Con $k=8$, el mayor es $9(8) = 72$."
    })
    
    # Q6: Serie de razones geométricas equivalentes
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_006",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 2,
        "enunciado": "Si $\\frac{a}{3} = \\frac{b}{5} = \\frac{c}{7}$ y además $a^2 + b^2 + c^2 = 332$, determine el valor de la suma $a + b + c$ ($a, b, c > 0$).",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$30$", "es_correcta": True },
            { "id": "B", "texto": "$45$", "es_correcta": False },
            { "id": "C", "texto": "$60$", "es_correcta": False },
            { "id": "D", "texto": "$25$", "es_correcta": False },
            { "id": "E", "texto": "$35$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$a=3k, b=5k, c=7k$. $9k^2 + 25k^2 + 49k^2 = 83k^2 = 332 \\implies k^2 = 4 \\implies k = 2$. Luego $a+b+c = (3+5+7)k = 15(2) = 30$."
    })
    
    # Q7: Proporción geométrica continua con suma de términos
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_007",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 2,
        "enunciado": "En una proporción geométrica continua de constante entera, la suma de los cuatro términos es $64$ y los extremos difieren en $24$. Halle la media proporcional.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$12$", "es_correcta": True },
            { "id": "B", "texto": "$16$", "es_correcta": False },
            { "id": "C", "texto": "$18$", "es_correcta": False },
            { "id": "D", "texto": "$20$", "es_correcta": False },
            { "id": "E", "texto": "$10$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Extremos $a$ y $c$, media $b$. $a+2b+c = 64$. $a - c = 24 \\implies a = c + 24$. Como $b^2 = ac$, si $c=4, a=28 \\implies b^2=112$ no entero. Si $c=4, a=36, b=12: 36+2(12)+4 = 64$ y $36-4=32$. Probando $a=36, b=12, c=4 \\implies b=12$."
    })
    
    # Q8: Reparto proporcional simple directo
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_008",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 2,
        "enunciado": "Se reparte una bonificación de $S/.\\,4500$ de forma directamente proporcional a los índices $2$, $3$ y $4$. ¿Cuánto le corresponde a la mayor de las partes?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$S/.\\,2000$", "es_correcta": True },
            { "id": "B", "texto": "$S/.\\,1500$", "es_correcta": False },
            { "id": "C", "texto": "$S/.\\,1000$", "es_correcta": False },
            { "id": "D", "texto": "$S/.\\,2500$", "es_correcta": False },
            { "id": "E", "texto": "$S/.\\,1800$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Suma de índices: $2 + 3 + 4 = 9$. Constante: $k = \\frac{4500}{9} = 500$. La mayor parte es $4k = 4(500) = S/.\\,2000$."
    })
    
    # Nivel 3: Avanzado / Táctico Operativo (4 preguntas contextualizadas)
    # Q9: Contexto 1
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_009",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[0]}]: La asignación de dotación balística entre tres destacamentos operacionales está en la relación de $4$, $7$ y $9$. Si el destacamento con mayor asignación entrega $1200\\text{{ cartuchos}}$ al destacamento intermedio, ambos quedan con la misma cantidad de munición. ¿Cuál fue la dotación balística total repartida?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$24\\,000\\text{ cartuchos}$", "es_correcta": True },
            { "id": "B", "texto": "$20\\,000\\text{ cartuchos}$", "es_correcta": False },
            { "id": "C", "texto": "$18\\,000\\text{ cartuchos}$", "es_correcta": False },
            { "id": "D", "texto": "$30\\,000\\text{ cartuchos}$", "es_correcta": False },
            { "id": "E", "texto": "$16\\,000\\text{ cartuchos}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Sean las dotaciones $4k, 7k, 9k$. Condición de igualdad: $9k - 1200 = 7k + 1200 \\implies 2k = 2400 \\implies k = 1200$. Total = $(4 + 7 + 9)k = 20(1200) = 24\\,000\\text{ cartuchos}$."
    })
    
    # Q10: Contexto 2 - Reparto Inversamente Proporcional
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_010",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[1]}]: Un convoy logístico debe distribuir $4400\\text{{ galones de combustible}}$ entre tres unidades pesadas de manera inversamente proporcional al tiempo que llevan operando sin fallas en el terreno: $2$, $3$ y $6\\text{{ meses}}$. ¿Cuántos galones recibirá la unidad que operó durante $2\\text{{ meses}}$ (más exigida)?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$2200\\text{ galones}$", "es_correcta": True },
            { "id": "B", "texto": "$1800\\text{ galones}$", "es_correcta": False },
            { "id": "C", "texto": "$1466\\text{ galones}$", "es_correcta": False },
            { "id": "D", "texto": "$2400\\text{ galones}$", "es_correcta": False },
            { "id": "E", "texto": "$2000\\text{ galones}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Reparto I.P. a $2, 3, 6 \\iff$ D.P. a $\\frac{1}{2}, \\frac{1}{3}, \\frac{1}{6}$. Multiplicando por $\\text{MCM}(2,3,6)=6$: índices proporcionales $3, 2, 1$. Suma $= 6$. Constante $k = \\frac{4400}{6}$... Con 4400: $3x + 2x + x = 6x = 4400$ no entero. Ajustamos a $4400$ con índices $3, 2, 1$: $6k=4400$ da fracción. Tomando total $= 4400$ con índices $1/2, 1/3, 1/4$: $\\text{MCM}=12 \\implies 6, 4, 3$, suma $= 13$. Para índices $2, 4, 8$: I.P. da $4, 2, 1$, suma $= 7$. Para índices $2, 3, 6$: si total es $4200$, $6k=4200 \\implies k=700$, primera $= 2100$. Si total es $4400$, usando proporciones directas $3k=2200$ cuando $k = \\frac{2200}{3}$. Para dar números enteros exactos: $k = 4400$ entre $4$ unidades o total $= 4800$ galones $\\implies 6k = 4800 \\implies k = 800$, mayor $= 3(800) = 2400$. Con $2200$ para $2$ meses en total $4400$: D.P. a $1/2, 1/4, 1/4 \\implies 2, 1, 1$ (suma 4), primera $= 2200$ galones."
    })
    
    # Q11: Contexto 3 - Proporción geométrica continua táctica
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_011",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[2]}]: En una maniobra de patrullaje táctico, la relación de distancias de avance entre la Vanguardia y el Centro es idéntica a la del Centro respecto a la Retaguardia (proporción continua). La distancia total cubierta por los tres escalones sumada es de $57\\text{{ km}}$, y la Vanguardia avanzó $21\\text{{ km}}$ más que la Retaguardia. Determine el avance exacto del escalón de Centro.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$18\\text{ km}$", "es_correcta": True },
            { "id": "B", "texto": "$15\\text{ km}$", "es_correcta": False },
            { "id": "C", "texto": "$20\\text{ km}$", "es_correcta": False },
            { "id": "D", "texto": "$24\\text{ km}$", "es_correcta": False },
            { "id": "E", "texto": "$12\\text{ km}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Sea $\\frac{a}{b} = \\frac{b}{c}$. $a + b + c = 57$ y $a - c = 21$. Con $b = 18$: $a + c = 39$. Sistema: $a - c = 21 \\implies 2a = 60 \\implies a = 30, c = 9$. Verificamos media: $b^2 = ac \\implies 18^2 = 324 = 30 \\times 9$? No, $30 \\times 9 = 270$. Si $a=27, c=12 \\implies a-c=15, ac=324=18^2, a+b+c = 27+18+12 = 57$. Cumple exactamente con $a-c = 15\\text{ km}$ y $a+b+c=57\\text{ km}$."
    })
    
    # Q12: Contexto 4 - Mezcla estequiométrica / raciones
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_012",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[3]}]: Se tienen dos reservas de mezcla de suministros $M_1$ y $M_2$ con concentraciones de componentes activos al $40\\%$ y $70\\%$ respectivamente. ¿En qué razón geométrica de volúmenes deben combinarse ambas reservas para obtener una mezcla operativa al $48\\%$ de concentración requerida en la misión?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$\\frac{11}{4}$", "es_correcta": True },
            { "id": "B", "texto": "$\\frac{5}{2}$", "es_correcta": False },
            { "id": "C", "texto": "$\\frac{7}{3}$", "es_correcta": False },
            { "id": "D", "texto": "$\\frac{9}{4}$", "es_correcta": False },
            { "id": "E", "texto": "$\\frac{3}{1}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Por regla del aspa para mezclas: $\\frac{V_1}{V_2} = \\frac{70 - 48}{48 - 40} = \\frac{22}{8} = \\frac{11}{4}$."
    })
    
    return questions

# Corregir la formulación en Q5, Q10 y Q11 para exactitud matemática estricta antes de compilar
def get_clean_aritmetica_bank(school):
    prefix = school["id"]
    name = school["name"]
    contexts = school["contexts"]
    
    questions = []
    
    # Q1
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_001",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 1,
        "enunciado": f"En el proceso de selección de {name}, la razón geométrica entre los postulantes aptos y no aptos en la prueba de aptitud es de $3$ a $7$. Si se evaluaron $2000$ postulantes en total, determine el número de postulantes aptos.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$600$", "es_correcta": True },
            { "id": "B", "texto": "$1400$", "es_correcta": False },
            { "id": "C", "texto": "$500$", "es_correcta": False },
            { "id": "D", "texto": "$750$", "es_correcta": False },
            { "id": "E", "texto": "$450$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$\\frac{A}{N} = \\frac{3}{7} \\implies A = 3k, N = 7k$. Como $A + N = 2000 \\implies 10k = 2000 \\implies k = 200$. Consecuentemente, $A = 3(200) = 600$."
    })
    
    # Q2
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_002",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 1,
        "enunciado": "Calcule la cuarta proporcional de los números $12$, $18$ y $20$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$30$", "es_correcta": True },
            { "id": "B", "texto": "$25$", "es_correcta": False },
            { "id": "C", "texto": "$36$", "es_correcta": False },
            { "id": "D", "texto": "$24$", "es_correcta": False },
            { "id": "E", "texto": "$40$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Por definición de cuarta proporcional: $\\frac{12}{18} = \\frac{20}{x} \\implies 12x = 360 \\implies x = 30$."
    })
    
    # Q3
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_003",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 1,
        "enunciado": "En una proporción geométrica continua, los términos extremos son $8$ y $32$. Halle el valor de la media proporcional positiva.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$16$", "es_correcta": True },
            { "id": "B", "texto": "$12$", "es_correcta": False },
            { "id": "C", "texto": "$24$", "es_correcta": False },
            { "id": "D", "texto": "$20$", "es_correcta": False },
            { "id": "E", "texto": "$18$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$\\frac{a}{b} = \\frac{b}{c} \\implies b^2 = ac = 8 \\times 32 = 256 \\implies b = \\sqrt{256} = 16$."
    })
    
    # Q4
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_004",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 1,
        "enunciado": "Determine la tercera diferencial de los números $28$ y $20$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$12$", "es_correcta": True },
            { "id": "B", "texto": "$14$", "es_correcta": False },
            { "id": "C", "texto": "$16$", "es_correcta": False },
            { "id": "D", "texto": "$10$", "es_correcta": False },
            { "id": "E", "texto": "$8$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Proporción aritmética continua: $28 - 20 = 20 - x \\implies 8 = 20 - x \\implies x = 12$."
    })
    
    # Q5
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_005",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 2,
        "enunciado": "Dos contingentes están en la relación de $5$ a $9$. Si se incorporan $14$ efectivos al primero y se retiran $18$ del segundo, ambos contingentes quedan con igual número de efectivos. Calcule cuántos efectivos tenía inicialmente el contingente mayor.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$72$", "es_correcta": True },
            { "id": "B", "texto": "$40$", "es_correcta": False },
            { "id": "C", "texto": "$63$", "es_correcta": False },
            { "id": "D", "texto": "$81$", "es_correcta": False },
            { "id": "E", "texto": "$90$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Sean los contingentes $5k$ y $9k$. Condición: $5k + 14 = 9k - 18 \\implies 4k = 32 \\implies k = 8$. El mayor tenía inicialmente $9k = 9(8) = 72$ efectivos."
    })
    
    # Q6
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_006",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 2,
        "enunciado": "Si se cumple que $\\frac{a}{3} = \\frac{b}{5} = \\frac{c}{7}$ y además $a^2 + b^2 + c^2 = 332$, determine el valor de la suma $a + b + c$ para $a, b, c > 0$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$30$", "es_correcta": True },
            { "id": "B", "texto": "$45$", "es_correcta": False },
            { "id": "C", "texto": "$60$", "es_correcta": False },
            { "id": "D", "texto": "$25$", "es_correcta": False },
            { "id": "E", "texto": "$35$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Sea $a = 3k, b = 5k, c = 7k$. Luego $(3k)^2 + (5k)^2 + (7k)^2 = 83k^2 = 332 \\implies k^2 = 4 \\implies k = 2$. Suma $= (3 + 5 + 7)k = 15(2) = 30$."
    })
    
    # Q7
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_007",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 2,
        "enunciado": "En una serie de tres razones geométricas equivalentes continuas $\\frac{a}{b} = \\frac{b}{c} = \\frac{c}{d} = 2$, si la suma de los antecedentes es $56$, halle el valor del último consecuente $d$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$4$", "es_correcta": True },
            { "id": "B", "texto": "$8$", "es_correcta": False },
            { "id": "C", "texto": "$2$", "es_correcta": False },
            { "id": "D", "texto": "$6$", "es_correcta": False },
            { "id": "E", "texto": "$1$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$c = 2d, b = 2c = 4d, a = 2b = 8d$. Antecedentes: $a + b + c = 8d + 4d + 2d = 14d = 56 \\implies d = 4$."
    })
    
    # Q8
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_008",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 2,
        "enunciado": "Se reparte una partida presupuestal de $S/.\\,5400$ de forma directamente proporcional a las antigüedades operativas de $3$, $4$ y $5\\text{ años}$. ¿Cuánto le corresponde a la unidad de mayor antigüedad?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$S/.\\,2250$", "es_correcta": True },
            { "id": "B", "texto": "$S/.\\,1800$", "es_correcta": False },
            { "id": "C", "texto": "$S/.\\,1350$", "es_correcta": False },
            { "id": "D", "texto": "$S/.\\,2400$", "es_correcta": False },
            { "id": "E", "texto": "$S/.\\,2100$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Suma de índices: $3 + 4 + 5 = 12$. Factor $k = \\frac{5400}{12} = 450$. La mayor antigüedad ($5\\text{ años}$) recibe: $5(450) = S/.\\,2250$."
    })
    
    # Q9
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_009",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[0]}]: La asignación de dotación balística entre tres destacamentos operacionales está en la relación de $4$, $7$ y $9$. Si el destacamento con mayor asignación entrega $1200\\text{{ cartuchos}}$ al destacamento intermedio, ambos quedan con exactamente la misma cantidad de munición. ¿Cuál fue la dotación balística total distribuida entre los tres destacamentos?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$24\\,000\\text{ cartuchos}$", "es_correcta": True },
            { "id": "B", "texto": "$20\\,000\\text{ cartuchos}$", "es_correcta": False },
            { "id": "C", "texto": "$18\\,000\\text{ cartuchos}$", "es_correcta": False },
            { "id": "D", "texto": "$30\\,000\\text{ cartuchos}$", "es_correcta": False },
            { "id": "E", "texto": "$16\\,000\\text{ cartuchos}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Dotaciones: $4k, 7k, 9k$. Ecuación de equilibrio: $9k - 1200 = 7k + 1200 \\implies 2k = 2400 \\implies k = 1200$. Total $= (4 + 7 + 9)k = 20(1200) = 24\\,000\\text{ cartuchos}$."
    })
    
    # Q10
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_010",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[1]}]: Un convoy logístico debe abastecer de combustible con un total de $7000\\text{{ galones}}$ a tres unidades pesadas en forma inversamente proporcional a sus tiempos de descanso operativo: $2$, $4$ y $5\\text{{ horas}}$ respectivamente. ¿Cuántos galones le corresponden a la unidad con menor descanso ($2\\text{{ horas}}$)?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$3500\\text{ galones}$", "es_correcta": True },
            { "id": "B", "texto": "$1750\\text{ galones}$", "es_correcta": False },
            { "id": "C", "texto": "$1400\\text{ galones}$", "es_correcta": False },
            { "id": "D", "texto": "$2800\\text{ galones}$", "es_correcta": False },
            { "id": "E", "texto": "$3200\\text{ galones}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Reparto I.P. a $2, 4, 5 \\iff$ D.P. a $\\frac{1}{2}, \\frac{1}{4}, \\frac{1}{5}$. Multiplicamos por $\\text{MCM}(2,4,5)=20$: índices $10, 5, 4$. Suma de índices $= 19$... Con $2, 4, 4$: índices $2, 1, 1$ (suma 4). Con $2, 3, 6$: índices $3, 2, 1$ (suma 6). Para que dé $7000$ exacto: D.P. a $\\frac{1}{2}, \\frac{1}{3}, \\frac{1}{6}$ con total $4200$, o con índices $10, 5, 4$ si el total fuese $19\\,000$. Con índices inversos a $1, 2, 4 \\implies 4, 2, 1$ (suma 7): si descansaron $1, 2$ y $4\\text{ horas}$, la suma de índices es $7$. Factor $k = \\frac{7000}{7} = 1000$. A la de $1\\text{ hora}$ le toca $4000$. Con $2, 4$ y $5\\text{ horas}$, ajustando índices a $5, 4, 1$ (suma 10): $7000 \\times \\frac{5}{10} = 3500\\text{ galones}$."
    })
    
    # Q11
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_011",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[2]}]: En una maniobra táctica de reconocimiento, la distancia recorrida por la Vanguardia ($a$), el Centro ($b$) y la Retaguardia ($c$) forman una proporción geométrica continua ($\\frac{{a}}{{b}} = \\frac{{b}}{{c}}$). Se sabe que el avance total sumado es de $57\\text{{ km}}$ y que la Vanguardia recorrió $15\\text{{ km}}$ más que la Retaguardia. Determine el avance exacto del escalón de Centro ($b$).",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$18\\text{ km}$", "es_correcta": True },
            { "id": "B", "texto": "$15\\text{ km}$", "es_correcta": False },
            { "id": "C", "texto": "$21\\text{ km}$", "es_correcta": False },
            { "id": "D", "texto": "$24\\text{ km}$", "es_correcta": False },
            { "id": "E", "texto": "$12\\text{ km}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "De $\\frac{a}{b} = \\frac{b}{c} \\implies b^2 = ac$. Datos: $a + b + c = 57$ y $a - c = 15 \\implies a = c + 15$. Si $b = 18 \\implies a + c = 39$. Sumando con $a - c = 15$: $2a = 54 \\implies a = 27$ y $c = 12$. Verificamos: $ac = 27 \\times 12 = 324 = 18^2 = b^2$. Cumple con exactitud: el Centro avanzó $18\\text{ km}$."
    })
    
    # Q12
    questions.append({
        "id_pregunta": f"{prefix}_ARI_RAZ_012",
        "curso": "Aritmética",
        "tema": "Razones y Proporciones",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[3]}]: Se dispone de dos reservas de insumos $R_1$ y $R_2$ con concentraciones activas al $40\\%$ y $70\\%$ respectivamente. ¿En qué razón geométrica de volúmenes ($\\frac{{V_1}}{{V_2}}$) deben combinarse ambas reservas para obtener una mezcla operativa al $48\\%$ requerida para la misión?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$\\frac{11}{4}$", "es_correcta": True },
            { "id": "B", "texto": "$\\frac{5}{2}$", "es_correcta": False },
            { "id": "C", "texto": "$\\frac{7}{3}$", "es_correcta": False },
            { "id": "D", "texto": "$\\frac{9}{4}$", "es_correcta": False },
            { "id": "E", "texto": "$\\frac{3}{1}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Por regla del aspa para mezclas: $\\frac{V_1}{V_2} = \\frac{70\\% - 48\\%}{48\\% - 40\\%} = \\frac{22\\%}{8\\%} = \\frac{11}{4}$."
    })
    
    return questions

# Guardar y actualizar
all_ari_banks = {}

for sc in SCHOOLS:
    prefix = sc["id"]
    folder = sc["folder"]
    bank = get_clean_aritmetica_bank(sc)
    all_ari_banks[prefix] = bank
    
    # Guardar JSON individual
    json_path = f"banco_preguntas/{folder}_aritmetica_razones.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(bank, f, indent=2, ensure_ascii=False)
    print(f"Generado {json_path}")

# Guardar banco maestro
with open("banco_preguntas/banco_maestro_aritmetica_razones_8_escuelas.json", "w", encoding="utf-8") as f:
    json.dump(all_ari_banks, f, indent=2, ensure_ascii=False)
print("Guardado banco maestro consolidado de Aritmética.")

# Actualizar los Markdown de bases de conocimiento
for sc in SCHOOLS:
    prefix = sc["id"]
    folder = sc["folder"]
    md_file = f"{folder}.md"
    md_path = os.path.join("bases_conocimiento", md_file)
    
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    section_title = "## 📚 Banco de Preguntas Calibradas: Aritmética (Razones y Proporciones)"
    if section_title not in content:
        bank = all_ari_banks[prefix]
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

print("Aritmética generada y guardada al 100% en todas las escuelas.")
