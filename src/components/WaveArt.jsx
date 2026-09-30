import { useId, useMemo } from 'react'

// Ribbons of fine flowing lines. Each strand follows the same slow curve,
// with a spread that narrows and flips along the length so the ribbon
// appears to twist. Generated deterministically — no images, no randomness.
function buildStrands({ count, width, height, seed, amplitude, thickness }) {
  const strands = []
  const cy = height / 2
  const step = 10
  for (let i = 0; i < count; i++) {
    const t = i - (count - 1) / 2
    let d = ''
    for (let x = -40; x <= width + 40; x += step) {
      const spread =
        thickness * (Math.sin(x * 0.0042 + seed) + 0.35 * Math.sin(x * 0.011 + seed * 2))
      const y =
        cy +
        Math.sin(x * 0.0036 + seed) * height * amplitude +
        Math.sin(x * 0.0081 - seed * 0.7 + i * 0.012) * height * 0.06 +
        t * spread
      d += `${d ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    }
    // Lines near the ribbon edges are fainter, giving it depth.
    const edge = Math.abs(t) / ((count - 1) / 2)
    strands.push({ d, opacity: 1 - edge * 0.5 })
  }
  return strands
}

const palettes = {
  // Violet → magenta → blue, as in the brand artwork.
  primary: ['#5b3df5', '#b14cf0', '#e04fd0', '#4f7cff'],
  // A cooler companion ribbon: blue → violet → teal.
  secondary: ['#3d6bff', '#7a4cf0', '#c05ce0', '#45c6e0'],
}

function Ribbon({ id, palette, strands, strokeWidth, opacity }) {
  const [a, b, c, d] = palettes[palette]
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0%" stopColor={a} stopOpacity="0.2" />
          <stop offset="22%" stopColor={b} />
          <stop offset="55%" stopColor={c} />
          <stop offset="85%" stopColor={d} />
          <stop offset="100%" stopColor={d} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} strokeLinecap="round" opacity={opacity}>
        {strands.map((s, i) => (
          <path key={i} d={s.d} strokeOpacity={s.opacity} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </>
  )
}

export default function WaveArt({
  className = '',
  count = 44,
  width = 1200,
  height = 520,
  seed = 1.3,
  strokeWidth = 0.9,
  amplitude = 0.22,
  thickness = 3.2,
  // Adds a second, offset ribbon for a fuller, layered look (used in the hero).
  layered = false,
  opacity = 1,
}) {
  const id = useId().replace(/:/g, '')
  const main = useMemo(
    () => buildStrands({ count, width, height, seed, amplitude, thickness }),
    [count, width, height, seed, amplitude, thickness],
  )
  const second = useMemo(
    () =>
      layered
        ? buildStrands({ count: Math.round(count * 0.8), width, height, seed: seed + 0.9, amplitude: amplitude * 0.85, thickness: thickness * 1.3 })
        : [],
    [layered, count, width, height, seed, amplitude, thickness],
  )

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      style={{ opacity }}
    >
      {layered && <Ribbon id={`r2-${id}`} palette="secondary" strands={second} strokeWidth={strokeWidth} opacity={0.7} />}
      <Ribbon id={`r1-${id}`} palette="primary" strands={main} strokeWidth={strokeWidth} opacity={1} />
    </svg>
  )
}
