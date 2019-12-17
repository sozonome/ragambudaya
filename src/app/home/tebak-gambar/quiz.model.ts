export interface Quiz{
  id: string,
  question: string,
  image?: string,
  answers: Answer[]
}

export interface Answer{
  answer: string,
  correct: boolean
}

export interface Score {
  id: string, 
  name: string,
  score: number,
}