import React from 'react';
import { Link, Search, UserPlus } from 'lucide-react';
interface LinkParentStudentSectionProps {
  lang: 'ar' | 'en';
}
export function LinkParentStudentSection({
  lang
}: LinkParentStudentSectionProps) {
  const isRTL = lang === 'ar';
  return <div className="space-y-6">
      <h2 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'ربط ولي الأمر بالطالب' : 'Link Parent to Student'}
      </h2>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'اختر ولي الأمر' : 'Select Parent'}
            </label>
            <select className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
              <option value="">
                {lang === 'ar' ? 'بحث عن ولي أمر...' : 'Search parent...'}
              </option>
              <option value="1">Mr. Mohamed</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'اختر الطالب' : 'Select Student'}
            </label>
            <select className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
              <option value="">
                {lang === 'ar' ? 'بحث عن طالب...' : 'Search student...'}
              </option>
              <option value="1">Ahmed Mohamed</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'صلة القرابة' : 'Relation Type'}
            </label>
            <div className="flex gap-2">
              <select className={`flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
                <option value="father">
                  {lang === 'ar' ? 'أب' : 'Father'}
                </option>
                <option value="mother">
                  {lang === 'ar' ? 'أم' : 'Mother'}
                </option>
                <option value="guardian">
                  {lang === 'ar' ? 'ولي أمر' : 'Guardian'}
                </option>
              </select>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
                {lang === 'ar' ? 'ربط' : 'Link'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className={`font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
            {lang === 'ar' ? 'الروابط الحالية' : 'Existing Links'}
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="p-4 flex items-center justify-between hover:bg-slate-50">
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-900">Mr. Mohamed</span>
                <span className="text-slate-400">→</span>
                <span className="font-medium text-slate-900">
                  Ahmed Mohamed
                </span>
              </div>
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                Father
              </span>
            </div>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              {lang === 'ar' ? 'فك الربط' : 'Unlink'}
            </button>
          </div>
        </div>
      </div>
    </div>;
}