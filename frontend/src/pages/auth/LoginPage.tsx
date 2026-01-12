import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useNavigate, useLocation } from 'react-router-dom';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error: authError, isLoading, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated && user) {
            const role = user.role;
            let targetPath = '/';

            if (role === 'ADMIN') targetPath = '/admin';
            else if (role === 'TEACHER') targetPath = '/teacher';
            else if (role === 'STUDENT') targetPath = '/student';
            else if (role === 'PARENT') targetPath = '/parent';

            const from = location.state?.from?.pathname;
            // Only use 'from' if it is not '/' (or handle '/' logic better)
            if (from && from !== '/' && from !== '/login') {
                targetPath = from;
            }

            navigate(targetPath, { replace: true });
        }
    }, [isAuthenticated, user, navigate, location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            // Redirection handled by useEffect
        } catch (err) {
            // Error handled in context
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    أبناؤنا
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    تسجيل الدخول إلى حسابك
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            label="اسم المستخدم"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            label="كلمة المرور"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {authError && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            فشل تسجيل الدخول
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            <p>{authError}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <Button
                                type="submit"
                                className="w-full"
                                isLoading={isLoading}
                            >
                                تسجيل الدخول
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    حسابات تجريبية
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-center text-gray-500" dir="ltr">
                            <div>admin / 123456</div>
                            <div>teacher / 123456</div>
                            <div>student / 123456</div>
                            <div>parent / 123456</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
