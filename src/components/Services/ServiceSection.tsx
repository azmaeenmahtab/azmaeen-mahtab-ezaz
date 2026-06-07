"use client"
import { playfairdisplay } from '@/fonts'
import React, { useEffect, useRef } from 'react'

const services = [
  {
    title: "Frontend Development",
    description: "Building responsive, performant UIs with React, Next.js, and Tailwind CSS that feel right to use.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" d="M3 9h18" />
        <path strokeLinecap="round" d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Backend Development",
    description: "Designing clean REST APIs and server-side logic with Node.js, Express, Spring Boot, and Django.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4M8 15l4 4 4-4" />
      </svg>
    ),
  },
  {
    title: "Full Stack Development",
    description: "End-to-end product development — from database schema to polished UI — shipped as a cohesive whole.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 2l6 6-8 8H6v-6l8-8z" />
      </svg>
    ),
  },
  {
    title: "Database Design",
    description: "Structuring efficient, scalable databases using PostgreSQL and MongoDB with clean data modelling.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path strokeLinecap="round" d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" />
        <path strokeLinecap="round" d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" />
      </svg>
    ),
  },
  {
    title: "API Development",
    description: "Building and documenting robust REST APIs — tested with Postman, versioned, and production-ready.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "AI Integration",
    description: "Integrating AI capabilities into web products — from LLM-powered features to intelligent automation.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.121m-3 0a2.25 2.25 0 01-1.5-2.121M15 3.104c.251.023.501.05.75.082M19 14.5l-4.091-4.091" />
        <circle cx="12" cy="18" r="3" />
      </svg>
    ),
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
              }, i * 110)
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
    <section className="space-y-16" id="services" ref={sectionRef}>

      {/* Heading */}
      <div
        data-reveal
        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
        className="text-center"
      >
        <h2 className={`${playfairdisplay.className} text-4xl md:text-5xl text-[#ede8df] italic`}>
          Services
        </h2>
        <p className="text-sm text-[#8a9bb0] mt-2 tracking-widest uppercase">What I offer</p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  ">
        {services.map((service, i) => (
          <div
            key={i}
            data-reveal
            style={{ opacity: 0, transform: "translateY(22px)", transition: `opacity 0.55s ease ${i * 80}ms, transform 0.55s ease ${i * 80}ms` }}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 md:p-6 lg:p-7 flex flex-col gap-10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
          >
            {/* Icon */}
            <div className="text-[#c8b97a]">
              {service.icon}
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="text-[#ede8df] text-base font-medium leading-snug">
                {service.title}
              </h3>
              <p className="text-[#8a9bb0] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default ServiceSection