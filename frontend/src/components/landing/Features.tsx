import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Smartphone } from 'lucide-react'

const features = [
    {
        icon: BookOpen,
        title: 'تعليم مصري معتمد',
        description:
            'نقدم مناهج وزارة التربية والتعليم المصرية المعتمدة، مما يضمن استمرارية المسار التعليمي للطالب وتوافقه مع النظام التعليمي في مصر.',
    },
    {
        icon: Users,
        title: 'مدرسين مصريين',
        description:
            'نخبة من المعلمين المصريين الأكفاء ذوي الخبرة في تدريس المناهج المصرية، يفهمون احتياجات الطالب ويقدمون الشرح بأسلوب مبسط ومحبب.',
    },
    {
        icon: Smartphone,
        title: 'متابعة ولي الأمر',
        description:
            'تطبيق متكامل يتيح لولي الأمر متابعة حضور الطالب، درجات الاختبارات، والتقدم الدراسي أولاً بأول من خلال تقارير دورية وإشعارات فورية.',
    },
]

export function Features() {
    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            {/* Decorative Blob */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        لماذا أبناؤنا؟
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        نجمع بين جودة التعليم المصري وسهولة الوصول إليه في قطر
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 text-right flex flex-col items-end group"
                        >
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
