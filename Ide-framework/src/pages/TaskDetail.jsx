/**
 * TaskDetail.jsx — Fiche détaillée d'une tâche (/task/:id).
 * Utilise `useParams`, `useNavigate` et `useLocalStorage`.
 */

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLocalStorage }        from '../hooks/useLocalStorage'

// Réimportation des données initiales comme valeur de secours
// (nécessaire si localStorage est vide — premier lancement)
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
  {
    id:          3,
    titre:       'Déploiement sur Vercel',
    description: 'Exécuter npm run build, configurer le domaine et déployer le dossier /dist.',
    statut:      'Termine',
  },
]

// Utilitaire de style (identique à TaskCard, peut être extrait dans utils/)
function getStatutStyle(statut) {
  switch (statut) {
    case 'En cours': return { badge: 'badge-doing', dot: 'dot-doing' }
    case 'Termine':  return { badge: 'badge-done',  dot: 'dot-done'  }
    default:         return { badge: 'badge-todo',  dot: 'dot-todo'  }
  }
}

function TaskDetail() {

  // Récupère l'id depuis l'URL et la fonction de navigation
  const { id } = useParams()
  const navigate = useNavigate()

  // Lecture des tâches persistées (même clé que Dashboard)
  const [tasks, setTasks] = useLocalStorage('taskflow_data', TACHES_INITIALES)

  // État local pour activer le mode édition du statut
  const [editing, setEditing] = useState(false)

  // Recherche de la tâche correspondant à l'id de l'URL
  const task = tasks.find(t => String(t.id) === String(id))

  // Mise à jour du statut et persistance locale
  const handleStatutChange = (e) => {
    const nouveauStatut = e.target.value
    setTasks(prevTasks => prevTasks.map(t => (
      t.id === task.id ? { ...t, statut: nouveauStatut } : t
    )))
    // Quitte le mode édition après enregistrement
    setEditing(false)
  }
  // Rendu conditionnel : tâche introuvable
  if (!task) {
    return (
      <main className="page">
        <div className="not-found">
          <div className="code" aria-hidden="true">404</div>
          <h2>Tâche introuvable</h2>
          <p>L'identifiant <code>#{id}</code> ne correspond à aucune tâche existante.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            ← Retour au Dashboard
          </button>
        </div>
      </main>
    )
  }

  const { badge, dot } = getStatutStyle(task.statut)

  return (
    <main className="page">

      {/* ── Bouton de navigation retour ── */}
      {/*
        useNavigate(-1) équivaudrait à window.history.back().
        navigate('/') est plus explicite et garantit d'atterrir
        sur le Dashboard même si l'utilisateur a ouvert l'URL
        directement (sans historique précédent).
      */}
      <button className="btn-back" onClick={() => navigate('/')}>
        ← Retour au Dashboard
      </button>

      {/* ── Fiche détaillée de la tâche ── */}
      <article className="detail-card">

        {/* En-tête : id + badge de statut + titre */}
        <div className="detail-head">
          <div className="detail-meta">
            <span className="detail-id">#{task.id}</span>
            <span className={`task-badge ${badge}`}>
              <span className={`badge-dot ${dot}`} aria-hidden="true"></span>
              {task.statut}
            </span>
          </div>
          <h1 className="detail-title">{task.titre}</h1>
        </div>

        {/* Corps : description + informations structurées */}
        <div className="detail-body">

          <h2>Description</h2>
          <p className="detail-desc">
            {task.description || 'Aucune description fournie pour cette tâche.'}
          </p>

          <h2>Informations</h2>
          <div className="detail-info">
            <div className="info-item">
              <span className="info-label">Identifiant unique</span>
              <span className="info-val" style={{ fontFamily: 'monospace' }}>
                {task.id}
              </span>
            </div>
            <div className="info-item">
              <label className="info-label" htmlFor="statut-select">Statut actuel</label>
              <div className="info-val info-edit">
                <select
                  id="statut-select"
                  className="info-select"
                  value={task.statut}
                  onChange={handleStatutChange}
                  aria-label="Modifier le statut de la tâche"
                  disabled={!editing}
                >
                  <option value="A faire">À faire</option>
                  <option value="En cours">En cours</option>
                  <option value="Termine">Terminé</option>
                </select>

                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => setEditing(prev => !prev)}
                  aria-pressed={editing}
                >
                  {editing ? 'Annuler' : 'Modifier'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </article>

    </main>
  )
}

export default TaskDetail
