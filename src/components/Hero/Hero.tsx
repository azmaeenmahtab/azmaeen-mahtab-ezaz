'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HeroImage } from '../../utils/images'
import MagnetLines from '@/components/UI/MagnetLines'
import GradientButton from '@/components/UI/GradientButton'

// Curated skills badges matching the reference card
const aiTools = [
  {
    name: 'Claude Code',
    icon: (
      <svg className="w-3.5 h-3.5 text-[#D97757]" viewBox="0 0 24 24" fill="currentColor">
        <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
      </svg>
    ),
    borderHover: 'hover:border-amber-500/50',
  },

  {
    name: 'Antigravity',
    icon: (
      <img
        src="/antigravity-color.svg"
        alt="Antigravity"
        className="w-3.5 h-3.5 object-contain"
      />
    ),
    borderHover: 'hover:border-sky-500/50',
  },
  {
    name: 'OpenCode',
    icon: <i className="fa-solid fa-terminal text-[#a855f7] text-xs" />,
    borderHover: 'hover:border-purple-500/50',
  },

]

const stackPills = [
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/black' },
  
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
  // { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
]

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [theme, setTheme] = useState<string>('light')
  const [magnetConfig, setMagnetConfig] = useState({
    rows: 22,
    columns: 66,
    lineHeight: 10,
    lineWidth: 1.5,
    radius: 130,
    stretch: 0.25,
  })

  // Responsive MagnetLines density & dimensions for clean mobile spacing
  useEffect(() => {
    const updateMagnetConfig = () => {
      const width = window.innerWidth
      if (width < 480) {
        // Mobile phones: spacious ~15px gap per column, smaller radius
        setMagnetConfig({
          rows: 13,
          columns: 26,
          lineHeight: 6.5,
          lineWidth: 1.3,
          radius: 75,
          stretch: 0.16,
        })
      } else if (width < 768) {
        // Phablets / Small tablets
        setMagnetConfig({
          rows: 16,
          columns: 38,
          lineHeight: 8,
          lineWidth: 1.4,
          radius: 95,
          stretch: 0.2,
        })
      } else {
        // Desktop
        setMagnetConfig({
          rows: 22,
          columns: 66,
          lineHeight: 10,
          lineWidth: 1.5,
          radius: 130,
          stretch: 0.25,
        })
      }
    }

    updateMagnetConfig()
    window.addEventListener('resize', updateMagnetConfig)
    return () => window.removeEventListener('resize', updateMagnetConfig)
  }, [])

  // Synchronize theme with html data-theme attribute
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const syncTheme = () => {
        const current = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light'
        setTheme(current)
      }
      syncTheme()
      window.addEventListener('theme-change', syncTheme)

      const observer = new MutationObserver(() => syncTheme())
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

      return () => {
        window.removeEventListener('theme-change', syncTheme)
        observer.disconnect()
      }
    }
  }, [])

  const isWhiteTheme = theme === 'light'

  // Live Dhaka Local Time (GMT+6)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Dhaka',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }
        setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now))
      } catch {
        setCurrentTime('1:52 PM')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 15000)
    return () => clearInterval(timer)
  }, [])

  // Native share or copy to clipboard
  const handleShare = async () => {
    if (typeof window === 'undefined') return
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Azmaeen Mahtab Ezaz | Portfolio',
          text: 'Check out the portfolio of Azmaeen Mahtab Ezaz — Full Stack Developer & AI Engineer.',
          url: window.location.href,
        })
        return
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section ref={sectionRef} className="relative">
      {/* ── Outer Card Wrapper matching the reference aesthetic ── */}
      <div className="relative border-b border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#0c1017]/95  overflow-hidden transition-all duration-300">

        {/* 1. TOP HEADER BAR */}
        {/* <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-100 dark:border-slate-800/70 relative z-20">

           <div className="flex items-center gap-3 min-w-0">
            <div className="relative size-10 sm:size-11 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shrink-0">
              <Image
                src={HeroImage}
                alt="Azmaeen Mahtab Ezaz"
                fill
                priority
                sizes="44px"
                className="object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                  Azmaeen Mahtab Ezaz
                </span>
                <i className="fa-solid fa-circle-check text-emerald-500 text-sm shrink-0" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                Full Stack Developer &amp; AI Trainer
              </p>
            </div>
          </div>

 
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={handleShare}
              aria-label="Share profile link"
              title="Share profile link"
              className="relative p-2.5 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            >
              <i className="fa-solid fa-share-nodes text-xs sm:text-sm" />
              {copied && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-mono shadow-md whitespace-nowrap animate-fade-in pointer-events-none">
                  Copied link!
                </span>
              )}
            </button>

            <GradientButton
              href="#contact"
              size="sm"
              icon={<i className="fa-solid fa-paper-plane text-[10px]" />}
            >
              Get in touch
            </GradientButton>
          </div>
        </div> */}

        {/* 2. BANNER GRAPHIC WITH MAGNETLINES MOTION EFFECT */}
        <div
          className={`relative h-46 sm:h-44 md:h-62 w-full overflow-hidden select-none transition-colors duration-500 ${isWhiteTheme
              ? 'bg-[#fafbfc] border-b border-emerald-100/80'
              : 'bg-[#060a0f]'
            }`}
        >
          {/* Interactive MagnetLines WebGL2 Component */}
          <MagnetLines
            key={`${isWhiteTheme ? 'magnet-light' : 'magnet-dark'}-${magnetConfig.columns}`}
            rows={magnetConfig.rows}
            columns={magnetConfig.columns}
            lineColor={isWhiteTheme ? '#0077b6' : '#00b4d8'}
            accentColor={isWhiteTheme ? '#03045e' : '#90e0ef'}
            lineWidth={magnetConfig.lineWidth}
            lineHeight={magnetConfig.lineHeight}
            baseAngle={0}
            mode="orbit"
            shape="line"
            fade={isWhiteTheme ? 0.45 : 0.38}
            stretch={magnetConfig.stretch}
            radius={magnetConfig.radius}
            clickPulse={true}
            className="w-full h-full"
          />

          {/* Ambient Lighting & Vignette for seamless visual depth */}
          <div
            className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${isWhiteTheme
                ? 'bg-gradient-to-t from-white via-transparent to-transparent'
                : 'bg-gradient-to-t from-[#0c1017] via-transparent to-transparent'
              }`}
          />
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isWhiteTheme
                ? 'bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(202,240,248,0.7)_100%)]'
                : 'bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,10,15,0.75)_100%)]'
              }`}
          />

          {/* Subtle grid accent glow */}
          <div
            className={`absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl pointer-events-none transition-colors duration-500 ${isWhiteTheme ? 'bg-[#00b4d8]/15' : 'bg-[#0077b6]/20'
              }`}
          />
        </div>

        {/* 3. PROFILE BODY (Overlapping Avatar, Identity, Bio, and Stacks) */}
        <div className="relative px-6 sm:px-10 pb-10 sm:pb-12 text-center z-10">

          {/* Centered Large Circular Avatar overlapping the Banner */}
          <div className="relative -mt-18 sm:-mt-22 md:-mt-24 size-36 sm:size-44 md:size-48 mx-auto rounded-full p-[2px] bg-white dark:bg-[#0c1017] shadow-2xl border border-white/90 dark:border-slate-800 z-20">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#00b4d8] to-[#03045e]">
              <Image
                src={HeroImage}
                alt="Azmaeen Mahtab Ezaz"
                fill
                priority
                sizes="(min-width: 768px) 192px, (min-width: 640px) 176px, 144px"
                className="object-cover object-top scale-105"
              />
            </div>

          </div>

          {/* Name with Verified Checkmark */}
          <h1 className="text-2xl  sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mt-4.5">
            <span>Azmaeen Mahtab Ezaz</span>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0 inline-block align-middle"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Verified"
            >
              <path d="M8.5 12.5L10.0089 14.0089C10.3526 14.3526 10.5245 14.5245 10.7198 14.5822C10.8914 14.6328 11.0749 14.6245 11.2412 14.5585C11.4305 14.4834 11.5861 14.2967 11.8973 13.9232L16 9M16.3287 4.75855C17.0676 4.77963 17.8001 5.07212 18.364 5.636C18.9278 6.19989 19.2203 6.9324 19.2414 7.67121C19.2623 8.40232 19.2727 8.76787 19.2942 8.85296C19.3401 9.0351 19.2867 8.90625 19.383 9.06752C19.428 9.14286 19.6792 9.40876 20.1814 9.94045C20.6889 10.4778 21 11.2026 21 12C21 12.7974 20.6889 13.5222 20.1814 14.0595C19.6792 14.5912 19.428 14.8571 19.383 14.9325C19.2867 15.0937 19.3401 14.9649 19.2942 15.147C19.2727 15.2321 19.2623 15.5977 19.2414 16.3288C19.2203 17.0676 18.9278 17.8001 18.364 18.364C17.8001 18.9279 17.0676 19.2204 16.3287 19.2414C15.5976 19.2623 15.2321 19.2727 15.147 19.2942C14.9649 19.3401 15.0937 19.2868 14.9325 19.3831C14.8571 19.4281 14.5912 19.6792 14.0595 20.1814C13.5222 20.6889 12.7974 21 12 21C11.2026 21 10.4778 20.6889 9.94047 20.1814C9.40874 19.6792 9.14287 19.4281 9.06753 19.3831C8.90626 19.2868 9.0351 19.3401 8.85296 19.2942C8.76788 19.2727 8.40225 19.2623 7.67121 19.2414C6.93238 19.2204 6.19986 18.9279 5.63597 18.364C5.07207 17.8001 4.77959 17.0676 4.75852 16.3287C4.73766 15.5976 4.72724 15.2321 4.70578 15.147C4.65985 14.9649 4.71322 15.0937 4.61691 14.9324C4.57192 14.8571 4.32082 14.5912 3.81862 14.0595C3.31113 13.5222 3 12.7974 3 12C3 11.2026 3.31113 10.4778 3.81862 9.94048C4.32082 9.40876 4.57192 9.14289 4.61691 9.06755C4.71322 8.90628 4.65985 9.03512 4.70578 8.85299C4.72724 8.7679 4.73766 8.40235 4.75852 7.67126C4.77959 6.93243 5.07207 6.1999 5.63597 5.636C6.19986 5.07211 6.93238 4.77963 7.67121 4.75855C8.40232 4.73769 8.76788 4.72727 8.85296 4.70581C9.0351 4.65988 8.90626 4.71325 9.06753 4.61694C9.14287 4.57195 9.40876 4.32082 9.94047 3.81863C10.4778 3.31113 11.2026 3 12 3C12.7974 3 13.5222 3.31114 14.0595 3.81864C14.5913 4.32084 14.8571 4.57194 14.9325 4.61693C15.0937 4.71324 14.9649 4.65988 15.147 4.70581C15.2321 4.72726 15.5976 4.73769 16.3287 4.75855Z" />
            </svg>
          </h1>

          {/* Tagline */}
          {/* <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium mt-1.5 max-w-xl mx-auto">
            Less talk, show me code!
          </p> */}

          {/* Status Badge: Open to new conversations */}
          <div className="mt-3.5 inline-flex">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>Open to new opportunities</span>
            </Link>
          </div>

          {/* Professional Details & Location */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-5 font-medium">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-briefcase text-slate-400 dark:text-slate-500 text-xs" />
              <span>
                AI Engineer Intern at <strong className="text-slate-900 dark:text-white font-semibold">Kishor Coder</strong>
              </span>
            </div>

            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-slate-400 dark:text-slate-500 text-xs" />
              <span>Dhaka · {currentTime || '1:52 PM'}</span>
            </div>
          </div>

          {/* 4. TECH STACK & AI PILLS ROWS MATCHING REFERENCE CARD */}
          <div className="mt-7 space-y-2.5 max-w-3xl mx-auto">
            {/* Row 1: AI, LLM & Agentic Ecosystem */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {aiTools.map((tool) => (
                <div
                  key={tool.name}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-[#121622] text-xs font-medium text-slate-800 dark:text-slate-200 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs ${tool.borderHover}`}
                >
                  {tool.icon}
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>

            {/* Row 2: Core Engineering & Stacks */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {stackPills.map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-[#121622] text-xs font-medium text-slate-800 dark:text-slate-200 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-xs"
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-3.5 h-3.5 object-contain"
                    loading="lazy"
                  />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>


          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
