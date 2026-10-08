import hackathons from '../../../content/hackathons'
import { playfairdisplay } from '@/fonts'
import HackathonCard from '@/components/Hackathons/HackathonCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hackathon Arena | Azmaeen Mahtab Ezaz — AI & Full-Stack Hackathon Projects',
  description:
    'Explore Azmaeen Mahtab Ezaz\'s hackathon builds: GridWise LLM (AI energy optimization), CampusOS (AI campus operating system), and MailMind (AI email triage for faculty) — shipped under 24–48 hour sprint constraints.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/hackathons`,
  },
  openGraph: {
    title: 'Hackathon Arena | Azmaeen Mahtab Ezaz',
    description: 'AI-powered builds shipped under extreme time constraints — energy optimization, campus intelligence, and email triage.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/hackathons`,
    siteName: 'Azmaeen Mahtab Portfolio',
    type: 'website',
  },
}

export default function HackathonsPage() {
  return (
    <main className="min-h-screen bg-[#0b0c0f] text-[#ede8df] selection:bg-[#c8b97a]/30 selection:text-[#c8b97a]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(200,185,122,0.07),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-[1200px] px-4 pt-32 pb-24 relative z-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#8a9bb0] mb-12">
          <Link href="/" className="hover:text-[#c8b97a] transition-colors flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.092 0L22.25 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Home
          </Link>
          <span className="text-[#8a9bb0]/40">/</span>
          <span className="text-[#c8b97a]">Hackathon Arena</span>
        </div>

        {/* Page Header */}
        <div className="space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c8b97a]/30 bg-[#c8b97a]/10 px-4 py-2 text-xs font-mono text-[#c8b97a]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8b97a] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8b97a]" />
            </span>
            Recently Participated — September 2026
          </div>

          <div className="space-y-3">
            <h1 className={`${playfairdisplay.className} italic text-4xl sm:text-5xl md:text-6xl text-[#e8e2d5] tracking-tight leading-tight`}>
              Hackathon Arena &{' '}
              <span className="text-[#c8b97a] not-italic font-sans text-2xl sm:text-3xl font-normal block mt-1">
                Fast-Paced Prototyping
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#8a9bb0] max-w-2xl leading-relaxed">
              Three national/regional hackathons. 24–48 hour sprints. Autonomous AI agents, Linear Programming optimization engines, and production-ready full-stack platforms — all shipped under extreme time constraints.
            </p>
          </div>

          {/* Metrics ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {[
              { value: '3', label: 'Hackathons Competed', icon: '🏆', color: '#c8b97a' },
              { value: '24–48h', label: 'Sprint Durations', icon: '⏱️', color: '#00e6b4' },
              { value: '3×', label: 'Google Gemini AI Agents', icon: '🤖', color: '#f59e0b' },
              { value: '100%', label: 'Code Shipped & Deployed', icon: '🚀', color: '#8b5cf6' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 text-center space-y-2 hover:border-white/20 transition-colors"
              >
                <div className="text-xl">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono leading-none" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-[#8a9bb0] leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c8b97a]/30 bg-[#c8b97a]/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#c8b97a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.25 9.71 2 12 2c2.291 0 4.545.25 6.75.721v1.515M18.75 4.236c.982.143 1.954.317 2.916.52a6.003 6.003 0 01-5.395 5.492M18.75 4.236V4.5a6.75 6.75 0 01-2.48 5.228m2.48-5.228V2.721" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#ede8df]">All Hackathon Builds</h2>
            <p className="text-xs text-[#8a9bb0]">{hackathons.length} projects across {new Set(hackathons.map(h => h.hackathonName)).size} events</p>
          </div>
        </div>

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
          {hackathons.map((project, index) => (
            <HackathonCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>

        {/* Bottom CTA — back to portfolio */}
        <div className="text-center space-y-6 pt-8 border-t border-white/10">
          <p className="text-sm text-[#8a9bb0]">Want to see my full professional project portfolio?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3 text-sm text-[#ede8df] transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              View All Projects
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[#00e6b4]/40 bg-[#00e6b4]/10 hover:bg-[#00e6b4]/20 px-6 py-3 text-sm text-[#00e6b4] font-medium transition-all duration-300"
            >
              Hire Me
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
