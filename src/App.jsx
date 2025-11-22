import React from 'react'
import HeroSection from './Sections/HeroSection'
import Demo from './Sections/Demo'
import AboutSection from './Sections/AboutSection'
import SolarSystemSection from './Sections/SolarSystemSection'
import AboutSAPS from './Sections/AboutSAPS.jsx'
import BrandingSection from './Pages/BrandingSection.jsx'

function App() {
  return (
    <div className="App ">
      <HeroSection />
      <AboutSAPS />
      {/* <AboutSection /> */}
      <SolarSystemSection />
      <Demo />
      <BrandingSection />
    </div>
  )
}

export default App
