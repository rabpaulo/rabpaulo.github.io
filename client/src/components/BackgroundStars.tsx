import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  radius: number
  opacity: number
  phase: number
  twinkleSpeed: number
  blue: boolean
  vx: number
  vy: number
}

// A normal distribution makes the galactic dust look organic rather than uniform.
function gaussian() {
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random())
}

function createGlow(blue: boolean) {
  const sprite = document.createElement('canvas')
  sprite.width = 64
  sprite.height = 64
  const context = sprite.getContext('2d')!
  const color = blue ? '153, 201, 255' : '220, 234, 255'
  const glow = context.createRadialGradient(32, 32, 0, 32, 32, 32)
  glow.addColorStop(0, 'rgba(255, 255, 255, 1)')
  glow.addColorStop(0.07, `rgba(${color}, 0.95)`)
  glow.addColorStop(0.2, `rgba(${color}, 0.3)`)
  glow.addColorStop(1, `rgba(${color}, 0)`)
  context.fillStyle = glow
  context.fillRect(0, 0, 64, 64)
  context.beginPath()
  context.arc(32, 32, 3, 0, Math.PI * 2)
  context.fillStyle = blue ? '#cae3ff' : '#ffffff'
  context.fill()
  return sprite
}

function createGalaxy(width: number, height: number, pixelRatio: number) {
  const texture = document.createElement('canvas')
  texture.width = Math.round(width * pixelRatio)
  texture.height = Math.round(height * pixelRatio)
  const context = texture.getContext('2d')!
  context.scale(pixelRatio, pixelRatio)

  // Concentrate the dust on the right, keeping the text area almost black.
  const bandCenter = (y: number) => width * (0.88 - 0.17 * y / height)
  for (let i = 0; i < 18; i++) {
    const y = height * i / 17
    const x = bandCenter(y) + Math.sin(i * 1.8) * width * 0.04
    const radius = Math.min(width, height) * (0.12 + Math.random() * 0.08)
    const haze = context.createRadialGradient(x, y, 0, x, y, radius)
    haze.addColorStop(0, 'rgba(63, 91, 131, 0.085)')
    haze.addColorStop(0.4, 'rgba(27, 47, 78, 0.05)')
    haze.addColorStop(1, 'rgba(9, 18, 34, 0)')
    context.fillStyle = haze
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  }

  const grainCount = Math.min(18000, Math.floor(width * height / 85))
  for (let i = 0; i < grainCount; i++) {
    const y = Math.random() * height
    const spread = gaussian()
    const x = bandCenter(y) + spread * width * 0.085
    const structure = 0.55 + 0.45 * Math.sin(y / height * 24 + Math.sin(x / width * 35) * 3)
    const density = Math.exp(-spread * spread * 0.5) * structure
    const radius = 0.25 + Math.random() * 0.65
    context.fillStyle = `rgba(146, 177, 215, ${(0.04 + Math.random() * 0.28) * density})`
    context.fillRect(x, y, radius, radius)
  }
  return texture
}

export default function BackgroundStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const skyRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const sky = skyRef.current
    const skyContext = sky?.getContext('2d')
    if (!canvas || !context || !sky || !skyContext) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const glows = [createGlow(false), createGlow(true)]
    let width = 0
    let height = 0
    let stars: Star[] = []
    let frameId: number | null = null
    let resizeTimer: number | undefined
    let lastTime: number | null = null
    let elapsed = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      // Keep the sharp distant sky cached; only the foreground canvas repaints.
      sky.width = Math.round(width * pixelRatio)
      sky.height = Math.round(height * pixelRatio)
      skyContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      skyContext.drawImage(createGalaxy(width, height, pixelRatio), 0, 0, width, height)
      const count = Math.min(1600, Math.floor(width * height / 850))
      for (let i = 0; i < count; i++) {
        const depth = Math.random()
        const x = Math.random() * width
        const y = Math.random() * height
        const radius = 0.5 + Math.pow(depth, 6) * 0.8
        const blue = Math.random() < 0.3
        skyContext.globalAlpha = (0.3 + Math.random() * 0.7) * (0.6 + x / width * 0.4)
        if (radius > 1.1) {
          const size = radius * 9
          skyContext.drawImage(glows[Number(blue)], x - size / 2, y - size / 2, size, size)
        }
        skyContext.fillStyle = blue ? '#a9ceff' : '#e0eaff'
        skyContext.beginPath()
        skyContext.arc(x, y, radius * 0.8, 0, Math.PI * 2)
        skyContext.fill()
      }
      skyContext.globalAlpha = 1

      const motionRatio = Math.min(pixelRatio, 1.5)
      canvas.width = Math.round(width * motionRatio)
      canvas.height = Math.round(height * motionRatio)
      context.setTransform(motionRatio, 0, 0, motionRatio, 0, 0)
      stars = Array.from({ length: Math.min(140, Math.floor(width * height / 10000)) }, () => {
        const depth = Math.random()
        const angle = Math.random() * Math.PI * 2
        const speed = 12 + depth * 20
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.8 + depth * 0.8,
          opacity: 0.45 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.4 + Math.random() * 0.7,
          blue: Math.random() < 0.3,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        }
      })
      draw(0)
    }

    const draw = (delta: number) => {
      elapsed += delta
      context.globalAlpha = 1
      context.clearRect(0, 0, width, height)

      for (const star of stars) {
        // Copy the old graph's independent directions and gentle edge bounces.
        star.x += delta * star.vx
        star.y += delta * star.vy
        if (star.x < 0 || star.x > width) {
          star.x = Math.max(0, Math.min(width, star.x))
          star.vx *= -1
        }
        if (star.y < 0 || star.y > height) {
          star.y = Math.max(0, Math.min(height, star.y))
          star.vy *= -1
        }

        const twinkle = 0.85 + Math.sin(elapsed * star.twinkleSpeed + star.phase) * 0.15
        const textFade = 0.6 + Math.min(1, Math.max(0, star.x / width)) * 0.4
        context.globalAlpha = star.opacity * twinkle * textFade
        const size = star.radius * 12
        context.drawImage(glows[Number(star.blue)], star.x - size / 2, star.y - size / 2, size, size)
      }
      context.globalAlpha = 1
    }

    const animate = (time: number) => {
      // Avoid doubling the drawing work on 120/144 Hz displays.
      if (lastTime === null || time - lastTime >= 1000 / 60 - 0.5) {
        const delta = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05)
        lastTime = time
        draw(delta)
      }
      frameId = requestAnimationFrame(animate)
    }

    const syncAnimation = () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      frameId = null
      lastTime = null
      if (!reducedMotion.matches && !document.hidden) {
        frameId = requestAnimationFrame(animate)
      } else {
        draw(0)
      }
    }

    resize()
    syncAnimation()
    const handleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 150)
    }
    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', syncAnimation)
    reducedMotion.addEventListener('change', syncAnimation)

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', syncAnimation)
      reducedMotion.removeEventListener('change', syncAnimation)
    }
  }, [])

  return (
    <div className="space-background" aria-hidden="true">
      <canvas ref={skyRef} className="space-background-sky" />
      <canvas ref={canvasRef} className="space-background-motion" />
    </div>
  )
}
