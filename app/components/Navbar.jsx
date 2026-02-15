'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-emerald-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">CL</div>
                            <span className="font-bold text-xl tracking-wide">CricLive</span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/" className="bg-white/10 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                                <Link href="/matches" className="text-gray-300 hover:bg-white/5 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-emerald-400">Matches</Link>
                                <Link href="/news" className="text-gray-300 hover:bg-white/5 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-emerald-400">News</Link>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-emerald-900 border-b border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="bg-white/10 text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link href="/matches" className="text-gray-300 hover:bg-white/5 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:text-emerald-400">Matches</Link>
                        <Link href="/news" className="text-gray-300 hover:bg-white/5 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:text-emerald-400">News</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
