import React from 'react'
import { motion } from 'framer-motion'
import { Users, Trophy, BookOpen, Star } from 'lucide-react'

const stats = [
    {
        id: 1,
        label: 'سنة خبرة',
        value: '+15',
        icon: Trophy,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
    },
    {
        id: 2,
        label: 'طالب متفوق',
        value: '+5000',
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
    },
    {
        id: 3,
        label: 'نسبة نجاح',
        value: '%98',
        icon: Star,
        color: 'text-[#CE1126]',
        bg: 'bg-red-50',
    },
    {
        id: 4,
        label: 'درس تعليمي',
        value: '+1200',
        icon: BookOpen,
        color: 'text-green-600',
        bg: 'bg-green-50',
    },
]

export function TrustSignals() {
    return (
        <section className="py-12 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center text-center group cursor-default"
                        >
                            <div
                                className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}
                            >
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1 font-sans">
                                {stat.value}
                            </h3>
                            <p className="text-gray-500 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
