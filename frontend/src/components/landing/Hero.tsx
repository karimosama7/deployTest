import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

// Import the new main hero image
import HeroImage from '../../assets/landing/hero-main.jpg';

export function Hero() {
    const navigate = useNavigate();

    return (
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="text-right order-2 md:order-1"
                >
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-100">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                        منصة تعليمية مصرية رائدة
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-sans">
                        أبناؤنا... <br />
                        <span className="text-blue-600">طريق المستقبل يبدأ هنا</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl ml-auto">
                        نقدم لأبنائنا الطلاب المصريين في قطر تعليماً متميزاً يجمع بين أصالة
                        المنهج المصري وحداثة وسائل التعليم، لنبني جيلاً واعداً يعتز بهويته
                        ويواكب عصره.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <button className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2">
                            <span>تعرف على الباقات</span>
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                            <span>ابدأ رحلتك الأن</span>
                        </button>
                    </div>

                    <div className="mt-10 flex items-center justify-end gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <span>تعليم مصري معتمد</span>
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span>نخبة من المعلمين المصريين</span>
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                        </div>
                    </div>
                </motion.div>

                {/* Hero Image Container */}
                <div className="relative order-1 md:order-2">
                    {/* Enlarged frame: aspect-square on mobile, aspect-[5/4] or similar on desktop? 
               User asked to "enlarge", so I'll make it taller/bigger.
           */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white ring-1 ring-gray-100"
                    >
                        <img
                            src={HeroImage}
                            alt="Abnaouna"
                            className="w-full h-auto block"
                        />
                    </motion.div>

                    {/* Decorative elements */}
                    <div className="absolute -z-10 top-10 -right-12 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
                    <div className="absolute -z-10 -bottom-10 -left-12 w-56 h-56 bg-purple-100 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
                </div>
            </div>
        </section>
    )
}
