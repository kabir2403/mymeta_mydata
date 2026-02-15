'use client';
import { LayoutDashboard, CreditCard, PieChart, Settings, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useFinanceData } from '../hooks/useFinanceData';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }) {
    const pathname = usePathname();
    const { getTotalMonthly } = useFinanceData();
    const totalMonthly = getTotalMonthly();

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        HisaabKitaab
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem href="/" icon={<LayoutDashboard />} label="Dashboard" active={pathname === '/'} />
                    <NavItem href="/subscriptions" icon={<CreditCard />} label="Subscriptions" active={pathname === '/subscriptions'} />
                    <NavItem href="/analytics" icon={<PieChart />} label="Analytics" active={pathname === '/analytics'} />
                    <NavItem href="/settings" icon={<Settings />} label="Settings" active={pathname === '/settings'} />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-xs text-slate-400 mb-1">Total Monthly</div>
                        <div className="text-xl font-bold text-emerald-400">₹{totalMonthly.toFixed(2)}</div>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 z-50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-emerald-500" />
                    <span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">HisaabKitaab</span>
                </div>
                <span className="text-sm font-semibold text-emerald-400">₹{totalMonthly.toFixed(0)}/mo</span>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto flex flex-col">
                <div className="flex-1">{children}</div>
                <footer className="text-center text-xs text-slate-600 py-6 mt-8 border-t border-slate-800/50">
                    Built with ❤️ by <span className="text-emerald-500 font-medium">Harkabir</span>
                </footer>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-50 flex justify-around py-2 px-4">
                <MobileNavItem href="/" icon={<LayoutDashboard className="w-5 h-5" />} label="Home" active={pathname === '/'} />
                <MobileNavItem href="/subscriptions" icon={<CreditCard className="w-5 h-5" />} label="Subs" active={pathname === '/subscriptions'} />
                <MobileNavItem href="/analytics" icon={<PieChart className="w-5 h-5" />} label="Analytics" active={pathname === '/analytics'} />
                <MobileNavItem href="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" active={pathname === '/settings'} />
            </nav>
        </div>
    );
}

function NavItem({ icon, label, active, href }) {
    return (
        <Link href={href} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
            {icon}
            <span className="font-medium">{label}</span>
        </Link>
    );
}

function MobileNavItem({ icon, label, active, href }) {
    return (
        <Link href={href} className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${active ? 'text-emerald-400' : 'text-slate-500'}`}>
            {icon}
            <span className="text-[10px] font-medium">{label}</span>
        </Link>
    );
}

