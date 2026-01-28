import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, CheckCircle, AlertTriangle, XCircle, Clock, ExternalLink, Loader2 } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { studentService } from '../../services/studentService';
import { StudentExamResponse } from '../../types/api';
import { useToast } from '../../context/ToastContext';

export const ExamsPage = () => {
    const [exams, setExams] = useState<StudentExamResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const data = await studentService.getExams();
                // Sort by exam date (newest first)
                data.sort((a, b) => new Date(b.examDate).getTime() - new Date(a.examDate).getTime());
                setExams(data);
            } catch (error) {
                console.error('Failed to fetch exams', error);
                addToast('فشل تحميل الاختبارات', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchExams();
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

    const StatusBadge = ({ status, grade }: { status: string; grade?: number }) => {
        switch (status.toUpperCase()) {
            case 'COMPLETED':
                return (
                    <div className="flex flex-col items-end">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-bold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            مكتمل
                        </span>
                        {grade !== undefined && (
                            <span className="text-sm font-bold text-gray-900 mt-1">الدرجة: {grade}</span>
                        )}
                    </div>
                );
            case 'UPCOMING':
            case 'PENDING':
                return (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-bold flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        بانتظار الحل
                    </span>
                );
            case 'LATE':
                return (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-bold flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        متأخر
                    </span>
                );
            case 'FAILED':
                return (
                    <div className="flex flex-col items-end">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-bold flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            لم يتم الحل
                        </span>
                        <span className="text-sm font-bold text-gray-900 mt-1">الدرجة: 0</span>
                    </div>
                );
            default:
                return null;
        }
    };

    const isUpcoming = (exam: StudentExamResponse) => {
        // Show in "Upcoming/Active" if:
        // 1. Status is PENDING or UPCOMING (not completed/failed/late)
        // 2. AND no grade yet (grade is null or undefined)
        const pendingStatuses = ['UPCOMING', 'PENDING'];
        const hasNoGrade = exam.grade == null; // Checks for both null and undefined
        return pendingStatuses.includes(exam.status?.toUpperCase()) && hasNoGrade;
    };

    const isPast = (exam: StudentExamResponse) => {
        // Show in "Past" if:
        // 1. Status is COMPLETED, FAILED, LATE, or EXPIRED
        // 2. OR has an actual grade (not null/undefined)
        const completedStatuses = ['COMPLETED', 'FAILED', 'LATE', 'EXPIRED'];
        const hasGrade = exam.grade != null; // Has actual grade value
        return completedStatuses.includes(exam.status?.toUpperCase()) || hasGrade;
    };

    const upcomingExams = exams.filter(e => isUpcoming(e));
    const pastExams = exams.filter(e => isPast(e));

    // Calculate average grade
    const gradedExams = exams.filter(e => e.grade !== undefined);
    const averageGrade = gradedExams.length > 0
        ? Math.round(gradedExams.reduce((sum, e) => sum + (e.grade || 0), 0) / gradedExams.length)
        : null;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">اختباراتي</h1>
                    <p className="mt-1 text-gray-500">نتائج الاختبارات والامتحانات القادمة</p>
                </div>
                {averageGrade !== null && (
                    <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg text-purple-700 font-medium">
                        <BarChart2 className="w-5 h-5" />
                        <span>المعدل العام: {averageGrade}%</span>
                    </div>
                )}
            </div>

            {/* Upcoming Exams */}
            {upcomingExams.length > 0 && (
                <motion.div variants={itemVariants} className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-6 bg-yellow-500 rounded-full"></span>
                        الاختبارات القادمة
                    </h2>
                    {upcomingExams.map((exam) => (
                        <Card key={exam.id} className="border-l-4 border-l-yellow-400 shadow-md">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 mt-1">
                                        <BarChart2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{exam.title}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{exam.subjectName}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-sm font-medium text-yellow-700 flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                                                <Clock className="w-4 h-4" />
                                                {new Date(exam.examDate).toLocaleString('ar-EG', {
                                                    year: 'numeric', month: '2-digit', day: '2-digit',
                                                    hour: '2-digit', minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <StatusBadge status={exam.status} />
                                    {exam.formUrl ? (
                                        <Button
                                            onClick={() => window.open(exam.formUrl, '_blank')}
                                            disabled={new Date(exam.examDate) > new Date()}
                                            className={`${new Date(exam.examDate) > new Date()
                                                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                                        >
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                            {new Date(exam.examDate) > new Date() ? 'لم يحن الوقت' : 'ابدأ الاختبار'}
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => window.location.href = `/student/exam/${exam.id}/take`}
                                            disabled={new Date(exam.examDate) > new Date()}
                                            className={`${new Date(exam.examDate) > new Date()
                                                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                                        >
                                            {new Date(exam.examDate) > new Date() ? 'لم يحن الوقت' : 'ابدأ الاختبار (داخلي)'}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </motion.div>
            )}

            {/* Empty state for upcoming */}
            {upcomingExams.length === 0 && (
                <motion.div variants={itemVariants} className="text-center py-8 bg-green-50 rounded-xl">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium">لا توجد اختبارات قادمة</p>
                </motion.div>
            )}

            {/* Past Exams */}
            {pastExams.length > 0 && (
                <motion.div variants={itemVariants} className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-6 bg-gray-300 rounded-full"></span>
                        الاختبارات السابقة
                    </h2>
                    {pastExams.map((exam) => (
                        <Card key={exam.id} className="border-gray-200">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mt-1 ${(exam.grade ?? 0) >= 50 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {(exam.grade ?? 0) >= 50 ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{exam.title}</h3>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {exam.subjectName} | {new Date(exam.examDate).toLocaleDateString('ar-EG')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <StatusBadge status={exam.status} grade={exam.grade} />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => window.location.href = `/student/exam/${exam.id}/result`}
                                    >
                                        التفاصيل
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};
