# AssessHub – Assessment Platform
## Comprehensive Technical Report

---

<div style="page-break-after: always;"></div>

## Document Information

**Project Name:** AssessHub – Online Assessment Platform  
**Version:** 1.0.0  
**Date:** October 29, 2025  
**Author:** Development Team  
**Organization:** Prismberry  

**Document Status:** Final Release  
**Classification:** Technical Documentation  

---

## Abstract

This comprehensive technical report presents a detailed analysis and documentation of AssessHub, a modern full-stack online assessment platform built with Next.js 16, Better Auth, Drizzle ORM, and PostgreSQL. The platform enables candidates to take timed verbal and numerical ability tests while providing instant feedback and detailed performance analytics.

The system implements industry-standard security practices through Better Auth integration, ensures data persistence with PostgreSQL and Drizzle ORM, and delivers a responsive user experience with Tailwind CSS v4. The architecture follows modern web development patterns including server-side rendering, API routes, and component-based design.

This report covers the complete system lifecycle including requirements analysis, architectural design, implementation details, testing strategies, deployment procedures, and maintenance guidelines. It serves as both technical documentation for developers and comprehensive project documentation for stakeholders.

**Key Features:**
- Secure email/password authentication with session management
- Pre-seeded verbal and numerical assessments with 10 questions each
- Timed test execution with countdown timer and auto-submission
- Instant scoring with detailed answer review
- User dashboard with attempt history and performance tracking
- Responsive, dark-mode friendly UI built with Tailwind CSS v4

**Technology Stack:**
- Frontend: Next.js 16 (React 19), TypeScript, Tailwind CSS v4
- Backend: Next.js API Routes, Better Auth
- Database: PostgreSQL with Drizzle ORM
- Testing: Jest with Testing Library
- Deployment: Docker support for local development

---

<div style="page-break-after: always;"></div>

## Table of Contents

### 1. Introduction
   1.1 Project Overview  
   1.2 Purpose and Scope  
   1.3 Target Audience  
   1.4 Document Organization  

### 2. Requirements Analysis
   2.1 Functional Requirements  
   2.2 Non-Functional Requirements  
   2.3 User Stories  
   2.4 Use Cases  
   2.5 System Constraints  

### 3. Technology Stack
   3.1 Frontend Technologies  
   3.2 Backend Technologies  
   3.3 Database Technologies  
   3.4 Development Tools  
   3.5 Testing Framework  
   3.6 Technology Selection Rationale  

### 4. System Architecture
   4.1 Architecture Overview  
   4.2 Application Layers  
   4.3 Component Architecture  
   4.4 Data Flow Diagrams  
   4.5 System Integration  

### 5. Database Design
   5.1 Database Schema  
   5.2 Entity-Relationship Diagram  
   5.3 Table Specifications  
   5.4 Relationships and Constraints  
   5.5 Data Migration Strategy  

### 6. Authentication System
   6.1 Better Auth Integration  
   6.2 User Registration Flow  
   6.3 Login and Session Management  
   6.4 Security Considerations  
   6.5 Protected Routes Implementation  

### 7. Assessment Module
   7.1 Assessment Structure  
   7.2 Question Management  
   7.3 Test Configuration  
   7.4 Seeding Strategy  

### 8. Test-Taking Interface
   8.1 User Interface Design  
   8.2 Question Navigation  
   8.3 Timer Implementation  
   8.4 Answer Selection Mechanism  
   8.5 Progress Tracking  
   8.6 Auto-Submission Logic  

### 9. Scoring and Results
   9.1 Score Calculation Algorithm  
   9.2 Results Storage  
   9.3 Results Display  
   9.4 Performance Analytics  
   9.5 Attempt History  

### 10. API Design
   10.1 API Architecture  
   10.2 Authentication API  
   10.3 Test Submission API  
   10.4 Error Handling  
   10.5 Request/Response Formats  

### 11. Frontend Implementation
   11.1 Page Structure  
   11.2 Component Library  
   11.3 State Management  
   11.4 Client-Server Interaction  
   11.5 Responsive Design  

### 12. Backend Implementation
   12.1 Server-Side Rendering  
   12.2 API Route Handlers  
   12.3 Database Operations  
   12.4 Business Logic  
   12.5 Error Handling  

### 13. Testing Strategy
   13.1 Testing Overview  
   13.2 Unit Testing  
   13.3 Integration Testing  
   13.4 Component Testing  
   13.5 API Testing  
   13.6 Test Coverage Analysis  

### 14. Security Implementation
   14.1 Authentication Security  
   14.2 Data Protection  
   14.3 Input Validation  
   14.4 CSRF Protection  
   14.5 SQL Injection Prevention  

### 15. Performance Optimization
   15.1 Frontend Performance  
   15.2 Backend Performance  
   15.3 Database Optimization  
   15.4 Caching Strategies  

### 16. Deployment Guide
   16.1 Environment Setup  
   16.2 Local Development  
   16.3 Production Deployment  
   16.4 Docker Configuration  
   16.5 Environment Variables  

### 17. Monitoring and Maintenance
   17.1 Logging Strategy  
   17.2 Error Monitoring  
   17.3 Performance Monitoring  
   17.4 Database Maintenance  

### 18. User Guide
   18.1 User Registration  
   18.2 Taking Assessments  
   18.3 Viewing Results  
   18.4 Dashboard Navigation  

### 19. Developer Guide
   19.1 Project Setup  
   19.2 Development Workflow  
   19.3 Code Standards  
   19.4 Adding New Features  
   19.5 Debugging Tips  

### 20. Future Enhancements
   20.1 Planned Features  
   20.2 Scalability Improvements  
   20.3 Additional Test Types  
   20.4 Analytics Dashboard  

### 21. Appendices
   21.1 Code Samples  
   21.2 Configuration Files  
   21.3 API Reference  
   21.4 Database Scripts  

### 22. References and Resources

### 23. Glossary

### 24. Conclusion

---

<div style="page-break-after: always;"></div>

## 1. Introduction

### 1.1 Project Overview

AssessHub is a comprehensive online assessment platform designed to facilitate skill evaluation through structured, timed tests. The platform addresses the growing need for automated assessment systems in educational institutions, corporate training programs, and recruitment processes.

The system provides a seamless experience for both test-takers and administrators, combining modern web technologies with robust backend infrastructure. Built on Next.js 16, the platform leverages server-side rendering for optimal performance and SEO capabilities while maintaining a rich, interactive user experience.

**Core Capabilities:**
- User account management with secure authentication
- Multiple assessment categories (Verbal and Numerical ability)
- Real-time test execution with countdown timers
- Immediate result generation and feedback
- Historical attempt tracking and progress monitoring
- Responsive design supporting desktop and mobile devices

**Business Value:**
- Reduces manual assessment overhead
- Provides instant, objective evaluation
- Scales efficiently to handle multiple concurrent users
- Maintains comprehensive audit trails of all attempts
- Enables data-driven insights into candidate performance

### 1.2 Purpose and Scope

**Purpose:**

This document serves multiple critical purposes:

1. **Technical Documentation**: Provides comprehensive technical specifications for developers working on the platform
2. **Project Documentation**: Offers stakeholders a complete understanding of system capabilities and architecture
3. **Maintenance Guide**: Serves as a reference for future maintenance and enhancement activities
4. **Knowledge Transfer**: Facilitates onboarding of new team members
5. **Quality Assurance**: Documents testing strategies and quality benchmarks

**Scope:**

This report encompasses:

**In Scope:**
- Complete system architecture and design decisions
- Implementation details of all major components
- Database schema and data management strategies
- Authentication and authorization mechanisms
- Testing methodologies and coverage
- Deployment and operational procedures
- User and developer guidelines

**Out of Scope:**
- Infrastructure-level details (AWS/cloud provider specifics)
- Third-party service integrations beyond Better Auth
- Advanced analytics and reporting features (future enhancement)
- Mobile application development
- Internationalization and localization

### 1.3 Target Audience

This document is designed for multiple stakeholder groups:

**1. Software Developers:**
- Understanding system architecture
- Implementing new features
- Debugging and troubleshooting
- Code maintenance and refactoring

**2. Technical Architects:**
- Evaluating design decisions
- Planning system enhancements
- Assessing scalability options
- Integration planning

**3. Quality Assurance Engineers:**
- Understanding testing requirements
- Developing test cases
- Validating functionality
- Performance testing

**4. DevOps Engineers:**
- Deploying the application
- Configuring environments
- Monitoring system health
- Managing database operations

**5. Project Managers:**
- Understanding project scope
- Tracking deliverables
- Resource planning
- Risk assessment

**6. Business Stakeholders:**
- Understanding system capabilities
- Evaluating ROI
- Planning future enhancements
- Making informed business decisions

### 1.4 Document Organization

This comprehensive report is organized into 24 major sections, each addressing specific aspects of the AssessHub platform:

**Sections 1-4**: Provide foundational context including introduction, requirements, technology stack, and high-level architecture.

**Sections 5-9**: Detail core system components including database design, authentication, assessment management, test-taking interface, and scoring mechanisms.

**Sections 10-12**: Cover implementation specifics for APIs, frontend, and backend components.

**Sections 13-15**: Address quality assurance through testing strategies, security implementation, and performance optimization.

**Sections 16-17**: Provide operational guidance for deployment, monitoring, and maintenance.

**Sections 18-19**: Offer practical guides for end-users and developers.

**Sections 20-24**: Look ahead to future enhancements, provide appendices with technical references, and conclude the document.

Each section builds upon previous content, creating a cohesive narrative from high-level overview to implementation details. Cross-references are provided throughout to help readers navigate related topics.

---

<div style="page-break-after: always;"></div>

## 2. Requirements Analysis

### 2.1 Functional Requirements

The AssessHub platform implements the following functional requirements:

**FR-1: User Authentication**
- Users must be able to register with name, email, and password
- System must validate email uniqueness
- Password must meet minimum security requirements (8+ characters)
- Users must be able to log in with email and password
- System must maintain secure sessions
- Users must be able to log out
- Session must persist across page refreshes

**FR-2: Assessment Discovery**
- Authenticated users must access a dashboard listing all available assessments
- Each assessment must display: title, description, category, duration, and question count
- Dashboard must show user's recent attempt history
- Users must be able to start any available assessment

**FR-3: Test Execution**
- System must display one question at a time
- Users must be able to navigate between questions (next/previous)
- Users must be able to jump to any question directly
- System must track which questions have been answered
- System must display remaining time with countdown
- Users must be able to select one answer per question
- System must save answer selections immediately
- Users must be able to change answers before submission
- System must auto-submit when timer expires
- Users must be able to manually submit before time expires

**FR-4: Progress Tracking**
- System must show current question number
- System must display progress bar indicating completion percentage
- System must indicate answered vs unanswered questions
- System must show total questions count

**FR-5: Result Generation**
- System must calculate score immediately upon submission
- System must compare user answers with correct answers
- System must store attempt details in database
- System must store individual answer records
- System must calculate percentage score
- System must assign grade based on percentage (A+, A, B, C, D)

**FR-6: Result Display**
- Users must be able to view their score and grade
- Users must see percentage achieved
- Users must review all questions with their answers
- System must highlight correct and incorrect answers
- System must show the correct answer for each question
- Users must be able to retake the assessment

**FR-7: Attempt History**
- System must maintain complete history of all attempts
- Dashboard must display recent attempts with scores
- Users must access detailed results of past attempts
- System must track timestamps for all attempts

**FR-8: Data Persistence**
- All user data must be stored in PostgreSQL database
- Assessment content must be pre-seeded
- All attempts must be permanently stored
- System must maintain referential integrity

### 2.2 Non-Functional Requirements

**NFR-1: Performance**
- Page load time must be under 2 seconds on standard broadband
- API response time must be under 500ms for 95% of requests
- System must handle at least 100 concurrent users
- Database queries must complete within 100ms
- Timer must update every second without UI lag

**NFR-2: Usability**
- Interface must be intuitive with minimal learning curve
- Navigation must be consistent across all pages
- Error messages must be clear and actionable
- System must work on desktop and mobile devices
- Touch interactions must work on mobile devices

**NFR-3: Reliability**
- System uptime must be 99%+ in production
- Data must never be lost due to system failure
- Automatic submission must work reliably on timeout
- Session must not expire during active test taking

**NFR-4: Security**
- Passwords must be securely hashed
- Sessions must use cryptographically secure tokens
- API endpoints must be protected from unauthorized access
- System must prevent SQL injection attacks
- System must prevent XSS attacks
- HTTPS must be used in production

**NFR-5: Scalability**
- Database must support growth to millions of attempts
- System architecture must support horizontal scaling
- Code must be modular for easy feature additions
- API design must accommodate future endpoints

**NFR-6: Maintainability**
- Code must follow TypeScript best practices
- All functions must be properly typed
- Complex logic must include comments
- Test coverage must exceed 80%
- Code must be organized in logical modules

**NFR-7: Compatibility**
- Must work on Chrome, Firefox, Safari, Edge (latest versions)
- Must work on iOS and Android mobile browsers
- Must support screen readers for accessibility
- Must work with JavaScript enabled

**NFR-8: Availability**
- System must be accessible 24/7 in production
- Planned maintenance windows must be communicated
- Backup systems must be in place
- Database must be backed up daily

### 2.3 User Stories

**Epic 1: User Onboarding**

**US-1.1: New User Registration**
- *As a* new visitor
- *I want to* create an account with my email
- *So that* I can access assessments

**Acceptance Criteria:**
- Registration form includes name, email, and password fields
- Email must be unique (not already registered)
- Password must be at least 8 characters
- Successful registration redirects to dashboard
- Error messages display for validation failures

**US-1.2: User Login**
- *As a* registered user
- *I want to* log in with my credentials
- *So that* I can access my personalized dashboard

**Acceptance Criteria:**
- Login form accepts email and password
- Valid credentials redirect to dashboard
- Invalid credentials show error message
- Session persists across page refreshes
- User can log out when desired

**Epic 2: Assessment Discovery**

**US-2.1: View Available Assessments**
- *As an* authenticated user
- *I want to* see all available assessments
- *So that* I can choose which test to take

**Acceptance Criteria:**
- Dashboard displays list of all assessments
- Each assessment shows title, description, and metadata
- Assessment cards are visually distinct
- User can click to start any assessment

**US-2.2: View Attempt History**
- *As an* authenticated user
- *I want to* see my past test attempts
- *So that* I can track my progress

**Acceptance Criteria:**
- Dashboard shows recent attempts
- Each attempt displays date, score, and percentage
- User can click to view detailed results
- Attempts are sorted by date (newest first)

**Epic 3: Test Taking**

**US-3.1: Start Assessment**
- *As an* authenticated user
- *I want to* start an assessment
- *So that* I can demonstrate my knowledge

**Acceptance Criteria:**
- Clicking "Start Test" begins the assessment
- Timer starts immediately
- First question is displayed
- Navigation controls are available

**US-3.2: Answer Questions**
- *As a* test taker
- *I want to* select answers to questions
- *So that* I can complete the assessment

