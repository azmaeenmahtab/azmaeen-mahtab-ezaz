"use client";

import Link from "next/link";

const NAME = "MAHTAB"; // giant text in the footer
const FULL_NAME = "AZMAEEN MAHTAB EZAZ"; // copyright text

// Section links matching sidebar & site architecture
const explore = [
  { label: "Profile", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "People", href: "/#reviews" },
  { label: "Library", href: "/#skills" },
  { label: "Focus", href: "/hackathons" },
  { label: "Contact", href: "/#contact" },
];

const elsewhere = [
  { label: "GitHub", href: "https://github.com/azmaeenmahtab" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/azmaeen-mahtab-ezaz/" },
  { label: "Twitter", href: "https://x.com/mahtab_builds" },
  { label: "Instagram", href: "https://instagram.com/mahtab_builds" },
  { label: "Facebook", href: "https://facebook.com/mahtab.azmaeen.3" },
];

const labelClass =
  "font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500";

const linkClass =
  "group inline-flex items-center gap-1.5 text-[15px] sm:text-[16px] text-slate-600 transition-colors duration-200 hover:text-[#0077b6] dark:text-slate-400 dark:hover:text-[#00b4d8] font-medium";

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number | string, options?: unknown) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full border-t border-slate-200/80 dark:border-slate-800/80 mt-16 sm:mt-20 bg-gradient-to-b from-transparent via-slate-50/40 to-slate-100/30 dark:via-slate-900/20 dark:to-[#0a0d14]/60 backdrop-blur-[2px]">
      {/* Inner container perfectly aligned with site's content grid (max-w-4xl) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-10 lg:pb-12">
        {/* top: links & back to top */}
        <div className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-[1fr_1fr_auto]">
          {/* Column 1: Explore */}
          <div>
            <p className={`${labelClass} mb-4 sm:mb-6`}>Explore</p>
            <ul className="space-y-3">
              {explore.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Elsewhere */}
          <div>
            <p className={`${labelClass} mb-4 sm:mb-6`}>Elsewhere</p>
            <ul className="space-y-3">
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {l.label}
                    <span className="text-xs opacity-60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Back to top */}
          <div className="col-span-2 pt-4 sm:pt-0 sm:col-span-1 sm:justify-self-end">
            <button
              onClick={scrollToTop}
              className={`${labelClass} group flex items-center gap-3 transition-colors hover:text-[#0077b6] dark:hover:text-[#00b4d8] cursor-pointer`}
              aria-label="Back to top"
            >
              Back to top
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/80 text-slate-600 backdrop-blur-sm shadow-xs transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#00b4d8] group-hover:text-[#0077b6] dark:border-slate-700/80 dark:bg-white/5 dark:text-slate-300 dark:group-hover:border-[#00b4d8] dark:group-hover:text-[#90e0ef]">
                <i className="fa-solid fa-arrow-up text-xs" />
              </span>
            </button>
          </div>
        </div>

        {/* giant outlined name with blue gradient */}
        <div
          aria-hidden
          className="relative my-8 sm:my-12 md:my-16 select-none overflow-hidden"
        >
          <svg
            viewBox="0 0 1000 250"
            className="h-auto w-full max-w-full block"
            role="presentation"
          >
            <defs>
              {/* Blue theme gradient for letter fills */}
              <linearGradient
                id="nameFill"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#0077b6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#023e8a" stopOpacity="0.12" />
              </linearGradient>

              {/* Blue theme gradient for letter outlines */}
              <linearGradient
                id="nameStroke"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#0077b6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#023e8a" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            <text
              x="2"
              y="220"
              fontSize="265"
              fontWeight="900"
              fontFamily="inherit"
              textLength="996"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#nameFill)"
              stroke="url(#nameStroke)"
              strokeWidth="2"
            >
              {NAME}
            </text>
          </svg>

          {/* Bottom gradient layer over text — letters rising/emerging effect */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 sm:h-3/5 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0c1017] dark:via-[#0c1017]/80" />
        </div>

        {/* bottom bar */}
        <div className="flex flex-col gap-4 border-t border-slate-200/80 pt-6 sm:pt-8 dark:border-slate-800/80 sm:flex-row sm:items-center sm:justify-between">
          

          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} {FULL_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}