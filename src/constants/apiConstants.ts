export const API_BASE_URL = 'https://api.aqlio.com'; // Update this to your actual API base URL

export const API_PATHS = {
  AUTH: {
    LOGIN: '/auth/local',
    SIGNUP: '/auth/local',
  },
  USER: {
    GET_USER: '/student',
  },
  CLASS: {
    GET_CLASSES: '/class',
    CREATE_CLASS: '/class',
    UPDATE_CLASS: '/class',
    DELETE_CLASS: '/class',
  },
};