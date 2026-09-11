import React, { useState, useEffect, useRef, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Mic, IndianRupee, Clock, Check, Sparkles, StopCircle, MessageCircle, X } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import VoiceVisualizer from '../components/VoiceVisualizer';

const ProjectEstimation = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 'init',
      type: 'bot',
      text: "Hi! I'm the Nocami AI Architect. I can help estimate the cost and timeline of your next custom software project.\n\nTo get started, what is the name of your project?"
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const [stage, setStage] = useState('asking_name');
  
  const [projectName, setProjectName] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [targetBudget, setTargetBudget] = useState('');
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isStudent, setIsStudent] = useState(false);
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputValue(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

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
            { optionText: 'Simple UPI & Credit Card Gateway', additionalCost: 10000, additionalHours: 20 },
            { optionText: 'Subscription billing & multi-currency', additionalCost: 25000, additionalHours: 45 },
            { optionText: 'Custom digital wallets & split payouts', additionalCost: 60000, additionalHours: 90 }
          ]
        },
        {
          id: 'q3',
          questionText: 'Do you need advanced CRM or Inventory sync?',
          options: [
            { optionText: 'No, standard local DB records are sufficient', additionalCost: 5000, additionalHours: 10 },
            { optionText: 'Sync with Salesforce, HubSpot, or ERP', additionalCost: 30000, additionalHours: 50 },
            { optionText: 'AI-driven personalized recommendations', additionalCost: 50000, additionalHours: 80 }
          ]
        },
        {
          id: 'q4',
          questionText: 'What is your target launch timeline?',
          options: [
            { optionText: 'Relaxed (16-24 weeks)', additionalCost: 0, additionalHours: 0 },
            { optionText: 'Standard delivery (8-12 weeks)', additionalCost: 5000, additionalHours: 10 },
            { optionText: 'Express delivery (4-6 weeks)', additionalCost: 20000, additionalHours: 35 }
          ]
        },
        {
          id: 'q5',
          questionText: 'What design style is needed?',
          options: [
            { optionText: 'Standard MVP layout templates', additionalCost: 0, additionalHours: 0 },
            { optionText: 'Custom premium responsive brand templates', additionalCost: 15000, additionalHours: 25 },
            { optionText: 'Immersive layouts with animations & dark mode', additionalCost: 35000, additionalHours: 55 }
          ]
        }
      ];
    }

    return [
      {
        id: 'q1',
        questionText: 'What is the primary target platform?',
        options: [
          { optionText: 'Responsive Web Application', additionalCost: 12000, additionalHours: 25 },
          { optionText: 'Cross-platform Mobile Application', additionalCost: 28000, additionalHours: 50 },
          { optionText: 'Web Portal + Mobile Clients', additionalCost: 65000, additionalHours: 110 }
        ]
      },
      {
        id: 'q2',
        questionText: 'How complex is the user role management?',
        options: [
          { optionText: 'Simple (Admin and standard consumer)', additionalCost: 8000, additionalHours: 15 },
          { optionText: 'Granular (Multiple organizations, permissions)', additionalCost: 22000, additionalHours: 40 },
          { optionText: 'Enterprise SSO integration (SAML, Okta)', additionalCost: 48000, additionalHours: 75 }
        ]
      },
      {
        id: 'q3',
        questionText: 'What level of analytics is needed?',
        options: [
          { optionText: 'Standard summary metrics', additionalCost: 5000, additionalHours: 12 },
          { optionText: 'Interactive chart dashboards & PDF exports', additionalCost: 18000, additionalHours: 35 },
          { optionText: 'AI-powered anomaly detection', additionalCost: 45000, additionalHours: 75 }
        ]
      },
      {
        id: 'q4',
        questionText: 'Do you require custom third-party integrations?',
        options: [
          { optionText: 'None, standalone database', additionalCost: 0, additionalHours: 0 },
          { optionText: '1-2 API Syncs (Slack, CRM, Google APIs)', additionalCost: 15000, additionalHours: 28 },
          { optionText: 'Complex multi-system enterprise APIs', additionalCost: 40000, additionalHours: 70 }
        ]
      },
      {
        id: 'q5',
        questionText: 'What design style is needed?',
        options: [
          { optionText: 'Standard MVP layout templates', additionalCost: 0, additionalHours: 0 },
          { optionText: 'Custom premium responsive brand templates', additionalCost: 15000, additionalHours: 25 },
          { optionText: 'Immersive layouts with animations & dark mode', additionalCost: 35000, additionalHours: 55 }
        ]
      }
    ];
  };

  const generateAIQuestions = async (name, brief) => {
    setIsTyping(true);
    setStage('analyzing');
    
    // Simulate AI thinking time
    setTimeout(() => {
      const localQ = getLocalBackupQuestions(brief, name);
      setQuestions(localQ);
      setCurrentQuestionIdx(0);
      setIsTyping(false);
      setStage('questions');
      
      setChatHistory(prev => [
        ...prev,
        { id: Date.now().toString(), type: 'bot', text: `Thanks! I've analyzed "${name}". Let's narrow down the technical scope.` },
        { 
          id: `q-${localQ[0].id}`, 
          type: 'bot', 
          text: localQ[0].questionText, 
          isOptions: true, 
          options: localQ[0].options,
          questionId: localQ[0].id
        }
      ]);
    }, 2000);
  };

  const handleSendText = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    setChatHistory(prev => [
      ...prev,
      { id: Date.now().toString(), type: 'user', text: userText }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      if (stage === 'asking_name') {
        setProjectName(userText);
        setStage('asking_brief');
        setChatHistory(prev => [
          ...prev,
          { id: Date.now().toString(), type: 'bot', text: `Got it. "${userText}" sounds interesting! Next, give me a brief description of what you want to build and who your target audience is.` }
        ]);
        setIsTyping(false);
      } else if (stage === 'asking_brief') {
        setProjectBrief(userText);
        setStage('asking_budget');
        setChatHistory(prev => [
          ...prev,
          { id: Date.now().toString(), type: 'bot', text: `Excellent brief. Finally, do you have a target budget in mind (in INR)? If you aren't sure yet, just type "skip".` }
        ]);
        setIsTyping(false);
      } else if (stage === 'asking_budget') {
        if (userText.toLowerCase() !== 'skip') {
          setTargetBudget(userText.replace(/[^0-9]/g, ''));
        }
        generateAIQuestions(projectName, projectBrief);
      } else if (stage === 'questions' || stage === 'done') {
        // Just generic chat response if they type freely during questions
        setIsTyping(false);
        setChatHistory(prev => [
          ...prev,
          { id: Date.now().toString(), type: 'bot', text: "Please select one of the options above to continue the estimation, or we can discuss this in the consultation call later!" }
        ]);
      }
    }, 800);
  };

  const handleOptionSelect = (questionId, option) => {
    // Prevent re-answering past questions
    if (selectedAnswers[questionId] || stage !== 'questions') return;

    const newAnswers = { ...selectedAnswers, [questionId]: option };
    setSelectedAnswers(newAnswers);

    // Add user's selection as a message
    setChatHistory(prev => [
      ...prev,
      { id: Date.now().toString(), type: 'user', text: option.optionText }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      if (currentQuestionIdx < questions.length - 1) {
        const nextIdx = currentQuestionIdx + 1;
        setCurrentQuestionIdx(nextIdx);
        const nextQ = questions[nextIdx];
        
        setChatHistory(prev => [
          ...prev,
          { 
            id: `q-${nextQ.id}`, 
            type: 'bot', 
            text: nextQ.questionText, 
            isOptions: true, 
            options: nextQ.options,
            questionId: nextQ.id
          }
        ]);
      } else {
        setStage('done');
        // Present final estimate
        setChatHistory(prev => [
          ...prev,
          { 
            id: 'final-estimate', 
            type: 'bot', 
            text: "All done! I've calculated the architecture and budget estimate for your project based on your responses.",
            isEstimate: true
          }
        ]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const estimateResult = useMemo(() => {
    if (questions.length === 0) return { minCost: 0, maxCost: 0, totalHours: 0 };

    let baseCost = 8000;
    let baseHours = 40;

    Object.values(selectedAnswers).forEach(option => {
      baseCost += option.additionalCost;
      baseHours += option.additionalHours;
    });

    const discountMultiplier = isStudent ? 0.2 : 1.0;
    const rawMinCost = Math.round(baseCost * 0.9 * discountMultiplier);
    const rawMaxCost = Math.round(baseCost * 1.2 * discountMultiplier);

    const minCost = isStudent ? Math.max(1800, rawMinCost) : 9000;
    const maxCost = isStudent ? Math.max(2400, rawMaxCost) : 10000;

    const devHours = Math.round(baseHours);
    const designHours = Math.round(baseHours * 0.35);
    const qaHours = Math.round(baseHours * 0.20);
    const pmHours = Math.round(baseHours * 0.15);
    const totalHours = devHours + designHours + qaHours + pmHours;

    return { minCost, maxCost, devHours, designHours, qaHours, pmHours, totalHours };
  }, [questions, selectedAnswers, isStudent]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        setInputValue(''); // Clear input before new speech
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          console.error("Speech recognition error:", err);
          setIsListening(false);
        }
      } else {
        alert("Your browser does not support the Web Speech API.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 relative flex items-center justify-center p-6">
      
      {/* Background Hero Section */}
      <div className="max-w-3xl text-center space-y-6">
        <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
          <Sparkles className="text-red-600" size={32} />
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Project Estimation & Blueprinting</h1>
        <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Want to know how much your custom software project will cost? Chat with our AI Architect to get an instant structural blueprint and budget estimate.
        </p>
        <button 
          onClick={() => setIsChatOpen(true)}
          className="mt-8 px-8 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl transition-all flex items-center gap-3 mx-auto"
        >
          <MessageCircle size={20} /> Start Estimation
        </button>
      </div>

      {/* Floating Widget Toggle Button (shows when closed) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 z-50"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Floating Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-8 right-8 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 z-50">
          
          {/* Top Header Bar for Chat */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center relative shrink-0">
                <Sparkles className="text-red-600" size={20} />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-sm font-bold text-slate-900 truncate">Nocami AI Architect</h2>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 truncate">
                  <VoiceVisualizer isSpeaking={isTyping} isListening={isListening} />
                  {isTyping ? 'Analyzing blueprint...' : 'Online'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => window.location.reload()}
                className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors mr-1"
              >
                Restart
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat History Area */}
          <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
            <div className="flex flex-col items-center">
              
              <div className="w-full flex flex-col justify-end">
            {chatHistory.map((msg) => (
              <ChatBubble key={msg.id} type={msg.type} text={msg.text}>
                {msg.isOptions && msg.options && !selectedAnswers[msg.questionId] && (
                  <div className="flex flex-col gap-2 mt-2 w-full">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionSelect(msg.questionId, opt)}
                        className="text-left px-5 py-3 rounded-xl border border-slate-200 bg-white hover:border-red-400 hover:bg-red-50 hover:shadow-md transition-all text-sm font-medium text-slate-700 group flex justify-between items-center"
                      >
                        {opt.optionText}
                        <Check size={16} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}

                {msg.isEstimate && (
                  <div className="mt-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative overflow-hidden w-full md:w-[500px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl -z-10"></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Project Architecture Estimate</h3>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Estimated Budget</span>
                            <div className="flex items-center text-slate-900 font-black text-lg">
                              <IndianRupee size={16} className="text-red-500 mr-0.5" />
                              <span>{estimateResult.minCost.toLocaleString('en-IN')} - {estimateResult.maxCost.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Target Delivery</span>
                            <div className="flex items-center text-slate-900 font-bold text-lg">
                              <Clock size={16} className="text-slate-400 mr-1.5" />
                              <span>{estimateResult.totalHours} hrs</span>
                              <span className="text-slate-400 text-xs font-normal ml-2">({Math.round(estimateResult.totalHours / 30)} weeks)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 mt-4 border-t border-slate-100">
                            <label className="flex items-center gap-2 cursor-pointer mb-6 p-3 bg-red-50 rounded-xl border border-red-100">
                              <input 
                                type="checkbox" 
                                checked={isStudent} 
                                onChange={(e) => setIsStudent(e.target.checked)}
                                className="w-4 h-4 accent-red-600"
                              />
                              <span className="text-xs font-bold text-red-900">Apply Student Discount (80% Off)</span>
                            </label>
                            
                            <p className="text-xs text-slate-500 leading-relaxed mb-4">Would you like to book a free consultation to discuss this blueprint with our engineers?</p>
                            
                            <button className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg">
                                Secure Free Consultation <Send size={14} />
                            </button>
                        </div>
                    </div>
                  </div>
                )}
              </ChatBubble>
            ))}

            {isTyping && (
              <ChatBubble type="bot">
                <div className="flex gap-1 items-center p-2">
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </ChatBubble>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="bg-white border-t border-slate-200 p-4 shrink-0 z-20">
        <div className="relative">
          <form onSubmit={handleSendText} className="flex gap-3 items-end">
            <div className="relative flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendText(e);
                  }
                }}
                placeholder={stage === 'done' || stage === 'questions' ? "Select an option above..." : "Type your message..."}
                disabled={stage === 'analyzing' || (stage === 'questions' && !selectedAnswers[questions[currentQuestionIdx]?.id])}
                className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-red-400 focus:bg-white resize-none shadow-sm text-sm"
                rows="1"
                style={{ minHeight: '56px', maxHeight: '120px' }}
              />
              <button 
                type="button" 
                onClick={toggleListen}
                className={`absolute right-3 bottom-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-slate-400 hover:text-red-500 hover:bg-slate-100'}`}
              >
                {isListening ? <StopCircle size={18} /> : <Mic size={18} />}
              </button>
            </div>
            
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="w-14 h-[56px] bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl flex items-center justify-center shadow-md transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-slate-400 font-medium">Press Enter to send. Use the mic icon to dictate.</span>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ProjectEstimation;
