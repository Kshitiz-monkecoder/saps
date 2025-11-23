import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const shapes = ["circle", "triangle", "square"];

// HOLOGRAPHIC DISSOLVE VARIANTS 🔥 (Same as AboutSAPS dissolve)
const dissolveVariants = {
  initial: {
    opacity: 0,
    scale: 0.6,
    y: 40,
    filter: "blur(20px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 1.5,
    filter: "blur(30px)",
    transition: {
      duration: 1.3,
      ease: "easeInOut",
    },
  },
};

export default function BrandingSection() {
  const [shapeIndex, setShapeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setShapeIndex((prev) => (prev + 1) % shapes.length),
      3500
    );
    return () => clearInterval(interval);
  }, []);

  const currentShape = shapes[shapeIndex];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center py-28 px-10">

      {/* ====================== */}
      {/* BACKGROUND LUXURY FX */}
      {/* ====================== */}

      {/* Top cinematic glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-radial from-yellow-500/20 via-transparent to-transparent blur-[160px] opacity-60"></div>

      {/* Spotlight beams */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,220,120,0.07),transparent_70%)] pointer-events-none"></div>

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.085] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10">

        {/* ================================================== */}
        {/* LEFT CONTENT — ULTRA LUXURY BRANDING COPY */}
        {/* ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-6xl font-cinzel tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#E4D29B] to-[#C2A66A] drop-shadow-[0_4px_25px_rgba(255,230,150,0.1)]">
            Brand Strategy & <br /> Creative Direction
          </h1>

          <ul className="space-y-4 text-gray-300 text-[15px] leading-relaxed">
            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Defining a distinctive brand narrative built on insight and
              intention
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Sculpting a refined visual language that elevates your market
              presence
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Curating moodboards, tonal systems, and creative frameworks with
              precision
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Aligning every touchpoint with a cohesive, future-forward brand
              vision
            </li>
          </ul>

          <button
            className="
              relative px-10 py-3 mt-4 font-semibold
              text-[#EED8A6] tracking-wide rounded-xl overflow-hidden
              border border-[#C9A86A]/40 bg-white/5 backdrop-blur-xl
              shadow-[inset_0_0_25px_rgba(255,255,255,0.05)]
              transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,215,140,0.35)]
              hover:border-[#F1D08A]/60 hover:text-[#F3E6C3] cursor-pointer
            "
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#7A5F33]/20 via-transparent to-[#E6C07B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="absolute left-[-150%] top-0 h-full w-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent rotate-12 transition-all duration-700 ease-out group-hover:left-[150%]"></span>
            <span className="relative z-10 flex items-center gap-2">
              Contact for more <span className="text-[#F3DFA6]">→</span>
            </span>
          </button>
        </motion.div>

        {/* ================================================== */}
        {/* RIGHT — DISSOLVING SHAPE TRANSITIONS */}
        {/* ================================================== */}
        <div className="relative flex justify-center items-center h-[380px] md:h-[420px]">
          
          {/* Ambient particles */}
          <div className="absolute inset-0 animate-pulse opacity-40 bg-[radial-gradient(circle,rgba(255,255,255,0.09),transparent_70%)] blur-3xl"></div>

          <AnimatePresence mode="wait">
            {/* CIRCLE */}
            {currentShape === "circle" && (
              <motion.div
                key="circle"
                variants={dissolveVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute"
              >
                <div className="w-56 h-56 rounded-full bg-gradient-to-br from-blue-400 to-blue-800 shadow-[0_0_100px_-10px_rgba(80,120,255,0.55)]"></div>
              </motion.div>
            )}

            {/* TRIANGLE */}
            {currentShape === "triangle" && (
              <motion.div
                key="triangle"
                variants={dissolveVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-56 h-56 rounded-full bg-purple-500/25 blur-3xl"></div>
                  <div
                    className="
                      w-0 h-0
                      border-l-[110px] border-r-[110px] border-b-[180px]
                      border-l-transparent border-r-transparent 
                      border-b-purple-400
                    "
                  ></div>
                </div>
              </motion.div>
            )}

            {/* SQUARE */}
            {currentShape === "square" && (
              <motion.div
                key="square"
                variants={dissolveVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute"
              >
                <div className="w-52 h-52 bg-gradient-to-br from-blue-300 to-blue-700 rounded-xl shadow-[0_0_100px_-15px_rgba(80,120,255,0.55)]"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="absolute bottom-0 text-sm text-gray-400 tracking-[0.25em]">
            SHAPE YOUR IDENTITY
          </p>
        </div>
      </div>
    </section>
  );
}
