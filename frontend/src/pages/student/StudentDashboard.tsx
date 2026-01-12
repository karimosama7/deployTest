import React from 'react';
import { Card } from '../../components/common/Card';
import { Video, FileText, BarChart2, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        مرحباً، {user?.fullName} 👋
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        الصف السادس الابتدائي | باقة سنوي
                    </p>
                </div>
            </div>

            {/* Quick Stats / Tabs Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-md transition-shadow cursor-pointer bg-blue-50 border-blue-100">
                    <div className="flex items-center p-2">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                            <Video className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="mr-4">
                            <h3 className="text-lg font-medium text-blue-900">حصصي</h3>
                            <p className="text-sm text-blue-700">3 حصص اليوم</p>
                        </div>
                    </div>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer bg-green-50 border-green-100">
                    <div className="flex items-center p-2">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                            <FileText className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="mr-4">
                            <h3 className="text-lg font-medium text-green-900">واجباتي</h3>
                            <p className="text-sm text-green-700">2 واجب معلق</p>
                        </div>
                    </div>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer bg-purple-50 border-purple-100">
                    <div className="flex items-center p-2">
                        <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                            <BarChart2 className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="mr-4">
                            <h3 className="text-lg font-medium text-purple-900">اختباراتي</h3>
                            <p className="text-sm text-purple-700">آخر درجة: 18/20</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Upcoming Classes Section */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">الحصص القادمة (اليوم)</h3>
                    <span className="text-sm text-gray-500">{new Date().toLocaleDateString('ar-EG')}</span>
                </div>
                <div className="space-y-4">
                    {/* Mock Class Item */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-600 font-bold">M</span>
                            </div>
                            <div className="mr-4">
                                <h4 className="text-base font-bold text-gray-900">رياضيات (Math)</h4>
                                <p className="text-sm text-gray-500">أ. أحمد محمد | 4:00 عصراً</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none">
                            انضمام للكلاس 🔴
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 opacity-75">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-green-600 font-bold">S</span>
                            </div>
                            <div className="mr-4">
                                <h4 className="text-base font-bold text-gray-900">علوم (Science)</h4>
                                <p className="text-sm text-gray-500">أ. سارة علي | 5:30 عصراً</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                            قريباً
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    );
};
