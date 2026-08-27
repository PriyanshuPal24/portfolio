import { useEffect, useState } from 'react'

const TYPE_MS = 55
const DELETE_MS = 28
const HOLD_MS = 1600

/** Types each phrase out, holds, deletes, then moves to the next. */
export default function TypedText({ phrases }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (reduced) {
      setText(phrases[0])
      return
    }

    const current = phrases[index % phrases.length]

    if (!deleting && text === current) {
      const timer = setTimeout(() => setDeleting(true), HOLD_MS)
      return () => clearTimeout(timer)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
      return
    }

    const timer = setTimeout(
      () =>
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        ),
      deleting ? DELETE_MS : TYPE_MS,
    )
    return () => clearTimeout(timer)
  }, [text, deleting, index, phrases, reduced])

  return (
    <>
      <span>{text}</span>
      {!reduced && <span className="caret" aria-hidden="true" />}
    </>
  )
}
