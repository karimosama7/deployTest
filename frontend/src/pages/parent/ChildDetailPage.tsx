import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, FileText, BarChart2, CheckCircle, Book, Eye } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { parentService } from '../../services/parentService';
import { 
    ChildResponse, 
    StudentScheduleResponse, 
    StudentHomeworkResponse, 
    StudentExamResponse,
    StudentAttendanceResponse 
} from '../../types/api';

type Tab = 'schedule' | 'homework' | 'exams' | 'attendance';

export const ChildDetailPage = () => {
    const { childId } = useParams<{ childId: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('schedule');
    const [child, setChild] = useState<ChildResponse | null>(null);
    const [schedule, setSchedule] = useState<StudentScheduleResponse[]>([]);
    const [homework, setHomework] = useState<StudentHomeworkResponse[]>([]);
    const [exams, setExams] = useState<StudentExamResponse[]>([]);
    const [attendance, setAttendance] = useState<StudentAttendanceResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!childId) return;
        
        const fetchChildData = async () => {
            try {
                const childData = await parentService.getChild(Number(childId));
                setChild(childData);
            } catch (error) {
                console.error('Failed to fetch child:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchChildData();
    }, [childId]);

    useEffect(() => {
        if (!childId) return;
        
        const fetchTabData = async () => {
            try {
                switch (activeTab) {
                    case 'schedule':
                        const scheduleData = await parentService.getChildSchedule(Number(childId));
                        setSchedule(scheduleData);
                        break;
                    case 'homework':
                        const homeworkData = await parentService.getChildHomework(Number(childId));
                        setHomework(homeworkData);
                        break;
                    case 'exams':
                        const examsData = await parentService.getChildExams(Number(childId));
                        setExams(examsData);
                        break;
                    case 'attendance':
                        const attendanceData = await parentService.getChildAttendance(Number(childId));
                        setAttendance(attendanceData);
                        break;
                }
            } catch (error) {
                console.error(`Failed to fetch ${activeTab}:`, error);
            }
        };
        fetchTabData();
    }, [childId, activeTab]);

    const tabs = [
        { key: 'schedule' as Tab, label: 'الجدول', icon: Calendar },
        { key: 'homework' as Tab, label: 'الواجبات', icon: FileText },
        { key: 'exams' as Tab, label: 'الاختبارات', icon: BarChart2 },
        { key: 'attendance' as Tab, label: 'الحضور', icon: CheckCircle },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate('/parent')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowRight className="w-5 h-5 text-gray-500" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{child?.fullName}</h1>
                    <p className="text-gray-500">{child?.gradeName}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                            activeTab === tab.key
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {activeTab === 'schedule' && (
                    <div className="space-y-4">
                        {schedule.length === 0 ? (
                            <Card className="text-center py-8 text-gray-500">لا توجد حصص مجدولة</Card>
                        ) : (
                            schedule.map((cls) => (
                                <Card key={cls.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
                                            <Book className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{cls.subjectName || cls.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {cls.teacherName} • {new Date(cls.scheduledTime).toLocaleDateString('ar-EG')}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        cls.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                        cls.status === 'LIVE' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {cls.status === 'COMPLETED' ? 'انتهت' : cls.status === 'LIVE' ? 'مباشر' : 'مجدولة'}
                                    </span>
                                </Card>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'homework' && (
                    <div className="space-y-4">
                        {homework.length === 0 ? (
                            <Card className="text-center py-8 text-gray-500">لا توجد واجبات</Card>
                        ) : (
                            homework.map((hw) => (
                                <Card key={hw.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${hw.isSubmitted ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{hw.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {hw.subjectName} • موعد التسليم: {new Date(hw.dueDate).toLocaleDateString('ar-EG')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            hw.isSubmitted ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {hw.isSubmitted ? 'تم التسليم' : 'لم يسلم'}
                                        </span>
                                        {hw.grade && (
                                            <p className="text-sm font-bold text-indigo-600 mt-1">{hw.grade}/100</p>
                                        )}
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'exams' && (
                    <div className="space-y-4">
                        {exams.length === 0 ? (
                            <Card className="text-center py-8 text-gray-500">لا توجد اختبارات</Card>
                        ) : (
                            exams.map((exam) => (
                                <Card key={exam.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                                            <BarChart2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{exam.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {exam.subjectName} • {new Date(exam.examDate).toLocaleDateString('ar-EG')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-left flex flex-col items-end gap-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            exam.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                            exam.status === 'UPCOMING' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {exam.status === 'COMPLETED' ? 'اكتمل' : exam.status === 'UPCOMING' ? 'قادم' : exam.status}
                                        </span>
                                        {exam.grade !== undefined && exam.grade !== null && (
                                            <p className="text-sm font-bold text-indigo-600">{exam.grade}/100</p>
                                        )}
                                        {exam.executionId && exam.status === 'COMPLETED' && (
                                            <button
                                                onClick={() => navigate(`/parent/exams/solution/${exam.executionId}`)}
                                                className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 text-sm"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>عرض الحل</span>
                                            </button>
                                        )}
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'attendance' && (
                    <div className="space-y-4">
                        {attendance.length === 0 ? (
                            <Card className="text-center py-8 text-gray-500">لا توجد سجلات حضور</Card>
                        ) : (
                            attendance.map((att, index) => (
                                <Card key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${att.attended ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{att.classTitle}</h3>
                                            <p className="text-sm text-gray-500">
                                                {att.subjectName} • {new Date(att.scheduledTime).toLocaleDateString('ar-EG')}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        att.attended ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {att.attended ? 'حاضر' : 'غائب'}
                                    </span>
                                </Card>
                            ))
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
};
