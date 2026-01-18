import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Calendar, Clock, Plus, Users, CheckCircle, Trash2 } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { ClassSessionResponse, Grade, Subject } from '../../types/api';
import { teacherService } from '../../services/teacherService';
import { commonService } from '../../services/commonService';
import { useToast } from '../../context/ToastContext';

export const TeacherClassesPage = () => {
    const [classes, setClasses] = useState<ClassSessionResponse[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        gradeId: '',
        subjectId: '',
        date: '',
        time: '',
        description: '',
        teamsMeetingUrl: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [classesData, gradesData, subjectsData] = await Promise.all([
                teacherService.getClasses(),
                commonService.getGrades(),
                commonService.getSubjects()
            ]);
            setClasses(classesData);
            setGrades(gradesData);
            setSubjects(subjectsData);
        } catch (error) {
            console.error('Failed to load data', error);
            addToast('فشل تحميل البيانات', 'error');
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

    const handleCreateClass = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await teacherService.createClass({
                title: formData.title,
                gradeId: parseInt(formData.gradeId),
                subjectId: parseInt(formData.subjectId),
                scheduledTime: `${formData.date}T${formData.time}:00`,
                description: formData.description || undefined,
                teamsMeetingUrl: formData.teamsMeetingUrl || undefined
            });
            addToast('تم إنشاء الحصة بنجاح', 'success');
            loadData();
            setIsCreateModalOpen(false);
            setFormData({ title: '', gradeId: '', subjectId: '', date: '', time: '', description: '', teamsMeetingUrl: '' });
        } catch (error) {
            console.error('Failed to create class', error);
            addToast('فشل إنشاء الحصة', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteClass = async (classId: number) => {
        if (!window.confirm('هل أنت متأكد من حذف هذه الحصة؟')) return;
        try {
            await teacherService.deleteClass(classId);
            addToast('تم حذف الحصة', 'success');
            loadData();
        } catch (error) {
            console.error('Failed to delete class', error);
            addToast('فشل حذف الحصة', 'error');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'SCHEDULED': return 'bg-blue-100 text-blue-800';
            case 'LIVE': return 'bg-green-100 text-green-800';
            case 'COMPLETED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'SCHEDULED': return 'مجدولة';
            case 'LIVE': return 'مباشر';
            case 'COMPLETED': return 'منتهية';
            default: return status;
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
                    <h1 className="text-2xl font-bold text-gray-900">إدارة الفصول الافتراضية</h1>
                    <p className="mt-1 text-gray-500">جدولة الحصص الدراسية وإدارتها</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-5 h-5 ml-2" />
                    حصة جديدة
                </Button>
            </div>

            {/* Classes List */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {classes.length === 0 ? (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                لا توجد حصص مجدولة حالياً. قم بإنشاء حصة جديدة!
                            </div>
                        ) : (
                            classes.map((cls) => (
                                <motion.div key={cls.id} variants={itemVariants} layout>
                                    <Card className="hover:shadow-md transition-shadow relative">
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cls.status)}`}>
                                                {getStatusText(cls.status)}
                                            </span>
                                            <button 
                                                onClick={() => handleDeleteClass(cls.id)}
                                                className="text-red-400 hover:text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                <Video className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{cls.title}</h3>
                                                <p className="text-sm text-gray-500">{cls.subjectName} - {cls.gradeName}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(cls.scheduledTime).toLocaleDateString('ar-EG')}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                <Clock className="w-4 h-4" />
                                                <span>{new Date(cls.scheduledTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                <Users className="w-4 h-4" />
                                                <span>{cls.teacherName}</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 pt-4 flex gap-2">
                                            {cls.teamsMeetingUrl ? (
                                                <a
                                                    href={cls.teamsMeetingUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 bg-indigo-50 text-indigo-700 text-center py-2 rounded-lg font-bold text-sm hover:bg-indigo-100 transition-colors"
                                                >
                                                    انضمام
                                                </a>
                                            ) : (
                                                <span className="flex-1 bg-gray-50 text-gray-400 text-center py-2 rounded-lg text-sm">
                                                    لا يوجد رابط
                                                </span>
                                            )}
                                            {cls.teamsRecordingUrl && (
                                                <a
                                                    href={cls.teamsRecordingUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 bg-gray-50 text-gray-700 text-center py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
                                                >
                                                    التسجيل
                                                </a>
                                            )}
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Create Class Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="جدولة حصة جديدة"
            >
                <form onSubmit={handleCreateClass} className="space-y-4">
                    <Input
                        label="عنوان الحصة"
                        name="title"
                        placeholder="مثال: الفصل الأول - الكسور"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">الصف الدراسي</label>
                            <select
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={formData.gradeId}
                                onChange={(e) => setFormData({ ...formData, gradeId: e.target.value })}
                                required
                            >
                                <option value="">اختر الصف...</option>
                                {grades.map((grade) => (
                                    <option key={grade.id} value={grade.id}>{grade.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">المادة</label>
                            <select
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={formData.subjectId}
                                onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                                required
                            >
                                <option value="">اختر المادة...</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>{subject.nameAr || subject.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="التاريخ"
                            name="date"
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        <Input
                            label="الوقت"
                            name="time"
                            type="time"
                            required
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                    </div>

                    <Input
                        label="رابط الاجتماع (Microsoft Teams)"
                        name="teamsMeetingUrl"
                        placeholder="https://teams.microsoft.com/..."
                        value={formData.teamsMeetingUrl}
                        onChange={(e) => setFormData({ ...formData, teamsMeetingUrl: e.target.value })}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">وصف الحصة (اختياري)</label>
                        <textarea
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="وصف مختصر للحصة..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'جاري الحفظ...' : (
                                <>
                                    <CheckCircle className="w-4 h-4 ml-2" />
                                    جدولة الحصة
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Modal>
        </motion.div>
    );
};
