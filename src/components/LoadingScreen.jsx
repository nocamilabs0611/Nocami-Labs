import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <motion.img 
        src="/logo.png" 
        alt="Nocami Labs Loading..." 
        className="w-48 h-auto"
        initial={{ opacity: 0.3, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      />
    </div>
  );
};

export default LoadingScreen;
