import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { Select } from '../../components/common/Select';
import { MultiSelect } from '../../components/common/MultiSelect';
import { Modal } from '../../components/common/Modal';
import { UserRole } from '../../context/AuthContext';
import { ArrowRight, Copy, Check } from 'lucide-react';

export const CreateUserPage = () => {
    const navigate = useNavigate();
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

    // Mock Options
    const gradeOptions = [
        { value: '1', label: 'الصف الأول الابتدائي' },
        { value: '2', label: 'الصف الثاني الابتدائي' },
        { value: '3', label: 'الصف الثالث الابتدائي' },
        { value: '4', label: 'الصف الرابع الابتدائي' },
        { value: '5', label: 'الصف الخامس الابتدائي' },
        { value: '6', label: 'الصف السادس الابتدائي' },
    ];

    const subjectOptions = [
        { value: 'MATH', label: 'الرياضيات - Math' },
        { value: 'SCIENCE', label: 'العلوم - Science' },
        { value: 'ARABIC', label: 'اللغة العربية' },
        { value: 'ENGLISH', label: 'اللغة الإنجليزية' },
        { value: 'RELIGION', label: 'التربية الدينية' },
        { value: 'SOCIAL', label: 'الدراسات الاجتماعية' },
    ];

    const subscriptionOptions = [
        { value: 'FREE', label: 'مجاني' },
        { value: 'PAID_MONTHLY', label: 'شهري' },
        { value: 'PAID_YEARLY', label: 'سنوي' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call & Credential Generation
        setTimeout(() => {
            const username = formData.email.split('@')[0] || `user_${Math.floor(Math.random() * 1000)}`;
            const password = Math.random().toString(36).slice(-8); // Random 8 char password

            console.log('Creating user:', { ...formData, role, username, password });

            setCreatedUser({ username, password });
            setIsLoading(false);
            setResultModalOpen(true);
        }, 1000);
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/admin/users')}
                        className="ml-4 p-2 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                        <ArrowRight className="h-6 w-6" />
                    </button>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        إضافة {role === 'TEACHER' ? 'معلم' : role === 'STUDENT' ? 'طالب' : role === 'PARENT' ? 'ولي أمر' : 'مستخدم'} جديد
                    </h2>
                </div>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                    {/* Role Selection */}
                    <div className="bg-gray-50 p-4 rounded-md">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            نوع المستخدم
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {(['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] as UserRole[]).map((r) => (
                                <label key={r} className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        name="role"
                                        value={r}
                                        checked={role === r}
                                        onChange={(e) => setRole(e.target.value as UserRole)}
                                    />
                                    <span className="mr-2 text-gray-700">
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
                            <>
                                <div className="col-span-2 border-t pt-4 mt-2">
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">بيانات المعلم</h4>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <MultiSelect
                                        label="المواد الدراسية (التي يقوم بتدريسها)"
                                        options={subjectOptions}
                                        value={formData.subjects}
                                        onChange={(val) => setFormData({ ...formData, subjects: val })}
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <MultiSelect
                                        label="الصفوف الدراسية"
                                        options={gradeOptions}
                                        value={formData.grades}
                                        onChange={(val) => setFormData({ ...formData, grades: val })}
                                    />
                                </div>
                            </>
                        )}

                        {/* Student Specific Fields */}
                        {role === 'STUDENT' && (
                            <>
                                <div className="col-span-2 border-t pt-4 mt-2">
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">بيانات الطالب</h4>
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
                            </>
                        )}

                        {/* Parent Specific Fields */}
                        {role === 'PARENT' && (
                            <div className="col-span-2 border-t pt-4 mt-2">
                                <p className="text-sm text-gray-500">
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
                        <Button type="submit" isLoading={isLoading}>
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

                <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200" dir="ltr">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2 text-left">
                            <div>
                                <span className="text-xs text-gray-500 uppercase">Username</span>
                                <p className="font-mono font-bold text-gray-900">{createdUser?.username}</p>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 uppercase">Password</span>
                                <p className="font-mono font-bold text-gray-900">{createdUser?.password}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div className="mt-5 sm:mt-6">
                    <Button
                        type="button"
                        className="w-full justify-center"
                        onClick={handleCloseModal}
                    >
                        تم
                    </Button>
                </div>
            </Modal>
        </div>
    );
};
