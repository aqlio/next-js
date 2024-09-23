// src/constants/apiConstants.ts

export const API_BASE_URL = 'https://api.aqlio.com'; // Update this to your actual API base URL

export const API_PATHS = {
  AUTH: {
    LOGIN: '/auth/local',
    SIGNUP: '/auth/local',
  },
  USER: {
    GET_USER: '/users',
    UPDATE_USER: '/users',
    DELETE_USER: '/users',
  },
  STUDENT: {
    GET_STUDENT: '/students',
    CREATE_STUDENT: '/students',
    UPDATE_STUDENT: '/students',
    DELETE_STUDENT: '/students',
  },
  CLASS: {
    GET_CLASSES: '/classes',
    CREATE_CLASS: '/classes',
    UPDATE_CLASS: '/classes',
    DELETE_CLASS: '/classes',
    ENROLLMENTS: '/enrollments', // Adjust as per your API structure
  },
  LECTURE: {
    GET_LECTURES: '/lectures',
    CREATE_LECTURE: '/lectures',
    UPDATE_LECTURE: '/lectures',
    DELETE_LECTURE: '/lectures',
  },
  BILLING: {
    GET_BILLINGS: '/billings',
    UPDATE_BILLINGS: '/billings',
  },
};
