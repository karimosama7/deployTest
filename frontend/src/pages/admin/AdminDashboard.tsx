import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Users, GraduationCap, BookOpen, UserCheck, Search, Plus, TrendingUp, Activity } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { motion } from 'framer-motion';
import { adminService } from '../../services/adminService';
import { UserResponse } from '../../types/api';

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [studentsPerGrade, setStudentsPerGrade] = useState<{ grade: string; count: number }[]>([]);
    
    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<UserResponse[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Stats state with gradients
    const [stats, setStats] = useState([
        {
            name: 'المعلمين',
            value: '...',
            icon: BookOpen,
            gradient: 'from-blue-500 to-cyan-400',
            shadow: 'shadow-blue-200'
        },
        {
            name: 'الطلاب',
            value: '...',
            icon: GraduationCap,
            gradient: 'from-emerald-500 to-teal-400',
            shadow: 'shadow-emerald-200'
        },
        {
            name: 'أولياء الأمور',
            value: '...',
            icon: Users,
            gradient: 'from-violet-500 to-purple-400',
            shadow: 'shadow-violet-200'
        },
        {
            name: 'المراحل الدراسية',
            value: '...',
            icon: UserCheck,
            gradient: 'from-orange-500 to-amber-400',
            shadow: 'shadow-orange-200'
        },
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // 1. Fetch Students per Grade
                const gradeResponse = await api.get('/admin/stats/students-per-grade');
                // Backend returns Map<String, Long> -> { "Grade 1": 10, ... }
                // Convert to array format
                const gradeData = Object.entries(gradeResponse.data).map(([grade, count]) => ({
                    grade,
                    count: Number(count)
                }));
                // Sort by grade name/number if possible, or just as is
                setStudentsPerGrade(gradeData);

                // 2. Fetch General Counts (Ideally backend should have a summary endpoint, but we can fetch lists size for now or mock if slow)
                const [teachersRes, studentsRes, parentsRes] = await Promise.all([
                    api.get('/admin/teachers'),
                    api.get('/admin/students'),
                    api.get('/admin/parents')
                ]);

                setStats(prev => [
                    { ...prev[0], value: teachersRes.data.length.toString() },
                    { ...prev[1], value: studentsRes.data.length.toString() },
                    { ...prev[2], value: parentsRes.data.length.toString() },
                    { ...prev[3], value: '6' }, // Static for now as Grade API might be just specific grades
                ]);

            } catch (error) {
                console.error("Failed to fetch stats", error);
                addToast('فشل تحميل الإحصائيات', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [addToast]);

    // Animation Variants
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
                        لوحة التحكم
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        نظرة عامة على إحصائيات النظام وأحدث النشاطات
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        النظام يعمل بكفاءة
                    </div>
                    <div className="text-sm text-gray-400">
                        {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <motion.div key={item.name} variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                        <Card className={`overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 relative group`}>
                            {/* Decorative Background Gradient Blob */}
                            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 bg-gradient-to-br ${item.gradient} blur-xl group-hover:opacity-20 transition-opacity`}></div>

                            <div className="flex items-center relative z-10">
                                <div className={`flex-shrink-0 rounded-2xl p-4 bg-gradient-to-br ${item.gradient} text-white shadow-md`}>
                                    <item.icon className="h-7 w-7" aria-hidden="true" />
                                </div>
                                <div className="mr-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                        <dd>
                                            <div className="text-2xl font-bold text-gray-900 mt-1">
                                                {loading ? (
                                                    <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                                                ) : (
                                                    item.value
                                                )}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* User Management Actions */}
                <motion.div variants={itemVariants} className="h-full">
                    <Card className="h-full border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900">إجراءات سريعة</h3>
                            <p className="text-sm text-gray-500 mt-1">إدارة المستخدمين وإضافتهم للنظام</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/admin/users/create?role=TEACHER')}
                                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group cursor-pointer bg-white"
                            >
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-blue-700">إضافة معلم</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/admin/users/create?role=STUDENT')}
                                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 transition-colors group cursor-pointer bg-white"
                            >
                                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-emerald-700">إضافة طالب</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/admin/users/create?role=PARENT')}
                                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-purple-200 hover:border-purple-500 hover:bg-purple-50 transition-colors group cursor-pointer bg-white"
                            >
                                <div className="p-3 bg-purple-100 text-purple-600 rounded-full mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <Users className="w-6 h-6" />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-purple-700">إضافة ولي أمر</span>
                            </motion.button>
                        </div>
                    </Card>
                </motion.div>

                {/* Search Student */}
                <motion.div variants={itemVariants} className="h-full">
                    <Card className="h-full border border-gray-100 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900">بحث سريع</h3>
                            <p className="text-sm text-gray-500 mt-1">الوصول السريع لملفات الطلاب</p>
                        </div>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            if (!searchQuery.trim()) return;
                            setIsSearching(true);
                            try {
                                const results = await adminService.searchStudents(searchQuery);
                                setSearchResults(results);
                                if (results.length === 0) {
                                    addToast('لم يتم العثور على نتائج', 'info');
                                }
                            } catch (err) {
                                addToast('فشل البحث', 'error');
                            } finally {
                                setIsSearching(false);
                            }
                        }}>
                            <div className="relative">
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="ابحث باسم الطالب..."
                                    className="pl-12 py-6 text-lg shadow-sm border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl transition-all hover:bg-white focus:bg-white bg-gray-50/50"
                                />
                                <div className="absolute left-2 top-2 bottom-2">
                                    <Button 
                                        type="submit"
                                        disabled={isSearching}
                                        className="h-full aspect-square rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-transform hover:scale-105 active:scale-95"
                                    >
                                        {isSearching ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        ) : (
                                            <Search className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>

                        {/* Search Results */}
                        {searchResults.length > 0 && (
                            <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
                                {searchResults.map(student => (
                                    <div 
                                        key={student.id}
                                        onClick={() => navigate(`/admin/students`)}
                                        className="p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer flex justify-between items-center"
                                    >
                                        <span className="font-medium text-gray-800">{student.fullName}</span>
                                        <span className="text-sm text-gray-500">{student.email}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {searchResults.length === 0 && (
                            <div className="mt-8">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">عمليات بحث سريعة</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['معلم', 'طالب', 'ولي أمر'].map(tag => (
                                        <span 
                                            key={tag} 
                                            onClick={() => {
                                                setSearchQuery(tag);
                                            }}
                                            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer transition-colors shadow-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>
                </motion.div>
            </div>

            {/* Students Per Grade */}
            <motion.div variants={itemVariants}>
                <Card className="border border-gray-100 shadow-md">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">توزيع الطلاب</h3>
                            <p className="text-sm text-gray-500">عدد الطلاب المسجلين في كل مرحلة دراسية</p>
                        </div>
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {loading ? (
                            [...Array(6)].map((_, i) => (
                                <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-xl"></div>
                            ))
                        ) : studentsPerGrade.length > 0 ? (
                            studentsPerGrade.map((item, index) => (
                                <motion.div
                                    key={item.grade}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative overflow-hidden bg-white border border-gray-100 rounded-xl p-4 text-center hover:border-indigo-300 hover:shadow-md transition-all group"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="text-sm font-medium text-gray-500 truncate mb-2">{item.grade}</div>
                                    <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-lg font-bold inline-block group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        {item.count}
                                    </div>
                                    <div className="mt-2 text-xs text-green-600 flex justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>نشط</span>
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8">
                                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3">
                                    <UserCheck className="w-6 h-6" />
                                </div>
                                <p className="text-gray-500">لا توجد بيانات متاحة حالياً</p>
                            </div>
                        )}
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
};
