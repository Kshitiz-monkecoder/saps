import React from "react";
import { motion } from "framer-motion";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

export default function SocialMediaManagementSection() {
  return (
    <section id="#Services" className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center py-28 px-10">

      {/* GOLD AMBIENT GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] bg-gradient-radial from-yellow-500/25 via-transparent to-transparent blur-[180px] opacity-70"></div>

      {/* SOFT BEAM */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,225,150,0.08),transparent_70%)] pointer-events-none"></div>

      {/* FILM GRAIN */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center z-10">

        {/* LEFT TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-6xl font-cinzel tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#EAD9A5] to-[#C7A667] drop-shadow-[0_4px_25px_rgba(255,230,150,0.18)]">
            Social Media <br /> Management
          </h1>

          <ul className="space-y-4 text-gray-300 text-[15px] leading-relaxed">
            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Designing cohesive, platform-ready content aligned with your brand’s tone
            </li>

            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Planning structured social calendars for consistent and strategic posting
            </li>

            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Managing day-to-day presence with thoughtful engagement and oversight
            </li>

            <li className="flex gap-3">
              <span className="text-yellow-400 mt-1">✦</span>
              Tracking performance insights to refine content and optimize growth
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
            Contact for more →
          </button>
        </motion.div>

        {/* RIGHT — FLOATING 3D SOCIAL MEDIA SPHERES */}
      <motion.div
  initial={{ opacity: 0, scale: 0.85, y: 40 }}
  whileInView={{ opacity: 1, scale: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1.4, ease: "easeOut" }}
  className="relative w-full h-[420px] flex items-center justify-center"
>
  {/* Ambient glow */}
  <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 blur-[150px] rounded-full"></div>

  {/* SPHERE 1 — INSTAGRAM */}
  <motion.div
    animate={{
      x: [0, 80, 0, -80, 0],       // Circular-ish path
      y: [0, 0, 80, 0, -80],
      rotate: [0, 90, 180, 270, 360],
    }}
    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-400 shadow-[0_0_60px_20px_rgba(255,80,180,0.3)] flex items-center justify-center"
  >
    <BsInstagram className="text-4xl text-white" />
  </motion.div>

  {/* SPHERE 2 — FACEBOOK */}
  <motion.div
    animate={{
      x: [0, -100, 0, 100, 0],  // Bigger orbit to avoid collision
      y: [0, 0, -60, 0, 60],
      rotate: [0, 180, 270, 360, 450],
    }}
    transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
    className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 shadow-[0_0_50px_15px_rgba(80,160,255,0.3)] flex items-center justify-center"
  >
    <FaFacebook className="text-3xl text-white" />
  </motion.div>

  {/* SPHERE 3 — YOUTUBE */}
  <motion.div
    animate={{
      x: [0, 60, -60, 60, 0],   // Another offset orbit
      y: [0, -70, 70, -40, 0],
      rotate: [0, 120, 240, 360, 480],
    }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_70px_25px_rgba(255,50,50,0.35)] flex items-center justify-center"
  >
    <BsYoutube className="text-4xl text-white" />
  </motion.div>

  <p className="absolute bottom-[-40px] text-sm text-gray-400 tracking-[0.25em]">
    GROW YOUR ONLINE PRESENCE
  </p>
</motion.div>

      </div>
    </section>
  );
}
