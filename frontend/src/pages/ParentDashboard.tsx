import React, { useState, Children } from 'react';
import { ParentSidebar, ParentSectionId } from '../components/ParentSidebar';
import { ParentHeader } from '../components/ParentHeader';
import { Footer } from '../components/Footer';
import { MyChildrenSection } from '../components/MyChildrenSection';
import { ChildOverviewSection } from '../components/ChildOverviewSection';
import { MonthlyReportsSection } from '../components/MonthlyReportsSection';
import { SubjectProgressSection } from '../components/SubjectProgressSection';
import { NotificationsSection } from '../components/NotificationsSection';
import { ParentCommunicationSection } from '../components/ParentCommunicationSection';
import { ParentSupportSection } from '../components/ParentSupportSection';
import { Menu, ArrowLeft, ArrowRight } from 'lucide-react';
export function ParentDashboard() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeSection, setActiveSection] = useState<ParentSectionId>('children');
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const isRTL = lang === 'ar';
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const handleSelectChild = (childId: number) => {
    setSelectedChildId(childId);
    // When a child is selected, we could show the reports/progress for that child
    // For this demo, we'll stay on the children view but show the overview
  };
  const handleBackToChildren = () => {
    setSelectedChildId(null);
  };
  const renderContent = () => {
    // If a child is selected and we are in the 'children' section, show detailed view
    if (activeSection === 'children' && selectedChildId) {
      return <div className="space-y-8 animate-fade-in">
          <button onClick={handleBackToChildren} className={`flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <BackArrow size={20} />
            <span className="font-medium">
              {lang === 'ar' ? 'العودة للقائمة' : 'Back to List'}
            </span>
          </button>

          <ChildOverviewSection lang={lang} childId={selectedChildId} />
          <MonthlyReportsSection lang={lang} />
          <SubjectProgressSection lang={lang} />
        </div>;
    }
    switch (activeSection) {
      case 'children':
        return <MyChildrenSection lang={lang} onSelectChild={handleSelectChild} />;
      case 'reports':
        return <MonthlyReportsSection lang={lang} />;
      case 'progress':
        return <SubjectProgressSection lang={lang} />;
      case 'notifications':
        return <NotificationsSection lang={lang} />;
      case 'communication':
        return <ParentCommunicationSection lang={lang} />;
      case 'support':
        return <ParentSupportSection lang={lang} />;
      default:
        return <MyChildrenSection lang={lang} onSelectChild={handleSelectChild} />;
    }
  };
  const footerTextAr = 'جميع التقارير والتقييمات داخل المنصة لأغراض تعليمية وتدريبية فقط ولا تُعد تقييمات رسمية.';
  const footerTextEn = 'All reports and evaluations are for educational and training purposes only and are not official.';
  return <div className={`min-h-screen bg-slate-50 flex ${lang === 'ar' ? 'dir-rtl' : 'dir-ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/20 z-10 lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <ParentSidebar activeSection={activeSection} setActiveSection={section => {
      setActiveSection(section);
      setIsSidebarOpen(false);
      if (section !== 'children') setSelectedChildId(null);
    }} lang={lang} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <ParentHeader lang={lang} setLang={setLang} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

        <button className={`lg:hidden absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} z-20 p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600`} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={20} />
        </button>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto min-h-full flex flex-col">
            <div className="flex-1">{renderContent()}</div>
            <Footer lang={lang} customTextAr={footerTextAr} customTextEn={footerTextEn} />
          </div>
        </main>
      </div>
    </div>;
}