import React from 'react';
import { Users, BookOpen, UserCheck, TrendingUp } from 'lucide-react';
interface AdminReportsSectionProps {
  lang: 'ar' | 'en';
}
export function AdminReportsSection({
  lang
}: AdminReportsSectionProps) {
  const isRTL = lang === 'ar';
  const stats = [{
    labelAr: 'إجمالي الطلاب',
    labelEn: 'Total Students',
    value: '1,250',
    icon: Users,
    color: 'bg-blue-500'
  }, {
    labelAr: 'إجمالي المدرسين',
    labelEn: 'Total Teachers',
    value: '45',
    icon: UserCheck,
    color: 'bg-emerald-500'
  }, {
    labelAr: 'الكورسات النشطة',
    labelEn: 'Active Courses',
    value: '120',
    icon: BookOpen,
    color: 'bg-amber-500'
  }, {
    labelAr: 'نسبة الحضور',
    labelEn: 'Attendance Rate',
    value: '92%',
    icon: TrendingUp,
    color: 'bg-purple-500'
  }];
  return <div className="space-y-8">
      <h2 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'التقارير والمتابعة' : 'Reports & Monitoring'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-full text-white ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">
                {lang === 'ar' ? stat.labelAr : stat.labelEn}
              </p>
              <h3 className="text-2xl font-bold text-slate-800">
                {stat.value}
              </h3>
            </div>
          </div>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[300px] flex items-center justify-center text-slate-400">
          {lang === 'ar' ? 'رسم بياني للحضور' : 'Attendance Chart'}
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[300px] flex items-center justify-center text-slate-400">
          {lang === 'ar' ? 'رسم بياني للأداء' : 'Performance Chart'}
        </div>
      </div>
    </div>;
}