/**
 * Test Utilities and Helpers
 * 
 * Common utilities and mock data for testing
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Mock assessment data
export const mockAssessments = [
  {
    id: 1,
    title: 'Verbal Ability Test',
    description: 'Test your verbal reasoning and language skills',
    category: 'verbal',
    duration: 15,
    totalQuestions: 10,
  },
  {
    id: 2,
    title: 'Numerical Ability Test',
    description: 'Test your mathematical and numerical reasoning skills',
    category: 'numerical',
    duration: 20,
    totalQuestions: 10,
  },
];

// Mock questions data
export const mockQuestions = [
  {
    id: 1,
    assessmentId: 1,
    questionText: 'What is a synonym for "happy"?',
    option1: 'Sad',
    option2: 'Joyful',
    option3: 'Angry',
    option4: 'Tired',
    correctAnswer: 2,
    order: 1,
  },
  {
    id: 2,
    assessmentId: 1,
    questionText: 'Choose the correct spelling:',
    option1: 'Recieve',
    option2: 'Receive',
    option3: 'Receve',
    option4: 'Receeve',
    correctAnswer: 2,
    order: 2,
  },
  {
    id: 3,
    assessmentId: 1,
    questionText: 'What is an antonym for "big"?',
    option1: 'Large',
    option2: 'Huge',
    option3: 'Small',
    option4: 'Giant',
    correctAnswer: 3,
    order: 3,
  },
];

// Mock user data
export const mockUser = {
  id: 'user123',
  name: 'Test User',
  email: 'test@example.com',
  emailVerified: true,
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock session data
export const mockSession = {
  user: mockUser,
  session: {
    id: 'session123',
    userId: 'user123',
    expiresAt: new Date(Date.now() + 86400000), // 24 hours from now
    token: 'mock-token',
    createdAt: new Date(),
    updatedAt: new Date(),
    ipAddress: '127.0.0.1',
    userAgent: 'Jest Test',
  },
};

// Mock user attempts
export const mockAttempts = [
  {
    id: 1,
    userId: 'user123',
    assessmentId: 1,
    score: 8,
    totalQuestions: 10,
    startedAt: new Date('2025-10-27T10:00:00Z'),
    completedAt: new Date('2025-10-27T10:15:00Z'),
    createdAt: new Date('2025-10-27T10:15:00Z'),
  },
  {
    id: 2,
    userId: 'user123',
    assessmentId: 2,
    score: 7,
    totalQuestions: 10,
    startedAt: new Date('2025-10-26T14:00:00Z'),
    completedAt: new Date('2025-10-26T14:20:00Z'),
    createdAt: new Date('2025-10-26T14:20:00Z'),
  },
];

// Mock user answers
export const mockAnswers = [
  {
    id: 1,
    attemptId: 1,
    questionId: 1,
    selectedAnswer: 2,
    isCorrect: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    attemptId: 1,
    questionId: 2,
    selectedAnswer: 2,
    isCorrect: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    attemptId: 1,
    questionId: 3,
    selectedAnswer: 1,
    isCorrect: false,
    createdAt: new Date(),
  },
];

// Helper function to create a custom render with providers if needed
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options });
}

// Helper to wait for element to be removed
export const waitForElementToBeRemoved = async (
  callback: () => void,
  options?: { timeout?: number }
) => {
  const { waitFor } = await import('@testing-library/react');
  return waitFor(callback, options);
};

// Helper to create mock router
export function createMockRouter(overrides = {}) {
  return {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    ...overrides,
  };
}

// Helper to create mock fetch response
export function createMockFetchResponse<T>(data: T, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
    headers: new Headers(),
    redirected: false,
    statusText: 'OK',
    type: 'basic' as ResponseType,
    url: '',
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
  } as Response;
}

// Helper to simulate delay
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Helper to format time like in the app
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Helper to calculate score percentage
export function calculatePercentage(score: number, total: number): number {
  return Math.round((score / total) * 100);
}

// Helper to get grade from percentage
export function getGrade(percentage: number) {
  if (percentage >= 90) return { grade: 'A+', color: 'text-green-600' };
  if (percentage >= 80) return { grade: 'A', color: 'text-green-600' };
  if (percentage >= 70) return { grade: 'B', color: 'text-blue-600' };
  if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600' };
  return { grade: 'D', color: 'text-red-600' };
}

// Helper to validate answer range
export function isValidAnswer(answer: number): boolean {
  return answer >= 1 && answer <= 4;
}

// Helper to check if answer is correct
export function checkAnswer(userAnswer: number, correctAnswer: number): boolean {
  return userAnswer === correctAnswer;
}

// Mock localStorage
export const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
})();

// Setup mock for window.localStorage
export function setupLocalStorageMock() {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });
}

// Helper to create mock headers
export function createMockHeaders(headers: Record<string, string> = {}) {
  return new Headers(headers);
}

// Helper to create mock request
export function createMockRequest(
  url: string,
  options: RequestInit = {}
): Request {
  return new Request(url, {
    method: 'GET',
    ...options,
  });
}

// Test constants
export const TEST_CONSTANTS = {
  DEFAULT_TIMEOUT: 5000,
  ANIMATION_DELAY: 300,
  API_DELAY: 100,
  MIN_PASSWORD_LENGTH: 8,
  ANSWER_OPTIONS_COUNT: 4,
  DEFAULT_ASSESSMENT_DURATION: 15, // minutes
} as const;

// Export all for convenience
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
