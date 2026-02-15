'use client';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import { useState } from 'react';

const CATEGORY_COLORS = {
    'Entertainment': 'bg-purple-500/20 text-purple-400',
    'Health': 'bg-red-500/20 text-red-400',
    'Utilities': 'bg-yellow-500/20 text-yellow-400',
    'School Fee': 'bg-pink-500/20 text-pink-400',
    'Rent': 'bg-orange-500/20 text-orange-400',
    'House Help': 'bg-teal-500/20 text-teal-400',
    'Groceries': 'bg-lime-500/20 text-lime-400',
    'Internet': 'bg-cyan-500/20 text-cyan-400',
    'Software': 'bg-indigo-500/20 text-indigo-400',
};

export default function SubscriptionList({ subscriptions, onDelete, onEdit }) {
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    if (subscriptions.length === 0) {
        return (
            <div className="text-center py-12 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-lg mb-2">No subscriptions found</p>
                <p className="text-slate-500 text-sm">Add one from the button above or use Quick Add presets.</p>
            </div>
        );
    }

    const startEdit = (sub) => {
        setEditingId(sub.id);
        setEditData({ name: sub.name, cost: sub.cost });
    };

    const saveEdit = (id) => {
        if (onEdit) onEdit(id, editData);
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData({});
    };

    return (
        <div className="space-y-3">
            {subscriptions.map((sub) => (
                <div key={sub.id} className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 flex items-center justify-between hover:border-slate-700 transition-all group">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${CATEGORY_COLORS[sub.category] || 'bg-blue-500/20 text-blue-400'}`}>
                            {sub.name.charAt(0)}
                        </div>
                        <div>
                            {editingId === sub.id ? (
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={e => setEditData({ ...editData, name: e.target.value })}
                                    className="bg-slate-900 border border-emerald-500 rounded px-2 py-1 text-white text-sm w-32 focus:outline-none"
                                    autoFocus
                                />
                            ) : (
                                <h3 className="font-semibold text-slate-200">{sub.name}</h3>
                            )}
                            <p className="text-sm text-slate-500">{sub.category} • {sub.cycle}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            {editingId === sub.id ? (
                                <input
                                    type="number"
                                    value={editData.cost}
                                    onChange={e => setEditData({ ...editData, cost: e.target.value })}
                                    className="bg-slate-900 border border-emerald-500 rounded px-2 py-1 text-white text-sm w-24 text-right focus:outline-none"
                                />
                            ) : (
                                <>
                                    <div className="font-bold text-slate-200">₹{parseFloat(sub.cost).toFixed(2)}</div>
                                    <div className="text-xs text-slate-500">{sub.cycle === 'Yearly' ? (sub.renewalMonth || 'Yearly') : `Due day ${sub.dueDay}`}</div>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-1">
                            {editingId === sub.id ? (
                                <>
                                    <button onClick={() => saveEdit(sub.id)} className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors" title="Save">
                                        <Check className="w-4 h-4" />
                                    </button>
                                    <button onClick={cancelEdit} className="p-2 text-slate-400 hover:bg-slate-700 rounded-lg transition-colors" title="Cancel">
                                        <X className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => startEdit(sub)} className="p-2 text-slate-600 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100" title="Edit">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => onDelete(sub.id)} className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100" title="Remove">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
