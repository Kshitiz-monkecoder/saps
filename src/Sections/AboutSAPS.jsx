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
    desc: "Where creative direction meets visual elegance every frame, word, and element crafted with intent.",
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

  useEffect(() => {
    const ctx = gsap.context(() => {

      // GLOBAL SCROLL SECTION
      gsap.from(".main-title", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
      });

      // LOOP THROUGH 4 LETTERS
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
            duration: 1.2,
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
      id="about"
      className="relative w-full min-h-screen bg-[#0f0f0f] text-white pt-[50px] pb-[200px] px-10"
    >
      {/* MAIN TITLE */}
      <h1 className="main-title text-center text-[130px] font-montserrat font-extralight tracking-[0.5em] font-[Playfair_Display] text-[#d4b878] mb-[200px]">
        SAPS
      </h1>

      {/* 4 SCROLL SECTIONS */}
      <div className="flex flex-col gap-[300px] max-w-[1200px] mx-auto">

        {data.map((item, i) => (
          <div key={i} className="relative w-full flex flex-col items-center">

            {/* ORIGINAL LETTER */}
            <div
              ref={(el) => (letterRefs.current[i] = el)}
              className="text-[180px] font-cinzel text-[#d4b878] opacity-40 select-none"
            >
              {item.letter}
            </div>

            {/* NEW WORD */}
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
    </section>
  );
}
