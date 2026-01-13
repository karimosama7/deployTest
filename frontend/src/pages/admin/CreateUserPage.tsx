import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { Select } from '../../components/common/Select';
import { MultiSelect } from '../../components/common/MultiSelect';
import { Modal } from '../../components/common/Modal';
import { UserRole } from '../../context/AuthContext';
import { ArrowRight, Copy, Check, UserPlus } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { motion } from 'framer-motion';

export const CreateUserPage = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [searchParams] = useSearchParams();
    const defaultRole = (searchParams.get('role') as UserRole) || 'STUDENT';

    // Form State
    const [role, setRole] = useState<UserRole>(defaultRole);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        // Teacher specific
        subjects: [] as string[],
        grades: [] as string[],
        // Student specific
        grade: '',
        subscriptionType: 'FREE',
    });

    const [isLoading, setIsLoading] = useState(false);

    // Result State (for modal)
    const [resultModalOpen, setResultModalOpen] = useState(false);
    const [createdUser, setCreatedUser] = useState<{ username: string, password: string } | null>(null);
    const [copied, setCopied] = useState(false);

    // TODO: Fetch from backend API /api/admin/grades and /api/admin/subjects
    const gradeOptions = [
        { value: '1', label: 'الصف الأول الابتدائي' },
        { value: '2', label: 'الصف الثاني الابتدائي' },
        { value: '3', label: 'الصف الثالث الابتدائي' },
        { value: '4', label: 'الصف الرابع الابتدائي' },
        { value: '5', label: 'الصف الخامس الابتدائي' },
        { value: '6', label: 'الصف السادس الابتدائي' },
    ];

    const subjectOptions = [
        { value: '1', label: 'الرياضيات - Math' },
        { value: '2', label: 'العلوم - Science' },
        { value: '3', label: 'اللغة العربية' },
        { value: '4', label: 'اللغة الإنجليزية' },
    ];

    const subscriptionOptions = [
        { value: 'FREE', label: 'مجاني' },
        { value: 'PAID_MONTHLY', label: 'شهري' },
        { value: 'PAID_YEARLY', label: 'سنوي' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Prepare Payload based on CreateUserRequest DTO
            const payload: any = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                role: role,
            };

            if (role === 'TEACHER') {
                payload.subjectIds = formData.subjects.map(s => Number(s));
            } else if (role === 'STUDENT') {
                payload.gradeId = Number(formData.grade);
            }

            let endpoint = '/admin/users';
            if (role === 'TEACHER') endpoint = '/admin/teachers';
            else if (role === 'STUDENT') endpoint = '/admin/students';
            else if (role === 'PARENT') endpoint = '/admin/parents';

            const response = await api.post(endpoint, payload);
            const data = response.data;

            // Success
            setCreatedUser({
                username: data.username,
                password: data.generatedPassword
            });
            setResultModalOpen(true);
            addToast('تم إنشاء المستخدم بنجاح', 'success');

        } catch (error: any) {
            console.error("Failed to create user", error);
            const msg = error.response?.data?.message || 'فشل إنشاء المستخدم. تأكد من البيانات.';
            addToast(msg, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (createdUser) {
            const text = `Username: ${createdUser.username}\nPassword: ${createdUser.password}`;
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleCloseModal = () => {
        setResultModalOpen(false);
        navigate('/admin/users');
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20
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
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/admin/users')}
                        className="ml-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    >
                        <ArrowRight className="h-6 w-6" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate flex items-center gap-2">
                            <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                <UserPlus className="h-6 w-6" />
                            </span>
                            إضافة {role === 'TEACHER' ? 'معلم' : role === 'STUDENT' ? 'طالب' : role === 'PARENT' ? 'ولي أمر' : 'مستخدم'} جديد
                        </h2>
                    </div>
                </div>
            </div>

            <Card className="border-t-4 border-t-indigo-500 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                    {/* Role Selection */}
                    <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            نوع المستخدم
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {(['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] as UserRole[]).map((r) => (
                                <label key={r} className={`inline-flex items-center cursor-pointer p-3 rounded-lg border transition-all ${role === r ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        name="role"
                                        value={r}
                                        checked={role === r}
                                        onChange={(e) => setRole(e.target.value as UserRole)}
                                    />
                                    <span className={`mr-2 font-medium ${role === r ? 'text-indigo-900' : 'text-gray-700'}`}>
                                        {r === 'ADMIN' && 'مدير'}
                                        {r === 'TEACHER' && 'معلم'}
                                        {r === 'STUDENT' && 'طالب'}
                                        {r === 'PARENT' && 'ولي أمر'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Common Fields */}
                        <div className="col-span-2">
                            <Input
                                label="الاسم بالكامل"
                                id="fullName"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="transition-all focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                            />
                        </div>

                        <Input
                            label="البريد الإلكتروني"
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <Input
                            label="رقم الهاتف (اختياري)"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />

                        {/* Teacher Specific Fields */}
                        {role === 'TEACHER' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6 mt-2"
                            >
                                <div className="col-span-2">
                                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                        <span className="w-1 h-4 bg-indigo-500 rounded-full"></span>
                                        بيانات المعلم
                                    </h4>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <MultiSelect
                                        label="المواد الدراسية"
                                        options={subjectOptions}
                                        value={formData.subjects}
                                        onChange={(val) => setFormData({ ...formData, subjects: val })}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">يجب أن تكون المواد مضافة مسبقاً في النظام</p>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <MultiSelect
                                        label="الصفوف الدراسية"
                                        options={gradeOptions}
                                        value={formData.grades}
                                        onChange={(val) => setFormData({ ...formData, grades: val })}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Student Specific Fields */}
                        {role === 'STUDENT' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6 mt-2"
                            >
                                <div className="col-span-2">
                                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                        <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                                        بيانات الطالب
                                    </h4>
                                </div>
                                <Select
                                    label="الصف الدراسي"
                                    id="grade"
                                    required
                                    options={gradeOptions}
                                    value={formData.grade}
                                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                />
                                <Select
                                    label="نوع الاشتراك"
                                    id="subscription"
                                    required
                                    options={subscriptionOptions}
                                    value={formData.subscriptionType}
                                    onChange={(e) => setFormData({ ...formData, subscriptionType: e.target.value })}
                                />
                            </motion.div>
                        )}

                        {/* Parent Specific Fields */}
                        {role === 'PARENT' && (
                            <div className="col-span-2 border-t pt-4 mt-2 bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-700 flex items-center gap-2">
                                    <span className="font-bold">ملاحظة:</span>
                                    يمكنك ربط الأبناء بولي الأمر من صفحة "الطلاب" أو صفحة "أولياء الأمور" بعد إنشاء الحساب.
                                </p>
                            </div>
                        )}

                    </div>

                    <div className="flex justify-end pt-6 border-t">
                        <Button
                            type="button"
                            variant="secondary"
                            className="ml-3"
                            onClick={() => navigate('/admin/users')}
                        >
                            إلغاء
                        </Button>
                        <Button type="submit" isLoading={isLoading} className="bg-indigo-600 hover:bg-indigo-700 shadow-md">
                            إنشاء المستخدم
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Success Modal */}
            <Modal
                isOpen={resultModalOpen}
                onClose={handleCloseModal}
                title="تم إنشاء المستخدم بنجاح"
            >
                <div className="mt-2 text-sm text-gray-500">
                    <p>يرجى نسخ بيانات الدخول التالية وإرسالها للمستخدم.</p>
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-inner" dir="ltr">
                    <div className="flex justify-between items-center">
                        <div className="space-y-3 text-left w-full">
                            <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-100">
                                <div>
                                    <span className="text-xs text-gray-400 uppercase tracking-wider block">Username</span>
                                    <p className="font-mono font-bold text-gray-900 text-lg">{createdUser?.username}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-100">
                                <div>
                                    <span className="text-xs text-gray-400 uppercase tracking-wider block">Password</span>
                                    <p className="font-mono font-bold text-gray-900 text-lg">{createdUser?.password}</p>
                                </div>
                            </div>
                        </div>
                        <div className="ml-4">
                            <button
                                onClick={handleCopy}
                                className={`p-3 rounded-full transition-all duration-300 ${copied ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}`}
                                title="Copy to clipboard"
                            >
                                {copied ? <Check className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 sm:mt-8">
                    <Button
                        type="button"
                        className="w-full justify-center py-3 text-lg"
                        onClick={handleCloseModal}
                    >
                        تم، العودة للقائمة
                    </Button>
                </div>
            </Modal>
        </motion.div>
    );
};
