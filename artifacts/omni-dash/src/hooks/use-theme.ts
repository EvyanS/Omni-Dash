import { useState, useEffect } from 'react';

export function useTheme() {
  const [hue, setHue] = useState<number>(() => {
    const saved = localStorage.getItem('omni-theme-hue');
    return saved ? parseInt(saved, 10) : 260; // Default M3 Purple/Blue
  });

  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('omni-theme-mode');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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

  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return { hue, setHue, mode, toggleMode };
}
