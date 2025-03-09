'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MathFormula from './MathFormula';

interface RNNVariantsComparisonProps {
  isActive: boolean;
}

type ModelVariant = 'rnn' | 'lstm' | 'gru' | 'transformer';

interface ModelInfo {
  name: string;
  description: string;
  formula: string;
  advantages: string[];
  limitations: string[];
  year: number;
  complexity: number; // 1-10 scale
  parallelization: number; // 1-10 scale
  longRangeDependency: number; // 1-10 scale
}

export default function RNNVariantsComparison({ isActive }: RNNVariantsComparisonProps) {
  const [activeVariant, setActiveVariant] = useState<ModelVariant>('rnn');
  
  const modelData: Record<ModelVariant, ModelInfo> = {
    rnn: {
      name: 'Vanilla RNN',
      description: 'Basic recurrent neural network that processes sequences one token at a time, maintaining a hidden state.',
      formula: 'h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)',
      advantages: [
        'Simple architecture',
        'Efficient for short sequences',
        'Minimal parameter count'
      ],
      limitations: [
        'Vanishing/exploding gradients',
        'Difficulty capturing long-range dependencies',
        'Sequential processing (slow)',
        'Fixed-size hidden state'
      ],
      year: 1986,
      complexity: 3,
      parallelization: 1,
      longRangeDependency: 2
    },
    lstm: {
      name: 'LSTM (Long Short-Term Memory)',
      description: 'Enhanced RNN with gating mechanisms to better control information flow and address vanishing gradients.',
      formula: '\\begin{aligned} f_t &= \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f) \\\\ i_t &= \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i) \\\\ \\tilde{C}_t &= \\tanh(W_C \\cdot [h_{t-1}, x_t] + b_C) \\\\ C_t &= f_t * C_{t-1} + i_t * \\tilde{C}_t \\\\ o_t &= \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o) \\\\ h_t &= o_t * \\tanh(C_t) \\end{aligned}',
      advantages: [
        'Better at capturing long dependencies',
        'Addresses vanishing gradient problem',
        'Separate memory cell (C_t)',
        'Control gates for information flow'
      ],
      limitations: [
        'Still sequential processing',
        'Complex architecture',
        'Higher computational cost',
        'Still limited context window'
      ],
      year: 1997,
      complexity: 7,
      parallelization: 1,
      longRangeDependency: 6
    },
    gru: {
      name: 'GRU (Gated Recurrent Unit)',
      description: 'Simplified version of LSTM with fewer parameters but similar performance on many tasks.',
      formula: '\\begin{aligned} z_t &= \\sigma(W_z \\cdot [h_{t-1}, x_t] + b_z) \\\\ r_t &= \\sigma(W_r \\cdot [h_{t-1}, x_t] + b_r) \\\\ \\tilde{h}_t &= \\tanh(W \\cdot [r_t * h_{t-1}, x_t] + b) \\\\ h_t &= (1 - z_t) * h_{t-1} + z_t * \\tilde{h}_t \\end{aligned}',
      advantages: [
        'Simpler than LSTM (fewer parameters)',
        'Good long-term dependency capture',
        'Update and reset gates',
        'Often comparable performance to LSTM'
      ],
      limitations: [
        'Still sequential processing',
        'Limited parallelization',
        'Fixed computational path',
        'Still has context limitations'
      ],
      year: 2014,
      complexity: 6,
      parallelization: 1,
      longRangeDependency: 5
    },
    transformer: {
      name: 'Transformer',
      description: 'Attention-based architecture that processes all tokens in parallel and directly models relationships between any positions.',
      formula: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V',
      advantages: [
        'Full parallelization during training',
        'Direct connections between any positions',
        'Multi-head attention for different relationships',
        'No information bottleneck',
        'State-of-the-art performance'
      ],
      limitations: [
        'Quadratic complexity with sequence length',
        'Higher memory requirements',
        'Lacks built-in sequence order understanding',
        'Requires positional encodings'
      ],
      year: 2017,
      complexity: 8,
      parallelization: 9,
      longRangeDependency: 9
    }
  };
  
  const handleVariantChange = (variant: ModelVariant) => {
    setActiveVariant(variant);
  };
  
  const currentModel = modelData[activeVariant];
  
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Technical Comparison: RNN Variants vs. Transformers</h3>
      
      {/* Model selector tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {(Object.keys(modelData) as ModelVariant[]).map((variant) => (
          <button
            key={variant}
            onClick={() => handleVariantChange(variant)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeVariant === variant
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {modelData[variant].name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column - Model details */}
        <div>
          <motion.div
            key={activeVariant}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <h4 className="text-xl font-semibold mb-1">{currentModel.name}</h4>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Introduced around {currentModel.year}
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {currentModel.description}
              </p>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Key Equation</h5>
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md overflow-x-auto">
                <MathFormula formula={currentModel.formula} block />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2 text-green-600 dark:text-green-400">Advantages</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {currentModel.advantages.map((advantage, idx) => (
                    <li key={idx}>{advantage}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium mb-2 text-red-600 dark:text-red-400">Limitations</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {currentModel.limitations.map((limitation, idx) => (
                    <li key={idx}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right column - Performance metrics */}
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-4">Performance Comparison</h4>
          
          {/* Model complexity */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Computational Complexity</span>
              <span className="text-sm font-medium">{currentModel.complexity}/10</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <motion.div 
                className="bg-blue-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentModel.complexity / 10) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {activeVariant === 'transformer' ? 
                'Higher complexity but with significant performance benefits' :
                'Lower complexity but also lower performance ceiling'}
            </div>
          </div>
          
          {/* Parallelization */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Parallelization Capability</span>
              <span className="text-sm font-medium">{currentModel.parallelization}/10</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <motion.div 
                className="bg-purple-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentModel.parallelization / 10) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {activeVariant === 'transformer' ? 
                'All tokens processed in parallel during training, significant speed advantage' :
                'Sequential processing limits parallelization and training speed'}
            </div>
          </div>
          
          {/* Long-range dependencies */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Long-Range Dependency Modeling</span>
              <span className="text-sm font-medium">{currentModel.longRangeDependency}/10</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <motion.div 
                className="bg-green-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentModel.longRangeDependency / 10) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {activeVariant === 'transformer' ? 
                'Direct attention connections enable excellent long-range dependency modeling' :
                'Information must flow through many timesteps, weakening long-range connections'}
            </div>
          </div>
          
          {/* Timeline visualization - When Transformer appears */}
          <div className="mt-8">
            <h4 className="text-sm font-medium mb-2">Timeline of Development</h4>
            <div className="relative h-12 bg-gray-200 dark:bg-gray-600 rounded-md">
              {/* Timeline markers */}
              {(Object.keys(modelData) as ModelVariant[]).map((variant) => {
                const position = ((modelData[variant].year - 1985) / (2020 - 1985)) * 100;
                return (
                  <motion.div
                    key={variant}
                    className={`absolute bottom-0 transform -translate-x-1/2 ${
                      activeVariant === variant 
                        ? 'z-10' : 'z-0'
                    }`}
                    style={{ left: `${position}%` }}
                    initial={{ y: 20 }}
                    animate={{ y: activeVariant === variant ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className={`h-4 w-4 rounded-full ${
                        activeVariant === variant 
                          ? 'bg-indigo-600' 
                          : 'bg-gray-400 dark:bg-gray-500'
                      }`} 
                    />
                    <div 
                      className={`text-xs font-medium mt-1 ${
                        activeVariant === variant 
                          ? 'text-indigo-600 dark:text-indigo-400' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {modelData[variant].year}
                    </div>
                    <div 
                      className={`text-[10px] whitespace-nowrap ${
                        activeVariant === variant 
                          ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {modelData[variant].name}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Key insight for Transformers */}
      {activeVariant === 'transformer' && (
        <motion.div 
          className="mt-6 p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="font-medium mb-2">Key Innovation of Transformers</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            The fundamental breakthrough of the Transformer architecture is replacing sequential processing with 
            <strong> self-attention</strong>, allowing direct modeling of relationships between any positions in the sequence. 
            This eliminates the need for information to flow through intermediate states, enabling better parallelization 
            and more effective modeling of long-range dependencies.
          </p>
        </motion.div>
      )}
    </div>
  );
} 