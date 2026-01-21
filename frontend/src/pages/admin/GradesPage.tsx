import { useState, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Plus, Edit, Trash2, GraduationCap, Users, X, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminService } from '../../services/adminService';
import { Grade } from '../../types/api';

// Grade colors based on level
const getGradeColors = (level: number) => {
    const colors = [
        { color: 'bg-blue-50 text-blue-700', iconColor: 'bg-blue-100 text-blue-600', border: 'border-blue-200' },
        { color: 'bg-green-50 text-green-700', iconColor: 'bg-green-100 text-green-600', border: 'border-green-200' },
        { color: 'bg-purple-50 text-purple-700', iconColor: 'bg-purple-100 text-purple-600', border: 'border-purple-200' },
        { color: 'bg-orange-50 text-orange-700', iconColor: 'bg-orange-100 text-orange-600', border: 'border-orange-200' },
        { color: 'bg-cyan-50 text-cyan-700', iconColor: 'bg-cyan-100 text-cyan-600', border: 'border-cyan-200' },
        { color: 'bg-rose-50 text-rose-700', iconColor: 'bg-rose-100 text-rose-600', border: 'border-rose-200' },
    ];
    return colors[(level - 1) % colors.length];
};

interface GradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string, level: number) => Promise<void>;
    initialData?: Grade;
    title: string;
}

const GradeModal = ({ isOpen, onClose, onSubmit, initialData, title }: GradeModalProps) => {
    const [name, setName] = useState(initialData?.name || '');
    const [level, setLevel] = useState(initialData?.level?.toString() || '1');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName(initialData?.name || '');
            setLevel(initialData?.level?.toString() || '1');
            setError('');
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('يرجى إدخال اسم الصف');
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            await onSubmit(name.trim(), parseInt(level));
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'حدث خطأ أثناء الحفظ');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-xl w-full max-w-md"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                        <Input
                            label="اسم الصف"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="مثال: الصف الأول الابتدائي"
                            required
                        />
                        <Input
                            label="المستوى (الترتيب)"
                            type="number"
                            min="1"
                            max="12"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            placeholder="1"
                            required
                        />
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="w-4 h-4 ml-2 animate-spin" /> جاري الحفظ...</>
                                ) : (
                                    'حفظ'
                                )}
                            </Button>
                            <Button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                                إلغاء
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    gradeName: string;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, gradeName }: DeleteConfirmModalProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);
        try {
            await onConfirm();
            onClose();
        } catch (err) {
            console.error('Delete error:', err);
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-xl w-full max-w-sm"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">تأكيد الحذف</h3>
                        <p className="text-gray-500 mb-6">
                            هل أنت متأكد من حذف <span className="font-semibold text-gray-900">{gradeName}</span>؟
                            <br />
                            <span className="text-sm text-red-500">لا يمكن التراجع عن هذا الإجراء</span>
                        </p>
                        <div className="flex gap-3">
                            <Button
                                onClick={handleConfirm}
                                disabled={isDeleting}
                                className="flex-1 bg-red-600 hover:bg-red-700"
                            >
                                {isDeleting ? (
                                    <><Loader2 className="w-4 h-4 ml-2 animate-spin" /> جاري الحذف...</>
                                ) : (
                                    'نعم، احذف'
                                )}
                            </Button>
                            <Button
                                onClick={onClose}
                                className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                                إلغاء
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export const GradesPage = () => {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

    // Fetch grades
    const fetchGrades = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await adminService.getGrades();
            // Sort by level
            setGrades(data.sort((a, b) => a.level - b.level));
        } catch (err: any) {
            console.error('Error fetching grades:', err);
            setError('فشل في تحميل الصفوف الدراسية');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGrades();
    }, []);

    // CRUD handlers
    const handleCreate = async (name: string, level: number) => {
        await adminService.createGrade(name, level);
        await fetchGrades();
    };

    const handleEdit = async (name: string, level: number) => {
        if (!selectedGrade) return;
        await adminService.updateGrade(selectedGrade.id, name, level);
        await fetchGrades();
    };

    const handleDelete = async () => {
        if (!selectedGrade) return;
        await adminService.deleteGrade(selectedGrade.id);
        await fetchGrades();
    };

    const openEditModal = (grade: Grade) => {
        setSelectedGrade(grade);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (grade: Grade) => {
        setSelectedGrade(grade);
        setIsDeleteModalOpen(true);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">الصفوف الدراسية</h2>
                    <p className="mt-1 text-sm text-gray-500">إدارة المراحل والصفوف الدراسية.</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-none">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                            className="bg-indigo-600 hover:bg-indigo-700 shadow-md"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة صف جديد
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                    <span className="mr-3 text-gray-500">جاري التحميل...</span>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <Card className="border-red-200 bg-red-50">
                    <div className="flex items-center gap-3 text-red-700">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                        <Button 
                            onClick={fetchGrades}
                            className="mr-auto bg-red-100 text-red-700 hover:bg-red-200 text-sm"
                        >
                            إعادة المحاولة
                        </Button>
                    </div>
                </Card>
            )}

            {/* Empty State */}
            {!loading && !error && grades.length === 0 && (
                <Card className="text-center py-12">
                    <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد صفوف دراسية</h3>
                    <p className="text-gray-500 mb-4">ابدأ بإضافة صف دراسي جديد</p>
                    <Button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700"
                    >
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة صف جديد
                    </Button>
                </Card>
            )}

            {/* Grades Grid */}
            {!loading && !error && grades.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {grades.map((grade) => {
                        const colors = getGradeColors(grade.level);
                        return (
                            <motion.div key={grade.id} variants={itemVariants} whileHover={{ y: -5 }}>
                                <Card className={`hover:shadow-lg transition-all duration-300 border-none shadow-md overflow-hidden relative group`}>
                                    <div className={`absolute top-0 left-0 w-1 h-full ${colors.iconColor}`}></div>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-xl ${colors.iconColor}`}>
                                                <GraduationCap className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                    {grade.name}
                                                </h3>
                                                <div className="mt-3 space-y-1">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Users className="w-4 h-4 ml-2 opacity-70" />
                                                        <span>المستوى: {grade.level}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button 
                                                onClick={() => openEditModal(grade)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </button>
                                            <button 
                                                onClick={() => openDeleteModal(grade)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Modals */}
            <GradeModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreate}
                title="إضافة صف جديد"
            />
            <GradeModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedGrade(null);
                }}
                onSubmit={handleEdit}
                initialData={selectedGrade || undefined}
                title="تعديل الصف"
            />
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedGrade(null);
                }}
                onConfirm={handleDelete}
                gradeName={selectedGrade?.name || ''}
            />
        </motion.div>
    );
};
