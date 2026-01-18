import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth, UserRole } from '../context/AuthContext';
import { LoginPage } from '../pages/auth/LoginPage';
import { LandingPage } from '../pages/LandingPage';
import { AdminLayout } from '../components/layout/AdminLayout';
import { StudentLayout } from '../components/layout/StudentLayout';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { ClassesPage } from '../pages/student/ClassesPage';
import { HomeworkPage } from '../pages/student/HomeworkPage';
import { ExamsPage } from '../pages/student/ExamsPage';
import { UsersPage } from '../pages/admin/UsersPage';
import { CreateUserPage } from '../pages/admin/CreateUserPage';
import { StudentReportPage } from '../pages/admin/StudentReportPage';
import { GradesPage } from '../pages/admin/GradesPage';
import { TeacherLayout } from '../components/layout/TeacherLayout';
import { TeacherDashboard } from '../pages/teacher/TeacherDashboard';
import { TeacherClassesPage } from '../pages/teacher/ClassesPage';
import { TeacherHomeworkPage } from '../pages/teacher/HomeworkPage';
import { TeacherExamsPage } from '../pages/teacher/ExamsPage';
import { ParentLayout } from '../components/layout/ParentLayout';
import { ParentDashboard } from '../pages/parent/ParentDashboard';
import { ParentChildrenPage } from '../pages/parent/ParentChildrenPage';

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
            <Route path="/" element={<LandingPage />} />

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
                <Route path="/student" element={<StudentLayout />}>
                    <Route index element={<StudentDashboard />} />
                    <Route path="classes" element={<ClassesPage />} />
                    <Route path="homework" element={<HomeworkPage />} />
                    <Route path="exams" element={<ExamsPage />} />
                </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/create" element={<CreateUserPage />} />
                    <Route path="reports/student" element={<StudentReportPage />} />
                    <Route path="teachers" element={<UsersPage roleFilter="TEACHER" />} />
                    <Route path="students" element={<UsersPage roleFilter="STUDENT" />} />
                    <Route path="grades" element={<GradesPage />} />
                </Route>
            </Route>

            {/* Teacher Routes */}
            <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
                <Route path="/teacher" element={<TeacherLayout />}>
                    <Route index element={<TeacherDashboard />} />
                    <Route path="classes" element={<TeacherClassesPage />} />
                    <Route path="homework" element={<TeacherHomeworkPage />} />
                    <Route path="exams" element={<TeacherExamsPage />} />
                </Route>
            </Route>

            {/* Parent Routes */}
            <Route element={<ProtectedRoute allowedRoles={['PARENT']} />}>
                <Route path="/parent" element={<ParentLayout />}>
                    <Route index element={<ParentDashboard />} />
                    <Route path="children" element={<ParentChildrenPage />} />
                    <Route path="reports" element={<div>Parent Reports Placeholder</div>} />
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
