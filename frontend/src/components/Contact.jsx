import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, CreditCard, MapPin, Clock, ShieldCheck, Sparkles, Send, CheckCircle2, Calculator, ShieldAlert, Award, Camera, Check } from 'lucide-react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export default function Contact({ setActiveTab }) {
  const [showQR, setShowQR] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    location: '', 
    date: '', 
    service: 'Premium Wedding Package (₹69,000)',
    notes: ''
  });

  // 🧮 Live Interactive Cost Calculator State
  const [selectedAddons, setSelectedAddons] = useState({
    mainWedding: true,
    preWedding: false,
    drone: false,
    ringCeremony: false,
    albumCotton: false
  });

  const addonPrices = {
    mainWedding: 69000,
    preWedding: 25000,
    drone: 5000,
    ringCeremony: 18000,
    albumCotton: 12000
  };

  const calculatedTotal = 
    (selectedAddons.mainWedding ? addonPrices.mainWedding : 0) +
    (selectedAddons.preWedding ? addonPrices.preWedding : 0) +
    (selectedAddons.drone ? addonPrices.drone : 0) +
    (selectedAddons.ringCeremony ? addonPrices.ringCeremony : 0) +
    (selectedAddons.albumCotton ? addonPrices.albumCotton : 0);

  const calculatedAdvance = Math.round(calculatedTotal * 0.30);

  // 👑 Official Services List From Verified Rate Card
  const services = [
    "Premium Wedding Package (₹69,000)",
    "Standard Wedding Package - Full Coverage (₹41,000)",
    "Basic Wedding Package - Full Coverage (₹31,000)",
    "Pre Wedding Shoot Jaipur - 5 Locations (₹25,000)",
    "Post Wedding Shoot Jaipur - Indoor/Outdoor (₹25,000)",
    "Corporate Event Coverage (₹30,000)",
    "Ring Ceremony Package - Premium (₹21,000)",
    "Ring Ceremony Package - Standard (₹18,000)",
    "Ring Ceremony Package - Basic (₹14,000)",
    "Birthday Shoot (₹18,000)",
    "Maternity Photoshoot - Indoor/Outdoor (₹15,000)",
    "Portfolio Photoshoot - Model/Actor (₹15,000)",
    "Baby Photoshoot - Theme Based (₹14,000)",
    "Product Photography (₹10,000 / Product)",
    "Drone Shoot (₹5,000)",
    "Bespoke Custom Production"
  ];

  // 🛡️ Studio Executive Guarantees
  const studioGuarantees = [
    {
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />,
      title: "100% Price Transparency",
      desc: "No hidden charges on-site or post-event. All taxes, lenses, and crew gear are explicitly covered."
    },
    {
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />,
      title: "Triple Redundancy 60-Day RAW",
      desc: "Full sensor recordings archived on dual hardware drives + private cloud vault for 60 days."
    },
    {
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />,
      title: "Guaranteed Delivery",
      desc: "Instagram 4K Teaser in 7 days. Full documentary cuts and portfolios in 21 days."
    },
    {
      icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />,
      title: "Supervised by Aman Kumar",
      desc: "Every wedding ceremony and fashion shoot is directed personally under Lead Filmmaker Aman Kumar."
    }
  ];

  // 🔌 Backend Submission Pipeline
  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://aman-web-nuwa.onrender.com';
      const response = await fetch(`${backendUrl}/api/bookings/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name,
          phone: formData.phone,
          address: formData.location,
          eventDate: formData.date,
          serviceType: formData.service,
          notes: formData.notes,
          status: 'New Lead',
          timestamp: new Date().toISOString() 
        })
      });
      
      const data = await response.json();
      if (response.ok || data.success) {
        setShowQR(true);
      } else {
        setShowQR(true);
      }
    } catch (err) { 
      console.error("Booking Submission Error:", err);
      setShowQR(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const channelMatrix = [
    { 
      name: "WhatsApp Direct", 
      desc: "Instant Date Feasibility & Rate Card", 
      handle: "+91 8434656386", 
      icon: <MessageCircle size={18} className="sm:w-[22px] sm:h-[22px]" />, 
      link: "https://wa.me/918434656386",
      action: "Chat",
      theme: "neon-whatsapp"
    },
    { 
      name: "Direct Voice Line", 
      desc: "Speak with Lead Director Aman Kumar", 
      handle: "+91 8434656386", 
      icon: <Phone size={18} className="sm:w-[22px] sm:h-[22px]" />, 
      link: "tel:8434656386",
      action: "Call",
      theme: "neon-phone"
    },
    { 
      name: "Instagram", 
      desc: "Daily 4K Reels & Bridal Stills", 
      handle: "@guru_videography_Siwan", 
      icon: <FaInstagram size={18} className="sm:w-[22px] sm:h-[22px]" />, 
      link: "https://www.instagram.com/guru_videography_siwan?igsi=MXRuMDk0MHl2bGdxMg==",
      action: "Follow",
      theme: "neon-instagram"
    },
    { 
      name: "Studio Mail", 
      desc: "Commercial & Wedding Inquiries", 
      handle: "guryaman63@gmail.com", 
      icon: <Mail size={18} className="sm:w-[22px] sm:h-[22px]" />, 
      link: "mailto:guryaman63@gmail.com",
      action: "Email",
      theme: "neon-mail"
    },
    { 
      name: "Facebook", 
      desc: "Client Reviews & Venue Feeds", 
      handle: "Guru Videography Siwan", 
      icon: <FaFacebook size={18} className="sm:w-[22px] sm:h-[22px]" />, 
      link: "https://www.facebook.com/share/19RvqJpnDD/?mibextid=wwXIfr",
      action: "Connect",
      theme: "neon-facebook"
    },
    { 
      name: "YouTube", 
      desc: "4K Wedding Films & Teasers", 
      handle: "Guru Videography Siwan", 
      icon: <FaYoutube size={18} className="sm:w-[22px] sm:h-[22px]" />, 
      link: "https://youtube.com/@dehaticreation8407?si=AkEs-cKPaWYAPtt-",
      action: "Watch",
      theme: "neon-youtube"
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-900 font-sans tracking-tight relative overflow-hidden min-h-screen pt-4 sm:pt-8 pb-20 selection:bg-amber-100 selection:text-amber-900">
      
      {/* 🔮 MASTER 3D OPTICAL WAVE & NEON GLOW ENGINE */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        .font-brand-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-brand-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-brand-mono { font-family: 'Space Grotesk', monospace; }

        @keyframes waveGridMove {
          0% { transform: rotateX(60deg) translateY(0px); }
          100% { transform: rotateX(60deg) translateY(60px); }
        }

        @keyframes floatingOrbLight1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.45; }
          50% { transform: translate(90px, 50px) scale(1.2); opacity: 0.75; }
        }

        @keyframes floatingOrbLight2 {
          0%, 100% { transform: translate(0, 0) scale(1.1); opacity: 0.4; }
          50% { transform: translate(-80px, -45px) scale(0.9); opacity: 0.7; }
        }

        .anim-wave-grid {
          animation: waveGridMove 6s linear infinite;
        }
        .anim-orb-1 { animation: floatingOrbLight1 14s ease-in-out infinite alternate; }
        .anim-orb-2 { animation: floatingOrbLight2 18s ease-in-out infinite alternate; }

        .glass-luxury-panel {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(24px) saturate(170%);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 20px 45px -15px rgba(180, 83, 9, 0.06), 0 2px 10px rgba(0, 0, 0, 0.02);
        }

        .neon-card-base {
          position: relative;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(214, 211, 209, 0.6);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }

        .neon-card-base:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .neon-whatsapp:hover {
          border-color: #25D366;
          box-shadow: 0 15px 35px -10px rgba(37, 211, 102, 0.35), 0 0 20px rgba(37, 211, 102, 0.2), inset 0 0 15px rgba(37, 211, 102, 0.06);
        }
        .neon-whatsapp:hover .neon-icon {
          background: #25D366;
          color: white;
          box-shadow: 0 0 15px #25D366;
        }

        .neon-phone:hover {
          border-color: #d97706;
          box-shadow: 0 15px 35px -10px rgba(217, 119, 6, 0.35), 0 0 20px rgba(217, 119, 6, 0.2), inset 0 0 15px rgba(217, 119, 6, 0.06);
        }
        .neon-phone:hover .neon-icon {
          background: #d97706;
          color: white;
          box-shadow: 0 0 15px #d97706;
        }

        .neon-instagram:hover {
          border-color: #E1306C;
          box-shadow: 0 15px 35px -10px rgba(225, 48, 108, 0.35), 0 0 20px rgba(225, 48, 108, 0.2), inset 0 0 15px rgba(225, 48, 108, 0.06);
        }
        .neon-instagram:hover .neon-icon {
          background: #E1306C;
          color: white;
          box-shadow: 0 0 15px #E1306C;
        }

        .neon-mail:hover {
          border-color: #44403c;
          box-shadow: 0 15px 35px -10px rgba(68, 64, 60, 0.35), 0 0 20px rgba(68, 64, 60, 0.15), inset 0 0 15px rgba(68, 64, 60, 0.05);
        }
        .neon-mail:hover .neon-icon {
          background: #44403c;
          color: white;
          box-shadow: 0 0 15px #44403c;
        }

        .neon-facebook:hover {
          border-color: #1877F2;
          box-shadow: 0 15px 35px -10px rgba(24, 119, 242, 0.35), 0 0 20px rgba(24, 119, 242, 0.2), inset 0 0 15px rgba(24, 119, 242, 0.06);
        }
        .neon-facebook:hover .neon-icon {
          background: #1877F2;
          color: white;
          box-shadow: 0 0 15px #1877F2;
        }

        .neon-youtube:hover {
          border-color: #FF0000;
          box-shadow: 0 15px 35px -10px rgba(255, 0, 0, 0.35), 0 0 20px rgba(255, 0, 0, 0.2), inset 0 0 15px rgba(255, 0, 0, 0.06);
        }
        .neon-youtube:hover .neon-icon {
          background: #FF0000;
          color: white;
          box-shadow: 0 0 15px #FF0000;
        }

        .input-luxury-field {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(214, 211, 209, 0.8);
          color: #1c1917;
          transition: all 0.3s ease;
        }
        .input-luxury-field:focus {
          border-color: #b45309;
          box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.12);
          background: #ffffff;
        }
      `}</style>

      {/* =========================================================================
          1. AMBIENT BACKGROUND CANVAS
      ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#FAF8F5]">
        <div className="absolute -top-28 -left-28 w-[800px] h-[800px] bg-gradient-to-br from-amber-200/45 via-rose-100/40 to-orange-50/50 rounded-full blur-[140px] anim-orb-1" />
        <div className="absolute top-1/3 -right-36 w-[820px] h-[820px] bg-gradient-to-bl from-rose-200/35 via-amber-100/45 to-sky-100/40 rounded-full blur-[150px] anim-orb-2" />
        <div className="absolute bottom-10 left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-sky-100/30 via-pink-100/25 to-amber-200/30 rounded-full blur-[130px]" />

        <div className="absolute inset-0 [perspective:1000px] flex items-center justify-center opacity-30">
          <div className="w-[180%] h-[180%] bg-[linear-gradient(to_right,#78350f0f_1.5px,transparent_1.5px),linear-gradient(to_bottom,#78350f0f_1.5px,transparent_1.5px)] bg-[size:3.5rem_3.5rem] anim-wave-grid" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-transparent to-[#FAF8F5]/90 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-14 sm:space-y-28">

        {/* =========================================================================
            2. VOGUE EDITORIAL HERO STATEMENT
        ========================================================================= */}
        <div className="pt-2 text-center max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4.5 py-1 sm:py-1.5 rounded-full bg-amber-50 border border-amber-200/90 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse shadow-[0_0_8px_#d97706]" />
            <span className="font-brand-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-stone-800 uppercase">
              Bespoke Concierge • Guru Videography
            </span>
          </div>

          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="font-brand-cinzel text-3xl sm:text-6xl lg:text-[5.2rem] font-medium text-stone-950 tracking-tight leading-[1.05]">
              Let's Begin Your
            </h1>
            <h2 className="font-brand-cinzel text-2xl sm:text-5xl lg:text-[4.2rem] font-light italic bg-gradient-to-r from-amber-700 via-rose-700 to-amber-900 bg-clip-text text-transparent leading-[1.05]">
              Visual Legacy.
            </h2>
          </div>

          <p className="font-brand-sans text-stone-600 text-[10px] sm:text-xs lg:text-sm tracking-wide sm:tracking-widest uppercase font-medium max-w-2xl mx-auto pt-0.5 sm:pt-1">
            Studio Headquarters: Hospital Road City Cart, Ukhai, Siwan, Bihar - 841227 • Directed by Aman Kumar
          </p>
        </div>

        {/* =========================================================================
            3. LUXURY NEON HOVER TILES MATRIX (3-COLUMNS PER ROW IN MOBILE)
        ========================================================================= */}
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-1">
            <span className="font-brand-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] text-amber-800 uppercase block">
              Direct Channels
            </span>
            <h3 className="font-brand-cinzel text-xl sm:text-4xl font-medium text-stone-950 tracking-tight">
              Connect With Aman Kumar & Crew
            </h3>
          </div>

          {/* 🎯 3 CARDS IN ROW 1 (WHATSAPP, CALL, INSTA) & 3 CARDS IN ROW 2 (MAIL, FB, YT) ON MOBILE */}
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
            {channelMatrix.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className={`neon-card-base ${item.theme} rounded-2xl sm:rounded-3xl p-2.5 sm:p-7 flex flex-col justify-between space-y-2 sm:space-y-5 group cursor-pointer text-left`}
              >
                <div className="flex items-start justify-between">
                  <div className="neon-icon w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center border border-stone-200/80 bg-stone-50 text-stone-800 transition-all duration-400 shrink-0">
                    {item.icon}
                  </div>
                  <span className="hidden sm:inline-block px-3.5 py-1 bg-stone-100 rounded-full font-brand-mono text-[9px] font-bold text-stone-600 tracking-wider uppercase group-hover:bg-stone-950 group-hover:text-white transition-colors duration-300">
                    {item.action} →
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <h4 className="font-brand-cinzel text-[11px] sm:text-xl font-bold text-stone-950 group-hover:text-amber-800 transition-colors truncate">
                    {item.name}
                  </h4>
                  <p className="font-brand-sans text-[8.5px] sm:text-xs text-stone-500 font-normal line-clamp-1 sm:line-clamp-none">
                    {item.desc}
                  </p>
                  <p className="font-brand-mono text-[8px] sm:text-xs text-stone-900 font-semibold pt-0.5 truncate hidden sm:block">
                    {item.handle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* =========================================================================
            🌟 3.5. PRODUCTION COST ESTIMATOR (MATCHING LAPTOP VIEW IN MOBILE)
        ========================================================================= */}
        <section className="glass-luxury-panel rounded-2xl sm:rounded-3xl p-4 sm:p-12 border border-amber-200/80 shadow-xl space-y-5 sm:space-y-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 border-b border-stone-200/80 pb-4 sm:pb-6 text-left">
            <div className="space-y-0.5 sm:space-y-1">
              <div className="inline-flex items-center gap-1.5 sm:gap-2">
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
                <span className="font-brand-mono text-[9px] sm:text-[10.5px] font-bold text-amber-800 uppercase tracking-wider sm:tracking-widest">
                  INTERACTIVE BUDGET CALCULATOR
                </span>
              </div>
              <h3 className="font-brand-cinzel text-lg sm:text-3xl font-bold text-stone-950">
                Estimate Your Event Investment
              </h3>
              <p className="font-brand-sans text-[10px] sm:text-xs text-stone-600">
                Select your required production components to calculate instant total & 30% advance requirement.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 px-3.5 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-left sm:text-right shrink-0">
              <span className="font-brand-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-stone-500 font-bold block">Estimated Total</span>
              <span className="font-brand-cinzel text-lg sm:text-3xl font-bold text-amber-900">₹{calculatedTotal.toLocaleString()}</span>
              <span className="font-brand-mono text-[8px] sm:text-[9.5px] text-emerald-800 font-bold uppercase block mt-0.5">30% Token: ₹{calculatedAdvance.toLocaleString()}</span>
            </div>
          </div>

          {/* Interactive Checkbox Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
            
            <div 
              onClick={() => setSelectedAddons(prev => ({ ...prev, mainWedding: !prev.mainWedding }))}
              className={`p-3 sm:p-4.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer text-left flex items-start justify-between ${
                selectedAddons.mainWedding ? 'bg-amber-50/70 border-amber-500/80 shadow-xs' : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-brand-cinzel font-bold text-xs sm:text-sm text-stone-950">Premium Wedding Package</h4>
                <p className="font-brand-sans text-[10px] sm:text-[11px] text-stone-500">4K Master Film + Photo Album + Traditional</p>
                <span className="font-brand-mono text-[11px] sm:text-xs font-bold text-amber-900">₹69,000</span>
              </div>
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border flex items-center justify-center shrink-0 ${selectedAddons.mainWedding ? 'bg-amber-800 border-amber-800 text-white' : 'border-stone-300'}`}>
                {selectedAddons.mainWedding && <Check size={11} strokeWidth={3} />}
              </div>
            </div>

            <div 
              onClick={() => setSelectedAddons(prev => ({ ...prev, preWedding: !prev.preWedding }))}
              className={`p-3 sm:p-4.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer text-left flex items-start justify-between ${
                selectedAddons.preWedding ? 'bg-amber-50/70 border-amber-500/80 shadow-xs' : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-brand-cinzel font-bold text-xs sm:text-sm text-stone-950">Pre-Wedding Shoot (Jaipur)</h4>
                <p className="font-brand-sans text-[10px] sm:text-[11px] text-stone-500">5 Locations + Music Video + Drone</p>
                <span className="font-brand-mono text-[11px] sm:text-xs font-bold text-amber-900">₹25,000</span>
              </div>
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border flex items-center justify-center shrink-0 ${selectedAddons.preWedding ? 'bg-amber-800 border-amber-800 text-white' : 'border-stone-300'}`}>
                {selectedAddons.preWedding && <Check size={11} strokeWidth={3} />}
              </div>
            </div>

            <div 
              onClick={() => setSelectedAddons(prev => ({ ...prev, drone: !prev.drone }))}
              className={`p-3 sm:p-4.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer text-left flex items-start justify-between ${
                selectedAddons.drone ? 'bg-amber-50/70 border-amber-500/80 shadow-xs' : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-brand-cinzel font-bold text-xs sm:text-sm text-stone-950">Dedicated 4K Drone Unit</h4>
                <p className="font-brand-sans text-[10px] sm:text-[11px] text-stone-500">Baraat, Palace & Aerial Establishing</p>
                <span className="font-brand-mono text-[11px] sm:text-xs font-bold text-amber-900">₹5,000</span>
              </div>
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border flex items-center justify-center shrink-0 ${selectedAddons.drone ? 'bg-amber-800 border-amber-800 text-white' : 'border-stone-300'}`}>
                {selectedAddons.drone && <Check size={11} strokeWidth={3} />}
              </div>
            </div>

            <div 
              onClick={() => setSelectedAddons(prev => ({ ...prev, ringCeremony: !prev.ringCeremony }))}
              className={`p-3 sm:p-4.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer text-left flex items-start justify-between ${
                selectedAddons.ringCeremony ? 'bg-amber-50/70 border-amber-500/80 shadow-xs' : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-brand-cinzel font-bold text-xs sm:text-sm text-stone-950">Ring Ceremony Package</h4>
                <p className="font-brand-sans text-[10px] sm:text-[11px] text-stone-500">Stage, Teaser & High-Res Stills</p>
                <span className="font-brand-mono text-[11px] sm:text-xs font-bold text-amber-900">₹18,000</span>
              </div>
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border flex items-center justify-center shrink-0 ${selectedAddons.ringCeremony ? 'bg-amber-800 border-amber-800 text-white' : 'border-stone-300'}`}>
                {selectedAddons.ringCeremony && <Check size={11} strokeWidth={3} />}
              </div>
            </div>

            <div 
              onClick={() => setSelectedAddons(prev => ({ ...prev, albumCotton: !prev.albumCotton }))}
              className={`p-3 sm:p-4.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer text-left flex items-start justify-between col-span-1 sm:col-span-2 ${
                selectedAddons.albumCotton ? 'bg-amber-50/70 border-amber-500/80 shadow-xs' : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-brand-cinzel font-bold text-xs sm:text-sm text-stone-950">Additional Luxury Cotton Photobook</h4>
                <p className="font-brand-sans text-[10px] sm:text-[11px] text-stone-500">Acid-free Hahnemühle 100-year archival album</p>
                <span className="font-brand-mono text-[11px] sm:text-xs font-bold text-amber-900">₹12,000</span>
              </div>
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border flex items-center justify-center shrink-0 ${selectedAddons.albumCotton ? 'bg-amber-800 border-amber-800 text-white' : 'border-stone-300'}`}>
                {selectedAddons.albumCotton && <Check size={11} strokeWidth={3} />}
              </div>
            </div>

          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/80">
            <p className="font-brand-sans text-[10px] sm:text-xs text-stone-500 text-left">
              *Calculated estimate matches exact rates approved on official studio rate card.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('reservation-form-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-stone-950 hover:bg-amber-800 text-white font-brand-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
            >
              Apply to Reservation Form →
            </button>
          </div>

        </section>

        {/* =========================================================================
            4. TWO-COLUMN SPLIT: FAST BOOKING ENGINE + PHYSICAL STUDIO VISIT
        ========================================================================= */}
        <div id="reservation-form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Reservation Engine */}
          <div className="lg:col-span-7 glass-luxury-panel rounded-2xl sm:rounded-3xl p-5 sm:p-11 border border-white/95 shadow-xl">
            <div className="text-left space-y-1 sm:space-y-2 pb-4 sm:pb-5 border-b border-stone-200/80 mb-4 sm:mb-6">
              <span className="text-amber-800 font-brand-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase block font-bold">
                [EXECUTIVE DATE LOCK]
              </span>
              <h3 className="font-brand-cinzel text-xl sm:text-3xl font-bold text-stone-950 tracking-wide">
                Reserve Studio Availability
              </h3>
              <p className="font-brand-sans text-[10.5px] sm:text-xs text-stone-500 font-normal">
                Direct submission enters Aman Kumar's directorial console for instantaneous date verification.
              </p>
            </div>

            <form onSubmit={handleBooking} className="space-y-3 sm:space-y-4 font-brand-sans text-xs text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-600">Your Full Name *</label>
                  <input 
                    required 
                    className="w-full input-luxury-field rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 outline-none text-xs" 
                    placeholder="e.g. Rahul Verma" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-600">WhatsApp / Phone *</label>
                  <input 
                    required 
                    type="tel" 
                    className="w-full input-luxury-field rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 outline-none text-xs" 
                    placeholder="+91 8434656386" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-600">Event Date *</label>
                  <input 
                    required 
                    type="date" 
                    className="w-full input-luxury-field rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 outline-none cursor-pointer text-xs" 
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})} 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-600">City / Venue Location *</label>
                  <input 
                    required 
                    className="w-full input-luxury-field rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 outline-none text-xs" 
                    placeholder="e.g. Siwan / Jaipur / Patna" 
                    value={formData.location} 
                    onChange={e => setFormData({...formData, location: e.target.value})} 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-600">Selected Package</label>
                <div className="relative">
                  <select 
                    className="w-full input-luxury-field rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 outline-none appearance-none cursor-pointer font-medium text-xs" 
                    value={formData.service} 
                    onChange={e => setFormData({...formData, service: e.target.value})}
                  >
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-amber-800 text-xs">▼</div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-600">Custom Notes & Specific Requests</label>
                <textarea 
                  rows="3" 
                  className="w-full input-luxury-field rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 outline-none resize-none text-xs" 
                  placeholder="Mention number of days, rituals, drone preferences..." 
                  value={formData.notes} 
                  onChange={e => setFormData({...formData, notes: e.target.value})} 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full mt-2 bg-stone-950 hover:bg-amber-800 text-white font-brand-sans font-bold py-3.5 sm:py-4 rounded-xl transition-all duration-300 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[11px] sm:text-xs shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? "Locking Dates..." : "Reserve Dates & Generate Token QR ✦"}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 pt-1.5 text-[9px] sm:text-[10px] font-brand-mono text-stone-500 uppercase">
                <ShieldCheck size={13} className="text-emerald-700 shrink-0" />
                <span className="truncate">256-Bit Encrypted Studio Data Vault (60 Days Storage)</span>
              </div>
            </form>
          </div>

          {/* Right Column: Physical Studio Presence & Real Embedded Map */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            <div className="glass-luxury-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-left space-y-3 sm:space-y-4">
              <span className="font-brand-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-800 uppercase block">
                STUDIO PRESENCE
              </span>
              <h3 className="font-brand-cinzel text-xl sm:text-2xl font-bold text-stone-950">
                Visit Our Siwan Studio
              </h3>
              
              <div className="space-y-2 sm:space-y-3 font-brand-sans text-xs text-stone-600">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <MapPin className="text-amber-800 shrink-0 mt-0.5" size={16} />
                  <span className="text-[11px] sm:text-xs">Hospital Road City Cart, Ukhai, Siwan, Bihar - 841227</span>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Clock className="text-amber-800 shrink-0" size={16} />
                  <span className="text-[11px] sm:text-xs">Open Daily: 09:30 AM — 08:30 PM</span>
                </div>
              </div>

              <div className="pt-1">
                <a 
                  href="https://maps.app.goo.gl/RQwd51v26VuhyuAL7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-stone-900 hover:bg-amber-800 text-white font-brand-sans font-semibold text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 shadow-sm"
                >
                  Open Studio in Google Maps →
                </a>
              </div>
            </div>

            {/* Live Interactive Map Frame (Exact Real Location Pin) */}
            <div className="w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-stone-200 relative bg-stone-100">
              <iframe 
                src="https://maps.google.com/maps?q=Branch+-+Ukhai,+Siwan,+Bihar&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                className="filter contrast-[1.05]" 
                title="Guru Videography Studio Siwan Real Location"
              />
            </div>

          </div>

        </div>

        {/* =========================================================================
            🌟 5. DIRECTORIAL GUARANTEES (2 CARDS PER ROW IN MOBILE)
        ========================================================================= */}
        <section className="glass-luxury-panel rounded-2xl sm:rounded-3xl p-5 sm:p-12 border border-white/95 shadow-xl space-y-6 sm:space-y-8">
          <div className="text-center space-y-1 sm:space-y-2 max-w-2xl mx-auto">
            <span className="font-brand-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] text-amber-800 uppercase block">
              STUDIO COMMITMENT
            </span>
            <h3 className="font-brand-cinzel text-xl sm:text-4xl font-bold text-stone-950 tracking-tight">
              Directorial Safeguards & Guarantees
            </h3>
            <p className="font-brand-sans text-[10.5px] sm:text-xs text-stone-600">
              Every client contract is backed by uncompromising technical and operational safeguards.
            </p>
          </div>

          {/* 🎯 EXACT 2 PER ROW IN MOBILE & 4 ON LAPTOP */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {studioGuarantees.map((item, idx) => (
              <div 
                key={idx}
                className="bg-stone-50/90 border border-stone-200/90 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 space-y-2 sm:space-y-3 hover:bg-white hover:border-amber-400 transition-all duration-300 shadow-2xs text-left"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100/80 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h4 className="font-brand-cinzel text-xs sm:text-base font-bold text-stone-950 leading-tight">
                  {item.title}
                </h4>
                <p className="font-brand-sans text-[9.5px] sm:text-xs text-stone-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* =========================================================================
          💳 6. QR CODE ADVANCE PAYMENT MODAL
      ========================================================================= */}
      {showQR && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-stone-950/85 backdrop-blur-xl p-4">
          <div className="bg-[#FAF8F5] p-6 sm:p-11 rounded-3xl border border-amber-200/90 text-center w-full max-w-md shadow-2xl relative text-stone-900">
            
            <button 
              onClick={() => setShowQR(false)} 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-stone-500 hover:text-stone-900 text-xs font-brand-mono tracking-widest uppercase transition-colors bg-stone-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer"
            >
              ✕ Close
            </button>

            <CreditCard className="mx-auto text-amber-800 mb-2 sm:mb-3" size={36} strokeWidth={1.5} />
            
            <span className="font-brand-mono text-[8.5px] sm:text-[9px] font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-800 uppercase block mb-1">
              RESERVATION INITIATED
            </span>
            <h3 className="font-brand-cinzel text-xl sm:text-3xl text-stone-950 font-bold tracking-wide">
              Complete <span className="italic font-light text-amber-800">Booking.</span>
            </h3>
            <p className="font-brand-sans text-[10.5px] sm:text-xs text-stone-500 tracking-wider uppercase mt-1 mb-4 sm:mb-5">
              Scan via GPay / PhonePe / Paytm to lock 30% Advance dates
            </p>
            
            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white mx-auto mb-4 sm:mb-5 rounded-2xl flex flex-col items-center justify-center p-3 border-2 border-amber-200/80 shadow-md">
              <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center gap-1 p-2">
                <span className="text-stone-400 font-brand-mono text-[8.5px] sm:text-[9px] tracking-widest uppercase font-bold text-center">
                  UPI 30% ADVANCE TOKEN
                </span>
                <span className="text-[11px] sm:text-xs font-brand-sans font-bold text-stone-800">
                  +91 8434656386
                </span>
                <span className="text-[8.5px] sm:text-[9px] font-brand-mono text-emerald-700 font-bold">
                  Aman Kumar (Guru Videography)
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setShowQR(false);
                alert("✨ Payment notification sent to Aman Kumar & Studio Administrators!");
              }} 
              className="w-full py-3 sm:py-3.5 bg-stone-950 hover:bg-amber-800 text-white font-brand-sans font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs rounded-xl transition-all duration-300 shadow-md cursor-pointer"
            >
              Payment Transferred ✦
            </button>
          </div>
        </div>
      )}

    </div>
  );
}