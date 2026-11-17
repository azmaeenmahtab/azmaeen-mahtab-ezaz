'use client'

import { themes } from '@/appData'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useEffect, useState } from 'react'

const ThemeMenu = () => {
  const [theme, setTheme] = useState('light')
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const menuRef = useOutsideClick(() => setShowThemeMenu(false))

  // Allow external components (e.g. Navbar toggle) to sync or open
  useEffect(() => {
    const handleOpen = () => setShowThemeMenu(true)
    const handleSync = () => {
      const current = localStorage.getItem('theme') || 'light'
      setTheme(current)
    }
    window.addEventListener('open-theme-menu', handleOpen)
    window.addEventListener('theme-change', handleSync)
    return () => {
      window.removeEventListener('open-theme-menu', handleOpen)
      window.removeEventListener('theme-change', handleSync)
    }
  }, [])

  useEffect(() => {
    if (window) setTheme(localStorage.getItem('theme') ?? 'light')
  }, [])

  useEffect(() => {
    if (window) document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const changeTheme = (theme: string) => {
    if (window) {
      setTheme(theme)
      localStorage.setItem('theme', theme)
    }
  }

  return (
    <div ref={menuRef} className="fixed right-5 bottom-5 z-50 md:right-8 md:bottom-8">
      <button
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        aria-label="Toggle theme menu"
        title="Change theme"
        className="group relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-black/10 hover:shadow-blue-900/15 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <div className="grid grid-cols-2 place-content-center gap-1 rounded-full p-1 bg-slate-100 dark:bg-slate-800">
          <div className="size-2 rounded-t-full rounded-bl-full bg-[#0077b6] md:size-2.5"></div>
          <div className="size-2 rounded-t-full rounded-br-full bg-[#00b4d8] md:size-2.5"></div>
          <div className="size-2 rounded-tl-full rounded-b-full bg-[#0f172a] md:size-2.5"></div>
          <div className="size-2 rounded-tr-full rounded-b-full bg-[#94a3b8] md:size-2.5"></div>
        </div>
      </button>

      {showThemeMenu && (
        <div className="bg-white text-slate-800 animate-fade-in border border-slate-200 shadow-2xl absolute right-0 bottom-full mb-3 space-y-3 rounded-2xl p-4 md:p-5 min-w-[220px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">Select Theme</span>
            <button
              onClick={() => setShowThemeMenu(false)}
              className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>

          <div className="space-y-2">
            {themes.map(({ name, colors }) => (
              <button
                key={name}
                onClick={() => changeTheme(name.toLowerCase())}
                style={{ background: colors[0], color: colors[1] }}
                className={`w-full flex cursor-pointer items-center justify-between rounded-xl p-3 border transition-all text-left ${
                  theme === name.toLowerCase()
                    ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <i className={`fa-solid fa-check text-xs ${name.toLowerCase() === theme ? 'opacity-100' : 'opacity-0'}`} />
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {colors.slice(2, 5).map((color, idx) => (
                    <div
                      key={color + idx}
                      style={{ background: color }}
                      className="size-2.5 rounded-full border border-black/10"
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeMenu
