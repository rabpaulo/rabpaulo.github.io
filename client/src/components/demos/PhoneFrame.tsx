import type { ReactNode } from 'react'

export default function PhoneFrame({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`demo-phone ${className}`}>
      <div className="demo-phone-status" aria-hidden="true">
        <span>9:41</span>
        <span className="demo-phone-island" />
        <span>▥ ▰</span>
      </div>
      <div className="demo-phone-screen">{children}</div>
      <span className="demo-phone-home" aria-hidden="true" />
    </div>
  )
}
