# AZ-900 Ready — System Architecture

## 1. Overview

AZ-900 Ready is a web-based learning and practice application for beginners studying cloud fundamentals and Azure-related concepts.

The system combines:

- Interactive practice
- Explanations
- Progress tracking
- Mistake review
- Smart Recovery
- Authentication
- Persistent learning data
- AI Study Buddy architecture

The central learning loop is:

**Learn → Practice → Feedback → Identify Weakness → Recover → Practice Again**

---

# 2. Functional Requirements

## Authentication

Users should be able to:

- Create an account
- Sign in
- Sign out
- Maintain a personal learning profile

---

## Practice

Users should be able to:

- Select a learning topic
- Select difficulty
- Select number of questions
- Answer questions
- Submit answers
- Receive feedback
- Complete a practice session

---

## Feedback

After answering a question, the system should provide:

- Correct/incorrect status
- Explanation
- Simple explanation
- Memory tip

---

## Progress

The system should:

- Save practice attempts
- Record correct and incorrect answers
- Calculate practice scores
- Allow learners to review previous performance

---

## Recovery

The system should help learners focus on weak concepts.

---

## Study Buddy

The system should provide a beginner-focused interface for asking questions and receiving simple explanations.

---

# 3. Non-Functional Requirements

## Usability

The interface should be:

- Simple
- Beginner-friendly
- Responsive
- Easy to navigate

## Performance

The application should load quickly and avoid unnecessary database requests.

## Security

The system should use:

- Authentication
- Row Level Security
- Secure environment variables
- Server-side protection for future AI credentials

## Scalability

The architecture should allow:

- More users
- More questions
- More topics
- More analytics
- Additional AI functionality

---

# 4. Architecture

```text
Learner
   |
   v
React + TypeScript Frontend
   |
   +--------------------+
   |                    |
   v                    v
Supabase Auth       Application Logic
                        |
                        v
                  Supabase Database
                        |
            +-----------+-----------+
            |                       |
            v                       v
        Questions             User Attempts
                                    |
                                    v
                                Answers

Future:
Application → Secure AI Endpoint → AI Study Buddy
```
