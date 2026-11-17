"use client";

import { useEffect, useState } from "react";
import { Network, BrainCircuit } from "lucide-react";

// ✏️ edit these values anytime (progress is 0-100)
const courses = [
  {
    id: "system-design",
    title: "System Design in Bangla",
    by: "by Mahfuz Mia",
    status: "Chapter 20 of 50+",
    progress: 40,
    tags: ["Load Balancing", "Caching", "DB Scaling"],
    Icon: Network,
    iconTile:
      "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300",
    bar: "from-teal-400 to-cyan-500",
    chip:
      "border-teal-200/70 text-teal-700 dark:border-teal-400/20 dark:text-teal-300",
  },
  {
    id: "ai-ml",
    title: "AI/ML Core Track",
    by: "by Ed Donner",
    status: "Module 3 of 10",
    progress: 30,
    tags: ["LLMs", "RAG", "Agents"],
    Icon: BrainCircuit,
    iconTile:
      "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300",
    bar: "from-sky-400 to-blue-600",
    chip:
      "border-sky-200/70 text-sky-700 dark:border-sky-400/20 dark:text-sky-300",
  },
];

export default function CurrentlyLearning() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full">
      {/* label */}
      <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
        </span>
        Now learning
      </p>

      <div className="relative">
        {/* blurred color blobs behind the glass */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 -top-6 h-36 w-36 rounded-full bg-teal-300/40 blur-3xl dark:bg-teal-500/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-6 -right-8 h-36 w-36 rounded-full bg-sky-300/40 blur-3xl dark:bg-sky-500/20"
        />

        <div className="relative flex flex-col gap-3">
          {courses.map((c) => (
            <article
              key={c.id}
              className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/50 p-4 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-white/5 dark:shadow-none"
            >
              {/* glass top edge highlight */}
              <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent dark:via-white/30" />

              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/60 shadow-sm dark:border-white/10 ${c.iconTile}`}
                >
                  <c.Icon className="h-5 w-5" strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-[15px] font-bold leading-tight text-slate-900 dark:text-white">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {c.by}
                  </p>
                </div>
              </div>

              {/* progress */}
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span>{c.status}</span>
                  <span className="font-semibold">{c.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${c.bar} transition-all duration-1000 ease-out`}
                    style={{ width: mounted ? `${c.progress}%` : "0%" }}
                  />
                </div>
              </div>

              {/* topic chips */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border bg-white/40 px-2.5 py-0.5 font-mono text-[10px] dark:bg-white/5 ${c.chip}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}