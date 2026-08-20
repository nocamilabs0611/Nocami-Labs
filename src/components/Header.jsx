import React from 'react';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <Code2 className="text-red-600" size={32} />
          <span>Nocami Labs</span>
        </Link>
        <nav className="hidden md:flex gap-8 items-center font-medium">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <Link to="/services" className="hover:text-red-600 transition-colors">Services</Link>
          <Link to="/projects" className="hover:text-red-600 transition-colors">Projects</Link>
          <Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
