'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  name: string;
  color: string;
  description: string;
}

interface AnimatedArchitectureProps {
  activeStep: number;
}

// Define the components of the transformer architecture
const components: ComponentProps[] = [
  {
    name: 'Input Embedding',
    color: 'bg-blue-500',
    description: 'Converts input tokens to vector representations',
  },
  {
    name: 'Positional Encoding',
    color: 'bg-blue-700',
    description: 'Adds positional information to the embeddings',
  },
  {
    name: 'Multi-Head Attention',
    color: 'bg-purple-600',
    description: 'Allows the model to focus on different parts of the input simultaneously',
  },
  {
    name: 'Add & Normalize',
    color: 'bg-gray-500',
    description: 'Residual connection and layer normalization',
  },
  {
    name: 'Feed Forward Network',
    color: 'bg-green-600',
    description: 'Applies non-linear transformations to the attention outputs',
  },
  {
    name: 'Add & Normalize',
    color: 'bg-gray-500',
    description: 'Another residual connection and layer normalization',
  },
  {
    name: 'Output Linear & Softmax',
    color: 'bg-red-600',
    description: 'Produces probabilities for output tokens',
  },
];

export default function AnimatedArchitecture({ activeStep }: AnimatedArchitectureProps) {
  const [animationProgress, setAnimationProgress] = useState(0);
  
  useEffect(() => {
    // Calculate how much of the architecture to reveal based on activeStep
    const progress = Math.min(1, (activeStep + 1) / components.length);
    setAnimationProgress(progress);
  }, [activeStep]);
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-12">
      {/* Architecture Diagram */}
      <div className="relative h-[500px] w-full bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden p-6">
        <div className="flex flex-col h-full justify-between">
          {components.map((component, index) => (
            <motion.div 
              key={`${component.name}-${index}`}
              className={`p-3 rounded-lg shadow-sm ${component.color} text-white relative mb-2`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: index <= activeStep ? 1 : 0.3,
                x: 0,
                scale: index === activeStep ? 1.05 : 1
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="font-medium">{component.name}</h4>
              {index === activeStep && (
                <motion.p 
                  className="text-sm mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {component.description}
                </motion.p>
              )}
              
              {/* Connection line to next component */}
              {index < components.length - 1 && (
                <motion.div 
                  className="absolute left-1/2 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 -mb-2 transform -translate-x-1/2 z-0 origin-top"
                  style={{ height: '20px' }}
                  initial={{ scaleY: 0 }}
                  animate={{ 
                    scaleY: index < activeStep ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                />
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Data flow animation */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.7 }}
        >
          {activeStep > 0 && (
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-yellow-400 shadow-md"
              initial={{ top: '10%', left: '40%' }}
              animate={{ 
                top: ['10%', '90%'],
                left: ['40%', '60%'],
                scale: [1, 1.2, 0.9, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
} 