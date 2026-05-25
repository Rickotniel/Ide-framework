import { useState } from 'react'

/**
 * TaskForm.jsx — Formulaire contrôlé pour créer une nouvelle tâche.
 */
function TaskForm({ onAddTask, onCancel }) {
  const [form, setForm] = useState({ titre: '', description: '', statut: 'A faire' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.titre.trim()) {
      alert('Le titre de la tâche est obligatoire.')
      return
    }

    const nouvelleTache = {
      id: Date.now(),
      titre: form.titre.trim(),
      description: form.description.trim(),
      statut: form.statut,
    }

    onAddTask(nouvelleTache)
    setForm({ titre: '', description: '', statut: 'A faire' })
  }

  return (
    <div className="form-overlay" role="dialog" aria-modal="true" aria-label="Nouvelle tâche">
      <div className="form-box">
        <div className="form-header">
          <h2>Nouvelle tâche</h2>
          <button type="button" className="btn-close" onClick={onCancel} aria-label="Fermer le formulaire">✕</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="tf-titre">Titre *</label>
            <input id="tf-titre" type="text" name="titre" value={form.titre} onChange={handleChange} placeholder="Ex : Implémenter le module authentification" required autoFocus />
          </div>

          <div className="form-group">
            <label htmlFor="tf-desc">Description</label>
            <textarea id="tf-desc" name="description" value={form.description} onChange={handleChange} placeholder="Décrivez la tâche en détail..." rows={3} />
          </div>

          <div className="form-group">
            <label htmlFor="tf-statut">Statut initial</label>
            <select id="tf-statut" name="statut" value={form.statut} onChange={handleChange}>
              <option value="A faire">À faire</option>
              <option value="En cours">En cours</option>
              <option value="Termine">Terminé</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>Annuler</button>
            <button type="submit" className="btn-primary">＋ Ajouter la tâche</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
