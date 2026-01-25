import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Search, Eye } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { teacherService } from '../../services/teacherService';
import { ExamResultResponse } from '../../types/api';
import { useToast } from '../../context/ToastContext';

export const TeacherExamResultsPage = () => {
    const { examId } = useParams<{ examId: string }>();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [results, setResults] = useState<ExamResultResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (examId) {
            loadResults();
        }
    }, [examId]);

    const loadResults = async () => {
        try {
            const data = await teacherService.getExamResults(Number(examId));
            setResults(data);
        } catch (error) {
            console.error('Failed to load results', error);
            addToast('فشل تحميل النتائج', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredResults = results.filter(r =>
        r.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span onClick={() => navigate('/teacher/exams')} className="cursor-pointer hover:text-indigo-600">الاختبارات</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">النتائج</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">نتائج الطلاب</h1>

                <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="بحث عن طالب..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
                    />
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطالب</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدرجة</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وقت التسليم</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">جاري التحميل...</td>
                                </tr>
                            ) : filteredResults.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">لا توجد نتائج حتى الآن</td>
                                </tr>
                            ) : (
                                filteredResults.map((result) => (
                                    <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                                    {result.studentName.charAt(0)}
                                                </div>
                                                <div className="mr-4">
                                                    <div className="text-sm font-medium text-gray-900">{result.studentName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${result.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                result.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {result.status === 'COMPLETED' ? 'مكتمل' : 'قيد الانتظار'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {result.grade !== undefined ? (
                                                <span className="font-bold text-gray-900">{result.grade} <span className="text-gray-400 font-normal">/ {result.totalMarks}</span></span>
                                            ) : (
                                                <span className="text-gray-400">--</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {result.submittedAt ? new Date(result.submittedAt).toLocaleString('ar-EG') : '--'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {result.executionId && result.status === 'COMPLETED' ? (
                                                <button
                                                    onClick={() => navigate(`/teacher/exams/solution/${result.executionId}`)}
                                                    className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                                                    title="عرض الحل"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>عرض الحل</span>
                                                </button>
                                            ) : (
                                                <span className="text-gray-400">--</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
