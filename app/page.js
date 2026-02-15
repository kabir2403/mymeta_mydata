'use client';
import { useState } from 'react';
import { Plus, TrendingUp, IndianRupee, Calendar, ArrowUpRight } from 'lucide-react';
import { useFinanceData } from './hooks/useFinanceData';
import SubscriptionList from './components/SubscriptionList';
import AddSubscriptionModal from './components/AddSubscriptionModal';
import QuickAddPresets from './components/QuickAddPresets';
import SearchFilter from './components/SearchFilter';

export default function Home() {
    const { subscriptions, getTotalMonthly, addSubscription, removeSubscription, updateSubscription } = useFinanceData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const totalMonthly = getTotalMonthly();
    const today = new Date().getDate();

    // Find next upcoming payment
    const sortedSubs = [...subscriptions]
        .filter(s => s.cycle === 'Monthly')
        .sort((a, b) => {
            const aDiff = (a.dueDay - today + 31) % 31;
            const bDiff = (b.dueDay - today + 31) % 31;
            return aDiff - bDiff;
        });
    const nextPayment = sortedSubs[0];

    // Count payments due this week
    const dueThisWeek = subscriptions.filter(s => {
        if (s.cycle !== 'Monthly') return false;
        const diff = s.dueDay - today;
        return diff >= 0 && diff <= 7;
    }).length;

    // Filter subscriptions
    const filtered = subscriptions.filter(sub => {
        const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || sub.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-5xl mx-auto pb-24 md:pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-slate-400">Welcome back! Here's your financial overview.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                    <Plus className="w-5 h-5" /> Add Subscription
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard
                    title="Total Monthly Spend"
                    value={`₹${totalMonthly.toFixed(0)}`}
                    icon={<IndianRupee className="w-6 h-6 text-emerald-400" />}
                    subtitle={`₹${(totalMonthly * 12).toFixed(0)}/year`}
                    color="emerald"
                />
                <StatsCard
                    title="Active Subscriptions"
                    value={subscriptions.length}
                    icon={<TrendingUp className="w-6 h-6 text-blue-400" />}
                    subtitle={`${dueThisWeek} due this week`}
                    color="blue"
                />
                <StatsCard
                    title="Next Payment"
                    value={nextPayment ? nextPayment.name : 'None'}
                    icon={<Calendar className="w-6 h-6 text-purple-400" />}
                    subtitle={nextPayment ? `₹${parseFloat(nextPayment.cost).toFixed(0)} on ${nextPayment.dueDay}th` : 'No upcoming'}
                    color="purple"
                />
            </div>

            {/* Quick Add Presets */}
            <QuickAddPresets
                onAdd={addSubscription}
                existingNames={subscriptions.map(s => s.name)}
            />

            {/* Subscription List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Your Subscriptions</h2>
                        <span className="text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-full">{filtered.length} of {subscriptions.length}</span>
                    </div>
                    <SearchFilter
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                </div>
                <div className="p-6">
                    <SubscriptionList subscriptions={filtered} onDelete={removeSubscription} onEdit={updateSubscription} />
                </div>
            </div>

            <AddSubscriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={addSubscription}
            />
        </div>
    );
}

function StatsCard({ title, value, icon, subtitle, color }) {
    const bgColors = {
        emerald: 'bg-emerald-500/10',
        blue: 'bg-blue-500/10',
        purple: 'bg-purple-500/10'
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-bold">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${bgColors[color]}`}>
                    {icon}
                </div>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
                {subtitle}
            </div>
        </div>
    );
}
