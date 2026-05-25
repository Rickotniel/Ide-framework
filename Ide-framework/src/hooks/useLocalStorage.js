/**
 * useLocalStorage.js — Hook simple pour persister un state dans localStorage.
 * Retourne [state, setState] identique à useState.
 */

import { useState, useEffect } from 'react'

/**
 * @param {string} key         - Clé de stockage dans localStorage
 * @param {*}      valeurInit  - Valeur par défaut si rien n'est stocké
 * @returns {[*, Function]}    - [état courant, fonction de mise à jour]
 */
export function useLocalStorage(key, valeurInit) {

  // Initialisation lazy : lit localStorage une seule fois au montage
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : valeurInit
    } catch (erreur) {
      // JSON.parse peut lever une exception sur des données corrompues
      console.warn(`useLocalStorage : erreur de lecture pour la clé "${key}"`, erreur)
      return valeurInit
    }
  })

  // Sérialise et écrit dans localStorage après chaque changement de state
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (erreur) {
      console.warn(`useLocalStorage : erreur d'écriture pour la clé "${key}"`, erreur)
    }
  }, [key, state]) // Dépendances : s'exécute si key ou state change

  // Même interface qu'un useState classique
  return [state, setState]
}
