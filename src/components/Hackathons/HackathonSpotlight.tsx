"use client"

import Link from 'next/link'
import Image from 'next/image'
import hackathons from '../../../content/hackathons'
import { playfairdisplay } from '@/fonts'
import { useEffect, useRef } from 'react'

const HackathonSpotlight: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

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
              }, i * 80)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="hackathons-spotlight" ref={sectionRef} className="space-y-10 my-25">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="text-left space-y-2">
          <div
            data-reveal
            style={{ opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-mono text-emerald-800 font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            3 National Hackathons — 24–48 Hour Builds
          </div>

          <h2
            data-reveal
            style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.55s ease 0.05s, transform 0.55s ease 0.05s' }}
            className={`${playfairdisplay.className} italic text-4xl sm:text-5xl text-slate-900 tracking-tight`}
          >
            Hackathon Arena
          </h2>
          <p
            data-reveal
            style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s' }}
            className="text-xs sm:text-sm text-slate-600 font-mono max-w-xl"
          >
            AI-powered builds shipped under extreme time constraints — energy optimization, campus intelligence, and email triage.
          </p>
        </div>
      </div>

      {/* Preview cards row */}
      <div
        data-reveal
        style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s' }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {hackathons.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl border border-slate-200/90 overflow-hidden bg-white hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-400"
          >
            {/* Accent top line */}
            <div
              className="absolute inset-x-0 top-0 h-px opacity-70"
              style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}, transparent)` }}
            />
            {/* Cover image */}
            <div className="relative h-36 overflow-hidden bg-slate-100">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="400px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
            {/* Info */}
            <div className="p-4 space-y-2">
              <div
                className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-mono border"
                style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, backgroundColor: `${project.accentColor}10` }}
              >
                {project.hackathonName}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">{project.title}</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">{project.tagline}</p>
              {/* Sprint badge */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-slate-500">{project.sprintDuration} sprint</span>
                <span className="text-[10px] text-slate-400">·</span>
                <span className="text-[10px] font-mono text-slate-500">{project.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div
        data-reveal
        style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s' }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { value: '3', label: 'Hackathons Entered', color: '#0077b6' },
          { value: '2', label: 'AI Agent Systems Shipped', color: '#00b4d8' },
          { value: '1', label: 'LP Optimization Engine', color: '#0284c7' },
          { value: '48h', label: 'Longest Sprint Duration', color: '#0077b6' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center space-y-1 shadow-sm">
            <div className="text-2xl font-extrabold font-mono" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[10px] text-slate-500 leading-tight font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        data-reveal
        style={{ opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s' }}
        className="flex justify-start"
      >
        <Link
          href="/hackathons"
          className="group inline-flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100/80 transition-all duration-300 shadow-sm"
        >
          <i className="fa-solid fa-trophy text-emerald-700 text-sm" />
          Explore Full Hackathon Showcase
          <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1 text-emerald-700 text-sm" />
        </Link>
      </div>
    </section>
  )
}

export default HackathonSpotlight
