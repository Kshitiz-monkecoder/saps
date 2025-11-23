import React from "react";
import { motion } from "framer-motion";

export default function ThreeDDevVisualizationSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center py-28 px-10">

      {/* LUXURY BACKGROUND FX */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-radial from-yellow-500/20 via-transparent to-transparent blur-[160px] opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,220,120,0.07),transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.085] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-6xl font-cinzel tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#E4D29B] to-[#C2A66A] drop-shadow-[0_4px_25px_rgba(255,230,150,0.1)]">
            3D Development <br /> & Visualization
          </h1>

          <ul className="space-y-4 text-gray-300 text-[15px] leading-relaxed">
            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Creating precise and high-fidelity 3D models tailored to your project’s vision
            </li>

            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Producing realistic renders with refined lighting, textures, and detail
            </li>

            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Visualizing concepts, products, and environments before they are built
            </li>

            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Delivering versatile 3D assets suitable for branding, marketing, and presentations
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
            <span className="relative z-10">Contact for more →</span>
          </button>
        </motion.div>

        {/* RIGHT — STATIC LUXURY IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative flex justify-center items-center"
        >
          {/* Ambient halo */}
          <div className="absolute w-[480px] h-[480px] bg-yellow-500/10 blur-[120px] rounded-full"></div>

          {/* STATIC IMAGE (no animation loop) */}
          <div className="relative w-[340px] md:w-[420px] lg:w-[500px] overflow-hidden">
            <img
              src="/media/3d_visual.jpg"  // change image path
              className="w-full h-full object-cover"
            />

            {/* Holographic sheen */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-40 mix-blend-soft-light"></div>
          </div>

          <p className="absolute bottom-[-40px] mt-5 text-sm text-gray-400 tracking-[0.25em]">
            SEE BEFORE IT EXISTS
          </p>
        </motion.div>

      </div>
    </section>
  );
}
