import React from "react";
import { motion } from "framer-motion";

export default function PhotographyVideoSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT — TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-5xl md:text-6xl font-cinzel tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#E4D29B] to-[#C2A66A]">
            Photography & Video Production
          </h2>

          <ul className="space-y-4 text-gray-300 text-[15px] leading-relaxed">
            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Capturing polished, high-quality visuals tailored to your project’s needs
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Delivering clean, professionally executed photo and film content
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Combining creative direction with technical expertise for consistent results
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Providing versatile assets suitable for marketing, branding, and promotions
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

        {/* RIGHT — SINGLE VIDEO (Full height, no border, no shadow) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex justify-center"
        >
         <div className="relative w-[300px] md:w-[350px] lg:w-[390px] aspect-2/3 rounded-[22px] overflow-hidden mx-auto">
  
  {/* Canva video */}
  <video
    src="/media/2 unti.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  />


</div>
<p className="absolute bottom-[-40px] text-sm text-gray-400 tracking-[0.25em]">
            CAPTURE THE MOMENT
          </p>


        </motion.div>
         

      </div>
    </section>
  );
}
