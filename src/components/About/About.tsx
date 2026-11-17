'use client'

import React, { useState, useEffect } from 'react'

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [dhakaTime, setDhakaTime] = useState({
    timeStr: '6:02 PM',
    periodDesc: 'Evening in Dhaka',
    isNight: true,
  })
  const [playingLang, setPlayingLang] = useState<string | null>(null)

  // Real-time Dhaka (GMT+6) clock & period calculation
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        const timeStr = formatter.format(now)

        const hourFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: 'numeric',
          hour12: false,
        })
        const hour = parseInt(hourFormatter.format(now), 10)

        let periodDesc = 'Evening in Dhaka'
        let isNight = false

        if (hour >= 5 && hour < 12) {
          periodDesc = 'Morning in Dhaka'
          isNight = false
        } else if (hour >= 12 && hour < 17) {
          periodDesc = 'Afternoon in Dhaka'
          isNight = false
        } else if (hour >= 17 && hour < 21) {
          periodDesc = 'Evening in Dhaka'
          isNight = true
        } else {
          periodDesc = 'Night in Dhaka'
          isNight = true
        }

        setDhakaTime({ timeStr, periodDesc, isNight })
      } catch {
        // Fallback
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Audio pronunciation player using Web Speech API
  const handlePlayAudio = (lang: string) => {
    if (typeof window === 'undefined') return

    setPlayingLang(lang)
    setTimeout(() => setPlayingLang(null), 1800)

    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()

        let phrase = ''
        let langCode = 'en-US'

        if (lang === 'English') {
          phrase = 'Hello, nice to meet you!'
          langCode = 'en-GB'
        } else if (lang === 'Bangla') {
          phrase = 'নমস্কার, কেমন আছেন?'
          langCode = 'bn-BD'
        } else if (lang === 'Arabic') {
          phrase = 'مرحباً، أهلاً وسهلاً'
          langCode = 'ar-SA'
        }

        const utterance = new SpeechSynthesisUtterance(phrase)
        utterance.lang = langCode
        utterance.rate = 0.9
        utterance.onend = () => setPlayingLang(null)
        utterance.onerror = () => setPlayingLang(null)
        window.speechSynthesis.speak(utterance)
      }
    } catch {
      setPlayingLang(null)
    }
  }

  return (
    <section id="about" className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-4xl mx-auto">
      {/* Top emerald accent line */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-1 bg-emerald-600 dark:bg-emerald-500 rounded-full" />
      </div>

      {/* Main About Container */}
      <div className="space-y-6">
        {/* Header: User Icon + Title */}
        <div className="flex items-center gap-3">
          <i className="fa-regular fa-user text-2xl text-slate-800 dark:text-white" />
          <h2 className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            About
          </h2>
        </div>

        {/* Bio Paragraphs */}
        <div className="space-y-4 text-base sm:text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Hey, I'm Azmaeen here.
          </p>
          <p>
Curiosity has always been my compass. I'm drawn to learning, exploring ideas, building things, and solving problems along the way.

But there's one thought that never gets old - 
</p>

<p className='text-center'>" Somewhere out there, Someone might be using something I brought to life. "</p>

<p> And honestly, nothing inspires me to build more than that.
          </p>

          <p>
            Currently, I am working as an AI Engineer Intern at KishorCoder. I completed my first Internship as a Backend AI Engineer at Flyrank.ai. Delivered several projects on both Upwork and local market. Previously I worked as an AI Trainer at Outlier.ai, evaluating and fine-tuning frontier LLM code and general reasoning architectures.{' '}
            {!isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="inline-flex items-center gap-1 font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer select-none whitespace-nowrap"
              >
                <span>Read more</span>
                <i className="fa-solid fa-chevron-down text-xs" />
              </button>
            )}
          </p>

          {/* Smooth Collapsible Extended Prose (Paragraphs 3 & 4) */}
          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              isExpanded
                ? 'max-h-[900px] opacity-100 space-y-4 pt-0'
                : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >
            <p>
              These days I actively build with agentic engineering, so the stack matters less than the value I add: I own the system architecture, the product decisions. Most of my products run on the modern TypeScript and JavaScript ecosystem, leveraging Next.js, Express, PostgreSQL, and MongoDB with a close eye on clean SaaS UI/UX, and I natively integrate intelligence into them with models from Anthropic Claude, OpenAI, and Google Gemini.
            </p>

            <p>
              My journey is grounded in continuous learning: I study Computer Science and Engineering at Ahsanullah University of Science and Technology (AUST) in Dhaka. I&apos;ve engineered impactful products like KHUJO (an AI-driven anti-theft security ecosystem recognized in Bangladesh&apos;s National AI Hackathon) and SKYDGETS (an automated full-stack e-commerce platform). I love owning products end to end, and I&apos;m always happy to meet founders and teams building ambitious remote products.{' '}
              <button
                onClick={() => setIsExpanded(false)}
                className="inline-flex items-center gap-1 font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer select-none whitespace-nowrap"
              >
                <span>Read less</span>
                <i className="fa-solid fa-chevron-up text-xs" />
              </button>
            </p>
          </div>
        </div>

        {/* 2 Middle Cards (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-2">
          {/* Card 1: Based in Dhaka, Bangladesh (Mint Gradient) */}
          <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 border border-emerald-500/25 bg-gradient-to-br from-emerald-500/12 via-emerald-500/5 to-emerald-500/0 dark:from-emerald-500/15 dark:via-emerald-500/5 dark:to-transparent flex flex-col justify-between min-h-[200px]">
            {/* Top row: Target / location crosshairs icon + Based in */}
            <div>
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <i className="fa-solid fa-crosshairs text-sm" />
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-700 dark:text-slate-300">
                  Based in
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1.5 tracking-tight">
                Dhaka, Bangladesh
              </h3>
            </div>

            {/* Bottom row: Live Time + Period */}
            <div className="mt-6">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-[38px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-none font-sans">
                  {dhakaTime.timeStr}
                </span>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-700 tracking-wider">
                  GMT+6
                </span>
              </div>

              <div className="flex items-center gap-2 mt-3 text-xs sm:text-[13px] font-medium text-slate-600 dark:text-slate-400">
                {dhakaTime.isNight ? (
                  <i className="fa-solid fa-moon text-indigo-500 text-xs" />
                ) : (
                  <i className="fa-solid fa-sun text-amber-500 text-xs" />
                )}
                <span>{dhakaTime.periodDesc}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Works Remote-first (White/Dark Card) */}
          <div className="rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111622] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[200px]">
            <div>
              {/* Top row: Globe icon + Works */}
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <i className="fa-solid fa-globe text-sm" />
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-700 dark:text-slate-300">
                  Works
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1.5 tracking-tight">
                Remote-first
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Comfortable working with teams in any time zone, from the Americas to Europe to Asia-Pacific.
              </p>
            </div>

            {/* Tags Pills Row */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                'Remote',
                'Async-friendly',
                'US hours',
                'EU hours',
                'Flexible schedule',
              ].map((pill) => (
                <div
                  key={pill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs"
                >
                  <i className="fa-solid fa-check text-[10px] text-slate-500 dark:text-slate-400" />
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>
    </section>
  )
}
