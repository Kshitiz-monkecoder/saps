import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BrandingSection from "./Pages/BrandingSection";
import PhotographyVideoSection from "./Pages/PhotographyVideoSection";
import PhotographyVideoSection1 from "./Pages/PhotographyVideoSection1";
import WebDesignDevSection from "./Pages/WebDesignDevSection";
import SocialMediaManagementSection from "./Pages/SocialMediaManagementSection";
import ThreeDDevVisualizationSection from "./Pages/ThreeDDevVisualizationSection";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Branding Service Page */}
        <Route path="/services/branding" element={<BrandingSection />} />
        <Route path="/services/photography" element={<PhotographyVideoSection />} />
        <Route path="/services/photography1" element={<PhotographyVideoSection1 />} />
        <Route path="/services/web-design-development" element={<WebDesignDevSection />} />
        <Route path="/services/social-media" element={<SocialMediaManagementSection />} />
        <Route path="/services/3d-models" element={<ThreeDDevVisualizationSection />} />
      </Routes>
    </Router>
  );
}

export default App;
