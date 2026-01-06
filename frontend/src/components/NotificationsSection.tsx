import React from 'react';
import { Bell, FileText, BarChart2, Clock } from 'lucide-react';
interface NotificationsSectionProps {
  lang: 'ar' | 'en';
}
export function NotificationsSection({
  lang
}: NotificationsSectionProps) {
  const isRTL = lang === 'ar';
  const notifications = [{
    id: 1,
    titleAr: 'تقرير جديد متاح',
    titleEn: 'New Report Available',
    descAr: 'تم إصدار التقرير الشهري لشهر أكتوبر.',
    descEn: 'October monthly report has been released.',
    time: '2h ago',
    icon: BarChart2,
    color: 'bg-blue-100 text-blue-600',
    unread: true
  }, {
    id: 2,
    titleAr: 'واجب منزلي جديد',
    titleEn: 'New Homework Assigned',
    descAr: 'تم إضافة واجب جديد في مادة الرياضيات.',
    descEn: 'New Math homework has been assigned.',
    time: '5h ago',
    icon: FileText,
    color: 'bg-emerald-100 text-emerald-600',
    unread: true
  }, {
    id: 3,
    titleAr: 'تنبيه حضور',
    titleEn: 'Attendance Alert',
    descAr: 'حضر أحمد حصة العلوم اليوم.',
    descEn: 'Ahmed attended Science class today.',
    time: '1d ago',
    icon: Clock,
    color: 'bg-amber-100 text-amber-600',
    unread: false
  }];
  return <div className="max-w-2xl mx-auto space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <h2 className="text-xl font-bold text-slate-800">
          {lang === 'ar' ? 'الإشعارات' : 'Notifications'}
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          {lang === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all as read'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
        {notifications.map(notif => <div key={notif.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
            <div className={`p-3 rounded-full flex-shrink-0 ${notif.color}`}>
              <notif.icon size={20} />
            </div>

            <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-start justify-between mb-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <h3 className="font-bold text-slate-800 text-sm">
                  {lang === 'ar' ? notif.titleAr : notif.titleEn}
                </h3>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {notif.time}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                {lang === 'ar' ? notif.descAr : notif.descEn}
              </p>
            </div>

            {notif.unread && <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />}
          </div>)}
      </div>
    </div>;
}