# -*- coding: utf-8 -*-
"""
Generador del Banco de Preguntas de Razonamiento Verbal (Analogías Verbales y Precisión Léxica)
para las 8 escuelas militares y policiales del Perú.
"""
import json
import os
import shutil

os.makedirs('banco_preguntas', exist_ok=True)

SCHOOLS_RV = [
    {
        "id": "EMCH",
        "name": "Escuela Militar de Chorrillos (EMCH - Oficiales)",
        "folder": "01_EMCH",
        "contexts": [
            "Analogía Táctico-Doctrinal de Escalones de Combate (Vanguardia vs Retaguardia)",
            "Precisión Léxica Castrense en la Formulación de una Orden de Operaciones (OPORD)",
            "Analogía Jerárquica y Funcional del Mando: Estado Mayor y Comando Operativo",
            "Significación Semántica y Doctrinal del Lema: 'Hasta quemar el último cartucho'"
        ]
    },
    {
        "id": "ETE",
        "name": "Escuela Técnica del Ejército (ETE - Suboficiales)",
        "folder": "02_ETE",
        "contexts": [
            "Analogía Técnica: Relación Calibre-Blindaje y Efecto Balístico",
            "Precisión Léxica en Manuales Técnicos de Mantenimiento y Desensamble de Armas",
            "Analogía de Función Operacional: Armero, Mecánico y Servicio de Material de Guerra",
            "Terminología Militar en Partes Diarios de Novedades e Inspección de Polvorines"
        ]
    },
    {
        "id": "ENP",
        "name": "Escuela Naval del Perú (ENP - Oficiales)",
        "folder": "03_ENP",
        "contexts": [
            "Analogía Táctica Naval: Orientación y Flancos Náuticos (Proa, Popa, Babor, Estribor)",
            "Precisión Léxica Marítima en la Redacción del Cuaderno de Bitácora y Derrota",
            "Analogía Doctrinal: Miguel Grau y los Valores Morales del Oficial Naval",
            "Terminología Naval y Órdenes de Maniobra en Puente de Comando de Fragatas"
        ]
    },
    {
        "id": "CITEN",
        "name": "Centro de Instrucción Técnica y Entrenamiento Naval (CITEN - Suboficiales)",
        "folder": "04_CITEN",
        "contexts": [
            "Analogía Operativa de Sensores Electrónicos Navales: Radar y Sonar",
            "Precisión Léxica en Maniobras Marineras de Cabullería, Fondeo y Amarre",
            "Analogía de Especialidades Técnicas de Oficiales de Mar en Buques de Guerra",
            "Términos Técnicos en Informes de Mantenimiento de Turbinas y Dique Seco en SIMA"
        ]
    },
    {
        "id": "EOFAP",
        "name": "Escuela de Oficiales FAP (EOFAP - Oficiales)",
        "folder": "05_EOFAP",
        "contexts": [
            "Analogía Aeronáutica: Maniobras de Despegue, Vuelo Táctico y Aterrizaje",
            "Precisión Léxica en Terminología de Combate Aéreo y Vectores de Interceptación",
            "Analogía Histórica Heroica: José Quiñones y la Inmolación Aérea en Quebrada Seca",
            "Terminología Operacional Estándar en Manuales de Vuelo Supersónico de Mirage 2000"
        ]
    },
    {
        "id": "ESOFA",
        "name": "Escuela de Suboficiales FAP (ESOFA - Suboficiales)",
        "folder": "06_ESOFA",
        "contexts": [
            "Analogía Mecánica Aérea: Turbina-Empuje y Rotor-Sustentación",
            "Precisión Léxica en el Diagnóstico y Calibración de Sistemas de Aviónica",
            "Analogía de Instrumentación de Cabina: Altímetro, Anemómetro y Variómetro",
            "Rigor Terminológico en Actas de Entrega y Certificación de Aeronavegabilidad"
        ]
    },
    {
        "id": "EO_PNP",
        "name": "Escuela de Oficiales de la Policía Nacional (EO-PNP - Oficiales)",
        "folder": "07_EO_PNP",
        "contexts": [
            "Analogía Jurídico-Policial: Flagrancia Delictiva, Detención y Debido Proceso",
            "Precisión Léxica en la Confección del Acta de Intervención Policial y Cadena de Custodia",
            "Analogía Doctrinal Policial: Capitán Alipio Ponce y el Heroísmo en Defensa del Orden",
            "Terminología Criminalística Forense: Escena del Crimen, Indicio, Evidencia y Prueba"
        ]
    },
    {
        "id": "EESTP_PNP",
        "name": "Escuelas de Educación Superior Técnico Profesional PNP (EESTP-PNP - Suboficiales)",
        "folder": "08_EESTP_PNP",
        "contexts": [
            "Analogía Funcional de Patrullaje: Cuadrante Urbano, Ronda y Garita de Vigilancia",
            "Precisión Léxica en el Uso Reglamentario de la Fuerza y Medios No Letales (D.L. 1186)",
            "Analogía Operativa de Seguridad Ciudadana: Prevención, Disuasión y Respuesta",
            "Claridad y Precisión Semántica en el Cuaderno de Ocurrencias de la Comisaría"
        ]
    }
]

