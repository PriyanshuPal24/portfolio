import { useEffect, useState } from 'react'
import { useScrollProgress } from '../hooks/useInteractions.js'

export function ScrollProgress() {
  const progress = useScrollProgress()
  return <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
}

export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={show ? 'to-top show' : 'to-top'}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}
