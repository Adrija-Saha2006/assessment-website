import { Link } from 'react-router-dom'
import { Brand } from './Header.jsx'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Brand />
          <p className="mt-4 text-[14px] leading-relaxed text-mist">
            A short assessment on keeping people in charge of AI agents. Scored entirely in your
            browser — nothing you answer leaves this device.
          </p>
        </div>
        <div>
          <p className="eyebrow">Site</p>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li><Link className="link-underline text-mist hover:text-paper" to="/">Home</Link></li>
            <li><Link className="link-underline text-mist hover:text-paper" to="/about">About</Link></li>
            <li><Link className="link-underline text-mist hover:text-paper" to="/assessment">Assessment</Link></li>
            <li><Link className="link-underline text-mist hover:text-paper" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Privacy</p>
          <p className="mt-4 text-[14px] leading-relaxed text-mist">
            No accounts, no tracking, no data collection. Your progress is kept only in this
            browser&rsquo;s local storage.
          </p>
        </div>
      </div>
      <div className="container-page">
        <div className="flex flex-col gap-2 border-t border-line py-6 text-[12px] text-faint sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Human in the loop controls</span>
          <span>Made with care. Calculated locally.</span>
        </div>
      </div>
    </footer>
  )
}
