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
  // Plans state
  const [plans, setPlans] = useState<any[]>([]);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [savingPlan, setSavingPlan] = useState(false);
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);

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

  const authBase = (import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001').replace(/\/+$/, '');

  const loadPlans = async () => {
    try {
      const res = await fetch(`${authBase}/api/admin/plans`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}` }
      });
      const json = await res.json();
      if (json?.success) setPlans(json.data || []);
    } catch (e) {
      console.error('Failed to load plans', e);
    }
  };

  useEffect(() => {
    loadUsers();
    loadPlans();
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

        {/* Plans management */}
        <div className="mt-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between text-slate-700">
            <div className="font-medium">Plans ({plans.length})</div>
            <button
              onClick={() => setEditingPlan({ name: '', code: '', description: '', currency: 'inr', amount: 0, interval: 'month', monthlyRequests: 20, features: [], isActive: true, sortOrder: plans.length })}
              className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
            >
              New Plan
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 text-left text-slate-600 text-sm">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Amount (₹)</th>
                  <th className="p-3">Interval</th>
                  <th className="p-3">Monthly Requests</th>
                  <th className="p-3">Active</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {plans.map((p) => (
                  <tr key={p._id} className="text-sm">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.code}</td>
                    <td className="p-3">{p.amount}</td>
                    <td className="p-3">{p.interval}</td>
                    <td className="p-3">{p.monthlyRequests === -1 ? 'Unlimited' : p.monthlyRequests}</td>
                    <td className="p-3">{p.isActive ? 'Yes' : 'No'}</td>
                    <td className="p-3 flex gap-2">
                      <button className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200" onClick={() => setEditingPlan(p)}>Edit</button>
                      <button
                        className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 disabled:opacity-50"
                        onClick={async () => {
                          if (!confirm('Delete this plan?')) return;
                          try {
                            setDeletingPlanId(p._id);
                            await fetch(`${authBase}/api/admin/plans/${p._id}`, {
                              method: 'DELETE',
                              headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}` }
                            });
                            await loadPlans();
                          } finally {
                            setDeletingPlanId(null);
                          }
                        }}
                        disabled={deletingPlanId === p._id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {plans.length === 0 && (
                  <tr>
                    <td className="p-6 text-center text-slate-500" colSpan={7}>No plans yet. Click "New Plan" to create one.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {editingPlan && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
              <div className="text-lg font-semibold mb-4">{editingPlan._id ? 'Edit Plan' : 'Create Plan'}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border p-2 rounded" placeholder="Name" value={editingPlan.name} onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })} />
                <input className="border p-2 rounded" placeholder="Code (free/plus/pro)" value={editingPlan.code} onChange={(e) => setEditingPlan({ ...editingPlan, code: e.target.value.toLowerCase() })} />
                <input className="border p-2 rounded" placeholder="Amount (INR)" type="number" value={editingPlan.amount} onChange={(e) => setEditingPlan({ ...editingPlan, amount: Number(e.target.value) })} />
                <select className="border p-2 rounded" value={editingPlan.interval} onChange={(e) => setEditingPlan({ ...editingPlan, interval: e.target.value })}>
                  <option value="month">month</option>
                  <option value="year">year</option>
                </select>
                <input className="border p-2 rounded" placeholder="Monthly Requests (-1 for unlimited)" type="number" value={editingPlan.monthlyRequests} onChange={(e) => setEditingPlan({ ...editingPlan, monthlyRequests: Number(e.target.value) })} />
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={!!editingPlan.isActive} onChange={(e) => setEditingPlan({ ...editingPlan, isActive: e.target.checked })} />
                  <span>Active</span>
                </label>
                <textarea className="border p-2 rounded md:col-span-2" placeholder="Description (optional)" value={editingPlan.description || ''} onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })} />
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button className="px-4 py-2 rounded bg-slate-100" onClick={() => setEditingPlan(null)}>Cancel</button>
                <button
                  className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                  disabled={savingPlan}
                  onClick={async () => {
                    try {
                      setSavingPlan(true);
                      const method = editingPlan._id ? 'PATCH' : 'POST';
                      const url = editingPlan._id ? `${authBase}/api/admin/plans/${editingPlan._id}` : `${authBase}/api/admin/plans`;
                      const res = await fetch(url, {
                        method,
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`
                        },
                        body: JSON.stringify(editingPlan)
                      });
                      const data = await res.json();
                      if (!data?.success) throw new Error(data?.message || 'Failed to save plan');
                      await loadPlans();
                      setEditingPlan(null);
                    } catch (e: any) {
                      alert(e?.message || 'Failed to save plan');
                    } finally {
                      setSavingPlan(false);
                    }
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-xs text-slate-500">Only admins can access this page.</div>
      </div>
    </section>
  );
};

export default AdminPanel;