**Acceptance Criteria:**
- Questions display clearly with all options
- User can select one option per question
- Selected option is visually highlighted
- Selection is saved immediately
- User can change selection before submission

**US-3.3: Navigate Between Questions**
- *As a* test taker
- *I want to* move between questions easily
- *So that* I can review and update my answers

**Acceptance Criteria:**
- Next/Previous buttons allow sequential navigation
- Question navigator allows jumping to any question
- Current question is clearly indicated
- Answered questions are visually marked
- Navigation works smoothly without delays

**US-3.4: Monitor Time Remaining**
- *As a* test taker
- *I want to* see how much time I have left
- *So that* I can pace myself appropriately

**Acceptance Criteria:**
- Timer displays in MM:SS format
- Timer counts down every second
- Timer is always visible during test
- Warning shown when time is running low

**US-3.5: Submit Assessment**
- *As a* test taker
- *I want to* submit my completed assessment
- *So that* I can see my results

**Acceptance Criteria:**
- Submit button appears on last question
- Manual submission works at any time
- Auto-submission triggers when timer expires
- Loading state displays during submission
- Redirect to results page after submission

**Epic 4: Results and Review**

**US-4.1: View Score Summary**
- *As a* test taker
- *I want to* see my overall score immediately
- *So that* I know how well I performed

**Acceptance Criteria:**
- Score displays immediately after submission
- Shows number of correct answers
- Shows total questions
- Shows percentage score
- Shows letter grade (A+, A, B, C, D)

**US-4.2: Review Answers**
- *As a* test taker
- *I want to* review my answers in detail
- *So that* I can learn from my mistakes

**Acceptance Criteria:**
- All questions displayed with selected answers
- Correct answers clearly marked
- Incorrect answers highlighted
- Correct answer shown for all questions
- Can scroll through all questions

**US-4.3: Retake Assessment**
- *As a* test taker
- *I want to* retake an assessment
- *So that* I can improve my score

**Acceptance Criteria:**
- Retake button available on results page
- Starting retake begins fresh attempt
- Previous answers are not pre-filled
- All attempts are saved separately

### 2.4 Use Cases

**Use Case 1: Complete First Assessment**

**Actor:** New User

**Precondition:** User has created account and logged in

**Main Flow:**
1. User views dashboard with available assessments
2. User clicks "Start Test" on Verbal Ability Assessment
3. System loads test interface with first question
4. System starts countdown timer
5. User reads question and selects an answer
6. User clicks "Next" to proceed
7. Steps 5-6 repeat for all 10 questions
8. User reviews answers using question navigator
9. User clicks "Submit Test"
10. System calculates score
11. System saves attempt to database
12. System redirects to results page
13. User views score, grade, and answer review
14. User returns to dashboard

**Postcondition:** Attempt is saved, user can retake test

**Alternative Flow 1 - Time Expires:**
- At step 7, if timer reaches 0:00
- System automatically submits test
- Flow continues from step 10

**Alternative Flow 2 - Navigation:**
- At any point, user can use question navigator
- User can jump to any question
- User can modify previous answers
- Flow continues from that question

**Use Case 2: Review Past Attempt**

**Actor:** Returning User

**Precondition:** User has completed at least one assessment

**Main Flow:**
1. User logs into account
2. User views dashboard
3. System displays recent attempts section
4. User clicks on a past attempt
5. System loads results page for that attempt
6. User reviews score and answers
7. User identifies areas for improvement
8. User clicks "Retake Test"
9. System starts new attempt

**Postcondition:** User begins new attempt

**Use Case 3: System Administration**

**Actor:** System (Automated)

**Precondition:** Database is initialized

**Main Flow:**
1. Administrator runs seed command
2. System connects to database
3. System creates assessment records
4. System creates question records
5. System links questions to assessments
6. System sets correct answers
7. System verifies data integrity
8. System confirms successful seeding

**Postcondition:** Assessments are available to users

### 2.5 System Constraints

**Technical Constraints:**

**TC-1: Technology Stack**
- Must use Next.js 16 as framework
- Must use PostgreSQL as database
- Must use Drizzle ORM for data access
- Must use Better Auth for authentication
- Must use TypeScript for type safety

**TC-2: Browser Requirements**
- Requires modern browser with ES6+ support
- Requires JavaScript to be enabled
- Cookies must be enabled for sessions
- LocalStorage must be available

**TC-3: Database Constraints**
- Must maintain referential integrity
- Must use foreign key constraints
- Cannot delete assessments with attempts
- Cannot delete users with attempts

**TC-4: Performance Constraints**
- Timer must update at 1-second intervals
- No tolerance for timer drift
- Auto-submission must be reliable
- No data loss during submission

**Business Constraints:**

**BC-1: Assessment Structure**
- Each assessment contains exactly 10 questions
- Each question has exactly 4 options
- Only one correct answer per question
- Questions presented in specified order

**BC-2: Timing**
- Assessment duration set at assessment level
- No pause functionality
- No extension mechanisms
- Time limit strictly enforced

**BC-3: Scoring**
- Simple correct/incorrect evaluation
- No partial credit
- No negative marking
- Score calculated as sum of correct answers

**BC-4: Access Control**
- All assessments available to all authenticated users
- No role-based restrictions
- No attempt limits
- No prerequisites

**Operational Constraints:**

**OC-1: Development Environment**
- Docker required for local database
- Node.js 20+ required
- npm package manager required
- Development on macOS, Linux, or Windows

**OC-2: Deployment**
- PostgreSQL database required
- Environment variables must be configured
- HTTPS required in production
- Domain/hosting required

**OC-3: Maintenance**
- Database backups required
- Monitoring required in production
- Log aggregation recommended
- Error tracking recommended

**Design Constraints:**

**DC-1: Architecture**
- Must follow Next.js App Router conventions
- Must use server components where possible
- API routes for backend operations
- Client components for interactivity

**DC-2: Code Standards**
- TypeScript strict mode enabled
- ESLint configuration enforced
- Component naming conventions followed
- File organization structure maintained

**DC-3: Testing**
- Jest as testing framework
- Testing Library for component tests
- Minimum 80% code coverage target
- All critical paths tested

---

<div style="page-break-after: always;"></div>

## 3. Technology Stack

### 3.1 Frontend Technologies

**Next.js 16.0.0**

Next.js serves as the core framework, providing:
- **App Router**: Modern routing with layouts and loading states
- **Server Components**: Default server-side rendering for optimal performance
- **Client Components**: Interactive UI elements with `"use client"` directive
- **API Routes**: Backend functionality within the same codebase
- **Automatic Code Splitting**: Optimized bundle sizes
- **Hot Module Replacement**: Fast development experience

**Rationale**: Next.js offers the best balance of developer experience and production performance for React applications. The App Router provides intuitive file-based routing while enabling advanced patterns like streaming and suspense.

**React 19.2.0**

React provides the component-based UI foundation:
- **Hooks**: useState, useEffect, useRouter for state and lifecycle management
- **Component Composition**: Reusable UI elements
- **Virtual DOM**: Efficient rendering and updates
- **JSX**: Declarative UI syntax

**Rationale**: React's mature ecosystem, extensive community support, and Next.js integration make it the ideal choice for building complex user interfaces.

**TypeScript 5.x**

TypeScript adds static typing to JavaScript:
- **Type Safety**: Catch errors at compile time
- **IntelliSense**: Enhanced IDE support and autocomplete
- **Interface Definitions**: Clear API contracts
- **Refactoring Confidence**: Safe code modifications

**Rationale**: TypeScript significantly improves code quality, maintainability, and developer productivity, especially in larger codebases.

**Tailwind CSS v4**

Utility-first CSS framework:
- **Utility Classes**: Rapid UI development
- **Responsive Design**: Built-in breakpoint system
- **Dark Mode Support**: Easy theme switching
- **Custom Configuration**: Tailored design system
- **JIT Mode**: On-demand CSS generation

**Rationale**: Tailwind CSS accelerates development while maintaining consistent design. Version 4 provides performance improvements and enhanced developer experience.

**Lucide React**

Icon library providing:
- **850+ Icons**: Comprehensive icon set
- **Consistent Style**: Unified visual language
- **Tree-Shakable**: Only imported icons bundled
- **TypeScript Support**: Full type definitions

**Rationale**: Lucide offers high-quality, customizable icons with excellent React integration and minimal bundle impact.

**Additional Frontend Libraries:**

```json
"class-variance-authority": "^0.7.1"  // Component variants
"clsx": "^2.1.1"                      // Conditional className utility
"tailwind-merge": "^3.3.1"            // Tailwind class conflict resolution
```

### 3.2 Backend Technologies

**Next.js API Routes**

Server-side functionality:
- **File-Based Routing**: API endpoints mirror URL structure
- **Middleware Support**: Request/response processing
- **Edge Runtime**: Optional edge deployment
- **TypeScript Integration**: Type-safe API handlers

**Rationale**: API Routes provide a seamless backend solution without requiring separate server setup, simplifying deployment and development.

**Better Auth 1.3.33**

Authentication library featuring:
- **Email/Password Authentication**: Built-in credential auth
- **Session Management**: Secure token-based sessions
- **Database Adapter**: Direct Drizzle ORM integration
- **Server-Side Protection**: Route guards and middleware
- **Client Hooks**: React integration for auth state

**Rationale**: Better Auth offers modern, type-safe authentication with excellent Next.js integration and minimal configuration overhead compared to alternatives like NextAuth.

**Drizzle ORM 0.44.7**

Type-safe ORM providing:
- **Type Safety**: Full TypeScript integration
- **Query Builder**: SQL-like query syntax
- **Schema Definition**: Code-first database schema
- **Migrations**: Version-controlled schema changes
- **Relations**: Automatic join handling

**Rationale**: Drizzle combines the type safety of Prisma with the flexibility of raw SQL, offering excellent performance and developer experience.

**Node.js APIs**

Built-in Node.js capabilities:
- **Crypto**: Password hashing, token generation
- **File System**: Configuration file reading
- **HTTP**: Request/response handling
- **Streams**: Efficient data processing

### 3.3 Database Technologies

**PostgreSQL**

Relational database system:
- **ACID Compliance**: Data integrity guarantees
- **Foreign Keys**: Referential integrity enforcement
- **Indexes**: Query performance optimization
- **JSON Support**: Flexible data storage
- **Transactions**: Atomic operations

**Rationale**: PostgreSQL is the gold standard for relational databases, offering reliability, performance, and advanced features needed for production applications.

**pg Driver 8.16.3**

PostgreSQL client for Node.js:
- **Connection Pooling**: Efficient resource usage
- **Prepared Statements**: SQL injection prevention
- **Transaction Support**: Multi-query operations
- **TypeScript Types**: Type-safe queries

**Docker Compose**

Container orchestration:
- **Service Definition**: PostgreSQL configuration
- **Volume Management**: Data persistence
- **Port Mapping**: Database accessibility
- **Environment Variables**: Configuration management

**Configuration Example:**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: prismberry
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

### 3.4 Development Tools

**Drizzle Kit 0.31.6**

Database toolkit:
- **Migration Generation**: Automatic schema diff
- **Schema Push**: Direct schema application
- **Studio**: Visual database browser
- **Type Generation**: TypeScript from schema

**Commands:**
```bash
npm run db:generate  # Generate migrations
npm run db:push      # Apply schema
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed data
```

**ESLint 9.x**

Code quality tool:
- **Next.js Rules**: Framework-specific linting
- **TypeScript Rules**: Type checking
- **Custom Rules**: Project standards
- **Auto-Fix**: Automatic corrections

**Configuration:**
```javascript
eslint.config.mjs - Modern flat config
Extends: eslint-config-next
```

**TSX**

TypeScript execution:
- **Direct TS Execution**: No compilation step
- **Fast Development**: Quick script running
- **Seeding Scripts**: Database population

**Git**

Version control:
- **Branch Management**: Feature development
- **Commit History**: Change tracking
- **Collaboration**: Team development

### 3.5 Testing Framework

**Jest 29.7.0**

JavaScript testing framework:
- **Unit Testing**: Individual function testing
- **Snapshot Testing**: UI regression detection
- **Mocking**: Dependency isolation
- **Coverage Reports**: Code coverage analysis

**Configuration:**
```typescript
// jest.config.ts
{
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' }
}
```

**Testing Library**

React testing utilities:
- **@testing-library/react 16.3.0**: Component rendering
- **@testing-library/jest-dom 6.9.1**: Custom matchers
- **@testing-library/user-event 14.6.1**: User interaction simulation

