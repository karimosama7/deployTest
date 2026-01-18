import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Search, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

export const StudentReportPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [studentData, setStudentData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock Data
        setStudentData({
            id: 1,
            name: 'أحمد محمد',
            grade: 'الصف السادس',
            totalAverage: 88,
            attendance: '95%',
            subjects: [
                { name: 'الرياضيات', score: 90, grade: 'A' },
                { name: 'العلوم', score: 85, grade: 'B+' },
                { name: 'اللغة العربية', score: 92, grade: 'A' },
                { name: 'اللغة الإنجليزية', score: 88, grade: 'B+' }
            ],
            recentAbsence: ['2023-11-15'],
            notes: 'طالب متميز ولكنه يحتاج لتحسين المشاركة الصفية.'
        });
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">تقرير الطالب الشامل</h2>

            {/* Search Section */}
            <Card>
                <form onSubmit={handleSearch} className="flex gap-4 items-end">
                    <div className="flex-1">
                        <Input
                            label="بحث عن طالب"
                            placeholder="أدخل اسم الطالب أو الرقم التعريفي"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button type="submit" isLoading={loading} className="mb-[2px] h-[42px]">
                        <Search className="w-4 h-4 ml-2" />
                        بحث
                    </Button>
                </form>
            </Card>

            {/* Report Content */}
            {studentData && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="flex justify-end">
                        <Button variant="secondary" onClick={() => window.print()}>
                            <Printer className="w-4 h-4 ml-2" />
                            طباعة التقرير
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Student Profile Card */}
                        <Card className="md:col-span-1 border-t-4 border-indigo-500">
                            <div className="text-center py-6">
                                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-3xl font-bold text-indigo-600 mb-4">
                                    {studentData.name[0]}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{studentData.name}</h3>
                                <p className="text-gray-500">{studentData.grade}</p>
                            </div>
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">معدل الحضور</span>
                                    <span className="font-bold text-green-600">{studentData.attendance}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">المعدل العام</span>
                                    <span className="font-bold text-indigo-600">{studentData.totalAverage}%</span>
                                </div>
                            </div>
                        </Card>

                        {/* Grades Breakown */}
                        <Card className="md:col-span-2">
                            <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">تفاصيل المواد الدراسية</h4>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">المادة</th>
                                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">الدرجة</th>
                                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">التقدير</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {studentData.subjects.map((sub: any, idx: number) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-3 text-sm text-gray-900">{sub.name}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900 font-bold">{sub.score}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${sub.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                        {sub.grade}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
