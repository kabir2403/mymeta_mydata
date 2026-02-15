'use client';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function AddSubscriptionModal({ isOpen, onClose, onAdd }) {
    const [formData, setFormData] = useState({
        name: '',
        cost: '',
        category: 'Entertainment',
        cycle: 'Monthly',
        dueDay: '1'
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        onClose();
        setFormData({ name: '', cost: '', category: 'Entertainment', cycle: 'Monthly', dueDay: '1' });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold mb-6">Add Subscription</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
                            placeholder="e.g. Netflix"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Cost</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-500">₹</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 pl-8 text-white focus:outline-none focus:border-emerald-500"
                                    placeholder="0.00"
                                    value={formData.cost}
                                    onChange={e => setFormData({ ...formData, cost: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                            <select
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Entertainment</option>
                                <option>Utilities</option>
                                <option>Health</option>
                                <option>Software</option>
                                <option>School Fee</option>
                                <option>House Help</option>
                                <option>Rent</option>
                                <option>Groceries</option>
                                <option>Internet</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Billing Cycle</label>
                            <select
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
                                value={formData.cycle}
                                onChange={e => setFormData({ ...formData, cycle: e.target.value })}
                            >
                                <option>Monthly</option>
                                <option>Yearly</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">
                                {formData.cycle === 'Yearly' ? 'Renewal Month' : 'Due Day'}
                            </label>
                            {formData.cycle === 'Yearly' ? (
                                <select
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
                                    value={formData.renewalMonth || 'January'}
                                    onChange={e => setFormData({ ...formData, renewalMonth: e.target.value })}
                                >
                                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="number"
                                    min="1"
                                    max="31"
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
                                    value={formData.dueDay}
                                    onChange={e => setFormData({ ...formData, dueDay: e.target.value })}
                                />
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-lg transition-colors mt-4"
                    >
                        Add Subscription
                    </button>
                </form>
            </div>
        </div>
    );
}
