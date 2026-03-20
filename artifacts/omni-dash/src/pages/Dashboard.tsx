import React, { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, SearchX, Zap } from 'lucide-react';
import { useDashboard } from '../hooks/use-dashboard';
import { useTheme } from '../hooks/use-theme';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { SiteCard } from '../components/SiteCard';
import { SettingsPanel } from '../components/SettingsPanel';
import { AddSiteModal } from '../components/AddSiteModal';
import { ClockMode } from '../components/ClockMode';
import { CATEGORIES, Site } from '../sites';

const sectionHeadingVariants = {
  hidden: { x: -24, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 26 } },
};

function AnimatedCount({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(value / 12);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(start);
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
}

// ── Search scoring ───────────────────────────────────────────────────
function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return 100 + (100 - q.length);
  let qi = 0, score = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) { score++; qi++; }
  }
  return qi === q.length ? (score / t.length) * 60 : 0;
}

function simpleScore(query: string, text: string): number {
  return text.toLowerCase().includes(query.toLowerCase()) ? 100 : 0;
}

function getBaseMatchScore(query: string, site: Site, fuzzy: boolean): number {
  const scorer = fuzzy ? fuzzyScore : simpleScore;
  const cats = site.categories ?? [site.category];
  return Math.max(
    scorer(query, site.name) * 2.5,
    scorer(query, site.description),
    ...cats.map((c) => scorer(query, c)),
  );
}

function recencyBonus(id: string, recentlyUsed: Record<string, number>): number {
  const t = recentlyUsed[id];
  if (!t) return 0;
  const age = Date.now() - t;
  if (age < 30 * 60_000) return 10000;     // < 30 min
  if (age < 2 * 3600_000) return 5000;     // < 2 h
  if (age < 24 * 3600_000) return 1000;    // < 24 h
  return 200;
}

const AUTO_LAUNCH_MS = 1600;

function AutoLaunchBar({ site, onCancel }: { site: Site; onCancel: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground px-5 py-2.5 rounded-full shadow-xl flex items-center gap-3 text-sm font-semibold"
    >
      <Zap size={15} className="shrink-0" />
      <span>Launching <strong>{site.name}</strong>…</span>
      <div className="h-1 bg-primary-foreground/30 rounded-full overflow-hidden w-20">
        <motion.div
          className="h-full bg-primary-foreground rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: AUTO_LAUNCH_MS / 1000, ease: 'linear' }}
        />
      </div>
      <button
        onClick={onCancel}
        className="text-primary-foreground/70 hover:text-primary-foreground text-xs underline underline-offset-2"
      >
        cancel
      </button>
    </motion.div>
  );
}

