"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const MILESTONES = [
  {
    id: "01",
    title: "BASE CAMP",
    phase: "REGISTRATION",
    altitude: "1,500m",
    image: "/timeline-1.jpg", 
    desc: "Identity verified. Ground zero for the expedition. No turning back."
  },
  {
    id: "02",
    title: "CAMP 01",
    phase: "PPT SUBMISSION",
    altitude: "2,100m",
    image: "/timeline-2.jpg",
    desc: "First steep incline. Blueprints and logic models submitted for structural evaluation."
  },
  {
    id: "03",
    title: "CAMP 02",
    phase: "EVALUATION",
    altitude: "2,600m",
    image: "/timeline-3.jpg",
    desc: "Surviving the altitude sickness. Systems are stress tested by the engineering council."
  },
  {
    id: "04",
    title: "THE SUMMIT",
    phase: "FINAL HACKATHON",
    altitude: "3,000m+",
    image: "/timeline-4.jpg",
    desc: "The oxygen is thin. 24 hours of pure uninterrupted coding at peak elevation."
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the entire section's scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth progress for the drawing line
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#000000] text-white"
    >
      {/* 1. STICKY BACKGROUND IMAGERY */}
      <div className="sticky top-0 w-full h-screen overflow-hidden z-0">
        {MILESTONES.map((milestone, index) => {
          let input = [];
          let outputOpacity = [];
          let outputScale = [];

          if (index === 0) {
            input = [0, 0.333];
            outputOpacity = [0.4, 0];
            outputScale = [1.1, 1.15];
          } else if (index === MILESTONES.length - 1) {
            input = [0.666, 1];
            outputOpacity = [0, 0.4];
            outputScale = [1.05, 1.1];
          } else {
            input = [(index - 1) / 3, index / 3, (index + 1) / 3];
            outputOpacity = [0, 0.4, 0];
            outputScale = [1.05, 1.1, 1.15];
          }

          const opacity = useTransform(scrollYProgress, input, outputOpacity);
          const scale = useTransform(scrollYProgress, input, outputScale);

          return (
            <motion.div 
              key={milestone.id}
              className="absolute inset-0 w-full h-full"
              style={{ opacity, scale }}
            >
              <img 
                src={milestone.image} 
                alt={milestone.title}
                className="w-full h-full object-cover object-center saturate-0"
              />
              {/* Vignette to blend edges */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000000_100%)]" />
            </motion.div>
          );
        })}
      </div>

      {/* 2. THE SCROLLING CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 -mt-[100vh]">
        
        {/* The Central Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
        
        {/* The Animated Glowing Trace Line */}
        <motion.div 
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white origin-top drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] -translate-x-1/2 z-20"
          style={{ scaleY: smoothProgress }}
        />

        {/* The Milestones */}
        <div className="flex flex-col w-full pb-[20vh]">
          {MILESTONES.map((milestone, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={milestone.id}
                className="relative w-full h-screen flex items-center"
              >
                {/* 
                  Layout:
                  Mobile: Everything is aligned left, next to the line.
                  Desktop: Alternates left and right of the central line.
                */}
                <div className={`w-full md:w-1/2 flex flex-col justify-center pl-12 md:pl-0 ${
                  isEven 
                    ? "md:pr-24 md:items-end md:text-right" 
                    : "md:ml-auto md:pl-24 md:items-start md:text-left"
                }`}>
                  
                  {/* Content Block */}
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-20%" }} // Re-animates slightly when scrolling back
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Custom highly smooth spring-like ease
                    className="flex flex-col gap-4 max-w-md"
                  >
                    {/* Tiny Phase Label */}
                    <div className="font-mono text-[10px] tracking-[0.4em] text-white/50 uppercase">
                      PHASE {milestone.id} — {milestone.phase}
                    </div>

                    {/* Massive Minimalist Title */}
                    <h3 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
                      {milestone.title}
                    </h3>
                    
                    {/* Small divider line */}
                    <div className={`w-12 h-[1px] bg-white/30 my-2 ${isEven ? "md:ml-auto" : ""}`} />

                    {/* Description */}
                    <p className="font-sans text-sm md:text-base text-white/60 font-light leading-relaxed">
                      {milestone.desc}
                    </p>
                    
                    {/* Elevation stat */}
                    <div className="font-mono text-sm tracking-widest mt-4 flex items-center gap-2">
                      <span className="text-white/40">ALT.</span>
                      <span className="text-white">{milestone.altitude}</span>
                    </div>

                  </motion.div>
                </div>

                {/* The Dot on the Line */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, margin: "-50%" }}
                  transition={{ duration: 0.6, ease: "backOut" }}
                  className="absolute left-6 md:left-1/2 top-1/2 w-4 h-4 bg-[#000000] border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 z-30"
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
