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
import { ExamTakerPage } from '../pages/student/ExamTakerPage';
import { ExamResultPage } from '../pages/student/ExamResultPage';
import { UsersPage } from '../pages/admin/UsersPage';
import { CreateUserPage } from '../pages/admin/CreateUserPage';
import { StudentReportPage } from '../pages/admin/StudentReportPage';
import { GradesPage } from '../pages/admin/GradesPage';
import { TeacherLayout } from '../components/layout/TeacherLayout';
import { TeacherDashboard } from '../pages/teacher/TeacherDashboard';
import { TeacherClassesPage } from '../pages/teacher/ClassesPage';
import { TeacherHomeworkPage } from '../pages/teacher/HomeworkPage';
import { TeacherExamsPage } from '../pages/teacher/ExamsPage';
import { TeacherExamEditor } from '../pages/teacher/TeacherExamEditor';
import { TeacherExamResultsPage } from '../pages/teacher/TeacherExamResultsPage';
import { TeacherExamSolutionPage } from '../pages/teacher/TeacherExamSolutionPage';
import { ParentLayout } from '../components/layout/ParentLayout';
import { ParentDashboard } from '../pages/parent/ParentDashboard';
import { ParentChildrenPage } from '../pages/parent/ParentChildrenPage';
import { ChildDetailPage } from '../pages/parent/ChildDetailPage';
import { ParentExamSolutionPage } from '../pages/parent/ParentExamSolutionPage';

interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If user has wrong role, redirect to their correct dashboard
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        const roleRedirects: Record<string, string> = {
            'ADMIN': '/admin',
            'TEACHER': '/teacher',
            'STUDENT': '/student',
            'PARENT': '/parent'
        };
        const targetPath = roleRedirects[user.role] || '/login';
        return <Navigate to={targetPath} replace />;
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
                <Route path="student" element={<StudentLayout />}>
                    <Route index element={<StudentDashboard />} />
                    <Route path="classes" element={<ClassesPage />} />
                    <Route path="homework" element={<HomeworkPage />} />
                    <Route path="exams" element={<ExamsPage />} />
                </Route>
                <Route path="/student/exam/:examId/take" element={<ExamTakerPage />} />
                <Route path="/student/exam/:examId/result" element={<ExamResultPage />} />
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
                    <Route path="parents" element={<UsersPage roleFilter="PARENT" />} />
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
                    <Route path="exams/new" element={<TeacherExamEditor />} />
                    <Route path="exams/:examId/results" element={<TeacherExamResultsPage />} />
                    <Route path="exams/solution/:executionId" element={<TeacherExamSolutionPage />} />
                </Route>
            </Route>

            {/* Parent Routes */}
            <Route element={<ProtectedRoute allowedRoles={['PARENT']} />}>
                <Route path="/parent" element={<ParentLayout />}>
                    <Route index element={<ParentDashboard />} />
                    <Route path="children" element={<ParentChildrenPage />} />
                    <Route path="children/:childId" element={<ChildDetailPage />} />
                    <Route path="exams/solution/:executionId" element={<ParentExamSolutionPage />} />

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
