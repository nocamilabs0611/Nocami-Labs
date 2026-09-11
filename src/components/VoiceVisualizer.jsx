import React from 'react';
import { motion } from 'framer-motion';

const VoiceVisualizer = ({ isListening, isSpeaking }) => {
  const active = isListening || isSpeaking;
  
  return (
    <div className="flex items-center justify-center gap-1 h-8 px-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className={`w-1 rounded-full ${isSpeaking ? 'bg-red-500' : isListening ? 'bg-sky-500' : 'bg-slate-300'}`}
          animate={
            active
              ? { height: ['20%', '80%', '20%'] }
              : { height: '20%' }
          }
          transition={
            active
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }
              : {}
          }
          style={{ height: '20%' }}
        />
      ))}
    </div>
  );
};

export default VoiceVisualizer;
