import { motion } from 'framer-motion'
import { Sparkles, BookOpen, BarChart3, Users, Play } from 'lucide-react'

// Import images
import Feature1 from '../../assets/landing/feature1.jpg';
import FeatureTracking from '../../assets/landing/feature-tracking.png';
import FeatureTeachers from '../../assets/landing/feature-teachers.png';

const items = [
    {
        id: 1,
        image: Feature1,
        icon: BookOpen,
        accentColor: 'from-blue-400 to-cyan-400',
        bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
        dotColor: 'bg-blue-400',
        title: "أنشطة وتطبيقات عملية",
        subtitle: "تعلم بالممارسة",
        description: "لا نكتفي بالشرح النظري، بل ندعم التعلم بالممارسة من خلال تمارين ممتعة وتطبيقات تحاكي الواقع لتثبيت المعلومة."
    },
    {
        id: 2,
        image: FeatureTracking,
        icon: BarChart3,
        accentColor: 'from-emerald-400 to-teal-400',
        bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
        dotColor: 'bg-emerald-400',
        title: "متابعة دقيقة للأداء",
        subtitle: "اطمئن على ابنك",
        description: "نقدم لولي الأمر تقارير دورية وإحصائيات مفصلة عن مستوى الطالب، الحضور، والواجبات."
    },
    {
        id: 3,
        image: FeatureTeachers,
        icon: Users,
        accentColor: 'from-purple-400 to-pink-400',
        bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
        dotColor: 'bg-purple-400',
        title: "نخبة من المعلمين",
        subtitle: "خبرة وتميز",
        description: "يتم الشرح بواسطة كادر تعليمي مصري متميز، تم اختيارهم بعناية فائقة لخبرتهم الطويلة."
    }
];

export function ZigZagFeatures() {
    return (
        <section className="py-20 bg-white overflow-hidden" dir="rtl">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-6"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        viewport={{ once: true }}
                    >
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700 text-sm font-bold">اكتشف المنصة</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        جولة داخل المنصة
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        اكتشف كيف نقدم تجربة تعليمية فريدة تجمع بين التكنولوجيا الحديثة وأصالة التعليم
                    </p>
                </motion.div>

                {/* Feature Cards */}
                <div className="space-y-8">
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        const isReversed = index % 2 === 1;

                        return (
                            <motion.div
                                key={item.id}
                                className={`relative ${item.bgColor} rounded-3xl overflow-hidden`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 rounded-full translate-y-1/2 -translate-x-1/2" />

                                {/* Decorative Dots */}
                                <div className="absolute top-8 left-8 flex gap-2">
                                    <div className={`w-3 h-3 rounded-full ${item.dotColor}`} />
                                    <div className={`w-3 h-3 rounded-full ${item.dotColor} opacity-60`} />
                                    <div className={`w-3 h-3 rounded-full ${item.dotColor} opacity-30`} />
                                </div>

                                <div className={`relative flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center p-8 lg:p-12 gap-8 lg:gap-12`}>

                                    {/* Image Section */}
                                    <motion.div
                                        className="w-full lg:w-1/2"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <div className="relative">
                                            {/* Image Frame */}
                                            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-auto object-cover"
                                                />

                                                {/* Play Button Overlay (optional decorative) */}
                                                <div className="absolute bottom-4 right-4">
                                                    <motion.div
                                                        className={`w-12 h-12 bg-gradient-to-r ${item.accentColor} rounded-full flex items-center justify-center shadow-lg cursor-pointer`}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Play className="w-5 h-5 text-white mr-[-2px]" fill="white" />
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Floating Icon */}
                                            <motion.div
                                                className={`absolute -top-4 ${isReversed ? '-left-4' : '-right-4'} w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center`}
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            >
                                                <div className={`w-10 h-10 bg-gradient-to-r ${item.accentColor} rounded-xl flex items-center justify-center`}>
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Text Content */}
                                    <div className="w-full lg:w-1/2 text-center lg:text-right">
                                        {/* Subtitle Badge */}
                                        <motion.span
                                            className={`inline-block px-4 py-1 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 mb-4`}
                                            initial={{ opacity: 0, x: isReversed ? -20 : 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                        >
                                            {item.subtitle}
                                        </motion.span>

                                        {/* Title */}
                                        <motion.h3
                                            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {item.title}
                                        </motion.h3>

                                        {/* Description */}
                                        <motion.p
                                            className="text-gray-600 text-lg leading-relaxed mb-6"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {item.description}
                                        </motion.p>

                                        {/* CTA Button */}
                                        <motion.button
                                            className={`px-6 py-3 bg-gradient-to-r ${item.accentColor} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            اعرف المزيد
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Bottom Decorative Dots */}
                                <div className="absolute bottom-8 right-8 flex gap-2">
                                    <div className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                                    <div className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                                    <div className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                                    <div className={`w-2 h-2 rounded-full ${item.dotColor} opacity-50`} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
