import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { BookOpen, Heart, Stethoscope, AlertCircle, Database, Search, Zap, Shield, ArrowRight, Sparkles, FileSearch, Brain, Lock } from 'lucide-react';
import { useRef } from 'react';

interface LandingPageProps {
  onEnterChat: () => void;
}

export function LandingPage({ onEnterChat }: LandingPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const datasets = [
    {
      icon: BookOpen,
      title: 'Anatomy & Physiology',
      description: 'Comprehensive human body systems, cellular mechanisms, and physiological processes',
      stats: '280K+ pages',
      color: 'from-blue-500 via-blue-400 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Advanced cardiac imaging, interventional procedures, and treatment protocols',
      stats: '165K+ pages',
      color: 'from-red-500 via-rose-400 to-orange-500'
    },
    {
      icon: Stethoscope,
      title: 'Dentistry',
      description: 'Oral pathology, surgical techniques, and restorative procedures',
      stats: '120K+ pages',
      color: 'from-teal-500 via-emerald-400 to-green-500'
    },
    {
      icon: AlertCircle,
      title: 'Emergency Medicine',
      description: 'Critical care protocols, trauma management, and rapid response systems',
      stats: '195K+ pages',
      color: 'from-orange-500 via-amber-400 to-yellow-500'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'Neural Retrieval',
      description: 'Advanced semantic search using state-of-the-art embedding models',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileSearch,
      title: 'Source Attribution',
      description: 'Every response includes precise citations from verified medical literature',
      gradient: 'from-cyan-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'Sub-second Queries',
      description: 'Optimized vector database with millisecond retrieval times',
      gradient: 'from-teal-500 to-emerald-500'
    },
    {
      icon: Lock,
      title: 'Enterprise Grade',
      description: 'Compliant with medical data standards and security protocols',
      gradient: 'from-emerald-500 to-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white overflow-hidden">
      {/* Complex animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative z-50 px-8 py-6"
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="text-xl tracking-tight">Curator</div>
              <div className="text-[10px] text-slate-500 -mt-0.5 tracking-wider uppercase">Medical RAG</div>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
            >
              <span className="text-sm">Documentation</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
            >
              <span className="text-sm">API Access</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        style={{ y, opacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-8 pt-20 pb-32"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 group hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              <div className="absolute inset-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            </motion.div>
            <span className="text-sm text-slate-300">Powered by Advanced RAG Architecture</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-7xl md:text-8xl mb-8 tracking-tight leading-[0.9]"
          >
            Medical Intelligence
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
                Redefined
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Access 1GB+ of verified medical literature through neural retrieval. 
            Query anatomy, cardiology, dentistry, and emergency medicine with 
            unprecedented accuracy and source transparency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4 mb-20"
          >
            <motion.button
              onClick={onEnterChat}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 animate-gradient" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <span className="relative flex items-center gap-2.5 text-lg">
                Launch Interface
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
            >
              <span className="text-lg">View Demo</span>
            </motion.button>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: '1.2GB', label: 'Medical Literature', suffix: '+' },
              { value: '760K', label: 'Document Pages', suffix: '+' },
              { value: '<50ms', label: 'Query Latency', suffix: '' },
              { value: '99.7%', label: 'Accuracy Rate', suffix: '' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <div className="text-4xl mb-2">
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <span className="text-2xl text-cyan-400">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Medical Datasets Section - Redesigned */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400">Knowledge Domains</span>
          </div>
          <h2 className="text-5xl mb-4">Specialized Medical Datasets</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Curated collections spanning critical medical disciplines with continuous updates
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {datasets.map((dataset, index) => {
            const Icon = dataset.icon;
            return (
              <motion.div
                key={dataset.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative cursor-pointer"
              >
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${dataset.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Card */}
                <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm group-hover:border-white/20 transition-all duration-500 overflow-hidden">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${dataset.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className="relative flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${dataset.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`} />
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${dataset.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>
                    
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400">
                      {dataset.stats}
                    </div>
                  </div>

                  <h3 className="relative text-2xl mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                    {dataset.title}
                  </h3>
                  <p className="relative text-slate-400 leading-relaxed mb-4">
                    {dataset.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="relative flex items-center gap-2 text-slate-500 group-hover:text-cyan-400 transition-colors">
                    <span className="text-sm">Explore dataset</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                  </div>

                  {/* Decorative element */}
                  <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Features Section - Completely Redesigned */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
            <Zap className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-teal-400">Core Technology</span>
          </div>
          <h2 className="text-5xl mb-4">Enterprise-Grade RAG</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Production-ready retrieval augmented generation with clinical precision
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Icon with gradient */}
                  <div className="relative w-14 h-14 mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity`} />
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  <h3 className="text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Section - Enhanced */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-600/20 to-teal-600/20 animate-gradient" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
          
          <div className="relative px-16 py-20 text-center border border-white/10 rounded-3xl backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-5xl mb-6 leading-tight">
                Start Querying Medical
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Literature Today
                </span>
              </h2>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                Join researchers and clinicians leveraging AI-powered retrieval for
                instant access to evidence-based medical knowledge.
              </p>
              <motion.button
                onClick={onEnterChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-lg text-slate-900 group-hover:text-white transition-colors flex items-center gap-2.5">
                  Access Curator Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="tracking-tight">Curator</div>
                <div className="text-xs text-slate-500">Medical RAG System</div>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              © 2025 Curator. Enterprise medical intelligence platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
