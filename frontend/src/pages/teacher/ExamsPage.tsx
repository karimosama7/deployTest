import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Calendar, CheckCircle, Clock, MoreVertical, AlertTriangle, ExternalLink, BarChart2 } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ExamResponse } from '../../types/api';
import { teacherService } from '../../services/teacherService';
import { useToast } from '../../context/ToastContext';

export const TeacherExamsPage = () => {
    const [examsList, setExamsList] = useState<ExamResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        loadExams();
    }, []);

    const loadExams = async () => {
        try {
            const examsData = await teacherService.getMyExams();
            setExamsList(examsData);
        } catch (error) {
            console.error('Failed to load exams', error);
            addToast('فشل تحميل الاختبارات', 'error');
        } finally {
            setIsLoading(false);
        }
    };

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">إدارة الاختبارات</h1>
                    <p className="mt-1 text-gray-500">إنشاء ومتابعة الاختبارات والتقييمات</p>
                </div>
                <Button onClick={() => window.location.href = '/teacher/exams/new'}>
                    <Plus className="w-5 h-5 ml-2" />
                    اختبار جديد
                </Button>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {examsList.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                                لا توجد اختبارات حالياً.
                            </div>
                        ) : (
                            examsList.map((exam) => {
                                const isUpcoming = new Date(exam.examDate) > new Date();
                                return (
                                    <motion.div key={exam.id} variants={itemVariants} layout>
                                        <Card className={`border-l-4 ${isUpcoming ? 'border-l-indigo-500' : 'border-l-gray-400'} hover:shadow-md transition-shadow`}>
                                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                                <div className="flex gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isUpcoming ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">{exam.title}</h3>
                                                        <p className="text-gray-500 text-sm mt-1">{exam.subjectName} - {exam.classTitle}</p>
                                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-4 h-4" />
                                                                <span>{new Date(exam.examDate).toLocaleDateString('ar-EG')}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-4 h-4" />
                                                                <span>{new Date(exam.examDate).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end gap-3 min-w-[200px]">
                                                    <div className="flex items-center gap-2">
                                                        {isUpcoming ? (
                                                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-bold flex items-center gap-1">
                                                                <AlertTriangle className="w-3 h-3" />
                                                                قادم
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold">منتهي</span>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-2 w-full justify-end">
                                                        {exam.formUrl ? (
                                                            <a
                                                                href={exam.formUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                                            >
                                                                <ExternalLink className="w-4 h-4" />
                                                                معاينة النموذج
                                                            </a>
                                                        ) : (
                                                            <span className="text-sm text-gray-500">اختبار داخلي</span>
                                                        )}
                                                    </div>
                                                    <Button
                                                        variant="secondary"
                                                        className="w-full text-xs h-9"
                                                        onClick={() => window.location.href = `/teacher/exams/${exam.id}/results`}
                                                    >
                                                        <BarChart2 className="w-4 h-4 ml-2" />
                                                        نتائج الطلاب
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
};
