import React, { useState } from 'react';
import { Star, Globe, ExternalLink, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Site } from '../sites';
import { cn } from '../lib/utils';

interface SiteCardProps {
  site: Site;
  isPinned: boolean;
  onTogglePin: (id: string) => void;
  onRemoveCustom?: (id: string) => void;
  index?: number;
}

export function SiteCard({ site, isPinned, onTogglePin, onRemoveCustom, index = 0 }: SiteCardProps) {
  const [imgError, setImgError] = useState(false);
  const [justPinned, setJustPinned] = useState(false);

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setJustPinned(true);
    onTogglePin(site.id);
    setTimeout(() => setJustPinned(false), 600);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -10 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        layout: { type: 'spring', stiffness: 300, damping: 28 },
        default: { type: 'spring', stiffness: 300, damping: 24, delay: index * 0.04 },
      }}
      className={cn(
        "group relative flex flex-col bg-surface-variant hover:bg-surface rounded-m3 p-5",
        "border border-transparent hover:border-outline/20",
        "shadow-sm hover:shadow-xl hover:shadow-primary/8",
        "cursor-pointer overflow-hidden select-none"
      )}
      onClick={() => window.open(site.url, '_blank', 'noopener,noreferrer')}
    >
      {/* Animated gradient shimmer on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-m3"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, var(--tw-gradient-from) 0%, transparent 70%)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/5 rounded-m3" />
      </motion.div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        {/* Icon with bounce-in animation */}
        <motion.div
          className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shadow-sm overflow-hidden p-2"
          whileHover={{ scale: 1.12, rotate: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
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
        </motion.div>

        <div className="flex gap-1 items-center">
          {site.custom && onRemoveCustom && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onRemoveCustom(site.id);
              }}
              className="p-2 rounded-full text-on-surface-variant/40 hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Remove custom site"
            >
              <Trash2 size={16} />
            </motion.button>
          )}

          {/* Animated star / pin button */}
          <motion.button
            onClick={handlePin}
            className={cn(
              "p-2 rounded-full transition-colors",
              isPinned
                ? "text-primary bg-primary/12"
                : "text-on-surface-variant/40 hover:text-primary hover:bg-primary/10"
            )}
            title={isPinned ? "Unpin" : "Pin to Favorites"}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            animate={justPinned ? { rotate: [0, -20, 20, -10, 0], scale: [1, 1.4, 1] } : {}}
            transition={justPinned ? { duration: 0.5 } : { type: 'spring', stiffness: 400 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isPinned ? 'pinned' : 'unpinned'}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <Star size={17} fill={isPinned ? "currentColor" : "none"} />
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <div className="flex-1 relative z-10">
        <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200 leading-snug">
          {site.name}
        </h3>
        <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
          {site.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between relative z-10">
        <span className="text-xs font-medium px-2.5 py-1 bg-surface rounded-full text-on-surface-variant border border-outline/10">
          {site.category}
        </span>
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ExternalLink size={15} />
        </motion.div>
      </div>
    </motion.div>
  );
}
