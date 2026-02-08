"use client";
import React, { useState } from "react";

function severityColor(s) {
  if (!s) return 'bg-gray-600';
  if (s.toLowerCase() === 'critical') return 'bg-red-600';
  if (s.toLowerCase() === 'major') return 'bg-yellow-500';
  if (s.toLowerCase() === 'minor') return 'bg-green-600';
  return 'bg-gray-600';
}

export default function AccessibilityTool() {
  const [url, setUrl] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function analyze(e) {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/accessibility/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url || null, html: html || null })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  function downloadJSON() {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const urlBlob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlBlob;
    a.download = 'accessibility-report.json';
    a.click();
    URL.revokeObjectURL(urlBlob);
  }

  const issues = Array.isArray(result?.issues) ? result.issues : [];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white/5 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">Accessibility Analyzer</h2>
        <p className="text-slate-400 mb-4">Enter a public URL or paste the page HTML. The AI will return a list of accessibility issues and suggestions.</p>

        <form onSubmit={analyze} className="grid gap-4 md:grid-cols-3 md:items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-200 mb-1">Website URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-white"
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
              {loading ? 'Analyzing…' : 'Analyze'}
            </button>
            <button type="button" onClick={() => { setUrl(''); setHtml(''); setResult(null); setError(null); }} className="bg-white/5 text-white px-4 py-2 rounded">
              Reset
            </button>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-200 mb-1">Or paste HTML (optional)</label>
            <textarea value={html} onChange={(e)=>setHtml(e.target.value)} rows={8} placeholder="Paste page HTML here to analyze a fragment" className="w-full bg-transparent border border-white/10 rounded p-3 text-white" />
          </div>
        </form>

        <div className="mt-6">
          {error && <div className="text-red-400">Error: {error}</div>}

          {result && (
            <div>
              <div className="flex items-center justify-between">
                <div>
                  {result.note && <div className="text-sm text-slate-400">{result.note}</div>}
                  <h3 className="text-xl font-semibold mt-2">Issues ({issues.length})</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={downloadJSON} className="bg-white/5 text-white px-3 py-1 rounded">Export JSON</button>
                </div>
              </div>

              {issues.length === 0 && <div className="mt-4 text-slate-400">No issues found.</div>}

              <div className="mt-4 grid gap-3">
                {issues.map((it) => (
                  <div key={it.id || Math.random()} className="bg-white/3 rounded p-4 flex flex-col md:flex-row md:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className={`${severityColor(it.severity)} w-3 h-3 rounded-full`} />
                        <div className="font-semibold text-white">{it.description}</div>
                      </div>
                      <div className="text-sm text-slate-300 mt-2">Selector: <span className="font-mono text-xs text-slate-200">{it.selector}</span></div>
                      <div className="mt-2 text-slate-200">Suggestion: {it.suggestion}</div>
                      <div className="text-xs text-slate-400 mt-1">WCAG: {it.wcag}</div>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <div className="text-sm text-slate-400">Severity</div>
                      <div className="mt-1 font-semibold text-white">{it.severity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