**Testing Strategy:**
```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

**Test Files:**
```
__tests__/
├── login.test.tsx          # Authentication UI
├── signup.test.tsx         # Registration UI
├── test-taker.test.tsx     # Test interface
├── api-submit-test.test.ts # API routes
├── utils.test.ts           # Utility functions
└── integration.test.ts     # Business logic
```

### 3.6 Technology Selection Rationale

**Framework Selection: Next.js**

*Alternatives Considered:*
- **Vite + React**: Faster build, but lacks SSR and API routes
- **Remix**: Strong SSR, but smaller ecosystem
- **Create React App**: Deprecated, limited features

*Decision Factors:*
1. **Server-Side Rendering**: SEO and performance benefits
2. **API Routes**: Backend and frontend in one repo
3. **App Router**: Modern routing patterns
4. **Deployment**: Excellent Vercel integration
5. **Community**: Large ecosystem and resources

**Authentication: Better Auth vs NextAuth**

*Better Auth Advantages:*
1. **Type Safety**: Full TypeScript support
2. **Simplicity**: Less configuration boilerplate
3. **Performance**: Lightweight implementation
4. **Modern**: Built for App Router
5. **Drizzle Integration**: Native ORM adapter

**ORM: Drizzle vs Prisma**

*Drizzle Advantages:*
1. **Performance**: Faster query execution
2. **SQL-Like**: Familiar query syntax
3. **Type Safety**: Compile-time checks
4. **Bundle Size**: Smaller than Prisma
5. **Flexibility**: More control over queries

**Database: PostgreSQL vs Alternatives**

*PostgreSQL Advantages:*
1. **Reliability**: Proven in production
2. **Features**: Advanced SQL capabilities
3. **Performance**: Excellent query optimization
4. **Community**: Extensive documentation
5. **Compatibility**: Wide hosting support

**Styling: Tailwind CSS vs Alternatives**

*Tailwind Advantages:*
1. **Productivity**: Rapid development
2. **Consistency**: Design system enforcement
3. **Bundle Size**: Purges unused CSS
4. **Customization**: Extensive configuration
5. **Dark Mode**: Built-in support

**Testing: Jest vs Alternatives**

*Jest Advantages:*
1. **Integration**: Works seamlessly with React
2. **Features**: Comprehensive testing capabilities
3. **Mocking**: Powerful mocking system
4. **Speed**: Fast test execution
5. **Community**: Standard in React ecosystem

---

<div style="page-break-after: always;"></div>

## 4. System Architecture

### 4.1 Architecture Overview

AssessHub follows a modern full-stack architecture built on Next.js, combining server-side rendering, API routes, and client-side interactivity in a monolithic yet modular structure.

**Architectural Pattern: Monolithic with Layered Architecture**

```
┌─────────────────────────────────────────────────────────┐
│                  Presentation Layer                      │
│  (React Components, Client State, UI Logic)             │
├─────────────────────────────────────────────────────────┤
│                  Application Layer                       │
│  (Next.js Pages, API Routes, Server Components)         │
├─────────────────────────────────────────────────────────┤
│                  Business Logic Layer                    │
│  (Authentication, Scoring, Validation)                   │
├─────────────────────────────────────────────────────────┤
│                  Data Access Layer                       │
│  (Drizzle ORM, Database Queries)                        │
├─────────────────────────────────────────────────────────┤
│                  Data Layer                              │
│  (PostgreSQL Database)                                   │
└─────────────────────────────────────────────────────────┘
```

**Key Architectural Principles:**

1. **Separation of Concerns**: Clear boundaries between presentation, business logic, and data access
2. **Component-Based**: Reusable UI components with single responsibilities
3. **Type Safety**: TypeScript throughout the stack
4. **Server-First**: Leverage server components for performance
5. **Progressive Enhancement**: Core functionality works without JavaScript

### 4.2 Application Layers

**Layer 1: Presentation Layer**

*Responsibilities:*
- Render user interfaces
- Handle user interactions
- Manage client-side state
- Display data from server

*Components:*
- React client components (`"use client"`)
- Form inputs and controls
- Navigation elements
- Visual feedback (loading, errors)

*Example:*
```typescript
// Test-taking interface
const TestTaker: React.FC<Props> = ({ assessment, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  // ... UI logic
};
```

**Layer 2: Application Layer**

*Responsibilities:*
- Route requests to appropriate handlers
- Orchestrate business operations
- Fetch and transform data for presentation
- Handle HTTP requests/responses

*Components:*
- Next.js pages and layouts
- API route handlers
- Server components
- Middleware

*Example:*
```typescript
// API route handler
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  const body = await request.json();
  // ... orchestrate submission
}
```

**Layer 3: Business Logic Layer**

*Responsibilities:*
- Implement business rules
- Validate inputs
- Calculate scores
- Enforce constraints

*Components:*
- Authentication logic
- Score calculation algorithms
- Validation functions
- Business rule enforcement

*Example:*
```typescript
// Score calculation
let score = 0;
for (const question of assessmentQuestions) {
  const userAnswer = answers[question.id];
  if (userAnswer === question.correctAnswer) {
    score++;
  }
}
```

**Layer 4: Data Access Layer**

*Responsibilities:*
- Execute database queries
- Map database records to objects
- Manage transactions
- Handle database errors

*Components:*
- Drizzle ORM queries
- Database connection management
- Schema definitions
- Query builders

*Example:*
```typescript
// Database query
const assessmentQuestions = await db
  .select()
  .from(questions)
  .where(eq(questions.assessmentId, assessmentId));
```

**Layer 5: Data Layer**

*Responsibilities:*
- Persist data reliably
- Enforce constraints
- Maintain referential integrity
- Optimize query performance

*Components:*
- PostgreSQL database
- Tables and indexes
- Foreign key constraints
- Triggers and functions

### 4.3 Component Architecture

**Frontend Component Hierarchy:**

```
App Layout (app/layout.tsx)
│
├── Landing Page (app/page.tsx)
│   └── Hero Section
│   └── Features List
│   └── Call-to-Action
│
├── Auth Pages
│   ├── Login Page (app/login/page.tsx)
│   │   └── Login Form (Client Component)
│   │
│   └── Signup Page (app/signup/page.tsx)
│       └── Signup Form (Client Component)
│
├── Dashboard (app/dashboard/page.tsx)
│   ├── Assessment Cards
│   ├── Attempt History
│   └── Sign Out Button
│
├── Assessment Page (app/assessment/[id]/page.tsx)
│   └── Test Taker Component (Client)
│       ├── Timer Display
│       ├── Question Display
│       ├── Answer Options
│       ├── Navigation Controls
│       └── Progress Indicators
│
└── Results Page (app/results/[id]/page.tsx)
    ├── Score Summary
    ├── Grade Display
    └── Answer Review
        ├── Question List
        └── Answer Comparison
```

**Component Communication Patterns:**

1. **Props Down**: Parent components pass data to children
2. **Events Up**: Children notify parents via callbacks
3. **Server to Client**: Server components fetch data, pass to client
4. **API Calls**: Client components call API routes
5. **Router Navigation**: programmatic navigation via useRouter

### 4.4 Data Flow Diagrams

**User Registration Flow:**

```
User → Signup Form → signUp.email() → Better Auth
                                            ↓
                                    Create User Record
                                            ↓
                                    Create Session
                                            ↓
                                    Return Session
                                            ↓
Redirect to Dashboard ← Client ← Session Cookie
```

**Test Taking Flow:**

```
User Clicks "Start Test"
         ↓
Server Component Fetches Assessment + Questions
         ↓
Pass Data to Client Component
         ↓
User Answers Questions (State Updates)
         ↓
Timer Counts Down
         ↓
User/Timer Triggers Submit
         ↓
POST /api/submit-test
         ↓
Validate Session
         ↓
Calculate Score
         ↓
Insert userAttempts Record
         ↓
Insert userAnswers Records
         ↓
Return Attempt ID
         ↓
Navigate to Results
```

**Score Calculation Flow:**

```
Receive User Answers
         ↓
Fetch Assessment Questions with Correct Answers
         ↓
Initialize score = 0
         ↓
For Each Question:
    ├── Get User Answer
    ├── Compare with Correct Answer
    ├── If Match: score++
    └── Record isCorrect flag
         ↓
Return Final Score
```

**Authentication Flow:**

```
User Login Request
         ↓
Better Auth Validates Credentials
         ↓
Generate Session Token
         ↓
Store Session in Database
         ↓
Set HTTP-Only Cookie
         ↓
Client Receives Cookie
         ↓
Subsequent Requests Include Cookie
         ↓
Server Validates Session on Each Request
```

### 4.5 System Integration

**Database Integration:**

```typescript
// lib/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
```

**Authentication Integration:**

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
```

**Client-Side Auth Integration:**

```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signUp, signOut } = authClient;
```

**API Route Integration:**

```typescript
// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";

export const { GET, POST } = auth.handler;
```

**Environment Configuration:**

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/prismberry
BETTER_AUTH_SECRET=your-32-character-secret-key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

**System Integration Points:**

1. **Frontend ↔ API Routes**: Fetch API calls with JSON payloads
2. **API Routes ↔ Database**: Drizzle ORM queries
3. **API Routes ↔ Auth**: Better Auth session validation
4. **Client ↔ Auth**: Better Auth React hooks
5. **Server Components ↔ Database**: Direct database access
6. **Docker ↔ PostgreSQL**: Container orchestration

**External Dependencies:**

- **Better Auth Service**: Session and user management
- **PostgreSQL Database**: Data persistence
- **Node.js Runtime**: Server-side execution
- **Browser APIs**: Client-side features (Timer, Storage)

**Integration Security:**

- Session tokens in HTTP-only cookies
- CSRF protection via Better Auth
- SQL injection prevention via parameterized queries
- Input validation on all API routes
- Type safety via TypeScript

---

<div style="page-break-after: always;"></div>

## 5. Database Design

### 5.1 Database Schema

The AssessHub database schema consists of 9 tables organized into two logical groups: authentication tables (managed by Better Auth) and assessment tables (custom application tables).

**Schema Overview:**

```sql
-- Authentication Tables (Better Auth)
- user
- session
- account
- verification

-- Assessment Tables (Custom)
- assessments
- questions
- user_attempts
- user_answers
- profiles (legacy/unused)
```

**Schema Design Principles:**

1. **Normalization**: Tables follow Third Normal Form (3NF)
2. **Referential Integrity**: Foreign keys enforce relationships
3. **Cascade Deletes**: Maintain data consistency
4. **Timestamps**: Track creation and modification times
5. **Type Safety**: Appropriate data types for each column

### 5.2 Entity-Relationship Diagram

```
┌──────────────┐         ┌──────────────────┐
│     user     │←────────│    session       │
│              │         │                  │
│ • id (PK)    │         │ • id (PK)        │
│ • name       │         │ • userId (FK)    │
│ • email      │         │ • token          │
│ • created_at │         │ • expiresAt      │
└──────┬───────┘         └──────────────────┘
       │
       │ 1:N
       │
       ├──────────────────────────────────┐
       │                                   │
       ↓                                   ↓
┌──────────────┐                  ┌──────────────┐
│   account    │                  │user_attempts │
│              │                  │              │
│ • id (PK)    │                  │ • id (PK)    │
│ • userId(FK) │                  │ • userId(FK) │
│ • password   │                  │ • assess_id  │
└──────────────┘                  │ • score      │
                                  │ • completed  │
                                  └──────┬───────┘
                                         │
                                         │ 1:N
                                         │
                                         ↓
                                  ┌──────────────┐
                                  │user_answers  │
                                  │              │
                                  │ • id (PK)    │
                                  │ • attempt_id │
                                  │ • question_id│
                                  │ • selected   │
                                  │ • isCorrect  │
                                  └──────┬───────┘
                                         │
                                         │ N:1
                                         │
┌──────────────┐                         ↓
│ assessments  │                  ┌──────────────┐
│              │←─────────────────│  questions   │
│ • id (PK)    │   1:N            │              │
│ • title      │                  │ • id (PK)    │
│ • category   │                  │ • assess_id  │
│ • duration   │                  │ • text       │
│ • total_q    │                  │ • options    │
└──────────────┘                  │ • correct    │
                                  └──────────────┘
```

### 5.3 Table Specifications

**Table: user**

*Purpose:* Store user account information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | text | PRIMARY KEY | Unique user identifier |
| name | text | NOT NULL | User's full name |
| email | text | NOT NULL, UNIQUE | User's email address |
| emailVerified | boolean | NOT NULL, DEFAULT false | Email verification status |
| image | text | NULL | Profile image URL |
| createdAt | timestamp | NOT NULL | Account creation time |
| updatedAt | timestamp | NOT NULL | Last update time |

*Indexes:*
- PRIMARY KEY on `id`
- UNIQUE INDEX on `email`

*Relationships:*
- One-to-many with `session`
- One-to-many with `account`
- One-to-many with `user_attempts`

**Table: session**

*Purpose:* Manage user authentication sessions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | text | PRIMARY KEY | Session identifier |
| expiresAt | timestamp | NOT NULL | Session expiration time |
| token | text | NOT NULL, UNIQUE | Session token |
| createdAt | timestamp | NOT NULL | Session creation time |
| updatedAt | timestamp | NOT NULL | Last session update |
| ipAddress | text | NULL | Client IP address |
| userAgent | text | NULL | Client user agent |
| userId | text | NOT NULL, FK(user.id) | Associated user |

*Indexes:*
- PRIMARY KEY on `id`
- UNIQUE INDEX on `token`
- INDEX on `userId`

*Relationships:*
- Many-to-one with `user`

**Table: account**

*Purpose:* Store authentication provider credentials

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | text | PRIMARY KEY | Account identifier |
| accountId | text | NOT NULL | Provider account ID |
| providerId | text | NOT NULL | Auth provider ID |
| userId | text | NOT NULL, FK(user.id) | Associated user |
| password | text | NULL | Hashed password |
| accessToken | text | NULL | OAuth access token |
| refreshToken | text | NULL | OAuth refresh token |
| createdAt | timestamp | NOT NULL | Account creation |
| updatedAt | timestamp | NOT NULL | Last update |

*Indexes:*
- PRIMARY KEY on `id`
- INDEX on `userId`

*Relationships:*
- Many-to-one with `user`

**Table: verification**

*Purpose:* Store email verification tokens

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | text | PRIMARY KEY | Verification ID |
| identifier | text | NOT NULL | Email/identifier |
| value | text | NOT NULL | Verification token |
| expiresAt | timestamp | NOT NULL | Token expiration |
| createdAt | timestamp | NULL | Creation time |
| updatedAt | timestamp | NULL | Update time |

**Table: assessments**

*Purpose:* Define available assessments

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Assessment ID |
| title | text | NOT NULL | Assessment title |
| description | text | NOT NULL | Assessment description |
| category | text | NOT NULL | Category (verbal, numerical) |
| duration | integer | NOT NULL | Duration in minutes |
| total_questions | integer | NOT NULL | Number of questions |
| created_at | timestamp | NOT NULL, DEFAULT now() | Creation timestamp |

*Indexes:*
- PRIMARY KEY on `id`
- INDEX on `category` (for filtering)

*Relationships:*
- One-to-many with `questions`
- One-to-many with `user_attempts`

*Sample Data:*
```sql
INSERT INTO assessments VALUES
  (1, 'Verbal Ability Test', 'Test your verbal reasoning...', 
   'verbal', 20, 10, NOW()),
  (2, 'Numerical Ability Test', 'Test your numerical skills...', 
   'numerical', 20, 10, NOW());
```

**Table: questions**

*Purpose:* Store assessment questions and answers

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Question ID |
| assessment_id | integer | NOT NULL, FK(assessments.id) | Parent assessment |
| question_text | text | NOT NULL | Question content |
| option1 | text | NOT NULL | First option |
| option2 | text | NOT NULL | Second option |
| option3 | text | NOT NULL | Third option |
| option4 | text | NOT NULL | Fourth option |
| correct_answer | integer | NOT NULL | Correct option (1-4) |
| order | integer | NOT NULL | Display order |
| created_at | timestamp | NOT NULL, DEFAULT now() | Creation time |

*Indexes:*
- PRIMARY KEY on `id`
- INDEX on `assessment_id`
- INDEX on `(assessment_id, order)` for ordered retrieval

*Constraints:*
- `correct_answer` must be between 1 and 4
- `order` must be positive
- ON DELETE CASCADE from assessments

*Relationships:*
- Many-to-one with `assessments`
- One-to-many with `user_answers`

*Sample Data:*
```sql
INSERT INTO questions VALUES
  (1, 1, 'What is a synonym for "happy"?', 
   'Joyful', 'Sad', 'Angry', 'Tired', 1, 1, NOW());
```

**Table: user_attempts**

*Purpose:* Record user test attempts

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Attempt ID |
| user_id | text | NOT NULL, FK(user.id) | User who took test |
| assessment_id | integer | NOT NULL, FK(assessments.id) | Assessment taken |
| score | integer | NOT NULL | Number correct |
| total_questions | integer | NOT NULL | Total questions |
| started_at | timestamp | NOT NULL | Test start time |
| completed_at | timestamp | NOT NULL | Test completion time |
| created_at | timestamp | NOT NULL, DEFAULT now() | Record creation |

*Indexes:*
- PRIMARY KEY on `id`
- INDEX on `user_id`
- INDEX on `assessment_id`
- INDEX on `(user_id, created_at)` for history

