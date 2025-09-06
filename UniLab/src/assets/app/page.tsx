"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Search,
  MapPin,
  Clock,
  User,
  Calendar,
  Beaker,
  Cpu,
  Wrench,
  Printer,
  Gamepad2,
  Camera,
  Zap,
  Menu,
  X,
  GraduationCap,
  Phone,
  Mail,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data for laboratories
const laboratories = [
  {
    id: 1,
    name: "Laboratório de Informática I",
    icon: Cpu,
    location: "Bloco A - Sala 101",
    status: "open",
    course: "Ciência da Computação",
    type: "Informática",
    description:
      "Laboratório equipado com computadores de última geração para desenvolvimento de software e programação.",
    equipment: [
      { name: "Computadores Dell", icon: Cpu, quantity: 30 },
      { name: "Projetores", icon: Camera, quantity: 2 },
      { name: "Quadro Interativo", icon: Zap, quantity: 1 },
    ],
    schedule: "Segunda a Sexta: 8h às 22h",
    responsible: "Prof. Dr. João Silva",
    images: ["/computer-lab.png"],
  },
  {
    id: 3,
    name: "Laboratório de Robótica",
    icon: Gamepad2,
    location: "Bloco C - Sala 301",
    status: "open",
    course: "Engenharia",
    type: "Robótica",
    description: "Espaço dedicado ao desenvolvimento de projetos de robótica e automação industrial.",
    equipment: [
      { name: "Kits Arduino", icon: Cpu, quantity: 25 },
      { name: "Impressoras 3D", icon: Printer, quantity: 5 },
      { name: "Sensores Diversos", icon: Zap, quantity: 100 },
    ],
    schedule: "Segunda a Sábado: 8h às 20h",
    responsible: "Prof. Dr. Carlos Oliveira",
    images: ["/robotics-lab.jpg"],
  },
  {
    id: 5,
    name: "Laboratório de Eletrônica",
    icon: Zap,
    location: "Bloco E - Sala 201",
    status: "open",
    course: "Engenharia Elétrica",
    type: "Eletrônica",
    description: "Laboratório para desenvolvimento e teste de circuitos eletrônicos e sistemas embarcados.",
    equipment: [
      { name: "Osciloscópios", icon: Zap, quantity: 15 },
      { name: "Multímetros", icon: Wrench, quantity: 30 },
      { name: "Fontes de Alimentação", icon: Zap, quantity: 20 },
    ],
    schedule: "Segunda a Sexta: 7h às 21h",
    responsible: "Prof. Dr. Roberto Lima",
    images: ["/electronics-lab.jpg"],
  },
]

const specialResources = [
  {
    title: "Impressoras 3D Profissionais",
    description: "5 impressoras 3D de alta precisão para prototipagem",
    icon: Printer,
    color: "bg-accent",
  },
  {
    title: "Kits de Robótica Avançados",
    description: "Equipamentos Arduino, Raspberry Pi e sensores IoT",
    icon: Gamepad2,
    color: "bg-primary",
  },
  {
    title: "Servidores de Alto Desempenho",
    description: "Cluster computacional para processamento intensivo",
    icon: Cpu,
    color: "bg-secondary",
  },
]

