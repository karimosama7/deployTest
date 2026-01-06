import React from 'react';
import { Book, Calculator, Languages, Globe, Heart } from 'lucide-react';
interface CoursesSectionProps {
  lang: 'ar' | 'en';
}
export function CoursesSection({
  lang
}: CoursesSectionProps) {
  const isRTL = lang === 'ar';
  const courses = [{
    id: 1,
    titleAr: 'اللغة العربية',
    titleEn: 'Arabic Language',
    progress: 75,
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    icon: Book,
    lessons: 24,
    completed: 18
  }, {
    id: 2,
    titleAr: 'اللغة الإنجليزية',
    titleEn: 'English Language',
    progress: 45,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    icon: Languages,
    lessons: 30,
    completed: 12
  }, {
    id: 3,
    titleAr: 'الرياضيات',
    titleEn: 'Mathematics',
    progress: 90,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    icon: Calculator,
    lessons: 20,
    completed: 18
  }, {
    id: 4,
    titleAr: 'متعدد التخصصات',
    titleEn: 'Multidisciplinary',
    progress: 30,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    icon: Globe,
    lessons: 15,
    completed: 5
  }, {
    id: 5,
    titleAr: 'التربية الدينية',
    titleEn: 'Religious Education',
    progress: 60,
    color: 'bg-teal-500',
    lightColor: 'bg-teal-50',
    icon: Heart,
    lessons: 12,
    completed: 7
  }];
  return <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'ar' ? 'كورساتي' : 'My Courses'}
        </h2>
        <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
          {lang === 'ar' ? '5 مواد نشطة' : '5 Active Courses'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map(course => <div key={course.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200 group">
            <div className={`flex items-start justify-between mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`p-3 rounded-xl ${course.lightColor} text-white`}>
                <course.icon className={`w-6 h-6 ${course.color.replace('bg-', 'text-')}`} />
              </div>
              <div className={`text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md`}>
                {course.completed}/{course.lessons}{' '}
                {lang === 'ar' ? 'درس' : 'Lessons'}
              </div>
            </div>

            <h3 className={`text-lg font-bold text-slate-800 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? course.titleAr : course.titleEn}
            </h3>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm text-slate-500">
                <span>{course.progress}%</span>
                <span>{lang === 'ar' ? 'مكتمل' : 'Completed'}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${course.color} transition-all duration-1000 ease-out`} style={{
              width: `${course.progress}%`
            }} />
              </div>
            </div>

            <button className="w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]">
              {lang === 'ar' ? 'دخول الكورس' : 'Enter Course'}
            </button>
          </div>)}
      </div>
    </div>;
}