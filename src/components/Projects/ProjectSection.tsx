"use client"

import { Project } from '@/lib/types'
import ProjectCard from './ProjectCard'
import { playfairdisplay } from '@/fonts'
import { useEffect, useRef, useState } from 'react'

interface ProjectSectionProps {
  projects: Project[]
}

type TabType = 'all' | 'fullstack' | 'frontend' | 'aiml'

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<TabType>('all')

  useEffect(() => {
    const triggerReveal = () => {
      if (!sectionRef.current) return
      const reveals = sectionRef.current.querySelectorAll<HTMLElement>('[data-reveal]')
      reveals.forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, Math.min(i * 60, 360))
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerReveal()
          }
        })
      },
      { threshold: 0.05 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
      if (typeof window !== 'undefined') {
        const rect = sectionRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          triggerReveal()
        }
      }
    }

    return () => observer.disconnect()
  }, [activeTab])

  const fullstackProjects = projects.filter((p) => p.category === 'fullstack')
  const frontendProjects = projects.filter((p) => p.category === 'frontend')

  return (
    <section id="projects" ref={sectionRef} className="space-y-12 my-25 max-w-4xl mx-auto">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-6">
        <div className="text-left space-y-1">
          <h2
            data-reveal
            style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.55s ease, transform 0.55s ease' }}
            className={`${playfairdisplay.className} italic text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight`}
          >
            What I Have Built
          </h2>
          
        </div>

        {/* Category Tabs Filter */}
        <div
          data-reveal
          style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s' }}
          className="flex flex-wrap items-center gap-2.5 pt-1"
        >
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/15 font-semibold scale-[1.02]'
                : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] text-slate-600 dark:text-slate-400 hover:text-emerald-800 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 shadow-sm'
            }`}
          >
            <i className="fa-solid fa-table-cells text-xs" />
            <span>All ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('fullstack')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
              activeTab === 'fullstack'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/15 font-semibold scale-[1.02]'
                : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] text-slate-600 dark:text-slate-400 hover:text-emerald-800 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 shadow-sm'
            }`}
          >
            <i className="fa-solid fa-layer-group text-xs" />
            <span>Full-Stack & AI ({fullstackProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('frontend')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
              activeTab === 'frontend'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/15 font-semibold scale-[1.02]'
                : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] text-slate-600 dark:text-slate-400 hover:text-emerald-800 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 shadow-sm'
            }`}
          >
            <i className="fa-solid fa-desktop text-xs" />
            <span>Frontend Only ({frontendProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('aiml')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
              activeTab === 'aiml'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/15 font-semibold scale-[1.02]'
                : 'border border-emerald-300 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/70 shadow-sm'
            }`}
          >
            <i className="fa-solid fa-brain text-xs" />
            <span>AI / ML Lab</span>
            <span className="rounded-full bg-emerald-800/10 px-1.5 py-0.5 text-[10px] uppercase font-mono tracking-wider font-semibold">
              Soon
            </span>
          </button>
        </div>
      </div>

      {/* Render Content Based on Active Tab */}
      <div className="space-y-16">
        {/* Full-Stack Section */}
        {(activeTab === 'all' || activeTab === 'fullstack') && (
          <div className="space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-200 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm shrink-0 mt-0.5 sm:mt-0">
                <i className="fa-solid fa-layer-group text-lg text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Full-Stack & AI-Powered Projects
                  </h3>
                  
                </div>
               
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 pt-2">
              {fullstackProjects.map((project, idx) => (
                <div
                  key={project.id || project.priority}
                  data-reveal
                  style={{
                    opacity: 0,
                    transform: 'translateY(16px)',
                    transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="h-full"
                >
                  <ProjectCard
                    index={idx + 1}
                    data={project}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Frontend Only Section */}
        {(activeTab === 'all' || activeTab === 'frontend') && (
          <div className="space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-200 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm shrink-0 mt-0.5 sm:mt-0">
                <i className="fa-solid fa-desktop text-lg text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Frontend Only Projects
                  </h3>
                  
                </div>
                
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 pt-2">
              {frontendProjects.map((project, idx) => (
                <div
                  key={project.id || project.priority}
                  data-reveal
                  style={{
                    opacity: 0,
                    transform: 'translateY(16px)',
                    transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="h-full"
                >
                  <ProjectCard
                    index={idx + 1}
                    data={project}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI/ML Journey Coming Soon Section */}
        {(activeTab === 'all' || activeTab === 'aiml') && (
          <div className="space-y-6">
            <div className="flex items-center sm:items-center gap-3.5 border-b border-slate-200 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm shrink-0 mt-0.5 sm:mt-0">
                <i className="fa-solid fa-brain text-lg text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                   <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    AI / ML Lab (In Progress)
                  </h3>
              </div>
            </div>

            <div
              data-reveal
              style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.55s ease, transform 0.55s ease' }}
              className="relative overflow-hidden rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/50 via-white to-white p-6 sm:p-8 shadow-xl"
            >
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3 max-w-2xl">
                  

                  <h4 className="text-2xl font-bold text-slate-900">
                    Building Next-Gen AI & Machine Learning Solutions
                  </h4>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    I have officially embarked on my AI & Machine Learning learning path! While I currently integrate AI pipelines (like Gemini tool-calling agents & Exif analysis) into full-stack web platforms, dedicated AI/ML projects, model fine-tuning experiments, and PyTorch implementations will be showcased here soon.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['PyTorch', 'Scikit-Learn', 'LLM Agents & RAG', 'Computer Vision', 'Model Fine-Tuning'].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-800 font-medium flex items-center gap-1.5 shadow-sm"
                      >
                        <i className="fa-solid fa-wand-magic-sparkles text-[10px] text-emerald-600 opacity-80" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 rounded-2xl border border-slate-200 bg-white p-5 text-center sm:w-48 shadow-sm">
                  <div className="flex justify-center mb-2">
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                      <i className="fa-solid fa-rocket text-xl animate-bounce" />
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-slate-900">Stay Tuned</div>
                  <div className="text-[11px] text-slate-500 mt-1">AI/ML projects dropping here soon</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectSection
