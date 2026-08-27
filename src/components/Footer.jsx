import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Nocami Labs</h3>
          <p className="mb-4">Software for the Open Enterprise. We build fast, scalable applications that grow your business.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
          <p>Email: nocamilabs@gmail.com</p>
          <p>Phone: +91 4366353547</p>
          <a href="https://nocamilabs.duckdns.org"><p>Web: https://nocamilabs.duckdns.org</p></a>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Services</h3>
          <p>Custom Software Development</p>
          <p>Web Application Development</p>
          <p>Mobile App Development</p>
          <p>Enterprise Software Development</p>
        </div>
      </div>
      <div className="text-center mt-12 border-t border-slate-700 pt-6 text-sm">
        © {new Date().getFullYear()} Nocami Labs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
