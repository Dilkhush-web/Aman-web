import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Story from './components/Story';
import Services from './components/Services';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Films from './components/Films';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import AIChatbot from './components/AIChatbot';
import Testimonials from './components/Testimonials';

// Secure Executive Control Panels
import ClientVault from './panels/ClientVault';
import AdminDashboard from './panels/AdminDashboard';
import CrewWorkspace from './panels/CrewWorkspace';

export default function App() {
  const [currentView, setCurrentView] = useState('public');
  const [activeTab, setActiveTab] = useState('home');
  const [authenticatedClient, setAuthenticatedClient] = useState(null);
  
  // 🎬 SMOOTH 3-PHOTO STAGGERED INTRO
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);

  // 🔐 CUSTOM LUXURY LOGIN MODAL STATES
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPin, setLoginPin] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // 🌐 DYNAMIC BACKEND API BASE URL
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://aman-web-nuwa.onrender.com/';

  // 3 Curated Sharp Frames with Optical Top-Center Focal Balance
  const introFrames = [
    {
      badge: "CHAPTER I • SACRED VIVAH",
      title: "The Sacred Vows",
      subtitle: "Preserving Human Poetry in Pure Light",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784743445/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits_xxvlnv.jpg"
    },
    {
      badge: "CHAPTER II • RAW EMOTIONS",
      title: "Unscripted Joy",
      subtitle: "Timeless Rituals & Tender Tears",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784746879/WhatsApp_Image_2026-07-23_at_12.30.06_AM_w4cexe.jpg"
    },
    {
      badge: "CHAPTER III • CINEMA HEIRLOOM",
      title: "Guru Videography",
      subtitle: "Directed by Aman Kumar • Siwan & Beyond",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784742666/uniquephotography1.0-20260318-0087_yyozre.webp"
    }
  ];

  useEffect(() => {
    document.body.style.backgroundColor = "#FAF8F5";
    document.documentElement.style.backgroundColor = "#FAF8F5";

    const step1Timer = setTimeout(() => setIntroStep(1), 1100);
    const step2Timer = setTimeout(() => setIntroStep(2), 2200);
    const exitTimer = setTimeout(() => setShowIntro(false), 3400);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      clearTimeout(exitTimer);
    };
  }, []);

  // ---------------------------------------------------------------------------------
  // 🚀 PORTAL LOGIN LOGIC
  // ---------------------------------------------------------------------------------
  const processLogin = async (e) => {
    e.preventDefault();
    const secretKey = loginPin.trim();
    if (!secretKey) return;

    setIsAuthenticating(true);

    // 1️⃣ LOCAL STORAGE CHECK
    const localVaults = JSON.parse(localStorage.getItem('saved_vault_clients') || '[]');
    const matchedLocalClient = localVaults.find(c => String(c.pin).trim() === secretKey);

    if (matchedLocalClient) {
      setAuthenticatedClient(matchedLocalClient); 
      setCurrentView('client-vault'); 
      setShowLoginModal(false);
      setLoginPin('');
      setIsAuthenticating(false);
      return; 
    }

    // 2️⃣ BACKEND CLOUD API VERIFICATION
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretKey })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.role === 'admin') {
          setCurrentView('admin');
        } else if (data.role === 'crew') {
          setCurrentView('crew');
        } else if (data.role === 'client') {
          setAuthenticatedClient(data.clientData); 
          setCurrentView('client-vault'); 
        }
        setShowLoginModal(false);
        setLoginPin('');
      } else {
        alert("❌ Access Denied: Invalid Security PIN. Please verify your 4-digit key.");
      }
    } catch (error) {
      console.error("Backend Verification Error:", error);
      alert("⚠️ Network notice: Backend server unreachable. Check Node.js server status.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'DELETE' })
      .catch(err => console.error(err));

    setAuthenticatedClient(null);
    setCurrentView('public');
    setActiveTab('home');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-900 select-none overflow-x-hidden selection:bg-amber-100 selection:text-amber-900 relative w-full flex flex-col">
      
      {/* 🔮 MASTER LUXURY STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        .font-intro-serif { font-family: 'Cinzel', Georgia, serif; }
        .font-intro-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-intro-mono { font-family: 'Space Grotesk', monospace; }

        /* Cinema Viewfinder Corners */
        .intro-corner-tl {
          position: absolute;
          top: 14px;
          left: 14px;
          width: 20px;
          height: 20px;
          border-top: 2px solid rgba(245, 158, 11, 0.9);
          border-left: 2px solid rgba(245, 158, 11, 0.9);
          z-index: 20;
          pointer-events: none;
        }
        .intro-corner-br {
          position: absolute;
          bottom: 14px;
          right: 14px;
          width: 20px;
          height: 20px;
          border-bottom: 2px solid rgba(245, 158, 11, 0.9);
          border-right: 2px solid rgba(245, 158, 11, 0.9);
          z-index: 20;
          pointer-events: none;
        }

        /* Smooth Gentle Dissolve */
        @keyframes smoothCrossFade {
          from { opacity: 0; transform: scale(1.03); }
          to { opacity: 1; transform: scale(1); }
        }

        .anim-smooth-fade {
          animation: smoothCrossFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Screen Fade Out */
        @keyframes introCleanExit {
          0% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }

        .anim-clean-exit {
          animation: introCleanExit 0.6s cubic-bezier(0.7, 0, 0.3, 1) 3.1s forwards;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal { animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* =========================================================================
          🎬 1. WARM LIGHT LUXURY 3-PHOTO STAGGERED INTRO (MOBILE OPTIMIZED)
      ========================================================================= */}
      {showIntro && (
        <div className="fixed inset-0 z-[99999999] bg-[#0C0A09] flex flex-col justify-between p-3 sm:p-8 select-none overflow-hidden anim-clean-exit">
          
          {/* Framed Canvas: Optical center-top alignment so faces are always clear */}
          <div className="absolute inset-2 sm:inset-6 z-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-stone-950">
            {introFrames.map((frame, idx) => (
              <img
                key={idx}
                src={frame.image}
                alt={frame.title}
                className={`absolute inset-0 w-full h-full object-cover object-[center_top] transition-opacity duration-700 ease-in-out ${
                  introStep === idx ? 'opacity-100 anim-smooth-fade' : 'opacity-0 pointer-events-none'
                }`}
              />
            ))}
            
            {/* Viewfinder Golden Crop Marks */}
            <div className="intro-corner-tl" />
            <div className="intro-corner-br" />

            {/* Subtle Gradient Veil for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/50 pointer-events-none" />
          </div>

          {/* Top Brand Bar & Skip Button */}
          <div className="relative z-10 w-full flex items-center justify-between px-2 sm:px-6 pt-1 sm:pt-2">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-stone-950/80 backdrop-blur-xl border border-amber-400/40 shadow-lg">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
              <span className="font-intro-mono text-[8.5px] sm:text-[10px] font-bold tracking-[0.25em] text-stone-100 uppercase">
                Guru Videography
              </span>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white backdrop-blur-xl border border-white/20 transition-all cursor-pointer text-[9px] sm:text-[10px] font-intro-sans font-bold tracking-widest uppercase shadow-md active:scale-95"
            >
              Skip ✕
            </button>
          </div>

          {/* Center Title Narrative with Stage Badge */}
          <div key={`intro-narrative-${introStep}`} className="relative z-10 max-w-xl mx-auto text-center px-4 text-white space-y-1.5 anim-smooth-fade">
            <span className="font-intro-mono text-[8.5px] sm:text-xs font-bold tracking-[0.35em] text-amber-300 uppercase block drop-shadow-md">
              {introFrames[introStep].badge}
            </span>
            <h1 className="font-intro-serif text-2xl min-[380px]:text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-none drop-shadow-xl">
              {introFrames[introStep].title}
            </h1>
            <p className="font-intro-sans text-[10.5px] sm:text-sm text-stone-300 tracking-wide font-light max-w-md mx-auto drop-shadow-md">
              {introFrames[introStep].subtitle}
            </p>
          </div>

          {/* Bottom 3-Stage Progress Indicator */}
          <div className="relative z-10 w-full max-w-xs mx-auto flex items-center justify-center gap-2 pb-2 sm:pb-3">
            {introFrames.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-500 ${
                  introStep === idx 
                    ? 'w-10 sm:w-12 bg-amber-400 shadow-[0_0_8px_#f59e0b]' 
                    : 'w-2.5 sm:w-3 bg-white/30'
                }`} 
              />
            ))}
          </div>

        </div>
      )}

      {/* 💎 2. PIN AUTHENTICATION MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[999999] bg-stone-950/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-amber-200/90 rounded-3xl p-8 sm:p-10 max-w-sm w-full relative shadow-2xl animate-modal text-stone-900">
            
            <button 
              onClick={() => { setShowLoginModal(false); setLoginPin(''); }}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer bg-stone-100 p-1.5 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div className="text-center space-y-1.5 mb-7 relative z-10">
              <span className="text-amber-800 font-intro-mono text-[9.5px] tracking-[0.35em] uppercase block font-bold">CLIENT VAULT ACCESS</span>
              <h2 className="font-intro-serif text-3xl text-stone-950 font-bold tracking-wide">
                Guru <span className="italic font-light text-amber-800">Portal</span>
              </h2>
            </div>

            <form onSubmit={processLogin} className="space-y-5 relative z-10">
              <div>
                <input 
                  type="password" 
                  maxLength="4" 
                  placeholder="----" 
                  value={loginPin} 
                  onChange={(e) => setLoginPin(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-white border border-amber-200/90 rounded-2xl px-4 py-3.5 text-center text-3xl text-amber-950 tracking-[0.7em] focus:border-amber-800 outline-none transition-colors font-intro-mono font-bold shadow-xs"
                  autoFocus
                />
                <p className="text-center text-[10px] font-intro-mono tracking-wider text-stone-500 uppercase mt-3">
                  Enter 4-Digit Security PIN
                </p>
              </div>
              
              <button 
                type="submit" 
                disabled={loginPin.length < 4 || isAuthenticating}
                className="w-full bg-stone-950 hover:bg-amber-800 text-white font-intro-sans text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isAuthenticating ? "Verifying..." : "Authenticate Vault ✦"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🧭 3. NAVIGATION */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onLogout={handleLogout} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        openLoginModal={() => setShowLoginModal(true)}
      />

      {/* 🖼️ 4. FULL-WIDTH VIEWPORT CANVAS */}
      <div className="w-full min-h-screen flex flex-col flex-1 pt-12 lg:pt-0 transition-all duration-300">
        
        <main className="flex-1 w-full">
          {currentView === 'public' && (
            <div className="w-full">
              {activeTab === 'home' && <div className="animate-fade-in"><Hero setActiveTab={setActiveTab} /></div>}
              {activeTab === 'story' && <div className="animate-fade-in"><Story setActiveTab={setActiveTab} /></div>}
              {activeTab === 'films' && <div className="animate-fade-in"><Films setActiveTab={setActiveTab} /></div>}
              {activeTab === 'portfolio' && <div className="animate-fade-in"><Portfolio setActiveTab={setActiveTab} /></div>}
              {activeTab === 'services' && <div className="animate-fade-in"><Services setActiveTab={setActiveTab} /></div>}
              {activeTab === 'testimonials' && <div className="animate-fade-in"><Testimonials setActiveTab={setActiveTab} /></div>}
              {activeTab === 'contact' && <div className="animate-fade-in"><Contact setActiveTab={setActiveTab} /></div>}
            </div>
          )}

          {/* SECURE DASHBOARDS & CONTROL REPOSITORIES */}
          {currentView === 'client-vault' && (
            <div className="p-4 sm:p-8 max-w-7xl mx-auto">
              <ClientVault onLogout={handleLogout} clientId={authenticatedClient} />
            </div>
          )}
          {currentView === 'admin' && (
            <div className="p-4 sm:p-8 max-w-7xl mx-auto">
              <AdminDashboard onLogout={handleLogout} />
            </div>
          )}
          {currentView === 'crew' && (
            <div className="p-4 sm:p-8 max-w-7xl mx-auto">
              <CrewWorkspace onLogout={handleLogout} />
            </div>
          )}
        </main>

        {/* 🌟 5. MASTER FOOTER */}
        <Footer 
          currentView={currentView}
          setCurrentView={setCurrentView}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* 🤖 6. DIRECTORIAL AI CONCIERGE CHATBOT */}
      {currentView === 'public' && <AIChatbot setActiveTab={setActiveTab} />}
    </div>
  );
}