import React from 'react';
import { SpaceBackground } from '../components/SpaceBackground';
import { AstronautHeader } from '../components/AstronautHeader';
import { SpaceNavigation } from '../components/SpaceNavigation';
import { PlanetCourseCard } from '../components/PlanetCourseCard';
import { SpaceStationSchedule } from '../components/SpaceStationSchedule';
import { ConstellationAchievements } from '../components/ConstellationAchievements';
import { Footer } from '../components/Footer';
export const SpaceDashboard = () => {
  return <SpaceBackground>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Navigation Sidebar */}
        <SpaceNavigation />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto pb-20 md:pb-0">
          <AstronautHeader />

          <main className="flex-1 px-4 md:px-8 py-4 max-w-7xl mx-auto w-full">
            {/* Planets Grid */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-['Orbitron',_sans-serif] tracking-wider">
                  Planetary Systems (Courses)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 justify-items-center">
                <PlanetCourseCard subject="Arabic" progress={75} type="mars" nextLesson="Grammar Galaxy" />
                <PlanetCourseCard subject="Math" progress={60} type="saturn" nextLesson="Algebra Asteroids" />
                <PlanetCourseCard subject="Science" progress={40} type="neptune" nextLesson="Physics Nebula" />
                <PlanetCourseCard subject="English" progress={85} type="earth" nextLesson="Vocabulary Void" />
              </div>
            </section>

            {/* Dashboard Lower Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <SpaceStationSchedule />
              </div>
              <div className="lg:col-span-1">
                <ConstellationAchievements />
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </SpaceBackground>;
};