import { BarChart3, Clock, Star, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLaboratories } from '@/hooks/useLaboratories'
import { useReviews } from '@/hooks/useReviews'
import { useFavorites } from '@/hooks/useFavorites'

export default function StatisticsPanel() {
  const { allLaboratories } = useLaboratories()
  const { getAverageRating } = useReviews()
  const { favoritesCount } = useFavorites()

  // Calcular estatísticas
  const totalLabs = allLaboratories.length
  const openLabs = allLaboratories.filter(lab => lab.status === 'open').length
  const totalEquipment = allLaboratories.reduce((sum, lab) => 
    sum + lab.equipment.reduce((equipSum, equip) => equipSum + equip.quantity, 0), 0
  )
  
  // Laboratório mais popular (com mais favoritos)
  const mostPopularLab = allLaboratories.reduce((most, lab) => {
    const labRating = getAverageRating(lab.id)
    const mostRating = getAverageRating(most.id)
    return labRating > mostRating ? lab : most
  }, allLaboratories[0])

  // Distribuição por tipo
  const typeDistribution = allLaboratories.reduce((acc, lab) => {
    acc[lab.type] = (acc[lab.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Distribuição por curso
  const courseDistribution = allLaboratories.reduce((acc, lab) => {
    acc[lab.course] = (acc[lab.course] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const stats = [
    {
      title: 'Total de Laboratórios',
      value: totalLabs,
      icon: BarChart3,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Laboratórios Abertos',
      value: openLabs,
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Equipamentos Disponíveis',
      value: totalEquipment,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Favoritos Salvos',
      value: favoritesCount,
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Estatísticas dos Laboratórios</h2>
      
      {/* Cards de Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="hover-lift animate-fade-in-up">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Laboratório Mais Popular */}
      {mostPopularLab && (
        <Card className="hover-lift animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Laboratório Mais Popular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <mostPopularLab.icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{mostPopularLab.name}</h3>
                <p className="text-sm text-muted-foreground">{mostPopularLab.location}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">
                    {getAverageRating(mostPopularLab.id).toFixed(1)} ⭐
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Distribuição por Tipo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover-lift animate-fade-in-up">
          <CardHeader>
            <CardTitle>Distribuição por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(typeDistribution).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{type}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(count / totalLabs) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-fade-in-up">
          <CardHeader>
            <CardTitle>Distribuição por Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(courseDistribution).map(([course, count]) => (
                <div key={course} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{course}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-secondary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(count / totalLabs) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
