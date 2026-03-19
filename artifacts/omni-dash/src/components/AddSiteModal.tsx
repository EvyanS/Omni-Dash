import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Link as LinkIcon, Type, Folder, FileText } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Site, CATEGORIES } from '../sites';

interface AddSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (site: Site) => void;
}

export function AddSiteModal({ isOpen, onClose, onAdd }: AddSiteModalProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]); // Default to first real category
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;

    // Smartly guess a generic favicon if needed
    let cleanUrl = url.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = 'https://' + cleanUrl;
    }
    const domain = new URL(cleanUrl).hostname;

    onAdd({
      id: uuidv4(),
      name: name.trim(),
      url: cleanUrl,
      category,
      description: description.trim(),
      icon: `https://www.google.com/s2/favicons?sz=64&domain=${domain}`,
      custom: true,
    });

    // Reset
    setName('');
    setUrl('');
    setDescription('');
    setCategory(CATEGORIES[1]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-surface rounded-[28px] shadow-2xl border border-outline/10 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 pb-4 border-b border-outline/5 bg-surface-variant/30">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Plus size={24} />
                </div>
                Add Custom Shortcut
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-on-surface-variant ml-1 flex items-center gap-2">
                  <Type size={16} /> Name
                </label>
                <input
                  required
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. My Portfolio"
                  className="w-full h-12 bg-surface-variant border-2 border-transparent focus:border-primary rounded-xl px-4 text-foreground placeholder:text-on-surface-variant/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-on-surface-variant ml-1 flex items-center gap-2">
                  <LinkIcon size={16} /> URL
                </label>
                <input
                  required
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g. example.com"
                  className="w-full h-12 bg-surface-variant border-2 border-transparent focus:border-primary rounded-xl px-4 text-foreground placeholder:text-on-surface-variant/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-on-surface-variant ml-1 flex items-center gap-2">
                  <Folder size={16} /> Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-12 bg-surface-variant border-2 border-transparent focus:border-primary rounded-xl px-4 text-foreground focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  {CATEGORIES.filter(c => c !== 'Favorites').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-on-surface-variant ml-1 flex items-center gap-2">
                  <FileText size={16} /> Description <span className="text-xs font-normal opacity-50">(Optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description..."
                  rows={2}
                  className="w-full bg-surface-variant border-2 border-transparent focus:border-primary rounded-xl p-4 text-foreground placeholder:text-on-surface-variant/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-full font-semibold text-primary hover:bg-primary/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!name || !url}
                  className="px-8 py-3 rounded-full font-semibold bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Save Shortcut
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
