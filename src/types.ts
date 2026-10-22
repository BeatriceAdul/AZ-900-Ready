export type TopicId = 'cloud-concepts' | 'azure-architecture' | 'azure-governance'
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Topic {
  id: TopicId
  name: string
  description: string
  color: string
}

export interface Question {
  id: string
  topicId: TopicId
  question: string
  options: string[]
  answer: number
  explanation: string
  simpleExplanation: string
  memoryTip: string
  difficulty: Difficulty
  concept: string
}

export interface AnswerRecord {
  questionId: string
  selected: number
  correct: boolean
}

export interface Attempt {
  id: string
  topicId: TopicId | 'all'
  score: number
  total: number
  correct: number
  incorrect: number
  duration: number
  date: string
  answers: AnswerRecord[]
}
