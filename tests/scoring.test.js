import { describe, it, expect } from 'vitest'
import { questions, OPTION_KEYS } from '../src/data/questions.js'
import { answerKey } from '../src/data/answerKey.js'
import { scoreAnswers, performanceMessage } from '../src/lib/scoring.js'

describe('question data', () => {
  it('has 30 questions in order with four options each', () => {
    expect(questions).toHaveLength(30)
    questions.forEach((q, i) => {
      expect(q.id).toBe(i + 1)
      expect(Object.keys(q.options)).toEqual(OPTION_KEYS)
    })
  })
  it('has a valid answer for every question and nothing else', () => {
    expect(Object.keys(answerKey).map(Number)).toEqual(questions.map((q) => q.id))
    Object.values(answerKey).forEach((v) => expect(OPTION_KEYS).toContain(v))
  })
  it('keeps answers out of the question data', () => {
    questions.forEach((q) => expect(Object.keys(q).sort()).toEqual(['id', 'options', 'prompt']))
  })
})

describe('scoreAnswers', () => {
  it('scores a perfect paper', () => {
    const s = scoreAnswers({ ...answerKey })
    expect(s).toMatchObject({ total: 30, correctCount: 30, incorrectCount: 0, percentage: 100 })
  })
  it('scores a mixed paper', () => {
    const answers = { ...answerKey }
    for (let id = 1; id <= 10; id++) answers[id] = answerKey[id] === 'A' ? 'B' : 'A'
    const s = scoreAnswers(answers)
    expect(s).toMatchObject({ correctCount: 20, incorrectCount: 10, percentage: 67 })
    expect(s.review[0]).toMatchObject({ id: 1, isCorrect: false, correct: 'B' })
  })
  it('treats missing answers as incorrect', () => {
    expect(scoreAnswers({}).correctCount).toBe(0)
  })
  it('returns a message for every band', () => {
    ;[0, 50, 70, 85, 100].forEach((p) => expect(performanceMessage(p).title).toBeTruthy())
  })
})
