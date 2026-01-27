import React from 'react'
import { Mail, MessageCircle } from 'lucide-react'
import Logo from '../../assets/Logo.png';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-right">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6 justify-end">
                            <span className="text-2xl font-bold text-white">أبناؤنا</span>
                            <img src={Logo} alt="Abnaouna" className="w-8 h-8 object-contain bg-white rounded-md" />
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                            منصة تعليمية رائدة للطلاب المصريين في قطر، تهدف إلى تقديم تعليم
                            متميز يربط الطالب بهويته وثقافته المصرية.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">روابط سريعة</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="hover:text-blue-500 transition-colors">
                                    الرئيسية
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500 transition-colors">
                                    لماذا أبناؤنا
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500 transition-colors">
                                    المعلمون
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500 transition-colors">
                                    الباقات والأسعار
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">
                            الدعم والمساعدة
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="hover:text-blue-500 transition-colors">
                                    الأسئلة الشائعة
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500 transition-colors">
                                    شروط الاستخدام
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500 transition-colors">
                                    سياسة الخصوصية
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">تواصل معنا</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3 justify-end group cursor-pointer">
                                <a
                                    href="https://wa.me/201024047192"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="dir-ltr group-hover:text-white transition-colors flex items-center gap-3"
                                >
                                    <span>+20 10 24047192</span>
                                    <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center text-green-500 group-hover:bg-green-600 group-hover:text-white transition-all">
                                        <MessageCircle className="w-4 h-4" />
                                    </div>
                                </a>
                            </li>
                            <li className="flex items-center gap-3 justify-end group cursor-pointer">
                                <a
                                    href="mailto:karimosamaw7@gmail.com"
                                    className="flex items-center gap-3 group-hover:text-white transition-colors"
                                >
                                    <span>Abnaouna</span>
                                    <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>© 2024 أبناؤنا. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    )
}