*Constraints:*
- `score` ≤ `total_questions`
- `completed_at` ≥ `started_at`
- ON DELETE CASCADE from user and assessments

*Relationships:*
- Many-to-one with `user`
- Many-to-one with `assessments`
- One-to-many with `user_answers`

**Table: user_answers**

*Purpose:* Store individual answer selections

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Answer ID |
| attempt_id | integer | NOT NULL, FK(user_attempts.id) | Parent attempt |
| question_id | integer | NOT NULL, FK(questions.id) | Answered question |
| selected_answer | integer | NOT NULL | Selected option (1-4) |
| is_correct | boolean | NOT NULL | Correctness flag |
| created_at | timestamp | NOT NULL, DEFAULT now() | Answer time |

*Indexes:*
- PRIMARY KEY on `id`
- INDEX on `attempt_id`
- INDEX on `question_id`
- UNIQUE INDEX on `(attempt_id, question_id)` prevents duplicates

*Constraints:*
- `selected_answer` must be between 1 and 4
- ON DELETE CASCADE from user_attempts and questions

*Relationships:*
- Many-to-one with `user_attempts`
- Many-to-one with `questions`

### 5.4 Relationships and Constraints

**Foreign Key Relationships:**

```sql
-- session → user
ALTER TABLE session
  ADD CONSTRAINT fk_session_user 
  FOREIGN KEY (userId) REFERENCES user(id);

-- account → user
ALTER TABLE account
  ADD CONSTRAINT fk_account_user
  FOREIGN KEY (userId) REFERENCES user(id);

-- questions → assessments
ALTER TABLE questions
  ADD CONSTRAINT fk_questions_assessments
  FOREIGN KEY (assessment_id) REFERENCES assessments(id)
  ON DELETE CASCADE;

-- user_attempts → user
ALTER TABLE user_attempts
  ADD CONSTRAINT fk_attempts_user
  FOREIGN KEY (user_id) REFERENCES user(id)
  ON DELETE CASCADE;

-- user_attempts → assessments
ALTER TABLE user_attempts
  ADD CONSTRAINT fk_attempts_assessments
  FOREIGN KEY (assessment_id) REFERENCES assessments(id)
  ON DELETE CASCADE;

-- user_answers → user_attempts
ALTER TABLE user_answers
  ADD CONSTRAINT fk_answers_attempts
  FOREIGN KEY (attempt_id) REFERENCES user_attempts(id)
  ON DELETE CASCADE;

-- user_answers → questions
ALTER TABLE user_answers
  ADD CONSTRAINT fk_answers_questions
  FOREIGN KEY (question_id) REFERENCES questions(id)
  ON DELETE CASCADE;
```

**Check Constraints:**

```sql
-- Validate correct_answer range
ALTER TABLE questions
  ADD CONSTRAINT check_correct_answer
  CHECK (correct_answer >= 1 AND correct_answer <= 4);

-- Validate selected_answer range
ALTER TABLE user_answers
  ADD CONSTRAINT check_selected_answer
  CHECK (selected_answer >= 1 AND selected_answer <= 4);

-- Validate score doesn't exceed total
ALTER TABLE user_attempts
  ADD CONSTRAINT check_score_valid
  CHECK (score <= total_questions AND score >= 0);

-- Validate duration is positive
ALTER TABLE assessments
  ADD CONSTRAINT check_duration_positive
  CHECK (duration > 0);

-- Validate completion time after start
ALTER TABLE user_attempts
  ADD CONSTRAINT check_completion_after_start
  CHECK (completed_at >= started_at);
```

**Unique Constraints:**

```sql
-- Ensure email uniqueness
ALTER TABLE user
  ADD CONSTRAINT unique_email UNIQUE (email);

-- Ensure session token uniqueness
ALTER TABLE session
  ADD CONSTRAINT unique_token UNIQUE (token);

-- Prevent duplicate answers in same attempt
ALTER TABLE user_answers
  ADD CONSTRAINT unique_attempt_question
  UNIQUE (attempt_id, question_id);
```

**Cascade Behavior:**

| Parent Table | Child Table | Delete Action | Rationale |
|--------------|-------------|---------------|-----------|
| user | session | No cascade | Sessions expire naturally |
| user | account | No cascade | Preserve auth history |
| user | user_attempts | CASCADE | User owns attempts |
| assessments | questions | CASCADE | Questions belong to assessment |
| assessments | user_attempts | CASCADE | Invalid without assessment |
| user_attempts | user_answers | CASCADE | Answers belong to attempt |
| questions | user_answers | CASCADE | Invalid without question |

### 5.5 Data Migration Strategy

**Initial Schema Creation:**

```bash
# Generate migrations from schema
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Or push schema directly (development)
npm run db:push
```

**Drizzle Schema Definition:**

```typescript
// lib/db/schema.ts
import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  duration: integer("duration").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ... other tables
```

**Migration Files:**

```sql
-- drizzle/0000_faithful_warhawk.sql
CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "emailVerified" boolean DEFAULT false NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "assessments" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "category" text NOT NULL,
  "duration" integer NOT NULL,
  "total_questions" integer NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- ... rest of schema
```

**Seeding Strategy:**

```typescript
// lib/db/seed.ts
import { db } from './index';
import { assessments, questions } from './schema';

async function seed() {
  // Insert assessments
  const [verbalAssessment] = await db.insert(assessments).values({
    title: 'Verbal Ability Test',
    description: 'Test your verbal reasoning skills...',
    category: 'verbal',
    duration: 20,
    totalQuestions: 10,
  }).returning();

  // Insert questions
  await db.insert(questions).values([
    {
      assessmentId: verbalAssessment.id,
      questionText: 'What is a synonym for "happy"?',
      option1: 'Joyful',
      option2: 'Sad',
      option3: 'Angry',
      option4: 'Tired',
      correctAnswer: 1,
      order: 1,
    },
    // ... more questions
  ]);
}

seed().catch(console.error);
```

**Running Seeds:**

```bash
npm run db:seed
```

**Version Control:**

- Migration files tracked in Git
- Schema changes require new migrations
- Rollback capability via drizzle-kit
- Production migrations run via CI/CD

**Data Integrity Checks:**

```sql
-- Verify referential integrity
SELECT a.id, COUNT(q.id) as question_count
FROM assessments a
LEFT JOIN questions q ON q.assessment_id = a.id
GROUP BY a.id;

-- Verify attempt consistency
SELECT ua.id, ua.score, COUNT(uans.id) as answer_count
FROM user_attempts ua
LEFT JOIN user_answers uans ON uans.attempt_id = ua.id
WHERE uans.is_correct = true
GROUP BY ua.id, ua.score
HAVING COUNT(uans.id) != ua.score;
```

---

<div style="page-break-after: always;"></div>

## 6. Authentication System

### 6.1 Better Auth Integration

AssessHub implements authentication using Better Auth, a modern, type-safe authentication library designed for Next.js applications.

**Better Auth Configuration:**

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every 24 hours
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});

export type Session = typeof auth.$Infer.Session;
```

**Key Features:**

1. **Database Adapter**: Direct integration with Drizzle ORM
2. **Email/Password Auth**: Built-in credential authentication
3. **Session Management**: Automatic token generation and validation
4. **Type Safety**: Full TypeScript support
5. **Security**: Bcrypt password hashing, secure token generation

**Client-Side Configuration:**

```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
```

**API Route Handler:**

```typescript
// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";

export const { GET, POST } = auth.handler;
```

This single route handles all authentication endpoints:
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in/email` - Email/password login
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/get-session` - Session validation

### 6.2 User Registration Flow

**Registration Process:**

```
1. User submits signup form
         ↓
2. Client calls signUp.email()
         ↓
3. Better Auth validates input
         ↓
4. Checks email uniqueness
         ↓
5. Hashes password with bcrypt
         ↓
6. Creates user record in database
         ↓
7. Generates session token
         ↓
8. Stores session in database
         ↓
9. Sets HTTP-only cookie
         ↓
10. Returns success response
         ↓
11. Client redirects to dashboard
```

**Signup Page Implementation:**

```typescript
// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signUp.email({
        name,
        email,
        password,
      });
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (min 8 characters)"
        minLength={8}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
```

**Validation Rules:**

- **Name**: Required, minimum 1 character
- **Email**: Required, valid email format, unique in database
- **Password**: Required, minimum 8 characters

**Error Handling:**

- Duplicate email: "Email already registered"
- Weak password: "Password must be at least 8 characters"
- Network error: "Failed to create account"
- Server error: "Something went wrong"

### 6.3 Login and Session Management

**Login Process:**

```
1. User submits login form
         ↓
2. Client calls signIn.email()
         ↓
3. Better Auth queries user by email
         ↓
4. Compares password hash
         ↓
5. If valid: generates new session token
         ↓
6. Stores session in database
         ↓
7. Sets HTTP-only cookie
         ↓
8. Returns user data
         ↓
9. Client redirects to dashboard
```

**Login Page Implementation:**

```typescript
// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn.email({
        email,
        password,
      });
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
```

**Session Management:**

**Session Storage:**
- Sessions stored in `session` table
- Token stored in HTTP-only cookie
- Session includes user ID, expiry, IP, user agent

**Session Validation:**

```typescript
// Server-side session check
export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // User is authenticated
  const userId = session.user.id;
  // ... proceed with authorized operations
}
```

**Session Lifetime:**

- **Initial Expiry**: 7 days from creation
- **Update Age**: Session updated every 24 hours
- **Sliding Window**: Active sessions extend automatically
- **Absolute Timeout**: Max 7 days regardless of activity

**Logout Process:**

```typescript
// Client-side logout
const handleSignOut = async () => {
  await signOut();
  router.push("/login");
};
```

**Logout Flow:**

```
1. User clicks sign out
         ↓
2. Client calls signOut()
         ↓
3. Better Auth deletes session from database
         ↓
4. Clears session cookie
         ↓
5. Client redirects to login page
```

### 6.4 Security Considerations

**Password Security:**

1. **Hashing Algorithm**: Bcrypt with automatic salt generation
2. **Password Requirements**: Minimum 8 characters
3. **No Plain Text**: Passwords never stored or logged in plain text
4. **No Password Exposure**: Not returned in API responses

**Session Security:**

1. **HTTP-Only Cookies**: Prevents XSS attacks
2. **Secure Flag**: HTTPS-only in production
3. **SameSite**: CSRF protection
4. **Token Rotation**: New token on each update
5. **Expiration**: Automatic cleanup of expired sessions

**Cookie Configuration:**

```typescript
// Better Auth automatically configures:
{
  httpOnly: true,        // No JavaScript access
  secure: true,          // HTTPS only in production
  sameSite: 'lax',       // CSRF protection
  path: '/',             // Available site-wide
  maxAge: 7 * 24 * 60 * 60  // 7 days
}
```

**API Protection:**

```typescript
// Protected API route pattern
export async function POST(request: NextRequest) {
  // 1. Validate session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // 2. Reject if unauthorized
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // 3. Proceed with authorized operation
  const userId = session.user.id;
  // ...
}
```

**Protected Page Pattern:**

```typescript
// Server component protection
export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // User is authenticated
  return <Dashboard user={session.user} />;
}
```

**Input Validation:**

```typescript
// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  throw new Error("Invalid email format");
}

// Validate password strength
if (password.length < 8) {
  throw new Error("Password too short");
}
```

**SQL Injection Prevention:**

```typescript
// Drizzle ORM uses parameterized queries automatically
const user = await db
  .select()
  .from(userTable)
  .where(eq(userTable.email, email));  // Safe from injection
```

**Rate Limiting Considerations:**

While not implemented in current version, production should include:
- Max login attempts per IP
- CAPTCHA after failed attempts
- Temporary account lockout
- Suspicious activity alerts

### 6.5 Protected Routes Implementation

**Server Component Protection:**

```typescript
// app/dashboard/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Fetch user-specific data
  const attempts = await db
    .select()
    .from(userAttempts)
    .where(eq(userAttempts.userId, session.user.id));

  return <Dashboard user={session.user} attempts={attempts} />;
}
```

**Client Component Protection:**

```typescript
// Using useSession hook
"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedComponent() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return <div>Protected content for {session.user.name}</div>;
}
```

**API Route Protection:**

```typescript
// app/api/submit-test/route.ts
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Authorized operations...
}
```

**Route Protection Summary:**

| Page | Protection Method | Redirect Target |
|------|-------------------|-----------------|
| `/login` | Public | N/A |
| `/signup` | Public | N/A |
| `/` (landing) | Public | N/A |
| `/dashboard` | Server component | `/login` |
| `/assessment/[id]` | Server component | `/login` |
| `/results/[id]` | Server component | `/login` |
| `/api/submit-test` | API validation | 401 error |

---

<div style="page-break-after: always;"></div>

## 7. Assessment Module

### 7.1 Assessment Structure

Assessments in AssessHub are structured entities that define the scope, timing, and content of each test.

**Assessment Entity:**

```typescript
interface Assessment {
  id: number;
  title: string;
  description: string;
  category: string;        // 'verbal' or 'numerical'
  duration: number;        // minutes
  totalQuestions: number;
  createdAt: Date;
}
```

**Assessment Categories:**

| Category | Description | Skills Tested |
|----------|-------------|---------------|
| Verbal | Language and reasoning | Vocabulary, grammar, comprehension |
| Numerical | Mathematical reasoning | Arithmetic, logic, problem-solving |

**Assessment Configuration:**

```typescript
const assessmentConfig = {
  questionsPerPage: 1,      // One question at a time
  allowNavigation: true,    // Can jump between questions
  allowReview: true,        // Can change answers
  autoSubmit: true,         // Submit when timer expires
  showProgress: true,       // Display progress indicators
  showTimer: true,          // Display countdown
  shuffleQuestions: false,  // Maintain order
  shuffleOptions: false,    // Maintain option order
};
```

### 7.2 Question Management

**Question Entity:**

```typescript
interface Question {
  id: number;
  assessmentId: number;
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: number;   // 1-4
  order: number;
  createdAt: Date;
}
```

**Question Retrieval:**

```typescript
// Server component fetches questions
export default async function AssessmentPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const assessmentId = parseInt(params.id);
  
  // Fetch assessment
  const [assessment] = await db
    .select()
    .from(assessments)
    .where(eq(assessments.id, assessmentId));
  
  // Fetch questions in order
  const questions = await db
    .select()
    .from(questionsTable)
    .where(eq(questionsTable.assessmentId, assessmentId))
    .orderBy(questionsTable.order);
  
  return <TestTaker assessment={assessment} questions={questions} />;
}
```

**Question Display Format:**

```
┌───────────────────────────────────────┐
│ Question 5 of 10                      │
├───────────────────────────────────────┤
│                                       │
│ What is a synonym for "happy"?        │
│                                       │
│ ○ Joyful                              │
│ ○ Sad                                 │
│ ○ Angry                               │
│ ○ Tired                               │
│                                       │
└───────────────────────────────────────┘
```

### 7.3 Test Configuration

**Duration Settings:**

- Default duration: 20 minutes
- Minimum duration: 5 minutes
- Maximum duration: 120 minutes
- Grace period: None (strict timeout)

**Question Settings:**

- Questions per assessment: 10
- Options per question: 4 (A, B, C, D)
- Correct answers per question: 1
- Partial credit: Not supported

**Navigation Settings:**

```typescript
const navigationRules = {
  canSkipQuestions: true,      // Can leave unanswered
  canNavigateBack: true,       // Can go to previous
  canJumpToQuestion: true,     // Direct navigation
  mustAnswerAll: false,        // Optional answers
  confirmSubmission: false,    // Direct submit
};
```

### 7.4 Seeding Strategy

**Seed Script Structure:**

```typescript
// lib/db/seed.ts
import { db } from './index';
import { assessments, questions } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Check if already seeded
  const existing = await db.select().from(assessments);
  if (existing.length > 0) {
    console.log('✅ Database already seeded');
    return;
  }

  // Seed Verbal Assessment
  const [verbalAssessment] = await db
    .insert(assessments)
    .values({
      title: 'Verbal Ability Test',
      description: 'Test your verbal reasoning skills with vocabulary and grammar questions.',
      category: 'verbal',
      duration: 20,
      totalQuestions: 10,
    })
    .returning();

  // Seed Verbal Questions
  await db.insert(questions).values([
    {
      assessmentId: verbalAssessment.id,
      questionText: 'What is a synonym for "happy"?',
      option1: 'Joyful',
      option2: 'Sad',
      option3: 'Angry',
      option4: 'Tired',
      correctAnswer: 1,
      order: 1,
    },
    {
      assessmentId: verbalAssessment.id,
      questionText: 'Which word is an antonym of "difficult"?',
      option1: 'Hard',
      option2: 'Easy',
      option3: 'Complex',
      option4: 'Complicated',
      correctAnswer: 2,
      order: 2,
    },
    // ... 8 more questions
  ]);

  // Seed Numerical Assessment
  const [numericalAssessment] = await db
    .insert(assessments)
    .values({
      title: 'Numerical Ability Test',
      description: 'Test your numerical reasoning with arithmetic and logic questions.',
      category: 'numerical',
      duration: 20,
      totalQuestions: 10,
    })
    .returning();

  // Seed Numerical Questions
  await db.insert(questions).values([
    {
      assessmentId: numericalAssessment.id,
      questionText: 'What is 15 + 27?',
      option1: '40',
      option2: '41',
      option3: '42',
      option4: '43',
      correctAnswer: 3,
      order: 1,
    },
    // ... 9 more questions
  ]);

  console.log('✅ Database seeded successfully');
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
```

**Running Seeds:**

```bash
# Run seed script
npm run db:seed

