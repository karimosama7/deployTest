import React from 'react';
import { motion } from 'framer-motion';
export const SpaceBackground = ({
  children
}: {
  children: React.ReactNode;
}) => {
  // Generate random stars
  const stars = Array.from({
    length: 50
  }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5
  }));
  // Generate random asteroids
  const asteroids = Array.from({
    length: 3
  }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 80 + 10}%`,
    delay: i * 8,
    duration: 20 + Math.random() * 10
  }));
  return <div className="min-h-screen w-full bg-gradient-to-b from-[#0a0e27] via-[#111633] to-[#1a1f3a] relative overflow-hidden text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Stars Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map(star => <motion.div key={star.id} className="absolute rounded-full bg-white" style={{
        top: star.top,
        left: star.left,
        width: star.size,
        height: star.size
      }} animate={{
        opacity: [0.2, 1, 0.2],
        scale: [1, 1.2, 1]
      }} transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: star.delay,
        ease: 'easeInOut'
      }} />)}
      </div>

      {/* Distant Galaxy/Nebula Effects */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900 rounded-full blur-[120px]" />
      </div>

      {/* Floating Asteroids */}
      {asteroids.map(asteroid => <motion.div key={asteroid.id} className="absolute z-0 opacity-40" style={{
      top: asteroid.top,
      left: -100
    }} animate={{
      x: ['-100px', '120vw'],
      rotate: 360
    }} transition={{
      duration: asteroid.duration,
      repeat: Infinity,
      delay: asteroid.delay,
      ease: 'linear'
    }}>
          <div className="w-12 h-10 bg-gray-600 rounded-full blur-[1px] relative overflow-hidden">
            <div className="absolute top-2 left-2 w-3 h-3 bg-gray-800 rounded-full opacity-50" />
            <div className="absolute bottom-3 right-3 w-4 h-4 bg-gray-800 rounded-full opacity-50" />
          </div>
        </motion.div>)}

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>;
};