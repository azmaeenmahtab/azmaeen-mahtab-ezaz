"use client"

import React, { useEffect, useRef } from 'react'
import { playfairdisplay } from '@/fonts'

interface Skill {
  name: string
  icon?: string
  invert?: boolean
  customSvg?: React.ReactNode
}

interface Category {
  title: string
  iconClass: string
  skills: Skill[]
}

const SkillSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals =
              entry.target.querySelectorAll<HTMLElement>("[data-reveal]")
            reveals.forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1"
                el.style.transform = "translateY(0)"
                setTimeout(() => {
                  el.style.transform = ""
                }, 650)
              }, i * 45)
            })
          }
        })
      },
      { threshold: 0.08 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const categories: Category[] = [
    {
      title: "Languages",
      iconClass: "fa-solid fa-code",
      skills: [
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      ],
    },
    {
      title: "Frontend",
      iconClass: "fa-solid fa-desktop",
      skills: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        {
          name: "Next.js",
          icon: "https://cdn.simpleicons.org/nextdotjs/000000",
          customSvg: (
            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-slate-900" role="img" aria-label="Next.js">
              <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
            </svg>
          ),
        },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
        {
          name: "TanStack Query",
          icon: "https://cdn.simpleicons.org/reactquery/FF4154",
        },
      ],
    },
    {
      title: "Backend",
      iconClass: "fa-solid fa-server",
      skills: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
        { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
        {
          name: "REST APIs",
          customSvg: (
            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Databases",
      iconClass: "fa-solid fa-database",
      skills: [
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
        { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      ],
    },
    {
      title: "DevOps & Cloud",
      iconClass: "fa-solid fa-cloud",
      skills: [
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invert: true },
        { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
        { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
        {
          name: "Render",
          icon: "https://cdn.simpleicons.org/render/000000",
          customSvg: (
            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-slate-900" role="img" aria-label="Render">
              <path d="M18.263.007c-3.121-.147-5.744 2.109-6.192 5.082-.018.138-.045.272-.067.405-.696 3.703-3.936 6.507-7.827 6.507-1.388 0-2.691-.356-3.825-.979a.2024.2024 0 0 0-.302.178V24H12v-8.999c0-1.656 1.338-3 2.987-3h2.988c3.382 0 6.103-2.817 5.97-6.244-.12-3.084-2.61-5.603-5.682-5.75" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Mobile",
      iconClass: "fa-solid fa-mobile-screen-button",
      skills: [
        { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      ],
    },
    {
      title: "Tools",
      iconClass: "fa-solid fa-terminal",
      skills: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
        { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
        { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", invert: true },
        { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      ],
    },
    {
      title: "Auth & Security",
      iconClass: "fa-solid fa-shield-halved",
      skills: [
        {
          name: "Better Auth",
          icon: "https://cdn.simpleicons.org/betterauth/000000",
        },
        {
          name: "JWT",
          icon: "https://cdn.simpleicons.org/jsonwebtokens/000000",
        },
        {
          name: "Clerk",
          icon: "https://cdn.simpleicons.org/clerk/6C47FF",
        },
        { name: "OAuth 2.0", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg" },
        { name: "Mongoose", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" },
      ],
    },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative px-4 sm:px-6 lg:px-8 py-10 md:py-10 max-w-4xl mx-auto overflow-hidden"
    >
      {/* Header section */}
      <div className="mb-8 md:mb-11">
        
        <h2
          data-reveal
          style={{ opacity: 0, transform: "translateY(16px)" }}
          className={`${playfairdisplay.className}   text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.15] text-black dark:text-white transition-all duration-500 ease-out`}
        >
          Skills &amp;{" "}
          <em className="not-italic text-black dark:text-white">
            Technologies
          </em>
        </h2>
      </div>

      {/* 4-column responsive grid matching the reference layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-6">
        {categories.map((category) => {
          return (
            <div
              key={category.title}
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(16px)",
              }}
              className="group/card relative flex flex-col rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#111622] hover:bg-slate-50/50 dark:hover:bg-slate-800/40 p-5 md:p-6 backdrop-blur-md transition-all duration-500 ease-out hover:border-emerald-400 dark:hover:border-emerald-500/50 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(4,120,87,0.08)]"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 group-hover/card:bg-emerald-100 dark:group-hover/card:bg-emerald-900/50 transition-colors duration-300">
                  <i className={`${category.iconClass} text-sm`} />
                </div>
                <h3 className="font-semibold text-[15px] md:text-base text-slate-900 dark:text-white tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2.5 items-center">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/90 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-300 dark:hover:border-emerald-600/50 transition-all duration-300 ease-out group/pill cursor-default select-none shadow-sm hover:shadow-[0_2px_12px_rgba(16,185,129,0.1)]"
                  >
                    {skill.customSvg ? (
                      <span className="w-4 h-4 shrink-0 flex items-center justify-center">
                        {skill.customSvg}
                      </span>
                    ) : skill.icon ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-4 h-4 object-contain shrink-0"
                        loading="lazy"
                      />
                    ) : null}

                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover/pill:text-emerald-900 dark:group-hover/pill:text-emerald-300 transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SkillSection
