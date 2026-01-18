// Types matching backend DTOs exactly

// ==================== Grades & Subjects ====================

export interface Grade {
    id: number;
    name: string;
    level: number;
}

export interface Subject {
    id: number;
    name: string;
    nameAr: string;
}

// ==================== Class Sessions ====================

export interface ClassSessionRequest {
    gradeId: number;
    subjectId: number;
    title: string;
    description?: string;
    scheduledTime: string; // ISO format: "2026-01-15T10:00:00"
    teamsMeetingUrl?: string;
}

export interface ClassSessionResponse {
    id: number;
    title: string;
    description?: string;
    scheduledTime: string;
    teamsMeetingUrl?: string;
    teamsRecordingUrl?: string;
    status: 'SCHEDULED' | 'LIVE' | 'COMPLETED';
    createdAt: string;
    gradeId: number;
    gradeName: string;
    subjectId: number;
    subjectName: string;
    teacherId: number;
    teacherName: string;
}

// ==================== Attendance ====================

export interface AttendanceRequest {
    studentAttendance: Record<number, boolean>; // { studentId: attended }
}

export interface AttendanceResponse {
    id: number;
    studentId: number;
    studentName: string;
    attended: boolean;
    markedAt: string;
}

// ==================== Homework ====================

export interface HomeworkRequest {
    classSessionId: number;
    title: string;
    description?: string;
    homeworkUrl?: string;
    dueDate: string; // ISO format
}

export interface HomeworkResponse {
    id: number;
    title: string;
    description?: string;
    homeworkUrl?: string;
    dueDate: string;
    createdAt: string;
    classSessionId: number;
    classTitle: string;
    subjectName: string;
    totalSubmissions: number;
    gradedSubmissions: number;
}

export interface HomeworkSubmissionRequest {
    homeworkId: number;
    solutionUrl: string;
}

export interface HomeworkSubmissionResponse {
    id: number;
    homeworkId: number;
    homeworkTitle: string;
    studentId: number;
    studentName: string;
    solutionUrl: string;
    submittedAt: string;
    status: 'PENDING' | 'SUBMITTED' | 'REVIEWED';
    isCompleted: boolean;
    grade?: number;
    feedback?: string;
}

// ==================== Exams ====================

export interface ExamRequest {
    classSessionId: number;
    title: string;
    formUrl?: string;
    examDate: string; // "YYYY-MM-DD"
}

export interface ExamResponse {
    id: number;
    title: string;
    formUrl?: string;
    examDate: string;
    createdAt: string;
    classSessionId: number;
    classTitle: string;
    subjectName: string;
    totalStudents: number;
    gradedStudents: number;
    averageGrade?: number;
    status?: 'UPCOMING' | 'COMPLETED'; // Derived from examDate on frontend
}

export interface ExamGradeRequest {
    studentGrades: Record<number, number>; // { studentId: grade }
}

export interface ExamResultResponse {
    id: number;
    examId: number;
    examTitle: string;
    studentId: number;
    studentName: string;
    grade?: number;
    status: 'PENDING' | 'COMPLETED' | 'LATE' | 'FAILED';
    submittedAt?: string;
    gradedAt?: string;
}

// ==================== Users ====================

export interface UserResponse {
    id: number;
    username: string;
    email?: string;
    phone?: string;
    fullName: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
    isActive: boolean;
    createdAt: string;
    generatedPassword?: string;
}

export interface CreateUserRequest {
    fullName: string;
    email?: string;
    phone?: string;
    role?: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
    subjectIds?: number[]; // For Teacher
    gradeId?: number; // For Student
    parentId?: number; // For Student
    childrenIds?: number[]; // For Parent
}
