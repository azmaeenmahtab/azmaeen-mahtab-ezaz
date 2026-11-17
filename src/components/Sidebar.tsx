'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import Logo from './Navbar/Logo'

interface NavItem {
  id: string
  label: string
  href: string
  sectionId?: string
  icon: (active: boolean) => React.ReactNode
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<string>('profile')
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

  // Track active section on home page
  useEffect(() => {
    if (pathname !== '/') {
      if (pathname.startsWith('/hackathons')) {
        setActiveSection('focus')
      } else if (pathname.startsWith('/projects')) {
        setActiveSection('projects')
      }
      return
    }

    const sectionElements = [
      { id: 'profile', elementId: 'about' },
      { id: 'projects', elementId: 'projects' },
      { id: 'people', elementId: 'reviews' },
      { id: 'contact', elementId: 'contact' },
      { id: 'library', elementId: 'skills' },
      { id: 'focus', elementId: 'services' },
    ]

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollY < 300) {
        setActiveSection('profile')
        return
      }

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i]
        const el = document.getElementById(item.elementId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= windowHeight * 0.45) {
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

  // Handle Navigation Click
  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    playClickSound()
    setIsMobileOpen(false)

    if (item.sectionId && pathname === '/') {
      e.preventDefault()
      const el = document.getElementById(item.sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        setActiveSection(item.id)
        return
      }
    }

    setActiveSection(item.id)
  }

