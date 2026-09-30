import { useState } from 'react'
import { site } from '../config/site.js'

const field =
  'mt-3 w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-[18px] text-paper placeholder:text-faint focus:border-paper focus:outline-none focus:ring-0'

// The form never submits anywhere: it composes a message in the visitor's own
// email app via a mailto: link, so this site never sees or stores it.
export default function Contact() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) {
      setError('Please write a message first.')
      return
    }
    setError('')
    const params = new URLSearchParams({
      subject: subject.trim() || 'Hello from the LOREMipsum site',
      body: message.trim(),
    })
    // URLSearchParams encodes spaces as "+", which mail clients show literally.
    window.location.href = `mailto:${site.contactEmail}?${params.toString().replace(/\+/g, '%20')}`
  }

  return (
    <section className="container-page grid gap-16 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-6 font-display text-[52px] leading-[0.98] sm:text-[80px]">
          Say <em>hello.</em>
        </h1>
        <p className="mt-8 max-w-[38ch] text-[17px] leading-relaxed text-mist">
          Questions about the assessment, a correction, or an idea for improving it — we&rsquo;d be
          glad to hear from you.
        </p>
        <dl className="mt-12 border-t border-line">
          <div className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:justify-between">
            <dt className="eyebrow pt-1">Email</dt>
            <dd>
              <a className="link-underline text-[17px]" href={`mailto:${site.contactEmail}`}>
                {site.contactEmail}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:justify-between">
            <dt className="eyebrow pt-1">Reply time</dt>
            <dd className="text-[17px]">Usually within a few days</dd>
          </div>
        </dl>
      </div>

      <form onSubmit={onSubmit} noValidate className="lg:pt-24">
        <label className="block">
          <span className="eyebrow">Subject</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What is it about?"
            className={field}
          />
        </label>
        <label className="mt-10 block">
          <span className="eyebrow">Message</span>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              if (error) setError('')
            }}
            rows={6}
            placeholder="Write your message"
            aria-invalid={Boolean(error)}
            aria-describedby="contact-note"
            className={`${field} resize-y leading-relaxed`}
          />
        </label>
        {error && (
          <p role="alert" className="mt-3 text-[14px] text-bad">
            {error}
          </p>
        )}
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p id="contact-note" className="max-w-[36ch] text-[13px] leading-relaxed text-faint">
            This opens your own email app with the message filled in. Nothing is sent from or
            stored by this website.
          </p>
          <button type="submit" className="inline-flex h-12 items-center justify-center gap-3 bg-paper px-6 text-[15px] text-ink hover:bg-white/85">
            Open in email app <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </section>
  )
}
