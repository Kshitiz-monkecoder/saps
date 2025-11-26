import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const sparklesRef = useRef([]);

  useEffect(() => {
    // Floating sparkles animation using GSAP
    sparklesRef.current.forEach((el, i) => {
      gsap.to(el, {
        y: ["0%", "100%", "0%"],
        x: ["0%", "50%", "0%"],
        duration: 20 + i * 5,
        repeat: -1,
        ease: "linear",
      });
    });
  }, []);

  return (
    <section id="contact" className="relative w-full min-h-screen bg-[#0f0f0f] overflow-hidden flex items-center justify-center py-24 px-6">
      {/* Background Cinematic FX */}
      <div className="absolute inset-0 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Floating Sparkles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (sparklesRef.current[i] = el)}
          className={`absolute w-1 h-1 bg-gold rounded-full opacity-70 top-${Math.floor(Math.random() * 80)} left-${Math.floor(Math.random() * 80)}`}
        />
      ))}

      <div className="relative max-w-6xl w-full grid md:grid-cols-2 gap-16 z-10">
        {/* Glass Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3 }}
          className="bg-black/30 backdrop-blur-xl p-12 rounded-3xl border border-gold/30 shadow-xl"
        >
          <h2 className="text-4xl md:text-5xl font-cinzel bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6 tracking-wider drop-shadow-[0_4px_25px_rgba(255,215,140,0.3)]">
            Get in Touch
          </h2>
          <p className="text-gray-300 mb-8 tracking-wide">
            Connect with DubaiLux to elevate your brand. Luxury, futuristic, and cinematic.
          </p>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-xl bg-black/60 border border-gray-700 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition text-gray-200"
            />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-4 rounded-xl bg-black/60 border border-gray-700 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition text-gray-200"
            />
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full p-4 rounded-xl bg-black/60 border border-gray-700 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition text-gray-200"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(255,215,140,0.6)" }}
              className="w-full cursor-pointer py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold text-lg shadow-lg transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Cinematic Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="relative flex flex-col justify-center items-center text-center space-y-8"
        >
          <div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-600/20 blur-3xl animate-pulse"></div>
          <div className="absolute top-10 left-1/4 w-8 h-8 bg-gold/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-gold/30 rounded-full animate-pulse"></div>

          <div className="relative z-10 space-y-6 text-gray-200">
            <div className="flex items-center gap-4 justify-center text-lg">
              <FaPhoneAlt className="text-gold" size={24} />
              <p>+971 55 123 4567</p>
            </div>
            <div className="flex items-center gap-4 justify-center text-lg">
              <FaEnvelope className="text-gold" size={24} />
              <p>info@dubailux.com</p>
            </div>
          </div>

          <p className="relative z-10 text-gray-400 text-sm tracking-widest mt-6">
            LET’S CREATE SOMETHING EXTRAORDINARY
          </p>
        </motion.div>
      </div>
    </section>
  );
}
