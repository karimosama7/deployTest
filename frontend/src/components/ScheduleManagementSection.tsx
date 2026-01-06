import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit2, Trash2 } from 'lucide-react';
interface ScheduleManagementSectionProps {
  lang: 'ar' | 'en';
}
export function ScheduleManagementSection({
  lang
}: ScheduleManagementSectionProps) {
  const isRTL = lang === 'ar';
  const [showForm, setShowForm] = useState(false);
  // Mock schedule data
  const schedules = [{
    id: 1,
    grade: 'Grade 6',
    subject: 'Math',
    teacher: 'Mr. Mohamed',
    day: 'Sunday',
    time: '09:00',
    duration: '45 min'
  }, {
    id: 2,
    grade: 'Grade 6',
    subject: 'Science',
    teacher: 'Ms. Sara',
    day: 'Monday',
    time: '10:00',
    duration: '45 min'
  }, {
    id: 3,
    grade: 'Grade 7',
    subject: 'English',
    teacher: 'Mr. Ahmed',
    day: 'Tuesday',
    time: '11:00',
    duration: '60 min'
  }];
  return <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'ar' ? 'إدارة الجدول الدراسي' : 'Schedule Management'}
        </h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>{lang === 'ar' ? 'إضافة حصة' : 'Add Class'}</span>
        </button>
      </div>

      {showForm && <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className={`font-bold text-lg text-slate-800 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {lang === 'ar' ? 'إنشاء حصة جديدة' : 'Create New Class'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                {lang === 'ar' ? 'الصف' : 'Grade'}
              </label>
              <select className={`w-full px-4 py-2 border border-slate-300 rounded-lg bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
                <option>{lang === 'ar' ? 'اختر الصف' : 'Select Grade'}</option>
                <option>Grade 6</option>
                <option>Grade 7</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                {lang === 'ar' ? 'المادة' : 'Subject'}
              </label>
              <select className={`w-full px-4 py-2 border border-slate-300 rounded-lg bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
                <option>
                  {lang === 'ar' ? 'اختر المادة' : 'Select Subject'}
                </option>
                <option>Math</option>
                <option>Science</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                {lang === 'ar' ? 'المدرس' : 'Teacher'}
              </label>
              <select className={`w-full px-4 py-2 border border-slate-300 rounded-lg bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
                <option>
                  {lang === 'ar' ? 'اختر المدرس' : 'Select Teacher'}
                </option>
                <option>Mr. Mohamed</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                {lang === 'ar' ? 'اليوم' : 'Day'}
              </label>
              <select className={`w-full px-4 py-2 border border-slate-300 rounded-lg bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
                <option>{lang === 'ar' ? 'اختر اليوم' : 'Select Day'}</option>
                <option>Sunday</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                {lang === 'ar' ? 'الوقت' : 'Time'}
              </label>
              <input type="time" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                {lang === 'ar' ? 'المدة' : 'Duration'}
              </label>
              <select className={`w-full px-4 py-2 border border-slate-300 rounded-lg bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
                <option>30 min</option>
                <option>45 min</option>
                <option>60 min</option>
              </select>
            </div>
          </div>

          <div className={`flex gap-3 ${isRTL ? 'justify-start' : 'justify-end'}`}>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
              {lang === 'ar' ? 'حفظ الحصة' : 'Save Class'}
            </button>
          </div>
        </div>}

      {/* Schedule Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className={`w-full text-sm text-left ${isRTL ? 'text-right' : ''}`}>
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الصف' : 'Grade'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'المادة' : 'Subject'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'المدرس' : 'Teacher'}
                </th>
                <th className="px-6 py-4">{lang === 'ar' ? 'اليوم' : 'Day'}</th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الوقت' : 'Time'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'المدة' : 'Duration'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'إجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schedules.map(schedule => <tr key={schedule.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {schedule.grade}
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {schedule.subject}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {schedule.teacher}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{schedule.day}</td>
                  <td className="px-6 py-4 text-slate-500">{schedule.time}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {schedule.duration}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`text-sm text-slate-500 ${isRTL ? 'text-right' : 'text-left'}`}>
        <p>
          {lang === 'ar' ? '💡 ملاحظة: سيظهر الجدول للطلاب والمدرسين في لوحاتهم الخاصة' : '💡 Note: Schedule will appear in student and teacher dashboards'}
        </p>
      </div>
    </div>;
}