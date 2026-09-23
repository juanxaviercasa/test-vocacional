#!/usr/bin/env python3
"""
Script para enriquecer preguntas de Álgebra, Trigonometría, Geometría y Física
con sintaxis LaTeX oficial y soporte de gráficos vectoriales ('imagen_url').
"""

import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ENRICHMENTS = {
    'MAT_11': {
        'enunciado': 'Simplifique la siguiente expresión algebraica de potencia y radicación militar: $$E = \\frac{2^{n+4} - 2 \\cdot 2^n}{2 \\cdot 2^{n+3}}$$',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$\\frac{7}{8}$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$\\frac{3}{4}$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$\\frac{1}{2}$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$1$', 'es_correcta': False}
        ]
    },
    'MAT_12': {
        'enunciado': 'Si la suma de dos variables tácticas $x + y = 6$ y su producto $x \\cdot y = 7$, halle el valor numérico de la suma de sus cubos: $$E = x^3 + y^3$$',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$90$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$102$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$84$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$96$', 'es_correcta': False}
        ]
    },
    'MAT_13': {
        'enunciado': 'Dado el polinomio $P(x, y) = 3x^{m+1}y^{n-2} + 5x^{m+2}y^n$, si su Grado Relativo respecto a $x$ es $\\operatorname{GR}(x) = 7$ y su Grado Absoluto $\\operatorname{GA} = 12$, halle el valor de $(m \\cdot n)$.',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$25$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$20$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$30$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$15$', 'es_correcta': False}
        ]
    },
    'MAT_14': {
        'enunciado': 'Al dividir el polinomio dividendo $D(x) = 2x^4 + 3x^3 - x^2 + 5x - 2$ entre $d(x) = x^2 + x - 1$ aplicando el método de William G. Horner, ¿cuál es el resto o residuo $R(x)$ obtenido?',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$3x + 1$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$2x - 1$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$5x - 3$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$-x + 4$', 'es_correcta': False}
        ]
    },
    'MAT_15': {
        'enunciado': 'Al factorizar por aspa simple el trinomio cuadrático $P(x) = 6x^2 - 11x - 10$, ¿cuál de los siguientes binomios representa uno de sus factores primos tácticos?',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$2x - 5$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$3x + 5$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$6x - 1$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$x + 2$', 'es_correcta': False}
        ]
    },
    'MAT_16': {
        'enunciado': 'Si $r_1$ y $r_2$ son las raíces de la ecuación cuadrática $2x^2 - 7x + 3 = 0$, calcule el valor de la expresión: $$E = \\frac{1}{r_1} + \\frac{1}{r_2}$$',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$\\frac{7}{3}$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$\\frac{3}{7}$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$\\frac{7}{2}$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$\\frac{2}{3}$', 'es_correcta': False}
        ]
    },
    'MAT_17': {
        'enunciado': 'Resuelva el siguiente sistema lineal táctico de aprovisionamiento militar: $$\\begin{cases} 2x + 3y = 29 \\\\ 5x - 2y = 6 \\end{cases}$$ Halle el valor numérico de la suma $(x + y)$.',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$11$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$9$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$13$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$10$', 'es_correcta': False}
        ]
    },
    'MAT_18': {
        'enunciado': 'Determine el conjunto solución de la inecuación cuadrática que modela el rango balístico de seguridad: $$x^2 - 5x - 14 \\le 0$$',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$[-2, 7]$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$\\langle -2, 7 \\rangle$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$\\langle -\\infty, -2] \\cup [7, +\\infty\\rangle$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$[-7, 2]$', 'es_correcta': False}
        ]
    },
    'MAT_20': {
        'enunciado': 'Calcule el valor de $x$ en la siguiente ecuación logarítmica de frecuencia de radar: $$\\log_2(x + 3) + \\log_2(x - 3) = 4$$',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$5$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$-5$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$\\pm 5$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$7$', 'es_correcta': False}
        ]
    },
    'MAT_27': {
        'enunciado': 'En la figura geométrica adjunta, en el triángulo rectángulo $ABC$ recto en $B$, se traza la altura relativa a la hipotenusa $BH = h$. Si la hipotenusa mide $b = AC = 25\\text{ cm}$ y la altura $h = 12\\text{ cm}$, halle la longitud del cateto menor $c = AB$:',
        'imagen_url': '/assets/math/geo_01.svg',
        'imagen_alt': 'Relaciones métricas en el triángulo rectángulo ABC recto en B',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$15\\text{ cm}$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$20\\text{ cm}$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$16\\text{ cm}$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$18\\text{ cm}$', 'es_correcta': False}
        ]
    },
    'MAT_35': {
        'enunciado': 'En la circunferencia trigonométrica ilustrada en el gráfico vectorial, si el punto $P(-3, 4)$ pertenece al lado final de un ángulo $\\theta$ en posición normal, determine el valor de la expresión: $$E = 5\\operatorname{sen}(\\theta) + 4\\cos(\\theta)$$',
        'imagen_url': '/assets/math/trig_01.svg',
        'imagen_alt': 'Circunferencia trigonométrica y ángulo θ en posición normal',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$\\frac{8}{5}$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$\\frac{16}{5}$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$\\frac{4}{5}$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$2$', 'es_correcta': False}
        ]
    },
    'MAT_37': {
        'enunciado': 'Simplifique la siguiente expresión trigonométrica fundamental de artillería: $$E = \\frac{\\operatorname{sen}^2(x) + \\cos^2(x)}{1 + \\tan^2(x)}$$',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$\\cos^2(x)$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$\\operatorname{sen}^2(x)$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$\\sec^2(x)$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$1$', 'es_correcta': False}
        ]
    },
    'MAT_38': {
        'enunciado': 'Calcule el valor exacto de $\\operatorname{sen}(75^\\circ)$ aplicando la identidad del seno de la suma de arcos notables: $$\\operatorname{sen}(45^\\circ + 30^\\circ) = \\operatorname{sen}(45^\\circ)\\cos(30^\\circ) + \\cos(45^\\circ)\\operatorname{sen}(30^\\circ)$$',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$\\frac{\\sqrt{3} + 1}{2}$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$\\frac{\\sqrt{2}}{2}$', 'es_correcta': False}
        ]
    },
    'MAT_39': {
        'enunciado': 'Si $\\operatorname{sen}(x) \\cdot \\cos(x) = \\frac{1}{4}$, determine el valor exacto del seno del ángulo doble $\\operatorname{sen}(2x)$:',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$\\frac{1}{2}$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$\\frac{1}{4}$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$1$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$\\frac{\\sqrt{2}}{2}$', 'es_correcta': False}
        ]
    },
    'FIS_45': {
        'enunciado': 'Sobre un vehículo blindado ligero de masa $m = 2500\\text{ kg}$ actúa una fuerza motriz neta horizontal $\\vec{F} = 7500\\text{ N}$. Aplicando la Segunda Ley de Newton $\\vec{F} = m \\cdot \\vec{a}$, determine la aceleración comunicada al vehículo:',
        'opciones': [
            {'id_opcion': 'A', 'texto_respuesta': '$3\\text{ m/s}^2$', 'es_correcta': True},
            {'id_opcion': 'B', 'texto_respuesta': '$2.5\\text{ m/s}^2$', 'es_correcta': False},
            {'id_opcion': 'C', 'texto_respuesta': '$5\\text{ m/s}^2$', 'es_correcta': False},
            {'id_opcion': 'D', 'texto_respuesta': '$4\\text{ m/s}^2$', 'es_correcta': False}
        ]
    }
}

