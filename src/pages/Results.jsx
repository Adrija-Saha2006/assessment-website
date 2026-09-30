import { startTransition, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import AnswerReview from '../components/AnswerReview.jsx'
import Button from '../components/Button.jsx'
import WaveArt from '../components/WaveArt.jsx'
import { useAssessment } from '../lib/AssessmentContext.jsx'
import { scoreAnswers, performanceMessage } from '../lib/scoring.js'

function Stat({ label, value, className = '' }) {
  return (
    <div className={`py-6 ${className}`}>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-3 font-display text-[44px] leading-none tabular-nums sm:text-[52px]">{value}</dd>
    </div>
  )
}

function NoResult() {
  const { inProgress } = useAssessment()
  return (
    <section className="container-page flex flex-1 flex-col justify-center py-24">
      <p className="eyebrow">Results</p>
      <h1 className="mt-5 max-w-[16ch] font-display text-[52px] leading-[0.98] sm:text-[72px]">
        No result <em>yet.</em>
      </h1>
      <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-mist">
        {inProgress
          ? 'You have an assessment in progress. Finish and submit it to see your score here.'
          : 'Complete the assessment and your score will appear here — calculated and shown only on this device.'}
      </p>
      <div className="mt-10">
        <Button to="/assessment" arrow>
          {inProgress ? 'Continue the assessment' : 'Take the assessment'}
        </Button>
      </div>
    </section>
  )
}

export default function Results() {
  const { result, retake } = useAssessment()
  const navigate = useNavigate()
  const score = useMemo(() => (result ? scoreAnswers(result.answers) : null), [result])

  if (!score) return <NoResult />

  const message = performanceMessage(score.percentage)
  const onRetake = () => {
    startTransition(() => {
      retake()
      navigate('/assessment')
    })
  }
  const submitted = new Date(result.submittedAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <WaveArt className="absolute inset-x-0 top-10 h-[260px] w-full opacity-40 sm:top-0 sm:h-[340px]" count={44} seed={3.1} />
        <div className="container-page relative pt-14 pb-12 sm:pt-20">
          <p className="eyebrow">Your result · {submitted}</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
            <h1 className="font-display leading-[0.85]">
              <span className="sr-only">Score: </span>
              <span className="text-[128px] tabular-nums sm:text-[176px] lg:text-[208px]">{score.correctCount}</span>
              <span className="text-[48px] text-mist sm:text-[64px]"> / {score.total}</span>
            </h1>
            <div className="max-w-[44ch] lg:pb-6">
              <p className="font-display text-[34px] leading-tight sm:text-[40px]">{message.title}</p>
              <p className="mt-3 text-[16px] leading-relaxed text-mist sm:text-[17px]">{message.body}</p>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 border-t border-line sm:grid-cols-4">
            <Stat label="Score" value={`${score.correctCount}/${score.total}`} className="pr-4" />
            <Stat label="Percentage" value={`${score.percentage}%`} className="border-l border-line pl-5 sm:pl-8" />
            <Stat label="Correct" value={score.correctCount} className="border-t border-line pr-4 sm:border-t-0 sm:border-l sm:pl-8" />
            <Stat label="Incorrect" value={score.incorrectCount} className="border-t border-l border-line pl-5 sm:border-t-0 sm:pl-8" />
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={onRetake} arrow>
              Retake assessment
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('review')?.scrollIntoView({ behavior: 'smooth' })}>
              Review answers
            </Button>
          </div>
          <p className="mt-6 text-[13px] text-faint">
            This result exists only in this browser. It hasn&rsquo;t been sent or shared anywhere.
          </p>
        </div>
      </section>

      <div id="review" className="container-page scroll-mt-6 py-16 sm:py-24">
        <AnswerReview review={score.review} />
        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <Button onClick={onRetake} arrow>
            Retake assessment
          </Button>
          <Button to="/" variant="outline">
            Back to home
          </Button>
        </div>
      </div>
    </>
  )
}
