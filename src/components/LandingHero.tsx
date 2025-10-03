import { ArrowRight, Brain, Sparkles, Zap } from 'lucide-react';

export const LandingHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">

      <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full border border-primary-200 mb-8">
  <span className="text-sm font-medium text-primary-800">
    SmartTagX AI — The Future of Intelligent Content Tagging
  </span>
</div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
          Transform your content with
          <span className="text-primary-600 block mt-2">intelligent tagging</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-secondary-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          SmartTagX AI makes your content smarter. It automatically adds relevant, powerful
          tags that keep everything organized and easy to explore — so you always find what
          matters most, instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            className="group bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Demo
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className="bg-white/80 backdrop-blur-sm text-secondary-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white transition-all duration-300 border border-secondary-200 hover:border-secondary-300 shadow-sm hover:shadow-md"
            onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
          >
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mx-auto mb-4">
              <Brain className="w-6 h-6 text-primary-700" />
            </div>
            <div className="text-3xl font-bold text-secondary-900 mb-2">85%</div>
            <div className="text-secondary-600">Accuracy Rate</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
            <div className="flex items-center justify-center w-12 h-12 bg-accent-100 rounded-xl mx-auto mb-4">
              <Zap className="w-6 h-6 text-accent-700" />
            </div>
            <div className="text-3xl font-bold text-secondary-900 mb-2">10x</div>
            <div className="text-secondary-600">Faster Processing</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-primary-700" />
            </div>
            <div className="text-3xl font-bold text-secondary-900 mb-2">8+</div>
            <div className="text-secondary-600">Tag Categories</div>
          </div>
        </div>
      </div>
    </section>
  );
};
