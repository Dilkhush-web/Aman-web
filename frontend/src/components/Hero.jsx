import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  const portfolioItems = [
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784743445/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits_xxvlnv.jpg", 
      title: "The Royal Veil", 
      category: "Royal Vivah",
      tag: "Heritage"
    },
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200598/436A3839_d4c6tf.jpg", 
      title: "Bridal Preparation", 
      category: "Portraits",
      tag: "Intimate"
    },
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784742666/uniquephotography1.0-20260318-0087_yyozre.webp", 
      title: "Golden Hour Glow", 
      category: "Couture",
      tag: "Editorial"
    },
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784746581/WhatsApp_Image_2026-07-23_at_12.22.47_AM_brqczs.jpg", 
      title: "Haldi Celebration", 
      category: "Sacred Rituals",
      tag: "Tradition"
    },
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784746877/WhatsApp_Image_2026-07-23_at_12.30.06_AM_1_ipebqc.jpg", 
      title: "Twilight Vows", 
      category: "Cinematic",
      tag: "Timeless"
    },
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784742648/uniquephotography1.0-20260318-0047_tkkrxm.webp", 
      title: "Unscripted Emotions", 
      category: "Candid",
      tag: "Raw Memory"
    },
  ];

  const heroSlides = [
    "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784743445/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits_xxvlnv.jpg",
    "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784742666/uniquephotography1.0-20260318-0087_yyozre.webp",
    "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784746877/WhatsApp_Image_2026-07-23_at_12.30.06_AM_1_ipebqc.jpg"
  ];

  const filmstripPhotos = [
    {
      id: 1,
      title: "Sacred Haldi Glow",
      location: "Siwan Courtyard Celebrations",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784746879/WhatsApp_Image_2026-07-23_at_12.30.06_AM_w4cexe.jpg",
      delayClass: "film-stagger-1"
    },
    {
      id: 2,
      title: "The Royal Vivah Vows",
      location: "Gaurai Heritage Pavilion",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784743445/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits_xxvlnv.jpg",
      delayClass: "film-stagger-2",
      isCenter: true
    },
    {
      id: 3,
      title: "Golden Hour Romance",
      location: "Ukhai Scenic Landscape",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200601/DSC05369_vlepcy.jpg",
      delayClass: "film-stagger-3"
    }
  ];

  const filmstripPanels = [
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784743445/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits_xxvlnv.jpg", 
      title: "Mandap Reverie", 
      location: "Heritage Vivah"
    },
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200601/DSC05369_vlepcy.jpg", 
      title: "Golden Hour Glow", 
      location: "Dusk Romance"
    },
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200591/IMG_5643.JPG_y7fuic.jpg", 
      title: "Crimson Veil & Gaze", 
      location: "Bridal Couture"
    },
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200591/IMG_5644_ufj3cm.webp", 
      title: "Twilight Silhouette", 
      location: "Outdoor Poise"
    },
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784746879/WhatsApp_Image_2026-07-23_at_12.30.06_AM_w4cexe.jpg", 
      title: "Marigold Symphony", 
      location: "Haldi Ritual"
    },
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784742653/uniquephotography1.0-20260318-0054_wvsqji.webp", 
      title: "Sacred Sindoor Ritual", 
      location: "Sacred Vivah"
    },
    { 
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784742664/uniquephotography1.0-20260318-0077_ujvdny.webp", 
      title: "Pre-Wedding Poise", 
      location: "Signature Shoot"
    }
  ];

  // 🎬 EXACTLY 2 DIRECT 16:9 BEHIND THE SCENES VIDEOS
  const btsVideos = [
    {
      id: 1,
      videoUrl: "https://res.cloudinary.com/doa6d6cyf/video/upload/v1787249489/Team_work_guru_videography_siwanEnquiry_-_8434656386_guruvideography_siwan_trending_reels_gjwnfd.mp4"
    },
    {
      id: 2,
      videoUrl: "https://res.cloudinary.com/doa6d6cyf/video/upload/v1787249312/The_team_behind_every_perfect_frame._Team_Guru_Videography_Siwan_%EF%B8%8FCreating_memories_one_sho_zgm5iw.mp4"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  
  const filmstripSectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animId;
    const handleScroll = () => {
      animId = requestAnimationFrame(() => {
        if (!filmstripSectionRef.current) return;
        const rect = filmstripSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const totalDistance = windowHeight + rect.height;
        const currentPos = windowHeight - rect.top;
        const percentage = Math.max(0, Math.min(currentPos / totalDistance, 1));
        
        setScrollProgress(percentage);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleBrochureDownload = async () => {
    try {
      const response = await fetch('https://res.cloudinary.com/doa6d6cyf/image/upload/v1787225757/WhatsApp_Image_2026-08-20_at_4.29.26_PM_p0psfc.jpg');
      if (!response.ok) {
        alert("Studio Lookbook is currently being updated. Please contact Guru Videography at 8434656386 or guruaman63@gmail.com.");
        return;
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Guru_Videography_Lookbook.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      alert("Lookbook download unavailable right now. Please get in touch directly at 8434656386.");
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 font-sans tracking-tight selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden relative w-full">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@500;600;700&display=swap');

        .font-luxury-serif { font-family: 'Cinzel', Georgia, serif; }
        .font-modern-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-modern-mono { font-family: 'Space Grotesk', monospace; }

        .glass-luxury-panel {
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(231, 229, 228, 0.85);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04);
        }

        .tilt-card {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
        }
        .tilt-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px -12px rgba(120, 53, 15, 0.12), 0 0 0 1px rgba(245, 158, 11, 0.25);
        }

        @keyframes filmstripSlideUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.94); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .film-stagger-1 {
          animation: filmstripSlideUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          opacity: 0;
        }
        .film-stagger-2 {
          animation: filmstripSlideUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
          opacity: 0;
        }
        .film-stagger-3 {
          animation: filmstripSlideUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards;
          opacity: 0;
        }

        .filmstrip-card {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
          transform-style: preserve-3d;
        }
        .filmstrip-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 35px 70px -15px rgba(120, 53, 15, 0.2), 0 0 0 1px rgba(217, 119, 6, 0.4);
        }

        .perspective-panorama-stage {
          perspective: 1600px;
          perspective-origin: center center;
          transform-style: preserve-3d;
        }

        .slanted-elevation-strip {
          transform-origin: left bottom;
          will-change: transform;
        }

        .film-window-cell-expanded {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.4s ease;
          transform-style: preserve-3d;
        }
        .film-window-cell-expanded:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(217, 119, 6, 0.9);
          box-shadow: 0 35px 70px -15px rgba(120, 53, 15, 0.35), 0 0 0 1px rgba(245, 158, 11, 0.4);
        }

        .mask-edge-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
        }
      `}</style>

      {/* 1. ARCHITECTURAL BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#FAF8F5]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#78350f05_1px,transparent_1px),linear-gradient(to_bottom,#78350f05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* 2. HERO COMPACT SECTION (EXACT 2-COLUMN SPLIT ON MOBILE & LAPTOP) */}
      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-10 pt-3 sm:pt-8 pb-8 sm:pb-14">
        <div className="grid grid-cols-12 gap-3 sm:gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Column (Text & CTAs) */}
          <div className="col-span-7 space-y-2 sm:space-y-4 text-left">
            
            {/* BRAND BADGE */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white border border-amber-200/90 shadow-2xs w-fit max-w-full">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 shrink-0 rounded-full bg-amber-600 animate-pulse shadow-[0_0_8px_#d97706]" />
              <div className="flex items-center gap-1 flex-nowrap font-modern-sans text-[8.5px] min-[380px]:text-[10px] sm:text-xs font-bold uppercase tracking-wide shrink-0">
                <span className="text-stone-950 font-extrabold whitespace-nowrap">Guru Videography</span>
                <span className="text-amber-800 font-medium whitespace-nowrap hidden min-[360px]:inline">• Aman Kumar</span>
              </div>
            </div>

            <div className="space-y-0.5 sm:space-y-1.5">
              <h1 className="font-luxury-serif text-xl min-[400px]:text-2xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-stone-950 leading-[1.08]">
                We Archive <br />
                <span className="italic font-light bg-gradient-to-r from-amber-700 via-rose-700 to-amber-900 bg-clip-text text-transparent inline-block">
                  Human Poetry.
                </span>
              </h1>
              
              <p className="font-modern-sans text-stone-600 text-[10px] sm:text-sm lg:text-base max-w-lg font-normal leading-relaxed pt-0.5 sm:pt-1">
                Premier cinema production and bespoke wedding documentation based in Siwan (Branch: Ukhai). Preserving sacred rituals and timeless celebrations with master optical color science.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <button
                onClick={() => setActiveTab && setActiveTab('contact')}
                className="group px-3.5 sm:px-7 py-2 sm:py-3.5 rounded-full bg-stone-900 text-white font-modern-sans text-[9px] sm:text-xs tracking-wider uppercase font-semibold shadow-md hover:bg-amber-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              >
                <span>Reserve 2026</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform sm:w-3.5 sm:h-3.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button
                onClick={handleBrochureDownload}
                className="px-3 sm:px-6 py-2 sm:py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 font-modern-sans text-[9px] sm:text-xs tracking-wider uppercase font-semibold shadow-2xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-1.5 cursor-pointer border border-stone-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700 sm:w-3.5 sm:h-3.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Lookbook</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-6 pt-2 sm:pt-4 border-t border-stone-200/80 max-w-md">
              <div>
                <span className="font-luxury-serif text-sm min-[380px]:text-base sm:text-2xl lg:text-3xl font-bold text-stone-900 block">500+</span>
                <span className="font-modern-sans text-[7.5px] sm:text-[10px] tracking-wider uppercase text-stone-500 block">Events</span>
              </div>
              <div>
                <span className="font-luxury-serif text-sm min-[380px]:text-base sm:text-2xl lg:text-3xl font-bold text-amber-800 block">₹50K+</span>
                <span className="font-modern-sans text-[7.5px] sm:text-[10px] tracking-wider uppercase text-stone-500 block">Curation</span>
              </div>
              <div>
                <span className="font-luxury-serif text-sm min-[380px]:text-base sm:text-xl lg:text-2xl font-bold text-stone-900 block">Siwan</span>
                <span className="font-modern-sans text-[7.5px] sm:text-[10px] tracking-wider uppercase text-stone-500 block">HQ</span>
              </div>
            </div>

          </div>

          {/* Right Column Showcase Card (Side-by-Side on Mobile) */}
          <div className="col-span-5 w-full">
            <div className="relative glass-luxury-panel rounded-2xl sm:rounded-3xl p-1.5 sm:p-3 tilt-card shadow-xl border border-white">
              <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden relative bg-stone-100">
                {heroSlides.map((slide, idx) => (
                  <img
                    key={idx}
                    src={slide}
                    alt="Guru Videography Signature Archive"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  />
                ))}
                
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-5 sm:left-5 sm:right-5 text-white pointer-events-none text-left">
                  <span className="font-modern-sans text-[7.5px] sm:text-[9px] tracking-[0.25em] text-amber-300 uppercase block mb-0.5 font-bold">
                    Signature Archive
                  </span>
                  <h3 className="font-luxury-serif text-[11px] sm:text-xl font-medium leading-tight truncate">Preserved in light</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 🌟 2.5. 3-PHOTO STAGGERED SHOWCASE (1 ROW IN MOBILE & DESKTOP) */}
      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-10 py-8 sm:py-16 border-t border-stone-200/80">
        
        <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2 mb-6 sm:mb-10">
          <span className="font-modern-mono text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.35em] text-amber-800 uppercase block">
            ✦ GURU VIDEOGRAPHY ARCHIVES ✦
          </span>
          <h2 className="font-luxury-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-950 tracking-tight">
            Three Still Visions. <span className="italic font-light text-amber-800">One Legacy.</span>
          </h2>
          <p className="font-modern-sans text-stone-600 text-[11px] sm:text-sm font-normal max-w-lg mx-auto">
            Documenting Bihar's grand heritage weddings with cinema cameras and calibrated color grading.
          </p>
        </div>

        {/* 🎯 3-COLUMNS IN 1 ROW FOR BOTH MOBILE AND DESKTOP */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8 items-center max-w-6xl mx-auto">
          {filmstripPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => {
                if (setActiveTab) setActiveTab('portfolio');
              }}
              className={`group cursor-pointer select-none ${photo.delayClass} ${
                photo.isCenter ? 'md:-translate-y-4 lg:-translate-y-6 md:scale-105 z-20' : 'z-10'
              }`}
            >
              <div className="glass-luxury-panel rounded-2xl sm:rounded-3xl p-1.5 sm:p-4 filmstrip-card relative overflow-hidden border border-white shadow-md sm:shadow-xl">
                
                <div className={`w-full rounded-xl sm:rounded-2xl overflow-hidden relative bg-stone-950 shadow-inner ${
                  photo.isCenter ? 'aspect-[4/5] min-h-[160px] sm:min-h-[450px]' : 'aspect-[4/5] min-h-[140px] sm:min-h-[390px]'
                }`}>
                  
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105 brightness-[0.97] group-hover:brightness-105"
                  />

                  <div className="absolute inset-1.5 sm:inset-3 border border-white/20 rounded-lg sm:rounded-xl pointer-events-none group-hover:border-amber-400/50 transition-colors duration-500" />

                  {photo.isCenter && (
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 hidden sm:block">
                      <span className="px-3 py-1 bg-amber-600/90 text-white backdrop-blur-md rounded-full font-modern-mono text-[9px] font-bold uppercase tracking-wider shadow-sm">
                        SIGNATURE STILL
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-5 text-white text-left">
                    <div className="space-y-0.5">
                      <span className="font-modern-mono text-[7px] sm:text-[9.5px] tracking-widest text-amber-400 uppercase font-bold block truncate">
                        {photo.location}
                      </span>
                      <h3 className="font-luxury-serif text-[10px] sm:text-lg lg:text-xl font-bold tracking-wide truncate">
                        {photo.title}
                      </h3>
                    </div>
                  </div>

                </div>

                <div className="pt-1.5 sm:pt-3 pb-0.5 px-0.5 sm:px-1 flex items-center justify-between text-left">
                  <div className="truncate pr-1">
                    <span className="font-modern-mono text-[7.5px] sm:text-[9.5px] font-bold text-amber-800 uppercase tracking-wider block truncate">
                      FINE-ART
                    </span>
                    <p className="font-modern-sans text-[8.5px] sm:text-[11px] text-stone-500 font-medium truncate">
                      {photo.location}
                    </p>
                  </div>

                  <div className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 rounded-full bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-800 group-hover:bg-stone-950 group-hover:text-white transition-colors duration-300">
                    <ArrowRight size={10} className="sm:w-3 sm:h-3" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 sm:pt-8 text-center">
          <button
            onClick={() => {
              if (setActiveTab) setActiveTab('portfolio');
            }}
            className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-modern-sans font-bold uppercase tracking-widest text-stone-900 hover:text-amber-800 transition-colors cursor-pointer"
          >
            <span>Explore Complete Master Portfolio Vault</span>
            <span>→</span>
          </button>
        </div>

      </section>

      {/* 3. DIRECTOR SPOTLIGHT (SIDE-BY-SIDE ON MOBILE & LAPTOP) */}
      <section className="relative z-10 py-10 sm:py-18 px-3 sm:px-6 max-w-7xl mx-auto border-t border-stone-200/80">
        <div className="grid grid-cols-12 gap-3 sm:gap-10 lg:gap-14 items-center">
          
          {/* Director Image Column */}
          <div className="col-span-5 relative group w-full">
            <div 
              onClick={() => setLightboxImg({ url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200594/IMG_5697_ulijfv.jpg", title: "Aman Kumar — Lead Filmmaker", category: "Guru Videography Leadership" })}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl glass-luxury-panel p-1.5 sm:p-3 tilt-card cursor-pointer shadow-lg"
            >
              <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden relative bg-stone-100">
                <img 
                  src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200594/IMG_5697_ulijfv.jpg" 
                  alt="Aman Kumar — Creative Director at Guru Videography" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { 
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"; 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-5 sm:left-5 sm:right-5 text-white text-left">
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-md rounded-full text-[7.5px] sm:text-[9px] font-modern-sans font-semibold tracking-widest uppercase mb-0.5 sm:mb-1.5 inline-block">
                    Aman Kumar
                  </span>
                  <h3 className="font-luxury-serif text-[11px] sm:text-xl font-bold leading-tight">Lead Director</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Director Statement Column */}
          <div className="col-span-7 space-y-2.5 sm:space-y-5 text-left">
            <div className="space-y-0.5 sm:space-y-1.5">
              <span className="font-modern-sans text-[8.5px] sm:text-[10px] font-bold tracking-[0.25em] text-amber-800 uppercase block">
                Directorial Statement
              </span>
              <h2 className="font-luxury-serif text-lg sm:text-4xl lg:text-5xl font-bold text-stone-950 tracking-tight leading-tight">
                Behind Every Frame, <br />
                <span className="italic font-light text-amber-800">A Living Story.</span>
              </h2>
            </div>

            <p className="font-modern-sans text-stone-600 text-[10px] sm:text-sm lg:text-base font-normal leading-relaxed">
              At Guru Videography, led by Aman Kumar, we do not treat ceremonies as rigid schedules. We see them as intimate canvases filled with fleeting, unrepeatable human expressions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-0.5 sm:pt-2">
              <div className="glass-luxury-panel p-2.5 sm:p-4.5 rounded-xl sm:rounded-2xl border border-stone-200/80">
                <span className="font-luxury-serif text-xs sm:text-lg text-amber-800 font-bold block mb-0.5 sm:mb-1">01. Organic Colors</span>
                <p className="font-modern-sans text-[9px] sm:text-xs text-stone-600 leading-relaxed">
                  Refined cinematic film tones that remain timeless across decades without fading.
                </p>
              </div>

              <div className="glass-luxury-panel p-2.5 sm:p-4.5 rounded-xl sm:rounded-2xl border border-stone-200/80 hidden sm:block">
                <span className="font-luxury-serif text-base sm:text-lg text-amber-800 font-bold block mb-0.5 sm:mb-1">02. Unobtrusive Presence</span>
                <p className="font-modern-sans text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                  Quiet, respectful direction that lets genuine emotions unfold naturally.
                </p>
              </div>
            </div>

            <div className="pt-0.5 sm:pt-2">
              <button
                onClick={() => setActiveTab && setActiveTab('contact')}
                className="inline-flex items-center gap-1.5 sm:gap-2.5 text-[9.5px] sm:text-xs font-modern-sans font-bold tracking-wider uppercase text-stone-900 hover:text-amber-800 transition-colors group cursor-pointer"
              >
                <span>Connect (8434656386)</span>
                <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center group-hover:bg-amber-800 group-hover:text-white transition-all text-xs">
                  →
                </span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. CURATED GALLERY (3-PHOTOS PER ROW IN MOBILE & DESKTOP) */}
      <section className="relative z-10 py-10 sm:py-18 px-3 sm:px-6 max-w-7xl mx-auto border-t border-stone-200/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 text-left">
          <div className="space-y-1">
            <span className="font-modern-sans text-[9.5px] sm:text-[10px] font-bold tracking-[0.25em] text-amber-800 uppercase block">Selected Works</span>
            <h2 className="font-luxury-serif text-2xl sm:text-4xl font-bold text-stone-950 tracking-tight">The Visual Archive</h2>
          </div>
          <p className="font-modern-sans text-stone-600 text-[11px] sm:text-sm max-w-md font-normal">
            A quiet exploration of light, intimacy, and candid celebration curated by Guru Videography.
          </p>
        </div>

        {/* 🎯 3 PHOTOS PER ROW IN MOBILE TOO */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setLightboxImg(item)}
              className="group glass-luxury-panel rounded-2xl sm:rounded-3xl p-1.5 sm:p-3 tilt-card cursor-pointer relative overflow-hidden text-left"
            >
              <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden relative bg-stone-100">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 z-10 hidden sm:block">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md font-modern-sans text-[9px] font-bold tracking-wider text-stone-900 uppercase shadow-2xs">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-5">
                  <span className="font-modern-sans text-[8px] sm:text-[10px] tracking-widest text-amber-300 uppercase mb-0.5 font-bold truncate">
                    {item.category}
                  </span>
                  <h3 className="font-luxury-serif text-xs sm:text-xl text-white font-medium truncate">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="pt-1.5 sm:pt-3 pb-0.5 px-0.5 sm:px-1 flex items-center justify-between">
                <div className="truncate pr-1">
                  <h4 className="font-luxury-serif text-[10px] sm:text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="font-modern-sans text-[8px] sm:text-[11px] text-stone-500 font-medium truncate">{item.category}</p>
                </div>
                
                <div className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 group-hover:bg-amber-800 group-hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-3 sm:h-3">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 5. 3D PERSPECTIVE PANORAMA REEL */}
      <section 
        ref={filmstripSectionRef} 
        className="relative z-10 py-16 sm:py-36 overflow-hidden border-t border-stone-200/80 bg-[#FAF8F5] perspective-panorama-stage"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-1.5 sm:space-y-2 mb-8 sm:mb-14 relative z-20">
          <span className="font-modern-sans text-[9px] sm:text-[10.5px] font-bold tracking-[0.35em] uppercase text-stone-600 block">
            REAL WEDDING FILMS MADE BY GURU VIDEOGRAPHY
          </span>
          <h2 className="font-luxury-serif text-2xl sm:text-5xl lg:text-[3.5rem] font-medium text-stone-950 tracking-wider uppercase leading-tight">
            We Invented <span className="italic font-light text-amber-800">Wedding Films</span>
          </h2>
          <div className="w-16 sm:w-20 h-[1.5px] bg-amber-700/60 mx-auto mt-2 sm:mt-3" />
        </div>

        <div className="w-full overflow-hidden mask-edge-fade py-6 sm:py-12">
          <div 
            className="slanted-elevation-strip flex items-center gap-4 sm:gap-12 will-change-transform transition-transform duration-150 ease-out px-4 sm:px-16"
            style={{ 
              transform: `translate3d(-${scrollProgress * 850}px, -${scrollProgress * 30}px, 0) rotate(-2deg)` 
            }}
          >
            {filmstripPanels.map((cell, idx) => (
              <div 
                key={idx}
                onClick={() => setLightboxImg({ url: cell.url, title: cell.title, category: cell.location })}
                className="film-window-cell-expanded w-[240px] sm:w-[440px] md:w-[500px] aspect-[4/3] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-950 border-2 sm:border-[3px] border-[#1C1917] shadow-xl sm:shadow-2xl relative group cursor-pointer"
              >
                <img 
                  src={cell.url} 
                  alt={cell.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105 brightness-[0.96] group-hover:brightness-105"
                  loading="lazy"
                />

                <div className="absolute inset-2.5 sm:inset-4 border border-white/20 rounded-xl sm:rounded-2xl pointer-events-none group-hover:border-amber-400/50 transition-colors duration-500" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3.5 sm:p-6 text-white">
                  <div className="space-y-0.5 sm:space-y-1 text-left">
                    <span className="font-modern-mono text-[7.5px] sm:text-[9.5px] tracking-widest uppercase text-amber-400 font-bold block">
                      {cell.location}
                    </span>
                    <h3 className="font-luxury-serif text-sm sm:text-2xl font-medium tracking-wide">
                      {cell.title}
                    </h3>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎬 6. PURE 16:9 BEHIND THE SCENES VIDEOS (1 ROW IN MOBILE & DESKTOP) */}
      <section className="relative z-10 py-12 sm:py-24 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent overflow-hidden border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-10 text-center">
          
          <div className="space-y-1 mb-6 sm:mb-10">
            <h2 className="font-luxury-serif text-2xl sm:text-5xl font-bold text-stone-950 tracking-tight">
              Behind The Scenes
            </h2>
            <div className="w-14 sm:w-16 h-[1.5px] bg-amber-700/60 mx-auto mt-2" />
          </div>

          {/* 🎯 2 VIDEOS IN 1 ROW IN BOTH MOBILE & DESKTOP */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-8 max-w-5xl mx-auto">
            {btsVideos.map((bts) => (
              <div
                key={bts.id}
                className="glass-luxury-panel rounded-2xl sm:rounded-3xl p-1.5 sm:p-4 border border-white shadow-md sm:shadow-xl relative overflow-hidden"
              >
                <div className="w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-stone-950 border border-stone-200/60 shadow-inner relative">
                  <video
                    src={bts.videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover object-[center_46%] bg-black"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. PHOTO LIGHTBOX MODAL */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-modern-sans text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer border border-white/15"
            onClick={() => setLightboxImg(null)}
          >
            ✕ Close
          </button>

          <div
            className="max-w-4xl max-h-[85vh] relative flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImg.url}
              alt={lightboxImg.title}
              className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <div className="mt-4 text-center text-white space-y-1">
              <span className="font-modern-sans text-[11px] tracking-widest text-amber-300 uppercase block font-bold">
                {lightboxImg.category}
              </span>
              <h3 className="font-luxury-serif text-xl font-light">{lightboxImg.title}</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}