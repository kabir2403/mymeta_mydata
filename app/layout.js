import './globals.css';
import { Inter } from 'next/font/google';
import MainLayout from './components/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'HisaabKitaab - Finance & Subscription Tracker',
    description: 'Track your monthly expenses and subscriptions privately.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen`}>
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    );
}
