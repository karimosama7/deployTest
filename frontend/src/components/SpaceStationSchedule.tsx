import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
const scheduleData = [{
  time: '09:00',
  subject: 'Math',
  module: 'Module A-1',
  color: 'border-yellow-500'
}, {
  time: '10:30',
  subject: 'Science',
  module: 'Lab Deck',
  color: 'border-blue-500'
}, {
  time: '13:00',
  subject: 'Arabic',
  module: 'Library Pod',
  color: 'border-red-500'
}];
export const SpaceStationSchedule = () => {
  return <div className="w-full bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        <h2 className="text-2xl font-bold text-white font-['Orbitron',_sans-serif]">
          Mission Timeline
        </h2>
      </div>

      <div className="relative">
        {/* The Station Spine */}
        <div className="absolute left-4 md:left-24 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 via-gray-400 to-gray-600" />

        <div className="space-y-8">
          {scheduleData.map((item, index) => <motion.div key={index} initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.2
        }} className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8 pl-12 md:pl-0">
              {/* Time Node (Docking Port) */}
              <div className="absolute left-0 md:left-[88px] w-9 h-9 bg-gray-800 border-4 border-gray-400 rounded-full z-10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500 animate-ping' : 'bg-gray-500'}`} />
              </div>

              {/* Time Label */}
              <div className="md:w-24 md:text-right">
                <span className="text-xl font-mono text-blue-300 font-bold">
                  {item.time}
                </span>
              </div>

              {/* Class Module Card */}
              <motion.div className={`flex-1 bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-4 rounded-xl border-l-4 ${item.color} backdrop-blur-sm hover:bg-gray-800 transition-colors cursor-pointer group`} whileHover={{
            scale: 1.02,
            x: 10
          }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {item.subject}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin size={14} />
                      <span>{item.module}</span>
                    </div>
                  </div>
                  {index === 0 && <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/50 animate-pulse">
                      LIVE
                    </span>}
                </div>
              </motion.div>
            </motion.div>)}
        </div>
      </div>
    </div>;
};