import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Medal } from 'lucide-react';
const achievements = [{
  id: 1,
  name: 'First Launch',
  icon: Star,
  x: 20,
  y: 30,
  earned: true
}, {
  id: 2,
  name: 'Math Whiz',
  icon: Trophy,
  x: 50,
  y: 20,
  earned: true
}, {
  id: 3,
  name: 'Explorer',
  icon: Medal,
  x: 80,
  y: 40,
  earned: true
}, {
  id: 4,
  name: 'Linguist',
  icon: Star,
  x: 35,
  y: 70,
  earned: false
}, {
  id: 5,
  name: 'Scientist',
  icon: Trophy,
  x: 65,
  y: 60,
  earned: false
}];
export const ConstellationAchievements = () => {
  return <div className="w-full bg-[#0f172a]/40 backdrop-blur-md rounded-3xl border border-purple-500/20 p-6 relative overflow-hidden min-h-[300px]">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

      <h2 className="text-2xl font-bold text-white font-['Orbitron',_sans-serif] mb-6 relative z-10">
        Constellation Map
      </h2>

      <div className="relative w-full h-[250px] z-10">
        {/* Connecting Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path d="M 20% 30% L 50% 20% L 80% 40% L 65% 60% L 35% 70% Z" stroke="rgba(167, 139, 250, 0.3)" strokeWidth="2" fill="none" initial={{
          pathLength: 0
        }} animate={{
          pathLength: 1
        }} transition={{
          duration: 3,
          ease: 'easeInOut'
        }} />
        </svg>

        {/* Achievement Nodes */}
        {achievements.map(item => <motion.div key={item.id} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group cursor-pointer" style={{
        left: `${item.x}%`,
        top: `${item.y}%`
      }} whileHover={{
        scale: 1.2
      }}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${item.earned ? 'bg-purple-600 border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.6)]' : 'bg-gray-800 border-gray-600 opacity-50'}`}>
              <item.icon className={`w-6 h-6 ${item.earned ? 'text-white' : 'text-gray-400'}`} />
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-full mt-2 bg-black/80 px-2 py-1 rounded text-xs text-white whitespace-nowrap border border-white/20">
              {item.name}
            </div>

            {item.earned && <motion.div className="absolute inset-0 rounded-full border border-white" animate={{
          scale: [1, 1.5],
          opacity: [1, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }} />}
          </motion.div>)}
      </div>
    </div>;
};