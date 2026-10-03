import SectionHeading from './SectionHeading'
import { portfolioContent } from '../data/portfolio'
import { useLanguage } from '../hooks/useLanguage'

export default function About() {
  const { language } = useLanguage()
  const content = portfolioContent[language].about

  return (
    <section className="content-section section-container" id="about">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} />
      <div className="about-copy">
        {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  )
}
