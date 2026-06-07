"use client"

import { Project } from '@/lib/types'
// import SectionHeading from '../SectionHeading/SectionHeading'
import ProjectCard from './ProjectCard'
import { playfairdisplay } from '@/fonts'
import { useEffect, useRef } from 'react'

interface ProjectSectionProps {
  projects: Project[]
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
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
  return (
    <section id="projects" ref={sectionRef} className="space-y-16 mt-25">
      {/* <SectionHeading title="// Projects" /> */}
      <div className="text-left">
        <p
          data-reveal
          style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
          className={`${playfairdisplay.className} italic text-5xl   text-[#e8e2d5]`}
        >
          What I Have Built {" "}
          <em className="text-[22px] not-italic text-[#00e6b4]">
            - projects.
          </em>
        </p>
      </div>

      <div className="my-8 divide-y divide-border md:my-8">
        {projects.map((project, idx) => (
          <div
            key={project.priority}
            data-reveal
            style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
            className="py-10"
          >
            <div className="mx-auto flex max-w-[1200px] items-start gap-8 justify-between">
              <div className="hidden w-28 shrink-0 md:block">
                <div className="text-8xl md:text-5xl font-extrabold leading-none text-accent/10">{String(idx + 1).padStart(2, '0')}</div>
              </div>

              <div className="flex-1">
                <ProjectCard index={idx + 1} data={project} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectSection
