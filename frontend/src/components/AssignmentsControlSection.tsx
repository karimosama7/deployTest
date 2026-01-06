import React from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
interface AssignmentsControlSectionProps {
  lang: 'ar' | 'en';
}
export function AssignmentsControlSection({
  lang
}: AssignmentsControlSectionProps) {
  const isRTL = lang === 'ar';
  return <div className="space-y-6">
      <h2 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'مراجعة الواجبات' : 'Assignments Control'}
      </h2>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className={`w-full text-sm text-left ${isRTL ? 'text-right' : ''}`}>
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'عنوان الواجب' : 'Title'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'المدرس' : 'Teacher'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الصف/المادة' : 'Grade/Subject'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الحالة' : 'Status'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'إجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">
                  Unit 1 Exercises
                </td>
                <td className="px-6 py-4 text-slate-500">Mr. Mohamed</td>
                <td className="px-6 py-4 text-slate-500">G6 - Math</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {lang === 'ar' ? 'قيد المراجعة' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="View">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-green-600 hover:bg-green-50 rounded" title="Approve">
                      <CheckCircle size={16} />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded" title="Reject">
                      <XCircle size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}