import { useState, useEffect, useCallback, useMemo } from 'react';

// Importaciones estáticas de respaldo para máxima fiabilidad offline
import emchData from '../data/conocimientos/EMCH.json';
import eteData from '../data/conocimientos/ETE.json';
import enpData from '../data/conocimientos/ENP.json';
import citenData from '../data/conocimientos/CITEN.json';
import eofapData from '../data/conocimientos/EOFAP.json';
import esofaData from '../data/conocimientos/ESOFA.json';
import eoPnpData from '../data/conocimientos/EO_PNP.json';
import eestpPnpData from '../data/conocimientos/EESTP_PNP.json';

const BUNDLED_BANKS = {
  EMCH: emchData,
  ETE: eteData,
  ENP: enpData,
  CITEN: citenData,
  EOFAP: eofapData,
  ESOFA: esofaData,
  'EO_PNP': eoPnpData,
  'EO-PNP': eoPnpData,
  'EESTP_PNP': eestpPnpData,
  'EESTP-PNP': eestpPnpData,
};

/**
 * Normaliza el ID de la escuela para coincidir con las convenciones oficiales
 */
export function normalizeSchoolId(id) {
  if (!id) return 'EOFAP';
  const clean = String(id).trim().toUpperCase();
  if (clean === 'EO-PNP' || clean === 'EO_PNP') return 'EO_PNP';
  if (clean === 'EESTP-PNP' || clean === 'EESTP_PNP') return 'EESTP_PNP';
  return clean;
}

/**
 * Algoritmo de barajado Fisher-Yates
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Extrae 20 preguntas garantizando una distribución equitativa por cursos.
 */
export function selectEquitableQuestions(rawQuestions, totalDesired = 20) {
  if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
    return [];
  }

  // 1. Agrupar preguntas por curso
  const byCourse = {};
  rawQuestions.forEach((q) => {
    const course = q.curso || 'General';
    if (!byCourse[course]) {
      byCourse[course] = [];
    }
    byCourse[course].push(q);
  });

  const courses = Object.keys(byCourse);
  const numCourses = courses.length;

  if (numCourses === 0) return [];

  // Barajar internamente las preguntas de cada curso
  Object.keys(byCourse).forEach((c) => {
    byCourse[c] = shuffleArray(byCourse[c]);
  });

  const selected = [];
  const basePerCourse = Math.floor(totalDesired / numCourses);
  let remainder = totalDesired % numCourses;

  // Cursos que recibirán una pregunta extra para completar exactamente el totalDesired
  const shuffledCourses = shuffleArray(courses);
  const bonusCourses = new Set(shuffledCourses.slice(0, remainder));

  courses.forEach((c) => {
    const needed = basePerCourse + (bonusCourses.has(c) ? 1 : 0);
    const pool = byCourse[c];
    const picked = pool.slice(0, needed);
    selected.push(...picked);
  });

  // Si por alguna razón faltan (ej. un curso tenía menos preguntas del cupo), rellenar del resto
  if (selected.length < totalDesired) {
    const selectedIds = new Set(selected.map((q) => q.id_pregunta));
    const remainingPool = shuffleArray(rawQuestions.filter((q) => !selectedIds.has(q.id_pregunta)));
    const needed = totalDesired - selected.length;
    selected.push(...remainingPool.slice(0, needed));
  }

  // Barajar la lista final de 20 preguntas para que no salgan en bloques monótonos
  return shuffleArray(selected).slice(0, totalDesired);
}

/**
 * Custom Hook: useKnowledgeTest
 * Motor de evaluación para el Pilar 4 (Simulador de Conocimientos Militares).
 * 
 * @param {string} id_escuela - ID de la escuela militar (ej: 'EOFAP', 'EMCH', etc.)
 * @returns {object} Estado y métodos del test de conocimientos.
 */
