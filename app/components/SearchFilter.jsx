'use client';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Entertainment', 'Utilities', 'Health', 'Software', 'School Fee', 'House Help', 'Rent', 'Groceries', 'Internet', 'Other'];

export default function SearchFilter({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search subscriptions..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
            </div>
            <div className="relative">
                <Filter className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-3 pl-10 pr-8 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
