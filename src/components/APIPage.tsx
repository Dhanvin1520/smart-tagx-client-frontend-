import { useState } from 'react';
import { Copy, Check, ExternalLink, Code, Zap, Shield, BarChart3, BookOpen, Play } from 'lucide-react';

const APIPage = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'javascript' | 'python' | 'curl'>('javascript');

  const apiBaseUrl = 'https://smarttagx-api.onrender.com';

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    javascript: `// JavaScript/Node.js Example
async function generateTags(text) {
  const response = await fetch('${apiBaseUrl}/api/generate-tags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      text: text,
      max_tags: 20,
      include_confidence: false 
    })
  });
  
  const data = await response.json();
  return data.tags;
}

// Usage
generateTags("Apple Inc. announced new AI features for iPhone 15")
  .then(tags => console.log(tags));`,

    python: `# Python Example
import requests

def generate_tags(text, max_tags=20):
    url = "${apiBaseUrl}/api/generate-tags"
    payload = {
        "text": text,
        "max_tags": max_tags,
        "include_confidence": False
    }
    
    response = requests.post(url, json=payload)
    return response.json()["tags"]

# Usage
tags = generate_tags("Tesla's electric vehicles are revolutionizing transportation")
print(tags)`,

    curl: `# cURL Example
curl -X POST "${apiBaseUrl}/api/generate-tags" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "OpenAI GPT-4 shows remarkable improvements in AI",
    "max_tags": 10,
    "include_confidence": false
  }'`
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Generate intelligent tags in milliseconds with our optimized NLP processing"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Rate Limited",
      description: "100 requests per hour per IP to ensure fair usage and stability"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Ready",
      description: "Built-in monitoring and usage statistics for tracking performance"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Well Documented",
      description: "Comprehensive API documentation with interactive examples"
    }
  ];

  const tagFormats = [
    { format: '::Topic/...', description: 'Main subjects/domains', example: '::Topic/AI, ::Topic/Healthcare' },
    { format: '::Person/...', description: 'People names', example: '::Person/Tim Cook, ::Person/Elon Musk' },
    { format: '::Company/...', description: 'Organizations/brands', example: '::Company/Apple Inc., ::Company/Google' },
    { format: '::Location/...', description: 'Cities, countries, places', example: '::Location/San Francisco, ::Location/USA' },
    { format: '//...', description: 'Emotions/narratives', example: '//Excitement, //Hope, //Concern' },
    { format: '*...', description: 'Content type', example: '*article, *announcement, *video' },
    { format: '@@...', description: 'Call-to-action', example: '@@ReadMore, @@Subscribe, @@BuyNow' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-600/20 px-4 py-2 rounded-full mb-6">
              <Code className="w-5 h-5" />
              <span className="text-sm font-medium">Public API</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              SmartTagX <span className="text-blue-400">Public API</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Integrate intelligent tag generation into your applications with our powerful, 
              production-ready API. Generate structured tags using advanced NLP processing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`${apiBaseUrl}/docs`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>View API Docs</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#try-it"
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Try It Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* API Base URL */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">API Base URL</h3>
            <div className="flex items-center space-x-3">
              <code className="text-lg font-mono bg-white px-3 py-2 rounded border flex-1">
                {apiBaseUrl}
              </code>
              <button
                onClick={() => copyToClipboard(apiBaseUrl, 'base-url')}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
              >
                {copiedCode === 'base-url' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our API?</h2>
            <p className="text-lg text-gray-600">Built for developers, by developers</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start</h2>
            <p className="text-lg text-gray-600">Get up and running in minutes</p>
          </div>
          
          {/* Code Examples */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex space-x-1 p-4">
                {(['javascript', 'python', 'curl'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6">
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                  <code>{codeExamples[activeTab]}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeExamples[activeTab], activeTab)}
                  className="absolute top-4 right-4 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  {copiedCode === activeTab ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">API Endpoints</h2>
            <p className="text-lg text-gray-600">Complete API reference</p>
          </div>
          
          <div className="space-y-6">
            {/* Generate Tags Endpoint */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">POST</span>
                <code className="text-lg font-mono">/api/generate-tags</code>
              </div>
              <p className="text-gray-600 mb-4">Generate smart tags for the provided text using advanced NLP processing.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`{
  "text": "string (required, 1-10000 chars)",
  "max_tags": "integer (optional, 1-50, default: 20)",
  "include_confidence": "boolean (optional, default: false)"
}`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`{
  "tags": ["::Topic/AI", "::Company/Apple"],
  "success": true,
  "message": "Successfully generated 2 tags",
  "processing_time_ms": 245.67,
  "text_length": 156
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Health Check Endpoint */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">GET</span>
                <code className="text-lg font-mono">/health</code>
              </div>
              <p className="text-gray-600 mb-4">Check the health status of the API and its components.</p>
            </div>

            {/* Stats Endpoint */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">GET</span>
                <code className="text-lg font-mono">/stats</code>
              </div>
              <p className="text-gray-600 mb-4">Get usage statistics for the API.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tag Format */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tag Format</h2>
            <p className="text-lg text-gray-600">Understanding the structured tag system</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Examples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tagFormats.map((tag, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{tag.format}</code>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{tag.description}</td>
                      <td className="px-6 py-4 text-gray-600">{tag.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Limits & Security */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Rate Limits & Security</h2>
            <p className="text-lg text-gray-600">Fair usage policies and security measures</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Rate Limits</h3>
              <ul className="space-y-2 text-red-800">
                <li>• 100 requests per hour per IP address</li>
                <li>• Rate limit headers included in responses</li>
                <li>• 429 status code when limit exceeded</li>
                <li>• Limits reset every hour</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Security Features</h3>
              <ul className="space-y-2 text-green-800">
                <li>• IP-based rate limiting</li>
                <li>• CORS configured for public access</li>
                <li>• Input validation and sanitization</li>
                <li>• Error handling without data exposure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Try It Section */}
      <div id="try-it" className="py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Start generating intelligent tags for your content today. No signup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${apiBaseUrl}/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>View Full Documentation</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={`${apiBaseUrl}/health`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>Check API Status</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIPage;
