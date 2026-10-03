import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import {
  NativeIcon,
  NativePhone,
  PreviewContext,
  type NativeIconName,
} from './NativePreview'

const text = {
  en: {
    title: 'Your training, on your terms.',
    note: 'Start a sample workout, try the cardio timer, or log a weight.',
    tabs: ['Training', 'Cardio', 'Bodyweight', 'Settings'],
    start: 'START WORKOUT',
    template: 'Start from template',
    empty: 'Start empty workout',
    manage: 'MANAGE',
    library: 'Exercise library',
    history: 'Training history',
    insights: 'Training insights',
    planning: 'Workout planning',
    today: 'TODAY’S WORKOUT',
    noTraining: 'No training logged today',
    hint: 'Start a workout to see it here.',
    week: 'This week',
    weekly: 'WEEKLY SUMMARY',
    sessions: 'sessions',
    minutes: 'Minutes',
    distance: 'distance',
    cardioStart: 'Start cardio',
    goal: 'WEEKLY GOAL',
    noGoal: 'No active goal',
    goalHint:
      'Set a minutes, sessions, or distance target to track your progress.',
    average: 'Weekly average',
    days: 'Days logged',
    phase: 'CURRENT PHASE',
    noPhase: 'No active phase',
    weightLog: 'Log today’s weight',
    save: 'Save',
    saved: 'Saved in this demo',
    templates: 'Templates',
    savedWorkouts: 'Saved workouts',
    upper: 'Upper body A',
    workout: 'Workout',
    addExercise: 'Add exercise',
    exercise: 'Bench press',
    row: ['SET', 'KG', 'REPS'],
    add: 'Add set',
    finish: 'Finish workout',
    startWorkout: 'Start workout',
    back: 'Back',
    active: 'Active time',
    running: 'Timer running',
    paused: 'Activity paused',
    pause: 'Pause',
    resume: 'Resume',
    finishCardio: 'Finish activity',
    runningTitle: 'Running',
    appearance: 'Appearance',
    dark: 'Dark',
    light: 'Light',
    completed: 'Workout completed',
    logPrompt: 'Weight (kg)',
    exerciseNames: ['Bench press', 'Squat', 'Deadlift', 'Lat pulldown'],
    search: 'Search exercises',
    emptyHistory: 'No completed workouts yet',
    duration: 'Duration',
    reps: 'reps',
  },
  pt: {
    title: 'Seu treino, do seu jeito.',
    note: 'Inicie um treino de exemplo, teste o cronômetro ou registre um peso.',
    tabs: ['Treino', 'Cardio', 'Peso', 'Ajustes'],
    start: 'INICIAR TREINO',
    template: 'Iniciar de um modelo',
    empty: 'Iniciar treino vazio',
    manage: 'GERENCIAR',
    library: 'Biblioteca de exercícios',
    history: 'Histórico de treinos',
    insights: 'Estatísticas de treino',
    planning: 'Planejamento de treino',
    today: 'TREINO DE HOJE',
    noTraining: 'Nenhum treino registrado hoje',
    hint: 'Inicie um treino para vê-lo aqui.',
    week: 'Esta semana',
    weekly: 'RESUMO SEMANAL',
    sessions: 'sessões',
    minutes: 'Minutos',
    distance: 'distância',
    cardioStart: 'Iniciar cardio',
    goal: 'META SEMANAL',
    noGoal: 'Nenhuma meta ativa',
    goalHint:
      'Defina uma meta de minutos, sessões ou distância para acompanhar seu progresso.',
    average: 'Média semanal',
    days: 'Dias registrados',
    phase: 'FASE ATUAL',
    noPhase: 'Nenhuma fase ativa',
    weightLog: 'Registrar peso de hoje',
    save: 'Salvar',
    saved: 'Salvo nesta demo',
    templates: 'Modelos',
    savedWorkouts: 'Treinos salvos',
    upper: 'Superior A',
    workout: 'Treino',
    addExercise: 'Adicionar exercício',
    exercise: 'Supino reto',
    row: ['SÉRIE', 'KG', 'REPS'],
    add: 'Adicionar série',
    finish: 'Finalizar treino',
    startWorkout: 'Iniciar treino',
    back: 'Voltar',
    active: 'Tempo ativo',
    running: 'Cronômetro em andamento',
    paused: 'Atividade pausada',
    pause: 'Pausar',
    resume: 'Retomar',
    finishCardio: 'Finalizar atividade',
    runningTitle: 'Corrida',
    appearance: 'Aparência',
    dark: 'Escuro',
    light: 'Claro',
    completed: 'Treino concluído',
    logPrompt: 'Peso (kg)',
    exerciseNames: [
      'Supino reto',
      'Agachamento',
      'Levantamento terra',
      'Puxada alta',
    ],
    search: 'Buscar exercícios',
    emptyHistory: 'Nenhum treino concluído ainda',
    duration: 'Duração',
    reps: 'repetições',
  },
}

