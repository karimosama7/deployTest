import React from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
interface StudentsSectionProps {
  lang: 'ar' | 'en';
}
export function StudentsSection({
  lang
}: StudentsSectionProps) {
  const isRTL = lang === 'ar';
  const students = [{
    id: 1,
    nameAr: 'أحمد محمد',
    nameEn: 'Ahmed Mohamed',
    gradeAr: 'الصف السادس',
    gradeEn: 'Grade 6',
    performance: 'high',
    attendance: '95%'
  }, {
    id: 2,
    nameAr: 'سارة علي',
    nameEn: 'Sarah Ali',
    gradeAr: 'الصف السادس',
    gradeEn: 'Grade 6',
    performance: 'medium',
    attendance: '88%'
  }, {
    id: 3,
    nameAr: 'عمر خالد',
    nameEn: 'Omar Khaled',
    gradeAr: 'الصف السادس',
    gradeEn: 'Grade 6',
    performance: 'low',
    attendance: '72%'
  }, {
    id: 4,
    nameAr: 'ليلى حسن',
    nameEn: 'Laila Hassan',
    gradeAr: 'الصف السادس',
    gradeEn: 'Grade 6',
    performance: 'high',
    attendance: '98%'
  }, {
    id: 5,
    nameAr: 'يوسف إبراهيم',
    nameEn: 'Youssef Ibrahim',
    gradeAr: 'الصف السادس',
    gradeEn: 'Grade 6',
    performance: 'medium',
    attendance: '85%'
  }];
  const getPerformanceColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-emerald-100 text-emerald-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };
  const getPerformanceLabel = (level: string) => {
    if (lang === 'ar') {
      switch (level) {
        case 'high':
          return 'متميز';
        case 'medium':
          return 'متوسط';
        case 'low':
          return 'ضعيف';
        default:
          return '-';
      }
    } else {
      switch (level) {
        case 'high':
          return 'High';
        case 'medium':
          return 'Medium';
        case 'low':
          return 'Low';
        default:
          return '-';
      }
    }
  };
  return <div className="space-y-6">
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'ar' ? 'الطلاب' : 'Students'}
        </h2>

        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
            <input type="text" placeholder={lang === 'ar' ? 'بحث عن طالب...' : 'Search student...'} className={`pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64 ${isRTL ? 'pr-9 pl-4' : ''}`} />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className={`w-full text-sm text-left ${isRTL ? 'text-right' : ''}`}>
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الطالب' : 'Student'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الصف' : 'Grade'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الأداء' : 'Performance'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الحضور' : 'Attendance'}
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map(student => <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {lang === 'ar' ? student.nameAr.charAt(0) : student.nameEn.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-900">
                        {lang === 'ar' ? student.nameAr : student.nameEn}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {lang === 'ar' ? student.gradeAr : student.gradeEn}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPerformanceColor(student.performance)}`}>
                      {getPerformanceLabel(student.performance)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {student.attendance}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}