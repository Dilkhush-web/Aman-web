import React, { useState, useRef } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Clock, Calendar, Phone, Award, Layers, Camera, Eye, Zap, HeartHandshake } from 'lucide-react';

export default function Services({ setActiveTab }) {
  const formRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFaq, setActiveFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inquiryData, setInquiryData] = useState({
    name: '',
    phone: '',
    address: '',
    eventDate: '',
    serviceType: 'premium-wedding-package',
    guestCount: '300-500'
  });

  const categories = [
    { id: 'all', label: 'All Tariffs' },
    { id: 'wedding', label: 'Wedding Collections' },
    { id: 'destination', label: 'Shoots & Ceremony' },
    { id: 'portrait', label: 'Portraits & Creative' },
    { id: 'commercial', label: 'Commercial & Add-ons' }
  ];

  // Verified Service Tiers
  const officialPackages = [
    // --- 1. WEDDINGS ---
    {
      id: "premium-wedding-package",
      category: "wedding",
      tier: "SIGNATURE PRODUCTION",
      title: "Premium Wedding Package",
      tagline: "Full 4K Film + Archival Album + Drone",
      price: "₹ 69,000",
      advance: "30% Advance Token (₹ 20,700)",
      deliverables: [
        "Full Cinematic 4K Feature Film (25-35 Mins)",
        "Traditional Video Coverage (Full Event Cut)",
        "Premium Handcrafted Photo Album (Archival Prints)",
        "Master High-Resolution Still Photos",
        "4K Drone Aerial Venue Highlights"
      ],
      popular: true
    },
    {
      id: "standard-wedding-package",
      category: "wedding",
      tier: "FULL COVERAGE",
      title: "Standard Wedding Package",
      tagline: "Complete HD Video & Master Stills",
      price: "₹ 41,000",
      advance: "30% Advance Token (₹ 12,300)",
      deliverables: [
        "Full HD Event Video Coverage",
        "Complete Ritual & Stage Stills",
        "Color Corrected Master Photos",
        "Digital Vault Delivery"
      ],
      popular: false
    },
    {
      id: "basic-wedding-package",
      category: "wedding",
      tier: "ESSENTIAL WEDDING",
      title: "Basic Wedding Package",
      tagline: "Essential Ritual Highlights & Stills",
      price: "₹ 31,000",
      advance: "30% Advance Token (₹ 9,300)",
      deliverables: [
        "Full Day Video Recording",
        "High-Resolution Traditional Stills",
        "Standard Color Balance",
        "Digital Cloud Download Link"
      ],
      popular: false
    },

    // --- 2. SHOOTS & CEREMONIES ---
    {
      id: "pre-wedding-jaipur",
      category: "destination",
      tier: "COUTURE SHOOT",
      title: "Pre-Wedding Shoot (Jaipur)",
      tagline: "5 Iconic Locations + Cinematic Teaser",
      price: "₹ 25,000",
      advance: "30% Advance Token (₹ 7,500)",
      deliverables: [
        "4K Cinematic Music Video Teaser (3-4 Mins)",
        "5 Heritage / Scenic Location Coverage",
        "Edited High-Resolution Couple Stills",
        "4K Drone Aerial Vista Shots"
      ],
      popular: true
    },
    {
      id: "post-wedding-jaipur",
      category: "destination",
      tier: "POST-VOWS STORY",
      title: "Post-Wedding Shoot (Jaipur)",
      tagline: "Indoor & Outdoor Scenic Couple Story",
      price: "₹ 25,000",
      advance: "30% Advance Token (₹ 7,500)",
      deliverables: [
        "Edited Music Video Reel",
        "Color-Graded High-Res Stills",
        "Natural Light & Heritage Framing",
        "Digital Master Download"
      ],
      popular: false
    },
    {
      id: "ring-ceremony-premium",
      category: "destination",
      tier: "ENGAGEMENT APEX",
      title: "Ring Ceremony (Premium)",
      tagline: "4K Teaser + Stage & Family Coverage",
      price: "₹ 21,000",
      advance: "30% Advance Token (₹ 6,300)",
      deliverables: [
        "Cinematic Ring Ceremony Teaser",
        "Full Stage & Varmala HD Coverage",
        "Master Retouched Stills",
        "Traditional Event Video Cut"
      ],
      popular: false
    },
    {
      id: "ring-ceremony-standard",
      category: "destination",
      tier: "ENGAGEMENT STANDARD",
      title: "Ring Ceremony (Standard)",
      tagline: "Stage Coverage & Candid Portraits",
      price: "₹ 18,000",
      advance: "30% Advance Token (₹ 5,400)",
      deliverables: [
        "Full Event Video Recording",
        "Edited High-Res Still Photos",
        "Traditional Stage Coverage",
        "Cloud Storage Access"
      ],
      popular: false
    },
    {
      id: "ring-ceremony-basic",
      category: "destination",
      tier: "ENGAGEMENT BASIC",
      title: "Ring Ceremony (Basic)",
      tagline: "Essential Ring Exchange & Stills",
      price: "₹ 14,000",
      advance: "30% Advance Token (₹ 4,200)",
      deliverables: [
        "Full Event Photo Coverage",
        "Standard Highlight Video Recording",
        "Digital Download Link"
      ],
      popular: false
    },
    {
      id: "birthday-shoot",
      category: "destination",
      tier: "CELEBRATIONS",
      title: "Birthday Shoot",
      tagline: "Celebration Highlight & Candid Stills",
      price: "₹ 18,000",
      advance: "30% Advance Token (₹ 5,400)",
      deliverables: [
        "Lively Highlight Video Cut",
        "Candid Still Photography",
        "Family Group Portrayal",
        "Curated Digital Album"
      ],
      popular: false
    },

    // --- 3. PORTRAITURE & CREATIVE ---
    {
      id: "maternity-photoshoot",
      category: "portrait",
      tier: "FINE-ART MATERNITY",
      title: "Maternity Photoshoot",
      tagline: "Indoor / Outdoor Lighting & Stills",
      price: "₹ 15,000",
      advance: "30% Advance Token (₹ 4,500)",
      deliverables: [
        "All Edited Master Still Photos",
        "Custom Warm Color Grading",
        "Studio / Outdoor Lighting Direction",
        "Lossless High-Resolution Files"
      ],
      popular: false
    },
    {
      id: "portfolio-photoshoot",
      category: "portrait",
      tier: "EDITORIAL MODEL",
      title: "Portfolio Photoshoot",
      tagline: "Model / Actor / Influencer Set",
      price: "₹ 15,000",
      advance: "30% Advance Token (₹ 4,500)",
      deliverables: [
        "Master Retouched High-Fashion Prints",
        "Multi-Outfit Framing & Posing Direction",
        "Digital Master Folder Access"
      ],
      popular: false
    },
    {
      id: "baby-photoshoot",
      category: "portrait",
      tier: "THEME CONCEPTS",
      title: "Baby Photoshoot",
      tagline: "Theme Based Concepts & Props",
      price: "₹ 14,000",
      advance: "30% Advance Token (₹ 4,200)",
      deliverables: [
        "All Edited High-Resolution Photos",
        "Creative Studio Props Setup",
        "Ambient Gentle Lighting",
        "Digital Keepsake Archive"
      ],
      popular: false
    },

    // --- 4. COMMERCIAL & ADD-ONS ---
    {
      id: "corporate-event-coverage",
      category: "commercial",
      tier: "COMMERCIAL MEDIA",
      title: "Corporate Event Coverage",
      tagline: "Conference & Stage Keynote Media",
      price: "₹ 30,000",
      advance: "30% Advance Token (₹ 9,000)",
      deliverables: [
        "High-Res Event Stills",
        "Edited Corporate Highlight Film",
        "Stage Keynote & Guest Media",
        "Fast-Track Milestone Delivery"
      ],
      popular: false
    },
    {
      id: "product-photography",
      category: "commercial",
      tier: "E-COMMERCE CATALOG",
      title: "Product Photography",
      tagline: "E-Commerce Catalog & Clean Angles",
      price: "₹ 10,000",
      unit: "Per Product",
      advance: "30% Advance Token (₹ 3,000)",
      deliverables: [
        "Clean White Background Angles",
        "Creative Lifestyle Framing",
        "Web-Ready High-Res Exports"
      ],
      popular: false
    },
    {
      id: "drone-shoot",
      category: "commercial",
      tier: "AERIAL CINEMA",
      title: "Drone Shoot Unit",
      tagline: "Baraat & Palace Bird-Eye Capture",
      price: "₹ 5,000",
      unit: "Per Session",
      advance: "30% Advance Token (₹ 1,500)",
      deliverables: [
        "4K ProRes Aerial Capture",
        "Baraat & Venue Establishing Shots",
        "Integrated Master Film Color Grading"
      ],
      popular: false
    }
  ];

  // Directorial Distinction Values
  const directorialEdge = [
    {
      icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0" />,
      title: "Directorial Restraint & Pure Flow",
      desc: "Quiet discretion without demanding repeat takes or staged poses."
    },
    {
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0" />,
      title: "Organic 16-Bit RAW Color Grading",
      desc: "Hand-graded in DaVinci Resolve ensuring true gold & skin warmth."
    },
    {
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0" />,
      title: "Milestone-Backed Delivery",
      desc: "Teasers in 7 days and master 4K films via PIN-secured Client Vault."
    },
    {
      icon: <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0" />,
      title: "200+ Families & 10+ Years Trust",
      desc: "100% word-of-mouth satisfaction across Siwan, Bihar, and Jaipur."
    }
  ];

  const studioRules = [
    {
      rule: "01",
      title: "30% Advance Confirmation",
      desc: "Booking is locked strictly after receiving a 30% advance payment via UPI or Bank transfer."
    },
    {
      rule: "02",
      title: "Payment Clearance",
      desc: "Remaining balance payment must be cleared prior to final high-resolution delivery."
    },
    {
      rule: "03",
      title: "60 Days RAW Storage",
      desc: "Client RAW data is preserved in studio backup vaults for 60 days from event completion."
    },
    {
      rule: "04",
      title: "Permanent Archival Policy",
      desc: "After 60 days, raw files are cleared. Revisions post-delivery are chargeable."
    }
  ];

  const studioFaqs = [
    {
      q: "What is the advance booking token requirement?",
      a: "Dates are reserved strictly upon receipt of a 30% advance payment. Balance settlement occurs prior to master asset release."
    },
    {
      q: "How long are our raw wedding files stored in the studio vault?",
      a: "All raw footage and full-resolution still photos are safely maintained for 60 days in our digital repository for your selection."
    },
    {
      q: "Do you travel outside Siwan for destination weddings?",
      a: "Yes. Guru Videography regularly travels across Bihar, Patna, Jaipur, Varanasi, and destination circuits across India."
    },
    {
      q: "Who directs and color grades the final films?",
      a: "Principal Director Aman Kumar personally directs the core crew on-site and color-grades every film in DaVinci Resolve."
    }
  ];

  const filteredPackages = activeCategory === 'all' 
    ? officialPackages 
    : officialPackages.filter(pkg => pkg.category === activeCategory);

  const handleSelectPackage = (pkgId) => {
    setInquiryData(prev => ({ ...prev, serviceType: pkgId }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://aman-web-nuwa.onrender.com';

      const response = await fetch(`${backendUrl}/api/bookings/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryData.name,
          phone: inquiryData.phone,
          address: inquiryData.address,
          eventDate: inquiryData.eventDate,
          serviceType: inquiryData.serviceType,
          guestCount: inquiryData.guestCount,
          status: 'New Lead'
        })
      });

      const data = await response.json();

      if (response.ok || data.success) {
        alert(`✨ INQUIRY RESERVED!\nOur team will connect with ${inquiryData.name} shortly.`);
        setInquiryData({
          name: '',
          phone: '',
          address: '',
          eventDate: '',
          serviceType: 'premium-wedding-package',
          guestCount: '300-500'
        });
      } else {
        alert("✨ Inquiry recorded! We will connect with you soon.");
      }
    } catch (error) {
      alert("✨ Inquiry recorded! Our studio team will reach out directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 font-sans tracking-tight relative overflow-hidden min-h-screen pt-4 sm:pt-8 pb-16 sm:pb-24 selection:bg-amber-100 selection:text-amber-900">
      
      {/* 🔮 MASTER LUXURY STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .font-brand-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-brand-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-brand-mono { font-family: 'Space Grotesk', monospace; }

        .glass-clean-tariff {
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(231, 229, 228, 0.9);
          box-shadow: 0 15px 35px -10px rgba(120, 53, 15, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-clean-tariff:hover {
          transform: translateY(-4px);
          border-color: rgba(217, 119, 6, 0.5);
          box-shadow: 0 25px 50px -12px rgba(120, 53, 15, 0.12), 0 0 0 1px rgba(217, 119, 6, 0.25);
        }

        .input-clean-field {
          background: #ffffff;
          border: 1px solid rgba(214, 211, 209, 0.9);
          color: #1c1917;
          transition: all 0.25s ease;
        }
        .input-clean-field:focus {
          border-color: #b45309;
          box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.12);
        }

        .director-tall-card {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
          transform-style: preserve-3d;
        }
        .director-tall-card:hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 35px 70px -15px rgba(120, 53, 15, 0.22), 0 0 0 1px rgba(217, 119, 6, 0.35);
        }
      `}</style>

      {/* Subtle Background Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#FAF8F5]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#78350f05_1px,transparent_1px),linear-gradient(to_bottom,#78350f05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-12 relative z-10 space-y-12 sm:space-y-28">

        {/* =========================================================================
            1. HERO SECTION & INTEGRATED RESERVATION FORM
        ========================================================================= */}
        <div ref={formRef} className="pt-1 sm:pt-4">
          <div className="grid grid-cols-12 gap-3 sm:gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading & Trust */}
            <div className="col-span-12 lg:col-span-6 space-y-3 sm:space-y-5 text-left">
              
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white border border-amber-200/90 shadow-2xs">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-600 animate-pulse shadow-[0_0_8px_#d97706]" />
                <span className="font-brand-sans text-[8.5px] sm:text-[10.5px] font-bold tracking-[0.2em] sm:tracking-[0.25em] text-stone-800 uppercase">
                  Official Rate Card • Guru Videography
                </span>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h1 className="font-brand-cinzel text-2xl sm:text-6xl lg:text-[4.4rem] font-medium text-stone-950 tracking-tight leading-[1.08] sm:leading-[1.04]">
                  Our Services
                </h1>
                <h2 className="font-brand-cinzel text-xl sm:text-5xl lg:text-[3.5rem] font-light italic bg-gradient-to-r from-amber-700 via-rose-700 to-amber-900 bg-clip-text text-transparent leading-[1.08]">
                  & Transparent Tariffs
                </h2>
              </div>
              
              <p className="font-brand-sans text-stone-600 text-xs sm:text-base tracking-wide max-w-xl leading-relaxed font-normal">
                Capturing memories forever with high-end cinema equipment, professional direction by Aman Kumar, and guaranteed on-time delivery across Bihar & Jaipur.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 sm:gap-5 pt-2 sm:pt-3 border-t border-stone-200/80">
                <div>
                  <span className="font-brand-cinzel text-base sm:text-3xl font-bold text-stone-900 block">30%</span>
                  <span className="font-brand-sans text-[8.5px] sm:text-[10px] uppercase tracking-wider text-stone-500 block mt-0.5 font-semibold">Advance Token</span>
                </div>
                <div>
                  <span className="font-brand-cinzel text-base sm:text-3xl font-bold text-amber-800 block">60 Days</span>
                  <span className="font-brand-sans text-[8.5px] sm:text-[10px] uppercase tracking-wider text-stone-500 block mt-0.5 font-semibold">RAW Vault</span>
                </div>
                <div>
                  <span className="font-brand-cinzel text-base sm:text-3xl font-bold text-stone-900 block">100%</span>
                  <span className="font-brand-sans text-[8.5px] sm:text-[10px] uppercase tracking-wider text-stone-500 block mt-0.5 font-semibold">Satisfied</span>
                </div>
              </div>

            </div>

            {/* Right Column: Clean Reservation Form */}
            <div className="col-span-12 lg:col-span-6 w-full">
              <div className="glass-clean-tariff rounded-2xl sm:rounded-3xl p-4 sm:p-9 border border-white shadow-xl sm:shadow-2xl relative overflow-hidden">
                
                <div className="text-center space-y-0.5 sm:space-y-1 pb-3 sm:pb-4 border-b border-stone-200/70 mb-3 sm:mb-5">
                  <span className="text-amber-800 font-brand-mono text-[8.5px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.35em] uppercase block font-bold">
                    [DATE RESERVATION]
                  </span>
                  <h3 className="font-brand-cinzel text-lg sm:text-3xl font-bold text-stone-900 tracking-wide">
                    Request Studio Availability
                  </h3>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-2.5 sm:space-y-3.5 font-brand-sans text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                    <div className="space-y-0.5 sm:space-y-1 text-left">
                      <label className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-600">Client Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Anand Sharma"
                        value={inquiryData.name} 
                        onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})}
                        className="w-full input-clean-field rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-stone-900 placeholder-stone-400 outline-none text-xs"
                      />
                    </div>
                    
                    <div className="space-y-0.5 sm:space-y-1 text-left">
                      <label className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-600">Phone / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 8434656386"
                        value={inquiryData.phone} 
                        onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})}
                        className="w-full input-clean-field rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-stone-900 placeholder-stone-400 outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                    <div className="space-y-0.5 sm:space-y-1 text-left">
                      <label className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-600">Event Location / City *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Siwan / Jaipur"
                        value={inquiryData.address} 
                        onChange={(e) => setInquiryData({...inquiryData, address: e.target.value})}
                        className="w-full input-clean-field rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-stone-900 placeholder-stone-400 outline-none text-xs"
                      />
                    </div>
                    
                    <div className="space-y-0.5 sm:space-y-1 text-left">
                      <label className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-600">Event Date *</label>
                      <input 
                        type="date" 
                        required
                        value={inquiryData.eventDate} 
                        onChange={(e) => setInquiryData({...inquiryData, eventDate: e.target.value})}
                        className="w-full input-clean-field rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-stone-900 outline-none cursor-pointer text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5 sm:space-y-1 text-left">
                    <label className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-600">Selected Package</label>
                    <div className="relative">
                      <select 
                        required 
                        value={inquiryData.serviceType} 
                        onChange={(e) => setInquiryData({...inquiryData, serviceType: e.target.value})}
                        className="w-full input-clean-field rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-stone-900 outline-none appearance-none cursor-pointer font-medium text-xs"
                      >
                        {officialPackages.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.title} ({pkg.price}{pkg.unit ? ` ${pkg.unit}` : ''})
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-amber-800 text-xs">▼</div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-stone-950 hover:bg-amber-800 text-white font-brand-sans font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase py-3 sm:py-3.5 mt-1 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 text-xs"
                  >
                    {isSubmitting ? "Locking Dates..." : "Reserve Priority Date ✦"}
                  </button>

                </form>

              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            🌟 2. DIRECTOR SPOTLIGHT & VALUE CARDS (2 ROWS X 2 COLS)
        ========================================================================= */}
        <section className="glass-clean-tariff rounded-2xl sm:rounded-3xl p-4 sm:p-12 lg:p-14 border border-white shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-12 gap-3 sm:gap-10 lg:gap-14 items-center">
            
            {/* Left: Single Grand High-Impact Tall Image */}
            <div className="col-span-12 lg:col-span-5 w-full max-w-[340px] sm:max-w-[420px] mx-auto">
              <div className="director-tall-card relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-950 border-2 border-amber-200/60 shadow-xl group">
                
                <img 
                  src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787200596/B27718D4-6C3E-4625-A538-B422E1FAB16A_bi6gx6.png" 
                  alt="Aman Kumar - Lead Director & Artist" 
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.97] group-hover:brightness-105"
                />

                <div className="absolute inset-2 sm:inset-4 border border-white/20 rounded-xl sm:rounded-2xl pointer-events-none group-hover:border-amber-400/50 transition-colors duration-500" />
                
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20">
                  <span className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 bg-stone-950/85 backdrop-blur-md rounded-full font-brand-mono text-[8px] sm:text-[9.5px] font-bold text-amber-300 uppercase tracking-widest border border-white/10 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Principal Filmmaker
                  </span>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/95 via-stone-950/35 to-transparent p-3 sm:p-6 text-white text-left">
                  <span className="font-brand-mono text-[8px] sm:text-[10px] uppercase tracking-widest text-amber-400 font-bold block mb-0.5 truncate">
                    GURU VIDEOGRAPHY • SIWAN
                  </span>
                  <h4 className="font-brand-cinzel text-base sm:text-2xl font-bold truncate">
                    Aman Kumar
                  </h4>
                  <p className="font-brand-sans text-[10px] sm:text-xs text-stone-300 font-light mt-0.5 truncate">
                    Master of Light & Directorial Restraint
                  </p>
                </div>

              </div>
            </div>

            {/* Right: 4 Value Cards in 2 Rows x 2 Cols */}
            <div className="col-span-12 lg:col-span-7 space-y-3 sm:space-y-5 text-left">
              
              <div className="space-y-0.5 sm:space-y-1.5">
                <div className="inline-flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-700" />
                  <span className="font-brand-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-800 uppercase">
                    DIRECTORIAL DISTINCTION
                  </span>
                </div>
                <h2 className="font-brand-cinzel text-lg sm:text-4xl font-bold text-stone-950 tracking-tight leading-tight">
                  Why Commission <br />
                  <span className="italic font-light text-amber-800">Aman Kumar & Crew?</span>
                </h2>
                <p className="font-brand-sans text-stone-600 text-[10.5px] sm:text-sm leading-relaxed">
                  We craft timeless family heirlooms that maintain optical brilliance, emotional depth, and archival longevity.
                </p>
              </div>

              {/* 🎯 2 ROWS X 2 COLUMNS OF VALUE CARDS */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pt-1">
                {directorialEdge.map((edge, idx) => (
                  <div 
                    key={idx} 
                    className="bg-stone-50/90 border border-stone-200/90 rounded-xl sm:rounded-2xl p-3 sm:p-4.5 space-y-1 sm:space-y-2 hover:bg-white hover:border-amber-400 transition-all duration-300 shadow-2xs"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-amber-100/80 flex items-center justify-center">
                      {edge.icon}
                    </div>
                    <h4 className="font-brand-cinzel text-xs sm:text-sm font-bold text-stone-950 leading-tight">
                      {edge.title}
                    </h4>
                    <p className="font-brand-sans text-[9.5px] sm:text-[11.5px] text-stone-600 leading-relaxed font-normal">
                      {edge.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-200/80 flex-wrap gap-2">
                <div className="text-left">
                  <span className="font-brand-mono text-[8.5px] sm:text-[10px] text-stone-500 uppercase font-bold block truncate">Hospital Road City Cart, Ukhai</span>
                  <span className="font-brand-cinzel text-xs sm:text-sm font-bold text-stone-900 truncate">+91 8434656386</span>
                </div>
                <button
                  onClick={() => {
                    if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-stone-950 hover:bg-amber-800 text-white font-brand-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
                >
                  Reserve Date With Aman →
                </button>
              </div>

            </div>

          </div>

        </section>

        {/* =========================================================================
            3. ALL SERVICES & TARIFF TIERS (EXACT 2 CARDS PER ROW - CLEAN & BALANCED)
        ========================================================================= */}
        <div className="space-y-6 sm:space-y-10">
          
          {/* Header & Filter Ribbon */}
          <div className="text-center space-y-2.5 sm:space-y-4 max-w-3xl mx-auto">
            <div className="space-y-1">
              <span className="font-brand-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-800 uppercase block">
                OFFICIAL RATE DIRECTORY
              </span>
              <h2 className="font-brand-cinzel text-xl sm:text-5xl font-medium text-stone-950 tracking-tight">
                All Services & Tariff Tiers
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="w-full overflow-x-auto no-scrollbar py-1">
              <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-1.5 sm:gap-2 min-w-max sm:min-w-0 mx-auto px-1">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`whitespace-nowrap px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-brand-sans text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? 'bg-stone-950 text-white shadow-sm border border-stone-950' 
                          : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 🎯 EXACT 2 SERVICES PER ROW (MOBILE, TABLET & DESKTOP BALANCED) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            {filteredPackages.map((service) => (
              <div 
                key={service.id}
                className={`glass-clean-tariff rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between text-left relative group ${
                  service.popular ? 'border-amber-300/80 ring-1 ring-amber-400/30' : 'border-stone-200/90'
                }`}
              >
                <div className="space-y-3 sm:space-y-4">
                  
                  {/* Tier Badge & Price Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <span className="inline-block px-2.5 sm:px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-full font-brand-mono text-[8px] sm:text-[9.5px] font-bold tracking-wider uppercase truncate">
                      {service.tier}
                    </span>
                    {service.popular && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-brand-mono text-[8px] font-bold uppercase tracking-wider">
                        POPULAR
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="font-brand-cinzel text-base sm:text-xl font-bold text-stone-950 leading-snug group-hover:text-amber-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-brand-sans text-xs text-amber-800 font-medium">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Clean Price Card */}
                  <div className="bg-stone-50/90 border border-stone-200/80 p-3 sm:p-4 rounded-xl space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="font-brand-cinzel text-2xl sm:text-3xl font-bold text-stone-950">
                        {service.price}
                      </span>
                      {service.unit && (
                        <span className="font-brand-mono text-xs text-stone-500 font-semibold">
                          {service.unit}
                        </span>
                      )}
                    </div>
                    <span className="font-brand-mono text-[9.5px] sm:text-[10px] text-emerald-800 font-bold tracking-wider uppercase block">
                      {service.advance}
                    </span>
                  </div>

                  {/* Deliverables Checkmarks */}
                  <div className="space-y-1.5 pt-1">
                    <span className="font-brand-mono text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider text-stone-400 block">
                      What's Included:
                    </span>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-brand-sans font-medium leading-relaxed">
                          <span className="w-3.5 h-3.5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom Action CTA */}
                <div className="pt-4 mt-4 border-t border-stone-100">
                  <button
                    onClick={() => handleSelectPackage(service.id)}
                    className="w-full py-2.5 sm:py-3 rounded-xl bg-stone-950 hover:bg-amber-800 text-white font-brand-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Inquire For This Tariff</span>
                    <ArrowRight size={13} className="shrink-0" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            4. IMPORTANT RULES & POLICIES (2 ROWS X 2 COLUMNS ON MOBILE, 4 ON LAPTOP)
        ========================================================================= */}
        <div className="glass-clean-tariff rounded-2xl sm:rounded-3xl p-4 sm:p-14 border border-white shadow-xl space-y-4 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-1 sm:space-y-2">
            <span className="font-brand-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] text-amber-800 uppercase block">
              STUDIO TERMS & POLICIES
            </span>
            <h2 className="font-brand-cinzel text-xl sm:text-4xl font-medium text-stone-950 tracking-tight">
              Important Rules & Information
            </h2>
            <p className="font-brand-sans text-stone-600 text-[10px] sm:text-sm font-normal">
              Clear and transparent booking guidelines to ensure smooth production and seamless delivery.
            </p>
          </div>

          {/* 🎯 2 ROWS X 2 COLS ON MOBILE & 4 ON LAPTOP */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {studioRules.map((item, i) => (
              <div 
                key={i}
                className="bg-stone-50 border border-stone-200/90 rounded-xl sm:rounded-2xl p-3 sm:p-6 space-y-1.5 sm:space-y-3 hover:border-amber-600/40 hover:bg-white transition-all duration-300 shadow-2xs text-left"
              >
                <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-100/80 text-amber-900 font-brand-mono text-[7.5px] sm:text-[9px] font-bold rounded-full tracking-wider">
                  RULE {item.rule}
                </span>
                <h3 className="font-brand-cinzel text-xs sm:text-base font-bold text-stone-950 leading-tight">
                  {item.title}
                </h3>
                <p className="font-brand-sans text-[9px] sm:text-xs text-stone-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            5. DIRECTORIAL FAQ ACCORDION
        ========================================================================= */}
        <div className="glass-clean-tariff rounded-2xl sm:rounded-3xl p-4 sm:p-12 border border-white shadow-xl space-y-4 sm:space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1 sm:space-y-2">
            <span className="font-brand-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] text-amber-800 uppercase block">
              DIRECT INQUIRIES
            </span>
            <h2 className="font-brand-cinzel text-xl sm:text-4xl font-medium text-stone-950 tracking-tight">
              Frequently Clarified Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-2.5 sm:space-y-4">
            {studioFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="bg-stone-50 border border-stone-200/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 cursor-pointer transition-colors hover:border-amber-600/40 text-left shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <h4 className="font-brand-cinzel text-xs sm:text-base font-bold text-stone-900">
                      {faq.q}
                    </h4>
                    <span className="font-brand-mono text-xs sm:text-sm text-amber-800 font-bold shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  {isOpen && (
                    <p className="font-brand-sans text-[10.5px] sm:text-xs text-stone-600 leading-relaxed pt-2 sm:pt-3 border-t border-stone-200/60 mt-2 sm:mt-3 font-normal">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}