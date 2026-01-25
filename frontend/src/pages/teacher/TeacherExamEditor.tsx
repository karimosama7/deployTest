import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { teacherService } from '../../services/teacherService';
import { ExamRequest, ExamQuestionRequest, ExamOptionRequest, Subject, ClassSessionResponse } from '../../types/api';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { ArrowLeft, Plus, Trash2, Save, XCircle } from 'lucide-react';

export const TeacherExamEditor: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Dropdown data
    const [subjects, setSubjects] = useState<Subject[]>([]);

    // Form State
    // Form State
    const [formData, setFormData] = useState<ExamRequest>({
        title: '',
        subjectId: 0,
        gradeId: 0,
        classSessionIds: [],
        durationMinutes: 60,
        totalMarks: 100,
        passingScore: 50,
        resultConfiguration: 'IMMEDIATE',
        examDate: '',
        published: false,
        questions: []
    });

    const [availableClasses, setAvailableClasses] = useState<ClassSessionResponse[]>([]);
    const [examDatePart, setExamDatePart] = useState('');
    const [examTimePart, setExamTimePart] = useState('');
    // End date/time removed

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const subjs = await teacherService.getMySubjects();
                setSubjects(subjs);

                // Also fetch all classes to filter later or show all
                const classes = await teacherService.getClasses();
                setAvailableClasses(classes);

                if (subjs.length > 0) {
                    setFormData(prev => ({ ...prev, subjectId: subjs[0].id }));
                }
            } catch (err) {
                console.error('Failed to load metadata', err);
            }
        };
        fetchMeta();
    }, []);

    // Effect to combine date and time
    useEffect(() => {
        if (examDatePart && examTimePart) {
            setFormData(prev => ({ ...prev, examDate: `${examDatePart}T${examTimePart}:00` }));
        }
    }, [examDatePart, examTimePart]);

    // End date effect removed

    const handleClassToggle = (classId: number) => {
        setFormData(prev => {
            const current = prev.classSessionIds || [];
            let newClasses;
            if (current.includes(classId)) {
                newClasses = current.filter(id => id !== classId);
            } else {
                newClasses = [...current, classId];
            }

            let inferredGradeId = prev.gradeId || 0;
            if (newClasses.length > 0) {
                const firstClass = availableClasses.find(c => c.id === newClasses[0]);
                if (firstClass && firstClass.gradeId) {
                    inferredGradeId = firstClass.gradeId;
                }
            }

            return { ...prev, classSessionIds: newClasses, gradeId: inferredGradeId };
        });
    };

    const handleQuestionAdd = () => {
        const newQuestion: ExamQuestionRequest = {
            text: '',
            marks: 5,
            questionType: 'MCQ',
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false }
            ]
        };
        setFormData(prev => ({
            ...prev,
            questions: [...(prev.questions || []), newQuestion]
        }));
    };

    const handleQuestionChange = (index: number, field: keyof ExamQuestionRequest, value: any) => {
        const updatedQuestions = [...(formData.questions || [])];
        updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleQuestionRemove = (index: number) => {
        const updatedQuestions = [...(formData.questions || [])];
        updatedQuestions.splice(index, 1);
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleOptionChange = (qIndex: number, oIndex: number, field: keyof ExamOptionRequest, value: any) => {
        const updatedQuestions = [...(formData.questions || [])];
        const updatedOptions = [...updatedQuestions[qIndex].options];
        updatedOptions[oIndex] = { ...updatedOptions[oIndex], [field]: value };

        // If checking 'isCorrect' and only one allowed (MCQ), uncheck others if needed. 
        // For now, let's assume multiple correct could be possible or just handle it simply.
        // Usually MCQ has one correct answer.
        if (field === 'isCorrect' && value === true) {
            updatedOptions.forEach((opt, idx) => {
                if (idx !== oIndex) opt.isCorrect = false;
            });
        }

        updatedQuestions[qIndex].options = updatedOptions;
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleOptionAdd = (qIndex: number) => {
        const updatedQuestions = [...(formData.questions || [])];
        updatedQuestions[qIndex].options.push({ text: '', isCorrect: false });
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleOptionRemove = (qIndex: number, oIndex: number) => {
        const updatedQuestions = [...(formData.questions || [])];
        updatedQuestions[qIndex].options.splice(oIndex, 1);
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleImageUpload = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            // Using a direct fetch or axios call here, but best to put in a service
            // Creating a quick service call pattern here
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/media/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            return `http://localhost:8080${data.url}`;
        } catch (err) {
            console.error("Upload failed", err);
            return '';
        }
    };

    const handleOptionImageChange = async (qIndex: number, oIndex: number, file: File) => {
        const url = await handleImageUpload(file);
        if (url) {
            handleOptionChange(qIndex, oIndex, 'imageUrl', url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prevent double-submit
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        setError(null);
        try {
            await teacherService.createExam(formData);
            navigate('/teacher/exams');
        } catch (err) {
            console.error(err);
            setError('Failed to create exam');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={() => navigate('/teacher/exams')}>
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">Create New Exam</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Exam Details Card */}
                <Card>
                    <div className="p-6 space-y-4">
                        <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Exam Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <Input
                                    label="Exam Title"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border px-3"
                                    value={formData.subjectId}
                                    onChange={e => setFormData({ ...formData, subjectId: Number(e.target.value) })}
                                    required
                                >
                                    <option value={0}>Select Subject</option>
                                    {subjects.map(subject => (
                                        <option key={subject.id} value={subject.id}>{subject.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Classes</label>
                                <div className="border rounded-md p-2 h-32 overflow-y-auto space-y-2">
                                    {availableClasses
                                        // Optional: Filter classes by selected subject if needed, but for now show all or relevant
                                        .filter(c => formData.subjectId === 0 || c.subjectId === formData.subjectId)
                                        .map(cls => (
                                            <div key={cls.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`class-${cls.id}`}
                                                    checked={formData.classSessionIds.includes(cls.id)}
                                                    onChange={() => handleClassToggle(cls.id)}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor={`class-${cls.id}`} className="ml-2 text-sm text-gray-700">
                                                    {cls.title} ({cls.gradeName})
                                                </label>
                                            </div>
                                        ))}
                                    {availableClasses.length === 0 && <p className="text-sm text-gray-400">No classes found</p>}
                                </div>
                                {formData.classSessionIds.length === 0 && <p className="text-xs text-red-500 mt-1">Select at least one class</p>}
                            </div>

                            <div>
                                <Input
                                    type="date"
                                    label="Exam Date"
                                    value={examDatePart}
                                    onChange={e => setExamDatePart(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    type="time"
                                    label="Start Time"
                                    value={examTimePart}
                                    onChange={e => setExamTimePart(e.target.value)}
                                    required
                                />
                            </div>

                            {/* End Date/Time removed - auto calculated */}

                            <div>
                                <Input
                                    type="number"
                                    label="Duration (Minutes)"
                                    value={formData.durationMinutes}
                                    onChange={e => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                                    required
                                />
                            </div>

                            <div>
                                <Input
                                    type="number"
                                    label="Total Marks"
                                    value={formData.totalMarks}
                                    onChange={e => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                                    required
                                />
                            </div>

                            <div>
                                <Input
                                    type="number"
                                    label="Passing Score"
                                    value={formData.passingScore}
                                    onChange={e => setFormData({ ...formData, passingScore: Number(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Questions Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">Questions</h2>
                        <Button type="button" onClick={handleQuestionAdd}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Question
                        </Button>
                    </div>

                    {(formData.questions || []).map((question, qIndex) => (
                        <Card key={qIndex} className="p-6 relative group">
                            <button
                                type="button"
                                onClick={() => handleQuestionRemove(qIndex)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Question {qIndex + 1} Text
                                        </label>
                                        <textarea
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                                            rows={2}
                                            value={question.text}
                                            onChange={e => handleQuestionChange(qIndex, 'text', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="w-24">
                                        <Input
                                            type="number"
                                            label="Marks"
                                            value={question.marks}
                                            onChange={e => handleQuestionChange(qIndex, 'marks', Number(e.target.value))}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">Options</label>
                                    {question.options.map((option, oIndex) => (
                                        <div key={oIndex} className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name={`question-${qIndex}-correct`}
                                                checked={option.isCorrect}
                                                onChange={() => handleOptionChange(qIndex, oIndex, 'isCorrect', true)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                            />
                                            <input
                                                type="text"
                                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                                                value={option.text}
                                                onChange={e => handleOptionChange(qIndex, oIndex, 'text', e.target.value)}
                                                placeholder={`Option ${oIndex + 1}`}
                                                required
                                            />
                                            <div className="flex flex-col gap-1">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={e => {
                                                        if (e.target.files?.[0]) {
                                                            handleOptionImageChange(qIndex, oIndex, e.target.files[0]);
                                                        }
                                                    }}
                                                    className="text-xs w-48"
                                                />
                                                {option.imageUrl && (
                                                    <img src={option.imageUrl} alt="Option" className="h-10 w-10 object-cover rounded border" />
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleOptionRemove(qIndex, oIndex)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleOptionAdd(qIndex)}
                                        className="mt-2"
                                    >
                                        <Plus className="h-3 w-3 mr-1" />
                                        Add Option
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="flex justify-end gap-3 sticky bottom-4">
                    <Button variant="secondary" onClick={() => setIsPreviewOpen(true)}>
                        Preview Exam
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/teacher/exams')}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                        Create Exam
                    </Button>
                </div>

                {/* Preview Modal */}
                {isPreviewOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-y-auto relative">
                            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
                                <h3 className="text-xl font-bold">Preview: {formData.title || 'Untitled Exam'}</h3>
                                <button onClick={() => setIsPreviewOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <XCircle size={24} />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                {formData.questions && formData.questions.map((q, idx) => (
                                    <div key={idx} className="border p-4 rounded-lg">
                                        <div className="flex gap-4">
                                            <span className="h-8 w-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                                {idx + 1}
                                            </span>
                                            <div className="flex-1 space-y-3">
                                                <p className="font-medium text-lg">{q.text}</p>
                                                {q.imageUrl && <img src={q.imageUrl} alt="Q" className="max-h-60 rounded border" />}
                                                <div className="space-y-2">
                                                    {q.options && q.options.map((opt, oIdx) => (
                                                        <div key={oIdx} className="flex items-center gap-3 p-3 border rounded-lg">
                                                            <div className="w-4 h-4 rounded-full border border-gray-300" />
                                                            <span>{opt.text}</span>
                                                            {opt.imageUrl && <img src={opt.imageUrl} alt="Opt" className="h-10 w-10 object-cover border rounded" />}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-gray-500">{q.marks} marks</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};