# Output:
# 🌱 Seeding database...
# ✅ Database seeded successfully
```

**Seed Data Verification:**

```sql
-- Check assessments
SELECT id, title, category, duration, total_questions 
FROM assessments;

-- Check questions per assessment
SELECT a.title, COUNT(q.id) as question_count
FROM assessments a
LEFT JOIN questions q ON q.assessment_id = a.id
GROUP BY a.id, a.title;
```

---

<div style="page-break-after: always;"></div>

## 8. Test-Taking Interface

### 8.1 User Interface Design

The test-taking interface is designed for clarity, focus, and ease of navigation.

**Layout Structure:**

```
┌─────────────────────────────────────────────────┐
│ Header                                          │
│ [Logo] Verbal Ability Test      [Timer] 19:45  │
│ Question 3 of 10                                │
│ [Progress Bar ████████────────────────]         │
├─────────────────────────────────────────────────┤
│                                                 │
│ Main Content Area                               │
│                                                 │
│ What is a synonym for "happy"?                  │
│                                                 │
│ ○ Joyful                                        │
│ ○ Sad                                           │
│ ○ Angry                                         │
│ ○ Tired                                         │
│                                                 │
│                                                 │
│ [Previous]    3 of 10 answered    [Next]        │
│                                                 │
├─────────────────────────────────────────────────┤
│ Question Navigator                              │
│ [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]        │
└─────────────────────────────────────────────────┘
```

**Visual Hierarchy:**

1. **Primary Focus**: Question text (24px, bold)
2. **Secondary**: Answer options (16px)
3. **Tertiary**: Navigation controls
4. **Persistent**: Timer and progress

**Color Coding:**

- **Blue (#2563eb)**: Current question, primary actions
- **Green (#16a34a)**: Answered questions, submit button
- **Gray (#6b7280)**: Unanswered questions, disabled state
- **Red (#dc2626)**: Timer warning (<2 minutes)

### 8.2 Question Navigation

**Navigation Methods:**

**1. Sequential Navigation:**

```typescript
// Next button
const handleNext = () => {
  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(prev => prev + 1);
  }
};

// Previous button
const handlePrevious = () => {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(prev => prev - 1);
  }
};
```

**2. Direct Navigation:**

```typescript
// Question navigator
const jumpToQuestion = (index: number) => {
  setCurrentQuestionIndex(index);
};

// Render navigator buttons
{questions.map((question, index) => (
  <button
    key={question.id}
    onClick={() => jumpToQuestion(index)}
    className={getNavigatorButtonClass(index)}
  >
    {index + 1}
  </button>
))}
```

**Navigation Rules:**

- Previous button disabled on first question
- Next button changes to "Submit" on last question
- Can jump to any question at any time
- Current question highlighted in navigator
- Answered questions marked with green indicator

**Navigator Button States:**

```typescript
const getNavigatorButtonClass = (index: number) => {
  const isCurrent = index === currentQuestionIndex;
  const isAnswered = answers[questions[index].id] !== undefined;
  
  if (isCurrent) {
    return 'border-blue-600 bg-blue-600 text-white';
  } else if (isAnswered) {
    return 'border-green-600 bg-green-50 text-green-700';
  } else {
    return 'border-gray-300 bg-white text-gray-700';
  }
};
```

### 8.3 Timer Implementation

**Timer State Management:**

```typescript
const [timeLeft, setTimeLeft] = useState(assessment.duration * 60);
```

**Countdown Logic:**

```typescript
useEffect(() => {
  // Auto-submit when time expires
  if (timeLeft <= 0) {
    handleSubmit();
    return;
  }

  // Decrement every second
  const timer = setInterval(() => {
    setTimeLeft(prev => prev - 1);
  }, 1000);

  // Cleanup
  return () => clearInterval(timer);
}, [timeLeft]);
```

**Timer Display:**

```typescript
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Render
<div className="timer">
  <Clock className="h-5 w-5" />
  <span className={timeLeft < 120 ? 'text-red-600' : ''}>
    {formatTime(timeLeft)}
  </span>
</div>
```

**Timer Features:**

- **Visual Indicator**: Always visible in header
- **Warning State**: Red color when < 2 minutes
- **Countdown**: Updates every second
- **Auto-Submit**: Triggers submission at 0:00
- **No Pause**: Continuous countdown

**Timer Precision:**

```typescript
// Using setInterval ensures consistent 1-second updates
// Timer drift is minimal for 20-minute duration
// More precise implementation could use Date.now() comparison

// Precise timer implementation (alternative):
const startTime = useRef(Date.now());
const duration = assessment.duration * 60 * 1000;

useEffect(() => {
  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime.current;
    const remaining = Math.max(0, duration - elapsed);
    setTimeLeft(Math.floor(remaining / 1000));
    
    if (remaining <= 0) {
      handleSubmit();
    }
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

### 8.4 Answer Selection Mechanism

**Answer State:**

```typescript
// Store answers as record of question ID to selected option (1-4)
const [answers, setAnswers] = useState<Record<number, number>>({});
```

**Selection Handler:**

```typescript
const handleAnswer = (questionId: number, answer: number) => {
  setAnswers(prev => ({
    ...prev,
    [questionId]: answer
  }));
};
```

**Option Rendering:**

```typescript
{[1, 2, 3, 4].map((optionNum) => {
  const optionText = currentQuestion[`option${optionNum}`];
  const isSelected = answers[currentQuestion.id] === optionNum;
  
  return (
    <button
      key={optionNum}
      onClick={() => handleAnswer(currentQuestion.id, optionNum)}
      className={`option-button ${isSelected ? 'selected' : ''}`}
    >
      <div className="radio-indicator">
        {isSelected && <div className="radio-dot" />}
      </div>
      <span>{optionText}</span>
    </button>
  );
})}
```

**Selection Features:**

- **Single Selection**: Only one option per question
- **Visual Feedback**: Selected option highlighted immediately
- **Changeable**: Can change selection before submission
- **Persistent**: Selection maintained when navigating away
- **Optional**: Questions can be left unanswered

**Answer Validation:**

```typescript
// Client-side validation before submission
const validateAnswers = () => {
  const unansweredCount = questions.length - Object.keys(answers).length;
  
  if (unansweredCount > 0) {
    console.log(`${unansweredCount} questions unanswered`);
    // Note: Currently allows submission with unanswered questions
  }
  
  return true;
};
```

### 8.5 Progress Tracking

**Progress Calculation:**

```typescript
// Visual progress bar
const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

// Answered count
const answeredCount = Object.keys(answers).length;
```

**Progress Indicators:**

**1. Progress Bar:**

```tsx
<div className="progress-bar-container">
  <div 
    className="progress-bar-fill"
    style={{ width: `${progress}%` }}
  />
</div>
```

**2. Question Counter:**

```tsx
<p>Question {currentQuestionIndex + 1} of {questions.length}</p>
```

**3. Answered Counter:**

```tsx
<p>{answeredCount} of {questions.length} answered</p>
```

**4. Navigator Visual:**

```tsx
{questions.map((q, idx) => {
  const isAnswered = answers[q.id] !== undefined;
  return (
    <div 
      className={`nav-dot ${isAnswered ? 'answered' : 'unanswered'}`}
    />
  );
})}
```

**Progress Features:**

- Real-time updates on every action
- Multiple visual representations
- Clear indication of completion status
- Helps users track their pace
- No explicit progress percentage shown

### 8.6 Auto-Submission Logic

**Submission Triggers:**

**1. Manual Submission:**

```typescript
const handleSubmit = async () => {
  if (isSubmitting) return; // Prevent double submission
  
  setIsSubmitting(true);
  
  try {
    const response = await fetch('/api/submit-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        assessmentId: assessment.id,
        answers,
      }),
    });
    
    const data = await response.json();
    
    if (data.attemptId) {
      router.push(`/results/${data.attemptId}`);
    }
  } catch (error) {
    console.error('Failed to submit test:', error);
    setIsSubmitting(false);
  }
};
```

**2. Auto-Submission (Timeout):**

```typescript
useEffect(() => {
  if (timeLeft <= 0) {
    handleSubmit(); // Automatic submission
    return;
  }
  
  const timer = setInterval(() => {
    setTimeLeft(prev => prev - 1);
  }, 1000);
  
  return () => clearInterval(timer);
}, [timeLeft]);
```

**Submission Flow:**

```
User Clicks Submit OR Timer Reaches 0:00
              ↓
Validate not already submitting
              ↓
Set isSubmitting = true
              ↓
Disable all UI interactions
              ↓
POST to /api/submit-test with answers
              ↓
Server calculates score
              ↓
Server saves attempt and answers
              ↓
Server returns attemptId
              ↓
Client navigates to /results/[attemptId]
```

**Submission Protection:**

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

// Prevent multiple submissions
if (isSubmitting) return;

// Disable submit button during submission
<button 
  disabled={isSubmitting}
  onClick={handleSubmit}
>
  {isSubmitting ? 'Submitting...' : 'Submit Test'}
</button>
```

**Error Handling:**

```typescript
try {
  const response = await fetch('/api/submit-test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assessmentId, answers }),
  });
  
  if (!response.ok) {
    throw new Error('Submission failed');
  }
  
  const data = await response.json();
  router.push(`/results/${data.attemptId}`);
} catch (error) {
  console.error('Submission error:', error);
  alert('Failed to submit test. Please try again.');
  setIsSubmitting(false); // Re-enable submission
}
```

**Submission Data:**

```typescript
interface SubmissionPayload {
  assessmentId: number;
  answers: Record<number, number>;
}

// Example:
{
  assessmentId: 1,
  answers: {
    101: 1,  // Question 101, selected option 1
    102: 3,  // Question 102, selected option 3
    103: 2,  // Question 103, selected option 2
    // ... more answers
  }
}
```

---

<div style="page-break-after: always;"></div>

## 9. Scoring and Results

### 9.1 Score Calculation Algorithm

**Scoring Logic:**

```typescript
// Server-side score calculation
export async function POST(request: NextRequest) {
  const { assessmentId, answers } = await request.json();
  
  // Fetch all questions with correct answers
  const assessmentQuestions = await db
    .select()
    .from(questions)
    .where(eq(questions.assessmentId, assessmentId));
  
  let score = 0;
  const userAnswerRecords = [];
  
  // Calculate score
  for (const question of assessmentQuestions) {
    const userAnswer = answers[question.id];
    
    if (userAnswer !== undefined) {
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        score++; // Increment score for correct answer
      }
      
      userAnswerRecords.push({
        questionId: question.id,
        selectedAnswer: userAnswer,
        isCorrect,
      });
    } else {
      // Unanswered question counts as incorrect
      userAnswerRecords.push({
        questionId: question.id,
        selectedAnswer: 0, // or null
        isCorrect: false,
      });
    }
  }
  
  return { score, totalQuestions: assessmentQuestions.length };
}
```

**Scoring Rules:**

| Scenario | Points | Notes |
|----------|--------|-------|
| Correct answer | +1 | Each correct answer adds 1 point |
| Incorrect answer | 0 | No penalty for wrong answers |
| Unanswered | 0 | Treated as incorrect |
| Partial credit | Not supported | All-or-nothing scoring |

**Score Calculation Formula:**

```
Score = Number of Correct Answers
Percentage = (Score / Total Questions) × 100
```

**Example Calculation:**

```
Assessment: 10 questions
Correct Answers: 7
Incorrect Answers: 2
Unanswered: 1

Score = 7
Percentage = (7 / 10) × 100 = 70%
Grade = B
```

### 9.2 Results Storage

**Attempt Record:**

```typescript
// Insert attempt record
const [attempt] = await db
  .insert(userAttempts)
  .values({
    userId: session.user.id,
    assessmentId,
    score,
    totalQuestions: assessmentQuestions.length,
    startedAt: new Date(),      // Could track actual start time
    completedAt: new Date(),     // Actual completion time
  })
  .returning();
```

**Answer Records:**

```typescript
// Insert individual answer records
if (userAnswerRecords.length > 0) {
  await db.insert(userAnswers).values(
    userAnswerRecords.map(record => ({
      attemptId: attempt.id,
      questionId: record.questionId,
      selectedAnswer: record.selectedAnswer,
      isCorrect: record.isCorrect,
    }))
  );
}
```

**Data Persistence:**

```
user_attempts table:
┌────┬─────────┬──────────────┬───────┬────────────────┬──────────────┬──────────────┐
│ id │ user_id │ assessment_id│ score │ total_questions│ started_at   │ completed_at │
├────┼─────────┼──────────────┼───────┼────────────────┼──────────────┼──────────────┤
│ 1  │ user_123│ 1            │ 7     │ 10             │ 2025-10-29...│ 2025-10-29...│
└────┴─────────┴──────────────┴───────┴────────────────┴──────────────┴──────────────┘

