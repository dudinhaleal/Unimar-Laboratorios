import HeroSection from '@/components/sections/HeroSection'
import SearchSection from '@/components/sections/SearchSection'
import LaboratoriesSection from '@/components/sections/LaboratoriesSection'
import FavoritesSection from '@/components/sections/FavoritesSection'
import ResourcesSection from '@/components/sections/ResourcesSection'
import MapSection from '@/components/sections/MapSection'
import StatisticsPanel from '@/components/StatisticsPanel'
import BookingModal from '@/components/BookingModal'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <LaboratoriesSection />
      <FavoritesSection />
      <ResourcesSection />
      <MapSection />
      <div id="stats" className="py-12">
        <div className="container mx-auto px-4">
          <StatisticsPanel />
        </div>
      </div>
      <BookingModal />
    </>
  )
}
