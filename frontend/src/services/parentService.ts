import api from './api';
import { 
    ChildResponse, 
    StudentScheduleResponse, 
    StudentHomeworkResponse, 
    StudentExamResponse, 
    StudentAttendanceResponse,
    AttendanceSummary 
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
};
