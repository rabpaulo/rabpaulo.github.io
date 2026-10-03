import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import {
  NativeIcon,
  NativePhone,
  PreviewContext,
  type NativeIconName,
} from './NativePreview'
import '../../styles/project-previews.css'

const content = {
  en: {
    title: 'Ready to study?',
    note: 'Create a task, complete your study session, and try the focus timer.',
    tabs: ['Home', 'Subjects', 'Tasks', 'Planner', 'Stats'],
    today: 'Today',
    sessions: 'sessions',
    exams: 'upcoming exams',
    complete: 'of the day completed',
    streak: 'Study Streak',
    allStats: 'View all stats',
    newTask: 'New task',
    newSession: 'New session',
    focus: 'Start Pomodoro',
    todayTasks: 'Today’s tasks',
    todaySessions: 'Today’s sessions',
    smallSteps: 'Small steps, real progress',
    search: 'Search tasks…',
    filters: ['All', 'Pending', 'Completed'],
    noResults: 'No tasks found',
    createHint: 'Create a task or adjust the filters.',
    subjectNames: ['Mathematics', 'Computer Science', 'Literature'],
    taskNames: [
      'Review calculus notes',
      'Practice TypeScript',
      'Read chapter 04',
    ],
    priority: ['Low', 'Medium', 'High'],
    type: 'Homework',
    due: 'Due date',
    name: 'Title',
    subject: 'Subject',
    save: 'Save',
    back: 'Back',
    taskComplete: 'Complete task',
    reopen: 'Reopen task',
    sessionComplete: 'Complete session',
    sessionDone: 'Session completed',
    exam: 'Next exam',
    examName: 'Mathematics II',
    sessionName: 'Practice exercises',
    minutes: 'Minutes studied',
    completedTasks: 'Completed tasks',
    pendingTasks: 'Pending tasks',
    completedSessions: 'Completed sessions',
    week: 'Your next seven days',
    emptyDay: 'Nothing planned',
    subjectTitle: 'Organize your knowledge',
    newSubject: 'New subject',
    subjectName: 'Subject name',
    subjectCreated: 'Subject created',
    duration: 'Duration (min)',
    planned: 'Planned',
    settings: 'Appearance',
    dark: 'Dark',
    light: 'Light',
    summary: 'Daily summary',
    focusTitle: 'Pomodoro',
    focusPeriod: 'Focus time',
    breakPeriod: 'Break time',
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    doneFocus: 'Focus session completed',
    taskSaved: 'Task created',
    sessionSaved: 'Session planned',
    high: 'Priority',
    subjectTasks: 'Tasks in this subject',
    sessionTitle: 'Study session',
  },
  pt: {
    title: 'Pronto para estudar?',
    note: 'Crie uma tarefa, conclua sua sessão de estudo e teste o timer de foco.',
    tabs: ['Início', 'Matérias', 'Tarefas', 'Planejar', 'Estatísticas'],
    today: 'Hoje',
    sessions: 'sessões',
    exams: 'próximas provas',
    complete: 'do dia concluído',
    streak: 'Sequência de estudos',
    allStats: 'Ver todas as estatísticas',
    newTask: 'Nova tarefa',
    newSession: 'Nova sessão',
    focus: 'Iniciar Pomodoro',
    todayTasks: 'Tarefas de hoje',
    todaySessions: 'Sessões de hoje',
    smallSteps: 'Pequenos passos, progresso real',
    search: 'Buscar tarefas…',
    filters: ['Todas', 'Pendentes', 'Concluídas'],
    noResults: 'Nenhuma tarefa encontrada',
    createHint: 'Crie uma tarefa ou ajuste os filtros.',
    subjectNames: ['Matemática', 'Computação', 'Literatura'],
    taskNames: [
      'Revisar notas de cálculo',
      'Praticar TypeScript',
      'Ler capítulo 04',
    ],
    priority: ['Baixa', 'Média', 'Alta'],
    type: 'Tarefa de casa',
    due: 'Prazo',
    name: 'Título',
    subject: 'Matéria',
    save: 'Salvar',
    back: 'Voltar',
    taskComplete: 'Concluir tarefa',
    reopen: 'Reabrir tarefa',
    sessionComplete: 'Concluir sessão',
    sessionDone: 'Sessão concluída',
    exam: 'Próxima prova',
    examName: 'Matemática II',
    sessionName: 'Resolver exercícios',
    minutes: 'Minutos estudados',
    completedTasks: 'Tarefas concluídas',
    pendingTasks: 'Tarefas pendentes',
    completedSessions: 'Sessões concluídas',
    week: 'Seus próximos sete dias',
    emptyDay: 'Nada planejado',
    subjectTitle: 'Organize seu conhecimento',
    newSubject: 'Nova matéria',
    subjectName: 'Nome da matéria',
    subjectCreated: 'Matéria criada',
    duration: 'Duração (min)',
    planned: 'Planejada',
    settings: 'Aparência',
    dark: 'Escuro',
    light: 'Claro',
    summary: 'Resumo diário',
    focusTitle: 'Pomodoro',
    focusPeriod: 'Tempo de foco',
    breakPeriod: 'Descanso',
    start: 'Iniciar',
    pause: 'Pausar',
    reset: 'Reiniciar',
    doneFocus: 'Sessão de foco concluída',
    taskSaved: 'Tarefa criada',
    sessionSaved: 'Sessão planejada',
    high: 'Prioridade',
    subjectTasks: 'Tarefas desta matéria',
    sessionTitle: 'Sessão de estudo',
  },
}
type Task = {
  id: number
  title: string
  subject: number
  done: boolean
  priority: number
  date: string
}
type Session = {
  id: number
  title: string
  subject: number
  done: boolean
  minutes: number
  date: string
}
const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export default function SimpleStudyDemo() {
  const { language } = useLanguage()
  const copy = content[language]
  const [today] = useState(() => new Date())
  const day = isoDate(today)
  const tomorrow = isoDate(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
  )
  const [view, setView] = useState(0)
  const [screen, setScreen] = useState<
    | 'home'
    | 'task'
    | 'session'
    | 'subject'
    | 'detail'
    | 'subjectDetail'
    | 'focus'
    | 'settings'
    | 'summary'
  >('home')
  const [subjects, setSubjects] = useState(copy.subjectNames)
  const [tasks, setTasks] = useState<Task[]>(() =>
    copy.taskNames.map((title, index) => ({
      id: index,
      title,
      subject: index,
      done: index === 0,
      priority: index === 1 ? 2 : 1,
      date: index === 2 ? tomorrow : day,
    })),
  )
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 0,
      title: copy.sessionName,
      subject: 0,
      done: false,
      minutes: 45,
      date: day,
    },
  ])
  const [selected, setSelected] = useState(0)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState(0)
  const [light, setLight] = useState(true)
  const [name, setName] = useState('')
  const [subject, setSubject] = useState(0)
  const [priority, setPriority] = useState(1)
  const [date, setDate] = useState(day)
  const [duration, setDuration] = useState('25')
  const [message, setMessage] = useState('')
  const [focusMinutes, setFocusMinutes] = useState(25)
  const [phase, setPhase] = useState<'focus' | 'break'>('focus')
  const [remaining, setRemaining] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const endsAt = useRef(0)
  const nextId = useRef(10)
  const icons: NativeIconName[] = ['home', 'book', 'tasks', 'calendar', 'bars']
  const chooseView = (index: number) => {
    setView(index)
    setScreen('home')
    setMessage('')
  }
  const openForm = (kind: 'task' | 'session' | 'subject') => {
    setName('')
    setSubject(0)
    setDate(day)
    setScreen(kind)
    setMessage('')
  }
  const toggleTask = (id: number) =>
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  const todayTasks = tasks.filter((task) => task.date === day)
  const todaySessions = sessions.filter((session) => session.date === day)
  const completedToday =
    todayTasks.filter((task) => task.done).length +
    todaySessions.filter((session) => session.done).length
  const progress = Math.round(
    (completedToday / Math.max(1, todayTasks.length + todaySessions.length)) *
      100,
  )
  const studiedMinutes = sessions
    .filter((session) => session.done)
    .reduce((sum, session) => sum + session.minutes, 0)
  const task = tasks.find((task) => task.id === selected)
  const match = (task: Task) =>
    task.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) &&
    (filter === 0 || task.done === (filter === 2))
  useEffect(() => {
    if (!running || screen !== 'focus') return
    const tick = () => {
      const value = Math.max(
        0,
        Math.ceil((endsAt.current - performance.now()) / 1000),
      )
      setRemaining(value)
      if (value === 0) {
        setRunning(false)
        setPhase(phase === 'focus' ? 'break' : 'focus')
        setRemaining(
          (phase === 'focus' ? (focusMinutes === 25 ? 5 : 10) : focusMinutes) *
            60,
        )
        if (phase === 'focus') {
          setMessage(copy.doneFocus)
          const id = nextId.current++
          setSessions((current) => [
            ...current,
            {
              id,
              title: copy.focusTitle,
              subject: 0,
              done: true,
              minutes: focusMinutes,
              date: day,
            },
          ])
        }
      }
    }
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [
    running,
    screen,
    phase,
    focusMinutes,
    day,
    copy.doneFocus,
    copy.focusTitle,
  ])
  const pauseFocus = () => {
    setRemaining(
      Math.max(0, Math.ceil((endsAt.current - performance.now()) / 1000)),
    )
    setRunning(false)
  }
  const taskCard = (item: Task) => (
    <div
      className={`ss-card ss-task ${item.done ? 'ss-done' : ''}`}
      key={item.id}
    >
      <button
        type="button"
        className="ss-task-body"
        onClick={() => {
          setSelected(item.id)
          setScreen('detail')
        }}
      >
        <small className="ss-badge">{copy.type}</small>
        <strong>{item.title}</strong>
        <span>
          {subjects[item.subject]} · {item.date.slice(5).replace('-', '/')}
        </span>
        <small className={`ss-priority ss-priority-${item.priority}`}>
          {copy.priority[item.priority]}
        </small>
      </button>
      <button
        type="button"
        className="ss-check"
        aria-label={`${item.done ? copy.reopen : copy.taskComplete}: ${item.title}`}
        aria-pressed={item.done}
        onClick={() => toggleTask(item.id)}
      >
        {item.done ? '✓' : '○'}
      </button>
    </div>
  )
  const sessionCard = (item: Session) => (
    <div className="ss-card ss-session" key={item.id}>
      <small className="ss-badge">
        {item.done ? copy.sessionDone : copy.planned}
      </small>
      <strong>{item.title}</strong>
      <p>
        {subjects[item.subject]} · {item.minutes} min
      </p>
      <button
        type="button"
        className="ss-soft"
        disabled={item.done}
        onClick={() =>
          setSessions((current) =>
            current.map((session) =>
              session.id === item.id ? { ...session, done: true } : session,
            ),
          )
        }
      >
        {item.done ? copy.sessionDone : copy.sessionComplete}
      </button>
    </div>
  )
  const metrics = (
    <div className="ss-stats-grid">
      {[
        [tasks.filter((task) => task.done).length, copy.completedTasks],
        [tasks.filter((task) => !task.done).length, copy.pendingTasks],
        [studiedMinutes, copy.minutes],
        [
          sessions.filter((session) => session.done).length,
          copy.completedSessions,
        ],
      ].map(([value, label]) => (
        <div className="ss-card" key={label}>
          <NativeIcon name="bars" />
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="product-demo native-demo simple-study-demo">
      <PreviewContext
        title={copy.title}
        subtitle={`Simple Study / ${language === 'pt' ? 'Conceito' : 'Concept'}`}
        tabs={[copy.tabs[0], copy.tabs[2], copy.tabs[3]]}
        selected={view === 0 ? 0 : view === 2 ? 1 : view === 3 ? 2 : -1}
        onSelect={(index) => chooseView([0, 2, 3][index])}
        note={copy.note}
      />
      <NativePhone
        className={`ss-phone ${light ? 'ss-light' : ''}`}
        screenKey={`${view}-${screen}-${selected}`}
        navigation={
          <nav className="ss-dock" aria-label="Simple Study">
            {copy.tabs.map((label, index) => (
              <button
                type="button"
                key={label}
                aria-pressed={view === index}
                onClick={() => chooseView(index)}
              >
                <NativeIcon name={icons[index]} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        }
      >
        {screen !== 'home' && (
          <button
            className="native-back"
            type="button"
            aria-label={copy.back}
            onClick={() => setScreen('home')}
          >
            <NativeIcon name="back" />
          </button>
        )}
        {screen === 'task' || screen === 'session' || screen === 'subject' ? (
          <form
            className="ss-form"
            onSubmit={(event) => {
              event.preventDefault()
              if (!name.trim()) return
              const id = nextId.current++
              if (screen === 'subject') {
                setSubjects((current) => [...current, name.trim()])
                setView(1)
                setMessage(copy.subjectCreated)
              } else if (screen === 'task') {
                setTasks((current) => [
                  ...current,
                  {
                    id,
                    title: name.trim(),
                    subject,
                    date,
                    priority,
                    done: false,
                  },
                ])
                setView(2)
                setQuery('')
                setFilter(0)
                setMessage(copy.taskSaved)
              } else {
                const minutes = Number(duration)
                if (!Number.isFinite(minutes) || minutes < 1 || minutes > 240)
                  return
                setSessions((current) => [
                  ...current,
                  {
                    id,
                    title: name.trim(),
                    subject,
                    date,
                    minutes,
                    done: false,
                  },
                ])
                setView(0)
                setMessage(copy.sessionSaved)
              }
              setScreen('home')
            }}
          >
            <h5>
              {screen === 'task'
                ? copy.newTask
                : screen === 'session'
                  ? copy.newSession
                  : copy.newSubject}
            </h5>
            <label>
              {screen === 'subject' ? copy.subjectName : copy.name}
              <input
                required
                maxLength={60}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            {screen !== 'subject' && (
              <>
                <label>
                  {copy.subject}
                  <select
                    value={subject}
                    onChange={(event) => setSubject(Number(event.target.value))}
                  >
                    {subjects.map((subject, index) => (
                      <option key={index} value={index}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {copy.due}
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </label>
                {screen === 'task' ? (
                  <label>
                    {copy.high}
                    <select
                      value={priority}
                      onChange={(event) =>
                        setPriority(Number(event.target.value))
                      }
                    >
                      {copy.priority.map((priority, index) => (
                        <option key={priority} value={index}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <label>
                    {copy.duration}
                    <input
                      type="number"
                      min="1"
                      max="240"
                      required
                      value={duration}
                      onChange={(event) => setDuration(event.target.value)}
                    />
                  </label>
                )}
              </>
            )}
            <button type="submit" className="native-primary">
              {copy.save}
            </button>
          </form>
        ) : screen === 'detail' && task ? (
          <>
            <h5>{task.title}</h5>
            <div className="ss-card ss-task-detail">
              <span className="ss-badge">{copy.type}</span>
              <p>
                {copy.subject}: {subjects[task.subject]}
              </p>
              <p>
                {copy.due}: {task.date}
              </p>
              <p>
                {copy.high}: {copy.priority[task.priority]}
              </p>
              <button
                type="button"
                className="native-primary"
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? copy.reopen : copy.taskComplete}
              </button>
            </div>
          </>
        ) : screen === 'subjectDetail' ? (
          <>
            <h5>{subjects[selected]}</h5>
            <p className="native-subtitle">{copy.subjectTasks}</p>
            {tasks.filter((task) => task.subject === selected).map(taskCard)}
            {sessions
              .filter((session) => session.subject === selected)
              .map(sessionCard)}
          </>
        ) : screen === 'focus' ? (
          <>
            <h5>{copy.focusTitle}</h5>
            <div className="ss-presets">
              {[25, 50].map((minutes) => (
                <button
                  type="button"
                  key={minutes}
                  aria-pressed={focusMinutes === minutes}
                  disabled={running}
                  onClick={() => {
                    setFocusMinutes(minutes)
                    setPhase('focus')
                    setRemaining(minutes * 60)
                  }}
                >
                  {minutes}/{minutes === 25 ? 5 : 10}
                </button>
              ))}
            </div>
            <div className="ss-focus">
              <NativeIcon name="clock" />
              <small>
                {phase === 'focus' ? copy.focusPeriod : copy.breakPeriod}
              </small>
              <strong role="timer">
                {Math.floor(remaining / 60)
                  .toString()
                  .padStart(2, '0')}
                :{(remaining % 60).toString().padStart(2, '0')}
              </strong>
              <button
                type="button"
                className="native-primary"
                disabled={!remaining}
                onClick={() => {
                  if (running) pauseFocus()
                  else {
                    endsAt.current = performance.now() + remaining * 1000
                    setRunning(true)
                  }
                }}
              >
                {running ? copy.pause : copy.start}
              </button>
              <button
                type="button"
                className="ss-soft"
                onClick={() => {
                  setRunning(false)
                  setPhase('focus')
                  setRemaining(focusMinutes * 60)
                }}
              >
                {copy.reset}
              </button>
            </div>
          </>
        ) : screen === 'settings' ? (
          <>
            <h5>{copy.settings}</h5>
            <div className="ss-card ss-presets">
              {[copy.dark, copy.light].map((label, index) => (
                <button
                  type="button"
                  key={label}
                  aria-pressed={light === !!index}
                  onClick={() => setLight(!!index)}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        ) : screen === 'summary' ? (
          <>
            <h5>{copy.summary}</h5>
            {metrics}
          </>
        ) : view === 0 ? (
          <>
            <div className="ss-header">
              <h5>{copy.title}</h5>
              <button
                type="button"
                aria-label={copy.summary}
                onClick={() => setScreen('summary')}
              >
                <NativeIcon name="share" />
              </button>
              <button
                type="button"
                aria-label={copy.settings}
                onClick={() => setScreen('settings')}
              >
                <NativeIcon name="settings" />
              </button>
            </div>
            <div className="ss-today">
              <h5>{copy.today}</h5>
              <div>
                {[
                  [
                    todayTasks.filter((task) => !task.done).length,
                    copy.tabs[2].toLowerCase(),
                  ],
                  [
                    todaySessions.filter((session) => !session.done).length,
                    copy.sessions,
                  ],
                  [1, copy.exams],
                ].map(([value, label]) => (
                  <span key={label}>
                    <strong>{value}</strong>
                    <small>{label}</small>
                  </span>
                ))}
              </div>
              <progress aria-label={copy.complete} value={progress} max={100} />
              <small>
                {progress}% {copy.complete}
              </small>
            </div>
            <div className="ss-home-tools">
              <div className="ss-streak">
                <NativeIcon name="flame" />
                <strong>{completedToday ? 1 : 0}</strong>
                <small>{copy.streak}</small>
              </div>
              <button
                type="button"
                className="ss-soft"
                onClick={() => chooseView(4)}
              >
                <NativeIcon name="bars" />
                {copy.allStats}
              </button>
            </div>
            <div className="ss-quick">
              <button
                type="button"
                className="native-primary"
                onClick={() => openForm('task')}
              >
                + {copy.newTask}
              </button>
              <button
                type="button"
                className="ss-soft"
                onClick={() => openForm('session')}
              >
                {copy.newSession}
              </button>
            </div>
            <button
              type="button"
              className="ss-soft"
              onClick={() => setScreen('focus')}
            >
              <NativeIcon name="clock" />
              {copy.focus}
            </button>
            <h6>{copy.todayTasks}</h6>
            {todayTasks.map(taskCard)}
            <h6>{copy.todaySessions}</h6>
            {todaySessions.map(sessionCard)}
          </>
        ) : view === 1 ? (
          <>
            <div className="ss-header">
              <h5>{copy.tabs[1]}</h5>
              <button
                type="button"
                aria-label={copy.newSubject}
                onClick={() => openForm('subject')}
              >
                <NativeIcon name="plus" />
              </button>
            </div>
            <p className="native-subtitle">{copy.subjectTitle}</p>
            {subjects.map((subject, index) => (
              <button
                type="button"
                key={index}
                className={`ss-card ss-subject ss-subject-${index % 3}`}
                onClick={() => {
                  setSelected(index)
                  setScreen('subjectDetail')
                }}
              >
                <NativeIcon name="book" />
                <strong>{subject}</strong>
                <small>
                  {
                    tasks.filter((task) => task.subject === index && !task.done)
                      .length
                  }{' '}
                  {copy.pendingTasks.toLowerCase()}
                </small>
                <span aria-hidden="true">›</span>
              </button>
            ))}
          </>
        ) : view === 2 ? (
          <>
            <div className="ss-header">
              <h5>{copy.tabs[2]}</h5>
              <button
                type="button"
                aria-label={copy.newTask}
                onClick={() => openForm('task')}
              >
                <NativeIcon name="plus" />
              </button>
            </div>
            <p className="native-subtitle">{copy.smallSteps}</p>
            <input
              className="ss-search"
              aria-label={copy.search}
              placeholder={copy.search}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="ss-filters">
              {copy.filters.map((label, index) => (
                <button
                  type="button"
                  key={label}
                  aria-pressed={filter === index}
                  onClick={() => setFilter(index)}
                >
                  {label}
                </button>
              ))}
            </div>
            {tasks.filter(match).length ? (
              tasks.filter(match).map(taskCard)
            ) : (
              <div className="ss-card ss-empty">
                <NativeIcon name="search" />
                <strong>{copy.noResults}</strong>
                <p>{copy.createHint}</p>
                <button
                  type="button"
                  className="native-primary"
                  onClick={() => openForm('task')}
                >
                  {copy.newTask}
                </button>
              </div>
            )}
          </>
        ) : view === 3 ? (
          <>
            <h5>{copy.tabs[3]}</h5>
            <p className="native-subtitle">{copy.week}</p>
            {Array.from({ length: 7 }, (_, index) => {
              const date = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + index,
              )
              const key = isoDate(date)
              const items = tasks.filter((task) => task.date === key)
              const planned = sessions.filter((session) => session.date === key)
              return (
                <div className="ss-plan-day" key={key}>
                  <h6>
                    {index === 0
                      ? copy.today
                      : date.toLocaleDateString(
                          language === 'pt' ? 'pt-BR' : 'en-US',
                          { weekday: 'short', day: 'numeric', month: 'short' },
                        )}
                  </h6>
                  {items.map(taskCard)}
                  {planned.map(sessionCard)}
                  {!items.length && !planned.length && <p>{copy.emptyDay}</p>}
                </div>
              )
            })}
          </>
        ) : (
          <>
            <h5>{copy.tabs[4]}</h5>
            <p className="native-subtitle">{copy.smallSteps}</p>
            {metrics}
            <div className="ss-card ss-session">
              <small>{copy.exam}</small>
              <strong>{copy.examName}</strong>
              <p>
                {subjects[0]} · {tomorrow}
              </p>
            </div>
          </>
        )}
        <span role="status" className="native-announcement">
          {message}
        </span>
      </NativePhone>
    </div>
  )
}
