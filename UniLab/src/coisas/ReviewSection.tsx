import { useState } from 'react'
import { Star, ThumbsUp, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useReviews } from '@/hooks/useReviews'
import { useNotifications } from '@/hooks/useNotifications'

interface ReviewSectionProps {
  labId: number
  labName: string
}

export default function ReviewSection({ labId, labName }: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 0,
    comment: ''
  })
  
  const { getReviewsByLab, getAverageRating, addReview, markHelpful } = useReviews()
  const { showSuccess, showError } = useNotifications()
  
  const reviews = getReviewsByLab(labId)
  const averageRating = getAverageRating(labId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newReview.userName.trim() || !newReview.comment.trim() || newReview.rating === 0) {
      showError('Erro', 'Preencha todos os campos obrigatórios')
      return
    }

    addReview({
      labId,
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment
    })

    showSuccess('Sucesso', 'Avaliação adicionada com sucesso!')
    setNewReview({ userName: '', rating: 0, comment: '' })
    setShowForm(false)
  }

  const StarRating = ({ rating, interactive = false, onRatingChange }: { 
    rating: number, 
    interactive?: boolean, 
    onRatingChange?: (rating: number) => void 
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange?.(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Avaliações</h3>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} ({reviews.length} avaliações)
            </span>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Avaliar'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Avaliar {labName}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="userName">Seu nome</Label>
                <Input
                  id="userName"
                  value={newReview.userName}
                  onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                  placeholder="Digite seu nome"
                  required
                />
              </div>
              
              <div>
                <Label>Avaliação</Label>
                <StarRating
                  rating={newReview.rating}
                  interactive
                  onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                />
              </div>
              
              <div>
                <Label htmlFor="comment">Comentário</Label>
                <Textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Conte sua experiência com este laboratório..."
                  rows={3}
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">Enviar Avaliação</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhuma avaliação ainda. Seja o primeiro a avaliar!
          </p>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{review.userName}</span>
                    <StarRating rating={review.rating} />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p className="mt-2 text-sm">{review.comment}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markHelpful(review.id)}
                    className="text-xs"
                  >
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Útil ({review.helpful})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
