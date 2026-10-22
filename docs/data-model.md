# AZ-900 Ready — Data Model

## 1. Overview

AZ-900 Ready uses a relational PostgreSQL database to store learner accounts, learning topics, questions, quiz attempts, and quiz answers.

The data model separates:

- User information
- Learning content
- Quiz sessions
- Individual answers

This makes the system easier to secure, query, and scale.

---

# 2. Main Entities

The main database entities are:

1. Profiles
2. Topics
3. Questions
4. Quiz Attempts
5. Quiz Answers

Relationship overview:

```text
User
 |
 v
Profile
 |
 +--------------------+
 |                    |
 v                    v
Quiz Attempts      Learning Activity
 |
 v
Quiz Answers
 |
 v
Questions
 |
 v
Topics
```
