import type { Language } from '../contexts/language'

export const contactLinks = {
  email: 'mailto:rabpaulodev@gmail.com',
  github: 'https://github.com/rabpaulo',
  linkedin: 'https://linkedin.com/in/rabpaulo',
}

const sharedProjects: Array<{
  id: 'simple-study' | 'museu-unifor' | 'liftbook' | 'launchshot' | 'dayle'
  section: 'selected' | 'prLabs'
  stack: string[]
  github?: string
  live?: string
}> = [
  {
    id: 'simple-study',
    section: 'selected',
    stack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'AsyncStorage'],
    github: 'https://github.com/rabpaulo/Simple-Study',
  },
  {
    id: 'museu-unifor',
    section: 'selected',
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    github: 'https://github.com/rabpaulo/Museu-Unifor',
  },
  {
    id: 'liftbook',
    section: 'prLabs',
    stack: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
    live: 'https://rabpaulo.github.io/Liftbook-site/#home',
  },
  {
    id: 'launchshot',
    section: 'selected',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/rabpaulo/LaunchShot',
    live: 'https://launch-shot.vercel.app/',
  },
  {
    id: 'dayle',
    section: 'prLabs',
    stack: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage', 'Jetpack Glance'],
  },
]

const skillStacks = {
  expert: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Node.js', 'PostgreSQL', 'Zustand', 'Tailwind CSS', 'REST APIs', 'CI/CD', 'Git'],
  production: ['React Native', 'GraphQL', 'Python', 'Stripe', 'Three.js', 'Jest', 'AWS (Amplify, S3, Lambda)', 'Supabase', 'Docker'],
  exploring: ['Go', 'Kubernetes', 'System Design', 'Event-Driven Architecture'],
}

