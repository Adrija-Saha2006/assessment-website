import Button from '../components/Button.jsx'
import WaveArt from '../components/WaveArt.jsx'
import { useAssessment } from '../lib/AssessmentContext.jsx'
import { TOTAL_QUESTIONS } from '../data/questions.js'

const facts = [
  { n: '30', label: 'Questions', text: 'Multiple choice, one at a time, four options each.' },
  { n: '~15', label: 'Minutes', text: 'Go at your own pace. Progress is kept if you close the tab.' },
  { n: '0', label: 'Data collected', text: 'Scored in your browser. No accounts, no servers, no tracking.' },
]

const topics = [
  'Approval gates and when to use them',
  'Approval fatigue and automation bias',
  'Kill switches, fail-closed defaults and stop behaviour',
  'Audit trails that can be trusted',
  'Prompt injection and where approvals should come from',
  'Matching review effort to risk and reversibility',
]

export default function Home() {
  const { inProgress, answeredCount, result } = useAssessment()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[430px] sm:h-[520px] lg:h-[600px]">
          <WaveArt
            className="wave-in h-full w-full"
            count={52}
            height={560}
            amplitude={0.26}
            thickness={4.2}
            strokeWidth={1}
            layered
          />
        </div>
        <div className="container-page relative z-10 flex min-h-[640px] flex-col justify-end pb-16 pt-[330px] sm:min-h-[720px] sm:pt-[400px] lg:min-h-[calc(100dvh-72px)] lg:pb-24 lg:pt-[440px]">
          <p className="eyebrow">An assessment on human oversight of AI agents</p>
          <h1 className="mt-5 max-w-[16ch] font-display text-[48px] leading-[0.98] sm:text-[72px] lg:text-[84px]">
            Keep a person <br className="hidden sm:block" /><em>in the loop.</em>
          </h1>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-mist sm:text-[19px]">
              Thirty questions on approvals, audit trails, escalation and the quiet ways oversight
              fails. Find out how well you know the practice — privately, in your own browser.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              {inProgress ? (
                <Button to="/assessment" arrow>
                  Resume · {answeredCount} / {TOTAL_QUESTIONS}
                </Button>
              ) : (
                <Button to="/assessment" arrow>
                  Begin the assessment
                </Button>
              )}
              {result ? (
                <Button to="/results" variant="outline">
                  View last result
                </Button>
              ) : (
                <Button to="/about" variant="outline">
                  Read more
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-y border-line">
        <div className="container-page grid md:grid-cols-3">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`py-10 md:py-14 ${i > 0 ? 'border-t border-line md:border-t-0 md:border-l md:pl-10' : ''} ${i < 2 ? 'md:pr-10' : ''}`}
            >
              <p className="font-display text-[64px] leading-none tabular-nums">{f.n}</p>
              <p className="mt-4 eyebrow">{f.label}</p>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-mist">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What it covers */}
      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <div>
          <p className="eyebrow">What it covers</p>
          <h2 className="mt-5 font-display text-[40px] leading-[1.02] sm:text-[56px]">
            The practical side of <em>staying in charge.</em>
          </h2>
        </div>
        <ol className="border-t border-line">
          {topics.map((t, i) => (
            <li key={t} className="flex items-baseline gap-6 border-b border-line py-5 text-[17px] sm:text-[19px]">
              <span className="w-8 shrink-0 text-[13px] text-mist tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              {t}
            </li>
          ))}
        </ol>
      </section>

      {/* Privacy + CTA */}
      <section className="border-t border-line">
        <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow">Privacy, plainly</p>
            <p className="mt-5 max-w-[34ch] font-display text-[30px] leading-[1.15] sm:text-[38px]">
              Your answers never leave this device. There is no one on the other end — only you
              see your score.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-8">
            <p className="max-w-[48ch] text-[16px] leading-relaxed text-mist">
              There are no sign-ups, no names, no emails and no analytics. Scoring happens in the
              page itself, and progress is saved only to your browser&rsquo;s local storage so a
              refresh doesn&rsquo;t cost you your place.
            </p>
            <div>
              <Button to="/assessment" arrow>
                {inProgress ? 'Continue where you left off' : 'Start now'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
