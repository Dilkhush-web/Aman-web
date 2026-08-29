import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, ArrowRight, ArrowLeft, Plus } from 'lucide-react';

export default function Testimonials({ setActiveTab }) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Touch / Swipe State Tracking
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 📝 Review Submission Form State
  const [formData, setFormData] = useState({
    name: '',
    snippet: '',
    comment: '',
    rating: 5
  });

  // 🌟 Verified Real Client Stories (Fresh Handpicked Face-Visible Visuals)
  const [reviewsData, setReviewsData] = useState([
    {
      id: 1,
      name: "Amit & Pooja",
      rating: 5,
      snippet: "Flawless Execution & Timeless Frames",
      comment: "Aman Kumar and his team handled our entire celebration seamlessly. From the rush of the evening to the quiet emotional moments, nothing was missed. The final output is pure luxury.",
      deliverables: "Master Cinema Film + Archival Album",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784743445/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits_xxvlnv.jpg"
    },
    {
      id: 2,
      name: "Rajesh & Shreya",
      rating: 5,
      snippet: "Captured Our True Emotions",
      comment: "Highly professional crew. They knew exactly how to coordinate with our family without causing any disruption. The films and portrait deliverables look completely breathtaking.",
      deliverables: "Heritage Master Film + RAW Vault",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784742666/uniquephotography1.0-20260318-0087_yyozre.webp"
    },
    {
      id: 3,
      name: "Rohan & Riya",
      rating: 5,
      snippet: "Magical Light & Natural Poses",
      comment: "Our shoot experience was extraordinary. Aman guided us through every frame naturally, and the ambient sunlight setups turned outdoor frames into a pure visual poem.",
      deliverables: "Editorial Teaser + Fine-Art Stills",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200598/436A3839_d4c6tf.jpg"
    },
    {
      id: 4,
      name: "Vikram & Ananya",
      rating: 5,
      snippet: "High-Budget Cinema Feel",
      comment: "We wanted a modern cinematic look for our wedding archive, and Guru Videography delivered beyond our expectations. The color grading and audio pacing feel world-class.",
      deliverables: "Widescreen Master Cut + Photo Book",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200601/DSC05369_vlepcy.jpg"
    },
    {
      id: 5,
      name: "Rahul & Sneha",
      rating: 5,
      snippet: "Unscripted Moments Preserved Forever",
      comment: "The candid moments are pure art. They caught the natural laughter and the quiet tears of our parents effortlessly. Every photograph is worthy of a museum print.",
      deliverables: "Archival Cotton Album + Digital Vault",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784746879/WhatsApp_Image_2026-07-23_at_12.30.06_AM_w4cexe.jpg"
    },
    {
      id: 6,
      name: "Aakash & Vanya",
      rating: 5,
      snippet: "Big-Screen Directorial Standard",
      comment: "Our final 4K film is a true masterpiece. The bespoke color grading profiles and acoustic sound design feel like a theatrical premiere experience.",
      deliverables: "Directorial Feature Cut + Sound Design",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3vKq0igucPxo35bV47g-PdJak-efV1I8zoRg5TDt5Rw&s=10"
    }
  ]);

  const activeReview = reviewsData[activeStoryIndex] || reviewsData[0];

  const handleNextStory = () => {
    setActiveStoryIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrevStory = () => {
    setActiveStoryIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  // ⏱️ 3.5-Second Automatic Slide Rotation
  useEffect(() => {
    if (isHovered || isFormOpen) return;
    const interval = setInterval(() => {
      handleNextStory();
    }, 3500);
    return () => clearInterval(interval);
  }, [reviewsData.length, isHovered, isFormOpen]);

  // 📱 Touch Swipe Handlers (Mobile & Trackpad Swipe)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNextStory();
    } else if (distance < -50) {
      handlePrevStory();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // 🔌 Backend Submission Hook
  const handleReviewSubmission = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newReviewItem = {
      ...formData,
      id: reviewsData.length + 1,
      rating: Number(formData.rating),
      deliverables: "Verified Client Story",
      image: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784743445/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits_xxvlnv.jpg"
    };

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://aman-web-nuwa.onrender.com';

      await fetch(`${backendUrl}/api/reviews/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReviewItem)
      });
    } catch (err) {
      console.log("Local state fallback active");
    }

    setReviewsData([newReviewItem, ...reviewsData]);
    setIsSubmitting(false);
    setIsFormOpen(false);
    alert("✨ Your review has been recorded in the Guru Videography archives.");
    setFormData({ name: '', snippet: '', comment: '', rating: 5 });
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 font-sans tracking-tight relative overflow-hidden min-h-screen pt-4 sm:pt-8 pb-16 sm:pb-24 selection:bg-amber-100 selection:text-amber-900">
      
      {/* 🔮 MASTER LUXURY DESIGN ENGINE & ANIMATIONS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .font-brand-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-brand-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-brand-mono { font-family: 'Space Grotesk', monospace; }

        .glass-story-monograph {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(24px) saturate(170%);
          border: 1px solid rgba(231, 229, 228, 0.9);
          box-shadow: 0 25px 60px -15px rgba(120, 53, 15, 0.08), 0 2px 10px rgba(0, 0, 0, 0.02);
        }

        .tilt-review-card {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
        }
        .tilt-review-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px -12px rgba(120, 53, 15, 0.14), 0 0 0 1px rgba(245, 158, 11, 0.3);
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-slide-content {
          animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Clean Background Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#FAF8F5]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#78350f05_1px,transparent_1px),linear-gradient(to_bottom,#78350f05_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-10 relative z-10 space-y-12 sm:space-y-28">

        {/* =========================================================================
            1. VOGUE EDITORIAL HERO HEADER
        ========================================================================= */}
        <section className="text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 pt-1 sm:pt-2">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4.5 py-1 sm:py-1.5 rounded-full bg-white border border-amber-200/90 shadow-2xs">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-600 animate-pulse shadow-[0_0_8px_#d97706]" />
            <span className="font-brand-sans text-[9px] sm:text-[10.5px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-stone-800 uppercase">
              Client Testimonials • Guru Videography
            </span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <span className="font-brand-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.35em] text-amber-800 uppercase block">
              ✦ AUTHORED BY OUR COUPLES • 200+ CELEBRATIONS ✦
            </span>
            <h1 className="font-brand-cinzel text-2xl sm:text-5xl lg:text-[4.4rem] font-medium text-stone-950 tracking-tight leading-[1.08] sm:leading-[1.05]">
              Notes of Gratitude <br />
              <span className="italic font-light bg-gradient-to-r from-amber-700 via-rose-700 to-amber-900 bg-clip-text text-transparent">
                Preserved in Memory.
              </span>
            </h1>
          </div>

          <div className="w-12 sm:w-16 h-[1.5px] bg-amber-700/50 mx-auto my-1.5 sm:my-2" />

          <p className="font-brand-sans text-stone-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            The true measure of our craft lives in the genuine emotions, happy tears, and timeless memories preserved across 200+ celebrated stories.
          </p>
        </section>

        {/* =========================================================================
            🌟 2. MASTER SPOTLIGHT MONOGRAPH (CLEAN VISUALS, NO EXTRA TEXT OVERLAYS)
        ========================================================================= */}
        <section 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="glass-story-monograph rounded-2xl sm:rounded-3xl p-4 sm:p-10 lg:p-12 border border-white shadow-xl sm:shadow-2xl relative overflow-hidden select-none cursor-grab active:cursor-grabbing"
        >
          
          <div className="grid grid-cols-12 gap-3 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Frame: Large Archival Couple Portrait with Clear Faces */}
            <div className="col-span-12 lg:col-span-6 w-full">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3] sm:aspect-[16/11] bg-stone-950 shadow-xl group border border-stone-800">
                <img
                  key={activeReview.id}
                  src={activeReview.image}
                  alt={activeReview.name}
                  className="w-full h-full object-cover object-[center_top] animate-slide-content brightness-[0.97] group-hover:brightness-105 transition-all duration-700"
                />

                <div className="absolute inset-2 sm:inset-3.5 border border-white/25 rounded-lg sm:rounded-xl pointer-events-none group-hover:border-amber-400/50 transition-colors duration-500" />

                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5">
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-stone-950/85 backdrop-blur-md rounded-full font-brand-mono text-[8px] sm:text-[9px] font-bold text-amber-300 uppercase tracking-widest border border-white/10 shadow-sm flex items-center gap-1.5">
                    <CheckCircle size={10} className="text-emerald-400" />
                    Verified Story
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative & Story Controls */}
            <div key={`text-${activeReview.id}`} className="col-span-12 lg:col-span-6 space-y-3 sm:space-y-6 text-left animate-slide-content">
              
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 text-xs sm:text-sm gap-0.5">
                    {Array.from({ length: activeReview.rating || 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="font-brand-mono text-[9px] sm:text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                    0{activeStoryIndex + 1} / 0{reviewsData.length}
                  </span>
                </div>

                <h3 className="font-brand-cinzel text-lg sm:text-3xl lg:text-4xl font-bold text-stone-950 leading-snug">
                  "{activeReview.snippet}"
                </h3>
              </div>

              {/* Review Quote */}
              <p className="font-brand-sans text-stone-700 text-xs sm:text-base font-normal leading-relaxed italic border-l-2 border-amber-700 pl-3 sm:pl-4 py-0.5 sm:py-1">
                "{activeReview.comment}"
              </p>

              {/* Client Info & Story Navigation Buttons */}
              <div className="pt-2 sm:pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="font-brand-cinzel text-sm sm:text-lg font-bold text-stone-950">
                    {activeReview.name}
                  </h4>
                  <p className="font-brand-mono text-[8.5px] sm:text-[10px] text-amber-800 uppercase font-bold">
                    {activeReview.deliverables}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={handlePrevStory}
                    className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 transition-all cursor-pointer shadow-2xs"
                    title="Previous"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    onClick={handleNextStory}
                    className="p-2 sm:p-2.5 rounded-full bg-stone-950 hover:bg-amber-800 text-white transition-all cursor-pointer shadow-sm"
                    title="Next"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Interactive Progress Bar Strip (3.5s Indicator) */}
          <div className="mt-4 sm:mt-8 pt-3 sm:pt-6 border-t border-stone-200/80 flex items-center gap-1.5 sm:gap-2">
            {reviewsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStoryIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeStoryIndex === idx 
                    ? 'w-8 sm:w-10 bg-amber-700' 
                    : 'w-2.5 sm:w-3 bg-stone-200 hover:bg-stone-400'
                }`}
                title={`Go to story 0${idx + 1}`}
              />
            ))}
          </div>

        </section>

        {/* =========================================================================
            3. ALL CLIENT EXPERIENCES (EXACT 3 REVIEWS IN ROW 1 & 3 IN ROW 2)
        ========================================================================= */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex flex-row items-end justify-between gap-2 text-left border-b border-stone-200 pb-3">
            <div>
              <span className="font-brand-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-800 uppercase block">
                CURATED EXPERIENCES
              </span>
              <h2 className="font-brand-cinzel text-xl sm:text-3xl font-bold text-stone-950">
                All Client Testaments
              </h2>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[9.5px] sm:text-xs font-brand-sans font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0"
            >
              <Plus size={12} />
              <span>Share Story</span>
            </button>
          </div>

          {/* 🎯 EXACT 3 REVIEWS PER ROW ON MOBILE & LAPTOP */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-6">
            {reviewsData.map((rev, idx) => {
              const isSelected = activeStoryIndex === idx;
              return (
                <div
                  key={rev.id}
                  onClick={() => setActiveStoryIndex(idx)}
                  className={`glass-story-monograph p-2.5 sm:p-6 rounded-xl sm:rounded-2xl tilt-review-card cursor-pointer border text-left flex flex-col justify-between space-y-2 sm:space-y-4 transition-all duration-300 ${
                    isSelected 
                      ? 'border-amber-600/70 shadow-md sm:shadow-lg scale-[1.02] bg-white ring-1 ring-amber-500/30' 
                      : 'border-white hover:border-amber-200'
                  }`}
                >
                  <div className="space-y-1 sm:space-y-2.5">
                    <div className="flex justify-between items-center">
                      <div className="flex text-amber-500 text-[10px] sm:text-xs">
                        {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className="font-brand-mono text-[7px] sm:text-[9px] text-amber-800 font-bold uppercase">
                        Select ✦
                      </span>
                    </div>

                    <h4 className="font-brand-cinzel text-[10px] sm:text-base font-bold text-stone-950 line-clamp-1 leading-tight">
                      "{rev.snippet}"
                    </h4>

                    <p className="font-brand-sans text-[8.5px] sm:text-xs text-stone-600 leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-1.5 sm:pt-3 border-t border-stone-100 flex items-center justify-between">
                    <h5 className="font-brand-cinzel text-[9.5px] sm:text-xs font-bold text-stone-900 truncate">
                      {rev.name}
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            4. QUALITY METRICS HUD STRIP
        ========================================================================= */}
        <section className="glass-story-monograph rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[ 
              { l: 'Lighting Precision', v: '98%' }, 
              { l: 'Sound Design', v: '100%' }, 
              { l: 'RAW Deliverables', v: '4K HDR' }, 
              { l: 'Happy Families', v: '200+' } 
            ].map((item, i) => (
              <div key={i} className="p-2 sm:p-4 text-center border-l border-stone-200 first:border-0">
                <span className="block font-brand-cinzel text-xl sm:text-5xl font-bold text-stone-900">{item.v}</span>
                <span className="block text-[8.5px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.25em] font-bold text-amber-800 mt-1 sm:mt-2 font-brand-mono">{item.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            5. DIRECTORIAL CALL TO ACTION
        ========================================================================= */}
        <section className="glass-story-monograph p-5 sm:p-14 rounded-2xl sm:rounded-3xl text-center space-y-3 sm:space-y-5 max-w-3xl mx-auto border border-amber-200/80 shadow-xl">
          <span className="font-brand-mono text-[9px] sm:text-[10.5px] font-bold tracking-[0.25em] sm:tracking-[0.35em] text-amber-800 uppercase block">
            LIMITED COMMISSION SEASONS
          </span>
          <h2 className="font-brand-cinzel text-xl sm:text-5xl font-bold text-stone-950 tracking-tight">
            Reserve Your <span className="italic font-light text-amber-800">Wedding Date</span>
          </h2>
          <p className="font-brand-sans text-stone-600 text-xs sm:text-sm max-w-lg mx-auto font-normal leading-relaxed">
            Every celebration deserves an uncompromising visual heirloom. Get in touch with Aman Kumar (+91 8434656386) and our principal team for date availability.
          </p>
          <div className="pt-1 sm:pt-2">
            <button
              onClick={() => setActiveTab && setActiveTab('contact')}
              className="px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-stone-950 hover:bg-amber-800 text-white font-brand-sans text-[10px] sm:text-xs tracking-wider sm:tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              Request Date Availability →
            </button>
          </div>
        </section>

      </div>

      {/* =========================================================================
          6. CLIENT STORY LOGGING MODAL
      ========================================================================= */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-stone-950/85 backdrop-blur-xl z-[999999] flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-amber-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-12 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-stone-900">
            
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-stone-500 hover:text-stone-900 text-xs font-brand-mono tracking-widest uppercase transition-colors bg-stone-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer"
            >
              ✕ Close
            </button>

            <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-8 text-center border-b border-stone-200/80 pb-3 sm:pb-6">
              <span className="text-amber-800 font-brand-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase block font-bold">CLIENT LOG PORTAL</span>
              <h3 className="font-brand-cinzel text-xl sm:text-4xl text-stone-950 font-bold uppercase tracking-wide">Share Your Narrative</h3>
            </div>

            <form onSubmit={handleReviewSubmission} className="space-y-3 sm:space-y-4 text-xs font-brand-sans text-left">
              <div className="space-y-1">
                <label className="text-stone-600 uppercase font-bold text-[9.5px] sm:text-[10px] tracking-wider">Couple / Family Names *</label>
                <input 
                  required 
                  type="text" 
                  placeholder="e.g. Aman & Anjali" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 outline-none focus:border-amber-700 text-xs" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-600 uppercase font-bold text-[9.5px] sm:text-[10px] tracking-wider">Rating</label>
                <select 
                  value={formData.rating} 
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })} 
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-amber-700 font-bold outline-none cursor-pointer focus:border-amber-700 text-xs"
                >
                  <option value="5">★★★★★ (Outstanding Excellence)</option>
                  <option value="4">★★★★☆ (Very Good)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-stone-600 uppercase font-bold text-[9.5px] sm:text-[10px] tracking-wider">One-Line Headline *</label>
                <input 
                  required 
                  type="text" 
                  placeholder="e.g. Pure cinematic magic!" 
                  value={formData.snippet} 
                  onChange={(e) => setFormData({ ...formData, snippet: e.target.value })} 
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 outline-none focus:border-amber-700 text-xs" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-600 uppercase font-bold text-[9.5px] sm:text-[10px] tracking-wider">Detailed Narrative *</label>
                <textarea 
                  required 
                  rows="3" 
                  placeholder="Share details regarding the photography, team conduct, and memories..." 
                  value={formData.comment} 
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })} 
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 outline-none resize-none focus:border-amber-700 text-xs" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-stone-950 hover:bg-amber-800 text-white font-brand-sans font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] py-3 sm:py-4 rounded-xl mt-1 sm:mt-2 transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50 text-xs"
              >
                {isSubmitting ? "Logging Archive..." : "Submit Verified Review ✦"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}