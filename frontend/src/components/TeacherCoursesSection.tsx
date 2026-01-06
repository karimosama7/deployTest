import React from 'react';
import { Book, Users, ArrowRight, ArrowLeft, MoreHorizontal } from 'lucide-react';
interface TeacherCoursesSectionProps {
  lang: 'ar' | 'en';
}
export function TeacherCoursesSection({
  lang
}: TeacherCoursesSectionProps) {
  const isRTL = lang === 'ar';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const courses = [{
    id: 1,
    titleAr: 'الرياضيات - الصف السادس',
    titleEn: 'Mathematics - Grade 6',
    students: 32,
    progress: 65,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    icon: Book
  }, {
    id: 2,
    titleAr: 'العلوم - الصف السابع',
    titleEn: 'Science - Grade 7',
    students: 28,
    progress: 40,
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    icon: Book
  }, {
    id: 3,
    titleAr: 'الرياضيات المتقدمة - الصف الثامن',
    titleEn: 'Advanced Math - Grade 8',
    students: 25,
    progress: 80,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    icon: Book
  }];
  return <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'ar' ? 'كورساتي' : 'My Courses'}
        </h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          {lang === 'ar' ? 'عرض الكل' : 'View All'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
            <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`p-3 rounded-lg ${course.lightColor} text-white`}>
                <course.icon className={`w-6 h-6 ${course.color.replace('bg-', 'text-')}`} />
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <h3 className={`text-lg font-bold text-slate-800 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? course.titleAr : course.titleEn}
            </h3>

            <div className={`flex items-center gap-2 text-slate-500 text-sm mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Users size={16} />
              <span>
                {course.students} {lang === 'ar' ? 'طالب' : 'Students'}
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <div className={`flex justify-between text-xs font-medium text-slate-500 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <span>
                  {lang === 'ar' ? 'تقدم المنهج' : 'Curriculum Progress'}
                </span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${course.color} transition-all duration-1000 ease-out`} style={{
              width: `${course.progress}%`
            }} />
              </div>
            </div>

            <button className="w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2 group-hover:border-blue-200">
              <span>{lang === 'ar' ? 'دخول الكورس' : 'Open Course'}</span>
              <Arrow size={16} />
            </button>
          </div>)}
      </div>
    </div>;
}