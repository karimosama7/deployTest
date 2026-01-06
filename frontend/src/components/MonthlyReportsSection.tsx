import React from 'react';
import { BarChart2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
interface MonthlyReportsSectionProps {
  lang: 'ar' | 'en';
}
export function MonthlyReportsSection({
  lang
}: MonthlyReportsSectionProps) {
  const isRTL = lang === 'ar';
  const stats = [{
    labelAr: 'نسبة الحضور',
    labelEn: 'Attendance Rate',
    value: '95%',
    icon: Clock,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  }, {
    labelAr: 'متوسط الكويزات',
    labelEn: 'Avg Quiz Scores',
    value: '88%',
    icon: BarChart2,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  }, {
    labelAr: 'تسليم الواجبات',
    labelEn: 'Homework Submission',
    value: '100%',
    icon: CheckCircle,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  }];
  return <div className="space-y-8">
      <h2 className={`text-xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'التقارير الشهرية' : 'Monthly Reports'}
      </h2>

      {/* Key Metrics */}
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

      {/* Chart Placeholder */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 min-h-[300px] flex flex-col items-center justify-center text-center">
        <div className="flex items-end gap-4 h-40 mb-6">
          <div className="w-12 bg-blue-100 rounded-t-lg h-[60%]" />
          <div className="w-12 bg-blue-200 rounded-t-lg h-[80%]" />
          <div className="w-12 bg-blue-300 rounded-t-lg h-[40%]" />
          <div className="w-12 bg-blue-400 rounded-t-lg h-[90%]" />
          <div className="w-12 bg-blue-500 rounded-t-lg h-[70%]" />
        </div>
        <p className="text-slate-400 font-medium">
          {lang === 'ar' ? 'مقارنة أداء المواد الدراسية' : 'Subject Performance Comparison'}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-center justify-center gap-2 text-slate-400 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100">
        <AlertCircle size={16} />
        <p>
          {lang === 'ar' ? 'هذا التقييم استرشادي لمتابعة مستوى الطالب.' : 'This evaluation is for guidance purposes only.'}
        </p>
      </div>
    </div>;
}