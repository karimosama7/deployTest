import React from 'react';
import { Calendar, Clock } from 'lucide-react';
interface ScheduleSectionProps {
  lang: 'ar' | 'en';
}
export function ScheduleSection({
  lang
}: ScheduleSectionProps) {
  const isRTL = lang === 'ar';
  // Mock schedule data for student
  const schedule = [{
    id: 1,
    day: 'Sunday',
    dayAr: 'الأحد',
    time: '09:00',
    duration: '45 min',
    course: 'Mathematics',
    courseAr: 'الرياضيات'
  }, {
    id: 2,
    day: 'Sunday',
    dayAr: 'الأحد',
    time: '10:00',
    duration: '45 min',
    course: 'Science',
    courseAr: 'العلوم'
  }, {
    id: 3,
    day: 'Monday',
    dayAr: 'الاثنين',
    time: '09:00',
    duration: '60 min',
    course: 'English',
    courseAr: 'اللغة الإنجليزية'
  }, {
    id: 4,
    day: 'Monday',
    dayAr: 'الاثنين',
    time: '11:00',
    duration: '45 min',
    course: 'Arabic',
    courseAr: 'اللغة العربية'
  }, {
    id: 5,
    day: 'Tuesday',
    dayAr: 'الثلاثاء',
    time: '09:00',
    duration: '45 min',
    course: 'Mathematics',
    courseAr: 'الرياضيات'
  }, {
    id: 6,
    day: 'Wednesday',
    dayAr: 'الأربعاء',
    time: '10:00',
    duration: '45 min',
    course: 'Science',
    courseAr: 'العلوم'
  }, {
    id: 7,
    day: 'Thursday',
    dayAr: 'الخميس',
    time: '09:00',
    duration: '60 min',
    course: 'Religion',
    courseAr: 'التربية الدينية'
  }];
  return <div className="space-y-6">
      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Calendar className="text-blue-600" size={28} />
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'ar' ? 'جدولي الأسبوعي' : 'My Weekly Schedule'}
        </h2>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className={`w-full text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">{lang === 'ar' ? 'اليوم' : 'Day'}</th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الوقت' : 'Time'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'المدة' : 'Duration'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'المادة' : 'Course'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schedule.map(item => <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {lang === 'ar' ? item.dayAr : item.day}
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-mono">
                    {item.time}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{item.duration}</td>
                  <td className="px-6 py-4 text-slate-700 font-medium">
                    {lang === 'ar' ? item.courseAr : item.course}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`flex items-start gap-2 p-4 bg-blue-50 rounded-lg border border-blue-100 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
        <Clock className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-blue-800">
          {lang === 'ar' ? 'سيرسل لك المدرس رابط الحصة قبل موعدها. تأكد من التحقق من الإشعارات.' : 'Your teacher will send you the class link before the session. Check your notifications.'}
        </p>
      </div>
    </div>;
}