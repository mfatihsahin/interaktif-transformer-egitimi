'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MultiHeadAttentionProps {
  isActive: boolean;
}

// Define the number of attention heads
const NUM_HEADS = 4;
const COLORS = [
  'rgb(239, 68, 68)', // red
  'rgb(16, 185, 129)', // green
  'rgb(59, 130, 246)', // blue
  'rgb(139, 92, 246)', // purple
];

export default function MultiHeadAttention({ isActive }: MultiHeadAttentionProps) {
  const [activeHead, setActiveHead] = useState<number | null>(null);
  
  const handleHeadClick = (headIndex: number) => {
    setActiveHead(activeHead === headIndex ? null : headIndex);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Multi-Head Attention</h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Click on an attention head to see what it focuses on in the input sequence.
        Each head specializes in different aspects of the input.
      </p>
      
      {/* Attention Heads */}
      <div className="flex justify-center gap-4 mb-8">
        {Array.from({ length: NUM_HEADS }).map((_, index) => (
          <motion.button
            key={`head-${index}`}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-medium transition-transform ${
              activeHead === index ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-slate-800' : ''
            }`}
            style={{ 
              backgroundColor: COLORS[index],
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              transform: activeHead === index ? 'scale(1.1)' : 'scale(1)'
            }}
            onClick={() => handleHeadClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            Head {index + 1}
          </motion.button>
        ))}
      </div>
      
      {/* Input Sequence */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-2">Input Sequence</h4>
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-slate-700 rounded-md">
          {[
            "The", "multi-head", "attention", "allows", "the", "model", "to", 
            "focus", "on", "different", "positions", "simultaneously"
          ].map((token, index) => (
            <motion.div
              key={`token-${index}`}
              className={`px-3 py-1.5 rounded-md border 
                ${activeHead !== null ? 'relative' : ''}
                bg-white dark:bg-slate-600 border-gray-200 dark:border-gray-500`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              {token}
              
              {/* Highlight indicator based on active head */}
              {activeHead !== null && (
                <motion.div 
                  className="absolute inset-0 rounded-md opacity-30"
                  style={{ 
                    backgroundColor: COLORS[activeHead],
                    // Randomize which tokens each head focuses on
                    opacity: ((index + activeHead) % 3 === 0) || 
                            ((index + activeHead) % 5 === 0) ? 0.3 : 0
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: ((index + activeHead) % 3 === 0) || 
                                    ((index + activeHead) % 5 === 0) ? 0.3 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Multi-Head Attention Visualization */}
      <div>
        <h4 className="text-sm font-medium mb-2">What Each Head Focuses On</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COLORS.map((color, index) => (
            <motion.div
              key={`focus-${index}`}
              className={`p-4 rounded-md border transition-all ${
                activeHead === index 
                  ? 'border-2 border-current shadow-lg' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              style={{ 
                color: COLORS[index],
                opacity: activeHead === null || activeHead === index ? 1 : 0.5
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: activeHead === null || activeHead === index ? 1 : 0.5, 
                scale: 1 
              }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="font-medium mb-1">Head {index + 1}</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {index === 0 && "Focuses on subject-verb relationships"}
                {index === 1 && "Attends to adjacent tokens and local context"}
                {index === 2 && "Focuses on semantic relationships between entities"}
                {index === 3 && "Looks at long-range dependencies in the sentence"}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Concatenated Output Visualization */}
      {activeHead !== null && (
        <motion.div 
          className="mt-8 p-4 bg-gray-50 dark:bg-slate-700 rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h4 className="text-sm font-medium mb-2">Concatenated Attention Outputs</h4>
          <div className="flex items-center justify-center">
            {Array.from({ length: NUM_HEADS }).map((_, index) => (
              <motion.div
                key={`output-${index}`}
                className="h-8 flex items-center justify-center text-white text-xs"
                style={{ 
                  width: `${100 / NUM_HEADS}%`,
                  backgroundColor: COLORS[index],
                  opacity: activeHead === null || activeHead === index ? 1 : 0.5
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                Head {index + 1}
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">
            The outputs from all heads are concatenated and fed through a linear projection
          </p>
        </motion.div>
      )}
    </div>
  );
} 