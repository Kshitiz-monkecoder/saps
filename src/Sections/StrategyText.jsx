import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const StrategyText = () => {
  const textRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [])

  return (
    <div className="w-full h-52 bg-[#0f0f0f] flex items-center justify-center">
      <div
        ref={textRef}
        className="flex items-center w-full max-w-[1400px] justify-center opacity-0"
      >
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#d9d9d9]/50 to-transparent" />

        <span className="mx-6 text-[13px] tracking-[0.45em] text-[#d9d9d9] uppercase font-extralight whitespace-nowrap">
          WHERE&nbsp;STORIES&nbsp;BECOME&nbsp;STRATEGY
        </span>

        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#d9d9d9]/50 to-transparent" />
      </div>
    </div>
  )
}

export default StrategyText
