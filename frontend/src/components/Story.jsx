import React, { useState } from 'react';
import { Camera, Sparkles, Film, Award, Clock, ArrowRight, ShieldCheck, Heart, Volume2, Aperture, Layers, CheckCircle2, Play, Eye, Flame, Compass } from 'lucide-react';

export default function Story({ setActiveTab }) {
  const [activeTabLocal, setActiveTabLocal] = useState('all');

  // 🎬 Directorial Guiding Standards
  const directorialPillars = [
    {
      num: "01",
      title: "Organic Skin-Tone Science",
      subtitle: "DCI-P3 Color Fidelity",
      desc: "Every frame is calibrated against natural sunlight and ritual tones for true skin warmth that never feels artificial."
    },
    {
      num: "02",
      title: "The Art of Discretion",
      subtitle: "Unobtrusive Directorial Flow",
      desc: "Capturing the father's quiet tear and spontaneous laughter without demanding repeat takes or staged poses."
    },
    {
      num: "03",
      title: "Spatial Acoustic Soundscapes",
      subtitle: "Multi-Track Audio Mastering",
      desc: "We record clean lavalier vows, ambient Vedic chants, and ancestral blessings, mixing them into cinematic sound design."
    },
    {
      num: "04",
      title: "Museum Archival Longevity",
      subtitle: "Perpetual Cloud & Cotton Albums",
      desc: "Calibrated specifically for acid-free Hahnemühle physical cotton albums with triple-redundant 16-bit RAW security."
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-900 font-sans tracking-tight selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden relative w-full pb-16 sm:pb-24">
      
      {/* 🔮 CINEMA-GRADE MASTER DESIGN SYSTEM */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@500;600;700&display=swap');

        .font-brand-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-brand-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-brand-mono { font-family: 'Space Grotesk', monospace; }

        .cinema-cell-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(231, 229, 228, 0.9);
          box-shadow: 0 20px 40px -15px rgba(28, 25, 23, 0.06);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cinema-cell-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 35px 70px -15px rgba(120, 53, 15, 0.16), 0 0 0 1px rgba(217, 119, 6, 0.3);
        }

        .film-aspect-hero {
          aspect-ratio: 16 / 10;
        }

        .viewfinder-crosshair {
          position: relative;
        }
        .viewfinder-crosshair::before, .viewfinder-crosshair::after {
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: rgba(245, 158, 11, 0.8);
          pointer-events: none;
        }
        .viewfinder-crosshair::before {
          top: 10px; left: 10px;
          border-top: 2px solid; border-left: 2px solid;
        }
        .viewfinder-crosshair::after {
          bottom: 10px; right: 10px;
          border-bottom: 2px solid; border-right: 2px solid;
        }
      `}</style>

      {/* Background Micro Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#FAF8F5]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#78350f05_1px,transparent_1px),linear-gradient(to_bottom,#78350f05_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-10 relative z-10 space-y-12 sm:space-y-36">

        {/* =========================================================================
            🎬 1. EDITORIAL DIRECTORIAL OVERVIEW
        ========================================================================= */}
        <section className="pt-3 sm:pt-8 text-center max-w-4xl mx-auto space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white border border-amber-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-600 animate-pulse shadow-[0_0_8px_#d97706]" />
            <span className="font-brand-sans text-[8.5px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.25em] text-stone-800 uppercase">
              The Directorial Heritage • Guru Videography
            </span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h1 className="font-brand-cinzel text-2xl sm:text-5xl lg:text-[4.2rem] font-medium tracking-tight text-stone-950 leading-[1.06]">
              We Tell Stories That <br />
              <span className="italic font-light bg-gradient-to-r from-amber-700 via-rose-700 to-amber-900 bg-clip-text text-transparent">
                Outlive Time Itself.
              </span>
            </h1>
          </div>

          <div className="w-12 sm:w-16 h-[1.5px] bg-amber-700/50 mx-auto my-1.5 sm:my-2" />

          <p className="font-brand-sans text-stone-600 text-[10.5px] sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            A wedding is not a set of items to check off a schedule. It is a collision of legacy, sacred vows, and raw vulnerability. Starting as a school-boy dream in 2016 to archiving 200+ landmark celebrations today, our journey is guided by a single passion: delivering films that outlast generations.
          </p>
        </section>

        {/* =========================================================================
            🎬 2. LEAD DIRECTOR PORTRAIT & STATEMENT (SIDE-BY-SIDE ON MOBILE & LAPTOP)
        ========================================================================= */}
        <section className="cinema-cell-card rounded-2xl sm:rounded-3xl p-3 sm:p-12 lg:p-14 border border-white shadow-xl">
          <div className="grid grid-cols-12 gap-3 sm:gap-10 lg:gap-14 items-center">
            
            {/* Director Portrait */}
            <div className="col-span-5 w-full">
              <div className="viewfinder-crosshair relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl aspect-[4/5] bg-stone-950 group border border-amber-200/50">
                <img
                  src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200596/B27718D4-6C3E-4625-A538-B422E1FAB16A_bi6gx6.png"
                  alt="Aman Kumar - Founder & Lead Filmmaker"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.96] group-hover:brightness-100"
                  onError={(e) => {
                    e.target.src = "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200596/B27718D4-6C3E-4625-A538-B422E1FAB16A_bi6gx6.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 sm:right-6 text-white text-left">
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-md rounded-full text-[7.5px] sm:text-[9px] font-brand-mono tracking-widest uppercase mb-0.5 sm:mb-1.5 inline-block font-semibold">
                    Principal Filmmaker
                  </span>
                  <h3 className="font-brand-cinzel text-xs sm:text-2xl font-bold leading-tight truncate">Aman Kumar</h3>
                  <p className="font-brand-sans text-[8px] sm:text-xs text-amber-200/90 font-light hidden min-[380px]:block truncate">Master of Light</p>
                </div>
              </div>
            </div>

            {/* Director Manifesto */}
            <div className="col-span-7 space-y-2 sm:space-y-5 text-left">
              <div className="space-y-0.5 sm:space-y-1.5">
                <h2 className="font-brand-cinzel text-sm min-[380px]:text-base sm:text-4xl lg:text-5xl font-bold text-stone-950 tracking-tight leading-tight">
                  "Light is emotion. <br />
                  <span className="italic font-light text-amber-800">We never force what isn't there."</span>
                </h2>
              </div>

              <p className="font-brand-sans text-stone-600 text-[9.5px] sm:text-base leading-relaxed font-normal">
                At Guru Videography, we focus on what really matters: the trembling hands during the kanyadaan, the quiet smile, and the unrepeatable natural cadence of family laughter.
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-1 sm:pt-2">
                <div className="bg-stone-50 border border-stone-200 p-2 sm:p-4 rounded-xl sm:rounded-2xl space-y-0.5 sm:space-y-1">
                  <h4 className="font-brand-cinzel text-[9px] sm:text-sm font-bold text-stone-900 truncate">01. Observational Eye</h4>
                  <p className="font-brand-sans text-[8px] sm:text-xs text-stone-600 line-clamp-2 sm:line-clamp-none">Sacred rituals documented as they authentically occur.</p>
                </div>
                <div className="bg-stone-50 border border-stone-200 p-2 sm:p-4 rounded-xl sm:rounded-2xl space-y-0.5 sm:space-y-1">
                  <h4 className="font-brand-cinzel text-[9px] sm:text-sm font-bold text-stone-900 truncate">02. Hand-Finished</h4>
                  <p className="font-brand-sans text-[8px] sm:text-xs text-stone-600 line-clamp-2 sm:line-clamp-none">Personally reviewed and color-mastered by Aman Kumar.</p>
                </div>
              </div>

              <div className="pt-1.5 sm:pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                <div>
                  <span className="font-brand-cinzel text-xs sm:text-base font-bold text-stone-950 block">Guru Videography</span>
                  <span className="font-brand-mono text-[7.5px] sm:text-[10px] text-amber-800 uppercase tracking-widest block font-bold">Branch - Ukhai, Siwan</span>
                </div>
                <button
                  onClick={() => setActiveTab && setActiveTab('contact')}
                  className="px-3 sm:px-6 py-1.5 sm:py-3 rounded-full bg-stone-950 hover:bg-amber-800 text-white font-brand-sans text-[9px] sm:text-xs tracking-wider sm:tracking-widest uppercase font-semibold transition-all duration-300 shadow-md cursor-pointer"
                >
                  Consultation →
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            🎞️ 3. ACT I • 2016 TO 2020: 10TH CLASS GENESIS (SIDE-BY-SIDE ON MOBILE & LAPTOP)
        ========================================================================= */}
        <section className="space-y-4 sm:space-y-10">
          <div className="flex flex-row items-end justify-between border-b border-stone-300 pb-2.5 sm:pb-5 gap-2 text-left">
            <div className="space-y-0.5 sm:space-y-1">
              <div className="inline-flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-700" />
                <span className="font-brand-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-800 uppercase">
                  ACT I • 2016 — 2020
                </span>
              </div>
              <h2 className="font-brand-cinzel text-lg sm:text-5xl font-bold text-stone-950 tracking-tight">
                The 10th Class Genesis
              </h2>
            </div>
            <span className="font-brand-mono text-[8px] sm:text-xs text-stone-500 uppercase tracking-wider text-right">
              Early School-Day Passion
            </span>
          </div>

          <div className="grid grid-cols-12 gap-3 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Film Showcase */}
            <div className="col-span-5 w-full">
              <div className="viewfinder-crosshair cinema-cell-card rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] relative bg-stone-950 group shadow-xl border border-stone-200">
                <img 
                  src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200595/663AE026-2F46-4DFA-B107-732911156199_xnvgpz.png" 
                  alt="Act I Genesis Archive"
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-1000 ease-out group-hover:scale-105 brightness-[0.96] group-hover:brightness-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent p-2 sm:p-5 text-white flex justify-between items-end">
                  <div className="text-left space-y-0.5">
                    <span className="font-brand-mono text-[7px] sm:text-[9px] uppercase tracking-widest text-amber-400 font-bold block">
                      ORIGINAL GENESIS
                    </span>
                    <h4 className="font-brand-cinzel text-[9.5px] sm:text-lg font-bold leading-tight truncate">
                      Early Camera Shoots
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Narrative Spec Sheet */}
            <div className="col-span-7 space-y-2 sm:space-y-5 text-left">
              <h3 className="font-brand-cinzel text-xs sm:text-3xl font-bold text-stone-950 leading-tight">
                From Local Shoots to Optical Mastery
              </h3>

              <blockquote className="font-brand-cinzel text-[9.5px] sm:text-base text-stone-800 italic border-l-2 border-amber-700 pl-2 sm:pl-4 py-0.5">
                "Back in 2016 during 10th standard, taking small local photography assignments was about learning how genuine smiles could be immortalized."
              </blockquote>

              <p className="font-brand-sans text-[9px] sm:text-sm text-stone-600 leading-relaxed font-normal">
                Aman Kumar began his journey in 10th class, taking up events and local ceremonies around Siwan. Every rupee earned was saved to invest in cinema glass and color grading.
              </p>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-1 font-brand-mono text-[8px] sm:text-xs">
                <div className="p-1.5 sm:p-3 bg-stone-50 border border-stone-200 rounded-lg sm:rounded-xl">
                  <span className="text-stone-400 block text-[7px] sm:text-[9px] uppercase font-bold">Started In</span>
                  <span className="text-stone-900 font-bold truncate block">2016 (10th)</span>
                </div>
                <div className="p-1.5 sm:p-3 bg-stone-50 border border-stone-200 rounded-lg sm:rounded-xl">
                  <span className="text-stone-400 block text-[7px] sm:text-[9px] uppercase font-bold">Early Work</span>
                  <span className="text-amber-800 font-bold truncate block">Ceremonies</span>
                </div>
                <div className="p-1.5 sm:p-3 bg-stone-50 border border-stone-200 rounded-lg sm:rounded-xl">
                  <span className="text-stone-400 block text-[7px] sm:text-[9px] uppercase font-bold">Base</span>
                  <span className="text-stone-900 font-bold truncate block">Siwan</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            👑 4. ACT II • 2021 TO 2024: THE CRAFT REFINED (SIDE-BY-SIDE ON MOBILE & LAPTOP)
        ========================================================================= */}
        <section className="space-y-4 sm:space-y-10">
          <div className="flex flex-row items-end justify-between border-b border-stone-300 pb-2.5 sm:pb-5 gap-2 text-left">
            <div className="space-y-0.5 sm:space-y-1">
              <div className="inline-flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-700" />
                <span className="font-brand-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-800 uppercase">
                  ACT II • 2021 — 2024
                </span>
              </div>
              <h2 className="font-brand-cinzel text-lg sm:text-5xl font-bold text-stone-950 tracking-tight">
                Skill Evolution & Recognition
              </h2>
            </div>
            <span className="font-brand-mono text-[8px] sm:text-xs text-stone-500 uppercase tracking-wider text-right">
              High-End Filmmaking
            </span>
          </div>

          <div className="grid grid-cols-12 gap-3 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative Spec Sheet */}
            <div className="col-span-7 space-y-2 sm:space-y-5 text-left">
              <h3 className="font-brand-cinzel text-xs sm:text-3xl font-bold text-stone-950 leading-tight">
                Mastering Color Science & Discretion
              </h3>

              <blockquote className="font-brand-cinzel text-[9.5px] sm:text-base text-stone-800 italic border-l-2 border-amber-700 pl-2 sm:pl-4 py-0.5">
                "Treating every wedding not like a commercial contract, but like an artistic canvas where every family member feels respected."
              </blockquote>

              <p className="font-brand-sans text-[9px] sm:text-sm text-stone-600 leading-relaxed font-normal">
                Guru Videography expanded rapidly across Siwan and Bihar. Families loved the difference: no harsh lights, cinematic 24fps films, crystal sound, and natural warm tones.
              </p>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-1 font-brand-mono text-[8px] sm:text-xs">
                <div className="p-1.5 sm:p-3 bg-stone-50 border border-stone-200 rounded-lg sm:rounded-xl">
                  <span className="text-stone-400 block text-[7px] sm:text-[9px] uppercase font-bold">Pipeline</span>
                  <span className="text-stone-900 font-bold truncate block">4K Wide</span>
                </div>
                <div className="p-1.5 sm:p-3 bg-stone-50 border border-stone-200 rounded-lg sm:rounded-xl">
                  <span className="text-stone-400 block text-[7px] sm:text-[9px] uppercase font-bold">Audio</span>
                  <span className="text-amber-800 font-bold truncate block">Spatial</span>
                </div>
                <div className="p-1.5 sm:p-3 bg-stone-50 border border-stone-200 rounded-lg sm:rounded-xl">
                  <span className="text-stone-400 block text-[7px] sm:text-[9px] uppercase font-bold">Trust</span>
                  <span className="text-stone-900 font-bold truncate block">100% Word</span>
                </div>
              </div>
            </div>

            {/* Right Film Showcase */}
            <div className="col-span-5 w-full">
              <div className="viewfinder-crosshair cinema-cell-card rounded-xl sm:rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] relative bg-stone-950 group">
                <img 
                  src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200594/IMG_5697_ulijfv.jpg" 
                  alt="Act II Heritage Archive"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 brightness-[0.95] group-hover:brightness-105"
                />

                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
                  <span className="px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-stone-950/85 backdrop-blur-md text-amber-300 font-brand-mono text-[7px] sm:text-[9px] font-bold tracking-widest uppercase border border-white/10">
                    2021-2024
                  </span>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent p-2 sm:p-5 text-white flex justify-between items-end">
                  <span className="font-brand-mono text-[7px] sm:text-[9px] uppercase tracking-widest text-amber-400 font-bold block truncate">
                    SACRED CELEBRATIONS
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            🏛️ 5. ACT III • 2025 & BEYOND: 200+ HAPPY CLIENTS (SIDE-BY-SIDE ON MOBILE & LAPTOP)
        ========================================================================= */}
        <section className="space-y-4 sm:space-y-10">
          <div className="flex flex-row items-end justify-between border-b border-stone-300 pb-2.5 sm:pb-5 gap-2 text-left">
            <div className="space-y-0.5 sm:space-y-1">
              <div className="inline-flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-700" />
                <span className="font-brand-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-800 uppercase">
                  ACT III • 2025 — 2026
                </span>
              </div>
              <h2 className="font-brand-cinzel text-lg sm:text-5xl font-bold text-stone-950 tracking-tight">
                200+ Families Milestone
              </h2>
            </div>
            <span className="font-brand-mono text-[8px] sm:text-xs text-stone-500 uppercase tracking-wider text-right">
              Gold Standard Era
            </span>
          </div>

          <div className="cinema-cell-card rounded-2xl sm:rounded-3xl p-3 sm:p-12 border border-white shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-12 gap-3 sm:gap-8 lg:gap-12 items-center">
              
              {/* Left Column Film Frame */}
              <div className="col-span-5 w-full">
                <div className="viewfinder-crosshair rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] relative bg-stone-950 group">
                  <img 
                    src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200595/3338FB63-6388-47C1-B255-FCD225036F00_qlaiw0.png" 
                    alt="2026 Apex Standard" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                  
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                    <span className="px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-stone-950/80 text-amber-300 font-brand-mono text-[7px] sm:text-[9px] font-bold tracking-widest uppercase border border-white/10">
                      2025-2026
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 text-white flex justify-between items-end">
                    <span className="font-brand-mono text-[7px] sm:text-[9px] text-amber-400 uppercase tracking-widest block font-bold truncate">
                      Family Heirlooms
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column Narrative */}
              <div className="col-span-7 space-y-2 sm:space-y-5 text-left">
                <h3 className="font-brand-cinzel text-xs sm:text-4xl font-bold text-stone-950 leading-tight">
                  200+ Families. Timeless Stories.
                </h3>

                <blockquote className="font-brand-cinzel text-[9.5px] sm:text-base text-stone-800 italic border-l-2 border-amber-700 pl-2 sm:pl-4 py-0.5">
                  "The breakthrough in 2025 proved that authentic storytelling and pure passion always triumph."
                </blockquote>

                <p className="font-brand-sans text-[9px] sm:text-sm text-stone-600 leading-relaxed font-normal">
                  Starting from zero in 2016, Guru Videography achieved massive industry recognition in 2025. With 200+ happy couples, Aman Kumar stands as Bihar's premier luxury filmmaker.
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 font-brand-mono text-[8px] sm:text-xs">
                  <div className="p-1.5 sm:p-3 bg-stone-50 border border-stone-200 rounded-lg sm:rounded-xl">
                    <span className="text-stone-400 block text-[7px] sm:text-[9px] uppercase font-bold">Happy Clients</span>
                    <span className="text-stone-900 font-bold text-xs sm:text-lg truncate block">200+ Events</span>
                  </div>
                  <div className="p-1.5 sm:p-3 bg-stone-50 border border-stone-200 rounded-lg sm:rounded-xl">
                    <span className="text-stone-400 block text-[7px] sm:text-[9px] uppercase font-bold">Vault Delivery</span>
                    <span className="text-amber-800 font-bold text-xs sm:text-lg truncate block">4K RAW</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => setActiveTab && setActiveTab('portfolio')}
                    className="inline-flex items-center gap-1.5 text-[9.5px] sm:text-xs font-brand-sans font-bold uppercase tracking-wider text-amber-800 hover:text-stone-950 transition-colors cursor-pointer"
                  >
                    <span>Explore Master Portfolio</span>
                    <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            🏛️ 6. THE FOUR DIRECTORIAL PILLARS (2 ROWS X 2 COLUMNS ON MOBILE, 4 ON LAPTOP)
        ========================================================================= */}
        <section className="space-y-4 sm:space-y-10">
          <div className="text-center space-y-1 sm:space-y-2 max-w-2xl mx-auto">
            <span className="font-brand-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] text-amber-800 uppercase block">
              PRODUCTION FOUNDATIONS
            </span>
            <h2 className="font-brand-cinzel text-xl sm:text-5xl font-bold text-stone-950 tracking-tight">
              The Guiding Pillars
            </h2>
            <p className="font-brand-sans text-stone-600 text-[10px] sm:text-sm">
              Why our wedding films and stills remain organically distinctive across decades.
            </p>
          </div>

          {/* 🎯 EXACT 2 ROWS X 2 COLUMNS IN MOBILE & 4 COLUMNS ON LAPTOP */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {directorialPillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="cinema-cell-card p-3 sm:p-7 rounded-xl sm:rounded-3xl space-y-1.5 sm:space-y-3.5 border border-white text-left"
              >
                <span className="font-brand-cinzel text-lg sm:text-3xl font-bold text-amber-800 block">
                  {pillar.num}
                </span>
                <div>
                  <h3 className="font-brand-cinzel text-xs sm:text-lg font-bold text-stone-950 leading-tight">
                    {pillar.title}
                  </h3>
                  <span className="font-brand-mono text-[8px] sm:text-[9.5px] font-bold text-amber-800 uppercase tracking-wider block mt-0.5 truncate">
                    {pillar.subtitle}
                  </span>
                </div>
                <p className="font-brand-sans text-[9.5px] sm:text-xs text-stone-600 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            ✨ 7. DIRECTORIAL CALL TO ACTION
        ========================================================================= */}
        <section className="cinema-cell-card p-5 sm:p-14 rounded-2xl sm:rounded-3xl text-center space-y-3 sm:space-y-5 max-w-3xl mx-auto border border-amber-200/80 shadow-xl">
          <span className="font-brand-mono text-[9px] sm:text-[10.5px] font-bold tracking-[0.25em] sm:tracking-[0.35em] text-amber-800 uppercase block">
            LIMITED COMMISSION SEASONS
          </span>
          <h2 className="font-brand-cinzel text-xl sm:text-5xl font-bold text-stone-950 tracking-tight">
            Commission Your <span className="italic font-light text-amber-800">Wedding Chronicle</span>
          </h2>
          <p className="font-brand-sans text-stone-600 text-[10px] sm:text-sm max-w-lg mx-auto font-normal leading-relaxed">
            To preserve uncompromising color grading and bespoke multi-track acoustic mastery, Aman Kumar and our team accept a strictly limited number of wedding commissions each season.
          </p>
          <div className="pt-1 sm:pt-2">
            <button
              onClick={() => setActiveTab && setActiveTab('contact')}
              className="px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-stone-950 hover:bg-amber-800 text-white font-brand-sans text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              Request Date Availability (8434656386) →
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}