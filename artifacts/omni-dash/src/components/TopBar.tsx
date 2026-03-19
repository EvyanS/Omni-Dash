import React, { useState, useEffect } from 'react';
import { Search, Settings, X, Menu, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenSettings: () => void;
  onToggleMobileMenu: () => void;
  onOpenClock: () => void;
}

export function TopBar({ searchQuery, setSearchQuery, onOpenSettings, onToggleMobileMenu, onOpenClock }: TopBarProps) {
  const [time, setTime] = useState(new Date());
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setTick((t) => !t);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-xl border-b border-outline/10 z-40 flex items-center px-4 md:px-8 gap-4 shadow-sm">
      <div className="flex items-center gap-4 w-64 shrink-0">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-full hover:bg-surface-variant text-foreground transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2.5">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-md">
            <rect width="36" height="36" rx="10" className="fill-primary" />
            <path d="M8 18 A10 10 0 0 1 18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
            <path d="M28 18 A10 10 0 0 1 18 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
            <circle cx="14" cy="14" r="2.2" fill="white" />
            <circle cx="22" cy="14" r="2.2" fill="white" opacity="0.75" />
            <circle cx="14" cy="22" r="2.2" fill="white" opacity="0.75" />
            <circle cx="22" cy="22" r="2.2" fill="white" />
            <line x1="14" y1="14" x2="22" y2="22" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
            <line x1="22" y1="14" x2="14" y2="22" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          </svg>
          <h1 className="text-xl font-bold tracking-tight text-foreground hidden sm:block">
            Omni-Dash
          </h1>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto flex items-center relative group">
        <Search className="absolute left-4 w-5 h-5 text-on-surface-variant/70 group-focus-within:text-primary transition-colors" />
        <motion.input
          id="global-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search apps, tools, or press '/'... (fuzzy)"
          className="w-full h-12 bg-surface-variant focus:bg-surface rounded-full pl-12 pr-12 text-foreground placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary shadow-inner transition-all"
          whileFocus={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 p-1 rounded-full text-on-surface-variant hover:text-foreground hover:bg-outline/20 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="w-64 shrink-0 flex items-center justify-end gap-2 md:gap-3">
        {/* Clock button — click to open full clock mode */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.92 }}
          onClick={onOpenClock}
          className="hidden md:flex flex-col items-end px-3 py-2 rounded-2xl hover:bg-surface-variant transition-colors cursor-pointer"
          title="Open clock mode"
        >
          <span className="text-sm font-semibold text-foreground leading-none flex items-center gap-1.5">
            {format(time, 'h:mm')}
            <motion.span
              animate={{ opacity: tick ? 1 : 0.2 }}
              transition={{ duration: 0.1 }}
              className="text-primary"
            >
              {format(time, 'ss')}s
            </motion.span>
            <span className="text-xs text-on-surface-variant font-medium">{format(time, 'a')}</span>
          </span>
          <span className="text-xs text-on-surface-variant font-medium mt-0.5">
            {format(time, 'EEE, MMM d')}
          </span>
        </motion.button>

        {/* Clock icon for mobile */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpenClock}
          className="md:hidden w-11 h-11 rounded-full flex items-center justify-center bg-surface-variant hover:bg-secondary-container text-foreground transition-colors"
          title="Open clock mode"
        >
          <Clock size={20} />
        </motion.button>

        <motion.button
          whileHover={{ rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpenSettings}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-surface-variant hover:bg-secondary-container text-foreground transition-colors shadow-sm"
          title="Settings"
        >
          <Settings size={20} />
        </motion.button>
      </div>
    </header>
  );
}
