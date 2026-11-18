import { Project } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ProjectCardProps {
  data: Project
  index?: number
}

import TechIcon from './TechIcon'

const ProjectCard: React.FC<ProjectCardProps> = ({ data, index = 0 }) => {
  const {
    id,
    priority,
    title,
    name,
    subtitle,
    brief,
    shortDescription,
    cover,
    year,
    siteAge,
    type,
    category,
    technologies = [],
  } = data

  const projectId = id || `project${priority}`

  // Parse title into a clean name if not provided
  const displayName = name || (title ? title.split(/[—–-]/)[0].trim() : 'Project')

  // Domain / Subtitle
  const displaySubtitle =
    subtitle ||
    (type && !type.toLowerCase().includes('project') ? type : null) ||
    (category === 'fullstack' ? 'Full-Stack & AI Platform' : 'Frontend UI Engineering')

  // Compact Brief
  const displayBrief = brief || shortDescription

  // Year (e.g. "2025")
  const displayYear = year || siteAge || '2025'

  // Primary technologies to show as compact pills (max 5)
  const displayedTechnologies = technologies.slice(0, 5)

  return (
    <div
      className="project-card-interactive group relative h-full flex flex-col rounded-2xl sm:rounded-[22px] border border-slate-200/90 bg-white p-4 sm:p-5 "
    >
      {/* Specular top light edge - smooth native CSS opacity crossfade */}
      <div className="project-card-sheen-default absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-200 to-transparent rounded-t-2xl z-20 pointer-events-none" />
      <div className="project-card-sheen-hover absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-t-2xl z-20 pointer-events-none opacity-0" />

      {/* Ambient background glow halo on hover */}
      {/* <div className="project-card-halo absolute -inset-0.5 rounded-[24px] bg-gradient-to-br from-emerald-500/15 via-emerald-400/10 to-teal-500/10 opacity-0 blur-xl pointer-events-none -z-10" /> */}

      <Link href={`/projects/${projectId}`} className="flex flex-col h-full focus:outline-none relative z-10">
        {/* Project Image Preview */}
        {cover && (
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src={cover}
              alt={displayName}
              fill
              sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              quality={92}
              priority={index < 4}
              className="project-card-image object-cover object-top"
            />
            {/* Very subtle bottom fade — light theme friendly */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-500 ease-out" />

            {/* Slider / Carousel indicator dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 pointer-events-none shadow-md">
              <span className="w-3.5 h-1.5 rounded-full bg-emerald-600 shadow-[0_0_8px_#0077b6] transition-all" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </div>
          </div>
        )}

        {/* Card Content Area */}
        <div className="pt-4 sm:pt-5 flex flex-col flex-1 justify-between gap-3.5">
          <div className="space-y-2">
            {/* Top row: Category Subtitle with glowing dot + Highlighted Year Badge */}
            

            {/* Project Heading & Action Arrow with buttery-smooth transition */}
            <div className="flex items-start justify-between gap-2 pt-0.5">
              <h3 className="project-card-title text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight leading-snug">
                {displayName}
              </h3>
              <div className="project-card-arrow-btn w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
                <i className="fa-solid fa-arrow-up-right-from-square text-[11px] project-card-arrow-icon" />
              </div>
            </div>

            

            {/* Compact Brief - crisp high-contrast text */}
            {displayBrief && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-0.5 line-clamp-2">
                {displayBrief}
              </p>
            )}
          </div>

          {/* Tech Stack Pills - Tactile, high-contrast elevated chips */}
          {displayedTechnologies.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2.5 mt-auto border-t border-slate-100">
              {displayedTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium shadow-xs transition-[border-color,background-color] duration-300 ease-out group-hover:border-emerald-300 dark:group-hover:border-emerald-500/50 group-hover:bg-emerald-50/70 dark:group-hover:bg-emerald-950/30 group-hover:text-emerald-950 dark:group-hover:text-emerald-300"
                >
                  <TechIcon name={tech} />
                  <span>{tech}</span>
                </span>
              ))}

              {technologies.length > displayedTechnologies.length && (
                <span className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                  +{technologies.length - displayedTechnologies.length}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default ProjectCard
