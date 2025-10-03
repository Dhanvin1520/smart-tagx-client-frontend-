import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';
import { Loader2 } from 'lucide-react';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const token = searchParams.get('token') || '';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setStatus('error');
      setMessage('Invalid reset link.');
      return;
    }
    if (!password || password !== confirm) {
      setStatus('error');
      setMessage('Passwords do not match.');
    }
    try {
      setSubmitting(true);
      await authApi.resetPassword(token, password);
      setStatus('success');
      setMessage('Password reset successful! Please log in with your new password.');

      // Redirect to login page after password reset
      setTimeout(() => {
        navigate('/login?reset=true', { replace: true });
      }, 2000);
    } catch (e: any) {
      setStatus('error');
      setMessage(e?.response?.data?.message || 'Reset failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={onSubmit} className="max-w-md w-full p-6 rounded-lg border bg-white">
        <h1 className="text-xl font-semibold mb-2">Reset Password</h1>
        {message && (
          <div className={`mb-3 text-sm ${status==='success' ? 'text-emerald-700' : status==='error' ? 'text-red-700' : 'text-slate-700'}`}>{message}</div>
        )}
        <div className="space-y-3">
          <input className="w-full border rounded p-2" type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input className="w-full border rounded p-2" type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>
        <button disabled={submitting} className="mt-4 w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50 flex items-center justify-center">
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Please wait...
            </>
          ) : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;


