'use client';
import { newsArticles } from '../data/mockData';
import NewsCard from '../components/NewsCard';

export default function NewsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Latest Cricket News</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsArticles.map(news => (
                    <NewsCard key={news.id} news={news} />
                ))}
                {/* Duplicate for demo content volume */}
                {newsArticles.map(news => (
                    <NewsCard key={`dup-${news.id}`} news={{ ...news, id: `dup-${news.id}` }} />
                ))}
            </div>
        </div>
    );
}
