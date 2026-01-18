import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Calendar, CheckCircle, Clock, MoreVertical, AlertTriangle, ExternalLink, BarChart2 } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { ExamResponse, ClassSessionResponse } from '../../types/api';
import { teacherService } from '../../services/teacherService';
import { useToast } from '../../context/ToastContext';

export const TeacherExamsPage = () => {
    const [examsList, setExamsList] = useState<ExamResponse[]>([]);
    const [classes, setClasses] = useState<ClassSessionResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    const [formData, setFormData] = useState({
        title: '',
        grade: '',
        date: '',
        duration: '45',
        formLink: ''
    });

    useEffect(() => {
        loadExams();
    }, []);

    const loadExams = async () => {
        try {
            // Fetch classes first
            const classesData = await teacherService.getClasses();
            setClasses(classesData);

            // Then fetch exams for each class
            const examsPromises = classesData.map(cls => teacherService.getClassExams(cls.id));
            const examsArrays = await Promise.all(examsPromises);

            // Flatten the array
            const allExams = examsArrays.flat();
            setExamsList(allExams);
        } catch (error) {
            console.error('Failed to load exams', error);
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

    const handleCreateExam = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await teacherService.createExam({
                title: formData.title,
                classSessionId: parseInt(formData.grade),
                examDate: formData.date,
                formUrl: formData.formLink
            });
            // Reload to refresh list
            addToast('تم إنشاء الاختبار بنجاح', 'success');
            loadExams();
            setIsCreateModalOpen(false);
            setFormData({ title: '', grade: '', date: '', duration: '45', formLink: '' });
        } catch (error) {
            console.error('Failed to create exam', error);
        } finally {
            setIsSubmitting(false);
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
                <Button onClick={() => setIsCreateModalOpen(true)}>
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
                                                            <span>45 دقيقة</span>
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
                                                    <a
                                                        href={exam.formUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        معاينة النموذج
                                                    </a>
                                                    <button className="text-gray-400 hover:text-gray-600 p-1">
                                                        <MoreVertical className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <Button variant="secondary" className="w-full text-xs h-9">
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

            {/* Create Exam Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="إضافة اختبار جديد"
            >
                <form onSubmit={handleCreateExam} className="space-y-4">
                    <Input
                        label="عنوان الاختبار"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">الحصة الدراسية</label>
                        <select
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            required
                        >
                            <option value="">اختر الحصة...</option>
                            {classes.map(cls => (
                                <option key={cls.id} value={cls.id}>{cls.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="تاريخ الاختبار"
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        <Input
                            label="المدة (دقيقة)"
                            type="number"
                            required
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        />
                    </div>

                    <Input
                        label="رابط Google Form للاختبار"
                        placeholder="https://docs.google.com/forms/..."
                        required
                        value={formData.formLink}
                        onChange={(e) => setFormData({ ...formData, formLink: e.target.value })}
                    />

                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'جاري الحفظ...' : (
                                <>
                                    <CheckCircle className="w-4 h-4 ml-2" />
                                    نشر الاختبار
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Modal>
        </motion.div>
    );
};
