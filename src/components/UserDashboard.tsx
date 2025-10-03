import React, { useState } from 'react';
import { User, LogOut, Zap, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserDashboard: React.FC = () => {
  const { user, logout, resendVerification } = useAuth();
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

  const handleResendVerification = async () => {
    try {
      await resendVerification();
      // Success message could be shown here if needed
    } catch (error) {
      // Error message could be shown here if needed
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
    <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-120px)] max-h-[80vh] md:max-h-[calc(100vh-120px)]">
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
      {/* User Info */}
      <div className="mb-6 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="text-gray-600 font-medium min-w-[100px]">Name:</span>
            <span className="mt-1 sm:mt-0 sm:ml-2 font-medium">{user.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <span className="text-gray-600 font-medium min-w-[100px]">Email:</span>
            <span className="mt-1 sm:mt-0 sm:ml-2 break-all">{user.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="text-gray-600 font-medium min-w-[100px]">Account Type:</span>
            <span className="mt-1 sm:mt-0 sm:ml-2 capitalize font-medium">{user.subscription?.plan || 'Free'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="text-gray-600 font-medium min-w-[100px]">Status:</span>
            <span className="mt-1 sm:mt-0 sm:ml-2">
              {user.isEmailVerified ? (
                <span className="text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              ) : (
                <span className="text-yellow-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Pending Verification
                </span>
              )}
            </span>
          </div>
        </div>
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

      {/* SmartTagX Usage */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">SmartTagX Usage</h3>
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

      {/* Email Verification Status */}
      {!user.isEmailVerified && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Mail className="w-5 h-5 text-yellow-600" />
            <div>
              <h3 className="font-medium text-yellow-800">Email Verification Required</h3>
              <p className="text-sm text-yellow-700">Please verify your email to access all features.</p>
              <p className="text-xs text-yellow-700 mt-1">Check your inbox and spam folder for the verification email.</p>
            </div>
          </div>
          <button
            onClick={handleResendVerification}
            className="text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors flex items-center"
          >
            <Mail className="w-4 h-4 mr-1" />
            Resend Verification Email
          </button>
        </div>
      )}

      {/* Account Actions - Removed password change option as requested */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3"></h3>
        <div className="space-y-3">
          {/* Future account actions can be added here */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
