import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import Layout from '@/layouts/Layout'
import HomePage from '@/pages/HomePage'
import NotificationCenter from '@/components/NotificationCenter'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="unimar-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
        <NotificationCenter />
      </Router>
    </ThemeProvider>
  )
}

export default App
