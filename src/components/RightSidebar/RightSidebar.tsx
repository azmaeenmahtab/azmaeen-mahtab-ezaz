'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { followedPeople } from '@/appData/followedPeople'
import CurrentlyLearning from './CurrentLearning'

// Azmaeen's personal social profiles with Font Awesome icons
const personalSocials = [
  {
    name: 'X (Twitter)',
    handle: '@mahtab_builds',
    url: 'https://x.com/mahtab_builds',
    icon: <i className="fa-brands fa-x-twitter text-lg text-slate-900 dark:text-white" />,
    badge: 'Follow',
    badgeClass: 'bg-slate-900 hover:bg-black text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 border border-transparent',
  },
  {
    name: 'GitHub',
    handle: '@azmaeenmahtab',
    url: 'https://github.com/azmaeenmahtab',
    icon: <i className="fa-brands fa-github text-xl text-slate-900 dark:text-white" />,
    badge: 'Star',
    badgeClass: 'bg-emerald-50/90 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300/90 dark:border-emerald-600/50',
  },
  {
    name: 'LinkedIn',
    handle: 'Azmaeen Mahtab',
    url: 'https://www.linkedin.com/in/azmaeen-mahtab-ezaz/',
    icon: <i className="fa-brands fa-linkedin-in text-lg text-[#0a66c2] dark:text-[#38bdf8]" />,
    badge: 'Connect',
    badgeClass: 'bg-sky-50/90 hover:bg-sky-100 dark:bg-sky-950/50 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-400 border border-sky-300/90 dark:border-sky-600/50',
  },
  {
    name: 'Instagram',
    handle: '@mahtab_builds',
    url: 'https://www.instagram.com/mahtab_builds/',
    icon: <i className="fa-brands fa-instagram text-xl text-[#E4405F]" />,
    badge: 'Follow',
    badgeClass: 'bg-pink-50/90 hover:bg-pink-100 dark:bg-pink-950/50 dark:hover:bg-pink-900/60 text-pink-700 dark:text-pink-400 border border-pink-300/90 dark:border-pink-600/50',
  },
  {
    name: 'Facebook',
    handle: 'mahtab.azmaeen.3',
    url: 'https://www.facebook.com/mahtab.azmaeen.3',
    icon: <i className="fa-brands fa-facebook-f text-lg text-[#1877f2]" />,
    badge: 'Follow',
    badgeClass: 'bg-blue-50/90 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-400 border border-blue-300/90 dark:border-blue-600/50',
  },
]

export default function RightSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  return (
    <>
      {/* Mobile Floating Trigger Pill — hidden on small screens, only show on sm–xl */}
      <div className="fixed bottom-5 right-5 z-40 hidden sm:block xl:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-black/10 text-xs font-semibold text-slate-800 dark:text-white hover:text-emerald-700 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <div className="flex -space-x-1.5 overflow-hidden">
            {followedPeople.slice(0, 3).map((p) => (
              <img
                key={p.id}
                src={p.avatar}
                alt={p.name}
                className="inline-block h-5 w-5 rounded-full ring-1 ring-white dark:ring-slate-900 object-cover"
              />
            ))}
          </div>
          <span>Network</span>
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 xl:hidden animate-fade-in"
        />
      )}

      {/* Right Sidebar Container */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-40 h-screen w-[380px] xl:w-[390px] 2xl:w-[410px] bg-white/95 dark:bg-[#0b0e14]/95 backdrop-blur-md border-l border-slate-100 dark:border-slate-800/80 p-6 overflow-y-auto space-y-6 transition-transform duration-300 ease-in-out select-none
          ${isMobileOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full xl:translate-x-0'}
        `}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between xl:hidden pb-3 border-b border-slate-100 dark:border-slate-800">
          <span className="font-bold text-sm text-slate-900 dark:text-white">Community & Network</span>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* 1. CONNECT WITH ME (Glassmorphism Cards) */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
              Connect With Me
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {personalSocials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-[22px] border border-slate-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-[#121622]/60 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-inset ring-white/60 dark:ring-white/[0.04] hover:border-emerald-400/60 dark:hover:border-emerald-500/50 hover:shadow-[0_12px_32px_rgba(4,120,87,0.09)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Subtle glass reflection highlight */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 dark:from-white/[0.04] to-transparent rounded-t-[22px]" />

                <div className="flex items-center gap-3.5 min-w-0 relative z-10">
                  {/* Squared shaped rounded icon container */}
                  <div className="w-12 h-12 rounded-[16px] bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:border-emerald-300 dark:group-hover:border-emerald-600/40 transition-all duration-300">
                    {social.icon}
                  </div>

                  {/* Site name & handle: bold and prominent */}
                  <div className="min-w-0">
                    <p className="font-bold text-[16px] sm:text-[17px] text-slate-900 dark:text-white leading-tight tracking-tight truncate">
                      {social.name}
                    </p>
                    {/* <p className="text-xs sm:text-[13px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {social.handle}
                    </p> */}
                  </div>
                </div>

                {/* Right action button */}
                {/* <span className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 shadow-xs group-hover:scale-105 active:scale-95 ${social.badgeClass}`}>
                  <span>{social.badge}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                </span> */}
              </a>
            ))}
          </div>
        </div>

        {/* 2. LET'S TALK / WORK TOGETHER (Glassmorphic Button Card) */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
              Work With Me
            </span>
          </div>

          <Link
            href="/#contact"
            onClick={() => setIsMobileOpen(false)}
            className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-[22px] border border-emerald-300/80 dark:border-emerald-500/30 bg-white/70 dark:bg-[#121622]/60 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-inset ring-white/60 dark:ring-white/[0.04] hover:border-emerald-400 dark:hover:border-emerald-400 hover:shadow-[0_12px_32px_rgba(16,185,129,0.12)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Subtle glass reflection highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 dark:from-white/[0.04] to-transparent rounded-t-[22px]" />

            <div className="flex items-center gap-3.5 min-w-0 relative z-10">
              {/* Squared shaped rounded icon container */}
              <div className="relative w-12 h-12 rounded-[16px] bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:border-emerald-400 transition-all duration-300">
                <i className="fa-solid fa-comments text-lg text-emerald-600 dark:text-emerald-400" />
                {/* Active status pulse */}
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white dark:border-[#0b0e14]"></span>
                </span>
              </div>

              {/* Title & subtitle: bold and prominent */}
              <div className="min-w-0">
                <p className="font-bold text-[16px] sm:text-[17px] text-slate-900 dark:text-white leading-tight tracking-tight truncate">
                  Let&apos;s Talk
                </p>
                <p className="text-xs sm:text-[13px] font-medium text-emerald-600 dark:text-emerald-400 truncate mt-0.5">
                  Open for new conversations
                </p>
              </div>
            </div>

            {/* Right action button */}
            <span className="relative z-10 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 shadow-xs group-hover:scale-105 active:scale-95 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 border border-transparent">
              <span>Contact</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
            </span>
          </Link>
        </div>
        <CurrentlyLearning />

      </aside>
    </>
  )
}
