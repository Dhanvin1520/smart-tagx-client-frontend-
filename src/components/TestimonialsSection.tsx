import { Star, Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Director",
      company: "TechFlow Media",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "SmartTagX has revolutionized how we organize our content library. What used to take hours now happens in minutes, and the accuracy is incredible.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Data Scientist",
      company: "AI Innovations Lab",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The NLP capabilities are outstanding. We've integrated SmartTagX into our research pipeline and it's become indispensable for content analysis.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Marketing Manager",
      company: "Global Dynamics",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "The sentiment analysis feature helps us understand our audience better. SmartTagX has improved our content strategy significantly.",
      rating: 5
    },
    {
      name: "David Kim",
      role: "CTO",
      company: "StartupX",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Easy integration, powerful API, and excellent support. SmartTagX scales with our growing content needs perfectly.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: "Research Lead",
      company: "Academic Institute",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face",
      content: "The multi-language support is fantastic. We process research papers in multiple languages and SmartTagX handles them all beautifully.",
      rating: 5
    },
    {
      name: "James Wilson",
      role: "Product Manager",
      company: "ContentCorp",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      content: "SmartTagX has become central to our content operations. The analytics insights help us make data-driven decisions about our content strategy.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "50M+", label: "Tags Generated" },
    { number: "99.5%", label: "Uptime" },
    { number: "4.9/5", label: "Customer Rating" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full mb-6">
            <Star className="w-4 h-4 text-slate-600 mr-2" />
            <span className="text-sm font-medium text-slate-700">Customer Success</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Trusted by teams
            <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent block">
              around the world
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join thousands of organizations that have transformed their content operations with SmartTagX.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-slate-50 rounded-2xl p-8 hover:bg-slate-100 transition-colors duration-300 relative"
            >
              <Quote className="w-8 h-8 text-blue-600 mb-6 opacity-60" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-slate-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to join them?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your free trial today and see why thousands of teams choose SmartTagX 
              for their content intelligence needs.
            </p>
            <button
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
