import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, AlertTriangle, ChevronLeft } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { useNavigate } from 'react-router-dom';
import { parentService } from '../../services/parentService';
import { ChildResponse } from '../../types/api';

export const ParentDashboard = () => {
    const navigate = useNavigate();
    const [children, setChildren] = useState<ChildResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const data = await parentService.getChildren();
                setChildren(data);
            } catch (error) {
                console.error('Failed to fetch children:', error);
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

    // Calculate stats from children data
    const totalChildren = children.length;
    const avgAttendance = children.length > 0 
        ? (children.reduce((sum, c) => sum + c.attendanceRate, 0) / children.length).toFixed(0)
        : 0;

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
                                <h3 className="text-3xl font-bold">{loading ? '--' : totalChildren}</h3>
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
                                <p className="text-gray-500 font-medium">متوسط الحضور</p>
                                <h3 className="text-3xl font-bold text-gray-900">{loading ? '--' : `${avgAttendance}%`}</h3>
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
                                <p className="text-gray-500 font-medium">تنبيهات</p>
                                <h3 className="text-3xl font-bold text-gray-900">0</h3>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Children Overview */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">نظرة عامة على الأبناء</h2>
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    </div>
                ) : children.length === 0 ? (
                    <Card className="text-center py-10 text-gray-500">
                        لا يوجد أبناء مرتبطين بحسابك حالياً
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {children.map((child) => (
                            <motion.div key={child.id} variants={itemVariants}>
                                <Card 
                                    className="hover:shadow-md transition-shadow cursor-pointer" 
                                    onClick={() => navigate(`/parent/children/${child.id}`)}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 border-4 border-white shadow-sm">
                                                {child.fullName?.charAt(0) || '؟'}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{child.fullName}</h3>
                                                <p className="text-sm text-gray-500">{child.gradeName || 'غير محدد'}</p>
                                            </div>
                                        </div>
                                        <ChevronLeft className="text-gray-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">نسبة الحضور</span>
                                            <span className={`font-bold ${child.attendanceRate >= 80 ? 'text-green-600' : child.attendanceRate >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                                {child.attendanceRate.toFixed(0)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full ${child.attendanceRate >= 80 ? 'bg-green-600' : child.attendanceRate >= 60 ? 'bg-amber-600' : 'bg-red-600'}`}
                                                style={{ width: `${child.attendanceRate}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
