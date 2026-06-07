"use client"
import { playfairdisplay } from '@/fonts'
import React, { useEffect, useRef } from 'react'

const QualificationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll<HTMLElement>("[data-reveal]");
            reveals.forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }, i * 110);
            });
          }
        });
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const experience = [
    {
      title: "Full Stack Developer - Freelance",
      place: "Upwork",
      period: "2025 – Present",
    },
    {
      title: "AI Trainer",
      place: "Outlier AI",
      period: "2026 – Present",
    },
  ]

  const education = [
    {
      title: "SSC",
      place: "Bir Pratik Gazi High School",
      period: "2016 – 2021",
    },
    {
      title: "HSC",
      place: "Dhaka City College",
      period: "2021 – 2023",
    },
    {
      title: "B.Sc. in CSE",
      place: "Ahsanullah University of Science & Technology",
      period: "2024 – Present",
    },
  ]

  return (
    <section className="space-y-16 mt-30 px-4 sm:px-6 lg:px-8" id="qualification" ref={sectionRef}>

      {/* Heading */}
      <div
        data-reveal
        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
        className="text-center"
      >
        <h2 className={`${playfairdisplay.className} text-4xl md:text-5xl text-[#ede8df] italic`}>
          Qualification
        </h2>
        <p className="text-sm text-[#8a9bb0] mt-2 tracking-widest uppercase">My personal journey</p>
      </div>

      {/* Timeline */}
      <div
        data-reveal
        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
        className="relative max-w-3xl mx-auto grid grid-cols-2 gap-x-0"
      >

        {/* Column headers */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#c8b97a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
          </svg>
          <span className="text-[#ede8df] text-sm font-medium tracking-wide">Experience</span>
        </div>
        <div className="flex items-center justify-center gap-2 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#c8b97a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 3.866-4.03 7-9 7s-9-3.134-9-7c0-.725.127-1.42.356-2.073L12 14z" />
          </svg>
          <span className="text-[#ede8df] text-sm font-medium tracking-wide">Education</span>
        </div>

        {/* Center vertical line */}
        <div className="absolute left-1/2 top-10 bottom-0 w-px bg-white/10 -translate-x-1/2" />

        {/* Experience items — left side */}
        <div className="flex flex-col gap-10 pr-8 items-end relative">
          {experience.map((item, i) => (
            <div key={i} className="relative text-right">
              {/* dot */}
              <span className="absolute -right-[2.15rem] top-1.5 w-2 h-2 rounded-full bg-[#c8b97a] border-2 border-[#0f0e0c]" />
              <p className="text-[#ede8df] text-sm font-medium">{item.title}</p>
              <p className="text-[#8a9bb0] text-xs mt-0.5">{item.place}</p>
              <p className="text-[#c8b97a] text-[11px] mt-1 flex items-center justify-end gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                </svg>
                {item.period}
              </p>
            </div>
          ))}
        </div>

        {/* Education items — right side */}
        <div className="flex flex-col gap-10 pl-8 items-start relative">
          {education.map((item, i) => (
            <div key={i} className="relative">
              {/* dot */}
              <span className="absolute -left-[2.15rem] top-1.5 w-2 h-2 rounded-full bg-[#c8b97a] border-2 border-[#0f0e0c]" />
              <p className="text-[#ede8df] text-sm font-medium">{item.title}</p>
              <p className="text-[#8a9bb0] text-xs mt-0.5">{item.place}</p>
              <p className="text-[#c8b97a] text-[11px] mt-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                </svg>
                {item.period}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default QualificationSection