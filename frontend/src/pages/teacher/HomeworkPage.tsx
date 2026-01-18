import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Calendar, CheckCircle, Clock, MoreVertical, AlertCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { HomeworkResponse, ClassSessionResponse } from '../../types/api';
import { teacherService } from '../../services/teacherService';
import { useToast } from '../../context/ToastContext';

export const TeacherHomeworkPage = () => {
    const [homeworkList, setHomeworkList] = useState<HomeworkResponse[]>([]);
    const [classes, setClasses] = useState<ClassSessionResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    const [formData, setFormData] = useState({
        title: '',
        grade: '',
        dueDate: '',
        time: '',
        pdfLink: ''
    });

    useEffect(() => {
        loadHomeworks();
    }, []);

    const loadHomeworks = async () => {
        try {
            // Fetch classes first
            const classesData = await teacherService.getClasses();
            setClasses(classesData);

            // Then fetch homework for each class
            const homeworkPromises = classesData.map(cls => teacherService.getClassHomework(cls.id));
            const homeworksArrays = await Promise.all(homeworkPromises);

            // Flatten the array
            const allHomeworks = homeworksArrays.flat();
            setHomeworkList(allHomeworks);
        } catch (error) {
            console.error('Failed to load homeworks', error);
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

    const handleCreateHomework = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await teacherService.createHomework({
                title: formData.title,
                classSessionId: parseInt(formData.grade), // Using grade field as class selector for now
                dueDate: `${formData.dueDate}T${formData.time}:00`,
                description: '',
                homeworkUrl: formData.pdfLink,
            });
            // Reload to refresh list
            addToast('تم إنشاء الواجب بنجاح', 'success');
            loadHomeworks();
            setIsCreateModalOpen(false);
            setFormData({ title: '', grade: '', dueDate: '', time: '', pdfLink: '' });
        } catch (error) {
            console.error('Failed to create homework', error);
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
                    <h1 className="text-2xl font-bold text-gray-900">إدارة الواجبات والمهام</h1>
                    <p className="mt-1 text-gray-500">إسناد الواجبات ومتابعة تسليمات الطلاب</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-5 h-5 ml-2" />
                    واجب جديد
                </Button>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {homeworkList.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                                لا توجد واجبات حالياً.
                            </div>
                        ) : (
                            homeworkList.map((hw) => (
                                <motion.div key={hw.id} variants={itemVariants} layout>
                                    <Card className={`border-l-4 border-l-green-500 hover:shadow-md transition-shadow`}>
                                        <div className="flex flex-col md:flex-row justify-between gap-6">
                                            <div className="flex gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-green-100 text-green-600`}>
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">{hw.title}</h3>
                                                    <p className="text-gray-500 text-sm mt-1">{hw.subjectName} - {hw.classTitle}</p>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>تاريخ التسليم: {new Date(hw.dueDate).toLocaleDateString('ar-EG')}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{new Date(hw.dueDate).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-3 min-w-[200px]">
                                                <div className="flex items-center gap-2">
                                                    {/* Status logic removed as it's not in HomeworkResponse yet */}
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" />
                                                        نشط
                                                    </span>
                                                </div>

                                                <div className="w-full">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-600">تم التسليم</span>
                                                        <span className="font-bold text-gray-900">{hw.totalSubmissions} ({hw.gradedSubmissions} مُصحح)</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div
                                                            className={`h-2.5 rounded-full bg-green-600`}
                                                            style={{ width: `${hw.totalSubmissions > 0 ? (hw.gradedSubmissions / hw.totalSubmissions) * 100 : 0}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button variant="secondary" className="text-xs py-1 h-8">
                                                        عرض التسليمات
                                                    </Button>
                                                    <button className="text-gray-400 hover:text-gray-600 p-1">
                                                        <MoreVertical className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Create Homework Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="إضافة واجب جديد"
            >
                <form onSubmit={handleCreateHomework} className="space-y-4">
                    <Input
                        label="عنوان الواجب"
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
                            label="تاريخ التسليم"
                            type="date"
                            required
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        />
                        <Input
                            label="وقت التسليم"
                            type="time"
                            required
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                    </div>

                    <Input
                        label="رابط ملف الواجب (PDF اختياري)"
                        placeholder="https://..."
                        value={formData.pdfLink}
                        onChange={(e) => setFormData({ ...formData, pdfLink: e.target.value })}
                    />

                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'جاري الحفظ...' : (
                                <>
                                    <CheckCircle className="w-4 h-4 ml-2" />
                                    نشر الواجب
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Modal>
        </motion.div>
    );
};
