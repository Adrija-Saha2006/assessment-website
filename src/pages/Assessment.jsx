import { startTransition, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import OptionList from '../components/OptionList.jsx'
import Progress from '../components/Progress.jsx'
import WaveArt from '../components/WaveArt.jsx'
import { questions, TOTAL_QUESTIONS, OPTION_KEYS } from '../data/questions.js'
import { useAssessment } from '../lib/AssessmentContext.jsx'

const rules = [
  'One question at a time, with four options each.',
  'Answer each question before moving on. You can go back and change answers at any time.',
  'Each correct answer is worth one mark. Answers are revealed only after you submit.',
  'Your progress is saved in this browser, so a refresh or closed tab won’t lose your place.',
]

function Intro({ onBegin, hasResult }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <WaveArt className="absolute inset-x-0 bottom-0 h-[200px] w-full opacity-50" count={36} seed={0.6} />
        <div className="container-page relative pt-16 pb-36 sm:pt-24 sm:pb-48">
          <p className="eyebrow">The assessment</p>
          <h1 className="mt-6 max-w-[15ch] font-serif text-[52px] leading-[0.98] tracking-[-0.02em] sm:text-[80px]">
            Thirty questions. <em>Your pace.</em>
          </h1>
        </div>
      </section>
      <section className="container-page grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <div>
          <p className="eyebrow">Before you begin</p>
          <p className="mt-5 max-w-[30ch] text-[17px] leading-relaxed text-mist">
            Set aside around fifteen minutes. There is no timer and no sign-up.
          </p>
        </div>
        <div>
          <ol className="border-t border-line">
            {rules.map((r, i) => (
              <li key={r} className="flex items-baseline gap-6 border-b border-line py-5 text-[17px] leading-snug">
                <span className="w-8 shrink-0 text-[13px] text-mist tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {r}
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button onClick={onBegin} arrow>
              Begin the assessment
            </Button>
            {hasResult && (
              <Button to="/results" variant="outline">
                View last result
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function QuestionIndex({ answers, current, onJump }) {
  // A question is reachable when every question before it has been answered.
  let reachable = true
  return (
    <nav aria-label="Question overview" className="mt-14 border-t border-line pt-6">
      <p className="eyebrow">Overview</p>
      <ol className="mt-4 grid grid-cols-10 gap-px sm:grid-cols-15">
        {questions.map((q, i) => {
          const answered = Boolean(answers[q.id])
          const canJump = reachable
          if (!answered) reachable = false
          const isCurrent = i === current
          return (
            <li key={q.id}>
              <button
                type="button"
                disabled={!canJump}
                onClick={() => onJump(i)}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Question ${q.id}${answered ? ', answered' : ''}`}
                className={`flex h-9 w-full items-center justify-center text-[12px] tabular-nums transition-colors ${
                  isCurrent
                    ? 'bg-paper text-ink'
                    : answered
                      ? 'text-paper hover:bg-white/[0.08]'
                      : 'text-faint'
                } ${answered && !isCurrent ? 'underline decoration-lilac underline-offset-4' : ''} disabled:cursor-not-allowed`}
              >
                {q.id}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function QuestionView() {
  const { progress, answeredCount, selectAnswer, goTo, submit, abandon } = useAssessment()
  const navigate = useNavigate()
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const [confirmRestart, setConfirmRestart] = useState(false)
  const [nudge, setNudge] = useState(false)
  const headingRef = useRef(null)
  const firstRender = useRef(true)

  const index = progress.current
  const question = questions[index]
  const selected = progress.answers[question.id] ?? null
  const isLast = index === TOTAL_QUESTIONS - 1
  const allAnswered = answeredCount === TOTAL_QUESTIONS

  // Move focus to the new question so keyboard and screen-reader users follow along.
  useEffect(() => {
    setNudge(false)
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [index])

  // Letter keys (A–D) or 1–4 pick an option.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || confirmSubmit || confirmRestart) return
      const tag = e.target.tagName
      if (tag === 'INPUT' && e.target.type !== 'radio') return
      if (tag === 'TEXTAREA') return
      const k = e.key.toUpperCase()
      const key = OPTION_KEYS.includes(k) ? k : OPTION_KEYS[Number(k) - 1]
      if (key) {
        e.preventDefault()
        selectAnswer(question.id, key)
        setNudge(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [question.id, selectAnswer, confirmSubmit, confirmRestart])

  const next = () => {
    if (!selected) {
      setNudge(true)
      return
    }
    if (isLast) setConfirmSubmit(true)
    else goTo(index + 1)
  }

  // Submit and navigate in one transition so the intro screen never flashes
  // between the last question and the results page.
  const doSubmit = () => {
    startTransition(() => {
      if (submit()) navigate('/results')
    })
  }

  return (
    <section className="container-page py-10 sm:py-16">
      <div className="mx-auto max-w-[820px]">
        <Progress current={index + 1} total={TOTAL_QUESTIONS} answered={answeredCount} />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-12 font-serif text-[32px] leading-[1.1] tracking-[-0.01em] outline-none sm:mt-16 sm:text-[44px] lg:text-[52px]"
        >
          <span className="sr-only">Question {index + 1} of {TOTAL_QUESTIONS}: </span>
          {question.prompt}
        </h1>

        <div className="mt-10 sm:mt-12">
          <OptionList
            key={question.id}
            questionId={question.id}
            options={question.options}
            selected={selected}
            onSelect={(key) => {
              selectAnswer(question.id, key)
              setNudge(false)
            }}
          />
        </div>

        <p aria-live="polite" className={`mt-4 min-h-6 text-[14px] ${nudge ? 'text-rose' : 'text-faint'}`}>
          {nudge
            ? 'Select an answer to continue.'
            : !selected
              ? 'Choose an option — or press A, B, C or D.'
              : ''}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Button variant="outline" onClick={() => goTo(index - 1)} disabled={index === 0}>
            <span aria-hidden="true">←</span> Previous
          </Button>
          <Button onClick={next} aria-disabled={!selected} className={selected ? '' : 'opacity-50'}>
            {isLast ? 'Submit' : 'Next'} <span aria-hidden="true">→</span>
          </Button>
        </div>

        <QuestionIndex answers={progress.answers} current={index} onJump={goTo} />

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-[13px] text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>Progress is saved in this browser only.</p>
          <div className="flex gap-6">
            {allAnswered && !isLast && (
              <button type="button" className="link-underline text-paper" onClick={() => setConfirmSubmit(true)}>
                Submit now
              </button>
            )}
            <button type="button" className="link-underline hover:text-paper" onClick={() => setConfirmRestart(true)}>
              Start over
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmSubmit}
        title="Submit your answers?"
        confirmLabel="Submit and see results"
        cancelLabel="Keep reviewing"
        onConfirm={doSubmit}
        onCancel={() => setConfirmSubmit(false)}
      >
        You&rsquo;ve answered all {TOTAL_QUESTIONS} questions. Once you submit, your answers are
        final and the correct answers will be shown.
      </ConfirmDialog>

      <ConfirmDialog
        open={confirmRestart}
        title="Start over?"
        confirmLabel="Clear and start over"
        cancelLabel="Keep going"
        onConfirm={() => {
          setConfirmRestart(false)
          abandon()
        }}
        onCancel={() => setConfirmRestart(false)}
      >
        This clears the {answeredCount} {answeredCount === 1 ? 'answer' : 'answers'} you&rsquo;ve
        given so far. This can&rsquo;t be undone.
      </ConfirmDialog>
    </section>
  )
}

export default function Assessment() {
  const { inProgress, answeredCount, result, start } = useAssessment()

  // Warn before the tab is closed or reloaded mid-assessment. Progress is also
  // saved locally, so this is a second layer of protection.
  useEffect(() => {
    if (!inProgress || answeredCount === 0) return
    const onBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [inProgress, answeredCount])

  if (!inProgress) return <Intro onBegin={start} hasResult={Boolean(result)} />
  return <QuestionView />
}
