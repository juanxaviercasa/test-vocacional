# Sistema de Evaluación Psicométrica y Vocacional Militar del Perú 🇵🇪

Plataforma de evaluación psicométrica y emparejamiento con perfiles institucionales para los procesos de admisión de las **Fuerzas Armadas y Policía Nacional del Perú**.

Adaptación e integración de:
1. **[NeuroQuestAi/five-factor-e](https://github.com/NeuroQuestAi/five-factor-e)**: Motor matemático IPIP-NEO (John A. Johnson / Lewis Goldberg), normalización y baremos por edad y sexo.
2. **[rubynor/bigfive-web](https://github.com/rubynor/bigfive-web)**: Arquitectura de interfaz interactiva, bloques de preguntas, cronómetro y persistencia en tiempo real.
3. **[kndukuba17-hub/Big-Five-Personality-Analysis](https://github.com/kndukuba17-hub/Big-Five-Personality-Analysis)**: Clustering, distancias vectoriales a centroides ideales y segmentación en arquetipos conductuales.

---

## 🏛️ Instituciones y Perfiles Modelados

* ✈️ **FAP (Fuerza Aérea del Perú - EOFAP / ESOFA)**: Alta estabilidad emocional (cabina/vuelo), máxima responsabilidad técnica y apego estricto a checklists y procedimientos.
* 👮 **PNP (Policía Nacional del Perú - EO-PNP / EESTP)**: Alta rectitud moral y honestidad (rechazo a la corrupción), control de impulsos ante provocaciones, asertividad y vocación de servicio ciudadano.
* ⚓ **ENM / MGP (Marina de Guerra del Perú / Escuela Naval)**: Resiliencia mental al confinamiento y aislamiento marino en altamar, máximo orden naval y espíritu de cuerpo.
* ⚔️ **EMCH (Ejército del Perú / Escuela Militar de Chorrillos)**: Liderazgo y asertividad (voz de mando), resistencia a la fatiga física/combate y sentido del honor y abnegación patriótica.
* 🚢 **ENAMM (Escuela Nacional de Marina Mercante)**: Cautela, orden y seguridad náutica (Convenio SOLAS), tolerancia a travesías transoceánicas.
* 🎓 **VOCACIONAL_UNIV (Carreras Universitarias y Técnicas Afines)**: Orientación académica cruzada (Ingeniería, Criminología, Medicina/Sanidad, Derecho).

---

## 🚀 Cómo Iniciar la Plataforma

### Opción A: Servidor Local Integrado (Recomendado)
Ejecute en la terminal:
```bash
python run_server.py
```
Abra en cualquier navegador: **`http://localhost:8080`**

### Opción B: Uso Autónomo Directo (Sin Servidor)
Puede hacer doble clic directamente sobre el archivo:
`web_platform/index.html`
La aplicación funciona al 100% de manera estática y autónoma en el navegador, sin necesidad de conexión a internet ni instalación de dependencias pesadas.

---

## 🔬 Estructura del Proyecto

```
test_vocacional/
├── engine/                          # Motor psicométrico y perfiles en Python
│   ├── __init__.py
│   ├── data/
│   │   ├── questions_120_es.json   # 120 preguntas IPIP-NEO con 30 facetas
│   │   └── questions_50_es.json    # 50 preguntas de tamizaje rápido
│   ├── ipip_engine.py              # Cálculo de percentiles, baremos y puntajes T
│   ├── institutional_profiles.py   # Vectores ideales y reglas de descarte (Red Flags)
│   ├── profile_matcher.py          # Distancia vectorial, afinidad % y arquetipos
│   └── report_generator.py         # Generador de informes y preguntas de entrevista
├── web_platform/                    # Plataforma Web Interactiva
│   ├── index.html                  # Interfaz institucional completa
│   ├── css/
│   │   └── styles.css              # Estilos Glassmorphism Navy & Gold
│   └── js/
│       ├── questions_data.js       # Banco de preguntas en español
│       ├── institutional_profiles.js # Perfiles ideales y banderas rojas
│       ├── scoring_engine.js       # Motor de cálculo cliente (paridad con Python)
│       └── app.js                  # Controlador del test y Radar Chart en Canvas
├── tests/                           # Batería de pruebas automatizadas
│   ├── test_engine.py              # Tests unitarios en Python
│   └── test_js_engine.js           # Tests unitarios en Node.js
└── run_server.py                   # Servidor HTTP y API REST /api/evaluate
```

---

## 🛡️ Detección de Banderas Rojas ("Red Flags")
El sistema evalúa criterios de descalificación aplicados por juntas médicas y psicológicas:
1. **Riesgo de Impulsividad y Descontrol**: Faceta Inmoderación > 75 (Riesgo con armas de fuego).
2. **Hostilidad e Ira Incontrolada**: Faceta Hostilidad > 72.
3. **Vulnerabilidad al Estrés Extremo**: Faceta Vulnerabilidad > 75 (Riesgo de pánico/bloqueo).
4. **Desapego Ético y Falta de Probidad**: Faceta Moralidad < 25 (Exclusión en PNP/FFAA).
5. **Bajo Sentido del Deber**: Faceta Sentido del Deber < 25 (Falta de subordinación).
