import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/assessment', label: 'Assessment' },
  { to: '/contact', label: 'Contact' },
]

export function Brand() {
  return (
    <Link to="/" className="text-[19px] tracking-[-0.02em]" aria-label="LOREMipsum — home">
      <span className="font-bold">LOREM</span>
      <span className="font-semibold">ipsum</span>
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="relative z-30 border-b border-line">
      <div className="container-page flex h-[72px] items-center justify-between">
        <Brand />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10 text-[14px]">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `link-underline pb-1 transition-colors ${isActive ? 'text-paper' : 'text-mist hover:text-paper'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-10 items-center gap-3 px-2 text-[13px] uppercase tracking-[0.18em] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
          <span aria-hidden="true" className="relative block h-[9px] w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-paper transition-transform duration-300 ${open ? 'top-1 rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-paper transition-transform duration-300 ${open ? 'top-1 -rotate-45' : 'top-2'}`}
            />
          </span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-ink md:hidden"
      >
        <ul className="container-page py-4">
          {links.map((l) => (
            <li key={l.to} className="border-b border-line last:border-b-0">
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `flex items-baseline justify-between py-4 font-display text-[30px] leading-none ${isActive ? 'text-paper' : 'text-mist'}`
                }
              >
                {l.label}
                <span aria-hidden="true" className="font-sans text-[14px]">→</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
