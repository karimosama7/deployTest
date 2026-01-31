import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Import images
import Feature1 from '../../assets/landing/feature1.jpg';
import FeatureTracking from '../../assets/landing/feature-tracking.png';
import FeatureTeachers from '../../assets/landing/feature-teachers.png';

const items = [
    {
        id: 1,
        image: Feature1,
        title: "أنشطة وتطبيقات عملية",
        description: "تمارين ممتعة وتطبيقات تفاعلية لتثبيت المعلومة"
    },
    {
        id: 2,
        image: FeatureTracking,
        title: "متابعة دقيقة للأداء",
        description: "تقارير دورية وإحصائيات لمتابعة تقدم ابنك"
    },
    {
        id: 3,
        image: FeatureTeachers,
        title: "نخبة من المعلمين",
        description: "كادر تعليمي مصري متميز بخبرة طويلة"
    }
];

export function ZigZagFeatures() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-rotate
    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    // Slide variants for circular rotation effect
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? -45 : 45,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
            }
        })
    };

    return (
        <section className="py-16 bg-white overflow-hidden" dir="rtl">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        جولة داخل المنصة
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        تجربة تعليمية فريدة تجمع بين التكنولوجيا والتعليم
                    </p>
                </motion.div>

                {/* Carousel Display with 3D rotation */}
                <div className="relative" style={{ perspective: '1000px' }}>
                    {/* Main Display - Bigger */}
                    <div className="relative max-w-4xl mx-auto">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="relative"
                            >
                                {/* Image Only - No overlay */}
                                <div className="rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src={items[activeIndex].image}
                                        alt={items[activeIndex].title}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>

                                {/* Text Below Image */}
                                <motion.div
                                    className="text-center mt-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-bold rounded-full mb-3">
                                        {activeIndex + 1} / {items.length}
                                    </span>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {items[activeIndex].title}
                                    </h3>
                                    <p className="text-gray-600 text-lg max-w-xl mx-auto">
                                        {items[activeIndex].description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevSlide}
                            className="absolute right-[-20px] md:right-[-40px] top-1/3 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextSlide}
                            className="absolute left-[-20px] md:left-[-40px] top-1/3 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > activeIndex ? 1 : -1);
                                    setActiveIndex(index);
                                }}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                                        ? 'bg-blue-600 w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
