import { useState, useEffect, useMemo } from 'react';
import { Site, DEFAULT_SITES } from '../sites';

export function useDashboard() {
  const [customSites, setCustomSites] = useState<Site[]>(() => {
    const saved = localStorage.getItem('omni-custom-sites');
    return saved ? JSON.parse(saved) : [];
  });

  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('omni-pinned-ids');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyUsed, setRecentlyUsed] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('omni-recently-used');
    return saved ? JSON.parse(saved) : {};
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddSiteOpen, setIsAddSiteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [fuzzySearch, setFuzzySearch] = useState<boolean>(() => {
    const saved = localStorage.getItem('omni-fuzzy-search');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('omni-custom-sites', JSON.stringify(customSites));
  }, [customSites]);

  useEffect(() => {
    localStorage.setItem('omni-pinned-ids', JSON.stringify(pinnedIds));
  }, [pinnedIds]);

  useEffect(() => {
    localStorage.setItem('omni-recently-used', JSON.stringify(recentlyUsed));
  }, [recentlyUsed]);

  useEffect(() => {
    localStorage.setItem('omni-fuzzy-search', String(fuzzySearch));
  }, [fuzzySearch]);

  const allSites = useMemo(() => [...DEFAULT_SITES, ...customSites], [customSites]);

  const togglePin = (id: string) => {
    setPinnedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const trackUsage = (id: string) => {
    setRecentlyUsed((prev) => ({ ...prev, [id]: Date.now() }));
  };

  const addCustomSite = (site: Site) => {
    setCustomSites((prev) => [...prev, site]);
    setIsAddSiteOpen(false);
  };

  const removeCustomSite = (id: string) => {
    setCustomSites((prev) => prev.filter((s) => s.id !== id));
    setPinnedIds((prev) => prev.filter((p) => p !== id));
  };

  // Global search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    allSites,
    customSites,
    pinnedIds,
    recentlyUsed,
    trackUsage,
    searchQuery,
    setSearchQuery,
    togglePin,
    addCustomSite,
    removeCustomSite,
    isSettingsOpen,
    setIsSettingsOpen,
    isAddSiteOpen,
    setIsAddSiteOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    fuzzySearch,
    setFuzzySearch,
  };
}