target_files = [
    os.path.join(BASE_DIR, 'conocimientos_psicotecnico.json'),
    os.path.join(BASE_DIR, 'pilar4_aptitud_conocimientos.json')
]

for target_file in target_files:
    if not os.path.exists(target_file):
        print(f'File not found: {target_file}')
        continue

    with open(target_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    updated_count = 0
    questions = data.get('banco_preguntas_conocimientos', [])
    for q in questions:
        qid = q.get('id_pregunta')
        if qid in ENRICHMENTS:
            enr = ENRICHMENTS[qid]
            q['enunciado'] = enr['enunciado']
            if 'imagen_url' in enr:
                q['imagen_url'] = enr['imagen_url']
            if 'imagen_alt' in enr:
                q['imagen_alt'] = enr['imagen_alt']
            if 'opciones' in enr:
                q['opciones'] = enr['opciones']
            updated_count += 1

    with open(target_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f'Enriched {updated_count} questions in {os.path.basename(target_file)}')

# Enriquecer también engine/data/admission_questions.json
adm_path = os.path.join(BASE_DIR, 'engine', 'data', 'admission_questions.json')
if os.path.exists(adm_path):
    with open(adm_path, 'r', encoding='utf-8') as f:
        adm_data = json.load(f)

    adm_updates = 0
    for q in adm_data.get('questions', []):
        qid = q.get('id')
        if qid == 'GEO-001':
            q['question'] = 'En el triángulo rectángulo mostrado en el gráfico vectorial, la hipotenusa mide $b = 25\\text{ cm}$ y uno de los catetos mide $a = 20\\text{ cm}$. ¿Cuánto mide la altura $h$ relativa a la hipotenusa?'
            q['imagen_url'] = '/assets/math/geo_01.svg'
            q['imagen_alt'] = 'Relaciones métricas en el triángulo rectángulo ABC'
            q['options'] = ['$12\\text{ cm}$', '$15\\text{ cm}$', '$10\\text{ cm}$', '$16\\text{ cm}$', '$14\\text{ cm}$']
            adm_updates += 1
        elif qid == 'GEO-002':
            q['question'] = 'Calcule el valor numérico exacto de la expresión trigonométrica: $$E = 2\\operatorname{sen}(30^\\circ) + 4\\cos(60^\\circ) - \\tan(45^\\circ)$$'
            q['options'] = ['$2$', '$1$', '$3$', '$0$', '$1.5$']
            adm_updates += 1
        elif qid == 'GEO-005':
            q['question'] = 'Simplifique la siguiente expresión trigonométrica fundamental: $$K = \\frac{\\operatorname{sen}^2(x) + \\cos^2(x)}{1 + \\tan^2(x)}$$'
            q['options'] = ['$\\cos^2(x)$', '$\\operatorname{sen}^2(x)$', '$\\tan^2(x)$', '$\\sec^2(x)$', '$1$']
            adm_updates += 1
        elif qid == 'RM-002':
            q['question'] = 'Se define el operador matemático: $$a \\ast b = 2a + 3b - 5$$ Calcule el valor de: $$E = (3 \\ast 4) \\ast 2$$'
            q['options'] = ['$31$', '$27$', '$25$', '$29$', '$33$']
            adm_updates += 1

    with open(adm_path, 'w', encoding='utf-8') as f:
        json.dump(adm_data, f, ensure_ascii=False, indent=2)
    print(f'Enriched {adm_updates} questions in admission_questions.json')

print('Enrichment completed successfully.')
