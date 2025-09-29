import { Brain, Target, Zap, Shield, Globe, BarChart3, Sparkles, Hash, CheckCircle } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Beyond Hashtags",
      description: "Hashtags are flat and noisy. SmartTagX understands meaning, relationships, and context to produce signal, not spam.",
    },
    {
      icon: Target,
      title: "Semantic Topic Detection",
      description: "Automatically identifies real topics and entities instead of generic #buzzwords across 50+ domains.",
    },
    {
      icon: Zap,
      title: "Instant, Contextual Tags",
      description: "Get meaningful tags in real time. Clean structure that improves search, recommendations, and analytics.",
    },
    {
      icon: Shield,
      title: "Privacy by Design",
      description: "We only store what’s needed: basic account info, your tag usage count, and your current plan.",
    },
    {
      icon: Globe,
      title: "Works Where You Write",
      description: "Language-aware tagging with global location intelligence so context travels with your content.",
    },
    {
      icon: BarChart3,
      title: "Clear Impact",
      description: "See which topics and entities drive engagement—without the hashtag clutter.",
    }
  ];

  return (
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    {/* Section Header */}
    <div className="text-center mb-20">
      <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-6 text-primary-700">
        <Sparkles className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium">Powerful Features</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
        Hashtags are getting old
        <span className="text-primary-600 block">SmartTagX is the new system</span>
      </h2>
      <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-4">
        Replace noisy #hashtags with meaningful, structured tags that actually explain your content. 
        Smarter discovery, clearer analytics, better context.
      </p>
      <p className="text-center text-slate-500 text-xl max-w-3xl mx-auto">
        SmartTagX AI can be used universally across all platforms.
      </p>
    </div>

    {/* SmartTagX Advantage */}
    <div className="mt-16 bg-gradient-to-r from-primary-50 to-accent-50 rounded-3xl p-12 text-center">
      <h3 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
        The SmartTagX Advantage
      </h3>
      <p className="text-lg text-secondary-600 max-w-4xl mx-auto">
        SmartTagX AI doesn't just tag — it understands, organizes, and amplifies your
        content across every platform you use. Whether it's your website, eCommerce store,
        or social media, SmartTagX ensures every post, page, and message is intelligently
        connected and discoverable.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 mt-16">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 bg-primary-100 text-primary-700">
            <feature.icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-4">
            {feature.title}
          </h3>
          <p className="text-secondary-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>

    {/* How It Works */}
    <div className="bg-slate-50 rounded-3xl p-12">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
          How SmartTagX Works
        </h3>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          Turn raw content into semantic, searchable structure—no more hashtag spam.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
            1
          </div>
          <h4 className="text-xl font-semibold text-secondary-900 mb-4">Add Content</h4>
          <p className="text-secondary-600">
            Paste text, upload documents, or connect your sources. Multiple formats supported.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
            2
          </div>
          <h4 className="text-xl font-semibold text-secondary-900 mb-4">SmartTagX Analysis</h4>
          <p className="text-secondary-600">
            Our models find topics, entities, locations, and relationships to understand meaning.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-success-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
            3
          </div>
          <h4 className="text-xl font-semibold text-secondary-900 mb-4">Smart Tags, Not Hashtags</h4>
          <p className="text-secondary-600">
            Get clean, structured tags that boost search, recommendations, and readability—without #noise.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};
