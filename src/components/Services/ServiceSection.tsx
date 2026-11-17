"use client"
import { playfairdisplay } from '@/fonts'
import React, { useEffect, useRef } from 'react'
import ServiceCard from './ServiceCard'

interface ServiceItem {
  title: string
  description: string
  iconClass: string
  tags: string[]
  accentColor: string
}

const services: ServiceItem[] = [
  {
    title: "Frontend Development",
    description: "Building responsive, pixel-perfect, and accessible UIs with React, Next.js, and Tailwind CSS engineered for seamless user experience.",
    iconClass: "fa-solid fa-desktop",
    tags: ["React", "Next.js", "Tailwind CSS"],
    accentColor: "#38bdf8",
  },
  {
    title: "Backend Development",
    description: "Architecting reliable server-side services, robust business logic, and modular MVC architectures using Node.js, Express, and Spring Boot.",
    iconClass: "fa-solid fa-server",
    tags: ["Node.js", "Express", "Spring Boot"],
    accentColor: "#00b4d8",
  },
  {
    title: "Full Stack Development",
    description: "End-to-end product delivery — from normalized database models to polished interactive frontends — shipped as a coherent, performant whole.",
    iconClass: "fa-solid fa-layer-group",
    tags: ["Architecture", "OAuth", "End-to-End"],
    accentColor: "#0077b6",
  },
  {
    title: "Database Design",
    description: "Structuring high-performance schemas, relational modeling in PostgreSQL, and flexible NoSQL collections in MongoDB with atomic queries.",
    iconClass: "fa-solid fa-database",
    tags: ["PostgreSQL", "MongoDB", "Supabase"],
    accentColor: "#00b4d8",
  },
  {
    title: "API Development",
    description: "Designing, documenting, and testing production-grade REST APIs with secure JWT authentication, rate limiting, and comprehensive Postman collections.",
    iconClass: "fa-solid fa-network-wired",
    tags: ["REST APIs", "JWT", "Postman"],
    accentColor: "#0077b6",
  },
  {
    title: "AI Integration",
    description: "Connecting modern LLM pipelines, Google Gemini APIs, function calling tools, and intelligent background automation into real-world applications.",
    iconClass: "fa-solid fa-brain",
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
    <section className="space-y-16 my-25 max-w-4xl mx-auto" id="services" ref={sectionRef}>

      {/* Heading */}
      <div
        data-reveal
        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
        className="text-center space-y-2"
      >
        <h2 className={`${playfairdisplay.className} text-4xl md:text-5xl text-slate-900 dark:text-white italic tracking-tight`}>
          Services
        </h2>
        <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-mono font-semibold">
          What I offer &amp; build
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
        {services.map((service, i) => (
          <div
            key={service.title}
            data-reveal
            style={{
              opacity: 0,
              transform: "translateY(22px)",
              transition: `opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${i * 65}ms, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${i * 65}ms`,
            }}
            className="h-full"
          >
            <ServiceCard {...service} />
          </div>
        ))}
      </div>

    </section>
  )
}

export default ServiceSection
