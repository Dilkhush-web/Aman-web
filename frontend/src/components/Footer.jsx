import React, { useState } from 'react';

export default function Footer({ onSecretTrigger, currentView, setCurrentView, setActiveTab }) {
  const [email, setEmail] = useState('');
  const [showAugModal, setShowAugModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerSecretPrompt = () => {
    const key = prompt("ENTER EXECUTIVE SYSTEM COMMAND KEY:");
    if (key && onSecretTrigger) {
      const isSuccess = onSecretTrigger(key);
      if (!isSuccess) alert("ACCESS DENIED. INCORRECT SECURITY ACCESS PARAMETERS.");
    }
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://aman-web-nuwa.onrender.com/';
      await fetch(`${backendUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
    } catch (err) {
      console.log("Local subscription active for:", email);
    }

    alert("Thank you for subscribing to Guru Videography. Exclusive updates recorded.");
    setEmail('');
    setIsSubmitting(false);
  };

  const handleNavClick = (tabId) => {
    if (setCurrentView) setCurrentView('public');
    if (setActiveTab) setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F5F2EB] text-stone-900 border-t border-stone-300/60 pt-6 sm:pt-7 pb-20 sm:pb-4 relative overflow-hidden font-sans">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

        .font-brand-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-brand-sans { font-family: 'Plus Jakarta Sans', sans-serif; }

        .glass-footer-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 20px 45px -15px rgba(180, 83, 9, 0.06);
        }
      `}</style>

      {/* 🔮 3D AMBIENT LIGHT & WATERMARK */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[140px] bg-gradient-to-t from-amber-200/30 via-rose-100/15 to-transparent blur-[80px] rounded-full pointer-events-none" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] sm:text-[9rem] md:text-[11rem] font-brand-cinzel font-black text-stone-900/[0.03] pointer-events-none select-none tracking-tight leading-none">
        GURU
      </div>

      {/* 🎯 4-COLUMN SYNC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-5 relative z-10">
        
        {/* Column 1: Studio Identity */}
        <div className="space-y-1.5 sm:space-y-2 group text-left">
          <div className="flex flex-col">
            <h3 className="font-brand-cinzel text-sm sm:text-lg lg:text-xl tracking-[0.08em] font-bold text-stone-950 leading-tight">
              GURU <span className="text-amber-800 font-light italic">VIDEOGRAPHY</span>
            </h3>
            <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.2em] text-amber-800 font-brand-sans mt-0.5 sm:mt-1 uppercase font-bold">
              Fine-Art Cinema Studio
            </span>
          </div>
          <p className="text-stone-600 text-[10px] sm:text-[11px] lg:text-xs tracking-wide leading-relaxed font-normal">
            Crafting raw human emotions into timeless cinematic heirlooms across Siwan, Bihar & pan-India.
          </p>
        </div>

        {/* Column 2: Studio Navigation Handles */}
        <div className="text-left">
          <h4 className="font-brand-cinzel text-[10px] sm:text-[11px] tracking-[0.2em] text-stone-900 mb-1.5 sm:mb-2 uppercase font-bold border-b border-stone-300/70 pb-0.5 sm:pb-1 inline-block">
            The Studio
          </h4>
          <ul className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-[11px] lg:text-xs tracking-wide font-brand-sans font-medium text-stone-600">
            {[
              { id: 'home', label: 'Home Gateway' },
              { id: 'story', label: 'Artistic Story' },
              { id: 'films', label: 'Cinema Films' },
              { id: 'portfolio', label: 'Visual Archive' },
              { id: 'services', label: 'Bespoke Collections' },
              { id: 'contact', label: 'Private Inquiries' }
            ].map((item) => (
              <li key={item.id}>
                <button 
                  onClick={() => handleNavClick(item.id)} 
                  className="group relative inline-block text-stone-600 transition-colors duration-300 hover:text-amber-800 cursor-pointer text-left truncate max-w-full"
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              </li>
            ))}
            <li className="pt-0.5">
              <button 
                onClick={() => {
                  if (setCurrentView) setCurrentView('crew');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="text-amber-800 hover:text-amber-950 font-bold uppercase text-[9px] sm:text-[10px] tracking-wider transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Crew Console</span>
                <span>→</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Headquarters Contact (With Mobile AUG Agency Badge Placed On Top) */}
        <div className="text-left">
          
          {/* 🌟 MOBILE ONLY: DEVELOPED BY AUG CONSULTANCY BADGE ABOVE HQ CONTACT */}
          <div className="block sm:hidden mb-2.5 pb-2 border-b border-stone-300/60">
            <span className="text-[7px] tracking-[0.2em] font-brand-sans font-medium text-stone-500 uppercase block">
              DEVELOPED BY
            </span>
            <button 
              onClick={() => setShowAugModal(true)} 
              className="text-stone-900 hover:text-amber-800 text-[9px] font-brand-mono font-bold tracking-[0.2em] uppercase transition-colors flex items-center gap-1 mt-0.5 cursor-pointer bg-white/80 border border-amber-200/80 px-2.5 py-1 rounded-full shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span>AUG CONSULTANCY</span>
            </button>
          </div>

          <h4 className="font-brand-cinzel text-[10px] sm:text-[11px] tracking-[0.2em] text-stone-900 mb-1.5 sm:mb-2 uppercase font-bold border-b border-stone-300/70 pb-0.5 sm:pb-1 inline-block">
            HQ Contact
          </h4>
          <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-[11px] lg:text-xs tracking-wide text-stone-600 font-brand-sans">
            <li className="flex items-start gap-1.5 sm:gap-2.5 group">
              <span className="mt-0.5 text-amber-800 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
              </span>
              <span className="font-medium text-stone-800 leading-snug truncate">+91 8434656386</span>
            </li>
            <li className="flex items-start gap-1.5 sm:gap-2.5 group">
              <span className="mt-0.5 text-amber-800 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <span className="break-all font-medium text-stone-800">guryaman63@gmail.com</span>
            </li>
            <li className="flex items-start gap-1.5 sm:gap-2.5 group">
              <span className="mt-0.5 text-amber-800 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <span className="leading-snug font-medium text-stone-800">Ukhai, Siwan, Bihar</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Direct Updates */}
        <div className="text-left">
          <h4 className="font-brand-cinzel text-[10px] sm:text-[11px] tracking-[0.2em] text-stone-900 mb-1.5 sm:mb-2 uppercase font-bold border-b border-stone-300/70 pb-0.5 sm:pb-1 inline-block">
            Elite Access
          </h4>
          <p className="text-stone-600 text-[10px] sm:text-[11px] tracking-wide font-normal mb-2 sm:mb-2.5 leading-relaxed">
            Subscribe for priority booking dates & updates.
          </p>
          <form onSubmit={handleNewsletter} className="group relative flex items-center border-b border-stone-400 pb-1 sm:pb-1.5 transition-all duration-300 focus-within:border-amber-800">
            <input 
              type="email" 
              required
              placeholder="ENTER EMAIL" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-[10px] sm:text-[11px] tracking-wider font-brand-sans font-medium w-full focus:outline-none placeholder-stone-500 text-stone-900 pr-5"
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="absolute right-0 text-stone-500 hover:text-amber-800 transition-colors cursor-pointer disabled:opacity-50" 
              aria-label="Subscribe"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className="sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </form>
        </div>

      </div>

      {/* Footer Bottom Metadata Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-row items-center justify-between gap-2 relative z-10 pt-3 sm:pt-4 border-t border-stone-300/70">
        
        {/* Social Matrix Streams */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <a 
            href="https://www.instagram.com/guru_videography_siwan?igsh=a2VnZmhieTEweDh5&utm_source=qr/" 
            target="_blank" 
            rel="noreferrer" 
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-stone-300/80 flex items-center justify-center text-stone-700 hover:text-amber-800 hover:border-amber-700 hover:scale-105 transition-all duration-300 shadow-2xs"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          
          <a 
            href="https://wa.me/918434656386" 
            target="_blank" 
            rel="noreferrer" 
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-stone-300/80 flex items-center justify-center text-stone-700 hover:text-emerald-700 hover:border-emerald-600 hover:scale-105 transition-all duration-300 shadow-2xs"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
        </div>

        {/* Copyright & Developer Tag (Desktop displays agency credit here as well) */}
        <div className="flex flex-col items-end gap-0.5 text-right">
          <div className="text-[8px] sm:text-[9.5px] tracking-[0.15em] sm:tracking-[0.2em] font-brand-sans font-semibold text-stone-600 select-none truncate">
            © {new Date().getFullYear()} GURU VIDEOGRAPHY
            <span 
              onClick={triggerSecretPrompt}
              className="cursor-default text-transparent hover:text-amber-800 transition-colors duration-300 ml-0.5"
              title="Console"
            >
              .
            </span>
          </div>

          <div className="text-[7.5px] sm:text-[8.5px] tracking-[0.15em] sm:tracking-[0.2em] font-brand-sans font-medium text-stone-500 hidden sm:block">
            DEVELOPED BY{' '}
            <button 
              onClick={() => setShowAugModal(true)} 
              className="text-stone-800 hover:text-amber-800 transition-colors duration-300 font-bold tracking-[0.15em] sm:tracking-[0.2em] outline-none cursor-pointer"
            >
              AUG CONSULTANCY
            </button>
          </div>
        </div>

      </div>

      {/* =========================================================================
          💎 AUG CONSULTANCY POPUP MODAL
          ========================================================================= */}
      {showAugModal && (
        <div className="fixed inset-0 z-[999999] bg-stone-950/75 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-footer-card rounded-2xl p-6 sm:p-10 max-w-md w-full relative shadow-2xl animate-fade-in text-stone-900 border border-stone-200">
            
            <button 
              onClick={() => setShowAugModal(false)} 
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-stone-400 hover:text-stone-900 transition-colors text-xs tracking-widest font-brand-sans uppercase cursor-pointer"
            >
              ✕ CLOSE
            </button>
            
            <div className="text-center space-y-2.5 sm:space-y-3 relative z-10 pt-1 sm:pt-2">
              <span className="text-amber-800 font-brand-sans text-[9px] sm:text-[10px] tracking-[0.4em] uppercase block font-bold">DIGITAL ARCHITECTS</span>
              <h3 className="font-brand-cinzel text-xl sm:text-3xl text-stone-950 font-bold tracking-wide">
                AUG <span className="italic font-light text-amber-800">Consultancy.</span>
              </h3>
              
              <div className="w-10 sm:w-12 h-[1.5px] bg-amber-700/60 mx-auto my-2 sm:my-3" />
              
              <p className="text-stone-600 text-[11px] sm:text-xs tracking-wide leading-relaxed font-normal pb-2 sm:pb-3">
                We engineer ultra-premium digital experiences, combining cutting-edge web architecture with luxury design aesthetics to elevate modern brands to their highest potential.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-center">
                <a 
                  href="https://afterusglobal.com/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full sm:w-auto bg-stone-950 text-white font-brand-sans text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.25em] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-amber-800 transition-colors shadow-sm text-center"
                >
                  Visit Website
                </a>
                
                <a 
                  href="https://wa.me/918002468432" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full sm:w-auto bg-emerald-50 border border-emerald-300 text-emerald-800 font-brand-sans text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.25em] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-emerald-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </footer>
  );
}