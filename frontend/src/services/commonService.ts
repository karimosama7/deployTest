import api from './api';
import { Grade, Subject } from '../types/api';

/**
 * Service for common read-only endpoints accessible by any authenticated user
 */
export const commonService = {
    getGrades: async (): Promise<Grade[]> => {
        const response = await api.get('/common/grades');
        return response.data;
    },
    getSubjects: async (): Promise<Subject[]> => {
        const response = await api.get('/common/subjects');
        return response.data;
    }
};
