import React from 'react';
import { Users, Link, BookOpen, Calendar, FileText, CheckSquare, BarChart2, Bell, Settings, Shield } from 'lucide-react';
export type AdminSectionId = 'users' | 'link' | 'academic' | 'schedule' | 'reports' | 'notifications' | 'settings';
interface AdminSidebarProps {
  activeSection: AdminSectionId;
  setActiveSection: (section: AdminSectionId) => void;
  lang: 'ar' | 'en';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export function AdminSidebar({
  activeSection,
  setActiveSection,
  lang,
  isOpen
}: AdminSidebarProps) {
  const isRTL = lang === 'ar';
  const menuItems = [{
    id: 'users',
    icon: Users,
    labelAr: 'إدارة المستخدمين',
    labelEn: 'User Management'
  }, {
    id: 'link',
    icon: Link,
    labelAr: 'ربط ولي الأمر',
    labelEn: 'Link Parent-Student'
  }, {
    id: 'academic',
    icon: BookOpen,
    labelAr: 'الإعداد الأكاديمي',
    labelEn: 'Academic Setup'
  }, {
    id: 'schedule',
    icon: Calendar,
    labelAr: 'إدارة الجدول',
    labelEn: 'Schedule Management'
  }, {
    id: 'reports',
    icon: BarChart2,
    labelAr: 'التقارير',
    labelEn: 'Reports & Monitoring'
  }, {
    id: 'notifications',
    icon: Bell,
    labelAr: 'الإشعارات',
    labelEn: 'Notifications'
  }, {
    id: 'settings',
    icon: Settings,
    labelAr: 'الإعدادات',
    labelEn: 'Settings'
  }] as const;
  return <aside className={`
        fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-20 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:shadow-none shadow-xl
      `}>
      <div className="p-0 h-10 sm:h-16 md:h-24 lg:h-32 flex items-center justify-center border-b border-slate-800">
        <div className="flex items-center">
          <img src="/Logo.png" alt="Admin - ابناؤنا" className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain rounded-md" />
        </div>
      </div>

      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
        {menuItems.map(item => {
        const isActive = activeSection === item.id;
        return <button key={item.id} onClick={() => setActiveSection(item.id)} className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}
              `}>
              <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
              <span className="font-medium text-sm">
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </span>
            </button>;
      })}
      </nav>
    </aside>;
}