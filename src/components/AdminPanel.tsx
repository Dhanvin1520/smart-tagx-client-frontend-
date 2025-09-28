import React, { useEffect, useMemo, useState } from 'react';
import { adminApi } from '../services/authApi';
import { useAuth } from '../contexts/AuthContext';
import { Crown, ShieldAlert, Trash2, Users, RefreshCw, ChevronDown } from 'lucide-react';

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  subscription: {
    plan: 'free' | 'plus' | 'pro';
    status: string;
  };
  apiUsage: {
    requestsThisMonth: number;
    monthlyLimit: number;
  };
  createdAt?: string;
}

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await adminApi.listUsers();
      setUsers(res);
      setError('');
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changePlan = async (id: string, plan: 'free' | 'plus' | 'pro') => {
    try {
      setUpdatingId(id);
      await adminApi.updateUserPlan(id, plan);
      await loadUsers();
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to update plan');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      setDeletingId(id);
      await adminApi.deleteUser(id);
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeletingId(null);
    }
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a.email.localeCompare(b.email));
  }, [users]);

  return (
    <section className="py-16 bg-gray-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-800 text-white"><ShieldAlert className="w-6 h-6"/></div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
              <p className="text-slate-600 text-sm">Manage users, plans, and access</p>
            </div>
          </div>
          <button onClick={loadUsers} className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}/>
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2 text-slate-700">
            <Users className="w-4 h-4"/> Users ({sortedUsers.length})
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 text-left text-slate-600 text-sm">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Usage</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedUsers.map(u => (
                  <tr key={u._id} className="text-sm">
                    <td className="p-3 font-medium text-slate-900">{u.name || '-'}</td>
                    <td className="p-3 text-slate-700">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>{u.role}</span>
                    </td>
                    <td className="p-3">
                      <div className="inline-flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${u.subscription.plan === 'pro' ? 'bg-emerald-100 text-emerald-700' : u.subscription.plan === 'plus' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{u.subscription.plan}</span>
                        <span className="text-xs text-slate-500">({u.subscription.status})</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-700">
                      {u.apiUsage?.requestsThisMonth ?? 0} / {u.apiUsage?.monthlyLimit === -1 ? '∞' : u.apiUsage?.monthlyLimit ?? 0}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <button disabled={updatingId===u._id} onClick={() => changePlan(u._id, 'free')} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-50">Free</button>
                        <button disabled={updatingId===u._id} onClick={() => changePlan(u._id, 'plus')} className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50">Plus</button>
                        <button disabled={updatingId===u._id} onClick={() => changePlan(u._id, 'pro')} className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50">Pro</button>
                        <button disabled={deletingId===u._id || (user && user.email === u.email)} onClick={() => deleteUser(u._id)} className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 disabled:opacity-50 flex items-center gap-1">
                          <Trash2 className="w-4 h-4"/> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sortedUsers.length === 0 && !loading && (
                  <tr>
                    <td className="p-6 text-center text-slate-500" colSpan={6}>No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-500">Only admins can access this page.</div>
      </div>
    </section>
  );
};

export default AdminPanel;
