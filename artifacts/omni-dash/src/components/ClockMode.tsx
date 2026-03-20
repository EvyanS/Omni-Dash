import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Timer, Clock, Flag, Watch, Type, AlignCenter } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

interface ClockModeProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'clock' | 'stopwatch' | 'timer';
type ClockStyle = 'digital' | 'minimal' | 'analog' | 'word';

function pad(n: number) { return String(n).padStart(2, '0'); }

function formatMs(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(cs)}`;
  return `${pad(m)}:${pad(s)}.${pad(cs)}`;
}

// ── Word clock helper ─────────────────────────────────────────────────
const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
  'eighteen', 'nineteen'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty'];

function numToWords(n: number): string {
  if (n < 20) return ones[n];
  const t = tens[Math.floor(n / 10)];
  const o = ones[n % 10];
  return o ? `${t} ${o}` : t;
}

function toWordTime(date: Date): string {
  let h = date.getHours() % 12 || 12;
  const m = date.getMinutes();
  const ampm = date.getHours() < 12 ? 'in the morning' : date.getHours() < 17 ? 'in the afternoon' : date.getHours() < 21 ? 'in the evening' : 'at night';

  if (m === 0) return `${numToWords(h)} o'clock ${ampm}`;
  if (m === 15) return `quarter past ${numToWords(h)} ${ampm}`;
  if (m === 30) return `half past ${numToWords(h)} ${ampm}`;
  if (m === 45) { h = (h % 12) + 1; return `quarter to ${numToWords(h)} ${ampm}`; }
  if (m < 30) return `${numToWords(m)} past ${numToWords(h)} ${ampm}`;
  const left = 60 - m; h = (h % 12) + 1;
  return `${numToWords(left)} to ${numToWords(h)} ${ampm}`;
}

// ── Clock styles ──────────────────────────────────────────────────────

function DigitalClock() {
  const [now, setNow] = useState(new Date());
  const [tick, setTick] = useState(true);
  useEffect(() => {
    const id = setInterval(() => { setNow(new Date()); setTick((t) => !t); }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-end gap-3 md:gap-5"
      >
        {[format(now, 'hh'), format(now, 'mm'), format(now, 'ss')].map((seg, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <motion.div
                animate={{ opacity: tick ? 1 : 0.12 }}
                transition={{ duration: 0.12 }}
                className="text-[clamp(4rem,14vw,10rem)] font-black leading-none text-primary pb-5"
              >:
              </motion.div>
            )}
            <div className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={seg}
                  initial={{ y: -18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 18, opacity: 0 }}
                  transition={{ duration: 0.14 }}
                  className={cn(
                    "text-[clamp(5rem,18vw,14rem)] font-black leading-none tracking-tight tabular-nums",
                    i === 2 ? "text-primary/70" : "text-foreground"
                  )}
                >{seg}</motion.div>
              </AnimatePresence>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mt-1">
                {['hrs', 'min', 'sec'][i]}
              </span>
            </div>
          </React.Fragment>
        ))}
        <div className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold text-on-surface-variant pb-5">
          {format(now, 'a')}
        </div>
      </motion.div>
      <p className="text-lg md:text-2xl font-medium text-on-surface-variant">
        {format(now, 'EEEE, MMMM d, yyyy')}
      </p>
    </div>
  );
}

function MinimalClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        className="text-[clamp(5rem,22vw,18rem)] font-thin tabular-nums tracking-tighter text-foreground leading-none"
      >
        {format(now, 'HH:mm')}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-1"
      >
        <span className="text-4xl font-light tabular-nums text-on-surface-variant/60">
          {format(now, 'ss')}
        </span>
        <span className="text-sm font-light text-on-surface-variant/50 tracking-[0.3em] uppercase">
          {format(now, 'EEEE · MMMM d')}
        </span>
      </motion.div>
    </div>
  );
}

function AnalogClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const s = now.getSeconds();
  const m = now.getMinutes();
  const h = now.getHours() % 12;
  const secDeg = s * 6;
  const minDeg = m * 6 + s * 0.1;
  const hourDeg = h * 30 + m * 0.5;

  const cx = 120, cy = 120, r = 100;

  const hand = (deg: number, len: number, width: number, color: string) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return (
      <motion.line
        animate={{ rotate: deg }}
        x1={cx} y1={cy}
        x2={cx + len * Math.cos(rad)}
        y2={cy + len * Math.sin(rad)}
        stroke={color} strokeWidth={width} strokeLinecap="round"
      />
    );
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 select-none">
      <motion.svg
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        viewBox="0 0 240 240"
        className="w-[min(55vw,340px)] h-[min(55vw,340px)] drop-shadow-2xl"
      >
        {/* Face */}
        <circle cx={cx} cy={cy} r={r + 15} className="fill-surface-variant" />
        <circle cx={cx} cy={cy} r={r} className="fill-surface stroke-outline/20" strokeWidth="1" />

        {/* Hour markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const rad = ((i * 30 - 90) * Math.PI) / 180;
          const isQuarter = i % 3 === 0;
          const inner = isQuarter ? r - 18 : r - 10;
          return (
            <line
              key={i}
              x1={cx + inner * Math.cos(rad)} y1={cy + inner * Math.sin(rad)}
              x2={cx + (r - 4) * Math.cos(rad)} y2={cy + (r - 4) * Math.sin(rad)}
              className={isQuarter ? "stroke-foreground" : "stroke-on-surface-variant/50"}
              strokeWidth={isQuarter ? 3 : 1.5}
              strokeLinecap="round"
            />
          );
        })}

        {/* Hands */}
        {hand(hourDeg, 52, 6, 'hsl(var(--primary-hue, 260) 50% 40%)')}
        {hand(minDeg, 72, 4, 'hsl(var(--primary-hue, 260) 70% 45%)')}
        {hand(secDeg, 80, 2, 'hsl(var(--primary-hue, 260) 90% 60%)')}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={5} className="fill-primary" />
        <circle cx={cx} cy={cy} r={2.5} fill="white" />
      </motion.svg>
      <div className="text-center">
        <p className="text-2xl font-semibold text-foreground tabular-nums">{format(now, 'h:mm:ss a')}</p>
        <p className="text-on-surface-variant mt-1">{format(now, 'EEEE, MMMM d, yyyy')}</p>
      </div>
    </div>
  );
}

