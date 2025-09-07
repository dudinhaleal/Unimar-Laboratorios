import HeroSection from '@/coisas/sections/HeroSection'
import SearchSection from '@/coisas/sections/SearchSection'
import LaboratoriesSection from '@/coisas/sections/LaboratoriesSection'
import FavoritesSection from '@/coisas/sections/FavoritesSection'
import ResourcesSection from '@/coisas/sections/ResourcesSection'
import MapSection from '@/coisas/sections/MapSection'
import StatisticsPanel from '@/coisas/StatisticsPanel'
import BookingModal from '@/coisas/BookingModal'

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
