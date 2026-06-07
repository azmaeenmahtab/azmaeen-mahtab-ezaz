"use client";

import { useEffect, useRef } from "react";
import { playfairdisplay } from '@/fonts'

const stack: string[] = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "Spring Boot",
  "Java",
  "C++",
  "PostgreSQL",
  "MongoDB",
];

interface InfoRow {
  label: string;
  value: string;
  highlight?: boolean;
}

const info: InfoRow[] = [
  { label: "name", value: "Azmaeen Mahtab Ezaz" },
  { label: "role", value: "Full Stack Developer" },
  { label: "university", value: "AUST — CSE" },
  { label: "location", value: "Dhaka, BD" },
  { label: "timezone", value: "GMT+6" },
  { label: "status", value: "open to opportunities", highlight: true },
];

export default function About() {
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
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 md:py-32"
    >
      {/* Ambient glow */}
      <div />

      <div className="relative mx-auto max-w-300">
        {/* Eyebrow */}
        <div
          data-reveal
          style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
          className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#00e6b4]"
        >
          <span className="block h-px w-9 bg-[#00e6b4]" />
          01 — About
        </div>

        {/* Headline */}
        <h2
          data-reveal
          style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
          className={`${playfairdisplay.className} italic text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.1] text-[#e8e2d5]`}
        >
          Engineer with a{" "}
          <em className=" not-italic text-[#00e6b4]">
            solver&apos;s mindset.
          </em>
        </h2>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_320px] md:gap-16">
          {/* ── Left: prose ── */}
          <div>
            <div className="space-y-6 text-[16px] leading-[1.9] text-[#8a9bb0]">
              <p
                data-reveal
                style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
              >
                I&apos;m a full stack developer based in Dhaka, BD —
                studying Computer Science at{" "}
                <span className="italic text-[#c8b97a]">
                  Ahsanullah University of Science and Technology
                </span>{" "}
                while freelancing on Upwork and training AI systems at{" "}
                <span className="text-[#00e6b4]">Outlier AI</span>.
              </p>

              <p
                data-reveal
                style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
              >
                I build across the{" "}
                <span className="text-[#00e6b4]">full stack</span>
                {" — clean REST APIs, structured databases, and UIs that feel right to use. One project I\u2019m proud of: "}
                <span className="italic text-[#c8b97a]">
                  an AI-driven security system
                </span>
                {" targeting mobile fraud in Bangladesh."}
              </p>

              <p
                data-reveal
                style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
              >
                My stack is{" "}
                <span className="text-[#00e6b4]">
                  TS · React · Next.js · Node.js · Spring Boot
                </span>
                . Outside work I grind DSA — graph traversals, BSTs,
                competitive-style problems. Curious by default. Builder by
                habit.
              </p>
            </div>

            {/* Stack */}
            {/* <p
              data-reveal
              style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
              className="mb-3 mt-10 font-mono text-[10px] uppercase tracking-[0.14em] text-[#3d5166]"
            >
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  data-reveal
                  style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
                  className="rounded-sm border border-[rgba(0,230,180,0.18)] bg-[rgba(0,230,180,0.03)] px-3 py-1 font-mono text-[11px] text-[#5a7a8a] transition-colors duration-200 hover:border-[rgba(0,230,180,0.5)] hover:bg-[rgba(0,230,180,0.06)] hover:text-[#00e6b4]"
                >
                  {tech}
                </span>
              ))}
            </div> */}

          </div>

          {/* ── Right: info card ── */}
          <div
            data-reveal
            style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
            className="overflow-hidden rounded-md border border-[rgba(0,230,180,0.12)] bg-[#0b1520]"
          >
            {info.map(({ label, value, highlight }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 border-b border-white/[0.04] px-[18px] py-[13px] last:border-b-0"
              >
                <span className={` text-[13px] tracking-[0.06em] text-[#3d5166]`}>
                  {label}
                </span>
                <span
                  className={` text-[13px] text-right ${highlight ? "text-[#00e6b4]" : "text-[#8a9bb0]"
                    }`}
                >
                  {value}
                </span>
              </div>
            ))}

            {/* Stack mini */}
            <div className="border-t border-white/[0.04] px-[18px] py-[14px] text-[12px] leading-[1.8] text-[#5a7a8a]">
              <span className="text-[#3d5166]">stack{"  "}</span>
              TS · React · Next.js · Node.js
              <br />
              <span className="pl-12">Spring Boot · PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}