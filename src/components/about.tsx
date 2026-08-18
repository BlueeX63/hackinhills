"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    id: "01",
    subtitle: "THE TERRAIN",
    title: "HOSTILE BY DESIGN",
    description: "We replaced the standard hackathon environment with the extreme atmospheric conditions of the Himalayas. Altitude drops oxygen. The cold tests endurance. Only the strongest architectures survive.",
    stat: "2,050M",
    bgImage: "/about-1.jpg", 
    textClass: "text-white"
  },
  {
    id: "02",
    subtitle: "THE CHALLENGE",
    title: "48 HOURS OF ICE",
    description: "This is a grueling, non-stop engineering marathon. You will be pushed to your absolute limits. Build production-ready, globally scalable systems under immense pressure.",
    stat: "048 HRS",
    bgImage: "/about-2.jpg", 
    textClass: "text-white"
  },
  {
    id: "03",
    subtitle: "THE SUMMIT",
    title: "ZERO COMPROMISE",
    description: "Pitching takes place at the summit. Bring your finest code, or do not bring anything at all. Standard conventions and minimum viable products do not belong here.",
    stat: "000 %",
    bgImage: "/about-3.jpg", 
    textClass: "text-white"
  }
];

export function About() {
  return (
    <section className="relative w-full min-h-screen bg-[#000000] py-24 flex flex-col items-center justify-center border-t border-white/10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="text-center mb-16 px-6"
      >
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white">
          Why The <span className="text-white/40">Hills?</span>
        </h2>
      </motion.div>

      {/* Expanding Flex Accordion Layout */}
      <div className="w-full max-w-[95vw] h-[70vh] md:h-[600px] flex flex-col md:flex-row gap-2 md:gap-4 overflow-hidden px-2 md:px-0">
        {CARDS.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "circOut" }}
            className={`
              relative flex-1 hover:flex-[3] transition-[flex] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
              rounded-xl overflow-hidden cursor-none group bg-cover bg-center ${card.textClass}
              ring-1 ring-inset ring-white/10
            `}
            style={{ backgroundImage: `url(${card.bgImage})` }}
          >
            {/* Dark Gradient Overlay for text readability and cinematic depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/40 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-70" />
            
            {/* Secondary overlay for general darkening to keep it sleek */}
            <div className="absolute inset-0 bg-[#000000]/40 pointer-events-none group-hover:bg-[#000000]/10 transition-colors duration-700" />

            {/* Massive Background Stat (Faded) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[8vw] font-display font-bold opacity-[0.03] pointer-events-none whitespace-nowrap transition-transform duration-700 group-hover:scale-110">
              {card.stat}
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
              
              {/* Top Header */}
              <div className="flex justify-between items-start">
                <span className={`font-mono text-xs tracking-widest uppercase opacity-50`}>
                  {card.id}
                </span>
                <span className={`font-mono text-xs font-bold tracking-widest uppercase opacity-90`}>
                  {card.subtitle}
                </span>
              </div>

              {/* Bottom Content - The description fades in when the card expands */}
              <div className="flex flex-col mt-auto">
                <h3 className="font-display text-2xl md:text-4xl font-bold uppercase leading-none tracking-tight whitespace-nowrap">
                  {card.title}
                </h3>
                
                {/* Use max-height instead of h-auto for butter-smooth CSS expansion */}
                <div className="max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden">
                  <p className="font-sans text-sm md:text-base leading-relaxed opacity-80 max-w-md mt-4">
                    {card.description}
                  </p>
                </div>
              </div>
              
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
