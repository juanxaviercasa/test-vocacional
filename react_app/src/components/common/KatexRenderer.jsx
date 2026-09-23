import React, { useMemo } from 'react';
import katex from 'katex';

export default function KatexRenderer({ math, inline = true, className = '' }) {
  const html = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math, {
        displayMode: !inline,
        throwOnError: false,
      });
    } catch (e) {
      console.warn("KaTeX render error:", e);
      return math;
    }
  }, [math, inline]);

  return (
    <span
      className={`katex-wrapper inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Función auxiliar para parsear texto con fórmulas en formato $...$ o $$...$$
 */
export function renderFormattedText(text) {
  if (!text) return null;
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$.*?\$)/g);
  return parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      const math = part.slice(2, -2);
      return <KatexRenderer key={index} math={math} inline={false} />;
    } else if (part.startsWith('$') && part.endsWith('$')) {
      const math = part.slice(1, -1);
      return <KatexRenderer key={index} math={math} inline={true} />;
    }
    return <span key={index}>{part}</span>;
  });
}