export default function UnimarLabsCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLab, setSelectedLab] = useState<(typeof laboratories)[0] | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bookingData, setBookingData] = useState({
    name: "",
    course: "",
    laboratory: "",
    date: "",
    time: "",
    purpose: "",
  })
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const filteredLabs = laboratories.filter((lab) => {
    const matchesSearch =
      lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "all" || lab.course === selectedCourse
    const matchesType = selectedType === "all" || lab.type === selectedType

    return matchesSearch && matchesCourse && matchesType
  })

  const courses = ["all", ...new Set(laboratories.map((lab) => lab.course))]
  const types = ["all", ...new Set(laboratories.map((lab) => lab.type))]

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingConfirmed(true)
    setTimeout(() => {
      setShowBookingForm(false)
      setBookingConfirmed(false)
      setBookingData({
        name: "",
        course: "",
        laboratory: "",
        date: "",
        time: "",
        purpose: "",
      })
    }, 3000)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    // Load Mapbox GL JS script
    const script = document.createElement("script")
    script.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"
    script.async = true
    document.head.appendChild(script)

    // Load Mapbox CSS
    const link = document.createElement("link")
    link.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    script.onload = () => {
      // Initialize map after script loads
      if (typeof window !== "undefined" && (window as any).mapboxgl) {
        const mapboxgl = (window as any).mapboxgl
        mapboxgl.accessToken =
          "pk.eyJ1IjoiY2F1ZWgxcDNyIiwiYSI6ImNsbG8zMDBubDA1bXYzZW4xY3J1aW56cjkifQ.BW8sXRQtfPcAY6zkrsVnRg"

        const map = new mapboxgl.Map({
          container: "unimar-map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [-49.96455, -22.23669], // Coordenadas de Marília, SP
          zoom: 16,
          interactive: true,
        })

        // Add main campus marker
        const mainMarker = new mapboxgl.Marker({
          color: "#004AAD",
        })
          .setLngLat([-49.96455, -22.23669])
          .addTo(map)

        // Add popup to main marker
        const mainPopup = new mapboxgl.Popup({
          offset: 25,
        }).setHTML(`
          <div style="padding: 10px; font-family: 'Inter', sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #004AAD; font-size: 16px; font-weight: 600;">UNIMAR - Campus Principal</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">Universidade de Marília</p>
            <p style="margin: 4px 0 0 0; color: #666; font-size: 12px;">Localização aproximada dos laboratórios</p>
          </div>
        `)

        mainMarker.setPopup(mainPopup)

        // Add laboratory markers
        const labLocations = [
          { name: "Lab. Informática I", coords: [-49.96465, -22.23659], block: "Bloco A" },
          { name: "Lab. Robótica", coords: [-49.96445, -22.23679], block: "Bloco C" },
          { name: "Lab. Eletrônica", coords: [-49.96475, -22.23669], block: "Bloco E" },
        ]

        labLocations.forEach((lab) => {
          const labMarker = new mapboxgl.Marker({
            color: "#0084DC",
            scale: 0.8,
          })
            .setLngLat(lab.coords)
            .addTo(map)

          const labPopup = new mapboxgl.Popup({
            offset: 25,
          }).setHTML(`
            <div style="padding: 8px; font-family: 'Inter', sans-serif;">
              <h4 style="margin: 0 0 4px 0; color: #0084DC; font-size: 14px; font-weight: 600;">${lab.name}</h4>
              <p style="margin: 0; color: #666; font-size: 12px;">${lab.block}</p>
            </div>
          `)

          labMarker.setPopup(labPopup)
        })

        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl(), "top-right")
      }
    }

    return () => {
      // Cleanup
      document.head.removeChild(script)
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <nav className="unimar-gradient shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="/unimar-logo.png" alt="UNIMAR Logo" className="h-10 w-auto object-contain" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-white hover:text-white/80 transition-colors flex items-center space-x-1"
              >
                <Home className="h-4 w-4" />
                <span>Início</span>
              </button>
              <button
                onClick={() => scrollToSection("labs")}
                className="text-white hover:text-white/80 transition-colors flex items-center space-x-1"
              >
                <Beaker className="h-4 w-4" />
                <span>Laboratórios</span>
              </button>
              <button
                onClick={() => scrollToSection("resources")}
                className="text-white hover:text-white/80 transition-colors flex items-center space-x-1"
              >
                <Cpu className="h-4 w-4" />
                <span>Recursos</span>
              </button>
              <button
                onClick={() => scrollToSection("map")}
                className="text-white hover:text-white/80 transition-colors flex items-center space-x-1"
              >
                <MapPin className="h-4 w-4" />
                <span>Localização</span>
              </button>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Phone className="h-4 w-4 mr-2" />
                Contato
              </Button>
              <Button
                onClick={() => setShowBookingForm(true)}
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
                <button
                  onClick={() => scrollToSection("home")}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Home className="h-4 w-4" />
                    <span>Início</span>
                  </div>
                </button>
                <button
                  onClick={() => scrollToSection("labs")}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Beaker className="h-4 w-4" />
                    <span>Laboratórios</span>
                  </div>
                </button>
                <button
                  onClick={() => scrollToSection("resources")}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-4 w-4" />
                    <span>Recursos</span>
                  </div>
                </button>
                <button
                  onClick={() => scrollToSection("map")}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Localização</span>
                  </div>
                </button>
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
                      setShowBookingForm(true)
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

      <header id="home" className="unimar-gradient-reverse text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mr-4">
                <Beaker className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance">Catálogo Interativo</h1>
                <p className="text-xl text-white/90">de Laboratórios UNIMAR</p>
              </div>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty leading-relaxed">
              Explore os laboratórios de ponta da Universidade de Marília e descubra recursos tecnológicos avançados
              para impulsionar sua formação acadêmica e pesquisa científica
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold"
                onClick={() => scrollToSection("labs")}
              >
                <Search className="mr-2 h-5 w-5" />
                Explorar Laboratórios
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                onClick={() => setShowBookingForm(true)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Agendar Visita
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <section id="labs" className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar laboratórios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por curso" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course === "all" ? "Todos os cursos" : course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tipo de laboratório" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "all" ? "Todos os tipos" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={() => setShowBookingForm(true)} className="w-full md:w-auto">
              <Calendar className="mr-2 h-4 w-4" />
              Agendar Visita
            </Button>
          </div>
        </div>
      </section>

      {/* Laboratory Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLabs.map((lab) => {
              const IconComponent = lab.icon
              return (
                <Dialog key={lab.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{lab.name}</CardTitle>
                              <CardDescription className="flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                {lab.location}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge
                            variant={lab.status === "open" ? "default" : "secondary"}
                            className={lab.status === "open" ? "bg-green-500" : "bg-red-500"}
                          >
                            {lab.status === "open" ? "Aberto" : "Fechado"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3 text-pretty">
                          {lab.description.substring(0, 100)}...
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline">{lab.course}</Badge>
                          <Badge variant="outline">{lab.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        {lab.name}
                      </DialogTitle>
                      <DialogDescription className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {lab.location}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      <img
                        src={lab.images[0] || "/placeholder.svg"}
                        alt={lab.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />

                      <div>
                        <h4 className="font-semibold mb-2">Descrição</h4>
                        <p className="text-muted-foreground text-pretty">{lab.description}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Equipamentos Disponíveis</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {lab.equipment.map((equipment, index) => {
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
                          <p className="text-muted-foreground">{lab.schedule}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Responsável
                          </h4>
                          <p className="text-muted-foreground">{lab.responsible}</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </div>
      </section>

      {/* Special Resources */}
      <section id="resources" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-balance">Recursos Especiais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialResources.map((resource, index) => {
              const IconComponent = resource.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`inline-flex p-4 rounded-full ${resource.color} mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 text-balance">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{resource.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="map" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-balance">Localização dos Laboratórios</h2>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Map Header */}
            <div className="bg-gradient-to-r from-[#004AAD] to-[#0084DC] text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6" />
                  <div>
                    <h3 className="text-lg font-semibold">Mapa Interativo do Campus</h3>
                    <p className="text-white/90 text-sm">Explore a localização dos laboratórios</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#004AAD] rounded-full"></div>
                    <span>Campus Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#0084DC] rounded-full"></div>
                    <span>Laboratórios</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Container */}
            <div id="unimar-map" className="w-full h-96 md:h-[500px]" style={{ minHeight: "400px" }} />

            {/* Map Footer with Instructions */}
            <div className="bg-[#EFEFEF] p-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-[#283146]">
                  <div className="w-5 h-5 bg-[#004AAD] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">i</span>
                  </div>
                  <span>Clique nos marcadores para ver informações detalhadas</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#283146]">
                  <span>📍 UNIMAR - Av. Hygino Muzzi Filho, 1001</span>
                  <span>📞 (14) 2105-4000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Map Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-[#004AAD] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Localização Precisa</h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  Encontre facilmente cada laboratório no campus da UNIMAR
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-[#0084DC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Horários de Funcionamento</h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  Consulte os horários de cada laboratório antes da sua visita
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-[#283146] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Agendamento Online</h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  Agende sua visita aos laboratórios de forma rápida e prática
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar Visita ao Laboratório</DialogTitle>
            <DialogDescription>Preencha os dados para solicitar uma visita aos laboratórios</DialogDescription>
          </DialogHeader>

          {bookingConfirmed ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Agendamento Confirmado!</h3>
              <p className="text-muted-foreground text-pretty">
                Sua solicitação foi enviada. Você receberá uma confirmação em breve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="course">Curso</Label>
                <Select
                  value={bookingData.course}
                  onValueChange={(value) => setBookingData({ ...bookingData, course: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course === "all" ? "Selecione seu curso" : course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="laboratory">Laboratório</Label>
                <Select
                  value={bookingData.laboratory}
                  onValueChange={(value) => setBookingData({ ...bookingData, laboratory: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o laboratório" />
                  </SelectTrigger>
                  <SelectContent>
                    {laboratories.map((lab) => (
                      <SelectItem key={lab.id} value={lab.name}>
                        {lab.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="purpose">Finalidade da Visita</Label>
                <Textarea
                  id="purpose"
                  placeholder="Descreva o motivo da sua visita..."
                  value={bookingData.purpose}
                  onChange={(e) => setBookingData({ ...bookingData, purpose: e.target.value })}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                Confirmar Agendamento
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

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
                <button
                  onClick={() => scrollToSection("home")}
                  className="block w-full text-white/80 hover:text-white transition-colors"
                >
                  Início
                </button>
                <button
                  onClick={() => scrollToSection("labs")}
                  className="block w-full text-white/80 hover:text-white transition-colors"
                >
                  Laboratórios
                </button>
                <button
                  onClick={() => scrollToSection("resources")}
                  className="block w-full text-white/80 hover:text-white transition-colors"
                >
                  Recursos
                </button>
                <button
                  onClick={() => scrollToSection("map")}
                  className="block w-full text-white/80 hover:text-white transition-colors"
                >
                  Localização
                </button>
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
            <p className="text-white/80">© 2024 Universidade de Marília - UNIMAR. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
