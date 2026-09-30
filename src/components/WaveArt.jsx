import { useId, useMemo } from 'react'

// A ribbon of fine flowing lines. Each strand follows the same slow curve,
// with a spread that narrows and flips along the length so the ribbon
// appears to twist. Generated deterministically — no images, no randomness.
function buildStrands({ count, width, height, seed }) {
  const strands = []
  const cy = height / 2
  const step = 12
  for (let i = 0; i < count; i++) {
    const t = i - (count - 1) / 2
    let d = ''
    for (let x = -40; x <= width + 40; x += step) {
      const spread = 3.2 * Math.sin(x * 0.0042 + seed) + 1.1 * Math.sin(x * 0.011 + seed * 2)
      const y =
        cy +
        Math.sin(x * 0.0033 + seed) * height * 0.22 +
        Math.sin(x * 0.0081 - seed * 0.7 + i * 0.012) * height * 0.07 +
        t * spread
      d += `${d ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    }
    // Lines near the ribbon edges are fainter, giving it depth.
    const edge = Math.abs(t) / ((count - 1) / 2)
    strands.push({ d, opacity: 1 - edge * 0.55 })
  }
  return strands
}

export default function WaveArt({
  className = '',
  count = 44,
  width = 1200,
  height = 520,
  seed = 1.3,
  strokeWidth = 0.9,
}) {
  const id = useId().replace(/:/g, '')
  const strands = useMemo(() => buildStrands({ count, width, height, seed }), [count, width, height, seed])

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor="#8fb8ff" stopOpacity="0" />
          <stop offset="18%" stopColor="#8fb8ff" />
          <stop offset="48%" stopColor="#c9a7ff" />
          <stop offset="74%" stopColor="#f0a6d0" />
          <stop offset="100%" stopColor="#f0a6d0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#g-${id})`} strokeWidth={strokeWidth} strokeLinecap="round">
        {strands.map((s, i) => (
          <path key={i} d={s.d} strokeOpacity={s.opacity} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  )
}
