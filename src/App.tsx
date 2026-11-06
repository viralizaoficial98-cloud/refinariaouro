import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { path } from './content/routes'
import HomePage from './pages/HomePage'

const ContentPage = lazy(() => import('./pages/ContentPage'))
const ProcessPage = lazy(() => import('./pages/ProcessPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const NewsPage = lazy(() => import('./pages/NewsPage'))
const NewsArticlePage = lazy(() => import('./pages/NewsArticlePage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const DocumentsPage = lazy(() => import('./pages/DocumentsPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const CeoPage = lazy(() => import('./pages/CeoPage'))
const CreditsPage = lazy(() => import('./pages/CreditsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const AdminApp = lazy(() => import('./admin/AdminApp'))

const contentPages = ['about', 'history', 'mission', 'governance', 'infrastructure', 'quality', 'sustainability', 'hse', 'ethics', 'partners'] as const

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      ...contentPages.map((k) => ({ path: path(k), element: <ContentPage pageKey={k} /> })),
      { path: path('process'), element: <ProcessPage /> },
      { path: path('services'), element: <ServicesPage /> },
      { path: path('news'), element: <NewsPage /> },
      { path: `${path('news')}/:slug`, element: <NewsArticlePage /> },
      { path: path('gallery'), element: <GalleryPage /> },
      { path: path('documents'), element: <DocumentsPage /> },
      { path: path('careers'), element: <CareersPage /> },
      { path: path('faq'), element: <FaqPage /> },
      { path: path('contact'), element: <ContactPage /> },
      { path: path('legal'), element: <LegalPage /> },
      { path: path('ceo'), element: <CeoPage /> },
      { path: path('credits'), element: <CreditsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '/admin/*', element: <AdminApp /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
