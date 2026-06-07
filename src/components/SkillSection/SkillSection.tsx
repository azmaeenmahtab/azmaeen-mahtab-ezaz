"use client"
import { playfairdisplay } from '@/fonts'
import React, { useEffect, useRef } from 'react'

const SkillSection = () => {
  const techs = [
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  ]

  const categories = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", level: "Advanced" },
        { name: "TypeScript", level: "Advanced" },
        { name: "Java", level: "Intermediate" },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React", level: "Advanced" },
        { name: "Next.js", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: "Advanced" },
        { name: "Express", level: "Advanced" },
        { name: "Spring Boot", level: "Intermediate" },
      ],
    },
    {
      title: "Database & Tools",
      skills: [
        { name: "PostgreSQL", level: "Intermediate" },
        { name: "MongoDB", level: "Intermediate" },
        { name: "Git", level: "Advanced" },
        { name: "GitHub", level: "Advanced" },
        { name: "Postman", level: "Advanced" },
      ],
    },
  ]

  const levelColor: Record<string, string> = {
    Advanced: "text-[#c8b97a]",
    Intermediate: "text-[#8a9bb0]",
  }

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals =
              entry.target.querySelectorAll<HTMLElement>("[data-reveal]");
            reveals.forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }, i * 60);
            });
          }
        });
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="space-y-16 px-4 sm:px-6 lg:px-8" id='skills' ref={sectionRef}>
      <div className="text-center">
        <h2
          data-reveal
          style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
          className={`${playfairdisplay.className} italic text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.1] text-[#e8e2d5]`}
        >
          Technologies {" "}
          <em className="text-[22px] not-italic text-[#00e6b4]">
            my tech stack.
          </em>
        </h2>
      </div>

      {/* — Circular icon grid — */}
<div
  data-reveal
  style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
  className="max-w-5xl mx-auto mt-10"
>
  {/* Mobile & tablet — simple responsive grid */}
<div className="md:hidden">
  {/* First 12 in a 4-col grid */}
  <div className="grid grid-cols-4 gap-4 justify-items-center">
    {techs.slice(0, 12).map((tech) => (
      <div
        key={tech.name}
        data-reveal
        style={{ opacity: 0, transform: "translateY(18px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}
        className="flex flex-col items-center gap-2 group"
      >
        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:-translate-y-1 group-hover:scale-105">
          <img src={tech.icon} className="w-7 h-7 dark:invert" alt={tech.name} />
        </div>
        <span className="text-[10px] text-[#8a9bb0] text-center leading-tight">{tech.name}</span>
      </div>
    ))}
  </div>

  {/* Remaining icons centered */}
  <div className="flex justify-around gap-4 mt-4">
    {techs.slice(12).map((tech) => (
      <div
        key={tech.name}
        data-reveal
        style={{ opacity: 0, transform: "translateY(18px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}
        className="flex flex-col items-center gap-2 group w-14"
      >
        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:-translate-y-1 group-hover:scale-105">
          <img src={tech.icon} className="w-7 h-7 dark:invert" alt={tech.name} />
        </div>
        <span className="text-[10px] text-[#8a9bb0] text-center leading-tight">{tech.name}</span>
      </div>
    ))}
  </div>
</div>

  {/* Desktop — 8 + centered 6 layout */}
  <div className="hidden md:block">
    {/* Row 1 — 8 icons */}
    <div className="grid grid-cols-8 gap-5">
      {techs.slice(0, 8).map((tech) => (
        <div
          key={tech.name}
          data-reveal
          style={{ opacity: 0, transform: "translateY(18px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-[72px] h-[72px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:-translate-y-1 group-hover:scale-105">
            <img src={tech.icon} className="w-8 h-8 dark:invert" alt={tech.name} />
          </div>
          <span className="text-xs text-[#8a9bb0] text-center">{tech.name}</span>
        </div>
      ))}
    </div>

    {/* Row 2 — 6 icons centered */}
    <div className="flex justify-center gap-10 mt-5">
      {techs.slice(8).map((tech) => (
        <div
          key={tech.name}
          data-reveal
          style={{ opacity: 0, transform: "translateY(18px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}
          className="flex flex-col items-center gap-2 group w-[72px]"
        >
          <div className="w-[72px] h-[72px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:-translate-y-1 group-hover:scale-105">
            <img src={tech.icon} className="w-8 h-8 dark:invert" alt={tech.name} />
          </div>
          <span className="text-xs text-[#8a9bb0] text-center">{tech.name}</span>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* — Category cards — */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <div
            key={cat.title}
            data-reveal
            style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6 backdrop-blur-sm"
          >
            <h3 className="text-sm font-semibold text-white/80 mb-4 tracking-wide">
              {cat.title}
            </h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8b97a]/60 shrink-0" />
                  <div>
                    <p className="text-sm text-white/70 leading-none">{skill.name}</p>
                    <p className={`text-[11px] mt-0.5 ${levelColor[skill.level]}`}>
                      {skill.level}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default SkillSection