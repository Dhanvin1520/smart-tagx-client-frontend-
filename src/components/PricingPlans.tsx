import React, { useState } from 'react';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PricingPlans = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      popular: false,
      limits: {
        tags: 20,
        requests: '20 tags/month',
        features: ['Basic tag generation', 'Standard accuracy', 'Email support']
      }
    },
    {
      name: 'Plus',
      price: 9.99,
      period: 'month',
      icon: <Star className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      popular: true,
      limits: {
        tags: 150,
        requests: '150 tags/month',
        features: ['Advanced tag generation', 'Higher accuracy', 'Priority support', 'Bulk processing']
      }
    },
    {
      name: 'Pro',
      price: 29.99,
      period: 'month',
      icon: <Crown className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-200',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      popular: false,
      limits: {
        tags: -1,
        requests: 'Unlimited',
        features: ['Unlimited tag generation', 'Highest accuracy', 'API access', 'Custom models', 'Priority support', 'Bulk processing']
      }
    }
  ];

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
      // Here you would integrate with Stripe
      console.log(`Upgrading to ${planName} plan`);
      // For now, just show a message
      alert(`Upgrade to ${planName} plan - Stripe integration coming soon!`);
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
            Select the perfect plan for your tag generation needs. Upgrade or downgrade at any time.
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
                    {currentPlan.limits.requests} • ${currentPlan.price}/{currentPlan.period}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {user.apiUsage.requestsThisMonth} / {user.apiUsage.monthlyLimit} tags used this month
                </p>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((user.apiUsage.requestsThisMonth / user.apiUsage.monthlyLimit) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
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
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.limits.requests}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.limits.features.map((feature, index) => (
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

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h4>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What happens to unused tags?</h4>
              <p className="text-gray-600">Unused tags don't roll over to the next month. Your limit resets each billing cycle.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600">Yes! The Free plan gives you 20 tags per month to try our service.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600">Absolutely. You can cancel your subscription at any time with no cancellation fees.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
