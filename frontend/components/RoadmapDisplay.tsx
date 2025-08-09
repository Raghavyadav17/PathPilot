'use client'

import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Code, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star,
  CheckCircle,
  Target,
  Lightbulb
} from 'lucide-react'

interface RoadmapStep {
  phase: string
  duration: string
  skills: string[]
  courses: string[]
  projects: string[]
  description: string
}

interface MarketInsights {
  averageSalary: string
  jobGrowth: string
  topCompanies: string[]
  inDemandSkills: string[]
}

interface RoadmapData {
  title: string
  timeline: string
  steps: RoadmapStep[]
  marketInsights: MarketInsights
}

interface RoadmapDisplayProps {
  roadmapData: RoadmapData
  onReset: () => void
}

export default function RoadmapDisplay({ roadmapData, onReset }: RoadmapDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Create New Roadmap</span>
        </button>
        
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          {roadmapData.title}
        </h1>
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Clock className="w-5 h-5" />
          <span>Estimated Timeline: {roadmapData.timeline}</span>
        </div>
      </motion.div>

      {/* Market Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 text-primary-600 mr-2" />
          Market Insights
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold">Average Salary</div>
                <div className="text-gray-600">{roadmapData.marketInsights.averageSalary}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-semibold">Job Growth</div>
                <div className="text-gray-600">{roadmapData.marketInsights.jobGrowth}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="font-semibold mb-2 flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                Top Hiring Companies
              </div>
              <div className="flex flex-wrap gap-2">
                {roadmapData.marketInsights.topCompanies.map((company, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="font-semibold mb-2 flex items-center">
                <Star className="w-5 h-5 text-yellow-600 mr-2" />
                In-Demand Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {roadmapData.marketInsights.inDemandSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Roadmap Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="card"
      >
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <Target className="w-6 h-6 text-primary-600 mr-2" />
          Your Career Roadmap
        </h2>
        
        <div className="space-y-8">
          {roadmapData.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="roadmap-step"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Phase {index + 1}: {step.phase}
                  </h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{step.duration}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{step.description}</p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Skills */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center text-blue-700">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Skills to Learn
                    </h4>
                    <ul className="space-y-2">
                      {step.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Courses */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center text-purple-700">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Recommended Courses
                    </h4>
                    <ul className="space-y-2">
                      {step.courses.map((course, courseIndex) => (
                        <li key={courseIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Projects */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center text-orange-700">
                      <Code className="w-4 h-4 mr-2" />
                      Projects to Build
                    </h4>
                    <ul className="space-y-2">
                      {step.projects.map((project, projectIndex) => (
                        <li key={projectIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button className="btn-primary">
          Download PDF Roadmap
        </button>
        <button className="btn-secondary">
          Save to Dashboard
        </button>
        <button 
          onClick={onReset}
          className="btn-secondary"
        >
          Create Another Roadmap
        </button>
      </motion.div>
    </div>
  )
}
