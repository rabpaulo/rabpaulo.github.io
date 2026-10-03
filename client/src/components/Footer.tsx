import { portfolioContent } from '../data/portfolio'
import { useLanguage } from '../hooks/useLanguage'

export default function Footer() {
  const { language } = useLanguage()
  const content = portfolioContent[language].footer

  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Paulo Rabelo</p>
      <p>{content.built}</p>
      <a href="#top">{content.top}</a>
    </footer>
  )
}
