'use client';
import { useState } from 'react';

export default function ScoreCard({ match }) {
    const [commentary, setCommentary] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCommentary = async (e) => {
        e.stopPropagation(); // Prevent card click
        setLoading(true);
        setCommentary('');
        try {
            const response = await fetch('/api/commentary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ match }),
            });
            const data = await response.json();
            if (data.commentary) {
                setCommentary(data.commentary);
            }
        } catch (error) {
            console.error('Error fetching commentary:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{match.series}</span>
                {match.status === 'Live' && (
                    <span className="flex items-center gap-1.5 bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        LIVE
                    </span>
                )}
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-lg">
                    <div className="font-bold text-lg flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white  shrink-0">{match.team1[0]}</div>
                        {match.team1}
                    </div>
                    <div className="text-xl font-mono text-emerald-300">{match.score1}</div>
                </div>

                <div className="flex justify-between items-center bg-black/20 p-2 rounded-lg">
                    <div className="font-bold text-lg flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-xs text-white shrink-0">{match.team2[0]}</div>
                        {match.team2}
                    </div>
                    <div className="text-xl font-mono text-emerald-300">{match.score2}</div>
                </div>
            </div>

            <div className="mt-auto pt-3 border-t border-white/5">
                <p className="text-sm text-gray-400 mb-3">{match.statusText}</p>

                {commentary ? (
                    <div className="bg-emerald-900/40 p-3 rounded-lg border border-emerald-500/20 text-sm text-emerald-100 italic animate-fadeIn">
                        "{commentary}"
                    </div>
                ) : (
                    <button
                        onClick={fetchCommentary}
                        disabled={loading}
                        className="w-full py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-lg text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating Insight...
                            </>
                        ) : (
                            <>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Get AI Insight
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
