import { LanguageProvider } from './contexts/LanguageProvider'
import MainLayout from './layouts/MainLayout'
import Preloader from './components/Preloader'

export default function App() {
  return (
    <LanguageProvider>
      <Preloader />
      <MainLayout />
    </LanguageProvider>
  )
}
