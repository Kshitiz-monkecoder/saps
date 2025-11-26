import React from "react";
import { motion } from "framer-motion";

const whatWeProvide = [
  {
    title: "Fast & Efficient",
    desc: "We ensure all our services are delivered quickly without compromising quality.",
  },
  {
    title: "Secure & Reliable",
    desc: "Your data and transactions are safe with our robust security measures.",
  },
  {
    title: "Premium Support",
    desc: "Our team is available 24/7 to assist you with all inquiries.",
  },
  {
    title: "Tailored Solutions",
    desc: "We customize our offerings to perfectly match your needs.",
  },
  {
    title: "Innovative Approach",
    desc: "We apply the latest strategies and technology for maximum impact.",
  },
  {
    title: "Luxury Experience",
    desc: "Every interaction reflects sophistication and high standards.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};

const WhatWeProvide = () => {
  return (
    <section className="w-full bg-black py-24 px-6 md:px-20 text-white relative overflow-hidden">
      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-[#000000]/70 via-[#111111]/50 to-[#000000]/70 pointer-events-none"></div>

      <h2 className="text-4xl md:text-4.5xl font-cinzel font-bold text-[#d4b878] text-center mb-6 relative z-10">
        What We Provide
      </h2>
      <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16 relative z-10 text-lg md:text-lg">
        We focus on delivering excellence through values that truly make a difference.
      </p>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {whatWeProvide.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-[#111] border border-[#d4b878]/50 rounded-2xl p-6 flex flex-col justify-between shadow-2xl hover:shadow-[#d4b878]/40 hover:scale-105 transition-transform duration-500 cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-2xl font-cinzel font-semibold text-[#d4b878] mb-3 tracking-wide">
              {item.title}
            </h3>
            <p className="text-gray-300 font-montserrat text-base">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Subtle cinematic sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-1 h-1 bg-[#d4b878]/70 rounded-full absolute animate-pulse" style={{ top: "20%", left: "10%" }}></div>
        <div className="w-1 h-1 bg-[#d4b878]/50 rounded-full absolute animate-pulse delay-200" style={{ top: "50%", left: "80%" }}></div>
        <div className="w-1 h-1 bg-[#d4b878]/60 rounded-full absolute animate-pulse delay-500" style={{ top: "70%", left: "40%" }}></div>
      </div>
    </section>
  );
};

export default WhatWeProvide;
