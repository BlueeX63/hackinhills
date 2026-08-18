"use client";

import Image from "next/image";

const ContactLink = ({ label, value, href }: { label: string, value: string, href: string }) => (
  <a href={href} className="group flex flex-col border-t border-white/20 pt-6 pb-12 hover:border-white transition-colors duration-500">
    <div className="text-white/40 font-mono text-[10px] tracking-widest uppercase mb-4 group-hover:text-white/60 transition-colors duration-500">
      {label}
    </div>
    <div className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all duration-500 ease-out break-words">
      {value}
    </div>
  </a>
);

export function Contact() {
  return (
    <section className="relative w-full min-h-screen bg-[#000000] text-white flex flex-col justify-end overflow-hidden z-10">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/card2.jpg" // A dark, stunning image
          alt="Himalayan Landscape"
          fill
          className="object-cover opacity-20 saturate-0 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24 flex flex-col">
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 lg:mb-32">
          <div className="text-[12vw] lg:text-[7vw] font-black tracking-tighter uppercase leading-[0.85] max-w-4xl drop-shadow-2xl">
            LOST IN THE<br/>HILLS?
          </div>
          
          <div className="mt-12 lg:mt-0 flex flex-col items-start lg:items-end text-left lg:text-right max-w-sm">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="text-white/60 font-mono text-xs tracking-[0.3em]">DISTRESS BEACON</div>
            </div>
            <p className="text-sm md:text-base font-mono leading-relaxed text-white/60">
              TRANSMIT YOUR SIGNAL. OUR TEAMS ARE STANDING BY 24/7 TO ASSIST YOUR EXPEDITION IN MANALI.
            </p>
          </div>
        </div>

        {/* Grid Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <ContactLink label="General Transmissions" value="HELLO@HACKINHILLS.COM" href="#" />
          <ContactLink label="Secure Channel" value="DISCORD SERVER" href="#" />
          <ContactLink label="Visual Logs" value="@HACKINHILLS" href="#" />
          <ContactLink label="Base Camp Coordinates" value="MANALI, INDIA" href="#" />
        </div>
        
      </div>
    </section>
  );
}
