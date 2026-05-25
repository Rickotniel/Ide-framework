/**
 * Dashboard.jsx — Orchestrateur principal : stocke les tâches et affiche la liste.
 * Responsabilités : état des tâches, persist. via `useLocalStorage`, ouverture du formulaire.
 */

import { useState }    from 'react'
import TaskCard        from '../components/TaskCard'
import TaskForm        from '../components/TaskForm'
import { useLocalStorage } from '../hooks/useLocalStorage'

// Données initiales de démonstration 
// Structure conforme à la consigne du TD.
const TACHES_INITIALES = [
  {
    id:          1,
    titre:       "Conception de l'ontologie",
    description: "Rédiger les axiomes de base du domaine et définir les relations entre concepts.",
    statut:      'A faire',
  },
  {
    id:          2,
    titre:       'Implémentation du routeur SPA',
    description: 'Configurer React Router DOM avec les routes statiques et dynamiques (/task/:id).',
    statut:      'En cours',
  },

]

function Dashboard() {

  // Persistance via le hook custom (même interface que useState)
  const [tasks, setTasks] = useLocalStorage('taskflow_data', TACHES_INITIALES)

  // État local pour l'affichage/masquage du formulaire
  // (état éphémère de l'interface → useState simple, pas besoin de persister)
  const [showForm, setShowForm] = useState(false)

  // Lifting State Up : ajoute une tâche de manière immuable
  const handleAddTask = (nouvelleTache) => {
    setTasks(prev => [...prev, nouvelleTache])
    setShowForm(false)
  }

  // Calcul des statistiques par statut
  const stats = {
    todo:  tasks.filter(t => t.statut === 'A faire').length,
    doing: tasks.filter(t => t.statut === 'En cours').length,
    done:  tasks.filter(t => t.statut === 'Termine').length,
  }

  return (
    <main className="page">

      {/* ── En-tête de page ── */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Tableau de bord</h1>
          <p className="page-subtitle">
            {tasks.length} tâche{tasks.length !== 1 ? 's' : ''} au total
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowForm(true)}
          aria-haspopup="dialog"
        >
          ＋ Nouvelle tâche
        </button>
      </div>

      {/* Statistiques visuelles par statut */}
      <div className="stats-grid" role="region" aria-label="Statistiques des tâches">
        <div className="stat-card stat-todo">
          <span className="stat-number">{stats.todo}</span>
          <span className="stat-label">À faire</span>
        </div>
        <div className="stat-card stat-doing">
          <span className="stat-number">{stats.doing}</span>
          <span className="stat-label">En cours</span>
        </div>
        <div className="stat-card stat-done">
          <span className="stat-number">{stats.done}</span>
          <span className="stat-label">Terminées</span>
        </div>
      </div>

      {/* Rendu de la liste via .map() — utiliser key={task.id} */}
      <section className="tasks-list" aria-label="Liste des tâches">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>Aucune tâche pour le moment. Commencez par en créer une !</p>
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              ＋ Créer la première tâche
            </button>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}   // ← OBLIGATOIRE et UNIQUE (id, pas l'index)
              task={task}     // ← Passage de la tâche entière via prop
            />
          ))
        )}
      </section>

      {/* Formulaire monté conditionnellement */}
      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}           // Lifting State Up
          onCancel={() => setShowForm(false)}  // Fermeture sans soumission
        />
      )}

    </main>
  )
}

export default Dashboard
