import React, { useState } from 'react';
import { User, LogOut, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'text-gray-600 bg-gray-100';
      case 'plus': return 'text-blue-600 bg-blue-100';
      case 'pro': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPlanIcon = () => <Zap className="w-5 h-5" />;

  const getPlanLimits = (plan: string) => {
    switch (plan) {
      case 'free': return { tags: 20 };
      case 'plus': return { tags: 150 };
      case 'pro': return { tags: -1 };
      default: return { tags: 20 };
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between mb-6 flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto min-w-0">
          <div className="bg-blue-100 p-2 rounded-lg">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-600 truncate max-w-full sm:max-w-[220px] md:max-w-xs break-all">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center justify-center space-x-2 text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50 w-full sm:w-auto sm:self-auto"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Subscription Status */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Subscription</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getPlanColor(user.subscription.plan)}`}>
                {getPlanIcon()}
              </div>
              <div>
                <p className="font-medium text-gray-900 capitalize">{user.subscription.plan} Plan</p>
                <p className="text-sm text-gray-600">
                  Status: <span className={`font-medium ${
                    user.subscription.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {user.subscription.status}
                  </span>
                </p>
              </div>
            </div>
            {/* Manage hidden for now */}
          </div>
          
          {/* Plan Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Monthly Limit:</span>
              <span className="font-medium ml-2">
                {getPlanLimits(user.subscription.plan).tags === -1 ? 'Unlimited' : getPlanLimits(user.subscription.plan).tags} tags
              </span>
            </div>
            {/* Price removed */}
          </div>
          
          {/* Upgrade options removed */}
        </div>
      </div>

      {/* API Usage */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">API Usage</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">This Month</span>
            <span className="font-medium">
              {user.apiUsage.requestsThisMonth.toLocaleString()} / {user.apiUsage.monthlyLimit.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((user.apiUsage.requestsThisMonth / user.apiUsage.monthlyLimit) * 100, 100)}%`
              }}
            />
          </div>
          <p className="text-sm text-gray-500">
            {user.apiUsage.monthlyLimit - user.apiUsage.requestsThisMonth} requests remaining
          </p>
        </div>
      </div>

      {/* Quick Actions removed */}
    </div>
  );
};

export default UserDashboard;
