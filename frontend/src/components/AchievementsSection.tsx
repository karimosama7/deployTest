import React from 'react';
import { Trophy, Star, Medal, Crown, Zap, Target } from 'lucide-react';
interface AchievementsSectionProps {
  lang: 'ar' | 'en';
}
export function AchievementsSection({
  lang
}: AchievementsSectionProps) {
  const isRTL = lang === 'ar';
  const achievements = [{
    id: 1,
    titleAr: 'الحضور المثالي',
    titleEn: 'Perfect Attendance',
    descAr: 'حضرت جميع الحصص هذا الأسبوع',
    descEn: 'Attended all classes this week',
    icon: Crown,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    locked: false
  }, {
    id: 2,
    titleAr: 'عبقري الرياضيات',
    titleEn: 'Math Genius',
    descAr: 'حصلت على الدرجة النهائية في الكويز',
    descEn: 'Scored 100% in Math Quiz',
    icon: Zap,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    locked: false
  }, {
    id: 3,
    titleAr: 'نجم الواجبات',
    titleEn: 'Homework Star',
    descAr: 'سلمت ٥ واجبات في الموعد',
    descEn: 'Submitted 5 homeworks on time',
    icon: Star,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    locked: false
  }, {
    id: 4,
    titleAr: 'المشارك النشيط',
    titleEn: 'Active Participant',
    descAr: 'شاركت في ١٠ مناقشات',
    descEn: 'Participated in 10 discussions',
    icon: Target,
    color: 'text-slate-400',
    bg: 'bg-slate-100',
    locked: true
  }];
  return <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'ar' ? 'إنجازاتي' : 'My Achievements'}
        </h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
          <Trophy size={18} />
          <span className="font-bold">1,250 XP</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map(item => <div key={item.id} className={`
              relative p-6 rounded-2xl border flex flex-col items-center text-center transition-all
              ${item.locked ? 'bg-slate-50 border-slate-200 opacity-75 grayscale' : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1'}
            `}>
            <div className={`w-16 h-16 rounded-full ${item.bg} flex items-center justify-center mb-4`}>
              <item.icon className={`w-8 h-8 ${item.color}`} />
            </div>

            <h3 className="font-bold text-slate-800 mb-2">
              {lang === 'ar' ? item.titleAr : item.titleEn}
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              {lang === 'ar' ? item.descAr : item.descEn}
            </p>

            {item.locked && <div className="absolute top-3 right-3 bg-slate-200 p-1.5 rounded-full">
                <div className="w-2 h-2 bg-slate-400 rounded-full" />
              </div>}
          </div>)}
      </div>
    </div>;
}