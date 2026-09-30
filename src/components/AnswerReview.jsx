import { useState } from 'react'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'incorrect', label: 'Incorrect' },
  { id: 'correct', label: 'Correct' },
]

function AnswerLine({ label, letter, text, tone }) {
  const toneCls = tone === 'good' ? 'text-good' : tone === 'bad' ? 'text-bad' : 'text-paper'
  return (
    <div className="grid grid-cols-[110px_1fr] gap-4 text-[15px] sm:grid-cols-[140px_1fr]">
      <dt className="pt-px text-[11px] uppercase tracking-[0.18em] text-mist">{label}</dt>
      <dd className={toneCls}>
        <span className="mr-2 font-medium">{letter}</span>
        <span className="text-paper/90">{text}</span>
      </dd>
    </div>
  )
}

export default function AnswerReview({ review }) {
  const [filter, setFilter] = useState('all')
  const items = review.filter((r) =>
    filter === 'all' ? true : filter === 'correct' ? r.isCorrect : !r.isCorrect,
  )

  return (
    <section aria-labelledby="review-title">
      <div className="flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Answer review</p>
          <h2 id="review-title" className="mt-3 font-serif text-[40px] leading-none tracking-[-0.01em] sm:text-[52px]">
            Every question, <em>reviewed</em>
          </h2>
        </div>
        <div role="group" aria-label="Filter answers" className="flex border border-line">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`h-10 border-r border-line px-4 text-[13px] last:border-r-0 ${
                filter === f.id ? 'bg-paper text-ink' : 'text-mist hover:text-paper'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="py-12 text-mist">
          {filter === 'incorrect' ? 'Nothing here — every answer was correct.' : 'No correct answers this time.'}
        </p>
      ) : (
        <ol>
          {items.map((r) => (
            <li key={r.id} className="grid gap-4 border-b border-line py-8 md:grid-cols-[80px_1fr_120px] md:gap-8">
              <p className="font-serif text-[28px] leading-none text-mist tabular-nums">
                {String(r.id).padStart(2, '0')}
              </p>
              <div>
                <p className="text-[18px] leading-snug sm:text-[20px]">{r.prompt}</p>
                <dl className="mt-5 space-y-3">
                  <AnswerLine
                    label="Your answer"
                    letter={r.selected ?? '—'}
                    text={r.selected ? r.options[r.selected] : 'Not answered'}
                    tone={r.isCorrect ? 'good' : 'bad'}
                  />
                  {!r.isCorrect && (
                    <AnswerLine label="Correct answer" letter={r.correct} text={r.options[r.correct]} tone="good" />
                  )}
                </dl>
              </div>
              <p
                className={`text-[11px] uppercase tracking-[0.2em] md:pt-1.5 md:text-right ${r.isCorrect ? 'text-good' : 'text-bad'}`}
              >
                {r.isCorrect ? 'Correct' : 'Incorrect'}
              </p>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
