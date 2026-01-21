import api from './api';
import {
    HomeworkSubmissionResponse,
    StudentScheduleResponse,
    StudentHomeworkResponse,
    StudentExamResponse,
    StudentAttendanceResponse,
    AttendanceSummary
} from '../types/api';

export const studentService = {
    // Schedule
    getSchedule: async (): Promise<StudentScheduleResponse[]> => {
        const response = await api.get('/student/schedule');
        return response.data;
    },
    joinSession: async (sessionId: number): Promise<void> => {
        await api.post(`/student/sessions/${sessionId}/join`);
    },

    // Homework
    getHomework: async (): Promise<StudentHomeworkResponse[]> => {
        const response = await api.get('/student/homework');
        return response.data;
    },
    submitHomework: async (homeworkId: number, solutionUrl: string): Promise<HomeworkSubmissionResponse> => {
        const response = await api.post(`/student/homework/${homeworkId}/submit`, { homeworkId, solutionUrl });
        return response.data;
    },

    // Exams
    getExams: async (): Promise<StudentExamResponse[]> => {
        const response = await api.get('/student/exams');
        return response.data;
    },

    // Attendance
    getAttendance: async (): Promise<StudentAttendanceResponse[]> => {
        const response = await api.get('/student/attendance');
        return response.data;
    },
    getAttendanceSummary: async (): Promise<AttendanceSummary> => {
        const response = await api.get('/student/attendance/summary');
        return response.data;
    },
};

