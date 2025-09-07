import { Search, Calendar, Filter } from 'lucide-react'
import { Input } from '@/coisas/ui/input'
import { Button } from '@/coisas/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/coisas/ui/select'
import { useLaboratories } from '@/hooks/useLaboratories'
import { useBooking } from '@/hooks/useBooking'
import { useNotifications } from '@/hooks/useNotifications'
import { useState } from 'react'
import AdvancedFilters from '@/coisas/AdvancedFilters'
import { AdvancedFilters as AdvancedFiltersType } from '@/coisas/AdvancedFilters'

export default function SearchSection() {
  const { filters, courses, types, updateFilters } = useLaboratories()
  const { openBookingForm } = useBooking()
  const { showSuccess } = useNotifications()
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFiltersType>({
    timeSlots: [],
    equipmentTypes: [],
    minCapacity: 0,
    maxCapacity: 100,
    availability: 'all',
    sortBy: 'name'
  })

  return (
    <section id="labs" className="py-8 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar laboratórios..."
              value={filters.searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilters({ searchTerm: e.target.value })}
              className="pl-10"
            />
          </div>

          <Select 
            value={filters.selectedCourse} 
            onValueChange={(value: string) => updateFilters({ selectedCourse: value })}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrar por curso" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course === 'all' ? 'Todos os cursos' : course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.selectedType} 
            onValueChange={(value: string) => updateFilters({ selectedType: value })}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Tipo de laboratório" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === 'all' ? 'Todos os tipos' : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            onClick={() => setShowAdvancedFilters(true)} 
            variant="outline" 
            className="w-full md:w-auto"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros Avançados
          </Button>

          <Button onClick={openBookingForm} className="w-full md:w-auto">
            <Calendar className="mr-2 h-4 w-4" />
            Agendar Visita
          </Button>
        </div>
      </div>

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <AdvancedFilters
              filters={advancedFilters}
              onFiltersChange={setAdvancedFilters}
              onClose={() => setShowAdvancedFilters(false)}
            />
          </div>
        </div>
      )}
    </section>
  )
}
