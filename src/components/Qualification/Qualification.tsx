'use client'

import React, { useEffect, useRef, useState } from 'react'

interface QualificationItem {
  id: string
  title: string
  place: string
  period: string
  description?: string
  status?: string
  icon: string
  type: 'experience' | 'education'
  accentColor: string
  dotColor: string
}

const allItems: QualificationItem[] = [
  {
    id: 'exp-1',
    title: 'AI Trainer — Full Stack & Code Evaluation',
    place: 'Outlier AI',
    period: '2026 – Present',
    description: 'Training and evaluating state-of-the-art LLMs on full-stack coding tasks, agent workflows, and software architecture.',
    status: 'Active',
    icon: 'fa-solid fa-brain',
    type: 'experience',
    accentColor: 'text-[#0077b6] bg-[#caf0f8]/60 dark:bg-[#0077b6]/15 dark:text-[#90e0ef]',
    dotColor: '#0077b6',
  },
  {
    id: 'exp-2',
    title: 'Full Stack Developer',
    place: 'Upwork (Freelance)',
    period: '2025 – Present',
    description: 'Building modern web applications, scalable APIs, and responsive frontends for global clients with React, Next.js, and Node.js.',
    status: 'Top Rated',
    icon: 'fa-solid fa-laptop-code',
    type: 'experience',
    accentColor: 'text-teal-600 bg-teal-500/10 dark:text-teal-400',
    dotColor: '#00b4d8',
  },
  {
    id: 'edu-1',
    title: 'B.Sc. in Computer Science & Engineering',
    place: 'Ahsanullah University of Science & Technology',
    period: '2024 – Present',
    description: 'Focusing on algorithms, data structures, software engineering, and artificial intelligence.',
    status: 'Undergraduate',
    icon: 'fa-solid fa-graduation-cap',
    type: 'education',
    accentColor: 'text-[#0077b6] bg-[#caf0f8]/60 dark:bg-[#0077b6]/15 dark:text-[#90e0ef]',
    dotColor: '#0077b6',
  },
  {
    id: 'edu-2',
    title: 'Higher Secondary Certificate (HSC)',
    place: 'Dhaka City College',
    period: '2021 – 2023',
    description: 'Science stream with mathematics, physics, chemistry, and higher level analytics.',
    status: 'Completed',
    icon: 'fa-solid fa-building-columns',
    type: 'education',
    accentColor: 'text-sky-600 bg-sky-500/10 dark:text-sky-400',
    dotColor: '#00b4d8',
  },
  {
    id: 'edu-3',
    title: 'Secondary School Certificate (SSC)',
    place: 'Bir Pratik Gazi High School',
    period: '2016 – 2021',
    description: 'Graduated with strong foundations in science and mathematics.',
    status: 'Completed',
    icon: 'fa-solid fa-school',
    type: 'education',
    accentColor: 'text-indigo-600 bg-indigo-500/10 dark:text-indigo-400',
    dotColor: '#90e0ef',
  },
]

const experience = allItems.filter((i) => i.type === 'experience')
const education = allItems.filter((i) => i.type === 'education')

/* ─── Desktop Card ─── */
function DesktopCard({ item, isVisible, index }: { item: QualificationItem; isVisible: boolean; index: number }) {
  return (
    <div
      data-item-id={item.id}
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`relative p-5 sm:p-6 rounded-[22px] bg-slate-100/70 dark:bg-[#121622]/70 hover:bg-slate-100 dark:hover:bg-[#161c2a] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-default ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.accentColor}`}>
            <i className={`${item.icon} text-sm`} />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-base sm:text-[17px] text-slate-900 dark:text-white leading-snug tracking-tight">
              {item.title}
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-[#0077b6] dark:text-emerald-400 truncate mt-0.5">
              {item.place}
            </p>
          </div>
        </div>
        {item.status && (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#caf0f8]/70 dark:bg-emerald-500/10 text-[#0077b6] dark:text-emerald-400 shrink-0">
            {item.status}
          </span>
        )}
      </div>
      {item.description && (
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-2">
          {item.description}
        </p>
      )}
      <div className="flex items-center gap-2 mt-4 pt-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium">
        <i className="fa-regular fa-calendar text-[10px] text-[#0077b6] dark:text-emerald-400" />
        <span>{item.period}</span>
      </div>
    </div>
  )
}

