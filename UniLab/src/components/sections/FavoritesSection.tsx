import { Heart, Star, MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/hooks/useFavorites'
import { useLaboratories } from '@/hooks/useLaboratories'
import { useReviews } from '@/hooks/useReviews'

export default function FavoritesSection() {
  const { favorites, toggleFavorite } = useFavorites()
  const { allLaboratories } = useLaboratories()
  const { getAverageRating } = useReviews()

  const favoriteLabs = allLaboratories.filter(lab => favorites.includes(lab.id))

  if (favoriteLabs.length === 0) {
    return (
      <section id="favorites" className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Nenhum Favorito Ainda</h2>
            <p className="text-muted-foreground mb-6">
              Adicione laboratórios aos seus favoritos clicando no coração ❤️
            </p>
            <Button onClick={() => document.getElementById('labs')?.scrollIntoView({ behavior: 'smooth' })}>
              Explorar Laboratórios
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="favorites" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            Meus Favoritos
          </h2>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {favoriteLabs.length} laboratório{favoriteLabs.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteLabs.map((lab) => {
            const IconComponent = lab.icon
            const rating = getAverageRating(lab.id)
            return (
              <Card key={lab.id} className="hover-lift animate-fade-in-up">
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
                    <button
                      onClick={() => toggleFavorite(lab.id)}
                      className="p-1 rounded-full text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 text-pretty">
                    {lab.description.substring(0, 100)}...
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">{lab.course}</Badge>
                    <Badge variant="outline">{lab.type}</Badge>
                    <Badge
                      variant={lab.status === 'open' ? 'default' : 'secondary'}
                      className={lab.status === 'open' ? 'bg-green-500' : 'bg-red-500'}
                    >
                      {lab.status === 'open' ? 'Aberto' : 'Fechado'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
