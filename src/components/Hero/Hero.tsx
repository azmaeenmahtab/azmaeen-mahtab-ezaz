'use client'
import { playfairdisplay } from '@/fonts'
import useRoleSwitcher from '@/hooks/useRoleSwitcher'
import Image from 'next/image'
import { HeroImage } from '../../utils/images'
import Ellipse from './Ellipse'
import useRotatingAnimation from '@/hooks/useRotatingAnimation'
import { useEffect, useRef } from 'react'

const socials = [
  {
    href: "https://www.linkedin.com/in/azmaeen-mahtab-ezaz/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.603 2.002 3.603 4.604v5.592z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/azmaeenmahtab",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/mahtab_builds",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

const badges = [
  {
    value: "60+",
    label: "Problems Solved",
    position: "top-4 right-0 md:-right-6",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#c8b97a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.309 48.309 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    value: "1.5+",
    label: "Years Experience",
    position: "top-1/2 -translate-y-1/2 -left-4 md:-left-10",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#c8b97a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    value: "4+",
    label: "Projects Done",
    position: "bottom-4 right-0 md:-right-6",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#c8b97a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
  },
  {
    value: "2",
    label: "Clients Served",
    position: "bottom-4 left-0 md:-left-10",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#c8b97a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
]

const Hero = () => {
  const ellipseRef = useRotatingAnimation()
  const sectionRef = useRef<HTMLElement>(null)
  const role = useRoleSwitcher({
    roles: ["AI Trainer at Outlier.ai", "Full Stack Developer", "Competitive Programmer", "Aspiring AI/ML Engineer"]
  })

  const revealStyle = (from: 'left' | 'right' | 'up' = 'up') => {
    if (from === 'left') return { opacity: 0, transform: 'translateX(-42px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }
    if (from === 'right') return { opacity: 0, transform: 'translateX(42px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }
    return { opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll<HTMLElement>('[data-reveal]')
            reveals.forEach((el, i) => {
              const direction = el.dataset.revealFrom
              setTimeout(() => {
                el.style.opacity = '1'
                if (direction === 'left' || direction === 'right') {
                  el.style.transform = 'translateX(0)'
                } else {
                  el.style.transform = 'translateY(0)'
                }
              }, i * 90)
            })
          }
        })
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">

      {/* Left side socials */}
      {/* Left side socials — only show on very wide screens */}
      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
        {socials.map((social, i) => (
          <a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center text-[#8a9bb0] hover:text-[#ede8df] hover:border-white/20 transition-all duration-300"
          >
            {social.icon}
          </a>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1200px] w-full grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:px-8 py-20 md:grid-cols-2 md:gap-4  ">

        {/* Left — text */}
        <div
          data-reveal
          data-reveal-from="left"
          style={revealStyle('left')}
          className="flex flex-col gap-6"
        >
          <div data-reveal data-reveal-from="left" style={revealStyle('left')}>
            <p className="text-[#8a9bb0] text-sm mb-2">Hey, I&apos;m</p>
            <h1 className={`${playfairdisplay.className} text-4xl md:text-5xl lg:text-6xl text-[#ede8df] italic leading-tight`}>
              Azmaeen Mahtab Ezaz
            </h1>
            <p className="text-[#c8b97a] text-lg mt-3 font-medium">{role}</p>
          </div>

          <div data-reveal data-reveal-from="left" style={{ ...revealStyle('left'), transitionDelay: '80ms' }} className="space-y-1.5 text-[#8a9bb0] text-sm">
            <p>🚀 Turning ideas into stunning web experiences</p>
            <p>✨ Available for projects and collaborations</p>
          </div>

          <div data-reveal data-reveal-from="left" style={{ ...revealStyle('left'), transitionDelay: '140ms' }} className="flex flex-wrap gap-4 mt-2">
            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/10 text-[#ede8df] text-sm transition-all duration-300"
            >
              Say Hello
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/azmaeen-mahtab-ezaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl border border-[#c8b97a]/30 text-[#c8b97a] text-sm hover:bg-[#c8b97a]/10 transition-all duration-300"
            >
              LinkedIn Profile
            </a>
          </div>

          {/* Inline socials — hidden on xl where fixed sidebar shows */}
          <div data-reveal data-reveal-from="left" style={{ ...revealStyle('left'), transitionDelay: '200ms' }} className="flex xl:hidden items-center gap-3">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#8a9bb0] hover:text-[#ede8df] hover:border-white/20 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Scroll down */}
          <div data-reveal data-reveal-from="left" style={{ ...revealStyle('left'), transitionDelay: '260ms' }} className="flex items-center gap-2">
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <div className="w-1 h-1.5 rounded-full bg-[#8a9bb0] animate-bounce" />
            </div>
            <span className="text-[#8a9bb0] text-xs">Scroll Down</span>
          </div>
        </div>

        {/* Right — image with badges */}
        <div data-reveal data-reveal-from="right" style={revealStyle('right')} className="flex items-center justify-center">
          <div className="relative size-56 sm:size-64 md:size-72 lg:size-[22rem]">

            {/* Profile image + ellipse */}
            <Image
              src={HeroImage}
              fill
              priority
              sizes="(min-width: 1024px) 22rem, (min-width: 768px) 18rem, 16rem"
              alt="Azmaeen Mahtab Ezaz"
              className="object-contain p-1 z-10 relative"
            />
            <Ellipse
              ref={ellipseRef}
              className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-out"
            />

            {/* Floating badges */}
            {/* Floating badges — hidden on mobile, shown on md+ */}
            <div className="hidden md:block">
              {badges.map((badge, i) => (
                <div
                  key={i}
                  data-reveal
                  data-reveal-from="up"
                  style={{ ...revealStyle('up'), transitionDelay: `${i * 90}ms` }}
                  className={`absolute ${badge.position} z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0b0c0f]/80 backdrop-blur-sm px-3 py-2 min-w-[120px]`}
                >
                  {badge.icon}
                  <div>
                    <p className="text-[#ede8df] text-sm font-semibold leading-none">{badge.value}</p>
                    <p className="text-[#8a9bb0] text-[10px] mt-0.5 leading-tight">{badge.label}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        {/* Badges grid — mobile only, below image */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {badges.map((badge, i) => (
            <div
              key={i}
              data-reveal
              data-reveal-from="up"
              style={{ ...revealStyle('up'), transitionDelay: `${i * 90}ms` }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0b0c0f]/80 backdrop-blur-sm px-3 py-2"
            >
              {badge.icon}
              <div>
                <p className="text-[#ede8df] text-sm font-semibold leading-none">{badge.value}</p>
                <p className="text-[#8a9bb0] text-[10px] mt-0.5 leading-tight">{badge.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero