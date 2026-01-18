import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Calendar, Clock, Plus, Users, MoreVertical, CheckCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { ClassSessionResponse } from '../../types/api';
import { teacherService } from '../../services/teacherService';

export const TeacherClassesPage = () => {
    const [classes, setClasses] = useState<ClassSessionResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        grade: '',
        date: '',
        time: '',
        duration: '45',
        link: ''
    });

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async () => {
        try {
            const data = await teacherService.getClasses();
            setClasses(data);
        } catch (error) {
            console.error('Failed to load classes', error);
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
                title: 'حصة رياضيات', // TODO: Add title to form or derive
                gradeId: 1, // TODO: Map grade to ID
                subjectId: 1, // TODO: Get from auth/context
                scheduledTime: `${formData.date}T${formData.time}:00`,
                description: '',
                teamsMeetingUrl: formData.link
            });
            // Reload classes to get full data
            loadClasses();
            setIsCreateModalOpen(false);
            setFormData({ grade: '', date: '', time: '', duration: '45', link: '' });
        } catch (error) {
            console.error('Failed to create class', error);
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
                                لا توجد حصص مجدولة حالياً.
                            </div>
                        ) : (
                            classes.map((cls) => (
                                <motion.div key={cls.id} variants={itemVariants} layout>
                                    <Card className="hover:shadow-md transition-shadow relative">
                                        <div className="absolute top-4 left-4">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                <Video className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{cls.subjectName}</h3>
                                                <p className="text-sm text-gray-500">{cls.gradeName}</p>
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
                                                <span>0 طالب</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 pt-4 flex gap-2">
                                            <a
                                                href={cls.teamsMeetingUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-indigo-50 text-indigo-700 text-center py-2 rounded-lg font-bold text-sm hover:bg-indigo-100 transition-colors"
                                            >
                                                انضمام
                                            </a>
                                            <button className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                                                التفاصيل
                                            </button>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">الصف الدراسي</label>
                        <select
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            required
                        >
                            <option value="">اختر الصف...</option>
                            <option value="الصف الأول">الصف الأول</option>
                            <option value="الصف الثاني">الصف الثاني</option>
                            <option value="الصف الثالث">الصف الثالث</option>
                            <option value="الصف الرابع">الصف الرابع</option>
                            <option value="الصف الخامس">الصف الخامس</option>
                            <option value="الصف السادس">الصف السادس</option>
                        </select>
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">المدة (دقيقة)</label>
                        <select
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        >
                            <option value="30">30 دقيقة</option>
                            <option value="45">45 دقيقة</option>
                            <option value="60">60 دقيقة (ساعة)</option>
                            <option value="90">90 دقيقة</option>
                        </select>
                    </div>

                    <Input
                        label="رابط الاجتماع (Microsoft Teams)"
                        name="link"
                        placeholder="https://teams.microsoft.com/..."
                        required
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
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
        </motion.div>
    );
};
