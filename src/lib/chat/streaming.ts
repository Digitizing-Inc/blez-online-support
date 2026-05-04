/**
 * Fake-stream a string token-by-token (well, character-chunk-by-chunk),
 * calling `onToken(partial)` as it grows. Returns a `cancel` function
 * that stops the stream and resolves the returned Promise.
 *
 * The dev wiring the real Claude (or other LLM) backend should keep
 * this same shape: a `streamReply(prompt, onToken, signal)` API. Then
 * the UI doesn't change — only the source of tokens changes.
 */
export interface StreamOptions {
  /** Approximate characters emitted per second. Default 60. */
  charsPerSecond?: number
  /** Called with the cumulative text after each tick. */
  onToken: (partial: string) => void
  /** Called once when the stream completes (or is cancelled). */
  onDone?: (finalText: string, cancelled: boolean) => void
}

export function fakeStream(text: string, opts: StreamOptions) {
  const cps = opts.charsPerSecond ?? 60
  // Aim for one tick every ~30ms; chunk size scales accordingly.
  const tickMs = 30
  const charsPerTick = Math.max(1, Math.round((cps * tickMs) / 1000))

  let i = 0
  let cancelled = false
  let timer: ReturnType<typeof setTimeout> | null = null

  function tick() {
    if (cancelled) return
    i = Math.min(text.length, i + charsPerTick)
    opts.onToken(text.slice(0, i))
    if (i >= text.length) {
      opts.onDone?.(text.slice(0, i), false)
      return
    }
    timer = setTimeout(tick, tickMs)
  }

  // Tiny delay before the first token so the "thinking" indicator gets
  // a beat to breathe.
  timer = setTimeout(tick, 280)

  return {
    cancel() {
      if (cancelled) return
      cancelled = true
      if (timer) clearTimeout(timer)
      opts.onDone?.(text.slice(0, i), true)
    },
  }
}
