import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    letter: "S",
    title: "STRATEGY",
    desc: "We craft intelligent brand blueprints designed to outperform markets, dominate attention, and move people.",
  },
  {
    letter: "A",
    title: "ARTISTRY",
    desc: "Where creative direction meets visual elegance — every frame, word, and element crafted with intent.",
  },
  {
    letter: "P",
    title: "PERFORMANCE",
    desc: "We build systems that convert: precise execution, measurable impact, and data-driven refinement.",
  },
  {
    letter: "S",
    title: "STRUCTURE",
    desc: "Meticulous frameworks that ensure longevity, scalability, and absolute operational stability.",
  },
];

export default function AboutSAPS() {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);
  const titleRefs = useRef([]);
  const descRefs = useRef([]);
  const dustRef = useRef(null);
  const mainRef = useRef(null);

  // 🌟 CREATE DUST PARTICLES (50–80)
  const createDust = () => {
    const container = dustRef.current;
    for (let i = 0; i < 60; i++) {
      const dot = document.createElement("div");
      dot.className = "dust-dot";
      container.appendChild(dot);
    }
  };

  useEffect(() => {
    createDust();

    const ctx = gsap.context(() => {
      // ✨ DUST REVEAL ANIMATION (Intro)
      const dustDots = gsap.utils.toArray(".dust-dot");

      gsap.set(dustDots, {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.2,
      });

      gsap.to(dustDots, {
        opacity: 1,
        scale: () => Math.random() * 1.2 + 0.5,
        x: () => (Math.random() - 0.5) * 600,
        y: () => (Math.random() - 0.5) * 300,
        duration: 1.8,
        ease: "power2.out",
        stagger: { amount: 0.8 },
      });

      // ✨ REVEAL SAPS MAIN TITLE
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, scale: 0.8, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // 🌀 DUST EXIT TRANSITION (when scrolling)
      gsap.to(dustDots, {
        opacity: 0,
        scale: 0.1,
        x: () => (Math.random() - 0.5) * 200,
        y: () => (Math.random() - 0.5) * 150,
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom+=200 top",
          scrub: true,
        },
      });

      // ----------------------------------------------------------------------------------
      // ⭐ EXISTING 4-LETTER PARALLAX SCROLL ANIMATIONS
      // ----------------------------------------------------------------------------------

      data.forEach((item, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: letterRefs.current[i],
            start: "top center+=150",
            end: "bottom center-=200",
            scrub: true,
          },
        });

        tl.to(letterRefs.current[i], {
          opacity: 0,
          scale: 1.5,
          filter: "blur(20px)",
          duration: 1,
          ease: "power2.inOut",
        });

        tl.fromTo(
          titleRefs.current[i],
          { opacity: 0, y: 40, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        );

        tl.fromTo(
          descRefs.current[i],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0f0f0f] text-white py-[200px] px-10 overflow-hidden"
    >
      {/* 🔥 DUST PARTICLE CONTAINER */}
      <div
        ref={dustRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* MAIN TITLE */}
      <h1
        ref={mainRef}
        className="main-title text-center text-[130px] font-cinzel tracking-[0.1em] text-[#d4b878] mb-[200px] relative z-[2]"
      >
        SAPS
      </h1>

      {/* 4 SCROLL LETTERS */}
      <div className="flex flex-col gap-[300px] max-w-[1200px] mx-auto relative z-[3]">
        {data.map((item, i) => (
          <div key={i} className="relative w-full flex flex-col items-center">
            {/* LETTER */}
            <div
              ref={(el) => (letterRefs.current[i] = el)}
              className="text-[180px] font-cinzel text-[#d4b878] opacity-40 select-none"
            >
              {item.letter}
            </div>

            {/* WORD TITLE */}
            <h2
              ref={(el) => (titleRefs.current[i] = el)}
              className="text-[70px] font-cinzel text-[#e2c797] tracking-[0.25em] mt-[-100px] opacity-0"
            >
              {item.title}
            </h2>

            {/* DESCRIPTION */}
            <p
              ref={(el) => (descRefs.current[i] = el)}
              className="max-w-[800px] text-center text-[18px] text-gray-300 leading-relaxed opacity-0 mt-6"
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* DUST PARTICLE STYLE */}
      <style>{`
        .dust-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #e5c48b, #b3925e);
          border-radius: 50%;
          pointer-events: none;
          filter: blur(2px);
        }
      `}</style>
    </section>
  );
}
