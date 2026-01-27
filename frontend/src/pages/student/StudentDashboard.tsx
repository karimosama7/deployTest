import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Video, FileText, BarChart2, Calendar, Book, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { studentService } from '../../services/studentService';
import { StudentScheduleResponse, AttendanceSummary } from '../../types/api';

export const StudentDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState<StudentScheduleResponse[]>([]);
    const [attendanceSummary, setAttendanceSummary] = useState<AttendanceSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [scheduleData, summaryData] = await Promise.all([
                    studentService.getSchedule(),
                    studentService.getAttendanceSummary()
                ]);
                setSchedule(scheduleData);
                setAttendanceSummary(summaryData);
            } catch (error) {
                console.error('Failed to fetch student data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Get today's classes
    const todayClasses = schedule.filter(cls => {
        const classDate = new Date(cls.scheduledTime).toDateString();
        return classDate === new Date().toDateString();
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        مرحباً، <span className="text-indigo-600">{user?.fullName}</span> 👋
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                        نسبة الحضور: {attendanceSummary ? `${attendanceSummary.attendanceRate.toFixed(2)}%` : '--'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-sm border border-green-100">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>{attendanceSummary ? `${attendanceSummary.attendedClasses}/${attendanceSummary.totalClasses} حضور` : '--'}</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats / Tabs Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <motion.div variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    <Card
                        className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                        onClick={() => navigate('/student/classes')}
                    >
                        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity"></div>
                        <div className="flex items-center p-4 relative z-10">
                            <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-md text-white">
                                <Video className="h-8 w-8" />
                            </div>
                            <div className="mr-5">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">حصصي</h3>
                                <p className="text-sm text-gray-500 mt-1">{todayClasses.length} حصص اليوم</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    <Card
                        className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                        onClick={() => navigate('/student/homework')}
                    >
                        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-500 opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity"></div>
                        <div className="flex items-center p-4 relative z-10">
                            <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-4 shadow-md text-white">
                                <FileText className="h-8 w-8" />
                            </div>
                            <div className="mr-5">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">واجباتي</h3>
                                <p className="text-sm text-gray-500 mt-1">عرض جميع الواجبات</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    <Card
                        className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                        onClick={() => navigate('/student/exams')}
                    >
                        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity"></div>
                        <div className="flex items-center p-4 relative z-10">
                            <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 shadow-md text-white">
                                <BarChart2 className="h-8 w-8" />
                            </div>
                            <div className="mr-5">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">اختباراتي</h3>
                                <p className="text-sm text-gray-500 mt-1">عرض الاختبارات والدرجات</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Upcoming Classes Section */}
            <motion.div variants={itemVariants}>
                <Card className="border border-gray-100 shadow-md">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">الحصص القادمة (اليوم)</h3>
                        </div>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium border border-gray-200">
                            {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-8 text-gray-500">جاري التحميل...</div>
                        ) : todayClasses.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">لا توجد حصص اليوم</div>
                        ) : (
                            todayClasses.map((cls) => (
                                <motion.div
                                    key={cls.id}
                                    whileHover={{ scale: 1.01 }}
                                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group gap-4"
                                >
                                    <div className="flex items-center w-full sm:w-auto">
                                        <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center border-2 border-white shadow-sm">
                                            <Book className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div className="mr-4 flex-1 sm:flex-none">
                                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                {cls.subjectName || cls.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                                <span>{cls.teacherName || 'معلم'}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                <span className="text-indigo-500 font-medium">
                                                    {new Date(cls.scheduledTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    {cls.status === 'COMPLETED' ? (
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="px-4 py-2 bg-gray-100 text-gray-500 text-sm font-medium rounded-lg flex items-center gap-1">
                                                <CheckCircle className="w-4 h-4" />
                                                منتهية
                                            </span>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={async () => {
                                                if (cls.status !== 'LIVE') return;

                                                try {
                                                    // 1. Record Attendance
                                                    await studentService.joinSession(cls.id);
                                                    // 2. Open Meeting
                                                    if (cls.teamsMeetingUrl) {
                                                        window.open(cls.teamsMeetingUrl, '_blank');
                                                    }
                                                    // 3. Refresh data to update attendance stats
                                                    const [newSchedule, newSummary] = await Promise.all([
                                                        studentService.getSchedule(),
                                                        studentService.getAttendanceSummary()
                                                    ]);
                                                    setSchedule(newSchedule);
                                                    setAttendanceSummary(newSummary);
                                                } catch (err) {
                                                    console.error("Failed to join session", err);
                                                }
                                            }}
                                            disabled={cls.status !== 'LIVE'}
                                            className={`px-6 py-2.5 text-white text-sm font-bold rounded-lg shadow-md transition-all transform active:scale-95 flex items-center gap-2 ${cls.status === 'LIVE'
                                                ? 'bg-red-600 hover:bg-red-700 hover:shadow-lg animate-pulse cursor-pointer'
                                                : 'bg-gray-400 cursor-not-allowed opacity-70'
                                                }`}
                                        >
                                            <span>{cls.status === 'LIVE' ? 'انضم الآن' : 'قريباً'}</span>
                                            {cls.status === 'LIVE' && (
                                                <span className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                                </span>
                                            )}
                                        </button>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
};
