import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-3 px-6 h-12 text-[15px] tracking-[-0.005em] transition-colors duration-200 disabled:opacity-35 disabled:cursor-not-allowed select-none'

const variants = {
  primary: 'bg-paper text-ink hover:bg-white/85',
  outline: 'border border-line-strong text-paper hover:border-paper enabled:hover:bg-white/[0.04]',
  ghost: 'text-mist hover:text-paper px-0',
}

export default function Button({ to, variant = 'primary', className = '', children, arrow = false, ...props }) {
  const cls = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      {children}
      {arrow && <span aria-hidden="true">→</span>}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} {...props}>
      {content}
    </button>
  )
}
