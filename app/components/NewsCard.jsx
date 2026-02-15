export default function NewsCard({ news }) {
    return (
        <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer h-full flex flex-col">
            <div className="mb-3">
                <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{news.category}</span>
                <span className="text-xs text-gray-500 ml-3">{news.time}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">{news.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">{news.snippet}</p>
            <div className="flex items-center text-sm text-emerald-400 font-medium">
                Read Story
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    );
}
