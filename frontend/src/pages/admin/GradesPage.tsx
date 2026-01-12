import { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const GradesPage = () => {
    // Mock Data
    const [grades] = useState([
        { id: '1', name: 'الصف الأول الابتدائي', classesCount: 4, studentsCount: 120 },
        { id: '2', name: 'الصف الثاني الابتدائي', classesCount: 3, studentsCount: 95 },
        { id: '3', name: 'الصف الثالث الابتدائي', classesCount: 4, studentsCount: 110 },
        { id: '4', name: 'الصف الرابع الابتدائي', classesCount: 3, studentsCount: 90 },
        { id: '5', name: 'الصف الخامس الابتدائي', classesCount: 3, studentsCount: 85 },
        { id: '6', name: 'الصف السادس الابتدائي', classesCount: 3, studentsCount: 80 },
    ]);

    return (
        <div className="space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">الصفوف الدراسية</h2>
                    <p className="mt-1 text-sm text-gray-500">إدارة المراحل والصفوف الدراسية.</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-none">
                    <Button>
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة صف جديد
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grades.map((grade) => (
                    <Card key={grade.id} className="hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{grade.name}</h3>
                                <div className="mt-2 text-sm text-gray-500">
                                    <p>عدد الفصول: {grade.classesCount}</p>
                                    <p>عدد الطلاب: {grade.studentsCount}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-gray-400 hover:text-indigo-600">
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button className="text-gray-400 hover:text-red-600">
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
