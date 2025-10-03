import React, { useState } from 'react';
import { Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../services/authApi';

const SignupSuccessPage: React.FC = () => {
  const { resendVerification } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  
  const handleResendVerification = async () => {
    setIsResending(true);
    setResendMessage('');
    try {
      // Get the email from localStorage that was stored during registration
      const email = localStorage.getItem('pendingVerificationEmail');
      if (!email) {
        throw new Error('Email not found. Please try registering again.');
      }
      
      // Call the API directly instead of using the context method
      await authApi.resendVerification(email);
      setResendMessage('Verification email resent successfully! Please check your inbox and spam folder.');
    } catch (error) {
      setResendMessage('Failed to resend verification email. Please try again.');
      console.error('Resend verification error:', error);
    } finally {
      setIsResending(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registration Successful!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please check your email to verify your account
          </p>
        </div>
        
        <div className="mt-8 bg-blue-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <Mail className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Verification Email Sent
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  We've sent a verification link to your email address. Please check your inbox and spam folder.
                </p>
                <p className="mt-2">
                  You won't be able to access the application until your email is verified.
                </p>
              </div>
            </div>
          </div>
        </div>

        {resendMessage && (
          <div className={`mt-4 p-3 rounded-md text-sm ${resendMessage.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {resendMessage}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleResendVerification}
            disabled={isResending}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isResending ? (
              <>
                <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="-ml-1 mr-2 h-4 w-4" />
                Resend Verification Email
              </>
            )}
          </button>
          
          <Link to="/" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccessPage;