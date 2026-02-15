'use client';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'smarttrack_data_v1';

const INITIAL_DATA = {
    subscriptions: [
        { id: '1', name: 'Netflix Premium', cost: 649.00, category: 'Entertainment', cycle: 'Monthly', dueDay: 15 },
        { id: '2', name: 'Spotify Duo', cost: 149.00, category: 'Entertainment', cycle: 'Monthly', dueDay: 28 },
        { id: '3', name: 'Cult.fit Gym', cost: 1500.00, category: 'Health', cycle: 'Monthly', dueDay: 1 },
    ],
    currency: '₹'
};

export function useFinanceData() {
    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse finance data", e);
                setData(INITIAL_DATA);
            }
        } else {
            setData(INITIAL_DATA);
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage whenever data changes
    useEffect(() => {
        if (isLoaded && data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    }, [data, isLoaded]);

    // Actions
    const addSubscription = (sub) => {
        const newSub = { ...sub, id: Date.now().toString() };
        setData(prev => ({
            ...prev,
            subscriptions: [...prev.subscriptions, newSub]
        }));
    };

    const removeSubscription = (id) => {
        setData(prev => ({
            ...prev,
            subscriptions: prev.subscriptions.filter(s => s.id !== id)
        }));
    };

    const updateSubscription = (id, updatedSub) => {
        setData(prev => ({
            ...prev,
            subscriptions: prev.subscriptions.map(s => s.id === id ? { ...s, ...updatedSub } : s)
        }));
    };

    const getTotalMonthly = () => {
        if (!data) return 0;
        return data.subscriptions.reduce((total, sub) => {
            let cost = parseFloat(sub.cost);
            if (sub.cycle === 'Yearly') cost = cost / 12;
            return total + cost;
        }, 0);
    };

    return {
        subscriptions: data?.subscriptions || [],
        currency: data?.currency || '$',
        isLoaded,
        addSubscription,
        removeSubscription,
        updateSubscription,
        getTotalMonthly
    };
}
