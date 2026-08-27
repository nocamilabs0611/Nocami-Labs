import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Home = () => {
  return (
    <div>
      {/* Unified Hero and Trust Banner */}
      <section className="bg-slate-900 text-white relative overflow-hidden pt-8">
        <img
          src="https://i.pinimg.com/1200x/72/e7/c4/72e7c45fe83fec3e1bcb4b82f4fd118e.jpg"
          alt="Hero banner"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        {/* Main Hero Content */}
        <div
          className="container mx-auto relative z-10 py-24 px-6 flex flex-col md:flex-row items-center rounded-3xl overflow-hidden shadow-2xl bg-transparent"
        >
          {/* Soft overlay to ensure text is perfectly legible */}
          <div className="absolute inset-0 bg-transparent z-0 pointer-events-none"></div>

          <div className="w-full md:w-1/2 pr-0 md:pr-12 relative z-10">
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg text-white">
                <span className="block">Software</span>
                <span className="block text-red-500 text-5xl md:text-6xl my-2">Development</span>
                <span className="block">Company</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-xl text-slate-200 mb-8 border-l-4 border-red-500 pl-4 drop-shadow-md">
                Software for the Open Enterprise
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-red-500 text-white hover:bg-red-500 transition-colors font-semibold rounded backdrop-blur-sm bg-black/20">
                Read More <ChevronRight size={20} />
              </Link>
            </FadeIn>
          </div>
        </div>

        {/* Floating Tech Stack Integrated into Background */}
        <div className="container mx-auto relative z-10 px-6 pb-24">
          <FadeIn delay={0.7}>
            <div className="flex flex-wrap justify-center gap-12 text-slate-200 font-bold text-xl uppercase tracking-wider items-center">
              <span className="animate-float-slow drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] text-sky-300">React.js</span>
              <span className="animate-float-medium drop-shadow-[0_0_8px_rgba(74,222,128,0.6)] text-green-300">Node.js</span>
              <span className="animate-float-fast drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] text-yellow-300">AWS</span>
              <span className="animate-float-slow drop-shadow-[0_0_8px_rgba(74,222,128,0.6)] text-green-400">MongoDB</span>
              <span className="animate-float-medium drop-shadow-[0_0_8px_rgba(244,114,182,0.6)] text-pink-300">Figma</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 bg-slate-200 h-96 rounded-lg shadow-inner flex items-center justify-center">
            <FadeIn direction="left" className="w-full h-full">
              {/* Image Placeholder */}
              <img className="w-full h-full object-cover rounded-lg" src="https://i.pinimg.com/1200x/59/40/07/594007995760faa69c3348d1b006a967.jpg" alt="IT Specialties" />
            </FadeIn>
          </div>
          <div className="w-full md:w-1/2">
            <FadeIn direction="right" delay={0.2}>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">We team of experience<br />IT Specialties.</h2>
            </FadeIn>
            <div className="space-y-6">
              <FadeIn direction="right" delay={0.4}>
                <div className="flex gap-4">
                  <CheckCircle2 className="text-red-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Cloud-Based Services</h3>
                    <p className="text-slate-600 mt-2">Deploying scalable, secure infrastructure tailored to modern business demands.</p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn direction="right" delay={0.6}>
                <div className="flex gap-4">
                  <CheckCircle2 className="text-red-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Responsive & Mobile-Friendly</h3>
                    <p className="text-slate-600 mt-2">Crafting fluid applications that perform flawlessly across all devices and screen sizes.</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
