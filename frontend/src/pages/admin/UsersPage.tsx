import React, { useState } from 'react';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../context/AuthContext';

// Mock User Data Interface
interface UserData {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    status: 'Active' | 'Inactive';
}

interface UsersPageProps {
    roleFilter?: UserRole;
}

export const UsersPage: React.FC<UsersPageProps> = ({ roleFilter }) => {
    const navigate = useNavigate();
    // Mock Data
    const [allUsers] = useState<UserData[]>([
        { id: '1', fullName: 'أحمد محمد', email: 'teacher@abnaouna.com', role: 'TEACHER', status: 'Active' },
        { id: '2', fullName: 'محمود حسن', email: 'student@abnaouna.com', role: 'STUDENT', status: 'Active' },
        { id: '3', fullName: 'حسن علي', email: 'parent@abnaouna.com', role: 'PARENT', status: 'Active' },
        { id: '4', fullName: 'سارة محمد', email: 'sara@abnaouna.com', role: 'STUDENT', status: 'Active' },
    ]);

    const users = roleFilter ? allUsers.filter(u => u.role === roleFilter) : allUsers;

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
        { header: 'الحالة', accessor: (item: UserData) => item.status === 'Active' ? 'نشط' : 'غير نشط' },
    ];

    return (
        <div className="space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{getTitle()}</h2>
                    <p className="mt-1 text-sm text-gray-500">{getSubtitle()}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-none">
                    <Button onClick={() => navigate(`/admin/users/create${roleFilter ? `?role=${roleFilter}` : ''}`)}>
                        <Plus className="h-4 w-4 ml-2" />
                        {roleFilter ? `إضافة` : 'إضافة مستخدم'}
                    </Button>
                </div>
            </div>

            <DataTable
                data={users}
                columns={columns}
                onEdit={(user) => console.log('Edit', user)}
                onDelete={(user) => console.log('Delete', user)}
            />
        </div>
    );
};
