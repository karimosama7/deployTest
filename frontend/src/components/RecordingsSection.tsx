import React from 'react';
import { Play, Clock, Calendar } from 'lucide-react';
interface RecordingsSectionProps {
  lang: 'ar' | 'en';
}
export function RecordingsSection({
  lang
}: RecordingsSectionProps) {
  const isRTL = lang === 'ar';
  const recordings = [{
    id: 1,
    titleAr: 'مراجعة الوحدة الأولى',
    titleEn: 'Unit 1 Review',
    subjectAr: 'الرياضيات',
    subjectEn: 'Mathematics',
    duration: '45 min',
    date: '2023-10-15',
    color: 'bg-indigo-100'
  }, {
    id: 2,
    titleAr: 'قواعد اللغة - الدرس الثاني',
    titleEn: 'Grammar - Lesson 2',
    subjectAr: 'اللغة الإنجليزية',
    subjectEn: 'English',
    duration: '30 min',
    date: '2023-10-14',
    color: 'bg-blue-100'
  }, {
    id: 3,
    titleAr: 'النظام الشمسي',
    titleEn: 'The Solar System',
    subjectAr: 'العلوم',
    subjectEn: 'Science',
    duration: '50 min',
    date: '2023-10-12',
    color: 'bg-emerald-100'
  }, {
    id: 4,
    titleAr: 'تاريخ مصر القديمة',
    titleEn: 'Ancient Egypt History',
    subjectAr: 'الدراسات الاجتماعية',
    subjectEn: 'Social Studies',
    duration: '40 min',
    date: '2023-10-10',
    color: 'bg-amber-100'
  }];
  return <div className="space-y-6">
      <h2 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'المحاضرات المسجلة' : 'Recorded Lessons'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recordings.map(video => <div key={video.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all">
            {/* Thumbnail Placeholder */}
            <div className={`h-48 ${video.color} relative flex items-center justify-center group-hover:opacity-90 transition-opacity`}>
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
              <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-slate-800 ml-1" fill="currentColor" />
              </button>
              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md font-medium backdrop-blur-sm">
                {video.duration}
              </span>
            </div>

            <div className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                  {lang === 'ar' ? video.subjectAr : video.subjectEn}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 mb-3 line-clamp-1">
                {lang === 'ar' ? video.titleAr : video.titleEn}
              </h3>
              <div className={`flex items-center gap-4 text-xs text-slate-400 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{video.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
}