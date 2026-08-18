"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax the massive text slightly as the footer is revealed
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1]);

  return (
    <footer 
      ref={containerRef}
      className="relative h-[100vh] w-full bg-[#050505] text-white"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* 
        This 'fixed' container stays at the bottom of the screen.
        Because the parent has clip-path, it is ONLY visible when you scroll into the parent's height!
        This creates the perfect "Curtain Reveal" parallax footer effect.
      */}
      <div className="fixed bottom-0 w-full h-[100vh] flex flex-col justify-between p-6 md:p-12">
        
        {/* Top of Footer */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-12 md:mt-0">
          <div>
            <div className="text-white/40 font-mono text-xs tracking-[0.3em] mb-2">STATUS</div>
            <div className="text-2xl md:text-4xl font-bold tracking-tighter">SUMMIT REACHED.</div>
          </div>
          
          <div className="text-left md:text-right">
            <div className="text-white/40 font-mono text-xs tracking-[0.3em] mb-2">LOCATION</div>
            <div className="text-xl font-bold tracking-tight">HACK IN HILLS, MANALI</div>
            <div className="text-white/60 font-mono text-sm tracking-widest mt-1">32°14'N // 77°11'E</div>
          </div>
        </div>

        {/* Middle Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-auto w-full max-w-4xl border-t border-white/10 pt-12">
          <div className="flex flex-col gap-4">
            <div className="text-white/30 font-mono text-[10px] tracking-widest uppercase mb-2">NAVIGATION</div>
            <a href="#" className="text-sm font-bold tracking-wider hover:text-white/60 transition-colors">HOME</a>
            <a href="#" className="text-sm font-bold tracking-wider hover:text-white/60 transition-colors">ABOUT</a>
            <a href="#" className="text-sm font-bold tracking-wider hover:text-white/60 transition-colors">TRACKS</a>
            <a href="#" className="text-sm font-bold tracking-wider hover:text-white/60 transition-colors">TIMELINE</a>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-white/30 font-mono text-[10px] tracking-widest uppercase mb-2">SOCIAL</div>
            <a href="#" className="text-sm font-bold tracking-wider hover:text-white/60 transition-colors">INSTAGRAM</a>
            <a href="#" className="text-sm font-bold tracking-wider hover:text-white/60 transition-colors">TWITTER (X)</a>
            <a href="#" className="text-sm font-bold tracking-wider hover:text-white/60 transition-colors">DISCORD</a>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-white/30 font-mono text-[10px] tracking-widest uppercase mb-2">LEGAL</div>
            <a href="#" className="text-sm font-bold tracking-wider hover:text-white/60 transition-colors">PRIVACY POLICY</a>
            <a href="#" className="text-sm font-bold tracking-wider hover:text-white/60 transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="text-sm font-bold tracking-wider hover:text-white/60 transition-colors">CODE OF CONDUCT</a>
          </div>
          <div className="flex flex-col justify-end">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Massive Typography */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="w-full flex justify-center items-end pb-8 overflow-hidden"
        >
          <div className="text-[12vw] md:text-[6.5vw] font-black uppercase tracking-tighter leading-[0.8] text-center text-white w-full px-4"
               style={{ textShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            UNTIL THE NEXT ASCENT.
          </div>
        </motion.div>
        
      </div>
    </footer>
  );
}
