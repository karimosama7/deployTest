import React, { useState, useEffect } from 'react';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Plus } from 'lucide-react';
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
                        onEdit={(user) => console.log('Edit', user)}
                        onDelete={(user) => console.log('Delete', user)}
                    />
                </motion.div>
            )}
        </motion.div>
    );
};
