'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import MathFormula from './components/MathFormula';
import AnimatedArchitecture from './components/AnimatedArchitecture';
import AttentionVisualization from './components/AttentionVisualization';
import SelfAttentionDemo from './components/SelfAttentionDemo';
import MultiHeadAttention from './components/MultiHeadAttention';
import TransformerDemo from './components/TransformerDemo';
import RNNVisualization from './components/RNNVisualization';
import BottleneckVisualization from './components/BottleneckVisualization';
import RNNVariantsComparison from './components/RNNVariantsComparison';

export default function Home() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [activeStep, setActiveStep] = useState(0);
  
  // Refs for each section for scroll detection
  const sectionRefs = {
    introduction: useRef<HTMLDivElement>(null),
    outline: useRef<HTMLDivElement>(null),
    seqModels: useRef<HTMLDivElement>(null),
    attention: useRef<HTMLDivElement>(null),
    architecture: useRef<HTMLDivElement>(null),
    applications: useRef<HTMLDivElement>(null),
    demo: useRef<HTMLDivElement>(null),
  };
  
  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Find the section that is currently in view
      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (!ref.current) return;
        
        const element = ref.current;
        const { offsetTop, offsetHeight } = element;
        
        if (
          scrollPosition >= offsetTop && 
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to a section when clicking on a nav link
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs].current;
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={sectionRefs.introduction}
        id="introduction" 
        className="section-container pt-24 sm:pt-32"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Understanding the <span className="highlight">Transformer</span> Architecture
            </motion.h1>
            <motion.p 
              className="text-lg mb-8 text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A step-by-step visual journey through the architecture that revolutionized natural language processing and beyond.
            </motion.p>
            <motion.div
              className="flex gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button 
                onClick={() => scrollToSection('seqModels')}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
              >
                Begin Learning
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                Jump to Demo
              </button>
            </motion.div>
          </div>
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="aspect-video relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
                Transformers: Attention is All You Need
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Tutorial Outline Section */}
      <section
        ref={sectionRefs.outline}
        id="outline"
        className="section-container py-16 bg-gray-50 dark:bg-slate-900"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tutorial Outline</h2>
          <p className="text-center mb-10 text-gray-700 dark:text-gray-300">
            Follow this step-by-step guide to understand the Transformer architecture from fundamentals to advanced concepts.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div 
              className="card border-l-4 border-blue-500 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-2">1. Sequence-to-Sequence Modeling</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore traditional sequence models like RNNs, LSTMs, and GRUs, their limitations, and why 
                we needed a better architecture. Learn about the information bottleneck problem in encoder-decoder frameworks.
              </p>
              <button
                onClick={() => scrollToSection('seqModels')}
                className="mt-3 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Jump to section →
              </button>
            </motion.div>
            
            <motion.div 
              className="card border-l-4 border-purple-500 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">2. Attention Mechanism</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Understand how attention mechanisms allow models to focus on relevant parts of the input 
                sequence. Visualize attention weights and see how they improve the context encoding.
              </p>
              <button
                onClick={() => scrollToSection('attention')}
                className="mt-3 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Jump to section →
              </button>
            </motion.div>
            
            <motion.div 
              className="card border-l-4 border-green-500 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">3. Self-Attention & Multi-Head Attention</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discover the key innovation of self-attention that allows each position to attend to all positions,
                and how multiple attention heads capture different aspects of relationships between tokens.
              </p>
              <button
                onClick={() => scrollToSection('attention')}
                className="mt-3 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Jump to section →
              </button>
            </motion.div>
            
            <motion.div 
              className="card border-l-4 border-red-500 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-2">4. Transformer Architecture</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore the complete transformer architecture with its encoder-decoder structure,
                positional encodings, feed-forward networks, and the powerful combination of components.
              </p>
              <button
                onClick={() => scrollToSection('architecture')}
                className="mt-3 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Jump to section →
              </button>
            </motion.div>
            
            <motion.div 
              className="card border-l-4 border-yellow-500 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-2">5. Applications & Variants</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn about real-world applications of transformers in NLP, computer vision, and scientific domains.
                Discover popular transformer variants like BERT, GPT, T5, and Vision Transformer.
              </p>
              <button
                onClick={() => scrollToSection('applications')}
                className="mt-3 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Jump to section →
              </button>
            </motion.div>
            
            <motion.div 
              className="card border-l-4 border-indigo-500 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-2">6. Interactive Demo</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Experience transformers in action with an interactive demo that lets you generate text
                and observe how the model processes your inputs to produce meaningful outputs.
              </p>
              <button
                onClick={() => scrollToSection('demo')}
                className="mt-3 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Jump to section →
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sequence Models Section */}
      <section 
        ref={sectionRefs.seqModels}
        id="seq-models" 
        className="section-container"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Sequence-to-Sequence Modeling</h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Sequence-to-sequence models are a class of neural networks designed to transform one sequence into another.
            Before the Transformer architecture, these tasks primarily relied on Recurrent Neural Networks (RNNs) and their variants.
            Let's explore how these models work and the fundamental limitations that motivated the development of Transformers.
          </p>
          
          {/* New Technical Overview section */}
          <div className="card mb-8">
            <h3 className="text-xl font-semibold mb-4">What is Sequence-to-Sequence Learning?</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Sequence-to-sequence (Seq2Seq) learning refers to the task of converting an input sequence into a corresponding output sequence,
              where the lengths of input and output may differ. Applications include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-400">Machine Translation</h4>
                <p className="text-sm">Converting text from one language to another, where grammar and word order may differ significantly.</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-400">Text Summarization</h4>
                <p className="text-sm">Generating a concise summary from a longer document while preserving key information.</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                <h4 className="font-medium mb-2 text-green-700 dark:text-green-400">Speech Recognition</h4>
                <p className="text-sm">Converting audio waveforms into text transcriptions.</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              The core challenge in sequence-to-sequence learning is effectively modeling complex dependencies between 
              input and output elements, regardless of their positions in the sequences. This becomes particularly difficult 
              when dealing with long-range dependencies in natural language.
            </p>
          </div>
          
          {/* RNN Visualization component */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Recurrent Neural Networks (RNNs)</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              RNNs were the first major architecture for sequence modeling. They process text one token at a time, 
              maintaining an internal "memory" (hidden state) that gets updated at each step. This sequential nature 
              creates fundamental limitations.
            </p>
            
            <RNNVisualization isActive={activeSection === 'seqModels'} />
          </div>
          
          {/* RNN Variants Comparison - Technical Deep Dive */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Technical Evolution of Sequence Models</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              As researchers attempted to overcome the limitations of vanilla RNNs, several enhanced architectures were developed.
              Let's compare the technical details of these models and see how they eventually led to the Transformer breakthrough.
            </p>
            
            <RNNVariantsComparison isActive={activeSection === 'seqModels'} />
          </div>
          
          <div className="card mb-8">
            <h3 className="text-xl font-semibold mb-4">Limitations of RNN-based Models</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Sequential Processing:</strong> RNNs process tokens one by one, making them unable to parallelize and slow for long sequences.
                This sequential nature means that training time scales linearly with sequence length, becoming impractical for very long sequences.
              </li>
              <li>
                <strong>Long-range Dependencies:</strong> Information from early tokens tends to get diluted as sequences get longer.
                For example, in the sentence "The cat, which was sitting on the mat that was purchased last week from the store downtown, is brown,"
                the connection between "cat" and "brown" becomes difficult for RNNs to maintain.
              </li>
              <li>
                <strong>Vanishing Gradients:</strong> Gradients can vanish during backpropagation through time, making it difficult to learn long-range dependencies.
                As the error signal propagates backward through many time steps, it tends to diminish exponentially, effectively preventing learning from distant contexts.
              </li>
              <li>
                <strong>Lack of Parallel Processing:</strong> RNNs process tokens sequentially, making them inefficient on modern GPU hardware
                which excels at parallel computation. This makes training on large datasets prohibitively time-consuming.
              </li>
            </ul>
          </div>
          
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">The Encoder-Decoder Framework</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Traditional sequence-to-sequence models used an encoder-decoder architecture. The encoder processes the entire input sequence and 
              compresses it into a context vector. The decoder then generates the output sequence based on this context vector.
            </p>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <div className="p-4 border border-indigo-200 dark:border-indigo-800 rounded-md bg-indigo-50 dark:bg-indigo-900/30 w-full md:w-2/5">
                  <h4 className="font-medium text-center mb-2">Encoder</h4>
                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Processes the input sequence and compresses it into a context vector
                  </p>
                </div>
                <div className="text-center text-gray-400">→</div>
                <div className="w-full md:w-1/5 py-2 text-center">
                  <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md mx-auto w-full max-w-[100px]">
                    <p className="text-xs">Context Vector</p>
                  </div>
                </div>
                <div className="text-center text-gray-400">→</div>
                <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-md bg-purple-50 dark:bg-purple-900/30 w-full md:w-2/5">
                  <h4 className="font-medium text-center mb-2">Decoder</h4>
                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Generates the output sequence token by token based on the context
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Information Bottleneck Visualization */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">The Information Bottleneck Problem</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              A critical limitation of the encoder-decoder framework was the bottleneck created by compressing all information into a fixed-size context vector.
              This bottleneck became particularly problematic for long sequences where important information could be lost.
            </p>
            
            <BottleneckVisualization isActive={activeSection === 'seqModels'} />
          </div>
          
          <div className="card p-5 border-l-4 border-indigo-500">
            <h3 className="text-xl font-semibold mb-2">Motivating the Transformer Architecture</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The key problems that motivated the development of the Transformer architecture can be summarized as:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Sequential bottlenecks</strong> in RNNs that prevented parallelization
              </li>
              <li>
                <strong>Vanishing signal</strong> across long sequences that made learning long-range dependencies difficult
              </li>
              <li>
                <strong>Information compression</strong> into a fixed-size context vector that created an information bottleneck
              </li>
              <li>
                <strong>High computational cost</strong> of training RNN models, especially for long sequences
              </li>
            </ol>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              The Transformer architecture, introduced in the paper "Attention is All You Need" (Vaswani et al., 2017), 
              addressed all these limitations by replacing recurrence entirely with attention mechanisms.
              The key insight was that direct connections between all positions in a sequence could eliminate 
              sequential processing while better capturing long-range dependencies.
            </p>
          </div>
        </div>
      </section>
      
      {/* Attention Mechanism Section */}
      <section 
        ref={sectionRefs.attention}
        id="attention" 
        className="section-container bg-gray-50 dark:bg-slate-900"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">The Attention Mechanism</h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Attention mechanisms were introduced to address the bottleneck problem by allowing the decoder to "look back" at the source sequence. Instead of relying solely on a fixed context vector, the decoder could focus on relevant parts of the input for each output token.
          </p>
          
          <div className="card mb-8">
            <h3 className="text-xl font-semibold mb-4">How Attention Works</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The attention mechanism computes a weighted sum of all encoder hidden states, with weights determined by their relevance to the current decoder state.
            </p>
            
            <div className="formula mb-6">
              <p className="text-center mb-2">The attention score between query q and key k:</p>
              <MathFormula formula="score(q, k) = \frac{q \cdot k}{\sqrt{d_k}}" block />
              
              <p className="text-center mb-2 mt-4">The attention weights after softmax:</p>
              <MathFormula formula="attention(Q, K, V) = softmax\left(\frac{QK^T}{\sqrt{d_k}}\right)V" block />
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">
              Where:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mt-2">
              <li><strong>Q</strong> (Query): What we're looking for</li>
              <li><strong>K</strong> (Key): What we match against</li>
              <li><strong>V</strong> (Value): What we retrieve</li>
              <li><strong>d<sub>k</sub></strong>: Dimensionality of the keys</li>
            </ul>
          </div>
          
          {/* Attention Visualization Component */}
          <AttentionVisualization isActive={activeSection === 'attention'} />
        </div>
      </section>
      
      {/* Self-Attention Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Self-Attention: The Key Innovation</h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            The transformer architecture introduces <strong>self-attention</strong>, where all queries, keys, and values come from the same sequence. This allows each token to attend to all positions in the sequence, facilitating the modeling of complex dependencies regardless of their distance.
          </p>
          
          {/* Self-Attention Demo Component */}
          <SelfAttentionDemo isActive={activeSection === 'attention'} />
          
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Multi-Head Attention</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Rather than performing a single attention function, the transformer uses multiple attention heads in parallel. This allows the model to jointly attend to information from different representation subspaces at different positions.
            </p>
            
            <div className="formula mb-8">
              <MathFormula 
                formula="MultiHead(Q, K, V) = Concat(head_1, head_2, ..., head_h)W^O" 
                block 
              />
              <MathFormula 
                formula="where\; head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)" 
                block 
              />
            </div>
            
            {/* Multi-Head Attention Component */}
            <MultiHeadAttention isActive={activeSection === 'attention'} />
          </div>
        </div>
      </section>
      
      {/* Transformer Architecture Section */}
      <section 
        ref={sectionRefs.architecture}
        id="architecture" 
        className="section-container bg-gray-50 dark:bg-slate-900"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">The Transformer Architecture</h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            The complete transformer architecture consists of an encoder and decoder, each composed of multiple identical layers. The key innovation is replacing recurrence entirely with attention mechanisms and feed-forward networks.
          </p>
          
          <div className="card mb-8">
            <h3 className="text-xl font-semibold mb-4">Key Components</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">1. Input Embedding</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Converts input tokens into dense vector representations of dimension d<sub>model</sub>.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">2. Positional Encoding</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Since the transformer doesn't use recurrence or convolution, it has no inherent notion of token order. Positional encodings are added to the embeddings to inject information about the position of tokens in the sequence.
                </p>
                <div className="formula">
                  <MathFormula 
                    formula="PE_{(pos, 2i)} = sin(pos / 10000^{2i/d_{model}})" 
                    block 
                  />
                  <MathFormula 
                    formula="PE_{(pos, 2i+1)} = cos(pos / 10000^{2i/d_{model}})" 
                    block 
                  />
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">3. Multi-Head Attention</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The transformer uses three types of attention:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mt-2">
                  <li><strong>Encoder Self-Attention:</strong> Each encoder token attends to all encoder tokens</li>
                  <li><strong>Masked Decoder Self-Attention:</strong> Each decoder token attends to all previous decoder tokens</li>
                  <li><strong>Encoder-Decoder Attention:</strong> Each decoder token attends to all encoder tokens</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">4. Feed-Forward Networks</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Each layer in both encoder and decoder contains a fully connected feed-forward network applied to each position separately and identically.
                </p>
                <div className="formula">
                  <MathFormula 
                    formula="FFN(x) = max(0, xW_1 + b_1)W_2 + b_2" 
                    block 
                  />
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">5. Residual Connections and Layer Normalization</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Each sub-layer (attention and feed-forward) is wrapped with a residual connection followed by layer normalization:
                </p>
                <div className="formula mt-3">
                  <MathFormula 
                    formula="LayerNorm(x + Sublayer(x))" 
                    block 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Interactive Transformer Architecture Visualization */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Transformer Architecture Visualization</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Explore the transformer architecture step by step using the interactive visualization below:
            </p>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className={`px-3 py-1 rounded-md ${
                    activeStep === 0 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700' 
                      : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm">
                  Step {activeStep + 1} of 7
                </span>
                <button 
                  onClick={() => setActiveStep(Math.min(6, activeStep + 1))}
                  disabled={activeStep === 6}
                  className={`px-3 py-1 rounded-md ${
                    activeStep === 6 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700' 
                      : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:hover:bg-indigo-800 dark:text-indigo-200'
                  }`}
                >
                  Next
                </button>
              </div>
              
              <AnimatedArchitecture activeStep={activeStep} />
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Advantages Over Previous Architectures</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Parallelization:</strong> Unlike RNNs, transformers can process all tokens in parallel, greatly speeding up training.
              </li>
              <li>
                <strong>Long-range Dependencies:</strong> The attention mechanism allows for direct connections between any two positions, making it easier to learn long-range dependencies.
              </li>
              <li>
                <strong>No Information Bottleneck:</strong> Information flows directly between all positions without being compressed into a fixed-size context vector.
              </li>
              <li>
                <strong>Better Gradient Flow:</strong> With direct connections between positions and residual connections throughout the network, gradients flow more easily during training.
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Applications Section */}
      <section 
        ref={sectionRefs.applications}
        id="applications" 
        className="section-container"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Applications of Transformers</h2>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            The transformer architecture has revolutionized natural language processing and beyond, enabling breakthroughs in numerous domains.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">Natural Language Processing</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Machine Translation</li>
                <li>Text Summarization</li>
                <li>Question Answering</li>
                <li>Text Generation</li>
                <li>Sentiment Analysis</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">Computer Vision</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Image Classification</li>
                <li>Object Detection</li>
                <li>Image Segmentation</li>
                <li>Image Generation</li>
                <li>Video Understanding</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">Multimodal Learning</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Image Captioning</li>
                <li>Visual Question Answering</li>
                <li>Text-to-Image Generation</li>
                <li>Audio-Text Understanding</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">Scientific Applications</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Protein Structure Prediction</li>
                <li>Drug Discovery</li>
                <li>Weather Forecasting</li>
                <li>Chemical Reaction Prediction</li>
              </ul>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Famous Transformer Models</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">BERT (Bidirectional Encoder Representations from Transformers)</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Uses only the encoder portion of the transformer to create powerful contextual word embeddings.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">GPT (Generative Pre-trained Transformer)</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Uses the decoder portion of the transformer for powerful autoregressive text generation.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">T5 (Text-to-Text Transfer Transformer)</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Frames all NLP tasks as text-to-text problems, using the complete encoder-decoder transformer.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">Vision Transformer (ViT)</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Adapts the transformer for image classification by treating image patches as tokens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive Demo Section */}
      <section 
        ref={sectionRefs.demo}
        id="demo" 
        className="section-container bg-gray-50 dark:bg-slate-900"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Interactive Transformer Demo</h2>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            Experience the transformer in action with this interactive demo. Select a prompt and see how the model generates completions.
          </p>
          
          <TransformerDemo isActive={activeSection === 'demo'} />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-16 py-8 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Transformer Architecture Explained</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                An interactive visual journey through the transformer architecture
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Based on the paper "Attention Is All You Need" by Vaswani et al.
              </p>
              <a
                href="https://arxiv.org/abs/1706.03762"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Read the original paper →
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
