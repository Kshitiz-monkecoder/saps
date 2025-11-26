import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollingText() {
  const marqueeRef = useRef(null);

  const textArray = [
    "Elevate.",
    "Inspire.",
    "Luxury.",
    "Innovation.",
    "Cinematic.",
    "SAPS.",
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    const totalWidth = marquee.scrollWidth / 2; // width of one full copy

    gsap.to(marquee, {
      x: `-${totalWidth}px`,
      ease: "linear",
      duration: 60, // slower, smoother scroll
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`, // seamless loop
      },
    });
  }, []);

  // Enough repeated content for seamless loop
  const repeatedText = Array(10).fill(textArray).flat();

  return (
    <div className="relative bg-[#0f0f0f] w-full overflow-hidden h-32 flex items-center">
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ minWidth: "200%" }}
      >
        {repeatedText.map((word, i) => (
          <span
            key={i}
            className="mx-8 font-montserrat md:text-3xl text-2xl font-extralight font-[Playfair_Display] text-[#d4b878] tracking-widest"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
