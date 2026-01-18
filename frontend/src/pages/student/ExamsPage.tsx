import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, CheckCircle, AlertTriangle, XCircle, Clock, ExternalLink } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const ExamsPage = () => {
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

    const StatusBadge = ({ status, grade }: { status: string; grade?: number }) => {
        switch (status) {
            case 'completed':
                return (
                    <div className="flex flex-col items-end">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-bold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            مكتمل
                        </span>
                        {grade !== undefined && (
                            <span className="text-sm font-bold text-gray-900 mt-1">الدرجة: {grade}/100</span>
                        )}
                    </div>
                );
            case 'pending':
                return (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-bold flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        بانتظار الحل
                    </span>
                );
            case 'late':
                return (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-bold flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        متأخر
                    </span>
                );
            case 'failed':
                return (
                    <div className="flex flex-col items-end">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-bold flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            لم يتم الحل
                        </span>
                        <span className="text-sm font-bold text-gray-900 mt-1">الدرجة: 0/100</span>
                    </div>
                );
            default:
                return null;
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
                    <h1 className="text-2xl font-bold text-gray-900">اختباراتي</h1>
                    <p className="mt-1 text-gray-500">نتائج الاختبارات والامتحانات القادمة</p>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg text-purple-700 font-medium">
                    <BarChart2 className="w-5 h-5" />
                    <span>المعدل العام: 88%</span>
                </div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
                {/* Pending Exam */}
                <Card className="border-l-4 border-l-yellow-400 shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 mt-1">
                                <BarChart2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">اختبار العلوم - الوحدة الثالثة</h3>
                                <p className="text-gray-500 text-sm mt-1">مدته 45 دقيقة | 20 سؤال</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-sm font-medium text-yellow-700 flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                                        <AlertTriangle className="w-4 h-4" />
                                        مستحق اليوم قبل 10:00 م
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <StatusBadge status="pending" />
                            <Button
                                onClick={() => window.open('https://docs.google.com/forms', '_blank')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                <ExternalLink className="w-4 h-4 ml-2" />
                                ابدأ الاختبار الآن
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Late Exam */}
                <Card className="border-l-4 border-l-orange-400 opacity-90">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mt-1">
                                <BarChart2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">اختبار اللغة العربية - النحو</h3>
                                <p className="text-gray-500 text-sm mt-1">مدته 30 دقيقة</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-sm font-medium text-orange-700 flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
                                        <Clock className="w-4 h-4" />
                                        تجاوز الموعد (أمس)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <StatusBadge status="late" />
                            <Button
                                variant="secondary"
                                onClick={() => window.open('https://docs.google.com/forms', '_blank')}
                            >
                                <ExternalLink className="w-4 h-4 ml-2" />
                                أداء الاختبار (متأخر)
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Completed Exam 1 */}
                <Card className="border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mt-1">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">اختبار الرياضيات - المنتصف</h3>
                                <p className="text-gray-500 text-sm mt-1">تم التسليم: 5 يناير 2026</p>
                            </div>
                        </div>
                        <StatusBadge status="completed" grade={95} />
                    </div>
                </Card>

                {/* Completed Exam 2 */}
                <Card className="border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mt-1">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">اختبار الإنجليزي - Unit 1-3</h3>
                                <p className="text-gray-500 text-sm mt-1">تم التسليم: 1 يناير 2026</p>
                            </div>
                        </div>
                        <StatusBadge status="completed" grade={82} />
                    </div>
                </Card>

                {/* Failed Exam */}
                <Card className="border-gray-200 bg-red-50/30">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 mt-1">
                                <XCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-700">اختبار الدراسات - تاريخ</h3>
                                <p className="text-gray-500 text-sm mt-1">لم يتم التسليم في الموعد المحدد</p>
                            </div>
                        </div>
                        <StatusBadge status="failed" />
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
};
