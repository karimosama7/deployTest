import React from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
                type="button"
                className="px-4 border-l border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={onMenuClick}
            >
                <span className="sr-only">فتح القائمة</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex-1 px-4 flex justify-between">
                <div className="flex-1 flex">
                    {/* Search bar could go here */}
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                    <button
                        type="button"
                        className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="sr-only">عرض الإشعارات</span>
                        <Bell className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <div className="ml-3 relative flex items-center gap-4">
                        <span className="hidden md:block text-sm font-medium text-gray-700">
                            {user?.fullName}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="p-1 text-gray-400 hover:text-red-500"
                            title="تسجيل خروج"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
