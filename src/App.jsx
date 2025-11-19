import React from 'react'
import HeroSection from './Sections/HeroSection'
import Demo from './Sections/Demo'
import AboutSection from './Sections/AboutSection'
import SolarSystemSection from './Sections/SolarSystemSection'
import AboutSAPS from './Sections/AboutSAPS.jsx'

function App() {
  return (
    <div className="App ">
      <HeroSection />
      <AboutSAPS />
      {/* <AboutSection /> */}
      <Demo />
      <SolarSystemSection />
      
    </div>
  )
}

export default App
