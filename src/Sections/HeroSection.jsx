import React from 'react'
import Header from '../components/Header'
import ModelViewer from '../ModelViewer'
import ContactUs from '../components/ContactUs.jsx'
import StrategyText from './StrategyText.jsx'

const HeroSection = () => {
  return (
    <div>
        <Header />
        <ModelViewer />
        <StrategyText />
    </div>
  )
}

export default HeroSection