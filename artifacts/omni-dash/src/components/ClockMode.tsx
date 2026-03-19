import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Timer, Clock, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

interface ClockModeProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'clock' | 'stopwatch' | 'timer';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function formatMs(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(cs)}`;
  return `${pad(m)}:${pad(s)}.${pad(cs)}`;
}

function BigClock() {
  const [now, setNow] = useState(new Date());
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
      setTick((t) => !t);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const hh = format(now, 'hh');
  const mm = format(now, 'mm');
  const ss = format(now, 'ss');
  const ampm = format(now, 'a');
  const dateStr = format(now, 'EEEE, MMMM d, yyyy');

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="flex items-end gap-3 md:gap-5"
      >
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="text-[clamp(5rem,18vw,14rem)] font-black leading-none text-foreground tracking-tight tabular-nums">
            {hh}
          </div>
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mt-1">hrs</span>
        </div>

        {/* Colon */}
        <motion.div
          animate={{ opacity: tick ? 1 : 0.15 }}
          transition={{ duration: 0.15 }}
          className="text-[clamp(4rem,14vw,10rem)] font-black leading-none text-primary pb-5"
        >
          :
        </motion.div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="text-[clamp(5rem,18vw,14rem)] font-black leading-none text-foreground tracking-tight tabular-nums">
            {mm}
          </div>
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mt-1">min</span>
        </div>

        {/* Colon */}
        <motion.div
          animate={{ opacity: tick ? 1 : 0.15 }}
          transition={{ duration: 0.15 }}
          className="text-[clamp(4rem,14vw,10rem)] font-black leading-none text-primary pb-5"
        >
          :
        </motion.div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={ss}
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[clamp(5rem,18vw,14rem)] font-black leading-none text-primary/70 tracking-tight tabular-nums"
            >
              {ss}
            </motion.div>
          </AnimatePresence>
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mt-1">sec</span>
        </div>

        {/* AM/PM */}
        <div className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold text-on-surface-variant pb-5">
          {ampm}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-2xl font-medium text-on-surface-variant"
      >
        {dateStr}
      </motion.p>
    </div>
  );
}

function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const baseRef = useRef<number>(0);

  const tick = useCallback(() => {
    if (startRef.current !== null) {
      setElapsed(baseRef.current + Date.now() - startRef.current);
      frameRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const start = () => {
    startRef.current = Date.now();
    setRunning(true);
    frameRef.current = requestAnimationFrame(tick);
  };

  const pause = () => {
    cancelAnimationFrame(frameRef.current);
    baseRef.current = elapsed;
    startRef.current = null;
    setRunning(false);
  };

  const reset = () => {
    cancelAnimationFrame(frameRef.current);
    startRef.current = null;
    baseRef.current = 0;
    setElapsed(0);
    setRunning(false);
    setLaps([]);
  };

  const lap = () => {
    setLaps((l) => [elapsed, ...l]);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-[clamp(3.5rem,14vw,10rem)] font-black tabular-nums tracking-tight text-foreground"
      >
        {formatMs(elapsed)}
      </motion.div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={running ? lap : reset}
          className="px-6 py-3 rounded-full bg-surface-variant text-on-surface-variant font-semibold text-sm flex items-center gap-2 hover:bg-secondary-container transition-colors"
        >
          {running ? <Flag size={16} /> : <RotateCcw size={16} />}
          {running ? 'Lap' : 'Reset'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={running ? pause : start}
          className={cn(
            "px-8 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-colors",
            running
              ? "bg-error/15 text-error hover:bg-error/25"
              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
          )}
        >
          {running ? <Pause size={16} /> : <Play size={16} />}
          {running ? 'Pause' : 'Start'}
        </motion.button>
      </div>

      {laps.length > 0 && (
        <div className="w-full max-w-sm max-h-48 overflow-y-auto space-y-1 mt-2">
          <AnimatePresence>
            {laps.map((l, i) => {
              const lapNum = laps.length - i;
              const prev = laps[i + 1] ?? 0;
              return (
                <motion.div
                  key={lapNum}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between items-center px-4 py-2 rounded-xl bg-surface-variant text-sm"
                >
                  <span className="text-on-surface-variant font-medium">Lap {lapNum}</span>
                  <span className="font-mono font-semibold text-foreground">{formatMs(l - prev)}</span>
                  <span className="font-mono text-on-surface-variant text-xs">{formatMs(l)}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function CountdownTimer() {
  const [inputH, setInputH] = useState(0);
  const [inputM, setInputM] = useState(5);
  const [inputS, setInputS] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const endRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  const totalMs = (inputH * 3600 + inputM * 60 + inputS) * 1000;

  const tick = useCallback(() => {
    if (endRef.current !== null) {
      const left = endRef.current - Date.now();
      if (left <= 0) {
        setRemaining(0);
        setRunning(false);
        setFinished(true);
        endRef.current = null;
      } else {
        setRemaining(left);
        frameRef.current = requestAnimationFrame(tick);
      }
    }
  }, []);

  const start = () => {
    const ms = remaining !== null ? remaining : totalMs;
    if (ms <= 0) return;
    endRef.current = Date.now() + ms;
    setRunning(true);
    setFinished(false);
    frameRef.current = requestAnimationFrame(tick);
  };

  const pause = () => {
    cancelAnimationFrame(frameRef.current);
    endRef.current = null;
    setRunning(false);
  };

  const reset = () => {
    cancelAnimationFrame(frameRef.current);
    endRef.current = null;
    setRemaining(null);
    setRunning(false);
    setFinished(false);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const displayMs = remaining !== null ? remaining : totalMs;
  const progress = totalMs > 0 ? (displayMs / totalMs) * 100 : 0;

  const NumInput = ({ label, value, onChange, max }: { label: string; value: number; onChange: (v: number) => void; max: number }) => (
    <div className="flex flex-col items-center gap-1">
      <button onClick={() => onChange(Math.min(max, value + 1))} className="w-10 h-10 rounded-full hover:bg-surface-variant text-on-surface-variant text-xl font-bold transition-colors">+</button>
      <div className="text-5xl font-black tabular-nums w-20 text-center">{pad(value)}</div>
      <button onClick={() => onChange(Math.max(0, value - 1))} className="w-10 h-10 rounded-full hover:bg-surface-variant text-on-surface-variant text-xl font-bold transition-colors">−</button>
      <span className="text-xs text-on-surface-variant uppercase tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-8">
      <AnimatePresence mode="wait">
        {!running && remaining === null ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-4"
          >
            <NumInput label="hrs" value={inputH} onChange={setInputH} max={99} />
            <span className="text-4xl font-black text-primary pb-6">:</span>
            <NumInput label="min" value={inputM} onChange={setInputM} max={59} />
            <span className="text-4xl font-black text-primary pb-6">:</span>
            <NumInput label="sec" value={inputS} onChange={setInputS} max={59} />
          </motion.div>
        ) : (
          <motion.div
            key="running"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Circular progress ring */}
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-variant" />
                <motion.circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke="currentColor" strokeWidth="8"
                  strokeLinecap="round"
                  className="text-primary"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  animate={{ strokeDashoffset: (1 - progress / 100) * 2 * Math.PI * 54 }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={finished ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: finished ? Infinity : 0, duration: 0.8 }}
                  className={cn("text-4xl md:text-5xl font-black tabular-nums", finished && "text-primary")}
                >
                  {finished ? '🎉' : formatMs(displayMs)}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4">
        {(running || remaining !== null) && (
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={reset}
            className="px-6 py-3 rounded-full bg-surface-variant text-on-surface-variant font-semibold text-sm flex items-center gap-2 hover:bg-secondary-container transition-colors"
          >
            <RotateCcw size={16} /> Reset
          </motion.button>
        )}
        {!finished && (
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={running ? pause : start}
            disabled={!running && remaining === null && totalMs === 0}
            className={cn(
              "px-8 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-colors disabled:opacity-40",
              running
                ? "bg-error/15 text-error hover:bg-error/25"
                : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
            )}
          >
            {running ? <Pause size={16} /> : <Play size={16} />}
            {running ? 'Pause' : 'Start'}
          </motion.button>
        )}
      </div>
    </div>
  );
}

export function ClockMode({ isOpen, onClose }: ClockModeProps) {
  const [tab, setTab] = useState<Tab>('clock');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'clock', label: 'Clock', icon: <Clock size={16} /> },
    { id: 'stopwatch', label: 'Stopwatch', icon: <Timer size={16} /> },
    { id: 'timer', label: 'Timer', icon: <Timer size={16} /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-background z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-surface-variant p-1 rounded-full">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="relative px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                >
                  {tab === t.id && (
                    <motion.div
                      layoutId="clock-tab-pill"
                      className="absolute inset-0 bg-background rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={cn(
                    "relative z-10 flex items-center gap-1.5",
                    tab === t.id ? "text-foreground" : "text-on-surface-variant"
                  )}>
                    {t.icon} {t.label}
                  </span>
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-surface-variant hover:bg-secondary-container flex items-center justify-center text-on-surface-variant transition-colors"
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="flex flex-col flex-1 pb-12"
            >
              {tab === 'clock' && <BigClock />}
              {tab === 'stopwatch' && <Stopwatch />}
              {tab === 'timer' && <CountdownTimer />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
