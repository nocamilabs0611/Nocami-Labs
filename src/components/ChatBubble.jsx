import React from 'react';
import { motion } from 'framer-motion';
import { Brain, User } from 'lucide-react';

const ChatBubble = ({ type = 'bot', text, children, delay = 0 }) => {
  const isBot = type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex w-full max-w-2xl ${isBot ? 'flex-row' : 'flex-row-reverse'} gap-4`}>
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${isBot ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white' : 'bg-slate-800 text-white'}`}>
          {isBot ? <Brain size={20} /> : <User size={20} />}
        </div>
        
        {/* Bubble content */}
        <div className={`flex flex-col w-full ${isBot ? 'items-start' : 'items-end'}`}>
          {text && (
            <div className={`p-4 rounded-3xl ${isBot ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm' : 'bg-slate-800 text-white rounded-tr-sm shadow-md'}`}>
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{text}</p>
            </div>
          )}
          {children && (
            <div className="mt-3 w-full">
              {children}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;
