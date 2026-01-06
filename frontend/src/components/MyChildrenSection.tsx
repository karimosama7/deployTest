import React, { Children } from 'react';
import { ChevronRight, ChevronLeft, Star, TrendingUp, AlertCircle } from 'lucide-react';
interface MyChildrenSectionProps {
  lang: 'ar' | 'en';
  onSelectChild: (childId: number) => void;
}
export function MyChildrenSection({
  lang,
  onSelectChild
}: MyChildrenSectionProps) {
  const isRTL = lang === 'ar';
  const Chevron = isRTL ? ChevronLeft : ChevronRight;
  const children = [{
    id: 1,
    nameAr: 'أحمد',
    nameEn: 'Ahmed',
    gradeAr: 'الصف السادس',
    gradeEn: 'Grade 6',
    status: 'excellent',
    avatarSeed: 'Ahmed'
  }, {
    id: 2,
    nameAr: 'سارة',
    nameEn: 'Sara',
    gradeAr: 'الصف الرابع',
    gradeEn: 'Grade 4',
    status: 'good',
    avatarSeed: 'Sara'
  }, {
    id: 3,
    nameAr: 'عمر',
    nameEn: 'Omar',
    gradeAr: 'الصف الثاني',
    gradeEn: 'Grade 2',
    status: 'needs_support',
    avatarSeed: 'Omar'
  }];
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'excellent':
        return {
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          labelAr: 'ممتاز',
          labelEn: 'Excellent',
          icon: Star
        };
      case 'good':
        return {
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          labelAr: 'جيد',
          labelEn: 'Good',
          icon: TrendingUp
        };
      case 'needs_support':
        return {
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          labelAr: 'يحتاج دعم',
          labelEn: 'Needs Support',
          icon: AlertCircle
        };
      default:
        return {
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          labelAr: '-',
          labelEn: '-',
          icon: Star
        };
    }
  };
  return <div className="space-y-6">
      <h2 className={`text-2xl font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
        {lang === 'ar' ? 'أبنائي' : 'My Children'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children.map(child => {
        const statusConfig = getStatusConfig(child.status);
        const StatusIcon = statusConfig.icon;
        return <div key={child.id} className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all hover:shadow-md ${statusConfig.border}`}>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-slate-100 mb-4 overflow-hidden border-2 border-white shadow-sm">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${child.avatarSeed}&backgroundColor=b6e3f4`} alt="Child Avatar" className="w-full h-full object-cover" />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  {lang === 'ar' ? child.nameAr : child.nameEn}
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                  {lang === 'ar' ? child.gradeAr : child.gradeEn}
                </p>

                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                  <StatusIcon size={16} />
                  <span>
                    {lang === 'ar' ? statusConfig.labelAr : statusConfig.labelEn}
                  </span>
                </div>
              </div>

              <button onClick={() => onSelectChild(child.id)} className="w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2 group">
                <span>{lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}</span>
                <Chevron size={16} className={`transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>;
      })}
      </div>
    </div>;
}