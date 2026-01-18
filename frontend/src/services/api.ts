import axios from 'axios';

// Environment variable for API URL or default to localhost
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor (Add Token)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor (Handle Errors like 401)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login or clear token)
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // We could trigger a global event or use context here if needed, 
            // but for now let the routing logic handle the redirect on next nav.
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;

// --- Interfaces ---

export interface ClassSession {
    id: number;
    subject: string;
    grade: string;
    date: string;
    time: string;
    duration: string;
    students: number;
    link: string;
}

export interface Homework {
    id: number;
    title: string;
    subject: string;
    grade: string;
    dueDate: string;
    time: string;
    submitted: number;
    total: number;
    status: 'active' | 'closed';
    description?: string; // Added optional
    pdfLink?: string; // Added optional
}

export interface Exam {
    id: number;
    title: string;
    subject: string;
    grade: string;
    date: string;
    duration: string;
    status: 'upcoming' | 'completed';
    formLink: string;
}

// --- Teacher Service (Mock Implementation) ---
// In a real scenario, these would make API calls using 'api.get', 'api.post', etc.

const MOCK_DELAY = 800; // Simulate network latency

const MOCK_CLASSES: ClassSession[] = [
    { id: 1, subject: 'الرياضيات', grade: 'الصف الرابع', date: '2026-01-15', time: '09:00', duration: '45', students: 28, link: 'https://teams.microsoft.com/...' },
    { id: 2, subject: 'الرياضيات', grade: 'الصف الخامس', date: '2026-01-15', time: '11:00', duration: '60', students: 30, link: 'https://teams.microsoft.com/...' },
    { id: 3, subject: 'الرياضيات', grade: 'الصف الرابع', date: '2026-01-16', time: '09:00', duration: '45', students: 28, link: 'https://teams.microsoft.com/...' },
];

const MOCK_HOMEWORK: Homework[] = [
    { id: 1, title: 'واجب الرياضيات #5 - الجبر', subject: 'الرياضيات', grade: 'الصف الرابع', dueDate: '2026-01-20', time: '23:59', submitted: 15, total: 28, status: 'active' },
    { id: 2, title: 'نشاط العلوم - دورة حياة النبات', subject: 'العلوم', grade: 'الصف الخامس', dueDate: '2026-01-18', time: '23:59', submitted: 20, total: 30, status: 'active' },
    { id: 3, title: 'واجب اللغة العربية - النحو', subject: 'اللغة العربية', grade: 'الصف الرابع', dueDate: '2026-01-14', time: '23:59', submitted: 25, total: 28, status: 'closed' },
];

const MOCK_EXAMS: Exam[] = [
    { id: 1, title: 'اختبار منتصف الفصل - الرياضيات', subject: 'الرياضيات', grade: 'الصف الرابع', date: '2026-02-15', duration: '60', status: 'upcoming', formLink: 'https://docs.google.com/forms/...' },
    { id: 2, title: 'اختبار قصير - العلوم', subject: 'العلوم', grade: 'الصف الخامس', date: '2026-01-10', duration: '30', status: 'completed', formLink: 'https://docs.google.com/forms/...' },
];

export const TeacherService = {
    // Classes
    getClasses: async (): Promise<ClassSession[]> => {
        return new Promise((resolve) => setTimeout(() => resolve([...MOCK_CLASSES]), MOCK_DELAY));
    },
    createClass: async (data: Omit<ClassSession, 'id' | 'students'>): Promise<ClassSession> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newClass = { ...data, id: Date.now(), students: 0 };
                MOCK_CLASSES.push(newClass);
                resolve(newClass);
            }, MOCK_DELAY);
        });
    },

    // Homework
    getHomeworks: async (): Promise<Homework[]> => {
        return new Promise((resolve) => setTimeout(() => resolve([...MOCK_HOMEWORK]), MOCK_DELAY));
    },
    createHomework: async (data: Omit<Homework, 'id' | 'submitted' | 'total' | 'status'>): Promise<Homework> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newHomework: Homework = {
                    ...data,
                    id: Date.now(),
                    submitted: 0,
                    total: 30, // Mock total
                    status: 'active'
                };
                MOCK_HOMEWORK.unshift(newHomework);
                resolve(newHomework);
            }, MOCK_DELAY);
        });
    },

    // Exams
    getExams: async (): Promise<Exam[]> => {
        return new Promise((resolve) => setTimeout(() => resolve([...MOCK_EXAMS]), MOCK_DELAY));
    },
    createExam: async (data: Omit<Exam, 'id' | 'status'>): Promise<Exam> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newExam: Exam = { ...data, id: Date.now(), status: 'upcoming' };
                MOCK_EXAMS.unshift(newExam);
                resolve(newExam);
            }, MOCK_DELAY);
        });
    }
};