/* ─── Mobile Timeline Item ─── */
function TimelineItem({
  item,
  isVisible,
  isLast,
  lineProgress,
}: {
  item: QualificationItem
  isVisible: boolean
  isLast: boolean
  lineProgress: number
}) {
  const typeLabel = item.type === 'experience' ? 'Work' : 'Education'

  return (
    <div className="relative flex gap-5 pl-1" data-item-id={item.id}>
      {/* Left: dot + line segment */}
      <div className="relative flex flex-col items-center w-8 shrink-0">
        {/* Dot */}
        <div
          className="relative z-10 mt-1 flex items-center justify-center transition-all duration-700"
          style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}
        >
          {/* Outer ring pulse when visible */}
          {isVisible && (
            <span
              className="absolute w-6 h-6 rounded-full animate-ping opacity-30"
              style={{ backgroundColor: item.dotColor }}
            />
          )}
          <div
            className={`w-4 h-4 rounded-full border-2 border-white dark:border-[#0c1017] flex items-center justify-center transition-all duration-500 ${
              isVisible ? 'scale-100' : 'scale-0'
            }`}
            style={{
              backgroundColor: isVisible ? item.dotColor : 'transparent',
              borderColor: isVisible ? item.dotColor : '#cbd5e1',
              boxShadow: isVisible ? `0 0 10px ${item.dotColor}80` : 'none',
            }}
          />
        </div>

        {/* Line segment below dot */}
        {!isLast && (
          <div className="relative mt-1 w-px flex-1 bg-slate-200 dark:bg-slate-800 overflow-hidden rounded-full min-h-[40px]">
            <div
              className="absolute inset-x-0 top-0 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                height: isVisible ? '100%' : '0%',
                background: `linear-gradient(to bottom, ${item.dotColor}, ${item.dotColor}60)`,
                transitionDelay: '300ms',
              }}
            />
          </div>
        )}
      </div>

      {/* Right: content */}
      <div
        className={`flex-1 pb-9 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}
        style={{ transitionDelay: isVisible ? '80ms' : '0ms' }}
      >
        {/* Type tag + period row */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{
              color: item.dotColor,
              backgroundColor: `${item.dotColor}18`,
            }}
          >
            {typeLabel}
          </span>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">{item.period}</span>
        </div>

        {/* Title */}
        <h4 className="text-[15px] font-bold text-slate-900 dark:text-white leading-snug tracking-tight mb-0.5">
          {item.title}
        </h4>

        {/* Place + status row */}
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className="text-[13px] font-semibold" style={{ color: item.dotColor }}>
            {item.place}
          </span>
          {item.status && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ color: item.dotColor, backgroundColor: `${item.dotColor}18` }}
            >
              {item.status}
            </span>
          )}
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </div>
  )
}

/* ─── Main Section ─── */
export default function QualificationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-item-id')
            if (id) {
              setVisibleItems((prev) => {
                const next = new Set(prev)
                next.add(id)
                return next
              })
            }
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    )

    const cards = sectionRef.current?.querySelectorAll('[data-item-id]')
    cards?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" id="qualification" ref={sectionRef}>
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#caf0f8]/60 dark:bg-[#0077b6]/10 text-[#0077b6] dark:text-[#90e0ef] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <i className="fa-solid fa-compass text-[11px]" />
          <span>My Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Qualifications &amp; Background
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3 font-normal leading-relaxed">
          My academic foundation and professional track record building scalable software and AI systems.
        </p>
      </div>

      {/* ── Mobile: two separate timelines (< lg) ── */}
      <div className="lg:hidden space-y-12">

        {/* Experience timeline */}
        <div>
          <div className="flex items-center gap-3 mb-7 pl-1">
            <div className="w-9 h-9 rounded-xl bg-[#caf0f8]/60 dark:bg-[#0077b6]/15 flex items-center justify-center text-[#0077b6] dark:text-[#90e0ef] shrink-0">
              <i className="fa-solid fa-briefcase text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Experience</h3>
              <p className="text-[11px] text-slate-400 font-medium">Professional roles &amp; freelance work</p>
            </div>
          </div>
          {experience.map((item, idx) => (
            <TimelineItem
              key={item.id}
              item={item}
              isVisible={visibleItems.has(item.id)}
              isLast={idx === experience.length - 1}
              lineProgress={visibleItems.has(item.id) ? 100 : 0}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 pl-1">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 shrink-0">Education</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Education timeline */}
        <div>
          <div className="flex items-center gap-3 mb-7 pl-1">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
              <i className="fa-solid fa-graduation-cap text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Education</h3>
              <p className="text-[11px] text-slate-400 font-medium">Academic degrees &amp; certifications</p>
            </div>
          </div>
          {education.map((item, idx) => (
            <TimelineItem
              key={item.id}
              item={item}
              isVisible={visibleItems.has(item.id)}
              isLast={idx === education.length - 1}
              lineProgress={visibleItems.has(item.id) ? 100 : 0}
            />
          ))}
        </div>

      </div>

      {/* ── Desktop: two columns (lg+) ── */}
      <div className="hidden lg:grid grid-cols-2 gap-8 lg:gap-10">
        {/* Experience column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-1 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#caf0f8]/60 dark:bg-[#0077b6]/15 flex items-center justify-center text-[#0077b6] dark:text-[#90e0ef] shrink-0">
              <i className="fa-solid fa-briefcase text-base" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Experience</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Professional roles &amp; freelance work</p>
            </div>
          </div>
          <div className="space-y-4">
            {experience.map((item, index) => (
              <DesktopCard key={item.id} item={item} isVisible={visibleItems.has(item.id)} index={index} />
            ))}
          </div>
        </div>

        {/* Education column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-1 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
              <i className="fa-solid fa-graduation-cap text-base" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Education</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Academic degrees &amp; certifications</p>
            </div>
          </div>
          <div className="space-y-4">
            {education.map((item, index) => (
              <DesktopCard key={item.id} item={item} isVisible={visibleItems.has(item.id)} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
