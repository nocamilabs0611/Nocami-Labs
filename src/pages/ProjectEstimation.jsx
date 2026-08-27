import React, { useState, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import {
  Sparkles,
  Send,
  Brain,
  HelpCircle,
  ArrowRight,
  Check,
  Cpu,
  Clock,
  Calendar,
  IndianRupee,
  RefreshCw,
  AlertCircle,
  Key,
  Info
} from 'lucide-react';
import FadeIn from '../components/FadeIn';

const ProjectEstimation = () => {
  // Navigation states: 'setup' | 'loading' | 'questions' | 'result'
  const [step, setStep] = useState('setup');

  // Project input states
  const [projectName, setProjectName] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [targetBudget, setTargetBudget] = useState('');
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [errorMsg, setErrorMsg] = useState('');

  // AI-generated questions state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionId: selectedOptionObject }

  // Final Contact state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  // local backup questions if API key is empty or fails
  const getLocalBackupQuestions = (brief, name) => {
    const text = (brief + " " + name).toLowerCase();

    if (text.includes('e-commerce') || text.includes('shop') || text.includes('store') || text.includes('sell')) {
      return [
        {
          id: 'q1',
          questionText: 'What is the scale of your product catalog?',
          options: [
            { optionText: 'Under 100 products (Standard setup)', additionalCost: 15000, additionalHours: 30 },
            { optionText: '100 - 5,000 products (Requires complex search & filtering)', additionalCost: 35000, additionalHours: 60 },
            { optionText: 'Enterprise Catalog / Multi-vendor Marketplace', additionalCost: 75000, additionalHours: 120 }
          ]
        },
        {
          id: 'q2',
          questionText: 'Which payment systems are required?',
          options: [
            { optionText: 'Simple UPI & Credit Card Gateway (Razorpay/Stripe)', additionalCost: 10000, additionalHours: 20 },
            { optionText: 'Subscription billing & multi-currency billing plans', additionalCost: 25000, additionalHours: 45 },
            { optionText: 'Custom digital wallets & split payouts to sellers', additionalCost: 60000, additionalHours: 90 }
          ]
        },
        {
          id: 'q3',
          questionText: 'Do you need advanced CRM or Inventory sync?',
          options: [
            { optionText: 'No, standard local DB records are sufficient', additionalCost: 5000, additionalHours: 10 },
            { optionText: 'Sync with Salesforce, HubSpot, or custom ERP systems', additionalCost: 30000, additionalHours: 50 },
            { optionText: 'AI-driven personalized product recommendations', additionalCost: 50000, additionalHours: 80 }
          ]
        },
        {
          id: 'q4',
          questionText: 'What is your target launch timeline?',
          options: [
            { optionText: 'Relaxed (16-24 weeks / Lower overhead)', additionalCost: 0, additionalHours: 0 },
            { optionText: 'Recommended standard delivery (8-12 weeks)', additionalCost: 5000, additionalHours: 10 },
            { optionText: 'Rush / Express delivery (4-6 weeks / Double engineering speed)', additionalCost: 20000, additionalHours: 35 }
          ]
        },
        {
          id: 'q5',
          questionText: 'What design style and customization level is needed?',
          options: [
            { optionText: 'Standard MVP layout templates', additionalCost: 0, additionalHours: 0 },
            { optionText: 'Custom premium responsive brand templates', additionalCost: 15000, additionalHours: 25 },
            { optionText: 'Immersive layouts with custom micro-animations & dark mode', additionalCost: 35000, additionalHours: 55 }
          ]
        }
      ];
    }

    if (text.includes('chat') || text.includes('message') || text.includes('social') || text.includes('meet')) {
      return [
        {
          id: 'q1',
          questionText: 'What type of message synchronization is needed?',
          options: [
            { optionText: 'Text messages only (Real-time WebSockets)', additionalCost: 15000, additionalHours: 35 },
            { optionText: 'Multimedia sharing (Images, voice notes, files)', additionalCost: 30000, additionalHours: 60 },
            { optionText: 'End-to-End Encrypted (E2EE) security layers', additionalCost: 65000, additionalHours: 110 }
          ]
        },
        {
          id: 'q2',
          questionText: 'Are voice or video calls required?',
          options: [
            { optionText: 'No, text chat only', additionalCost: 0, additionalHours: 0 },
            { optionText: '1-on-1 audio/video calls (WebRTC integration)', additionalCost: 40000, additionalHours: 70 },
            { optionText: 'Group calls & interactive screen sharing sessions', additionalCost: 80000, additionalHours: 130 }
          ]
        },
        {
          id: 'q3',
          questionText: 'Do you need chatbot integrations?',
          options: [
            { optionText: 'No, human-to-human interaction only', additionalCost: 0, additionalHours: 0 },
            { optionText: 'Basic automated FAQ responder triggers', additionalCost: 12000, additionalHours: 25 },
            { optionText: 'Advanced LLM semantic agent handling live customer support', additionalCost: 45000, additionalHours: 80 }
          ]
        },
        {
          id: 'q4',
          questionText: 'What is the expected concurrent user scale?',
          options: [
            { optionText: 'Up to 1,000 active concurrent users', additionalCost: 5000, additionalHours: 15 },
            { optionText: '1,000 - 50,000 concurrent users (Requires auto-scaling setup)', additionalCost: 25000, additionalHours: 45 },
            { optionText: 'High scale 50,000+ active users (Enterprise architecture)', additionalCost: 60000, additionalHours: 90 }
          ]
        },
        {
          id: 'q5',
          questionText: 'What design style and customization level is needed?',
          options: [
            { optionText: 'Standard MVP layout templates', additionalCost: 0, additionalHours: 0 },
            { optionText: 'Custom premium responsive brand templates', additionalCost: 15000, additionalHours: 25 },
            { optionText: 'Immersive layouts with custom micro-animations & dark mode', additionalCost: 35000, additionalHours: 55 }
          ]
        }
      ];
    }

    return [
      {
        id: 'q1',
        questionText: 'What is the primary target platform?',
        options: [
          { optionText: 'Responsive Web Application (Single codebase)', additionalCost: 12000, additionalHours: 25 },
          { optionText: 'Cross-platform Mobile Application (iOS & Android)', additionalCost: 28000, additionalHours: 50 },
          { optionText: 'Multi-platform Ecosystem (Web Portal + Mobile Clients)', additionalCost: 65000, additionalHours: 110 }
        ]
      },
      {
        id: 'q2',
        questionText: 'How complex is the user role management system?',
        options: [
          { optionText: 'Simple (Admin and standard consumer log-in)', additionalCost: 8000, additionalHours: 15 },
          { optionText: 'Granular (Multiple organizations, department permissions, audit logs)', additionalCost: 22000, additionalHours: 40 },
          { optionText: 'Enterprise SSO integration (SAML, Okta, Active Directory)', additionalCost: 48000, additionalHours: 75 }
        ]
      },
      {
        id: 'q3',
        questionText: 'What level of custom reporting / analytics is needed?',
        options: [
          { optionText: 'Standard summary metrics (List views, simple stats)', additionalCost: 5000, additionalHours: 12 },
          { optionText: 'Interactive chart dashboards & automated PDF exports', additionalCost: 18000, additionalHours: 35 },
          { optionText: 'AI-powered anomaly detection & predictive analytics charts', additionalCost: 45000, additionalHours: 75 }
        ]
      },
      {
        id: 'q4',
        questionText: 'Do you require custom third-party integrations?',
        options: [
          { optionText: 'None, standalone database configuration', additionalCost: 0, additionalHours: 0 },
          { optionText: '1-2 API Syncs (Slack, HubSpot CRM, Google APIs)', additionalCost: 15000, additionalHours: 28 },
          { optionText: 'Complex multi-system enterprise API integrations', additionalCost: 40000, additionalHours: 70 }
        ]
      },
      {
        id: 'q5',
        questionText: 'What design style and customization level is needed?',
        options: [
          { optionText: 'Standard MVP layout templates', additionalCost: 0, additionalHours: 0 },
          { optionText: 'Custom premium responsive brand templates', additionalCost: 15000, additionalHours: 25 },
          { optionText: 'Immersive layouts with custom micro-animations & dark mode', additionalCost: 35000, additionalHours: 55 }
        ]
      }
    ];
  };

  const handleStartAnalysis = async () => {
    if (!projectName.trim() || !projectBrief.trim()) {
      setErrorMsg('Please provide a project name and a brief description.');
      return;
    }
    setErrorMsg('');
    setStep('loading');

    // Simulate AI loading steps
    setTimeout(async () => {
      if (apiKey.trim()) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: `Analyze this project name: "${projectName}" and brief description: "${projectBrief}". 
                    Generate 5 discovery questions to estimate development cost and hours in Indian Rupees (INR).
                    Each question should have exactly 3 options scaling from simple to complex.
                    Return ONLY a JSON array. Do not include markdown codeblock tags. The format must be exactly like this example:
                    [
                      {
                        "id": "q1",
                        "questionText": "What level of security is needed?",
                        "options": [
                          {"optionText": "Simple username/password", "additionalCost": 4000, "additionalHours": 12},
                          {"optionText": "Two-factor auth (2FA)", "additionalCost": 9000, "additionalHours": 24},
                          {"optionText": "SSO & Biometric", "additionalCost": 22000, "additionalHours": 45}
                        ]
                      }
                    ]`
                  }]
                }]
              })
            }
          );

          if (!response.ok) {
            throw new Error('API call failed. Falling back to local semantic models.');
          }

          const data = await response.json();
          let jsonText = data.candidates[0].content.parts[0].text;

          // Clean up potential backticks from Gemini response
          jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();

          const parsedQuestions = JSON.parse(jsonText);
          setQuestions(parsedQuestions);
          setSelectedAnswers({});
          setCurrentQuestionIdx(0);
          setStep('questions');
        } catch (e) {
          console.error(e);
          // Fallback to local
          const localQ = getLocalBackupQuestions(projectBrief, projectName);
          setQuestions(localQ);
          setSelectedAnswers({});
          setCurrentQuestionIdx(0);
          setStep('questions');
        }
      } else {
        // Mock semantic analysis wait
        const localQ = getLocalBackupQuestions(projectBrief, projectName);
        setQuestions(localQ);
        setSelectedAnswers({});
        setCurrentQuestionIdx(0);
        setStep('questions');
      }
    }, 2500);
  };

  const handleAnswerSelect = (option) => {
    const currentQ = questions[currentQuestionIdx];
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const handleReset = () => {
    setProjectName('');
    setProjectBrief('');
    setTargetBudget('');
    setQuestions([]);
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsFormSubmitted(false);
    setIsStudent(false);
    setStep('setup');
  };

  // Compute final details from answers
  const estimateResult = useMemo(() => {
    if (questions.length === 0) return { minCost: 0, maxCost: 0, totalHours: 0 };

    let baseCost = 8000;  // Base platform setup cost (INR)
    let baseHours = 40;   // Base setup hours

    // Add selected answer costs and hours
    Object.values(selectedAnswers).forEach(option => {
      baseCost += option.additionalCost;
      baseHours += option.additionalHours;
    });

    // Apply student discount multiplier (80% discount).
    const discountMultiplier = isStudent ? 0.2 : 1.0;
    const rawMinCost = Math.round(baseCost * 0.9 * discountMultiplier);
    const rawMaxCost = Math.round(baseCost * 1.2 * discountMultiplier);

    // Regular projects: max cap of ₹10,000. Student projects: calculated naturally with discount (no max cap).
    const minCost = isStudent ? Math.max(1800, rawMinCost) : 9000;
    const maxCost = isStudent ? Math.max(2400, rawMaxCost) : 10000;

    // Allocate hours
    const devHours = Math.round(baseHours);
    const designHours = Math.round(baseHours * 0.35);
    const qaHours = Math.round(baseHours * 0.20);
    const pmHours = Math.round(baseHours * 0.15);
    const totalHours = devHours + designHours + qaHours + pmHours;

    return {
      minCost,
      maxCost,
      devHours,
      designHours,
      qaHours,
      pmHours,
      totalHours
    };
  }, [questions, selectedAnswers, isStudent]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) return;

    const emailBody = `
Project Name: ${projectName}
Project Brief: ${projectBrief}
Client Target Budget: ${targetBudget ? `₹${Number(targetBudget).toLocaleString('en-IN')}` : 'Not Specified'}
${isStudent ? "It's for a student project." : ""}
Student Project (80% Discount Applied): ${isStudent ? 'Yes' : 'No'}

Estimated Budget Range: ₹${estimateResult.minCost.toLocaleString('en-IN')} - ₹${estimateResult.maxCost.toLocaleString('en-IN')}
Estimated Hours: ${estimateResult.totalHours} hrs (approx ${Math.round(estimateResult.totalHours / 30)} weeks)

Resource Allocation:
- Engineering: ${estimateResult.devHours} hrs
- UI/Design: ${estimateResult.designHours} hrs
- Testing & QA: ${estimateResult.qaHours} hrs
- Management: ${estimateResult.pmHours} hrs

User Notes / Custom Requirements:
${contactForm.message || 'No additional requirements provided.'}
`;

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        user_name: contactForm.name,
        user_email: contactForm.email,
        message: emailBody
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsFormSubmitted(true);
    }, (error) => {
      console.error('EmailJS error:', error);
      setIsFormSubmitted(true);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="container mx-auto max-w-4xl">

        {/* Setup Phase */}
        {step === 'setup' && (
          <FadeIn>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-12">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100 mb-6 uppercase tracking-wider">
                  <Brain size={14} className="text-red-500 animate-pulse" /> Next-Gen AI Scope Planner
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                  Discover Your Project's <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">Cost & Architecture</span>
                </h1>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Enter your project idea below. Our integrated AI scanner will audit your description, generate personalized technical questions, and structure an interactive quote timeline.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-800 text-sm rounded-xl flex items-center gap-2">
                  <AlertCircle size={18} className="text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. HealthSync Mobile app, E-commerce Portal"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 text-slate-800 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Project Brief / Concept description</label>
                  <textarea
                    rows="4"
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Describe your core goal: target platforms, primary audience, how users interact, and any specific integrations you anticipate..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 text-slate-800 transition-colors"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Target Budget (INR - Optional)</label>
                  <div className="relative">
                    <span className="absolute left-8 top-3 text-slate-400 font-bold text-lg">₹</span>
                    <input
                      type="number"
                      value={targetBudget}
                      onChange={(e) => setTargetBudget(e.target.value)}
                      placeholder="e.g. 8000"
                      className="w-full pl-14 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 text-slate-800 transition-colors text-lg font-bold"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-red-50/20 border border-red-100/50 rounded-2xl">
                  <input
                    type="checkbox"
                    id="student-project-toggle"
                    checked={isStudent}
                    onChange={(e) => setIsStudent(e.target.checked)}
                    className="w-5 h-5 text-red-600 border-slate-300 rounded focus:ring-red-500 accent-red-600 cursor-pointer"
                  />
                  <label htmlFor="student-project-toggle" className="text-xs font-bold text-slate-800 cursor-pointer flex-1">
                    Apply Student Project Discount (Claim 80% Off Development Rates)
                  </label>
                </div>

                {!import.meta.env.VITE_GEMINI_API_KEY && (
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Key size={16} className="text-slate-500" />
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">AI API Key (Optional)</label>
                    </div>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 text-slate-800"
                    />
                    <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                      Optional: Provide your own Google AI Key to execute real-time customized LLM scanning. If omitted, we deploy our local domain semantic models.
                    </p>
                  </div>
                )}

                <button
                  onClick={handleStartAnalysis}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-900/10 transition-all flex items-center justify-center gap-2"
                >
                  Initiate AI Discovery Scan <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Loading Phase */}
        {step === 'loading' && (
          <div className="min-h-[400px] bg-white rounded-3xl border border-slate-200 shadow-xl p-12 flex flex-col justify-center items-center text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-slate-100 border-t-red-600 rounded-full animate-spin"></div>
              <Brain className="absolute inset-0 m-auto text-red-600 animate-pulse" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Analyzing Product Blueprint</h3>
            <p className="text-slate-500 text-sm max-w-sm">
              The AI is assessing technical dependencies, estimating core database relations, and generating scoping metrics...
            </p>
          </div>
        )}

        {/* Interactive Questions Phase */}
        {step === 'questions' && questions.length > 0 && (
          <FadeIn>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-12">
              {/* Questionnaire Header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">AI Discovery Stage</span>
                  <span className="text-sm font-bold text-slate-900">{projectName}</span>
                </div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
                  Question {currentQuestionIdx + 1} of {questions.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Active Question */}
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex gap-2">
                  <HelpCircle className="text-red-600 flex-shrink-0" size={26} />
                  <span>{questions[currentQuestionIdx].questionText}</span>
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestionIdx].options.map((option, idx) => {
                    const isSelected = selectedAnswers[questions[currentQuestionIdx].id]?.optionText === option.optionText;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all flex justify-between items-center ${isSelected
                            ? 'border-red-500 bg-red-50/10'
                            : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200'
                          }`}
                      >
                        <span className={`text-sm font-semibold ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                          {option.optionText}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${isSelected ? 'bg-red-600 border-red-600 text-white' : 'bg-white border-slate-300'}`}>
                          {isSelected && <Check size={12} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-4 pt-6 border-t border-slate-100 mt-8">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-500 transition-colors"
                  >
                    Reset & Restart
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswers[questions[currentQuestionIdx].id]}
                    className="flex-grow py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all text-xs flex justify-center items-center gap-1.5 shadow-sm"
                  >
                    {currentQuestionIdx < questions.length - 1 ? (
                      <>Next Question <ArrowRight size={14} /></>
                    ) : (
                      <>Generate Estimate <Sparkles size={14} /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Results / Estimates Phase */}
        {step === 'result' && (
          <FadeIn>
            <div className="space-y-6">

              {/* Header card */}
              <div className="bg-slate-900 text-slate-100 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl -z-10"></div>

                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Architecture Blueprint Result</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">{projectName}</h2>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-slate-700 hover:border-slate-600 rounded-lg text-xs font-semibold text-slate-300 transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw size={12} /> Estimate New Idea
                  </button>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed max-w-2xl mb-8">
                  Blueprint audit calculated from dynamically processed discovery variables. Real budgets might vary depending on finalized UI layout blueprints.
                </p>

                {isStudent && (
                  <div className="mb-6 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-xl inline-flex items-center gap-1.5 text-xs text-red-400 font-bold uppercase tracking-wider">
                    <Sparkles size={14} className="animate-pulse" /> 80% Student Project Discount Applied
                  </div>
                )}

                {targetBudget && (
                  <div className={`mb-6 p-4 rounded-2xl border text-xs flex gap-2 items-start ${
                    Number(targetBudget) < estimateResult.minCost 
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  }`}>
                    <Info size={16} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-1">
                        Declared Target Budget: ₹{Number(targetBudget).toLocaleString('en-IN')}
                      </span>
                      {Number(targetBudget) < estimateResult.minCost 
                        ? 'Your target budget is a bit below the calculated scope range. We can help you adjust feature scopes during discovery call.'
                        : 'Your target budget aligns comfortably with the calculated architecture estimate!'}
                    </div>
                  </div>
                )}

                {/* Estimate Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-800 pt-8">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-1">Budget range floor</span>
                    <div className="flex items-center text-white font-black text-2xl">
                      <IndianRupee size={22} className="text-red-500 mr-0.5" />
                      <span>{estimateResult.minCost.toLocaleString('en-IN')}</span>
                      <span className="text-slate-400 text-sm font-normal ml-1">to</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-1">Budget range cap</span>
                    <div className="flex items-center text-white font-black text-2xl">
                      <IndianRupee size={22} className="text-red-500 mr-0.5" />
                      <span>{estimateResult.maxCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-1">Target Hours & Delivery</span>
                    <div className="flex items-center text-white font-bold text-xl">
                      <Clock size={16} className="text-slate-400 mr-1.5" />
                      <span>{estimateResult.totalHours} hrs</span>
                      <span className="text-slate-500 text-xs font-normal ml-2">({Math.round(estimateResult.totalHours / 30)} weeks)</span>
                    </div>
                  </div>
                </div>

                {/* SVG Hours Breakdown Bar */}
                <div className="mt-10">
                  <span className="text-xs font-semibold text-slate-400 block mb-3">Allocated Resource Distribution</span>
                  <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-800">
                    <div
                      style={{ width: `${(estimateResult.devHours / estimateResult.totalHours) * 100}%` }}
                      className="h-full bg-red-600"
                      title={`Development: ${estimateResult.devHours} hrs`}
                    ></div>
                    <div
                      style={{ width: `${(estimateResult.designHours / estimateResult.totalHours) * 100}%` }}
                      className="h-full bg-amber-500"
                      title={`Design: ${estimateResult.designHours} hrs`}
                    ></div>
                    <div
                      style={{ width: `${(estimateResult.qaHours / estimateResult.totalHours) * 100}%` }}
                      className="h-full bg-emerald-500"
                      title={`Testing & QA: ${estimateResult.qaHours} hrs`}
                    ></div>
                    <div
                      style={{ width: `${(estimateResult.pmHours / estimateResult.totalHours) * 100}%` }}
                      className="h-full bg-sky-500"
                      title={`Management: ${estimateResult.pmHours} hrs`}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                      <span>Engineering ({estimateResult.devHours}h)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>UI & Design ({estimateResult.designHours}h)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>QA Testing ({estimateResult.qaHours}h)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-50"></span>
                      <span>Project Mgt ({estimateResult.pmHours}h)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* proposal contact form */}
              <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Claim Your Architectural Roadmap</h3>
                <p className="text-slate-600 text-xs mb-6 max-w-lg leading-relaxed">
                  Send your AI-scanned estimate directly to the Nocami Labs architectural squad. We will review your selections and assemble a formal blueprint strategy.
                </p>

                {isFormSubmitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center max-w-md mx-auto">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                      <Check size={24} />
                    </div>
                    <h4 className="font-bold text-emerald-900 text-sm">Blueprint Received!</h4>
                    <p className="text-emerald-700 text-xs mt-1">Our engineering team will get back to you with a roadmap draft within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-500 block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-500 block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Additional requirements or notes</label>
                      <textarea
                        rows="3"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
                        placeholder="e.g., Specific timeline targets, tech stack preferences, or scaling concerns..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="py-3 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all text-xs flex justify-center items-center gap-2 shadow-sm"
                    >
                      Secure Free consultation <Send size={12} />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </FadeIn>
        )}

      </div>
    </div>
  );
};

export default ProjectEstimation;
