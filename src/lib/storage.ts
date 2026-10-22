import type { Attempt, AnswerRecord } from '../types'
import { supabase } from './supabase'

export async function getAttempts(): Promise<Attempt[]> {
  if (!supabase) return []

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  // Get this user's quiz attempts
  const { data: attemptRows, error: attemptError } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })

  if (attemptError) {
    console.error('Error loading attempts:', attemptError)
    return []
  }

  if (!attemptRows || attemptRows.length === 0) {
    return []
  }

  // Get answers belonging to these attempts
  const attemptIds = attemptRows.map((row) => row.id)

  const { data: answerRows, error: answerError } = await supabase
    .from('quiz_answers')
    .select('*')
    .in('attempt_id', attemptIds)

  if (answerError) {
    console.error('Error loading quiz answers:', answerError)
  }

  return attemptRows.map((row: any) => {
    const answers: AnswerRecord[] = (answerRows || [])
      .filter((answer: any) => answer.attempt_id === row.id)
      .map((answer: any) => ({
        questionId: answer.app_question_id,
        selected: Number(answer.selected_answer),
        correct: Boolean(answer.is_correct),
      }))

    return {
      id: row.id,
      topicId: row.app_topic_id || 'all',
      score: row.score,
      total: row.total_questions,
      correct: row.correct_answers,
      incorrect: row.incorrect_answers,
      duration: row.duration_seconds || 0,
      date: row.completed_at || row.started_at,
      answers,
    }
  })
}


export async function saveAttempt(attempt: Attempt) {
  if (!supabase) return

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  // Save the main quiz attempt
  const { error: attemptError } = await supabase
    .from('quiz_attempts')
    .insert({
      id: attempt.id,
      user_id: user.id,
      app_topic_id: attempt.topicId === 'all' ? null : attempt.topicId,
      score: attempt.score,
      total_questions: attempt.total,
      correct_answers: attempt.correct,
      incorrect_answers: attempt.incorrect,
      started_at: new Date(
        Date.now() - attempt.duration * 1000
      ).toISOString(),
      completed_at: attempt.date,
      duration_seconds: attempt.duration,
    })

  if (attemptError) {
    console.error('Error saving attempt:', attemptError)
    return
  }

  // Save each individual answer
  if (attempt.answers.length > 0) {
    const answerRows = attempt.answers.map((answer) => ({
      attempt_id: attempt.id,
      app_question_id: answer.questionId,
      selected_answer: String(answer.selected),
      correct_answer: String(
        answer.correct ? answer.selected : ''
      ),
      is_correct: answer.correct,
    }))

    const { error: answersError } = await supabase
      .from('quiz_answers')
      .insert(answerRows)

    if (answersError) {
      console.error('Error saving quiz answers:', answersError)
    }
  }
}


// These functions are kept so the rest of the app does not break.
// Authentication is now handled by Supabase.
export function getUser() {
  return null
}

export function saveUser(_user: { name: string; email: string }) {
  // Supabase handles user accounts.
}

export function clearUser() {
  // Supabase handles logout.
}