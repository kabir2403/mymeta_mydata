export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-black/20 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-center text-slate-400">
        <p>&copy; {new Date().getFullYear()} CricLive. All rights reserved.</p>
        <p className="mt-2 text-xs text-slate-500">Real-time scores and updates for cricket fans everywhere.</p>
      </div>
    </footer>
  );
}
