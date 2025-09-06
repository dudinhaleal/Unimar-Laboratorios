import { useState, useEffect } from 'react'

export interface Review {
  id: string
  labId: number
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
}

const REVIEWS_KEY = 'unimar-reviews'

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])

  // Carregar avaliações do localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem(REVIEWS_KEY)
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews))
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error)
      }
    }
  }, [])

  // Salvar avaliações no localStorage
  useEffect(() => {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
  }, [reviews])

  const addReview = (review: Omit<Review, 'id' | 'date' | 'helpful'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      helpful: 0
    }
    setReviews(prev => [...prev, newReview])
  }

  const getReviewsByLab = (labId: number) => {
    return reviews.filter(review => review.labId === labId)
  }

  const getAverageRating = (labId: number) => {
    const labReviews = getReviewsByLab(labId)
    if (labReviews.length === 0) return 0
    return labReviews.reduce((sum, review) => sum + review.rating, 0) / labReviews.length
  }

  const markHelpful = (reviewId: string) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    )
  }

  return {
    reviews,
    addReview,
    getReviewsByLab,
    getAverageRating,
    markHelpful
  }
}
