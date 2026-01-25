import React, { useState } from 'react';
import { Calendar, Clock, Video, Send, Upload, FileText, Trash2 } from 'lucide-react';
import { ConfirmModal } from './common/ConfirmModal';

interface TeacherScheduleSectionProps {
  lang: 'ar' | 'en';
}
export function TeacherScheduleSection({
  lang
}: TeacherScheduleSectionProps) {
  const isRTL = lang === 'ar';
  const [meetingLinks, setMeetingLinks] = useState<Record<number, string>>({});

  // Alert Modal State
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'danger';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  // Mock schedule data for teacher
  const schedule = [{
    id: 1,
    day: 'Sunday',
    dayAr: 'الأحد',
    time: '09:00',
    duration: '45 min',
    course: 'Math - Grade 6',
    courseAr: 'رياضيات - الصف السادس',
    grade: 'Grade 6'
  }, {
    id: 2,
    day: 'Sunday',
    dayAr: 'الأحد',
    time: '10:30',
    duration: '45 min',
    course: 'Math - Grade 7',
    courseAr: 'رياضيات - الصف السابع',
    grade: 'Grade 7'
  }, {
    id: 3,
    day: 'Monday',
    dayAr: 'الاثنين',
    time: '09:00',
    duration: '60 min',
    course: 'Math - Grade 6',
    courseAr: 'رياضيات - الصف السادس',
    grade: 'Grade 6'
  }, {
    id: 4,
    day: 'Tuesday',
    dayAr: 'الثلاثاء',
    time: '11:00',
    duration: '45 min',
    course: 'Math - Grade 8',
    courseAr: 'رياضيات - الصف الثامن',
    grade: 'Grade 8'
  }];
  // Mock uploaded books
  const [books, setBooks] = useState([{
    id: 1,
    name: 'Math_Grade6_Term1.pdf',
    course: 'Math - Grade 6',
    uploadDate: '2023-10-15'
  }]);
  const handleLinkChange = (id: number, link: string) => {
    setMeetingLinks({
      ...meetingLinks,
      [id]: link
    });
  };
  const handlePublishLink = (classItem: (typeof schedule)[0]) => {
    const link = meetingLinks[classItem.id];
    if (link) {
      setAlertState({
        isOpen: true,
        title: lang === 'ar' ? 'تم النشر' : 'Published',
        message: lang === 'ar'
          ? `تم نشر الرابط لجميع الطلاب في كورس ${classItem.courseAr} بنجاح!`
          : `Link published to all students in ${classItem.course}!`,
        type: 'success'
      });
    }
  };
  return <div className="space-y-8">
    {/* Schedule Section */}
    <div className="space-y-6">
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
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'اليوم' : 'Day'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الوقت' : 'Time'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'المدة' : 'Duration'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الكورس' : 'Course'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'رابط الاجتماع' : 'Meeting Link'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'إجراء' : 'Action'}
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
                <td className="px-6 py-4 text-slate-500">
                  {item.duration}
                </td>
                <td className="px-6 py-4 text-slate-700 font-medium">
                  {lang === 'ar' ? item.courseAr : item.course}
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <Video className={`absolute top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input type="text" value={meetingLinks[item.id] || ''} onChange={e => handleLinkChange(item.id, e.target.value)} placeholder={lang === 'ar' ? 'أدخل رابط الاجتماع' : 'Enter meeting link'} className={`w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${isRTL ? 'pr-10 pl-4 text-right' : ''}`} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handlePublishLink(item)} disabled={!meetingLinks[item.id]} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                    <Send size={16} />
                    <span>{lang === 'ar' ? 'نشر' : 'Publish'}</span>
                  </button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`flex items-start gap-2 p-4 bg-blue-50 rounded-lg border border-blue-100 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
        <Clock className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-blue-800">
          {lang === 'ar' ? 'أضف رابط الاجتماع واضغط "نشر" لإرساله لجميع الطلاب في هذه الحصة.' : 'Add the meeting link and click "Publish" to send it to all students in this class.'}
        </p>
      </div>
    </div>

    {/* Books Upload Section */}
    <div className="space-y-6">
      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <FileText className="text-emerald-600" size={28} />
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'ar' ? 'الكتب والمواد الدراسية' : 'Books & Materials'}
        </h2>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className={`font-bold text-lg text-slate-800 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {lang === 'ar' ? 'رفع كتاب جديد' : 'Upload New Book'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'اختر الكورس' : 'Select Course'}
            </label>
            <select className={`w-full px-4 py-2 border border-slate-300 rounded-lg bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
              <option>
                {lang === 'ar' ? 'اختر الكورس' : 'Select Course'}
              </option>
              <option>Math - Grade 6</option>
              <option>Math - Grade 7</option>
              <option>Math - Grade 8</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'اسم الكتاب' : 'Book Name'}
            </label>
            <input type="text" placeholder={lang === 'ar' ? 'مثال: كتاب الرياضيات - الفصل الأول' : 'Example: Math Book - Term 1'} className={`w-full px-4 py-2 border border-slate-300 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`} />
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer mb-4">
          <Upload className="mx-auto h-10 w-10 text-slate-400 mb-3" />
          <p className="text-sm text-slate-600 font-medium mb-1">
            {lang === 'ar' ? 'اسحب الملف هنا أو اضغط للرفع' : 'Drag file here or click to upload'}
          </p>
          <p className="text-xs text-slate-400">PDF, DOC, DOCX (Max 50MB)</p>
        </div>

        <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm font-medium">
            {lang === 'ar' ? 'رفع الكتاب' : 'Upload Book'}
          </button>
        </div>
      </div>

      {/* Uploaded Books List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className={`font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
            {lang === 'ar' ? 'الكتب المرفوعة' : 'Uploaded Books'}
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {books.map(book => <div key={book.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="p-2 bg-red-50 rounded-lg">
                <FileText className="text-red-500" size={20} />
              </div>
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <p className="font-medium text-slate-900">{book.name}</p>
                <p className="text-sm text-slate-500">
                  {book.course} • {book.uploadDate}
                </p>
              </div>
            </div>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 size={18} />
            </button>
          </div>)}
        </div>
      </div>
    </div>

    <ConfirmModal
      isOpen={alertState.isOpen}
      onClose={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
      title={alertState.title}
      message={alertState.message}
      type={alertState.type}
      isAlert={true}
      confirmText={lang === 'ar' ? 'حسناً' : 'OK'}
    />
  </div>;
}