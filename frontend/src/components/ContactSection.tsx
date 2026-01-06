import React from 'react';
import { Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react';
interface ContactSectionProps {
  lang: 'ar' | 'en';
}
export function ContactSection({
  lang
}: ContactSectionProps) {
  const isRTL = lang === 'ar';
  return <div className="max-w-2xl mx-auto space-y-8">
      <div className={`text-center space-y-2`}>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'ar' ? 'تواصل معنا' : 'Contact Support'}
        </h2>
        <p className="text-slate-500">
          {lang === 'ar' ? 'نحن هنا لمساعدتك في أي وقت. اختر وسيلة التواصل المناسبة لك.' : 'We are here to help anytime. Choose your preferred contact method.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="#" className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Phone size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">
            {lang === 'ar' ? 'اتصل بنا' : 'Call Us'}
          </h3>
          <p className="text-slate-500 text-sm">+1 234 567 890</p>
        </a>

        <a href="#" className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">
            {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
          </h3>
          <p className="text-slate-500 text-sm">Chat Support</p>
        </a>

        <a href="#" className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">
            {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Us'}
          </h3>
          <p className="text-slate-500 text-sm">support@school.edu</p>
        </a>

        <a href="#" className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <HelpCircle size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">
            {lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}
          </h3>
          <p className="text-slate-500 text-sm">
            {lang === 'ar' ? 'مركز المساعدة' : 'Help Center'}
          </p>
        </a>
      </div>
    </div>;
}