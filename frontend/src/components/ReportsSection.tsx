import React from 'react';
import { BarChart2, Users, TrendingUp, AlertCircle } from 'lucide-react';
interface ReportsSectionProps {
  lang: 'ar' | 'en';
}
export function ReportsSection({
  lang
}: ReportsSectionProps) {
  const isRTL = lang === 'ar';
  const stats = [{
    labelAr: 'متوسط الدرجات',
    labelEn: 'Average Grades',
    value: '85%',
    icon: BarChart2,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  }, {
    labelAr: 'نسبة التفاعل',
    labelEn: 'Engagement Rate',
    value: '72%',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  }, {
    labelAr: 'حضور تقريبي',
    labelEn: 'Approx. Attendance',
    value: '90%',
    icon: Users,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  }];
  return <div className="space-y-8">
      <div className={`flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <AlertCircle className="flex-shrink-0" />
        <p className="text-sm font-medium">
          {lang === 'ar' ? 'تنبيه: هذه التقارير استرشادية فقط وتعتمد على البيانات المتاحة.' : 'Notice: These reports are advisory only based on available data.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
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

      {/* Placeholder for Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[300px] flex items-center justify-center">
        <div className="text-center text-slate-400">
          <BarChart2 size={48} className="mx-auto mb-4 opacity-20" />
          <p>
            {lang === 'ar' ? 'رسم بياني للأداء الأسبوعي' : 'Weekly Performance Chart'}
          </p>
        </div>
      </div>
    </div>;
}