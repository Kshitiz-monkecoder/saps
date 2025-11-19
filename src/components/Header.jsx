import React from 'react'

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-20 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* 🌟 Logo Image */}
        <img
          src="/logo.png"         // <-- Put your logo file in /public/logo.png
          alt="SA Logo"
          className="h-10 w-auto object-contain" 
        />

        {/* 🧭 Navigation Links */}
        <nav className="flex space-x-8 text-gray-300 font-gotham font-medium">
          <a
            href="#services"
            className="hover:text-white hover:underline underline-offset-4 transition-all duration-300"
          >
            Services
          </a>
          <a
            href="#about"
            className="hover:text-white hover:underline underline-offset-4 transition-all duration-300"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-white hover:underline underline-offset-4 transition-all duration-300"
          >
            Contact
          </a>
        </nav>

      </div>
    </header>
  )
}

export default Header
