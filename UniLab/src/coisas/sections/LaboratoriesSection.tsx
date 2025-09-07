import { MapPin, Heart, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/coisas/ui/card'
import { Badge } from '@/coisas/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/coisas/ui/dialog'
import { useLaboratories } from '@/hooks/useLaboratories'
import { useFavorites } from '@/hooks/useFavorites'
import { useReviews } from '@/hooks/useReviews'
import LaboratoryDetails from '@/coisas/LaboratoryDetails'

export default function LaboratoriesSection() {
  const { laboratories } = useLaboratories()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { getAverageRating } = useReviews()

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laboratories.map((lab) => {
            const IconComponent = lab.icon
            const rating = getAverageRating(lab.id)
            const favorite = isFavorite(lab.id)
            return (
              <Dialog key={lab.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift animate-fade-in-up">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{lab.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {lab.location}
                            </CardDescription>
                            {rating > 0 && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-muted-foreground">
                                  {rating.toFixed(1)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(lab.id)
                            }}
                            className={`p-1 rounded-full transition-colors ${
                              favorite 
                                ? 'text-red-500 hover:text-red-600' 
                                : 'text-gray-400 hover:text-red-500'
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
                          </button>
                          <Badge
                            variant={lab.status === 'open' ? 'default' : 'secondary'}
                            className={lab.status === 'open' ? 'bg-green-500' : 'bg-red-500'}
                          >
                            {lab.status === 'open' ? 'Aberto' : 'Fechado'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 text-pretty">
                        {lab.description.substring(0, 100)}...
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline">{lab.course}</Badge>
                        <Badge variant="outline">{lab.type}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      {lab.name}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {lab.location}
                    </DialogDescription>
                  </DialogHeader>

                  <LaboratoryDetails laboratory={lab} />
                </DialogContent>
              </Dialog>
            )
          })}
        </div>
      </div>
    </section>
  )
}
