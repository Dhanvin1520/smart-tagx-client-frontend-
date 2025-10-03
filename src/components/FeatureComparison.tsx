import React from 'react';
import { Hash, X, CheckCircle } from 'lucide-react';

export const FeatureComparison: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hashtags vs SmartTagX
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how SmartTagX revolutionizes content tagging compared to traditional hashtags
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Traditional Hashtags */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-200">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-xl mr-4">
                <Hash className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-700">Traditional Hashtags</h3>
                <p className="text-red-600">Outdated & Spammy</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Relevance</p>
                  <p className="text-gray-600 text-sm">Filled with generic and overused tags like #love or #instagood</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Context Awareness</p>
                  <p className="text-gray-600 text-sm">Can't tell the difference between similar terms (e.g., #Apple = fruit or company)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Engagement Quality</p>
                  <p className="text-gray-600 text-sm">Attracts bots, fake followers, and irrelevant traffic</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Discoverability</p>
                  <p className="text-gray-600 text-sm">Lost in millions of unrelated posts</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Organization</p>
                  <p className="text-gray-600 text-sm">Creates clutter — no logical grouping or structure</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Searchability</p>
                  <p className="text-gray-600 text-sm">Generic results, not personalized</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Analytics & Insights</p>
                  <p className="text-gray-600 text-sm">No data on hashtag performance</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">User Experience</p>
                  <p className="text-gray-600 text-sm">Outdated, manual, and visually messy</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">SEO Impact</p>
                  <p className="text-gray-600 text-sm">Offers no boost to search or visibility</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Scalability</p>
                  <p className="text-gray-600 text-sm">Unmanageable with large content volumes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Algorithm Compatibility</p>
                  <p className="text-gray-600 text-sm">Penalized for repetitive or spammy use</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Time & Effort</p>
                  <p className="text-gray-600 text-sm">Requires manual selection and constant updates</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Platform Compatibility</p>
                  <p className="text-gray-600 text-sm">Limited — mainly for social media use</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Future-Readiness</p>
                  <p className="text-gray-600 text-sm">Built for the past — outdated strategy</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Example Hashtag Spam:</h4>
              <p className="text-sm text-red-700">
                #ai #tech #startup #innovation #business #entrepreneur #success #motivation #inspiration #goals #hustle #grind #work #life #love #instagood #photooftheday #beautiful #happy #follow #followme #like4like #instadaily #amazing #best #cool #fun #good #nice #awesome #great #perfect #style #fashion #art #design #creative #digital #future #trending #viral #popular
              </p>
            </div>
          </div>
          
          {/* SmartTagX */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary-200">
            <div className="flex items-center mb-6">
               <div className="">
                <img src="/logos/Smarttagx.png" alt="SmartTagX Logo" className="h-8 w-auto" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary-700"></h3>
                <p className="text-primary-600"></p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Relevance</p>
                  <p className="text-gray-600 text-sm">Creates meaningful, context-rich tags that match your content perfectly</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Context Awareness</p>
                  <p className="text-gray-600 text-sm">Understands real meaning, differentiates topics, brands, and entities</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Engagement Quality</p>
                  <p className="text-gray-600 text-sm">Connects you with genuine audiences interested in your content</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Discoverability</p>
                  <p className="text-gray-600 text-sm">Boosts reach through intelligent, topic-driven categorization</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Organization</p>
                  <p className="text-gray-600 text-sm">Automatically organizes content into smart, searchable themes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Searchability</p>
                  <p className="text-gray-600 text-sm">Smart search helps users instantly find what matters most</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Analytics & Insights</p>
                  <p className="text-gray-600 text-sm">Delivers clear insights on which tags drive real engagement</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">User Experience</p>
                  <p className="text-gray-600 text-sm">Seamless, automated, and clean tagging experience</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">SEO Impact</p>
                  <p className="text-gray-600 text-sm">Strengthens SEO by adding structured, discoverable context</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Scalability</p>
                  <p className="text-gray-600 text-sm">Adapts and scales effortlessly with your growing content</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Algorithm Compatibility</p>
                  <p className="text-gray-600 text-sm">Optimized for modern algorithms and intelligent recommendation systems</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Time & Effort</p>
                  <p className="text-gray-600 text-sm">Fully automated — saves time, ensures accuracy</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Platform Compatibility</p>
                  <p className="text-gray-600 text-sm">Works seamlessly across WordPress, HTML, Shopify, WhatsApp, Telegram, Facebook, Instagram, and X (Twitter)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Future-Readiness</p>
                  <p className="text-gray-600 text-sm">Designed for the future of content intelligence and discovery</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-4">
              <h4 className="font-semibold text-primary-800 mb-2">Example SmartTagX Output:</h4>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">::Topic/AI</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">::Company/OpenAI</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">::Location/San Francisco</span>
                <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded">//Excitement</span>
                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">*article</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded">@@ReadMore</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* The SmartTagX Advantage */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-accent-50 rounded-3xl p-12">
          <div className="text-center mb-8">
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
        </div>
      </div>
    </section>
  );
};
