'use client'

import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'

interface ToastProps {
  message: string
  visible: boolean
  onClose: () => void
}

/**
 * Tiny toast that announces clipboard / feedback success. Auto-dismisses
 * after 1.6s and on click. Position is anchored above the bottom of the
 * viewport — far enough up to clear the input bar even when its
 * textarea has auto-grown to 6 rows.
 *
 * The `onClose` callback is read via ref so this component's effect
 * doesn't reset the timer every time the parent re-renders with a new
 * inline `() => ...` closure.
 */
export default function Toast({ message, visible, onClose }: ToastProps) {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => onCloseRef.current(), 1600)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 bottom-40 z-50 flex justify-center transition-all duration-200 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={() => onCloseRef.current()}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-2 text-sm text-[var(--text-primary)] shadow-[var(--shadow-lg)]"
      >
        <Check className="h-4 w-4 text-[var(--success)]" strokeWidth={2.5} />
        {message}
      </button>
    </div>
  )
}
