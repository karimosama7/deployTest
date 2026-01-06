import React from 'react';
import { Upload, Video, Trash2, Eye } from 'lucide-react';
interface ContentSectionProps {
  lang: 'ar' | 'en';
}
export function ContentSection({
  lang
}: ContentSectionProps) {
  const isRTL = lang === 'ar';
  const videos = [{
    id: 1,
    titleAr: 'شرح درس الكسور',
    titleEn: 'Fractions Lesson',
    gradeAr: 'الصف السادس',
    gradeEn: 'Grade 6',
    duration: '15:30',
    date: '2023-10-18'
  }, {
    id: 2,
    titleAr: 'مراجعة الهندسة',
    titleEn: 'Geometry Review',
    gradeAr: 'الصف السابع',
    gradeEn: 'Grade 7',
    duration: '22:45',
    date: '2023-10-15'
  }];
  return <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className={`text-lg font-bold text-slate-800 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {lang === 'ar' ? 'رفع محاضرة جديدة' : 'Upload New Lesson'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select className={`px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
            <option>{lang === 'ar' ? 'اختر المادة' : 'Select Subject'}</option>
            <option>{lang === 'ar' ? 'الرياضيات' : 'Mathematics'}</option>
          </select>
          <select className={`px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
            <option>{lang === 'ar' ? 'اختر الصف' : 'Select Grade'}</option>
            <option>{lang === 'ar' ? 'الصف السادس' : 'Grade 6'}</option>
          </select>
          <div className="relative">
            <input type="file" className="hidden" id="video-upload" />
            <label htmlFor="video-upload" className="flex items-center justify-center gap-2 w-full px-3 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 text-slate-600">
              <Upload size={18} />
              <span>
                {lang === 'ar' ? 'اختر ملف فيديو' : 'Select Video File'}
              </span>
            </label>
          </div>
        </div>

        <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          {lang === 'ar' ? 'رفع المحتوى' : 'Upload Content'}
        </button>
      </div>

      {/* Videos Grid */}
      <div>
        <h2 className={`text-xl font-bold text-slate-800 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          {lang === 'ar' ? 'المكتبة' : 'Library'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 group">
              <div className="aspect-video bg-slate-100 relative flex items-center justify-center">
                <Video className="text-slate-300 w-12 h-12" />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>

              <div className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="font-bold text-slate-800 mb-1">
                  {lang === 'ar' ? video.titleAr : video.titleEn}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  {lang === 'ar' ? video.gradeAr : video.gradeEn} • {video.date}
                </p>

                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <button className="flex-1 py-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-center gap-2">
                    <Eye size={16} />
                    {lang === 'ar' ? 'معاينة' : 'Preview'}
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}