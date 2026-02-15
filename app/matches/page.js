'use client';
import { upcomingMatches } from '../data/mockData';
import ScoreCard from '../components/ScoreCard';
import { useLiveScores } from '../hooks/useLiveScores';

export default function MatchesPage() {
    const liveMatches = useLiveScores();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Match Center</h1>

            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4 text-emerald-400">Live Scorum</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveMatches.map(match => (
                        <ScoreCard key={match.id} match={match} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-blue-400">Upcoming Fixtures</h2>
                <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
                    {upcomingMatches.map((match, index) => (
                        <div key={match.id} className={`p-4 flex items-center justify-between hover:bg-white/5 transition-colors ${index !== upcomingMatches.length - 1 ? 'border-b border-white/5' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className="text-sm text-gray-400 w-24">{match.time}</div>
                                <div>
                                    <div className="font-bold text-lg">{match.team1} vs {match.team2}</div>
                                    <div className="text-xs text-emerald-500">{match.series} • {match.venue}</div>
                                </div>
                            </div>
                            <button className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors">Notify Me</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
