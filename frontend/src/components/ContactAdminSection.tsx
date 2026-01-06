import React from 'react';
import { Send, MessageSquare, Headphones } from 'lucide-react';
interface ContactAdminSectionProps {
  lang: 'ar' | 'en';
}
export function ContactAdminSection({
  lang
}: ContactAdminSectionProps) {
  const isRTL = lang === 'ar';
  return <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 h-[calc(100vh-200px)] min-h-[500px]">
      {/* Sidebar / Options */}
      <div className="md:col-span-1 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-blue-300 transition-all ring-2 ring-blue-50 border-blue-200">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                {lang === 'ar' ? 'إرسال ملاحظات' : 'Send Feedback'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'ar' ? 'اقتراحات أو شكاوى' : 'Suggestions or complaints'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-blue-300 transition-all">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Headphones size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                {lang === 'ar' ? 'دعم تقني' : 'Technical Support'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'ar' ? 'مشاكل في المنصة' : 'Platform issues'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h3 className={`font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
            {lang === 'ar' ? 'محادثة مباشرة' : 'Live Chat'}
          </h3>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-700 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
              {lang === 'ar' ? 'مرحبًا بك، كيف يمكننا مساعدتك اليوم؟' : 'Hello, how can we help you today?'}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex gap-2">
            <input type="text" placeholder={lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message here...'} className={`flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isRTL ? 'text-right' : 'text-left'}`} />
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>;
}