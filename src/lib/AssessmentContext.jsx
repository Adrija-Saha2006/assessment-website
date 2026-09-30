import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { TOTAL_QUESTIONS, OPTION_KEYS, questions } from '../data/questions.js'
import {
  loadProgress,
  saveProgress,
  clearProgress,
  loadResult,
  saveResult,
  clearResult,
} from './storage.js'

const AssessmentContext = createContext(null)

const validIds = new Set(questions.map((q) => q.id))

function sanitizeAnswers(answers) {
  const clean = {}
  for (const [id, value] of Object.entries(answers ?? {})) {
    if (validIds.has(Number(id)) && OPTION_KEYS.includes(value)) clean[id] = value
  }
  return clean
}

function restoreProgress() {
  const saved = loadProgress()
  if (!saved) return null
  const answers = sanitizeAnswers(saved.answers)
  const current = Math.min(Math.max(0, Math.floor(saved.current)), TOTAL_QUESTIONS - 1)
  return { answers, current, startedAt: saved.startedAt ?? Date.now() }
}

function restoreResult() {
  const saved = loadResult()
  if (!saved) return null
  const answers = sanitizeAnswers(saved.answers)
  // A result only counts if every question was answered.
  if (Object.keys(answers).length !== TOTAL_QUESTIONS) return null
  return { answers, submittedAt: saved.submittedAt ?? Date.now() }
}

export function AssessmentProvider({ children }) {
  const [progress, setProgress] = useState(restoreProgress)
  const [result, setResult] = useState(restoreResult)

  useEffect(() => {
    if (progress) saveProgress(progress)
    else clearProgress()
  }, [progress])

  useEffect(() => {
    if (result) saveResult(result)
    else clearResult()
  }, [result])

  const start = useCallback(() => {
    setProgress({ answers: {}, current: 0, startedAt: Date.now() })
  }, [])

  const selectAnswer = useCallback((questionId, key) => {
    if (!OPTION_KEYS.includes(key)) return
    setProgress((p) => (p ? { ...p, answers: { ...p.answers, [questionId]: key } } : p))
  }, [])

  const goTo = useCallback((index) => {
    setProgress((p) => {
      if (!p) return p
      const target = Math.min(Math.max(0, index), TOTAL_QUESTIONS - 1)
      // Moving forward is only allowed over answered questions.
      for (let i = 0; i < target; i++) {
        if (!p.answers[questions[i].id]) return p
      }
      return { ...p, current: target }
    })
  }, [])

  const submit = useCallback(() => {
    if (!progress) return false
    const answered = questions.every((q) => progress.answers[q.id])
    if (!answered) return false
    setResult({ answers: progress.answers, submittedAt: Date.now() })
    setProgress(null)
    return true
  }, [progress])

  const abandon = useCallback(() => setProgress(null), [])

  const retake = useCallback(() => {
    setResult(null)
    setProgress({ answers: {}, current: 0, startedAt: Date.now() })
  }, [])

  const value = useMemo(
    () => ({
      progress,
      result,
      inProgress: progress !== null,
      answeredCount: progress ? Object.keys(progress.answers).length : 0,
      start,
      selectAnswer,
      goTo,
      submit,
      abandon,
      retake,
    }),
    [progress, result, start, selectAnswer, goTo, submit, abandon, retake],
  )

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext)
  if (!ctx) throw new Error('useAssessment must be used inside AssessmentProvider')
  return ctx
}
