import React, { useMemo } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Componente táctico para renderizado matemático de enunciados y opciones de examen militar.
 * Procesa automáticamente bloques en formato display ($$...$$) e inline ($...$).
 */
export default function EnunciadoMatematico({ text, className = '' }) {
  const parsedContent = useMemo(() => {
    if (!text || typeof text !== 'string') {
      return text ?? null;
    }

    // Dividir el texto identificando bloques $$...$$ y $...$
    // Usamos regex con grupos de captura para display e inline
    const regex = /(?:\$\$([\s\S]*?)\$\$|\$([^\$\n]+?)\$)/g;
    const elements = [];
    let lastIndex = 0;
    let match;
    let keyIdx = 0;

    while ((match = regex.exec(text)) !== null) {
      // Texto previo al match
      if (match.index > lastIndex) {
        elements.push(
          <span key={`text-${keyIdx++}`}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }

      const displayFormula = match[1];
      const inlineFormula = match[2];

      if (displayFormula !== undefined) {
        // Bloque Display ($$...$$)
        elements.push(
          <div key={`math-block-${keyIdx++}`} className="my-2 overflow-x-auto py-1 text-center">
            <SafeBlockMath math={displayFormula.trim()} />
          </div>
        );
      } else if (inlineFormula !== undefined) {
        // Bloque Inline ($...$)
        elements.push(
          <span key={`math-inline-${keyIdx++}`} className="inline-math-wrapper px-0.5">
            <SafeInlineMath math={inlineFormula.trim()} />
          </span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    // Texto remanente tras el último match
    if (lastIndex < text.length) {
      elements.push(
        <span key={`text-${keyIdx++}`}>
          {text.substring(lastIndex)}
        </span>
      );
    }

    return elements.length > 0 ? elements : text;
  }, [text]);

  return (
    <span className={`enunciado-matematico ${className}`}>
      {parsedContent}
    </span>
  );
}

/**
 * Renderizado seguro de fórmulas inline con recuperación ante errores
 */
function SafeInlineMath({ math }) {
  try {
    return <InlineMath math={math} errorColor="#ef4444" />;
  } catch (err) {
    console.warn("KaTeX Inline Render Warning:", err, math);
    try {
      const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
      return <code className="text-amber-400 font-mono text-xs">{`$${math}$`}</code>;
    }
  }
}

/**
 * Renderizado seguro de fórmulas en bloque con recuperación ante errores
 */
function SafeBlockMath({ math }) {
  try {
    return <BlockMath math={math} errorColor="#ef4444" />;
  } catch (err) {
    console.warn("KaTeX Block Render Warning:", err, math);
    try {
      const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
      return <pre className="text-amber-400 font-mono text-xs overflow-x-auto">{`$$${math}$$`}</pre>;
    }
  }
}
