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

export interface ExamOptionRequest {
    text: string;
    imageUrl?: string;
    isCorrect: boolean;
}

export interface ExamQuestionRequest {
    text: string;
    imageUrl?: string;
    marks: number;
    questionType: 'MCQ';
    options: ExamOptionRequest[];
    sortOrder?: number;
}

export interface ExamRequest {
    subjectId: number;
    gradeId: number;
    title: string;
    durationMinutes: number;
    totalMarks: number;
    passingScore: number;
    resultConfiguration: 'IMMEDIATE' | 'AFTER_DATE' | 'MANUAL';
    published?: boolean;
    examDate: string; // "YYYY-MM-DDTHH:mm:ss"
    endDate?: string;
    classSessionIds: number[];
    questions?: ExamQuestionRequest[];
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

// Student Execution Types
export interface StudentExamExecutionResponse {
    executionId: number;
    examId: number;
    title: string;
    durationMinutes: number;
    totalMarks: number;
    startedAt: string;
    endDate?: string;
    questions: QuestionResponse[];
    remainingSeconds?: number; // Calculated on frontend or backend
}

export interface QuestionResponse {
    id: number;
    text: string;
    imageUrl?: string;
    marks: number;
    questionType: 'MCQ';
    sortOrder: number;
    options: OptionResponse[];
}

export interface OptionResponse {
    id: number;
    text: string;
    imageUrl?: string;
}

export interface StudentExamResultResponse {
    executionId: number;
    examId: number;
    title: string;
    score: number;
    totalMarks: number;
    submittedAt: string;
    status: string;
    feedback?: string;
}

export interface ExamResultResponse {
    id: number;
    examId: number;
    examTitle: string;
    studentId: number;
    studentName: string;
    grade?: number; // mapped to score
    score?: number;
    totalMarks?: number;
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
    // Teacher specific
    subjectIds?: number[];
    gradeIds?: number[];
    // Student specific
    gradeId?: number;
    parentId?: number;
    // Parent specific
    childrenIds?: number[];
}

export interface CreateUserRequest {
    fullName: string;
    email?: string;
    phone?: string;
    role?: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
    subjectIds?: number[]; // For Teacher
    gradeIds?: number[];   // For Teacher
    gradeId?: number; // For Student
    parentId?: number; // For Student
    childrenIds?: number[]; // For Parent
}

// ==================== Student Dashboard ====================

export interface StudentScheduleResponse {
    id: number;
    title: string;
    subjectName?: string;
    teacherName?: string;
    scheduledTime: string;
    status: string;
    teamsMeetingUrl?: string;
    teamsRecordingUrl?: string;
    studentId?: number;
    studentName?: string;
}

export interface StudentHomeworkResponse {
    id: number;
    title: string;
    description?: string;
    subjectName?: string;
    dueDate: string;
    homeworkUrl?: string;
    isSubmitted: boolean;
    submissionStatus: string;
    grade?: number;
    feedback?: string;
}

export interface StudentExamResponse {
    id: number;
    executionId?: number;
    title: string;
    subjectName?: string;
    examDate: string;
    formUrl?: string;
    status: string;
    grade?: number;
}

export interface StudentExamSolutionResponse {
    executionId: number;
    examTitle: string;
    score: number;
    totalMarks: number;
    questions: SolutionQuestionResponse[];
}

export interface SolutionQuestionResponse {
    id: number;
    text: string;
    imageUrl?: string;
    marks: number;
    questionType: string;
    selectedOptionId?: number;
    options: SolutionOptionResponse[];
}

export interface SolutionOptionResponse {
    id: number;
    text: string;
    imageUrl?: string;
    isCorrect: boolean;
}


export interface StudentAttendanceResponse {
    classId: number;
    classTitle: string;
    subjectName?: string;
    scheduledTime: string;
    attended: boolean;
    markedAt?: string;
}

export interface AttendanceSummary {
    totalClasses: number;
    attendedClasses: number;
    attendanceRate: number;
}

// ==================== Parent Dashboard ====================

export interface ChildResponse {
    id: number;
    fullName: string;
    gradeName?: string;
    attendanceRate: number;
}

// ==================== Admin Enhancements ====================

export interface StudentReportResponse {
    studentId: number;
    fullName?: string;
    gradeName?: string;
    parentName?: string;
}

export interface AssignChildrenRequest {
    childIds: number[];
}

// ==================== Notifications ====================

export type NotificationType = 'ATTENDANCE' | 'HOMEWORK_SUBMISSION' | 'HOMEWORK_GRADED' | 'EXAM_RESULT' | 'EXAM_COMPLETED' | 'GENERAL';

export interface NotificationResponse {
    id: number;
    studentId?: number;
    studentName?: string;
    title: string;
    message: string;
    type: NotificationType;
    isRead: boolean;
    createdAt: string;
}

