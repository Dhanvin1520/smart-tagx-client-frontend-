import React from 'react';
import { Sparkles, Hash, X, CheckCircle, TrendingUp, Zap } from 'lucide-react';


export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700/20 via-slate-900/40 to-slate-900"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-slate-600 p-4 rounded-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-slate-400 to-gray-300 bg-clip-text text-transparent">
            SmartTagX
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Hashtags are getting old. SmartTagX gives you intelligent, contextual tags that actually explain content.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-6 py-3 flex items-center gap-3">
              <Hash className="w-5 h-5 text-red-400" />
              <X className="w-4 h-4 text-red-400" />
              <span className="text-red-300 font-medium">Hashtags are outdated</span>
            </div>
            
            <div className="text-gray-400 text-lg">→</div>
            
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-6 py-3 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-green-400" />
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-300 font-medium">SmartTagX is the new system</span>
            </div>
          </div>
        </div>
        
        {/* Problem Statement */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <Hash className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-300 mb-3">Hashtag Spam</h3>
            <p className="text-gray-400">
              #random #irrelevant #spam #tags #everywhere #annoying #cluttered #messy
            </p>
          </div>
          
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 text-center">
            <TrendingUp className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-orange-300 mb-3">Poor Discoverability</h3>
            <p className="text-gray-400">
              Generic hashtags make content harder to find and categorize properly
            </p>
          </div>
          
          <div className="bg-slate-500/10 border border-slate-500/20 rounded-xl p-6 text-center">
            <X className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-3">No Context</h3>
            <p className="text-gray-400">
              Hashtags lack semantic meaning and contextual understanding
            </p>
          </div>
        </div>
        
        {/* Solution */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Introducing SmartTagX
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
              <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-300 mb-3">AI-Powered</h3>
              <p className="text-gray-400">
                Model that understands meaning, entities, locations, and relationships
              </p>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-300 mb-3">Structured Tags</h3>
              <p className="text-gray-400">
                Structured categories: Topics, People, Companies, Locations, Emotions
              </p>
            </div>
            
            <div className="bg-slate-500/10 border border-slate-500/20 rounded-xl p-6">
              <Zap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-3">Instant Results</h3>
              <p className="text-gray-400">
                Real-time tagging—clean output, no #noise
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <p className="text-xl text-gray-300 mb-6">
            Ready to move beyond hashtags?
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-slate-600 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:from-blue-600 hover:to-slate-700 transition-all duration-200 cursor-pointer">
            <Sparkles className="w-5 h-5" />
            Try SmartTagX Now
          </div>
        </div>
      </div>
    </section>
  );
};