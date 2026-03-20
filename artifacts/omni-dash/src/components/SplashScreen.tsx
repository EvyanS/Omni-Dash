import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const DURATION_MS = 2400;

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400); // wait for exit animation
    }, DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center select-none"
        >
          {/* Logo + wordmark row */}
          <div className="flex items-center gap-5">
            {/* Logo: spins once then settles */}
            <motion.div
              initial={{ rotate: 0, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 360, scale: 1, opacity: 1 }}
              transition={{
                duration: 0.85,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{ filter: 'drop-shadow(0 6px 18px hsl(var(--primary-hue, 260) 70% 60% / 0.35))' }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="36" height="36" rx="10" className="fill-primary" />
                <path d="M8 18 A10 10 0 0 1 18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                <path d="M28 18 A10 10 0 0 1 18 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                <circle cx="14" cy="14" r="2.2" fill="white" />
                <circle cx="22" cy="14" r="2.2" fill="white" opacity="0.75" />
                <circle cx="14" cy="22" r="2.2" fill="white" opacity="0.75" />
                <circle cx="22" cy="22" r="2.2" fill="white" />
                <line x1="14" y1="14" x2="22" y2="22" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                <line x1="22" y1="14" x2="14" y2="22" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
              </svg>
            </motion.div>

            {/* Wordmark: slides in from left after logo */}
            <motion.h1
              initial={{ x: -32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight text-foreground"
            >
              Omni-Dash
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="mt-3 text-on-surface-variant text-sm font-medium tracking-wide"
          >
            The all in one dashboard
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: DURATION_MS / 1000,
              times: [0, 0.08, 0.85, 1],
            }}
          >
            <div className="w-48 h-1 rounded-full bg-outline/15 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: (DURATION_MS - 200) / 1000,
                  delay: 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
