import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Video, Clock, ChevronLeft, PlayCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const ClassesPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">فصولي الدراسية</h1>
                    <p className="mt-1 text-gray-500">جدول الحصص اليومية وتسجيلات الدروس السابقة</p>
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg text-indigo-700 font-medium">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                </div>
            </div>

            {/* Today's Classes */}
            <motion.div variants={itemVariants}>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                    حصص اليوم
                </h2>

                <div className="grid gap-4">
                    {/* Active Class */}
                    <Card className="border-indigo-100 shadow-md overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-2 h-full bg-indigo-600"></div>
                        <div className="p-1">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
                                        <Video className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-gray-900">الرياضيات (Mathematics)</h3>
                                            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full animate-pulse border border-red-200">مباشر الآن 🔴</span>
                                        </div>
                                        <p className="text-gray-500 flex items-center gap-2 text-sm">
                                            <span>أ. أحمد محمد</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                4:00 عصراً - 5:30 عصراً
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.open('https://teams.microsoft.com', '_blank')}
                                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto justify-center"
                                >
                                    <Video className="w-5 h-5" />
                                    انضم للكلاس
                                </motion.button>
                            </div>
                        </div>
                    </Card>

                    {/* Upcoming Class */}
                    <Card className="border-gray-100 hover:border-gray-200 transition-colors">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <span className="text-2xl font-bold">S</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 opacity-75">العلوم (Science)</h3>
                                    <p className="text-gray-500 flex items-center gap-2 text-sm">
                                        <span>أ. سارة علي</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span>6:00 مساءً</span>
                                    </p>
                                </div>
                            </div>
                            <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium">
                                يبدأ خلال ساعتين
                            </span>
                        </div>
                    </Card>
                </div>
            </motion.div>

            {/* Past Recordings */}
            <motion.div variants={itemVariants} className="pt-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-gray-300 rounded-full"></span>
                    تسجيلات الحصص السابقة
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                        <Card key={i} className="group cursor-pointer hover:shadow-md transition-all border-gray-100">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                                        <PlayCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">اللغة العربية - درس القراءة</h4>
                                        <p className="text-xs text-gray-500 mt-1">أمس، 14 يناير | أ. محمود</p>
                                    </div>
                                </div>
                                <ChevronLeft className="w-5 h-5 text-gray-300 group-hover:text-indigo-400 transform group-hover:-translate-x-1 transition-all" />
                            </div>
                        </Card>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};
