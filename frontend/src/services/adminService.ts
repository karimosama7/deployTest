import api from './api';
import { Grade, Subject, UserResponse, CreateUserRequest, StudentReportResponse } from '../types/api';

export const adminService = {
    // Grades
    getGrades: async (): Promise<Grade[]> => {
        const response = await api.get('/admin/grades');
        return response.data;
    },
    createGrade: async (name: string, level: number): Promise<Grade> => {
        const response = await api.post('/admin/grades', { name, level });
        return response.data;
    },
    updateGrade: async (id: number, name: string, level: number): Promise<Grade> => {
        const response = await api.put(`/admin/grades/${id}`, { name, level });
        return response.data;
    },
    deleteGrade: async (id: number): Promise<void> => {
        await api.delete(`/admin/grades/${id}`);
    },

    // Subjects
    getSubjects: async (): Promise<Subject[]> => {
        const response = await api.get('/admin/subjects');
        return response.data;
    },
    createSubject: async (name: string, nameAr: string): Promise<Subject> => {
        const response = await api.post('/admin/subjects', { name, nameAr });
        return response.data;
    },

    // Users
    getUsers: async (): Promise<UserResponse[]> => {
        const response = await api.get('/admin/users');
        return response.data;
    },
    getUsersByRole: async (role: string): Promise<UserResponse[]> => {
        const response = await api.get(`/admin/users/role/${role}`);
        return response.data;
    },
    getTeachers: async (): Promise<UserResponse[]> => {
        const response = await api.get('/admin/teachers');
        return response.data;
    },
    getStudents: async (): Promise<UserResponse[]> => {
        const response = await api.get('/admin/students');
        return response.data;
    },
    getParents: async (): Promise<UserResponse[]> => {
        const response = await api.get('/admin/parents');
        return response.data;
    },
    createTeacher: async (data: CreateUserRequest): Promise<UserResponse> => {
        const response = await api.post('/admin/teachers', data);
        return response.data;
    },
    createStudent: async (data: CreateUserRequest): Promise<UserResponse> => {
        const response = await api.post('/admin/students', data);
        return response.data;
    },
    createParent: async (data: CreateUserRequest): Promise<UserResponse> => {
        const response = await api.post('/admin/parents', data);
        return response.data;
    },
    activateUser: async (userId: number, active: boolean): Promise<UserResponse> => {
        const response = await api.put(`/admin/users/${userId}/activate?active=${active}`);
        return response.data;
    },
    resetPassword: async (userId: number): Promise<UserResponse> => {
        const response = await api.put(`/admin/users/${userId}/reset-password`);
        return response.data;
    },
    deleteUser: async (userId: number): Promise<void> => {
        await api.delete(`/admin/users/${userId}`);
    },

    // Stats
    getStudentsPerGrade: async (): Promise<Record<string, number>> => {
        const response = await api.get('/admin/stats/students-per-grade');
        return response.data;
    },

    // Student-Parent Linking
    assignChildrenToParent: async (parentId: number, childIds: number[]): Promise<void> => {
        await api.post(`/admin/parents/${parentId}/children`, { childIds });
    },
    removeChildFromParent: async (parentId: number, childId: number): Promise<void> => {
        await api.delete(`/admin/parents/${parentId}/children/${childId}`);
    },

    // Student Search & Reports
    searchStudents: async (query?: string, gradeId?: number): Promise<UserResponse[]> => {
        const params = new URLSearchParams();
        if (query) params.append('query', query);
        if (gradeId) params.append('gradeId', gradeId.toString());
        const response = await api.get(`/admin/students/search?${params.toString()}`);
        return response.data;
    },
    getStudentReport: async (studentId: number): Promise<StudentReportResponse> => {
        const response = await api.get(`/admin/students/${studentId}/report`);
        return response.data;
    },
};

