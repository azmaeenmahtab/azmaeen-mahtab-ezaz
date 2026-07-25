import { Project } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
  data: Project
  index?: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const {
    id,
    title,
    shortDescription,
    cover,
    livePreview,
    githubLink,
    siteAge,
    type,
    priority,
  } = data

  const projectId = id || `project${priority}`

  return (
    <div
      data-reveal
      style={{ opacity: 0, transform: "translateY(18px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Project Image Column */}
        {cover && (
          <div className="lg:col-span-5 overflow-hidden rounded-xl border border-white/10 relative h-48 md:h-56 w-full group-hover:border-white/20 transition-all duration-300">
            <Image
              src={cover}
              alt={title}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </div>
        )}

        {/* Details Column */}
        <div className={`${cover ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col justify-between h-full`}>
          <div>
            {/* Top row — title + type */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <Link href={`/projects/${projectId}`}>
                  <h3 className="font-serif text-xl italic text-[#E8E2D5] md:text-2xl hover:text-[#00e6b4] transition-colors">
                    {title}
                  </h3>
                </Link>
                {type && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-[#c8b97a]">
                    {type}
                  </span>
                )}
              </div>
            </div>

            {/* Age */}
            {siteAge && (
              <p className="mt-1 text-xs text-[#8a9bb0]">{siteAge}</p>
            )}

            {/* Description */}
            <p className="mt-3 text-sm text-[#8a9bb0] leading-relaxed line-clamp-3">
              {shortDescription}
            </p>

            {/* Recognition */}
            {data.recognition && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#c8b97a]/30 bg-[#c8b97a]/10 px-3 py-1 text-xs text-[#c8b97a]">
                <span>🏅</span>
                <span>{data.recognition}</span>
              </div>
            )}

            {/* Tech tags */}
            {data.technologies && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {data.technologies.map((t: string) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-[#8a9bb0]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="mt-6 flex flex-wrap items-center gap-3 pt-3 border-t border-white/5">
            <Link
              href={`/projects/${projectId}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#00e6b4]/40 bg-[#00e6b4]/10 hover:bg-[#00e6b4]/20 px-4 py-2 text-xs font-medium text-[#00e6b4] transition-all duration-200"
            >
              <span>View Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {livePreview && (
              <a
                href={livePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs text-[#ede8df] transition-all duration-200"
              >
                Live Demo ↗
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs text-[#ede8df] transition-all duration-200"
              >
                Client Repo ↗
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProjectCard
