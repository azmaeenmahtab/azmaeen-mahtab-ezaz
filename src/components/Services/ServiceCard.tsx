import React from 'react'

export interface ServiceCardProps {
  icon?: string | React.ReactNode
  iconClass?: string
  title: string
  shortDescription?: string
  description?: string
  tags?: string[]
  accentColor?: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  shortDescription,
  description,
  icon,
  iconClass,
  tags,
}) => {
  const displayDescription = description || shortDescription || ''

  return (
    <div className="service-card-interactive group relative h-full rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#111622] p-6 lg:p-7 flex flex-col justify-between gap-6 cursor-default overflow-hidden">
      {/* Specular top light edge - smooth native CSS opacity crossfade */}
      <div className="service-card-sheen-default absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent rounded-t-2xl z-20 pointer-events-none" />
      <div className="service-card-sheen-hover absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent rounded-t-2xl z-20 pointer-events-none opacity-0" />

      {/* Subtle radial glow effect in the corner on hover */}
      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br from-[#00b4d8]/20 via-[#0077b6]/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

      <div className="space-y-5 relative z-10">
        {/* Header: Icon container & micro badge */}
        <div className="flex items-center justify-between">
          <div className="service-card-icon-wrap w-12 h-12 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 group-hover:border-emerald-300 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 shadow-sm">
            {iconClass ? (
              <i className={`${iconClass} text-lg transition-transform duration-300 group-hover:scale-110`} />
            ) : typeof icon === 'string' ? (
              <span className="font-mono text-xs font-bold">{icon.slice(0, 2)}</span>
            ) : (
              icon
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-emerald-600 transition-colors duration-300" />
            <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out" />
          </div>
        </div>

        {/* Content: Title & Description */}
        <div className="space-y-2">
          <h3 className="service-card-title text-slate-900 dark:text-white text-base lg:text-lg font-bold tracking-tight">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
            {displayDescription}
          </p>
        </div>
      </div>

      {/* Tags footer */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-2 py-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-400 group-hover:border-emerald-200 dark:group-hover:border-emerald-700/50 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 group-hover:bg-emerald-50/70 dark:group-hover:bg-emerald-950/40 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default ServiceCard
