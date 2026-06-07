// ContactSection.tsx
'use client'

import { playfairdisplay } from '@/fonts'
import { useRef, useEffect } from 'react'
import ContactForm from './ContactForm'

const contactLinks = [
  {
    label: "EMAIL",
    value: "mahtabazmaeen7@gmail.com",
    href: "mailto:mahtabazmaeen7@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    iconBg: "bg-red-500/20 text-red-400",
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/azmaeen-mahtab-ezaz",
    href: "https://linkedin.com/in/azmaeen-mahtab-ezaz",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.603 2.002 3.603 4.604v5.592z"/>
      </svg>
    ),
    iconBg: "bg-blue-500/20 text-blue-400",
  },
  {
    label: "GITHUB",
    value: "github.com/azmaeenmahtab",
    href: "https://github.com/azmaeenmahtab",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    iconBg: "bg-white/10 text-[#ede8df]",
  },
]

const ContactSection = () => {
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
    <section className="space-y-16" id="contact" ref={sectionRef}>

      {/* Heading */}
      <div
        data-reveal
        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
        className="text-center"
      >
        <h2 className={`${playfairdisplay.className} text-4xl md:text-5xl text-[#ede8df] italic`}>
          Get in Touch
        </h2>
        <p className="text-sm text-[#8a9bb0] mt-2 tracking-widest uppercase">Contact Me</p>
      </div>

      {/* Two col layout */}
      <div
        data-reveal
        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      >

        {/* Left — Talk to me */}
        <div className="space-y-4">
          <p className="text-[#8a9bb0] text-sm tracking-widest uppercase mb-6">Talk to me</p>
          {contactLinks.map((link) => (
            <div
              key={link.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm md:p-5 p-4 flex flex-col gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${link.iconBg}`}>
                {link.icon}
              </div>
              <div>
                <p className="text-[#8a9bb0] text-xs tracking-widest">{link.label}</p>
                <p className="text-[#ede8df] text-sm mt-0.5">{link.value}</p>
              </div>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c8b97a] text-xs flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                Write me
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Right — Form */}
        <div className="space-y-4">
          <p className="text-[#8a9bb0] text-sm tracking-widest uppercase mb-6">Write me your project</p>
          <ContactForm />
        </div>

      </div>
    </section>
  )
}

export default ContactSection