'use client'

import { useEffect, useState } from 'react'

/**
 * Thin fixed bar at the very top that fills as you scroll the page. Sits at
 * z-50 — above the sticky header (z-40), below the search dialog (z-60).
 * Uses a scaleX transform (compositor-only) so it stays smooth on every frame.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    function update() {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0)
    }
    function onScroll() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
      aria-hidden="true"
    >
      <div
        className="h-full w-full origin-left bg-[var(--blez-blue)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
