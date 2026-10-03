// Evaluate this script in the preview's DevTools or via CDP Runtime.evaluate.
// It measures actual background callbacks while scrolling, then restores the page.
(async () => {
  const originalRaf = window.requestAnimationFrame
  const originalClearRect = CanvasRenderingContext2D.prototype.clearRect
  const originalScroll = window.scrollY
  const intervals = []
  const costs = []
  let canvasUpdated = false
  let last = null

  CanvasRenderingContext2D.prototype.clearRect = function (...args) {
    if (this.canvas.matches('.space-background, .space-background-motion')) canvasUpdated = true
    return originalClearRect.apply(this, args)
  }
  window.requestAnimationFrame = function (callback) {
    return originalRaf.call(window, (time) => {
      canvasUpdated = false
      const start = performance.now()
      callback(time)
      if (canvasUpdated) costs.push(performance.now() - start)
    })
  }

  try {
    await new Promise((resolve) => {
      let frame = 0
      function sample(time) {
        if (last !== null && frame > 10) intervals.push(time - last)
        last = time
        window.scrollTo({
          top: Math.min(document.documentElement.scrollHeight - innerHeight, frame * 38),
          behavior: 'instant',
        })
        if (++frame < 120) originalRaf.call(window, sample)
        else resolve()
      }
      originalRaf.call(window, sample)
    })

    const stats = (values) => {
      if (!values.length) return { mean: 0, p95: 0, count: 0 }
      const sorted = [...values].sort((a, b) => a - b)
      return {
        mean: +(values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
        p95: +sorted[Math.floor(sorted.length * 0.95)].toFixed(2),
        count: values.length,
      }
    }
    const canvasMs = stats(costs)
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    return {
      canvasMs,
      frameMs: stats(intervals),
      framesOver25ms: intervals.filter((duration) => duration > 25).length,
      reducedMotion,
      pass: reducedMotion ? costs.length === 0 : costs.length > 0 && canvasMs.p95 < 3,
    }
  } finally {
    window.requestAnimationFrame = originalRaf
    CanvasRenderingContext2D.prototype.clearRect = originalClearRect
    window.scrollTo({ top: originalScroll, behavior: 'instant' })
  }
})()