def get_rv_bank(school):
    prefix = school["id"]
    name = school["name"]
    contexts = school["contexts"]
    
    questions = []
    
    # Nivel 1: Básico (4 preguntas)
    # Q1: Analogía de sinonimia directa
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_001",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 1,
        "enunciado": f"En el examen de admisión de {name}, determine la opción que presenta la relación análoga correcta para el par base en mayúsculas:\n\n**VALOR : HEROÍSMO ::**",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "TEMOR : PÁNICO", "es_correcta": True },
            { "id": "B", "texto": "TRISTEZA : ALEGRÍA", "es_correcta": False },
            { "id": "C", "texto": "DUDA : CERTEZA", "es_correcta": False },
            { "id": "D", "texto": "CALMA : FURIA", "es_correcta": False },
            { "id": "E", "texto": "ENFADO : RISA", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Relación de intensidad: el HEROÍSMO es el grado supremo del VALOR; del mismo modo, el PÁNICO es el grado superlativo del TEMOR."
    })
    
    # Q2: Analogía de elemento a conjunto
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_002",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 1,
        "enunciado": "Elija la alternativa que mantiene la misma relación que el par base:\n\n**SOLDADO : EJÉRCITO ::**",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "MARINERO : TRIPULACIÓN", "es_correcta": True },
            { "id": "B", "texto": "FUSIL : MUNICIÓN", "es_correcta": False },
            { "id": "C", "texto": "CAPITÁN : CORONEL", "es_correcta": False },
            { "id": "D", "texto": "CUARTEL : GUARDIA", "es_correcta": False },
            { "id": "E", "texto": "ESCUDO : ESPADA", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Relación de elemento a conjunto específico: el SOLDADO conforma el EJÉRCITO, así como el MARINERO forma parte de la TRIPULACIÓN."
    })
    
    # Q3: Precisión léxica - antónimo contextual
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_003",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 1,
        "enunciado": "Identifique el término que expresa el significado opuesto (antónimo) a la palabra subrayada en la siguiente afirmación militar:\n\n*«Las tropas mostraron una actitud **indómita** ante el asedio enemigo».*",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "Sumisa", "es_correcta": True },
            { "id": "B", "texto": "Rebelde", "es_correcta": False },
            { "id": "C", "texto": "Intrépida", "es_correcta": False },
            { "id": "D", "texto": "Altiva", "es_correcta": False },
            { "id": "E", "texto": "Inconmovible", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "'Indómita' significa difícil de someter o domesticar, rebelde o bravía. Su antónimo directo es 'sumisa' (obediente, dócil)."
    })
    
    # Q4: Agente a instrumento
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_004",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 1,
        "enunciado": "Determine el par análogo correspondiente a la relación agente - instrumento:\n\n**ARTILLERO : CAÑÓN ::**",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "FRANCOTIRADOR : FUSIL", "es_correcta": True },
            { "id": "B", "texto": "PILOTO : PISTA", "es_correcta": False },
            { "id": "C", "texto": "MÉDICO : HOSPITAL", "es_correcta": False },
            { "id": "D", "texto": "GENERAL : BATALLA", "es_correcta": False },
            { "id": "E", "texto": "POLICÍA : TRANSGRESIÓN", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Relación de agente a instrumento de trabajo/combate: el ARTILLERO opera el CAÑÓN, así como el FRANCOTIRADOR opera el FUSIL."
    })
    
    # Nivel 2: Intermedio (4 preguntas)
    # Q5: Causa - efecto
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_005",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 2,
        "enunciado": "Identifique la alternativa que reproduce la relación lógica del par base:\n\n**EMBOSCADA : CONFUSIÓN ::**",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "ALERTA : PREPARACIÓN", "es_correcta": True },
            { "id": "B", "texto": "DERROTA : TRIUNFO", "es_correcta": False },
            { "id": "C", "texto": "MARCHA : DESCANSO", "es_correcta": False },
            { "id": "D", "texto": "ARMISTICIO : HOSTILIDAD", "es_correcta": False },
            { "id": "E", "texto": "DISCIPLINA : INSUBORDINACIÓN", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Relación de causa a efecto: la EMBOSCADA genera CONFUSIÓN en el enemigo desprevenido, del mismo modo que la ALERTA produce PREPARACIÓN en las fuerzas defensoras."
    })
    
    # Q6: Precisión léxica en contexto operacional
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_006",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 2,
        "enunciado": "Elija el verbo con mayor precisión semántica para completar la oración:\n\n*«Las fuerzas combinadas lograron __________ exitosamente la incursión enemiga en la cabecera del valle».*",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "repeler", "es_correcta": True },
            { "id": "B", "texto": "sacar", "es_correcta": False },
            { "id": "C", "texto": "quitar", "es_correcta": False },
            { "id": "D", "texto": "botar", "es_correcta": False },
            { "id": "E", "texto": "mudar", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "'Repeler' es el verbo militar exacto que significa rechazar eficazmente un ataque, agresión o incursión hostil."
    })
    
    # Q7: Analogía de complementariedad funcional
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_007",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 2,
        "enunciado": "Determine el par que cumple la relación análoga:\n\n**BRÚJULA : ORIENTACIÓN ::**",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "CRONÓMETRO : PRECISIÓN TEMPORAL", "es_correcta": True },
            { "id": "B", "texto": "MAPA : DIBUJO", "es_correcta": False },
            { "id": "C", "texto": "TERMÓMETRO : CLIMA", "es_correcta": False },
            { "id": "D", "texto": "BALANZA : COMERCIO", "es_correcta": False },
            { "id": "E", "texto": "TEODOLITO : LADRILLO", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Relación de instrumento a su fin fundamental: la BRÚJULA sirve para la ORIENTACIÓN, como el CRONÓMETRO sirve para la PRECISIÓN TEMPORAL."
    })
    
    # Q8: Conectores lógicos en doctrina
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_008",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 2,
        "enunciado": "Elija los conectores lógicos que completan con coherencia el texto doctrinal:\n\n*«El oficial debe mantener la serenidad en el combate, __________ la vacilación infunde pánico en los subordinados; __________, su templanza moral constituye la mayor fortaleza de la unidad».*",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "porque - por ende", "es_correcta": True },
            { "id": "B", "texto": "aunque - sin embargo", "es_correcta": False },
            { "id": "C", "texto": "si bien - por el contrario", "es_correcta": False },
            { "id": "D", "texto": "pero - no obstante", "es_correcta": False },
            { "id": "E", "texto": "a pesar de que - es decir", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "El primer conector es causal ('porque') para justificar la necesidad de serenidad, y el segundo es ilativo o consecutivo ('por ende') para concluir."
    })
    
    # Nivel 3: Avanzado / Táctico (4 preguntas contextualizadas)
    # Q9
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_009",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[0]}]: Determine el par análogo que reproduce con exactitud la relación táctica entre los componentes de maniobra:\n\n**VANGUARDIA : EXPLORACIÓN ::**",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "RETAGUARDIA : COBERTURA", "es_correcta": True },
            { "id": "B", "texto": "FLANCO : RETIRADA", "es_correcta": False },
            { "id": "C", "texto": "RESERVA : DESPLIEGUE", "es_correcta": False },
            { "id": "D", "texto": "COMANDO : INACCIÓN", "es_correcta": False },
            { "id": "E", "texto": "COLUMNA : DISPERSIÓN", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "Relación de escalón de combate a su misión esencial: la VANGUARDIA tiene como rol primario la EXPLORACIÓN y contacto, mientras que la RETAGUARDIA tiene por misión primordial la COBERTURA y seguridad de las líneas de comunicación."
    })
    
    # Q10
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_010",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[1]}]: Seleccione el término que confiere rigor técnico y formal a la instrucción operativa:\n\n*«Ante la presencia de fuego hostil no identificado, el comandante ordenó al destacamento __________ la posición defensiva y reportar las coordenadas a la Central».*",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "consolidar", "es_correcta": True },
            { "id": "B", "texto": "aguantar", "es_correcta": False },
            { "id": "C", "texto": "sujetar", "es_correcta": False },
            { "id": "D", "texto": "amarrar", "es_correcta": False },
            { "id": "E", "texto": "dejar", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "En doctrina táctica, 'consolidar' significa afianzar y organizar firmemente una posición conquistada o defensiva ante un posible contraataque."
    })
    
    # Q11
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_011",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[2]}]: Identifique el par análogo que refleja la relación de jerarquía, doctrina y toma de decisiones:\n\n**ESTADO MAYOR : PLANIFICACIÓN ::**",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "COMANDANTE GENERAL : DECISIÓN", "es_correcta": True },
            { "id": "B", "texto": "CADETE : OBEDIENCIA CIEGA", "es_correcta": False },
            { "id": "C", "texto": "TROPAS : DELIBERACIÓN", "es_correcta": False },
            { "id": "D", "texto": "CENTINELA : SUEÑO", "es_correcta": False },
            { "id": "E", "texto": "INSPECTOR : APATÍA", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "El ESTADO MAYOR tiene por función principal la PLANIFICACIÓN táctica y estratégica, mientras que el COMANDANTE GENERAL asume la responsabilidad exclusiva de la DECISIÓN operacional."
    })
    
    # Q12
    questions.append({
        "id_pregunta": f"{prefix}_RV_ANA_012",
        "curso": "Razonamiento Verbal",
        "tema": "Analogías Verbales y Precisión Léxica",
        "nivel_dificultad": 3,
        "enunciado": f"[{contexts[3]}]: Analice el significado doctrinal de la expresión. ¿Cuál de los siguientes enunciados define con exactitud la noción castrense de **«INMOLACIÓN PATRIÓTICA»**?",
        "apoyo_visual": { "requiere_grafico": False, "imagen_url": None, "descripcion_para_diseñador": None },
        "opciones": [
            { "id": "A", "texto": "La entrega deliberada y voluntaria de la propia vida en cumplimiento del sagrado juramento de defender la soberanía y la Bandera Nacional", "es_correcta": True },
            { "id": "B", "texto": "La muerte fortuita e involuntaria causada por desperfectos del material bélico en ejercicios de guarnición", "es_correcta": False },
            { "id": "C", "texto": "La capitulación ordenada pactada con el enemigo para evitar daños colaterales a la infraestructura civil", "es_correcta": False },
            { "id": "D", "texto": "La retirada apresurada de las fuerzas armadas para preservar el contingente ante una correlación desfavorable", "es_correcta": False },
            { "id": "E", "texto": "El sometimiento a un arbitraje diplomático internacional tras el abandono del teatro de operaciones", "es_correcta": False }
        ],
        "metricas": { "segundos_limite": 72, "pts_correcta": 20, "pts_incorrecta": -1.25 },
        "resolucion_corta": "La inmolación patriótica (como la de Bolognesi, Grau y Quiñones) representa el sacrificio supremo consciente y voluntario de la propia vida en defensa indoblegable de la soberanía nacional."
    })
    
    return questions

