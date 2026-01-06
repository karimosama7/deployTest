import React from 'react';
import { Rocket, Calendar, Video, BookOpen, BrainCircuit, Star } from 'lucide-react';
import { motion } from 'framer-motion';
const navItems = [{
  icon: Rocket,
  label: 'Courses',
  active: true,
  color: 'text-orange-400'
}, {
  icon: Calendar,
  label: 'Schedule',
  active: false,
  color: 'text-blue-400'
}, {
  icon: Video,
  label: 'Recordings',
  active: false,
  color: 'text-purple-400'
}, {
  icon: BookOpen,
  label: 'Homework',
  active: false,
  color: 'text-green-400'
}, {
  icon: BrainCircuit,
  label: 'Quizzes',
  active: false,
  color: 'text-pink-400'
}, {
  icon: Star,
  label: 'Awards',
  active: false,
  color: 'text-yellow-400'
}];
export const SpaceNavigation = () => {
  return <nav className="fixed bottom-0 left-0 w-full md:relative md:w-24 md:h-screen bg-[#0a0e27]/90 backdrop-blur-lg border-t md:border-t-0 md:border-r border-white/10 z-50 flex md:flex-col items-center justify-around md:justify-center md:gap-8 p-4 md:py-8">
      {navItems.map((item, index) => <motion.button key={item.label} className={`relative group flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${item.active ? 'bg-white/10' : 'hover:bg-white/5'}`} whileHover={{
      scale: 1.1,
      y: -2
    }} whileTap={{
      scale: 0.95
    }}>
          <div className={`relative p-2 rounded-full ${item.active ? 'bg-white/10' : ''}`}>
            <item.icon className={`w-6 h-6 md:w-8 md:h-8 ${item.active ? item.color : 'text-gray-400 group-hover:text-white'} transition-colors`} />
            {item.active && <motion.div layoutId="activeGlow" className={`absolute inset-0 rounded-full blur-md opacity-50 ${item.color.replace('text', 'bg')}`} />}
          </div>
          <span className="text-[10px] md:text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
            {item.label}
          </span>

          {/* Hover Tooltip for Desktop */}
          <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 rounded text-xs text-white opacity-0 group-hover:opacity-100 hidden md:block whitespace-nowrap pointer-events-none transition-opacity">
            {item.label}
          </div>
        </motion.button>)}
    </nav>;
};