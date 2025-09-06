import { Search, Calendar, Beaker } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBooking } from '@/hooks/useBooking'

export default function HeroSection() {
  const { openBookingForm } = useBooking()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header id="home" className="unimar-gradient-reverse text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6 animate-fade-in-up">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mr-4 glass">
              <Beaker className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance">
                Catálogo Interativo
              </h1>
              <p className="text-xl text-white/90">de Laboratórios UNIMAR</p>
            </div>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty leading-relaxed animate-fade-in">
            Explore os laboratórios de ponta da Universidade de Marília e descubra recursos 
            tecnológicos avançados para impulsionar sua formação acadêmica e pesquisa científica
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-slide-in-right">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              onClick={() => scrollToSection('labs')}
            >
              <Search className="mr-2 h-5 w-5" />
              Explorar Laboratórios
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              onClick={openBookingForm}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Visita
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
