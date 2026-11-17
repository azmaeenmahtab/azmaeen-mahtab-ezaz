import Link from 'next/link'
import Logo from '@/components/Navbar/Logo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0c1017] text-slate-900 dark:text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background ambient radial aura */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.18),rgba(0,0,0,0))]" />

      {/* Decorative corner grid sparkles */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="relative z-10 max-w-xl w-full text-center py-16">
        {/* Top Logo Squircle */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="group focus:outline-none inline-block">
            <div className="relative shrink-0 flex items-center justify-center">
              {/* Diffused outer aura */}
              <div className="absolute -inset-2 rounded-[24px] bg-[#00b4d8]/30 dark:bg-[#0077b6]/30 blur-[6px] pointer-events-none" />

              {/* Sky blue translucent outer frame */}
              <div className="absolute -inset-1 rounded-[20px] bg-[#caf0f8]/70 dark:bg-[#0077b6]/30 border border-[#90e0ef]/70 dark:border-[#00b4d8]/40 pointer-events-none" />

              {/* Inner rich ocean-to-navy blue gradient squircle with Logo */}
              <div className="relative flex items-center justify-center w-14 h-14 rounded-[16px] bg-gradient-to-b from-[#00b4d8] via-[#0077b6] to-[#03045e] shadow-lg shadow-blue-950/20 border border-white/30 transition-transform duration-300 group-hover:scale-105">
                <Logo className="w-7 h-5.5 text-white drop-shadow-xs" />
                <div className="absolute inset-0 rounded-[16px] ring-1 ring-inset ring-white/20 pointer-events-none" />
              </div>
            </div>
          </Link>
        </div>

        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-300/70 dark:border-emerald-700/60 bg-emerald-50/80 dark:bg-emerald-950/50 backdrop-blur-md mb-4 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Error 404 • Page Not Found
          </span>
        </div>

        {/* Big Stylized 404 Text */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent select-none drop-shadow-xs">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4">
          Lost in the code?
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
          The page or project you are looking for doesn&apos;t exist, has been moved, or the link may be outdated.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-emerald-900/15"
          >
            <i className="fa-solid fa-house text-xs" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121622] hover:bg-emerald-50/70 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-400 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs"
          >
            <i className="fa-solid fa-layer-group text-xs" />
            <span>Explore Projects</span>
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-transparent text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 text-sm font-medium transition-colors"
          >
            <i className="fa-solid fa-envelope text-xs" />
            <span>Get in Touch</span>
          </Link>
        </div>

        {/* Subtle bottom footer copyright */}
        <p className="text-xs text-slate-400 dark:text-slate-600 font-mono mt-12">
          Azmaeen Mahtab Ezaz • Portfolio
        </p>
      </main>
    </div>
  )
}

