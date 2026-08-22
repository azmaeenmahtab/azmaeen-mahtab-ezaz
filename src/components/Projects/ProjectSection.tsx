"use client"

import { Project } from '@/lib/types'
import ProjectCard from './ProjectCard'
import { playfairdisplay } from '@/fonts'
import { useEffect, useRef, useState } from 'react'
import { Grid, Layers, Layout, Brain, Sparkles, Rocket } from 'lucide-react'

interface ProjectSectionProps {
  projects: Project[]
}

type TabType = 'all' | 'fullstack' | 'frontend' | 'aiml'

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<TabType>('all')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll<HTMLElement>('[data-reveal]')
            reveals.forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
              }, i * 90)
            })
          }
        })
      },
      { threshold: 0.05 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [activeTab])

  const fullstackProjects = projects.filter((p) => p.category === 'fullstack')
  const frontendProjects = projects.filter((p) => p.category === 'frontend')

  return (
    <section id="projects" ref={sectionRef} className="space-y-12 my-25">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-6">
        <div className="text-left space-y-1">
          <h2
            data-reveal
            style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.55s ease, transform 0.55s ease' }}
            className={`${playfairdisplay.className} italic text-4xl sm:text-5xl text-[#e8e2d5] tracking-tight`}
          >
            What I Have Built{' '}
            {/* <span className="text-[#00e6b4] not-italic font-sans text-xl sm:text-2xl font-normal inline-block ml-1">
              - projects.
            </span> */}
          </h2>
          <p
            data-reveal
            style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s' }}
            className="text-xs sm:text-sm text-[#8a9bb0] font-mono"
          >
            Filter by category to explore full-stack platforms, AI integrations, and frontend builds
          </p>
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
                ? 'bg-[#00e6b4] text-[#0b0c0f] shadow-lg shadow-[#00e6b4]/25 font-bold scale-[1.02]'
                : 'border border-white/10 bg-white/[0.03] text-[#8a9bb0] hover:text-[#ede8df] hover:border-white/20 hover:bg-white/5'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>All ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('fullstack')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
              activeTab === 'fullstack'
                ? 'bg-[#00e6b4] text-[#0b0c0f] shadow-lg shadow-[#00e6b4]/25 font-bold scale-[1.02]'
                : 'border border-white/10 bg-white/[0.03] text-[#8a9bb0] hover:text-[#ede8df] hover:border-white/20 hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Full-Stack & AI ({fullstackProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('frontend')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
              activeTab === 'frontend'
                ? 'bg-[#00e6b4] text-[#0b0c0f] shadow-lg shadow-[#00e6b4]/25 font-bold scale-[1.02]'
                : 'border border-white/10 bg-white/[0.03] text-[#8a9bb0] hover:text-[#ede8df] hover:border-white/20 hover:bg-white/5'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Frontend Only ({frontendProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('aiml')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
              activeTab === 'aiml'
                ? 'bg-gradient-to-r from-[#c8b97a] to-[#e5d8a6] text-[#0b0c0f] shadow-lg shadow-[#c8b97a]/25 font-bold scale-[1.02]'
                : 'border border-[#c8b97a]/30 bg-[#c8b97a]/5 text-[#c8b97a] hover:bg-[#c8b97a]/15'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>AI / ML Lab</span>
            <span className="rounded-full bg-[#0b0c0f]/50 px-1.5 py-0.5 text-[10px] uppercase font-mono tracking-wider">
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
            <div className="flex items-start sm:items-center gap-3.5 border-b border-white/10 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00e6b4]/20 to-[#00e6b4]/5 border border-[#00e6b4]/30 shadow-lg shadow-[#00e6b4]/10 shrink-0 mt-0.5 sm:mt-0">
                <Layers className="w-5 h-5 text-[#00e6b4]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#ede8df]">
                    Full-Stack & AI-Powered Projects
                  </h3>
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-[#00e6b4]/10 border border-[#00e6b4]/30 px-2.5 py-0.5 text-[11px] text-[#00e6b4] font-mono font-normal">
                    {fullstackProjects.length} Projects
                  </span>
                </div>
                <p className="text-xs text-[#8a9bb0] mt-1">Production-ready full-stack applications with AI agent pipelines, OAuth, and custom database schemas</p>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {fullstackProjects.map((project, idx) => (
                <div
                  key={project.id || project.priority}
                  data-reveal
                  style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.55s ease, transform 0.55s ease' }}
                  className="py-8 first:pt-2"
                >
                  <div className="mx-auto flex max-w-[1200px] items-start gap-8 justify-between">
                    <div className="hidden w-24 shrink-0 md:block pt-4">
                      <div className="text-5xl font-extrabold leading-none text-white/10 font-mono">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="flex-1">
                      <ProjectCard index={idx + 1} data={project} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Frontend Only Section */}
        {(activeTab === 'all' || activeTab === 'frontend') && (
          <div className="space-y-6">
            <div className="flex items-start sm:items-center gap-3.5 border-b border-white/10 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#38bdf8]/20 to-[#38bdf8]/5 border border-[#38bdf8]/30 shadow-lg shadow-[#38bdf8]/10 shrink-0 mt-0.5 sm:mt-0">
                <Layout className="w-5 h-5 text-[#38bdf8]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#ede8df]">
                    Frontend Only Projects
                  </h3>
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 px-2.5 py-0.5 text-[11px] text-[#38bdf8] font-mono font-normal">
                    {frontendProjects.length} Projects
                  </span>
                </div>
                <p className="text-xs text-[#8a9bb0] mt-1">Pixel-perfect UI replications, responsive design systems, and client work</p>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {frontendProjects.map((project, idx) => (
                <div
                  key={project.id || project.priority}
                  data-reveal
                  style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.55s ease, transform 0.55s ease' }}
                  className="py-8 first:pt-2"
                >
                  <div className="mx-auto flex max-w-[1200px] items-start gap-8 justify-between">
                    <div className="hidden w-24 shrink-0 md:block pt-4">
                      <div className="text-5xl font-extrabold leading-none text-white/10 font-mono">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="flex-1">
                      <ProjectCard index={idx + 1} data={project} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI/ML Journey Coming Soon Section */}
        {(activeTab === 'all' || activeTab === 'aiml') && (
          <div className="space-y-6">
            <div className="flex items-start sm:items-center gap-3.5 border-b border-white/10 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#c8b97a]/20 to-[#c8b97a]/5 border border-[#c8b97a]/30 shadow-lg shadow-[#c8b97a]/10 shrink-0 mt-0.5 sm:mt-0">
                <Brain className="w-5 h-5 text-[#c8b97a]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#ede8df]">
                    AI / ML Lab (In Progress)
                  </h3>
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-[#c8b97a]/10 border border-[#c8b97a]/30 px-2.5 py-0.5 text-[11px] text-[#c8b97a] font-mono font-normal flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-pulse shrink-0" />
                    Learning Path
                  </span>
                </div>
                <p className="text-xs text-[#8a9bb0] mt-1">Dedicated machine learning models, research benchmarks, and AI tools coming soon</p>
              </div>
            </div>

            <div
              data-reveal
              style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.55s ease, transform 0.55s ease' }}
              className="relative overflow-hidden rounded-2xl border border-[#c8b97a]/30 bg-gradient-to-br from-[#c8b97a]/10 via-white/[0.02] to-transparent p-6 sm:p-8 backdrop-blur-md shadow-2xl"
            >
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-[#c8b97a]/10 blur-3xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#c8b97a]/40 bg-[#c8b97a]/20 px-3 py-1 text-xs text-[#c8b97a] font-mono">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8b97a] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8b97a]"></span>
                    </span>
                    <Brain className="w-3.5 h-3.5" />
                    <span>AI / ML Journey Started</span>
                  </div>

                  <h4 className="text-2xl font-bold text-[#ede8df]">
                    Building Next-Gen AI & Machine Learning Solutions
                  </h4>

                  <p className="text-sm text-[#8a9bb0] leading-relaxed">
                    I have officially embarked on my AI & Machine Learning learning path! While I currently integrate AI pipelines (like Gemini tool-calling agents & Exif analysis) into full-stack web platforms, dedicated AI/ML projects, model fine-tuning experiments, and PyTorch implementations will be showcased here soon.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['PyTorch', 'Scikit-Learn', 'LLM Agents & RAG', 'Computer Vision', 'Model Fine-Tuning'].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-[#c8b97a]/30 bg-[#c8b97a]/10 px-3 py-1 text-xs text-[#c8b97a] flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3 opacity-70" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5 text-center sm:w-48 backdrop-blur-md">
                  <div className="flex justify-center mb-2">
                    <div className="p-3 rounded-xl bg-[#c8b97a]/10 border border-[#c8b97a]/30 text-[#c8b97a]">
                      <Rocket className="w-6 h-6 animate-bounce" />
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-[#ede8df]">Stay Tuned</div>
                  <div className="text-[11px] text-[#8a9bb0] mt-1">AI/ML projects dropping here soon</div>
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
