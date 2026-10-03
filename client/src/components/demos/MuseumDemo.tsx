import { useEffect, useRef, useState } from 'react'
import { museumAuthors, museumWorks } from '../../data/museum'
import { useLanguage } from '../../hooks/useLanguage'
import { NativeIcon, NativePhone, PreviewContext } from './NativePreview'
import '../../styles/project-previews.css'

const content = {
  en: {
    title: 'Art, culture and accessibility.',
    note: 'Explore the exhibition, search artworks, and open an artist’s biography.',
    tabs: ['Exhibition', 'Artists', 'Artworks'],
    exhibition: 'Centelhas em Movimento',
    current: 'ON DISPLAY',
    intro:
      'Works from the Igor Queiroz Barroso collection, brought together in an exhibition about movement and new perspectives.',
    explore: 'Explore artists and artworks',
    collection: 'Discover Brazilian modern art',
    details: 'About the exhibition',
    artists: 'Meet the artists',
    artworks: 'Discover the artworks',
    searchArtist: 'Search artists…',
    searchWork: 'Search artwork or artist…',
    noResults: 'No results found.',
    back: 'Back',
    author: 'Artist',
    works: 'Artworks by this artist',
    biography: 'Biography',
    listen: 'Listen',
    stop: 'Stop',
    audio: 'Artwork audio description',
    audioUnavailable:
      'Read the description below; audio is unavailable in this browser.',
    guide: 'Cultural guide',
    guideNote: 'Sample conversation',
    questions: ['Tell me about the artwork', 'Who is the artist?'],
    welcome: 'Choose a question to explore this artwork.',
    museum: 'Museu Unifor',
    close: 'Close guide',
    about:
      'An experience for the Espaço Cultural Unifor with artwork details, artist biographies, audio description and Libras in the complete Android app.',
  },
  pt: {
    title: 'Arte, cultura e acessibilidade.',
    note: 'Explore a exposição, busque obras e abra a biografia de um artista.',
    tabs: ['Exposição', 'Autores', 'Obras'],
    exhibition: 'Centelhas em Movimento',
    current: 'EXPOSIÇÃO EM CARTAZ',
    intro:
      'Obras da Coleção Igor Queiroz Barroso reunidas em uma exposição sobre movimento e novas perspectivas.',
    explore: 'Conhecer Autores e Obras',
    collection: 'Explore o acervo modernista',
    details: 'Detalhes da Exposição',
    artists: 'Conheça os Autores',
    artworks: 'Conheça as Obras',
    searchArtist: 'Buscar autor…',
    searchWork: 'Buscar obra ou autor…',
    noResults: 'Nenhum resultado encontrado.',
    back: 'Voltar',
    author: 'Autor',
    works: 'Obras deste autor',
    biography: 'Biografia',
    listen: 'Ouvir',
    stop: 'Parar',
    audio: 'Audiodescrição da Obra',
    audioUnavailable:
      'Leia a descrição abaixo; o áudio está indisponível neste navegador.',
    guide: 'Guia cultural',
    guideNote: 'Conversa de exemplo',
    questions: ['Fale sobre a obra', 'Quem é este artista?'],
    welcome: 'Escolha uma pergunta para conhecer esta obra.',
    museum: 'Museu Unifor',
    close: 'Fechar guia',
    about:
      'Uma experiência para o Espaço Cultural Unifor com detalhes das obras, biografias, audiodescrição e Libras no app Android completo.',
  },
}
const authorEn = [
  'A leading Brazilian painter whose work depicts the pain, labor and poetry of the Brazilian people.',
  'A central figure in Brazilian modern art and the Anthropophagic movement, developing a new national visual language.',
  'Painter and illustrator associated with the 1922 Modern Art Week, known for scenes of samba and everyday Brazilian life.',
  'A pioneer of Brazilian modern art whose 1917 exhibition helped spark the debates leading to Modern Art Week.',
  'A pioneer of Brazilian Neo-Concretism who moved beyond painting to create three-dimensional, participatory works.',
  'A contemporary Brazilian artist and photographer known for experimenting with unconventional materials.',
]
const workEn = [
  'An expressionist painting depicting families migrating from Brazil’s Northeast to escape drought, using earth tones and dramatic figures.',
  'A lyrical painting recalling childhood and traditional games in rural São Paulo, with expressive lines and subtle geometry.',
  'A symbol of Brazilian cultural Anthropophagy, featuring a monumental figure with enormous feet, a cactus and a radiant sun.',
  'A painting inspired by Brazilian folklore, with fantastic forest creatures, sinuous shapes and vivid tropical colors.',
  'A festive scene portraying the world of samba in Rio, with a rich palette and rhythmic movement.',
  'A poetic representation of urban life, with women resting and contemplating a Brazilian colonial streetscape.',
  'An expressionist portrait with free brushwork, bold contrasts and strong psychological intensity.',
  'A geometric aluminum sculpture with hinged plates, designed to be manipulated by the viewer.',
  'A photographic work made with unconventional materials, questioning visual perception and representation.',
]
const imageUrl = (name: string) =>
  `${import.meta.env.BASE_URL}previews/museum/${name}.webp`
