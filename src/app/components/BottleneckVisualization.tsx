'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BottleneckVisualizationProps {
  isActive: boolean;
}

const SOURCE_SENTENCE = [
  "The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog", 
  "while", "the", "cat", "watches", "from", "a", "comfortable", "distance"
];

const TARGET_SENTENCE = [
  "Der", "schnelle", "braune", "Fuchs", "springt", "über", "den", "faulen", "Hund", 
  "während", "die", "Katze", "aus", "einer", "bequemen", "Entfernung", "zuschaut"
];

export default function BottleneckVisualization({ isActive }: BottleneckVisualizationProps) {
  const [activeStage, setActiveStage] = useState(0);
  const [longSequence, setLongSequence] = useState(false);
  const [showInfoLoss, setShowInfoLoss] = useState(false);
  
  const sourceText = longSequence ? SOURCE_SENTENCE : SOURCE_SENTENCE.slice(0, 6);
  const targetText = longSequence ? TARGET_SENTENCE : TARGET_SENTENCE.slice(0, 6);
  
  // Reset visualization when it becomes active
  useEffect(() => {
    if (isActive) {
      setActiveStage(0);
    }
  }, [isActive]);
  
  // Progress to next stage when button is clicked
  const handleNextStage = () => {
    setActiveStage(prev => Math.min(prev + 1, 3));
  };
  
  // Reset to beginning
  const handleReset = () => {
    setActiveStage(0);
  };
  
  // Toggle sequence length
  const handleToggleSequenceLength = () => {
    setLongSequence(prev => !prev);
    // Reset animation when changing sequence length
    setActiveStage(0);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2">The Information Bottleneck Problem</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        See how traditional encoder-decoder models compress all input information into a fixed-size context vector,
        creating a bottleneck that loses information, especially with longer sequences.
      </p>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <button 
          onClick={handleToggleSequenceLength} 
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
        >
          {longSequence ? 'Use Short Sequence' : 'Use Long Sequence'}
        </button>
        <label className="inline-flex items-center">
          <input 
            type="checkbox" 
            checked={showInfoLoss} 
            onChange={() => setShowInfoLoss(!showInfoLoss)}
            className="mr-2"
          />
          <span className="text-sm">Show Information Loss</span>
        </label>
      </div>
      
      <div className="relative h-96 bg-gray-50 dark:bg-slate-700 rounded-md p-4 overflow-hidden">
        {/* Source sentence (input) */}
        <div className="absolute top-4 left-4 w-1/2 pr-4">
          <div className="text-sm font-medium mb-2">Source Sentence (Input)</div>
          <div className="flex flex-wrap gap-1">
            {sourceText.map((token, idx) => (
              <motion.div
                key={`source-${idx}`}
                className={`px-2 py-1 text-sm rounded-md ${
                  activeStage >= 1 
                    ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-800'
                    : 'bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700'
                }`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1, 
                  y: activeStage >= 1 && activeStage < 3 ? [-5, 0] : 0 
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: activeStage >= 1 ? idx * 0.05 : 0,
                  y: { repeat: activeStage === 1 ? Infinity : 0, repeatType: "reverse", duration: 0.5 } 
                }}
              >
                {token}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Target sentence (output) */}
        <div className="absolute top-4 right-4 w-1/2 pl-4 text-right">
          <div className="text-sm font-medium mb-2">Target Sentence (Output)</div>
          <div className="flex flex-wrap gap-1 justify-end">
            {targetText.map((token, idx) => (
              <motion.div
                key={`target-${idx}`}
                className={`px-2 py-1 text-sm rounded-md ${
                  activeStage >= 3
                    ? 'bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-800'
                    : 'bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700'
                }`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeStage >= 3 ? 1 : 0.3,
                  y: activeStage >= 3 ? [5, 0] : 0
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: activeStage >= 3 ? idx * 0.1 : 0 
                }}
              >
                {token}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Encoder */}
        <motion.div
          className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500 dark:bg-blue-700 rounded-lg flex items-center justify-center text-white font-medium"
          animate={{ 
            scale: activeStage >= 1 ? [1, 1.05, 1] : 1,
            backgroundColor: activeStage >= 1 ? "#3B82F6" : "#93C5FD"
          }}
          transition={{ 
            duration: 0.5,
            scale: { repeat: activeStage === 1 ? Infinity : 0, repeatType: "reverse", duration: 1 }
          }}
        >
          Encoder
        </motion.div>
        
        {/* Decoder */}
        <motion.div
          className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500 dark:bg-purple-700 rounded-lg flex items-center justify-center text-white font-medium"
          animate={{ 
            scale: activeStage >= 3 ? [1, 1.05, 1] : 1,
            backgroundColor: activeStage >= 3 ? "#8B5CF6" : "#C4B5FD"
          }}
          transition={{ 
            duration: 0.5,
            scale: { repeat: activeStage === 3 ? Infinity : 0, repeatType: "reverse", duration: 1 }
          }}
        >
          Decoder
        </motion.div>
        
        {/* Context Vector */}
        <motion.div
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-green-500 dark:bg-green-700 rounded-full flex items-center justify-center text-white text-sm text-center"
          initial={{ scale: 0 }}
          animate={{ 
            scale: activeStage >= 2 ? 1 : 0,
            backgroundColor: activeStage >= 2 ? (showInfoLoss && longSequence ? "#EF4444" : "#10B981") : "#D1FAE5"
          }}
          transition={{ duration: 0.5 }}
        >
          Context Vector
          {showInfoLoss && longSequence && activeStage >= 2 && (
            <motion.div 
              className="absolute -bottom-6 text-xs text-red-600 dark:text-red-400 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Information Lost!
            </motion.div>
          )}
        </motion.div>
        
        {/* Information flow arrows */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Arrow from encoder to context vector */}
          <motion.path 
            d="M 110,120 L 190,120" 
            stroke={activeStage >= 2 ? "#10B981" : "#D1D5DB"}
            strokeWidth="3"
            strokeDasharray={activeStage >= 2 ? "0" : "5,5"}
            fill="none" 
            markerEnd="url(#arrowhead)"
            animate={{ 
              opacity: activeStage >= 1 ? 1 : 0.3,
              stroke: activeStage >= 2 ? (showInfoLoss && longSequence ? "#EF4444" : "#10B981") : "#D1D5DB"
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Arrow from context vector to decoder */}
          <motion.path 
            d="M 210,120 L 290,120" 
            stroke={activeStage >= 3 ? "#8B5CF6" : "#D1D5DB"}
            strokeWidth="3"
            strokeDasharray={activeStage >= 3 ? "0" : "5,5"}
            fill="none" 
            markerEnd="url(#arrowhead)"
            animate={{ 
              opacity: activeStage >= 2 ? 1 : 0.3,
              stroke: activeStage >= 3 ? (showInfoLoss && longSequence ? "#EF4444" : "#8B5CF6") : "#D1D5DB"
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Information loss visualization */}
          {showInfoLoss && longSequence && activeStage >= 2 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {sourceText.slice(6).map((_, idx) => (
                <motion.circle
                  key={`info-loss-${idx}`}
                  cx={125 + (idx % 5) * 10}
                  cy={100 - Math.floor(idx / 5) * 10}
                  r="3"
                  fill="#EF4444"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    y: [0, 30, 60, 100]
                  }}
                  transition={{ 
                    delay: 0.5 + idx * 0.1,
                    y: { duration: 1.5, ease: "easeIn" },
                    opacity: { duration: 1.5, times: [0, 0.8, 1], values: [1, 1, 0] }
                  }}
                />
              ))}
            </motion.g>
          )}
          
          {/* Define arrowhead marker */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={activeStage >= 3 ? "#8B5CF6" : "#D1D5DB"} />
            </marker>
          </defs>
        </svg>
        
        {/* Decoder output */}
        {activeStage >= 3 && (
          <motion.div
            className="absolute bottom-8 right-1/4 transform translate-x-1/2 w-40 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm font-medium mb-2">Decoder Output</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {showInfoLoss && longSequence ? (
                <>Generating translation with degraded quality due to information loss</>
              ) : (
                <>Generating translation token by token</>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Problem explanation */}
        {longSequence && showInfoLoss && activeStage >= 2 && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-xs text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">The Bottleneck Problem</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              A fixed-size context vector struggles to retain all information from longer sequences,
              resulting in degraded translation quality.
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Controls */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
          disabled={activeStage === 0}
        >
          Reset
        </button>
        
        <div className="text-sm">
          Stage: {activeStage} / 3
        </div>
        
        <button
          onClick={handleNextStage}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          disabled={activeStage >= 3}
        >
          Next Stage
        </button>
      </div>
    </div>
  );
} 