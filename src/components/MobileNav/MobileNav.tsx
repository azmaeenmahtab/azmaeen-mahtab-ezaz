'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Logo from '@/components/Navbar/Logo'
import {
  CircleUser,
  Code2,
  Briefcase,
  Box,
  Laptop,
  Star,
  Trophy,
  Mail,
} from 'lucide-react'

interface NavItem {
  id: string
  label: string
  href: string
  sectionId?: string
  icon: React.ReactNode
}

const primaryNavItems: NavItem[] = [
  {
    id: 'about',
    label: 'About',
    href: '/#about',
    sectionId: 'about',
    icon: <CircleUser className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />,
  },
  {
    id: 'skills',
    label: 'Tech Stack',
    href: '/#skills',
    sectionId: 'skills',
    icon: <Code2 className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />,
  },
  {
    id: 'qualification',
    label: 'Experience',
    href: '/#qualification',
    sectionId: 'qualification',
    icon: <Briefcase className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />,
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/#projects',
    sectionId: 'projects',
    icon: <Box className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />,
  },
  {
    id: 'services',
    label: 'Services',
    href: '/#services',
    sectionId: 'services',
    icon: <Laptop className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />,
  },
  {
    id: 'reviews',
    label: 'Reviews',
    href: '/#reviews',
    sectionId: 'reviews',
    icon: <Star className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />,
  },
  {
    id: 'hackathons',
    label: 'Hackathons',
    href: '/hackathons',
    icon: <Trophy className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />,
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/#contact',
    sectionId: 'contact',
    icon: <Mail className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />,
  },
]

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/azmaeenmahtab',
    icon: <i className="fa-brands fa-github text-sm" />,
  },
  {
    name: 'X',
    url: 'https://x.com/mahtab_builds',
    icon: <i className="fa-brands fa-x-twitter text-sm" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/azmaeen-mahtab-ezaz/',
    icon: <i className="fa-brands fa-linkedin-in text-sm text-[#0a66c2]" />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/mahtab_builds/',
    icon: <i className="fa-brands fa-instagram text-sm text-[#E4405F]" />,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/mahtab.azmaeen.3',
    icon: <i className="fa-brands fa-facebook-f text-sm text-[#1877f2]" />,
  },
]

