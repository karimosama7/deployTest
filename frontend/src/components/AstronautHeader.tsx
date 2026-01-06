import React from 'react';
import { motion } from 'framer-motion';
export const AstronautHeader = () => {
  return <header className="w-full p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-20">
      <div className="flex items-center gap-6">
        <div />

        <div className="text-center md:text-right rtl:text-right">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Cairo',_sans-serif]" dir="rtl">
              مرحبًا يا أحمد{' '}
              <span className="inline-block animate-wave">👋</span>
            </h1>
            <p className="text-blue-200 text-lg md:text-xl font-['Cairo',_sans-serif]" dir="rtl">
              جاهز نتعلم؟
            </p>
          </motion.div>
        </div>
      </div>

      {/* Level/Rank Display */}
      <motion.div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 flex items-center gap-3" whileHover={{
      scale: 1.05
    }}>
        <div className="text-right">
          <div className="text-xs text-blue-300 uppercase tracking-wider font-bold">
            Current Rank
          </div>
          <div className="text-white font-bold text-lg">Space Cadet Lvl. 4</div>
        </div>
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(253,224,71,0.5)]">
          <span className="text-xl">🚀</span>
        </div>
      </motion.div>
    </header>;
};