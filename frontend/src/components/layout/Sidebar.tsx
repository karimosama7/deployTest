import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, BookOpen, GraduationCap, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/logo.png';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    const navigation = [
        { name: 'لوحة التحكم', href: '/admin', icon: Home },
        { name: 'المستخدمين', href: '/admin/users', icon: Users },
        { name: 'المعلمين', href: '/admin/teachers', icon: BookOpen },
        { name: 'الطلاب', href: '/admin/students', icon: GraduationCap },
        { name: 'الصفوف الدراسية', href: '/admin/grades', icon: BookOpen },
    ];

    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 z-40 flex md:hidden",
                    isOpen ? "visible" : "invisible"
                )}
            >
                <div
                    className={cn(
                        "fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear",
                        isOpen ? "opacity-100" : "opacity-0"
                    )}
                    onClick={onClose}
                />

                <div
                    className={cn(
                        "relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition duration-300 ease-in-out",
                        isOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <div className="absolute top-0 left-0 -ml-12 pt-2">
                        <button
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={onClose}
                        >
                            <X className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4 justify-center">
                            <img src={Logo} alt="Abnaouna" className="h-12 w-auto" />
                        </div>
                        <nav className="mt-8 px-2 space-y-1">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.href}
                                    to={item.href}
                                    end={item.href === '/admin'}
                                    className={({ isActive }) =>
                                        cn(
                                            isActive
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                        )
                                    }
                                    onClick={onClose}
                                >
                                    <item.icon
                                        className={cn(
                                            'ml-4 h-6 w-6 flex-shrink-0',
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="flex-shrink-0 w-14" aria-hidden="true" />
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 z-30">
                <div className="flex-1 flex flex-col min-h-0 border-l border-gray-200 bg-white">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 justify-center">
                            <img src={Logo} alt="Abnaouna" className="h-14 w-auto object-contain" />
                        </div>
                        <nav className="mt-8 flex-1 px-2 space-y-1">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.href}
                                    to={item.href}
                                    end={item.href === '/admin'}
                                    className={({ isActive }) =>
                                        cn(
                                            isActive
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
                                        )
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon
                                                className={cn(
                                                    isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500',
                                                    'ml-3 h-6 w-6 flex-shrink-0 transition-colors'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <div className="flex items-center w-full">
                            <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold ml-3">
                                {user?.fullName?.charAt(0) || 'A'}
                            </div>
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-medium text-gray-700 truncate">{user?.fullName}</p>
                                <p className="text-xs font-medium text-gray-500">
                                    {user?.role === 'ADMIN' ? 'مدير النظام' : user?.role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
