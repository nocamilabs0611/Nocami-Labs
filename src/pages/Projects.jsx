import React from 'react';
import { Cpu, Activity, Dumbbell, Scale } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Projects = () => {
  return (
    <section className="py-20 px-6 bg-white min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Recent Projects</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Deep dives into the custom architectures and scalable solutions we've built for modern enterprises.</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* AI CreatorHub Card */}
          <FadeIn delay={0.1}>
            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow bg-gray-50 h-full">
              <Cpu className="text-red-600 mb-6" size={48} />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">AI CreatorHub</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                A centralized workspace for digital creators powered by AI. This platform streamlines content generation, editing, and distribution using advanced machine learning models.
              </p>
              <ul className="list-disc list-inside text-slate-700 font-medium space-y-2">
                <li>Generative AI Tools Integration</li>
                <li>Automated Content Workflows</li>
                <li>Scalable Cloud Infrastructure</li>
              </ul>
            </div>
          </FadeIn>

          {/* Vibeflow Card */}
          <FadeIn delay={0.3}>
            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow bg-gray-50 h-full">
              <Activity className="text-red-600 mb-6" size={48} />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Vibeflow</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                A dynamic wellness and mindfulness application. Vibeflow uses real-time biofeedback and personalized metrics to help users achieve their optimal mental and physical states.
              </p>
              <ul className="list-disc list-inside text-slate-700 font-medium space-y-2">
                <li>Real-time Data Processing</li>
                <li>Personalized User Dashboards</li>
                <li>Seamless Third-party API Integrations</li>
              </ul>
            </div>
          </FadeIn>

          {/* Muscle Hub Card */}
          <FadeIn delay={0.5}>
            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow bg-gray-50 h-full">
              <Dumbbell className="text-red-600 mb-6" size={48} />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Muscle Hub</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                An all-in-one fitness tracking and community platform. Built for gyms and personal trainers, Muscle Hub tracks workout progress, dietary habits, and fosters a competitive yet supportive community.
              </p>
              <ul className="list-disc list-inside text-slate-700 font-medium space-y-2">
                <li>Comprehensive Tracking Systems</li>
                <li>Social Features and Leaderboards</li>
                <li>Mobile-first Responsive Design</li>
              </ul>
            </div>
          </FadeIn>

          {/* Legal judgment Summarization Card */}
          <FadeIn delay={0.7}>
            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow bg-gray-50 h-full">
              <Scale className="text-red-600 mb-6" size={48} />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Legal Judgment Summarization</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                A sophisticated legal tech tool that leverages natural language processing to digest and summarize complex court rulings into clear, actionable insights for legal professionals.
              </p>
              <ul className="list-disc list-inside text-slate-700 font-medium space-y-2">
                <li>Advanced NLP Algorithms</li>
                <li>Secure Data Handling</li>
                <li>High-accuracy Text Summarization</li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Projects;
