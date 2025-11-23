import React from "react";
import HeroSection from "../Sections/HeroSection";
import AboutSAPS from "../Sections/AboutSAPS";
import SolarSystemSection from "../Sections/SolarSystemSection";
import Demo from "../Sections/Demo";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSAPS />
      <SolarSystemSection />
      <Demo />
    </div>
  );
}
