import { useState, useEffect } from 'react';

export function useTheme() {
  const [hue, setHue] = useState<number>(() => {
    const saved = localStorage.getItem('omni-theme-hue');
    return saved ? parseInt(saved, 10) : 260;
  });

  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('omni-theme-mode');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [autoTheme, setAutoTheme] = useState<boolean>(() => {
    const saved = localStorage.getItem('omni-auto-theme');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('omni-theme-hue', hue.toString());
    document.documentElement.style.setProperty('--base-hue', hue.toString());
  }, [hue]);

  useEffect(() => {
    localStorage.setItem('omni-theme-mode', mode);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('omni-auto-theme', String(autoTheme));
  }, [autoTheme]);

  // Auto light/dark based on approximate sunrise/sunset (7am–7pm = light)
  useEffect(() => {
    if (!autoTheme) return;
    const checkTime = () => {
      const hour = new Date().getHours();
      const isDaytime = hour >= 7 && hour < 19;
      setMode(isDaytime ? 'light' : 'dark');
    };
    checkTime();
    const interval = setInterval(checkTime, 60 * 1000);
    return () => clearInterval(interval);
  }, [autoTheme]);

  const toggleMode = () => {
    if (autoTheme) return; // don't allow manual toggle when auto is on
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  };

  return { hue, setHue, mode, toggleMode, autoTheme, setAutoTheme };
}
