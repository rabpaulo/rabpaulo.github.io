interface SectionHeadingProps {
  eyebrow: string
  title: string
  intro?: string
}

export default function SectionHeading({ eyebrow, title, intro }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </header>
  )
}
