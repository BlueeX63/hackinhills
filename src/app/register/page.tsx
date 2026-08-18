"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

const registrationSchema = z.object({
  teamName: z.string().min(2, "REQUIRED"),
  teamSize: z.coerce.number().min(1, "MIN 1").max(4, "MAX 4"),
  members: z.array(z.object({
    name: z.string().min(2, "REQUIRED"),
    email: z.string().email("INVALID COMM LINK"),
    phone: z.string().min(10, "INVALID PHONE")
  })),
  track: z.string().min(2, "REQUIRED")
});

type FormData = z.infer<typeof registrationSchema>;
type FormField = any; // We use 'any' to dynamically handle nested object paths like 'members.0.name'

export default function RegisterPage() {
  const [isEntrance, setIsEntrance] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number>(0);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      teamSize: 1
    }
  });

  // Dynamically build the accordion rows based on team size
  const teamSize = watch("teamSize") || 1;
  const numMembers = Math.min(Math.max(1, teamSize), 4); // clamp 1-4

  const FIELDS: { id: string; label: string; placeholder: string; type: string }[] = [];
  FIELDS.push({ id: "teamName", label: "01. SQUAD DESIGNATION", placeholder: "TEAM NAME", type: "text" });
  FIELDS.push({ id: "teamSize", label: "02. CREW SIZE (1-4)", placeholder: "NUMBER", type: "number" });
  
  for (let i = 0; i < numMembers; i++) {
    FIELDS.push({ id: `members.${i}.name`, label: `${String(FIELDS.length + 1).padStart(2, '0')}. MEMBER ${i+1} NAME`, placeholder: "LEGAL NAME", type: "text" });
    FIELDS.push({ id: `members.${i}.email`, label: `${String(FIELDS.length + 1).padStart(2, '0')}. MEMBER ${i+1} EMAIL`, placeholder: "EMAIL ADDRESS", type: "email" });
    FIELDS.push({ id: `members.${i}.phone`, label: `${String(FIELDS.length + 1).padStart(2, '0')}. MEMBER ${i+1} PHONE`, placeholder: "MOBILE NUMBER", type: "tel" });
  }

  FIELDS.push({ id: "track", label: `${String(FIELDS.length + 1).padStart(2, '0')}. CHOOSE YOUR PEAK`, placeholder: "AI, WEB3, CYBER...", type: "text" });

  // Refs for auto-focusing inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Entrance Transition
  useEffect(() => {
    const timer = setTimeout(() => setIsEntrance(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-focus the input when a row expands
  useEffect(() => {
    if (!isEntrance && expandedRow < FIELDS.length) {
      setTimeout(() => {
        if (inputRefs.current[expandedRow]) {
          inputRefs.current[expandedRow]?.focus();
        }
      }, 400); // Wait for accordion animation to finish
    }
  }, [expandedRow, isEntrance]);

  const handleNextRow = async (currentIndex: number) => {
    const fieldId = FIELDS[currentIndex].id as FormField;
    // Trigger validation for this specific field
    const isValid = await trigger(fieldId);
    
    if (isValid) {
      setExpandedRow(currentIndex + 1);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleNextRow(index);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("REGISTERED:", data);
    setIsSuccess(true);
  };

  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-white cursor-none overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* 
        ENTRANCE TRANSITION 
        System Access Glitch over the uploaded red hills image.
        Slides DOWN from top, plays glitch, slides UP to reveal accordion.
      */}
      <AnimatePresence>
        {isEntrance && (
          <motion.div 
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ y: "-100%" }}
            animate={{ y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 } }}
          >
            <div className="absolute inset-0">
              <Image src="/red-hills.jpg" alt="Mountains" fill className="object-cover saturate-50 contrast-125 brightness-75" priority />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center mix-blend-difference"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1, 0] }}
                transition={{ duration: 0.5, repeat: 3, repeatType: "reverse" }}
                className="text-white font-mono text-sm tracking-widest absolute top-12 left-12"
              >
                INITIALIZING CONNECTION...
              </motion.div>
              
              <motion.div 
                className="w-full h-[1px] bg-white absolute top-1/2"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1, y: [-50, 50, -25, 100, 0] }}
                transition={{ duration: 1.5, ease: "linear" }}
              />
              
              <motion.h1 
                className="text-5xl md:text-8xl font-black tracking-tighter uppercase"
                initial={{ opacity: 0, skewX: 20 }}
                animate={{ opacity: 1, skewX: [20, -20, 10, -5, 0], x: [-10, 10, -5, 5, 0] }}
                transition={{ duration: 0.4, repeat: 3 }}
              >
                SYSTEM ACCESS
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <motion.div 
        className="w-full px-6 md:px-12 pt-12 pb-8 flex justify-between items-start pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isEntrance ? 0 : 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div>
          <div className="text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase mb-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            EXPEDITION PROTOCOL
          </div>
          <div className="text-white font-black tracking-tighter text-xl uppercase">
            HACK IN HILLS
          </div>
        </div>
        <div className="text-right">
          <div className="text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase mb-1">
            COORDINATES
          </div>
          <div className="text-white/80 font-mono text-xs tracking-widest uppercase">
            32°14&apos;N 77°11&apos;E
          </div>
        </div>
      </motion.div>

      {/* THE BRUTALIST ACCORDION FORM */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: isEntrance ? 0 : 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              
              <div className="border-t border-white/20">
                {FIELDS.map((field, index) => {
                  const isExpanded = expandedRow === index;
                  const isCompleted = expandedRow > index;
                  const fieldId = field.id as FormField;
                  
                  // Safe nested error resolution for arrays (e.g. members.0.name)
                  const errorObj = fieldId.split('.').reduce((acc: any, part: string) => acc && acc[part], errors);
                  const hasError = !!errorObj;
                  const errorMessage = errorObj?.message as string | undefined;

                  // We must merge the react-hook-form register ref with our custom auto-focus ref
                  const { ref: rhfRef, ...rest } = register(fieldId);

                  return (
                    <div 
                      key={field.id}
                      className={`border-b ${isExpanded ? 'border-white' : 'border-white/20'} transition-colors duration-500`}
                    >
                      {/* Accordion Header (Clickable) */}
                      <div 
                        className={`py-8 md:py-12 w-full flex items-center justify-between group ${isCompleted || isExpanded ? 'cursor-none' : 'cursor-none opacity-50'}`}
                        onClick={() => {
                          if (isCompleted || isExpanded) {
                            setExpandedRow(index);
                          }
                        }}
                      >
                        <h2 className={`text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase transition-colors duration-500 ${isExpanded ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                          {field.label}
                        </h2>
                        
                        {/* Status Indicator */}
                        <div className="hidden md:flex items-center gap-4">
                          {isCompleted && !isExpanded && (
                            <span className="font-mono text-xs tracking-widest text-green-500 uppercase">VERIFIED</span>
                          )}
                          {hasError && !isExpanded && (
                            <span className="font-mono text-xs tracking-widest text-red-500 uppercase">ERROR</span>
                          )}
                          <div className={`w-4 h-4 border transition-colors duration-500 flex items-center justify-center ${isExpanded ? 'border-white' : 'border-white/20'}`}>
                            <div className={`w-2 h-2 bg-white transition-transform duration-500 ${isExpanded ? 'scale-100' : 'scale-0'}`} />
                          </div>
                        </div>
                      </div>

                      {/* Accordion Content (The Input) */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-12 md:pb-16 flex flex-col items-start relative">
                              <input 
                                {...rest}
                                ref={(e) => {
                                  rhfRef(e);
                                  inputRefs.current[index] = e;
                                }}
                                type={field.type}
                                placeholder={field.placeholder}
                                onKeyDown={(e) => onKeyDown(e, index)}
                                autoComplete="off"
                                className="w-full bg-transparent text-4xl md:text-6xl lg:text-[6vw] font-black uppercase tracking-tighter text-white placeholder-white/10 focus:outline-none cursor-none"
                                min={field.type === 'number' ? (field as any).min : undefined}
                                max={field.type === 'number' ? (field as any).max : undefined}
                              />
                              
                              <div className="w-full flex items-end justify-between mt-8">
                                <div className="h-6">
                                  {hasError ? (
                                    <span className="font-mono text-xs tracking-widest text-red-500 uppercase animate-pulse">
                                      {errorMessage}
                                    </span>
                                  ) : (
                                    <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
                                      PRESS ENTER TO CONFIRM
                                    </span>
                                  )}
                                </div>
                                
                                <button
                                  type="button"
                                  onClick={() => handleNextRow(index)}
                                  className="group flex items-center gap-4 cursor-none"
                                >
                                  <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/60 group-hover:text-white uppercase transition-colors">
                                    NEXT
                                  </span>
                                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-colors duration-500">
                                    <svg className="w-4 h-4 text-white group-hover:text-black transition-colors transform group-hover:translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Final Submit Button (Only visible when all rows are completed) */}
              <AnimatePresence>
                {expandedRow === FIELDS.length && (
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="pt-16 md:pt-24 flex justify-center"
                  >
                    <button 
                      type="submit"
                      className="group flex items-center gap-6 cursor-none"
                    >
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-colors duration-500">
                        <svg className="w-6 h-6 md:w-10 md:h-10 text-white group-hover:text-black transition-colors duration-500 transform group-hover:translate-x-2 ease-[0.76,0,0.24,1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                      <span className="text-2xl md:text-5xl font-black uppercase tracking-widest text-white group-hover:text-white/70 transition-colors">
                        AUTHORIZE
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.form>
          ) : (
            <motion.div 
              key="success"
              className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <div className="w-3 h-3 bg-white rounded-full animate-ping" />
              </div>
              <div className="text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase mb-4">UPLINK ESTABLISHED</div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase mb-16 leading-[0.9]">
                DATA<br/>TRANSMITTED.
              </h2>
              
              <Link href="/" className="group relative inline-flex items-center gap-4 text-xl font-black uppercase tracking-widest cursor-none overflow-hidden pb-2">
                <span className="relative z-10">RETURN TO BASE</span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
