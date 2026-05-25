/**
 * App.jsx — Point d'entrée SPA et configuration du routage (BrowserRouter).
 * Routes principales : '/' (Dashboard), '/task/:id' (TaskDetail), '*' (404).
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar     from './layouts/Navbar'
import Dashboard  from './pages/Dashboard'
import TaskDetail from './pages/TaskDetail'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* Détail d'une tâche (route dynamique) */}
        <Route
          path="/task/:id"
          element={<TaskDetail />}
        />

        {/* Catch-all 404 */}
        <Route
          path="*"
          element={
            <main style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ fontSize: '60px', color: '#E5E7EB', fontWeight: 700 }}>
                404
              </div>
              <h2 style={{ fontSize: '20px', marginTop: '10px' }}>
                Page introuvable
              </h2>
              <p style={{ color: '#6B7280', marginTop: '6px', fontSize: '14px' }}>
                L'URL demandée ne correspond à aucune route de l'application.
              </p>
            </main>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
