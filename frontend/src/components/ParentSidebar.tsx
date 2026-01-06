import React, { Children } from 'react';
import { Users, BarChart2, FileText, Bell, MessageCircle, HelpCircle, Heart } from 'lucide-react';
export type ParentSectionId = 'children' | 'reports' | 'progress' | 'notifications' | 'communication' | 'support';
interface ParentSidebarProps {
  activeSection: ParentSectionId;
  setActiveSection: (section: ParentSectionId) => void;
  lang: 'ar' | 'en';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export function ParentSidebar({
  activeSection,
  setActiveSection,
  lang,
  isOpen
}: ParentSidebarProps) {
  const isRTL = lang === 'ar';
  const menuItems = [{
    id: 'children',
    icon: Users,
    labelAr: 'أبنائي',
    labelEn: 'My Children'
  }, {
    id: 'reports',
    icon: BarChart2,
    labelAr: 'التقارير',
    labelEn: 'Reports'
  }, {
    id: 'progress',
    icon: FileText,
    labelAr: 'المتابعة الشهرية',
    labelEn: 'Monthly Progress'
  }, {
    id: 'notifications',
    icon: Bell,
    labelAr: 'الإشعارات',
    labelEn: 'Notifications'
  }, {
    id: 'communication',
    icon: MessageCircle,
    labelAr: 'التواصل',
    labelEn: 'Communication'
  }, {
    id: 'support',
    icon: HelpCircle,
    labelAr: 'الدعم',
    labelEn: 'Support'
  }] as const;
  return <aside className={`
        fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-20 w-64 bg-white border-r border-l border-slate-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:shadow-none shadow-xl
      `}>
      <div className="p-0 h-10 sm:h-16 md:h-24 lg:h-32 flex items-center justify-center border-b border-slate-100">
        <div className="flex items-center">
          <img src="/Logo.png" alt="ابناؤنا" className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain rounded-md" />
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map(item => {
        const isActive = activeSection === item.id;
        return <button key={item.id} onClick={() => setActiveSection(item.id)} className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}
              `}>
              <item.icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
              <span className="font-medium">
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </span>
            </button>;
      })}
      </nav>
    </aside>;
}