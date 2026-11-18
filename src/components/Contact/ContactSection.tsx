// ContactSection.tsx
'use client'

import { useRef, useEffect } from 'react'
import ContactForm from './ContactForm'

const contactLinks = [
  {
    label: "EMAIL",
    value: "mahtabazmaeen7@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=mahtabazmaeen7@gmail.com",
    icon: <i className="fa-solid fa-envelope text-lg" />,
    iconBg: "bg-rose-50 text-rose-600 border border-rose-200/60",
  },
  {
    label: "PHONE",
    value: "+880 1331-374944",
    href: "tel:+8801331374944",
    icon: <i className="fa-solid fa-phone text-lg" />,
    iconBg: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  },
  {
    label: "WHATSAPP",
    value: "+880 1883-105830",
    href: "https://wa.me/8801883105830",
    icon: <i className="fa-brands fa-whatsapp text-lg" />,
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/azmaeen-mahtab-ezaz",
    href: "https://linkedin.com/in/azmaeen-mahtab-ezaz",
    icon: <i className="fa-brands fa-linkedin-in text-lg" />,
    iconBg: "bg-sky-50 text-sky-600 border border-sky-200/60",
  },
  {
    label: "GITHUB",
    value: "github.com/azmaeenmahtab",
    href: "https://github.com/azmaeenmahtab",
    icon: <i className="fa-brands fa-github text-lg" />,
    iconBg: "bg-slate-100 text-slate-800 border border-slate-200",
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
    <section className="relative px-4 sm:px-6 lg:px-8 py-5 md:py-10 max-w-4xl mx-auto" id="contact" ref={sectionRef}>

      {/* Header matching About & Skills style */}
      <div
        data-reveal
        style={{ opacity: 0, transform: "translateY(14px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}
        className="flex items-center gap-3.5 mb-8 md:mb-10"
      >
        <i className="fa-regular fa-paper-plane text-2xl text-slate-800 dark:text-white" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact
          </h2>
        </div>
      </div>

      {/* Two col layout */}
      <div
        data-reveal
        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      >

        {/* Left — Talk to me */}
        <div className="space-y-4">
          <p className="text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold tracking-widest uppercase mb-6">Talk to me</p>
          {contactLinks.map((link) => (
            <div
              key={link.label}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#111622] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(4,120,87,0.08)] hover:border-emerald-300 dark:hover:border-emerald-500/50 md:p-5 p-4 flex flex-col gap-3 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${link.iconBg}`}>
                {link.icon}
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs tracking-widest font-mono uppercase">{link.label}</p>
                <p className="text-slate-900 dark:text-white text-sm mt-0.5 font-medium">{link.value}</p>
              </div>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                Write me
                <i className="fa-solid fa-arrow-right text-[10px]" />
              </a>
            </div>
          ))}
        </div>

        {/* Right — Form */}
        <div className="space-y-4">
          <p className="text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold tracking-widest uppercase mb-6">Write me your project</p>
          <ContactForm />
        </div>

      </div>
    </section>
  )
}

export default ContactSection