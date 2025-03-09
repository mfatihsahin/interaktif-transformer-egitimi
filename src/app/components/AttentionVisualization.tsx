'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AttentionVisualizationProps {
  isActive: boolean;
}

// Sample text for attention visualization
const sourceText = ["The", "transformer", "model", "revolutionized", "natural", "language", "processing"];
const targetText = ["Das", "Transformer", "Modell", "revolutionierte", "die", "Verarbeitung", "natürlicher", "Sprache"];

export default function AttentionVisualization({ isActive }: AttentionVisualizationProps) {
  const [activeSourceIndex, setActiveSourceIndex] = useState<number | null>(null);
  const [activeTargetIndex, setActiveTargetIndex] = useState<number | null>(null);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([]);
  
  // Generate random attention weights on component mount
  useEffect(() => {
    if (!isActive) return;
    
    const weights = sourceText.map(() => {
      return targetText.map(() => Math.random());
    });
    
    // Normalize weights per source token
    const normalizedWeights = weights.map(row => {
      const sum = row.reduce((a, b) => a + b, 0);
      return row.map(weight => weight / sum);
    });
    
    setAttentionWeights(normalizedWeights);
  }, [isActive]);
  
  // Function to handle hovering over a source token
  const handleSourceHover = (index: number) => {
    setActiveSourceIndex(index);
    // Simulate a delay before setting the target with highest attention
    setTimeout(() => {
      if (attentionWeights[index]) {
        const maxWeightIndex = attentionWeights[index].indexOf(
          Math.max(...attentionWeights[index])
        );
        setActiveTargetIndex(maxWeightIndex);
      }
    }, 300);
  };
  
  // Function to reset active indices
  const handleMouseLeave = () => {
    setActiveSourceIndex(null);
    setActiveTargetIndex(null);
  };
  
  // Calculate the color intensity based on attention weight
  const getColorIntensity = (sourceIdx: number, targetIdx: number) => {
    if (!attentionWeights[sourceIdx]) return 'rgba(79, 70, 229, 0)';
    const weight = attentionWeights[sourceIdx][targetIdx];
    return `rgba(79, 70, 229, ${weight.toFixed(2)})`;
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Attention Visualization</h3>
      
      {/* Source tokens */}
      <div className="flex flex-wrap gap-2 mb-8" onMouseLeave={handleMouseLeave}>
        {sourceText.map((token, index) => (
          <motion.div
            key={`source-${index}`}
            className={`px-3 py-1.5 rounded-md cursor-pointer border transition-all ${
              activeSourceIndex === index 
                ? 'bg-indigo-100 border-indigo-500 dark:bg-indigo-900 dark:border-indigo-400' 
                : 'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
            }`}
            onMouseEnter={() => handleSourceHover(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {token}
          </motion.div>
        ))}
      </div>
      
      {/* Attention lines */}
      {isActive && activeSourceIndex !== null && (
        <div className="relative h-20">
          {targetText.map((_, targetIdx) => (
            <motion.div
              key={`line-${targetIdx}`}
              className="absolute left-0 right-0 h-0.5 transform origin-left"
              style={{
                top: `${(targetIdx / targetText.length) * 100}%`,
                backgroundColor: getColorIntensity(activeSourceIndex, targetIdx),
                opacity: activeTargetIndex === targetIdx ? 1 : 0.3,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      )}
      
      {/* Target tokens */}
      <div className="flex flex-wrap gap-2">
        {targetText.map((token, index) => (
          <motion.div
            key={`target-${index}`}
            className={`px-3 py-1.5 rounded-md border transition-all ${
              activeTargetIndex === index 
                ? 'bg-indigo-100 border-indigo-500 dark:bg-indigo-900 dark:border-indigo-400' 
                : 'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 + 0.3 }}
          >
            {token}
          </motion.div>
        ))}
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
        Hover over the source tokens (English) to see how they attend to the target tokens (German).
        The intensity of the connection represents the attention weight.
      </p>
    </div>
  );
} 