type Screen =
  | { kind: 'home' | 'authors' | 'works' | 'about' }
  | { kind: 'author'; id: string }
  | { kind: 'work'; id: string }

export default function MuseumDemo() {
  const { language } = useLanguage()
  const copy = content[language]
  const [history, setHistory] = useState<Screen[]>([{ kind: 'home' }])
  const screen = history[history.length - 1]
  const [query, setQuery] = useState('')
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<
    Array<{ question: string; answer: string }>
  >([])
  const [speaking, setSpeaking] = useState(false)
  const [audioMessage, setAudioMessage] = useState('')
  const utterance = useRef<SpeechSynthesisUtterance | null>(null)
  const author =
    screen.kind === 'author'
      ? museumAuthors.find((item) => item.id === screen.id)
      : null
  const work =
    screen.kind === 'work'
      ? museumWorks.find((item) => item.id === screen.id)
      : null
  const bio = (id: string) => {
    const index = museumAuthors.findIndex((author) => author.id === id)
    return language === 'en' ? authorEn[index] : museumAuthors[index]?.descricao
  }
  const description = (id: string) => {
    const index = museumWorks.findIndex((work) => work.id === id)
    return language === 'en' ? workEn[index] : museumWorks[index]?.descricao
  }
  useEffect(
    () => () => {
      if (utterance.current) {
        utterance.current.onend = null
        utterance.current.onerror = null
        window.speechSynthesis?.cancel()
      }
    },
    [],
  )
  const stopAudio = () => {
    if (utterance.current) {
      utterance.current.onend = null
      utterance.current.onerror = null
      window.speechSynthesis?.cancel()
      utterance.current = null
    }
    setSpeaking(false)
  }
  const navigate = (next: Screen, replace = false) => {
    stopAudio()
    setQuery('')
    setChatOpen(false)
    setMessages([])
    setAudioMessage('')
    setHistory((current) => (replace ? [next] : [...current, next]))
  }
  const back = () => {
    stopAudio()
    setChatOpen(false)
    setQuery('')
    setHistory((current) =>
      current.length > 1 ? current.slice(0, -1) : [{ kind: 'home' }],
    )
  }
  const listen = () => {
    if (speaking) {
      stopAudio()
      return
    }
    if (
      !work ||
      !('speechSynthesis' in window) ||
      !('SpeechSynthesisUtterance' in window)
    ) {
      setAudioMessage(copy.audioUnavailable)
      return
    }
    const speech = new SpeechSynthesisUtterance(description(work.id))
    speech.lang = language === 'pt' ? 'pt-BR' : 'en-US'
    speech.onend = () => {
      utterance.current = null
      setSpeaking(false)
    }
    speech.onerror = () => {
      utterance.current = null
      setSpeaking(false)
      setAudioMessage(copy.audioUnavailable)
    }
    utterance.current = speech
    setSpeaking(true)
    window.speechSynthesis.speak(speech)
  }
  const normalize = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase()
  const filteredAuthors = museumAuthors.filter((author) =>
    normalize(`${author.nome} ${bio(author.id)}`).includes(normalize(query)),
  )
  const filteredWorks = museumWorks.filter((work) =>
    normalize(`${work.nome} ${work.autor}`).includes(normalize(query)),
  )
  const workCard = (item: (typeof museumWorks)[number]) => (
    <button
      type="button"
      className="mu-work-card"
      key={item.id}
      onClick={() => navigate({ kind: 'work', id: item.id })}
    >
      <div>
        <img
          src={imageUrl(item.image)}
          alt={item.nome}
          width="240"
          height="240"
          loading="lazy"
          decoding="async"
        />
        <small>{item.data}</small>
      </div>
      <strong>{item.nome}</strong>
      <span>{item.autor}</span>
    </button>
  )
  const title =
    work?.nome ??
    author?.nome ??
    (screen.kind === 'authors'
      ? copy.artists
      : screen.kind === 'works'
        ? copy.artworks
        : screen.kind === 'about'
          ? copy.details
          : copy.museum)
  const category =
    screen.kind === 'home' || screen.kind === 'about'
      ? 0
      : screen.kind === 'authors' || screen.kind === 'author'
        ? 1
        : 2

  return (
    <div className="product-demo native-demo museum-native-demo">
      <PreviewContext
        title={copy.title}
        subtitle={`Museu Unifor / ${language === 'pt' ? 'Conceito' : 'Concept'}`}
        tabs={copy.tabs}
        selected={category}
        onSelect={(index) =>
          navigate(
            { kind: (['home', 'authors', 'works'] as const)[index] },
            true,
          )
        }
        note={copy.note}
      />
      <NativePhone
        className="mu-phone"
        screenKey={`${screen.kind}-${work?.id ?? author?.id ?? ''}-${chatOpen}`}
        navigation={null}
      >
        <header className="mu-header">
          {screen.kind !== 'home' && (
            <button type="button" aria-label={copy.back} onClick={back}>
              <NativeIcon name="back" />
            </button>
          )}
          <h5>{title}</h5>
        </header>
        {screen.kind === 'home' ? (
          <>
            <div className="mu-exhibition">
              <small>{copy.current}</small>
              <h5>{copy.exhibition}</h5>
              <img
                src={imageUrl('alta')}
                alt={copy.exhibition}
                width="640"
                height="400"
                decoding="async"
              />
              <p>{copy.intro}</p>
            </div>
            <button
              type="button"
              className="mu-action mu-action-primary"
              onClick={() => navigate({ kind: 'authors' })}
            >
              <NativeIcon name="book" />
              <span>
                <strong>{copy.explore}</strong>
                <small>{copy.collection}</small>
              </span>
              <b aria-hidden="true">→</b>
            </button>
            <button
              type="button"
              className="mu-action"
              onClick={() => navigate({ kind: 'about' })}
            >
              <NativeIcon name="volume" />
              <span>
                <strong>{copy.details}</strong>
                <small>
                  {language === 'pt'
                    ? 'Audiodescrição e Libras'
                    : 'Audio description and Libras'}
                </small>
              </span>
              <b aria-hidden="true">→</b>
            </button>
          </>
        ) : screen.kind === 'about' ? (
          <div className="mu-exhibition">
            <img
              src={imageUrl('alta')}
              alt={copy.exhibition}
              width="640"
              height="400"
              decoding="async"
            />
            <h5>{copy.exhibition}</h5>
            <p>{copy.intro}</p>
            <p>{copy.about}</p>
            <button
              type="button"
              className="mu-action mu-action-primary"
              onClick={() => navigate({ kind: 'works' })}
            >
              {copy.artworks} →
            </button>
          </div>
        ) : author ? (
          <>
            <div className="mu-author-detail">
              <img
                src={imageUrl(author.image)}
                alt={author.nome}
                width="180"
                height="180"
                decoding="async"
              />
              <h5>{author.nome}</h5>
              <span>{author.data}</span>
              <h6>{copy.biography}</h6>
              <p>{bio(author.id)}</p>
            </div>
            <h6>{copy.works}</h6>
            <div className="mu-grid">
              {museumWorks
                .filter((work) => work.autorId === author.id)
                .map(workCard)}
            </div>
          </>
        ) : work ? (
          chatOpen ? (
            <div className="mu-chat">
              <header>
                <NativeIcon name="chat" />
                <strong>{copy.guide}</strong>
                <button
                  type="button"
                  aria-label={copy.close}
                  onClick={() => setChatOpen(false)}
                >
                  ×
                </button>
              </header>
              <small>{copy.guideNote}</small>
              <p className="mu-answer">{copy.welcome}</p>
              <div aria-live="polite">
                {messages.map((message, index) => (
                  <div key={index}>
                    <p className="mu-question">{message.question}</p>
                    <p className="mu-answer">{message.answer}</p>
                  </div>
                ))}
              </div>
              <div className="mu-prompts">
                {copy.questions.map((question, index) => (
                  <button
                    type="button"
                    key={question}
                    onClick={() =>
                      setMessages((current) => [
                        ...current,
                        {
                          question,
                          answer:
                            index === 0
                              ? (description(work.id) ?? '')
                              : `${work.autor}. ${bio(work.autorId)}`,
                        },
                      ])
                    }
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="mu-artwork-detail">
                <img
                  src={imageUrl(work.image)}
                  alt={work.nome}
                  width="480"
                  height="480"
                  decoding="async"
                />
                <div>
                  <h5>{work.nome}</h5>
                  <small>{work.data}</small>
                </div>
                <button
                  className="mu-author-link"
                  type="button"
                  onClick={() => navigate({ kind: 'author', id: work.autorId })}
                >
                  <NativeIcon name="person" />
                  {copy.author}: {work.autor}
                </button>
                <p>{description(work.id)}</p>
              </div>
              <div className="mu-audio">
                <NativeIcon name="volume" />
                <strong>{copy.audio}</strong>
                <button type="button" aria-pressed={speaking} onClick={listen}>
                  {speaking ? copy.stop : copy.listen}
                </button>
              </div>
              {audioMessage && (
                <p role="status" className="mu-audio-message">
                  {audioMessage}
                </p>
              )}
              <button
                type="button"
                className="mu-action"
                onClick={() => {
                  stopAudio()
                  setChatOpen(true)
                }}
              >
                <NativeIcon name="chat" />
                <strong>{copy.guide}</strong>
                <b aria-hidden="true">→</b>
              </button>
            </>
          )
        ) : (
          <>
            <div className="mu-tabs">
              {[copy.tabs[1], copy.tabs[2]].map((label, index) => (
                <button
                  type="button"
                  key={label}
                  aria-pressed={
                    screen.kind === (index === 0 ? 'authors' : 'works')
                  }
                  onClick={() =>
                    navigate({ kind: index === 0 ? 'authors' : 'works' }, true)
                  }
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="mu-search">
              <NativeIcon name="search" />
              <input
                aria-label={
                  screen.kind === 'authors'
                    ? copy.searchArtist
                    : copy.searchWork
                }
                placeholder={
                  screen.kind === 'authors'
                    ? copy.searchArtist
                    : copy.searchWork
                }
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            {screen.kind === 'authors' ? (
              filteredAuthors.length ? (
                <div className="mu-authors">
                  {filteredAuthors.map((item) => (
                    <button
                      type="button"
                      className="mu-author-card"
                      key={item.id}
                      onClick={() => navigate({ kind: 'author', id: item.id })}
                    >
                      <img
                        src={imageUrl(item.image)}
                        alt=""
                        width="72"
                        height="72"
                        loading="lazy"
                        decoding="async"
                      />
                      <span>
                        <strong>{item.nome}</strong>
                        <small>{item.data}</small>
                        <p>{bio(item.id)}</p>
                      </span>
                      <b aria-hidden="true">›</b>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mu-empty">{copy.noResults}</p>
              )
            ) : filteredWorks.length ? (
              <div className="mu-grid">{filteredWorks.map(workCard)}</div>
            ) : (
              <p className="mu-empty">{copy.noResults}</p>
            )}
          </>
        )}
      </NativePhone>
    </div>
  )
}
