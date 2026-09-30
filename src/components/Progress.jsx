export default function Progress({ current, total, answered }) {
  const pct = (answered / total) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between text-[13px]">
        <p aria-live="polite">
          <span className="sr-only">Question </span>
          <span className="font-display text-[28px] leading-none tabular-nums">{current}</span>
          <span className="text-mist"> / {total}</span>
        </p>
        <p className="text-mist tabular-nums">{answered} answered</p>
      </div>
      <div
        className="mt-4 h-px w-full bg-line"
        role="progressbar"
        aria-label="Questions answered"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answered}
      >
        <div
          className="h-px bg-gradient-to-r from-sky via-lilac to-rose transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
