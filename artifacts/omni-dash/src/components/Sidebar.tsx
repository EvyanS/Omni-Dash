import React from 'react';
import { CATEGORIES } from '../sites';
import { cn } from '../lib/utils';
import { Star, Grid, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ activeCategory, onSelectCategory, isOpen, onClose }: SidebarProps) {
  const handleSelect = (cat: string) => {
    onSelectCategory(cat);
    onClose(); // Close mobile menu if open
  };

  const content = (
    <div className="h-full flex flex-col pt-24 pb-8 px-4 overflow-y-auto w-72 shrink-0 border-r border-outline/10 bg-surface md:bg-transparent">
      <div className="md:hidden flex justify-end mb-4">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-variant">
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="px-4 pb-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
          Library
        </div>
        
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleSelect(cat)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-full font-medium transition-all duration-200",
                isActive
                  ? "bg-secondary-container text-on-secondary-container shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-variant hover:text-foreground"
              )}
            >
              {cat === 'Favorites' ? <Star size={18} className={isActive ? "fill-primary" : ""} /> : <Grid size={18} />}
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block sticky top-0 h-screen bg-background z-10">
        {content}
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-50 shadow-2xl md:hidden"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
