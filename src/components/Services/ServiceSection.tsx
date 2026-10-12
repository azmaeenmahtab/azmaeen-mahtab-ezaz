"use client"
import { playfairdisplay } from '@/fonts'
import React, { useEffect, useRef } from 'react'
import {
  Layout,
  Server,
  Layers,
  Database,
  Webhook,
  Brain,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'

interface ServiceItem {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  tags: string[]
  accentColor: string
}

const services: ServiceItem[] = [
  {
    title: "Frontend Development",
    description: "Building responsive, pixel-perfect, and accessible UIs with React, Next.js, and Tailwind CSS engineered for seamless user experience.",
    icon: Layout,
    tags: ["React", "Next.js", "Tailwind CSS"],
    accentColor: "#38bdf8",
  },
  {
    title: "Backend Development",
    description: "Architecting reliable server-side services, robust business logic, and modular MVC architectures using Node.js, Express, and Spring Boot.",
    icon: Server,
    tags: ["Node.js", "Express", "Spring Boot"],
    accentColor: "#10b981",
  },
  {
    title: "Full Stack Development",
    description: "End-to-end product delivery — from normalized database models to polished interactive frontends — shipped as a coherent, performant whole.",
    icon: Layers,
    tags: ["Architecture", "OAuth", "End-to-End"],
    accentColor: "#00e6b4",
  },
  {
    title: "Database Design",
    description: "Structuring high-performance schemas, relational modeling in PostgreSQL, and flexible NoSQL collections in MongoDB with atomic queries.",
    icon: Database,
    tags: ["PostgreSQL", "MongoDB", "Supabase"],
    accentColor: "#c8b97a",
  },
  {
    title: "API Development",
    description: "Designing, documenting, and testing production-grade REST APIs with secure JWT authentication, rate limiting, and comprehensive Postman collections.",
    icon: Webhook,
    tags: ["REST APIs", "JWT", "Postman"],
    accentColor: "#00e6b4",
  },
  {
    title: "AI Integration",
    description: "Connecting modern LLM pipelines, Google Gemini APIs, function calling tools, and intelligent background automation into real-world applications.",
    icon: Brain,
    tags: ["Gemini API", "LLM Agents", "Automation"],
    accentColor: "#e0b0ff",
  },
]

const ServiceSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll<HTMLElement>("[data-reveal]")
            reveals.forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1"
                el.style.transform = "translateY(0)"
                // Remove inline transform after entry animation so CSS hover transitions are completely fluid
                setTimeout(() => {
                  el.style.transform = ""
                }, 650)
              }, i * 85)
            })
          }
        })
      },
      { threshold: 0.08 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="space-y-16 my-25" id="services" ref={sectionRef}>

      {/* Heading */}
      <div
        data-reveal
        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
        className="text-center space-y-2"
      >
        <h2 className={`${playfairdisplay.className} text-4xl md:text-5xl text-[#ede8df] italic tracking-tight`}>
          Services
        </h2>
        <p className="text-xs sm:text-sm text-[#8a9bb0] tracking-widest uppercase font-mono">
          What I offer &amp; build
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
        {services.map((service, i) => {
          const IconComponent = service.icon

          return (
            <div
              key={service.title}
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(22px)",
                transition: `opacity 0.55s ease ${i * 70}ms, transform 0.55s ease ${i * 70}ms`,
              }}
              className="group relative rounded-2xl border border-white/10 bg-[#12151c]/80 hover:bg-[#161a23] hover:border-white/25 backdrop-blur-md p-6 lg:p-7 flex flex-col justify-between gap-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#00e6b4]/5 cursor-default overflow-hidden"
            >
              {/* Subtle radial glow effect in the corner on hover */}
              <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br from-[#00e6b4]/15 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="space-y-5 relative z-10">
                {/* Header: Icon container & micro badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#c8b97a] group-hover:text-[#00e6b4] group-hover:border-[#00e6b4]/30 group-hover:bg-[#00e6b4]/10 group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300 shadow-sm">
                    <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-mono text-white/30 group-hover:text-[#00e6b4]/80 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00e6b4] group-hover:animate-ping transition-colors" />
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </div>
                </div>

                {/* Content: Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-[#ede8df] text-base lg:text-lg font-semibold tracking-tight group-hover:text-[#00e6b4] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-[#8a9bb0] text-xs sm:text-sm leading-relaxed group-hover:text-[#a0b0c5] transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Tags footer */}
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/5 relative z-10">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-lg border border-white/5 bg-white/[0.02] px-2 py-0.5 text-[11px] font-mono text-[#8a9bb0] group-hover:border-white/10 group-hover:text-[#ede8df] group-hover:bg-white/[0.05] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}

export default ServiceSection