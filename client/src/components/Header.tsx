import { useState, useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { portfolioContent } from '../data/portfolio'
import Icon from './Icons'

const navItems = [
  '#about',
  '#projects',
  '#skills',
  '#contact',
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(() => window.scrollY > 0)
  const { language, toggleLanguage } = useLanguage()
  const content = portfolioContent[language]

  useEffect(() => {
    let wasScrolled = window.scrollY > 0
    const handleScroll = () => {
      const next = window.scrollY > 0
      if (next === wasScrolled) return
      wasScrolled = next
      setHasScrolled(next)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="site-header" data-y={hasScrolled ? '1' : '0'}>
      <a className="brand" href="#top" aria-label={content.accessibility.backToTop}>
        PR<span>.</span>
      </a>
      <nav className={isOpen ? 'nav-links is-open' : 'nav-links'} aria-label={content.accessibility.mainNavigation}>
        {navItems.map((href, index) => (
          <a key={href} href={href} onClick={() => setIsOpen(false)}>{content.nav[index]}</a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="language-button" onClick={toggleLanguage} aria-label={content.accessibility.switchLanguage}>
          {language === 'pt' ? 'EN' : 'PT'}
        </button>
        <button className="icon-button menu-button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label={content.accessibility.toggleNavigation}>
          <Icon name={isOpen ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}
