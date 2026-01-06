import React from 'react';
import { Award, Clock, HelpCircle, CheckCircle } from 'lucide-react';
interface QuizzesSectionProps {
  lang: 'ar' | 'en';
}
export function QuizzesSection({
  lang
}: QuizzesSectionProps) {
  const isRTL = lang === 'ar';
  const quizzes = [{
    id: 1,
    titleAr: 'اختبار الرياضيات القصير',
    titleEn: 'Math Pop Quiz',
    subjectAr: 'الرياضيات',
    subjectEn: 'Mathematics',
    questions: 10,
    score: 90,
    passed: true
  }, {
    id: 2,
    titleAr: 'اختبار الكلمات',
    titleEn: 'Vocabulary Quiz',
    subjectAr: 'اللغة الإنجليزية',
    subjectEn: 'English',
    questions: 15,
    score: null,
    passed: false
  }, {
    id: 3,
    titleAr: 'اختبار العلوم الشهري',
    titleEn: 'Science Monthly Test',
    subjectAr: 'العلوم',
    subjectEn: 'Science',
    questions: 20,
    score: 85,
    passed: true
  }];
  return <div className="space-y-6">
      <h2 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'الاختبارات والكويزات' : 'Quizzes & Tests'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(quiz => <div key={quiz.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
                <HelpCircle size={24} />
              </div>
              {quiz.score !== null && <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-sm font-bold">
                  <CheckCircle size={14} />
                  <span>{quiz.score}%</span>
                </div>}
            </div>

            <h3 className={`text-lg font-bold text-slate-800 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? quiz.titleAr : quiz.titleEn}
            </h3>
            <p className={`text-sm text-slate-500 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {lang === 'ar' ? quiz.subjectAr : quiz.subjectEn}
            </p>

            <div className="mt-auto pt-4 border-t border-slate-50">
              <div className={`flex items-center justify-between text-sm text-slate-500 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <span>
                  {quiz.questions} {lang === 'ar' ? 'سؤال' : 'Questions'}
                </span>
                <span>15 {lang === 'ar' ? 'دقيقة' : 'Min'}</span>
              </div>

              <button className={`w-full py-2.5 rounded-xl font-medium transition-all ${quiz.score !== null ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200'}`}>
                {quiz.score !== null ? lang === 'ar' ? 'مراجعة الإجابات' : 'Review Answers' : lang === 'ar' ? 'ابدأ الاختبار' : 'Start Quiz'}
              </button>
            </div>
          </div>)}
      </div>
    </div>;
}