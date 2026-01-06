import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', alt = 'ابناؤنا' }) => {
  // Default responsive classes for option B (mobile 40px, sm 64px, md 96px, lg 128px)
  const responsiveCls = 'w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32';
  const cls = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-32 h-32' : responsiveCls;
  return <img src="/Logo.png" alt={alt} className={`${cls} object-contain rounded-lg`} />;
};

export default Logo;
