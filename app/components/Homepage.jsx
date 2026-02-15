'use client';
import Link from 'next/link';
import ScoreCard from './ScoreCard';
import NewsCard from './NewsCard';
import { upcomingMatches, newsArticles } from '../data/mockData';
import { useLiveScores } from '../hooks/useLiveScores';

export default function Homepage() {
  const liveMatches = useLiveScores();

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="block text-emerald-400">Catch Every Moment</span>
              <span className="block text-white">Live Cricket Action</span>
            </h1>
            <p className="text-lg text-emerald-100/80 mb-8">
              Stay updated with real-time scores, detailed match analysis, and breaking news from the world of cricket.
            </p>
            <div className="flex gap-4">
              <Link href="/matches" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-emerald-500/20 inline-block text-center">
                View Live Scores
              </Link>
              <Link href="/matches" className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors backdrop-blur-sm border border-white/10 inline-block text-center">
                Match Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Scores */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-8 bg-red-500 rounded-full"></span>
            Live Matches
          </h2>
          <Link href="/matches" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">View All &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveMatches.map((match) => (
            <ScoreCard key={match.id} match={match} />
          ))}
          {/* Promo Card for Upcoming */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-white/10">
            <h3 className="text-xl font-bold mb-2">Upcoming: {upcomingMatches[0].team1} vs {upcomingMatches[0].team2}</h3>
            <p className="text-blue-200 mb-4">{upcomingMatches[0].series}</p>
            <Link href="/matches" className="bg-white text-blue-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors inline-block">Set Reminder</Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            Latest News
          </h2>
          <Link href="/news" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">Read More &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto">
          {newsArticles.map((news) => (
            <div key={news.id} className="h-full">
              <NewsCard news={news} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
