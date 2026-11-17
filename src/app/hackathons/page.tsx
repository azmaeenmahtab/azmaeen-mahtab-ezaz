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
    <main className="min-h-screen bg-[#fafbfc] text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-950">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-[1200px] px-4 pt-32 pb-24 relative z-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-12">
          <Link href="/" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 font-medium">
            <i className="fa-solid fa-house text-xs" />
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-emerald-800 font-semibold">Hackathon Arena</span>
        </div>

        {/* Page Header */}
        <div className="space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-mono text-emerald-800 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            Recently Participated — September 2026
          </div>

          <div className="space-y-3">
            <h1 className={`${playfairdisplay.className} italic text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-tight`}>
              Hackathon Arena &{' '}
              <span className="text-emerald-700 not-italic font-sans text-2xl sm:text-3xl font-normal block mt-1">
                Fast-Paced Prototyping
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Three national/regional hackathons. 24–48 hour sprints. Autonomous AI agents, Linear Programming optimization engines, and production-ready full-stack platforms — all shipped under extreme time constraints.
            </p>
          </div>

          {/* Metrics ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {[
              { value: '3', label: 'Hackathons Competed', icon: '🏆', color: '#0077b6' },
              { value: '24–48h', label: 'Sprint Durations', icon: '⏱️', color: '#00b4d8' },
              { value: '3×', label: 'Google Gemini AI Agents', icon: '🤖', color: '#0284c7' },
              { value: '100%', label: 'Code Shipped & Deployed', icon: '🚀', color: '#0077b6' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 text-center space-y-2 hover:border-emerald-300 shadow-sm transition-colors"
              >
                <div className="text-xl">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono leading-none" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">
            <i className="fa-solid fa-trophy text-emerald-700 text-base" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">All Hackathon Builds</h2>
            <p className="text-xs text-slate-500">{hackathons.length} projects across {new Set(hackathons.map(h => h.hackathonName)).size} events</p>
          </div>
        </div>

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
          {hackathons.map((project, index) => (
            <HackathonCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>

        {/* Bottom CTA — back to portfolio */}
        <div className="text-center space-y-6 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-600">Want to see my full professional project portfolio?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-emerald-50 px-6 py-3 text-sm text-slate-800 hover:text-emerald-800 font-medium shadow-sm transition-all duration-300"
            >
              <i className="fa-solid fa-arrow-left text-xs" />
              View All Projects
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0077b6] hover:bg-[#023e8a] text-white px-6 py-3 text-sm font-semibold shadow-md shadow-blue-900/15 transition-all duration-300"
            >
              Hire Me
              <i className="fa-solid fa-arrow-right text-xs" />
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
