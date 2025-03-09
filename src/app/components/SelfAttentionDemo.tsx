'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SelfAttentionDemoProps {
  isActive: boolean;
}

// Sample sentence for self-attention visualization
const sentence = ["The", "transformer", "architecture", "uses", "self-attention", "to", "process", "sequences"];

export default function SelfAttentionDemo({ isActive }: SelfAttentionDemoProps) {
  const [activeTokenIndex, setActiveTokenIndex] = useState<number | null>(null);
  const [attentionMatrix, setAttentionMatrix] = useState<number[][]>([]);
  
  // Initialize attention matrix when component becomes active
  useEffect(() => {
    if (!isActive) return;
    
    // Create a random attention matrix (would be computed by the model in reality)
    const matrix = sentence.map(() => {
      return sentence.map(() => Math.random());
    });
    
    // Normalize the matrix rows so they sum to 1
    const normalizedMatrix = matrix.map(row => {
      const sum = row.reduce((a, b) => a + b, 0);
      return row.map(weight => weight / sum);
    });
    
    setAttentionMatrix(normalizedMatrix);
  }, [isActive]);
  
  const handleTokenHover = (index: number) => {
    setActiveTokenIndex(index);
  };
  
  const handleMouseLeave = () => {
    setActiveTokenIndex(null);
  };
  
  const getAttentionOpacity = (fromIdx: number, toIdx: number) => {
    if (activeTokenIndex === null || !attentionMatrix[fromIdx]) return 0;
    if (fromIdx !== activeTokenIndex) return 0;
    
    // Return the attention weight
    return attentionMatrix[fromIdx][toIdx];
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Self-Attention Visualization</h3>
      
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Hover over a token to see how it attends to other tokens in the sequence.
        </p>
        
        {/* Tokens display */}
        <div className="relative w-full py-10" onMouseLeave={handleMouseLeave}>
          <div className="flex justify-center flex-wrap gap-2 mb-4">
            {sentence.map((token, index) => (
              <motion.div
                key={`token-${index}`}
                className={`px-3 py-2 rounded-md cursor-pointer border transition-all ${
                  activeTokenIndex === index 
                    ? 'bg-purple-100 border-purple-500 dark:bg-purple-900 dark:border-purple-400'
                    : 'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                }`}
                onMouseEnter={() => handleTokenHover(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {token}
              </motion.div>
            ))}
          </div>
          
          {/* Attention lines */}
          {isActive && activeTokenIndex !== null && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {sentence.map((_, toIdx) => {
                const attention = getAttentionOpacity(activeTokenIndex, toIdx);
                return (
                  <motion.div
                    key={`attention-${activeTokenIndex}-${toIdx}`}
                    className="absolute h-1 rounded-full bg-purple-500"
                    style={{
                      opacity: attention,
                      top: `calc(50% - 0.5px)`,
                      // Calculate positions based on index
                      left: `calc(${(activeTokenIndex / sentence.length) * 50 + 25}% - 2rem)`,
                      width: `calc(${Math.abs(toIdx - activeTokenIndex) / sentence.length * 100}% + 4rem)`,
                      transform: toIdx > activeTokenIndex ? 'none' : 'scaleX(-1)',
                      transformOrigin: toIdx > activeTokenIndex ? 'left' : 'right',
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                );
              })}
            </div>
          )}
        </div>
        
        {/* Attention Weights Matrix Visualization */}
        {isActive && activeTokenIndex !== null && (
          <motion.div 
            className="mt-6 overflow-x-auto w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-sm font-medium mb-2">Attention Weights from "{sentence[activeTokenIndex]}"</h4>
            <div className="flex gap-2">
              {sentence.map((token, idx) => {
                const weight = attentionMatrix[activeTokenIndex]?.[idx] || 0;
                return (
                  <div key={`weight-${idx}`} className="flex flex-col items-center">
                    <div 
                      className="w-10 h-10 rounded-md flex items-center justify-center text-xs"
                      style={{ 
                        backgroundColor: `rgba(139, 92, 246, ${weight.toFixed(2)})`,
                        color: weight > 0.5 ? 'white' : 'black' 
                      }}
                    >
                      {weight.toFixed(2)}
                    </div>
                    <div className="text-xs mt-1 truncate max-w-10">{token}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 