export const portfolioContent = {
  en: {
    nav: ['About', 'Work', 'Skills', 'Contact'],
    accessibility: {
      backToTop: 'Paulo Rabelo, back to top',
      mainNavigation: 'Main navigation',
      switchLanguage: 'Mudar idioma para português',
      toggleNavigation: 'Toggle navigation',
    },
    hero: {
      role: 'Full Stack and AI Engineer',
      intro: 'I build end-to-end applications and AI-powered solutions using TypeScript, React, Node.js, and Python.',
      projects: 'View projects',
      contact: 'Contact me',
      location: 'Based in Fortaleza, CE',
      profile: 'Profile summary',
    },
    about: {
      eyebrow: '01 / About',
      title: 'I build for web and mobile.',
      paragraphs: [
        'I’m Paulo, a full stack developer from Fortaleza, Brazil. I work with React, Next.js, Node.js, and Python, and build apps with React Native and Kotlin. My experience includes APIs, databases, and AI integrations.',
        'At PR Labs, I build my own products, including LiftBook and Dayle. I like working on the whole project: the interface, the code, and the launch.',
      ],
    },
    projectsSection: {
      eyebrow: '03 / Selected work',
      title: 'Projects built around real, practical needs.',
      intro: 'Personal and academic projects across web, mobile, and Android.',
      mobile: 'Mobile application',
      web: 'Web experience',
      morning: 'Good morning',
      ready: 'Ready to study?',
      source: 'View source',
      live: 'Live site',
      projects: [
        {
          title: 'Simple Study',
          subtitle: 'Study Planner Mobile App',
          description: 'A local-first mobile study planner that helps students organize subjects, tasks, exams, and study sessions through a focused, responsive interface.',
          features: ['Tasks, exams, seven-day planning and progress statistics', 'Pomodoro timer, local reminders and Android widget', 'Private on-device storage with optional cloud backup'],
        },
        {
          title: 'Museu Unifor',
          subtitle: 'Native Android app',
          description: 'An Android guide to the Espaço Cultural Unifor, combining artists and artworks with audio description, Libras and a contextual cultural assistant.',
          features: ['Artist biographies and searchable artwork catalog', 'Audio description, VLibras and Gemini cultural assistant', 'Firebase authentication and collection management'],
        },
        {
          title: 'LiftBook',
          subtitle: 'Offline Strength, Cardio & Bodyweight Journal',
          description: 'A private, offline-first mobile journal for tracking strength training with progressive overload & RIR, cardio foreground stopwatch sessions, and 7-day rolling bodyweight trends.',
          features: [
            'Strength training with weights, reps, RIR & auto 1RM calculation',
            'Battery-efficient cardio stopwatch with crash-proof foreground timer',
            'Bodyweight trend analytics with 7-day rolling averages & goal phases',
            '100% local SQLite storage with zero accounts, ads, or analytics',
          ],
        },
        {
          title: 'LaunchShot',
          subtitle: 'App Store Screenshot Generator',
          description: 'A web-based studio to create beautiful, high-converting App Store and Google Play screenshots in seconds.',
          features: [
            'Generate beautiful mockups for mobile apps',
            'Customizable backgrounds and device frames',
            'Export to App Store and Google Play sizes'
          ],
        },
        {
          title: 'Dayle',
          subtitle: 'Year Progress, Countdowns & Goals',
          description: 'An offline-first Android app that puts time in perspective: visualize your year, count down to meaningful dates, and follow time-bound goals with native reminders and home screen widgets.',
          features: [
            'Year progress visualized as a 365/366-day dot grid',
            'Recurring countdowns and time-bound goals with completion history',
            'Offline reminders and configurable Android widgets with Jetpack Glance',
            'Private on-device storage, ten color palettes and lifetime premium',
          ],
        },
      ],
    },
    prLabs: {
      eyebrow: '02 / Indie company',
      title: 'PR Labs',
      intro: 'My indie software company, where I build and launch useful digital products.',
    },
    skills: {
      eyebrow: '03 / Skills',
      title: 'Tech Stack',
      intro: 'Full stack development and AI engineering skills built through practical projects.',
      groups: [
        { title: 'Expert', descriptor: 'Daily drivers', skills: skillStacks.expert },
        { title: 'Production Experience', descriptor: 'Shipped to production', skills: skillStacks.production },
        { title: 'Exploring', descriptor: 'Building expertise', skills: skillStacks.exploring },
      ],
      practicesHeading: 'Practices and methodologies',
      practices: 'SOLID principles, Test-Driven Development, Agile (Scrum/Kanban), Code Review, Performance Optimization, Accessibility (WCAG), CI/CD Pipelines, Technical Documentation',
    },
    contact: {
      eyebrow: '04 / Contact',
      title: ['Let’s build something', 'useful together'],
      body: 'I am open to full stack development and AI engineering opportunities.',
      button: 'Send me an email',
    },
    footer: {
      built: 'Designed and built with React & TypeScript',
      top: 'Back to top ↑',
    },
  },
  pt: {
    nav: ['Sobre', 'Trabalhos', 'Habilidades', 'Contato'],
    accessibility: {
      backToTop: 'Paulo Rabelo, voltar ao início',
      mainNavigation: 'Navegação principal',
      switchLanguage: 'Change language to English',
      toggleNavigation: 'Abrir ou fechar navegação',
    },
    hero: {
      role: 'Full Stack and AI Engineer',
      intro: 'Desenvolvo aplicações completas e soluções com IA usando TypeScript, React, Node.js e Python.',
      projects: 'Ver projetos',
      contact: 'Entre em contato',
      location: 'Fortaleza, CE',
      profile: 'Resumo do perfil',
    },
    about: {
      eyebrow: '01 / Sobre',
      title: 'Desenvolvo para web e mobile.',
      paragraphs: [
        'Sou Paulo, desenvolvedor full stack de Fortaleza. Trabalho com React, Next.js, Node.js e Python, e também crio apps com React Native e Kotlin. Minha experiência inclui APIs, bancos de dados e integrações com IA.',
        'Na PR Labs, desenvolvo meus próprios produtos, como LiftBook e Dayle. Gosto de cuidar do projeto inteiro: interface, código e lançamento.',
      ],
    },
    projectsSection: {
      eyebrow: '03 / Projetos selecionados',
      title: 'Projetos construídos para necessidades reais e práticas.',
      intro: 'Projetos pessoais e acadêmicos para web, mobile e Android.',
      mobile: 'Aplicação mobile',
      web: 'Experiência web',
      morning: 'Bom dia',
      ready: 'Pronto para estudar?',
      source: 'Ver código',
      live: 'Ver site',
      projects: [
        {
          title: 'Simple Study',
          subtitle: 'Aplicativo de planejamento de estudos',
          description: 'Um planejador de estudos mobile e local-first que ajuda estudantes a organizar matérias, tarefas, provas e sessões de estudo em uma interface responsiva e focada.',
          features: ['Tarefas, provas, planejamento semanal e estatísticas', 'Pomodoro, lembretes locais e widget Android', 'Armazenamento local privado com backup na nuvem opcional'],
        },
        {
          title: 'Museu Unifor',
          subtitle: 'Aplicativo Android nativo',
          description: 'Guia Android do Espaço Cultural Unifor que reúne artistas e obras com audiodescrição, Libras e um assistente cultural contextual.',
          features: ['Biografias e catálogo de obras com busca', 'Audiodescrição, VLibras e assistente cultural com Gemini', 'Autenticação e gestão do acervo com Firebase'],
        },
        {
          title: 'LiftBook',
          subtitle: 'Diário Offline de Musculação, Cardio e Peso',
          description: 'Um diário mobile privado e offline-first para registrar musculação com sobrecarga progressiva e RIR, cronômetro de cardio em primeiro plano e médias móveis de peso.',
          features: [
            'Registro de musculação com cargas, repetições, RIR e estimativa automática de 1RM',
            'Cronômetro de cardio em primeiro plano protegido contra falhas e histórico semanal',
            'Acompanhamento de peso com médias móveis de 7 dias e metas de fase (cutting/bulking)',
            'Armazenamento 100% local em SQLite sem necessidade de conta, anúncios ou rastreamento',
          ],
        },
        {
          title: 'LaunchShot',
          subtitle: 'Gerador de Screenshots para Lojas de Apps',
          description: 'Um estúdio web para criar screenshots bonitas e de alta conversão para App Store e Google Play em segundos.',
          features: [
            'Gere mockups bonitos para aplicativos móveis',
            'Fundos e molduras de dispositivos customizáveis',
            'Exporte para tamanhos da App Store e Google Play'
          ],
        },
        {
          title: 'Dayle',
          subtitle: 'Progresso do Ano, Contagens Regressivas e Metas',
          description: 'Um app Android offline-first para enxergar o tempo com perspectiva: visualize seu ano, acompanhe datas importantes e metas com prazo, com lembretes nativos e widgets na tela inicial.',
          features: [
            'Progresso do ano em uma grade de 365/366 pontos',
            'Contagens recorrentes e metas com prazo e histórico de conclusão',
            'Lembretes offline e widgets Android configuráveis com Jetpack Glance',
            'Dados privados no aparelho, dez paletas e premium vitalício',
          ],
        },
      ],
    },
    prLabs: {
      eyebrow: '02 / Empresa indie',
      title: 'PR Labs',
      intro: 'Minha empresa independente de software, onde desenvolvo e lanço produtos digitais úteis.',
    },
    skills: {
      eyebrow: '03 / Habilidades',
      title: 'Tech Stack',
      intro: 'Habilidades de desenvolvimento full stack e engenharia de IA desenvolvidas em projetos práticos.',
      groups: [
        { title: 'Especialista', descriptor: 'Ferramentas do dia a dia', skills: skillStacks.expert },
        { title: 'Experiência em produção', descriptor: 'Entregue em produção', skills: skillStacks.production },
        { title: 'Explorando', descriptor: 'Construindo experiência', skills: skillStacks.exploring },
      ],
      practicesHeading: 'Práticas e metodologias',
      practices: 'Princípios SOLID, Desenvolvimento Orientado a Testes, Ágil (Scrum/Kanban), Revisão de código, Otimização de performance, Acessibilidade (WCAG), Pipelines de CI/CD, Documentação técnica',
    },
    contact: {
      eyebrow: '04 / Contato',
      title: ['Vamos construir algo', 'útil juntos'],
      body: 'Estou disponível para oportunidades em desenvolvimento full stack e engenharia de IA.',
      button: 'Enviar um email',
    },
    footer: {
      built: 'Projetado e desenvolvido com React e TypeScript',
      top: 'Voltar ao início ↑',
    },
  },
}

export function getProjects(language: Language) {
  return portfolioContent[language].projectsSection.projects.map((project, index) => ({
    ...sharedProjects[index],
    ...project,
  }))
}

export type PortfolioProject = ReturnType<typeof getProjects>[number]
