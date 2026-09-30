// All persistence is local to this browser. Nothing is ever sent anywhere.

const PROGRESS_KEY = 'loremipsum.assessment.progress.v1'
const RESULT_KEY = 'loremipsum.assessment.result.v1'

function read(key) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage unavailable (private mode, quota). The session still works in memory.
  }
}

function remove(key) {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

const isAnswerMap = (v) => v && typeof v === 'object' && !Array.isArray(v)

export function loadProgress() {
  const data = read(PROGRESS_KEY)
  if (!data || !isAnswerMap(data.answers) || typeof data.current !== 'number') return null
  return data
}

export const saveProgress = (progress) => write(PROGRESS_KEY, progress)
export const clearProgress = () => remove(PROGRESS_KEY)

export function loadResult() {
  const data = read(RESULT_KEY)
  if (!data || !isAnswerMap(data.answers)) return null
  return data
}

export const saveResult = (result) => write(RESULT_KEY, result)
export const clearResult = () => remove(RESULT_KEY)
