import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth, UserRole } from '../context/AuthContext';
import { LoginPage } from '../pages/auth/LoginPage';
import { AdminLayout } from '../components/layout/AdminLayout';
import { StudentLayout } from '../components/layout/StudentLayout';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { UsersPage } from '../pages/admin/UsersPage';
import { CreateUserPage } from '../pages/admin/CreateUserPage';
import { GradesPage } from '../pages/admin/GradesPage';

interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <div className="p-4 text-red-600">Unauthorized Access. You need to be: {allowedRoles.join(', ')}</div>;
    }

    return <Outlet />;
};

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
                <Route path="/student" element={<StudentLayout />}>
                    <Route index element={<StudentDashboard />} />
                    <Route path="classes" element={<div>Classes Page (Coming Soon)</div>} />
                    <Route path="homework" element={<div>Homework Page (Coming Soon)</div>} />
                    <Route path="exams" element={<div>Exams Page (Coming Soon)</div>} />
                </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/create" element={<CreateUserPage />} />
                    <Route path="teachers" element={<UsersPage roleFilter="TEACHER" />} />
                    <Route path="students" element={<UsersPage roleFilter="STUDENT" />} />
                    <Route path="grades" element={<GradesPage />} />
                </Route>
            </Route>

            {/* Placeholder for other roles */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<div>General Dashboard</div>} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};
