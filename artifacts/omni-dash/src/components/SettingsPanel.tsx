import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, Palette } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  hue: number;
  setHue: (hue: number) => void;
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

export function SettingsPanel({ isOpen, onClose, hue, setHue, mode, toggleMode }: SettingsPanelProps) {
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
              <h2 className="text-xl font-bold text-foreground">Appearance</h2>
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
                  <button
                    onClick={() => mode !== 'light' && toggleMode()}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                      mode === 'light' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-outline/20 hover:border-outline text-on-surface-variant hover:bg-surface-variant'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => mode !== 'dark' && toggleMode()}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                      mode === 'dark' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-outline/20 hover:border-outline text-on-surface-variant hover:bg-surface-variant'
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              {/* Base Hue Color */}
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
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(Number(e.target.value))}
                    className="hue-slider w-full"
                  />
                </div>
                <p className="text-sm text-on-surface-variant/70">
                  Drag to change the master hue. The entire interface will dynamically calculate its tonal palettes (Primary, Surface, Variants) based on this seed.
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-outline/10 bg-surface-variant/50">
              <p className="text-xs text-center text-on-surface-variant">
                Omni-Dash relies entirely on CSS variables to generate Material You elements beautifully.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
