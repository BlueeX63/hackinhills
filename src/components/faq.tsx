"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    id: "01",
    question: "WHAT IS HACK IN HILLS?",
    answer: "A PREMIER HACKATHON EXPERIENCE LOCATED AT HIGH ALTITUDE. IT IS DESIGNED TO PUSH YOUR LIMITS IN ENGINEERING AND CREATIVITY WHILE SURROUNDED BY THE HIMALAYAS."
  },
  {
    id: "02",
    question: "WHO CAN PARTICIPATE?",
    answer: "ANYONE WITH THE WILL TO BUILD. STUDENTS, PROFESSIONALS, DESIGNERS, AND EXPLORERS. TEAMS OF 2 TO 4 ARE RECOMMENDED FOR MAXIMUM SURVIVABILITY."
  },
  {
    id: "03",
    question: "WHAT DO I NEED TO BRING?",
    answer: "YOUR HARDWARE, WARM CLOTHING, AND RELENTLESS DRIVE. WE PROVIDE THE POWER, INTERNET, AND SUSTENANCE NECESSARY TO KEEP YOUR SYSTEMS ONLINE."
  },
  {
    id: "04",
    question: "IS THERE A REGISTRATION FEE?",
    answer: "REGISTRATION IS COMPLETELY FREE. HOWEVER, SELECTION IS HIGHLY COMPETITIVE. ONLY THE MOST CAPABLE SQUADS WILL BE DEPLOYED TO BASE CAMP."
  }
];

// Scrambled Text Hook for the decoding effect
const useScrambleText = (text: string, isActive: boolean) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>";

  useEffect(() => {
    if (!isActive) {
      setDisplayText("");
      return;
    }

    let iteration = 0;
    let animationFrame: number;

    const tick = () => {
      setDisplayText((prev) => 
        text.split("").map((letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          if (letter === " ") return " ";
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      if (iteration < text.length) {
        iteration += 1 / 3; // Speed of decryption
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [text, isActive]);

  return displayText;
};

const Transmission = ({ faq, isOpen, onToggle }: { faq: typeof FAQS[0], isOpen: boolean, onToggle: () => void }) => {
  const decodedAnswer = useScrambleText(faq.answer, isOpen);

  return (
    <div className="w-full border-b border-white/10 last:border-b-0">
      <button 
        onClick={onToggle}
        className="w-full group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 text-left focus:outline-none"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {/* Blinking Recording Dot */}
            <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`} />
            <span className="text-white/40 font-mono text-xs tracking-[0.3em]">
              [ TRX // {faq.id} ]
            </span>
          </div>
          <span className={`text-xl md:text-3xl font-bold tracking-tight uppercase transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
            {faq.question}
          </span>
        </div>
        
        {/* Technical HUD element on right */}
        <div className="hidden md:flex items-center gap-4 text-white/20 font-mono text-[10px] tracking-widest uppercase">
          <span>{isOpen ? 'DECRYPTING...' : 'ENCRYPTED'}</span>
          <div className={`w-8 h-[1px] ${isOpen ? 'bg-white' : 'bg-white/20'}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-12 pl-[5.5rem] md:pl-[12.5rem] pr-6">
              <p className="text-white/80 font-mono text-sm md:text-base leading-relaxed tracking-wide">
                <span className="text-red-500 mr-2">{">"}</span>
                {decodedAnswer}
                {/* Blinking cursor */}
                <span className="inline-block w-2 h-4 bg-white/50 ml-1 animate-pulse" />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-[#000000] text-white py-32 px-6 md:px-12 flex justify-center">
      
      {/* Background HUD Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
             backgroundSize: '50px 50px' 
           }} 
      />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <div className="text-white/50 text-xs tracking-[0.4em] font-mono mb-4 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-white/30" />
              COMMUNICATIONS LINK
            </div>
            <div className="text-5xl md:text-7xl font-bold tracking-tighter">
              INCOMING<br />TRANSMISSIONS
            </div>
          </div>
          
          <div className="text-white/30 font-mono text-xs tracking-[0.2em] text-right">
            SECURE CHANNEL<br />
            FREQUENCY: 144.0 MHz<br />
            ENCRYPTION: ACTIVE
          </div>
        </div>

        {/* The Transmissions */}
        <div className="w-full border-t border-white/10">
          {FAQS.map((faq) => (
            <Transmission 
              key={faq.id} 
              faq={faq} 
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