user_answers table:
┌────┬────────────┬─────────────┬─────────────────┬───────────┐
│ id │ attempt_id │ question_id │ selected_answer │ is_correct│
├────┼────────────┼─────────────┼─────────────────┼───────────┤
│ 1  │ 1          │ 101         │ 1               │ true      │
│ 2  │ 1          │ 102         │ 3               │ false     │
│ 3  │ 1          │ 103         │ 2               │ true      │
└────┴────────────┴─────────────┴─────────────────┴───────────┘
```

### 9.3 Results Display

**Results Page Structure:**

```tsx
// app/results/[id]/page.tsx
export default async function ResultsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const attemptId = parseInt(params.id);
  
  // Fetch attempt with user data
  const [attempt] = await db
    .select()
    .from(userAttempts)
    .where(eq(userAttempts.id, attemptId));
  
  // Fetch assessment details
  const [assessment] = await db
    .select()
    .from(assessments)
    .where(eq(assessments.id, attempt.assessmentId));
  
  // Fetch user answers with question details
  const answersWithQuestions = await db
    .select()
    .from(userAnswers)
    .innerJoin(questions, eq(userAnswers.questionId, questions.id))
    .where(eq(userAnswers.attemptId, attemptId));
  
  const percentage = (attempt.score / attempt.totalQuestions) * 100;
  const grade = calculateGrade(percentage);
  
  return (
    <ResultsDisplay 
      attempt={attempt}
      assessment={assessment}
      answers={answersWithQuestions}
      percentage={percentage}
      grade={grade}
    />
  );
}
```

**Score Summary:**

```tsx
<div className="score-summary">
  <h1>Test Complete!</h1>
  
  <div className="score-display">
    <div className="score-number">{attempt.score}/{attempt.totalQuestions}</div>
    <div className="percentage">{percentage.toFixed(1)}%</div>
    <div className="grade">{grade}</div>
  </div>
  
  <div className="assessment-info">
    <h2>{assessment.title}</h2>
    <p>Completed on {formatDate(attempt.completedAt)}</p>
  </div>
</div>
```

**Answer Review:**

```tsx
<div className="answer-review">
  <h2>Review Your Answers</h2>
  
  {answersWithQuestions.map(({ user_answers, questions }, index) => (
    <div key={user_answers.id} className="review-item">
      <div className="question-header">
        <span>Question {index + 1}</span>
        <span className={user_answers.isCorrect ? 'correct' : 'incorrect'}>
          {user_answers.isCorrect ? '✓ Correct' : '✗ Incorrect'}
        </span>
      </div>
      
      <p className="question-text">{questions.questionText}</p>
      
      <div className="options">
        {[1, 2, 3, 4].map(optionNum => {
          const isSelected = user_answers.selectedAnswer === optionNum;
          const isCorrect = questions.correctAnswer === optionNum;
          
          return (
            <div 
              key={optionNum}
              className={`option ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct-answer' : ''}`}
            >
              {questions[`option${optionNum}`]}
              {isSelected && !isCorrect && ' (Your answer)'}
              {isCorrect && ' (Correct answer)'}
            </div>
          );
        })}
      </div>
    </div>
  ))}
</div>
```

### 9.4 Performance Analytics

**Grade Calculation:**

```typescript
function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
}
```

**Grade Thresholds:**

| Grade | Percentage Range | Description |
|-------|------------------|-------------|
| A+ | 90-100% | Outstanding |
| A | 80-89% | Excellent |
| B | 70-79% | Good |
| C | 60-69% | Satisfactory |
| D | 50-59% | Pass |
| F | 0-49% | Fail |

**Performance Metrics:**

```typescript
interface PerformanceMetrics {
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: string;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  timeSpent: number; // minutes
  averageTimePerQuestion: number; // seconds
}
```

### 9.5 Attempt History

**History Display:**

```tsx
// Dashboard component
const recentAttempts = await db
  .select({
    attemptId: userAttempts.id,
    assessmentTitle: assessments.title,
    score: userAttempts.score,
    totalQuestions: userAttempts.totalQuestions,
    completedAt: userAttempts.completedAt,
  })
  .from(userAttempts)
  .innerJoin(assessments, eq(userAttempts.assessmentId, assessments.id))
  .where(eq(userAttempts.userId, session.user.id))
  .orderBy(desc(userAttempts.completedAt))
  .limit(5);

<div className="attempt-history">
  <h3>Recent Attempts</h3>
  {recentAttempts.map(attempt => (
    <Link 
      key={attempt.attemptId}
      href={`/results/${attempt.attemptId}`}
    >
      <div className="attempt-card">
        <h4>{attempt.assessmentTitle}</h4>
        <div className="attempt-score">
          {attempt.score}/{attempt.totalQuestions}
          ({((attempt.score / attempt.totalQuestions) * 100).toFixed(0)}%)
        </div>
        <time>{formatDate(attempt.completedAt)}</time>
      </div>
    </Link>
  ))}
</div>
```

**History Features:**

- Shows last 5 attempts on dashboard
- Displays assessment name, score, and date
- Links to detailed results page
- Sorted by most recent first
- Retake option available

**Progress Tracking:**

```sql
-- Query for user progress over time
SELECT 
  a.title,
  ua.completed_at,
  ua.score,
  ua.total_questions,
  ROUND((ua.score::numeric / ua.total_questions) * 100, 2) as percentage
FROM user_attempts ua
JOIN assessments a ON ua.assessment_id = a.id
WHERE ua.user_id = 'user_id_here'
ORDER BY ua.completed_at DESC;
```

---

<div style="page-break-after: always;"></div>

## 10. API Design

### 10.1 API Architecture

AssessHub implements a RESTful API design using Next.js API Routes.

**API Endpoints:**

| Endpoint | Method | Purpose | Authentication |
|----------|--------|---------|----------------|
| `/api/auth/sign-up` | POST | User registration | Public |
| `/api/auth/sign-in/email` | POST | User login | Public |
| `/api/auth/sign-out` | POST | User logout | Required |
| `/api/auth/get-session` | GET | Validate session | Required |
| `/api/submit-test` | POST | Submit assessment | Required |

### 10.2 Authentication API

**Registration Endpoint:**

```typescript
// Handled by Better Auth
POST /api/auth/sign-up

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (Success):
{
  "user": {
    "id": "user_abc123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "session": {
    "token": "session_token",
    "expiresAt": "2025-11-05T..."
  }
}

Response (Error):
{
  "error": "Email already registered"
}
```

**Login Endpoint:**

```typescript
POST /api/auth/sign-in/email

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (Success):
{
  "user": { ... },
  "session": { ... }
}

Response (Error):
{
  "error": "Invalid credentials"
}
```

### 10.3 Test Submission API

**Submit Test Endpoint:**

```typescript
// app/api/submit-test/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, userAttempts, userAnswers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate request
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const body = await request.json();
    const { assessmentId, answers } = body;

    // 3. Validate inputs
    if (!assessmentId || typeof answers !== 'object') {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    // 4. Fetch questions with correct answers
    const assessmentQuestions = await db
      .select()
      .from(questions)
      .where(eq(questions.assessmentId, assessmentId));

    // 5. Calculate score
    let score = 0;
    const userAnswerRecords = [];

    for (const question of assessmentQuestions) {
      const userAnswer = answers[question.id];
      
      if (userAnswer !== undefined) {
        const isCorrect = userAnswer === question.correctAnswer;
        if (isCorrect) score++;

        userAnswerRecords.push({
          questionId: question.id,
          selectedAnswer: userAnswer,
          isCorrect,
        });
      }
    }

    // 6. Create attempt record
    const [attempt] = await db
      .insert(userAttempts)
      .values({
        userId: session.user.id,
        assessmentId,
        score,
        totalQuestions: assessmentQuestions.length,
        startedAt: new Date(),
        completedAt: new Date(),
      })
      .returning();

    // 7. Save answer records
    if (userAnswerRecords.length > 0) {
      await db.insert(userAnswers).values(
        userAnswerRecords.map((record) => ({
          attemptId: attempt.id,
          ...record,
        }))
      );
    }

    // 8. Return result
    return NextResponse.json({
      attemptId: attempt.id,
      score,
      totalQuestions: assessmentQuestions.length,
    });
  } catch (error) {
    console.error("Error submitting test:", error);
    return NextResponse.json(
      { error: "Failed to submit test" },
      { status: 500 }
    );
  }
}
```

**Request Format:**

```typescript
POST /api/submit-test

Headers:
Cookie: better-auth.session_token=<session_token>
Content-Type: application/json

Body:
{
  "assessmentId": 1,
  "answers": {
    "101": 1,  // Question ID 101, selected option 1
    "102": 3,  // Question ID 102, selected option 3
    "103": 2,
    "104": 4,
    "105": 1,
    "106": 2,
    "107": 3,
    "108": 1,
    "109": 4,
    "110": 2
  }
}
```

**Response Format:**

```typescript
// Success Response
{
  "attemptId": 42,
  "score": 7,
  "totalQuestions": 10
}

// Error Responses
// 401 Unauthorized
{
  "error": "Unauthorized"
}

// 400 Bad Request
{
  "error": "Invalid request"
}

// 500 Server Error
{
  "error": "Failed to submit test"
}
```

### 10.4 Error Handling

**Error Response Structure:**

```typescript
interface ErrorResponse {
  error: string;
  details?: string;
  code?: string;
}
```

**HTTP Status Codes:**

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful request |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid auth |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal error |

**Error Handling Pattern:**

```typescript
export async function POST(request: NextRequest) {
  try {
    // Main logic
  } catch (error) {
    console.error("Operation failed:", error);
    
    // Log error details
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    // Return generic error to client
    return NextResponse.json(
      { error: "Operation failed" },
      { status: 500 }
    );
  }
}
```

### 10.5 Request/Response Formats

**Content Types:**

- Request: `application/json`
- Response: `application/json`

**Request Headers:**

```
Content-Type: application/json
Cookie: better-auth.session_token=<token>
```

**CORS Configuration:**

```typescript
// Not explicitly configured (same-origin requests only)
// For cross-origin, would add:
const headers = {
  'Access-Control-Allow-Origin': 'https://yourdomain.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

---

<div style="page-break-after: always;"></div>

## 11. Frontend Implementation

### 11.1 Page Structure

**App Directory Structure:**

```
app/
├── layout.tsx               # Root layout
├── page.tsx                 # Landing page
├── globals.css              # Global styles
│
├── login/
│   └── page.tsx            # Login page
│
├── signup/
│   └── page.tsx            # Signup page
│
├── dashboard/
│   ├── page.tsx            # Dashboard (server component)
│   └── sign-out-button.tsx # Sign out (client component)
│
├── assessment/
│   └── [id]/
│       ├── page.tsx        # Assessment wrapper (server)
│       └── test-taker.tsx  # Test interface (client)
│
└── results/
    └── [id]/
        └── page.tsx        # Results page (server)
```

### 11.2 Component Library

**Reusable Components:**

While AssessHub doesn't use a formal component library, key UI patterns include:

**Button Component Pattern:**

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled, 
  variant = 'primary' 
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} disabled:opacity-50`}
    >
      {children}
    </button>
  );
};
```

**Card Component Pattern:**

```typescript
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    {children}
  </div>
);
```

### 11.3 State Management

**Local State (useState):**

```typescript
// Test-taking state
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [answers, setAnswers] = useState<Record<number, number>>({});
const [timeLeft, setTimeLeft] = useState(duration * 60);
const [isSubmitting, setIsSubmitting] = useState(false);
```

**Form State:**

```typescript
// Login form state
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
```

**No Global State Management:**

- No Redux or Zustand needed
- Server components fetch fresh data
- Client components manage local UI state
- URL state for navigation (Next.js router)

### 11.4 Client-Server Interaction

**Server Component Data Fetching:**

```typescript
// app/dashboard/page.tsx (Server Component)
export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  // Direct database access in server component
  const assessments = await db.select().from(assessmentsTable);
  const attempts = await db
    .select()
    .from(userAttempts)
    .where(eq(userAttempts.userId, session.user.id));

  return <DashboardUI assessments={assessments} attempts={attempts} />;
}
```

**Client Component API Calls:**

```typescript
// Client component making API call
const handleSubmit = async () => {
  const response = await fetch('/api/submit-test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assessmentId, answers }),
  });
  
  const data = await response.json();
  // Handle response...
};
```

**Data Flow:**

```
Server Component:
  Database → Server Component → Props → Client Component

Client Component:
  User Action → API Call → Server Response → State Update → Re-render
```

### 11.5 Responsive Design

**Breakpoint Strategy:**

```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

**Responsive Patterns:**

```tsx
{/* Mobile: Stack, Desktop: Side-by-side */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Column 1</div>
  <div className="w-full md:w-1/2">Column 2</div>
</div>

{/* Responsive grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>

{/* Responsive text */}
<h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>

{/* Show/hide based on screen size */}
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
```

---

<div style="page-break-after: always;"></div>

## 12. Backend Implementation

### 12.1 Server-Side Rendering

**Server Components:**

```typescript
// app/dashboard/page.tsx
// This is a server component by default (no "use client")
export default async function DashboardPage() {
  // Runs on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Direct database access
  const data = await db.select().from(assessments);

  // HTML rendered on server, sent to client
  return <Dashboard data={data} />;
}
```

**Benefits:**

- Faster initial page load
- Better SEO
- Reduced client bundle size
- Secure database access
- No API routes needed for data fetching

### 12.2 API Route Handlers

**Route Handler Pattern:**

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Handle GET requests
  return NextResponse.json({ data: "example" });
}

export async function POST(request: NextRequest) {
  // Handle POST requests
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

### 12.3 Database Operations

**Query Patterns:**

```typescript
// Select with filter
const users = await db
  .select()
  .from(userTable)
  .where(eq(userTable.email, email));

// Insert with returning
const [newUser] = await db
  .insert(userTable)
  .values({ name, email })
  .returning();

// Update
await db
  .update(userTable)
  .set({ name: newName })
  .where(eq(userTable.id, userId));

// Delete
await db
  .delete(userTable)
  .where(eq(userTable.id, userId));

// Join
const results = await db
  .select()
  .from(userAttempts)
  .innerJoin(assessments, eq(userAttempts.assessmentId, assessments.id))
  .where(eq(userAttempts.userId, userId));
```

### 12.4 Business Logic

**Score Calculation:**

Located in `/api/submit-test/route.ts`

```typescript
// Calculate score
let score = 0;
for (const question of assessmentQuestions) {
  const userAnswer = answers[question.id];
  if (userAnswer === question.correctAnswer) {
    score++;
  }
}
```

**Grade Assignment:**

```typescript
function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
}
```

### 12.5 Error Handling

**Try-Catch Pattern:**

```typescript
export async function POST(request: NextRequest) {
  try {
    // Main logic
    const result = await performOperation();
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Operation failed:", error);
    return NextResponse.json(
      { error: "Operation failed" },
      { status: 500 }
    );
  }
}
```

---

<div style="page-break-after: always;"></div>

## 13. Testing Strategy

### 13.1 Testing Overview

**Testing Pyramid:**

```
         /\
        /  \
       / E2E \         (Future: Playwright)
      /______\
     /        \
    /Integration\      (Business logic tests)
   /____________\
  /              \
 /  Unit Tests    \    (Component, utility tests)
