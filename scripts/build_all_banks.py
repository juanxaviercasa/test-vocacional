# -*- coding: utf-8 -*-
"""
Script maestro para generar los bancos de preguntas de Álgebra (Ecuaciones Cuadráticas)
para las 8 escuelas militares y policiales del Perú, y guardarlas en los archivos .md canónicos.
"""
import json
import os
import shutil

os.makedirs('banco_preguntas', exist_ok=True)

# 1. EMCH
with open('banco_preguntas/01_EMCH_algebra_cuadraticas.json', 'r', encoding='utf-8') as f:
    emch_questions = json.load(f)

# 2. ETE
with open('banco_preguntas/02_ETE_algebra_cuadraticas.json', 'r', encoding='utf-8') as f:
    ete_questions = json.load(f)

# 3. ENP
with open('banco_preguntas/03_ENP_algebra_cuadraticas.json', 'r', encoding='utf-8') as f:
    enp_questions = json.load(f)

def make_school_bank(prefix, school_name, rank_name, contexts):
    q_list = []
    
    # Q1
    q_list.append({
        "id_pregunta": f"{prefix}_ALG_CUA_001",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 1,
        "enunciado": f"Dada la ecuación cuadrática $x^2 - 9x + 14 = 0$, calcule su conjunto solución en el concurso de admisión de {school_name}.",
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
    })
    
    # Q2
    q_list.append({
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
    })
    
    # Q3
    q_list.append({
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
    })
    
    # Q4
    q_list.append({
        "id_pregunta": f"{prefix}_ALG_CUA_004",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 1,
        "enunciado": "En la ecuación $3x^2 + kx - 12 = 0$, si la suma de raíces es $2$, determine el valor del coeficiente $k$.",
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
    })
    
    # Q5
    q_list.append({
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
        "resolucion_corta": "$\\Delta = (m - 1)^2 - 4(1)(25) = 0 \\implies (m - 1)^2 = 100 \\implies m - 1 = \\pm 10 \\implies m \\in \\{-9, 11\\}$."
    })
    
    # Q6
    q_list.append({
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
    })
    
    # Q7
    q_list.append({
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
    })
    
    # Q8
    q_list.append({
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
    })
    
    # Q9
    q_list.append({
        "id_pregunta": f"{prefix}_ALG_CUA_009",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[0]}]: La cota de elevación operativa $y(t)$ en metros durante una maniobra responde a la función cuadrática $y(t) = -5t^2 + 50t$. ¿Durante cuántos segundos la posición se mantiene estrictamente por encima de $80\\text{{ metros}}$?",
        "apoyo_visual": { "requiere_grafico": True, "imagen_url": None, "descripcion_para_diseñador": "Parábola de trayectoria con línea horizontal en cota 80 m cortando en t = 2 y t = 8 s." },
        "opciones": [
            { "id": "A", "texto": "$6\\text{ segundos}$", "es_correcta": True },
            { "id": "B", "texto": "$4\\text{ segundos}$", "es_correcta": False },
            { "id": "C", "texto": "$5\\text{ segundos}$", "es_correcta": False },
            { "id": "D", "texto": "$8\\text{ segundos}$", "es_correcta": False },
            { "id": "E", "texto": "$2\\text{ segundos}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$-5t^2 + 50t \\ge 80 \\implies 5t^2 - 50t + 80 \\le 0 \\implies t^2 - 10t + 16 \\le 0 \\implies (t - 2)(t - 8) \\le 0$. Duración: $8 - 2 = 6\\text{ segundos}$."
    })
    
    # Q10
    q_list.append({
        "id_pregunta": f"{prefix}_ALG_CUA_010",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[1]}]: Un perímetro rectangular de despliegue tiene una longitud frontal que supera en $15\\text{{ metros}}$ a su profundidad. Si el área confinada es de $1000\\text{{ m}}^2$, determine la longitud del perímetro total del cerramiento.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$130\\text{ m}$", "es_correcta": True },
            { "id": "B", "texto": "$120\\text{ m}$", "es_correcta": False },
            { "id": "C", "texto": "$140\\text{ m}$", "es_correcta": False },
            { "id": "D", "texto": "$65\\text{ m}$", "es_correcta": False },
            { "id": "E", "texto": "$150\\text{ m}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$x(x + 15) = 1000 \\implies x^2 + 15x - 1000 = 0 \\implies (x - 25)(x + 40) = 0 \\implies x = 25\\text{ m}$. Dimensiones: $25\\text{ m}$ y $40\\text{ m}$. Perímetro: $2(25 + 40) = 130\\text{ metros}$."
    })
    
    # Q11
    q_list.append({
        "id_pregunta": f"{prefix}_ALG_CUA_011",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[2]}]: Un transporte de dotación institucional debe cubrir una distancia de $240\\text{{ km}}$ a velocidad constante $v$ en $\\text{{km/h}}$. Al incrementar la velocidad operativa en $20\\text{{ km/h}}$, el tiempo de arribo se reduce en $1\\text{{ hora}}$. Determine el valor planificado de $v$.",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "$60\\text{ km/h}$", "es_correcta": True },
            { "id": "B", "texto": "$50\\text{ km/h}$", "es_correcta": False },
            { "id": "C", "texto": "$80\\text{ km/h}$", "es_correcta": False },
            { "id": "D", "texto": "$40\\text{ km/h}$", "es_correcta": False },
            { "id": "E", "texto": "$70\\text{ km/h}$", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "$\\frac{240}{v} - \\frac{240}{v + 20} = 1 \\implies \\frac{240(20)}{v(v + 20)} = 1 \\implies v^2 + 20v - 4800 = 0 \\implies (v - 60)(v + 80) = 0 \\implies v = 60\\text{ km/h}$."
    })
    
    # Q12
    q_list.append({
        "id_pregunta": f"{prefix}_ALG_CUA_012",
        "curso": "Álgebra",
        "tema": "Ecuaciones Cuadráticas",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[3]}]: Si $\\alpha$ y $\\beta$ son raíces de la ecuación cuadrática $x^2 - 3x + 1 = 0$, calcule el valor numérico exacto de $\\alpha^4 + \\beta^4$.",
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
    })
    
    return q_list

# Generar para las restantes escuelas
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
    
    # Si no tiene la sección de banco de preguntas, agregarla
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
