import React from 'react'
import { motion } from 'framer-motion'

// Import images
import Feature1 from '../../assets/landing/feature1.jpg';
import FeatureTracking from '../../assets/landing/feature-tracking.png';
import FeatureTeachers from '../../assets/landing/feature-teachers.png';

const items = [
    {
        id: 1,
        image: Feature1,
        title: "أنشطة وتطبيقات عملية",
        description: "لا نكتفي بالشرح النظري، بل ندعم التعلم بالممارسة من خلال تمارين ممتعة وتطبيقات تحاكي الواقع لتثبيت المعلومة."
    },
    {
        id: 2,
        image: FeatureTracking,
        title: "متابعة دقيقة للأداء",
        description: "نقدم لولي الأمر تقارير دورية وإحصائيات مفصلة عن مستوى الطالب، الحضور، والواجبات، لتكون دائماً في صورة تقدم ابنك الدراسي."
    },
    {
        id: 3,
        image: FeatureTeachers,
        title: "نخبة من المعلمين",
        description: "يتم الشرح بواسطة كادر تعليمي مصري متميز، تم اختيارهم بعناية فائقة لخبرتهم الطويلة وقدرتهم على تبسيط المعلومات."
    }
];

export function ZigZagFeatures() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 space-y-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        جولة داخل المنصة
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
                        اكتشف كيف نقدم تجربة تعليمية فريدة تجمع بين التكنولوجيا الحديثة وأصالة التعليم
                    </p>
                </div>

                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Image Section */}
                        <motion.div
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-blue-600/5 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-50">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Text Section */}
                        <motion.div
                            className="w-full md:w-1/2 text-center md:text-right"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 ${index % 2 === 0 ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                <span className={`w-2 h-2 rounded-full ${index % 2 === 0 ? 'bg-blue-600' : 'bg-yellow-600'}`}></span>
                                <span>ميزة رقم {index + 1}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-sans">
                                {item.title}
                            </h3>
                            <p className="text-lg md:text-xl text-gray-600 leading-loose">
                                {item.description}
                            </p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    )
}
