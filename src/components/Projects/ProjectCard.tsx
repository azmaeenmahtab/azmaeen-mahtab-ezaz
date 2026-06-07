import { Project } from '@/lib/types'
// import Image from 'next/image'

interface ProjectCardProps {
  data: Project
  index?: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const {
    title,
    shortDescription,
    livePreview,
    githubLink,
    siteAge,
    type,
  } = data

  return (
  <div
    data-reveal
    style={{ opacity: 0, transform: "translateY(18px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}
    className="relative"
  >
    {/* Top row — title + type + buttons */}
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2 min-w-0">
        <h3 className="font-serif text-xl italic text-[#E8E2D5] md:text-3xl">{title}</h3>
        {type && (
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-[#c8b97a]">
            {type}
          </span>
        )}
      </div>

      {/* Buttons — top right on all screens */}
      <div className="flex gap-2 shrink-0">
        {livePreview && (
          <a
            href={livePreview}
            target="_blank"
            className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs text-[#ede8df] transition-all duration-200"
          >
            Live ↗
          </a>
        )}
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs text-[#ede8df] transition-all duration-200"
          >
            Code ↗
          </a>
        )}
      </div>
    </div>

    {/* Age */}
    {siteAge && (
      <p className="mt-1 text-xs text-[#8a9bb0]">{siteAge}</p>
    )}

    {/* Description */}
    <p className="mt-3 text-sm md:text-[15px] text-[#8a9bb0] leading-relaxed max-w-[70ch]">
      {shortDescription}
    </p>

    {/* Recognition */}
    {data.recognition && (
      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#c8b97a]/30 bg-[#c8b97a]/10 px-3 py-1.5">
        <span>🏅</span>
        <span className="text-xs text-[#c8b97a]">{data.recognition}</span>
      </div>
    )}

    {/* Tech tags */}
    {data.technologies && (
      <div className="mt-3 flex flex-wrap gap-2">
        {data.technologies.map((t: string) => (
          <span
            key={t}
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-[#8a9bb0] hover:text-[#ede8df] hover:border-white/30 hover:bg-white/15 transition-all duration-200"
          >
            {t}
          </span>
        ))}
      </div>
    )}
  </div>
)
}

export default ProjectCard
