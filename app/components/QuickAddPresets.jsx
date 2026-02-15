'use client';
import { Plus } from 'lucide-react';

const PRESETS = [
    { name: 'Netflix', cost: 649, category: 'Entertainment', cycle: 'Monthly', dueDay: '15' },
    { name: 'Spotify', cost: 119, category: 'Entertainment', cycle: 'Monthly', dueDay: '28' },
    { name: 'Amazon Prime', cost: 1499, category: 'Entertainment', cycle: 'Yearly', dueDay: '1', renewalMonth: 'January' },
    { name: 'Hotstar', cost: 299, category: 'Entertainment', cycle: 'Monthly', dueDay: '1' },
    { name: 'Jio Recharge', cost: 399, category: 'Utilities', cycle: 'Monthly', dueDay: '5' },
    { name: 'Electricity Bill', cost: 2500, category: 'Utilities', cycle: 'Monthly', dueDay: '10' },
    { name: 'Broadband', cost: 999, category: 'Internet', cycle: 'Monthly', dueDay: '1' },
    { name: 'House Maid', cost: 3000, category: 'House Help', cycle: 'Monthly', dueDay: '1' },
    { name: 'Cook', cost: 5000, category: 'House Help', cycle: 'Monthly', dueDay: '1' },
    { name: 'School Fee', cost: 15000, category: 'School Fee', cycle: 'Monthly', dueDay: '5' },
    { name: 'Milk', cost: 1500, category: 'Groceries', cycle: 'Monthly', dueDay: '1' },
    { name: 'Newspaper', cost: 250, category: 'Other', cycle: 'Monthly', dueDay: '1' },
];

export default function QuickAddPresets({ onAdd, existingNames }) {
    const available = PRESETS.filter(p => !existingNames.includes(p.name));

    if (available.length === 0) return null;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold mb-1">Quick Add</h2>
            <p className="text-sm text-slate-400 mb-4">Tap to add common Indian household expenses instantly.</p>
            <div className="flex flex-wrap gap-2">
                {available.map((preset) => (
                    <button
                        key={preset.name}
                        onClick={() => onAdd(preset)}
                        className="flex items-center gap-1.5 bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400 border border-slate-700 hover:border-emerald-500/50 text-slate-300 text-sm px-3 py-2 rounded-lg transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        {preset.name}
                        <span className="text-slate-500 text-xs">₹{preset.cost}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
