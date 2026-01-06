import React from 'react';
import { BookOpen, Clock, Award, Calendar } from 'lucide-react';
interface ChildOverviewSectionProps {
  lang: 'ar' | 'en';
  childId: number;
}
export function ChildOverviewSection({
  lang,
  childId
}: ChildOverviewSectionProps) {
  const isRTL = lang === 'ar';
  // Mock data based on ID
  const childData = {
    nameAr: childId === 1 ? 'أحمد' : childId === 2 ? 'سارة' : 'عمر',
    nameEn: childId === 1 ? 'Ahmed' : childId === 2 ? 'Sara' : 'Omar',
    gradeAr: childId === 1 ? 'الصف السادس' : childId === 2 ? 'الصف الرابع' : 'الصف الثاني',
    gradeEn: childId === 1 ? 'Grade 6' : childId === 2 ? 'Grade 4' : 'Grade 2',
    avatarSeed: childId === 1 ? 'Ahmed' : childId === 2 ? 'Sara' : 'Omar',
    subjects: 5,
    weeklyClasses: 24,
    attendance: '98%'
  };
  return <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 animate-fade-in">
      <div className={`flex flex-col md:flex-row items-center gap-8 ${isRTL ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
        {/* Avatar */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-50 border-4 border-white shadow-md overflow-hidden flex-shrink-0">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${childData.avatarSeed}&backgroundColor=b6e3f4`} alt="Child Avatar" className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              {lang === 'ar' ? childData.nameAr : childData.nameEn}
            </h2>
            <p className="text-slate-500 font-medium">
              {lang === 'ar' ? childData.gradeAr : childData.gradeEn}
            </p>
          </div>

          <div className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end md:justify-start' : 'justify-center md:justify-start'}`}>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
              <BookOpen size={18} className="text-blue-500" />
              <span className="text-sm font-medium text-slate-700">
                {childData.subjects} {lang === 'ar' ? 'مواد' : 'Subjects'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
              <Clock size={18} className="text-emerald-500" />
              <span className="text-sm font-medium text-slate-700">
                {childData.weeklyClasses}{' '}
                {lang === 'ar' ? 'حصة أسبوعياً' : 'Classes/Week'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
              <Calendar size={18} className="text-amber-500" />
              <span className="text-sm font-medium text-slate-700">
                {childData.attendance} {lang === 'ar' ? 'حضور' : 'Attendance'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>;
}