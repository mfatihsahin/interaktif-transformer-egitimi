'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RNNVisualizationProps {
  isActive: boolean;
}

export default function RNNVisualization({ isActive }: RNNVisualizationProps) {
  const [step, setStep] = useState(0);
  const [showVanishingGradient, setShowVanishingGradient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // Animation speed in ms

  const sequence = ["The", "transformer", "architecture", "was", "created", "to", "address", "limitations", "of", "RNNs"];
  const maxSteps = sequence.length;

  // Control automatic playback
  useEffect(() => {
    if (!isActive) return;
    
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setStep(prev => {
          if (prev >= maxSteps - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, speed);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isActive, maxSteps, speed]);

  // Handle step change
  const handleStepChange = (newStep: number) => {
    setStep(newStep);
    setIsPlaying(false);
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Reset animation
  const resetAnimation = () => {
    setStep(0);
    setIsPlaying(false);
  };

  // Calculate gradient strength (simplistic model for visualization)
  const getGradientStrength = (currentIndex: number, tokenIndex: number) => {
    if (!showVanishingGradient) return 1;
    
    // Calculate distance from current token
    const distance = Math.abs(currentIndex - tokenIndex);
    
    // Exponential decay to simulate vanishing gradient
    return Math.exp(-distance * 0.5);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2">RNN Sequential Processing</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Watch how RNNs process tokens one by one, maintaining a hidden state that gets updated with each token.
      </p>
      
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button 
          onClick={togglePlay} 
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button 
          onClick={resetAnimation} 
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
        >
          Reset
        </button>
        <div className="flex items-center">
          <label className="text-sm mr-2">Speed:</label>
          <select 
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-2 py-1 bg-white dark:bg-slate-700 border rounded-md"
          >
            <option value={2000}>Slow</option>
            <option value={1000}>Normal</option>
            <option value={500}>Fast</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="text-sm flex items-center">
            <input 
              type="checkbox" 
              checked={showVanishingGradient} 
              onChange={() => setShowVanishingGradient(!showVanishingGradient)}
              className="mr-2"
            />
            Show Vanishing Gradient
          </label>
        </div>
      </div>
      
      {/* Sequence display */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-md overflow-x-auto">
        <div className="flex min-w-max">
          {sequence.map((token, index) => (
            <motion.div
              key={`token-${index}`}
              className={`px-3 py-2 m-1 rounded-md border ${
                index === step 
                  ? 'bg-indigo-100 border-indigo-500 dark:bg-indigo-900 dark:border-indigo-400' 
                  : index < step 
                    ? 'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600' 
                    : 'bg-white border-gray-200 dark:bg-slate-800 dark:border-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {token}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* RNN Cell Visualization */}
      <div className="relative h-80 bg-gray-50 dark:bg-slate-700 rounded-md p-4 overflow-hidden">
        {/* Hidden State */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 top-8 w-40 h-16 rounded-lg bg-green-500 flex items-center justify-center text-white font-medium"
          animate={{ 
            backgroundColor: step > 0 ? "#10B981" : "#D1D5DB", // Green if active, gray if not
            x: [null, 10, 0, -10, 0], // Subtle animation on state update
          }}
          transition={{ 
            duration: 0.5,
            x: { duration: 0.3, repeat: step === sequence.length - 1 ? 0 : 1, repeatType: "reverse" }
          }}
        >
          Hidden State
          <span className="absolute -bottom-6 text-xs text-gray-600 dark:text-gray-400">
            h<sub>{step}</sub>
          </span>
        </motion.div>
        
        {/* Current token indicator */}
        {step < sequence.length && (
          <motion.div 
            className="absolute left-8 top-40 px-4 py-2 rounded-md bg-indigo-600 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            key={`current-${step}`}
          >
            Current Token: {sequence[step]}
          </motion.div>
        )}
        
        {/* RNN Cell */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 top-40 w-32 h-32 rounded-full border-4 border-purple-500 flex items-center justify-center bg-white dark:bg-slate-800"
          animate={{ 
            borderColor: step < sequence.length ? "#8B5CF6" : "#D1D5DB", // Purple if active, gray if done
            rotate: step < sequence.length ? [0, 5, 0, -5, 0] : 0, // Subtle rotation on processing
          }}
          transition={{ duration: 0.5, rotate: { duration: 0.3, repeat: 1, repeatType: "reverse" } }}
        >
          <div className="text-center">
            <div className="font-medium">RNN Cell</div>
            {step < sequence.length ? (
              <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">Processing...</div>
            ) : (
              <div className="text-xs mt-1 text-green-600 dark:text-green-400">Complete</div>
            )}
          </div>
        </motion.div>
        
        {/* Arrows showing flow */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Arrow from hidden state to RNN */}
          <motion.path 
            d="M 200,80 L 200,130" 
            stroke="#10B981" 
            strokeWidth="2" 
            fill="none" 
            markerEnd="url(#arrowhead)"
            animate={{ opacity: step > 0 ? 1 : 0.3 }}
          />
          
          {/* Arrow from RNN back to hidden state */}
          <motion.path 
            d="M 220,130 L 220,80" 
            stroke="#8B5CF6" 
            strokeWidth="2" 
            fill="none" 
            markerEnd="url(#arrowhead)"
            animate={{ opacity: step > 0 ? 1 : 0.3 }}
          />
          
          {/* Define arrowhead marker */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
          </defs>
        </svg>
        
        {/* Gradient loss visualization */}
        {showVanishingGradient && step > 0 && (
          <div className="absolute left-0 bottom-4 w-full">
            <div className="text-xs text-center mb-2 text-gray-600 dark:text-gray-400">
              Gradient Strength (backpropagation)
            </div>
            <div className="flex justify-center gap-1">
              {sequence.slice(0, step + 1).map((_, index) => {
                const strength = getGradientStrength(step, index);
                return (
                  <motion.div
                    key={`gradient-${index}`}
                    className="h-4 w-8 rounded-sm"
                    style={{ 
                      backgroundColor: `rgba(139, 92, 246, ${strength})`,
                      transform: `scaleY(${Math.max(0.2, strength)})`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </div>
            <div className="flex justify-center gap-1 mt-1">
              {sequence.slice(0, step + 1).map((token, index) => (
                <div key={`token-grad-${index}`} className="text-xs w-8 text-center truncate">
                  {token}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Step indicator */}
      <div className="mt-6 flex flex-col items-center">
        <div className="text-sm mb-2">
          Step: {step} / {maxSteps}
        </div>
        <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${(step / maxSteps) * 100}%` }}
          ></div>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {Array.from({ length: maxSteps + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleStepChange(idx)}
              className={`w-8 h-8 rounded-full ${
                step === idx 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {idx}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 