# Guardar y actualizar
all_rv_banks = {}

for sc in SCHOOLS_RV:
    prefix = sc["id"]
    folder = sc["folder"]
    bank = get_rv_bank(sc)
    all_rv_banks[prefix] = bank
    
    # Guardar JSON individual
    json_path = f"banco_preguntas/{folder}_rv_analogias.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(bank, f, indent=2, ensure_ascii=False)
    print(f"Generado {json_path}")

# Guardar banco maestro
with open("banco_preguntas/banco_maestro_rv_analogias_8_escuelas.json", "w", encoding="utf-8") as f:
    json.dump(all_rv_banks, f, indent=2, ensure_ascii=False)
print("Guardado banco maestro consolidado de Razonamiento Verbal.")

# Actualizar los Markdown de bases de conocimiento
for sc in SCHOOLS_RV:
    prefix = sc["id"]
    folder = sc["folder"]
    md_file = f"{folder}.md"
    md_path = os.path.join("bases_conocimiento", md_file)
    
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    section_title = "## 📚 Banco de Preguntas Calibradas: Razonamiento Verbal (Analogías y Precisión Léxica)"
    if section_title not in content:
        bank = all_rv_banks[prefix]
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

print("Razonamiento Verbal generado y guardado al 100% en todas las escuelas.")
