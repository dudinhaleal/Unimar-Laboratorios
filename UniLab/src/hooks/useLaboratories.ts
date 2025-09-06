import { useState, useMemo } from 'react'
import { FilterState } from '@/types'
import { laboratories } from '@/data/laboratories'

export function useLaboratories() {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedCourse: 'all',
    selectedType: 'all',
  })

  const filteredLaboratories = useMemo(() => {
    return laboratories.filter((lab) => {
      const matchesSearch =
        lab.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        lab.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      const matchesCourse = filters.selectedCourse === 'all' || lab.course === filters.selectedCourse
      const matchesType = filters.selectedType === 'all' || lab.type === filters.selectedType

      return matchesSearch && matchesCourse && matchesType
    })
  }, [filters])

  const courses = useMemo(() => {
    return ['all', ...new Set(laboratories.map((lab) => lab.course))]
  }, [])

  const types = useMemo(() => {
    return ['all', ...new Set(laboratories.map((lab) => lab.type))]
  }, [])

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      selectedCourse: 'all',
      selectedType: 'all',
    })
  }

  return {
    laboratories: filteredLaboratories,
    allLaboratories: laboratories,
    courses,
    types,
    filters,
    updateFilters,
    resetFilters,
  }
}
