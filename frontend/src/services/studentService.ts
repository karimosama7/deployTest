import api from './api';
import { HomeworkSubmissionResponse } from '../types/api';

export const studentService = {
    submitHomework: async (homeworkId: number, solutionUrl: string): Promise<HomeworkSubmissionResponse> => {
        const response = await api.post(`/student/homework/${homeworkId}/submit`, { solutionUrl });
        return response.data;
    }
};
