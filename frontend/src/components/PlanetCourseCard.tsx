import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
interface PlanetCourseCardProps {
  subject: string;
  progress: number;
  type: 'mars' | 'saturn' | 'neptune' | 'earth';
  nextLesson: string;
}
const planetStyles = {
  mars: {
    gradient: 'radial-gradient(circle at 30% 30%, #ff8c69, #c0392b, #641e16)',
    shadow: '0 0 50px rgba(192, 57, 43, 0.4)',
    ringColor: '#e74c3c',
    texture: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E\")"
  },
  saturn: {
    gradient: 'radial-gradient(circle at 30% 30%, #f9e79f, #f39c12, #9a7d0a)',
    shadow: '0 0 50px rgba(243, 156, 18, 0.4)',
    ringColor: '#f1c40f',
    hasRings: true,
    texture: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
  },
  neptune: {
    gradient: 'radial-gradient(circle at 30% 30%, #5dade2, #2e86c1, #1b4f72)',
    shadow: '0 0 50px rgba(46, 134, 193, 0.4)',
    ringColor: '#3498db',
    texture: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
  },
  earth: {
    gradient: 'radial-gradient(circle at 30% 30%, #82e0aa, #27ae60, #145a32)',
    shadow: '0 0 50px rgba(39, 174, 96, 0.4)',
    ringColor: '#2ecc71',
    texture: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='none'/%3E%3Cpath d='M0 0h10v10H0z' fill='rgba(255,255,255,0.1)'/%3E%3Cpath d='M10 10h10v10H10z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E\")"
  }
};
export const PlanetCourseCard = ({
  subject,
  progress,
  type,
  nextLesson
}: PlanetCourseCardProps) => {
  const style = planetStyles[type];
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress / 100 * circumference;
  return <motion.div className="flex flex-col items-center justify-center p-6 relative group cursor-pointer" whileHover={{
    scale: 1.05
  }} transition={{
    type: 'spring',
    stiffness: 300,
    damping: 20
  }}>
      {/* Orbital Progress Ring */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
          <circle cx="128" cy="128" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
          <motion.circle cx="128" cy="128" r={radius} stroke={style.ringColor} strokeWidth="6" fill="none" strokeDasharray={circumference} initial={{
          strokeDashoffset: circumference
        }} animate={{
          strokeDashoffset
        }} strokeLinecap="round" transition={{
          duration: 1.5,
          ease: 'easeOut'
        }} />
        </svg>

        {/* The Planet */}
        <motion.div className="w-40 h-40 rounded-full relative shadow-inner overflow-hidden" style={{
        background: style.gradient,
        boxShadow: `inset -20px -20px 50px rgba(0,0,0,0.5), ${style.shadow}`
      }} animate={{
        rotate: 360
      }} transition={{
        duration: 60,
        repeat: Infinity,
        ease: 'linear'
      }}>
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={{
          backgroundImage: style.texture
        }} />

          {/* Saturn Rings Special Case */}
          {style.hasRings && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[40%] border-[12px] border-yellow-200/40 rounded-[50%] rotate-[-15deg] pointer-events-none" />}
        </motion.div>

        {/* Hover Info Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="bg-black/60 backdrop-blur-sm rounded-full w-32 h-32 flex flex-col items-center justify-center text-center p-2 border border-white/20">
            <span className="text-2xl font-bold text-white">{progress}%</span>
            <span className="text-xs text-gray-300">Complete</span>
            <motion.button className="mt-2 p-2 bg-white rounded-full text-black" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
              <Play size={16} fill="currentColor" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Course Info */}
      <div className="mt-4 text-center z-10">
        <h3 className="text-2xl font-bold text-white mb-1 font-['Orbitron',_sans-serif] tracking-wide">
          {subject}
        </h3>
        <p className="text-sm text-blue-200 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/30">
          Next: {nextLesson}
        </p>
      </div>

      {/* Fuel Gauge (Progress Bar Alternative) */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-32 w-4 bg-gray-800 rounded-full border border-gray-600 overflow-hidden hidden md:block">
        <motion.div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-red-500 via-yellow-500 to-green-500" initial={{
        height: 0
      }} animate={{
        height: `${progress}%`
      }} transition={{
        duration: 1.5,
        delay: 0.5
      }} />
        {/* Tick marks */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 px-[1px]">
          {[...Array(5)].map((_, i) => <div key={i} className="w-full h-[1px] bg-black/50" />)}
        </div>
      </div>
    </motion.div>;
};