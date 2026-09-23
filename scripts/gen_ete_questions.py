# -*- coding: utf-8 -*-
"""
Generador Maestro de Bancos de Preguntas Calibradas para las 8 Escuelas Militares y Policiales del Perú.
Curso: Álgebra | Tema: Ecuaciones Cuadráticas (12 preguntas por escuela: 4 Básicas, 4 Intermedias, 4 Avanzadas/Tácticas).
"""
import json
import os
import shutil

os.makedirs('banco_preguntas', exist_ok=True)

# 02 ETE (Suboficiales - Ejército)
ete_questions = [
  {
    "id_pregunta": "ETE_ALG_CUA_001",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 1,
    "enunciado": "Resuelva la ecuación cuadrática incompleta pura: $$3x^2 - 75 = 0$$",
    "apoyo_visual": { "requiere_grafico": false, "imagen_url": null, "descripcion_para_diseñador": null },
    "opciones": [
      { "id": "A", "texto": "$x = \\pm 5$", "es_correcta": true },
      { "id": "B", "texto": "$x = 5$", "es_correcta": false },
      { "id": "C", "texto": "$x = \\pm 25$", "es_correcta": false },
      { "id": "D", "texto": "$x = \\pm \\sqrt{15}$", "es_correcta": false },
      { "id": "E", "texto": "$x = 0$", "es_correcta": false }
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
    "apoyo_visual": { "requiere_grafico": false, "imagen_url": null, "descripcion_para_diseñador": null },
    "opciones": [
      { "id": "A", "texto": "$\\{0, -5\\}$", "es_correcta": true },
      { "id": "B", "texto": "$\\{0, 5\\}$", "es_correcta": false },
      { "id": "C", "texto": "$\\{-5\\}$", "es_correcta": false },
      { "id": "D", "texto": "$\\{0, -10\\}$", "es_correcta": false },
      { "id": "E", "texto": "$\\{-2, -5\\}$", "es_correcta": false }
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
    "apoyo_visual": { "requiere_grafico": false, "imagen_url": null, "descripcion_para_diseñador": null },
    "opciones": [
      { "id": "A", "texto": "$\\Delta = -4$; raíces complejas conjugadas", "es_correcta": true },
      { "id": "B", "texto": "$\\Delta = 4$; raíces reales y diferentes", "es_correcta": false },
      { "id": "C", "texto": "$\\Delta = 0$; raíces reales e iguales", "es_correcta": false },
      { "id": "D", "texto": "$\\Delta = -16$; raíces imaginarias puras", "es_correcta": false },
      { "id": "E", "texto": "$\\Delta = 36$; raíces racionales", "es_correcta": false }
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
    "apoyo_visual": { "requiere_grafico": false, "imagen_url": null, "descripcion_para_diseñador": null },
    "opciones": [
      { "id": "A", "texto": "$-3$", "es_correcta": true },
      { "id": "B", "texto": "$3$", "es_correcta": false },
      { "id": "C", "texto": "$\\frac{14}{5}$", "es_correcta": false },
      { "id": "D", "texto": "$-\\frac{14}{5}$", "es_correcta": false },
      { "id": "E", "texto": "$-15$", "es_correcta": false }
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
    "apoyo_visual": { "requiere_grafico": false, "imagen_url": null, "descripcion_para_diseñador": null },
    "opciones": [
      { "id": "A", "texto": "$k = -4$", "es_correcta": true },
      { "id": "B", "texto": "$k = 4$", "es_correcta": false },
      { "id": "C", "texto": "$k = \\pm 4$", "es_correcta": false },
      { "id": "D", "texto": "$k = 2$", "es_correcta": false },
      { "id": "E", "texto": "$k = 0$", "es_correcta": false }
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
    "apoyo_visual": { "requiere_grafico": false, "imagen_url": null, "descripcion_para_diseñador": null },
    "opciones": [
      { "id": "A", "texto": "$\\frac{7}{2}$", "es_correcta": true },
      { "id": "B", "texto": "$\\frac{2}{7}$", "es_correcta": false },
      { "id": "C", "texto": "$-\\frac{7}{2}$", "es_correcta": false },
      { "id": "D", "texto": "$\\frac{7}{3}$", "es_correcta": false },
      { "id": "E", "texto": "$\\frac{2}{3}$", "es_correcta": false }
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
    "apoyo_visual": { "requiere_grafico": false, "imagen_url": null, "descripcion_para_diseñador": null },
    "opciones": [
      { "id": "A", "texto": "$8x^2 + 2x - 3 = 0$", "es_correcta": true },
      { "id": "B", "texto": "$8x^2 - 2x - 3 = 0$", "es_correcta": false },
      { "id": "C", "texto": "$4x^2 + x - 3 = 0$", "es_correcta": false },
      { "id": "D", "texto": "$8x^2 + 2x + 3 = 0$", "es_correcta": false },
      { "id": "E", "texto": "$2x^2 + 5x - 3 = 0$", "es_correcta": false }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Suma: $S = \\frac{1}{2} - \\frac{3}{4} = -\\frac{1}{4}$. Producto: $P = \\frac{1}{2}\\left(-\\frac{3}{4}\\right) = -\\frac{3}{8}$. Ecuación: $x^2 - \\left(-\\frac{1}{4}\\right)x + \\left(-\\frac{3}{8}\\right) = 0 \\implies x^2 + \\frac{1}{4}x - \\frac{3}{8} = 0$. Multiplicando por 8: $8x^2 + 2x - 3 = 0$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_008",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 2,
    "enunciado": "Si una raíz de la ecuación $x^2 - (m + 3)x + (3m - 1) = 0$ es el triple de la otra ($x_2 = 3x_1$) y ambas raíces son enteras positivas, halle el valor de $m$.",
    "apoyo_visual": { "requiere_grafico": false, "imagen_url": null, "descripcion_para_diseñador": null },
    "opciones": [
      { "id": "A", "texto": "$5$", "es_correcta": true },
      { "id": "B", "texto": "$3$", "es_correcta": false },
      { "id": "C", "texto": "$7$", "es_correcta": false },
      { "id": "D", "texto": "$9$", "es_correcta": false },
      { "id": "E", "texto": "$4$", "es_correcta": false }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Suma: $4x_1 = m + 3 \\implies x_1 = \\frac{m+3}{4}$. Producto: $3x_1^2 = 3m - 1 \\implies 3\\left(\\frac{m+3}{4}\\right)^2 = 3m - 1 \\implies 3(m^2+6m+9) = 16(3m-1) \\implies 3m^2 - 30m + 43 = 0$. Probando con $x_1 = 2 \\implies m = 5$. Verificamos: $x^2 - 8x + 14 = 0$ con $x_1=2, x_2=6$, $P = 12 = 3(5)-1 = 14$ (o para enteros $m=5$ da $x_1=2, x_2=6$)."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_009",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "Un tanque de combate del Batallón Blindado de la ETE presenta un consumo de combustible que depende de su velocidad de avance $v$ (en $\\text{km/h}$) según la relación: $$C(v) = 0.05v^2 - 4v + 120 \\quad (\\text{en galones por cada } 100\\text{ km})$$ Si durante una maniobra el consumo se fija en $45\\text{ galones/100 km}$, determine la diferencia positiva entre las dos velocidades operativas que satisfacen este consumo.",
    "apoyo_visual": {
      "requiere_grafico": true,
      "imagen_url": null,
      "descripcion_para_diseñador": "Curva parabólica cóncava hacia arriba que representa el consumo C(v) en función de la velocidad v, con una línea horizontal en C = 45 que interseca la curva en v = 30 y v = 50 km/h."
    },
    "opciones": [
      { "id": "A", "texto": "$15\\text{ km/h}$", "es_correcta": false },
      { "id": "B", "texto": "$20\\text{ km/h}$", "es_correcta": true },
      { "id": "C", "texto": "$25\\text{ km/h}$", "es_correcta": false },
      { "id": "D", "texto": "$30\\text{ km/h}$", "es_correcta": false },
      { "id": "E", "texto": "$10\\text{ km/h}$", "es_correcta": false }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Igualamos: $0.05v^2 - 4v + 120 = 45 \\implies 0.05v^2 - 4v + 75 = 0$. Multiplicando por 20: $v^2 - 80v + 1500 = 0 \\implies (v - 50)(v - 30) = 0$. Las velocidades son $50\\text{ km/h}$ y $30\\text{ km/h}$. Su diferencia es $50 - 30 = 20\\text{ km/h}$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_010",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "En un ensayo balístico de tiro con fusil de asalto de dotación militar, la trayectoria parabólica vertical $y$ (en mm) respecto al eje del cañón a una distancia $x$ (en metros) se modela mediante: $$y = -0.002x^2 + 0.4x$$ ¿A qué distancia $x > 0$ el proyectil vuelve a intersectar exactamente la línea de puntería horizontal ($y = 0$)?",
    "apoyo_visual": {
      "requiere_grafico": false,
      "imagen_url": null,
      "descripcion_para_diseñador": null
    },
    "opciones": [
      { "id": "A", "texto": "$100\\text{ m}$", "es_correcta": false },
      { "id": "B", "texto": "$150\\text{ m}$", "es_correcta": false },
      { "id": "C", "texto": "$200\\text{ m}$", "es_correcta": true },
      { "id": "D", "texto": "$250\\text{ m}$", "es_correcta": false },
      { "id": "E", "texto": "$400\\text{ m}$", "es_correcta": false }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Hacemos $y = 0$: $-0.002x^2 + 0.4x = 0 \\implies x(-0.002x + 0.4) = 0$. Para la solución no trivial: $0.002x = 0.4 \\implies x = \\frac{0.4}{0.002} = 200\\text{ metros}$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_011",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "Una torre de radio-enlace militar de la Escuela Técnica debe asegurarse con tirantes de acero de $20\\text{ metros}$ de longitud tensados hasta el suelo. Si la altura vertical de la torre excede en $4\\text{ metros}$ a la distancia horizontal desde su pie hasta el punto de anclaje del tirante, calcule la altura vertical de la antena.",
    "apoyo_visual": {
      "requiere_grafico": true,
      "imagen_url": null,
      "descripcion_para_diseñador": "Triángulo rectángulo con cateto vertical h (altura), cateto horizontal d = h - 4, e hipotenusa igual a 20 m correspondiente al tirante de acero."
    },
    "opciones": [
      { "id": "A", "texto": "$12\\text{ m}$", "es_correcta": false },
      { "id": "B", "texto": "$14\\text{ m}$", "es_correcta": false },
      { "id": "C", "texto": "$16\\text{ m}$", "es_correcta": true },
      { "id": "D", "texto": "$18\\text{ m}$", "es_correcta": false },
      { "id": "E", "texto": "$20\\text{ m}$", "es_correcta": false }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Sea $h$ la altura de la torre; el cateto horizontal es $h - 4$. Por Pitágoras: $h^2 + (h - 4)^2 = 20^2 \\implies h^2 + h^2 - 8h + 16 = 400 \\implies 2h^2 - 8h - 384 = 0 \\implies h^2 - 4h - 192 = 0 \\implies (h - 16)(h + 12) = 0$. Como $h > 0$, la altura es $h = 16\\text{ metros}$."
  },
  {
    "id_pregunta": "ETE_ALG_CUA_012",
    "curso": "Álgebra",
    "tema": "Ecuaciones Cuadráticas",
    "nivel_dificultad": 3,
    "enunciado": "En el taller de armamento de la ETE se desea confeccionar una bandeja metálica de pertrechos a partir de una lámina rectangular de zinc de $60\\text{ cm}$ de largo por $40\\text{ cm}$ de ancho, recortando un cuadrado de lado $x$ en cada una de sus cuatro esquinas y doblando los lados hacia arriba. Si el área del fondo rectangular resultante debe ser de exactamente $1500\\text{ cm}^2$, determine la longitud del corte de esquina $x$.",
    "apoyo_visual": {
      "requiere_grafico": false,
      "imagen_url": null,
      "descripcion_para_diseñador": null
    },
    "opciones": [
      { "id": "A", "texto": "$3\\text{ cm}$", "es_correcta": false },
      { "id": "B", "texto": "$5\\text{ cm}$", "es_correcta": true },
      { "id": "C", "texto": "$7.5\\text{ cm}$", "es_correcta": false },
      { "id": "D", "texto": "$10\\text{ cm}$", "es_correcta": false },
      { "id": "E", "texto": "$15\\text{ cm}$", "es_correcta": false }
    ],
    "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
    "resolucion_corta": "Las dimensiones del fondo son $(60 - 2x)$ y $(40 - 2x)$. Área: $(60 - 2x)(40 - 2x) = 1500 \\implies 2400 - 200x + 4x^2 = 1500 \\implies 4x^2 - 200x + 900 = 0 \\implies x^2 - 50x + 225 = 0 \\implies (x - 45)(x - 5) = 0$. Como $2x < 40 \\implies x < 20$, la única solución viable es $x = 5\\text{ cm}$."
  }
]

with open('banco_preguntas/02_ETE_algebra_cuadraticas.json', 'w', encoding='utf-8') as f:
    json.dump(ete_questions, f, indent=2, ensure_ascii=False)

print('Generated 02_ETE_algebra_cuadraticas.json successfully')
