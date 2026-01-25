import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Video, Clock, PlayCircle, Loader2, CheckCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { studentService } from '../../services/studentService';
import { StudentScheduleResponse } from '../../types/api';
import { useToast } from '../../context/ToastContext';

export const ClassesPage = () => {
    const [classes, setClasses] = useState<StudentScheduleResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await studentService.getSchedule();
                // Sort by scheduled time (upcoming first)
                data.sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());
                setClasses(data);
            } catch (error) {
                console.error('Failed to fetch classes', error);
                addToast('فشل تحميل جدول الحصص', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

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

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    };



    const handleJoinSession = async (session: StudentScheduleResponse) => {
        if (!session.teamsMeetingUrl) return;

        try {
            // Attempt to record attendance
            await studentService.joinSession(session.id);
            console.log('Attendance recorded for session:', session.id);
        } catch (error) {
            console.error('Failed to record attendance', error);
            // We still proceed to open the link even if attendance fails
        }

        window.open(session.teamsMeetingUrl, '_blank');
    };

    // Sort all classes Descending (Newest First) as requested
    const sortedClasses = [...classes].sort((a, b) => new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime());

    const todayDateString = new Date().toDateString();

    // Today's Classes (Active or Finished today)
    const todayClasses = sortedClasses.filter(c => new Date(c.scheduledTime).toDateString() === todayDateString);

    // Upcoming Classes (Future)
    const upcomingClasses = sortedClasses.filter(c =>
        new Date(c.scheduledTime) > new Date() &&
        new Date(c.scheduledTime).toDateString() !== todayDateString
    );

    // Recorded Classes (Persistent Archive - strictly has recording URL)
    // User wants this separate and sticking around forever.
    const recordedClasses = sortedClasses.filter(c =>
        c.teamsRecordingUrl
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">فصولي الدراسية</h1>
                    <p className="mt-1 text-gray-500">جدول الحصص اليومية وتسجيلات الدروس السابقة</p>
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg text-indigo-700 font-medium">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                </div>
            </div>

            {/* Today's Classes */}
            <motion.div variants={itemVariants}>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                    حصص اليوم
                </h2>

                {todayClasses.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl mb-8">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">لا توجد حصص مجدولة اليوم</p>
                    </div>
                ) : (
                    <div className="grid gap-4 mb-8">
                        {todayClasses.map((session) => (
                            <Card key={session.id} className="border-indigo-100 shadow-md overflow-hidden relative">
                                <div className={`absolute top-0 right-0 w-2 h-full ${session.status === 'LIVE' ? 'bg-red-600' : 'bg-indigo-600'}`}></div>
                                <div className="p-1">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
                                                <Video className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-xl font-bold text-gray-900">{session.title}</h3>
                                                    {session.status === 'LIVE' && (
                                                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full animate-pulse border border-red-200">مباشر الآن 🔴</span>
                                                    )}
                                                </div>
                                                <p className="text-gray-500 flex items-center gap-2 text-sm">
                                                    <span>{session.teacherName}</span>
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                    <span>{session.subjectName}</span>
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                    <span className="text-indigo-600 font-bold">{formatTime(session.scheduledTime)}</span>
                                                </p>
                                            </div>
                                        </div>

                                        {session.status === 'COMPLETED' ? (
                                            <div className="flex items-center gap-3">
                                                <span className="px-4 py-2 bg-gray-100 text-gray-500 text-sm font-medium rounded-lg flex items-center gap-1 border border-gray-200">
                                                    <CheckCircle className="w-4 h-4" />
                                                    منتهية
                                                </span>
                                                {session.teamsRecordingUrl && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => window.open(session.teamsRecordingUrl, '_blank')}
                                                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-green-700 transition-colors text-sm"
                                                    >
                                                        <PlayCircle className="w-4 h-4" />
                                                        مشاهدة التسجيل
                                                    </motion.button>
                                                )}
                                            </div>
                                        ) : session.teamsMeetingUrl && new Date(session.scheduledTime).toDateString() === todayDateString ? (
                                            // Check if it's actually today to show join button strictly or if status allows
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleJoinSession(session)}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-colors text-white ${session.status === 'LIVE' ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                            >
                                                <Video className="w-5 h-5" />
                                                {session.status === 'LIVE' ? 'انضم الآن' : 'انضمام'}
                                            </motion.button>
                                        ) : (
                                            // Fallback for weird status states
                                            <span className="text-gray-400 text-sm">انتظر الموعد</span>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Upcoming Classes */}
            {upcomingClasses.length > 0 && (
                <motion.div variants={itemVariants}>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                        حصص قادمة
                    </h2>
                    <div className="grid gap-4 mb-8">
                        {upcomingClasses.map((session) => (
                            <Card key={session.id} className="border-gray-100 hover:border-gray-200 transition-colors">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                                            <span className="text-2xl font-bold">{session.subjectName?.charAt(0) || 'C'}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                                            <p className="text-gray-500 flex items-center gap-2 text-sm">
                                                <span>{new Date(session.scheduledTime).toLocaleDateString('ar-EG')}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {formatTime(session.scheduledTime)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium">
                                        {session.subjectName}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Recorded Classes Archive */}
            {recordedClasses.length > 0 && (
                <motion.div variants={itemVariants} className="pt-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                        مكتبة الحصص المسجلة
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {recordedClasses.map((session) => (
                            <Card
                                key={session.id}
                                className="group transition-all border-green-50 hover:shadow-md cursor-pointer bg-white"
                                onClick={() => window.open(session.teamsRecordingUrl, '_blank')}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-3">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-50 text-green-600">
                                            <PlayCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                                                {session.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(session.scheduledTime).toLocaleDateString('ar-EG')} | {session.teacherName}
                                            </p>
                                            <span className="text-xs text-green-600 font-medium mt-1 block">
                                                مشاهدة الآن
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};
