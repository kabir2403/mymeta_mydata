'use client';

import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header />
      <div className="flex items-center justify-center p-12">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">Accessibility AI</h1>
          <p className="text-slate-300 mb-6">Scan websites quickly for WCAG issues and get AI-driven remediation suggestions.</p>
          <div className="space-x-4">
            <Link href="/accessibility" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">Open Tool</Link>
            <a href="https://www.w3.org/WAI/" className="text-slate-300 ml-4">Learn about WCAG</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
