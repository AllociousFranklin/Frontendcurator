import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { Send, ArrowLeft, Database, BookOpen, Heart, Stethoscope, AlertCircle, FileText, Sparkles, Clock, TrendingUp, Activity, ChevronRight, X, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ title: string; category: string; page: string }>;
  timestamp: Date;
  confidence?: number;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

export function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  const categories = [
    { name: 'Anatomy & Physiology', icon: BookOpen, color: 'from-blue-500 to-cyan-500', count: 280 },
    { name: 'Cardiology', icon: Heart, color: 'from-red-500 to-orange-500', count: 165 },
    { name: 'Dentistry', icon: Stethoscope, color: 'from-teal-500 to-emerald-500', count: 120 },
    { name: 'Emergency Medicine', icon: AlertCircle, color: 'from-orange-500 to-yellow-500', count: 195 }
  ];

  const suggestedPrompts = [
    {
      text: 'Explain the mechanism of action for beta blockers in heart failure',
      category: 'Cardiology',
      icon: Heart
    },
    {
      text: 'Describe the pathophysiology of diabetic ketoacidosis',
      category: 'Emergency',
      icon: AlertCircle
    },
    {
      text: 'What are the layers of the epidermis and their functions?',
      category: 'Anatomy',
      icon: BookOpen
    },
    {
      text: 'Outline the differential diagnosis for acute chest pain',
      category: 'Emergency',
      icon: AlertCircle
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    setShowWelcome(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate RAG response
    setTimeout(() => {
      const responses = [
        {
          content: "Beta-blockers function through competitive antagonism of beta-adrenergic receptors, primarily β1-receptors in cardiac tissue. In heart failure, they work by: (1) Reducing heart rate and myocardial oxygen demand, (2) Decreasing adverse ventricular remodeling through neurohormonal modulation, (3) Improving diastolic filling time, and (4) Reducing catecholamine-induced cardiotoxicity. Studies demonstrate significant mortality reduction in HFrEF patients when titrated appropriately.",
          sources: [
            { title: 'Pharmacology of Beta-Adrenergic Blockers', category: 'Cardiology', page: 'p. 234-241' },
            { title: 'Heart Failure Management Guidelines', category: 'Cardiology', page: 'p. 89-94' },
            { title: 'Neurohormonal Mechanisms in HF', category: 'Cardiology', page: 'p. 156-162' }
          ],
          confidence: 94
        },
        {
          content: "The epidermis consists of five distinct layers from deep to superficial: (1) Stratum basale - contains stem cells and melanocytes, responsible for continuous cell renewal, (2) Stratum spinosum - provides structural integrity via desmosomes, (3) Stratum granulosum - initiates keratinization with lamellar granules, (4) Stratum lucidum - only in thick skin, provides additional barrier protection, (5) Stratum corneum - fully keratinized cells forming the primary barrier against environmental insults.",
          sources: [
            { title: 'Histology of Integumentary System', category: 'Anatomy & Physiology', page: 'p. 112-128' },
            { title: 'Skin Barrier Function and Pathology', category: 'Anatomy & Physiology', page: 'p. 45-52' }
          ],
          confidence: 97
        },
        {
          content: "Diabetic ketoacidosis (DKA) develops through a cascade of metabolic derangements: Insulin deficiency combined with counter-regulatory hormone excess leads to: (1) Accelerated lipolysis and free fatty acid oxidation producing ketone bodies (β-hydroxybutyrate, acetoacetate), (2) Uncontrolled hepatic gluconeogenesis causing hyperglycemia, (3) Osmotic diuresis resulting in severe dehydration and electrolyte depletion, (4) Progressive metabolic acidosis with anion gap elevation. The triad of hyperglycemia, ketosis, and acidosis defines the syndrome.",
          sources: [
            { title: 'Endocrine Emergencies Handbook', category: 'Emergency Medicine', page: 'p. 67-74' },
            { title: 'Metabolic Acidosis: Mechanisms', category: 'Emergency Medicine', page: 'p. 201-215' },
            { title: 'Diabetes Mellitus Complications', category: 'Cardiology', page: 'p. 389-395' }
          ],
          confidence: 96
        }
      ];

      const response = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        sources: response.sources,
        timestamp: new Date(),
        confidence: response.confidence
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2500);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className="h-screen bg-[#0a0f1e] text-white flex overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
        className="relative z-10 w-[360px] border-r border-white/10 flex flex-col bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <motion.button
            onClick={onBack}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Return Home</span>
          </motion.button>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-60" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="text-lg tracking-tight">Curator</div>
              <div className="text-xs text-slate-500">Neural Medical Retrieval</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-green-500/10 rounded-xl border border-green-500/20">
              <div className="relative">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-green-400">System Status</div>
                <div className="text-xs text-slate-400">All databases online</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-xs text-slate-500 mb-4 tracking-wider uppercase">Knowledge Domains</div>
          <div className="space-y-3">
            {categories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  className="group relative cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity`} />
                  <div className="relative flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{category.name}</div>
                      <div className="text-xs text-slate-500">{category.count}K+ pages</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Session Stats */}
          <div className="mt-8 p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-sm">Session Analytics</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Queries Processed</span>
                <span className="text-lg">{messages.filter(m => m.role === 'user').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Sources Retrieved</span>
                <span className="text-lg">{messages.filter(m => m.sources).reduce((acc, m) => acc + (m.sources?.length || 0), 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Avg. Confidence</span>
                <span className="text-lg text-green-400">
                  {messages.filter(m => m.confidence).length > 0 
                    ? Math.round(messages.filter(m => m.confidence).reduce((acc, m) => acc + (m.confidence || 0), 0) / messages.filter(m => m.confidence).length)
                    : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="relative flex-1 flex flex-col">
        {/* Chat Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 px-10 py-6 border-b border-white/10 bg-white/[0.02] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl mb-1 tracking-tight">Medical Knowledge Interface</h1>
              <p className="text-sm text-slate-400">Neural retrieval across 1.2GB of verified medical literature</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl border border-white/10">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300">~45ms latency</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400">RAG Active</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="relative z-10 flex-1 overflow-y-auto px-10 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Welcome State */}
            {showWelcome && messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50" />
                    <Database className="relative w-10 h-10" />
                  </motion.div>
                  <h2 className="text-3xl mb-3">Welcome to Curator</h2>
                  <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Access comprehensive medical knowledge through advanced neural retrieval. 
                    Every response is backed by verified sources from our 1.2GB database.
                  </p>
                </div>

                <div className="mb-6 text-sm text-slate-500">Suggested queries to get started:</div>
                <div className="grid grid-cols-2 gap-4">
                  {suggestedPrompts.map((prompt, idx) => {
                    const Icon = prompt.icon;
                    return (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        onClick={() => handlePromptClick(prompt.text)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative text-left p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="text-xs text-slate-500 px-2 py-1 rounded bg-white/5">
                            {prompt.category}
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-300 group-hover:text-white transition-colors">
                          {prompt.text}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-8 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-4xl ${message.role === 'user' ? 'w-auto' : 'w-full'}`}>
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg blur-md opacity-60" />
                          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <Database className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">Curator</div>
                          <div className="text-xs text-slate-500">
                            {message.timestamp.toLocaleTimeString()}
                            {message.confidence && (
                              <span className="ml-2 text-green-400">• {message.confidence}% confidence</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {message.role === 'user' && (
                      <div className="flex items-center gap-2 justify-end mb-2">
                        <div className="text-xs text-slate-500">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-slate-400">You</div>
                      </div>
                    )}

                    <motion.div
                      whileHover={message.role === 'assistant' ? { scale: 1.005 } : {}}
                      className={`relative p-6 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                      )}
                      <p className="relative leading-relaxed">{message.content}</p>
                    </motion.div>

                    {/* Sources */}
                    {message.sources && message.sources.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4"
                      >
                        <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                          <FileText className="w-3.5 h-3.5" />
                          <span>Referenced sources ({message.sources.length})</span>
                        </div>
                        <div className="space-y-2">
                          {message.sources.map((source, idx) => (
                            <motion.button
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + idx * 0.05 }}
                              onClick={() => setSelectedSource(source)}
                              whileHover={{ x: 4, scale: 1.01 }}
                              className="w-full group relative flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-left"
                            >
                              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors flex-shrink-0">
                                <FileText className="w-5 h-5 text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm mb-0.5 truncate">{source.title}</div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <span>{source.category}</span>
                                  <span>•</span>
                                  <span>{source.page}</span>
                                </div>
                              </div>
                              <Maximize2 className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg blur-md opacity-60" />
                  <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Database className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                    />
                    <span className="ml-2 text-sm text-slate-400">Retrieving sources...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 p-8 border-t border-white/10 bg-white/[0.02] backdrop-blur-xl"
        >
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative flex items-end gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 focus-within:border-cyan-500/50 focus-within:bg-white/10 transition-all"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Describe your medical query in detail..."
                  rows={1}
                  className="flex-1 bg-transparent border-none outline-none resize-none text-white placeholder-slate-500 text-lg"
                  style={{ maxHeight: '200px' }}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  whileHover={input.trim() && !isTyping ? { scale: 1.05 } : {}}
                  whileTap={input.trim() && !isTyping ? { scale: 0.95 } : {}}
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                    input.trim() && !isTyping
                      ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                      : 'bg-white/5 cursor-not-allowed'
                  }`}
                >
                  {input.trim() && !isTyping && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl blur-lg opacity-50" />
                  )}
                  <Send className="relative w-5 h-5" />
                </motion.button>
              </motion.div>
              <div className="flex items-center justify-between mt-4 px-2">
                <p className="text-xs text-slate-500">
                  Responses include source citations from verified medical literature
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Vector search enabled</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Source Modal */}
      <AnimatePresence>
        {selectedSource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSource(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/20 p-8 relative"
            >
              <button
                onClick={() => setSelectedSource(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl mb-2">{selectedSource.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span>{selectedSource.category}</span>
                    <span>•</span>
                    <span>{selectedSource.page}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <p className="text-slate-300 leading-relaxed mb-4">
                  This source document contains verified medical information that was used to generate the response. 
                  The retrieval system identified this as a highly relevant document based on semantic similarity to your query.
                </p>
                <div className="flex items-center gap-2 text-sm text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Relevance Score: 94.2%</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all">
                  View Full Document
                </button>
                <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  Cite Source
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
