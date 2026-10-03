import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { NativeIcon, NativePhone, PreviewContext } from './NativePreview'

const text = {
  en: {
    title: 'A little perspective, every day.',
    year: 'Year',
    events: 'Events',
    goals: 'Goals',
    settings: 'Settings',
    yourYear: 'YOUR YEAR',
    remaining: 'days still yours',
    past: 'Passed',
    future: 'Future',
    countdowns: 'Countdowns',
    intro: 'Count down to moments and keep goals moving.',
    next: 'Up next',
    launch: 'Product launch',
    reading: 'Read a new book',
    days: 'DAYS',
    toGo: 'DAYS TO GO',
    journey: 'THE JOURNEY',
    completed: 'Days completed',
    left: 'Days remaining',
    total: 'Total duration',
    goalAction: 'Mark complete',
    done: 'Goal completed',
    back: 'Back',
    appearance: 'Appearance',
    dark: 'Dark',
    light: 'Light',
    classic: 'Classic palette',
    note: 'Explore the year grid, open a countdown, or complete a goal.',
    name: 'Event name',
    date: 'Target date',
    add: 'Add countdown',
    cancel: 'Cancel',
    new: 'New countdown',
    empty: 'Give your next moment a name.',
    progress: 'complete',
    duration: 'days',
    pin: 'Pinned countdown',
  },
  pt: {
    title: 'Um pouco de perspectiva, todo dia.',
    year: 'Ano',
    events: 'Eventos',
    goals: 'Metas',
    settings: 'Ajustes',
    yourYear: 'SEU ANO',
    remaining: 'dias ainda seus',
    past: 'Passados',
    future: 'Futuros',
    countdowns: 'Contagens',
    intro: 'Conte os dias para momentos e acompanhe suas metas.',
    next: 'A seguir',
    launch: 'Lançamento do app',
    reading: 'Ler um novo livro',
    days: 'DIAS',
    toGo: 'DIAS RESTANTES',
    journey: 'A JORNADA',
    completed: 'Dias concluídos',
    left: 'Dias restantes',
    total: 'Duração total',
    goalAction: 'Marcar como concluída',
    done: 'Meta concluída',
    back: 'Voltar',
    appearance: 'Aparência',
    dark: 'Escuro',
    light: 'Claro',
    classic: 'Paleta Classic',
    note: 'Explore a grade do ano, abra uma contagem ou conclua uma meta.',
    name: 'Nome do evento',
    date: 'Data de destino',
    add: 'Adicionar contagem',
    cancel: 'Cancelar',
    new: 'Nova contagem',
    empty: 'Dê um nome ao próximo momento.',
    progress: 'concluído',
    duration: 'dias',
    pin: 'Contagem fixada',
  },
}

// Calendar-day arithmetic avoids DST changing the number of dots or days left.
const dayNumber = (date: Date) =>
  Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000
