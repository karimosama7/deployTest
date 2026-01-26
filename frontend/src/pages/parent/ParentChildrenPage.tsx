import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/common/Card';
import { User, BookOpen, Loader2 } from 'lucide-react';
import { parentService } from '../../services/parentService';
import { ChildResponse } from '../../types/api';

export const ParentChildrenPage = () => {
    const [children, setChildren] = useState<ChildResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const data = await parentService.getChildren();
                setChildren(data);
            } catch (err) {
                console.error('Failed to fetch children', err);
                setError('فشل تحميل بيانات الأبناء');
            } finally {
                setLoading(false);
            }
        };
        fetchChildren();
    }, []);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
            </div>
        );
    }

    if (children.length === 0) {
        return (
            <div className="text-center py-12">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">لا يوجد أبناء مسجلين</h3>
                <p className="text-gray-500">تواصل مع الإدارة لربط حسابات أبنائك</p>
            </div>
        );
    }

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">أبنائي</h1>
                <p className="mt-1 text-gray-500">تفاصيل الأداء الأكاديمي للأبناء</p>
            </div>

            <div className="space-y-8">
                {children.map((child) => (
                    <motion.div key={child.id} variants={itemVariants}>
                        <Card className="border border-indigo-50 shadow-sm overflow-hidden">
                            <div className="bg-indigo-50/50 p-4 border-b border-indigo-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{child.fullName}</h3>
                                    <p className="text-sm text-gray-500">{child.gradeName || 'غير محدد'}</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <p className="text-gray-500 text-sm mb-1">نسبة الحضور</p>
                                        <p className="text-2xl font-bold text-gray-900">{child.attendanceRate.toFixed(2)}%</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <p className="text-gray-500 text-sm mb-1">الصف الدراسي</p>
                                        <p className="text-lg font-bold text-gray-900">{child.gradeName || '-'}</p>
                                    </div>
                                    <div className="bg-indigo-50 rounded-xl p-4 text-center">
                                        <a
                                            href={`/parent/children/${child.id}`}
                                            className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center justify-center gap-2"
                                        >
                                            <BookOpen className="w-5 h-5" />
                                            عرض التفاصيل
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
