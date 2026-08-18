"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crosshair } from "lucide-react";

// The 8 tracks positioned like a star map / topographic nodes
const TRACKS = [
  {
    id: "ai",
    title: "ARTIFICIAL INTELLIGENCE",
    altitude: "5,000M",
    top: "15%",
    left: "65%",
    desc: "Build autonomous, self-healing systems that operate without human intervention in hostile data environments.",
    challenge: "Develop ultra-low latency inference models that can process chaotic, unstructured streams of real-time data.",
    tools: "PyTorch, TensorFlow, LLMs, Agents",
    ideal: "Autonomous swarms, Predictive failure analysis, Cognitive engines."
  },
  {
    id: "cyber",
    title: "CYBERSECURITY",
    altitude: "4,800M",
    top: "25%",
    left: "25%",
    desc: "Design impenetrable fortresses. Defend against simulated zero-day attacks while maintaining system uptime.",
    challenge: "Create adaptive cryptographic protocols that rewrite their own signatures when breached.",
    tools: "Rust, Kali, Wireshark, Zero-Trust Architecture",
    ideal: "Automated threat neutralizing, Decentralized identity verification."
  },
  {
    id: "web3",
    title: "WEB3 & DEPIN",
    altitude: "4,500M",
    top: "45%",
    left: "80%",
    desc: "The future is trustless. Build the decentralized infrastructure that powers the next era of human coordination.",
    challenge: "Solve the blockchain trilemma for high-frequency, low-bandwidth environments.",
    tools: "Solidity, Rust, IPFS, zk-SNARKs",
    ideal: "Decentralized Physical Infrastructure Networks (DePIN), zk-Rollups."
  },
  {
    id: "fintech",
    title: "FINTECH",
    altitude: "4,200M",
    top: "55%",
    left: "15%",
    desc: "Redefine global capital flow. Strip away legacy financial bottlenecks and create frictionless monetary systems.",
    challenge: "Process millions of micro-transactions per second with absolute mathematical certainty and zero gas fees.",
    tools: "Stripe APIs, Plaid, Smart Contracts, Go",
    ideal: "Algorithmic stablecoins, Cross-border micro-liquidity pools."
  },
  {
    id: "health",
    title: "HEALTH-TECH",
    altitude: "3,800M",
    top: "70%",
    left: "60%",
    desc: "Code that saves lives. Push the boundaries of human longevity and medical data processing.",
    challenge: "Analyze terabytes of genomic data in real-time to predict pathological anomalies before they manifest.",
    tools: "Python, Bio-informatics APIs, Wearable SDKs",
    ideal: "Real-time biometric telemetry, AI-driven diagnostics."
  },
  {
    id: "climate",
    title: "CLIMATE-TECH",
    altitude: "3,500M",
    top: "85%",
    left: "30%",
    desc: "Engineering for planetary survival. Build the software that reverses the damage of the industrial age.",
    challenge: "Optimize decentralized energy grids to perfectly balance supply and demand without battery waste.",
    tools: "IoT Sensors, Machine Learning, Geospatial APIs",
    ideal: "Carbon tracking ledgers, Micro-grid optimization algorithms."
  },
  {
    id: "edtech",
    title: "ED-TECH",
    altitude: "3,200M",
    top: "35%",
    left: "50%",
    desc: "Accelerate human learning. Build systems that adapt to the neurological patterns of the individual.",
    challenge: "Create a platform that dynamically rewrites its curriculum in real-time based on eye-tracking and hesitation.",
    tools: "React, WebGL, AI Tutors, NLP",
    ideal: "Hyper-personalized learning matrices, VR classrooms."
  },
  {
    id: "open",
    title: "OPEN INNOVATION",
    altitude: "2,500M",
    top: "75%",
    left: "85%",
    desc: "Base Camp. No rules. No tracks. If it solves a massive global problem and the code is flawless, it belongs here.",
    challenge: "Identify a critical failure in modern society and engineer a solution so elegant it cannot be ignored.",
    tools: "Anything. Everything.",
    ideal: "The impossible."
  }
];

