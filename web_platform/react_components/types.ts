/**
 * types.ts
 * Definiciones de tipos TypeScript para el Simulador de Conocimientos Militar.
 */

export interface ExamOption {
  id_opcion: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  texto_respuesta: string; // Admite texto plano o LaTeX ($...$, $$...$$)
  es_correcta?: boolean;
}

export interface ExamQuestion {
  id_pregunta: string;
  area_academica: 'Ciencias Exactas' | 'Ciencias Naturales' | 'Letras y Humanidades' | 'Psicotécnico' | string;
  tema_especifico: string;
  enunciado: string; // Admite sintaxis LaTeX como $$E = \frac{a}{b}$$ o $x^2 + y^2 = r^2$
  
  /**
   * Campo condicional para gráfico vectorial o figura geométrica asociada.
   * Si está presente, el componente debe renderizar la imagen centrada debajo del
   * enunciado y encima de las opciones de respuesta.
   * @example "/assets/math/geo_01.svg"
   */
  imagen_url?: string | null;

  /**
   * Texto alternativo para accesibilidad (a11y) y subtítulo técnico de la figura.
   * @example "Relaciones métricas en el triángulo rectángulo ABC"
   */
  imagen_alt?: string;

  opciones: ExamOption[];
  nivel_dificultad?: number; // 1 (Básico) a 5 (Avanzado)
  escuelas_relacionadas?: string[];
}

export interface ExamScoreResult {
  aciertos: number;
  errores: number;
  blancos: number;
  puntajeNeto: number; // Formula: max(0, aciertos * 1.0 - errores * 0.25)
  notaVigesimal: number; // Escala 0.00 a 20.00
  esAprobado: boolean; // >= 12.00
  total: number;
}
