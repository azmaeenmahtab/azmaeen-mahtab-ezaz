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
      className="group relative flex flex-col rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(4,120,87,0.08)] hover:border-emerald-300 transition-all duration-500"
      style={{ boxShadow: `0 0 0 0 ${accent}00` }}
    >
      {/* Gradient glow top accent */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
      />

      {/* Cover Image */}
      <div className="relative h-52 sm:h-64 overflow-hidden bg-slate-100">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

        {/* Sprint duration badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-mono font-semibold text-slate-800 shadow-sm">
          <i className="fa-regular fa-clock text-emerald-700 text-xs" />
          {project.sprintDuration} Sprint
        </div>

        {/* Index number */}
        <div className="absolute bottom-4 right-4 text-5xl font-extrabold font-mono leading-none text-white/30 select-none">
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
            <i className="fa-solid fa-trophy text-xs" />
            {project.hackathonName}
          </span>
          {project.edition && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] text-slate-700 font-mono">
              {project.edition}
            </span>
          )}
          {project.awardOrRole && (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] text-amber-900 font-mono font-medium">
              <i className="fa-solid fa-award mr-1 text-amber-600" />
              {project.awardOrRole}
            </span>
          )}
        </div>

        {/* Title & tagline */}
        <div className="space-y-2">
          <h3 className={`${playfairdisplay.className} italic text-2xl sm:text-3xl text-slate-900 leading-tight`}>
            {project.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Core AI Innovation */}
        <div
          className="rounded-2xl border p-4 space-y-2"
          style={{ borderColor: `${accent}30`, backgroundColor: `${accent}08` }}
        >
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-wand-magic-sparkles text-xs shrink-0" style={{ color: accent }} />
            <span className="text-[10px] uppercase tracking-[0.15em] font-mono font-semibold" style={{ color: accent }}>Core AI Innovation</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {project.coreAiInnovation}
          </p>
        </div>

        {/* Expandable: Problem + Architecture */}
        {expanded && (
          <div className="space-y-4 animate-[fade-in_0.3s_ease-out]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.15em] font-mono text-slate-500 font-semibold">Problem Statement</p>
              <p className="text-xs text-slate-600 leading-relaxed">{project.problemStatement}</p>
            </div>
            {project.architectureHighlights && project.architectureHighlights.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-3">
                <p className="text-[10px] uppercase tracking-[0.15em] font-mono text-slate-500 font-semibold">Architecture Highlights</p>
                <ul className="space-y-2">
                  {project.architectureHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
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
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700 font-medium hover:border-emerald-300 hover:text-emerald-900 hover:bg-emerald-50 transition-colors"
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
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-emerald-50 px-4 py-2 text-xs text-slate-800 hover:text-emerald-800 font-medium shadow-sm transition-all duration-200"
            >
              <i className="fa-brands fa-github text-xs" />
              GitHub Repo
            </a>
          )}
          {project.livePreview && (
            <a
              href={project.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold shadow-sm transition-all duration-200"
              style={{ borderColor: `${accent}50`, color: accent, backgroundColor: `${accent}15` }}
            >
              Live Demo
              <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
            </a>
          )}

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-auto flex items-center gap-1.5 text-[11px] font-mono text-slate-500 hover:text-emerald-800 font-medium transition-colors"
          >
            {expanded ? 'Less details ↑' : 'More details ↓'}
          </button>
        </div>

        {/* Team credits */}
        {project.team && project.team.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
            <span className="text-[10px] uppercase tracking-[0.15em] font-mono text-slate-500 font-semibold">Team</span>
            {project.team.map((member) => (
              <div key={member.name} className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center text-[9px] font-bold text-emerald-800">
                  {member.name.charAt(0)}
                </div>
                <span className="text-[11px] text-slate-700 font-medium">{member.name}</span>
                <span className="text-[10px] text-slate-400">— {member.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default HackathonCard