function WordClock() {
  const [now, setNow] = useState(new Date());
  const [words, setWords] = useState(toWordTime(new Date()));
  useEffect(() => {
    const id = setInterval(() => {
      const n = new Date();
      setNow(n);
      setWords(toWordTime(n));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-8 px-8 select-none text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={words}
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          className="text-[clamp(2rem,6vw,5rem)] font-bold leading-tight text-foreground capitalize"
        >
          {words}
        </motion.p>
      </AnimatePresence>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-on-surface-variant text-lg font-light"
      >
        {format(now, 'EEEE, MMMM d, yyyy')}
      </motion.p>
    </div>
  );
}

// ── Stopwatch ─────────────────────────────────────────────────────────
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

  const start = () => { startRef.current = Date.now(); setRunning(true); frameRef.current = requestAnimationFrame(tick); };
  const pause = () => { cancelAnimationFrame(frameRef.current); baseRef.current = elapsed; startRef.current = null; setRunning(false); };
  const reset = () => { cancelAnimationFrame(frameRef.current); startRef.current = null; baseRef.current = 0; setElapsed(0); setRunning(false); setLaps([]); };
  const lap = () => setLaps((l) => [elapsed, ...l]);

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
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
          onClick={running ? lap : reset}
          className="px-6 py-3 rounded-full bg-surface-variant text-on-surface-variant font-semibold text-sm flex items-center gap-2 hover:bg-secondary-container transition-colors"
        >
          {running ? <Flag size={16} /> : <RotateCcw size={16} />}
          {running ? 'Lap' : 'Reset'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
          onClick={running ? pause : start}
          className={cn("px-8 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-colors",
            running ? "bg-error/15 text-error hover:bg-error/25" : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
          )}
        >
          {running ? <Pause size={16} /> : <Play size={16} />}
          {running ? 'Pause' : 'Start'}
        </motion.button>
      </div>
      {laps.length > 0 && (
        <div className="w-full max-w-sm max-h-48 overflow-y-auto space-y-1">
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

// ── Countdown Timer ───────────────────────────────────────────────────
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
      if (left <= 0) { setRemaining(0); setRunning(false); setFinished(true); endRef.current = null; }
      else { setRemaining(left); frameRef.current = requestAnimationFrame(tick); }
    }
  }, []);

  const start = () => { const ms = remaining !== null ? remaining : totalMs; if (ms <= 0) return; endRef.current = Date.now() + ms; setRunning(true); setFinished(false); frameRef.current = requestAnimationFrame(tick); };
  const pause = () => { cancelAnimationFrame(frameRef.current); endRef.current = null; setRunning(false); };
  const reset = () => { cancelAnimationFrame(frameRef.current); endRef.current = null; setRemaining(null); setRunning(false); setFinished(false); };

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
          <motion.div key="input" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-4">
            <NumInput label="hrs" value={inputH} onChange={setInputH} max={99} />
            <span className="text-4xl font-black text-primary pb-6">:</span>
            <NumInput label="min" value={inputM} onChange={setInputM} max={59} />
            <span className="text-4xl font-black text-primary pb-6">:</span>
            <NumInput label="sec" value={inputS} onChange={setInputS} max={59} />
          </motion.div>
        ) : (
          <motion.div key="running" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-56 h-56 md:w-72 md:h-72">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-variant" />
              <motion.circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-primary"
                strokeDasharray={`${2 * Math.PI * 54}`}
                animate={{ strokeDashoffset: (1 - progress / 100) * 2 * Math.PI * 54 }}
                transition={{ duration: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div animate={finished ? { scale: [1, 1.1, 1] } : {}} transition={{ repeat: finished ? Infinity : 0, duration: 0.8 }}
                className={cn("text-4xl md:text-5xl font-black tabular-nums", finished && "text-primary")}
              >
                {finished ? '🎉' : formatMs(displayMs)}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex gap-4">
        {(running || remaining !== null) && (
          <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} onClick={reset}
            className="px-6 py-3 rounded-full bg-surface-variant text-on-surface-variant font-semibold text-sm flex items-center gap-2 hover:bg-secondary-container transition-colors"
          ><RotateCcw size={16} /> Reset</motion.button>
        )}
        {!finished && (
          <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} onClick={running ? pause : start}
            disabled={!running && remaining === null && totalMs === 0}
            className={cn("px-8 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-colors disabled:opacity-40",
              running ? "bg-error/15 text-error hover:bg-error/25" : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
            )}
          >{running ? <Pause size={16} /> : <Play size={16} />}{running ? 'Pause' : 'Start'}</motion.button>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────
export function ClockMode({ isOpen, onClose }: ClockModeProps) {
  const [tab, setTab] = useState<Tab>('clock');
  const [clockStyle, setClockStyle] = useState<ClockStyle>('digital');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'clock', label: 'Clock', icon: <Clock size={16} /> },
    { id: 'stopwatch', label: 'Stopwatch', icon: <Timer size={16} /> },
    { id: 'timer', label: 'Timer', icon: <Timer size={16} /> },
  ];

  const styles: { id: ClockStyle; label: string; icon: React.ReactNode }[] = [
    { id: 'digital', label: 'Digital', icon: <Clock size={14} /> },
    { id: 'minimal', label: 'Minimal', icon: <AlignCenter size={14} /> },
    { id: 'analog', label: 'Analog', icon: <Watch size={14} /> },
    { id: 'word', label: 'Word', icon: <Type size={14} /> },
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
          <div className="flex items-center justify-between px-6 pt-6 pb-2 flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Tab switcher */}
              <div className="flex items-center gap-1 bg-surface-variant p-1 rounded-full">
                {tabs.map((t) => (
                  <button key={t.id} onClick={() => setTab(t.id)} className="relative px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                    {tab === t.id && (
                      <motion.div layoutId="clock-tab-pill" className="absolute inset-0 bg-background rounded-full shadow-sm" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                    <span className={cn("relative z-10 flex items-center gap-1.5", tab === t.id ? "text-foreground" : "text-on-surface-variant")}>
                      {t.icon} {t.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Clock style picker — only shown on clock tab */}
              {tab === 'clock' && (
                <div className="flex items-center gap-1 bg-surface-variant p-1 rounded-full">
                  {styles.map((s) => (
                    <button key={s.id} onClick={() => setClockStyle(s.id)} className="relative px-3 py-1.5 rounded-full text-xs font-semibold transition-colors">
                      {clockStyle === s.id && (
                        <motion.div layoutId="clock-style-pill" className="absolute inset-0 bg-primary/15 border border-primary/30 rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                      )}
                      <span className={cn("relative z-10 flex items-center gap-1", clockStyle === s.id ? "text-primary" : "text-on-surface-variant")}>
                        {s.icon} {s.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
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
              key={tab === 'clock' ? `${tab}-${clockStyle}` : tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="flex flex-col flex-1 pb-12"
            >
              {tab === 'clock' && clockStyle === 'digital' && <DigitalClock />}
              {tab === 'clock' && clockStyle === 'minimal' && <MinimalClock />}
              {tab === 'clock' && clockStyle === 'analog' && <AnalogClock />}
              {tab === 'clock' && clockStyle === 'word' && <WordClock />}
              {tab === 'stopwatch' && <Stopwatch />}
              {tab === 'timer' && <CountdownTimer />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
