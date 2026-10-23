import type { Attempt, AnswerRecord } from '../types'
import { supabase } from './supabase'

const GUEST_ATTEMPTS_KEY = 'az900_attempts_guest'

async function getCurrentUser() {
  if (!supabase) {
    return null
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    return user ?? null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

function getStorageKey(userId?: string) {
  if (userId) {
    return `az900_attempts_${userId}`
  }

  return GUEST_ATTEMPTS_KEY
}

function getLocalAttempts(userId?: string): Attempt[] {
  try {
    const key = getStorageKey(userId)
    const saved = localStorage.getItem(key)

    if (!saved) {
      return []
    }

    return JSON.parse(saved) as Attempt[]
  } catch (error) {
    console.error('Error reading local attempts:', error)
    return []
  }
}

function saveLocalAttempt(
  attempt: Attempt,
  userId?: string
) {
  try {
    const attempts = getLocalAttempts(userId)

    const existingIndex = attempts.findIndex(
      (item) => item.id === attempt.id
    )

    if (existingIndex >= 0) {
      attempts[existingIndex] = attempt
    } else {
      attempts.unshift(attempt)
    }

    localStorage.setItem(
      getStorageKey(userId),
      JSON.stringify(attempts)
    )
  } catch (error) {
    console.error('Error saving local attempt:', error)
  }
}

export async function getAttempts(): Promise<Attempt[]> {
  const user = await getCurrentUser()

  /*
   * IMPORTANT:
   * Logged-in users only see their own local attempts.
   * Guest users only see guest attempts.
   */
  const localAttempts = getLocalAttempts(user?.id)

  // If Supabase is not configured, use account-specific local results.
  if (!supabase) {
    return localAttempts
  }

  // If nobody is logged in, don't expose another account's data.
  if (!user) {
    return localAttempts
  }

  try {
    const {
      data: attemptRows,
      error: attemptError,
    } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', {
        ascending: false,
      })

    if (attemptError) {
      console.error(
        'Error loading attempts from Supabase:',
        attemptError
      )

      return localAttempts
    }

    if (!attemptRows || attemptRows.length === 0) {
      return localAttempts
    }

    const attemptIds = attemptRows.map(
      (row) => row.id
    )

    const {
      data: answerRows,
      error: answerError,
    } = await supabase
      .from('quiz_answers')
      .select('*')
      .in('attempt_id', attemptIds)

    if (answerError) {
      console.error(
        'Error loading quiz answers:',
        answerError
      )
    }

    const supabaseAttempts: Attempt[] =
      attemptRows.map((row: any) => {
        const answers: AnswerRecord[] =
          (answerRows || [])
            .filter(
              (answer: any) =>
                answer.attempt_id === row.id
            )
            .map((answer: any) => ({
              questionId:
                answer.app_question_id ||
                answer.question_id,
              selected: Number(
                answer.selected_answer
              ),
              correct: Boolean(
                answer.is_correct
              ),
            }))

        return {
          id: row.id,
          topicId:
            row.app_topic_id || 'all',
          score: Number(row.score),
          total: Number(
            row.total_questions
          ),
          correct: Number(
            row.correct_answers
          ),
          incorrect: Number(
            row.incorrect_answers
          ),
          duration: Number(
            row.duration_seconds || 0
          ),
          date:
            row.completed_at ||
            row.started_at ||
            new Date().toISOString(),
          answers,
        }
      })

    /*
     * Combine this user's Supabase results
     * with this user's local results only.
     */
    const combined = [
      ...supabaseAttempts,
      ...localAttempts.filter(
        (local) =>
          !supabaseAttempts.some(
            (remote) =>
              remote.id === local.id
          )
      ),
    ]

    return combined.sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
  } catch (error) {
    console.error(
      'Unexpected error loading attempts:',
      error
    )

    return localAttempts
  }
}

export async function saveAttempt(
  attempt: Attempt
) {
  const user = await getCurrentUser()

  /*
   * Save locally under the current user's ID.
   * This prevents Account A and Account B
   * from sharing browser progress.
   */
  saveLocalAttempt(
    attempt,
    user?.id
  )

  if (!supabase) {
    return
  }

  if (!user) {
    return
  }

  try {
    const {
      error: attemptError,
    } = await supabase
      .from('quiz_attempts')
      .insert({
        id: attempt.id,
        user_id: user.id,
        app_topic_id:
          attempt.topicId === 'all'
            ? null
            : attempt.topicId,
        score: attempt.score,
        total_questions: attempt.total,
        correct_answers: attempt.correct,
        incorrect_answers:
          attempt.incorrect,
        started_at: new Date(
          Date.now() -
            attempt.duration * 1000
        ).toISOString(),
        completed_at: attempt.date,
        duration_seconds:
          attempt.duration,
      })

    if (attemptError) {
      console.error(
        'Error saving attempt to Supabase:',
        attemptError
      )

      return
    }

    if (attempt.answers.length > 0) {
      const answerRows =
        attempt.answers.map(
          (answer) => ({
            attempt_id: attempt.id,
            app_question_id:
              answer.questionId,
            selected_answer:
              String(answer.selected),
            correct_answer:
              String(
                answer.correct
                  ? answer.selected
                  : ''
              ),
            is_correct:
              answer.correct,
          })
        )

      const {
        error: answersError,
      } = await supabase
        .from('quiz_answers')
        .insert(answerRows)

      if (answersError) {
        console.error(
          'Error saving quiz answers:',
          answersError
        )
      }
    }
  } catch (error) {
    console.error(
      'Unexpected Supabase save error:',
      error
    )
  }
}

// Authentication is handled by Supabase.
export function getUser() {
  return null
}

export function saveUser(
  _user: {
    name: string
    email: string
  }
) {
  // Supabase handles user accounts.
}

export function clearUser() {
  // Supabase handles logout.
}