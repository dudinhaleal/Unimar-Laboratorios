import { useEffect } from 'react'
import { MapPin, Clock, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function MapSection() {
  useEffect(() => {
    // Load Mapbox GL JS script
    const script = document.createElement('script')
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js'
    script.async = true
    document.head.appendChild(script)

    // Load Mapbox CSS
    const link = document.createElement('link')
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    script.onload = () => {
      // Initialize map after script loads
      if (typeof window !== 'undefined' && (window as any).mapboxgl) {
        const mapboxgl = (window as any).mapboxgl
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2F1ZWgxcDNyIiwiYSI6ImNsbG8zMDBubDA1bXYzZW4xY3J1aW56cjkifQ.BW8sXRQtfPcAY6zkrsVnRg'

        const map = new mapboxgl.Map({
          container: 'unimar-map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-49.96455, -22.23669], // Coordenadas de Marília, SP
          zoom: 16,
          interactive: true,
        })

        // Add main campus marker
        const mainMarker = new mapboxgl.Marker({
          color: '#004AAD',
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
          { name: 'Lab. Informática I', coords: [-49.96465, -22.23659], block: 'Bloco A' },
          { name: 'Lab. Robótica', coords: [-49.96445, -22.23679], block: 'Bloco C' },
          { name: 'Lab. Eletrônica', coords: [-49.96475, -22.23669], block: 'Bloco E' },
        ]

        labLocations.forEach((lab) => {
          const labMarker = new mapboxgl.Marker({
            color: '#0084DC',
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
        map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      }
    }

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  return (
    <section id="map" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-balance">
          Localização dos Laboratórios
        </h2>

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
          <div 
            id="unimar-map" 
            className="w-full h-96 md:h-[500px]" 
            style={{ minHeight: '400px' }} 
          />

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
          <Card className="text-center hover-lift animate-fade-in-up">
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

          <Card className="text-center hover-lift animate-fade-in-up">
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

          <Card className="text-center hover-lift animate-fade-in-up">
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
  )
}