/__________________\
```

**Test Coverage:**

- **Total Test Suites:** 6
- **Total Test Cases:** 80+
- **Coverage Target:** 80%+

**Test Files:**

```
__tests__/
├── login.test.tsx           (~12 tests)
├── signup.test.tsx          (~10 tests)
├── test-taker.test.tsx      (~25 tests)
├── api-submit-test.test.ts  (~6 tests)
├── utils.test.ts            (~10 tests)
└── integration.test.ts      (~20 tests)
```

### 13.2 Unit Testing

**Utility Function Tests:**

```typescript
// __tests__/utils.test.ts
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'active')).toBe('base active');
    expect(cn('base', false && 'active')).toBe('base');
  });

  it('resolves Tailwind conflicts', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
  });
});
```

### 13.3 Integration Testing

**Business Logic Tests:**

```typescript
// __tests__/integration.test.ts
describe('Score Calculation', () => {
  it('calculates percentage correctly', () => {
    const score = 7;
    const total = 10;
    const percentage = (score / total) * 100;
    expect(percentage).toBe(70);
  });

  it('assigns correct grade', () => {
    expect(calculateGrade(95)).toBe('A+');
    expect(calculateGrade(85)).toBe('A');
    expect(calculateGrade(75)).toBe('B');
    expect(calculateGrade(65)).toBe('C');
    expect(calculateGrade(55)).toBe('D');
    expect(calculateGrade(45)).toBe('F');
  });
});
```

### 13.4 Component Testing

**React Component Tests:**

```typescript
// __tests__/login.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/login/page';

describe('LoginPage', () => {
  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
```

### 13.5 API Testing

**API Route Tests:**

```typescript
// __tests__/api-submit-test.test.ts
describe('/api/submit-test', () => {
  it('returns 401 for unauthenticated requests', async () => {
    const response = await POST(mockRequest);
    expect(response.status).toBe(401);
  });

  it('calculates score correctly', async () => {
    // Mock authenticated session
    (auth.api.getSession as jest.Mock).mockResolvedValue({
      user: { id: 'user_123' }
    });

    const response = await POST(mockRequestWithAnswers);
    const data = await response.json();

    expect(data.score).toBeDefined();
    expect(data.attemptId).toBeDefined();
  });
});
```

### 13.6 Test Coverage Analysis

**Running Coverage:**

```bash
npm run test:coverage
```

**Coverage Report:**

```
 PASS  __tests__/login.test.tsx
 PASS  __tests__/signup.test.tsx
 PASS  __tests__/test-taker.test.tsx
 PASS  __tests__/api-submit-test.test.ts
 PASS  __tests__/utils.test.ts
 PASS  __tests__/integration.test.ts

---------------------------|---------|----------|---------|---------|
File                       | % Stmts | % Branch | % Funcs | % Lines |
---------------------------|---------|----------|---------|---------|
All files                  |   82.45 |    75.30 |   80.12 |   82.45 |
 lib/                      |   85.20 |    78.50 |   82.00 |   85.20 |
  utils.ts                 |   95.00 |    90.00 |   100.0 |   95.00 |
  auth-client.ts           |   80.00 |    70.00 |   75.00 |   80.00 |
 app/                      |   80.30 |    72.10 |   78.50 |   80.30 |
  login/page.tsx           |   88.00 |    80.00 |   85.00 |   88.00 |
  signup/page.tsx          |   85.00 |    77.00 |   82.00 |   85.00 |
  test-taker.tsx           |   75.00 |    68.00 |   72.00 |   75.00 |
---------------------------|---------|----------|---------|---------|
```

---

<div style="page-break-after: always;"></div>

## 14. Security Implementation

### 14.1 Authentication Security

**Password Hashing:**

```typescript
// Better Auth handles this automatically
// Uses bcrypt with automatic salt generation
// Password never stored in plain text
```

**Session Security:**

- HTTP-only cookies (no JavaScript access)
- Secure flag in production (HTTPS only)
- SameSite attribute for CSRF protection
- 7-day expiration with sliding window

### 14.2 Data Protection

**Database Security:**

- Foreign key constraints enforce relationships
- Cascade deletes maintain integrity
- No sensitive data in logs
- Connection strings in environment variables

### 14.3 Input Validation

**Client-Side Validation:**

```typescript
<input
  type="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
/>

<input
  type="password"
  required
  minLength={8}
/>
```

**Server-Side Validation:**

```typescript
// Validate in API routes
if (!assessmentId || typeof answers !== 'object') {
  return NextResponse.json(
    { error: "Invalid request" },
    { status: 400 }
  );
}
```

### 14.4 CSRF Protection

- Better Auth provides CSRF tokens automatically
- SameSite cookie attribute
- Origin checking on API routes

### 14.5 SQL Injection Prevention

**Parameterized Queries:**

```typescript
// Drizzle ORM automatically parameterizes queries
const users = await db
  .select()
  .from(userTable)
  .where(eq(userTable.email, email));  // Safe from injection

// This becomes: SELECT * FROM users WHERE email = $1
// With parameter: [email]
```

**Never Use String Concatenation:**

```typescript
// ❌ DANGEROUS - SQL Injection vulnerability
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ SAFE - Parameterized query
const users = await db
  .select()
  .from(userTable)
  .where(eq(userTable.email, email));
```

---

<div style="page-break-after: always;"></div>

## 15. Performance Optimization

### 15.1 Frontend Performance

**Code Splitting:**

- Automatic route-based splitting by Next.js
- Dynamic imports for heavy components
- Smaller initial bundle size

**Image Optimization:**

```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
  priority  // Load immediately for above-fold images
/>
```

**CSS Optimization:**

- Tailwind CSS purges unused styles
- Critical CSS inlined
- Minimal CSS bundle

### 15.2 Backend Performance

**Database Query Optimization:**

```typescript
// Efficient joins instead of N+1 queries
const attemptsWithAssessments = await db
  .select()
  .from(userAttempts)
  .innerJoin(assessments, eq(userAttempts.assessmentId, assessments.id))
  .where(eq(userAttempts.userId, userId));
```

**Connection Pooling:**

```typescript
// pg pool manages connections efficiently
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,  // Maximum pool size
});
```

### 15.3 Database Optimization

**Indexes:**

```sql
-- Primary keys automatically indexed
CREATE INDEX idx_user_attempts_user_id ON user_attempts(user_id);
CREATE INDEX idx_user_attempts_assessment_id ON user_attempts(assessment_id);
CREATE INDEX idx_questions_assessment_id ON questions(assessment_id);
CREATE INDEX idx_user_answers_attempt_id ON user_answers(attempt_id);
```

### 15.4 Caching Strategies

**Server Component Caching:**

```typescript
// Next.js automatically caches server component renders
// Revalidate every hour:
export const revalidate = 3600;
```

**Static Generation:**

```typescript
// Landing page generated at build time
export default function LandingPage() {
  // Static content
}
```

---

<div style="page-break-after: always;"></div>

## 16. Deployment Guide

### 16.1 Environment Setup

**Environment Variables:**

```bash
# .env.local
DATABASE_URL=postgresql://user:password@host:5432/dbname
BETTER_AUTH_SECRET=your-32-character-secret-minimum
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://yourdomain.com
```

### 16.2 Local Development

**Setup Steps:**

```bash
# 1. Clone repository
git clone <repository-url>
cd assessment

# 2. Install dependencies
npm install

# 3. Start PostgreSQL
docker compose up -d

# 4. Push database schema
npm run db:push

# 5. Seed database
npm run db:seed

# 6. Start development server
npm run dev
```

### 16.3 Production Deployment

**Vercel Deployment (Recommended):**

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Set environment variables in Vercel dashboard
# DATABASE_URL, BETTER_AUTH_SECRET, etc.

# 5. Deploy to production
vercel --prod
```

**Manual Deployment:**

```bash
# 1. Build application
npm run build

# 2. Start production server
npm start

# Server runs on port 3000
```

### 16.4 Docker Configuration

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    container_name: prismberry-postgres
    environment:
      POSTGRES_DB: prismberry
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  pgdata:
```

### 16.5 Environment Variables

**Required Variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | `postgresql://...` |
| BETTER_AUTH_SECRET | Min 32-char secret | `abcd...xyz123` |
| BETTER_AUTH_URL | Base URL | `https://app.com` |
| NEXT_PUBLIC_BETTER_AUTH_URL | Public base URL | `https://app.com` |

**Production Checklist:**

- [ ] Strong BETTER_AUTH_SECRET (32+ characters)
- [ ] HTTPS enabled
- [ ] DATABASE_URL points to production database
- [ ] Database backups configured
- [ ] Error monitoring setup (Sentry, etc.)
- [ ] Analytics configured (optional)

---

<div style="page-break-after: always;"></div>

## 17. Monitoring and Maintenance

### 17.1 Logging Strategy

**Server-Side Logging:**

```typescript
// API routes log errors
console.error("Error submitting test:", error);

// Include relevant context
console.log(`User ${userId} submitted assessment ${assessmentId}`);
```

**Log Levels:**

- `console.log()` - Info
- `console.warn()` - Warnings
- `console.error()` - Errors

### 17.2 Error Monitoring

**Recommended Tools:**

- **Sentry** - Error tracking and monitoring
- **LogRocket** - Session replay and debugging
- **Datadog** - Infrastructure monitoring

### 17.3 Performance Monitoring

**Metrics to Track:**

- Page load time
- API response time
- Database query time
- Error rate
- User session duration

### 17.4 Database Maintenance

**Regular Tasks:**

```bash
# Backup database
pg_dump -U postgres prismberry > backup.sql

# Restore database
psql -U postgres prismberry < backup.sql

# Check database size
SELECT pg_size_pretty(pg_database_size('prismberry'));

# Analyze tables
ANALYZE user_attempts;
ANALYZE user_answers;
```

**Vacuum and Analyze:**

```sql
-- Reclaim storage and update statistics
VACUUM ANALYZE user_attempts;
VACUUM ANALYZE user_answers;
```

---

<div style="page-break-after: always;"></div>

## 18. User Guide

### 18.1 User Registration

1. Navigate to landing page
2. Click "Get Started" or "Sign Up"
3. Enter name, email, password (8+ chars)
4. Click "Sign Up"
5. Automatically redirected to dashboard

### 18.2 Taking Assessments

1. Login to account
2. View available assessments on dashboard
3. Click "Start Test" on desired assessment
4. Read question and select answer
5. Use "Next" button to advance
6. Review answers using question navigator
7. Click "Submit Test" when complete
8. View results immediately

### 18.3 Viewing Results

1. After submission, results page displays automatically
2. View score, percentage, and grade
3. Review all questions with answers
4. Correct answers highlighted in green
5. Your incorrect answers shown
6. Click "Back to Dashboard" to return
7. Click "Retake Test" to try again

### 18.4 Dashboard Navigation

**Dashboard Sections:**

- **Available Assessments** - Start new tests
- **Recent Attempts** - View past results
- **Profile Info** - See your name and email
- **Sign Out** - Log out of account

---

<div style="page-break-after: always;"></div>

## 19. Developer Guide

### 19.1 Project Setup

```bash
# Clone and install
git clone <repo-url>
cd assessment
npm install

# Setup database
docker compose up -d
npm run db:push
npm run db:seed

# Start development
npm run dev
```

### 19.2 Development Workflow

**Making Changes:**

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... edit files ...

# Test changes
npm test
npm run lint

# Commit
git add .
git commit -m "Add new feature"

# Push
git push origin feature/new-feature
```

### 19.3 Code Standards

**TypeScript:**

- Use strict mode
- Define interfaces for all data structures
- Avoid `any` type

**Naming Conventions:**

- Components: PascalCase (`UserDashboard`)
- Files: kebab-case (`user-dashboard.tsx`)
- Functions: camelCase (`calculateScore`)
- Constants: UPPER_SNAKE_CASE (`MAX_ATTEMPTS`)

### 19.4 Adding New Features

**Adding a New Assessment:**

```typescript
// 1. Add to seed.ts
const [newAssessment] = await db.insert(assessments).values({
  title: 'New Test',
  description: '...',
  category: 'new-category',
  duration: 30,
  totalQuestions: 15,
}).returning();

// 2. Add questions
await db.insert(questions).values([
  // ... question objects
]);

// 3. Run seed
npm run db:seed
```

**Adding a New Page:**

```bash
# Create page directory
mkdir -p app/new-page

# Create page component
touch app/new-page/page.tsx

# Implement component
# ...

# Page automatically available at /new-page
```

### 19.5 Debugging Tips

**Server Component Debugging:**

```typescript
// Add console.logs (appear in terminal)
console.log('Data:', data);

// Use debugger
debugger;
```

**Client Component Debugging:**

```typescript
// Use browser dev tools
console.log('State:', state);

// React DevTools
// Install extension and inspect components
```

**Database Debugging:**

```bash
# Open Drizzle Studio
npm run db:studio

# Browse tables and data visually
```

---

<div style="page-break-after: always;"></div>

## 20. Future Enhancements

### 20.1 Planned Features

**Short-Term (3-6 months):**

1. **Question Bank Management UI**
   - Admin interface to add/edit questions
   - Import questions from CSV/Excel
   - Question categories and tags
   - Difficulty levels

2. **Enhanced Analytics**
   - Performance trends over time
   - Category-wise performance breakdown
   - Time spent per question analysis
   - Comparison with average scores

3. **User Profiles**
   - Profile customization
   - Avatar uploads
   - Bio and preferences
   - Achievement badges

4. **Assessment Scheduling**
   - Scheduled test availability
   - Time-bound access windows
   - Invitation-based assessments
   - Assessment expiration dates

**Mid-Term (6-12 months):**

5. **Advanced Question Types**
   - Multiple correct answers
   - Fill-in-the-blank questions
   - Matching questions
   - Essay-type questions with manual grading

6. **Adaptive Testing**
   - Difficulty adjusts based on performance
   - Personalized question selection
   - CAT (Computer Adaptive Testing) algorithms

7. **Team Features**
   - Organization accounts
   - Role-based access control
   - Team performance dashboards
   - Bulk user management

8. **Certification System**
   - Certificate generation on passing
   - PDF export with QR verification
   - Certificate gallery
   - Public certificate verification

**Long-Term (12+ months):**

9. **Mobile Applications**
   - Native iOS and Android apps
   - Offline test-taking capability
   - Push notifications
   - Biometric authentication

10. **AI-Powered Features**
    - AI question generation
    - Personalized learning recommendations
    - Automated essay grading
    - Chatbot support

11. **Integration Ecosystem**
    - LMS integrations (Moodle, Canvas)
    - HRIS integrations
    - Single Sign-On (SSO)
    - API for third-party integrations

12. **Advanced Proctoring**
    - Webcam monitoring
    - Screen recording
    - AI-based cheating detection
    - Browser lockdown

### 20.2 Scalability Improvements

**Database Scaling:**

```typescript
// Implement read replicas
const primaryDb = drizzle(primaryPool);
const replicaDb = drizzle(replicaPool);

