import { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Plus, Edit, Trash2, GraduationCap, Users, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

export const GradesPage = () => {
    // Mock Data
    const [grades] = useState([
        { id: '1', name: 'الصف الأول الابتدائي', classesCount: 4, studentsCount: 120, color: 'bg-blue-50 text-blue-700', iconColor: 'bg-blue-100 text-blue-600' },
        { id: '2', name: 'الصف الثاني الابتدائي', classesCount: 3, studentsCount: 95, color: 'bg-green-50 text-green-700', iconColor: 'bg-green-100 text-green-600' },
        { id: '3', name: 'الصف الثالث الابتدائي', classesCount: 4, studentsCount: 110, color: 'bg-purple-50 text-purple-700', iconColor: 'bg-purple-100 text-purple-600' },
        { id: '4', name: 'الصف الرابع الابتدائي', classesCount: 3, studentsCount: 90, color: 'bg-orange-50 text-orange-700', iconColor: 'bg-orange-100 text-orange-600' },
        { id: '5', name: 'الصف الخامس الابتدائي', classesCount: 3, studentsCount: 85, color: 'bg-cyan-50 text-cyan-700', iconColor: 'bg-cyan-100 text-cyan-600' },
        { id: '6', name: 'الصف السادس الابتدائي', classesCount: 3, studentsCount: 80, color: 'bg-rose-50 text-rose-700', iconColor: 'bg-rose-100 text-rose-600' },
    ]);

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
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">الصفوف الدراسية</h2>
                    <p className="mt-1 text-sm text-gray-500">إدارة المراحل والصفوف الدراسية.</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-none">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md">
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة صف جديد
                        </Button>
                    </motion.div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grades.map((grade) => (
                    <motion.div key={grade.id} variants={itemVariants} whileHover={{ y: -5 }}>
                        <Card className={`hover:shadow-lg transition-all duration-300 border-none shadow-md overflow-hidden relative group`}>
                            <div className={`absolute top-0 left-0 w-1 h-full ${grade.color.replace('bg-', 'bg-opacity-50 ')}`}></div>
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${grade.iconColor}`}>
                                        <GraduationCap className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{grade.name}</h3>
                                        <div className="mt-3 space-y-1">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Layout className="w-4 h-4 ml-2 opacity-70" />
                                                <span>{grade.classesCount} فصلاً</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Users className="w-4 h-4 ml-2 opacity-70" />
                                                <span>{grade.studentsCount} طالباً</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
