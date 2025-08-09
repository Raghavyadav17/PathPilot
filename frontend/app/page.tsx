'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Target, Zap, TrendingUp, Users, BookOpen } from 'lucide-react'
import CareerForm from '@/components/CareerForm'
import RoadmapDisplay from '@/components/RoadmapDisplay'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const [roadmapData, setRoadmapData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRoadmapGenerated = (data: any) => {
    setRoadmapData(data)
  }

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your AI-Powered
              <span className="gradient-text block">Career Roadmap</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your career aspirations into actionable steps. Get personalized roadmaps, 
              skill recommendations, and real market insights powered by AI.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="card">
              <Target className="w-8 h-8 text-primary-600 mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Personalized Roadmaps</h3>
              <p className="text-gray-600">Tailored career paths based on your current skills and dream job</p>
            </div>
            <div className="card">
              <TrendingUp className="w-8 h-8 text-primary-600 mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Market Insights</h3>
              <p className="text-gray-600">Real job market data to guide your career decisions</p>
            </div>
            <div className="card">
              <BookOpen className="w-8 h-8 text-primary-600 mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Learning Resources</h3>
              <p className="text-gray-600">Curated courses and projects to build your skills</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {!roadmapData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CareerForm 
                onRoadmapGenerated={handleRoadmapGenerated}
                onLoadingChange={handleLoadingChange}
                isLoading={isLoading}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <RoadmapDisplay 
                roadmapData={roadmapData} 
                onReset={() => setRoadmapData(null)}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {!roadmapData && (
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 text-center"
            >
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
                <div className="text-gray-600">Career Roadmaps Generated</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-gray-600">Job Roles Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
                <div className="text-gray-600">User Satisfaction Rate</div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
