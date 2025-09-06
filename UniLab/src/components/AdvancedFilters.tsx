import { useState } from 'react'
import { Clock, Wrench, Users, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface AdvancedFilters {
  timeSlots: string[]
  equipmentTypes: string[]
  minCapacity: number
  maxCapacity: number
  availability: 'all' | 'available' | 'busy'
  sortBy: 'name' | 'rating' | 'capacity' | 'equipment'
}

interface AdvancedFiltersProps {
  filters: AdvancedFilters
  onFiltersChange: (filters: AdvancedFilters) => void
  onClose: () => void
}

const timeSlots = [
  '08:00-10:00',
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00',
  '16:00-18:00',
  '18:00-20:00',
  '20:00-22:00'
]

const equipmentTypes = [
  'Computadores',
  'Projetores',
  'Microscópios',
  'Impressoras 3D',
  'Osciloscópios',
  'Multímetros',
  'Kits Arduino',
  'Sensores',
  'Fontes de Alimentação'
]

export default function AdvancedFilters({ filters, onFiltersChange, onClose }: AdvancedFiltersProps) {
  const [localFilters, setLocalFilters] = useState<AdvancedFilters>(filters)

  const handleTimeSlotToggle = (timeSlot: string) => {
    const newTimeSlots = localFilters.timeSlots.includes(timeSlot)
      ? localFilters.timeSlots.filter(ts => ts !== timeSlot)
      : [...localFilters.timeSlots, timeSlot]
    
    setLocalFilters(prev => ({ ...prev, timeSlots: newTimeSlots }))
  }

  const handleEquipmentToggle = (equipment: string) => {
    const newEquipment = localFilters.equipmentTypes.includes(equipment)
      ? localFilters.equipmentTypes.filter(eq => eq !== equipment)
      : [...localFilters.equipmentTypes, equipment]
    
    setLocalFilters(prev => ({ ...prev, equipmentTypes: newEquipment }))
  }

  const handleCapacityChange = (values: number[]) => {
    setLocalFilters(prev => ({
      ...prev,
      minCapacity: values[0],
      maxCapacity: values[1]
    }))
  }

  const handleApply = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters: AdvancedFilters = {
      timeSlots: [],
      equipmentTypes: [],
      minCapacity: 0,
      maxCapacity: 100,
      availability: 'all',
      sortBy: 'name'
    }
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Filtros Avançados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Horários Disponíveis */}
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4" />
            Horários Disponíveis
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {timeSlots.map((timeSlot) => (
              <div key={timeSlot} className="flex items-center space-x-2">
                <Checkbox
                  id={timeSlot}
                  checked={localFilters.timeSlots.includes(timeSlot)}
                  onCheckedChange={() => handleTimeSlotToggle(timeSlot)}
                />
                <Label htmlFor={timeSlot} className="text-sm">
                  {timeSlot}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Tipos de Equipamentos */}
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <Wrench className="h-4 w-4" />
            Equipamentos Disponíveis
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {equipmentTypes.map((equipment) => (
              <div key={equipment} className="flex items-center space-x-2">
                <Checkbox
                  id={equipment}
                  checked={localFilters.equipmentTypes.includes(equipment)}
                  onCheckedChange={() => handleEquipmentToggle(equipment)}
                />
                <Label htmlFor={equipment} className="text-sm">
                  {equipment}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Capacidade */}
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4" />
            Capacidade: {localFilters.minCapacity} - {localFilters.maxCapacity} pessoas
          </Label>
          <Slider
            value={[localFilters.minCapacity, localFilters.maxCapacity]}
            onValueChange={handleCapacityChange}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        {/* Disponibilidade */}
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4" />
            Disponibilidade
          </Label>
          <Select
            value={localFilters.availability}
            onValueChange={(value: 'all' | 'available' | 'busy') => 
              setLocalFilters(prev => ({ ...prev, availability: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="available">Disponível</SelectItem>
              <SelectItem value="busy">Ocupado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ordenação */}
        <div>
          <Label className="flex items-center gap-2 mb-3">
            Ordenar por
          </Label>
          <Select
            value={localFilters.sortBy}
            onValueChange={(value: 'name' | 'rating' | 'capacity' | 'equipment') => 
              setLocalFilters(prev => ({ ...prev, sortBy: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="rating">Avaliação</SelectItem>
              <SelectItem value="capacity">Capacidade</SelectItem>
              <SelectItem value="equipment">Equipamentos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-2 pt-4">
          <Button onClick={handleApply} className="flex-1">
            Aplicar Filtros
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Limpar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
