import React, { useState } from 'react';
import { TagChip } from './TagChip';
import { LoadingSpinner } from './LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { usageApi } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText, Zap, Target, Globe, ArrowRight, Copy, CheckSquare, Square, AlertCircle, Star, Crown, User } from 'lucide-react';

interface TagResponse {
  tags: string[];
  success: boolean;
  message: string;
}

export const MainDemo: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [inputText, setInputText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [baseLinkUrl, setBaseLinkUrl] = useState('');
  const [tagLinks, setTagLinks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [copySuccess, setCopySuccess] = useState('');
  const [copyFormat, setCopyFormat] = useState<'rich' | 'plain' | 'whatsapp'>('rich');

  // Backend API configuration (normalize trailing slashes)
  const RAW_API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, '');

  // Check if user can generate tags
  const canGenerateTags = () => {
    if (!isAuthenticated || !user) return false;
    if (user.apiUsage.monthlyLimit === -1) return true; // Unlimited
    return user.apiUsage.requestsThisMonth < user.apiUsage.monthlyLimit;
  };

  // Get remaining tags
  const getRemainingTags = () => {
    if (!isAuthenticated || !user) return 0;
    if (user.apiUsage.monthlyLimit === -1) return Infinity;
    return Math.max(0, user.apiUsage.monthlyLimit - user.apiUsage.requestsThisMonth);
  };

  // Get plan info
  const getPlanInfo = () => {
    if (!user) return { name: 'Free', icon: <Zap className="w-4 h-4" />, color: 'text-gray-600' };
    
    switch (user.subscription.plan) {
      case 'plus':
        return { name: 'Plus', icon: <Star className="w-4 h-4" />, color: 'text-blue-600' };
      case 'pro':
        return { name: 'Pro', icon: <Crown className="w-4 h-4" />, color: 'text-purple-600' };
      default:
        return { name: 'Free', icon: <Zap className="w-4 h-4" />, color: 'text-gray-600' };
    }
  };

  // Call backend API for NLP processing
  const callBackendAPI = async (text: string): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TagResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to generate tags');
      }

      return data.tags;
    } catch (error) {
      console.error('Backend API error:', error);
      throw new Error('Unable to connect to NLP backend. Please ensure the backend server is running.');
    }
  };

  const generateTags = async () => {
    if (!isAuthenticated) {
      const event = new CustomEvent('open-auth-modal', { detail: { mode: 'login' } });
      window.dispatchEvent(event);
      return;
    }

    if (!inputText.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setTags([]);
    setSelectedTags(new Set());
    setCopySuccess('');
    setTagLinks({});

    try {
      const generatedTags = await callBackendAPI(inputText);
      setTags(generatedTags);
      // Increment usage on auth backend and refresh user to update counters in real time
      try {
        await usageApi.incrementUsage();
        await refreshUser();
      } catch (e) {
        console.error('Failed to increment usage or refresh user:', e);
      }
      // If a base URL is present, auto-generate links for all newly generated tags
      if (baseLinkUrl.trim()) {
        const next: Record<string, string> = {};
        for (const t of generatedTags) {
          next[t] = buildDefaultUrl(baseLinkUrl, t);
        }
        setTagLinks(next);
      }
    } catch (err) {
      console.error('Error generating tags:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate tags. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTagSelection = (tag: string) => {
    const newSelected = new Set(selectedTags);
    if (newSelected.has(tag)) {
      newSelected.delete(tag);
    } else {
      newSelected.add(tag);
    }
    setSelectedTags(newSelected);
  };

  const selectAllTags = () => {
    setSelectedTags(new Set(tags));
  };

  const deselectAllTags = () => {
    setSelectedTags(new Set());
  };


  const legacyHtmlCopy = (html: string, plain: string) => {
    // Create a hidden, offscreen contenteditable element to copy rich HTML
    const el = document.createElement('div');
    el.setAttribute('contenteditable', 'true');
    el.style.position = 'fixed';
    el.style.left = '-9999px';
    el.style.top = '0';
    el.innerHTML = html;
    document.body.appendChild(el);

    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);

    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (_) {
      ok = false;
    }

    // Cleanup
    sel?.removeAllRanges();
    document.body.removeChild(el);

    // Fallback to plain text if execCommand failed
    if (!ok) {
      return navigator.clipboard.writeText(plain);
    }
    return Promise.resolve();
  };

  const copyHtmlToClipboard = (html: string, plain: string) => {
    // Create a temporary container with the HTML content
    const container = document.createElement('div');
    container.innerHTML = html;
    
    // Add the container to the DOM (but keep it hidden)
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    document.body.appendChild(container);
    
    // Select the content
    const range = document.createRange();
    range.selectNode(container);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    
    // Execute the copy command
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    
    // Clean up
    selection?.removeAllRanges();
    document.body.removeChild(container);
    
    return success;
  };

  const copyWithHtmlFallback = async (plain: string, html: string) => {
    try {
      // Try the modern clipboard API first
      if (navigator.clipboard && 'write' in navigator.clipboard) {
        try {
          const data = [
            new ClipboardItem({
              'text/plain': new Blob([plain], { type: 'text/plain' }),
              'text/html': new Blob([html], { type: 'text/html' })
            })
          ];
          // @ts-ignore - ClipboardItem type
          await navigator.clipboard.write(data);
          setCopySuccess('Copied!');
          setTimeout(() => setCopySuccess(''), 2000);
          return;
        } catch (err) {
          console.log('Modern clipboard API failed, falling back to execCommand');
        }
      }
      
      // Fallback to execCommand
      const success = copyHtmlToClipboard(html, plain);
      
      if (success) {
        setCopySuccess('Copied!');
      } else {
        // Last resort: copy as plain text
        await navigator.clipboard.writeText(plain);
        setCopySuccess('Copied as plain text');
      }
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      setCopySuccess('Copy failed');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  const copySelectedTags = async () => {
    const selected = Array.from(selectedTags);
    
    if (copyFormat === 'plain') {
      // Each tag on a new line for plain text
      await navigator.clipboard.writeText(selected.join('\n'));
      setCopySuccess('Copied as plain text!');
    } else if (copyFormat === 'whatsapp') {
      // Each tag on a new line for WhatsApp
      const whatsappText = selected.map(tag => {
        const url = tagLinks[tag];
        return url ? `${tag}\n${url}` : tag;
      }).join('\n');
      await navigator.clipboard.writeText(whatsappText);
      setCopySuccess('Copied in WhatsApp format!');
    } else {
      // Rich text format - each tag on a new line
      const plain = selected.join('\n');
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>SmartTagX Tags</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                line-height: 1.8;
                margin: 0;
                padding: 10px;
              }
              a, span { 
                display: block;
                padding: 4px 0;
                color: #2563eb;
                text-decoration: none;
              }
              a:hover { 
                text-decoration: underline; 
              }
              .tag {
                white-space: nowrap;
              }
            </style>
          </head>
          <body>
            ${selected
              .map(tag => {
                const url = tagLinks[tag];
                return url 
                  ? `<a href="${url}" class="tag">${tag}</a>`
                  : `<span class="tag">${tag}</span>`;
              })
              .join('\n')}
          </body>
        </html>`;
      
      await copyWithHtmlFallback(plain, html);
    }
    
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const formatForWhatsApp = (tags: string[]) => {
    return tags
      .map(tag => {
        const url = tagLinks[tag];
        return url ? `${tag}\n${url}` : tag;
      })
      .join('\n\n'); // Double newline for better separation
  };

  const copyAllTags = async () => {
    if (copyFormat === 'plain') {
      // Each tag on a new line for plain text
      await navigator.clipboard.writeText(tags.join('\n'));
      setCopySuccess('Copied as plain text!');
    } else if (copyFormat === 'whatsapp') {
      // Each tag on a new line for WhatsApp with URLs on new lines
      const whatsappText = tags.map(tag => {
        const url = tagLinks[tag];
        return url ? `${tag}\n${url}` : tag;
      }).join('\n\n');
      await navigator.clipboard.writeText(whatsappText);
      setCopySuccess('Copied in WhatsApp format!');
    } else {
      // Rich text format - each tag on a new line
      const plain = tags.join('\n');
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>SmartTagX Tags</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.8;
              margin: 0;
              padding: 10px;
            }
            a, span { 
              display: block;
              padding: 4px 0;
              color: #2563eb;
              text-decoration: none;
            }
            a:hover { 
              text-decoration: underline; 
            }
            .tag {
              white-space: nowrap;
            }
          </style>
        </head>
        <body>
          ${tags.map(tag => {
            const url = tagLinks[tag];
            return url 
              ? `<a href="${url}" class="tag">${tag}</a>`
              : `<span class="tag">${tag}</span>`;
          }).join('\n')}
        </body>
        </html>
      `;
      
      await copyWithHtmlFallback(plain, html);
    }
    
    setTimeout(() => setCopySuccess(''), 2000);
  };

  // ----- Tag hyperlink helpers -----
  const buildDefaultUrl = (base: string, tag: string) => {
    const clean = base.replace(/\/+$/, '');
    const q = encodeURIComponent(tag);
    return `${clean}?q=${q}`;
  };

  const applyBaseUrlToAll = () => {
    const base = baseLinkUrl.trim();
    if (!base) return;
    const next: Record<string, string> = {};
    for (const t of tags) {
      next[t] = buildDefaultUrl(base, t);
    }
    setTagLinks(next);
  };

  const setIndividualLink = (tag: string, url: string) => {
    setTagLinks(prev => ({ ...prev, [tag]: url }));
  };

  const addCustomTag = () => {
    const t = customTag.trim();
    if (!t) return;
    if (!tags.includes(t)) {
      setTags([...tags, t]);
      // If base URL exists, set default link for new tag
      if (baseLinkUrl.trim()) {
        setTagLinks(prev => ({ ...prev, [t]: buildDefaultUrl(baseLinkUrl, t) }));
      }
    }
    setCustomTag('');
  };

  const editTag = (oldTag: string, newTag: string) => {
    setTags(tags.map(t => (t === oldTag ? newTag : t)));
    if (selectedTags.has(oldTag)) {
      const s = new Set(selectedTags);
      s.delete(oldTag);
      s.add(newTag);
      setSelectedTags(s);
    }
    // Move any link mapping to new tag key
    setTagLinks(prev => {
      const next = { ...prev } as Record<string, string>;
      if (next[oldTag]) {
        next[newTag] = next[oldTag];
        delete next[oldTag];
      }
      return next;
    });
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
    if (selectedTags.has(tag)) {
      const s = new Set(selectedTags);
      s.delete(tag);
      setSelectedTags(s);
    }
    setTagLinks(prev => {
      const next = { ...prev } as Record<string, string>;
      delete next[tag];
      return next;
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      generateTags();
    }
  };

  const exampleTexts = [
    "Thoughtiv is a digital transformation and software development agency delivering custom solutions—web, mobile, SaaS, IT consulting, and cybersecurity—that empower global clients to innovate, grow, and enhance efficiency. With cutting-edge technologies and a client-focused approach, we drive measurable results and a smarter, interconnected future. Head office: Hyderabad, India.",
    "I'm excited to announce our new AI-powered healthcare solution launching in Mumbai next month. Dr. Priya Sharma from Google will be presenting the revolutionary treatment at the Bandra-Kurla Complex. Watch our demo video to learn more!"
  ];

  return (
    <section id="demo" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Disclaimer (highlighted in red) */}
        <div className="mb-8 rounded-2xl border-2 border-red-400 bg-red-100 p-5 text-red-900 shadow-sm">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 mt-0.5 text-red-700" />
            <div>
              <div className="font-semibold mb-1 text-red-900">Disclaimer</div>
              <p className="text-sm leading-relaxed">SmartTagX may occasionally err. Please review and edit generated tags before use.</p>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
              <img src="/logos/Smarttagx.png" alt="SmartTagX Logo" className="h-12 w-auto" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-secondary-900 mb-6">
            Experience the Future
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            With SmartTagX AI, every piece of content becomes easier to
            understand, search, and connect. It's the future of smart organization — automatic,
            accurate, and effortless.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Input Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-slate-100 p-3 rounded-xl">
                  <FileText className="w-8 h-8 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Input Your Content</h3>
                  <p className="text-gray-600">Paste any text and watch the magic happen</p>
                </div>
              </div>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Paste your blog post, social media caption, or any text content here..."
                className="w-full h-80 p-6 border-2 border-gray-200 rounded-2xl resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-lg placeholder-gray-400"
                disabled={loading}
              />
              
              {/* Usage Display */}
              {isAuthenticated && user && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-white ${getPlanInfo().color}`}>
                        {getPlanInfo().icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{getPlanInfo().name} Plan</p>
                        <p className="text-sm text-gray-600">
                          {user.apiUsage.requestsThisMonth} / {user.apiUsage.monthlyLimit === -1 ? '∞' : user.apiUsage.monthlyLimit} tags used
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {canGenerateTags() ? (
                        <p className="text-sm text-green-600 font-medium">
                          {user.apiUsage.monthlyLimit === -1 ? '∞' : getRemainingTags()} tags remaining
                        </p>
                      ) : (
                        <div className="flex items-center space-x-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <p className="text-sm font-medium">Limit reached</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  {user.apiUsage.monthlyLimit !== -1 && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min((user.apiUsage.requestsThisMonth / user.apiUsage.monthlyLimit) * 100, 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Upgrade Prompt */}
                  {!canGenerateTags() && user.subscription.plan === 'free' && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800 mb-2">You've used all your free tags this month! Upgrade to unlock more.</p>
                      <div className="flex space-x-2">
                        <button onClick={() => navigate('/pricing')} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                          Upgrade to Plus
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-6">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {inputText.length} characters • Press Ctrl+Enter to analyze
                </span>
                <button
                  onClick={generateTags}
                  disabled={loading || !inputText.trim() || (isAuthenticated && !canGenerateTags())}
                  className="group bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-900 focus:ring-4 focus:ring-slate-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner />
                      <span>Analyzing...</span>
                    </>
                  ) : isAuthenticated && !canGenerateTags() ? (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      <span>Limit Reached</span>
                    </>
                  ) : !isAuthenticated ? (
                    <>
                      <User className="w-5 h-5" />
                      <span>Login to Generate</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Generate Tags</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Example Texts */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl shadow-xl p-8 border border-slate-200">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-7 h-7 text-slate-600" />
                <h3 className="text-xl font-bold text-gray-900">Try These Examples</h3>
              </div>
              <div className="space-y-4">
                {exampleTexts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(example)}
                    className="w-full text-left p-5 bg-white rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 hover:border-blue-200 border-2 border-gray-200 transition-all duration-300 text-sm text-gray-700 hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    <div className="font-medium text-gray-900 mb-2">Example {index + 1}</div>
                    {example.substring(0, 120)}...
                  </button>
                ))}
              </div>
            </div>

            {/* (moved) base URL controls now live in the Results box header */}
          </div>

          {/* Results Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 min-h-[600px] hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-2xl">
                  <Sparkles className="w-8 h-8 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">SmartTagX Results</h3>
                  <p className="text-gray-600">Intelligent, contextual, spam-free tags</p>
                </div>
              </div>

              {/* Base URL controls at top of results */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <label className="text-sm text-slate-600">Common URL for all tags</label>
                  <div className="flex gap-3 w-full">
                    <input
                      type="url"
                      placeholder="https://example.com/search"
                      value={baseLinkUrl}
                      onChange={(e) => setBaseLinkUrl(e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                    />
                    <button
                      onClick={applyBaseUrlToAll}
                      disabled={!baseLinkUrl.trim() || tags.length === 0}
                      className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">We link tags using <code>?q=tag</code>. Edit any tag's URL via the link icon.</p>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative">
                    <img src="/logos/Smarttagx.png" alt="Smarttagx" className="h-12 w-auto object-contain opacity-90 animate-smarttagx-bounce rounded-md" />
                  </div>
                  <p className="text-gray-700 mt-6 text-lg font-medium">Smarttagx is analysing your content...</p>
                  <p className="text-gray-500 mt-2">This may take a few seconds</p>
                </div>
              )}

              {tags.length > 0 && !loading && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <p className="text-green-800 font-semibold mb-2">
                      ✨ Generated {tags.length} intelligent tags:
                    </p>
                  </div>

                  {/* Tag Selection Controls */}
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <button
                        onClick={selectAllTags}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                      >
                        <CheckSquare className="w-4 h-4" />
                        Select All
                      </button>
                      <button
                        onClick={deselectAllTags}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        <Square className="w-4 h-4" />
                        Deselect All
                      </button>
                      <div className="flex-1"></div>
                      <div className="mt-4 space-y-3">
                        {/* Format Toggle */}
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">Copy as:</span>
                          <div className="flex gap-2">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="radio"
                                name="copyFormat"
                                checked={copyFormat === 'rich'}
                                onChange={() => setCopyFormat('rich')}
                                className="text-blue-600"
                              />
                              Rich Text
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="radio"
                                name="copyFormat"
                                checked={copyFormat === 'whatsapp'}
                                onChange={() => setCopyFormat('whatsapp')}
                                className="text-blue-600"
                              />
                              WhatsApp
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="radio"
                                name="copyFormat"
                                checked={copyFormat === 'plain'}
                                onChange={() => setCopyFormat('plain')}
                                className="text-blue-600"
                              />
                              Plain Text
                            </label>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={copySelectedTags}
                            disabled={selectedTags.size === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Copy className="w-4 h-4" />
                            Copy Selected ({selectedTags.size})
                          </button>
                          <button
                            onClick={copyAllTags}
                            disabled={tags.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Copy className="w-4 h-4" />
                            Copy All ({tags.length})
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={copySelectedTags}
                        disabled={selectedTags.size === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Selected ({selectedTags.size})
                      </button>
                      <button
                        onClick={copyAllTags}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                      >
                        <Copy className="w-4 h-4" />
                        Copy All
                      </button>
                    </div>
                    
                    {copySuccess && (
                      <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
                        {copySuccess}
                      </div>
                    )}
                  </div>

                  {/* Tags Display */}
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag, index) => (
                      <TagChip 
                        key={index} 
                        tag={tag} 
                        isSelected={selectedTags.has(tag)}
                        onToggle={toggleTagSelection}
                        showCheckbox={true}
                        editable={true}
                        onEdit={editTag}
                        onRemove={removeTag}
                        href={tagLinks[tag]}
                        onEditLink={setIndividualLink}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      placeholder="Add custom tag (e.g., ::Topic/Web Development)"
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                    />
                    <button
                      onClick={addCustomTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>
              )}

              {!loading && tags.length === 0 && !error && (
                <div className="text-center py-20">
                  <div className="relative mb-6">
                    <div className="relative bg-slate-900 p-6 rounded-full mx-auto w-fit">
                      <Sparkles className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Ready to transform your content?</h4>
                  <p className="text-gray-600 mb-4">Enter some text above and click "Generate Tags"</p>
                  <p className="text-sm text-gray-500">You can edit tags to better fit your needs</p>
                </div>
              )}
            </div>

            {/* Tag Legend */}
            <div className="bg-slate-50 rounded-3xl shadow-xl p-8 border border-slate-200">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-7 h-7 text-slate-700" />
                <h3 className="text-xl font-bold text-gray-900">SmartTagX Categories</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <span className="text-slate-800 font-bold">🎯 ::Topic/</span>
                  <span className="text-gray-700">Main subjects & themes</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <span className="text-slate-800 font-bold">👤 @Person/</span>
                  <span className="text-gray-700">People & personalities</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <span className="text-slate-800 font-bold">🏢 /Company/</span>
                  <span className="text-gray-700">Organizations & brands</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <span className="text-slate-800 font-bold">📦 :Product/</span>
                  <span className="text-gray-700">Products & services</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <span className="text-slate-800 font-bold">📍 //Location/</span>
                  <span className="text-gray-700">Places & regions</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <span className="text-slate-800 font-bold">💭 !!Emotion/</span>
                  <span className="text-gray-700">Emotions & sentiment</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <span className="text-slate-800 font-bold">📄 &lt;Type/</span>
                  <span className="text-gray-700">Content type</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <span className="text-gray-700 font-bold">📏 ^Length/</span>
                  <span className="text-gray-700">Short | Medium | Long</span>
                </div>
              </div>
              <div className="bg-white/70 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
                <p className="font-semibold mb-1">Disclaimer</p>
                <p>
                  SmartTagX uses a lightweight, CPU‑friendly NLP pipeline. While it strives for high accuracy,
                  some tags may need human review. Please edit, add, or remove tags above to ensure they match your intent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
