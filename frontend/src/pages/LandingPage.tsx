
import React from 'react'
import { Hero } from '../components/landing/Hero'

import { Features } from '../components/landing/Features'
import { TeacherCredentials } from '../components/landing/TeacherCredentials'
import { PricingCards } from '../components/landing/PricingCards'

import { Footer } from '../components/landing/Footer'
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

import { ZigZagFeatures } from '../components/landing/ZigZagFeatures'

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white font-sans selection:bg-blue-500 selection:text-white"
    >
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm shadow-lg shadow-blue-500/20">
              تواصل معنا
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-gray-600 font-medium hover:text-gray-900 hidden md:block"
            >
              تسجيل الدخول
            </button>
          </div>

          <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
            <a href="#" className="hover:text-blue-600 transition-colors">
              الرئيسية
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              لماذا أبناؤنا
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              الفصول
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              المعلمون
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              الباقات
            </a>
          </div>


          <div className="flex items-center gap-2">
            <img src={Logo} alt="Abnaouna" className="w-24 h-24 object-contain" />
          </div>
        </div>
      </nav>

      <main className="bg-gradient-to-b from-white to-blue-50/30">
        <Hero />
        <ZigZagFeatures />
        {/* <TrustSignals /> Removed as per request */}
        <Features />
        {/* <ClassroomSection /> Removed as per request */}
        <TeacherCredentials />
        <PricingCards />
      </main>

      <Footer />
    </div>
  )
}