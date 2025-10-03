import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';


interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Check if user just verified their email or reset password
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('verified') === 'true') {
      const pendingEmail = localStorage.getItem('pendingVerificationEmail');
      if (pendingEmail) {
        setMode('login');
        setFormData(prev => ({ ...prev, email: pendingEmail }));
        // Clear the URL parameter
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } else if (urlParams.get('reset') === 'true') {
      const resetEmail = localStorage.getItem('passwordResetEmail');
      if (resetEmail) {
        setMode('login');
        setFormData(prev => ({ ...prev, email: resetEmail }));
        // Clear the URL parameter
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } else {
      // Check for email parameter in URL
      const emailParam = urlParams.get('email');
      if (emailParam) {
        setMode('login');
        setFormData(prev => ({ ...prev, email: emailParam }));
        // Clear the email parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  // Keep mode in sync when modal opens with a different initialMode
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setSuccessMessage('');
      setIsLoading(false); // Reset loading state when modal opens
      clearError();
    }
  }, [isOpen, initialMode]);

  const { login, register, error, clearError } = useAuth();
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't set loading if fields are empty
    if (mode === 'login' && (!formData.email || !formData.password)) {
      return;
    }
    
    setIsLoading(true);
    clearError();

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        onClose();
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await register(formData.name, formData.email, formData.password);
        // Store email and password temporarily for auto-login after verification
        localStorage.setItem('pendingVerificationEmail', formData.email);
        localStorage.setItem('tempPassword', formData.password);
        
        // Close modal and redirect to signup success page
        setIsLoading(false);
        onClose();
        window.location.href = '/signup-success';
        return; // Return early to prevent further processing
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      // Error is handled by AuthContext and displayed via useAuth error state
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    const nextMode = mode === 'login' ? 'register' : 'login';
    setMode(nextMode);
    setFormData(prev => ({
      name: nextMode === 'register' ? '' : prev.name,
      email: prev.email, // preserve email to avoid retyping
      password: '',
      confirmPassword: ''
    }));
    clearError();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 border border-red-100 rounded flex items-start">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span className="break-words">{error}</span>
            </div>
          )}

          {/* Suggest signup if account not found on login */}
          {mode === 'login' && error && /not\s*found|no\s*account|user\s*not\s*found/i.test(error) && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm">
              Account not created. Please sign up first.
              <button
                type="button"
                onClick={switchMode}
                className="ml-2 underline font-medium"
              >
                Sign up
              </button>
            </div>
          )}

          {/* Name field (register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={mode === 'register'}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password field (register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={mode === 'register'}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-sm sm:text-base font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 mr-2 animate-spin" />
                Please wait...
              </>
            ) : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>

          {/* Switch Mode */}
          <div className="text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={switchMode}
                className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Forgot Password */}
          {mode === 'login' && (
            <div className="pt-3 sm:pt-4 border-t">
              <div className="text-sm text-gray-700 mb-2 font-medium">Forgot your password?</div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your account email"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="email"
                />
                <button
                  type="button"
                  className="px-3 py-2 rounded bg-gray-800 text-white flex items-center justify-center min-w-[120px]"
                  disabled={forgotLoading}
                  onClick={async () => {
                    if (!forgotEmail) return;
                    setForgotLoading(true);
                    setForgotMessage('');
                    try {
                      // Store email for automatic login after password reset
                      localStorage.setItem('passwordResetEmail', forgotEmail);
                      const base = (import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001');
                      const res = await fetch(`${base.replace(/\/+$/, '')}/api/auth/forgot-password`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: forgotEmail })
                      });
                      const data = await res.json();
                      setForgotMessage(data?.message || 'If that email exists, a reset link has been sent. Please check your inbox and spam folder.');
                    } catch (e: any) {
                      setForgotMessage('Failed to send reset link.');
                    } finally {
                      setForgotLoading(false);
                    }
                  }}
                >
                  {forgotLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                      Sending...
                    </>
                  ) : 'Send reset link'}
                </button>
              </div>
              {forgotMessage && (
                <div className="text-xs sm:text-sm text-gray-600 mt-2 px-1 break-words">
                  {forgotMessage}
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
