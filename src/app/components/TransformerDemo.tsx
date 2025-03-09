'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TransformerDemoProps {
  isActive: boolean;
}

// Sample prompts for the demo
const samplePrompts = [
  "The transformer architecture is",
  "Natural language processing has",
  "Deep learning models can",
  "Attention mechanisms allow"
];

// Sample completions (simulating transformer output)
const getCompletions = (prompt: string): string[] => {
  // In a real application, this would call an API to a transformer model
  const completions: Record<string, string[]> = {
    "The transformer architecture is": [
      " revolutionary for NLP tasks",
      " based on self-attention mechanisms",
      " more efficient than RNN-based models",
      " capable of parallel processing"
    ],
    "Natural language processing has": [
      " evolved significantly with transformers",
      " applications in many industries",
      " become more accessible to developers",
      " improved machine translation systems"
    ],
    "Deep learning models can": [
      " process vast amounts of data",
      " learn complex patterns automatically",
      " transform how we interact with technology",
      " be fine-tuned for specific tasks"
    ],
    "Attention mechanisms allow": [
      " models to focus on relevant information",
      " for better handling of long sequences",
      " direct connections between input tokens",
      " parallel computation of representations"
    ]
  };
  
  return completions[prompt] || [
    " revolutionized natural language processing",
    " changed how we approach AI",
    " enabled more efficient training",
    " eliminated the need for recurrence"
  ];
};

export default function TransformerDemo({ isActive }: TransformerDemoProps) {
  const [prompt, setPrompt] = useState<string>(samplePrompts[0]);
  const [completions, setCompletions] = useState<string[]>([]);
  const [selectedCompletion, setSelectedCompletion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [typedOutput, setTypedOutput] = useState<string>("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle prompt change
  const handlePromptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrompt(e.target.value);
    setCompletions([]);
    setSelectedCompletion(null);
    setTypedOutput("");
  };
  
  // Generate completions
  const handleGenerate = () => {
    setIsGenerating(true);
    setCompletions([]);
    setSelectedCompletion(null);
    setTypedOutput("");
    
    // Simulate API call delay
    setTimeout(() => {
      setCompletions(getCompletions(prompt));
      setIsGenerating(false);
    }, 1500);
  };
  
  // Select a completion and start typing animation
  const handleSelectCompletion = (completion: string) => {
    setSelectedCompletion(completion);
    setTypedOutput("");
    
    // Clear any existing interval
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    
    // Start typing animation
    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      if (i <= completion.length) {
        setTypedOutput(completion.substring(0, i));
        i++;
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
      }
    }, 50);
  };
  
  // Clear typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);
  
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Interactive Transformer Demo</h3>
      
      <div className="space-y-6">
        {/* Prompt Selection */}
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium mb-2">Select a prompt:</label>
          <select
            id="prompt"
            className="w-full p-2 border rounded-md bg-white dark:bg-slate-700 border-gray-300 dark:border-gray-600"
            value={prompt}
            onChange={handlePromptChange}
          >
            {samplePrompts.map((p, idx) => (
              <option key={idx} value={p}>{p}</option>
            ))}
          </select>
        </div>
        
        {/* Generate Button */}
        <div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              isGenerating 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : "Generate Completions"}
          </button>
        </div>
        
        {/* Completions */}
        {completions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Select a completion:</h4>
            <div className="space-y-2">
              {completions.map((completion, idx) => (
                <motion.div
                  key={idx}
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                    selectedCompletion === completion
                      ? 'bg-indigo-50 border-indigo-300 dark:bg-indigo-900/30 dark:border-indigo-700'
                      : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                  }`}
                  onClick={() => handleSelectCompletion(completion)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <span className="font-mono text-sm">{completion}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Final Output */}
        {selectedCompletion && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-sm font-medium mb-2">Final output:</h4>
            <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-md">
              <p className="font-mono">
                <span className="text-gray-800 dark:text-gray-200">{prompt}</span>
                <span className="text-indigo-600 dark:text-indigo-400">{typedOutput}</span>
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 