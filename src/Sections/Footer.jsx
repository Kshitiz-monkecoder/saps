import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 relative overflow-hidden">
      {/* Cinematic background glow */}
      <div className="absolute inset-0 bg-[#0f0f0f] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
        {/* Logo & Tagline */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12">
          <div className="mb-8 md:mb-0">
            <img
          src="/logo.png"
          alt="SA Logo"
          className="h-14 w-auto object-contain"
        />

            <p className="mt-2 text-gray-400 max-w-sm">
              Elevating brands with unmatched Dubai luxury services. Professional, stylish, and timeless.
            </p>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-[#d4b878] font-semibold mb-4">Services</h2>
              <ul className="space-y-2">
                <li className="hover:text-[#d4b878] transition-colors cursor-pointer">Photography Production</li>
                <li className="hover:text-[#d4b878] transition-colors cursor-pointer">Web Development</li>
                <li className="hover:text-[#d4b878] transition-colors cursor-pointer">Branding Direction</li>
                <li className="hover:text-[#d4b878] transition-colors cursor-pointer">3D Animation</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[#d4b878] font-semibold mb-4">Company</h2>
              <ul className="space-y-2">
                <li className="hover:text-[#d4b878] transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-[#d4b878] transition-colors cursor-pointer">Services</li>
                <li className="hover:text-[#d4b878] transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[#d4b878] font-semibold mb-4">Follow Us</h2>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="hover:text-[#d4b878] transition-colors"><FaFacebookF /></a>
                <a href="#" className="hover:text-[#d4b878] transition-colors"><FaInstagram /></a>
                <a href="#" className="hover:text-[#d4b878] transition-colors"><FaTwitter /></a>
                <a href="#" className="hover:text-[#d4b878] transition-colors"><FaLinkedinIn /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SAPS. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
