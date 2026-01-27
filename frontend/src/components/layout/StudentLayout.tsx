import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, BarChart2, X, Menu, LogOut, Video } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

const StudentSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navigation = [
        { name: 'الرئيسية', href: '/student', icon: Home },
        { name: 'فصولي', href: '/student/classes', icon: Video },
        { name: 'واجباتي', href: '/student/homework', icon: FileText },
        { name: 'اختباراتي', href: '/student/exams', icon: BarChart2 },
    ];

    return (
        <>
            <div className={cn("fixed inset-0 z-40 flex md:hidden", isOpen ? "visible" : "invisible")}>
                <div className={cn("fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity", isOpen ? "opacity-100" : "opacity-0")} onClick={onClose} />
                <div className={cn("relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition duration-300", isOpen ? "translate-x-0" : "translate-x-full")}>
                    <div className="absolute top-0 left-0 -ml-12 pt-2">
                        <button className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={onClose}>
                            <X className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <img src={Logo} alt="Abnaouna Logo" className="h-14 w-auto" />
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.href}
                                    to={item.href}
                                    end={item.href === '/student'}
                                    className={({ isActive }) => cn(isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-base font-medium rounded-md')}
                                    onClick={onClose}
                                >
                                    <item.icon className={cn('ml-4 h-6 w-6 flex-shrink-0', 'text-gray-400 group-hover:text-gray-500')} aria-hidden="true" />
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
                <div className="flex-shrink-0 w-14" aria-hidden="true" />
            </div>

            <div className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 md:right-0 z-30">
                <div className="flex-1 flex flex-col min-h-0 border-l border-gray-200 bg-white">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <img src={Logo} alt="Abnaouna Logo" className="h-12 w-auto" />
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.href}
                                    to={item.href}
                                    end={item.href === '/student'}
                                    className={({ isActive }) => cn(isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md')}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon className={cn(isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500', 'ml-3 h-6 w-6 flex-shrink-0')} aria-hidden="true" />
                                            {item.name}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user?.fullName}</p>
                                <p className="text-xs font-medium text-gray-500">طالب</p>
                            </div>
                        </div>
                        <button onClick={() => { logout(); navigate('/login'); }} className="p-1 text-gray-400 hover:text-red-500 transition-colors" title="تسجيل الخروج">
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const StudentLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex flex-col w-0 flex-1 overflow-hidden md:mr-56">
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow md:hidden">
                    <button type="button" className="px-4 border-l border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex"></div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <button onClick={() => { logout(); navigate('/login'); }} className="p-1 text-gray-400 hover:text-red-500">
                                <LogOut className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>

                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
