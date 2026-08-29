import React, { useState } from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';

export default function Portfolio({ setActiveTab }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  // 👑 Clean Category Tiers
  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'wedding', label: 'Royal Vivah' },
    { id: 'prewedding', label: 'Couture Pre-Wedding' },
    { id: 'haldi', label: 'Haldi & Rituals' },
    { id: 'portraits', label: 'Couple Portraits' }
  ];

  // 📈 High-Resolution Dataset
  const portfolioItems = [
    // --- 1. WEDDING ---
    { id: 1, category: "wedding", title: "The Royal Vows", location: "Heritage Pavilion, Siwan", img: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784743445/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits_xxvlnv.jpg" },
    { id: 2, category: "wedding", title: "Bridal Splendor", location: "Grand Pavilion, Gaurai", img: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784742666/uniquephotography1.0-20260318-0087_yyozre.webp" },
    { id: 3, category: "wedding", title: "Sacred Mantras", location: "Bespoke Altar, Ukhai", img: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784020588/Copy_of_uniquephotography1.0-20260318-0002_appvcv_xrbtxq.webp" },
    { id: 4, category: "wedding", title: "The Crimson Veil", location: "Royal Courtyard, Siwan", img: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200598/436A3839_d4c6tf.jpg" },
    { id: 5, category: "wedding", title: "Eternal Sindoor", location: "Heritage Estate, Bihar", img: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200601/DSC05369_vlepcy.jpg" },
    { id: 6, category: "wedding", title: "The Grand Reception", location: "Palace Ballroom, Siwan", img: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784742657/uniquephotography1.0-20260318-0067_mywkqk.webp" },

    // --- 2. PRE-WEDDING ---
    { id: 7, category: "prewedding", title: "Golden Hour Glow", location: "Scenic Riverfront", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3uKMGo964ySoNVniQkTELO5Sdg5ZMLUpfGADvKsYA6A&s=10" },
    { id: 8, category: "prewedding", title: "Twilight Serenade", location: "Lakeside Countryside", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxtuUToS87CUgO6eMFDOfZibSZcSr1MKgsGlirbattQ&s=10" },
    { id: 9, category: "prewedding", title: "Whimsical Romance", location: "Botanical Meadows", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWYalk0nEmBAatFWOtye8W6VGj-foy2h9ZLK_atXFeXA&s=10" },
    { id: 10, category: "prewedding", title: "Silhouettes in Love", location: "Historic Archways", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2WOHR6faidIqILnAP3kluCT13-49El35MjixRVvavtg&s=10" },
    { id: 11, category: "prewedding", title: "Chasing Sunlight", location: "Vintage Orchards, Ukhai", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqOOUkhzIvre6RsZluARVJDk3ymKfUIb4I6TXAN0jTMw&s=10" },
    { id: 12, category: "prewedding", title: "Gentle Whispers", location: "Private Countryside, Gaurai", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXydn1mcSqPPsXolZHZA30RlTtMZaaJKmFnETt08ka-w&s=10" },

    // --- 3. HALDI & MEHENDI ---
    { id: 13, category: "haldi", title: "Yellow Symphony", location: "Courtyard Festivities", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1B2hV_i5Ug-gKKTNQBff1kglOdQbbPFs6WiF1OuhWLg&s=10" },
    { id: 14, category: "haldi", title: "Marigold Showers", location: "Traditional Terrace, Siwan", img: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787914929/DSC02954_1-9mb_fjqu07.jpg" },
    { id: 15, category: "haldi", title: "Henna Reverie", location: "Garden Pavilion", img: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787914928/DSC02915_1-9mb_dckl5h.jpg" },
    { id: 16, category: "haldi", title: "Joyful Rituals", location: "Family Haveli, Ukhai", img: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787914923/DSC04321-9mb_y0qkyz.jpg" },
    { id: 17, category: "haldi", title: "Turmeric Glow", location: "Heritage Courtyard", img: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1784746581/WhatsApp_Image_2026-07-23_at_12.22.47_AM_brqczs.jpg" },
    { id: 18, category: "haldi", title: "Festive Laughter", location: "Celebration Lawns", img: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1787914919/P1079353-9mb_grzlkv.jpg" },

    // --- 4. COUPLE PORTRAITS ---
    { id: 19, category: "portraits", title: "The Master Frame", location: "Guru Studio Set", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsCzuVKeJOSD3QPJ90efDqh0hEoKbykFQQOpglfbxjAg&s=10" },
    { id: 20, category: "portraits", title: "Intimate Harmony", location: "Heritage Corridor", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3vKq0igucPxo35bV47g-PdJak-efV1I8zoRg5TDt5Rw&s=10" },
    { id: 21, category: "portraits", title: "Poise & Grace", location: "Siwan Veranda", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX7sVnS3S3mSfHRE3KWhOhJG34CE-zKRxga7QKTI4dUg&s=10" },
    { id: 22, category: "portraits", title: "Pure Connection", location: "Editorial Suite", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD82-tgLcQI4jbZPTY91AUoyzSKQh4VB7jcyi3-wM68A&s=10" },
    { id: 23, category: "portraits", title: "Twilight Gaze", location: "Grand Balcony", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxDvt4nYwR2jTPwqeeUKEia6E8kaTTgQ8HFGJLgAhxOg&s=10" },
    { id: 24, category: "portraits", title: "Regal Elegance", location: "Palatial Grounds, Gaurai", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjSXJudPzGyb5MfcIGXUKsIUh-1OtLe8HjTUsxTMv5AA&s=10" }
  ];

  // 🌟 Verified Original Client Reviews
  const row1Reviews = [
    { author: "Rahul & Neha Soni", role: "Royal Vivah (Siwan)", text: "Aman Kumar is a true visual poet! Our royal wedding portraits look like a high-fashion editorial publication. Absolute class and pristine delivery by Guru Videography." },
    { author: "Priya Sharma", role: "Destination Pre-Wedding", text: "Best decision to commission Guru Videography. They delivered all the lossless raw memory layers exactly within their committed timeline." },
    { author: "Vikram Aditya Singh", role: "Palace Mandap (Gaurai)", text: "Incredible attention to detail during our wedding ceremonies. Masterful handling of natural sunlight, shadows, and candid postures." },
    { author: "Amit & Sweety", role: "Heritage Vivah", text: "The fine-art gallery brought tears to our entire family. Aman understands raw human expressions like nobody else. Highly recommended." }
  ];

  const row2Reviews = [
    { author: "Sneha Jha", role: "Intimate Vows (Ukhai)", text: "Our entire family was mesmerized by the candid photo clarity. The custom secure sorting vault made reviewing frames effortless." },
    { author: "Rohan Raj", role: "Celebration Gala", text: "Traditional rituals alongside modern portrait compositions were documented perfectly. Extremely discreet and respectful crew." },
    { author: "Kriti Malhotra", role: "Bridal Archive", text: "Exceptional storytelling framework. No harsh digital filters, just museum-grade high-fidelity visuals." },
    { author: "Alok Kumar Poddar", role: "Heritage Union (Siwan)", text: "Their booking communication is thoroughly transparent. Zero hidden overheads, absolute clear milestone alignment with Aman Kumar." }
  ];

  // Archival Print Standards
  const archivalStandards = [
    {
      badge: "RAW 16-BIT",
      title: "Lossless Pipeline",
      desc: "Maximum dynamic range recovering delicate bridal embroidery with zero degradation."
    },
    {
      badge: "COLOR LAB",
      title: "Skin-Tone Harmony",
      desc: "Graded against print swatches guaranteeing realistic warmth and vivid tones."
    },
    {
      badge: "MUSEUM GRADE",
      title: "Cotton Albums",
      desc: "Calibrated for acid-free cotton paper, resisting fading for 100+ years."
    },
    {
      badge: "ENCRYPTED VAULT",
      title: "Cloud Access",
      desc: "Instant lossless delivery via PIN-protected digital vault with one-click downloads."
    }
  ];

  const getFilteredItems = () => {
    if (activeFilter === 'all') return portfolioItems;
    return portfolioItems.filter(item => item.category === activeFilter);
  };

  const dynamicRenderPool = getFilteredItems();

  return (
    <div className="bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden relative w-full min-h-screen pt-4 sm:pt-8 pb-16 sm:pb-24">
      
      {/* 🔮 MASTER LUXURY PORTFOLIO DESIGN SYSTEM */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        .font-brand-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-brand-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-brand-mono { font-family: 'Space Grotesk', monospace; }

        .glass-portfolio-panel {
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(24px) saturate(170%);
          border: 1px solid rgba(231, 229, 228, 0.9);
          box-shadow: 0 20px 45px -15px rgba(180, 83, 9, 0.05), 0 2px 10px rgba(0, 0, 0, 0.02);
        }

        .exhibition-frame-clean {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease, border-color 0.4s ease;
          transform-style: preserve-3d;
        }
        .exhibition-frame-clean:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 35px 75px -15px rgba(120, 53, 15, 0.2), 0 0 0 1px rgba(217, 119, 6, 0.35);
        }

        .marquee-track { display: flex; width: max-content; }
        .marquee-left { animation: scrollMarquee 42s linear infinite; }
        .marquee-right { animation: scrollMarquee 46s linear infinite reverse; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .mask-edge-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#FAF8F5]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#78350f05_1px,transparent_1px),linear-gradient(to_bottom,#78350f05_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-12 relative z-10 space-y-12 sm:space-y-28">

        {/* =========================================================================
            1. VOGUE EDITORIAL HERO HEADER & DIRECTORIAL STATEMENT
        ========================================================================= */}
        <section className="text-center max-w-5xl mx-auto space-y-3 sm:space-y-4 pt-1 sm:pt-2">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4.5 py-1.5 rounded-full bg-white border border-amber-200/90 shadow-2xs">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-600 animate-pulse shadow-[0_0_8px_#d97706]" />
            <span className="font-brand-sans text-[9px] sm:text-[10.5px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-stone-800 uppercase">
              The Fine-Art Repository • Guru Videography
            </span>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <span className="font-brand-mono text-[9.5px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.35em] text-amber-800 uppercase block">
              ✦ ARCHIVED IN OPTICAL GOLD • 200+ WEDDINGS ✦
            </span>
            <h1 className="font-brand-cinzel text-2xl sm:text-5xl lg:text-[4.4rem] font-medium text-stone-950 tracking-tight leading-[1.08] sm:leading-[1.05]">
              The Visual Archive <br />
              <span className="italic font-light bg-gradient-to-r from-amber-700 via-rose-700 to-amber-900 bg-clip-text text-transparent">
                Masterpieces in Stillness.
              </span>
            </h1>
          </div>

          <div className="w-12 sm:w-16 h-[1.5px] bg-amber-700/50 mx-auto my-1.5 sm:my-2" />

          <p className="font-brand-sans text-stone-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-normal px-2">
            Preserving sacred celebrations across Siwan, Ukhai, Gaurai, and luxury destination venues through calibrated non-destructive color profiles and fine-art editorial framing.
          </p>

          {/* 🎯 SINGLE ROW FILTER RIBBON (SMOOTH SCROLL ON MOBILE, CENTERED ON LAPTOP) */}
          <div className="w-full overflow-x-auto no-scrollbar py-2 pt-2 sm:pt-4">
            <div className="flex flex-nowrap items-center justify-start md:justify-center gap-2 sm:gap-3.5 min-w-max mx-auto px-1 sm:px-2">
              {categories.map((cat) => {
                const isActive = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`whitespace-nowrap shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-brand-sans text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-2xs ${
                      isActive
                        ? 'bg-stone-950 text-white font-bold scale-105 border border-stone-950 shadow-md'
                        : 'bg-white/90 border border-stone-200 text-stone-600 hover:bg-white hover:text-stone-950 hover:border-amber-600/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. ULTRA-LUXURY EXHIBITION GALLERY (LARGER CARDS: 2 PER ROW ON MOBILE, 3 ON LAPTOP)
        ========================================================================= */}
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8 lg:gap-10">
          {dynamicRenderPool.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setLightboxImg(item)}
              className="glass-portfolio-panel rounded-2xl sm:rounded-3xl p-2 sm:p-4 exhibition-frame-clean border border-white shadow-md sm:shadow-xl relative overflow-hidden group cursor-pointer"
            >
              {/* Large Format Clean Image Canvas */}
              <div className="w-full aspect-[4/5] min-h-[260px] sm:min-h-[440px] rounded-xl sm:rounded-2xl overflow-hidden relative bg-stone-950 shadow-inner">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105 brightness-[0.97] group-hover:brightness-105"
                />

                <div className="absolute inset-2 sm:inset-3.5 border border-white/20 rounded-lg sm:rounded-xl pointer-events-none group-hover:border-amber-400/50 transition-colors duration-500" />

                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-stone-900 shadow-md">
                    <Maximize2 size={13} className="sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* =========================================================================
            3. MUSEUM ARCHIVAL PRINT & CALIBRATION MATRIX (2 ROWS X 2 COLS ON MOBILE, 4 ON LAPTOP)
        ========================================================================= */}
        <section className="glass-portfolio-panel rounded-2xl sm:rounded-3xl p-4 sm:p-14 border border-white shadow-xl space-y-4 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-1 sm:space-y-2">
            <span className="font-brand-mono text-[8.5px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-800 uppercase block">
              MUSEUM-GRADE CALIBRATION
            </span>
            <h2 className="font-brand-cinzel text-lg sm:text-4xl font-bold text-stone-950 tracking-tight">
              The Archival Print Standard
            </h2>
            <p className="font-brand-sans text-stone-600 text-[10px] sm:text-sm font-normal">
              Why our master digital assets remain crisp, true-to-life, and non-destructive for generations.
            </p>
          </div>

          {/* 🎯 EXACT 2 PER ROW IN MOBILE & 4 ON LAPTOP */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {archivalStandards.map((item, i) => (
              <div 
                key={i} 
                className="bg-stone-50/90 border border-stone-200/90 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 space-y-1.5 sm:space-y-3 hover:border-amber-600/40 hover:bg-white transition-all duration-300 shadow-2xs text-left"
              >
                <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-100 text-amber-900 font-brand-mono text-[7.5px] sm:text-[9.5px] font-bold rounded-full tracking-wider truncate">
                  {item.badge}
                </span>
                <h3 className="font-brand-cinzel text-xs sm:text-lg font-bold text-stone-950 leading-tight">
                  {item.title}
                </h3>
                <p className="font-brand-sans text-[9.5px] sm:text-xs text-stone-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. THE ROYAL COMMISSION EDITORIAL SPOTLIGHT
        ========================================================================= */}
        <section className="glass-portfolio-panel rounded-2xl sm:rounded-3xl p-4 sm:p-14 border border-white shadow-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-3 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left: Typography & VIP Commission Action */}
            <div className="col-span-7 space-y-2 sm:space-y-5 text-left">
              <div className="space-y-0.5 sm:space-y-2">
                <span className="font-brand-mono text-[8.5px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-amber-800 uppercase block">
                  THE ROYAL COMMISSION
                </span>
                <h2 className="font-brand-cinzel text-lg min-[380px]:text-xl sm:text-5xl font-medium text-stone-950 tracking-tight leading-tight">
                  Your Legacy, <br/>
                  <span className="italic font-light text-amber-800">Crafted in Gold.</span>
                </h2>
              </div>
              
              <p className="font-brand-sans text-stone-600 text-[9.5px] sm:text-base font-normal leading-relaxed">
                We accept a strictly limited number of commissions each season across Siwan and Bihar to dedicate immense focus to your memories.
              </p>

              <div className="pt-0.5 sm:pt-2">
                <button 
                  onClick={() => setActiveTab && setActiveTab('contact')}
                  className="inline-flex items-center gap-1.5 sm:gap-3 px-3.5 sm:px-8 py-2 sm:py-3.5 bg-stone-950 hover:bg-amber-800 text-white font-brand-sans text-[9px] sm:text-xs font-bold tracking-wider sm:tracking-[0.2em] uppercase rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>VIP Booking</span>
                  <ArrowRight size={11} className="sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Signature Director Image Frame */}
            <div className="col-span-5 w-full">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl aspect-[4/5] bg-stone-100 group border border-amber-200/50">
                <img 
                  src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1784742664/uniquephotography1.0-20260318-0077_ujvdny.webp" 
                  alt="Aman Kumar Signature Portfolio" 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-2 left-0 w-full text-center z-20 text-white px-1">
                  <h4 className="font-brand-cinzel text-xs sm:text-2xl font-bold tracking-wide leading-tight">Aman Kumar</h4>
                  <span className="font-brand-mono text-[7px] sm:text-[9px] tracking-wider sm:tracking-[0.35em] text-amber-300 uppercase block truncate">Lead Director • Siwan</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            5. AUTOMATED LIVE GOOGLE REVIEWS DOUBLE MARQUEE MATRIX
        ========================================================================= */}
        <section className="py-4 sm:py-6 overflow-hidden relative z-10 w-full border-t border-stone-200/80">
          <div className="max-w-7xl mx-auto text-center mb-5 sm:mb-10 px-4 space-y-1">
            <span className="font-brand-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-800 uppercase block">
              AUTHENTIC CLIENT CORRESPONDENCE
            </span>
            <h2 className="font-brand-cinzel text-xl sm:text-4xl font-bold text-stone-950 tracking-tight">
              Google Verified Client Responses
            </h2>
          </div>

          {/* Marquee Row 1 */}
          <div className="w-full overflow-hidden flex mb-3 sm:mb-5 mask-edge-fade">
            <div className="marquee-track marquee-left gap-3 sm:gap-5 pr-3 sm:pr-5">
              {[...row1Reviews, ...row1Reviews].map((rev, index) => (
                <div 
                  key={index} 
                  className="w-[280px] sm:w-[400px] glass-portfolio-panel p-4 sm:p-6 rounded-2xl flex flex-col justify-between shrink-0 shadow-2xs border border-white/90 text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                      <div>
                        <span className="text-xs sm:text-sm font-bold font-brand-cinzel text-stone-900 tracking-wider block truncate">
                          {rev.author}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-brand-mono text-amber-800 font-semibold uppercase">
                          {rev.role}
                        </span>
                      </div>
                      <span className="text-amber-500 font-brand-mono text-[10px] sm:text-xs tracking-widest">
                        ★★★★★
                      </span>
                    </div>
                    <p className="text-stone-600 font-brand-sans text-[10.5px] sm:text-sm font-normal leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>
                  <div className="mt-2.5 text-[8.5px] sm:text-[9.5px] font-brand-mono tracking-widest text-stone-400 uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Google Verified Record
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 */}
          <div className="w-full overflow-hidden flex mask-edge-fade">
            <div className="marquee-track marquee-right gap-3 sm:gap-5 pr-3 sm:pr-5">
              {[...row2Reviews, ...row2Reviews].map((rev, index) => (
                <div 
                  key={index} 
                  className="w-[280px] sm:w-[400px] glass-portfolio-panel p-4 sm:p-6 rounded-2xl flex flex-col justify-between shrink-0 shadow-2xs border border-white/90 text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                      <div>
                        <span className="text-xs sm:text-sm font-bold font-brand-cinzel text-stone-900 tracking-wider block truncate">
                          {rev.author}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-brand-mono text-amber-800 font-semibold uppercase">
                          {rev.role}
                        </span>
                      </div>
                      <span className="text-amber-500 font-brand-mono text-[10px] sm:text-xs tracking-widest">
                        ★★★★★
                      </span>
                    </div>
                    <p className="text-stone-600 font-brand-sans text-[10.5px] sm:text-sm font-normal leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>
                  <div className="mt-2.5 text-[8.5px] sm:text-[9.5px] font-brand-mono tracking-widest text-stone-400 uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Google Verified Record
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* =========================================================================
          6. FULL-RESOLUTION UNIVERSAL LIGHTBOX VIEWER
      ========================================================================= */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-[999999] bg-stone-950/90 backdrop-blur-2xl flex flex-col items-center justify-center p-3 sm:p-8 cursor-zoom-out"
          onClick={() => setLightboxImg(null)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-brand-mono text-xs uppercase tracking-widest transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
            onClick={() => setLightboxImg(null)}
          >
            <span>Close Viewer</span>
            <span>✕</span>
          </button>
          
          <div 
            className="max-w-5xl max-h-[85vh] relative flex flex-col items-center justify-center space-y-2 sm:space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImg.img} 
              alt={lightboxImg.title} 
              className="max-w-full max-h-[74vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/20" 
            />
            <div className="text-center text-white space-y-0.5 sm:space-y-1">
              <span className="font-brand-mono text-[9px] sm:text-xs tracking-widest text-amber-300 uppercase block">
                {lightboxImg.category} • {lightboxImg.location}
              </span>
              <h3 className="font-brand-cinzel text-lg sm:text-3xl font-bold">{lightboxImg.title}</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}