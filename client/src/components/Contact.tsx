import { contactLinks, portfolioContent } from '../data/portfolio'
import { useLanguage } from '../hooks/useLanguage'
import Icon from './Icons'

export default function Contact() {
  const { language } = useLanguage()
  const content = portfolioContent[language].contact

  return (
    <section className="contact-section" id="contact">
      <div className="section-container contact-inner">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title[0]}<br />{content.title[1]}<span>.</span></h2>
        <p>{content.body}</p>
        <a className="button" href={contactLinks.email}>{content.button} <Icon name="arrow" /></a>
        <div className="contact-links">
          <a href={contactLinks.github} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a>
          <a href={contactLinks.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a>
          <a href={contactLinks.email}><Icon name="mail" /> Email</a>
        </div>
      </div>
    </section>
  )
}
