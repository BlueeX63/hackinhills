"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import Image from "next/image";

const PRIZES = [
  {
    id: "2nd-runner-up",
    tier: "2ND RUNNER UP",
    amount: "₹50,000",
    image: "/chest-3.jpg",
    desc: "The Bronze Chest.",
  },
  {
    id: "winner",
    tier: "THE SUMMIT (1ST)",
    amount: "₹2,50,000",
    image: "/chest-1.jpg",
    desc: "The Golden Relic.",
  },
  {
    id: "1st-runner-up",
    tier: "1ST RUNNER UP",
    amount: "₹1,00,000",
    image: "/chest-2.jpg",
    desc: "The Silver Chest.",
  },
];

const IceSlab = ({ prize, index }: { prize: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D rotation
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation degrees
  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Normalized position from -0.5 to 0.5
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "circOut", delay: index * 0.15 }}
      className={`relative w-full max-w-sm mx-auto ${index === 1 ? 'md:-translate-y-12' : ''}`}
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: index * 0.4 }}
        className="w-full h-full"
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full aspect-[3/4] group cursor-crosshair rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
        >
          {/* The Relic Image (No blur overlay) */}
          <div 
            className="absolute inset-0 z-0 scale-110 transition-transform duration-700 ease-out group-hover:scale-100"
            style={{ transform: "translateZ(0px)" }}
          >
            <Image 
              src={prize.image}
              alt={prize.tier}
              fill
              className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          </div>

          {/* The Text Layer (Floating on top) */}
          <div 
            className="absolute inset-0 z-20 flex flex-col justify-end p-8"
            style={{ transform: "translateZ(60px)" }}
          >
            <div className="text-white/60 text-xs tracking-[0.3em] font-mono mb-2 uppercase drop-shadow-md">
              {prize.desc}
            </div>
            <div className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-1 drop-shadow-lg">
              {prize.amount}
            </div>
            <div className="text-sm font-medium tracking-widest text-white/80 drop-shadow-md">
              {prize.tier}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export function PrizePool() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-20%" });

  // Minimalist odometer counter effect just using simple motion for now
  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#000000] text-white py-32 md:py-48 overflow-hidden perspective-[2000px]"
    >
      <div className="absolute inset-0 z-0">
        <Image 
          src="/bg-cave.jpg" 
          alt="Ice Cave Vault" 
          fill 
          className="object-cover object-center opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-white/50 text-xs md:text-sm tracking-[0.4em] font-mono mb-6"
          >
            THE FROZEN VAULT
          </motion.div>
          
          <motion.div
            ref={textRef}
            className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none"
          >
            {/* Fake Odometer Effect */}
            <span className="relative inline-block overflow-hidden h-[1.1em] align-bottom">
              <motion.span 
                className="block"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like spring
              >
                ₹5,00,000<span className="text-blue-500">+</span>
              </motion.span>
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/60 tracking-widest mt-6 text-sm md:text-base uppercase"
          >
            Total Bounty
          </motion.div>
        </div>

        {/* Ice Slabs Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center">
          {PRIZES.map((prize, index) => (
            <IceSlab key={prize.id} prize={prize} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
