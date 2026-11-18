'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import Logo from './Navbar/Logo'
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

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<string>('about')
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true)
  const [theme, setTheme] = useState<string>('light')
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)

  // Listen for open-sidebar-drawer event (e.g. from mobile navbar)
  useEffect(() => {
    const handleOpenDrawer = () => setIsMobileOpen(true)
    window.addEventListener('open-sidebar-drawer', handleOpenDrawer)
    return () => window.removeEventListener('open-sidebar-drawer', handleOpenDrawer)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light'
      setTheme(savedTheme)

      const savedSound = localStorage.getItem('sidebar-sound')
      if (savedSound !== null) {
        setIsSoundOn(savedSound === 'true')
      }

      const savedCollapsed = localStorage.getItem('sidebar-collapsed')
      if (savedCollapsed !== null) {
        setIsCollapsed(savedCollapsed === 'true')
      }

      // Sync with global theme changes
      const syncTheme = () => {
        const current = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light'
        setTheme(current)
      }
      window.addEventListener('theme-change', syncTheme)

      const observer = new MutationObserver(() => syncTheme())
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

      return () => {
        window.removeEventListener('theme-change', syncTheme)
        observer.disconnect()
      }
    }
  }, [])

  // Sound effect synthesizer (crisp, pleasant UI click)
  const playClickSound = useCallback(() => {
    if (!isSoundOn || typeof window === 'undefined') return
    try {
      const ctx = audioCtx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      if (!audioCtx) setAudioCtx(ctx)

      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(650, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.045)
    } catch {
      // AudioContext policy blocked before interaction
    }
  }, [audioCtx, isSoundOn])

  // Track active section on home page with accurate reverse scroll-spy
  useEffect(() => {
    if (pathname !== '/') {
      if (pathname.startsWith('/hackathons')) {
        setActiveSection('hackathons')
      } else if (pathname.startsWith('/projects')) {
        setActiveSection('projects')
      }
      return
    }

    // Exact vertical order of sections mapped to the sidebar items:
    const sections = [
      { id: 'about', elId: 'about' },
      { id: 'skills', elId: 'skills' },
      { id: 'qualification', elId: 'qualification' },
      { id: 'projects', elId: 'projects' },
      { id: 'services', elId: 'services' },
      { id: 'reviews', elId: 'reviews' },
      { id: 'contact', elId: 'contact' },
    ]

    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight

      // If at top of the page
      if (scrollY < 180) {
        setActiveSection('about')
        return
      }

      // If reached the bottom of the page
      if (scrollY + winHeight >= docHeight - 80) {
        setActiveSection('contact')
        return
      }

      // Check sections from bottom to top
      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i]
        const el = document.getElementById(item.elId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= winHeight * 0.4) {
            setActiveSection(item.id)
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Toggle Theme
  const handleToggleTheme = () => {
    playClickSound()
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('theme', nextTheme)
    window.dispatchEvent(new Event('theme-change'))
  }

  // Toggle Sound
  const handleToggleSound = () => {
    const next = !isSoundOn
    setIsSoundOn(next)
    localStorage.setItem('sidebar-sound', String(next))
    if (next) {
      setTimeout(() => playClickSound(), 10)
    }
  }

  // Toggle Collapse
  const handleToggleCollapse = () => {
    playClickSound()
    const next = !isCollapsed
    setIsCollapsed(next)
    localStorage.setItem('sidebar-collapsed', String(next))
    window.dispatchEvent(new CustomEvent('sidebar-collapse', { detail: { isCollapsed: next } }))
  }

  // Handle Navigation Click with Lenis smooth-scroll support & cross-route fallback
  const handleNavClick = (item: NavItem, e?: React.MouseEvent) => {
    playClickSound()
    setIsMobileOpen(false)

    if (item.sectionId) {
      if (pathname === '/') {
        if (e) e.preventDefault()
        const el = document.getElementById(item.sectionId)
        if (el) {
          setActiveSection(item.id)
          const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | string, options?: unknown) => void } }).lenis
          if (lenis) {
            lenis.scrollTo(el, { offset: -24, duration: 1.1 })
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          return
        }
      } else {
        // Navigating from subpage back to home section
        if (e) e.preventDefault()
        setActiveSection(item.id)
        router.push(item.href)
        return
      }
    }

    // Direct standalone page route
    setActiveSection(item.id)
  }

  // Portfolio Navigation Items covering all sections
  const navItems: NavItem[] = [
    {
      id: 'about',
      label: 'About',
      href: '/#about',
      sectionId: 'about',
      icon: <CircleUser className="w-[21px] h-[21px] shrink-0" strokeWidth={2} />,
    },
    {
      id: 'skills',
      label: 'Tech Stack',
      href: '/#skills',
      sectionId: 'skills',
      icon: <Code2 className="w-[21px] h-[21px] shrink-0" strokeWidth={2} />,
    },
    {
      id: 'qualification',
      label: 'Experience',
      href: '/#qualification',
      sectionId: 'qualification',
      icon: <Briefcase className="w-[21px] h-[21px] shrink-0" strokeWidth={2} />,
    },
    {
      id: 'projects',
      label: 'Projects',
      href: '/#projects',
      sectionId: 'projects',
      icon: <Box className="w-[21px] h-[21px] shrink-0" strokeWidth={2} />,
    },
    {
      id: 'services',
      label: 'Services',
      href: '/#services',
      sectionId: 'services',
      icon: <Laptop className="w-[21px] h-[21px] shrink-0" strokeWidth={2} />,
    },
    {
      id: 'reviews',
      label: 'Reviews',
      href: '/#reviews',
      sectionId: 'reviews',
      icon: <Star className="w-[21px] h-[21px] shrink-0" strokeWidth={2} />,
    },
    {
      id: 'hackathons',
      label: 'Hackathons',
      href: '/hackathons',
      icon: <Trophy className="w-[21px] h-[21px] shrink-0" strokeWidth={2} />,
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/#contact',
      sectionId: 'contact',
      icon: <Mail className="w-[21px] h-[21px] shrink-0" strokeWidth={2} />,
    },
  ]

  const renderNavItem = (item: NavItem) => {
    const active = activeSection === item.id
    return (
      <Link
        key={item.id}
        href={item.href}
        onClick={(e) => handleNavClick(item, e)}
        title={isCollapsed ? item.label : undefined}
        className={`group relative flex items-center transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer ${
          isCollapsed
            ? 'w-11 h-11 mx-auto justify-center rounded-2xl'
            : 'w-full h-[46px] px-3.5 rounded-2xl gap-3.5'
        } ${
          active
            ? 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-white font-bold'
            : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        {/* Left Icon slot */}
        <div className="flex items-center justify-center shrink-0">
          <span
            className={`transition-colors duration-200 ${
              active
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
            }`}
          >
            {item.icon}
          </span>
        </div>

        {/* Label: smoothly slides & clips on collapse */}
        <div
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isCollapsed
              ? 'max-w-0 opacity-0 -translate-x-3 pointer-events-none'
              : 'max-w-[190px] opacity-100 translate-x-0'
          }`}
        >
          <span className="text-[16px] sm:text-[17px] tracking-tight block">
            {item.label}
          </span>
        </div>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Backdrop Overlay with smooth blur and opacity interpolation */}
      <div
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 bg-slate-950/40 dark:bg-slate-950/60 z-40 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileOpen
            ? 'opacity-100 backdrop-blur-sm pointer-events-auto'
            : 'opacity-0 backdrop-blur-none pointer-events-none'
        }`}
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 h-screen bg-white dark:bg-[#0b0e14] border-r border-slate-100 dark:border-slate-800/80 flex flex-col justify-between select-none
          transition-[width,transform] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,transform]
          ${isCollapsed ? 'w-[84px] px-3.5 py-6' : 'w-[250px] xl:w-[260px] px-4 py-6'}
          ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top: Logo & Navigation List */}
        <div>
          {/* Logo & Branding */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => {
                playClickSound()
                setIsMobileOpen(false)
              }}
              className="flex items-center gap-3.5 group focus:outline-none"
            >
              {/* App Logo - no background color */}
              <div className="w-[44px] h-[44px] flex items-center justify-center shrink-0">
                <Logo className="w-8 h-8 text-slate-900 dark:text-white transition-transform duration-200 group-hover:scale-105 drop-shadow-xs" />
              </div>

              {/* Brand text: exact nahian.bd style */}
              <div
                className={`flex items-baseline overflow-hidden whitespace-nowrap transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isCollapsed
                    ? 'max-w-0 opacity-0 -translate-x-3 pointer-events-none'
                    : 'max-w-[180px] opacity-100 translate-x-0'
                }`}
              >
                <span className="font-bold text-[22px] text-slate-900 dark:text-white tracking-[-0.03em] leading-none">
                  mahtab
                </span>
                <span className="font-medium text-[22px] text-slate-500 dark:text-slate-400 tracking-[-0.03em] leading-none">
                  .dev
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close navigation sidebar"
            >
              <i className="fa-solid fa-xmark text-lg" />
            </button>
          </div>

          {/* Section Navigation Items */}
          <nav className="mt-5 space-y-1 overflow-y-auto no-scrollbar max-h-[calc(100vh-270px)] pr-0.5">
            {navItems.map(renderNavItem)}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 pt-2">
          {/* Work With Me Glass Card */}
          {/* <Link
            href="/#contact"
            onClick={(e) => {
              handleNavClick(
                { id: 'contact', label: 'Contact', href: '/#contact', sectionId: 'contact', icon: null },
                e
              )
            }}
            title={isCollapsed ? 'Bring The Spark! — Work With Me' : undefined}
            className={`group relative flex items-center ${
              isCollapsed ? 'justify-center p-2 rounded-2xl' : 'justify-between p-3 rounded-2xl'
            } border border-[#00b4d8]/30 dark:border-[#0077b6]/30 bg-white/70 dark:bg-[#121622]/60 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:border-[#0077b6] dark:hover:border-[#00b4d8] hover:shadow-[0_8px_24px_rgba(0,119,182,0.15)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden`}
          >
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 min-w-0'} relative z-10`}>
              <div className="relative w-9 h-9 rounded-xl bg-[#00b4d8]/15 dark:bg-[#0077b6]/25 border border-[#0077b6]/25 dark:border-[#00b4d8]/30 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-all duration-300">
                <i className="fa-solid fa-comments text-sm text-[#0077b6] dark:text-[#90e0ef]" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white dark:border-[#0b0e14]"></span>
                </span>
              </div>

              <div
                className={`overflow-hidden whitespace-nowrap transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isCollapsed
                    ? 'max-w-0 opacity-0 -translate-x-3 pointer-events-none'
                    : 'max-w-[180px] opacity-100 translate-x-0'
                }`}
              >
                <p className="font-bold text-[14px] text-slate-900 dark:text-white leading-tight tracking-tight truncate">
                  Bring The Spark!
                </p>
                <p className="text-[11px] font-medium text-[#0077b6] dark:text-[#90e0ef] truncate mt-0.5">
                  Open for new projects
                </p>
              </div>
            </div>
          </Link> */}

          {/* Action Button Row: Theme, Sound, Collapse */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div
              className={`flex transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCollapsed
                  ? 'flex-col items-center gap-2.5'
                  : 'flex-row items-center justify-between px-1 gap-2'
              }`}
            >
              {/* 1. Theme Switcher */}
              <button
                onClick={handleToggleTheme}
                aria-label="Toggle theme"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              >
                {theme === 'light' ? (
                  <i className="fa-solid fa-moon text-sm" />
                ) : (
                  <i className="fa-solid fa-sun text-sm text-amber-400" />
                )}
              </button>

              {/* 2. Audio/Sound Toggle */}
              <button
                onClick={handleToggleSound}
                aria-label="Toggle UI sound"
                title={isSoundOn ? 'Mute UI sounds' : 'Enable UI sounds'}
                className={`flex items-center justify-center w-10 h-10 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0 ${
                  isSoundOn
                    ? 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300'
                    : 'text-slate-400 dark:text-slate-600 border-slate-100'
                }`}
              >
                {isSoundOn ? (
                  <i className="fa-solid fa-volume-high text-sm" />
                ) : (
                  <i className="fa-solid fa-volume-xmark text-sm" />
                )}
              </button>

              {/* 3. Collapse/Expand Toggle */}
              <button
                onClick={handleToggleCollapse}
                aria-label="Toggle sidebar collapse"
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              >
                <i className={`fa-solid fa-table-columns text-sm transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCollapsed ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

