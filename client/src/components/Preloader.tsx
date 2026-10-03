import { useState, useEffect } from 'react'

export default function Preloader() {
  const [stage, setStage] = useState<'loading' | 'fading' | 'hidden'>('loading')

  useEffect(() => {
    // Wait a brief moment to show the preloader, then start fading
    const fadeTimer = setTimeout(() => {
      setStage('fading')
    }, 500)

    // After fade transition finishes, hide it completely
    const hideTimer = setTimeout(() => {
      setStage('hidden')
    }, 1000) // 500 + 500ms fade duration

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (stage === 'hidden') return null

  return (
    <div className={`preloader ${stage === 'fading' ? 'fade-out' : ''}`}>
      <div className="preloader-brand">
        PR<span>.</span>
      </div>
    </div>
  )
}
