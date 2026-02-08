import AccessibilityTool from '../components/AccessibilityTool';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header />
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <AccessibilityTool />
        </div>
      </main>
      <Footer />
    </div>
  );
}
