/**
 * LatexRenderer.jsx
 * Componente Frontend de Alto Rendimiento para renderizado de sintaxis LaTeX
 * Utiliza 'react-katex' (InlineMath y BlockMath) con soporte para texto mixto
 * (párrafos en español con ecuaciones $inline$ y $$display$$).
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Divide un texto que contiene delimitadores $$...$$ y $...$ en segmentos
 * estructurados para renderizar texto plano o ecuaciones matemáticas KaTeX.
 */
function parseLatexSegments(content) {
  if (!content || typeof content !== 'string') {
    return [{ type: 'text', value: '' }];
  }

  const segments = [];
  // Regex para capturar $$display$$ o $inline$ o \(inline\) o \[display\]
  const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const matchStart = match.index;
    const matchEnd = regex.lastIndex;

    // Texto previo
    if (matchStart > lastIndex) {
      segments.push({
        type: 'text',
        value: content.slice(lastIndex, matchStart),
      });
    }

    const token = match[0];
    if (token.startsWith('$$') && token.endsWith('$$')) {
      segments.push({
        type: 'block',
        value: token.slice(2, -2).trim(),
      });
    } else if (token.startsWith('\\[') && token.endsWith('\\]')) {
      segments.push({
        type: 'block',
        value: token.slice(2, -2).trim(),
      });
    } else if (token.startsWith('$') && token.endsWith('$')) {
      segments.push({
        type: 'inline',
        value: token.slice(1, -1).trim(),
      });
    } else if (token.startsWith('\\(') && token.endsWith('\\)')) {
      segments.push({
        type: 'inline',
        value: token.slice(2, -2).trim(),
      });
    }

    lastIndex = matchEnd;
  }

  // Texto restante
  if (lastIndex < content.length) {
    segments.push({
      type: 'text',
      value: content.slice(lastIndex),
    });
  }

  return segments;
}

export const LatexRenderer = ({ content, className = '' }) => {
  const segments = useMemo(() => parseLatexSegments(content), [content]);

  return (
    <span className={`latex-renderer-root ${className}`}>
      {segments.map((seg, idx) => {
        if (seg.type === 'text') {
          return <span key={idx}>{seg.value}</span>;
        }

        if (seg.type === 'inline') {
          return (
            <span key={idx} className="katex-inline-wrapper">
              <InlineMath math={seg.value} renderError={(error) => (
                <span className="katex-fallback-error" title={error.message}>
                  {seg.value}
                </span>
              )} />
            </span>
          );
        }

        if (seg.type === 'block') {
          return (
            <div key={idx} className="katex-block-wrapper">
              <BlockMath math={seg.value} renderError={(error) => (
                <div className="katex-fallback-error" title={error.message}>
                  {seg.value}
                </div>
              )} />
            </div>
          );
        }

        return null;
      })}
    </span>
  );
};

LatexRenderer.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

export default LatexRenderer;