export default function LiftBookDemo() {
  const { language } = useLanguage()
  const copy = text[language]
  const [view, setView] = useState(0)
  const [screen, setScreen] = useState<
    'home' | 'templates' | 'workout' | 'library' | 'history' | 'weight'
  >('home')
  const [emptyWorkout, setEmptyWorkout] = useState(false)
  const [exerciseAdded, setExerciseAdded] = useState(true)
  const workoutName = emptyWorkout ? copy.workout : copy.upper
  const [sets, setSets] = useState([false, false, false])
  const [workoutDone, setWorkoutDone] = useState(false)
  const [query, setQuery] = useState('')
  const [light, setLight] = useState(false)
  const [weight, setWeight] = useState('72.4')
  const [loggedWeight, setLoggedWeight] = useState<number | null>(null)
  const [activeCardio, setActiveCardio] = useState(false)
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [cardioDone, setCardioDone] = useState(false)
  const accumulated = useRef(0)
  const startedAt = useRef(0)
  const chooseView = (index: number) => {
    setView(index)
    setScreen('home')
  }
  useEffect(() => {
    if (!running || view !== 1 || !activeCardio) return
    const timer = window.setInterval(
      () =>
        setSeconds(
          Math.floor(
            (accumulated.current + performance.now() - startedAt.current) /
              1000,
          ),
        ),
      1000,
    )
    return () => window.clearInterval(timer)
  }, [running, view, activeCardio])
  const pauseTimer = () => {
    accumulated.current += performance.now() - startedAt.current
    setSeconds(Math.floor(accumulated.current / 1000))
    setRunning(false)
  }
  const resumeTimer = () => {
    startedAt.current = performance.now()
    setRunning(true)
  }
  const time = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
  const icons: NativeIconName[] = ['training', 'heart', 'weight', 'settings']
  const row = (label: string, icon: NativeIconName, action: () => void) => (
    <button type="button" className="lift-row" onClick={action}>
      <NativeIcon name={icon} />
      <span>{label}</span>
      <b aria-hidden="true">›</b>
    </button>
  )
  const subpage = screen !== 'home' || (view === 1 && activeCardio)

  return (
    <div className="product-demo native-demo liftbook-demo">
      <PreviewContext
        title={copy.title}
        subtitle="LiftBook / Android"
        tabs={copy.tabs.slice(0, 3)}
        selected={view}
        onSelect={chooseView}
        note={copy.note}
      />
      <NativePhone
        className={`liftbook-phone ${light ? 'native-light' : ''}`}
        navigation={
          <nav className="lift-dock" aria-label="LiftBook">
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
        {subpage && (
          <button
            type="button"
            className="native-back"
            aria-label={copy.back}
            onClick={() => {
              setScreen('home')
              if (activeCardio) setActiveCardio(false)
            }}
          >
            <NativeIcon name="back" />
          </button>
        )}
        {screen === 'templates' ? (
          <>
            <h5>{copy.templates}</h5>
            <p className="native-subtitle">{copy.savedWorkouts}</p>
            <div className="lift-card">
              <strong>{copy.upper}</strong>
              <p>
                3 {language === 'pt' ? 'exercícios' : 'exercises'} · 9{' '}
                {language === 'pt' ? 'séries' : 'sets'}
              </p>
              <button
                type="button"
                className="native-primary"
                onClick={() => {
                  setScreen('workout')
                  setWorkoutDone(false)
                  setSets([false, false, false])
                  setEmptyWorkout(false)
                  setExerciseAdded(true)
                }}
              >
                {copy.startWorkout}
              </button>
            </div>
          </>
        ) : screen === 'workout' ? (
          <>
            <h5>{workoutName}</h5>
            <p className="native-subtitle">
              {exerciseAdded ? copy.exercise : copy.addExercise}
            </p>
            {exerciseAdded ? (
              <div className="lift-card lift-workout">
                <strong>{copy.exercise}</strong>
                <div className="lift-set-table">
                  <div>
                    {copy.row.map((label) => (
                      <small key={label}>{label}</small>
                    ))}
                    <span />
                  </div>
                  {sets.map((done, index) => (
                    <div key={index}>
                      <span>{index + 1}</span>
                      <span>60</span>
                      <span>10</span>
                      <button
                        type="button"
                        aria-label={`${copy.row[0]} ${index + 1}`}
                        aria-pressed={done}
                        onClick={() =>
                          setSets((current) =>
                            current.map((value, item) =>
                              item === index ? !value : value,
                            ),
                          )
                        }
                      >
                        {done ? '✓' : '○'}
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="native-secondary"
                  disabled={sets.length >= 6}
                  onClick={() => setSets((current) => [...current, false])}
                >
                  + {copy.add}
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="native-secondary"
                onClick={() => {
                  setExerciseAdded(true)
                  setSets([false])
                }}
              >
                + {copy.addExercise}
              </button>
            )}
            <button
              type="button"
              className="native-primary"
              disabled={!sets.some(Boolean)}
              onClick={() => {
                setWorkoutDone(true)
                setScreen('home')
              }}
            >
              {copy.finish}
            </button>
          </>
        ) : screen === 'library' ? (
          <>
            <h5>{copy.library}</h5>
            <input
              className="lift-search"
              aria-label={copy.search}
              placeholder={copy.search}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="lift-card lift-list">
              {copy.exerciseNames
                .filter((name) =>
                  name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
                )
                .map((name) => (
                  <div className="lift-row" key={name}>
                    <NativeIcon name="training" />
                    <span>{name}</span>
                  </div>
                ))}
            </div>
          </>
        ) : screen === 'history' ? (
          <>
            <h5>{copy.history}</h5>
            <div className="lift-card lift-empty">
              <NativeIcon name="clock" />
              <p>{workoutDone ? workoutName : copy.emptyHistory}</p>
              {workoutDone && (
                <small>
                  {sets.filter(Boolean).length} {copy.row[0].toLowerCase()}
                </small>
              )}
            </div>
          </>
        ) : screen === 'weight' ? (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const value = Number(weight)
              if (!Number.isFinite(value) || value <= 0 || value > 500) return
              setLoggedWeight(value)
              setScreen('home')
            }}
          >
            <h5>{copy.weightLog}</h5>
            <label className="lift-weight-input">
              {copy.logPrompt}
              <input
                type="number"
                step="0.1"
                min="1"
                max="500"
                required
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />
            </label>
            <button type="submit" className="native-primary">
              {copy.save}
            </button>
          </form>
        ) : view === 0 ? (
          <>
            <h5>{copy.tabs[0]}</h5>
            <h6>{copy.start}</h6>
            <div className="lift-start">
              {row(copy.template, 'template', () => setScreen('templates'))}
              {row(copy.empty, 'plus', () => {
                setScreen('workout')
                setSets([])
                setEmptyWorkout(true)
                setExerciseAdded(false)
                setWorkoutDone(false)
              })}
            </div>
            <h6>{copy.manage}</h6>
            <div className="lift-card lift-list">
              {row(copy.library, 'training', () => setScreen('library'))}
              {row(copy.history, 'clock', () => setScreen('history'))}
              <div className="lift-row">
                <NativeIcon name="chart" />
                <span>{copy.insights}</span>
                <small aria-label="Premium">
                  <NativeIcon name="lock" />
                </small>
              </div>
              <div className="lift-row">
                <NativeIcon name="calendar" />
                <span>{copy.planning}</span>
              </div>
            </div>
            <h6>{copy.today}</h6>
            <div className="lift-card lift-empty">
              <NativeIcon name="calendar" />
              <strong>{workoutDone ? copy.completed : copy.noTraining}</strong>
              <p>{workoutDone ? workoutName : copy.hint}</p>
            </div>
          </>
        ) : view === 1 ? (
          activeCardio ? (
            <>
              <h5>{copy.runningTitle}</h5>
              <div className="lift-card lift-timer">
                <small>{copy.active}</small>
                <strong role="timer">{time}</strong>
                <p>{running ? copy.running : copy.paused}</p>
              </div>
              <div className="lift-timer-controls">
                <button
                  type="button"
                  className="native-secondary"
                  onClick={running ? pauseTimer : resumeTimer}
                >
                  {running ? copy.pause : copy.resume}
                </button>
                <button
                  type="button"
                  className="native-primary"
                  onClick={() => {
                    if (running) pauseTimer()
                    setActiveCardio(false)
                    setCardioDone(true)
                  }}
                >
                  {copy.finishCardio}
                </button>
              </div>
            </>
          ) : (
            <>
              <h5>{copy.tabs[1]}</h5>
              <p className="native-subtitle">{copy.week}</p>
              <div className="lift-card">
                <small>{copy.goal}</small>
                <strong>{copy.noGoal}</strong>
                <p>{copy.goalHint}</p>
              </div>
              <button
                type="button"
                className="native-primary"
                onClick={() => {
                  if (cardioDone) {
                    accumulated.current = 0
                    setSeconds(0)
                    setCardioDone(false)
                  }
                  setActiveCardio(true)
                  if (!running) resumeTimer()
                }}
              >
                {copy.cardioStart}
              </button>
              <h6>{copy.weekly}</h6>
              <div className="lift-card lift-summary">
                <span>
                  <strong>{cardioDone ? 1 : 0}</strong>
                  {copy.sessions}
                </span>
                <span>
                  <strong>{cardioDone ? Math.floor(seconds / 60) : 0}</strong>
                  {copy.minutes}
                </span>
                <span>
                  <strong>0 km</strong>
                  {copy.distance}
                </span>
              </div>
            </>
          )
        ) : view === 2 ? (
          <>
            <h5>{copy.tabs[2]}</h5>
            <p className="native-subtitle">{copy.week}</p>
            <div className="lift-card">
              <small>{copy.weekly}</small>
              <div className="lift-summary">
                <span>
                  <strong>
                    {loggedWeight === null ? '--' : loggedWeight} kg
                  </strong>
                  {copy.average}
                </span>
                <span>
                  <strong>{loggedWeight === null ? 0 : 1} / 7</strong>
                  {copy.days}
                </span>
              </div>
              <div className="lift-phase">
                <small>{copy.phase}</small>
                <strong>{copy.noPhase}</strong>
              </div>
            </div>
            {row(copy.weightLog, 'weight', () => setScreen('weight'))}
          </>
        ) : (
          <>
            <h5>{copy.tabs[3]}</h5>
            <h6>{copy.appearance}</h6>
            <div className="lift-card lift-appearance">
              {[copy.dark, copy.light].map((label, index) => (
                <button
                  type="button"
                  key={label}
                  aria-pressed={light === !!index}
                  onClick={() => setLight(!!index)}
                >
                  {label}
                  <span>{light === !!index ? '✓' : ''}</span>
                </button>
              ))}
            </div>
          </>
        )}
        <span className="native-announcement" role="status">
          {workoutDone && view === 0 && screen === 'home'
            ? copy.completed
            : loggedWeight !== null && view === 2 && screen === 'home'
              ? copy.saved
              : ''}
        </span>
      </NativePhone>
    </div>
  )
}
