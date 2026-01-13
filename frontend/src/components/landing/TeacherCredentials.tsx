import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Star } from 'lucide-react'

const teachers = [
    {
        name: 'أ. محمد أحمد',
        role: 'خبير اللغة العربية',
        exp: '20 سنة خبرة',
        degree: 'دكتوراه في الأدب العربي',
        image: 'https://i.pravatar.cc/150?img=12',
    },
    {
        name: 'د. سارة محمود',
        role: 'مشرفة الرياضيات',
        exp: '15 سنة خبرة',
        degree: 'ماجستير طرق تدريس',
        image: 'https://i.pravatar.cc/150?img=47',
    },
    {
        name: 'أ. كريم حسن',
        role: 'مدرس العلوم',
        exp: '12 سنة خبرة',
        degree: 'بكالوريوس علوم وتربية',
        image: 'https://i.pravatar.cc/150?img=33',
    },
    {
        name: 'د. نادية علي',
        role: 'خبيرة اللغة الإنجليزية',
        exp: '18 سنة خبرة',
        degree: 'دكتوراه في اللغويات',
        image: 'https://i.pravatar.cc/150?img=44',
    },
]

export function TeacherCredentials() {
    return (
        <section className="py-20 bg-white" id="teachers">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="text-right w-full">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            نخبة من أفضل المعلمين
                        </h2>
                        <p className="text-gray-600 max-w-2xl text-lg">
                            يتم اختيار معلمينا بعناية فائقة لضمان تقديم أفضل مستوى تعليمي
                            لأبنائكم
                        </p>
                    </div>
                    <button className="whitespace-nowrap text-blue-600 font-bold hover:text-blue-700 transition-colors flex items-center gap-2">
                        <span>عرض جميع المعلمين</span>
                        <span className="text-lg">←</span>
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teachers.map((teacher, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                            className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all group text-right"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-50">
                                    <img
                                        src={teacher.image}
                                        alt={teacher.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{teacher.name}</h3>
                                    <p className="text-sm text-blue-600 font-medium">
                                        {teacher.role}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span>{teacher.exp}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <GraduationCap className="w-4 h-4 text-gray-400" />
                                    <span>{teacher.degree}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                                <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                    معتمد
                                </span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className="w-3 h-3 text-yellow-400 fill-yellow-400"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
