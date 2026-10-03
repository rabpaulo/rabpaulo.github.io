import '../styles/showcase.css'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import {
  getProjects,
  portfolioContent,
  type PortfolioProject,
} from '../data/portfolio'
import { showcaseContent } from '../data/showcase'
import { useLanguage } from '../hooks/useLanguage'
import Icon from './Icons'
import SectionHeading from './SectionHeading'
import LaunchShotDemo from './demos/LaunchShotDemo'
import DayleDemo from './demos/DayleDemo'
import LiftBookDemo from './demos/LiftBookDemo'
import SimpleStudyDemo from './demos/SimpleStudyDemo'
import MuseumDemo from './demos/MuseumDemo'

type Category = PortfolioProject['section']
const categories: Category[] = ['prLabs', 'selected']
const defaultProject = (category: Category) =>
  category === 'prLabs' ? 'liftbook' : 'launchshot'

export default function Projects() {
  const { language } = useLanguage()
  const copy = showcaseContent[language]
  const labels = portfolioContent[language].projectsSection
  const [selection, setSelection] = useState(() => {
    const category: Category =
      window.location.hash === '#pr-labs' ? 'prLabs' : 'selected'
    return { category, id: defaultProject(category) }
  })
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const projects = getProjects(language).filter(
    (project) => project.section === selection.category,
  )
  const project =
    projects.find((project) => project.id === selection.id) ?? projects[0]
  const categoryIndex = categories.indexOf(selection.category)

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash
      if (hash !== '#projects' && hash !== '#pr-labs') return
      const category = hash === '#pr-labs' ? 'prLabs' : 'selected'
      setSelection((current) =>
        current.category === category
          ? current
          : { category, id: defaultProject(category) },
      )
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function chooseCategory(index: number) {
    const category = categories[index]
    setSelection({ category, id: defaultProject(category) })
    window.history.replaceState(
      null,
      '',
      category === 'prLabs' ? '#pr-labs' : '#projects',
    )
  }

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft')
      next = 1 - index
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = 1
    else return
    event.preventDefault()
    chooseCategory(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="content-section showcase-section" id="projects">
      <span className="showcase-anchor" id="pr-labs" aria-hidden="true" />
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <div className="workbench">
        <div className="workbench-bar">
          <div
            className="workbench-tabs"
            role="tablist"
            aria-label={copy.categoryLabel}
          >
            {categories.map((category, index) => (
              <button
                key={category}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`work-tab-${category}`}
                aria-selected={selection.category === category}
                aria-controls="work-panel"
                tabIndex={selection.category === category ? 0 : -1}
                onClick={() => chooseCategory(index)}
                onKeyDown={(event) => handleTabKey(event, index)}
              >
                {copy.categories[index]}{' '}
                <span>
                  {getProjects(language)
                    .filter((project) => project.section === category)
                    .length.toString()
                    .padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
          <span className="workbench-status">
            <span aria-hidden="true" />
            {copy.demo}
          </span>
        </div>
        <div
          className="workbench-content"
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`work-tab-${categories[categoryIndex]}`}
        >
          <aside className="workbench-sidebar">
            <nav className="workbench-projects" aria-label={copy.projectLabel}>
              {projects.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  aria-pressed={item.id === project.id}
                  onClick={() =>
                    setSelection({ category: selection.category, id: item.id })
                  }
                >
                  <span>{(index + 1).toString().padStart(2, '0')}</span>
                  {item.title}
                  <Icon name="arrow" />
                </button>
              ))}
            </nav>
            <div className="workbench-description">
              <p className="project-subtitle">{project.subtitle}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <ul className="feature-list">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="tag-list">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
            <div className="workbench-links">
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer">
                  {labels.live}
                  <Icon name="arrow" />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Icon name="github" />
                  {labels.source}
                </a>
              )}
            </div>
          </aside>
          <div className="workbench-preview">
            <div className="preview-caption">
              <span>{project.title}</span>
              <span>
                {copy.tryIt}
                <span aria-hidden="true"> ↘</span>
              </span>
            </div>
            {project.id === 'launchshot' ? (
              <LaunchShotDemo key={language} />
            ) : project.id === 'dayle' ? (
              <DayleDemo key={language} />
            ) : project.id === 'liftbook' ? (
              <LiftBookDemo key={language} />
            ) : project.id === 'simple-study' ? (
              <SimpleStudyDemo key={language} />
            ) : (
              <MuseumDemo key={language} />
            )}
            <p className="preview-note">{copy.demoNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
