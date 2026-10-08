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
            className="inline-flex items-center gap-2 rounded-full border border-[#c8b97a]/30 bg-[#c8b97a]/10 px-3.5 py-1.5 text-xs font-mono text-[#c8b97a]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8b97a] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8b97a]" />
            </span>
            3 National Hackathons — 24–48 Hour Builds
          </div>

          <h2
            data-reveal
            style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.55s ease 0.05s, transform 0.55s ease 0.05s' }}
            className={`${playfairdisplay.className} italic text-4xl sm:text-5xl text-[#e8e2d5] tracking-tight`}
          >
            Hackathon Arena
          </h2>
          <p
            data-reveal
            style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s' }}
            className="text-xs sm:text-sm text-[#8a9bb0] font-mono max-w-xl"
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
            className="group relative rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] hover:border-white/20 transition-all duration-400"
          >
            {/* Accent top line */}
            <div
              className="absolute inset-x-0 top-0 h-px opacity-70"
              style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}, transparent)` }}
            />
            {/* Cover image */}
            <div className="relative h-36 overflow-hidden">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="400px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-[#0b0c0f]/30 to-transparent" />
            </div>
            {/* Info */}
            <div className="p-4 space-y-2">
              <div
                className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-mono border"
                style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, backgroundColor: `${project.accentColor}10` }}
              >
                {project.hackathonName}
              </div>
              <h3 className="text-sm font-semibold text-[#ede8df] leading-snug">{project.title}</h3>
              <p className="text-[11px] text-[#8a9bb0] leading-relaxed line-clamp-2">{project.tagline}</p>
              {/* Sprint badge */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-[#8a9bb0]/60">{project.sprintDuration} sprint</span>
                <span className="text-[10px] text-[#8a9bb0]/40">·</span>
                <span className="text-[10px] font-mono text-[#8a9bb0]/60">{project.date}</span>
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
          { value: '3', label: 'Hackathons Entered', color: '#c8b97a' },
          { value: '2', label: 'AI Agent Systems Shipped', color: '#00e6b4' },
          { value: '1', label: 'LP Optimization Engine', color: '#f59e0b' },
          { value: '48h', label: 'Longest Sprint Duration', color: '#8b5cf6' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center space-y-1">
            <div className="text-2xl font-extrabold font-mono" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[10px] text-[#8a9bb0] leading-tight">{stat.label}</div>
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
          className="group inline-flex items-center gap-3 rounded-2xl border border-[#c8b97a]/40 bg-[#c8b97a]/10 px-6 py-3.5 text-sm font-medium text-[#c8b97a] hover:bg-[#c8b97a]/20 hover:border-[#c8b97a]/60 transition-all duration-300 shadow-lg shadow-[#c8b97a]/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.25 9.71 2 12 2c2.291 0 4.545.25 6.75.721v1.515M18.75 4.236c.982.143 1.954.317 2.916.52a6.003 6.003 0 01-5.395 5.492M18.75 4.236V4.5a6.75 6.75 0 01-2.48 5.228m2.48-5.228V2.721" />
          </svg>
          Explore Full Hackathon Showcase
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default HackathonSpotlight
