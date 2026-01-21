import React, { useState, useEffect } from 'react';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Plus, UserPlus, Power, PowerOff, GraduationCap, Key, Copy } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../context/AuthContext';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { motion } from 'framer-motion';
import { adminService } from '../../services/adminService';
import { Grade, UserResponse } from '../../types/api';
import { SearchableMultiSelect } from '../../components/common/SearchableMultiSelect';

// User Interface based on backend response
interface UserData {
    id: string; // Backend ID
    fullName: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    gradeId?: number; // For students
}

interface UsersPageProps {
    roleFilter?: UserRole;
}

export const UsersPage: React.FC<UsersPageProps> = ({ roleFilter }) => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [users, setUsers] = useState<UserData[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(true);
    // Password reset modal state
    const [resetModalOpen, setResetModalOpen] = useState(false);
    const [resetCreds, setResetCreds] = useState<{ username: string; password: string } | null>(null);
    const [copiedReset, setCopiedReset] = useState(false);

    const getTitle = () => {
        switch (roleFilter) {
            case 'TEACHER': return 'المعلمين';
            case 'STUDENT': return 'الطلاب';
            case 'PARENT': return 'أولياء الأمور';
            default: return 'المستخدمين';
        }
    };

    const getSubtitle = () => {
        switch (roleFilter) {
            case 'TEACHER': return 'قائمة بجميع المعلمين في النظام.';
            case 'STUDENT': return 'قائمة بجميع الطلاب في النظام.';
            case 'PARENT': return 'قائمة بجميع أولياء الأمور في النظام.';
            default: return 'قائمة بجميع المستخدمين في النظام.';
        }
    };

    // Get grade name by ID
    const getGradeName = (gradeId?: number): string => {
        if (!gradeId) return '—';
        const grade = grades.find(g => g.id === gradeId);
        return grade?.name || '—';
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            let endpoint = '/admin/users';
            if (roleFilter) {
                if (roleFilter === 'TEACHER') endpoint = '/admin/teachers';
                else if (roleFilter === 'STUDENT') endpoint = '/admin/students';
                else if (roleFilter === 'PARENT') endpoint = '/admin/parents';
                else endpoint = `/admin/users/role/${roleFilter}`;
            }

            const response = await api.get(endpoint);
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
            addToast('فشل تحميل قائمة المستخدمين', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchGrades = async () => {
        try {
            const gradesData = await adminService.getGrades();
            setGrades(gradesData);
        } catch (error) {
            console.error("Failed to fetch grades", error);
        }
    };

    useEffect(() => {
        fetchUsers();
        // Fetch grades for students list or parent's link modal
        if (roleFilter === 'STUDENT' || roleFilter === 'PARENT' || !roleFilter) {
            fetchGrades();
        }
    }, [roleFilter]);

    // Link Children State
    const [linkModalOpen, setLinkModalOpen] = useState(false);
    const [selectedParent, setSelectedParent] = useState<UserData | null>(null);
    const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
    const [allStudents, setAllStudents] = useState<UserResponse[]>([]);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [savingLink, setSavingLink] = useState(false);

    const handleLinkChild = async (parent: UserData) => {
        setSelectedParent(parent);
        setSelectedChildren([]); // Reset selection
        setLinkModalOpen(true);

        // Fetch all students for selection
        setLoadingStudents(true);
        try {
            const students = await adminService.getStudents();
            setAllStudents(students);
        } catch (error) {
            console.error('Failed to fetch students', error);
            addToast('فشل تحميل قائمة الطلاب', 'error');
        } finally {
            setLoadingStudents(false);
        }
    };

    const submitLinkChildren = async () => {
        if (!selectedParent || selectedChildren.length === 0) {
            addToast('الرجاء اختيار طالب واحد على الأقل', 'error');
            return;
        }

        setSavingLink(true);
        try {
            await adminService.assignChildrenToParent(
                Number(selectedParent.id),
                selectedChildren.map(id => Number(id))
            );
            addToast('تم ربط الأبناء بنجاح', 'success');
            setLinkModalOpen(false);
            fetchUsers(); // Refresh the list
        } catch (error: any) {
            console.error('Failed to link children', error);
            const msg = error.response?.data?.message || 'حدث خطأ أثناء ربط الأبناء';
            addToast(msg, 'error');
        } finally {
            setSavingLink(false);
        }
    };

    // Toggle activation handler
    const handleToggleActivation = async (user: UserData) => {
        if (window.confirm(`هل أنت متأكد من ${user.isActive ? 'إلغاء تفعيل' : 'تفعيل'} هذا المستخدم؟`)) {
            try {
                await api.put(`/admin/users/${user.id}/activate?active=${!user.isActive}`);
                addToast(`تم ${user.isActive ? 'إلغاء تفعيل' : 'تفعيل'} المستخدم بنجاح`, 'success');
                fetchUsers(); // Refresh list
            } catch (err) {
                console.error(err);
                addToast('حدث خطأ أثناء تغيير حالة المستخدم', 'error');
            }
        }
    };

    // Password reset handler
    const handleResetPassword = async (user: UserData) => {
        if (window.confirm(`هل أنت متأكد من إعادة تعيين كلمة مرور "${user.fullName}"؟`)) {
            try {
                const result = await adminService.resetPassword(Number(user.id));
                setResetCreds({
                    username: result.username,
                    password: result.generatedPassword || 'N/A'
                });
                setResetModalOpen(true);
                addToast('تم إعادة تعيين كلمة المرور', 'success');
            } catch (err: any) {
                console.error(err);
                const msg = err.response?.data?.message || 'حدث خطأ أثناء إعادة تعيين كلمة المرور';
                addToast(msg, 'error');
            }
        }
    };

    const copyResetCredentials = () => {
        if (resetCreds) {
            const text = `اسم المستخدم: ${resetCreds.username}\nكلمة المرور الجديدة: ${resetCreds.password}`;
            navigator.clipboard.writeText(text);
            setCopiedReset(true);
            setTimeout(() => setCopiedReset(false), 2000);
        }
    };

    // Build columns dynamically based on role filter
    const getColumns = () => {
        const baseColumns = [
            { header: 'الاسم', accessor: 'fullName' as const },
            { header: 'البريد الإلكتروني', accessor: 'email' as const },
        ];

        // Add grade column for students
        if (roleFilter === 'STUDENT') {
            baseColumns.push({
                header: 'الصف الدراسي',
                accessor: ((item: UserData) => (
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-100 rounded-lg">
                            <GraduationCap className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="text-gray-700 font-medium">
                            {getGradeName(item.gradeId)}
                        </span>
                    </div>
                )) as any,
            });
        }

        // Add role column only when not filtered by role
        if (!roleFilter) {
            baseColumns.push({
                header: 'الصلاحية',
                accessor: ((item: UserData) => (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${item.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                            item.role === 'TEACHER' ? 'bg-blue-100 text-blue-800' :
                                item.role === 'STUDENT' ? 'bg-green-100 text-green-800' :
                                    'bg-purple-100 text-purple-800'}`
                    }>
                        {item.role === 'ADMIN' ? 'مدير' :
                            item.role === 'TEACHER' ? 'معلم' :
                                item.role === 'STUDENT' ? 'طالب' : 'ولي أمر'}
                    </span>
                )) as any,
            });
        }

        // Add status column
        baseColumns.push({
            header: 'الحالة',
            accessor: ((item: UserData) => (
                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                    {item.isActive ? 'نشط' : 'غير نشط'}
                </span>
            )) as any,
        });

        return baseColumns;
    };

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{getTitle()}</h2>
                    <p className="mt-1 text-sm text-gray-500">{getSubtitle()}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-none">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={() => navigate(`/admin/users/create${roleFilter ? `?role=${roleFilter}` : ''}`)}
                            className="bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
                        >
                            <Plus className="h-4 w-4 ml-2" />
                            {roleFilter ? `إضافة` : 'إضافة مستخدم'}
                        </Button>
                    </motion.div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                >
                    <DataTable
                        data={users}
                        columns={getColumns()}
                        onEdit={(user) => navigate(`/admin/users/create?mode=edit&id=${user.id}&role=${user.role}`)}
                        onDelete={async (user) => {
                            if (window.confirm(`هل أنت متأكد من حذف المستخدم "${user.fullName}"؟ لا يمكن التراجع عن هذا الإجراء.`)) {
                                try {
                                    await api.delete(`/admin/users/${user.id}`);
                                    addToast('تم حذف المستخدم بنجاح', 'success');
                                    fetchUsers(); // Refresh list
                                } catch (err: any) {
                                    console.error(err);
                                    const msg = err.response?.data?.message || 'حدث خطأ أثناء حذف المستخدم';
                                    addToast(msg, 'error');
                                }
                            }
                        }}
                        actions={(user) => (
                            <div className="flex items-center gap-2">
                                {user.role === 'PARENT' && (
                                    <button
                                        onClick={() => handleLinkChild(user)}
                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="ربط أبناء"
                                    >
                                        <UserPlus className="h-4 w-4" />
                                    </button>
                                )}
                                {/* Improved Activate/Deactivate Button */}
                                <button
                                    onClick={() => handleToggleActivation(user)}
                                    className={`
                                        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                                        transition-all duration-200 border
                                        ${user.isActive
                                            ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300'
                                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
                                        }
                                    `}
                                    title={user.isActive ? 'إلغاء التفعيل' : 'تفعيل'}
                                >
                                    {user.isActive ? (
                                        <>
                                            <PowerOff className="h-3.5 w-3.5" />
                                            <span>إلغاء</span>
                                        </>
                                    ) : (
                                        <>
                                            <Power className="h-3.5 w-3.5" />
                                            <span>تفعيل</span>
                                        </>
                                    )}
                                </button>
                                {/* Reset Password Button */}
                                <button
                                    onClick={() => handleResetPassword(user)}
                                    className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                    title="إعادة تعيين كلمة المرور"
                                >
                                    <Key className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    />
                </motion.div>
            )}

            {/* Link Children Modal */}
            <Modal
                isOpen={linkModalOpen}
                onClose={() => setLinkModalOpen(false)}
                title={`ربط أبناء بـ ${selectedParent?.fullName}`}
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">اختر الطلاب الذين تود ربطهم بهذا الولي للأمر.</p>

                    {loadingStudents ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            <span className="mr-3 text-gray-500">جاري تحميل الطلاب...</span>
                        </div>
                    ) : (
                        <SearchableMultiSelect
                            label="اختر الطلاب"
                            options={allStudents.map(s => ({
                                value: s.id.toString(),
                                label: `${s.fullName}${s.gradeId ? ` (${grades.find(g => g.id === s.gradeId)?.name || ''})` : ''}`
                            }))}
                            value={selectedChildren}
                            onChange={setSelectedChildren}
                            placeholder="ابحث عن طالب..."
                        />
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="secondary"
                            onClick={() => setLinkModalOpen(false)}
                            disabled={savingLink}
                        >
                            إلغاء
                        </Button>
                        <Button
                            onClick={submitLinkChildren}
                            disabled={savingLink || selectedChildren.length === 0}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            {savingLink ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Password Reset Modal */}
            <Modal
                isOpen={resetModalOpen}
                onClose={() => setResetModalOpen(false)}
                title="بيانات تسجيل الدخول الجديدة"
            >
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm">
                        تم إعادة تعيين كلمة المرور بنجاح. احفظ هذه البيانات لإرسالها للمستخدم:
                    </p>

                    {resetCreds && (
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3 font-mono text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">اسم المستخدم:</span>
                                <span className="font-bold text-gray-900">{resetCreds.username}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">كلمة المرور:</span>
                                <span className="font-bold text-green-600">{resetCreds.password}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="secondary"
                            onClick={copyResetCredentials}
                            className="flex items-center gap-2"
                        >
                            <Copy className="w-4 h-4" />
                            {copiedReset ? 'تم النسخ!' : 'نسخ البيانات'}
                        </Button>
                        <Button onClick={() => setResetModalOpen(false)}>
                            إغلاق
                        </Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};
