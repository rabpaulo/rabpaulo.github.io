# Background motion and scroll performance

The foreground stars now use the old graph particles' independent directions and edge bounces. Their speeds are measured in pixels per second so movement stays consistent across display refresh rates. The distant starfield remains cached in a separate canvas.

The planet has been removed. The distant sky retains a softly textured blue-gray cosmic dust trail on the right, with slightly increased haze and grain brightness. Dust is generated only during initialization or resize and cached with the distant stars, adding no per-frame drawing to the foreground animation.

The previous implementation repainted up to 1,600 stars and copied a full-screen galaxy texture every frame. The new implementation repaints at most 140 foreground stars using cached glow sprites. Drawing is capped at 60 Hz, foreground pixel density at 1.5, and resize regeneration is debounced. Animation stops when the document is hidden or reduced motion is requested.

The header previously stored every scroll position in React state, despite only needing to know whether the page was at the top. It now changes state only when crossing that threshold and uses a passive scroll listener. Disabling its backdrop blur did not improve the measured scroll frame p95, so the blur remains.

## Regression check

Run the dev preview at `/portfolio/`, keep it visible, and evaluate `client/scripts/scroll-performance.js` in the browser's DevTools console or with CDP `Runtime.evaluate` (`awaitPromise: true`, `returnByValue: true`). The script scrolls through 120 frames, measures callbacks that actually repaint the foreground canvas, and restores the original scroll position and instrumentation. Run once to warm section reveals before comparing repeat measurements.

For the stress check, use DevTools CPU throttling at 4× slowdown, or CDP `Emulation.setCPUThrottlingRate` with `rate: 4`. Restore `rate: 1` afterward. The active animation passes when it draws and its callback p95 is below 3 ms. With reduced motion enabled, it passes when no animation callbacks redraw the canvas.

Measured in the local in-app browser on 2026-10-03, with 4× CPU slowdown:

| Scenario | Mean canvas callback | Canvas callback p95 | Scroll intervals over 25 ms | Verdict |
| --- | ---: | ---: | ---: | --- |
| Previous implementation, warmed | 6.53 ms | 8.6 ms | 1 | Fail |
| Separate sky and foreground | 1.22 ms | 1.8 ms | 0 | Pass |
| Final implementation, desktop | 1.10 ms | 1.7 ms | 0 | Pass |
| Final implementation, mobile viewport | 0.25 ms | 0.7 ms | 0 | Pass |
| Reduced motion | 0 ms | 0 ms | 0 | Pass |
| Previous starfield with static ringed planet | 0.82 ms | 1.5 ms | 0 | Pass |

The final desktop callback p95 fell by approximately 80%. This is callback CPU time, not a claim that the entire site or GPU rendering became 80% faster. The browser's measured scroll frame p95 was 24.3 ms for both the warmed baseline and final run; the initial cold baseline reached 34.9 ms. Timings vary by device and section reveal state. Mobile layout had no horizontal overflow. Build and lint passed.
