import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'unimar-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([])

  // carregar favoritos do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY)
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error)
      }
    }
  }, [])

  // salvar favoritos no localStorage
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (labId: number) => {
    setFavorites(prev => 
      prev.includes(labId) 
        ? prev.filter(id => id !== labId)
        : [...prev, labId]
    )
  }

  const isFavorite = (labId: number) => favorites.includes(labId)

  const clearFavorites = () => setFavorites([])

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  }
}
