import React from 'react';
import { Card } from '../../components/common/Card';
import { Users, GraduationCap, BookOpen, UserCheck, Search, Plus } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
    const navigate = useNavigate();

    // Mock Data
    const stats = [
        { name: 'المعلمين', value: '12', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'الطلاب', value: '150', icon: GraduationCap, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'أولياء الأمور', value: '120', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'المراحل الدراسية', value: '6', icon: UserCheck, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    const studentsPerGrade = [
        { grade: 'الصف الأول', count: 20 },
        { grade: 'الصف الثاني', count: 25 },
        { grade: 'الصف الثالث', count: 30 },
        { grade: 'الصف الرابع', count: 18 },
        { grade: 'الصف الخامس', count: 22 },
        { grade: 'الصف السادس', count: 15 },
    ];

    return (
        <div className="space-y-6">
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        لوحة التحكم (Admin)
                    </h2>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <Card key={item.name} className="overflow-hidden">
                        <div className="flex items-center">
                            <div className={`flex-shrink-0 rounded-md p-3 ${item.bg}`}>
                                <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                            </div>
                            <div className="mr-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">{item.value}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* User Management Actions */}
                <Card className="h-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">إدارة المستخدمين</h3>
                    <div className="flex flex-wrap gap-3">
                        <Button onClick={() => navigate('/admin/users/create?role=TEACHER')} className="flex-1 sm:flex-none justify-center">
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة معلم
                        </Button>
                        <Button onClick={() => navigate('/admin/users/create?role=STUDENT')} variant="secondary" className="flex-1 sm:flex-none justify-center">
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة طالب
                        </Button>
                        <Button onClick={() => navigate('/admin/users/create?role=PARENT')} variant="secondary" className="flex-1 sm:flex-none justify-center">
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة ولي أمر
                        </Button>
                    </div>
                </Card>

                {/* Search Student */}
                <Card className="h-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">بحث عن طالب</h3>
                    <div className="flex gap-2">
                        <Input placeholder="أدخل اسم الطالب أو الرقم التعريفي" className="flex-1" />
                        <Button>
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Students Per Grade */}
            <Card>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">الطلاب لكل صف</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {studentsPerGrade.map((item) => (
                        <div key={item.grade} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
                            <div className="text-sm font-medium text-gray-500 truncate">{item.grade}</div>
                            <div className="mt-1 text-xl font-semibold text-gray-900">{item.count}</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
