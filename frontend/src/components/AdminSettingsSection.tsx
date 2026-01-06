import React from 'react';
import { Save } from 'lucide-react';
interface AdminSettingsSectionProps {
  lang: 'ar' | 'en';
}
export function AdminSettingsSection({
  lang
}: AdminSettingsSectionProps) {
  const isRTL = lang === 'ar';
  return <div className="space-y-6">
      <h2 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'إعدادات المنصة' : 'Platform Settings'}
      </h2>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-3xl">
        <h3 className={`font-bold text-lg text-slate-800 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {lang === 'ar' ? 'معلومات أساسية' : 'Basic Information'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'اسم المنصة' : 'Platform Name'}
            </label>
            <input type="text" defaultValue="Abnaouna" className={`w-full px-4 py-2 border border-slate-300 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`} />
          </div>
          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'البريد الإلكتروني للدعم' : 'Support Email'}
            </label>
            <input type="email" defaultValue="support@abnaouna.com" className={`w-full px-4 py-2 border border-slate-300 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`} />
          </div>
        </div>

        <h3 className={`font-bold text-lg text-slate-800 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {lang === 'ar' ? 'العام الأكاديمي' : 'Academic Year'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'العام الحالي' : 'Current Year'}
            </label>
            <select className={`w-full px-4 py-2 border border-slate-300 rounded-lg bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
              <option>2023-2024</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'تاريخ البدء' : 'Start Date'}
            </label>
            <input type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
          </div>
          <div className="space-y-2">
            <label className={`block text-sm font-medium text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}
            </label>
            <input type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
          </div>
        </div>

        <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium flex items-center gap-2">
            <Save size={18} />
            <span>{lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>;
}