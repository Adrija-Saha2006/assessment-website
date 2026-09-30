import { questions } from '../data/questions.js'
import { answerKey } from '../data/answerKey.js'

// Score a set of answers ({ [questionId]: 'A' | 'B' | 'C' | 'D' }) locally.
export function scoreAnswers(answers) {
  const review = questions.map((q) => {
    const selected = answers[q.id] ?? null
    const correct = answerKey[q.id]
    return {
      id: q.id,
      prompt: q.prompt,
      options: q.options,
      selected,
      correct,
      isCorrect: selected === correct,
    }
  })

  const total = questions.length
  const correctCount = review.filter((r) => r.isCorrect).length
  const incorrectCount = total - correctCount
  const percentage = total === 0 ? 0 : Math.round((correctCount / total) * 100)

  return { total, correctCount, incorrectCount, percentage, review }
}

export function performanceMessage(percentage) {
  if (percentage === 100) {
    return {
      title: 'A perfect paper.',
      body: 'Every answer correct. You have a clear, practical grasp of how human oversight keeps agents safe.',
    }
  }
  if (percentage >= 85) {
    return {
      title: 'Excellent work.',
      body: 'You understand the principles well. Look over the few you missed to round things out.',
    }
  }
  if (percentage >= 70) {
    return {
      title: 'A solid result.',
      body: 'The fundamentals are there. The review below shows where a little more attention would help.',
    }
  }
  if (percentage >= 50) {
    return {
      title: 'A fair start.',
      body: 'You have some of the key ideas. Work through the review and try again when you are ready.',
    }
  }
  return {
    title: 'Worth another look.',
    body: 'This is a good moment to revisit the basics. Read through the review below, then retake the assessment.',
  }
}
