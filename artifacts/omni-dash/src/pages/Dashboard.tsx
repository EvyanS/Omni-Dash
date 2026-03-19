import React, { useMemo, useEffect } from 'react';
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
    setIsMobileMenuOpen
  } = useDashboard();

  const { hue, setHue, mode, toggleMode } = useTheme();

  // Scroll spy / active category state
  const [activeCategory, setActiveCategory] = React.useState('Favorites');

  // Filter sites based on search
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

  // Group sites by category
  const groupedSites = useMemo(() => {
    const groups: Record<string, typeof allSites> = {};
    
    // Add Favorites group manually
    const favorites = filteredSites.filter((s) => pinnedIds.includes(s.id));
    if (favorites.length > 0 || searchQuery === '') {
      groups['Favorites'] = favorites;
    }

    // Add rest of categories
    CATEGORIES.filter(c => c !== 'Favorites').forEach((cat) => {
      const items = filteredSites.filter((s) => s.category === cat);
      if (items.length > 0) {
        groups[cat] = items;
      }
    });

    return groups;
  }, [filteredSites, pinnedIds, searchQuery]);

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    const element = document.getElementById(`category-${cat}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // offset for sticky header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Intersection Observer to highlight active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const categoryElements = CATEGORIES.map(cat => ({
        cat,
        el: document.getElementById(`category-${cat}`)
      })).filter(item => item.el !== null);

      let currentActive = CATEGORIES[0]; // Default to Favorites
      const offset = 120; // threshold

      for (let i = categoryElements.length - 1; i >= 0; i--) {
        const item = categoryElements[i];
        if (item.el && window.scrollY >= item.el.offsetTop - offset) {
          currentActive = item.cat;
          break;
        }
      }
      
      // Don't override if user is searching
      if (!searchQuery) {
        setActiveCategory(currentActive);
      }
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
          {filteredSites.length === 0 ? (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-surface-variant flex items-center justify-center text-primary mb-6">
                <SearchX size={40} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No apps found</h2>
              <p className="text-on-surface-variant">We couldn't find anything matching "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 px-6 py-2 rounded-full bg-secondary-container text-on-secondary-container font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {CATEGORIES.map((cat) => {
                const sites = groupedSites[cat];
                if (!sites || sites.length === 0) return null;

                return (
                  <motion.section 
                    key={cat} 
                    id={`category-${cat}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="scroll-mt-28"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">
                        {cat}
                      </h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-outline/30 to-transparent" />
                      <span className="text-sm font-medium text-on-surface-variant bg-surface px-3 py-1 rounded-full border border-outline/10">
                        {sites.length} {sites.length === 1 ? 'app' : 'apps'}
                      </span>
                    </div>

                    <motion.div 
                      layout
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6"
                    >
                      <AnimatePresence>
                        {sites.map((site) => (
                          <SiteCard
                            key={`${cat}-${site.id}`}
                            site={site}
                            isPinned={pinnedIds.includes(site.id)}
                            onTogglePin={togglePin}
                            onRemoveCustom={removeCustomSite}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </motion.section>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Floating Action Button (FAB) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAddSiteOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-primary-foreground rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center z-40 hover:bg-primary/90 transition-colors"
        title="Add custom shortcut"
      >
        <Plus size={28} />
      </motion.button>

      {/* Modals & Drawers */}
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
