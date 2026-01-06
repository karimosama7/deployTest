import React from 'react';
import { Send, User, Shield } from 'lucide-react';
interface ParentCommunicationSectionProps {
  lang: 'ar' | 'en';
}
export function ParentCommunicationSection({
  lang
}: ParentCommunicationSectionProps) {
  const isRTL = lang === 'ar';
  const templates = [{
    ar: 'استفسار عن مستوى الطالب',
    en: 'Inquiry about student progress'
  }, {
    ar: 'طلب اجتماع مع المدرس',
    en: 'Request meeting with teacher'
  }, {
    ar: 'مشكلة تقنية في المنصة',
    en: 'Technical issue with platform'
  }];
  return <div className="max-w-4xl mx-auto h-[600px] bg-white rounded-xl shadow-sm border border-slate-200 flex overflow-hidden">
      {/* Sidebar List */}
      <div className="w-1/3 border-r border-slate-100 bg-slate-50 hidden md:flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h3 className={`font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
            {lang === 'ar' ? 'المحادثات' : 'Conversations'}
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 bg-white border-b border-slate-100 cursor-pointer hover:bg-slate-50">
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                <Shield size={20} />
              </div>
              <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h4 className="font-bold text-sm text-slate-800">
                  {lang === 'ar' ? 'إدارة المنصة' : 'Platform Admin'}
                </h4>
                <p className="text-xs text-slate-500 truncate">
                  {lang === 'ar' ? 'تم استلام طلبك...' : 'Request received...'}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 hover:bg-slate-100 cursor-pointer">
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="p-2 bg-slate-200 text-slate-600 rounded-full">
                <User size={20} />
              </div>
              <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h4 className="font-bold text-sm text-slate-800">
                  {lang === 'ar' ? 'أ. محمد (الرياضيات)' : 'Mr. Mohamed (Math)'}
                </h4>
                <p className="text-xs text-slate-500 truncate">
                  {lang === 'ar' ? 'مستوى أحمد ممتاز...' : 'Ahmed is doing great...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
              <Shield size={20} />
            </div>
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="font-bold text-slate-800">
                {lang === 'ar' ? 'إدارة المنصة' : 'Platform Admin'}
              </h3>
              <span className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                {lang === 'ar' ? 'متصل الآن' : 'Online'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
          <div className="flex justify-center">
            <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              Today
            </span>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm">
              {lang === 'ar' ? 'السلام عليكم، لدي استفسار بخصوص التقرير الشهري.' : 'Hello, I have a question about the monthly report.'}
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 text-slate-700 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm shadow-sm">
              {lang === 'ar' ? 'وعليكم السلام، أهلاً بك. تفضل بطرح استفسارك.' : 'Hello, welcome. Please go ahead with your question.'}
            </div>
          </div>
        </div>

        {/* Templates */}
        <div className="p-2 bg-white border-t border-slate-100 overflow-x-auto">
          <div className="flex gap-2">
            {templates.map((t, i) => <button key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-600 whitespace-nowrap hover:bg-slate-100">
                {lang === 'ar' ? t.ar : t.en}
              </button>)}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2">
            <input type="text" placeholder={lang === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'} className={`flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isRTL ? 'text-right' : 'text-left'}`} />
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>;
}