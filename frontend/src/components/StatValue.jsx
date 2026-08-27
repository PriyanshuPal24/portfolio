import { useCountUp } from '../hooks/useInteractions.js'

const NUMERIC = /^([^\d]*)([\d.]+)(.*)$/

/** Animates the numeric part of a stat (e.g. "800+", "8.29") when scrolled into view. */
export default function StatValue({ value }) {
  const match = NUMERIC.exec(value)
  const decimals = match ? (match[2].split('.')[1]?.length ?? 0) : 0
  const { ref, value: animated } = useCountUp(match ? Number(match[2]) : null)

  if (!match) return <strong>{value}</strong>

  return (
    <strong ref={ref}>
      {match[1]}
      {animated.toFixed(decimals)}
      {match[3]}
    </strong>
  )
}
