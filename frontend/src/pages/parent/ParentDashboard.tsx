import { motion } from 'framer-motion';
import { Users, CheckCircle, AlertTriangle, ChevronLeft, Bell, Calendar, Video, Clock } from 'lucide-react';
import { Card } from '../../components/common/Card';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parentService } from '../../services/parentService';
import { ChildResponse, NotificationResponse, StudentScheduleResponse } from '../../types/api';

export const ParentDashboard = () => {
    const navigate = useNavigate();
    const [children, setChildren] = useState<ChildResponse[]>([]);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [upcomingClasses, setUpcomingClasses] = useState<StudentScheduleResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Fetch children first as it's critical
                try {
                    const childrenData = await parentService.getChildren();
                    setChildren(childrenData);
                } catch (e) {
                    console.error('Failed to fetch children', e);
                }

                // Fetch notifications
                try {
                    const [notificationsData, count] = await Promise.all([
                        parentService.getNotifications(),
                        parentService.getUnreadCount()
                    ]);
                    setNotifications(notificationsData.slice(0, 5));
                    setUnreadCount(count);
                } catch (e) {
                    console.error('Failed to fetch notifications', e);
                }

                // Fetch schedule
                try {
                    const scheduleData = await parentService.getAllChildrenSchedule();
                    setUpcomingClasses(scheduleData.slice(0, 5));
                } catch (e) {
                    console.error('Failed to fetch schedule', e);
                }

            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
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

    const formatTime = (dateString: string) => {
        return new Intl.DateTimeFormat('ar-EG', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(new Date(dateString));
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('ar-EG', {
            month: 'long',
            day: 'numeric'
        }).format(new Date(dateString));
    };

    // Calculate stats from children data
    const totalChildren = children.length;
    const avgAttendance = children.length > 0
        ? (children.reduce((sum, c) => sum + c.attendanceRate, 0) / children.length).toFixed(0)
        : 0;

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم ولي الأمر</h1>
                    <p className="mt-1 text-gray-500">متابعة أداء الأبناء والتحصيل الدراسي</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants}>
                    <Card className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white border-none">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-indigo-100 font-medium">عدد الأبناء</p>
                                <h3 className="text-3xl font-bold">{loading ? '--' : totalChildren}</h3>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="border-l-4 border-l-green-500">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl text-green-600">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-gray-500 font-medium">متوسط الحضور</p>
                                <h3 className="text-3xl font-bold text-gray-900">{loading ? '--' : `${avgAttendance}%`}</h3>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="border-l-4 border-l-amber-500">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-100 rounded-xl text-amber-600">
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-gray-500 font-medium">تنبيهات</p>
                                <h3 className="text-3xl font-bold text-gray-900">
                                    {loading ? '--' : unreadCount}
                                </h3>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Right Column: Children & Quick Actions */}
                <div className="space-y-8">
                    {/* Children Overview */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-indigo-600" />
                            نظرة عامة على الأبناء
                        </h2>
                        {loading ? (
                            <div className="flex justify-center py-10">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : children.length === 0 ? (
                            <Card className="text-center py-10 text-gray-500">
                                لا يوجد أبناء مرتبطين بحسابك حالياً
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {children.map((child) => (
                                    <motion.div key={child.id} variants={itemVariants}>
                                        <Card
                                            className="hover:shadow-md transition-shadow cursor-pointer border-r-4 border-r-indigo-500"
                                            onClick={() => navigate(`/parent/children/${child.id}`)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-lg font-bold text-indigo-600">
                                                        {child.fullName?.charAt(0) || '؟'}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">{child.fullName}</h3>
                                                        <p className="text-sm text-gray-500">{child.gradeName}</p>
                                                    </div>
                                                </div>
                                                <div className="text-left">
                                                    <span className={`text-lg font-bold ${child.attendanceRate >= 80 ? 'text-green-600' : 'text-amber-600'}`}>
                                                        {child.attendanceRate}%
                                                    </span>
                                                    <p className="text-xs text-gray-400">نسبة الحضور</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Left Column: Timeline & Notifications */}
                <div className="space-y-8">

                    {/* Upcoming Classes */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-indigo-600" />
                            الحصص القادمة
                        </h2>
                        {upcomingClasses.length === 0 ? (
                            <Card className="text-center py-8 text-gray-500 bg-gray-50 border-dashed">
                                لا توجد حصص قادمة
                            </Card>
                        ) : (
                            <div className="space-y-3">
                                {upcomingClasses.map((session) => (
                                    <Card key={session.id} className="p-4 border-r-4 border-r-blue-500 hover:shadow-sm transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-3">
                                                <div className="mt-1 p-2 bg-blue-50 rounded-lg text-blue-600">
                                                    <Video className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{session.title}</h4>
                                                    <p className="text-sm text-gray-600">{session.subjectName} • {session.teacherName}</p>
                                                    <p className="text-xs text-indigo-600 mt-1 font-medium bg-indigo-50 px-2 py-0.5 rounded-full w-fit">
                                                        {session.studentName}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-gray-900">{formatTime(session.scheduledTime)}</p>
                                                <p className="text-xs text-gray-500">{formatDate(session.scheduledTime)}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent Notifications */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-indigo-600" />
                            آخر التحديثات
                        </h2>
                        {notifications.length === 0 ? (
                            <Card className="text-center py-8 text-gray-500 bg-gray-50 border-dashed">
                                لا توجد إشعارات جديدة
                            </Card>
                        ) : (
                            <div className="space-y-3">
                                {notifications.map((notif) => (
                                    <div key={notif.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3 hover:bg-gray-50 transition-colors">
                                        <div className={`mt-1 p-2 rounded-full ${notif.isRead ? 'bg-gray-100 text-gray-400' : 'bg-red-50 text-red-500'}`}>
                                            <Bell className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-bold ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {formatDate(notif.createdAt)}
                                                </span>
                                                {notif.studentName && (
                                                    <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                                        {notif.studentName}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
