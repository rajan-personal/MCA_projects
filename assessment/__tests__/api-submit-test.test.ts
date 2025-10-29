import { NextRequest } from 'next/server';
import { POST } from '@/app/api/submit-test/route';

// Mock the dependencies
jest.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: jest.fn(),
    },
  },
}));

jest.mock('@/lib/db', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
  },
}));

jest.mock('@/lib/db/schema', () => ({
  questions: {},
  userAttempts: {},
  userAnswers: {},
}));

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

describe('Submit Test API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if user is not authenticated", async () => {
    const mockSession = null;
    (auth.api.getSession as jest.Mock).mockResolvedValue(mockSession);

    const req = new NextRequest(new Request("http://localhost:3000/api/submit-test", {
      method: "POST",
      body: JSON.stringify({
        assessmentId: 1,
        answers: {},
      }),
    }));

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  it('calculates score correctly for all correct answers', async () => {
    const mockSession = {
      user: { id: 'user123', email: 'test@example.com', name: 'Test User' },
    };

    const mockQuestions = [
      { id: 1, correctAnswer: 2, assessmentId: 1 },
      { id: 2, correctAnswer: 3, assessmentId: 1 },
      { id: 3, correctAnswer: 1, assessmentId: 1 },
    ];

    const userAnswers = {
      1: 2, // correct
      2: 3, // correct
      3: 1, // correct
    };

    (auth.api.getSession as jest.Mock).mockResolvedValueOnce(mockSession);
    
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValueOnce(mockQuestions),
      }),
    });

    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValueOnce([{ id: 1 }]),
      }),
    });

    // Second insert for user answers
    (db.insert as jest.Mock).mockReturnValueOnce({
      values: jest.fn().mockResolvedValueOnce([]),
    });

    const request = new NextRequest(new Request('http://localhost:3000/api/submit-test', {
      method: 'POST',
      body: JSON.stringify({
        assessmentId: 1,
        answers: userAnswers,
      }),
    }));

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.score).toBe(3);
    expect(data.attemptId).toBe(1);
  });

  it('calculates score correctly for mixed answers', async () => {
    const mockSession = {
      user: { id: 'user123', email: 'test@example.com', name: 'Test User' },
    };

    const mockQuestions = [
      { id: 1, correctAnswer: 2, assessmentId: 1 },
      { id: 2, correctAnswer: 3, assessmentId: 1 },
      { id: 3, correctAnswer: 1, assessmentId: 1 },
    ];

    const userAnswers = {
      1: 2, // correct
      2: 1, // incorrect
      3: 1, // correct
    };

    (auth.api.getSession as jest.Mock).mockResolvedValueOnce(mockSession);
    
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValueOnce(mockQuestions),
      }),
    });

    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValueOnce([{ id: 2 }]),
      }),
    });

    (db.insert as jest.Mock).mockReturnValueOnce({
      values: jest.fn().mockResolvedValueOnce([]),
    });

    const request = new NextRequest(new Request('http://localhost:3000/api/submit-test', {
      method: 'POST',
      body: JSON.stringify({
        assessmentId: 1,
        answers: userAnswers,
      }),
    }));

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.score).toBe(2);
  });

  it('handles unanswered questions', async () => {
    const mockSession = {
      user: { id: 'user123', email: 'test@example.com', name: 'Test User' },
    };

    const mockQuestions = [
      { id: 1, correctAnswer: 2, assessmentId: 1 },
      { id: 2, correctAnswer: 3, assessmentId: 1 },
      { id: 3, correctAnswer: 1, assessmentId: 1 },
    ];

    const userAnswers = {
      1: 2, // correct
      // question 2 not answered
      3: 1, // correct
    };

    (auth.api.getSession as jest.Mock).mockResolvedValueOnce(mockSession);
    
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnThis(),
    });
    
    (db.select as jest.Mock)().from = jest.fn().mockReturnValue({
      where: jest.fn().mockResolvedValueOnce(mockQuestions),
    });

    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValueOnce([{ id: 3 }]),
      }),
    });

    (db.insert as jest.Mock).mockReturnValueOnce({
      values: jest.fn().mockResolvedValueOnce([]),
    });

    const request = new NextRequest(new Request('http://localhost:3000/api/submit-test', {
      method: 'POST',
      body: JSON.stringify({
        assessmentId: 1,
        answers: userAnswers,
      }),
    }));

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.score).toBe(2); // 2 out of 3 correct
  });

  it('returns 500 on database error', async () => {
    const mockSession = {
      user: { id: 'user123', email: 'test@example.com', name: 'Test User' },
    };

    (auth.api.getSession as jest.Mock).mockResolvedValueOnce(mockSession);
    (db.select as jest.Mock).mockImplementation(() => {
      throw new Error('Database error');
    });

    const request = new NextRequest(new Request('http://localhost:3000/api/submit-test', {
      method: 'POST',
      body: JSON.stringify({
        assessmentId: 1,
        answers: {},
      }),
    }));

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to submit test');
  });
});
