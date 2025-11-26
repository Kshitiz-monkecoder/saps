import React from "react";
import HeroSection from "../Sections/HeroSection";
import AboutSAPS from "../Sections/AboutSAPS";
import SolarSystemSection from "../Sections/SolarSystemSection";
import Demo from "../Sections/Demo";
import WhatWeProvide from "../Sections/WhatWeProvide";
import Footer from "../Sections/Footer";
import Contact from "../Sections/Contact";
import ScrollingText from "../Sections/ScrollingText";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSAPS />
      <WhatWeProvide />
      <SolarSystemSection />
      <Contact />
      <ScrollingText />
      <Footer />
    </div>
  );
}
