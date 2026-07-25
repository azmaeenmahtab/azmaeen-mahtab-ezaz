import { getProjectById, getAllProjects } from '@/services'
import { playfairdisplay } from '@/fonts'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar/Navbar'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    id: project.id || `project${project.priority}`,
  }))
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  const challengesList = Array.isArray(project.challenges)
    ? project.challenges
    : project.challenges
    ? [project.challenges]
    : []

  const futurePlansList = Array.isArray(project.futurePlans)
    ? project.futurePlans
    : project.futurePlans
    ? [project.futurePlans]
    : []

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-[#ede8df] selection:bg-[#00e6b4]/30 selection:text-[#00e6b4]">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,230,180,0.1),rgba(255,255,255,0))]" />

      <Navbar />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10 space-y-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#8a9bb0]">
          <Link href="/#projects" className="hover:text-[#00e6b4] transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Projects
          </Link>
          <span>/</span>
          <span className="text-[#c8b97a] truncate max-w-[200px] sm:max-w-none">{project.title}</span>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.type && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#c8b97a] font-medium">
                {project.type}
              </span>
            )}
            {project.siteAge && (
              <span className="text-xs text-[#8a9bb0] font-mono">{project.siteAge}</span>
            )}
          </div>

          <h1 className={`${playfairdisplay.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic leading-tight text-[#ede8df]`}>
            {project.title}
          </h1>

          {project.recognition && (
            <div className="inline-flex items-center gap-2 rounded-xl border border-[#c8b97a]/30 bg-[#c8b97a]/10 px-4 py-2 text-sm text-[#c8b97a]">
              <span>🏅</span>
              <span>{project.recognition}</span>
            </div>
          )}
        </div>

        {/* Hero Image */}
        {project.cover && (
          <div className="relative w-full h-[260px] sm:h-[380px] md:h-[480px] rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] shadow-2xl">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-transparent to-transparent opacity-40" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 py-2 border-y border-white/10">
          {project.livePreview && (
            <a
              href={project.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#00e6b4]/50 bg-[#00e6b4]/10 hover:bg-[#00e6b4]/20 text-[#00e6b4] text-sm font-medium transition-all duration-300 shadow-lg shadow-[#00e6b4]/10"
            >
              <span>Visit Live Website</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-[#ede8df] text-sm font-medium transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub Client Repo</span>
            </a>
          )}
        </div>

        {/* Technology Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00e6b4]">
              Technology Stack Used
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[#ede8df] hover:border-[#00e6b4]/30 transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00e6b4]">
            Project Description
          </h2>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm">
            <p className="text-base sm:text-lg text-[#8a9bb0] leading-relaxed">
              {project.fullDescription || project.shortDescription}
            </p>
          </div>
        </div>

        {/* Challenges Faced */}
        {challengesList.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#c8b97a]">
              Challenges Faced During Development
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-4">
              {challengesList.map((challenge, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-[#c8b97a]/10 border border-[#c8b97a]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#c8b97a] text-xs font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-sm sm:text-base text-[#8a9bb0] leading-relaxed">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Future Plans */}
        {futurePlansList.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00e6b4]">
              Potential Improvements & Future Plans
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-4">
              {futurePlansList.map((plan, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-[#00e6b4]/10 border border-[#00e6b4]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#00e6b4]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base text-[#8a9bb0] leading-relaxed">
                    {plan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Link Bottom */}
        <div className="pt-8 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-[#ede8df] transition-all duration-300"
          >
            ← Back to All Projects
          </Link>
        </div>

      </main>
    </div>
  )
}
