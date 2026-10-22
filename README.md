# AZ-900 Ready

## Learn smarter. Practice better. Know when you're ready.

AZ-900 Ready is an unofficial, beginner-friendly learning and practice application designed to help learners prepare for Azure fundamentals and the AZ-900 learning objectives.

The application combines practice questions, instant feedback, mistake review, progress tracking, Smart Recovery, and an AI Study Buddy experience.

> **Disclaimer:** AZ-900 Ready is an unofficial educational project. It is not affiliated with, endorsed by, or sponsored by Microsoft. All practice questions are original educational content and are not copied from Microsoft's certification exam.

---

# The Problem

Preparing for cloud fundamentals can be difficult for beginners.

Learners may struggle with:

- Understanding unfamiliar cloud terminology
- Knowing which topics they understand well
- Learning from incorrect answers
- Identifying what they should study next
- Staying focused on weak areas

Many practice tools focus mainly on the final score.

AZ-900 Ready focuses on the **learning behind the score**.

---

# The Solution

AZ-900 Ready uses a simple learning loop:

**Learn → Practice → Feedback → Recover → Improve**

Instead of only telling a learner that an answer is incorrect, the application is designed to help explain the concept and provide a memory tip.

The learner can then review mistakes and focus on weaker areas through Smart Recovery.

---

# Target Users

AZ-900 Ready is designed for:

- Beginners learning cloud computing
- Students preparing for AZ-900
- Career switchers entering cloud or IT
- Junior developers
- IT learners
- Anyone looking for a simple introduction to Azure fundamentals

---

# Features

## Dashboard

The dashboard gives learners a quick view of their practice activity and learning progress.

It can include:

- Practice readiness score
- Topic performance
- Weak areas
- Recommended next action
- Recent practice activity

---

## Smart Quiz

Learners can practice questions based on:

- Topic
- Difficulty
- Number of questions

The application contains original educational practice questions.

After answering, learners can receive:

- Correct/incorrect feedback
- Explanation
- Simple explanation
- Memory tip

---

## Practice and Exam Modes

The application supports different practice experiences so learners can choose how they want to prepare.

Practice is intended to support learning and feedback, while exam-style practice can provide a more focused test experience.

---

## Review Mistakes

Learners can review questions they answered incorrectly.

The goal is to turn mistakes into learning opportunities.

---

## Smart Recovery

Smart Recovery helps learners focus on concepts where they need more practice.

The intended learning loop is:

**Weak concept → Explanation → Practice → Feedback → Retry**

---

## Progress Tracking

The application can track practice activity and performance.

Learners can use their results to identify:

- Strong topics
- Weak topics
- Practice scores
- Previous attempts
- Areas that need more review

---

## AI Study Buddy

AZ-900 Ready includes an AI Study Buddy experience designed to help beginners understand difficult concepts.

The intended assistant can help with:

- Simple explanations
- Cloud analogies
- Difficult terminology
- Memory tips
- Short practice questions
- Weak-topic explanations

The current project includes the Study Buddy experience and architecture for future secure AI integration.

A production AI implementation should use a secure server-side or edge endpoint so private AI credentials are never exposed in frontend code.

---

# Learning Areas

AZ-900 Ready focuses on three major learning areas.

## 1. Cloud Concepts

Topics include:

- Cloud computing
- Benefits of cloud computing
- Cloud service models
- Shared responsibility
- Scalability
- Availability
- Cloud deployment concepts

---

## 2. Azure Architecture & Services

Topics include:

- Azure regions
- Azure resources
- Compute
- Networking
- Storage
- Identity fundamentals

---

## 3. Azure Management & Governance

Topics include:

- Azure management tools
- Governance
- Monitoring
- Cost management
- Role-Based Access Control
- Azure Policy
- Service-level concepts

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- CSS
- React Router

## Backend and Data

- Supabase
- PostgreSQL
- Supabase Authentication
- Row Level Security (RLS)

## Development Tools

- Visual Studio Code
- Node.js
- Git
- GitHub

---

# System Architecture

The high-level architecture is:

```text
                 ┌──────────────────────┐
                 │       Learner        │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    React Web App     │
                 │ TypeScript + Vite    │
                 └──────────┬───────────┘
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
        Authentication     Quiz        Progress
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                 ┌──────────────────────┐
                 │       Supabase       │
                 │ Auth + PostgreSQL    │
                 │       + RLS          │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Learning Data      │
                 │                      │
                 │ Users                │
                 │ Questions            │
                 │ Attempts             │
                 │ Answers              │
                 └──────────────────────┘

                     Future Extension
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Secure AI Endpoint   │
                 │    Study Buddy       │
                 └──────────────────────┘
```