export function Tracks() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedTrack = TRACKS.find((t) => t.id === selectedId);

  return (
    <section className="relative w-full h-screen bg-[#000000] overflow-hidden select-none">
      
      {/* Background Topographic Map Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.2 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
        {/* CSS Topographic Rings */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(255,255,255,0.1) 41px),
              repeating-radial-gradient(circle at 20% 30%, transparent 0, transparent 60px, rgba(255,255,255,0.05) 61px),
              repeating-radial-gradient(circle at 80% 80%, transparent 0, transparent 80px, rgba(255,255,255,0.08) 81px)
            `
          }}
        />
        {/* Grid lines */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Map Header */}
      <div className="absolute top-12 left-12 z-10 pointer-events-none">
        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">
          THE <span className="text-white/40">TRACKS</span>
        </h2>
        <div className="flex items-center gap-4 mt-2 font-mono text-xs text-accent">
          <Crosshair className="w-4 h-4" />
          <span>RADAR: ACTIVE</span>
          <span className="text-white/30">|</span>
          <span>SELECT A PEAK TO EXPAND</span>
        </div>
      </div>

      {/* The Nodes (Peaks) */}
      <div className="relative w-full h-full z-20">
        {TRACKS.map((track) => (
          <motion.div
            key={track.id}
            layoutId={`card-${track.id}`}
            onClick={() => setSelectedId(track.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-none group flex flex-col items-center justify-center"
            style={{ top: track.top, left: track.left }}
            whileHover={{ scale: 1.1 }}
          >
            {/* The Dot */}
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 border border-white/20 rounded-full animate-ping opacity-50" />
              <div className="absolute inset-0 border border-white/40 rounded-full scale-150 transition-all duration-500 group-hover:border-accent group-hover:scale-110" />
              <div className="w-2 h-2 bg-white rounded-full group-hover:bg-accent transition-colors shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:shadow-[0_0_20px_#00f0ff]" />
            </div>

            {/* Hover Tooltip Label */}
            <div className="absolute top-10 flex flex-col items-center opacity-70 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-xs font-bold text-white tracking-widest whitespace-nowrap mb-1">
                {track.title}
              </span>
              <span className="font-mono text-[10px] text-accent tracking-widest px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-full">
                {track.altitude}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Overlay using AnimatePresence */}
      <AnimatePresence>
        {selectedId && selectedTrack && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md cursor-none"
            />

            {/* Expanded Card */}
            <motion.div
              layoutId={`card-${selectedTrack.id}`}
              className="relative w-full max-w-5xl h-full md:h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,240,255,0.1)] cursor-auto"
            >
              {/* Massive faded background stat */}
              <div className="absolute -bottom-10 -right-10 text-[15vw] font-display font-bold text-white/[0.02] pointer-events-none leading-none select-none">
                {selectedTrack.altitude}
              </div>

              {/* Header */}
              <div className="relative flex justify-between items-center p-6 md:p-10 border-b border-white/10 bg-white/[0.02]">
                <div>
                  <div className="font-mono text-xs text-accent tracking-[0.2em] mb-2">
                    ELEVATION: {selectedTrack.altitude}
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
                    {selectedTrack.title}
                  </h3>
                </div>
                
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white transition-colors cursor-none group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Body Content */}
              <div className="relative p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-12 flex-1 overflow-y-auto custom-scrollbar">
                
                <div className="space-y-10">
                  <div>
                    <h4 className="font-mono text-xs text-white/40 tracking-[0.2em] mb-4 border-b border-white/10 pb-2">THE MISSION</h4>
                    <p className="font-sans text-lg text-white/80 leading-relaxed">
                      {selectedTrack.desc}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-white/40 tracking-[0.2em] mb-4 border-b border-white/10 pb-2">THE CORE CHALLENGE</h4>
                    <p className="font-sans text-lg text-white/80 leading-relaxed">
                      {selectedTrack.challenge}
                    </p>
                  </div>
                </div>

                <div className="space-y-10">
                  <div>
                    <h4 className="font-mono text-xs text-white/40 tracking-[0.2em] mb-4 border-b border-white/10 pb-2">PERMITTED TOOLS</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTrack.tools.split(",").map((tool, i) => (
                        <span key={i} className="px-3 py-1 bg-white/[0.05] border border-white/10 text-white/70 font-mono text-xs rounded-sm">
                          {tool.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-white/40 tracking-[0.2em] mb-4 border-b border-white/10 pb-2">IDEAL ARCHETYPES</h4>
                    <ul className="space-y-3">
                      {selectedTrack.ideal.split(",").map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/80 font-sans">
                          <span className="text-accent font-mono text-xs mt-1">{"//"}</span>
                          {item.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
