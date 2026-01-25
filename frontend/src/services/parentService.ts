import api from './api';
import {
    ChildResponse,
    StudentScheduleResponse,
    StudentHomeworkResponse,
    StudentExamResponse,
    StudentAttendanceResponse,
    AttendanceSummary,
    NotificationResponse
} from '../types/api';

export const parentService = {
    // Children
    getChildren: async (): Promise<ChildResponse[]> => {
        const response = await api.get('/parent/children');
        return response.data;
    },
    getChild: async (childId: number): Promise<ChildResponse> => {
        const response = await api.get(`/parent/children/${childId}`);
        return response.data;
    },

    // Child Schedule
    getChildSchedule: async (childId: number): Promise<StudentScheduleResponse[]> => {
        const response = await api.get(`/parent/children/${childId}/schedule`);
        return response.data;
    },
    getAllChildrenSchedule: async (): Promise<StudentScheduleResponse[]> => {
        const response = await api.get('/parent/children/schedule');
        return response.data;
    },

    // Child Homework
    getChildHomework: async (childId: number): Promise<StudentHomeworkResponse[]> => {
        const response = await api.get(`/parent/children/${childId}/homework`);
        return response.data;
    },

    // Child Exams
    getChildExams: async (childId: number): Promise<StudentExamResponse[]> => {
        const response = await api.get(`/parent/children/${childId}/exams`);
        return response.data;
    },

    // Child Attendance
    getChildAttendance: async (childId: number): Promise<StudentAttendanceResponse[]> => {
        const response = await api.get(`/parent/children/${childId}/attendance`);
        return response.data;
    },
    getChildAttendanceSummary: async (childId: number): Promise<AttendanceSummary> => {
        const response = await api.get(`/parent/children/${childId}/attendance/summary`);
        return response.data;
    },

    // Notifications
    getNotifications: async (): Promise<NotificationResponse[]> => {
        const response = await api.get('/parent/notifications');
        return response.data;
    },
    markNotificationRead: async (id: number): Promise<NotificationResponse> => {
        const response = await api.put(`/parent/notifications/${id}/read`);
        return response.data;
    },
    getUnreadCount: async (): Promise<number> => {
        const response = await api.get('/parent/notifications/unread-count');
        return response.data;
    },

    // Exam Solution
    getExamSolution: async (executionId: number): Promise<any> => {
        const response = await api.get(`/parent/exams/solution/${executionId}`);
        return response.data;
    },
};
