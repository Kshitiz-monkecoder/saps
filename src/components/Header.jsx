import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <header
      className="fixed top-0 left-0 w-full z-30
      backdrop-blur-xl bg-black/30 border-b border-white/10 
      py-4 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10">
        
        {/* Logo */}
        <img
          src="/logo.png"
          alt="SA Logo"
          className="h-12 w-auto object-contain"
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-gray-300 font-cinzel text-lg tracking-wide">
          {["Services", "About", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <span className="transition text-gray-300 group-hover:text-[#E6C27A]">
                {item}
              </span>

              {/* Gold underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px]
                bg-[#E6C27A] group-hover:w-full transition-all duration-300 rounded-full"></span>
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(true)}
        >
          <HiMenuAlt3 />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div
          className="
            fixed inset-0 z-[9999]
            bg-black/80 backdrop-blur-xl
            flex flex-col items-center justify-center
            space-y-12
            text-white font-cinzel
            text-3xl tracking-wide
          "
        >
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-4xl text-gray-300 hover:text-white"
          >
            <IoClose />
          </button>

          {/* Menu Items */}
          {["Services", "About", "Contact"].map((item) => (
            <a
              key={item}
              onClick={() => setOpen(false)}
              href={`#${item.toLowerCase()}`}
              className="hover:text-[#E6C27A] transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
