import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Video, Clock, PlayCircle, Loader2 } from 'lucide-react';
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

    const isLive = (session: StudentScheduleResponse) => {
        return session.status === 'LIVE';
    };

    const isUpcoming = (session: StudentScheduleResponse) => {
        return session.status === 'SCHEDULED' && new Date(session.scheduledTime) > new Date();
    };

    const isCompleted = (session: StudentScheduleResponse) => {
        return session.status === 'COMPLETED';
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

    // Split into today's classes and past recordings
    const liveClasses = classes.filter(c => isLive(c));
    const upcomingClasses = classes.filter(c => isUpcoming(c));
    const pastClasses = classes
        .filter(c => isCompleted(c))
        .sort((a, b) => new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime());

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

            {/* Live & Upcoming Classes */}
            <motion.div variants={itemVariants}>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                    الحصص القادمة
                </h2>

                {liveClasses.length === 0 && upcomingClasses.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">لا توجد حصص مجدولة حالياً</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {/* Live Classes */}
                        {liveClasses.map((session) => (
                            <Card key={session.id} className="border-indigo-100 shadow-md overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-2 h-full bg-indigo-600"></div>
                                <div className="p-1">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
                                                <Video className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-xl font-bold text-gray-900">{session.title}</h3>
                                                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full animate-pulse border border-red-200">مباشر الآن 🔴</span>
                                                </div>
                                                <p className="text-gray-500 flex items-center gap-2 text-sm">
                                                    <span>{session.teacherName}</span>
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                    <span>{session.subjectName}</span>
                                                </p>
                                            </div>
                                        </div>

                                        {session.teamsMeetingUrl && (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleJoinSession(session)}
                                                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-colors"
                                            >
                                                <Video className="w-5 h-5" />
                                                انضم للكلاس
                                            </motion.button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}

                        {/* Upcoming Classes */}
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
                                                <span>{session.teacherName}</span>
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
                )}
            </motion.div>

            {/* Past Recordings */}
            {pastClasses.length > 0 && (
                <motion.div variants={itemVariants} className="pt-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-gray-300 rounded-full"></span>
                        تسجيلات الحصص السابقة
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {pastClasses.map((session) => (
                            <Card
                                key={session.id}
                                className={`group transition-all border-gray-100 ${session.teamsRecordingUrl ? 'cursor-pointer hover:shadow-md' : 'opacity-75 bg-gray-50'}`}
                                onClick={() => session.teamsRecordingUrl && window.open(session.teamsRecordingUrl, '_blank')}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-3">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${session.teamsRecordingUrl ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                            {session.teamsRecordingUrl ? <PlayCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold transition-colors ${session.teamsRecordingUrl ? 'text-gray-900 group-hover:text-indigo-600' : 'text-gray-500'}`}>
                                                {session.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(session.scheduledTime).toLocaleDateString('ar-EG')} | {session.teacherName}
                                            </p>
                                            {!session.teamsRecordingUrl && (
                                                <span className="text-xs text-orange-500 font-medium mt-1 block">
                                                    في انتظار رفع التسجيل...
                                                </span>
                                            )}
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
