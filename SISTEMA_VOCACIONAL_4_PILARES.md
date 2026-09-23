# 🇵🇪 Sistema Integral de Orientación y Admisión Militar del Perú
## Arquitectura de Datos, Baremación Matemática y Plan Maestro al 100% de Efectividad

> **Estado del Sistema:** Operativo y Funcional en `http://localhost:8080/`  
> **Instituciones Cubiertas:** 8 Escuelas de Oficiales y Suboficiales de las FF.AA. y Policía Nacional del Perú  
> **Fecha de Actualización:** Septiembre 2026

---

## 📑 Índice de Contenidos
1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Estructura y Renombramiento de las Bases de Datos (4 Pilares)](#2-estructura-y-renombramiento-de-las-bases-de-datos-4-pilares)
3. [Flujo Operativo de la Evaluación Vocacional](#3-flujo-operativo-de-la-evaluación-vocacional)
4. [Fundamento Matemático y Ponderación Multi-Pilar](#4-fundamento-matemático-y-ponderación-multi-pilar)
5. [Arquitectura de Software y Endpoints REST](#5-arquitectura-de-software-y-endpoints-rest)
6. [Plan de Acción: ¿Qué Falta para Llegar al 100% de Efectividad?](#6-plan-de-acción-qué-falta-para-llegar-al-100-de-efectividad)

---

## 1. Resumen Ejecutivo

El **Sistema Integral de Orientación y Admisión Militar del Perú** es una plataforma tecnológica y psicométrica diseñada para diagnosticar, evaluar y proyectar con rigor matemático la compatibilidad de un postulante con el perfil de ingreso de las 8 escuelas oficiales de las Fuerzas Armadas (Ejército, Marina de Guerra, Fuerza Aérea) y la Policía Nacional del Perú.

El sistema supera a los tests vocacionales tradicionales al integrar **cuatro pilares evaluativos concurrentes**:
1. **Filtro Legal y Antropométrico:** Evaluación eliminatoria de requisitos normativos (edad, talla, IMC, estado civil, antecedentes).
2. **Evaluación Psicométrica Militar:** Medición estandarizada bajo el modelo IPIP-NEO (Big Five) contrastada con los baremos conductuales oficiales.
3. **Intereses Operativos Inmersivos:** Dilemas tácticos situacionales ambientados en la geografía y realidad operativa peruana.
4. **Aptitud Académica y Psicotécnico:** Batería de preguntas calibradas con los prospectos oficiales de admisión.

---

## 2. Estructura y Renombramiento de las Bases de Datos (4 Pilares)

Los 4 archivos maestros fueron consolidados en la raíz del proyecto con nomenclatura oficial:

```
test_vocacional/
├── pilar1_requisitos_legales.json       (12.3 KB - 8 Escuelas Militares Oficiales)
├── pilar2_evaluacion_psicometrica.json  (41.4 KB - 150 Reactivos Big Five + Baremos)
├── pilar3_intereses_operativos.json    (161.0 KB - 100 Dilemas Tácticos Situacionales)
└── pilar4_aptitud_conocimientos.json   (166.5 KB - 150 Preguntas Pre-Militares)
```

### Detalle de Contenido por Pilar:

### 🛡️ Pilar 1: `pilar1_requisitos_legales.json`
- **Contenido:** Catálogo exhaustivo de las 8 escuelas oficiales:
  - `EMCH`: Escuela Militar de Chorrillos "Crl. Francisco Bolognesi" (Oficial - Ejército)
  - `ETE`: Escuela Técnica del Ejército (Suboficial - Ejército)
  - `ENP`: Escuela Naval del Perú (Oficial - Marina)
  - `CITEN`: Instituto Tecnológico Naval (Suboficial - Marina)
  - `EOFAP`: Escuela de Oficiales FAP "Cap. FAP José Quiñones" (Oficial - FAP)
  - `ESOFA`: Escuela de Suboficiales FAP (Suboficial - FAP)
  - `EO-PNP`: Escuela de Oficiales PNP "Mariano Santos Mateo" (Oficial - PNP)
  - `EESTP_PNP`: Escuelas Técnico Superiores de la PNP (Suboficial - PNP)
- **Criterios normados:** Rango de edad (15-24 según escuela), talla mínima por sexo (varones: 160-168 cm; damas: 155-159 cm), límites de IMC (18.5 - 27.5), estado civil soltero sin dependientes, certificados de antecedentes y secundaria.

### 🧠 Pilar 2: `pilar2_evaluacion_psicometrica.json`
- **Contenido:** 150 afirmaciones psicológicas en primera persona adaptadas al español peruano castrense.
- **Distribución:** Exactamente 30 reactivos por macro-dominio Big Five:
  - **Neuroticismo (N):** Estabilidad emocional, templanza y tolerancia al estrés extremo.
  - **Extraversión (E):** Asertividad, mando militar y extroversión táctica.
  - **Apertura (O):** Flexibilidad cognitiva, pensamiento abstracto e innovación tecnológica.
  - **Amabilidad (A):** Cohesión de equipo, empatía y subordinación respetuosa.
  - **Responsabilidad (C):** Sentido del deber, disciplina férrea, pulcritud y perseverancia.
- **Baremos Institucionales:** Perfiles ideales (percentiles) por fuerza y rango.

### 🎯 Pilar 3: `pilar3_intereses_operativos.json`
- **Contenido:** 100 dilemas situacionales inmersivos ambientados en escenarios peruanos (VRAEM, frontera amazónica, Mar de Grau, patrullaje aéreo cordillerano, investigación criminal SUAT/DIRINCRI).
- **Estructura de respuesta:** 4 alternativas por dilema con matriz de pesos de afinidad directa:
  ```json
  "pesos_afinidad": { "Ejercito": 10, "Marina": 0, "FAP": 0, "PNP": 0 }
  ```

### 📝 Pilar 4: `pilar4_aptitud_conocimientos.json`
- **Contenido:** 150 preguntas de opción múltiple con 4 distractores y 1 sola respuesta correcta.
- **Distribución por áreas académicas oficiales:**
  - **40 Psicotécnico:** Razonamiento Espacial (10), Series Lógicas (10), Razonamiento Matemático (10), Razonamiento Verbal (10).
  - **40 Ciencias Exactas:** Aritmética (10), Álgebra (10), Geometría (10), Trigonometría (10).
  - **30 Ciencias Naturales:** Física (18), Química (12).
  - **40 Letras y Humanidades:** Lenguaje (10), Historia del Perú y del Mundo (14), Geografía del Perú (8), Educación Cívica y DDHH (8).

---

## 3. Flujo Operativo de la Evaluación Vocacional

Cuando un usuario interactúa con la plataforma web (`http://localhost:8080/`), el flujo ocurre en 5 pasos secuenciales:

```
[Paso 0: Registro de Datos Básicos]
       │
       ▼
[Pilar 1: Filtro Legal en Vivo] ──► Semáforo instantáneo (Verde: Apto / Rojo: No Apto) para las 8 escuelas
       │
       ▼
[Extracción Aleatoria por API] ──► Se extraen 45 reactivos frescos:
       │                             • 15 de Psicometría (P2)
       │                             • 10 de Intereses Operativos (P3)
       │                             • 20 de Conocimientos Pre-Militares (P4)
       ▼
[Fase 1: 15 Preguntas Big Five] ──► Escala Likert de 1 a 5 con inversión de polaridad
       │
       ▼
[Fase 2: 10 Dilemas Tácticos] ──► Elección de rol situacional en escenarios nacionales
       │
       ▼
[Fase 3: 20 Preguntas Académicas] ──► Examen de opción múltiple con cronómetro y feedback
       │
       ▼
[Motor Matemático Multi-Pilar] ──► Ponderación: 35% Intereses + 35% Psicometría + 30% Conocimientos
       │
       ▼
[Paso 4: DASHBOARD INTERACTIVO] ──► Proclamación de Escuela Ganadora + Podio de 8 Escuelas + Radar SVG
```

---

## 4. Fundamento Matemático y Ponderación Multi-Pilar

La compatibilidad global para cada escuela militar o policial $i$ ($i \in \{\text{EMCH, ETE, ENP, CITEN, EOFAP, ESOFA, EO-PNP, EESTP\_PNP}\}$) se define mediante la función de afinidad compuesta:

$$\text{FitGlobal}_i = \left( 0.35 \times \text{Intereses}_i \right) + \left( 0.35 \times \text{Psicometría}_i \right) + \left( 0.30 \times \text{Conocimientos}_i \right)$$

### 1. Puntuación Psicométrica ($\text{Psicometría}_i$)
A partir de las 15 afirmaciones, se calcula el percentil normalizado en cada dominio $d \in \{N, E, O, A, C\}$:
$$\text{Score}_d = \frac{\sum \text{reactivos}_d - \text{min}}{\text{max} - \text{min}} \times 100$$
Luego se computa la similitud euclidiana inversa frente al vector ideal institucional $\vec{I}_i$:
$$\text{Psicometría}_i = 100 \times \left( 1 - \sqrt{\frac{\sum_{d} w_d (\text{Score}_d - I_{i,d})^2}{\text{DistanciaMáxima}^2}} \right)$$
Donde $w_N = 1.4, w_C = 1.4$ (mayor peso a estabilidad emocional y disciplina militar).

### 2. Puntuación de Intereses Operativos ($\text{Intereses}_i$)
Suma los puntos acumulados en los 10 dilemas para la rama respectiva ($\text{Ejército}, \text{Marina}, \text{FAP}, \text{PNP}$) normalizado a 100%, con diferenciación de rango oficial vs técnico.

### 3. Puntuación de Conocimientos ($\text{Conocimientos}_i$)
$$\text{Nota Vigesimal} = \left(\frac{\text{Aciertos}}{20}\right) \times 20.0$$
$$\text{Conocimientos}_i = 0.70 \times \left(\frac{\text{Aciertos}}{20} \times 100\right) + 0.30 \times \left(\frac{\text{AciertosRelacionados}_i}{\text{AciertosTotales}} \times 100\right)$$

---

## 5. Arquitectura de Software y Endpoints REST

- **Backend:** Servidor en Python 3 (`run_server.py`) con controlador HTTP multihilo y motor matemático modular en `engine/vocational_engine.py`.
- **Frontend:** SPA interactiva en HTML5, CSS3 Glassmorphism (`vocational.css`) y JavaScript ES6 (`vocational_flow.js`).
- **Visualización:** Gráfico Radar generado dinámicamente en **SVG estándar puro**, sin dependencias externas ni conexión a internet obligatoria.

### Endpoints REST Activos:
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/vocational/institutions` | Retorna metadatos de las 8 escuelas (nombres, iconos, lemas, colores). |
| `POST` | `/api/vocational/init` | Recibe datos del candidato, evalúa Pilar 1 y entrega batería de 45 preguntas al azar con token de sesión seguro. |
| `POST` | `/api/vocational/evaluate` | Recibe las respuestas del usuario, ejecuta la consolidación matemática y emite el dictamen final. |

---

## 6. Plan de Acción: ¿Qué Falta para Llegar al 100% de Efectividad?

Actualmente el sistema se encuentra en un nivel de madurez técnica del **85% - 90%** (nivel MVP Avanzado de Alta Fidelidad). Para alcanzar el **100% de efectividad de grado institucional oficial**, se deben implementar las siguientes 6 mejoras estratégicas:

```mermaid
flowchart LR
    A["Estado Actual (88%)"] --> B["Fase 1: Escala L Anti-Fraude"]
    B --> C["Fase 2: Penalización Negativa Oficial"]
    C --> D["Fase 3: Baremos de Especialidad Médica"]
    D --> E["Fase 4: Simulacros Completos de 100 P."]
    E --> F["Fase 5: Módulo Físico Integrado"]
    F --> G["Fase 6: BD SQLite & PDF Oficial con QR"]
    G --> H["100% Grado Oficial FFAA/PNP"]
```

### 1. Inserción de la Escala L (Deseabilidad Social / Control de Mentira) en la Sesión Rápida
- **Brecha Actual:** El Pilar 2 posee un banco de 20 preguntas de deseabilidad social en `pilar2_evaluacion_psicometrica.json`, pero la prueba de 15 reactivos solo extrae Big Five.
- **Acción al 100%:** Intercalar 3 reactivos de control de mentira (ej. *"Nunca he dicho una mentira en mi vida"*, *"Jamás he sentido envidia"*). Si el postulante marca "Totalmente de acuerdo" en los 3 reactivos, el sistema activa una alerta por **"Falsa Virtud / Deseabilidad Social Excesiva"**, penalizando el índice de sinceridad o exigiendo re-evaluación, tal como hacen los gabinetes psicométricos del Ejército y la Marina.

### 2. Sistema de Calificación con Penalización por Respuesta Incorrecta
- **Brecha Actual:** Cada acierto en el Pilar 4 suma puntos y los errores no restan.
- **Acción al 100%:** Configurar el sistema de puntuación real de concurso de admisión:
  - Respuesta Correcta: $+1.0$ punto.
  - Respuesta Incorrecta: $-0.25$ puntos (penalización de $1/4$ de punto).
  - Respuesta en Blanco: $0.0$ puntos.
  Esto medirá la **prudencia táctica** y evitará que el postulante responda al azar ("champazo").

### 3. Baremos Médicos y Sub-Especialidades Quirúrgicas
- **Brecha Actual:** El Pilar 1 valida edad, talla e IMC general.
- **Acción al 100%:** Incorporar restricciones específicas de alta fidelidad:
  - **Pilotos EOFAP:** Agudeza visual 20/20 sin correctores (Tabla de Snellen) y talla sentado obligatoria.
  - **Comandos / Infantería de Marina:** Examen odontológico (máximo 4 piezas curadas, mordida clase I sin apiñamiento severo).
  - **Damas en Fuerzas Especiales:** Tablas diferenciadas de porcentaje de grasa corporal (pliegues tricipital y subescapular).

### 4. Simulacro Masivo Institucional Específico (100 Preguntas Reales)
- **Brecha Actual:** El test vocacional toma 20 preguntas transversales para orientar.
- **Acción al 100%:** Una vez que el alumno descubre para qué escuela nació (ej. EOFAP), ofrecer un botón:  
  `[🎯 Iniciar Simulacro Oficial EOFAP de 100 Preguntas con Ponderación de Prospecto]`.  
  Cada escuela tiene una matriz de ponderación distinta (ej. EOFAP: 60% Ciencias / 40% Letras; EO-PNP: 40% Ciencias / 60% Letras y Cívica).

### 5. Integración del Pilar 5 (Pruebas de Esfuerzo Físico en Campo)
- **Brecha Actual:** La plataforma ya posee la calculadora física en la pestaña 3 (`panel-physical`), pero aún funciona como módulo independiente.
- **Acción al 100%:** Vincular las marcas físicas (flexiones, barras, carrera de 1500m, natación 50m y salto largo) directamente al cálculo vocacional, permitiendo un **Índice Global de Aptitud para el Combate (IGAC)**.

### 6. Persistencia en Base de Datos y Generación de Ficha PDF con Firma Digital y QR
- **Brecha Actual:** La sesión se almacena en memoria volátil de Python y LocalStorage del navegador.
- **Acción al 100%:** Implementar base de datos SQLite/PostgreSQL para registrar cada intento con DNI y fecha, generando un reporte PDF formal descargable con código QR que valida el resultado vocacional ante una academia pre-militar o tutor.

---

### Resumen de Próximos Pasos Recomendados:
1. **Paso A:** Incorporar 3 reactivos de la Escala L al generador de batería de 15 preguntas.
2. **Paso B:** Activar la penalización de $-0.25$ por fallo en el calificador vigesimal.
3. **Paso C:** Vincular el resultado físico del candidato en la fórmula final.
