// src/lib/utils/errorHandler.ts

interface ErrorResponse {
  code: string;
  message: string;
  param?: string;
}

const ERROR_CODE_MESSAGE_MAP: Record<string, string> = {
  invalid_input: 'Invalid input.',
  invalid_provider: 'Invalid provider.',
  invalid_credentials: 'Invalid credentials.',
  class_code_already_exists: 'Class code already exists.',
  user_not_found: 'User not found.',
  internal_error: 'Internal server error.',
  // Add other mappings...
};

export function prepareError(code: string, param?: string): { error: ErrorResponse } {
  const error: ErrorResponse = {
    code,
    message: ERROR_CODE_MESSAGE_MAP[code] || 'An error occurred.',
  };

  if (param) {
    error.param = param;
  }

  return { error };
}
