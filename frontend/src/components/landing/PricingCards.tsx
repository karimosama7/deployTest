import React from 'react'
import { motion } from 'framer-motion'
import { Check, Book, Video, FileText, BarChart } from 'lucide-react'

const packages = [
    {
        grade: 'الصف الأول',
        price: '100',
        subjects: ['عربي', 'Math', 'English', 'Discover', 'دين'],
        color: 'bg-blue-500',
        lightColor: 'bg-blue-50',
        textColor: 'text-blue-600',
    },
    {
        grade: 'الصف الثاني',
        price: '120',
        subjects: ['عربي', 'Math', 'English', 'Discover', 'دين'],
        color: 'bg-blue-600',
        lightColor: 'bg-blue-50',
        textColor: 'text-blue-700',
    },
    {
        grade: 'الصف الثالث والرابع',
        price: '150',
        subjects: ['عربي', 'Math', 'English', 'Science', 'Studies', 'دين'],
        color: 'bg-indigo-500',
        lightColor: 'bg-indigo-50',
        textColor: 'text-indigo-600',
        popular: true,
    },
    {
        grade: 'الصف الخامس والسادس',
        price: '180',
        subjects: ['عربي', 'Math', 'English', 'Science', 'Studies', 'دين', 'ICT'],
        color: 'bg-indigo-600',
        lightColor: 'bg-indigo-50',
        textColor: 'text-indigo-700',
    },
]

const commonFeatures = [
    { text: 'حصص مباشرة تفاعلية', icon: Video },
    { text: 'تسجيلات لجميع الدروس', icon: Video },
    { text: 'واجبات واختبارات دورية', icon: FileText },
    { text: 'تقارير متابعة لولي الأمر', icon: BarChart },
    { text: 'مراجعات نهائية', icon: Book },
]

export function PricingCards() {
    return (
        <section className="py-20 bg-blue-50/30" id="pricing">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        باقات أبناؤنا
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        خطط أسعار مرنة تناسب جميع المراحل الدراسية
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeInOut', delay: index * 0.08 }}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                            className={`relative bg-white rounded-2xl shadow-sm border flex flex-col overflow-hidden ${pkg.popular ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/10 z-10' : 'border-gray-200 hover:shadow-lg'}`}
                        >
                            {pkg.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-b-lg text-xs font-bold shadow-md whitespace-nowrap z-20">
                                    الأكثر طلباً
                                </div>
                            )}

                            {/* Solid Color Header */}
                            <div className={`${pkg.color} text-center py-6 px-4`}>
                                <h3 className="text-xl font-bold text-white">
                                    {pkg.grade}
                                </h3>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <div className="text-center mb-6">
                                    <div className="flex items-baseline justify-center gap-1 dir-rtl mb-4">
                                        <span className={`text-4xl font-bold ${pkg.textColor}`}>
                                            {pkg.price}
                                        </span>
                                        <span className="text-gray-600 font-medium text-sm">
                                            ريال قطري
                                        </span>
                                        <span className="text-gray-400 text-xs">/ شهرياً</span>
                                    </div>

                                </div>

                                <div className="flex-grow">
                                    <ul className="space-y-3 mb-8 text-right">
                                        {commonFeatures.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 justify-end">
                                                <span className="text-gray-700 text-sm">
                                                    {feature.text}
                                                </span>
                                                <div className={`p-1 rounded-full ${pkg.lightColor}`}>
                                                    <Check className={`w-3 h-3 ${pkg.textColor}`} />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <a
                                    href={`https://wa.me/201024047192?text=${encodeURIComponent(`السلام عليكم، أنا مهتم بالاشتراك في باقة ${pkg.grade}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block w-full py-3 rounded-xl font-bold transition-all text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 ${pkg.color} text-center`}
                                >
                                    اشترك الآن
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