export default function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('about')
  const [theme, setTheme] = useState('light')
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    if (pathname !== '/') {
      if (pathname.startsWith('/hackathons')) {
        setActiveSection('hackathons')
      } else if (pathname.startsWith('/projects')) {
        setActiveSection('projects')
      }
      return
    }

    const sections = [
      { id: 'about', elementId: 'about' },
      { id: 'skills', elementId: 'skills' },
      { id: 'qualification', elementId: 'qualification' },
      { id: 'projects', elementId: 'projects' },
      { id: 'services', elementId: 'services' },
      { id: 'reviews', elementId: 'reviews' },
      { id: 'contact', elementId: 'contact' },
    ]

    const onScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight

      if (scrollY < 180) {
        setActiveSection('about')
        return
      }
      if (scrollY + winHeight >= docHeight - 80) {
        setActiveSection('contact')
        return
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].elementId)
        if (el && el.getBoundingClientRect().top <= winHeight * 0.4) {
          setActiveSection(sections[i].id)
          return
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Theme sync
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    const syncTheme = () => {
      setTheme(document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light')
    }
    window.addEventListener('theme-change', syncTheme)
    return () => window.removeEventListener('theme-change', syncTheme)
  }, [])

  // Sound sync
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-sound')
    if (saved !== null) setIsSoundOn(saved === 'true')
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const playClick = () => {
    if (!isSoundOn) return
    try {
      const ctx = audioCtx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      if (!audioCtx) setAudioCtx(ctx)
      if (ctx.state === 'suspended') ctx.resume()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(650, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(); osc.stop(ctx.currentTime + 0.045)
    } catch {}
  }

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    playClick()
    setIsOpen(false)

    if (item.sectionId) {
      if (pathname === '/') {
        e.preventDefault()
        const el = document.getElementById(item.sectionId)
        if (el) {
          setActiveSection(item.id)
          const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | string, options?: unknown) => void } }).lenis
          if (lenis) {
            lenis.scrollTo(el, { offset: -24, duration: 1.1 })
          } else {
            el.scrollIntoView({ behavior: 'smooth' })
          }
          return
        }
      } else {
        e.preventDefault()
        setActiveSection(item.id)
        router.push(item.href)
        return
      }
    }

    setActiveSection(item.id)
  }

  const handleToggleTheme = () => {
    playClick()
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    window.dispatchEvent(new Event('theme-change'))
  }

  const handleToggleSound = () => {
    const next = !isSoundOn
    setIsSoundOn(next)
    localStorage.setItem('sidebar-sound', String(next))
    if (next) setTimeout(() => playClick(), 10)
  }

  const progressDeg = (scrollProgress / 100) * 360

  return (
    <>
      {/* Only visible on mobile/tablet (hidden on lg+) */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 lg:hidden" ref={menuRef}>

        {/* ── Glassmorphic Menu Card ── */}
        <div
          className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[min(88vw,360px)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          }`}
          aria-hidden={!isOpen}
        >
          {/* Card shell — bright white glassmorphism */}
          <div className="relative rounded-[28px] overflow-hidden border border-white/80 dark:border-white/[0.1] bg-white/75 dark:bg-slate-900/80 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.9)_inset] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]">

            {/* Top specular highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            {/* Inner top glow band */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/60 dark:from-white/[0.03] to-transparent" />
            {/* Blue ambient blob - subtle on light */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#caf0f8]/60 dark:bg-[#0077b6]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 w-40 h-40 rounded-full bg-[#90e0ef]/30 dark:bg-[#00b4d8]/10 blur-3xl" />

            {/* ── Header: Logo + brand ── */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-200/60 dark:border-white/[0.07]">
              <div className="flex items-center gap-3">
                {/* Logo squircle */}
                <div className="">
                  <Logo className="w-5 h-5 text-black dark:text-white" />
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-black text-[20px] text-slate-900 dark:text-white tracking-[-0.03em] leading-none">mahtab</span>
                  <span className="font-extrabold text-[20px] text-slate-400 tracking-[-0.03em] leading-none">.dev</span>
                </div>
              </div>
              <button
                onClick={() => { playClick(); setIsOpen(false) }}
                className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-100/80 dark:bg-white/[0.07] hover:bg-slate-200/80 dark:hover:bg-white/[0.12] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Close menu"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            {/* ── Nav items ── */}
            <div className="px-3 py-2.5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 mb-2">Navigate</p>
              <div className="space-y-0.5 max-h-[50vh] overflow-y-auto no-scrollbar pr-0.5">
                {primaryNavItems.map((item) => {
                  const active = activeSection === item.id
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(item, e)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-[14px] transition-all duration-200 group ${
                        active
                          ? 'bg-[#0077b6]/10 dark:bg-white/10 text-slate-900 dark:text-white font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.06] font-medium'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-200 ${
                        active
                          ? 'bg-[#0077b6]/15 text-[#0077b6] dark:text-[#90e0ef] border border-[#0077b6]/25 dark:border-[#00b4d8]/30'
                          : 'bg-slate-100/80 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-white/[0.06] group-hover:bg-slate-200/70 dark:group-hover:bg-white/[0.08] group-hover:text-slate-700 dark:group-hover:text-slate-300'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[14px] leading-tight ${active ? 'text-[#0077b6] dark:text-white font-bold' : 'text-slate-800 dark:text-slate-200 font-medium'}`}>{item.label}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* ── Socials row ── */}
            <div className="px-5 pt-2 pb-3 border-t border-slate-200/60 dark:border-white/[0.07]">
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Connect</p>
              <div className="flex items-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    className="flex-1 h-9 rounded-[12px] bg-slate-100/80 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.07] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/[0.12] hover:border-slate-300/80 dark:hover:border-white/[0.15] transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Bottom controls ── */}
            <div className="flex items-center gap-2 px-5 pb-5">
              {/* Theme toggle */}
              <button
                onClick={handleToggleTheme}
                className="flex-1 h-10 rounded-[14px] bg-slate-100/80 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.07] flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/[0.1] transition-all duration-200 text-sm font-medium cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'light'
                  ? <><i className="fa-solid fa-moon text-xs" /><span className="text-[12px]">Dark</span></>
                  : <><i className="fa-solid fa-sun text-xs text-amber-400" /><span className="text-[12px]">Light</span></>
                }
              </button>
              {/* Sound toggle */}
              <button
                onClick={handleToggleSound}
                className="w-10 h-10 rounded-[14px] bg-slate-100/80 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.07] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/[0.1] transition-all duration-200 cursor-pointer"
                aria-label="Toggle sound"
              >
                {isSoundOn
                  ? <i className="fa-solid fa-volume-high text-xs" />
                  : <i className="fa-solid fa-volume-xmark text-xs" />
                }
              </button>
              {/* Contact CTA */}
              <Link
                href="/#contact"
                onClick={(e) => {
                  playClick(); setIsOpen(false)
                  if (pathname === '/') {
                    e.preventDefault()
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="flex-1 h-10 rounded-[14px] bg-gradient-to-r from-[#0077b6] to-[#00b4d8] flex items-center justify-center gap-1.5 text-white text-[12px] font-bold shadow-[0_4px_16px_rgba(0,119,182,0.35)] hover:shadow-[0_6px_20px_rgba(0,180,216,0.45)] hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <i className="fa-regular fa-envelope text-xs" />
                <span>Hire Me</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Floating Menu Pill Button ── */}
        <button
          onClick={() => { playClick(); setIsOpen(!isOpen) }}
          className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none backdrop-blur-xl border ${
            isOpen
              ? 'bg-white/90 dark:bg-slate-900/95 text-slate-800 dark:text-white border-slate-300/70 dark:border-slate-700/80 shadow-[0_8px_32px_rgba(0,0,0,0.15)]'
              : 'bg-white/80 dark:bg-slate-900/90 text-slate-800 dark:text-white border-white/90 dark:border-slate-700/80 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:scale-105'
          }`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {/* Hamburger / X icon */}
          <div className="relative w-4 h-4 flex flex-col items-center justify-center gap-[4.5px]">
            <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${isOpen ? 'w-4 rotate-45 translate-y-[6px]' : 'w-4'}`} />
            <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 w-0' : 'w-3'}`} />
            <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${isOpen ? 'w-4 -rotate-45 -translate-y-[6px]' : 'w-4'}`} />
          </div>

          <span className="text-sm font-semibold tracking-tight">{isOpen ? 'Close' : 'Menu'}</span>

          
        </button>
      </div>

      {/* Smooth Animated Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 lg:hidden bg-slate-950/35 dark:bg-slate-950/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? 'opacity-100 backdrop-blur-sm pointer-events-auto'
            : 'opacity-0 backdrop-blur-none pointer-events-none'
        }`}
      />
    </>
  )
}
