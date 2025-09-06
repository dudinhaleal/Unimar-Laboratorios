import { LucideIcon } from 'lucide-react'

export interface Laboratory {
  id: number
  name: string
  icon: LucideIcon
  location: string
  status: 'open' | 'closed'
  course: string
  type: string
  description: string
  equipment: Equipment[]
  schedule: string
  responsible: string
  images: string[]
}

export interface Equipment {
  name: string
  icon: LucideIcon
  quantity: number
}

export interface SpecialResource {
  title: string
  description: string
  icon: LucideIcon
  color: string
}

export interface BookingData {
  name: string
  course: string
  laboratory: string
  date: string
  time: string
  purpose: string
}

export interface FilterState {
  searchTerm: string
  selectedCourse: string
  selectedType: string
}

export interface LabLocation {
  name: string
  coords: [number, number]
  block: string
}
