export interface Quiz{
  id: string,
  question: string,
  answers: Answer[]
}

export interface Answer{
  answer: string,
  correct: boolean
}