'use client';
import { useFinanceData } from '../hooks/useFinanceData';
import { Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const { subscriptions, isLoaded } = useFinanceData();
    const [showConfirm, setShowConfirm] = useState(false);
    const [importStatus, setImportStatus] = useState('');

    const handleExport = () => {
        const data = localStorage.getItem('smarttrack_data_v1');
        if (!data) return;

        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `smarttrack_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);
                    if (parsed.subscriptions && Array.isArray(parsed.subscriptions)) {
                        localStorage.setItem('smarttrack_data_v1', JSON.stringify(parsed));
                        setImportStatus('success');
                        setTimeout(() => window.location.reload(), 1000);
                    } else {
                        setImportStatus('error');
                    }
                } catch {
                    setImportStatus('error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    const handleClearData = () => {
        localStorage.removeItem('smarttrack_data_v1');
        window.location.reload();
    };

    return (
        <div className="max-w-3xl mx-auto pb-24 md:pb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-slate-400 mb-8">Manage your app preferences and data.</p>

            {/* App Info */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">App Info</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-slate-400">Currency</span>
                        <p className="font-medium">Indian Rupee (₹)</p>
                    </div>
                    <div>
                        <span className="text-slate-400">Total Subscriptions</span>
                        <p className="font-medium">{subscriptions.length}</p>
                    </div>
                    <div>
                        <span className="text-slate-400">Storage</span>
                        <p className="font-medium">Browser LocalStorage</p>
                    </div>
                    <div>
                        <span className="text-slate-400">Version</span>
                        <p className="font-medium">v1.0</p>
                    </div>
                </div>
            </div>

            {/* Data Management */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Data Management</h3>
                <div className="space-y-4">
                    <button
                        onClick={handleExport}
                        className="w-full flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-left"
                    >
                        <Download className="w-5 h-5 text-emerald-400" />
                        <div>
                            <span className="font-medium">Export Data</span>
                            <p className="text-sm text-slate-400">Download your data as a JSON backup file.</p>
                        </div>
                    </button>

                    <button
                        onClick={handleImport}
                        className="w-full flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-left"
                    >
                        <Upload className="w-5 h-5 text-blue-400" />
                        <div>
                            <span className="font-medium">Import Data</span>
                            <p className="text-sm text-slate-400">Restore from a previously exported JSON file.</p>
                        </div>
                    </button>

                    {importStatus === 'success' && (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-sm">
                            ✅ Data imported successfully! Reloading...
                        </div>
                    )}
                    {importStatus === 'error' && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
                            ❌ Invalid file format. Please use a HisaabKitaab backup file.
                        </div>
                    )}
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-slate-900 border border-red-900/30 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> Danger Zone
                </h3>
                {!showConfirm ? (
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="flex items-center gap-3 p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-900/30 rounded-xl transition-colors text-red-400 w-full text-left"
                    >
                        <Trash2 className="w-5 h-5" />
                        <div>
                            <span className="font-medium">Clear All Data</span>
                            <p className="text-sm text-red-400/60">Permanently delete all subscriptions and reset the app.</p>
                        </div>
                    </button>
                ) : (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <p className="text-red-400 mb-3 font-medium">Are you sure? This cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={handleClearData} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                                Yes, Delete Everything
                            </button>
                            <button onClick={() => setShowConfirm(false)} className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-6 rounded-lg transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
