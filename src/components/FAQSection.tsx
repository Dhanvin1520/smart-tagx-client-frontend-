import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is SmartTagX AI?",
      answer: "SmartTagX AI is an intelligent tagging system that automatically understands your content and generates meaningful, structured tags. It helps you organize, discover, and analyze your content faster — without the clutter of traditional hashtags."
    },
    {
      question: "How is SmartTagX AI different from traditional hashtags?",
      answer: "Unlike generic and spammy hashtags, SmartTagX AI creates smart, context-aware tags that truly represent your content. It goes beyond simple keywords — helping platforms and users find relevant, high-quality information instantly."
    },
    {
      question: "Does SmartTagX AI work with my website or app?",
      answer: "Yes! SmartTagX AI is designed to work seamlessly across multiple platforms including WordPress, HTML, Shopify, WhatsApp, Telegram, Facebook, Instagram, and X (Twitter). It can be easily integrated into your website or content management system."
    },
    {
      question: "Does SmartTagX AI currently work on social media platforms?",
      answer: "Not yet. Currently, SmartTagX AI is designed for websites, applications, and content systems. However, social media platforms will soon be able to implement SmartTagX AI for smarter tagging and better content discovery. We're in active discussions and development for this next phase."
    },
    {
      question: "Does SmartTagX AI support regional or local languages?",
      answer: "At present, SmartTagX AI supports only English content for tagging. Support for regional and multilingual tagging is in development — we're working to include major global and Indian languages in upcoming updates."
    },
    {
      question: "Is SmartTagX AI automated?",
      answer: "Yes. Once integrated, SmartTagX AI automatically analyzes and tags your content — no manual work required. It saves time, reduces errors, and ensures every piece of content is accurately categorized."
    },
    {
      question: "Can SmartTagX AI improve my SEO and discoverability?",
      answer: "Absolutely! By creating structured, meaningful tags, SmartTagX AI helps search engines and internal systems better understand your content — improving visibility, search ranking, and engagement."
    },
    {
      question: "How secure is SmartTagX AI?",
      answer: "SmartTagX AI prioritizes data privacy. It processes your content securely without storing or sharing sensitive information, ensuring your data remains protected at all times."
    },
    {
      question: "Is there a limit on how much content SmartTagX AI can tag?",
      answer: "No — SmartTagX AI is fully scalable. It can handle everything from small websites to large enterprise content libraries effortlessly."
    },
    {
      question: "What's next for SmartTagX AI?",
      answer: "We're continuously enhancing SmartTagX AI to support more languages, platforms, and AI-driven insights — bringing even more automation and intelligence to your content experience."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-slate-200 mb-6">
            <HelpCircle className="w-4 h-4 text-slate-600 mr-2" />
            <span className="text-sm font-medium text-slate-700">Frequently Asked Questions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Got questions?
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              We have answers
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about SmartTagX and how it can transform your content operations.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-slate-900 pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <div className="border-t border-slate-100 pt-6">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Removed "Still have questions?" CTA per request */}
      </div>
    </section>
  );
};
