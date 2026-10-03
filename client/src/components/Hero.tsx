import { contactLinks } from '../data/portfolio'
import { portfolioContent } from '../data/portfolio'
import { useLanguage } from '../hooks/useLanguage'
import Icon from './Icons'

export default function Hero() {
  const { language } = useLanguage()
  const content = portfolioContent[language].hero

  return (
    <section className="hero section-container" id="top">
      <div className="hero-copy">
        <p className="hero-role">{content.role}</p>
        <h1>Paulo<br />Rabelo<span>.</span></h1>
        <p className="hero-intro">{content.intro}</p>
        <div className="button-row">
          <a className="button button-primary" href="#projects">{content.projects} <Icon name="arrow" /></a>
          <a className="button button-secondary" href="#contact">{content.contact}</a>
        </div>
      </div>
      <aside className="hero-aside" aria-label={content.profile}>
        <div className="monogram" aria-hidden="true"><span>P</span><span>R</span></div>
        <p>{content.location}</p>
        <div className="social-links">
          <a href={contactLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
          <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
          <a href={contactLinks.email} aria-label="Email"><Icon name="mail" /></a>
        </div>
      </aside>
    </section>
  )
}
