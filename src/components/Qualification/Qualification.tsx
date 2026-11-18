'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface ExperienceItem {
  id: string
  role: string
  company: string
  employmentType: string
  locationType: string
  period: string
  logo?: string
  pseudoIcon?: {
    icon: string
    bgGradient: string
  }
  isActive: boolean
  description: string
  skills: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: 'exp-kishorcoder',
    role: 'AI Engineer Intern',
    company: 'KishorCoder',
    employmentType: 'Internship',
    locationType: 'Dhaka, Bangladesh',
    period: 'Jul 2026 – Present',
    logo: '/images/experience/kishorcoder.webp',
    isActive: true,
    description:
      'Developing intelligent agent workflows, integrating frontier LLMs, fine-tuning retrieval architectures, and implementing production backend AI systems.',
    skills: ['AI Engineering', 'LLM Integration', 'Autonomous Agents', 'Python', 'FastAPI', 'System Architecture'],
  },
  {
    id: 'exp-outlier',
    role: 'AI Trainer — Full Stack & Code Evaluation',
    company: 'Outlier AI',
    employmentType: 'Contract',
    locationType: 'Remote',
    period: 'Apr 2026 – Jul 2026 · 4 mos',
    logo: '/images/experience/outlier.jpg',
    isActive: false,
    description:
      'Trained and evaluated frontier LLMs on complex full-stack coding tasks, autonomous agent workflows, algorithmic problem solving, and production-grade software architecture.',
    skills: ['LLM Evaluation', 'Full-Stack Coding', 'Agent Workflows', 'Python', 'TypeScript', 'System Design'],
  },
  {
    id: 'exp-upwork',
    role: 'Full Stack Developer',
    company: 'Upwork',
    employmentType: 'Freelance',
    locationType: 'Remote',
    period: '2025 – Present',
    logo: '/images/experience/upwork.png',
    isActive: true,
    description:
      'Delivering end-to-end web applications, performant RESTful APIs, and pixel-perfect interactive frontends for international clients with modern full-stack architectures.',
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Tailwind CSS'],
  },
]

const educations: ExperienceItem[] = [
  {
    id: 'edu-aust',
    role: 'B.Sc. in Computer Science & Engineering',
    company: 'Ahsanullah University of Science & Technology',
    employmentType: 'Undergraduate',
    locationType: 'Dhaka',
    period: '2024 – Present',
    pseudoIcon: {
      icon: 'fa-solid fa-graduation-cap',
      bgGradient: 'from-[#0077b6] via-[#023e8a] to-[#03045e]',
    },
    isActive: true,
    description:
      'Pursuing comprehensive coursework in algorithms, data structures, computer architecture, systems design, software engineering, and applied artificial intelligence.',
    skills: ['Data Structures', 'Algorithms', 'OOP', 'Software Engineering', 'Database Systems', 'AI'],
  },
  {
    id: 'edu-dcc',
    role: 'Higher Secondary Certificate (HSC)',
    company: 'Dhaka City College',
    employmentType: 'Science Stream',
    locationType: 'Dhaka',
    period: '2021 – 2023',
    pseudoIcon: {
      icon: 'fa-solid fa-building-columns',
      bgGradient: 'from-[#00b4d8] to-[#0077b6]',
    },
    isActive: false,
    description:
      'Built rigorous foundations in analytical reasoning, advanced mathematics, physics, and chemistry with distinguished academic standing.',
    skills: ['Higher Mathematics', 'Physics', 'Chemistry', 'Analytics'],
  },
  {
    id: 'edu-bpg',
    role: 'Secondary School Certificate (SSC)',
    company: 'Bir Pratik Gazi High School',
    employmentType: 'Science Stream',
    locationType: 'Dhaka',
    period: '2016 – 2021',
    pseudoIcon: {
      icon: 'fa-solid fa-school',
      bgGradient: 'from-[#48cae4] to-[#023e8a]',
    },
    isActive: false,
    description:
      'Graduated with excellent marks and core grounding in science, general mathematics, and early computer fundamentals.',
    skills: ['General Science', 'Mathematics', 'Computer Basics'],
  },
]