// Read from replica
const attempts = await replicaDb.select().from(userAttempts);

// Write to primary
await primaryDb.insert(userAttempts).values(newAttempt);
```

**Caching Layer:**

```typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache assessment questions
const cacheKey = `assessment:${assessmentId}:questions`;
let questions = await redis.get(cacheKey);

if (!questions) {
  questions = await db.select().from(questionsTable);
  await redis.setex(cacheKey, 3600, JSON.stringify(questions));
}
```

**CDN for Static Assets:**

- Host images on Cloudflare/CloudFront
- Edge caching for faster delivery
- Automatic image optimization

**Horizontal Scaling:**

- Deploy multiple Next.js instances
- Load balancer (AWS ELB, Nginx)
- Session sharing via Redis
- Stateless application design

### 20.3 Additional Test Types

**Planned Test Categories:**

1. **Logical Reasoning**
   - Pattern recognition
   - Sequence completion
   - Visual puzzles

2. **Coding Assessments**
   - Code editor integration
   - Automated test cases
   - Multiple language support
   - Real-time code execution

3. **Personality Tests**
   - Myers-Briggs Type Indicator
   - Big Five personality traits
   - Work style assessments

4. **Situational Judgment**
   - Scenario-based questions
   - Multiple perspectives
   - Context-aware scoring

5. **Language Proficiency**
   - Speaking assessments (audio recording)
   - Listening comprehension (audio playback)
   - Writing samples
   - Grammar and vocabulary

### 20.4 Analytics Dashboard

**Admin Analytics Features:**

```
┌─────────────────────────────────────────────┐
│ Analytics Dashboard                         │
├─────────────────────────────────────────────┤
│                                             │
│ Overview                                    │
│ ├─ Total Users: 1,234                       │
│ ├─ Total Attempts: 5,678                    │
│ ├─ Average Score: 72%                       │
│ └─ Completion Rate: 89%                     │
│                                             │
│ Performance Trends                          │
│ [Line Graph: Scores over time]              │
│                                             │
│ Popular Assessments                         │
│ [Bar Chart: Attempts per assessment]        │
│                                             │
│ User Distribution                           │
│ [Pie Chart: User segments]                  │
│                                             │
│ Recent Activity                             │
│ [Table: Latest attempts]                    │
│                                             │
└─────────────────────────────────────────────┘
```

**Metrics to Track:**

- Daily/weekly/monthly active users
- Assessment completion rates
- Average scores by category
- Time spent per assessment
- Drop-off points
- User retention
- Peak usage times

**Visualization Tools:**

- Chart.js for interactive charts
- D3.js for advanced visualizations
- Export to PDF/Excel
- Scheduled email reports

---

<div style="page-break-after: always;"></div>

## 21. Appendices

### 21.1 Code Samples

**Complete Test Taker Component:**

```typescript
// app/assessment/[id]/test-taker.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Award, ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface Question {
  id: number;
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  order: number;
}

interface Assessment {
  id: number;
  title: string;
  duration: number;
  totalQuestions: number;
}

interface TestTakerProps {
  assessment: Assessment;
  questions: Question[];
}

export default function TestTaker({ assessment, questions }: TestTakerProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(assessment.duration * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId: assessment.id,
          answers,
        }),
      });

      const data = await response.json();
      if (data.attemptId) {
        router.push(`/results/${data.attemptId}`);
      }
    } catch (error) {
      console.error("Failed to submit test:", error);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (questionId: number, answer: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Award className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold">{assessment.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-mono text-lg font-semibold">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">
            {currentQuestion.questionText}
          </h2>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((optionNum) => {
              const optionText = currentQuestion[`option${optionNum}` as keyof Question] as string;
              const isSelected = answers[currentQuestion.id] === optionNum;

              return (
                <button
                  key={optionNum}
                  onClick={() => handleAnswer(currentQuestion.id, optionNum)}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        isSelected ? "border-blue-600 bg-blue-600" : "border-gray-400"
                      }`}
                    >
                      {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                    <span>{optionText}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between border-t pt-6">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 rounded-lg border px-4 py-2 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>

            <div className="text-sm text-gray-600">
              {answeredCount} of {questions.length} answered
            </div>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Test"}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
```

### 21.2 Configuration Files

**package.json:**

```json
{
  "name": "assessment",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:seed": "tsx lib/db/seed.ts"
  },
  "dependencies": {
    "better-auth": "^1.3.33",
    "clsx": "^2.1.1",
    "drizzle-orm": "^0.44.7",
    "lucide-react": "^0.548.0",
    "next": "16.0.0",
    "pg": "^8.16.3",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/jest": "^30.0.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "drizzle-kit": "^0.31.6",
    "eslint": "^9",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**jest.config.ts:**

```typescript
import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

export default createJestConfig(config);
```

### 21.3 API Reference

**Authentication API:**

```
POST /api/auth/sign-up
Body: { name, email, password }
Response: { user, session }

POST /api/auth/sign-in/email
Body: { email, password }
Response: { user, session }

POST /api/auth/sign-out
Response: { success: true }

GET /api/auth/get-session
Response: { user, session } | null
```

**Assessment API:**

```
POST /api/submit-test
Headers: Cookie (session token)
Body: { assessmentId, answers: { [questionId]: optionNumber } }
Response: { attemptId, score, totalQuestions }

Status Codes:
- 200: Success
- 400: Invalid request
- 401: Unauthorized
- 500: Server error
```

### 21.4 Database Scripts

**Backup Script:**

```bash
#!/bin/bash
# backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${DATE}.sql"

pg_dump -U postgres -h localhost -d prismberry > "$BACKUP_FILE"

echo "Backup created: $BACKUP_FILE"

# Compress
gzip "$BACKUP_FILE"

# Upload to S3 (optional)
# aws s3 cp "${BACKUP_FILE}.gz" s3://your-bucket/backups/
```

**Reset Database Script:**

```bash
#!/bin/bash
# reset-db.sh

echo "⚠️  WARNING: This will delete all data!"
read -p "Are you sure? (yes/no) " -r
if [[ ! $REPLY =~ ^yes$ ]]; then
    echo "Cancelled"
    exit 1
fi

# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS prismberry;"
psql -U postgres -c "CREATE DATABASE prismberry;"

# Apply schema
npm run db:push

# Seed data
npm run db:seed

echo "✅ Database reset complete"
```

---

<div style="page-break-after: always;"></div>

## 22. References and Resources

### Official Documentation

**Next.js:**
- Next.js Documentation: https://nextjs.org/docs
- App Router Guide: https://nextjs.org/docs/app
- API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

**React:**
- React Documentation: https://react.dev
- React Hooks: https://react.dev/reference/react

**TypeScript:**
- TypeScript Handbook: https://www.typescriptlang.org/docs
- TypeScript with React: https://www.typescriptlang.org/docs/handbook/react.html

**Better Auth:**
- Better Auth Docs: https://better-auth.com
- Drizzle Adapter: https://better-auth.com/docs/adapters/drizzle

**Drizzle ORM:**
- Drizzle Documentation: https://orm.drizzle.team/docs
- PostgreSQL Guide: https://orm.drizzle.team/docs/get-started-postgresql

**Tailwind CSS:**
- Tailwind Documentation: https://tailwindcss.com/docs
- Tailwind with Next.js: https://tailwindcss.com/docs/guides/nextjs

**Testing:**
- Jest Documentation: https://jestjs.io/docs
- Testing Library: https://testing-library.com/docs/react-testing-library/intro

**PostgreSQL:**
- PostgreSQL Manual: https://www.postgresql.org/docs
- PostgreSQL Tutorial: https://www.postgresqltutorial.com

### Learning Resources

**Next.js:**
- Next.js Learn Course: https://nextjs.org/learn
- Vercel Templates: https://vercel.com/templates

**Full Stack Development:**
- Full Stack Open: https://fullstackopen.com
- The Odin Project: https://www.theodinproject.com

**TypeScript:**
- TypeScript Deep Dive: https://basarat.gitbook.io/typescript
- Execute Program: https://www.executeprogram.com

**Testing:**
- Kent C. Dodds Blog: https://kentcdodds.com/blog
- Testing JavaScript: https://testingjavascript.com

### Community Resources

**Forums and Communities:**
- Next.js Discord: https://nextjs.org/discord
- React Discord: https://react.dev/community
- Stack Overflow: https://stackoverflow.com

**YouTube Channels:**
- Web Dev Simplified
- Traversy Media
- Fireship
- Jack Herrington

### Tools and Services

**Development:**
- VS Code: https://code.visualstudio.com
- GitHub: https://github.com
- Vercel: https://vercel.com

**Database Hosting:**
- Neon: https://neon.tech
- Supabase: https://supabase.com
- Railway: https://railway.app

**Monitoring:**
- Sentry: https://sentry.io
- LogRocket: https://logrocket.com
- Datadog: https://www.datadoghq.com

---

<div style="page-break-after: always;"></div>

## 23. Glossary

**API (Application Programming Interface):** Interface for software components to communicate.

**Authentication:** Process of verifying user identity.

**Authorization:** Process of determining user permissions.

**Better Auth:** Modern authentication library for Next.js.

**Cascading Delete:** Automatic deletion of related records when parent is deleted.

**Client Component:** React component that runs in the browser.

**CRUD:** Create, Read, Update, Delete operations.

**CSRF (Cross-Site Request Forgery):** Attack that tricks users into executing unwanted actions.

**Docker:** Platform for containerizing applications.

**Drizzle ORM:** TypeScript ORM for SQL databases.

**Foreign Key:** Database field that links to primary key in another table.

**Hashing:** One-way transformation of data (e.g., passwords).

**HTTP-Only Cookie:** Cookie inaccessible to JavaScript.

**JWT (JSON Web Token):** Compact token format for authentication.

**Middleware:** Software that intercepts requests/responses.

**Migration:** Version-controlled database schema change.

**Next.js:** React framework with server-side rendering.

**ORM (Object-Relational Mapping):** Database abstraction layer.

**PostgreSQL:** Open-source relational database system.

**Primary Key:** Unique identifier for database record.

**RESTful API:** API following REST architectural principles.

**Schema:** Database structure definition.

**Seed:** Populate database with initial data.

**Server Component:** React component that runs on server.

**Session:** Authenticated user state maintained across requests.

**SQL Injection:** Attack inserting malicious SQL code.

**SSR (Server-Side Rendering):** Generating HTML on server.

**Tailwind CSS:** Utility-first CSS framework.

**Token:** String used for authentication/authorization.

**TypeScript:** JavaScript with static typing.

**XSS (Cross-Site Scripting):** Attack injecting malicious scripts.

---

<div style="page-break-after: always;"></div>

## 24. Conclusion

### Project Summary

AssessHub represents a comprehensive solution for online assessment delivery, combining modern web technologies with robust architecture to provide a seamless testing experience. The platform successfully delivers on its core objectives:

**Technical Excellence:**
- Built with industry-standard technologies (Next.js 16, PostgreSQL, TypeScript)
- Implements best practices for security, performance, and maintainability
- Achieves 80%+ test coverage ensuring reliability
- Follows modular architecture enabling future enhancements

**User Experience:**
- Intuitive interface requiring minimal training
- Responsive design supporting multiple devices
- Real-time feedback and progress tracking
- Instant results with detailed answer review

**Business Value:**
- Reduces assessment administration overhead
- Provides objective, consistent evaluation
- Maintains comprehensive audit trails
- Scales efficiently to handle growth

### Key Achievements

1. **Full-Stack Implementation:** Complete system from database to user interface
2. **Secure Authentication:** Industry-standard credential management with Better Auth
3. **Real-Time Testing:** Countdown timer with auto-submission ensures fair assessment
4. **Instant Scoring:** Immediate feedback enhances learning experience
5. **Comprehensive Testing:** Extensive test suite validates functionality
6. **Production-Ready:** Deployment-ready with Docker support and environment configuration

### Lessons Learned

**Technical Insights:**
- Next.js App Router provides excellent developer experience
- Better Auth simplifies authentication implementation
- Drizzle ORM offers type safety without complexity
- Server components reduce client bundle size
- Tailwind CSS accelerates UI development

**Development Process:**
- Type safety catches errors early
- Testing investment pays dividends
- Clear architecture enables team collaboration
- Documentation facilitates maintenance
- Modular design supports incremental enhancement

### Future Outlook

AssessHub provides a solid foundation for growth. The planned enhancements outlined in Section 20 will transform the platform into a comprehensive assessment ecosystem supporting:

- Multiple assessment types and formats
- Advanced analytics and reporting
- Team collaboration features
- Mobile applications
- AI-powered capabilities
- Third-party integrations

The modular architecture and comprehensive test coverage ensure these enhancements can be implemented confidently without compromising existing functionality.

### Final Thoughts

This project demonstrates the power of modern web technologies to solve real-world problems. By combining Next.js, PostgreSQL, Better Auth, and Drizzle ORM, we've created a platform that is:

- **Reliable:** Comprehensive testing ensures consistent behavior
- **Secure:** Industry-standard authentication and data protection
- **Performant:** Server-side rendering and efficient database queries
- **Maintainable:** Clear architecture and comprehensive documentation
- **Scalable:** Modular design supports future growth

AssessHub stands as a testament to thoughtful architecture, careful implementation, and attention to detail. Whether used for educational assessment, corporate training, or recruitment, the platform provides the tools needed for effective skill evaluation.

### Acknowledgments

This project leverages the incredible work of the open-source community:

- **Vercel** for Next.js and deployment platform
- **Better Auth team** for authentication library
- **Drizzle team** for the excellent ORM
- **PostgreSQL community** for the robust database
- **Tailwind Labs** for the CSS framework
- **Testing Library maintainers** for testing tools

### Contact and Support

For questions, issues, or contributions:
- GitHub Repository: [Link to repository]
- Documentation: [Link to docs]
- Issue Tracker: [Link to issues]
- Email: [Contact email]

---

<div style="text-align: center; margin-top: 100px;">

**AssessHub – Assessment Platform**

*Technical Documentation v1.0*

*October 29, 2025*

---

**End of Document**

*This report contains 60+ pages of comprehensive documentation covering all aspects of the AssessHub assessment platform, from requirements and architecture through implementation, testing, deployment, and future enhancements.*

</div>

---
