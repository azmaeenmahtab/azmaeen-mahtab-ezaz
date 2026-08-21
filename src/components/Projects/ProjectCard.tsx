import { Project } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Server, ArrowRight, Layers, Layout, Brain, Trophy } from 'lucide-react'

interface ProjectCardProps {
  data: Project
  index?: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const {
    id,
    title,
    category,
    shortDescription,
    cover,
    livePreview,
    githubLink,
    githubLinkClient,
    githubLinkServer,
    siteAge,
    type,
    priority,
  } = data

  const projectId = id || `project${priority}`

  return (
    <div
      data-reveal
      style={{ opacity: 0, transform: "translateY(18px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] shadow-lg"
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
            {/* Top row — title + category / type badge */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <Link href={`/projects/${projectId}`}>
                  <h3 className="font-serif text-xl italic text-[#E8E2D5] md:text-2xl hover:text-[#00e6b4] transition-colors">
                    {title}
                  </h3>
                </Link>
                {category === 'fullstack' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00e6b4]/30 bg-[#00e6b4]/10 px-2.5 py-0.5 text-xs text-[#00e6b4] font-medium">
                    <Layers className="w-3 h-3" />
                    <span>Full-Stack & AI</span>
                  </span>
                )}
                {category === 'frontend' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-2.5 py-0.5 text-xs text-[#38bdf8] font-medium">
                    <Layout className="w-3 h-3" />
                    <span>Frontend Only</span>
                  </span>
                )}
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
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#c8b97a]/30 bg-[#c8b97a]/10 px-3 py-1 text-xs text-[#c8b97a]">
                <Trophy className="w-3.5 h-3.5 shrink-0" />
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
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {livePreview && (
              <a
                href={livePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs text-[#ede8df] transition-all duration-200"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#00e6b4]" />
              </a>
            )}

            {(githubLinkClient || githubLink) && (
              <a
                href={githubLinkClient || githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs text-[#ede8df] transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Client Repo</span>
              </a>
            )}

            {githubLinkServer && (
              <a
                href={githubLinkServer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs text-[#ede8df] transition-all duration-200"
              >
                <Server className="w-3.5 h-3.5 text-[#00e6b4]" />
                <span>Server Repo</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProjectCard
