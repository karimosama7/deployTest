import React from 'react';
import { Send, Bell } from 'lucide-react';
interface NotificationsManagementSectionProps {
  lang: 'ar' | 'en';
}
export function NotificationsManagementSection({
  lang
}: NotificationsManagementSectionProps) {
  const isRTL = lang === 'ar';
  return <div className="space-y-6">
      <h2 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'إدارة الإشعارات' : 'Notifications Management'}
      </h2>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'إرسال إلى' : 'Send To'}
            </label>
            <select className={`w-full px-4 py-2 border border-slate-300 rounded-lg bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
              <option value="all_students">
                {lang === 'ar' ? 'جميع الطلاب' : 'All Students'}
              </option>
              <option value="all_parents">
                {lang === 'ar' ? 'جميع أولياء الأمور' : 'All Parents'}
              </option>
              <option value="all_teachers">
                {lang === 'ar' ? 'جميع المدرسين' : 'All Teachers'}
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'عنوان الإشعار' : 'Title'}
            </label>
            <input type="text" className={`w-full px-4 py-2 border border-slate-300 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`} />
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'نص الرسالة' : 'Message'}
            </label>
            <textarea rows={4} className={`w-full px-4 py-2 border border-slate-300 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`} />
          </div>

          <button className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2">
            <Send size={18} />
            <span>{lang === 'ar' ? 'إرسال الإشعار' : 'Send Notification'}</span>
          </button>
        </div>
      </div>
    </div>;
}