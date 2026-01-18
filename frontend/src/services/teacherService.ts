import api from './api';
import {
    ClassSessionRequest,
    ClassSessionResponse,
    HomeworkRequest,
    HomeworkResponse,
    ExamRequest,
    ExamResponse,
    AttendanceResponse,
    HomeworkSubmissionResponse,
    ExamResultResponse
} from '../types/api';

export const teacherService = {
    // Classes
    getClasses: async (): Promise<ClassSessionResponse[]> => {
        const response = await api.get('/teacher/classes');
        return response.data;
    },
    getClassById: async (id: number): Promise<ClassSessionResponse> => {
        const response = await api.get(`/teacher/classes/${id}`);
        return response.data;
    },
    createClass: async (data: ClassSessionRequest): Promise<ClassSessionResponse> => {
        const response = await api.post('/teacher/classes', data);
        return response.data;
    },
    updateClass: async (id: number, data: ClassSessionRequest): Promise<ClassSessionResponse> => {
        const response = await api.put(`/teacher/classes/${id}`, data);
        return response.data;
    },
    deleteClass: async (id: number): Promise<void> => {
        await api.delete(`/teacher/classes/${id}`);
    },
    updateMeetingUrl: async (id: number, meetingUrl: string): Promise<ClassSessionResponse> => {
        const response = await api.put(`/teacher/classes/${id}/meeting-url`, { meetingUrl });
        return response.data;
    },
    updateRecordingUrl: async (id: number, recordingUrl: string): Promise<ClassSessionResponse> => {
        const response = await api.put(`/teacher/classes/${id}/recording-url`, { recordingUrl });
        return response.data;
    },

    // Attendance
    getEnrolledStudents: async (classId: number): Promise<any[]> => {
        const response = await api.get(`/teacher/classes/${classId}/students`);
        return response.data;
    },
    getClassAttendance: async (classId: number): Promise<AttendanceResponse[]> => {
        const response = await api.get(`/teacher/classes/${classId}/attendance`);
        return response.data;
    },
    markAttendance: async (classId: number, studentAttendance: Record<number, boolean>): Promise<AttendanceResponse[]> => {
        const response = await api.post(`/teacher/classes/${classId}/attendance`, { studentAttendance });
        return response.data;
    },

    // Homework
    getClassHomework: async (classId: number): Promise<HomeworkResponse[]> => {
        const response = await api.get(`/teacher/classes/${classId}/homework`);
        return response.data;
    },
    createHomework: async (data: HomeworkRequest): Promise<HomeworkResponse> => {
        const response = await api.post('/teacher/homework', data);
        return response.data;
    },
    updateHomework: async (id: number, data: HomeworkRequest): Promise<HomeworkResponse> => {
        const response = await api.put(`/teacher/homework/${id}`, data);
        return response.data;
    },
    deleteHomework: async (id: number): Promise<void> => {
        await api.delete(`/teacher/homework/${id}`);
    },
    getHomeworkSubmissions: async (homeworkId: number): Promise<HomeworkSubmissionResponse[]> => {
        const response = await api.get(`/teacher/homework/${homeworkId}/submissions`);
        return response.data;
    },
    gradeSubmission: async (submissionId: number, grade: number, feedback: string): Promise<HomeworkSubmissionResponse> => {
        const response = await api.put(`/teacher/submissions/${submissionId}/grade`, { grade, feedback });
        return response.data;
    },

    // Exams
    getClassExams: async (classId: number): Promise<ExamResponse[]> => {
        const response = await api.get(`/teacher/classes/${classId}/exams`);
        return response.data;
    },
    createExam: async (data: ExamRequest): Promise<ExamResponse> => {
        const response = await api.post('/teacher/exams', data);
        return response.data;
    },
    updateExam: async (id: number, data: ExamRequest): Promise<ExamResponse> => {
        const response = await api.put(`/teacher/exams/${id}`, data);
        return response.data;
    },
    deleteExam: async (id: number): Promise<void> => {
        await api.delete(`/teacher/exams/${id}`);
    },
    getExamResults: async (examId: number): Promise<ExamResultResponse[]> => {
        const response = await api.get(`/teacher/exams/${examId}/results`);
        return response.data;
    },
    enterGrades: async (examId: number, studentGrades: Record<number, number>): Promise<ExamResultResponse[]> => {
        const response = await api.post(`/teacher/exams/${examId}/grades`, { studentGrades });
        return response.data;
    }
};
