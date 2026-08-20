import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, Code2, PenTool } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We provide comprehensive digital solutions tailored to modern enterprises. From scalable architecture to intuitive interfaces, our team delivers excellence at every level.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Full-Stack Web Development */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <Globe className="text-red-600 mb-6" size={48} />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Full-Stack Web Development</h2>
            <p className="text-slate-600 leading-relaxed">
              Highlighting our expertise in building responsive, scalable web applications using React.js and Node.js. We focus on incredibly fast load times and creating seamless user experiences.
            </p>
          </div>

          {/* Mobile Application Development */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <Smartphone className="text-red-600 mb-6" size={48} />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Mobile Application Development</h2>
            <p className="text-slate-600 leading-relaxed">
              Focused on delivering high-performance, cross-platform mobile solutions tailored for both iOS and Android environments to help you reach your users anywhere.
            </p>
          </div>

          {/* Custom Software Solutions */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <Code2 className="text-red-600 mb-6" size={48} />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Custom Software Solutions</h2>
            <p className="text-slate-600 leading-relaxed">
              We design robust backend architectures, seamless API integrations, and build highly secure, scalable enterprise software from scratch to fit your unique business needs.
            </p>
          </div>

          {/* UI/UX Design */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <PenTool className="text-red-600 mb-6" size={48} />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">UI/UX Design</h2>
            <p className="text-slate-600 leading-relaxed">
              Emphasizing the creation of intuitive, modern, and user-centric interfaces. We craft experiences that drive meaningful user engagement and maximize conversion rates.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white p-10 rounded-xl border border-gray-200 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to start your project?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Let's discuss how we can help you build your next big idea. Our team is ready to deliver tailored solutions for your enterprise.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-bold shadow-sm"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
