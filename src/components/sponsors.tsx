"use client";

import Image from "next/image";

const SPONSORS = [
  {
    id: "s1",
    name: "QUANTUM",
    tier: "TITLE PARTNER",
    image: "/card1.jpg",
  },
  {
    id: "s2",
    name: "AEROSPACE",
    tier: "PLATINUM PARTNER",
    image: "/card2.jpg",
  },
  {
    id: "s3",
    name: "GLACIER.AI",
    tier: "GOLD PARTNER",
    image: "/card3.jpg",
  },
  {
    id: "s4",
    name: "NEXUS LABS",
    tier: "SILVER PARTNER",
    image: "/about-1.jpg",
  }
];

import { useRef, useState } from "react";

const KineticSponsorRow = ({ sponsor, isOpen }: { sponsor: any, isOpen: boolean }) => {
  return (
    <div 
      data-sponsor-id={sponsor.id}
      className="relative w-full flex flex-col border-b border-white/10 cursor-crosshair"
    >
      
      {/* Top Half of Text */}
      <div className="relative w-full h-[10vh] md:h-[18vh] overflow-hidden flex items-end justify-center select-none bg-[#000000] z-10">
        <div className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-white translate-y-[52%] leading-none pb-1">
          {sponsor.name}
        </div>
      </div>

      {/* The Expanding Cinematic Image Gap */}
      <div className={`w-full relative overflow-hidden pointer-events-none z-0 transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'h-[25vh] md:h-[45vh]' : 'h-0'}`}>
        <Image 
          src={sponsor.image} 
          fill 
          className={`object-cover transition-all duration-[1.5s] ease-out opacity-90 ${isOpen ? 'scale-100 saturate-100' : 'scale-110 saturate-0'}`}
          alt={sponsor.name} 
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Floating Tier Badge */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 delay-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="px-6 py-2 bg-black/40 backdrop-blur-md ring-1 ring-white/20 text-white font-mono tracking-[0.3em] text-xs md:text-sm uppercase rounded-full drop-shadow-2xl">
            {sponsor.tier}
          </div>
        </div>
      </div>

      {/* Bottom Half of Text */}
      <div className="relative w-full h-[10vh] md:h-[18vh] overflow-hidden flex items-start justify-center select-none bg-[#000000] z-10">
        <div className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-transparent -translate-y-[48%] leading-none pt-1"
             style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>
          {sponsor.name}
        </div>
      </div>
      
    </div>
  );
};

import { useEffect } from "react";

export function Sponsors() {
  const [hoveredSponsor, setHoveredSponsor] = useState<string | null>(null);
  const mousePos = useRef({ x: -1, y: -1 });

  useEffect(() => {
    let ticking = false;

    const checkHover = () => {
      if (mousePos.current.x < 0 || mousePos.current.y < 0) return;
      const el = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
      const row = el?.closest("[data-sponsor-id]");
      if (row) {
        setHoveredSponsor(row.getAttribute("data-sponsor-id"));
      } else {
        setHoveredSponsor(null);
      }
      ticking = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!ticking) {
        requestAnimationFrame(checkHover);
        ticking = true;
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkHover);
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#000000] text-white overflow-hidden py-32 flex flex-col">
      {/* Header */}
      <div className="w-full flex flex-col items-center mb-16 md:mb-32 z-20">
        <div className="text-white/50 text-xs tracking-[0.4em] font-mono mb-4">THE EXPEDITION ALLIES</div>
        <div className="text-5xl md:text-7xl font-bold tracking-tighter">PARTNERS</div>
      </div>

      {/* The Kinetic Rows */}
      <div className="w-full border-t border-white/10">
        {SPONSORS.map((sponsor) => (
          <KineticSponsorRow 
            key={sponsor.id} 
            sponsor={sponsor} 
            isOpen={hoveredSponsor === sponsor.id}
          />
        ))}
      </div>
    </section>
  );
}
