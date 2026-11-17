import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Dumbbell, Scale, Boxes, Download, X, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const projectsData = [
  {
    id: 'twinflow-ai',
    title: 'TwinFlow AI',
    icon: Boxes,
    category: 'Cyber-Physical Systems & AI',
    badge: 'Featured',
    summary: 'An autonomous warehouse 3D digital twin and predictive congestion engine. It leverages dynamic spatio-temporal deep learning to forecast bottlenecks and optimize AGV logistics in real time.',
    description: 'TwinFlow AI is a state-of-the-art enterprise Cyber-Physical System (CPS) designed for smart logistics and fulfillment centers. It unifies an interactive 3D WebGL spatial digital twin with real-time IoT/AGV fleet telemetry and a Dynamic Spatio-Temporal Graph Transformer (DSTGT v1.0) deep learning model to forecast warehouse aisle bottlenecks 15 minutes in advance with 92.4% accuracy.',
    features: [
      'Interactive 3D Spatial Digital Twin (WebGL & Three.js at 60 FPS)',
      'Predictive Congestion AI Engine (DSTGT Graph Transformer)',
      'Real-Time IoT & AGV Fleet Telemetry Simulation',
      'Dynamic Aisle Rerouting & What-If Scenario Sandbox'
    ],
    techStack: ['Three.js', 'React', 'PyTorch / DSTGT', 'Kafka / IoT', 'TailwindCSS'],
    downloadUrl: '/TF.zip',
    downloadFilename: 'TwinFlow-AI-Source.zip',
    downloadLabel: 'Download Full Project Source (.zip)',
    downloadSize: '44.4 MB',
    additionalDownload: {
      url: '/TwinFlow_AI_Documentation.pdf',
      filename: 'TwinFlow_AI_Documentation.pdf',
      label: 'Download Architecture PDF (3.1 MB)'
    },
    delay: 0.1
  },
  {
    id: 'ai-creatorhub',
    title: 'AI CreatorHub',
    icon: Cpu,
    category: 'Generative AI Platform',
    summary: 'A centralized workspace for digital creators powered by AI. This platform streamlines content generation, editing, and distribution using advanced machine learning models.',
    description: 'AI CreatorHub unifies generative AI tooling into an integrated creator suite. It empowers digital artists, writers, and marketing teams to generate multi-modal media, automate iterative editing pipelines, and distribute cross-platform assets with enterprise-grade version control.',
    features: [
      'Multi-modal Generative AI Workflows',
      'Automated Asset Versioning & Distribution',
      'Scalable High-Throughput Cloud Architecture',
      'Role-based Collaboration & Security Controls'
    ],
    techStack: ['React', 'Node.js', 'OpenAI API', 'Python', 'AWS S3', 'PostgreSQL'],
    downloadFilename: 'AI_CreatorHub_CaseStudy.txt',
    downloadLabel: 'Download Project Specification',
    downloadSize: 'Case Study & Architecture',
    delay: 0.2
  },
  {
    id: 'vibeflow',
    title: 'Vibeflow',
    icon: Activity,
    category: 'HealthTech & Biofeedback',
    summary: 'A dynamic wellness and mindfulness application. Vibeflow uses real-time biofeedback and personalized metrics to help users achieve their optimal mental and physical states.',
    description: 'Vibeflow is a next-generation wellness tracking application that interfaces with wearable sensors to evaluate heart-rate variability, physiological stress markers, and sleep cycles. It dynamically adapts guided mindfulness sessions and provides real-time biofeedback for cognitive and physical recovery.',
    features: [
      'Real-time Biofeedback & Sensor Telemetry',
      'Personalized Recovery & Mental Health Dashboards',
      'Seamless Wearable API Integrations',
      'Adaptive Audio-Visual Neuro-Relaxation'
    ],
    techStack: ['React Native', 'Node.js', 'WebSockets', 'HealthKit / Google Fit', 'MongoDB'],
    downloadFilename: 'Vibeflow_CaseStudy.txt',
    downloadLabel: 'Download Project Specification',
    downloadSize: 'Case Study & Architecture',
    delay: 0.3
  },
  {
    id: 'muscle-hub',
    title: 'Muscle Hub',
    icon: Dumbbell,
    category: 'Fitness & Community SaaS',
    summary: 'An all-in-one fitness tracking and community platform. Built for gyms and personal trainers, Muscle Hub tracks workout progress, dietary habits, and fosters a competitive yet supportive community.',
    description: 'Muscle Hub provides boutique fitness centers and personal trainers with end-to-end client management tools. From progressive overload workout tracking and macronutrient analytics to gamified gym leaderboards and automated subscription management.',
    features: [
      'Comprehensive Progressive Workout Logging',
      'Social Leaderboards & Community Challenges',
      'Personal Trainer Client Management Portal',
      'Mobile-first Responsive Architecture'
    ],
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    downloadFilename: 'MuscleHub_CaseStudy.txt',
    downloadLabel: 'Download Project Specification',
    downloadSize: 'Case Study & Architecture',
    delay: 0.4
  },
  {
    id: 'legal-judgment',
    title: 'Legal Judgment Summarization',
    icon: Scale,
    category: 'LegalTech & NLP',
    summary: 'A sophisticated legal tech tool that leverages natural language processing to digest and summarize complex court rulings into clear, actionable insights for legal professionals.',
    description: 'Designed specifically for corporate legal departments and litigators, this NLP-driven platform ingests hundreds of pages of complex jurisprudence, precedents, and court transcripts. It isolates key holdings, statutory citations, and argument ratios in seconds with enterprise-grade data protection.',
    features: [
      'Advanced NLP Transformer Algorithms & Citation Parsing',
      'Bank-grade Encrypted Data Handling & Privacy',
      'Multi-tier Jurisprudential Summarization',
      'Exportable Legal Briefs & Precedent Linking'
    ],
    techStack: ['Python', 'FastAPI', 'BERT / LLMs', 'React', 'Docker'],
    downloadFilename: 'Legal_Judgment_Summarization_CaseStudy.txt',
    downloadLabel: 'Download Project Specification',
    downloadSize: 'Case Study & Architecture',
    delay: 0.5
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [downloading, setDownloading] = useState(false);

  // Close popup on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when popup is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const handleDownload = (project, customUrl, customFilename) => {
    setDownloading(true);
    const url = customUrl || project.downloadUrl;
    const filename = customFilename || project.downloadFilename;

    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `${project.title}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Dynamic specification download for projects without static assets
      const content = `=====================================================
${project.title.toUpperCase()} - PROJECT SPECIFICATION & ARCHITECTURE
Nocami Labs (https://nocamilabs.duckdns.org)
=====================================================

Category: ${project.category}
Status: Production / Enterprise Solution

Description:
${project.description}

Key Technical Highlights:
${project.features.map((f) => ` - ${f}`).join('\n')}

Architecture & Tech Stack:
${project.techStack.join(', ')}

-----------------------------------------------------
For enterprise deployment inquiries, licensing, or source access:
Email: nocamilabs@gmail.com
Phone: +91 4366353547
Web: https://nocamilabs.duckdns.org
=====================================================`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || `${project.title.replace(/[^a-zA-Z0-9]/g, '_')}_CaseStudy.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }

    setTimeout(() => {
      setDownloading(false);
    }, 1200);
  };

  return (
    <section className="py-20 px-6 bg-white min-h-screen relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Recent Projects</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Deep dives into the custom architectures and scalable solutions we've built for modern enterprises. Click on any project to explore details and download assets.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projectsData.map((project) => {
            const IconComponent = project.icon;
            return (
              <FadeIn key={project.id} delay={project.delay}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  className="group relative border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 bg-gray-50 hover:bg-white hover:border-red-500 cursor-pointer flex flex-col justify-between h-full transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-red-50 rounded-xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                        <IconComponent size={36} />
                      </div>
                      {project.badge ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider">
                          <Sparkles size={12} /> {project.badge}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-500 bg-gray-200/70 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {project.summary}
                    </p>
                    <ul className="list-disc list-inside text-slate-700 font-medium space-y-2 mb-6">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Click to open popup & download button prompt */}
                  <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between text-red-600 font-semibold group-hover:text-red-700">
                    <span className="flex items-center gap-1.5 text-sm">
                      View Details & Download
                    </span>
                    <div className="flex items-center gap-1.5 text-sm bg-red-50 group-hover:bg-red-600 group-hover:text-white px-3 py-1.5 rounded-lg transition-colors">
                      <Download size={16} />
                      <span>Download</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Project Details & Download Popup Tab (Modal) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 bg-slate-900 text-white flex items-start justify-between relative">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg">
                    {React.createElement(selectedProject.icon, { size: 36 })}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-red-400 tracking-wider uppercase block mb-1">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
                  aria-label="Close popup"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Project Overview
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-base">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Key Architectural Capabilities
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedProject.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <CheckCircle2 size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-800 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer with Download Action */}
              <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 text-center sm:text-left">
                  <span>File size: </span>
                  <span className="font-semibold text-slate-700">{selectedProject.downloadSize}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                  {selectedProject.additionalDownload && (
                    <button
                      onClick={() =>
                        handleDownload(
                          selectedProject,
                          selectedProject.additionalDownload.url,
                          selectedProject.additionalDownload.filename
                        )
                      }
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 bg-white text-slate-700 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm shadow-sm"
                    >
                      <FileText size={16} className="text-red-600" />
                      <span>{selectedProject.additionalDownload.label}</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDownload(selectedProject)}
                    disabled={downloading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all font-semibold text-sm shadow-md hover:shadow-lg disabled:opacity-70 active:scale-95"
                  >
                    <Download size={18} />
                    <span>{downloading ? 'Preparing Download...' : selectedProject.downloadLabel}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
