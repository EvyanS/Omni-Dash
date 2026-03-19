import React, { useState } from 'react';
import { Star, Globe, ExternalLink, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Site } from '../sites';
import { cn } from '../lib/utils';

interface SiteCardProps {
  site: Site;
  isPinned: boolean;
  onTogglePin: (id: string) => void;
  onRemoveCustom?: (id: string) => void;
}

export function SiteCard({ site, isPinned, onTogglePin, onRemoveCustom }: SiteCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        "group relative flex flex-col bg-surface-variant hover:bg-surface rounded-m3 p-5",
        "border border-transparent hover:border-outline/30",
        "shadow-sm hover:shadow-lg hover:shadow-primary/5",
        "transition-all duration-300 cursor-pointer overflow-hidden"
      )}
      onClick={() => window.open(site.url, '_blank', 'noopener,noreferrer')}
    >
      {/* Ripple/Gradient Background Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-colors duration-500 pointer-events-none" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shadow-sm overflow-hidden p-2 group-hover:scale-105 transition-transform duration-300">
          {!imgError && site.icon ? (
            <img 
              src={site.icon} 
              alt={`${site.name} icon`} 
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <Globe className="w-6 h-6 text-primary" />
          )}
        </div>
        
        <div className="flex gap-1">
          {site.custom && onRemoveCustom && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveCustom(site.id);
              }}
              className="p-2 rounded-full text-on-surface-variant/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Remove custom site"
            >
              <Trash2 size={18} />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(site.id);
            }}
            className={cn(
              "p-2 rounded-full transition-colors",
              isPinned 
                ? "text-primary bg-primary/10" 
                : "text-on-surface-variant/50 hover:text-primary hover:bg-primary/10"
            )}
            title={isPinned ? "Unpin site" : "Pin site"}
          >
            <Star size={18} fill={isPinned ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="flex-1 relative z-10">
        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {site.name}
        </h3>
        <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
          {site.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between relative z-10">
        <span className="text-xs font-medium px-3 py-1 bg-surface rounded-full text-on-surface-variant shadow-sm border border-outline/10">
          {site.category}
        </span>
        <ExternalLink size={16} className="text-on-surface-variant/50 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300" />
      </div>
    </motion.div>
  );
}
