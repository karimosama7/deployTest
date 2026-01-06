import React from 'react';
interface FooterProps {
  lang: 'ar' | 'en';
  customTextAr?: string;
  customTextEn?: string;
}
export function Footer({
  lang,
  customTextAr,
  customTextEn
}: FooterProps) {
  const defaultTextAr = 'جميع التقييمات داخل المنصة لأغراض تدريبية فقط.';
  const defaultTextEn = 'All evaluations are for training purposes only.';
  return <footer className="mt-auto py-6 text-center border-t border-slate-100">
      <p className="text-xs text-slate-400 px-4">
        {lang === 'ar' ? customTextAr || defaultTextAr : customTextEn || defaultTextEn}
      </p>
    </footer>;
}