export default function QualificationSection() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience')
  const experienceTabRef = useRef<HTMLButtonElement>(null)
  const educationTabRef = useRef<HTMLButtonElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    const updateIndicator = () => {
      const activeBtn = activeTab === 'experience' ? experienceTabRef.current : educationTabRef.current
      if (activeBtn) {
        setIndicatorStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          opacity: 1,
        })
      }
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeTab])

  const currentItems = activeTab === 'experience' ? experiences : educations

  return (
    <section
      className="relative px-4 sm:px-6 lg:px-8 py-5 md:py-10 max-w-4xl mx-auto"
      id="qualification"
    >
      {/* Section Header */}
      {/* <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#caf0f8]/70 dark:bg-[#0077b6]/15 text-[#0077b6] dark:text-[#90e0ef] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <i className="fa-solid fa-compass text-[11px]" />
          <span>My Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Qualifications &amp; Background
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3 font-normal leading-relaxed">
          Explore my professional industry experience and academic engineering background.
        </p>
      </div> */}

      {/* Tabs Navigation (matching user reference) */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 mb-10 sm:mb-12">
        <div className="relative flex items-center justify-center gap-8 sm:gap-12">
          {/* Experience Tab */}
          <button
            ref={experienceTabRef}
            onClick={() => setActiveTab('experience')}
            className={`relative pb-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors duration-250 cursor-pointer ${
              activeTab === 'experience'
                ? 'text-[#0077b6] dark:text-[#00b4d8]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>Experience</span>
          </button>

          {/* Education Tab */}
          <button
            ref={educationTabRef}
            onClick={() => setActiveTab('education')}
            className={`relative pb-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors duration-250 cursor-pointer ${
              activeTab === 'education'
                ? 'text-[#0077b6] dark:text-[#00b4d8]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>Education</span>
          </button>

          {/* Smooth Sliding Underline Indicator */}
          <span
            className="absolute bottom-0 h-[2.5px] bg-[#0077b6] dark:bg-[#00b4d8] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
        </div>
      </div>

      {/* Timeline List (matching user unit design reference) */}
      <div className="space-y-0" key={activeTab}>
        {currentItems.map((item, index) => {
          const isLast = index === currentItems.length - 1

          return (
            <div
              key={`${activeTab}-${item.id}`}
              style={{ animationDelay: `${index * 85}ms` }}
              className="relative flex gap-4 sm:gap-5 group animate-qualification-unit"
            >
              {/* Left Column: Icon + Vertical Connecting Line */}
              <div className="relative flex flex-col items-center shrink-0">
                {/* Icon Container with Corner Status Dot */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] sm:rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt={item.company}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${item.pseudoIcon?.bgGradient} flex items-center justify-center text-white`}
                    >
                      <i className={`${item.pseudoIcon?.icon} text-lg sm:text-xl`} />
                    </div>
                  )}

                  {/* Corner Status Dot (matching reference image) */}
                  
                </div>

                {/* Vertical Connecting Line to Next Unit */}
                {!isLast && (
                  <div className="w-[1.5px] flex-1 bg-slate-200/90 dark:bg-slate-800 my-2.5 min-h-[48px]" />
                )}
              </div>

              {/* Right Column: Title, Subtitle, Date, Description & Tags */}
              <div className={`flex-1 ${isLast ? 'pb-4' : 'pb-10 sm:pb-12'}`}>
                {/* Top Row: Title + Date */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
                    {item.role}
                  </h3>
                  <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 shrink-0">
                    {item.period}
                  </span>
                </div>

                {/* Subtitle: Company · Type · Location */}
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {item.company}
                  </span>
                  <span>·</span>
                  <span>{item.employmentType}</span>
                  <span>·</span>
                  <span>{item.locationType}</span>
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mt-2.5 max-w-2xl">
                  {item.description}
                </p>

                {/* Skill / Highlights Pills */}
                {item.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-lg border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-2.5 py-0.5 text-[11px] text-slate-600 dark:text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
