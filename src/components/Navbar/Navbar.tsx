'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Logo from './Logo'

const navItems = [
  { label: 'Home', href: '/#home', icon: <i className="fa-solid fa-house" /> },
  { label: 'About', href: '/#about', icon: <i className="fa-solid fa-user" /> },
  { label: 'Tech Stack', href: '/#skills', icon: <i className="fa-solid fa-code" /> },
  { label: 'Services', href: '/#services', icon: <i className="fa-solid fa-screwdriver-wrench" /> },
  { label: 'Projects', href: '/#projects', icon: <i className="fa-solid fa-layer-group" /> },
  { label: 'Reviews', href: '/#reviews', icon: <i className="fa-solid fa-star" /> },
  { label: 'Hackathons', href: '/hackathons', icon: <i className="fa-solid fa-trophy" /> },
  { label: 'Contact Me', href: '/#contact', icon: <i className="fa-solid fa-envelope" /> },
]

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('light')
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'light') : 'light'
    setCurrentTheme(saved)

    const syncTheme = () => {
      const active = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light'
      setCurrentTheme(active)
    }

    window.addEventListener('theme-change', syncTheme)

    const observer = new MutationObserver(() => syncTheme())
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      window.removeEventListener('theme-change', syncTheme)
      observer.disconnect()
    }
  }, [])

  const toggleTheme = () => {
    const next = currentTheme === 'light' ? 'dark' : 'light'
    setCurrentTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    window.dispatchEvent(new Event('theme-change'))
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const root = navRef.current
    if (!root) return

    const reveals = root.querySelectorAll<HTMLElement>('[data-reveal]')
    reveals.forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, i * 70)
    })
  }, [])

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-40 hidden md:flex justify-center px-4 transition-all duration-300 lg:hidden ${scrolled ? 'pt-3' : 'pt-5'}`}>

      {/* Pill navbar */}
      <div data-reveal style={{ opacity: 0, transform: 'translateY(-16px)', transition: 'opacity 0.55s ease, transform 0.55s ease' }} className={`flex items-center gap-1 rounded-2xl border border-slate-200/90 bg-white/85 backdrop-blur-md px-3 py-2 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-emerald-950/5 border-emerald-200/60' : 'shadow-md shadow-black/5'}`}>

        {/* Logo / monogram */}
        <Link href="/" data-reveal style={{ opacity: 0, transform: 'translateY(-10px)', transition: 'opacity 0.45s ease, transform 0.45s ease' }} className="mr-3 flex items-center justify-center w-7 h-7 rounded-lg border border-emerald-200/70 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80 transition-colors">
          <Logo className="w-4 h-3.5 text-emerald-700" />
        </Link>

        {/* Nav items — desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map(({ label, href, icon }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href.replace('/#', '/')))
            return (
              <li key={href} data-reveal style={{ opacity: 0, transform: 'translateY(-10px)', transition: 'opacity 0.45s ease, transform 0.45s ease' }}>
                <Link
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/70'
                    }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>{icon}</span>
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Divider */}
        <div data-reveal style={{ opacity: 0, transform: 'translateY(-10px)', transition: 'opacity 0.45s ease, transform 0.45s ease' }} className="hidden md:block w-px h-5 bg-slate-200 mx-2" />

        {/* Theme toggle button — switches between Light and Dark mode */}
        <button
          data-reveal
          style={{ opacity: 0, transform: 'translateY(-10px)', transition: 'opacity 0.45s ease, transform 0.45s ease' }}
          onClick={toggleTheme}
          title={currentTheme === 'light' ? 'Switch to Dark mode' : 'Switch to Light mode'}
          aria-label="Toggle theme"
          className="hidden md:flex w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 items-center justify-center text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
        >
          {currentTheme === 'light' ? (
            <i className="fa-solid fa-moon text-xs" />
          ) : (
            <i className="fa-solid fa-sun text-xs text-amber-400" />
          )}
        </button>

        {/* Mobile burger — opens Sidebar drawer */}
        <button
          onClick={() => window.dispatchEvent(new Event('open-sidebar-drawer'))}
          data-reveal
          style={{ opacity: 0, transform: 'translateY(-10px)', transition: 'opacity 0.45s ease, transform 0.45s ease' }}
          className="md:hidden flex w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 items-center justify-center text-slate-700 hover:text-emerald-700 cursor-pointer"
          aria-label="Open navigation sidebar"
        >
          <i className="fa-solid fa-bars text-xs" />
        </button>
      </div>

      {/* Smooth Animated Backdrop for Navbar dropdown */}
      <div
        onClick={() => setIsVisible(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-30 md:hidden bg-slate-950/40 dark:bg-slate-950/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible
            ? 'opacity-100 backdrop-blur-sm pointer-events-auto'
            : 'opacity-0 backdrop-blur-none pointer-events-none'
        }`}
      />

      {/* Mobile menu dropdown */}
      {isVisible && (
        <div className="absolute top-16 left-4 right-4 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-3 flex flex-col gap-1 md:hidden shadow-xl z-40 animate-[fade-drop_220ms_ease-out]">
          {navItems.map(({ label, href, icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsVisible(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 transition-all duration-200"
            >
              <span className="text-emerald-700">{icon}</span>
              {label}
            </Link>
          ))}

          {/* Mobile Theme Toggle Item */}
          <div className="pt-2 mt-1 border-t border-slate-100">
            <button
              onClick={() => {
                toggleTheme()
                setIsVisible(false)
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                {currentTheme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                )}
                <span>Theme: {currentTheme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Switch
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar