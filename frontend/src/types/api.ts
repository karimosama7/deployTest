export interface ClassSessionRequest {
    gradeId?: number;
    subjectId?: number;
    title: string;
    description?: string;
    scheduledTime: string;
    teamsMeetingUrl?: string;
}

export interface ClassSessionResponse {
    id: number;
    gradeName: string;
    subjectName: string;
    title: string;
    description?: string;
    scheduledTime: string;
    teamsMeetingUrl?: string;
    recordingUrl?: string;
    teacherName: string;
}

export interface HomeworkRequest {
    classSessionId: number;
    title: string;
    description?: string;
    homeworkUrl?: string;
    dueDate: string;
}

export interface HomeworkResponse {
    id: number;
    classSessionId: number;
    title: string;
    description?: string;
    homeworkUrl?: string;
    dueDate: string;
    submissionCount: number;
}

export interface HomeworkSubmissionResponse {
    id: number;
    studentName: string;
    solutionUrl: string;
    submittedAt: string;
    grade?: number;
    feedback?: string;
}

export interface ExamRequest {
    classSessionId: number;
    title: string;
    formUrl?: string;
    examDate: string;
}

export interface ExamResponse {
    id: number;
    classSessionId: number;
    title: string;
    formUrl?: string;
    examDate: string;
    status: 'UPCOMING' | 'COMPLETED';
}

export interface ExamResultResponse {
    id: number;
    studentName: string;
    grade: number;
    attended: boolean;
}

export interface AttendanceResponse {
    studentId: number;
    studentName: string;
    attended: boolean;
}
