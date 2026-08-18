"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Check if we are on a touch device, if so, don't show the custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      
      // We look for button, a, or any element with cursor: pointer
      const isHoveringInteractive = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("button") !== null ||
        target.closest("a") !== null;
        
      setIsPointer(isHoveringInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isPointer ? 0 : 1,
          opacity: position.x === -100 ? 0 : 1
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      
      {/* Outer Expedition Ring / Crosshair */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[9998] mix-blend-difference hidden md:flex"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          width: 40,
          height: 40,
          scale: isPointer ? 1.5 : 1,
          opacity: position.x === -100 ? 0 : 1
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      >
        {/* Hover Ring (only shows when hovering interactive elements) */}
        <motion.div 
          className="absolute inset-0 rounded-full border-[1.5px] border-white/80" 
          initial={{ opacity: 0 }}
          animate={{ opacity: isPointer ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Crosshair ticks (only visible when NOT hovering a pointer) */}
        <motion.div 
          className="absolute inset-0"
          animate={{ opacity: isPointer ? 0 : 1, rotate: isPointer ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top Tick */}
          <div className="absolute top-[-4px] left-[19px] w-[2px] h-[8px] bg-white/80 rounded-full" />
          {/* Bottom Tick */}
          <div className="absolute bottom-[-4px] left-[19px] w-[2px] h-[8px] bg-white/80 rounded-full" />
          {/* Left Tick */}
          <div className="absolute left-[-4px] top-[19px] w-[8px] h-[2px] bg-white/80 rounded-full" />
          {/* Right Tick */}
          <div className="absolute right-[-4px] top-[19px] w-[8px] h-[2px] bg-white/80 rounded-full" />
        </motion.div>
      </motion.div>
    </>
  );
}
