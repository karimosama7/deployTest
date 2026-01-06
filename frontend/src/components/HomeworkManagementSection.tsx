import React from 'react';
import { Upload, Calendar, FileText, CheckCircle, Clock, Send } from 'lucide-react';
interface HomeworkManagementSectionProps {
  lang: 'ar' | 'en';
}
export function HomeworkManagementSection({
  lang
}: HomeworkManagementSectionProps) {
  const isRTL = lang === 'ar';
  const homeworks = [{
    id: 1,
    titleAr: 'تمارين الوحدة الأولى',
    titleEn: 'Unit 1 Exercises',
    gradeAr: 'الصف السادس',
    gradeEn: 'Grade 6',
    date: '2023-10-20',
    status: 'graded',
    statusAr: 'تم التصحيح',
    statusEn: 'Graded'
  }, {
    id: 2,
    titleAr: 'مشروع العلوم',
    titleEn: 'Science Project',
    gradeAr: 'الصف السابع',
    gradeEn: 'Grade 7',
    date: '2023-10-25',
    status: 'grading',
    statusAr: 'قيد التصحيح',
    statusEn: 'Being Graded'
  }, {
    id: 3,
    titleAr: 'واجب الرياضيات',
    titleEn: 'Math Homework',
    gradeAr: 'الصف السادس',
    gradeEn: 'Grade 6',
    date: '2023-10-28',
    status: 'sent',
    statusAr: 'تم الإرسال',
    statusEn: 'Sent'
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'graded':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'grading':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'sent':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Create Homework Form */}
      <div className="lg:col-span-1 space-y-6">
        <h2 className={`text-xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
          {lang === 'ar' ? 'إنشاء واجب جديد' : 'Create New Homework'}
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="space-y-1">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'عنوان الواجب' : 'Homework Title'}
            </label>
            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div className="space-y-1">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'المادة' : 'Subject'}
            </label>
            <select className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
              <option>{lang === 'ar' ? 'الرياضيات' : 'Mathematics'}</option>
              <option>{lang === 'ar' ? 'العلوم' : 'Science'}</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'الصف' : 'Grade'}
            </label>
            <select className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
              <option>{lang === 'ar' ? 'الصف السادس' : 'Grade 6'}</option>
              <option>{lang === 'ar' ? 'الصف السابع' : 'Grade 7'}</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'تاريخ التسليم' : 'Due Date'}
            </label>
            <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
            <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
            <p className="text-sm text-slate-500">
              {lang === 'ar' ? 'اسحب الملفات هنا أو اضغط للرفع' : 'Drag files here or click to upload'}
            </p>
            <p className="text-xs text-slate-400 mt-1">PDF, Images, Video</p>
          </div>

          <button className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
            {lang === 'ar' ? 'إرسال الواجب' : 'Send Homework'}
          </button>
        </div>
      </div>

      {/* Homework List */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className={`text-xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
          {lang === 'ar' ? 'الواجبات المرسلة' : 'Sent Homework'}
        </h2>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {homeworks.map((hw, index) => <div key={hw.id} className={`
                p-5 flex flex-col md:flex-row items-center gap-4 hover:bg-slate-50 transition-colors
                ${index !== homeworks.length - 1 ? 'border-b border-slate-100' : ''}
              `}>
              <div className={`p-3 rounded-full bg-slate-100 text-slate-600`}>
                <FileText size={20} />
              </div>

              <div className={`flex-1 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="font-bold text-slate-800">
                  {lang === 'ar' ? hw.titleAr : hw.titleEn}
                </h3>
                <p className="text-slate-500 text-sm">
                  {lang === 'ar' ? hw.gradeAr : hw.gradeEn} • {hw.date}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(hw.status)}`}>
                  {lang === 'ar' ? hw.statusAr : hw.statusEn}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  {lang === 'ar' ? 'عرض' : 'View'}
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}