import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Bot, RefreshCw, MessageSquare, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';

export default function AIChatbot({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Decision-Tree Knowledge Base & Dynamic Options
  const botDecisionTree = {
    root: {
      reply: "Namaste! 🙏 Welcome to Guru Videography. I am your Directorial AI Concierge, guided by Lead Filmmaker Aman Kumar.\n\nHow may I curate your visual journey today?",
      options: [
        { label: "💰 Wedding & Event Packages", next: "pricing" },
        { label: "📸 Signature Pre-Wedding (Jaipur)", next: "prewedding" },
        { label: "📜 Booking Policy & Advance", next: "booking_policy" },
        { label: "📍 Studio Location & Travel", next: "studio_location" },
        { label: "🎥 Camera Gear & Color Science", next: "equipment" },
        { label: "📞 Direct VIP Consultation", next: "direct_contact" }
      ]
    },
    pricing: {
      reply: "Here is our official studio rate card curated with lossless color science:\n\n• Premium Wedding: ₹69,000 (Full 4K Film + Archival Album + Drone)\n• Standard Wedding: ₹41,000 (Full Coverage HD Video & Stills)\n• Basic Wedding: ₹31,000 (Essential Highlights)\n• Pre-Wedding (Jaipur 5 Spots): ₹25,000\n• Ring Ceremony: ₹14,000 / ₹18,000 / ₹21,000\n• Drone Shoot Add-on: ₹5,000\n\n📌 Every commission requires a 30% advance token to reserve dates.",
      options: [
        { label: "📸 Tell me about Pre-Wedding in Jaipur", next: "prewedding" },
        { label: "📜 How do I pay the 30% Token?", next: "booking_policy" },
        { label: "📅 Check Date Availability with Aman", next: "direct_contact" },
        { label: "↩️ Back to Main Menu", next: "root" }
      ]
    },
    prewedding: {
      reply: "Our Signature Jaipur Pre-Wedding Commission (₹25,000) includes:\n\n✓ 5 Iconic Heritage & Scenic Locations\n✓ 4K Cinematic Music Video Teaser (3-4 mins)\n✓ Full Set of Color-Graded High-Res Stills\n✓ 4K Drone Aerial Footage\n✓ Creative Costume & Directorial Posing Guidance\n\nWe travel with full studio optical rigs to ensure editorial quality.",
      options: [
        { label: "💰 View All Other Event Packages", next: "pricing" },
        { label: "📜 Check Booking Rules", next: "booking_policy" },
        { label: "📞 Lock Jaipur Dates via WhatsApp", next: "direct_contact" },
        { label: "↩️ Back to Main Menu", next: "root" }
      ]
    },
    booking_policy: {
      reply: "Our official Directorial Commission Terms:\n\n1. Booking is locked strictly after receiving a 30% Advance Token.\n2. Remaining balance is cleared prior to final album/film handover.\n3. RAW project data is preserved safely in studio vaults for 60 Days.\n4. We accept UPI (GPay / PhonePe / Paytm) at +91 8434656386.",
      options: [
        { label: "💰 Explore Packages", next: "pricing" },
        { label: "📍 Where is the Studio located?", next: "studio_location" },
        { label: "💬 Connect with Aman Kumar Directly", next: "direct_contact" },
        { label: "↩️ Back to Main Menu", next: "root" }
      ]
    },
    studio_location: {
      reply: "📍 Physical Studio Headquarters:\nHospital Road City Cart, Ukhai, Siwan, Bihar - 841227.\n\n🚗 Travel Radius:\nWe travel extensively across Siwan, Gaurai, Patna, Varanasi, Jaipur, and luxury destination weddings pan-India.",
      options: [
        { label: "🎥 What camera gear do you use?", next: "equipment" },
        { label: "💰 View Wedding Packages", next: "pricing" },
        { label: "📞 Call / Visit Studio", next: "direct_contact" },
        { label: "↩️ Back to Main Menu", next: "root" }
      ]
    },
    equipment: {
      reply: "We craft human poetry with calibrated cinema optics:\n\n• Full-frame 4K Cinema Sensors & Prime Glass\n• 16-Bit Uncompressed Color Science for true skin tones\n• 4K ProRes Aerial Drones for grand heritage vistas\n• Multi-track Spatial Acoustic Microphones for sacred Vedic mantras & vows.",
      options: [
        { label: "💰 See Package Rates", next: "pricing" },
        { label: "📸 Signature Pre-Wedding Details", next: "prewedding" },
        { label: "📞 Consult with Lead Director", next: "direct_contact" },
        { label: "↩️ Back to Main Menu", next: "root" }
      ]
    },
    direct_contact: {
      reply: "You can directly connect with Lead Filmmaker Aman Kumar:\n\n📞 Phone / WhatsApp: +91 8434656386\n✉️ Email: guryaman63@gmail.com\n⏰ Studio Hours: Daily 09:30 AM — 08:30 PM\n\nClick below to open WhatsApp or reserve your session through the booking portal.",
      options: [
        { label: "💬 Open WhatsApp Chat (+91 8434656386)", action: "whatsapp" },
        { label: "📝 Go to Contact Booking Tab", action: "contact_tab" },
        { label: "↩️ Back to Main Menu", next: "root" }
      ]
    }
  };

  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: botDecisionTree.root.reply,
      options: botDecisionTree.root.options
    }
  ]);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

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

  const handleOptionClick = (option) => {
    if (option.action === 'whatsapp') {
      window.open('https://wa.me/918434656386?text=Namaste%20Aman%20Ji,%20I%20want%20to%20inquire%20about%20booking%20dates%20for%20my%20event.', '_blank');
      return;
    }

    if (option.action === 'contact_tab') {
      if (setActiveTab) setActiveTab('contact');
      setIsOpen(false);
      return;
    }

    setMessages(prev => [...prev, { type: 'user', text: option.label }]);
    setIsTyping(true);

    setTimeout(() => {
      const node = botDecisionTree[option.next] || botDecisionTree.root;
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: node.reply,
          options: node.options
        }
      ]);
      setIsTyping(false);
    }, 450);
  };

  const resetChat = () => {
    setMessages([
      {
        type: 'bot',
        text: botDecisionTree.root.reply,
        options: botDecisionTree.root.options
      }
    ]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
        
        .font-chat-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-chat-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-chat-mono { font-family: 'Space Grotesk', monospace; }

        .luxury-ai-shell {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(28px) saturate(190%);
          border: 1px solid rgba(217, 119, 6, 0.3);
          box-shadow: 0 30px 80px -15px rgba(120, 53, 15, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.95);
        }

        .bot-bubble-luxury {
          background: #FAF8F5;
          border: 1px solid rgba(231, 229, 228, 0.95);
          color: #1c1917;
          box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.04);
        }

        .user-bubble-luxury {
          background: linear-gradient(135deg, #1c1917 0%, #292524 100%);
          color: #ffffff;
          border: 1px solid rgba(245, 158, 11, 0.3);
          box-shadow: 0 8px 25px -6px rgba(120, 53, 15, 0.3);
        }

        .interactive-choice-btn {
          background: #ffffff;
          border: 1px solid rgba(217, 119, 6, 0.22);
          color: #78350f;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 8px rgba(120, 53, 15, 0.04);
        }
        .interactive-choice-btn:hover {
          background: linear-gradient(135deg, #78350f 0%, #92400e 100%);
          color: #ffffff;
          border-color: #78350f;
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 8px 20px -4px rgba(120, 53, 15, 0.25);
        }
      `}</style>

      {/* 🌟 LUXURY LAUNCHER BADGE BUTTON (ELEVATED POSITION ON MOBILE TO CLEAR BOTTOM DOCK) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[9990] group flex items-center gap-2.5 sm:gap-3 bg-stone-950 text-white px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_15px_40px_rgba(120,53,15,0.35)] border border-amber-500/40 hover:bg-amber-900 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Open AI Concierge"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 absolute -top-0.5 -right-0.5 animate-ping" />
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 group-hover:rotate-12 transition-transform">
              <Bot size={17} className="sm:w-[19px] sm:h-[19px]" />
            </div>
          </div>
          <div className="text-left font-chat-sans block">
            <span className="text-[8px] sm:text-[9px] font-chat-mono tracking-[0.2em] sm:tracking-[0.25em] text-amber-300 uppercase block font-bold leading-none">GURU AI</span>
            <span className="text-[10px] sm:text-xs font-bold tracking-wide text-stone-100 leading-tight">Concierge</span>
          </div>
        </button>
      )}

      {/* 💬 CHATBOT INTERACTIVE WINDOW */}
      {isOpen && (
        <div className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-[9995] w-[94vw] sm:w-[420px] h-[520px] sm:h-[600px] max-h-[82vh] luxury-ai-shell rounded-3xl flex flex-col overflow-hidden animate-fade-in text-stone-900 select-none shadow-2xl">
          
          {/* Header */}
          <div className="bg-white/95 border-b border-amber-200/80 p-3 sm:p-4 px-4 sm:px-5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md">
                <Sparkles size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="font-chat-cinzel text-sm sm:text-base font-bold text-stone-950">Guru Concierge</h3>
                  <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[8px] sm:text-[9px] font-chat-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <p className="font-chat-mono text-[8px] sm:text-[9px] text-amber-800 tracking-wider uppercase font-semibold">
                  Guided by Aman Kumar • 2026 Archive
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart Conversation"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-amber-800 transition-colors cursor-pointer"
              >
                <RefreshCw size={13} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Concierge"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 font-chat-sans text-xs scroll-smooth bg-[#FAF8F5]/80"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-2.5 sm:space-y-3">
                
                {/* Text Bubble */}
                <div
                  className={`w-fit max-w-[90%] sm:max-w-[88%] p-3 sm:p-4 rounded-2xl leading-relaxed whitespace-pre-line text-left text-[11px] sm:text-xs ${
                    msg.type === "bot"
                      ? "bot-bubble-luxury rounded-tl-xs"
                      : "user-bubble-luxury ml-auto rounded-tr-xs font-semibold"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Interactive Dynamic Decision Choices */}
                {msg.type === "bot" && msg.options && (
                  <div className="flex flex-col gap-1.5 sm:gap-2 pt-1 pl-1 max-w-[98%] sm:max-w-[95%]">
                    <span className="text-[8px] sm:text-[9px] font-chat-mono uppercase tracking-[0.2em] text-stone-400 font-bold block text-left">
                      SELECT INQUIRY OPTION:
                    </span>
                    {msg.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionClick(opt)}
                        className="interactive-choice-btn w-full text-left px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-chat-sans text-[11px] sm:text-xs font-semibold flex items-center justify-between gap-2 cursor-pointer"
                      >
                        <span className="truncate">{opt.label}</span>
                        <ArrowRight size={11} className="shrink-0 opacity-70" />
                      </button>
                    ))}
                  </div>
                )}

              </div>
            ))}

            {isTyping && (
              <div className="bot-bubble-luxury w-fit p-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 text-stone-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Footer Direct Action Strip */}
          <div className="p-2.5 sm:p-3 bg-white border-t border-amber-200/60 flex items-center justify-between px-3.5 sm:px-4 text-stone-500 font-chat-mono text-[9px] sm:text-[10px]">
            <div className="flex items-center gap-1 sm:gap-1.5 truncate">
              <CheckCircle2 size={11} className="text-amber-700 shrink-0" />
              <span className="truncate">Directorial Response Engine</span>
            </div>
            <a 
              href="tel:8434656386"
              onClick={(e) => handleCallClick(e, '8434656386')}
              className="text-amber-800 font-bold hover:underline flex items-center gap-1 shrink-0 ml-1"
            >
              <Phone size={9} /> +91 8434656386
            </a>
          </div>

        </div>
      )}
    </>
  );
}