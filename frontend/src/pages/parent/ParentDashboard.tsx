import { motion } from 'framer-motion';
import { Users, CheckCircle, AlertTriangle, ChevronLeft } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { useNavigate } from 'react-router-dom';

export const ParentDashboard = () => {
    const navigate = useNavigate();

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم ولي الأمر</h1>
                    <p className="mt-1 text-gray-500">متابعة أداء الأبناء والتحصيل الدراسي</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants}>
                    <Card className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white border-none">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-indigo-100 font-medium">عدد الأبناء</p>
                                <h3 className="text-3xl font-bold">2</h3>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="border-l-4 border-l-green-500">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl text-green-600">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-gray-500 font-medium">الواجبات المنجزة</p>
                                <h3 className="text-3xl font-bold text-gray-900">18/20</h3>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="border-l-4 border-l-amber-500">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-100 rounded-xl text-amber-600">
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-gray-500 font-medium">تنبيهات الغياب</p>
                                <h3 className="text-3xl font-bold text-gray-900">1</h3>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Children Overview */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">نظرة عامة على الأبناء</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Child 1 */}
                    <motion.div variants={itemVariants}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/parent/children')}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 border-4 border-white shadow-sm">
                                        أ
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">أحمد محمد</h3>
                                        <p className="text-sm text-gray-500">الصف السادس الابتدائي</p>
                                    </div>
                                </div>
                                <ChevronLeft className="text-gray-400" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">المعدل العام</span>
                                    <span className="font-bold text-indigo-600">92%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Child 2 */}
                    <motion.div variants={itemVariants}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/parent/children')}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 border-4 border-white shadow-sm">
                                        س
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">سارة محمد</h3>
                                        <p className="text-sm text-gray-500">الصف الرابع الابتدائي</p>
                                    </div>
                                </div>
                                <ChevronLeft className="text-gray-400" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">المعدل العام</span>
                                    <span className="font-bold text-green-600">88%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};
