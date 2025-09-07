import { Card, CardContent } from '@/components/ui/card'
import { specialResources } from '@/data/laboratories'

export default function ResourcesSection() {
  return (
    <section id="resources" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-balance">
          Recursos Especiais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialResources.map((resource, index) => {
            const IconComponent = resource.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow hover-lift animate-fade-in-up">
                <CardContent className="pt-6">
                  <div className={`inline-flex p-4 rounded-full ${resource.color} mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-balance">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {resource.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
