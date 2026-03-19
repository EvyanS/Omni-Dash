import React, { useState, useEffect } from 'react';
import { Search, Settings, X, Menu } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenSettings: () => void;
  onToggleMobileMenu: () => void;
}

export function TopBar({ searchQuery, setSearchQuery, onOpenSettings, onToggleMobileMenu }: TopBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
            O
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground hidden sm:block">
            Omni-Dash
          </h1>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto flex items-center relative group">
        <Search className="absolute left-4 w-5 h-5 text-on-surface-variant/70 group-focus-within:text-primary transition-colors" />
        <input
          id="global-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search apps, tools, or press '/'..."
          className="w-full h-12 bg-surface-variant focus:bg-surface rounded-full pl-12 pr-12 text-foreground placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary shadow-inner transition-all"
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

      <div className="w-64 shrink-0 flex items-center justify-end gap-4 md:gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-semibold text-foreground">
            {format(time, 'h:mm a')}
          </span>
          <span className="text-xs text-on-surface-variant font-medium">
            {format(time, 'EEEE, MMM d')}
          </span>
        </div>
        <motion.button
          whileHover={{ rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpenSettings}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-variant hover:bg-secondary-container text-foreground transition-colors shadow-sm"
        >
          <Settings size={22} />
        </motion.button>
      </div>
    </header>
  );
}
