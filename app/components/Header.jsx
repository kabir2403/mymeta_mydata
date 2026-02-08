"use client";
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/5 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <div>
            <Link href="/" className="text-lg font-semibold">Accessibility AI</Link>
            <div className="text-xs text-slate-400">AI-powered website accessibility checks</div>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/accessibility" className="text-slate-200 hover:text-white">Tool</Link>
          <Link href="/" className="text-slate-200 hover:text-white">Home</Link>
        </nav>
      </div>
    </header>
  );
}
