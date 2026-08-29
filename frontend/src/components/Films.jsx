import React, { useState, useRef } from 'react';
import { Play, Sparkles, Film, Maximize2, X, ArrowRight, Phone } from 'lucide-react';

export default function Films({ setActiveTab }) {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const videoRefs = useRef([]);

  // 6 Curated Cinema Reels (With direct Cloudinary delivery)
  const premiumVideos = [
    {
      id: 1,
      title: "The Royal Vivah Legacy",
      category: "HERITAGE CINEMA",
      desc: "A grand-scale cinematic chronicle captured across heritage palace courtyards in Siwan. Mastered frame-by-frame on premium anamorphic optics to preserve the profound depth of traditional rituals.",
      videoUrl: "https://res.cloudinary.com/doa6d6cyf/video/upload/a_270/v1787917023/Captured_emotions_not_just_moments_Book_your_wedding_now_zchs8l.mp4"
    },
    {
      id: 2,
      title: "The Couture Pre-Wedding",
      category: "COUTURE NARRATIVE",
      desc: "A high-fashion dusk narrative documented during the golden hour glow across scenic landscapes near Ukhai. Directed around luxury slow-motion sequences and ambient river reflections.",
      videoUrl: "https://res.cloudinary.com/doa6d6cyf/video/upload/a_270/v1787917004/Abhishek_SwatiShot_by_-_foreverstudios.in_zo_wed_shaadisquad_shaadisaga.official_wedmegoo_vqahr8.mp4"
    },
    {
      id: 3,
      title: "Grand Jubilee Celebrations",
      category: "JUBILEE ARCHIVE",
      desc: "A high-octane celebration teaser combining celebratory sparklers, candid portraiture, and seamless acoustic transition rhythms crafted by Guru Videography.",
      videoUrl: "https://res.cloudinary.com/doa6d6cyf/video/upload/a_270/v1784909337/Turning_birthdays_into_fairytales._..Manasvis_1st_birthday_birthdayfun_1stbirthday_hqf4fd.mp4"
    },
    {
      id: 4,
      title: "Varmala Royal Symphony",
      category: "SACRED WEDDING ENCORE",
      desc: "A breathtaking widescreen showcase highlighting low-angle mandap perspectives, rose petal shower sequences, and raw traditional emotional expressions across Gaurai venues.",
      videoUrl: "https://res.cloudinary.com/doa6d6cyf/video/upload/a_270/v1787916986/AQOh5CnV93RYX0F0txPga1tKGKj_kykmsMffYLS8HbCW7rH5vVKgk_gpum_2R8Mr8DqsdaXwHFSR03jZIWSuFWDFLJFw0Zjj_oqjx5c.mp4"
    },
    {
      id: 5,
      title: "Golden Hour Romance",
      category: "COUPLE PORTRAITURE",
      desc: "Captured across sacred riverfronts during dusk. Focuses on effortless unscripted glances, wind-swept silhouettes, and warm golden lens flares under Aman Kumar's direction.",
      videoUrl: "https://res.cloudinary.com/doa6d6cyf/video/upload/v1784910407/BOOK_UR_PRE-WEDDING_RIGHT_NOW_%EF%B8%8F.._Prewedding_couple_video_Prewedding_video_Varanasi_vide_nc7krt.mp4"
    },
    {
      id: 6,
      title: "The Palace Ritual Heritage",
      category: "TRADITIONAL VIVAH",
      desc: "An elaborate documentation of Vedic mantras, sacred hawan fire rituals, and heartfelt bidaai farewell tears, directed with complete observational discretion.",
      videoUrl: "https://res.cloudinary.com/doa6d6cyf/video/upload/a_270/v1784909330/Best_Cinematic_Teaser_--_Wedding_Teaser_--_2026_--_cinematic_shortsvideo_youtube_video_reel_1_vgxihz.mp4"
    }
  ];

  // Staggered 3-Photo Triptych
  const triptychPhotos = [
    {
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784743445/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits_xxvlnv.jpg",
      title: "The Royal Vows",
      tag: "Heritage"
    },
    {
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784742666/uniquephotography1.0-20260318-0087_yyozre.webp",
      title: "Bridal Splendor",
      tag: "Couture"
    },
    {
      url: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784746877/WhatsApp_Image_2026-07-23_at_12.30.06_AM_1_ipebqc.jpg",
      title: "Golden Dusk Intimacy",
      tag: "Ambient"
    }
  ];

  // Safe calling handler without tel: scheme failure
  const handleCallClick = (e, phoneNumber = '8434656386') => {
    const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(phoneNumber);
      }
      alert(`📞 Studio Contact Number: +91 ${phoneNumber}\n(Copied to clipboard!)`);
    }
  };

  // Handler to ensure ONLY ONE video plays at a time
  const handlePlay = (playingIndex) => {
    videoRefs.current.forEach((videoEl, index) => {
      if (videoEl && index !== playingIndex && !videoEl.paused) {
        videoEl.pause();
      }
    });
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden relative w-full min-h-screen pt-4 sm:pt-8 pb-16 sm:pb-24">
      
      {/* 🔮 MASTER LUXURY DESIGN SYSTEM */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@500;600;700&display=swap');
        
        .font-brand-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-brand-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-brand-mono { font-family: 'Space Grotesk', monospace; }

        .glass-film-panel {
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(24px) saturate(170%);
          border: 1px solid rgba(231, 229, 228, 0.9);
          box-shadow: 0 20px 45px -15px rgba(180, 83, 9, 0.05), 0 2px 10px rgba(0, 0, 0, 0.02);
        }

        .tilt-film-card {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
        }
        .tilt-film-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 60px -15px rgba(120, 53, 15, 0.12), 0 0 0 1px rgba(245, 158, 11, 0.25);
        }
      `}</style>

      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#FAF8F5]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#78350f05_1px,transparent_1px),linear-gradient(to_bottom,#78350f05_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-12 sm:space-y-28">

        {/* =========================================================================
            1. EDITORIAL CINEMA HERO HEADER
        ========================================================================= */}
        <section className="text-center max-w-4xl mx-auto space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4.5 py-1 sm:py-1.5 rounded-full bg-white border border-amber-200/90 shadow-2xs">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-600 animate-pulse shadow-[0_0_8px_#d97706]" />
            <span className="font-brand-sans text-[9px] sm:text-[10.5px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-stone-800 uppercase">
              The Director's Reel • Directed by Aman Kumar
            </span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <span className="font-brand-mono text-[9.5px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.35em] text-amber-800 uppercase block">
              ✦ GURU VIDEOGRAPHY CINEMA MASTERWORKS ✦
            </span>
            <h1 className="font-brand-cinzel text-2xl sm:text-5xl lg:text-[4.2rem] font-medium text-stone-950 tracking-tight leading-[1.05]">
              Unrepeatable Moments <br />
              <span className="italic font-light bg-gradient-to-r from-amber-700 via-rose-700 to-amber-900 bg-clip-text text-transparent">
                Preserved In 4K Widescreen.
              </span>
            </h1>
          </div>

          <div className="w-12 sm:w-16 h-[1.5px] bg-amber-700/50 mx-auto my-1 sm:my-2" />

          <p className="font-brand-sans text-stone-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Immerse yourself in our native 24fps motion reels, acoustic sound designs, and royal celebration chronicles crafted across Siwan, Ukhai, Gaurai, and destination celebrations.
          </p>
        </section>

        {/* =========================================================================
            2. 6 CINEMA MOTION MASTERWORKS (PREMIUM MOBILE & LAPTOP RESPONSIVE)
        ========================================================================= */}
        <section className="space-y-8 sm:space-y-24">
          {premiumVideos.map((video, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={video.id} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-14 items-center group"
              >
                {/* 🎥 Master Viewfinder Video Container */}
                <div className={`w-full lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="glass-film-panel rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 tilt-film-card border border-white shadow-md sm:shadow-xl relative overflow-hidden text-left">
                    <div className="w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-stone-950 relative shadow-inner flex items-center justify-center border border-stone-800">
                      <video 
                        ref={(el) => (videoRefs.current[idx] = el)}
                        src={video.videoUrl} 
                        controls 
                        controlsList="nodownload"
                        preload="metadata"
                        onPlay={() => handlePlay(idx)}
                        className="w-full h-full object-contain bg-stone-950"
                      />
                    </div>
                  </div>
                </div>

                {/* 📝 Video Narrative & Action */}
                <div className={`w-full lg:col-span-5 space-y-2 sm:space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'} text-left`}>
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-amber-800 font-brand-cinzel text-lg sm:text-2xl font-bold italic">
                        0{idx + 1}
                      </span>
                      <span className="w-4 sm:w-6 h-[1px] bg-amber-700/60" />
                      <span className="text-amber-900 font-brand-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold truncate">
                        {video.category}
                      </span>
                    </div>
                    
                    <h3 className="font-brand-cinzel text-lg sm:text-3xl lg:text-4xl text-stone-950 font-bold leading-tight">
                      {video.title}
                    </h3>
                  </div>
                  
                  <p className="font-brand-sans text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {video.desc}
                  </p>

                  <div className="pt-1 sm:pt-2">
                    <button
                      onClick={() => setSelectedFilm(video)}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-stone-950 hover:bg-amber-800 text-white font-brand-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-sm cursor-pointer hover:-translate-y-0.5"
                    >
                      Theater Mode ⤢
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </section>

        {/* =========================================================================
            3. OPTICAL MASTER TRIPTYCH (3 STILLS IN 1 ROW)
        ========================================================================= */}
        <section className="glass-film-panel rounded-2xl sm:rounded-3xl p-4 sm:p-12 border border-white shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-1 sm:space-y-2 mb-6 sm:mb-10">
            <span className="font-brand-mono text-[9px] sm:text-[10.5px] font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-800 uppercase block">
              OPTICAL MASTER TRIPTYCH
            </span>
            <h2 className="font-brand-cinzel text-xl sm:text-4xl font-bold text-stone-950 tracking-tight">
              Three Still Visions. One Legacy.
            </h2>
            <p className="font-brand-sans text-stone-600 text-xs sm:text-sm font-normal">
              Every frame represents an unrepeatable micro-expression captured with fine-art precision by Guru Videography.
            </p>
          </div>

          {/* Staggered Triptych Grid */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-8">
            {triptychPhotos.map((photo, index) => (
              <div
                key={index}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg aspect-[4/5] bg-stone-100 border border-amber-200/60 group"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-stone-950/80 backdrop-blur-md rounded-full font-brand-mono text-[7px] sm:text-[9px] font-bold text-amber-300 uppercase tracking-widest border border-white/10">
                    {photo.tag}
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 right-2 sm:bottom-5 sm:left-5 sm:right-5 text-white pointer-events-none text-left">
                  <h4 className="font-brand-cinzel text-[10px] sm:text-lg font-bold truncate">
                    {photo.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 sm:pt-8 text-center flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => setActiveTab && setActiveTab('contact')}
              className="inline-flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-stone-950 hover:bg-amber-800 text-white font-brand-sans text-xs tracking-wider sm:tracking-widest uppercase font-bold transition-all duration-300 shadow-md cursor-pointer hover:-translate-y-0.5"
            >
              <span>Consult Aman Kumar for Custom Cinema</span>
              <ArrowRight size={13} />
            </button>
            <a
              href="tel:8434656386"
              onClick={(e) => handleCallClick(e, '8434656386')}
              className="inline-flex items-center gap-1.5 text-xs font-brand-mono font-bold text-amber-900 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-full cursor-pointer hover:bg-amber-100 transition-colors"
            >
              <Phone size={12} /> +91 8434656386
            </a>
          </div>
        </section>

      </div>

      {/* =========================================================================
          4. THEATER FULL-SCREEN VIEWING MODAL
      ========================================================================= */}
      {selectedFilm && (
        <div
          className="fixed inset-0 z-[99999] bg-stone-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-3 sm:p-8"
          onClick={() => setSelectedFilm(null)}
        >
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-brand-mono text-xs uppercase tracking-widest transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
            onClick={() => setSelectedFilm(null)}
          >
            <span>Close Theater</span>
            <span>✕</span>
          </button>

          <div
            className="max-w-5xl w-full max-h-[85vh] relative flex flex-col items-center justify-center space-y-2 sm:space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <video
                src={selectedFilm.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center text-white space-y-0.5 sm:space-y-1">
              <span className="font-brand-mono text-[9px] sm:text-xs tracking-widest text-amber-300 uppercase block">
                {selectedFilm.category}
              </span>
              <h3 className="font-brand-cinzel text-base sm:text-3xl font-medium">{selectedFilm.title}</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}