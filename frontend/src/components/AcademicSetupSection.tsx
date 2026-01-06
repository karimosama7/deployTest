import React from 'react';
import { Book, Layers, GraduationCap, Plus, Edit2, Trash2 } from 'lucide-react';
interface AcademicSetupSectionProps {
  lang: 'ar' | 'en';
}
export function AcademicSetupSection({
  lang
}: AcademicSetupSectionProps) {
  const isRTL = lang === 'ar';
  return <div className="space-y-8">
      <h2 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'الإعداد الأكاديمي' : 'Academic Setup'}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Grades */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <GraduationCap size={20} className="text-blue-600" />
              {lang === 'ar' ? 'الصفوف الدراسية' : 'Grades'}
            </h3>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map(grade => <div key={grade} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-medium text-slate-700">
                  {lang === 'ar' ? `الصف ${grade}` : `Grade ${grade}`}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>)}
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <Book size={20} className="text-emerald-600" />
              {lang === 'ar' ? 'المواد الدراسية' : 'Subjects'}
            </h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">
              {lang === 'ar' ? '+ إضافة مادة' : '+ Add Subject'}
            </button>
          </div>
          <div className="space-y-2">
            {['Arabic', 'Math', 'English', 'Science', 'Religion'].map(subject => <div key={subject} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-medium text-slate-700">{subject}</span>
                  <div className="flex gap-2">
                    <button className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>)}
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <Layers size={20} className="text-amber-600" />
            {lang === 'ar' ? 'الكورسات' : 'Courses'}
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm">
            <Plus size={16} />
            <span>{lang === 'ar' ? 'إنشاء كورس' : 'Create Course'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full text-sm text-left ${isRTL ? 'text-right' : ''}`}>
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">
                  {lang === 'ar' ? 'اسم الكورس' : 'Course Name'}
                </th>
                <th className="px-4 py-3">
                  {lang === 'ar' ? 'الصف' : 'Grade'}
                </th>
                <th className="px-4 py-3">
                  {lang === 'ar' ? 'المادة' : 'Subject'}
                </th>
                <th className="px-4 py-3">
                  {lang === 'ar' ? 'المدرس' : 'Teacher'}
                </th>
                <th className="px-4 py-3">
                  {lang === 'ar' ? 'إجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  Math - Grade 6
                </td>
                <td className="px-4 py-3 text-slate-500">Grade 6</td>
                <td className="px-4 py-3 text-slate-500">Math</td>
                <td className="px-4 py-3 text-slate-500">Mr. Mohamed</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
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