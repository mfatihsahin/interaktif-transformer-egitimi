'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathFormulaProps {
  formula: string;
  block?: boolean;
  className?: string;
}

export default function MathFormula({ formula, block = false, className = '' }: MathFormulaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      katex.render(formula, containerRef.current, {
        throwOnError: false,
        displayMode: block,
      });
    }
  }, [formula, block]);
  
  return (
    <div 
      ref={containerRef} 
      className={`${block ? 'formula' : 'inline-formula'} ${className}`}
    />
  );
} 