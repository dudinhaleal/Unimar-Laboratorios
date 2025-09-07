import { useState } from 'react'
import { 
  Home, 
  Beaker, 
  Cpu, 
  MapPin, 
  Phone, 
  Calendar, 
  Menu, 
  X,
  Heart,
  Filter,
  BarChart3,
  Moon,
  Sun
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBooking } from '@/hooks/useBooking'
import { useFavorites } from '@/hooks/useFavorites'
import { useTheme } from '@/components/theme-provider'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openBookingForm } = useBooking()
  const { favoritesCount } = useFavorites()
  const { theme, setTheme } = useTheme()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const navigationItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'labs', label: 'Laboratórios', icon: Beaker },
    { id: 'resources', label: 'Recursos', icon: Cpu },
    { id: 'map', label: 'Localização', icon: MapPin },
    { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
  ]

  return (
    <nav className="unimar-gradient shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/unimar-logo.png" 
              alt="UNIMAR Logo" 
              className="h-10 w-auto object-contain" 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white hover:text-white/80 transition-colors flex items-center space-x-1"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-white hover:bg-white/10"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('labs')}
              className="text-white hover:bg-white/10"
            >
              <Filter className="h-4 w-4 mr-1" />
              Filtros
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('stats')}
              className="text-white hover:bg-white/10"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Stats
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('favorites')}
              className="text-white hover:bg-white/10"
            >
              <Heart className="h-4 w-4 mr-1" />
              {favoritesCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {favoritesCount}
                </span>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contato
            </Button>
            <Button
              onClick={openBookingForm}
              size="sm"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Agendar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-sm border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                )
              })}
              <div className="flex space-x-2 px-3 py-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contato
                </Button>
                <Button
                  onClick={() => {
                    openBookingForm()
                    setMobileMenuOpen(false)
                  }}
                  size="sm"
                  className="flex-1 bg-white text-primary hover:bg-white/90"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
