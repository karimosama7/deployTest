import React from 'react';
import { Upload, FileText, Video, Trash2, Eye } from 'lucide-react';
interface ContentManagementSectionProps {
  lang: 'ar' | 'en';
}
export function ContentManagementSection({
  lang
}: ContentManagementSectionProps) {
  const isRTL = lang === 'ar';
  return <div className="space-y-8">
      <h2 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'إدارة المحتوى' : 'Content Management'}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Books */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className={`font-bold text-lg text-slate-800 mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <FileText className="text-blue-600" />
              {lang === 'ar' ? 'الكتب الدراسية' : 'Textbooks'}
            </h3>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer mb-4">
              <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
              <p className="text-sm text-slate-500">
                {lang === 'ar' ? 'رفع ملف PDF' : 'Upload PDF'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-red-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Math_G6_Term1.pdf
                  </span>
                </div>
                <button className="text-slate-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Videos */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className={`font-bold text-lg text-slate-800 mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Video className="text-emerald-600" />
              {lang === 'ar' ? 'الحصص المسجلة' : 'Recorded Lessons'}
            </h3>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer mb-4">
              <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
              <p className="text-sm text-slate-500">
                {lang === 'ar' ? 'رفع فيديو' : 'Upload Video'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <Video size={18} className="text-blue-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Science_Lesson1.mp4
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="text-slate-400 hover:text-blue-600">
                    <Eye size={16} />
                  </button>
                  <button className="text-slate-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}