import React from 'react';
import { Brain, Zap, ArrowRight } from 'lucide-react';

export const ModernHero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 text-slate-900 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(71,85,105,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(71,85,105,0.05),transparent_50%)]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-slate-400 rounded-full animate-ping opacity-30"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-slate-500 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-slate-600 rounded-full animate-bounce opacity-20"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
              <Brain className="w-16 h-16 text-white" />
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-slate-900 leading-tight">
            SmartTagX
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-slate-600 mb-4 font-medium">
            AI-Powered Content Intelligence
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-slate-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your content with advanced NLP that understands context, entities, and meaning. 
            No more hashtag spam - just intelligent, structured tags.
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="group bg-slate-800 text-white px-12 py-4 rounded-xl font-bold text-xl hover:bg-slate-900 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <span className="flex items-center gap-3">
                <Zap className="w-6 h-6" />
                Try SmartTagX Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-lg">
              <div className="text-3xl font-bold text-slate-800 mb-2">85%</div>
              <div className="text-slate-600">Accuracy Rate</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-lg">
              <div className="text-3xl font-bold text-slate-800 mb-2">15+</div>
              <div className="text-slate-600">Tag Categories</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-lg">
              <div className="text-3xl font-bold text-slate-800 mb-2">0.3s</div>
              <div className="text-slate-600">Processing Time</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-500/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
