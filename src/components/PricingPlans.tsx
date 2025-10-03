import React, { useEffect, useState } from 'react';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PricingPlans = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const [plans, setPlans] = useState<any[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');

  const AUTH_BASE = (import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001').replace(/\/+$/, '');

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setFetching(true);
        setFetchError('');
        const res = await fetch(`${AUTH_BASE}/api/payments/plans`, { cache: 'no-store' as RequestCache });
        const data = await res.json();
        if (!res.ok || data?.success === false) {
          throw new Error(data?.message || `Failed to load plans (${res.status})`);
        }
        const uiByCode: Record<string, any> = {
          free: {
            icon: <Zap className="w-6 h-6" />,
            color: 'text-gray-600',
            bgColor: 'bg-gray-100',
            borderColor: 'border-gray-200',
            buttonColor: 'bg-gray-600 hover:bg-gray-700'
          },
          plus: {
            icon: <Star className="w-6 h-6" />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            borderColor: 'border-blue-200',
            buttonColor: 'bg-blue-600 hover:bg-blue-700'
          },
          pro: {
            icon: <Crown className="w-6 h-6" />,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
            borderColor: 'border-purple-200',
            buttonColor: 'bg-purple-600 hover:bg-purple-700'
          }
        };

        const mapped = (data?.data || []).map((p: any) => {
          const code = (p.code || '').toLowerCase();
          const ui = uiByCode[code] || uiByCode['free'];
          return {
            name: p.name,
            price: p.amount,
            period: p.interval,
            code,
            popular: code === 'plus',
            limits: {
              tags: p.monthlyRequests,
              requests: p.monthlyRequests === -1 ? 'Unlimited' : `${p.monthlyRequests} tags/month`,
              features: p.features?.length ? p.features : []
            },
            description: p.description || '',
            ...ui
          };
        });
        // Sort by code priority or server sort if present
        const order = { free: 0, plus: 1, pro: 2 } as any;
        mapped.sort((a: any, b: any) => (order[a.code] ?? 99) - (order[b.code] ?? 99));
        setPlans(mapped);
      } catch (e: any) {
        console.error('Failed to load plans', e);
        setFetchError(e?.message || 'Failed to load plans');
      } finally {
        setFetching(false);
      }
    };
    loadPlans();
  }, []);

  const handleUpgrade = async (planName: string) => {
    if (!user) {
      // Redirect to login
      return;
    }

    if (user.subscription.plan === planName.toLowerCase()) {
      return; // Already on this plan
    }

    setIsLoading(planName);
    
    try {
      const res = await fetch(`${AUTH_BASE}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`
        },
        body: JSON.stringify({
          plan: planName.toLowerCase(),
          successUrl: window.location.origin + '/?checkout=success',
          cancelUrl: window.location.origin + '/pricing?checkout=cancel'
        })
      });
      const data = await res.json();
      if (data?.success && data?.data?.url) {
        window.location.href = data.data.url;
      } else {
        throw new Error(data?.message || 'Failed to start checkout');
      }
    } catch (error) {
      console.error('Upgrade error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const getCurrentPlan = () => {
    if (!user) return null;
    return plans.find(plan => plan.name.toLowerCase() === user.subscription.plan);
  };

  const currentPlan = getCurrentPlan();

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your tag generation needs. 
          </p>
        </div>

        {/* Current Plan Status */}
        {user && currentPlan && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${currentPlan.bgColor}`}>
                  {currentPlan.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Current Plan: {currentPlan.name}</h3>
                  <p className="text-sm text-gray-600">
                    {currentPlan.limits.requests} • ₹{currentPlan.price}/{currentPlan.period}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {user.subscription.plan === 'pro'
                    ? 'Unlimited usage'
                    : `${user.apiUsage.requestsThisMonth} / ${user.apiUsage.monthlyLimit === -1 ? '∞' : user.apiUsage.monthlyLimit} tags used this month`
                  }
                </p>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${user.subscription.plan === 'pro' ? '0' : Math.min((user.apiUsage.requestsThisMonth / user.apiUsage.monthlyLimit) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty/Loading/Error states */}
        {fetching && (
          <div className="text-center text-gray-600 py-12">Loading plans…</div>
        )}
        {!fetching && fetchError && (
          <div className="text-center text-red-600 py-6">
            {fetchError}
            <div className="mt-4">
              <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gray-800 text-white rounded">Retry</button>
            </div>
          </div>
        )}
        {!fetching && !fetchError && plans.length === 0 && (
          <div className="text-center text-gray-600 py-12">
            No plans available yet. Please check back later.
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isCurrentPlan = user && user.subscription.plan === plan.name.toLowerCase();
            const isUpgrade = user && plan.price > (currentPlan?.price || 0);
            
            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-xl shadow-lg border-2 ${
                  plan.popular ? 'border-blue-500 scale-105' : plan.borderColor
                } overflow-hidden`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="absolute top-0 left-0 bg-green-600 text-white px-4 py-1 text-sm font-medium">
                    Current Plan
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${plan.bgColor} mb-4`}>
                      <div className={plan.color}>
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price === 0 ? '₹0' : `₹${plan.price}`}</span>
                      <span className="text-gray-600">/{plan.period.charAt(0).toUpperCase() + plan.period.slice(1)}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{plan.limits.requests}</p>
                    {plan.description && (
                      <p className="text-sm text-gray-500 italic">{plan.description}</p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.limits.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <button
                    onClick={() => handleUpgrade(plan.name)}
                    disabled={isCurrentPlan || isLoading === plan.name}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isCurrentPlan
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : isUpgrade
                        ? plan.buttonColor + ' text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}
                  >
                    {isLoading === plan.name ? (
                      'Processing...'
                    ) : isCurrentPlan ? (
                      'Current Plan'
                    ) : isUpgrade ? (
                      <>
                        Upgrade to {plan.name}
                        <ArrowRight className="w-4 h-4 ml-2 inline" />
                      </>
                    ) : (
                      'Get Started'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default PricingPlans;
