"use client"

import React, { useEffect, useRef } from 'react'

interface Skill {
  name: string
  icon?: string | React.ReactNode
  invert?: boolean
  customSvg?: React.ReactNode
  iconElement?: React.ReactNode
}

interface Category {
  title: string
  iconClass: string
  skills: Skill[]
}

const categories: Category[] = [
  {
    title: "AI & Agents",
    iconClass: "fa-solid fa-brain",
    skills: [
      {
        name: "Claude Code",
        customSvg: (
          <svg className="w-3.5 h-3.5 text-[#D97757]" viewBox="0 0 24 24" fill="currentColor">
            <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
          </svg>
        ),
      },
      {
        name: "Antigravity",
        customSvg: (
          <img
            src="/antigravity-color.svg"
            alt="Antigravity"
            className="w-3.5 h-3.5 object-contain"
          />
        ),
      },
      {
        name: "OpenCode",
        iconElement: <i className="fa-solid fa-terminal text-[#a855f7] text-xs" />,
      },
      // {
      //   name: "OpenAI",
      //   icon: "https://cdn.simpleicons.org/openai/000000",
      //   invert: true,
      // },
      // {
      //   name: "Google Gemini",
      //   icon: "https://cdn.simpleicons.org/google/4285F4",
      // },
    ],
  },
  {
    title: "Frontend",
    iconClass: "fa-solid fa-desktop",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      {
        name: "Next.js",
        customSvg: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-slate-900 dark:fill-white" role="img" aria-label="Next.js">
            <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
          </svg>
        ),
      },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      
      // { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "TanStack Query", icon: "https://cdn.simpleicons.org/reactquery/FF4154" },
      // { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      // { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ],
  },
  {
    title: "Backend",
    iconClass: "fa-solid fa-server",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      {
        name: "REST APIs",
        iconElement: <i className="fa-solid fa-network-wired text-sm text-[#0077b6] dark:text-[#00b4d8]" />,
      },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],
  },
    {
    title: "AI & Machine Learning",
    iconClass: "fa-solid fa-robot",
    skills: [
      { name: "Gemini API", icon: "https://cdn.simpleicons.org/googlegemini/8E75B2" },
      {
        name: "LangGraph",
        iconElement: <i className="fa-solid fa-diagram-project text-sm text-[#1C3C3C] dark:text-[#7fd1b9]" />,
      },
      {
        name: "Prompt Engineering",
        iconElement: <i className="fa-solid fa-wand-magic-sparkles text-sm text-[#a855f7]" />,
      },
      { name: "scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", invert: true },
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
      { name: "n8n", icon: "https://cdn.simpleicons.org/n8n/EA4B71" },
      // add these later, after you build something with them:
      // { name: "RAG", iconElement: <i className="fa-solid fa-book-open text-sm text-[#0077b6]" /> },
      // { name: "MCP", iconElement: <i className="fa-solid fa-plug text-sm text-[#0077b6]" /> },
      // { name: "Hugging Face", icon: "https://cdn.simpleicons.org/huggingface/FFD21E" },
      // { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain/1C3C3C", invert: true },
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
      // { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Mongoose", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" },
    ],
  },
  {
    title: "DevOps & Cloud",
    iconClass: "fa-solid fa-cloud",
    skills: [
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      {
        name: "Vercel",
        customSvg: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-slate-900 dark:fill-white" role="img" aria-label="Vercel">
            <path d="m12 1 12 21H0Z" />
          </svg>
        ),
      },
      { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
      { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      {
        name: "Render",
        customSvg: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-slate-900 dark:fill-white" role="img" aria-label="Render">
            <path d="M18.263.007c-3.121-.147-5.744 2.109-6.192 5.082-.018.138-.045.272-.067.405-.696 3.703-3.936 6.507-7.827 6.507-1.388 0-2.691-.356-3.825-.979a.2024.2024 0 0 0-.302.178V24H12v-8.999c0-1.656 1.338-3 2.987-3h2.988c3.382 0 6.103-2.817 5.97-6.244-.12-3.084-2.61-5.603-5.682-5.75" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Tools & Workflow",
    iconClass: "fa-solid fa-terminal",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      {
        name: "GitHub",
        iconElement: <i className="fa-brands fa-github text-sm text-slate-900 dark:text-white" />,
      },
      // { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      {
        name: "Bash",
        iconElement: <i className="fa-solid fa-terminal text-xs text-slate-700 dark:text-slate-300" />,
      },
    ],
  },
  {
    title: "Auth & Security",
    iconClass: "fa-solid fa-shield-halved",
    skills: [
      { name: "Better Auth", icon: "https://cdn.simpleicons.org/betterauth/000000", invert: true },
      { name: "JWT", icon: "https://cdn.simpleicons.org/jsonwebtokens/000000", invert: true },
      // { name: "Clerk", icon: "https://cdn.simpleicons.org/clerk/6C47FF" },
      // { name: "OAuth 2.0", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg" },
    ],
  },
  {
    title: "Languages",
    iconClass: "fa-solid fa-code",
    skills: [
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    ],
  }
]

