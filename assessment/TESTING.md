# Testing Documentation

## Overview

This document describes the testing strategy and implementation for the Assessment Platform.

## Test Setup

### Prerequisites

All testing dependencies are already installed:
- `jest` - Testing framework
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom Jest matchers for DOM
- `@testing-library/user-event` - User interaction simulation
- `jest-environment-jsdom` - DOM environment for Jest

### Configuration Files

- **jest.config.ts** - Main Jest configuration
- **jest.setup.ts** - Test setup file with global configurations

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### Test Files Organization

```
__tests__/
├── login.test.tsx           # Login page component tests
├── signup.test.tsx          # Signup page component tests
├── test-taker.test.tsx      # Test taking interface tests
├── api-submit-test.test.ts  # API route tests
├── utils.test.ts            # Utility function tests
└── integration.test.ts      # Integration and business logic tests
```

## Test Coverage

### 1. Authentication Tests (`login.test.tsx`, `signup.test.tsx`)

**Login Page Tests:**
- ✅ Renders form with all required fields
- ✅ Displays logo and branding
- ✅ Has link to signup page
- ✅ Updates input values on user input
- ✅ Submits form with correct credentials
- ✅ Redirects to dashboard on success
- ✅ Displays error message on failure
- ✅ Disables button during submission
- ✅ Validates required fields

**Signup Page Tests:**
- ✅ Renders form with name, email, password fields
- ✅ Displays branding elements
- ✅ Has link to login page
- ✅ Updates all input fields correctly
- ✅ Submits form with all user data
- ✅ Redirects to dashboard on success
- ✅ Displays error on duplicate email
- ✅ Enforces password length requirement (8+ chars)
- ✅ Shows loading state during submission

### 2. Test Taking Interface Tests (`test-taker.test.tsx`)

**Rendering Tests:**
- ✅ Displays assessment title and info
- ✅ Shows current question number
- ✅ Displays countdown timer
- ✅ Renders question text and all options
- ✅ Shows progress bar

**Navigation Tests:**
- ✅ Next button advances to next question
- ✅ Previous button goes to previous question
- ✅ Previous disabled on first question
- ✅ Submit button shown on last question
- ✅ Question navigator allows jumping to any question
- ✅ Progress bar updates correctly

**Answer Selection Tests:**
- ✅ User can select an answer
- ✅ Selected answer is visually highlighted
- ✅ Answers persist when navigating between questions
- ✅ Answered questions marked in navigator
- ✅ Answered count updates correctly

**Timer Tests:**
- ✅ Timer counts down every second
- ✅ Timer displays correct format (MM:SS)
- ✅ Auto-submits test when timer reaches zero

**Submission Tests:**
- ✅ Test submits with all answers
- ✅ API called with correct data
- ✅ Redirects to results page on success
- ✅ Shows loading state during submission

### 3. API Route Tests (`api-submit-test.test.ts`)

**Authentication Tests:**
- ✅ Returns 401 for unauthenticated requests
- ✅ Accepts requests from authenticated users

**Score Calculation Tests:**
- ✅ Calculates score for all correct answers
- ✅ Calculates score for mixed answers
- ✅ Handles unanswered questions (counts as incorrect)
- ✅ Returns attempt ID and score

**Error Handling Tests:**
- ✅ Returns 500 on database errors
- ✅ Logs errors appropriately

### 4. Utility Function Tests (`utils.test.ts`)

**Class Name Utility (cn):**
- ✅ Merges multiple class names
- ✅ Handles conditional classes
- ✅ Removes false/null/undefined values
- ✅ Resolves Tailwind class conflicts
- ✅ Works with arrays and objects
- ✅ Returns empty string for no arguments

### 5. Integration Tests (`integration.test.ts`)

**Business Logic Tests:**
- ✅ Score percentage calculation
- ✅ Grade assignment logic (A+, A, B, C, D)
- ✅ Time conversion and formatting
- ✅ Answer validation (1-4 range)
- ✅ Answer comparison logic

**Data Structure Tests:**
- ✅ User attempt data structure
- ✅ User answer data structure
- ✅ Correct/incorrect flag handling

## Test Statistics

### Total Test Suites: 6
- Authentication: 2 files (login, signup)
- Components: 1 file (test-taker)
- API: 1 file (submit-test)
- Utils: 1 file (utils)
- Integration: 1 file (integration)

