import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginHero from '../../assets/login-hero.png';
import Logo from '../../assets/Logo.png';
import { motion } from 'framer-motion';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
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
            if (from && from !== '/' && from !== '/login') {
                targetPath = from;
            }

            navigate(targetPath, { replace: true });
        }
    }, [isAuthenticated, user, navigate, location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ username, password }, rememberMe);
        } catch (err) {
            // Error handled in context
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden">
            {/* Left Side - Login Form */}
            <motion.div
                className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <motion.div
                        className="mb-10 flex justify-center"
                        variants={itemVariants}
                    >
                        <motion.img
                            src={Logo}
                            alt="Abnaouna Logo"
                            className="h-28 w-auto object-contain"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatType: "reverse"
                            }}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            مرحباً بك، تسجيل الدخول
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            من فضلك أدخل بيانات حسابك للمتابعة
                        </p>
                    </motion.div>

                    <div className="mt-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <motion.div variants={itemVariants}>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    label="البريد الإلكتروني أو اسم المستخدم"
                                    placeholder="name@example.com"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="كلمة المرور"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </motion.div>

                            {authError && (
                                <motion.div
                                    variants={itemVariants}
                                    className="rounded-md bg-red-50 p-4"
                                >
                                    <div className="flex">
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">
                                                خطأ في الدخول
                                            </h3>
                                            <div className="mt-2 text-sm text-red-700">
                                                <p>{authError}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Remember Me Checkbox */}
                            <motion.div variants={itemVariants} className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-700 cursor-pointer">
                                    تذكرني
                                </label>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    className="w-full justify-center py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors"
                                    isLoading={isLoading}
                                >
                                    تسجيل الدخول
                                </Button>
                            </motion.div>
                        </form>
                    </div>
                </div>
            </motion.div>

            {/* Right Side - Image */}
            <div className="hidden lg:block relative w-0 flex-1 bg-indigo-50">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-purple-200 opacity-30 blur-3xl mix-blend-multiply filter animate-blob"></div>
                <div className="absolute top-0 right-40 w-80 h-80 rounded-full bg-yellow-200 opacity-30 blur-3xl mix-blend-multiply filter animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 right-20 w-80 h-80 rounded-full bg-pink-200 opacity-30 blur-3xl mix-blend-multiply filter animate-blob animation-delay-4000"></div>

                <div className="absolute inset-0 h-full w-full flex items-center justify-center p-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-full max-w-2xl max-h-[800px] flex items-center justify-center"
                    >
                        {/* Floating Animation for the Hero Image */}
                        <motion.div
                            animate={{
                                y: [-15, 15, -15],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative w-full h-full bg-white/40 backdrop-blur-sm rounded-[3rem] shadow-2xl p-6 border border-white/50"
                        >
                            <img
                                className="w-full h-full object-contain drop-shadow-xl"
                                src={LoginHero}
                                alt="Abnaouna Login Hero"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
