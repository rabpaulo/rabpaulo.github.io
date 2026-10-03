import { motion, useReducedMotion } from 'motion/react'
import { revealTransition, revealViewport } from '../animations/reveal'
import { portfolioContent } from '../data/portfolio'
import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './SectionHeading'

export default function Skills() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const content = portfolioContent[language].skills

  return (
    <section className="content-section section-container skills-section" id="skills">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={shouldReduceMotion ? { duration: 0 } : revealTransition}
      >
        <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
      </motion.div>
      <div className="skills-groups">
        {content.groups.map((group) => (
          <motion.article
            className="skill-group"
            key={group.title}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={revealViewport}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: shouldReduceMotion
                  ? { duration: 0 }
                  : { ...revealTransition, delayChildren: 0.12, staggerChildren: 0.06 },
              },
            }}
          >
            <header className="skill-group-heading">
              <span className="skill-group-dot" aria-hidden="true" />
              <h3>{group.title}</h3>
              <p>{group.descriptor}</p>
            </header>
            <ul>
              {group.skills.map((skill) => (
                <motion.li
                  key={skill}
                  variants={{
                    hidden: { opacity: 0, filter: 'blur(8px)' },
                    visible: {
                      opacity: 1,
                      filter: 'blur(0px)',
                      transition: shouldReduceMotion ? { duration: 0 } : { ...revealTransition, duration: 0.4 },
                    },
                  }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
      <motion.aside
        className="skills-practices"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={shouldReduceMotion ? { duration: 0 } : revealTransition}
      >
        <p className="skills-practices-label">{content.practicesHeading}</p>
        <p className="skills-practices-copy">{content.practices}</p>
      </motion.aside>
    </section>
  )
}
