/**
 * TaskCard.jsx — Composant de présentation d'une tâche.
 * Reçoit `task` en lecture seule et utilise <Link> pour la navigation SPA.
 */

import { Link } from 'react-router-dom'

// Renvoie les classes CSS pour un statut (fonction pure)
function getStatutStyle(statut) {
  switch (statut) {
    case 'En cours': return { badge: 'badge-doing', dot: 'dot-doing' }
    case 'Termine':  return { badge: 'badge-done',  dot: 'dot-done'  }
    default:         return { badge: 'badge-todo',  dot: 'dot-todo'  }
  }
}

/** @param {{ task: { id: number, titre: string, description: string, statut: string } }} props */
function TaskCard({ task }) {

  // Déstructuration des props
  const { id, titre, description, statut } = task
  const { badge, dot } = getStatutStyle(statut)

  return (
    <Link to={`/task/${id}`} className="task-card-link">
      <article className="task-card">

        <div className="task-card-header">
          <span className="task-title">{titre}</span>
          {/* Badge de statut : cercle coloré + libellé */}
          <span className={`task-badge ${badge}`}>
            <span className={`badge-dot ${dot}`} aria-hidden="true"></span>
            {statut}
          </span>
        </div>

        <p className="task-desc">{description}</p>

        <footer className="task-footer">
          <span className="task-id">#{id}</span>
          <span className="task-arrow">Voir le détail →</span>
        </footer>

      </article>
    </Link>
  )
}

export default TaskCard
