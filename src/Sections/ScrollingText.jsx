import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollingText() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;

    // GSAP infinite loop
    gsap.to(marquee, {
      x: "-50%", // move full width of first copy
      ease: "linear",
      repeat: -1,
      duration: 30, // adjust speed
    });
  }, []);

  const textArray = [
    "Elevate.",
    "Inspire.",
    "Luxury.",
    "Innovation.",
    "Cinematic.",
    "SAPS.",
  ];

  return (
    <div className="relative bg-[#0f0f0f] w-full overflow-hidden h-32 flex items-center">
      {/* Duplicate for seamless loop */}
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap"
        style={{ minWidth: "200%" }}
      >
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex">
            {textArray.map((word, i) => (
              <span
                key={`${idx}-${i}`}
                className="mx-8 font-montserrat text-2xl md:text-3xl font-extralight font-[Playfair_Display] text-[#d4b878] tracking-widest"
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
