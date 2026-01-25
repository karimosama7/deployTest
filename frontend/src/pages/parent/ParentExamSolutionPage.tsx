import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parentService } from '../../services/parentService';
import { StudentExamSolutionResponse } from '../../types/api';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { CheckCircle, XCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ParentExamSolutionPage: React.FC = () => {
    const { executionId } = useParams<{ executionId: string }>();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [solution, setSolution] = useState<StudentExamSolutionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSolution = async () => {
            if (!executionId) return;
            try {
                const data = await parentService.getExamSolution(Number(executionId));
                setSolution(data);
            } catch (err) {
                console.error('Failed to load solution', err);
                addToast('فشل تحميل الحل', 'error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSolution();
    }, [executionId]);

    if (isLoading) return <div className="p-8 text-center">جاري التحميل...</div>;
    if (!solution) return <div className="p-8 text-center text-red-600">الحل غير موجود</div>;

    const percentage = solution.score && solution.totalMarks 
        ? (Number(solution.score) / solution.totalMarks) * 100 
        : 0;
    const passed = percentage >= 50;

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span onClick={() => navigate('/parent')} className="cursor-pointer hover:text-indigo-600">الرئيسية</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">حل الاختبار</span>
            </div>

            {/* Header Card */}
            <Card className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900">{solution.examTitle}</h1>
                        {solution.studentName && (
                            <p className="text-gray-600">الطالب: <span className="font-medium text-gray-900">{solution.studentName}</span></p>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`px-4 py-2 rounded-lg ${passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            <span className="text-2xl font-bold">{solution.score}</span>
                            <span className="text-sm">/{solution.totalMarks}</span>
                        </div>
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            <ArrowLeft className="w-4 h-4 ml-2" />
                            رجوع
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Questions */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900">الإجابات التفصيلية</h2>
                
                {solution.questions.map((q, idx) => {
                    const selectedOption = q.options.find(o => o.id === q.selectedOptionId);
                    const isCorrect = selectedOption?.isCorrect ?? false;

                    return (
                        <Card key={q.id} className={`p-6 border-r-4 ${isCorrect ? 'border-r-green-500' : 'border-r-red-500'}`}>
                            <div className="space-y-4">
                                {/* Question Header */}
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-3">
                                        <span className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 text-gray-600 font-bold text-sm">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-gray-900 font-medium">{q.text}</h3>
                                            {q.imageUrl && (
                                                <img src={q.imageUrl} alt="Question" className="mt-2 max-h-60 rounded border" />
                                            )}
                                        </div>
                                    </div>
                                    <span className={`text-sm font-bold px-2 py-1 rounded ${isCorrect ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                        {isCorrect ? `+${q.marks}` : '0'}/{q.marks}
                                    </span>
                                </div>

                                {/* Options */}
                                <div className="space-y-2 pr-10">
                                    {q.options.map(opt => {
                                        const isSelected = opt.id === q.selectedOptionId;
                                        const isAnswer = opt.isCorrect;

                                        let style = "border-gray-200 bg-white";
                                        if (isAnswer) style = "border-green-500 bg-green-50 ring-1 ring-green-500";
                                        else if (isSelected && !isAnswer) style = "border-red-500 bg-red-50 ring-1 ring-red-500";

                                        return (
                                            <div key={opt.id} className={`flex items-center justify-between p-3 rounded-lg border ${style}`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                                        isSelected || isAnswer 
                                                            ? (isAnswer ? 'border-green-600 bg-green-600' : 'border-red-600 bg-red-600') 
                                                            : 'border-gray-300'
                                                    }`}>
                                                        {(isSelected || isAnswer) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                                    </div>
                                                    <span className={isAnswer ? 'font-medium text-green-900' : 'text-gray-700'}>
                                                        {opt.text}
                                                    </span>
                                                    {opt.imageUrl && (
                                                        <img
                                                            src={opt.imageUrl}
                                                            alt="Option"
                                                            className="h-20 w-20 object-contain rounded border cursor-pointer bg-white"
                                                            onClick={() => window.open(opt.imageUrl, '_blank')}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {isSelected && <span className="text-xs text-gray-500">اختيار الطالب</span>}
                                                    {isAnswer && <CheckCircle className="w-5 h-5 text-green-600" />}
                                                    {isSelected && !isAnswer && <XCircle className="w-5 h-5 text-red-600" />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
