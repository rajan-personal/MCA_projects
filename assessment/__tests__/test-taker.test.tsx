import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from 'react';
import TestTaker from "../app/assessment/[id]/test-taker";
import { useRouter } from 'next/navigation';

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe('TestTaker Component', () => {
  const mockPush = jest.fn();
  const mockAssessment = {
    id: 1,
    title: 'Verbal Ability Test',
    duration: 15,
    totalQuestions: 3,
  };

  const mockQuestions = [
    {
      id: 1,
      questionText: 'What is a synonym for "happy"?',
      option1: 'Sad',
      option2: 'Joyful',
      option3: 'Angry',
      option4: 'Tired',
      order: 1,
    },
    {
      id: 2,
      questionText: 'Choose the correct spelling:',
      option1: 'Recieve',
      option2: 'Receive',
      option3: 'Receve',
      option4: 'Receeve',
      order: 2,
    },
    {
      id: 3,
      questionText: 'What is an antonym for "big"?',
      option1: 'Large',
      option2: 'Huge',
      option3: 'Small',
      option4: 'Giant',
      order: 3,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders test header with assessment title', () => {
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    expect(screen.getByText('Verbal Ability Test')).toBeInTheDocument();
  });

  it('displays current question number', () => {
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
  });

  it('displays timer countdown', () => {
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    // 15 minutes = 900 seconds = 15:00
    expect(screen.getByText('15:00')).toBeInTheDocument();
  });

  it('renders first question text', () => {
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    expect(screen.getByText('What is a synonym for "happy"?')).toBeInTheDocument();
  });

  it('renders all answer options for current question', () => {
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    expect(screen.getByText('Sad')).toBeInTheDocument();
    expect(screen.getByText('Joyful')).toBeInTheDocument();
    expect(screen.getByText('Angry')).toBeInTheDocument();
    expect(screen.getByText('Tired')).toBeInTheDocument();
  });

  it('allows user to select an answer', async () => {
    const user = userEvent.setup({ delay: null });
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    const option2 = screen.getByText('Joyful');
    await user.click(option2);
    
    // Check if the option is visually selected (has blue styling)
    const optionButton = option2.closest('button');
    expect(optionButton).toHaveClass('border-blue-600');
  });

  it('navigates to next question when Next button is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    expect(screen.getByText('Choose the correct spelling:')).toBeInTheDocument();
    expect(screen.getByText('Question 2 of 3')).toBeInTheDocument();
  });

  it('navigates to previous question when Previous button is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    // Go to second question
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    // Go back to first question
    const previousButton = screen.getByRole('button', { name: /previous/i });
    await user.click(previousButton);
    
    expect(screen.getByText('What is a synonym for "happy"?')).toBeInTheDocument();
    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
  });

  it('disables Previous button on first question', () => {
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    const previousButton = screen.getByRole('button', { name: /previous/i });
    expect(previousButton).toBeDisabled();
  });

  it('shows Submit Test button on last question', async () => {
    const user = userEvent.setup({ delay: null });
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    
    // Navigate to last question
    await user.click(nextButton); // Question 2
    await user.click(nextButton); // Question 3
    
    expect(screen.getByRole('button', { name: /submit test/i })).toBeInTheDocument();
  });

  it('displays progress bar correctly', async () => {
    const user = userEvent.setup({ delay: null });
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    // On first question, progress should be 33.33%
    let progressBar = document.querySelector('[style*="width"]');
    // Use approximate match due to floating point precision
    expect(progressBar).toHaveAttribute('style', expect.stringContaining('33.333333'));
    
    // Navigate to second question
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    // Progress should be 66.67%
    progressBar = document.querySelector('[style*="width"]');
    expect(progressBar).toHaveAttribute('style', expect.stringContaining('66.666666'));
  });

  it('displays answered count', async () => {
    const user = userEvent.setup({ delay: null });
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    expect(screen.getByText('0 of 3 answered')).toBeInTheDocument();
    
    // Answer first question
    const option = screen.getByText('Joyful');
    await user.click(option);
    
    expect(screen.getByText('1 of 3 answered')).toBeInTheDocument();
  });

  it('displays question navigator with all questions', () => {
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    expect(screen.getByText('Question Navigator')).toBeInTheDocument();
    
    // Should have 3 navigation buttons
    const navButtons = screen.getAllByRole('button').filter(btn => 
      ['1', '2', '3'].includes(btn.textContent || '')
    );
    expect(navButtons).toHaveLength(3);
  });

  it('allows navigation via question navigator', async () => {
    const user = userEvent.setup({ delay: null });
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    // Find and click on question 3 in navigator
    const navButtons = screen.getAllByRole('button');
    const question3Button = navButtons.find(btn => btn.textContent === '3');
    
    await user.click(question3Button!);
    
    expect(screen.getByText('What is an antonym for "big"?')).toBeInTheDocument();
    expect(screen.getByText('Question 3 of 3')).toBeInTheDocument();
  });

  it('submits test and redirects to results', async () => {
    const user = userEvent.setup({ delay: null });
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ attemptId: 123, score: 2 }),
    });
    
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    // Answer a question
    const option = screen.getByText('Joyful');
    await user.click(option);
    
    // Navigate to last question
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    await user.click(nextButton);
    
    // Submit test
    const submitButton = screen.getByRole('button', { name: /submit test/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/submit-test',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(mockPush).toHaveBeenCalledWith('/results/123');
    });
  });

  it('decrements timer every second', () => {
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    expect(screen.getByText('15:00')).toBeInTheDocument();
    
    // Advance timer by 1 second within act
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // After 1 second, should show 14:59
    expect(screen.getByText('14:59')).toBeInTheDocument();
    
    // Advance timer by 59 more seconds
    act(() => {
      jest.advanceTimersByTime(59000);
    });
    
    expect(screen.getByText('14:00')).toBeInTheDocument();
  });

  it('auto-submits test when timer reaches zero', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ attemptId: 123, score: 0 }),
    });
    
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    // Fast forward to end of time (15 minutes = 900 seconds)
    jest.advanceTimersByTime(900000);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/results/123');
    });
  });

  it('preserves answers when navigating between questions', async () => {
    const user = userEvent.setup({ delay: null });
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    // Answer first question
    const option1 = screen.getByText('Joyful');
    await user.click(option1);
    
    // Navigate to second question
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    // Navigate back to first question
    const previousButton = screen.getByRole('button', { name: /previous/i });
    await user.click(previousButton);
    
    // Check if answer is still selected
    const optionButton = option1.closest('button');
    expect(optionButton).toHaveClass('border-blue-600');
  });

  it('marks answered questions in navigator', async () => {
    const user = userEvent.setup({ delay: null });
    render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
    
    // Answer first question
    const option = screen.getByText('Joyful');
    await user.click(option);
    
    // Navigate to next question so question 1 shows as answered (green) not current (blue)
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    // Find question 1 button in navigator
    const navButtons = screen.getAllByRole('button');
    const question1Button = navButtons.find(btn => btn.textContent === '1');
    
    // Should have green styling for answered questions (not blue since it's no longer current)
    expect(question1Button).toHaveClass('border-green-600');
  });
});
