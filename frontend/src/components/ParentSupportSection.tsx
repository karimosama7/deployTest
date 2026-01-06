import React from 'react';
import { MessageCircle, Mail, ChevronDown, HelpCircle } from 'lucide-react';
interface ParentSupportSectionProps {
  lang: 'ar' | 'en';
}
export function ParentSupportSection({
  lang
}: ParentSupportSectionProps) {
  const isRTL = lang === 'ar';
  const faqs = [{
    qAr: 'كيف يمكنني متابعة درجات ابني؟',
    qEn: "How can I track my son's grades?",
    aAr: 'يمكنك متابعة الدرجات من خلال قسم التقارير الشهرية في القائمة الجانبية.',
    aEn: 'You can track grades through the Monthly Reports section in the sidebar.'
  }, {
    qAr: 'هل التقييمات رسمية؟',
    qEn: 'Are the evaluations official?',
    aAr: 'لا، جميع التقييمات داخل المنصة لأغراض تدريبية واسترشادية فقط.',
    aEn: 'No, all evaluations on the platform are for training and guidance purposes only.'
  }, {
    qAr: 'كيف أتواصل مع المدرس؟',
    qEn: 'How do I contact the teacher?',
    aAr: 'يمكنك استخدام قسم التواصل لإرسال رسائل للمدرسين أو الإدارة.',
    aEn: 'You can use the Communication section to send messages to teachers or administration.'
  }];
  return <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'ar' ? 'مركز الدعم والمساعدة' : 'Support Center'}
        </h2>
        <p className="text-slate-500">
          {lang === 'ar' ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?'}
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="#" className="flex items-center gap-4 p-6 bg-white rounded-xl border border-slate-200 hover:border-green-400 hover:shadow-md transition-all group">
          <div className="p-3 bg-green-50 text-green-600 rounded-full group-hover:scale-110 transition-transform">
            <MessageCircle size={24} />
          </div>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="font-bold text-slate-800">
              {lang === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
            </h3>
            <p className="text-sm text-slate-500">
              {lang === 'ar' ? 'رد فوري 24/7' : 'Instant reply 24/7'}
            </p>
          </div>
        </a>

        <a href="#" className="flex items-center gap-4 p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full group-hover:scale-110 transition-transform">
            <Mail size={24} />
          </div>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="font-bold text-slate-800">
              {lang === 'ar' ? 'إرسال استفسار' : 'Send Inquiry'}
            </h3>
            <p className="text-sm text-slate-500">
              {lang === 'ar' ? 'الرد خلال 24 ساعة' : 'Reply within 24h'}
            </p>
          </div>
        </a>
      </div>

      {/* FAQ */}
      <div className="space-y-4">
        <h3 className={`text-lg font-bold text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
          {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, index) => <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button className="w-full p-4 flex items-center justify-between text-slate-800 font-medium hover:bg-slate-50 transition-colors">
                <span className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  {lang === 'ar' ? faq.qAr : faq.qEn}
                </span>
                <ChevronDown size={18} className="text-slate-400" />
              </button>
              <div className={`px-4 pb-4 text-sm text-slate-500 ${isRTL ? 'text-right' : 'text-left'}`}>
                {lang === 'ar' ? faq.aAr : faq.aEn}
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}