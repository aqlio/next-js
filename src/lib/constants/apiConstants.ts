// src/lib/constants/apiConstants.ts

export const API_BASE_URL = '/api';

export const API_PATHS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/login`, // Adjust if signup has a different route
    VERIFY_EMAIL: (token: string) => `${API_BASE_URL}/auth/verifyEmail/${token}`,
    // Add other auth-related paths if necessary
  },
  USER: {
    GET_USER: `${API_BASE_URL}/user`,
    UPDATE_USER: (userId: string) => `${API_BASE_URL}/user/${userId}`,
    DELETE_USER: (userId: string) => `${API_BASE_URL}/user/${userId}`,
    // Add other user-related paths
  },
  STUDENT: {
    GET_STUDENT: `${API_BASE_URL}/students`,
    CREATE_STUDENT: `${API_BASE_URL}/students`,
    UPDATE_STUDENT: (studentId: string) => `${API_BASE_URL}/students/${studentId}`,
    DELETE_STUDENT: (studentId: string) => `${API_BASE_URL}/students/${studentId}`,
    REGENERATE_PASSWORD: (student_id: string) => `${API_BASE_URL}/students/${student_id}/regeneratePassword`,
    // Add other student-related paths
  },
  CLASS: {
    GET_CLASSES: `${API_BASE_URL}/classes`,
    CREATE_CLASS: `${API_BASE_URL}/classes`,
    UPDATE_CLASS: (class_id: string) => `${API_BASE_URL}/classes/${class_id}`,
    DELETE_CLASS: (class_id: string) => `${API_BASE_URL}/classes/${class_id}`,
    ENROLL_STUDENT: (class_id: string, student_id: string) => `${API_BASE_URL}/classes/${class_id}/student/${student_id}`,
    UNENROLL_STUDENT: (class_id: string, student_id: string) => `${API_BASE_URL}/classes/${class_id}/student/${student_id}`,
    GET_STUDENTS_IN_CLASS: (class_id: string) => `${API_BASE_URL}/classes/${class_id}/student`,
    // Add other class-related paths
  },
  BILLING: {
    GET_BILLINGS: `${API_BASE_URL}/billings`,
    UPDATE_BILLINGS: `${API_BASE_URL}/billings`,
    // Add other billing-related paths
  },
  LECTURE: {
    GET_LECTURES: `${API_BASE_URL}/lectures`,
    CREATE_LECTURE: `${API_BASE_URL}/lectures`,
    UPDATE_LECTURE: (lecture_id: string) => `${API_BASE_URL}/lectures/${lecture_id}`,
    DELETE_LECTURE: (lecture_id: string) => `${API_BASE_URL}/lectures/${lecture_id}`,
    // Add other lecture-related paths
  },
  // Add other API categories as needed
};
