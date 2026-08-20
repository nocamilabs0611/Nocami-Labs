import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-2xl font-bold text-slate-900 z-50">
          <Code2 className="text-red-600" size={32} />
          <span>Nocami Labs</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center font-medium">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <Link to="/services" className="hover:text-red-600 transition-colors">Services</Link>
          <Link to="/projects" className="hover:text-red-600 transition-colors">Projects</Link>
          <Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden z-50 text-slate-900" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4 font-medium">
              <Link to="/" onClick={closeMenu} className="hover:text-red-600 transition-colors py-2 border-b border-gray-50">Home</Link>
              <Link to="/services" onClick={closeMenu} className="hover:text-red-600 transition-colors py-2 border-b border-gray-50">Services</Link>
              <Link to="/projects" onClick={closeMenu} className="hover:text-red-600 transition-colors py-2 border-b border-gray-50">Projects</Link>
              <Link to="/contact" onClick={closeMenu} className="hover:text-red-600 transition-colors py-2">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