  // Top navigation items (matching photo with Font Awesome Kit)
  const primaryNavItems: NavItem[] = [
    {
      id: 'profile',
      label: 'Profile',
      href: '/#about',
      sectionId: 'about',
      icon: (active) => (
        <i className={`${active ? 'fa-solid' : 'fa-regular'} fa-circle-user text-xl sm:text-[22px] transition-transform`} />
      ),
    },
    {
      id: 'projects',
      label: 'Projects',
      href: '/#projects',
      sectionId: 'projects',
      icon: (active) => (
        <i className="fa-solid fa-cube text-xl sm:text-[22px] transition-transform" />
      ),
    },
    {
      id: 'people',
      label: 'People',
      href: '/#reviews',
      sectionId: 'reviews',
      icon: (active) => (
        <i className="fa-solid fa-users text-xl sm:text-[22px] transition-transform" />
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/#contact',
      sectionId: 'contact',
      icon: (active) => (
        <i className={`${active ? 'fa-solid' : 'fa-regular'} fa-envelope text-xl sm:text-[22px] transition-transform`} />
      ),
    },
  ]

  // Secondary navigation items (Library & Focus with Font Awesome Kit)
  const secondaryNavItems: NavItem[] = [
    {
      id: 'library',
      label: 'Library',
      href: '/#skills',
      sectionId: 'skills',
      icon: (active) => (
        <i className="fa-solid fa-book-bookmark text-xl sm:text-[22px] transition-transform" />
      ),
    },
    {
      id: 'focus',
      label: 'Focus',
      href: '/hackathons',
      icon: (active) => (
        <i className="fa-solid fa-headphones text-xl sm:text-[22px] transition-transform" />
      ),
    },
  ]

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 h-screen bg-white dark:bg-[#0b0e14] border-r border-slate-100 dark:border-slate-800/80 flex flex-col justify-between select-none
          transition-[width,transform] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,transform]
          ${isCollapsed ? 'w-[84px] px-3.5 py-7' : 'w-[280px] xl:w-[300px] px-5 py-7'}
          ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top: Logo & Branding */}
        <div>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => {
                playClickSound()
                setIsMobileOpen(false)
              }}
              className="flex items-center gap-3.5 group focus:outline-none"
            >
              {/* Blue App Icon with soft glowing cyan-blue halo - fixed 52px width optical anchor */}
              <div className="w-[52px] h-12 flex items-center justify-center shrink-0">
                <div className="relative shrink-0 flex items-center justify-center">
                   
                  {/* Sky blue translucent outer frame */}
                  

                  {/* Inner rich ocean-to-navy blue gradient squircle */}
                  <div className="p-2 r">
                    <Logo className="w-8 h-8 text-black drop-shadow-xs" />
                    
                  </div>
                </div>
              </div>

              {/* Brand text: exact nahian.bd style with smooth slide & fade */}
              <div
                className={`flex items-baseline overflow-hidden whitespace-nowrap transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isCollapsed
                    ? 'max-w-0 opacity-0 -translate-x-3 pointer-events-none'
                    : 'max-w-[180px] opacity-100 translate-x-0'
                }`}
              >
                <span className="font-black text-[24px] text-slate-900 dark:text-white tracking-[-0.03em] leading-none">
                  mahtab
                </span>
                <span className="font-extrabold text-[24px] text-[#475569] dark:text-slate-400 tracking-[-0.03em] leading-none">
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

          {/* Primary Nav Items */}
          <nav className="mt-8 space-y-2">
            {primaryNavItems.map((item) => {
              const active = activeSection === item.id
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  title={isCollapsed ? item.label : undefined}
                  className={`group relative flex items-center h-[52px] rounded-2xl cursor-pointer overflow-hidden transition-colors duration-200 ${
                    active
                      ? 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-white font-bold shadow-sm'
                      : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 font-medium'
                  }`}
                >
                  {/* Fixed 52px wide icon slot */}
                  <div className="w-[52px] h-[52px] flex items-center justify-center shrink-0">
                    <span className={`${active ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-400'} transition-transform duration-200 group-hover:scale-110`}>
                      {item.icon(active)}
                    </span>
                  </div>

                  {/* Label: smoothly slides & clips with zero text-wrap */}
                  <div
                    className={`overflow-hidden whitespace-nowrap transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isCollapsed
                        ? 'max-w-0 opacity-0 -translate-x-3 pointer-events-none'
                        : 'max-w-[200px] opacity-100 translate-x-0'
                    }`}
                  >
                    <span className="text-[18px] tracking-tight pr-3 block">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Subtle Hairline Divider */}
          <div className="my-5 border-t border-slate-100 dark:border-slate-800/80 mx-1" />

          {/* Secondary Nav Items (Library, Focus) */}
          <nav className="space-y-2">
            {secondaryNavItems.map((item) => {
              const active = activeSection === item.id
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  title={isCollapsed ? item.label : undefined}
                  className={`group relative flex items-center h-[52px] rounded-2xl cursor-pointer overflow-hidden transition-colors duration-200 ${
                    active
                      ? 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-white font-bold shadow-sm'
                      : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 font-medium'
                  }`}
                >
                  {/* Fixed 52px wide icon slot */}
                  <div className="w-[52px] h-[52px] flex items-center justify-center shrink-0">
                    <span className={`${active ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-400'} transition-transform duration-200 group-hover:scale-110`}>
                      {item.icon(active)}
                    </span>
                  </div>

                  {/* Label: smoothly slides & clips with zero text-wrap */}
                  <div
                    className={`overflow-hidden whitespace-nowrap transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isCollapsed
                        ? 'max-w-0 opacity-0 -translate-x-3 pointer-events-none'
                        : 'max-w-[200px] opacity-100 translate-x-0'
                    }`}
                  >
                    <span className="text-[18px] tracking-tight pr-3 block">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Section: 3 Circular Buttons & Copyright */}
        <div className="pt-4 border-t border-slate-100/80 dark:border-slate-800/60 overflow-hidden">
          {/* Action Button Row */}
          <div
            className={`flex transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCollapsed
                ? 'flex-col items-center gap-3'
                : 'flex-row items-center justify-between px-1 gap-2'
            }`}
          >
            {/* 1. Theme Switcher */}
            <button
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              {theme === 'light' ? (
                <i className="fa-solid fa-moon text-base" />
              ) : (
                <i className="fa-solid fa-sun text-base text-amber-400" />
              )}
            </button>

            {/* 2. Audio/Sound Toggle */}
            <button
              onClick={handleToggleSound}
              aria-label="Toggle UI sound"
              title={isSoundOn ? 'Mute UI sounds' : 'Enable UI sounds'}
              className={`flex items-center justify-center w-12 h-12 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0 ${
                isSoundOn
                  ? 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300'
                  : 'text-slate-400 dark:text-slate-600 border-slate-100'
              }`}
            >
              {isSoundOn ? (
                <i className="fa-solid fa-volume-high text-base" />
              ) : (
                <i className="fa-solid fa-volume-xmark text-base" />
              )}
            </button>

            {/* 3. Collapse/Expand Toggle */}
            <button
              onClick={handleToggleCollapse}
              aria-label="Toggle sidebar collapse"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              <i className={`fa-solid fa-table-columns text-base transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Footer Copyright */}
          <div
            className={`overflow-hidden whitespace-nowrap transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCollapsed
                ? 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
                : 'max-h-10 opacity-100 translate-y-0 mt-4'
            }`}
          >
            <p className="text-xs text-slate-400 dark:text-slate-500 text-left px-1 font-sans">
              © 2026 Azmaeen Mahtab
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
