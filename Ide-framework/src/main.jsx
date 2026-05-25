import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/*
 * main.jsx : point d'accroche React vers le DOM natif.
 * StrictMode active des avertissements supplémentaires en développement
 * (double-mount des effets pour détecter les effets non nettoyés).
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
