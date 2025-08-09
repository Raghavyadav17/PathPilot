'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Sparkles, User, Target, Code } from 'lucide-react'
import axios from 'axios'

const formSchema = z.object({
  currentRole: z.string().min(2, 'Current role must be at least 2 characters'),
  currentSkills: z.string().min(5, 'Please list your current skills'),
  dreamJob: z.string().min(2, 'Dream job must be at least 2 characters'),
  experience: z.string().min(1, 'Please select your experience level'),
  timeline: z.string().min(1, 'Please select your preferred timeline'),
  additionalInfo: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface CareerFormProps {
  onRoadmapGenerated: (data: any) => void
  onLoadingChange: (loading: boolean) => void
  isLoading: boolean
}

export default function CareerForm({ onRoadmapGenerated, onLoadingChange, isLoading }: CareerFormProps) {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    onLoadingChange(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/generate-roadmap`, data)
      onRoadmapGenerated(response.data)
    } catch (error) {
      console.error('Error generating roadmap:', error)
      // For demo purposes, generate mock data
      const mockRoadmap = {
        title: `Career Roadmap: ${data.currentRole} → ${data.dreamJob}`,
        timeline: data.timeline,
        steps: [
          {
            phase: "Foundation Building",
            duration: "1-2 months",
            skills: ["JavaScript fundamentals", "React basics", "Git version control"],
            courses: ["JavaScript Complete Course", "React for Beginners"],
            projects: ["Personal portfolio website", "Todo app with React"],
            description: "Build strong fundamentals in core technologies"
          },
          {
            phase: "Skill Development",
            duration: "2-3 months", 
            skills: ["Node.js", "Database design", "API development"],
            courses: ["Node.js Masterclass", "Database Design Course"],
            projects: ["REST API project", "Full-stack web application"],
            description: "Develop backend and database skills"
          },
          {
            phase: "Advanced Topics",
            duration: "2-3 months",
            skills: ["Cloud platforms", "DevOps basics", "System design"],
            courses: ["AWS Fundamentals", "Docker & Kubernetes"],
            projects: ["Deployed cloud application", "Microservices project"],
            description: "Learn advanced concepts and deployment"
          },
          {
            phase: "Job Preparation",
            duration: "1 month",
            skills: ["Interview preparation", "Portfolio optimization", "Networking"],
            courses: ["Technical Interview Prep", "Resume Writing"],
            projects: ["Complete portfolio", "Open source contributions"],
            description: "Prepare for job applications and interviews"
          }
        ],
        marketInsights: {
          averageSalary: "$85,000 - $120,000",
          jobGrowth: "+22% (Much faster than average)",
          topCompanies: ["Google", "Microsoft", "Amazon", "Meta", "Netflix"],
          inDemandSkills: ["React", "Node.js", "TypeScript", "AWS", "Docker"]
        }
      }
      onRoadmapGenerated(mockRoadmap)
    } finally {
      onLoadingChange(false)
    }
  }

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(step)
    const isValid = await trigger(fieldsToValidate)
    if (isValid && step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const getFieldsForStep = (stepNumber: number): (keyof FormData)[] => {
    switch (stepNumber) {
      case 1:
        return ['currentRole', 'currentSkills']
      case 2:
        return ['dreamJob', 'experience']
      case 3:
        return ['timeline']
      default:
        return []
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round((step / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Current Situation */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <User className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
                <p className="text-gray-600">Let's understand your current situation</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Role/Position
                </label>
                <input
                  {...register('currentRole')}
                  type="text"
                  placeholder="e.g., Junior Developer, Student, Marketing Manager"
                  className="input-field"
                />
                {errors.currentRole && (
                  <p className="text-red-500 text-sm mt-1">{errors.currentRole.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Skills & Technologies
                </label>
                <textarea
                  {...register('currentSkills')}
                  rows={4}
                  placeholder="e.g., HTML, CSS, JavaScript, Python, Project Management, Communication..."
                  className="input-field resize-none"
                />
                {errors.currentSkills && (
                  <p className="text-red-500 text-sm mt-1">{errors.currentSkills.message}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">What's your dream job?</h2>
                <p className="text-gray-600">Define your career aspirations</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dream Job/Role
                </label>
                <input
                  {...register('dreamJob')}
                  type="text"
                  placeholder="e.g., Senior Full-Stack Developer, Data Scientist, Product Manager"
                  className="input-field"
                />
                {errors.dreamJob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dreamJob.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select {...register('experience')} className="input-field">
                  <option value="">Select your experience level</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (2-5 years)</option>
                  <option value="senior">Senior Level (5+ years)</option>
                  <option value="lead">Lead/Management (8+ years)</option>
                </select>
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Timeline & Additional Info */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <Sparkles className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Final details</h2>
                <p className="text-gray-600">Help us create the perfect roadmap</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Timeline
                </label>
                <select {...register('timeline')} className="input-field">
                  <option value="">Select your timeline</option>
                  <option value="3-months">3 months (Intensive)</option>
                  <option value="6-months">6 months (Balanced)</option>
                  <option value="12-months">12 months (Gradual)</option>
                  <option value="flexible">Flexible timeline</option>
                </select>
                {errors.timeline && (
                  <p className="text-red-500 text-sm mt-1">{errors.timeline.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  {...register('additionalInfo')}
                  rows={3}
                  placeholder="Any specific preferences, constraints, or goals you'd like to mention..."
                  className="input-field resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={prevStep}
              className={`btn-secondary ${step === 1 ? 'invisible' : ''}`}
            >
              Previous
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating Roadmap...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate My Roadmap</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
