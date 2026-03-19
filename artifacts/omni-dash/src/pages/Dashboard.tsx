import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, SearchX } from 'lucide-react';
import { useDashboard } from '../hooks/use-dashboard';
import { useTheme } from '../hooks/use-theme';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { SiteCard } from '../components/SiteCard';
import { SettingsPanel } from '../components/SettingsPanel';
import { AddSiteModal } from '../components/AddSiteModal';
import { CATEGORIES } from '../sites';

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const sectionHeadingVariants = {
  hidden: { x: -24, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 280, damping: 26 },
  },
};

function AnimatedCount({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(value / 12);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
}

export function Dashboard() {
  const {
    allSites,
    pinnedIds,
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
  } = useDashboard();

  const { hue, setHue, mode, toggleMode } = useTheme();
  const [activeCategory, setActiveCategory] = React.useState('Favorites');
  const [fabHovered, setFabHovered] = useState(false);

  const filteredSites = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return allSites;
    return allSites.filter(
      (site) =>
        site.name.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q) ||
        site.category.toLowerCase().includes(q)
    );
  }, [allSites, searchQuery]);

  const groupedSites = useMemo(() => {
    const groups: Record<string, typeof allSites> = {};
    const favorites = filteredSites.filter((s) => pinnedIds.includes(s.id));
    if (favorites.length > 0 || searchQuery === '') {
      groups['Favorites'] = favorites;
    }
    CATEGORIES.filter((c) => c !== 'Favorites').forEach((cat) => {
      const items = filteredSites.filter((s) => s.category === cat);
      if (items.length > 0) groups[cat] = items;
    });
    return groups;
  }, [filteredSites, pinnedIds, searchQuery]);

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    const element = document.getElementById(`category-${cat}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const categoryElements = CATEGORIES.map((cat) => ({
        cat,
        el: document.getElementById(`category-${cat}`),
      })).filter((item) => item.el !== null);

      let currentActive = CATEGORIES[0];
      const offset = 120;

      for (let i = categoryElements.length - 1; i >= 0; i--) {
        const item = categoryElements[i];
        if (item.el && window.scrollY >= item.el.offsetTop - offset) {
          currentActive = item.cat;
          break;
        }
      }
      if (!searchQuery) setActiveCategory(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      <TopBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

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
                <p className="text-on-surface-variant">
                  Nothing matched "{searchQuery}"
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSearchQuery('')}
                  className="mt-6 px-6 py-2 rounded-full bg-secondary-container text-on-secondary-container font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Clear Search
                </motion.button>
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
                      {/* Section heading */}
                      <motion.div
                        variants={sectionHeadingVariants}
                        className="flex items-center gap-4 mb-6"
                      >
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                          {cat}
                        </h2>
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

                      {/* Cards grid with stagger */}
                      <motion.div
                        variants={cardContainerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-5"
                      >
                        <AnimatePresence>
                          {sites.map((site, i) => (
                            <SiteCard
                              key={`${cat}-${site.id}`}
                              site={site}
                              isPinned={pinnedIds.includes(site.id)}
                              onTogglePin={togglePin}
                              onRemoveCustom={removeCustomSite}
                              index={i}
                            />
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    </motion.section>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* FAB with tooltip */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-center gap-2">
        <AnimatePresence>
          {fabHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
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
          title="Add custom shortcut"
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
      />

      <AddSiteModal
        isOpen={isAddSiteOpen}
        onClose={() => setIsAddSiteOpen(false)}
        onAdd={addCustomSite}
      />
    </div>
  );
}
