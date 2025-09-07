import { 
  GraduationCap, 
  Home, 
  Beaker, 
  Cpu, 
  MapPin, 
  Mail, 
  Phone 
} from 'lucide-react'

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const quickLinks = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'labs', label: 'Laboratórios', icon: Beaker },
    { id: 'resources', label: 'Recursos', icon: Cpu },
    { id: 'map', label: 'Localização', icon: MapPin },
  ]

  return (
    <footer className="unimar-gradient text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-3">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">UNIMAR</h3>
                <p className="text-white/80 text-sm">Universidade de Marília</p>
              </div>
            </div>
            <p className="text-white/80 text-pretty">
              Conectando estudantes aos recursos tecnológicos de ponta para uma formação acadêmica de excelência.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-white/80 hover:text-white transition-colors flex items-center justify-center md:justify-start space-x-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{link.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-end text-white/80">
                <Mail className="h-4 w-4 mr-2" />
                <span>labs@unimar.br</span>
              </div>
              <div className="flex items-center justify-center md:justify-end text-white/80">
                <Phone className="h-4 w-4 mr-2" />
                <span>(14) 2105-4000</span>
              </div>
              <div className="flex items-center justify-center md:justify-end text-white/80">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Marília - SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/80">
            2025 Universidade de Marília - UNIMAR.
          </p>
        </div>
      </div>
    </footer>
  )
}
