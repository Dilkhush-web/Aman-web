import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Sparkles, 
  Film, 
  Image, 
  Briefcase, 
  MessageSquareQuote, 
  PhoneCall, 
  Lock, 
  LogOut, 
  ArrowRight, 
  ChevronLeft,
  X,
  Menu,
  Phone
} from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, onLogout, activeTab, setActiveTab, openLoginModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const navTabs = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'story', label: 'Story', icon: <Sparkles size={18} /> },
    { id: 'films', label: 'Films', icon: <Film size={18} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Image size={18} /> },
    { id: 'services', label: 'Services', icon: <Briefcase size={18} /> },
    { id: 'testimonials', label: 'Reviews', icon: <MessageSquareQuote size={18} /> },
    { id: 'contact', label: 'Contact', icon: <PhoneCall size={18} /> }
  ];

  // Quick tabs for Mobile Bottom Floating Dock
  const mobileQuickTabs = [
    { id: 'home', label: 'Home', icon: <Home size={17} /> },
    { id: 'films', label: 'Films', icon: <Film size={17} /> },
    { id: 'portfolio', label: 'Archive', icon: <Image size={17} /> },
    { id: 'services', label: 'Tariffs', icon: <Briefcase size={17} /> },
    { id: 'contact', label: 'Book', icon: <PhoneCall size={17} /> }
  ];

  const handleTabSelect = (id) => {
    if (setCurrentView) setCurrentView('public');
    if (setActiveTab) setActiveTab(id);
    setMobileMenuOpen(false);
    setIsSidebarOpen(false);
  };

  // 🖱️ AUTO HOVER OPEN / CLOSE LOGIC (DESKTOP ONLY)
  const handleMouseEnterMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsSidebarOpen(true);
  };

  const handleMouseLeaveMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsSidebarOpen(false);
    }, 250);
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* 🔮 MASTER INVERTED CORNER CURVE & MOBILE CAPSULE STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

        .font-brand-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-brand-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-brand-mono { font-family: 'Space Grotesk', monospace; }

        /* THE SIGNATURE INVERTED CUTOUT CURVE (DESKTOP) */
        .active-tab-curve {
          background-color: #FAF8F5;
          color: #78350F;
          border-top-left-radius: 26px;
          border-bottom-left-radius: 26px;
          position: relative;
        }

        .active-tab-curve::before {
          content: '';
          position: absolute;
          top: -24px;
          right: 0;
          width: 24px;
          height: 24px;
          background-color: transparent;
          border-bottom-right-radius: 24px;
          box-shadow: 0 12px 0 0 #FAF8F5;
          pointer-events: none;
        }

        .active-tab-curve::after {
          content: '';
          position: absolute;
          bottom: -24px;
          right: 0;
          width: 24px;
          height: 24px;
          background-color: transparent;
          border-top-right-radius: 24px;
          box-shadow: 0 -12px 0 0 #FAF8F5;
          pointer-events: none;
        }

        .compact-menu-btn {
          background: rgba(18, 16, 14, 0.92);
          backdrop-filter: blur(20px);
          box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(245, 158, 11, 0.3);
        }

        /* Mobile Glass Dock Float */
        .mobile-glass-dock {
          background: rgba(18, 16, 14, 0.88);
          backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(245, 158, 11, 0.25);
          box-shadow: 0 18px 40px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(217, 119, 6, 0.15);
        }
      `}</style>

      {/* =========================================================================
          1. ULTRA-COMPACT FLOATING TRIGGER (DESKTOP)
      ========================================================================= */}
      <div className="hidden lg:flex fixed top-5 left-6 z-[8999] pointer-events-auto items-center gap-2.5">
        <button
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeaveMenu}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="compact-menu-btn group flex items-center gap-2.5 px-3 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer hover:border-amber-500/60"
          aria-label="Toggle Navigation Menu"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-stone-900 flex items-center justify-center text-stone-950 font-extrabold text-xs shadow-xs group-hover:rotate-180 transition-transform duration-500">
            <span className="font-brand-cinzel">G</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-1 w-4 pr-1">
            <span className={`w-3.5 h-[1.5px] bg-amber-400 rounded-full transition-transform duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`w-2.5 h-[1.5px] bg-amber-400 rounded-full transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0' : 'group-hover:w-3.5'}`} />
            <span className={`w-3.5 h-[1.5px] bg-amber-400 rounded-full transition-transform duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </div>
        </button>

        {!isSidebarOpen && currentView === 'public' && (
          <button
            onClick={openLoginModal}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-stone-300/80 text-stone-800 hover:text-amber-800 flex items-center justify-center shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Client & Admin Vault Login"
          >
            <Lock size={13} className="text-amber-700" />
          </button>
        )}
      </div>

      {/* =========================================================================
          2. DESKTOP SLIDE-OUT VERTICAL SIDEBAR DRAWER
      ========================================================================= */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="hidden lg:block fixed inset-0 z-[8999] bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in cursor-pointer"
        />
      )}

      <aside 
        onMouseEnter={handleMouseEnterMenu}
        onMouseLeave={handleMouseLeaveMenu}
        className={`hidden lg:flex fixed top-0 left-0 bottom-0 w-64 xl:w-72 bg-[#12100E] z-[9000] flex-col justify-between select-none shadow-[25px_0_60px_rgba(0,0,0,0.55)] border-r border-white/10 overflow-y-auto no-scrollbar transition-transform duration-500 ease-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="pt-7 pb-4 px-6 text-left border-b border-white/5 flex items-start justify-between">
          <div 
            onClick={() => handleTabSelect('home')} 
            className="cursor-pointer group space-y-1.5 block"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-stone-950 flex items-center justify-center text-stone-950 font-extrabold shadow-md group-hover:scale-105 transition-transform duration-300">
              <span className="font-brand-cinzel text-base tracking-tighter">G</span>
            </div>
            
            <div className="pt-0.5">
              <h1 className="font-brand-cinzel text-base xl:text-lg font-bold tracking-wider text-stone-100 leading-tight group-hover:text-amber-400 transition-colors">
                GURU <span className="font-light italic text-amber-500">VIDEOGRAPHY</span>
              </h1>
              <span className="text-[7.5px] tracking-[0.35em] text-stone-400 font-brand-mono block uppercase mt-0.5">
                Fine-Art Cinema Studio
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-stone-400 hover:text-white transition-colors cursor-pointer"
            title="Collapse Sidebar (Esc)"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* Navigation Tab Links */}
        <nav className="flex-1 py-3 pl-4 space-y-1.5 flex flex-col justify-center">
          {currentView === 'public' ? (
            navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id)}
                  className={`w-full text-left py-3 px-5 flex items-center gap-3.5 font-brand-sans text-xs tracking-wider uppercase font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'active-tab-curve text-amber-900 shadow-[-10px_0_20px_rgba(0,0,0,0.15)] font-extrabold'
                      : 'text-stone-400 hover:text-stone-100 hover:pl-6 rounded-l-2xl'
                  }`}
                >
                  <span className={`${isActive ? 'text-amber-700' : 'text-stone-500'}`}>
                    {tab.icon}
                  </span>
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-6 text-left space-y-3">
              <div className="p-4 bg-stone-900/90 rounded-2xl border border-amber-500/30 text-amber-400 font-brand-mono text-xs">
                <span className="block text-[9px] uppercase tracking-widest text-stone-500">Console Mode</span>
                <span className="font-bold uppercase tracking-wider">{currentView}</span>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 font-brand-sans text-xs uppercase font-bold tracking-wider hover:bg-rose-900 transition-colors"
              >
                <LogOut size={14} />
                <span>Disconnect</span>
              </button>
            </div>
          )}
        </nav>

        {/* Bottom VIP CTA Box */}
        <div className="p-5 space-y-3 border-t border-white/5">
          <div className="bg-gradient-to-br from-stone-900 to-black p-3.5 rounded-2xl border border-amber-500/25 text-left relative overflow-hidden group shadow-lg">
            <div className="space-y-0.5 relative z-10">
              <span className="text-[8px] font-brand-mono uppercase tracking-[0.25em] text-amber-400 font-bold block">
                VIP COMMISSIONS
              </span>
              <p className="font-brand-cinzel text-xs text-stone-100 font-bold leading-snug">
                Reserve Your Date
              </p>
            </div>

            <button
              onClick={() => handleTabSelect('contact')}
              className="mt-2.5 w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 py-2 px-3 rounded-xl text-[9.5px] font-brand-sans font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <span>Consult Now</span>
              <ArrowRight size={11} />
            </button>
          </div>

          <button
            onClick={() => {
              setIsSidebarOpen(false);
              openLoginModal();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-white/10 text-stone-300 hover:text-amber-400 font-brand-mono text-[9.5px] font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Lock size={12} className="text-amber-500" />
            <span>Client Vault Login</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          3. LUXURY MOBILE TOP BRAND HEADER (FROSTED COMPACT)
      ========================================================================= */}
      <header className="lg:hidden fixed top-0 left-0 w-full z-[8998] px-4 py-2.5 bg-[#12100E]/90 backdrop-blur-2xl border-b border-amber-500/15 flex items-center justify-between text-stone-100 shadow-lg">
        <div 
          onClick={() => handleTabSelect('home')}
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-stone-900 flex items-center justify-center text-stone-950 font-bold text-xs shadow-sm">
            <span className="font-brand-cinzel">G</span>
          </div>
          <div className="text-left leading-none">
            <span className="font-brand-cinzel text-xs sm:text-sm font-bold tracking-wider text-stone-100">
              GURU <span className="italic text-amber-500">VIDEOGRAPHY</span>
            </span>
            <span className="block text-[6.5px] tracking-[0.25em] text-stone-400 font-brand-mono uppercase mt-0.5">
              Siwan • Bihar
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentView === 'public' && (
            <button
              onClick={openLoginModal}
              className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[9px] font-brand-mono font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-transform"
            >
              <Lock size={10} />
              <span>Vault</span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-stone-900/90 border border-white/10 text-amber-400 cursor-pointer active:scale-95 transition-transform"
            aria-label="Open Full Menu"
          >
            <Menu size={16} />
          </button>
        </div>
      </header>

      {/* =========================================================================
          🌟 4. MOBILE FLOATING GLASS BOTTOM DOCK (THUMB-PERFECT ACCESSIBILITY)
      ========================================================================= */}
      <div className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-[8999] w-[94%] max-w-sm pointer-events-auto">
        <div className="mobile-glass-dock rounded-2xl p-1.5 flex items-center justify-around shadow-2xl">
          {mobileQuickTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabSelect(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-400 to-amber-600 text-stone-950 font-bold shadow-md scale-105'
                    : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-[8.5px] font-brand-mono uppercase tracking-wider mt-0.5">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          🌟 5. FULL-SCREEN EDITORIAL MOBILE DRAWER (SMOOTH SLIDE-DOWN & LUXURY UI)
      ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999] bg-[#12100E]/98 backdrop-blur-3xl p-6 flex flex-col justify-between text-stone-100 overflow-y-auto animate-fade-in">
          
          {/* Top Bar of Drawer */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-stone-900 flex items-center justify-center text-stone-950 font-extrabold text-sm shadow-md">
                <span className="font-brand-cinzel">G</span>
              </div>
              <div>
                <h3 className="font-brand-cinzel text-sm font-bold text-stone-100">
                  GURU <span className="italic text-amber-500">VIDEOGRAPHY</span>
                </h3>
                <span className="text-[7.5px] tracking-[0.25em] text-stone-400 font-brand-mono uppercase block">
                  Directed by Aman Kumar
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer active:scale-95 transition-transform"
            >
              <X size={16} />
            </button>
          </div>

          {/* Directory Navigation Links */}
          <div className="space-y-3 py-6 text-left">
            <span className="text-[9px] font-brand-mono tracking-[0.3em] text-amber-500 uppercase font-bold block">
              STUDIO ARCHIVE DIRECTORY
            </span>

            <div className="flex flex-col space-y-1.5">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabSelect(tab.id)}
                    className={`w-full text-left py-3 px-4 rounded-xl flex items-center justify-between font-brand-cinzel text-base tracking-wide transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40 shadow-sm' 
                        : 'text-stone-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-amber-400' : 'text-stone-500'}>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </div>
                    <ArrowRight size={13} className={isActive ? 'text-amber-400' : 'text-stone-600'} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Actions & Quick Call */}
          <div className="pt-4 border-t border-white/10 space-y-3 pb-8">
            <button
              onClick={() => handleTabSelect('contact')}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-stone-950 font-brand-sans font-bold uppercase text-xs tracking-widest rounded-xl shadow-lg cursor-pointer active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <span>Reserve 2026 Session</span>
              <ArrowRight size={13} />
            </button>

            <a
              href="tel:8434656386"
              className="w-full py-2.5 bg-stone-900 border border-white/10 text-stone-300 text-xs font-brand-mono font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              <Phone size={13} className="text-amber-400" />
              <span>Direct: +91 8434656386</span>
            </a>

            <p className="text-center text-[9.5px] font-brand-mono text-stone-500 uppercase tracking-widest pt-1">
              Guru Videography © 2026 • Siwan, Bihar
            </p>
          </div>

        </div>
      )}
    </>
  );
}