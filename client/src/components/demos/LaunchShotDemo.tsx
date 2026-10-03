import { useState, type CSSProperties, type ChangeEvent } from 'react'
import { showcaseContent } from '../../data/showcase'
import { useLanguage } from '../../hooks/useLanguage'
import PhoneFrame from './PhoneFrame'

type Slide = {
  id: number
  headline: string
  supporting: string
  layout: 'center' | 'right' | 'left'
  dark: boolean
  screenshot?: string
}
const layouts: Slide['layout'][] = ['center', 'right', 'left']
const xml = (text: string) =>
  text.replace(
    /[<>&"']/g,
    (char) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[char]!,
  )

export default function LaunchShotDemo() {
  const { language } = useLanguage()
  const copy = showcaseContent[language]
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: 1,
      headline: copy.headlineDefault,
      supporting: copy.supportingDefault,
      layout: 'center',
      dark: false,
    },
  ])
  const [activeId, setActiveId] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [downloaded, setDownloaded] = useState(false)
  const [imageError, setImageError] = useState('')
  const slide = slides.find((slide) => slide.id === activeId) ?? slides[0]
  const activeIndex = slides.indexOf(slide)

  function update(change: Partial<Slide>) {
    setSlides((current) =>
      current.map((item) =>
        item.id === slide.id ? { ...item, ...change } : item,
      ),
    )
    setDownloaded(false)
  }
  function uploadScreenshot(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (
      !['image/png', 'image/jpeg', 'image/webp'].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      setImageError(copy.imageError)
      event.target.value = ''
      return
    }
    setImageError('')
    const reader = new FileReader()
    reader.onload = () => update({ screenshot: String(reader.result) })
    reader.onerror = () => setImageError(copy.imageError)
    reader.readAsDataURL(file)
  }
  function addSlide() {
    if (slides.length >= 3) return
    const id = Math.max(...slides.map((slide) => slide.id)) + 1
    setSlides((current) => [...current, { ...slide, id }])
    setActiveId(id)
    setDownloaded(false)
  }
  function removeSlide() {
    if (slides.length === 1) return
    setSlides((current) => current.filter((item) => item.id !== slide.id))
    setActiveId(slides.find((item) => item.id !== slide.id)!.id)
    setDownloaded(false)
  }
  function exportSlide() {
    const lines = slide.headline.match(/.{1,18}(?:\s|$)|\S.{0,17}/g) ?? []
    const foreground = slide.dark ? '#f5f5f0' : '#151515'
    const background = slide.dark ? '#181818' : '#f3f2ed'
    const angle =
      slide.layout === 'right' ? 12 : slide.layout === 'left' ? -12 : 0
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="660" height="1434" viewBox="0 0 660 1434"><rect width="660" height="1434" fill="${background}"/><g fill="${foreground}" text-anchor="middle" font-family="Arial,sans-serif">${lines.map((line, i) => `<text x="330" y="${145 + i * 62}" font-size="52" font-weight="700">${xml(line.trim())}</text>`).join('')}<text x="330" y="${170 + lines.length * 62}" font-size="21">${xml(slide.supporting)}</text></g><g transform="rotate(${angle} 330 910)"><rect x="145" y="535" width="370" height="770" rx="60" fill="#151515" stroke="#555" stroke-width="4"/><rect x="159" y="549" width="342" height="742" rx="48" fill="#f0efe9"/>${slide.screenshot ? `<defs><clipPath id="screen"><rect x="159" y="549" width="342" height="742" rx="48"/></clipPath></defs><image href="${xml(slide.screenshot)}" x="159" y="549" width="342" height="742" preserveAspectRatio="xMidYMid slice" clip-path="url(#screen)"/>` : ''}<rect x="270" y="560" width="120" height="26" rx="13" fill="#151515"/>${slide.screenshot ? '' : `<g fill="#151515" font-family="Arial,sans-serif"><text x="191" y="660" font-size="22">Simple Study</text><text x="191" y="720" font-size="36" font-weight="700">A little more focus.</text><rect x="191" y="766" width="277" height="112" rx="16" fill="#e1e4d6"/><text x="211" y="805" font-size="18">Daily progress</text><text x="211" y="851" font-size="32">2 / 3</text><text x="191" y="938" font-size="21">Review calculus notes</text><text x="191" y="1001" font-size="21">Read chapter 04</text><text x="191" y="1064" font-size="21">Practice TypeScript</text></g>`}</g></svg>`
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `launchshot-demo-${activeIndex + 1}.svg`
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setDownloaded(true)
  }

  return (
    <div className="launch-demo" aria-label={`LaunchShot — ${copy.studio}`}>
      <header className="launch-demo-header">
        <strong>
          LaunchShot <span>studio</span>
        </strong>
        <button type="button" onClick={exportSlide}>
          {copy.export}
          <span aria-hidden="true"> ↗</span>
        </button>
      </header>
      <div className="launch-demo-body">
        <aside className="launch-slides" aria-label={copy.designs}>
          <p className="demo-label">{copy.designs}</p>
          <div className="launch-thumbnails">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`${copy.slide} ${index + 1}`}
                aria-pressed={item.id === slide.id}
                onClick={() => {
                  setActiveId(item.id)
                  setDownloaded(false)
                }}
              >
                <span className={`launch-thumb ${item.dark ? 'is-dark' : ''}`}>
                  <span>{item.headline || copy.headline}</span>
                  <span className={`thumb-phone layout-${item.layout}`} />
                </span>
                <span className="thumb-number">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
          <button
            className="launch-add"
            type="button"
            onClick={addSlide}
            disabled={slides.length >= 3}
          >
            <span aria-hidden="true">+</span> {copy.add}
          </button>
        </aside>
        <div className="launch-canvas">
          <div className="launch-canvas-meta">
            <span>
              {copy.slide} {(activeIndex + 1).toString().padStart(2, '0')} /{' '}
              {slides.length.toString().padStart(2, '0')}
            </span>
            <span>App Store</span>
          </div>
          <div className="launch-artboard-area">
            <div
              className={`launch-artboard ${slide.dark ? 'is-dark' : ''} layout-${slide.layout}`}
              style={{ '--demo-zoom': zoom / 100 } as CSSProperties}
            >
              <div className="launch-message">
                <h4>{slide.headline || copy.headline}</h4>
                <p>{slide.supporting}</p>
              </div>
              <PhoneFrame className="launch-device">
                {slide.screenshot ? (
                  <img
                    className="launch-uploaded-image"
                    src={slide.screenshot}
                    alt={copy.demoScreen}
                  />
                ) : (
                  <div className="sample-study">
                    <span>Simple Study</span>
                    <h5>{copy.study.title}</h5>
                    <div className="sample-progress">
                      <small>{copy.study.progress}</small>
                      <strong>2 / 3</strong>
                      <span />
                    </div>
                    {copy.study.tasks.map((task, index) => (
                      <p key={task}>
                        <span>{index < 2 ? '✓' : '○'}</span>
                        {task}
                      </p>
                    ))}
                    <div className="sample-focus">
                      <span>{copy.study.minutes}</span>
                      <strong>45 min</strong>
                    </div>
                  </div>
                )}
              </PhoneFrame>
            </div>
          </div>
          <div className="launch-canvas-footer">
            <span aria-live="polite">
              {downloaded ? copy.exported : '660 × 1434'}
            </span>
            <div className="launch-zoom">
              <button
                type="button"
                aria-label={copy.zoomOut}
                disabled={zoom <= 80}
                onClick={() => setZoom((current) => current - 10)}
              >
                −
              </button>
              <span>{zoom}%</span>
              <button
                type="button"
                aria-label={copy.zoomIn}
                disabled={zoom >= 120}
                onClick={() => setZoom((current) => current + 10)}
              >
                +
              </button>
              <button type="button" onClick={() => setZoom(100)}>
                {copy.fit}
              </button>
            </div>
          </div>
        </div>
        <aside className="launch-inspector" aria-label={copy.inspector}>
          <p className="demo-label">{copy.inspector}</p>
          <label className="launch-upload">
            {copy.screenshot}
            <span>
              {copy.upload}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                aria-label={copy.upload}
                onChange={uploadScreenshot}
              />
            </span>
          </label>
          {imageError && (
            <p className="launch-image-error" role="alert">
              {imageError}
            </p>
          )}
          <label>
            {copy.headline}
            <textarea
              maxLength={60}
              rows={3}
              value={slide.headline}
              onChange={(event) => update({ headline: event.target.value })}
            />
          </label>
          <label>
            {copy.supporting}
            <textarea
              maxLength={70}
              rows={2}
              value={slide.supporting}
              onChange={(event) => update({ supporting: event.target.value })}
            />
          </label>
          <label>
            {copy.layout}
            <select
              value={slide.layout}
              onChange={(event) =>
                update({ layout: event.target.value as Slide['layout'] })
              }
            >
              {layouts.map((layout, index) => (
                <option key={layout} value={layout}>
                  {copy.layouts[index]}
                </option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend>{copy.style}</legend>
            <div className="launch-styles">
              {copy.styles.map((style, index) => (
                <button
                  key={style}
                  type="button"
                  aria-pressed={slide.dark === Boolean(index)}
                  onClick={() => update({ dark: Boolean(index) })}
                >
                  <span className={index === 1 ? 'style-dark' : 'style-light'}>
                    Aa
                  </span>
                  {style}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="launch-slide-actions">
            <button
              type="button"
              onClick={addSlide}
              disabled={slides.length >= 3}
            >
              {copy.duplicate}
            </button>
            <button
              type="button"
              onClick={removeSlide}
              disabled={slides.length === 1}
            >
              {copy.remove}
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