const SkillSection = () => {
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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative px-4 sm:px-6 lg:px-8 py-5 md:py-10 max-w-4xl mx-auto"
    >
      {/* Header section matching user reference */}
      <div className="flex items-center gap-3.5 mb-8 md:mb-10">
        
          <i className="fa-solid fa-screwdriver-wrench text-2xl text-slate-800 dark:text-white" />
         <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills and tools
          </h2>
          
        </div>
      </div>

      {/* Categories Flowing Stream with Distinct Spacing */}
      <div className="space-y-6 sm:space-y-7">
        {categories.map((category, catIdx) => (
          <div
            key={category.title}
            data-reveal
            style={{
              opacity: 0,
              transform: "translateY(14px)",
              transition: `opacity 0.45s ease ${catIdx * 50}ms, transform 0.45s ease ${catIdx * 50}ms`,
            }}
            className="space-y-2.5"
          >
            {/* Category Subheading & Indicator */}
            {/* <div className="flex items-center gap-2 px-1">
              <i className={`${category.iconClass} text-xs text-[#0077b6] dark:text-[#00b4d8]`} />
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                {category.title}
              </span>
            </div> */}

            {/* Skill Pills Flowing One After Another */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group relative inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:border-[#0077b6]/50 dark:hover:border-[#00b4d8]/40 hover:shadow-md hover:shadow-[#0077b6]/10 dark:hover:shadow-[#00b4d8]/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu cursor-default select-none"
                >
                  {/* Brand Icon */}
                  {React.isValidElement(skill.icon) ? (
                    <span className="w-4 h-4 shrink-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
                      {skill.icon}
                    </span>
                  ) : skill.customSvg ? (
                    <span className="w-4 h-4 shrink-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
                      {skill.customSvg}
                    </span>
                  ) : skill.iconElement ? (
                    <span className="w-4 h-4 shrink-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
                      {skill.iconElement}
                    </span>
                  ) : typeof skill.icon === "string" ? (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className={`w-4 h-4 object-contain shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 ${skill.invert ? 'dark:invert' : ''}`}
                      loading="lazy"
                    />
                  ) : null}

                  {/* Skill Label */}
                  <span className="text-xs sm:text-[13px] font-medium text-slate-800 dark:text-slate-200 group-hover:text-[#0077b6] dark:group-hover:text-[#90e0ef] transition-colors duration-300 ease-out">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons: View CV & Download CV (with ultra-smooth hover animations) */}
      <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
        {/* View CV Button */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#0077b6] dark:hover:text-[#90e0ef] hover:border-[#0077b6]/50 dark:hover:border-[#00b4d8]/40 shadow-xs hover:shadow-md hover:shadow-slate-300/40 dark:hover:shadow-black/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu cursor-pointer overflow-hidden"
        >
          {/* Subtle hover background sheen */}
          <span className="absolute inset-0 bg-slate-50/80 dark:bg-slate-800/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" />

          {/* Content */}
          <span className="relative z-10 flex items-center gap-2">
            <i className="fa-regular fa-eye text-xs text-slate-500 dark:text-slate-400 group-hover:text-[#0077b6] dark:group-hover:text-[#90e0ef] transition-colors duration-300" />
            <span>View CV</span>
          </span>
        </a>

        {/* Download CV Button */}
        <a
          href="/resume.pdf"
          download="Azmaeen_Mahtab_Ezaz_Resume.pdf"
          className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#0077b6]/25 hover:shadow-xl hover:shadow-[#0077b6]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu cursor-pointer overflow-hidden"
        >
          {/* Base gradient layer */}
          <span className="absolute inset-0 bg-gradient-to-r from-[#00b4d8] via-[#0077b6] to-[#03045e] transition-opacity duration-500 ease-out" />
          {/* Hover gradient crossfade layer for buttery-smooth color transition */}
          <span className="absolute inset-0 bg-gradient-to-r from-[#0077b6] via-[#00b4d8] to-[#0077b6] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

          {/* Content */}
          <span className="relative z-10 flex items-center gap-2">
            <i className="fa-solid fa-download text-xs transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
            <span>Download CV</span>
          </span>
        </a>
      </div>
    </section>
  )
}

export default SkillSection
