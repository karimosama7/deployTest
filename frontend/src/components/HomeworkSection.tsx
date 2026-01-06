import React from 'react';
import { CheckCircle2, Circle, Clock, ChevronRight, ChevronLeft, FileText } from 'lucide-react';
interface HomeworkSectionProps {
  lang: 'ar' | 'en';
}
export function HomeworkSection({
  lang
}: HomeworkSectionProps) {
  const isRTL = lang === 'ar';
  const Chevron = isRTL ? ChevronLeft : ChevronRight;
  const homeworks = [{
    id: 1,
    titleAr: 'حل تمارين صـ ٤٥',
    titleEn: 'Solve Exercises p.45',
    subjectAr: 'الرياضيات',
    subjectEn: 'Mathematics',
    dueDate: 'Today',
    status: 'pending',
    statusAr: 'قيد الحل',
    statusEn: 'In Progress'
  }, {
    id: 2,
    titleAr: 'كتابة موضوع تعبير',
    titleEn: 'Write an Essay',
    subjectAr: 'اللغة العربية',
    subjectEn: 'Arabic',
    dueDate: 'Tomorrow',
    status: 'new',
    statusAr: 'لم يبدأ',
    statusEn: 'Not Started'
  }, {
    id: 3,
    titleAr: 'مشروع العلوم',
    titleEn: 'Science Project',
    subjectAr: 'العلوم',
    subjectEn: 'Science',
    dueDate: 'Oct 20',
    status: 'submitted',
    statusAr: 'تم التسليم',
    statusEn: 'Submitted'
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };
  return <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'الواجبات المدرسية' : 'Homework Assignments'}
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {homeworks.map((hw, index) => <div key={hw.id} className={`
              p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-slate-50 transition-colors
              ${index !== homeworks.length - 1 ? 'border-b border-slate-100' : ''}
            `}>
            {/* Icon */}
            <div className={`p-3 rounded-full ${hw.status === 'submitted' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
              <FileText size={24} />
            </div>

            {/* Content */}
            <div className={`flex-1 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-slate-800">
                  {lang === 'ar' ? hw.titleAr : hw.titleEn}
                </h3>
                <span className={`inline-block w-fit px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(hw.status)}`}>
                  {lang === 'ar' ? hw.statusAr : hw.statusEn}
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                {lang === 'ar' ? hw.subjectAr : hw.subjectEn} •{' '}
                {lang === 'ar' ? 'آخر موعد:' : 'Due:'} {hw.dueDate}
              </p>
            </div>

            {/* Action */}
            <button className="w-full md:w-auto px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2 group">
              <span>{lang === 'ar' ? 'التفاصيل' : 'View Details'}</span>
              <Chevron size={16} className={`transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </button>
          </div>)}
      </div>
    </div>;
}