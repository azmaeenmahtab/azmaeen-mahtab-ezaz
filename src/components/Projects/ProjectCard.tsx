import { Project } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  data: Project
  index?: number
}

// Inline SVGs for crisp, lightweight, zero-dependency tech icons
const TechIcon: React.FC<{ name: string }> = ({ name }) => {
  const normalized = name.toLowerCase().trim()

  if (normalized.includes('react') && !normalized.includes('query')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#00d8ff] shrink-0" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
        <g stroke="#00d8ff" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    )
  }

  if (normalized.includes('next')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 fill-white" role="img">
        <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
      </svg>
    )
  }

  if (normalized.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#68a063]" fill="currentColor">
        <path d="M12 2.5L20.66 7.5V17.5L12 22.5L3.34 17.5V7.5L12 2.5Z" fill="#539e43" opacity="0.3" stroke="#68a063" strokeWidth="1.5" />
        <path d="M12 6L17 9V15L12 18L7 15V9L12 6Z" fill="#68a063" />
      </svg>
    )
  }

  if (normalized.includes('express')) {
    return (
      <span className="font-mono text-[9px] font-bold text-slate-200 bg-white/15 px-1 py-0.2 rounded border border-white/25">
        ex
      </span>
    )
  }

  if (normalized.includes('mongo')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#13aa52]" fill="currentColor">
        <path d="M12.001 0.5C12.001 0.5 7.5 7.2 7.5 13.2c0 4.2 2.8 7.8 4.5 9.8 0.1-0.7 0.3-2.1 0.3-3 0-2.4-0.3-4.8-0.3-7.2 0-0.4 0-0.7 0.1-0.9 0.1 0.2 0.3 0.5 0.4 0.9 0.8 2.6 1.1 5.3 1.1 8 0 0.8-0.1 1.6-0.3 2.3 1.7-2 4.4-5.6 4.4-9.8 0-6-4.5-12.8-4.5-12.8h-0.1z" />
      </svg>
    )
  }

  if (normalized.includes('supabase')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#3ecf8e]" fill="currentColor">
        <path d="M11.65 0.5L1.5 13.88h8.85L8.35 23.5l14.15-13.38h-8.85L15.65 0.5h-4z" />
      </svg>
    )
  }

  if (normalized.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#38bdf8]" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.89 2.29 1.63C13.66 10.61 15.08 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.89-2.29-1.63-.17-.18-.35-.36-.53-.55-.78-.79-1.82-1.42-3.18-1.42zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.89 2.29 1.63.79.81 1.7 1.77 4.21 1.77 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.89-2.29-1.63-.79-.81-1.7-1.77-4.21-1.77z" />
      </svg>
    )
  }

  if (normalized.includes('typescript') || normalized === 'ts') {
    return (
      <span className="font-mono text-[9px] font-bold text-[#38bdf8] bg-[#38bdf8]/20 px-1 py-0.2 rounded border border-[#38bdf8]/40">
        TS
      </span>
    )
  }

  if (normalized.includes('javascript') || normalized === 'js') {
    return (
      <span className="font-mono text-[9px] font-bold text-[#f7df1e] bg-[#f7df1e]/20 px-1 py-0.2 rounded border border-[#f7df1e]/40">
        JS
      </span>
    )
  }

  if (normalized.includes('redux')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#a855f7]" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
      </svg>
    )
  }

  if (normalized.includes('laravel')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#ff2d20]" fill="currentColor">
        <path d="M9.8 11.2L2.5 7.1 12 1.8l9.5 5.3-7.3 4.1v7.6l-4.4 2.5v-10.1z" />
      </svg>
    )
  }

  if (normalized.includes('api') || normalized.includes('rest')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#00e6b4]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  }

  if (normalized.includes('sql') || normalized.includes('database') || normalized.includes('postgres')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#60a5fa]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    )
  }

  if (normalized.includes('jwt') || normalized.includes('auth') || normalized.includes('clerk')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#fbbf24]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  }

  if (normalized.includes('gemini') || normalized.includes('ai')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#e0b0ff]" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    )
  }

  return (
    <span className="w-1.5 h-1.5 rounded-full bg-[#00e6b4] shadow-[0_0_6px_#00e6b4] shrink-0" />
  )
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
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
      className="project-card-interactive group relative h-full flex flex-col rounded-2xl sm:rounded-[22px] border border-white/[0.14] bg-[#121622] bg-gradient-to-b from-[#181d28] via-[#121622] to-[#0e1219] p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
    >
      {/* Specular top light edge - smooth native CSS opacity crossfade */}
      <div className="project-card-sheen-default absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl z-20 pointer-events-none" />
      <div className="project-card-sheen-hover absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00e6b4] to-transparent rounded-t-2xl z-20 pointer-events-none opacity-0" />

      {/* Ambient background glow halo on hover */}
      <div className="project-card-halo absolute -inset-0.5 rounded-[24px] bg-gradient-to-br from-[#00e6b4]/20 via-[#38bdf8]/10 to-[#c8b97a]/15 opacity-0 blur-xl pointer-events-none -z-10" />

      <Link href={`/projects/${projectId}`} className="flex flex-col h-full focus:outline-none relative z-10">
        {/* Project Image Preview */}
        {cover && (
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-white/15 bg-black/80 shadow-[0_8px_25px_rgba(0,0,0,0.6)]">
            <Image
              src={cover}
              alt={displayName}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="project-card-image object-cover object-top"
            />
            {/* Subtle gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/[0.04] opacity-70 group-hover:opacity-30 transition-opacity duration-500 ease-out" />

            {/* Slider / Carousel indicator dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 pointer-events-none shadow-md">
              <span className="w-3.5 h-1.5 rounded-full bg-[#00e6b4] shadow-[0_0_8px_#00e6b4] transition-all" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            </div>
          </div>
        )}

        {/* Card Content Area */}
        <div className="pt-4 sm:pt-5 flex flex-col flex-1 justify-between gap-3.5">
          <div className="space-y-2">
            {/* Top row: Category Subtitle with glowing dot + Highlighted Year Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 min-w-0">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e6b4] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e6b4] shadow-[0_0_8px_#00e6b4]"></span>
                </span>
                <span className="text-xs sm:text-[13px] font-semibold text-[#00e6b4] tracking-wide uppercase truncate">
                  {displaySubtitle}
                </span>
              </div>

              <span className="shrink-0 font-mono text-xs font-bold text-[#38bdf8] px-2.5 py-0.5 rounded-full border border-[#38bdf8]/35 bg-[#38bdf8]/10 shadow-[0_0_12px_rgba(56,189,248,0.25)]">
                {displayYear}
              </span>
            </div>

            {/* Project Heading & Action Arrow with buttery-smooth transition */}
            <div className="flex items-start justify-between gap-2 pt-0.5">
              <h3 className="project-card-title text-2xl sm:text-[26px] font-extrabold text-white tracking-tight leading-snug">
                {displayName}
              </h3>
              <div className="project-card-arrow-btn w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 shrink-0 mt-0.5">
                <ArrowUpRight className="project-card-arrow-icon w-4 h-4" />
              </div>
            </div>

            {/* Compact Brief - crisp high-contrast text */}
            {displayBrief && (
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-0.5 line-clamp-2">
                {displayBrief}
              </p>
            )}
          </div>

          {/* Tech Stack Pills - Tactile, high-contrast elevated chips */}
          {displayedTechnologies.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2.5 mt-auto border-t border-white/[0.08]">
              {displayedTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs text-white font-medium shadow-sm transition-[border-color,background-color] duration-300 ease-out group-hover:border-white/25 group-hover:bg-white/[0.11]"
                >
                  <TechIcon name={tech} />
                  <span>{tech}</span>
                </span>
              ))}

              {technologies.length > displayedTechnologies.length && (
                <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-xs font-mono font-medium text-slate-300">
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
