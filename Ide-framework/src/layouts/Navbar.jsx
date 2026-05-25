/**
 * Navbar.jsx — Barre de navigation permanente avec liens React Router.
 */

import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="Navigation principale">

        {/* Logo / Marque */}
        <div className="navbar-brand">
          <span className="logo-icon" aria-hidden="true">⚡</span>
          {/*
            <NavLink> génère une balise <a> accessible pour le SEO,
            mais intercepte le clic pour forcer le routage côté client.
            Contrainte Jalon 5 : JAMAIS de <a href="..."> pour la
            navigation interne (provoquerait un rechargement complet).
          */}
          <NavLink to="/" aria-label="Accueil TaskFlow">
            TaskFlow
          </NavLink>
        </div>

        {/* Liens de navigation */}
        <div className="nav-links">
          {/*
            className en tant que fonction → react-router-dom passe
            un objet { isActive } permettant le style conditionnel.
            isActive = true quand l'URL correspond exactement au "to".
          */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Dashboard
          </NavLink>
        </div>

      </nav>
    </header>
  )
}

export default Navbar
