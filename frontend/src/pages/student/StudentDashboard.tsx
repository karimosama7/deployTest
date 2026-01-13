import React from 'react';
import { Card } from '../../components/common/Card';
import { Video, FileText, BarChart2, Calendar, Star, Book } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export const StudentDashboard = () => {
    const { user } = useAuth();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        مرحباً، <span className="text-indigo-600">{user?.fullName}</span> 👋
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                        الصف السادس الابتدائي | باقة سنوي
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-sm border border-yellow-100">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span>350 نقطة</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats / Tabs Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <motion.div variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity"></div>
                        <div className="flex items-center p-4 relative z-10">
                            <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-md text-white">
                                <Video className="h-8 w-8" />
                            </div>
                            <div className="mr-5">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">حصصي</h3>
                                <p className="text-sm text-gray-500 mt-1">3 حصص اليوم</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-500 opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity"></div>
                        <div className="flex items-center p-4 relative z-10">
                            <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-4 shadow-md text-white">
                                <FileText className="h-8 w-8" />
                            </div>
                            <div className="mr-5">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">واجباتي</h3>
                                <p className="text-sm text-gray-500 mt-1">2 واجب معلق</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity"></div>
                        <div className="flex items-center p-4 relative z-10">
                            <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 shadow-md text-white">
                                <BarChart2 className="h-8 w-8" />
                            </div>
                            <div className="mr-5">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">اختباراتي</h3>
                                <p className="text-sm text-gray-500 mt-1">آخر درجة: 18/20</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Upcoming Classes Section */}
            <motion.div variants={itemVariants}>
                <Card className="border border-gray-100 shadow-md">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">الحصص القادمة (اليوم)</h3>
                        </div>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium border border-gray-200">
                            {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>

                    <div className="space-y-4">
                        {/* Mock Class Item */}
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group"
                        >
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center border-2 border-white shadow-sm">
                                    <Book className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div className="mr-4">
                                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">رياضيات (Math)</h4>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                        <span>أ. أحمد محمد</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="text-indigo-500 font-medium">4:00 عصراً</span>
                                    </p>
                                </div>
                            </div>
                            <button className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 focus:outline-none shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2">
                                <span>انضمام</span>
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                            </button>
                        </motion.div>

                        <motion.div
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        >
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-green-50 flex items-center justify-center border-2 border-white shadow-sm">
                                    <span className="text-xl font-bold text-green-600">S</span>
                                </div>
                                <div className="mr-4">
                                    <h4 className="text-lg font-bold text-gray-900">علوم (Science)</h4>
                                    <p className="text-sm text-gray-500 mt-1">أ. سارة علي | 5:30 عصراً</p>
                                </div>
                            </div>
                            <span className="px-4 py-2 bg-gray-200 text-gray-600 text-sm font-medium rounded-lg">
                                قريباً
                            </span>
                        </motion.div>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
};
