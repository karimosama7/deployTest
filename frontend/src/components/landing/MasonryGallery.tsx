import React from 'react'
import { motion } from 'framer-motion'

// Import images
import HeroImage from '../../assets/landing/hero.jpg';
import Feature1 from '../../assets/landing/feature1.jpg';
import Feature2 from '../../assets/landing/feature2.jpg';
import Feature3 from '../../assets/landing/feature3.jpg';
import Feature4 from '../../assets/landing/feature4.jpg';

const items = [
    {
        id: 1,
        image: HeroImage,
        span: "md:col-span-2 md:row-span-2",
        title: "فصول افتراضية تفاعلية",
        subtitle: "بيئة تعليمية متطورة تجمع بين المتعة والفائدة، حيث يشارك الطلاب في حصص مباشرة مسجلة بأعلى جودة."
    },
    {
        id: 2,
        image: Feature1,
        span: "md:col-span-1 md:row-span-1",
        title: "أنشطة وتطبيقات",
        subtitle: "تعلم بالممارسة من خلال تمارين ممتعة."
    },
    {
        id: 3,
        image: Feature2,
        span: "md:col-span-1 md:row-span-2",
        title: "متابعة دقيقة للأداء",
        subtitle: "تقارير دورية وإحصائيات مفصلة لولي الأمر تضمن لك الاطمئنان على مستوى طفلك."
    },
    {
        id: 4,
        image: Feature3,
        span: "md:col-span-1 md:row-span-1",
        title: "مكتبة رقمية شاملة",
        subtitle: "آلاف الكتب والمصادر المتاحة."
    },
    {
        id: 5,
        image: Feature4,
        span: "md:col-span-2 md:row-span-1",
        title: "نخبة من المعلمين",
        subtitle: "كادر تعليمي مصري متميز بخبرات طويلة في المناهج، يضمن توصيل المعلومة بأبسط الطرق."
    }
];

export function MasonryGallery() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        جولة في منصة أبناؤنا
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        نقدم تجربة تعليمية غنية ومتنوعة تناسب جميع احتياجات الطالب
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-4">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={`relative rounded-3xl overflow-hidden group cursor-pointer ${item.span} shadow-md hover:shadow-xl transition-shadow`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-white text-xl font-bold mb-2 transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-gray-200 text-sm leading-relaxed transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {item.subtitle}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
