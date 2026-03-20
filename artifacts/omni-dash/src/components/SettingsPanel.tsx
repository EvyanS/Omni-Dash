import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Moon, Sun, Palette, Search, Download, Loader2,
  CheckCircle, AlertCircle, Clock, Sunrise,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  hue: number;
  setHue: (hue: number) => void;
  mode: 'light' | 'dark';
  toggleMode: () => void;
  autoTheme: boolean;
  setAutoTheme: (v: boolean) => void;
  fuzzySearch: boolean;
  setFuzzySearch: (v: boolean) => void;
}

type ExportStatus = 'idle' | 'building' | 'done' | 'error';

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-12 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0",
        checked ? "bg-primary" : "bg-outline/30"
      )}
    >
      {/* Use animate x instead of conditional Tailwind classes to avoid mis-render */}
      <motion.span
        className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow"
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
    </button>
  );
}

export function SettingsPanel({
  isOpen, onClose, hue, setHue, mode, toggleMode,
  autoTheme, setAutoTheme, fuzzySearch, setFuzzySearch,
}: SettingsPanelProps) {
  const [exportStatus, setExportStatus] = useState<ExportStatus>('idle');
  const [exportMsg, setExportMsg] = useState('');

  const handleExport = async () => {
    setExportStatus('building');
    setExportMsg('Building… this takes ~20s');
    try {
      const base = import.meta.env.BASE_URL.replace(/\/$/, '');
      const apiBase = base.replace(/\/[^/]+$/, '');
      const res = await fetch(`${apiBase}/api/export/omni-dash`, { method: 'POST' });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? `HTTP ${res.status}`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'omni-dash.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportStatus('done');
      setExportMsg('Downloaded! Open omni-dash.html in any browser — no server needed.');
      setTimeout(() => { setExportStatus('idle'); setExportMsg(''); }, 6000);
    } catch (err: any) {
      setExportStatus('error');
      setExportMsg(err.message ?? 'Build failed');
      setTimeout(() => { setExportStatus('idle'); setExportMsg(''); }, 6000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-surface shadow-2xl border-l border-outline/10 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-outline/10">
              <h2 className="text-xl font-bold text-foreground">Settings</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8 flex-1 overflow-y-auto">

              {/* Theme Mode */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-on-surface-variant font-medium">
                  {mode === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                  <h3>Theme Mode</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(['light', 'dark'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => { if (!autoTheme && mode !== m) toggleMode(); }}
                      disabled={autoTheme}
                      className={cn(
                        "py-3 px-4 rounded-xl border-2 font-medium transition-all capitalize",
                        mode === m
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-outline/20 hover:border-outline text-on-surface-variant hover:bg-surface-variant",
                        autoTheme && "opacity-40 cursor-not-allowed"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                {/* Auto theme */}
                <div className="bg-surface-variant rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground text-sm flex items-center gap-1.5">
                        <Sunrise size={14} /> Auto Light/Dark
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Light 7am–7pm, dark outside those hours
                      </p>
                    </div>
                    <Toggle checked={autoTheme} onChange={setAutoTheme} />
                  </div>
                </div>
              </div>

              {/* Seed Hue */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-on-surface-variant font-medium">
                  <div className="flex items-center gap-2">
                    <Palette size={20} />
                    <h3>Material Seed Color</h3>
                  </div>
                  <div
                    className="w-6 h-6 rounded-full border border-outline/20 shadow-sm"
                    style={{ backgroundColor: `hsl(${hue}, 80%, 50%)` }}
                  />
                </div>
                <div className="pt-4 pb-2 px-2 bg-surface-variant rounded-2xl">
                  <input
                    type="range" min="0" max="360" value={hue}
                    onChange={(e) => setHue(Number(e.target.value))}
                    className="hue-slider w-full"
                  />
                </div>
                <p className="text-sm text-on-surface-variant/70">
                  Drag to change the master hue. The entire interface calculates its tonal palettes from this seed.
                </p>
              </div>

              {/* Search Options */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-on-surface-variant font-medium">
                  <Search size={20} />
                  <h3>Search</h3>
                </div>
                <div className="bg-surface-variant rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground text-sm">Fuzzy Search</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Match partial & out-of-order characters (e.g. "yt" → YouTube)
                      </p>
                    </div>
                    <Toggle checked={fuzzySearch} onChange={setFuzzySearch} />
                  </div>
                </div>
              </div>

              {/* Export */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-on-surface-variant font-medium">
                  <Download size={20} />
                  <h3>Export</h3>
                </div>
                <div className="bg-surface-variant rounded-2xl p-4 space-y-3">
                  <p className="text-sm text-on-surface-variant">
                    Download a single self-contained <strong className="text-foreground">omni-dash.html</strong> — open it anywhere, even offline.
                  </p>
                  <motion.button
                    whileHover={{ scale: exportStatus === 'building' ? 1 : 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={exportStatus === 'idle' ? handleExport : undefined}
                    disabled={exportStatus === 'building'}
                    className={cn(
                      "w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors",
                      exportStatus === 'idle' && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20",
                      exportStatus === 'building' && "bg-surface text-on-surface-variant cursor-not-allowed",
                      exportStatus === 'done' && "bg-green-500/15 text-green-600",
                      exportStatus === 'error' && "bg-error/15 text-error",
                    )}
                  >
                    {exportStatus === 'idle' && <><Download size={16} /> Download HTML</>}
                    {exportStatus === 'building' && <><Loader2 size={16} className="animate-spin" /> Building…</>}
                    {exportStatus === 'done' && <><CheckCircle size={16} /> Downloaded!</>}
                    {exportStatus === 'error' && <><AlertCircle size={16} /> Failed</>}
                  </motion.button>
                  <AnimatePresence>
                    {exportMsg && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={cn(
                          "text-xs font-medium",
                          exportStatus === 'error' ? "text-error" : "text-on-surface-variant"
                        )}
                      >
                        {exportMsg}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-outline/10 bg-surface-variant/50">
              <p className="text-xs text-center text-on-surface-variant">
                Omni-Dash · {new Date().getFullYear()} · All settings saved locally
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
