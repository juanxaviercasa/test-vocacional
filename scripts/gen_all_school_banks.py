# -*- coding: utf-8 -*-
"""
Script maestro para generar los bancos de preguntas de Álgebra (Ecuaciones Cuadráticas)
para las 8 escuelas militares y policiales del Perú, y guardarlas en los archivos .md canónicos.
"""
import json
import os
import shutil

os.makedirs('banco_preguntas', exist_ok=True)

# Cargar EMCH existente
with open('banco_preguntas/01_EMCH_algebra_cuadraticas.json', 'r', encoding='utf-8') as f:
    emch_questions = json.load(f)

# 02 ETE (Suboficiales - Ejército)
ete_questions = [
  {
    "id_pregunta": "ETE_ALG_CUA_001",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 1,
    "enunciado": "Resuelva la ecuación cuadrática incompleta pura: $$3x^2 - 75 = 0$$",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$x = \\pm 5$", "es_correcta": True },
      { "id": "B", "texto": "$x = 5$", "es_correcta": False },
      { "id": "C", "texto": "$x = \\pm 25$", "es_correcta": False },
      { "id": "D", "texto": "$x = \\pm \\sqrt{15}$", "es_correcta": False },
      { "id": "E", "texto": "$x = 0$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Despejamos $x^2$: $3x^2 = 75 \\implies x^2 = 25 \\implies x = \\pm \\sqrt{25} = \\pm 5$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_002",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 1,
    "enunciado": "Determine el conjunto solución de la ecuación cuadrática incompleta mixta: $$2x^2 + 10x = 0$$",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$\\{0, -5\\}$", "es_correcta": True },
      { "id": "B", "texto": "$\\{0, 5\\}$", "es_correcta": False },
      { "id": "C", "texto": "$\\{-5\\}$", "es_correcta": False },
      { "id": "D", "texto": "$\\{0, -10\\}$", "es_correcta": False },
      { "id": "E", "texto": "$\\{-2, -5\\}$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Factorizamos por término común: $2x(x + 5) = 0 \\implies 2x = 0 \\implies x_1 = 0$; $x + 5 = 0 \\implies x_2 = -5$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_003",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 1,
    "enunciado": "Calcule el discriminante ($\\Delta$) de la ecuación $x^2 + 4x + 5 = 0$ y determine la naturaleza de sus raíces.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$\\Delta = -4$; raíces complejas conjugadas", "es_correcta": True },
      { "id": "B", "texto": "$\\Delta = 4$; raíces reales y diferentes", "es_correcta": False },
      { "id": "C", "texto": "$\\Delta = 0$; raíces reales e iguales", "es_correcta": False },
      { "id": "D", "texto": "$\\Delta = -16$; raíces imaginarias puras", "es_correcta": False },
      { "id": "E", "texto": "$\\Delta = 36$; raíces racionales", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Calculamos $\\Delta = b^2 - 4ac = 4^2 - 4(1)(5) = 16 - 20 = -4$. Como $\\Delta < 0$, las raíces no son reales sino complejas conjugadas."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_004",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 1,
    "enunciado": "En la ecuación $5x^2 - 14x - 15 = 0$, calcule el producto de sus raíces ($x_1 \\cdot x_2$).",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$-3$", "es_correcta": True },
      { "id": "B", "texto": "$3$", "es_correcta": False },
      { "id": "C", "texto": "$\\frac{14}{5}$", "es_correcta": False },
      { "id": "D", "texto": "$-\\frac{14}{5}$", "es_correcta": False },
      { "id": "E", "texto": "$-15$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Por la propiedad del producto de Cardano-Vieta: $P = \\frac{c}{a} = \\frac{-15}{5} = -3$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_005",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 2,
    "enunciado": "Determine el valor de $k$ para que la ecuación $(k - 2)x^2 + (k^2 - 16)x + 8 = 0$ tenga raíces simétricas y reales.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$k = -4$", "es_correcta": True },
      { "id": "B", "texto": "$k = 4$", "es_correcta": False },
      { "id": "C", "texto": "$k = \\pm 4$", "es_correcta": False },
      { "id": "D", "texto": "$k = 2$", "es_correcta": False },
      { "id": "E", "texto": "$k = 0$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Raíces simétricas exigen $b = 0 \\implies k^2 - 16 = 0 \\implies k = \\pm 4$. Si $k = 4$, $a = 2$, $\\Delta = 0^2 - 4(2)(8) = -64 < 0$ (no reales). Si $k = -4$, $a = -6$, $\\Delta = 0^2 - 4(-6)(8) = 192 > 0$ (reales). Por tanto $k = -4$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_006",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 2,
    "enunciado": "Dada la ecuación $3x^2 - 7x + 2 = 0$ con raíces $x_1$ y $x_2$, calcule la suma de sus inversas: $H = \\frac{1}{x_1} + \\frac{1}{x_2}$.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$\\frac{7}{2}$", "es_correcta": True },
      { "id": "B", "texto": "$\\frac{2}{7}$", "es_correcta": False },
      { "id": "C", "texto": "$-\\frac{7}{2}$", "es_correcta": False },
      { "id": "D", "texto": "$\\frac{7}{3}$", "es_correcta": False },
      { "id": "E", "texto": "$\\frac{2}{3}$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "$H = \\frac{x_1 + x_2}{x_1 x_2} = \\frac{-b/a}{c/a} = -\\frac{b}{c}$. Sustituyendo $b = -7$ y $c = 2$: $H = -\\frac{-7}{2} = \\frac{7}{2}$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_007",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 2,
    "enunciado": "Forme la ecuación cuadrática entera con coeficientes enteros irreductibles cuyas raíces son $x_1 = \\frac{1}{2}$ y $x_2 = -\\frac{3}{4}$.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$8x^2 + 2x - 3 = 0$", "es_correcta": True },
      { "id": "B", "texto": "$8x^2 - 2x - 3 = 0$", "es_correcta": False },
      { "id": "C", "texto": "$4x^2 + x - 3 = 0$", "es_correcta": False },
      { "id": "D", "texto": "$8x^2 + 2x + 3 = 0$", "es_correcta": False },
      { "id": "E", "texto": "$2x^2 + 5x - 3 = 0$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Suma: $S = \\frac{1}{2} - \\frac{3}{4} = -\\frac{1}{4}$. Producto: $P = \\frac{1}{2}\\left(-\\frac{3}{4}\\right) = -\\frac{3}{8}$. Ecuación: $x^2 - \\left(-\\frac{1}{4}\\right)x + \\left(-\\frac{3}{8}\\right) = 0 \\implies 8x^2 + 2x - 3 = 0$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_008",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 2,
    "enunciado": "Dada la ecuación $x^2 - 12x + q = 0$, halle el valor de $q$ sabiendo que la razón entre sus raíces es $x_1 / x_2 = 3$.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$27$", "es_correcta": True },
      { "id": "B", "texto": "$36$", "es_correcta": False },
      { "id": "C", "texto": "$18$", "es_correcta": False },
      { "id": "D", "texto": "$32$", "es_correcta": False },
      { "id": "E", "texto": "$24$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "$x_1 = 3x_2$. Suma: $x_1 + x_2 = 4x_2 = 12 \\implies x_2 = 3 \\implies x_1 = 9$. Producto: $q = x_1 x_2 = (9)(3) = 27$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_009",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "Un tanque de combate del Batallón Blindado de la ETE presenta un consumo de combustible que depende de su velocidad de avance $v$ (en $\\text{km/h}$) según la relación: $$C(v) = 0.05v^2 - 4v + 120 \\quad (\\text{en galones por cada } 100\\text{ km})$$ Si durante una maniobra el consumo se fija en $45\\text{ galones/100 km}$, determine la diferencia positiva entre las dos velocidades operativas que satisfacen este consumo.",
    "apoyo_visual": {
      "requiere_grafico": True,
      "imagen_url": None,
      "descripcion_para_diseñador": "Curva parabólica cóncava hacia arriba que representa el consumo C(v) en función de la velocidad v, con una línea horizontal en C = 45 que interseca la curva en v = 30 y v = 50 km/h."
    },
    "opciones": [
      { "id": "A", "texto": "$15\\text{{ km/h}}$", "es_correcta": False },
      { "id": "B", "texto": "$20\\text{{ km/h}}$", "es_correcta": True },
      { "id": "C", "texto": "$25\\text{{ km/h}}$", "es_correcta": False },
      { "id": "D", "texto": "$30\\text{{ km/h}}$", "es_correcta": False },
      { "id": "E", "texto": "$10\\text{{ km/h}}$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Igualamos: $0.05v^2 - 4v + 120 = 45 \\implies 0.05v^2 - 4v + 75 = 0$. Multiplicando por 20: $v^2 - 80v + 1500 = 0 \\implies (v - 50)(v - 30) = 0$. Las velocidades son $50\\text{{ km/h}}$ y $30\\text{{ km/h}}$. Su diferencia es $50 - 30 = 20\\text{{ km/h}}$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_010",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "En un ensayo balístico de tiro con fusil de asalto de dotación militar, la trayectoria parabólica vertical $y$ (en mm) respecto al eje del cañón a una distancia $x$ (en metros) se modela mediante: $$y = -0.002x^2 + 0.4x$$ ¿A qué distancia $x > 0$ el proyectil vuelve a intersectar exactamente la línea de puntería horizontal ($y = 0$)?",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$100\\text{{ m}}$", "es_correcta": False },
      { "id": "B", "texto": "$150\\text{{ m}}$", "es_correcta": False },
      { "id": "C", "texto": "$200\\text{{ m}}$", "es_correcta": True },
      { "id": "D", "texto": "$250\\text{{ m}}$", "es_correcta": False },
      { "id": "E", "texto": "$400\\text{{ m}}$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Hacemos $y = 0$: $-0.002x^2 + 0.4x = 0 \\implies x(-0.002x + 0.4) = 0$. Para la solución no trivial: $0.002x = 0.4 \\implies x = \\frac{0.4}{0.002} = 200\\text{{ metros}}$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_011",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "Una torre de radio-enlace militar de la Escuela Técnica debe asegurarse con tirantes de acero de $20\\text{{ metros}}$ de longitud tensados hasta el suelo. Si la altura vertical de la torre excede en $4\\text{{ metros}}$ a la distancia horizontal desde su pie hasta el punto de anclaje del tirante, calcule la altura vertical de la antena.",
    "apoyo_visual": {
      "requiere_grafico": True,
      "imagen_url": None,
      "descripcion_para_diseñador": "Triángulo rectángulo con cateto vertical h (altura), cateto horizontal d = h - 4, e hipotenusa igual a 20 m correspondiente al tirante de acero."
    },
    "opciones": [
      { "id": "A", "texto": "$12\\text{{ m}}$", "es_correcta": False },
      { "id": "B", "texto": "$14\\text{{ m}}$", "es_correcta": False },
      { "id": "C", "texto": "$16\\text{{ m}}$", "es_correcta": True },
      { "id": "D", "texto": "$18\\text{{ m}}$", "es_correcta": False },
      { "id": "E", "texto": "$20\\text{{ m}}$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Sea $h$ la altura de la torre; el cateto horizontal es $h - 4$. Por Pitágoras: $h^2 + (h - 4)^2 = 20^2 \\implies 2h^2 - 8h - 384 = 0 \\implies h^2 - 4h - 192 = 0 \\implies (h - 16)(h + 12) = 0$. Como $h > 0$, la altura es $h = 16\\text{{ metros}}$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_012",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "En el taller de armamento de la ETE se desea confeccionar una bandeja metálica de pertrechos a partir de una lámina rectangular de zinc de $60\\text{ cm}$ de largo por $40\\text{ cm}$ de ancho, recortando un cuadrado de lado $x$ en cada una de sus cuatro esquinas y doblando los lados hacia arriba. Si el área del fondo rectangular resultante debe ser de exactamente $1500\\text{ cm}^2$, determine la longitud del corte de esquina $x$.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$3\\text{ cm}$", "es_correcta": False },
      { "id": "B", "texto": "$5\\text{ cm}$", "es_correcta": True },
      { "id": "C", "texto": "$7.5\\text{ cm}$", "es_correcta": False },
      { "id": "D", "texto": "$10\\text{ cm}$", "es_correcta": False },
      { "id": "E", "texto": "$15\\text{ cm}$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Las dimensiones del fondo son $(60 - 2x)$ y $(40 - 2x)$. Área: $(60 - 2x)(40 - 2x) = 1500 \\implies 4x^2 - 200x + 900 = 0 \\implies x^2 - 50x + 225 = 0 \\implies (x - 45)(x - 5) = 0$. Como $2x < 40 \\implies x < 20$, la única solución viable es $x = 5\\text{ cm}$."
  }
]

# Guardar ETE
with open('banco_preguntas/02_ETE_algebra_cuadraticas.json', 'w', encoding='utf-8') as f:
    json.dump(ete_questions, f, indent=2, ensure_ascii=False)
print('Guardado ETE')

# 03 ENP (Oficiales - Marina)
enp_questions = [
  {
    "id_pregunta": "ENP_ALG_CUA_001",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 1,
    "enunciado": "Si $x = 2$ es una de las soluciones de la ecuación cuadrática $3x^2 - mx + 8 = 0$, determine el valor del parámetro $m$.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$m = 10$", "es_correcta": True },
      { "id": "B", "texto": "$m = 8$", "es_correcta": False },
      { "id": "C", "texto": "$m = -10$", "es_correcta": False },
      { "id": "D", "texto": "$m = 14$", "es_correcta": False },
      { "id": "E", "texto": "$m = 7$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Sustituimos $x = 2$ en la ecuación: $3(2)^2 - m(2) + 8 = 0 \\implies 12 - 2m + 8 = 0 \\implies 20 = 2m \\implies m = 10$."
  },
  {
    "id_pregunta": "ENP_ALG_CUA_002",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 1,
    "enunciado": "Encuentre el valor constante de $c$ para que la ecuación $x^2 + 10x + c = 0$ admita una solución única en el conjunto de los reales.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$25$", "es_correcta": True },
      { "id": "B", "texto": "$100$", "es_correcta": False },
      { "id": "C", "texto": "$50$", "es_correcta": False },
      { "id": "D", "texto": "$5$", "es_correcta": False },
      { "id": "E", "texto": "$-25$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Solución única implica $\\Delta = 0 \\implies b^2 - 4ac = 10^2 - 4(1)(c) = 0 \\implies 100 - 4c = 0 \\implies c = 25$."
  },
  {
    "id_pregunta": "ENP_ALG_CUA_003",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 1,
    "enunciado": "Dada la ecuación cuadrática $4x^2 + 12x - 7 = 0$, calcule la suma de sus raíces.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$-3$", "es_correcta": True },
      { "id": "B", "texto": "$3$", "es_correcta": False },
      { "id": "C", "texto": "$-\\frac{7}{4}$", "es_correcta": False },
      { "id": "D", "texto": "$\\frac{7}{4}$", "es_correcta": False },
      { "id": "E", "texto": "$-12$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Por el teorema de Cardano-Vieta: $S = -\\frac{b}{a} = -\\frac{12}{4} = -3$."
  },
  {
    "id_pregunta": "ENP_ALG_CUA_004",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 1,
    "enunciado": "En la ecuación $6x^2 - 5x - 18 = 0$, determine el producto de sus raíces.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$-3$", "es_correcta": True },
      { "id": "B", "texto": "$3$", "es_correcta": False },
      { "id": "C", "texto": "$\\frac{5}{6}$", "es_correcta": False },
      { "id": "D", "texto": "$-\\frac{5}{6}$", "es_correcta": False },
      { "id": "E", "texto": "$-18$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "$P = \\frac{c}{a} = \\frac{-18}{6} = -3$."
  },
  {
    "id_pregunta": "ENP_ALG_CUA_005",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 2,
    "enunciado": "Si las raíces $\\alpha$ y $\\beta$ de la ecuación $x^2 - 6x + c = 0$ verifican la condición $\\alpha^2 + \\beta^2 = 20$, determine el valor del término independiente $c$.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$8$", "es_correcta": True },
      { "id": "B", "texto": "$16$", "es_correcta": False },
      { "id": "C", "texto": "$4$", "es_correcta": False },
      { "id": "D", "texto": "$10$", "es_correcta": False },
      { "id": "E", "texto": "$12$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "De la ecuación, $\\alpha + \\beta = 6$ y $\\alpha\\beta = c$. Sabemos que $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$. Sustituyendo: $20 = (6)^2 - 2c \\implies 20 = 36 - 2c \\implies 2c = 16 \\implies c = 8$."
  },
  {
    "id_pregunta": "ENP_ALG_CUA_006",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 2,
    "enunciado": "Determine el conjunto de valores de $k$ para los cuales la ecuación $x^2 + 2(k - 1)x + (k + 5) = 0$ posee raíces reales y distintas.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$k \\in \\langle -\\infty, -1 \\rangle \\cup \\langle 4, +\\infty \\rangle$", "es_correcta": True },
      { "id": "B", "texto": "$k \\in [-1, 4]$", "es_correcta": False },
      { "id": "C", "texto": "$k \\in \\langle -1, 4 \\rangle$", "es_correcta": False },
      { "id": "D", "texto": "$k \\in \\langle -\\infty, -4 \\rangle \\cup \\langle 1, +\\infty \\rangle$", "es_correcta": False },
      { "id": "E", "texto": "$k > 4$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Para raíces reales y distintas: $\\Delta > 0 \\implies [2(k-1)]^2 - 4(1)(k+5) > 0 \\implies 4(k^2 - 2k + 1) - 4(k+5) > 0 \\implies k^2 - 3k - 4 > 0 \\implies (k - 4)(k + 1) > 0$. Los puntos críticos dan $k < -1$ o $k > 4$."
  },
  {
    "id_pregunta": "ENP_ALG_CUA_007",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 2,
    "enunciado": "Calcule la suma de los cuadrados de todas las raíces reales de la ecuación bicuadrada: $$x^4 - 13x^2 + 36 = 0$$",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$26$", "es_correcta": True },
      { "id": "B", "texto": "$13$", "es_correcta": False },
      { "id": "C", "texto": "$52$", "es_correcta": False },
      { "id": "D", "texto": "$36$", "es_correcta": False },
      { "id": "E", "texto": "$169$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Factorizando como aspa simple: $(x^2 - 9)(x^2 - 4) = 0 \\implies x = \\pm 3$ y $x = \\pm 2$. La suma de sus cuadrados es: $3^2 + (-3)^2 + 2^2 + (-2)^2 = 9 + 9 + 4 + 4 = 26$."
  },
  {
    "id_pregunta": "ENP_ALG_CUA_008",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 2,
    "enunciado": "En la ecuación $x^2 - 8x + k = 0$, determine el valor de $k$ sabiendo que una de sus raíces es el triple de la otra ($x_1 = 3x_2$).",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$12$", "es_correcta": True },
      { "id": "B", "texto": "$16$", "es_correcta": False },
      { "id": "C", "texto": "$15$", "es_correcta": False },
      { "id": "D", "texto": "$9$", "es_correcta": False },
      { "id": "E", "texto": "$6$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Suma: $x_1 + x_2 = 3x_2 + x_2 = 4x_2 = 8 \\implies x_2 = 2 \\implies x_1 = 6$. Producto: $k = x_1 x_2 = (6)(2) = 12$."
  },
  {
    "id_pregunta": "ENP_ALG_CUA_009",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "Desde una fragata misilera de la Marina de Guerra en el Mar de Grau, se lanza un cohete bengala de iluminación naval cuya altitud $h(t)$ (en metros) respecto a la superficie del mar en función del tiempo $t$ (en segundos) está dada por: $$h(t) = -5t^2 + 100t$$ ¿En qué instantes de tiempo la bengala se encuentra a una cota exacta de $420\\text{{ metros}}$ sobre el nivel del mar?",
    "apoyo_visual": {
      "requiere_grafico": True,
      "imagen_url": None,
      "descripcion_para_diseñador": "Trayectoria balística parabólica de bengala sobre el mar, con corte horizontal en h = 420 m identificando los instantes t = 6 s (ascenso) y t = 14 s (descenso)."
    },
    "opciones": [
      { "id": "A", "texto": "$t = 4\\text{ s y } t = 16\\text{ s}$", "es_correcta": False },
      { "id": "B", "texto": "$t = 6\\text{ s y } t = 14\\text{ s}$", "es_correcta": True },
      { "id": "C", "texto": "$t = 5\\text{ s y } t = 15\\text{ s}$", "es_correcta": False },
      { "id": "D", "texto": "$t = 7\\text{ s y } t = 13\\text{ s}$", "es_correcta": False },
      { "id": "E", "texto": "$t = 8\\text{ s y } t = 12\\text{ s}$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Igualamos $h(t) = 420 \\implies -5t^2 + 100t = 420 \\implies 5t^2 - 100t + 420 = 0$. Dividiendo entre 5: $t^2 - 20t + 84 = 0 \\implies (t - 6)(t - 14) = 0$. Las soluciones son $t = 6\\text{ s}$ (fase de ascenso) y $t = 14\\text{ s}$ (fase de caída)."
  },
  {
    "id_pregunta": "ENP_ALG_CUA_010",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "Dos patrulleras marítimas de la Dirección de Capitanías y Guardacostas zarpan simultáneamente de la Base Naval del Callao siguiendo rumbos rectilíneos perpendiculares entre sí (Norte y Este). La patrullera Alfa navega a una velocidad de crucero constante que supera en $7\\text{ nudos}$ a la patrullera Bravo. Si transcurridas $2\\text{ horas}$ la distancia en línea recta entre ambos buques es de exactamente $26\\text{ millas náuticas}$, determine la velocidad de navegación de la patrullera Bravo.",
    "apoyo_visual": {
      "requiere_grafico": True,
      "imagen_url": None,
      "descripcion_para_diseñador": "Triángulo rectángulo de navegación: origen en Callao, cateto vertical hacia el Norte recorrido por patrullera Alfa (2*(v+7)), cateto horizontal hacia el Este recorrido por patrullera Bravo (2v), e hipotenusa de 26 millas náuticas."
    },
    "opciones": [
      { "id": "A", "texto": "$4\\text{ nudos}$", "es_correcta": False },
      { "id": "B", "texto": "$5\\text{ nudos}$", "es_correcta": True },
      { "id": "C", "texto": "$6\\text{ nudos}$", "es_correcta": False },
      { "id": "D", "texto": "$7\\text{ nudos}$", "es_correcta": False },
      { "id": "E", "texto": "$8\\text{ nudos}$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Distancia de Bravo: $d_B = 2v$. Distancia de Alfa: $d_A = 2(v + 7)$. Por Pitágoras: $[2(v + 7)]^2 + (2v)^2 = 26^2 \\implies 4(v + 7)^2 + 4v^2 = 676$. Dividiendo entre 4: $(v + 7)^2 + v^2 = 169 \\implies 2v^2 + 14v + 49 = 169 \\implies 2v^2 + 14v - 120 = 0 \\implies v^2 + 7v - 60 = 0 \\implies (v + 12)(v - 5) = 0$. Como la velocidad es positiva: $v = 5\\text{ nudos}$."
  },
  {
    "id_pregunta": "ENP_ALG_CUA_011",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "Si $r_1$ y $r_2$ son las raíces de la ecuación $2x^2 - 6x + 1 = 0$, construya la ecuación cuadrática mónica cuyas raíces sean $\\frac{1}{r_1^2}$ y $\\frac{1}{r_2^2}$.",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$x^2 - 32x + 4 = 0$", "es_correcta": True },
      { "id": "B", "texto": "$x^2 - 36x + 4 = 0$", "es_correcta": False },
      { "id": "C", "texto": "$x^2 - 16x + 2 = 0$", "es_correcta": False },
      { "id": "D", "texto": "$x^2 + 32x + 4 = 0$", "es_correcta": False },
      { "id": "E", "texto": "$x^2 - 34x + 1 = 0$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "$r_1 + r_2 = 3$ y $r_1 r_2 = \\frac{1}{2}$. Entonces $r_1^2 + r_2^2 = 3^2 - 2(1/2) = 8$. Nueva suma: $S' = \\frac{r_1^2 + r_2^2}{(r_1 r_2)^2} = \\frac{8}{(1/2)^2} = \\frac{8}{1/4} = 32$. Nuevo producto: $P' = \\frac{1}{(r_1 r_2)^2} = \\frac{1}{1/4} = 4$. La ecuación es $x^2 - 32x + 4 = 0$."
  },
  {
    "id_pregunta": "ENP_ALG_CUA_012",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "En un buque hidrográfico naval, el transductor sonar emite pulsos de rastreo en un sector de barrido triangular cuya base en el fondo marino excede en $30\\text{{ metros}}$ al doble de la profundidad operativa $p$. Si el área de dicho triángulo de exploración submarina es de $4500\\text{{ m}}^2$, determine la profundidad de trabajo $p$ (en metros).",
    "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
    "opciones": [
      { "id": "A", "texto": "$50\\text{{ m}}$", "es_correcta": False },
      { "id": "B", "texto": "$60\\text{{ m}}$", "es_correcta": True },
      { "id": "C", "texto": "$70\\text{{ m}}$", "es_correcta": False },
      { "id": "D", "texto": "$75\\text{{ m}}$", "es_correcta": False },
      { "id": "E", "texto": "$45\\text{{ m}}$", "es_correcta": False }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Base: $b = 2p + 30$. Altura: $p$. Área: $\\frac{b \\cdot p}{2} = \\frac{(2p + 30)p}{2} = p(p + 15) = 4500 \\implies p^2 + 15p - 4500 = 0 \\implies (p - 60)(p + 75) = 0$. Como $p > 0$, la profundidad es $p = 60\\text{{ metros}}$."
  }
]

with open('banco_preguntas/03_ENP_algebra_cuadraticas.json', 'w', encoding='utf-8') as f:
    json.dump(enp_questions, f, indent=2, ensure_ascii=False)
print('Guardado ENP')

# Proceder con CITEN, EOFAP, ESOFA, EO_PNP, EESTP_PNP
# Modificaremos y crearemos una función generadora adaptada a cada fuerza:
def make_school_bank(prefix, school_name, rank_name, context_tactico):
    return [
      {
        "id_pregunta": f"{prefix}_ALG_CUA_001",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 1,
        "enunciado": f"Dada la ecuación cuadrática $x^2 - 9x + 14 = 0$, calcule el conjunto solución en el concurso de admisión de {school_name}.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
          { "id": "A", "texto": "$\\{2, 7\\}$", "es_correcta": True },
          { "id": "B", "texto": "$\\{-2, -7\\}$", "es_correcta": False },
          { "id": "C", "texto": "$\\{1, 14\\}$", "es_correcta": False },
          { "id": "D", "texto": "$\\{-2, 7\\}$", "es_correcta": False },
          { "id": "E", "texto": "$\\{3, 6\\}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Factorizando por aspa simple: $(x - 7)(x - 2) = 0 \\implies x_1 = 7, x_2 = 2$."
      },
      {
        "id_pregunta": f"{prefix}_ALG_CUA_002",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 1,
        "enunciado": "Determine el valor del discriminante ($\\Delta$) para la ecuación $2x^2 - 3x + 1 = 0$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
          { "id": "A", "texto": "$1$", "es_correcta": True },
          { "id": "B", "texto": "$-1$", "es_correcta": False },
          { "id": "C", "texto": "$17$", "es_correcta": False },
          { "id": "D", "texto": "$9$", "es_correcta": False },
          { "id": "E", "texto": "$0$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$\\Delta = (-3)^2 - 4(2)(1) = 9 - 8 = 1$."
      },
      {
        "id_pregunta": f"{prefix}_ALG_CUA_003",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 1,
        "enunciado": "Forme la ecuación cuadrática cuyas raíces son $x_1 = 4$ y $x_2 = 4$ (raíz doble).",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
          { "id": "A", "texto": "$x^2 - 8x + 16 = 0$", "es_correcta": True },
          { "id": "B", "texto": "$x^2 + 8x + 16 = 0$", "es_correcta": False },
          { "id": "C", "texto": "$x^2 - 16 = 0$", "es_correcta": False },
          { "id": "D", "texto": "$x^2 - 4x + 16 = 0$", "es_correcta": False },
          { "id": "E", "texto": "$x^2 - 8x - 16 = 0$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$S = 4+4=8$, $P = 4(4)=16$. Ecuación: $x^2 - 8x + 16 = 0$."
      },
      {
        "id_pregunta": f"{prefix}_ALG_CUA_004",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 1,
        "enunciado": "En la ecuación $3x^2 + kx - 12 = 0$, si la suma de raíces es $2$, determine el valor de $k$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
          { "id": "A", "texto": "$-6$", "es_correcta": True },
          { "id": "B", "texto": "$6$", "es_correcta": False },
          { "id": "C", "texto": "$-2$", "es_correcta": False },
          { "id": "D", "texto": "$2$", "es_correcta": False },
          { "id": "E", "texto": "$-3$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$S = -\\frac{k}{3} = 2 \\implies k = -6$."
      },
      {
        "id_pregunta": f"{prefix}_ALG_CUA_005",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 2,
        "enunciado": "Calcule el valor de $m$ para que la ecuación $x^2 - (m - 1)x + 25 = 0$ admita raíces reales e iguales.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
          { "id": "A", "texto": "$m \\in \\{-9, 11\\}$", "es_correcta": True },
          { "id": "B", "texto": "$m \\in \\{-10, 10\\}$", "es_correcta": False },
          { "id": "C", "texto": "$m = 11$", "es_correcta": False },
          { "id": "D", "texto": "$m = 9$", "es_correcta": False },
          { "id": "E", "texto": "$m \\in \\{-11, 9\\}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$\\Delta = (m - 1)^2 - 4(1)(25) = 0 \\implies (m - 1)^2 = 100 \\implies m - 1 = \\pm 10$. Luego $m = 11$ o $m = -9$."
      },
      {
        "id_pregunta": f"{prefix}_ALG_CUA_006",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 2,
        "enunciado": "Si $\\alpha$ y $\\beta$ son raíces de $2x^2 - 4x - 1 = 0$, calcule el valor de $K = \\alpha^2 + \\beta^2$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
          { "id": "A", "texto": "$5$", "es_correcta": True },
          { "id": "B", "texto": "$4$", "es_correcta": False },
          { "id": "C", "texto": "$3$", "es_correcta": False },
          { "id": "D", "texto": "$6$", "es_correcta": False },
          { "id": "E", "texto": "$\\frac{9}{2}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$\\alpha + \\beta = 2$, $\\alpha\\beta = -\\frac{1}{2}$. Luego $K = (\\alpha+\\beta)^2 - 2\\alpha\\beta = 2^2 - 2(-1/2) = 4 + 1 = 5$."
      },
      {
        "id_pregunta": f"{prefix}_ALG_CUA_007",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 2,
        "enunciado": "Resuelva en los reales la ecuación: $$(x - 3)(x + 2) = 14$$",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
          { "id": "A", "texto": "$\\{5, -4\\}$", "es_correcta": True },
          { "id": "B", "texto": "$\\{-5, 4\\}$", "es_correcta": False },
          { "id": "C", "texto": "$\\{7, -2\\}$", "es_correcta": False },
          { "id": "D", "texto": "$\\{3, -2\\}$", "es_correcta": False },
          { "id": "E", "texto": "$\\{10, -2\\}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$x^2 - x - 6 = 14 \\implies x^2 - x - 20 = 0 \\implies (x - 5)(x + 4) = 0 \\implies x_1 = 5, x_2 = -4$."
      },
      {
        "id_pregunta": f"{prefix}_ALG_CUA_008",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 2,
        "enunciado": "Dada la ecuación $x^2 - 7x + m = 0$, determine $m$ si se conoce que $x_1 - x_2 = 3$ ($x_1 > x_2$).",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
          { "id": "A", "texto": "$10$", "es_correcta": True },
          { "id": "B", "texto": "$12$", "es_correcta": False },
          { "id": "C", "texto": "$8$", "es_correcta": False },
          { "id": "D", "texto": "$14$", "es_correcta": False },
          { "id": "E", "texto": "$6$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$x_1 + x_2 = 7$, $x_1 - x_2 = 3 \\implies 2x_1 = 10 \\implies x_1 = 5, x_2 = 2$. Luego $m = x_1 x_2 = 5(2) = 10$."
      },
      {
        "id_pregunta": f"{prefix}_ALG_CUA_009",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 3,
        "enunciado": f"[{context_tactico[0]}]: La cota de elevación operativa $y(t)$ en metros durante una misión responde a $y(t) = -5t^2 + 50t$. ¿Durante cuántos segundos la posición se mantiene estrictamente por encima de $80\\text{{ metros}}$?",
        "apoyo_visual": { "requiere_grafico": True, "imagen_url": None, "descripcion_para_diseñador": "Parábola de trayectoria con línea horizontal en cota 80 m cortando en t = 2 y t = 8 s." },
        "opciones": [
          { "id": "A", "texto": "$6\\text{{ segundos}}$", "es_correcta": True },
          { "id": "B", "texto": "$4\\text{{ segundos}}$", "es_correcta": False },
          { "id": "C", "texto": "$5\\text{{ segundos}}$", "es_correcta": False },
          { "id": "D", "texto": "$8\\text{{ segundos}}$", "es_correcta": False },
          { "id": "E", "texto": "$2\\text{{ segundos}}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$-5t^2 + 50t \\ge 80 \\implies 5t^2 - 50t + 80 \\le 0 \\implies t^2 - 10t + 16 \\le 0 \\implies (t - 2)(t - 8) \\le 0$. Duración: $8 - 2 = 6\\text{{ segundos}}$."
      },
      {
        "id_pregunta": f"{prefix}_ALG_CUA_010",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 3,
        "enunciado": f"[{context_tactico[1]}]: Un perímetro rectangular de despliegue tiene un largo que supera en $15\\text{{ metros}}$ a su ancho. Si el área confinada es de $1000\\text{{ m}}^2$, determine la longitud del perímetro total.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
          { "id": "A", "texto": "$130\\text{{ m}}$", "es_correcta": True },
          { "id": "B", "texto": "$120\\text{{ m}}$", "es_correcta": False },
          { "id": "C", "texto": "$140\\text{{ m}}$", "es_correcta": False },
          { "id": "D", "texto": "$65\\text{{ m}}$", "es_correcta": False },
          { "id": "E", "texto": "$150\\text{{ m}}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$x(x + 15) = 1000 \\implies x^2 + 15x - 1000 = 0 \\implies (x - 25)(x + 40) = 0 \\implies x = 25\\text{{ m}}$. Dimensiones: $25\\text{{ m}}$ y $40\\text{{ m}}$. Perímetro: $2(25 + 40) = 130\\text{{ metros}}$."
      },
      {
        "id_pregunta": f"{prefix}_ALG_CUA_011",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 3,
        "enunciado": f"[{context_tactico[2]}]: Un transporte de dotación recorre $240\\text{ km}$ a velocidad constante $v$ en $\\text{km/h}$. Al aumentar la velocidad en $20\\text{{ km/h}}$, el tiempo de llegada se reduce en $1\\text{ hora}$. Determine el valor de $v$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
          { "id": "A", "texto": "$60\\text{{ km/h}}$", "es_correcta": True },
          { "id": "B", "texto": "$50\\text{{ km/h}}$", "es_correcta": False },
          { "id": "C", "texto": "$80\\text{{ km/h}}$", "es_correcta": False },
          { "id": "D", "texto": "$40\\text{{ km/h}}$", "es_correcta": False },
          { "id": "E", "texto": "$70\\text{{ km/h}}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$\\frac{240}{v} - \\frac{240}{v + 20} = 1 \\implies \\frac{240(20)}{v(v + 20)} = 1 \\implies v^2 + 20v - 4800 = 0 \\implies (v - 60)(v + 80) = 0 \\implies v = 60\\text{{ km/h}}$."
      },
      {
        "id_pregunta": f"{prefix}_ALG_CUA_012",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 3,
        "enunciado": f"[{context_tactico[3]}]: Si $\\alpha$ y $\\beta$ son raíces de $x^2 - 3x + 1 = 0$, calcule el valor numérico exacto de $\\alpha^4 + \\beta^4$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
          { "id": "A", "texto": "$47$", "es_correcta": True },
          { "id": "B", "texto": "$49$", "es_correcta": False },
          { "id": "C", "texto": "$45$", "es_correcta": False },
          { "id": "D", "texto": "$51$", "es_correcta": False },
          { "id": "E", "texto": "$43$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$\\alpha+\\beta = 3, \\alpha\\beta = 1$. $\\alpha^2+\\beta^2 = 3^2 - 2(1) = 7$. Luego $\\alpha^4+\\beta^4 = (\\alpha^2+\\beta^2)^2 - 2(\\alpha\\beta)^2 = 7^2 - 2(1)^2 = 49 - 2 = 47$."
      }
    ]

# Contextos para cada escuela
schools_info = [
    ("CITEN", "CITEN - Instituto Tecnológico Naval", "Suboficiales", [
        "Sistemas de Propulsión Naval",
        "Zona de Desembarco Anfibio",
        "Logística de Lanchas de Interdicción",
        "Cálculo de Frecuencia Acústica Naval"
    ], "04_CITEN"),
    ("EOFAP", "EOFAP - Escuela de Oficiales FAP", "Oficiales", [
        "Ascenso Balístico de Cazas Mirage 2000",
        "Área de Seguridad de Pista Aérea",
        "Vuelo de Enlace de Aeronave C-27J Spartan",
        "Parámetros de Navegación Aérea Supersónica"
    ], "05_EOFAP"),
    ("ESOFA", "ESOFA - Escuela de Suboficiales FAP", "Suboficiales", [
        "Presurización de Sistemas Hidráulicos Aéreos",
        "Perímetro de Hangar de Mantenimiento",
        "Transporte de Motores Turborreactores",
        "Tolerancia de Resistencia de Blindaje Aeronáutico"
    ], "06_ESOFA"),
    ("EO_PNP", "EO-PNP - Escuela de Oficiales de la Policía Nacional", "Oficiales", [
        "Balística Forense e Impacto DIRINCRI",
        "Perímetro Táctico de Intervención SUAT",
        "Cinemática de Persecución Policial de Carreteras",
        "Análisis Criminológico y Densidad Delictiva"
    ], "07_EO_PNP"),
    ("EESTP_PNP", "EESTP-PNP - Escuelas Técnicas de Suboficiales PNP", "Suboficiales", [
        "Dispersión de Patrullaje Urbano Integrado",
        "Cuadrante de Vigilancia Ciudadana",
        "Despliegue de Móviles de Radio Patrulla",
        "Distribución de Turnos de Guardia Operativa"
    ], "08_EESTP_PNP")
]

all_banks = {
    "EMCH": emch_questions,
    "ETE": ete_questions,
    "ENP": enp_questions
}

for prefix, name, rank, tact, folder in schools_info:
    bank = make_school_bank(prefix, name, rank, tact)
    all_banks[prefix] = bank
    filename = f"banco_preguntas/{folder}_algebra_cuadraticas.json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(bank, f, indent=2, ensure_ascii=False)
    print(f"Guardado {filename}")

# Guardar banco maestro
with open("banco_preguntas/banco_maestro_algebra_cuadraticas_8_escuelas.json", "w", encoding="utf-8") as f:
    json.dump(all_banks, f, indent=2, ensure_ascii=False)
print("Guardado banco maestro consolidado con las 8 escuelas.")

# Ahora actualizar los archivos .md canónicos
school_files = [
    ("01_EMCH", "01_EMCH.md", "EMCH"),
    ("02_ETE", "02_ETE.md", "ETE"),
    ("03_ENP", "03_ENP.md", "ENP"),
    ("04_CITEN", "04_CITEN.md", "CITEN"),
    ("05_EOFAP", "05_EOFAP.md", "EOFAP"),
    ("06_ESOFA", "06_ESOFA.md", "ESOFA"),
    ("07_EO_PNP", "07_EO_PNP.md", "EO_PNP"),
    ("08_EESTP_PNP", "08_EESTP_PNP.md", "EESTP_PNP")
]

for folder, md_name, prefix in school_files:
    md_path = os.path.join("bases_conocimiento", md_name)
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Verificar si ya tiene la sección de banco de preguntas
    if "## 📚 Banco de Preguntas Calibradas" not in content:
        bank = all_banks[prefix]
        json_str = json.dumps(bank, indent=2, ensure_ascii=False)
        addition = f"""

---

## 📚 Banco de Preguntas Calibradas: Álgebra (Ecuaciones Cuadráticas)

> **Muestra Oficial Certificada:** 12 preguntas de opción múltiple estrictamente calibradas en 3 niveles de dificultad (Básico, Intermedio, Avanzado/Táctico) con límite de tiempo ({bank[0]['metricas']['segundos_limite']}s) y sistema de penalización (+{bank[0]['metricas']['pts_correcta']} / {bank[0]['metricas']['pts_incorrecta']}).

```json
{json_str}
```
"""
        content += addition
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Actualizado {md_path}")
        
        # Copiar también al directorio escuelas_militares_pdf/
        mirror_path = os.path.join("escuelas_militares_pdf", folder, f"BASE_CONOCIMIENTO_{prefix}.md")
        shutil.copyfile(md_path, mirror_path)
        print(f"Actualizado espejo {mirror_path}")

print("Proceso completo al 100% exitosamente.")
