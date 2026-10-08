"use client"

import Image from 'next/image'
import Link from 'next/link'
import { HackathonProject } from '@/lib/types'
import { playfairdisplay } from '@/fonts'
import { useState } from 'react'

interface HackathonCardProps {
  project: HackathonProject
  index: number
}

const HackathonCard: React.FC<HackathonCardProps> = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false)
  const accent = project.accentColor
  const accentSecondary = project.accentColorSecondary || project.accentColor

  return (
    <article
      className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-black/40"
      style={{ boxShadow: `0 0 0 0 ${accent}00` }}
    >
      {/* Gradient glow top accent */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
      />

      {/* Cover Image */}
      <div className="relative h-52 sm:h-64 overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-[#0b0c0f]/40 to-transparent" />

        {/* Sprint duration badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[11px] font-mono text-white/80">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {project.sprintDuration} Sprint
        </div>

        {/* Index number */}
        <div className="absolute bottom-4 right-4 text-5xl font-extrabold font-mono leading-none text-white/10 select-none">
          {String(index).padStart(2, '0')}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-5 p-6 sm:p-8 flex-1">
        {/* Hackathon event badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono font-semibold border"
            style={{ color: accent, borderColor: `${accent}50`, backgroundColor: `${accent}15` }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.25 9.71 2 12 2c2.291 0 4.545.25 6.75.721v1.515M18.75 4.236c.982.143 1.954.317 2.916.52a6.003 6.003 0 01-5.395 5.492M18.75 4.236V4.5a6.75 6.75 0 01-2.48 5.228m2.48-5.228V2.721" />
            </svg>
            {project.hackathonName}
          </span>
          {project.edition && (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-[#8a9bb0] font-mono">
              {project.edition}
            </span>
          )}
          {project.awardOrRole && (
            <span className="rounded-full border border-[#c8b97a]/30 bg-[#c8b97a]/10 px-2.5 py-1 text-[10px] text-[#c8b97a] font-mono font-medium">
              🏆 {project.awardOrRole}
            </span>
          )}
        </div>

        {/* Title & tagline */}
        <div className="space-y-2">
          <h3 className={`${playfairdisplay.className} italic text-2xl sm:text-3xl text-[#e8e2d5] leading-tight`}>
            {project.title}
          </h3>
          <p className="text-sm text-[#8a9bb0] leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Core AI Innovation */}
        <div
          className="rounded-2xl border p-4 space-y-2"
          style={{ borderColor: `${accent}30`, backgroundColor: `${accent}08` }}
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.15em] font-mono" style={{ color: accent }}>Core AI Innovation</span>
          </div>
          <p className="text-xs text-[#8a9bb0] leading-relaxed">
            {project.coreAiInnovation}
          </p>
        </div>

        {/* Expandable: Problem + Architecture */}
        {expanded && (
          <div className="space-y-4 animate-[fade-in_0.3s_ease-out]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.15em] font-mono text-[#8a9bb0]">Problem Statement</p>
              <p className="text-xs text-[#8a9bb0] leading-relaxed">{project.problemStatement}</p>
            </div>
            {project.architectureHighlights && project.architectureHighlights.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                <p className="text-[10px] uppercase tracking-[0.15em] font-mono text-[#8a9bb0]">Architecture Highlights</p>
                <ul className="space-y-2">
                  {project.architectureHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#8a9bb0] leading-relaxed">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: accent }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-[#8a9bb0] hover:text-[#ede8df] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs text-[#ede8df] transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub Repo
            </a>
          )}
          {project.livePreview && (
            <a
              href={project.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-medium transition-all duration-200"
              style={{ borderColor: `${accent}50`, color: accent, backgroundColor: `${accent}15` }}
            >
              Live Demo
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )}

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-auto flex items-center gap-1.5 text-[11px] font-mono text-[#8a9bb0] hover:text-[#ede8df] transition-colors"
          >
            {expanded ? 'Less details ↑' : 'More details ↓'}
          </button>
        </div>

        {/* Team credits */}
        {project.team && project.team.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-[0.15em] font-mono text-[#8a9bb0]">Team</span>
            {project.team.map((member) => (
              <div key={member.name} className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-[9px] font-bold text-[#ede8df]">
                  {member.name.charAt(0)}
                </div>
                <span className="text-[11px] text-[#8a9bb0]">{member.name}</span>
                <span className="text-[10px] text-[#8a9bb0]/60">— {member.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default HackathonCard
