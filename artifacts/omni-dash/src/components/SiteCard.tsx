import React, { useState, useRef } from 'react';
import { Star, Globe, ExternalLink, Trash2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Site } from '../sites';
import { cn } from '../lib/utils';

interface SiteCardProps {
  site: Site;
  isPinned: boolean;
  onTogglePin: (id: string) => void;
  onRemoveCustom?: (id: string) => void;
  onLaunch?: (id: string) => void;
  index?: number;
  isRecent?: boolean;
  isTopResult?: boolean;
}

export function SiteCard({
  site, isPinned, onTogglePin, onRemoveCustom, onLaunch, index = 0, isRecent, isTopResult
}: SiteCardProps) {
  const [imgError, setImgError] = useState(false);
  const [justPinned, setJustPinned] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const rippleId = useRef(0);

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setJustPinned(true);
    onTogglePin(site.id);
    setTimeout(() => setJustPinned(false), 600);
  };

  const addRipple = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  const handleClick = (e: React.MouseEvent) => {
    addRipple(e);
    window.open(site.url, '_blank', 'noopener,noreferrer');
    onLaunch?.(site.id);
  };

  const allCategories = site.categories ?? [site.category];

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.82, y: -12 }}
      whileHover={{ y: -8, scale: 1.025 }}
      whileTap={{ scale: 0.96 }}
      transition={{
        layout: { type: 'spring', stiffness: 300, damping: 28 },
        default: { type: 'spring', stiffness: 320, damping: 22, delay: Math.min(index * 0.035, 0.3) },
      }}
      className={cn(
        "group relative flex flex-col rounded-m3 p-5 cursor-pointer overflow-hidden select-none",
        "bg-surface-variant border border-transparent",
        "shadow-sm transition-shadow duration-300",
        "hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/12",
        isTopResult && "ring-2 ring-primary/40"
      )}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.35 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="absolute w-8 h-8 rounded-full bg-primary pointer-events-none"
          style={{ left: r.x - 16, top: r.y - 16, transformOrigin: 'center' }}
        />
      ))}

      {/* Hover gradient shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-m3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(ellipse at 25% 25%, hsl(var(--primary-hue, 260) 80% 65% / 0.08) 0%, transparent 60%)' }}
      />

      {/* Top-result badge */}
      {isTopResult && (
        <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
          ↵ Launch
        </div>
      )}

      {/* Recent badge */}
      {isRecent && !isTopResult && (
        <div className="absolute top-2 left-2 flex items-center gap-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-semibold px-2 py-0.5 rounded-full">
          <Clock size={9} /> recent
        </div>
      )}

      <div className="flex justify-between items-start mb-4 relative z-10">
        <motion.div
          className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shadow-sm overflow-hidden p-2"
          whileHover={{ scale: 1.18, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 450, damping: 18 }}
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
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.88 }}
              onClick={(e) => { e.stopPropagation(); onRemoveCustom(site.id); }}
              className="p-2 rounded-full text-on-surface-variant/40 hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Remove"
            >
              <Trash2 size={15} />
            </motion.button>
          )}

          <motion.button
            onClick={handlePin}
            className={cn(
              "p-2 rounded-full transition-colors",
              isPinned
                ? "text-primary bg-primary/12"
                : "text-on-surface-variant/35 hover:text-primary hover:bg-primary/10"
            )}
            title={isPinned ? "Unpin" : "Pin to Favorites"}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.82 }}
            animate={justPinned ? { rotate: [0, -24, 24, -12, 0], scale: [1, 1.5, 1] } : {}}
            transition={justPinned ? { duration: 0.5 } : { type: 'spring', stiffness: 420 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isPinned ? 'pinned' : 'unpinned'}
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 20 }}
                transition={{ duration: 0.14 }}
                className="flex"
              >
                <Star size={17} fill={isPinned ? 'currentColor' : 'none'} />
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

      <div className="mt-4 flex items-center justify-between gap-2 relative z-10 flex-wrap">
        <div className="flex gap-1 flex-wrap">
          {allCategories.map((cat) => (
            <span
              key={cat}
              className="text-xs font-medium px-2.5 py-1 bg-surface rounded-full text-on-surface-variant border border-outline/10"
            >
              {cat}
            </span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 6 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
        >
          <ExternalLink size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}
