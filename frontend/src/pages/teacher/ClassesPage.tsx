import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Calendar, Clock, Plus, Users, CheckCircle, Trash2, Play, Square, Upload } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { ClassSessionResponse, Grade, Subject } from '../../types/api';
import { teacherService } from '../../services/teacherService';
import { useToast } from '../../context/ToastContext';

export const TeacherClassesPage = () => {
    const [classes, setClasses] = useState<ClassSessionResponse[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]); // Teacher's assigned subjects only
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        gradeId: '',
        subjectId: '',
        date: '',
        time: '',
        teamsMeetingUrl: ''
    });

    // Recording Modal State
    const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
    const [selectedClassForRecording, setSelectedClassForRecording] = useState<ClassSessionResponse | null>(null);
    const [recordingUrl, setRecordingUrl] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [classesData, gradesData, subjectsData] = await Promise.all([
                teacherService.getClasses(),
                teacherService.getMyGrades(),   // Only teacher's assigned grades
                teacherService.getMySubjects()  // Only teacher's assigned subjects
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
            // Auto-generate title from grade + subject + date
            const selectedGrade = grades.find(g => g.id === parseInt(formData.gradeId));
            const selectedSubject = subjects.find(s => s.id === parseInt(formData.subjectId));
            const autoTitle = `${selectedSubject?.nameAr || selectedSubject?.name || 'حصة'} - ${selectedGrade?.name || ''} - ${formData.date}`;

            await teacherService.createClass({
                title: autoTitle,
                gradeId: parseInt(formData.gradeId),
                subjectId: parseInt(formData.subjectId),
                scheduledTime: `${formData.date}T${formData.time}:00`,
                teamsMeetingUrl: formData.teamsMeetingUrl || undefined
            });
            addToast('تم إنشاء الحصة بنجاح', 'success');
            loadData();
            setIsCreateModalOpen(false);
            setFormData({ gradeId: '', subjectId: '', date: '', time: '', teamsMeetingUrl: '' });
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

    const handleStartClass = async (classId: number) => {
        // Removed confirmation
        try {
            await teacherService.startClass(classId);
            addToast('تم بدء الحصة بنجاح', 'success');
            loadData();
        } catch (error) {
            console.error('Failed to start class', error);
            addToast('فشل بدء الحصة', 'error');
        }
    };

    const handleEndClass = async (classId: number) => {
        // Removed confirmation
        try {
            await teacherService.endClass(classId);
            addToast('تم إنهاء الحصة بنجاح', 'success');
            loadData();
        } catch (error) {
            console.error('Failed to end class', error);
            addToast('فشل إنهاء الحصة', 'error');
        }
    };

    const handleOpenRecordingModal = (cls: ClassSessionResponse) => {
        setSelectedClassForRecording(cls);
        setRecordingUrl(cls.teamsRecordingUrl || '');
        setIsRecordingModalOpen(true);
    };

    const handleSubmitRecording = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClassForRecording) return;

        setIsSubmitting(true);
        try {
            await teacherService.updateRecordingUrl(selectedClassForRecording.id, recordingUrl);
            addToast('تم حفظ رابط التسجيل بنجاح', 'success');
            loadData();
            setIsRecordingModalOpen(false);
            setRecordingUrl('');
            setSelectedClassForRecording(null);
        } catch (error) {
            console.error('Failed to update recording url', error);
            addToast('فشل حفظ رابط التسجيل', 'error');
        } finally {
            setIsSubmitting(false);
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
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                                                    <Video className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{cls.title}</h3>
                                                    <p className="text-sm text-gray-500">{cls.subjectName} - {cls.gradeName}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusColor(cls.status)}`}>
                                                    {getStatusText(cls.status)}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteClass(cls.id)}
                                                    className="text-red-400 hover:text-red-600 p-1"
                                                    title="حذف الحصة"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
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
                                            {cls.status !== 'COMPLETED' && (
                                                <>
                                                    <Button
                                                        onClick={() => handleStartClass(cls.id)}
                                                        className={`flex-1 ${cls.status === 'LIVE' ? 'bg-green-100 text-green-700 hover:bg-green-100 cursor-default' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                                                        disabled={cls.status === 'LIVE'}
                                                    >
                                                        <Play className="w-4 h-4 ml-2" />
                                                        {cls.status === 'LIVE' ? 'مباشر' : 'بدء الحصة'}
                                                    </Button>

                                                    <Button
                                                        onClick={() => handleEndClass(cls.id)}
                                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                                    >
                                                        <Square className="w-4 h-4 ml-2" />
                                                        إنهاء
                                                    </Button>
                                                </>
                                            )}

                                            {cls.status === 'COMPLETED' && (
                                                <Button
                                                    onClick={() => handleOpenRecordingModal(cls)}
                                                    className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                >
                                                    <Upload className="w-4 h-4 ml-2" />
                                                    {cls.teamsRecordingUrl ? 'تعديل التسجيل' : 'رفع التسجيل'}
                                                </Button>
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

            {/* Upload Recording Modal */}
            <Modal
                isOpen={isRecordingModalOpen}
                onClose={() => setIsRecordingModalOpen(false)}
                title="إضافة رابط التسجيل"
            >
                <form onSubmit={handleSubmitRecording} className="space-y-4">
                    {selectedClassForRecording && (
                        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-gray-700">عنوان الحصة:</span>
                                <span>{selectedClassForRecording.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold text-gray-700">التاريخ:</span>
                                <span>{new Date(selectedClassForRecording.scheduledTime).toLocaleDateString('ar-EG')}</span>
                            </div>
                        </div>
                    )}

                    <Input
                        label="رابط التسجيل (Microsoft Teams / YouTube / Drive)"
                        name="recordingUrl"
                        placeholder="https://..."
                        value={recordingUrl}
                        onChange={(e) => setRecordingUrl(e.target.value)}
                        required
                    />

                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="secondary" onClick={() => setIsRecordingModalOpen(false)}>
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'جاري الحفظ...' : (
                                <>
                                    <CheckCircle className="w-4 h-4 ml-2" />
                                    حفظ التسجيل
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Modal>
        </motion.div>
    );
};
