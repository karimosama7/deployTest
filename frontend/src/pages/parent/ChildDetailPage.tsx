import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Calendar, FileText, BarChart2, CheckCircle,
    Eye, Clock, Award, Loader2
} from 'lucide-react';
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
    const [tabLoading, setTabLoading] = useState(false);

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
            setTabLoading(true);
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
            } finally {
                setTabLoading(false);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Premium Header */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate('/parent')}
                            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 group"
                        >
                            <ArrowRight className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
                        </button>

                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                            <span className="text-3xl font-bold text-white uppercase">
                                {child?.fullName.charAt(0)}
                            </span>
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{child?.fullName}</h1>
                            <div className="flex items-center gap-3 text-indigo-100">
                                <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-white/10">
                                    {child?.gradeName}
                                </span>
                                <span className="text-sm opacity-80">
                                    نسبة الحضور: {child?.attendanceRate ? child?.attendanceRate.toFixed(2) : 0}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Pill Tabs */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 min-w-[140px] justify-center ${activeTab === tab.key
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                            : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-indigo-600 shadow-sm'
                            }`}
                    >
                        <tab.icon className={`w-5 h-5 ${activeTab === tab.key ? 'animate-pulse' : ''}`} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {tabLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center items-center py-20"
                    >
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                    </motion.div>
                ) : (
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'schedule' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {schedule.length === 0 ? (
                                    <Card className="col-span-full py-12 text-center text-gray-400 bg-gray-50 border-dashed border-2">
                                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p className="text-base">لا توجد حصص مجدولة حالياً</p>
                                    </Card>
                                ) : (
                                    schedule.map((cls) => (
                                        <Card key={cls.id} className="group hover:shadow-lg transition-all duration-300 border-none shadow-sm overflow-hidden bg-white">
                                            <div className="flex items-stretch">
                                                <div className={`w-1.5 ${cls.status === 'LIVE' ? 'bg-red-500' :
                                                    cls.status === 'COMPLETED' ? 'bg-green-500' : 'bg-indigo-500'
                                                    }`}></div>
                                                <div className="p-3 flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="min-w-0">
                                                            <h3 className="text-base font-bold text-gray-900 mb-0.5 truncate group-hover:text-indigo-600 transition-colors">
                                                                {cls.subjectName || cls.title}
                                                            </h3>
                                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {new Date(cls.scheduledTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                                            </p>
                                                        </div>
                                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${cls.status === 'LIVE' ? 'bg-red-100 text-red-600 animate-pulse' :
                                                            cls.status === 'COMPLETED' ? 'bg-green-100 text-green-600' :
                                                                'bg-indigo-50 text-indigo-600'
                                                            }`}>
                                                            {cls.status === 'LIVE' ? 'مباشر' : cls.status === 'COMPLETED' ? 'منتهية' : 'مجدولة'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 pt-2 border-t border-gray-50 mt-1">
                                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-[10px]">
                                                            {cls.teacherName?.charAt(0)}
                                                        </div>
                                                        <span className="text-xs font-medium text-gray-700 truncate max-w-[100px]">{cls.teacherName}</span>
                                                        <span className="mr-auto text-[10px] text-gray-400">
                                                            {new Date(cls.scheduledTime).toLocaleDateString('ar-EG')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'homework' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {homework.length === 0 ? (
                                    <Card className="col-span-full py-12 text-center text-gray-400 bg-gray-50 border-dashed border-2">
                                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p className="text-base">لا توجد واجبات</p>
                                    </Card>
                                ) : (
                                    homework.map((hw) => (
                                        <Card key={hw.id} className="p-3 hover:shadow-md transition-shadow border-none shadow-sm">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-start gap-3">
                                                    <div className={`p-2.5 rounded-xl shrink-0 ${hw.isSubmitted ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                                                        }`}>
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="text-sm font-bold text-gray-900 mb-1 truncate">{hw.title}</h3>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <span className="bg-gray-50 px-1.5 py-0.5 rounded text-[10px]">{hw.subjectName}</span>
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="w-2.5 h-2.5" />
                                                                {new Date(hw.dueDate).toLocaleDateString('ar-EG')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                                    {hw.grade !== null && hw.grade !== undefined ? (
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-[10px] text-gray-400">الدرجة:</span>
                                                            <span className="text-sm font-bold text-indigo-600">{hw.grade}</span>
                                                            <span className="text-[10px] text-gray-400">/100</span>
                                                        </div>
                                                    ) : (
                                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${hw.isSubmitted
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-amber-100 text-amber-700'
                                                            }`}>
                                                            {hw.isSubmitted ? 'تم التسليم' : 'بانتظار التسليم'}
                                                        </span>
                                                    )}
                                                    {hw.solutionUrl && (
                                                        <a
                                                            href={hw.solutionUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                                                        >
                                                            <Eye className="w-2.5 h-2.5" />
                                                            عرض الحل
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'exams' && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {exams.length === 0 ? (
                                    <Card className="col-span-full py-12 text-center text-gray-400 bg-gray-50 border-dashed border-2">
                                        <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p className="text-base">لا توجد اختبارات</p>
                                    </Card>
                                ) : (
                                    exams.map((exam) => (
                                        <Card key={exam.id} className="relative p-3 hover:shadow-lg transition-all duration-300 border-none shadow-sm hover:-translate-y-1">
                                            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-br-full opacity-5"></div>

                                            <div className="relative">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                                        <Award className="w-5 h-5" />
                                                    </div>
                                                    {exam.grade !== undefined && exam.grade !== null && (
                                                        <div className="text-center bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                                                            <span className="block text-sm font-black text-green-600">{exam.grade}</span>
                                                            <span className="text-[8px] text-green-400 font-bold uppercase">Score</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <h3 className="text-sm font-bold text-gray-900 mb-1 truncate" title={exam.title}>
                                                    {exam.title}
                                                </h3>

                                                <div className="space-y-1.5 mb-3">
                                                    <div className="flex items-center justify-between text-[10px] text-gray-500 bg-gray-50 p-1.5 rounded-md">
                                                        <span>المادة</span>
                                                        <span className="font-semibold text-gray-900 truncate max-w-[60px]">{exam.subjectName}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-[10px] text-gray-500 bg-gray-50 p-1.5 rounded-md">
                                                        <span>التاريخ</span>
                                                        <span className="font-semibold text-gray-900">{new Date(exam.examDate).toLocaleDateString('ar-EG')}</span>
                                                    </div>
                                                </div>

                                                {exam.executionId && exam.status === 'COMPLETED' ? (
                                                    <button
                                                        onClick={() => navigate(`/parent/exams/solution/${exam.executionId}`)}
                                                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-indigo-200"
                                                    >
                                                        <Eye className="w-3 h-3" />
                                                        عرض النموذج
                                                    </button>
                                                ) : (
                                                    <button disabled className="w-full py-2 bg-gray-100 text-gray-400 rounded-lg text-xs font-medium cursor-not-allowed">
                                                        {exam.status === 'UPCOMING' ? 'قادم' : 'غير متاح'}
                                                    </button>
                                                )}
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'attendance' && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {attendance.length === 0 ? (
                                    <Card className="col-span-full py-12 text-center text-gray-400 bg-gray-50 border-dashed border-2">
                                        <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p className="text-base">لا توجد سجلات حضور</p>
                                    </Card>
                                ) : (
                                    attendance.map((att, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Card className={`p-3 hover:shadow-sm transition-shadow cursor-default border-t-2 ${att.attended ? 'border-t-green-500' : 'border-t-red-500'
                                                }`}>
                                                <div className="flex justify-between items-start mb-1.5">
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${att.attended ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {att.attended ? 'حاضر' : 'غائب'}
                                                    </span>
                                                    <Calendar className="w-3 h-3 text-gray-400" />
                                                </div>
                                                <h3 className="font-bold text-gray-900 text-xs mb-0.5 truncate" title={att.classTitle}>
                                                    {att.classTitle}
                                                </h3>
                                                <p className="text-[10px] text-gray-500 mb-1 truncate">
                                                    {att.subjectName}
                                                </p>
                                                <p className="text-[10px] text-gray-400 text-left" dir="ltr">
                                                    {new Date(att.scheduledTime).toLocaleDateString('ar-EG')}
                                                </p>
                                            </Card>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