export function useKnowledgeTest(id_escuela = 'EOFAP') {
  const [activeSchoolId, setActiveSchoolId] = useState(() => normalizeSchoolId(id_escuela));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawBank, setRawBank] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [id_pregunta]: { selectedOptionId, isCorrect, ptsEarned, isBlank } }
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(72); // 72 segundos por pregunta
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Sincronizar si cambia el prop id_escuela
  useEffect(() => {
    const normalized = normalizeSchoolId(id_escuela);
    if (normalized !== activeSchoolId) {
      setActiveSchoolId(normalized);
    }
  }, [id_escuela, activeSchoolId]);

  // Lógica de Carga del Archivo Maestro JSON
  const loadSchoolData = useCallback(async (schoolId) => {
    setIsLoading(true);
    setError(null);
    const norm = normalizeSchoolId(schoolId);

    try {
      let data = null;

      // 1. Intento vía fetch en /data/conocimientos/${norm}.json
      try {
        const res = await fetch(`/data/conocimientos/${norm}.json`);
        if (res.ok) {
          const json = await res.json();
          data = json.preguntas || json;
        }
      } catch (fetchErr) {
        console.warn(`Fetch local falló para ${norm}, usando banco empaquetado:`, fetchErr);
      }

      // 2. Si no cargó por fetch, usar banco estático empaquetado
      if (!data || !Array.isArray(data) || data.length === 0) {
        const bundled = BUNDLED_BANKS[norm] || BUNDLED_BANKS['EOFAP'];
        data = bundled?.preguntas || bundled || [];
      }

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error(`No se encontró el banco de preguntas para la escuela: ${norm}`);
      }

      setRawBank(data);

      // Selección equitativa de 20 preguntas
      const selected = selectEquitableQuestions(data, 20);
      setQuestions(selected);
      setCurrentIndex(0);
      setAnswers({});
      setIsCompleted(false);
      setTimeRemaining(72);
      setIsTimerActive(true);
    } catch (err) {
      console.error("Error al cargar banco de conocimientos:", err);
      setError(err.message || 'Error al cargar preguntas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar datos al montar o al cambiar de escuela
  useEffect(() => {
    loadSchoolData(activeSchoolId);
  }, [activeSchoolId, loadSchoolData]);

  // Pregunta activa actual
  const currentQuestion = useMemo(() => {
    return questions[currentIndex] || null;
  }, [questions, currentIndex]);

  // Temporizador regresivo de 72 segundos por pregunta
  useEffect(() => {
    if (!isTimerActive || isCompleted || !currentQuestion) return;

    const timerInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // TIEMPO AGOTADO -> Se marca en blanco y se avanza
          handleTimeout();
          return 72;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isTimerActive, isCompleted, currentQuestion, currentIndex]);

  // Reiniciar temporizador al cambiar de pregunta
  const resetTimer = useCallback(() => {
    setTimeRemaining(72);
  }, []);

  // Registrar respuesta seleccionada
  const selectAnswer = useCallback((optionId) => {
    if (!currentQuestion || isCompleted) return;

    const q = currentQuestion;
    const selectedOpt = q.opciones?.find((o) => o.id === optionId);
    const isCorrect = Boolean(selectedOpt?.es_correcta);

    const ptsCorrecta = q.metricas?.pts_correcta ?? 20;
    const ptsIncorrecta = q.metricas?.pts_incorrecta ?? -1.25;

    const ptsEarned = isCorrect ? ptsCorrecta : ptsIncorrecta;

    setAnswers((prev) => ({
      ...prev,
      [q.id_pregunta]: {
        selectedOptionId: optionId,
        isCorrect,
        ptsEarned,
        isBlank: false,
        tiempoRestante: timeRemaining,
      }
    }));
  }, [currentQuestion, isCompleted, timeRemaining]);

  // Manejo de Tiempo Agotado (Marcado como "En Blanco")
  const handleTimeout = useCallback(() => {
    if (!currentQuestion || isCompleted) return;

    const q = currentQuestion;
    setAnswers((prev) => {
      // Si ya fue respondida, no sobreescribir
      if (prev[q.id_pregunta]) return prev;

      return {
        ...prev,
        [q.id_pregunta]: {
          selectedOptionId: null,
          isCorrect: false,
          ptsEarned: 0,
          isBlank: true,
          tiempoRestante: 0,
        }
      };
    });

    // Auto-avanzar a la siguiente pregunta
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev < questions.length - 1) {
          setTimeRemaining(72);
          return prev + 1;
        } else {
          setIsCompleted(true);
          setIsTimerActive(false);
          return prev;
        }
      });
    }, 300);
  }, [currentQuestion, isCompleted, questions.length]);

  // Navegar a la siguiente pregunta
  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      resetTimer();
    } else {
      setIsCompleted(true);
      setIsTimerActive(false);
    }
  }, [currentIndex, questions.length, resetTimer]);

  // Navegar a la pregunta anterior
  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetTimer();
    }
  }, [currentIndex, resetTimer]);

  // Saltar a un índice específico
  const goToQuestion = useCallback((index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
      resetTimer();
    }
  }, [questions.length, resetTimer]);

  // Reiniciar la evaluación
  const restartTest = useCallback(() => {
    if (rawBank.length > 0) {
      const selected = selectEquitableQuestions(rawBank, 20);
      setQuestions(selected);
      setCurrentIndex(0);
      setAnswers({});
      setIsCompleted(false);
      setTimeRemaining(72);
      setIsTimerActive(true);
    } else {
      loadSchoolData(activeSchoolId);
    }
  }, [rawBank, activeSchoolId, loadSchoolData]);

  // Cambiar de escuela
  const changeSchool = useCallback((newSchoolId) => {
    const norm = normalizeSchoolId(newSchoolId);
    setActiveSchoolId(norm);
  }, []);

  // LÓGICA DE CALIFICACIÓN Y ESTADÍSTICAS EN VIVO
  const scoreResults = useMemo(() => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let blankCount = 0;
    const courseStats = {};

    questions.forEach((q) => {
      const qPtsCorrecta = q.metricas?.pts_correcta ?? 20;
      maxPossibleScore += qPtsCorrecta;

      const course = q.curso || 'General';
      if (!courseStats[course]) {
        courseStats[course] = { total: 0, correct: 0, incorrect: 0, blank: 0, pts: 0 };
      }
      courseStats[course].total += 1;

      const ans = answers[q.id_pregunta];
      if (!ans || ans.isBlank) {
        blankCount += 1;
        courseStats[course].blank += 1;
      } else if (ans.isCorrect) {
        correctCount += 1;
        totalScore += ans.ptsEarned;
        courseStats[course].correct += 1;
        courseStats[course].pts += ans.ptsEarned;
      } else {
        incorrectCount += 1;
        totalScore += ans.ptsEarned; // suma el valor negativo (penalización)
        courseStats[course].incorrect += 1;
        courseStats[course].pts += ans.ptsEarned;
      }
    });

    // Puntaje vigesimal normalizado (0 a 20)
    const vigesimal = maxPossibleScore > 0
      ? Math.max(0, Math.min(20, parseFloat(((totalScore / maxPossibleScore) * 20).toFixed(2))))
      : 0;

    const answeredCount = correctCount + incorrectCount;
    const accuracy = answeredCount > 0
      ? Math.round((correctCount / answeredCount) * 100)
      : 0;

    return {
      rawScore: parseFloat(totalScore.toFixed(2)),
      maxPossibleScore,
      vigesimalScore: vigesimal,
      correctCount,
      incorrectCount,
      blankCount,
      answeredCount,
      accuracy,
      courseStats,
      isApproved: vigesimal >= 12.0, // Nota aprobatoria militar estándar: 12.00
    };
  }, [questions, answers]);

  return {
    // Estado
    schoolId: activeSchoolId,
    isLoading,
    error,
    questions,
    totalQuestions: questions.length,
    currentIndex,
    currentQuestion,
    answers,
    currentAnswer: currentQuestion ? answers[currentQuestion.id_pregunta] : null,
    isCompleted,
    timeRemaining,
    isTimerActive,

    // Métricas y Calificación
    score: scoreResults,

    // Acciones
    selectAnswer,
    handleTimeout,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    restartTest,
    changeSchool,
    setIsTimerActive,
  };
}

export default useKnowledgeTest;
