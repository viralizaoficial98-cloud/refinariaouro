import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource-variable/manrope'
import './index.css'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'
import { ContentProvider } from './content/ContentContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <ContentProvider>
          <Suspense fallback={<div className="min-h-screen bg-forest-900" />}>
            <App />
          </Suspense>
        </ContentProvider>
      </LanguageProvider>
    </MotionConfig>
  </StrictMode>,
)
