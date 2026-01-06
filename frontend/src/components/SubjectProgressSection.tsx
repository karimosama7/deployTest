import React, { useState } from 'react';
import { Book, CheckSquare, Award } from 'lucide-react';
interface SubjectProgressSectionProps {
  lang: 'ar' | 'en';
}
export function SubjectProgressSection({
  lang
}: SubjectProgressSectionProps) {
  const isRTL = lang === 'ar';
  const [activeTab, setActiveTab] = useState('math');
  const subjects = [{
    id: 'math',
    labelAr: 'الرياضيات',
    labelEn: 'Math',
    color: 'blue'
  }, {
    id: 'science',
    labelAr: 'العلوم',
    labelEn: 'Science',
    color: 'emerald'
  }, {
    id: 'arabic',
    labelAr: 'اللغة العربية',
    labelEn: 'Arabic',
    color: 'amber'
  }, {
    id: 'english',
    labelAr: 'اللغة الإنجليزية',
    labelEn: 'English',
    color: 'purple'
  }];
  const subjectData = {
    lessons: 24,
    homework: 12,
    quizScore: '92%'
  };
  return <div className="space-y-6">
      <h2 className={`text-xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'تقدم المواد الدراسية' : 'Subject Progress'}
      </h2>

      {/* Tabs */}
      <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        {subjects.map(subject => <button key={subject.id} onClick={() => setActiveTab(subject.id)} className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${activeTab === subject.id ? 'bg-white text-slate-800 shadow-sm ring-1 ring-slate-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}
            `}>
            {lang === 'ar' ? subject.labelAr : subject.labelEn}
          </button>)}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Book size={20} />
              </div>
              <span className="text-slate-500 text-sm font-medium">
                {lang === 'ar' ? 'الدروس المكتملة' : 'Lessons Completed'}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">
              {subjectData.lessons}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <CheckSquare size={20} />
              </div>
              <span className="text-slate-500 text-sm font-medium">
                {lang === 'ar' ? 'الواجبات المسلمة' : 'Homework Submitted'}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">
              {subjectData.homework}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <Award size={20} />
              </div>
              <span className="text-slate-500 text-sm font-medium">
                {lang === 'ar' ? 'آخر درجة كويز' : 'Latest Quiz Score'}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">
              {subjectData.quizScore}
            </p>
          </div>
        </div>
      </div>
    </div>;
}