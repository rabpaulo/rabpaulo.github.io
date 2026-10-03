import type { ReactNode } from 'react'
import '../../styles/native-previews.css'

export type NativeIconName =
  | 'home'
  | 'calendar'
  | 'settings'
  | 'training'
  | 'heart'
  | 'weight'
  | 'clock'
  | 'template'
  | 'chart'
  | 'plus'
  | 'back'
  | 'lock'
  | 'book'
  | 'tasks'
  | 'bars'
  | 'flame'
  | 'search'
  | 'share'
  | 'person'
  | 'volume'
  | 'chat'

export function NativeIcon({ name }: { name: NativeIconName }) {
  const paths = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v10H3Z" />
        <path d="M9 20v-7h6v7" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M7 3v4m10-4v4M3 10h18m-14 4h2m3 0h2m3 0h2m-12 4h2m3 0h2" />
      </>
    ),
    settings: (
      <>
        <path d="m10 3-1 3-3 1-3 3 2 2-1 3 3 3 3-1 2 2 3-1 1-3 3-1 2-3-2-2 1-3-3-3-3 1-2-1Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    training: (
      <>
        <path d="M7 12h10M3 8v8m4-10v12m10-12v12m4-10v8" />
      </>
    ),
    heart: (
      <path d="M12 21S2 14 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 6-10 13-10 13Z" />
    ),
    weight: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M6 8a8 8 0 0 1 12 0l-3 4a4 4 0 0 0-6 0Zm6-2v3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    template: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M5 3h14M4 5h16" />
      </>
    ),
    chart: (
      <>
        <path d="m3 18 5-8 5 5 8-11" />
        <circle cx="3" cy="18" r="1" />
        <circle cx="8" cy="10" r="1" />
        <circle cx="13" cy="15" r="1" />
      </>
    ),
    book: (
      <>
        <path d="M12 6C8 3 4 4 3 4v15c4-1 7 0 9 2 2-2 5-3 9-2V4c-4-1-7 0-9 2Z" />
        <path d="M12 6v15" />
      </>
    ),
    tasks: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="m7 12 3 3 7-7" />
      </>
    ),
    bars: <path d="M4 20V10m8 10V4m8 16v-8" />,
    flame: (
      <path d="M12 3c-4 4 2 6-1 10-2-1-3-3-3-3-5 8 0 12 4 12 9-1 9-12 0-19Z" />
    ),
    search: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 6 6" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="4" r="3" />
        <circle cx="5" cy="12" r="3" />
        <circle cx="18" cy="20" r="3" />
        <path d="m8 10 7-4m-7 8 7 4" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-3a8 8 0 0 1 16 0v3" />
      </>
    ),
    volume: (
      <>
        <path d="M4 9h4l5-5v16l-5-5H4Zm12-2a7 7 0 0 1 0 10m3-13a11 11 0 0 1 0 16" />
      </>
    ),
    chat: <path d="M3 4h18v14H8l-5 3Z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    back: <path d="m12 5-7 7 7 7M5 12h15" />,
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export function NativePhone({
  children,
  navigation,
  className,
  screenKey,
}: {
  children: ReactNode
  navigation: ReactNode
  className: string
  screenKey?: string | number
}) {
  return (
    <div className={`demo-phone native-phone ${className}`}>
      <div className="native-status" aria-hidden="true">
        <span>9:41</span>
        <i />
        <span>▥ ▰</span>
      </div>
      <div className="native-screen" key={screenKey}>
        {children}
      </div>
      {navigation}
      <div className="native-system-bar" aria-hidden="true">
        <span />
      </div>
    </div>
  )
}

export function PreviewContext({
  title,
  subtitle,
  tabs,
  selected,
  onSelect,
  note,
}: {
  title: string
  subtitle: string
  tabs: string[]
  selected: number
  onSelect: (index: number) => void
  note: string
}) {
  return (
    <div className="product-demo-context">
      <p className="demo-label">{subtitle}</p>
      <h4>{title}</h4>
      <div className="product-demo-controls">
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={tab}
            aria-pressed={selected === index}
            onClick={() => onSelect(index)}
          >
            {tab}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <p className="native-context-note">{note}</p>
    </div>
  )
}
