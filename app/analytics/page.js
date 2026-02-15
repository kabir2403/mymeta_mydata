'use client';
import { useFinanceData } from '../hooks/useFinanceData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#F97316', '#14B8A6'];

export default function AnalyticsPage() {
    const { subscriptions } = useFinanceData();

    // Aggregate data by category
    const categoryData = subscriptions.reduce((acc, sub) => {
        const existing = acc.find(item => item.name === sub.category);
        const cost = parseFloat(sub.cost);
        if (existing) {
            existing.value += cost;
        } else {
            acc.push({ name: sub.category, value: cost });
        }
        return acc;
    }, []);

    const totalSpend = categoryData.reduce((sum, item) => sum + item.value, 0);

    // Sort by value for better visualization
    categoryData.sort((a, b) => b.value - a.value);

    // Calculate Monthly Projections
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthlyData = months.map(month => {
        let total = 0;
        subscriptions.forEach(sub => {
            const cost = parseFloat(sub.cost);
            if (sub.cycle === 'Monthly') {
                total += cost;
            } else if (sub.cycle === 'Yearly' && sub.renewalMonth === month) {
                total += cost;
            }
        });
        return { name: month.substring(0, 3), value: total };
    });

    return (
        <div className="max-w-5xl mx-auto pb-10">
            <h1 className="text-3xl font-bold mb-2">Spending Analytics</h1>
            <p className="text-slate-400 mb-8">Visual breakdown of your financial timeline.</p>

            {/* Monthly Projection Chart */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Yearly Projection (Month-wise)</h2>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" tickFormatter={(value) => `₹${value}`} />
                            <Tooltip
                                formatter={(value) => `₹${value.toFixed(2)}`}
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                cursor={{ fill: '#334155', opacity: 0.2 }}
                            />
                            <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Category Distribution Chart */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-6">Spend by Category</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => `₹${value.toFixed(2)}`}
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Spending Categories List */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-6">Top Categories</h2>
                    <div className="space-y-4">
                        {categoryData.map((category, index) => (
                            <div key={category.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="font-medium">{category.name}</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold">₹{category.value.toFixed(2)}</div>
                                    <div className="text-xs text-slate-500">{((category.value / totalSpend) * 100).toFixed(1)}% of total</div>
                                </div>
                            </div>
                        ))}
                        {categoryData.length === 0 && (
                            <p className="text-slate-500 text-center py-10">No data available. Add subscriptions to see analytics.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
