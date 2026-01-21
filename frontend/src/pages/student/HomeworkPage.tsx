import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, CheckCircle, Clock, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { studentService } from '../../services/studentService';
import { StudentHomeworkResponse } from '../../types/api';
import { useToast } from '../../context/ToastContext';

export const HomeworkPage = () => {
    const [homework, setHomework] = useState<StudentHomeworkResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [selectedHomework, setSelectedHomework] = useState<StudentHomeworkResponse | null>(null);
    const [submissionLink, setSubmissionLink] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { addToast } = useToast();

    useEffect(() => {
        fetchHomework();
    }, []);

    const fetchHomework = async () => {
        try {
            const data = await studentService.getHomework();
            // Sort by due date (closest first)
            data.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
            setHomework(data);
        } catch (error) {
            console.error('Failed to fetch homework', error);
            addToast('فشل تحميل الواجبات', 'error');
        } finally {
            setLoading(false);
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

    const handleOpenSubmit = (hw: StudentHomeworkResponse) => {
        setSelectedHomework(hw);
        setSubmissionLink('');
        setIsSubmitModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!selectedHomework || !submissionLink) return;

        setSubmitting(true);
        try {
            await studentService.submitHomework(selectedHomework.id, submissionLink);
            addToast('تم تسليم الواجب بنجاح!', 'success');
            setIsSubmitModalOpen(false);
            setSubmissionLink('');
            fetchHomework(); // Refresh list
        } catch (error) {
            console.error('Failed to submit homework', error);
            addToast('حدث خطأ أثناء تسليم الواجب.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    // Split homework into pending and submitted
    const pendingHomework = homework.filter(hw => !hw.isSubmitted);
    const submittedHomework = homework.filter(hw => hw.isSubmitted);

    const formatDueDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { text: 'متأخر', urgent: true };
        if (diffDays === 0) return { text: 'اليوم', urgent: true };
        if (diffDays === 1) return { text: 'غداً', urgent: true };
        return { text: date.toLocaleDateString('ar-EG'), urgent: false };
    };

    const getStatusBadge = (status: string, grade?: number) => {
        switch (status) {
            case 'REVIEWED':
                return (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        تم التصحيح {grade !== undefined && `(${grade})`}
                    </span>
                );
            case 'SUBMITTED':
                return (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        قيد المراجعة
                    </span>
                );
            case 'PENDING':
            case 'NOT_SUBMITTED':
            default:
                return (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        لم يتم التسليم
                    </span>
                );
        }
    };

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
                    <h1 className="text-2xl font-bold text-gray-900">واجباتي المدرسية</h1>
                    <p className="mt-1 text-gray-500">متابعة الواجبات الحالية وتسليم الحلول</p>
                </div>
                {pendingHomework.length > 0 && (
                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg text-yellow-700 font-medium">
                        <FileText className="w-5 h-5" />
                        <span>{pendingHomework.length} واجب معلق</span>
                    </div>
                )}
            </div>

            {/* Pending Homework */}
            {pendingHomework.length > 0 && (
                <motion.div variants={itemVariants}>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                        الواجبات الحالية (مطلوب التسليم)
                    </h2>

                    <div className="space-y-4">
                        {pendingHomework.map((hw) => {
                            const dueInfo = formatDueDate(hw.dueDate);
                            return (
                                <Card key={hw.id} className={`border-l-4 ${dueInfo.urgent ? 'border-l-red-500' : 'border-l-green-500'} shadow-sm hover:shadow-md transition-shadow`}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl ${dueInfo.urgent ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} flex items-center justify-center mt-1`}>
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{hw.title}</h3>
                                                <p className="text-gray-500 text-sm mt-1">{hw.subjectName}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className={`text-sm font-medium flex items-center gap-1 px-2 py-1 rounded ${dueInfo.urgent ? 'text-red-600 bg-red-50' : 'text-yellow-700 bg-yellow-50'}`}>
                                                        {dueInfo.urgent ? <AlertCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                                        آخر موعد: {dueInfo.text}
                                                    </span>
                                                    {hw.homeworkUrl && (
                                                        <a href={hw.homeworkUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm font-bold hover:underline flex items-center gap-1">
                                                            <ExternalLink className="w-4 h-4" />
                                                            عرض ملف الواجب
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleOpenSubmit(hw)}
                                            className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2 justify-center"
                                        >
                                            <Upload className="w-5 h-5" />
                                            تسليم الواجب
                                        </motion.button>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            {/* Empty state for pending */}
            {pendingHomework.length === 0 && (
                <motion.div variants={itemVariants} className="text-center py-12 bg-green-50 rounded-xl">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">ممتاز! لا توجد واجبات معلقة</h3>
                    <p className="text-gray-500">جميع الواجبات تم تسليمها</p>
                </motion.div>
            )}

            {/* Submitted Homework */}
            {submittedHomework.length > 0 && (
                <motion.div variants={itemVariants} className="pt-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-gray-300 rounded-full"></span>
                        الواجبات المسلمة
                    </h2>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عنوان الواجب</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المادة</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدرجة</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {submittedHomework.map((hw) => (
                                    <tr key={hw.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{hw.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{hw.subjectName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(hw.submissionStatus, hw.grade)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {hw.grade !== undefined ? (
                                                <span className="font-bold text-gray-900">{hw.grade}</span>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Submit Modal */}
            <Modal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
                title={`تسليم الواجب: ${selectedHomework?.title}`}
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                        الرجاء رفع ملف الحل على Google Drive والتأكد من تغيير صلاحيات المشاركة إلى "Anyone with the link can view".
                    </p>

                    <div>
                        <Input
                            label="رابط ملف الحل (Google Drive Link)"
                            placeholder="https://drive.google.com/file/d/..."
                            value={submissionLink}
                            onChange={(e) => setSubmissionLink(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="secondary" onClick={() => setIsSubmitModalOpen(false)}>
                            إلغاء
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!submissionLink || submitting}
                            className={`${(!submissionLink || submitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? (
                                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                            ) : (
                                <CheckCircle className="w-4 h-4 ml-2" />
                            )}
                            تأكيد التسليم
                        </Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};
