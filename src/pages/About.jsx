import Button from '../components/Button.jsx'
import WaveArt from '../components/WaveArt.jsx'

const principles = [
  {
    title: 'One question at a time',
    text: 'Each question stands alone, with four options. You can step back and change any earlier answer before you submit.',
  },
  {
    title: 'One mark each',
    text: 'Thirty questions, thirty marks. There is no negative marking and no time limit.',
  },
  {
    title: 'Answers after, not before',
    text: 'Correct answers are only shown once you submit, alongside a full review of every question.',
  },
  {
    title: 'Private by construction',
    text: 'The site has no server-side component at all. Scoring runs in your browser and nothing is sent anywhere.',
  },
]

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <WaveArt className="absolute inset-x-0 bottom-0 h-[220px] w-full opacity-60" count={40} seed={2.4} />
        <div className="container-page relative pt-16 pb-40 sm:pt-24 sm:pb-52">
          <p className="eyebrow">About</p>
          <h1 className="mt-6 max-w-[16ch] font-serif text-[52px] leading-[0.98] tracking-[-0.02em] sm:text-[80px]">
            A short test of a <em>long-term</em> habit.
          </h1>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <div>
          <p className="eyebrow">Why it exists</p>
        </div>
        <div className="space-y-6 text-[17px] leading-relaxed text-paper/85 sm:text-[19px]">
          <p>
            AI agents increasingly take real actions — sending messages, moving money, changing
            records. The safeguards around them are rarely technical marvels. They are careful
            decisions about when a person should look, what they should see, and what happens when
            nobody answers.
          </p>
          <p>
            LOREMipsum is a compact way to check how well you know those decisions. It is useful for
            engineers building agents, the people reviewing their output, and anyone writing the
            policies in between.
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-page">
          <ul className="grid sm:grid-cols-2">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className={`border-b border-line py-10 sm:py-12 ${i % 2 === 1 ? 'sm:border-l sm:pl-10' : 'sm:pr-10'} ${i >= 2 ? 'sm:border-b-0' : ''}`}
              >
                <p className="text-[13px] text-mist tabular-nums">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="mt-4 font-serif text-[30px] leading-tight">{p.title}</h2>
                <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-mist">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-page flex flex-col gap-8 py-20 sm:flex-row sm:items-end sm:justify-between sm:py-24">
          <p className="max-w-[20ch] font-serif text-[36px] leading-[1.05] sm:text-[48px]">
            Ready when you are.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/assessment" arrow>
              Take the assessment
            </Button>
            <Button to="/contact" variant="outline">
              Get in touch
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
