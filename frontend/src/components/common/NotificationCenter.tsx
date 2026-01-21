import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Clock, BookOpen, GraduationCap, FileText, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationResponse, NotificationType } from '../../types/api';
import { parentService } from '../../services/parentService';

interface NotificationCenterProps {
    className?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const [data, count] = await Promise.all([
                parentService.getNotifications(),
                parentService.getUnreadCount()
            ]);
            setNotifications(data);
            setUnreadCount(count);
        } catch (error) {
            console.error('Failed to fetch notifications', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();

        // Initial fetch and periodic poll (optional, every 60s)
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMarkAsRead = async (id: number) => {
        try {
            await parentService.markNotificationRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Failed to mark as read', error);
        }
    };

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case 'ATTENDANCE': return <Clock className="w-5 h-5 text-blue-500" />;
            case 'HOMEWORK_SUBMISSION': return <FileText className="w-5 h-5 text-purple-500" />;
            case 'HOMEWORK_GRADED': return <BookOpen className="w-5 h-5 text-green-500" />;
            case 'EXAM_RESULT': return <GraduationCap className="w-5 h-5 text-amber-500" />;
            case 'EXAM_COMPLETED': return <Check className="w-5 h-5 text-cyan-500" />;
            default: return <Info className="w-5 h-5 text-gray-500" />;
        }
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('ar-EG', {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(new Date(dateString));
    };

    return (
        <div className={`relative ${className}`} ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                <Bell className={`w-6 h-6 ${unreadCount > 0 ? 'text-indigo-600' : 'text-gray-500'}`} />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                    >
                        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">الإشعارات</h3>
                            <button
                                onClick={fetchNotifications}
                                className="text-xs text-indigo-600 hover:underline"
                            >
                                تحديث
                            </button>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {loading && notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">
                                    جاري التحميل...
                                </div>
                            ) : notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                                    <Bell className="w-8 h-8 mb-2 opacity-20" />
                                    <p>لا توجد إشعارات جديدة</p>
                                </div>
                            ) : (
                                <div>
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-indigo-50/30' : ''}`}
                                            onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                                        >
                                            <div className="flex gap-3">
                                                <div className={`mt-1 p-2 rounded-full bg-white shadow-sm border border-gray-100 h-fit`}>
                                                    {getIcon(notification.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className={`text-sm font-bold ${!notification.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                                                            {notification.title}
                                                        </h4>
                                                        {!notification.isRead && (
                                                            <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5"></span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[10px] text-gray-400">
                                                            {formatDate(notification.createdAt)}
                                                        </span>
                                                        {notification.studentName && (
                                                            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                                                {notification.studentName}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div className="p-2 border-t border-gray-50 bg-gray-50 text-center">
                                <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">
                                    عرض كل الإشعارات
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
