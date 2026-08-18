"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { SnowParticles } from "./snow-particles";
import Link from "next/link";

export function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-screen overflow-hidden bg-[#050505]"
    >
      {/* LAYER 1: Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBg }}
      >
        <img
          src="/hero-bg.png"
          alt="Himalayan Mountains"
          draggable={false}
          className="object-cover w-full h-[120%] object-center saturate-[0.2] contrast-[1.1] brightness-[0.8] select-none pointer-events-none"
        />
      </motion.div>

      {/* LAYER 2: Geometric Overlays */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none"
        style={{ x: smoothX, y: smoothY }}
      >
        <div className="w-[50vh] h-[50vh] md:w-[70vh] md:h-[70vh] rounded-full border-[1px] border-white/10 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[65vh] h-[65vh] md:w-[85vh] md:h-[85vh] rounded-full border-[1px] border-white/5 border-dashed animate-[spin_90s_linear_infinite_reverse]" />
      </motion.div>

      {/* LAYER 3: Massive Typography (Slides behind cutout) */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
        style={{ y: yText }}
      >
        <div className="flex flex-col items-center w-full mt-[-22vh]">
          {/* Subtle top tracking text */}
          <div className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-white/70 uppercase mb-6 flex items-center gap-6">
            <span className="w-16 h-[1px] bg-white/40" />
            The Ultimate Expedition
            <span className="w-16 h-[1px] bg-white/40" />
          </div>

          {/* Main Title - Staggered layout to perfectly dodge the left mountain peak */}
          <h1 className="font-display text-[16vw] md:text-[13vw] uppercase tracking-[0.15em] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center leading-[0.85] w-full pb-4">
            <span className="font-light -ml-[15vw] text-white/60">HACK IN</span>
            <span className="font-bold ml-[20vw] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-black/60">HILLS</span>
          </h1>
        </div>
      </motion.div>

      {/* LAYER 4: The True Cinematic Mountain Cutout */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none select-none"
        style={{ y: yBg }}
      >
        <img
          src="/hero-fg-v2.png"
          alt="Foreground Mountain Cutout"
          draggable={false}
          className="object-cover w-full h-[120%] object-center saturate-[0.2] contrast-[1.1] brightness-[0.8] select-none pointer-events-none"
        />
        {/* Bottom gradient fade for UI readability and cinematic vignette */}
        <div className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-black/80 via-black/40 to-transparent z-40 pointer-events-none" />
      </motion.div>

      {/* LAYER 4.5: WebGL Snow Particles */}
      <SnowParticles />

      {/* Top Right Registration Button (Leather Tag) */}
      <div className="absolute right-6 md:right-12 z-50 pointer-events-auto origin-top">
        <AnimatePresence>
          {isLoaded && (
            <Link href="/register" className="block cursor-none">
              <motion.div
                initial={{ y: -300 }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1.5, 
                  type: "spring", 
                  stiffness: 50,
                  damping: 10,
                  delay: 0.5
                }}
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.95 }}
                className="relative w-[200px] h-[100px] md:w-[260px] md:h-[120px] group cursor-none"
              >
                {/* Magnetic Hover Target (invisible) */}
                <div className="absolute inset-0 z-20 cursor-none" />
                
                {/* The "Carved in Ice" Register Button Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/register-btn.png"
                  alt="Register"
                  draggable={false}
                  className="w-full h-full object-contain object-top mix-blend-multiply opacity-90 contrast-[1.2] saturate-[0.4] group-hover:opacity-100 transition-all select-none cursor-none"
                />
              </motion.div>
            </Link>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
