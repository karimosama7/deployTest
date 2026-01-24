import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { ExamResultResponse } from '../../types/api';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

export const ExamResultPage: React.FC = () => {
    const { examId } = useParams<{ examId: string }>();
    const navigate = useNavigate();
    const [result, setResult] = useState<ExamResultResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResult = async () => {
            if (!examId) return;
            try {
                // There isn't a direct "get my result for exam X" endpoint in studentService yet,
                // but we can list all exams and find it, or use the response from submitExam if passed in state.
                // Better approach: Add getStudentResults(studentId) or getExamResult(examId) endpoint to backend/service.
                // For now, let's assume we can fetch all exams and find this one's grade/status, 
                // but that doesn't give detailed feedback if we want it.
                // Let's rely on getStudentResults or similar.
                // Wait, ExamService.java has getStudentResults. Do we have it in studentService.ts?
                // studentService.getExams() returns StudentExamResponse which has grade.

                // Let's try to get detailed result if possible.
                // Actually StudentExamResponse has `grade`.
                // Let's use getExams for now and find the exam.
                const exams = await studentService.getExams();
                const exam = exams.find(e => e.id === Number(examId));

                if (exam) {
                    setResult({
                        id: 0, // Mock ID or irrelevant
                        examId: exam.id,
                        examTitle: exam.title,
                        studentId: 0, // Irrelevant
                        studentName: '',
                        grade: exam.grade,
                        status: exam.grade !== undefined ? 'COMPLETED' : 'PENDING',
                        submittedAt: '', // We don't have this in StudentExamResponse yet
                        gradedAt: ''
                    });
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
    const getStatusInfo = (grade?: number) => {
        if (grade === undefined) return { color: 'text-gray-500', icon: Clock, text: 'Pending' };
        if (grade >= 50) return { color: 'text-green-600', icon: CheckCircle, text: 'Passed' };
        return { color: 'text-red-600', icon: XCircle, text: 'Failed' };
    };

    if (isLoading) return <div className="p-8 text-center">Loading result...</div>;
    if (error || !result) return <div className="p-8 text-center text-red-600">{error || 'Result not found'}</div>;

    const { color, icon: Icon, text } = getStatusInfo(result.grade);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md p-8 text-center space-y-6">
                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${result.grade !== undefined && result.grade >= 50 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                    <Icon className={`w-10 h-10 ${color}`} />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">{result.examTitle}</h1>
                    <p className="text-lg font-medium text-gray-500">Exam Result</p>
                </div>

                <div className="py-6 border-t border-b border-gray-100 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Status</span>
                        <span className={`font-bold ${color}`}>{text}</span>
                    </div>
                    {result.grade !== undefined && (
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Score</span>
                            <span className="text-3xl font-bold text-gray-900">{result.grade}%</span>
                        </div>
                    )}
                </div>

                <Button onClick={() => navigate('/student/exams')} className="w-full">
                    Return to Exams
                </Button>
            </Card>
        </div>
    );
};