export function Dashboard() {
  const {
    allSites, pinnedIds, recentlyUsed, trackUsage,
    searchQuery, setSearchQuery,
    togglePin, addCustomSite, removeCustomSite,
    isSettingsOpen, setIsSettingsOpen,
    isAddSiteOpen, setIsAddSiteOpen,
    isMobileMenuOpen, setIsMobileMenuOpen,
    fuzzySearch, setFuzzySearch,
  } = useDashboard();

  const { hue, setHue, mode, toggleMode, autoTheme, setAutoTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('Favorites');
  const [fabHovered, setFabHovered] = useState(false);
  const [isClockOpen, setIsClockOpen] = useState(false);
  const [autoLaunchSite, setAutoLaunchSite] = useState<Site | null>(null);
  const autoLaunchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Filtered & sorted sites ─────────────────────────────────────────
  const filteredSites = useMemo(() => {
    if (!searchQuery) {
      // No query — show all, but sort recent to top within each category
      return allSites.slice().sort((a, b) => recencyBonus(b.id, recentlyUsed) - recencyBonus(a.id, recentlyUsed));
    }
    return allSites
      .map((site) => {
        const matchScore = getBaseMatchScore(searchQuery, site, fuzzySearch);
        if (matchScore === 0) return null;
        const score = matchScore + recencyBonus(site.id, recentlyUsed) + (pinnedIds.includes(site.id) ? 500 : 0);
        return { site, score };
      })
      .filter(Boolean)
      .sort((a, b) => b!.score - a!.score)
      .map((x) => x!.site);
  }, [allSites, searchQuery, fuzzySearch, recentlyUsed, pinnedIds]);

  // ── Auto-launch when exactly 1 result ──────────────────────────────
  useEffect(() => {
    if (autoLaunchTimer.current) clearTimeout(autoLaunchTimer.current);
    if (filteredSites.length === 1 && searchQuery.length > 1) {
      const site = filteredSites[0];
      setAutoLaunchSite(site);
      autoLaunchTimer.current = setTimeout(() => {
        window.open(site.url, '_blank', 'noopener,noreferrer');
        trackUsage(site.id);
        setAutoLaunchSite(null);
        setSearchQuery('');
      }, AUTO_LAUNCH_MS);
    } else {
      setAutoLaunchSite(null);
    }
    return () => { if (autoLaunchTimer.current) clearTimeout(autoLaunchTimer.current); };
  }, [filteredSites, searchQuery]);

  const cancelAutoLaunch = () => {
    if (autoLaunchTimer.current) clearTimeout(autoLaunchTimer.current);
    setAutoLaunchSite(null);
  };

  // ── Enter key: launch top result ───────────────────────────────────
  const handleSearchEnter = useCallback(() => {
    if (filteredSites.length > 0) {
      const top = filteredSites[0];
      window.open(top.url, '_blank', 'noopener,noreferrer');
      trackUsage(top.id);
      setSearchQuery('');
      setAutoLaunchSite(null);
      if (autoLaunchTimer.current) clearTimeout(autoLaunchTimer.current);
    }
  }, [filteredSites, trackUsage, setSearchQuery]);

  // ── Group by category ──────────────────────────────────────────────
  const groupedSites = useMemo(() => {
    const groups: Record<string, Site[]> = {};
    const favorites = filteredSites.filter((s) => pinnedIds.includes(s.id));
    if (favorites.length > 0 || !searchQuery) groups['Favorites'] = favorites;
    CATEGORIES.filter((c) => c !== 'Favorites').forEach((cat) => {
      const items = filteredSites.filter((s) => {
        const cats = s.categories ?? [s.category];
        return cats.includes(cat);
      });
      if (items.length > 0) groups[cat] = items;
    });
    return groups;
  }, [filteredSites, pinnedIds, searchQuery]);

  // ── Scroll spy ─────────────────────────────────────────────────────
  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    const el = document.getElementById(`category-${cat}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (searchQuery) return;
      const items = CATEGORIES.map((cat) => ({ cat, el: document.getElementById(`category-${cat}`) })).filter((i) => i.el);
      let current = CATEGORIES[0];
      for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].el && window.scrollY >= items[i].el!.offsetTop - 120) { current = items[i].cat; break; }
      }
      setActiveCategory(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery]);

  const topResultId = searchQuery ? filteredSites[0]?.id : undefined;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      <TopBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onOpenClock={() => setIsClockOpen(true)}
        fuzzySearch={fuzzySearch}
        onSearchEnter={handleSearchEnter}
      />

      <AnimatePresence>
        {autoLaunchSite && (
          <AutoLaunchBar site={autoLaunchSite} onCancel={cancelAutoLaunch} />
        )}
      </AnimatePresence>

      <div className="flex flex-1 pt-20 max-w-[2000px] mx-auto w-full">
        <Sidebar
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 p-6 md:p-8 lg:p-10 pb-32">
          <AnimatePresence mode="wait">
            {filteredSites.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-[60vh] flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -5, 0] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-24 h-24 rounded-full bg-surface-variant flex items-center justify-center text-primary mb-6"
                >
                  <SearchX size={40} />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-2">No apps found</h2>
                <p className="text-on-surface-variant mb-6">Nothing matched "{searchQuery}"</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    onClick={() => setSearchQuery('')}
                    className="px-6 py-2.5 rounded-full bg-surface-variant text-on-surface-variant font-semibold hover:bg-secondary-container transition-colors"
                  >
                    Clear Search
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    onClick={() => { setSearchQuery(''); setIsAddSiteOpen(true); }}
                    className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <Plus size={16} /> Add your own
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="grid" className="space-y-16">
                {CATEGORIES.map((cat) => {
                  const sites = groupedSites[cat];
                  if (!sites || sites.length === 0) return null;
                  return (
                    <motion.section
                      key={cat}
                      id={`category-${cat}`}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-80px' }}
                      className="scroll-mt-28"
                    >
                      <motion.div variants={sectionHeadingVariants} className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">{cat}</h2>
                        <motion.div
                          className="flex-1 h-px bg-gradient-to-r from-outline/30 to-transparent"
                          initial={{ scaleX: 0, originX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          viewport={{ once: true }}
                        />
                        <motion.span
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.15 }}
                          viewport={{ once: true }}
                          className="text-sm font-medium text-on-surface-variant bg-surface px-3 py-1 rounded-full border border-outline/10"
                        >
                          <AnimatedCount value={sites.length} /> {sites.length === 1 ? 'app' : 'apps'}
                        </motion.span>
                      </motion.div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-5">
                        <AnimatePresence>
                          {sites.map((site, i) => {
                            const lastUsed = recentlyUsed[site.id];
                            const isRecent = lastUsed ? (Date.now() - lastUsed) < 2 * 3600_000 : false;
                            return (
                              <SiteCard
                                key={`${cat}-${site.id}`}
                                site={site}
                                isPinned={pinnedIds.includes(site.id)}
                                onTogglePin={togglePin}
                                onRemoveCustom={removeCustomSite}
                                onLaunch={trackUsage}
                                index={i}
                                isRecent={isRecent}
                                isTopResult={searchQuery.length > 0 && site.id === topResultId}
                              />
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </motion.section>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-center gap-2">
        <AnimatePresence>
          {fabHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              className="bg-foreground text-background text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap pointer-events-none"
            >
              Add shortcut
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 45 }}
          whileTap={{ scale: 0.92 }}
          onHoverStart={() => setFabHovered(true)}
          onHoverEnd={() => setFabHovered(false)}
          onClick={() => setIsAddSiteOpen(true)}
          className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <Plus size={28} />
        </motion.button>
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        hue={hue}
        setHue={setHue}
        mode={mode}
        toggleMode={toggleMode}
        autoTheme={autoTheme}
        setAutoTheme={setAutoTheme}
        fuzzySearch={fuzzySearch}
        setFuzzySearch={setFuzzySearch}
      />

      <AddSiteModal
        isOpen={isAddSiteOpen}
        onClose={() => setIsAddSiteOpen(false)}
        onAdd={addCustomSite}
      />

      <ClockMode isOpen={isClockOpen} onClose={() => setIsClockOpen(false)} />
    </div>
  );
}