const localDate = (value: string) => new Date(`${value}T12:00:00`)
const dateInput = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export default function DayleDemo() {
  const { language } = useLanguage()
  const copy = text[language]
  const [today] = useState(() => new Date())
  const [view, setView] = useState(0)
  const [segment, setSegment] = useState(0)
  const [detail, setDetail] = useState<number | null>(null)
  const [goalDone, setGoalDone] = useState(false)
  const [light, setLight] = useState(false)
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')
  const target = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30,
  )
  const [date, setDate] = useState(() => dateInput(target))
  const [events, setEvents] = useState(() => [
    {
      title: copy.launch,
      target,
      start: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 12,
      ),
    },
  ])
  const year = today.getFullYear()
  const total =
    dayNumber(new Date(year + 1, 0, 1)) - dayNumber(new Date(year, 0, 1))
  const elapsed = dayNumber(today) - dayNumber(new Date(year, 0, 1)) + 1
  const percent = ((elapsed / total) * 100).toFixed(1)
  const event = detail === null ? null : events[detail]
  const daysLeft = (date: Date) =>
    Math.max(0, dayNumber(date) - dayNumber(today))
  const format = (date: Date) =>
    date.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  const eventDuration = event
    ? Math.max(1, dayNumber(event.target) - dayNumber(event.start))
    : 1
  const eventProgress = event
    ? Math.min(
        1,
        Math.max(
          0,
          (dayNumber(today) - dayNumber(event.start)) / eventDuration,
        ),
      )
    : 0
  const chooseView = (index: number) => {
    setView(index === 2 ? 1 : index)
    setSegment(index === 2 ? 1 : 0)
    setDetail(null)
    setAdding(false)
  }
  const contextIndex = view === 1 && segment === 1 ? 2 : view

  return (
    <div className="product-demo native-demo dayle-demo">
      <PreviewContext
        title={copy.title}
        subtitle="dayle / Android"
        tabs={[copy.year, copy.countdowns, copy.goals]}
        selected={view === 2 ? -1 : contextIndex}
        onSelect={chooseView}
        note={copy.note}
      />
      <NativePhone
        className={`dayle-phone ${light ? 'native-light' : ''}`}
        navigation={
          <nav className="dayle-dock" aria-label={`Dayle ${copy.events}`}>
            {(
              [
                ['home', copy.year],
                ['calendar', copy.events],
                ['settings', copy.settings],
              ] as const
            ).map(([icon, label], index) => (
              <button
                type="button"
                key={label}
                aria-label={`Dayle: ${label}`}
                aria-pressed={view === index}
                onClick={() => {
                  setView(index)
                  setDetail(null)
                  setAdding(false)
                }}
              >
                <NativeIcon name={icon} />
                <i />
              </button>
            ))}
          </nav>
        }
      >
        {event ? (
          <>
            <button
              type="button"
              className="native-back"
              aria-label={copy.back}
              onClick={() => setDetail(null)}
            >
              <NativeIcon name="back" />
            </button>
            <div className="dayle-card dayle-event-hero">
              <h5>{event.title}</h5>
              <p>
                {format(event.start)} → {format(event.target)}
              </p>
              <strong>{daysLeft(event.target)}</strong>
              <small>{copy.toGo}</small>
            </div>
            <div className="dayle-card">
              <small>{copy.journey}</small>
              <div className="dayle-journey" aria-hidden="true">
                {Array.from({ length: 21 }, (_, index) => (
                  <i
                    key={index}
                    className={
                      index < Math.round(eventProgress * 21) ? 'passed' : ''
                    }
                  />
                ))}
              </div>
            </div>
            <div className="dayle-card dayle-stats">
              <span>
                {copy.completed}
                <strong>
                  {Math.max(0, dayNumber(today) - dayNumber(event.start))}
                </strong>
              </span>
              <span>
                {copy.left}
                <strong>{daysLeft(event.target)}</strong>
              </span>
            </div>
            <div className="dayle-card dayle-duration">
              <span>{copy.total}</span>
              <strong>
                {dayNumber(event.target) - dayNumber(event.start)}{' '}
                {copy.duration}
              </strong>
            </div>
          </>
        ) : adding ? (
          <form
            className="dayle-add"
            onSubmit={(event) => {
              event.preventDefault()
              const next = localDate(date)
              if (
                !name.trim() ||
                !Number.isFinite(next.getTime()) ||
                dayNumber(next) < dayNumber(today)
              )
                return
              setEvents((current) => [
                ...current,
                { title: name.trim(), target: next, start: today },
              ])
              setName('')
              setAdding(false)
              setSegment(0)
            }}
          >
            <h5>{copy.new}</h5>
            <label>
              {copy.name}
              <input
                required
                maxLength={40}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={copy.empty}
              />
            </label>
            <label>
              {copy.date}
              <input
                type="date"
                required
                min={dateInput(today)}
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>
            <button className="native-primary" type="submit">
              {copy.add}
            </button>
            <button
              className="native-secondary"
              type="button"
              onClick={() => setAdding(false)}
            >
              {copy.cancel}
            </button>
          </form>
        ) : view === 0 ? (
          <>
            <h5 className="dayle-wordmark">dayle</h5>
            <p className="native-subtitle">{copy.title}</p>
            <div className="dayle-card dayle-year">
              <small>{copy.yourYear}</small>
              <strong>{year}</strong>
              <b>
                {total - elapsed} {copy.remaining}
              </b>
            </div>
            <div className="dayle-card dayle-grid-card">
              <div
                className="dayle-dots"
                role="img"
                aria-label={`${year}: ${elapsed}/${total} ${copy.duration}, ${percent}%`}
              >
                {Array.from({ length: total }, (_, index) => (
                  <i
                    key={index}
                    className={
                      index < elapsed - 1
                        ? 'passed'
                        : index === elapsed - 1
                          ? 'today'
                          : ''
                    }
                  />
                ))}
              </div>
              <div className="dayle-legend">
                <strong>{percent}%</strong>
                <span>
                  <i className="passed" />
                  {copy.past}
                  <i />
                  {copy.future}
                </span>
              </div>
            </div>
          </>
        ) : view === 1 ? (
          <>
            <div className="native-title-row">
              <h5>{copy.events}</h5>
              <button
                type="button"
                className="dayle-plus"
                aria-label={copy.add}
                onClick={() => setAdding(true)}
              >
                <NativeIcon name="plus" />
              </button>
            </div>
            <p className="native-subtitle">{copy.intro}</p>
            <div className="dayle-segments">
              {[copy.countdowns, copy.goals].map((label, index) => (
                <button
                  type="button"
                  key={label}
                  aria-pressed={segment === index}
                  onClick={() => setSegment(index)}
                >
                  {label}
                </button>
              ))}
            </div>
            <h6>{copy.next}</h6>
            {segment === 0 ? (
              events.map((item, index) => (
                <button
                  type="button"
                  className="dayle-card dayle-event"
                  key={index}
                  onClick={() => setDetail(index)}
                >
                  <span className="dayle-event-icon">
                    <NativeIcon name="calendar" />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{format(item.target)}</small>
                  </span>
                  <b>
                    {daysLeft(item.target)}
                    <small>{copy.days}</small>
                  </b>
                </button>
              ))
            ) : (
              <div className="dayle-card dayle-goal">
                <NativeIcon name="calendar" />
                <h5>{copy.reading}</h5>
                <p>{format(target)}</p>
                <strong>
                  {goalDone ? '✓' : '30'}
                  <small>{goalDone ? copy.done : copy.toGo}</small>
                </strong>
                <button
                  type="button"
                  className="native-primary"
                  disabled={goalDone}
                  onClick={() => setGoalDone(true)}
                >
                  {goalDone ? copy.done : copy.goalAction}
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h5>{copy.settings}</h5>
            <h6>{copy.appearance}</h6>
            <div className="dayle-card dayle-segments">
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
            <div className="dayle-card dayle-palette">
              <strong>{copy.classic}</strong>
              <div aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
          </>
        )}
        <span className="native-announcement" role="status">
          {goalDone && !adding && detail === null && view === 1 && segment === 1
            ? copy.done
            : ''}
        </span>
      </NativePhone>
    </div>
  )
}