### Total Test Cases: 80+
- Login Tests: ~12 tests
- Signup Tests: ~10 tests
- Test Taker Tests: ~25 tests
- API Tests: ~6 tests
- Utils Tests: ~10 tests
- Integration Tests: ~20 tests

## Testing Best Practices Used

### 1. **Arrange-Act-Assert Pattern**
Each test follows the AAA pattern:
```typescript
it('test description', () => {
  // Arrange - Set up test data and mocks
  const mockData = { ... };
  
  // Act - Perform the action
  const result = functionToTest(mockData);
  
  // Assert - Verify the result
  expect(result).toBe(expected);
});
```

### 2. **Mocking External Dependencies**
- Mock `next/navigation` for routing
- Mock `auth-client` for authentication
- Mock `fetch` for API calls
- Mock database operations

### 3. **User-Centric Testing**
- Use `@testing-library/user-event` for realistic interactions
- Test from the user's perspective
- Focus on behavior, not implementation details

### 4. **Async Testing**
- Use `waitFor` for async operations
- Properly handle promises and state updates

### 5. **Isolation**
- Each test is independent
- Clean up between tests with `beforeEach`
- No shared state between tests

## Mocking Strategy

### Component Mocks
```typescript
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
```

### API Mocks
```typescript
global.fetch = jest.fn();
```

### Timer Mocks
```typescript
jest.useFakeTimers();
jest.advanceTimersByTime(1000);
jest.useRealTimers();
```

## Coverage Goals

Target coverage metrics:
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Running Specific Tests

```bash
# Run specific test file
npm test login.test.tsx

# Run tests matching a pattern
npm test -- --testNamePattern="login"

# Run tests for specific folder
npm test __tests__/

# Run with verbose output
npm test -- --verbose
```

## Debugging Tests

### VSCode Debugging
1. Set breakpoints in test files
2. Use "JavaScript Debug Terminal"
3. Run `npm test`

### Console Logging
```typescript
it('test', () => {
  render(<Component />);
  screen.debug(); // Prints DOM tree
});
```

## CI/CD Integration

Tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: npm test -- --ci --coverage --maxWorkers=2
```

## Known Limitations

1. **API Route Tests**: Due to TypeScript strict typing with Better Auth, some type assertions are needed. Tests still validate behavior correctly.

2. **Integration Tests**: Full end-to-end tests would benefit from Playwright or Cypress for real browser testing.

3. **Database Tests**: Current tests mock database operations. Consider adding real database integration tests with a test database.

## Future Improvements

1. **E2E Testing**: Add Playwright/Cypress for full user journey testing
2. **Visual Regression**: Add visual testing with Percy or Chromatic
3. **Performance Testing**: Add performance benchmarks
4. **Accessibility Testing**: Add a11y testing with jest-axe
5. **Database Integration**: Add tests with real test database
6. **Load Testing**: Add API load testing

## Test Examples

### Example: Testing User Interaction
```typescript
it('allows user to select an answer', async () => {
  const user = userEvent.setup();
  render(<TestTaker assessment={mockAssessment} questions={mockQuestions} />);
  
  const option = screen.getByText('Joyful');
  await user.click(option);
  
  const optionButton = option.closest('button');
  expect(optionButton).toHaveClass('border-blue-600');
});
```

### Example: Testing Async Operations
```typescript
it('redirects to dashboard on successful login', async () => {
  const user = userEvent.setup();
  (signIn.email as jest.Mock).mockResolvedValueOnce({});
  
  render(<LoginPage />);
  
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');
  await user.click(screen.getByRole('button', { name: /sign in/i }));
  
  await waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});
```

### Example: Testing Error States
```typescript
it('displays error message on failed login', async () => {
  (signIn.email as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));
  
  render(<LoginPage />);
  // ... perform login
  
  await waitFor(() => {
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
  });
});
```

## Troubleshooting

### Tests Timing Out
- Increase timeout: `jest.setTimeout(10000)`
- Check for unresolved promises
- Ensure async operations are awaited

### Tests Flaking
- Avoid testing implementation details
- Use `waitFor` for async state changes
- Check for race conditions

### Mock Not Working
- Ensure mock is defined before import
- Check mock path matches import path
- Verify mock is cleared between tests

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Maintenance

Tests should be updated when:
- Adding new features
- Changing component behavior
- Fixing bugs (add regression test)
- Refactoring code

Keep tests:
- Simple and focused
- Well-named and descriptive
- Independent and isolated
- Fast and reliable
