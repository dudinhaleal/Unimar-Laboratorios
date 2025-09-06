import { Clock, User } from 'lucide-react'
import { Laboratory } from '@/types'
import ReviewSection from '@/components/ReviewSection'

interface LaboratoryDetailsProps {
  laboratory: Laboratory
}

export default function LaboratoryDetails({ laboratory }: LaboratoryDetailsProps) {
  return (
    <div className="space-y-6">
      <img
        src={laboratory.images[0] || '/placeholder.svg'}
        alt={laboratory.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <div>
        <h4 className="font-semibold mb-2">Descrição</h4>
        <p className="text-muted-foreground text-pretty">{laboratory.description}</p>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Equipamentos Disponíveis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {laboratory.equipment.map((equipment, index) => {
            const EquipIcon = equipment.icon
            return (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <EquipIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{equipment.name}</p>
                  <p className="text-sm text-muted-foreground">Qtd: {equipment.quantity}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Horário de Funcionamento
          </h4>
          <p className="text-muted-foreground">{laboratory.schedule}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <User className="h-4 w-4" />
            Responsável
          </h4>
          <p className="text-muted-foreground">{laboratory.responsible}</p>
        </div>
      </div>

      <div className="mt-8">
        <ReviewSection labId={laboratory.id} labName={laboratory.name} />
      </div>
    </div>
  )
}
