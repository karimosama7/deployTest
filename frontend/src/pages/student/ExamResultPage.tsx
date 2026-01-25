import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { ExamResultResponse, StudentExamSolutionResponse } from '../../types/api';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

export const ExamResultPage: React.FC = () => {
    const { examId } = useParams<{ examId: string }>();
    const navigate = useNavigate();
    const [result, setResult] = useState<ExamResultResponse | null>(null);
    const [solution, setSolution] = useState<StudentExamSolutionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResult = async () => {
            if (!examId) return;
            try {
                // 1. Get List of Exams to find executionId
                const exams = await studentService.getExams();
                const exam = exams.find(e => e.id === Number(examId));

                if (exam) {
                    setResult({
                        id: 0,
                        examId: exam.id,
                        examTitle: exam.title,
                        studentId: 0,
                        studentName: '',
                        grade: exam.grade,
                        status: exam.grade !== undefined ? 'COMPLETED' : 'PENDING',
                        submittedAt: '',
                        gradedAt: ''
                    });

                    // 2. If Completed/Graded, fetch solution details
                    if (exam.executionId && exam.grade !== undefined) {
                        try {
                            const soln = await studentService.getExamSolution(exam.executionId);
                            setSolution(soln);
                        } catch (solErr) {
                            console.warn("Could not fetch detailed solution", solErr);
                        }
                    }
                } else {
                    setError('Exam not found');
                }

            } catch (err) {
                console.error(err);
                setError('Failed to load result');
            } finally {
                setIsLoading(false);
            }
        };
        fetchResult();
    }, [examId]);

    // Helper to get status color/icon
    const getStatusInfo = (grade?: number, total?: number) => {
        if (grade === undefined || total === undefined) return { color: 'text-gray-500', icon: Clock, text: 'Pending Grading' };
        // Calculate percentage
        const percentage = (grade / total) * 100;
        if (percentage >= 50) return { color: 'text-green-600', icon: CheckCircle, text: 'Passed' };
        return { color: 'text-red-600', icon: XCircle, text: 'Failed' };
    };

    if (isLoading) return <div className="p-8 text-center">Loading result...</div>;
    if (error || !result) return <div className="p-8 text-center text-red-600">{error || 'Result not found'}</div>;

    const { color, icon: Icon, text } = getStatusInfo(result.grade, solution?.totalMarks || result.totalMarks);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
            <Card className="w-full max-w-3xl p-8 space-y-6 mb-8">
                <div className="text-center space-y-4">
                    <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${result.grade !== undefined && result.grade >= 50 ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                        <Icon className={`w-10 h-10 ${color}`} />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">{result.examTitle}</h1>
                        <div className="flex justify-center items-center gap-4 text-sm">
                            <span className="text-gray-500">Status: <span className={`font-bold ${color}`}>{text}</span></span>
                            {result.grade !== undefined && (
                                <span className="text-gray-500">Score: <span className="font-bold text-gray-900">{result.grade}/{solution?.totalMarks || 100}</span></span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button onClick={() => navigate('/student/exams')}>
                        Return to Exams
                    </Button>
                </div>
            </Card>

            {/* Solution Details */}
            {solution && (
                <div className="w-full max-w-3xl space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 px-2">Model Answer & Corrections</h2>
                    {solution.questions.map((q, idx) => {
                        const isCorrect = q.options.find(o => o.id === q.selectedOptionId)?.isCorrect;

                        return (
                            <Card key={q.id} className={`p-6 border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-3">
                                            <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-600 font-bold text-xs mt-1">
                                                {idx + 1}
                                            </span>
                                            <div>
                                                <h3 className="text-gray-900 font-medium">{q.text}</h3>
                                                {q.imageUrl && (
                                                    <img src={q.imageUrl} alt="Question" className="mt-2 max-h-60 rounded border" />
                                                )}
                                            </div>
                                        </div>
                                        <span className={`text-sm font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                            {isCorrect ? `+${q.marks}` : '0'}/{q.marks}
                                        </span>
                                    </div>

                                    <div className="space-y-2 pl-9">
                                        {q.options.map(opt => {
                                            const isSelected = opt.id === q.selectedOptionId;
                                            const isAnswer = opt.isCorrect;

                                            let style = "border-gray-200 bg-white";
                                            if (isAnswer) style = "border-green-500 bg-green-50 ring-1 ring-green-500";
                                            else if (isSelected && !isAnswer) style = "border-red-500 bg-red-50 ring-1 ring-red-500";

                                            return (
                                                <div key={opt.id} className={`flex items-center justify-between p-3 rounded-lg border ${style}`}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected || isAnswer ? (isAnswer ? 'border-green-600 bg-green-600' : 'border-red-600 bg-red-600') : 'border-gray-300'
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
                                                                className="h-32 w-32 object-contain rounded border cursor-pointer bg-white"
                                                                onClick={() => window.open(opt.imageUrl, '_blank')}
                                                            />
                                                        )}
                                                    </div>
                                                    {isAnswer && <CheckCircle className="w-5 h-5 text-green-600" />}
                                                    {isSelected && !isAnswer && <XCircle className="w-5 h-5 text-red-600" />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
