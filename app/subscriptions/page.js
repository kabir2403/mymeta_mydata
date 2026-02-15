'use client';
import { useFinanceData } from '../hooks/useFinanceData';
import SubscriptionList from '../components/SubscriptionList';
import { useState } from 'react';
import AddSubscriptionModal from '../components/AddSubscriptionModal';
import { Plus } from 'lucide-react';

export default function SubscriptionsPage() {
    const { subscriptions, addSubscription, removeSubscription } = useFinanceData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">All Subscriptions</h1>
                    <p className="text-slate-400">Manage all your recurring payments.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                    <Plus className="w-5 h-5" /> Add Subscription
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6">
                <SubscriptionList subscriptions={subscriptions} onDelete={removeSubscription} />
            </div>

            <AddSubscriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={addSubscription}
            />
        </div>
    );
}
