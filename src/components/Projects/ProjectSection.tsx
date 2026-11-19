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
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 })

  const fullstackProjects = projects.filter((p) => p.category === 'fullstack')
  const frontendProjects = projects.filter((p) => p.category === 'frontend')

  // Smooth sliding tab pill indicator
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = tabRefs.current[activeTab]
      if (activeEl) {
        setIndicator({
          left: activeEl.offsetLeft,
          top: activeEl.offsetTop,
          width: activeEl.offsetWidth,
          height: activeEl.offsetHeight,
          opacity: 1,
        })
      }
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeTab])

  // Section entry reveal
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
  }, [])

  interface TabItem {
    id: TabType
    icon: string
    label: string
    count?: number
    soon?: boolean
  }

  const TABS: TabItem[] = [
    { id: 'all', icon: 'fa-table-cells', label: 'All', count: projects.length },
    { id: 'fullstack', icon: 'fa-layer-group', label: 'Full-Stack & AI', count: fullstackProjects.length },
    { id: 'frontend', icon: 'fa-desktop', label: 'Frontend Only', count: frontendProjects.length },
    { id: 'aiml', icon: 'fa-brain', label: 'AI / ML Lab', soon: true },
  ]

  return (
    <section id="projects" ref={sectionRef} className="relative space-y-12 px-4 sm:px-6 lg:px-8 py-5 md:py-10 max-w-4xl mx-auto">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="flex items-center gap-3.5">
          <i className="fa-solid fa-layer-group text-2xl text-slate-800 dark:text-white" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Projects
            </h2>
          </div>
        </div>

        {/* Category Tabs Filter with Butter-Smooth Sliding Indicator */}
        <div
          data-reveal
          style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s' }}
          className="relative max-w-full"
        >
          {/* Subtle soft ambient glow behind the tab glass */}
          <div className="pointer-events-none absolute -left-6 top-0 h-16 w-40 rounded-full bg-[#00b4d8]/20 blur-2xl dark:bg-[#0077b6]/20" />

          {/* 2 columns on mobile, inline flex row on desktop */}
          <div className="relative grid grid-cols-2 sm:inline-flex sm:flex-row items-center gap-1.5 rounded-2xl sm:rounded-full border border-slate-200/90 dark:border-white/10 bg-white/70 dark:bg-white/5 p-1.5 shadow-[0_8px_32px_rgba(15,23,42,0.06)] dark:shadow-none backdrop-blur-xl w-full sm:w-auto">
            {/* Sliding Active Pill */}
            <span
              className="absolute rounded-xl sm:rounded-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] shadow-[0_6px_20px_-4px_rgba(0,119,182,0.5)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
              style={{
                left: `${indicator.left}px`,
                top: `${indicator.top}px`,
                width: `${indicator.width}px`,
                height: `${indicator.height}px`,
                opacity: indicator.opacity,
              }}
            />

            {TABS.map((tab) => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[tab.id] = el }}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-full px-2.5 sm:px-4 py-2 sm:py-2 text-[11px] sm:text-xs font-semibold transition-colors duration-250 cursor-pointer select-none text-center ${
                    active
                      ? 'text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  <i className={`fa-solid ${tab.icon} text-xs transition-transform duration-250 shrink-0 ${active ? 'scale-105' : ''}`} />
                  <span className="truncate">{tab.label}</span>

                  {tab.soon ? (
                    <span
                      className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider transition-colors duration-250 shrink-0 ${
                        active ? 'bg-white/25 text-white' : 'bg-[#00b4d8]/15 text-[#0077b6] dark:text-[#90e0ef]'
                      }`}
                    >
                      Soon
                    </span>
                  ) : (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold transition-colors duration-250 shrink-0 ${
                        active ? 'bg-white/25 text-white' : 'bg-slate-900/5 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Render Content Based on Active Tab with Smooth Fade Transition */}
      <div key={activeTab} className="space-y-16 animate-project-tab">
        {/* Full-Stack Section */}
        {(activeTab === 'all' || activeTab === 'fullstack') && (
          <div className="space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-sm shrink-0 mt-0.5 sm:mt-0">
                <i className="fa-solid fa-layer-group text-lg text-emerald-700 dark:text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Full-Stack & AI-Powered Projects
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 pt-2">
              {fullstackProjects.map((project, idx) => (
                <div
                  key={project.id || project.priority}
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
            <div className="flex items-center gap-3.5 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-sm shrink-0 mt-0.5 sm:mt-0">
                <i className="fa-solid fa-desktop text-lg text-emerald-700 dark:text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Frontend Only Projects
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 pt-2">
              {frontendProjects.map((project, idx) => (
                <div
                  key={project.id || project.priority}
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
      className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-emerald-50/70 via-white/60 to-white/40 p-5 sm:p-6 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] backdrop-blur-xl"
    >
      {/* background blobs + glass edge */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 -bottom-12 h-44 w-44 rounded-full bg-emerald-500/15 blur-3xl" />
      <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4">
        {/* icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-emerald-700 shadow-sm backdrop-blur">
          <i className="fa-solid fa-rocket animate-bounce text-lg" />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg sm:text-xl font-bold text-slate-900">
              AI/ML projects coming soon
            </h4>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white/60 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-700 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Learning
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">
            Currently learning AI & ML. Already using AI in my full-stack projects (Custom Tool Calling Agents, Chatbots, Multistep Pipeline). Dedicated AI/ML projects will be added here soon.
          </p>

          <div className="flex flex-wrap gap-2">
            {['PyTorch', 'Scikit-Learn', 'LLM Agents & RAG', 'Computer Vision', 'Model Fine-Tuning'].map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/60 px-3 py-1 text-xs font-medium text-emerald-800 shadow-sm backdrop-blur"
              >
                
                {tech}
              </span>
            ))}
          </div>
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
