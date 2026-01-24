import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { StudentExamExecutionResponse } from '../../types/api';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Clock, AlertTriangle } from 'lucide-react';

export const ExamTakerPage: React.FC = () => {
    const { examId } = useParams<{ examId: string }>();
    const navigate = useNavigate();
    const [execution, setExecution] = useState<StudentExamExecutionResponse | null>(null);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initial Load
    useEffect(() => {
        const loadExam = async () => {
            if (!examId) return;
            try {
                const data = await studentService.startExam(Number(examId));
                setExecution(data);

                // Calculate initial time left
                if (data.endDate) {
                    const now = new Date().getTime();
                    const started = new Date(data.startedAt).getTime();
                    const durationMs = data.durationMinutes * 60 * 1000;
                    const expectedEnd = started + durationMs;

                    // Take the sooner of expectedEnd vs hard endDate
                    let finalEnd = expectedEnd;
                    if (data.endDate) {
                        const hardEnd = new Date(data.endDate).getTime();
                        finalEnd = Math.min(expectedEnd, hardEnd);
                    }

                    setTimeLeft(Math.max(0, Math.floor((finalEnd - now) / 1000)));
                } else {
                    // Fallback if no endDate provided (should vary rarely happen now)
                    const started = new Date(data.startedAt).getTime();
                    const durationMs = data.durationMinutes * 60 * 1000;
                    const expectedEnd = started + durationMs;
                    setTimeLeft(Math.max(0, Math.floor((expectedEnd - new Date().getTime()) / 1000)));
                }
            } catch (err: any) {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to start exam');
            } finally {
                setIsLoading(false);
            }
        };
        loadExam();
    }, [examId]);

    // Timer
    useEffect(() => {
        if (!execution || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(true); // Auto submit
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [execution, timeLeft]);

    // Prevent navigation (Basic warning)
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (execution && !isSubmitting) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [execution, isSubmitting]);

    const handleAnswerSelect = (questionId: number, optionId: number) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleSubmit = async (auto = false) => {
        if (!execution) return;
        setIsSubmitting(true);
        try {
            const result = await studentService.submitExam(execution.executionId, answers);
            navigate('/student/exams', { state: { result } }); // Or navigate to a result page
        } catch (err) {
            console.error('Submission failed', err);
            // Retry logic? or show error
            alert('Failed to submit exam. Please try again.');
            setIsSubmitting(false);
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    if (isLoading) return <div className="flex h-screen items-center justify-center">Loading Exam...</div>;

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4">
                <div className="text-red-600 font-bold text-xl">{error}</div>
                <Button onClick={() => navigate('/student/exams')}>Back to Exams</Button>
            </div>
        );
    }

    if (!execution) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10 p-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{execution.title}</h1>
                        <p className="text-sm text-gray-500">Total Marks: {execution.totalMarks}</p>
                    </div>

                    <div className={`text-2xl font-mono font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-indigo-600'} flex items-center gap-2`}>
                        <Clock className="h-6 w-6" />
                        {formatTime(timeLeft)}
                    </div>

                    <Button
                        onClick={() => handleSubmit(false)}
                        isLoading={isSubmitting}
                        variant={timeLeft < 60 ? 'danger' : 'primary'}
                    >
                        Submit Exam
                    </Button>
                </div>
            </header>

            {/* Questions Body */}
            <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-6">
                {/* Warning Banner */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                    <p className="text-sm text-yellow-700">
                        Do not refresh the page or click 'Back'. Your exam will be auto-submitted if the timer runs out.
                    </p>
                </div>

                {execution.questions.map((question, index) => (
                    <Card key={question.id} className="p-6">
                        <div className="flex gap-4">
                            <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                                {index + 1}
                            </span>
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-medium text-gray-900 leading-relaxed">
                                        {question.text}
                                    </h3>
                                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {question.marks} marks
                                    </span>
                                </div>

                                {question.imageUrl && (
                                    <img src={question.imageUrl} alt="Question" className="max-h-64 rounded-lg border" />
                                )}

                                <div className="space-y-3 pt-2">
                                    {question.options.map(option => (
                                        <label
                                            key={option.id}
                                            className={`
                                                flex items-center p-4 border rounded-lg cursor-pointer transition-all
                                                ${answers[question.id] === option.id
                                                    ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                                                    : 'border-gray-200 hover:bg-gray-50'}
                                            `}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value={option.id}
                                                checked={answers[question.id] === option.id}
                                                onChange={() => handleAnswerSelect(question.id, option.id)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                            />
                                            <span className="ml-3 text-gray-900">{option.text}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}

                <div className="flex justify-center pt-6 pb-12">
                    <Button
                        size="lg"
                        onClick={() => handleSubmit(false)}
                        isLoading={isSubmitting}
                        className="w-full max-w-sm"
                    >
                        Finish & Submit
                    </Button>
                </div>
            </main>
        </div>
    );
};
