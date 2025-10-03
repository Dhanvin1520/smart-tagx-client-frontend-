import React, { useEffect, useState } from 'react';
import { authApi } from '../services/authApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, Mail, AlertCircle } from 'lucide-react';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying your email...');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token') || '';
    const verify = async () => {
      try {
        await authApi.verifyEmail(token);
        setMessage('Email verified! Logging you in...');

        // Get user email from localStorage (set during registration)
        const userEmail = localStorage.getItem('pendingVerificationEmail');
        if (userEmail) {
          localStorage.removeItem('pendingVerificationEmail');
          
          // Try auto-login if we have credentials
          // Remove auto-login attempt and directly redirect to login page
          localStorage.removeItem('tempPassword');
          // Redirect to login page immediately with verified flag
          navigate(`/login?verified=true&email=${encodeURIComponent(userEmail)}`, { replace: true });
        } else {
          setTimeout(() => navigate('/', { replace: true }), 1500);
        }
      } catch (e: any) {
        setMessage(e?.response?.data?.message || 'Verification failed.');
      }
    };
    if (token) verify();
    else {
      setMessage('Invalid verification link.');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full p-6 rounded-lg border border-slate-200 bg-white">
        <h1 className="text-xl font-semibold mb-4 flex items-center">
          <Mail className="w-6 h-6 mr-2 text-blue-600" />
          Email Verification
        </h1>
        
        {message === 'Verifying your email...' && (
          <div className="flex items-center text-slate-700 mb-2">
            <Loader2 className="w-5 h-5 mr-2 text-blue-600 animate-spin" />
            {message}
          </div>
        )}
        
        {message.includes('failed') || message.includes('Invalid') ? (
          <div className="text-red-600 flex items-start mb-4">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{message}</p>
              <p className="text-sm mt-2">If you're having trouble verifying your email:</p>
              <ul className="list-disc ml-5 text-sm mt-1 text-red-700">
                <li>Check if the verification link has expired</li>
                <li>Try requesting a new verification email</li>
                <li>Contact support if the issue persists</li>
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-slate-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;


