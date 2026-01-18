import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal'; // Assuming a reusable Modal exists (checked file structure)
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { studentService } from '../../services/studentService';

export const HomeworkPage = () => {
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [selectedHomework, setSelectedHomework] = useState<any>(null);
    const [submissionLink, setSubmissionLink] = useState('');

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

    const handleOpenSubmit = (hw: any) => {
        setSelectedHomework(hw);
        setIsSubmitModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!selectedHomework) return;

        try {
            await studentService.submitHomework(selectedHomework.id, submissionLink);
            // Show success message or specific UI update
            alert('تم تسليم الواجب بنجاح!');
            setIsSubmitModalOpen(false);
            setSubmissionLink('');
        } catch (error) {
            console.error('Failed to submit homework', error);
            alert('حدث خطأ أثناء تسليم الواجب.');
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
                    <h1 className="text-2xl font-bold text-gray-900">واجباتي المدرسية</h1>
                    <p className="mt-1 text-gray-500">متابعة الواجبات الحالية وتسليم الحلول</p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg text-green-700 font-medium">
                    <FileText className="w-5 h-5" />
                    <span>2 واجب معلق</span>
                </div>
            </div>

            {/* Current Homework */}
            <motion.div variants={itemVariants}>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                    الواجبات الحالية (مطلوب التسليم)
                </h2>

                <div className="space-y-4">
                    {/* Homework Item 1 */}
                    <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mt-1">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">واجب الرياضيات #5 - الجبر</h3>
                                    <p className="text-gray-500 text-sm mt-1">أ. أحمد محمد | تاريخ النشر: أمس</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-sm font-medium text-red-600 flex items-center gap-1 bg-red-50 px-2 py-1 rounded">
                                            <AlertCircle className="w-4 h-4" />
                                            آخر موعد: غداً، 11:59 م
                                        </span>
                                        <button className="text-indigo-600 text-sm font-bold hover:underline flex items-center gap-1">
                                            <ExternalLink className="w-4 h-4" />
                                            عرض ملف الواجب (PDF)
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleOpenSubmit({ id: 1, title: 'واجب الرياضيات #5' })}
                                className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2 justify-center"
                            >
                                <Upload className="w-5 h-5" />
                                تسليم الواجب
                            </motion.button>
                        </div>
                    </Card>

                    {/* Homework Item 2 */}
                    <Card className="border-l-4 border-l-yellow-500 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 mt-1">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">نشاط العلوم - دورة حياة النبات</h3>
                                    <p className="text-gray-500 text-sm mt-1">أ. سارة علي | تاريخ النشر: 12 يناير</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-sm font-medium text-yellow-700 flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                                            <Clock className="w-4 h-4" />
                                            آخر موعد: 20 يناير
                                        </span>
                                        <button className="text-indigo-600 text-sm font-bold hover:underline flex items-center gap-1">
                                            <ExternalLink className="w-4 h-4" />
                                            عرض ملف الواجب (PDF)
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleOpenSubmit({ id: 2, title: 'نشاط العلوم' })}
                                className="bg-white border-2 border-green-600 text-green-600 px-6 py-2.5 rounded-xl font-bold hover:bg-green-50 transition-colors flex items-center gap-2 justify-center"
                            >
                                <Upload className="w-5 h-5" />
                                تسليم الواجب
                            </motion.button>
                        </div>
                    </Card>
                </div>
            </motion.div>

            {/* Past Submissions */}
            <motion.div variants={itemVariants} className="pt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-gray-300 rounded-full"></span>
                    الواجبات السابقة
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عنوان الواجب</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ التسليم</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدرجة</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-sm font-medium text-gray-900">واجب الرياضيات #4</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">10 يناير 2026</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        تم التصحيح
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className="font-bold text-gray-900">10/10</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-sm font-medium text-gray-900">اللغة الإنجليزية - Grammar</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">8 يناير 2026</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        قيد المراجعة
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    -
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>

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
                            disabled={!submissionLink}
                            className={`${!submissionLink ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <CheckCircle className="w-4 h-4 ml-2" />
                            تأكيد التسليم
                        </Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};
