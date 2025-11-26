import React from "react";
import { motion } from "framer-motion";

export default function PhotographyVideoSection1() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white py-28 px-6 md:px-12 lg:px-20 overflow-hidden">

      {/* ===== RIGHT SIDE — ULTRA SHARP BACKGROUND VIDEO ===== */}
      <div className="absolute inset-0">
        <video
          src="/media/videoplayback (1).mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        />

        {/* LEFT → RIGHT LUXURY FADE (Text sits directly on this) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
      </div>

      {/* ===== CONTENT (No box, directly on gradient) ===== */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center z-10">

        {/* LEFT TEXT — NO BACKGROUND BOX */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <h2 className="text-5xl md:text-6xl font-cinzel tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#DCC98F] to-[#B69658] drop-shadow-xl">
            Photography & Video Production
          </h2>

          <ul className="space-y-4 text-gray-300/95 text-[15px] leading-relaxed">
            <li className="flex gap-3">
              <span className="text-[#E8D8A8] mt-1">✦</span>
              High-end, polished visuals crafted for premium brands
            </li>
            <li className="flex gap-3">
              <span className="text-[#E8D8A8] mt-1">✦</span>
              Cinematic filming with crisp editorial-grade results
            </li>
            <li className="flex gap-3">
              <span className="text-[#E8D8A8] mt-1">✦</span>
              Creative direction blended with technical mastery
            </li>
            <li className="flex gap-3">
              <span className="text-[#E8D8A8] mt-1">✦</span>
              Delivering content suitable for luxury fashion & brand campaigns
            </li>
          </ul>

          <button
            className="
              relative px-10 py-3 mt-4 font-semibold group
              text-[#EAD9A8] tracking-wide rounded-xl overflow-hidden
              border border-[#C9A86A]/30 bg-black/20 backdrop-blur-sm
              transition-all duration-500 hover:border-[#F1D08A]/60
              hover:shadow-[0_0_40px_rgba(230,200,150,0.30)]
              cursor-pointer
            "
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#7A5F33]/25 via-transparent to-[#E6C07B]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="absolute left-[-150%] top-0 h-full w-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 transition-all duration-700 ease-out group-hover:left-[150%]"></span>
            <span className="relative z-10">Contact for more →</span>
          </button>
        </motion.div>

        {/* Empty right side (video behind) */}
        <div />
      </div>
    </section>
  );
}
