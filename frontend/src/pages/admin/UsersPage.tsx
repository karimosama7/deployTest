import React, { useState, useEffect } from 'react';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Plus, UserPlus } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../context/AuthContext';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { motion } from 'framer-motion';

// User Interface based on backend response
interface UserData {
    id: string; // Backend ID
    fullName: string;
    email: string;
    role: UserRole;
    isActive: boolean;
}

interface UsersPageProps {
    roleFilter?: UserRole;
}

export const UsersPage: React.FC<UsersPageProps> = ({ roleFilter }) => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

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


    useEffect(() => {
        fetchUsers();
    }, [roleFilter]);

    // Link Children State
    const [linkModalOpen, setLinkModalOpen] = useState(false);
    const [selectedParent, setSelectedParent] = useState<UserData | null>(null);
    const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

    const handleLinkChild = (parent: UserData) => {
        setSelectedParent(parent);
        setSelectedChildren([]); // Reset or fetch existing links
        setLinkModalOpen(true);
    };

    const submitLinkChildren = () => {
        // API Call would go here: api.post(`/admin/parents/${selectedParent.id}/children`, { childIds: selectedChildren })
        addToast('تم ربط الأبناء بنجاح', 'success');
        setLinkModalOpen(false);
    };

    const columns = [
        { header: 'الاسم', accessor: 'fullName' as const },
        { header: 'البريد الإلكتروني', accessor: 'email' as const },
        {
            header: 'الصلاحية',
            accessor: (item: UserData) => (
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
            )
        },
        {
            header: 'الحالة',
            accessor: (item: UserData) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.isActive ? 'نشط' : 'غير نشط'}
                </span>
            )
        },
    ];

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
                        columns={columns}
                        onEdit={(user) => navigate(`/admin/users/create?mode=edit&id=${user.id}&role=${user.role}`)}
                        onDelete={(user) => console.log('Delete', user)}
                        actions={(user) => (
                            <div className="flex items-center">
                                {user.role === 'PARENT' && (
                                    <button
                                        onClick={() => handleLinkChild(user)}
                                        className="text-indigo-600 hover:text-indigo-900 ml-3"
                                        title="ربط أبناء"
                                    >
                                        <UserPlus className="h-5 w-5" />
                                    </button>
                                )}
                                <button
                                    onClick={async () => {
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
                                    }}
                                    className={`ml-3 font-medium ${user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                                >
                                    {user.isActive ? 'إلغاء التفعيل' : 'تفعيل'}
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

                    {/* Mock Student Select for Prototype */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">اختر الطلاب</label>
                        <select
                            multiple
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-32"
                            value={selectedChildren}
                            onChange={(e) => setSelectedChildren(Array.from(e.target.selectedOptions, option => option.value))}
                        >
                            <option value="1">أحمد محمد (الصف السادس)</option>
                            <option value="2">سارة علي (الصف الرابع)</option>
                            <option value="3">كريم محمود (الصف الخامس)</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-2">اضغط مفتاح Ctrl (أو Cmd) لاختيار أكثر من طالب.</p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button variant="secondary" onClick={() => setLinkModalOpen(false)} className="ml-2">إلغاء</Button>
                        <Button onClick={submitLinkChildren}>حفظ التغييرات</Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};
