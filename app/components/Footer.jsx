export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/5 bg-gradient-to-t from-black/20 to-transparent">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-slate-400 flex justify-between">
        <div>© {new Date().getFullYear()} Accessibility AI</div>
        <div>
          Built with care • <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" className="text-slate-300">WCAG</a>
        </div>
      </div>
    </footer>
  );
}
