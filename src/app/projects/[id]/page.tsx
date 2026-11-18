import { getProjectById, getAllProjects } from '@/services'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TechIcon from '@/components/Projects/TechIcon'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'

export const dynamicParams = true

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  const params: { id: string }[] = []

  projects.forEach((project) => {
    if (project.id) {
      params.push({ id: project.id })
    }
    params.push({ id: `project${project.priority}` })
    params.push({ id: String(project.priority) })
    if (project.title) {
      const slug = project.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      if (slug) params.push({ id: slug })
    }
    const anyProject = project as any
    if (anyProject.name) {
      const nameSlug = anyProject.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      if (nameSlug) params.push({ id: nameSlug })
    }
  })

  // Deduplicate params
  const uniqueIds = Array.from(new Set(params.map((p) => p.id)))
  return uniqueIds.map((id) => ({ id }))
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
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0c1017] text-slate-900 dark:text-white selection:bg-[#00b4d8]/25 selection:text-[#03045e] dark:selection:text-[#caf0f8] transition-colors duration-300">
      {/* Background glow effects - portfolio brand theme colors */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,180,216,0.14),rgba(255,255,255,0)),radial-gradient(ellipse_40%_40%_at_90%_20%,rgba(144,224,239,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,119,182,0.22),rgba(0,0,0,0)),radial-gradient(ellipse_40%_40%_at_90%_20%,rgba(3,4,94,0.35),rgba(0,0,0,0))]" />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-10 pb-20 relative z-10 space-y-8 sm:space-y-10">
        {/* Breadcrumb Navigation - HeroUI style */}
        <div className="flex items-center justify-between">
          <Breadcrumbs variant="solid">
            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/#projects">Projects</Breadcrumbs.Item>
            <Breadcrumbs.Item>{project.title}</Breadcrumbs.Item>
          </Breadcrumbs>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.category === 'fullstack' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50 dark:bg-sky-950/40 px-3 py-1 text-xs text-[#0077b6] dark:text-[#90e0ef] font-medium">
                <i className="fa-solid fa-layer-group text-xs text-[#0077b6] dark:text-[#90e0ef]" />
                <span>Full-Stack & AI</span>
              </span>
            )}
            {project.category === 'frontend' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50 dark:bg-sky-950/40 px-3 py-1 text-xs text-sky-800 dark:text-sky-300 font-medium">
                <i className="fa-solid fa-desktop text-xs text-sky-700 dark:text-sky-400" />
                <span>Frontend Only</span>
              </span>
            )}
            {project.type && (
              <span className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                {project.type}
              </span>
            )}
            {project.siteAge && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {project.siteAge}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
            {project.title}
          </h1>

          {project.recognition && (
            <div className="inline-flex items-center gap-2 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-2 text-sm text-amber-900 dark:text-amber-300 font-medium shadow-sm">
              <i className="fa-solid fa-trophy text-amber-600 dark:text-amber-400 shrink-0 text-sm" />
              <span>{project.recognition}</span>
            </div>
          )}
        </div>

        {/* Hero Image */}
        {project.cover && (
          <div className="relative w-full h-[260px] sm:h-[380px] md:h-[480px] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-xl">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              priority
              quality={92}
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 py-3 border-y border-slate-200 dark:border-slate-800">
          {project.livePreview && (
            <a
              href={project.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:from-[#023e8a] hover:to-[#0077b6] text-white text-sm font-semibold transition-all duration-300 shadow-md shadow-[#0077b6]/25 hover:shadow-lg hover:shadow-[#0077b6]/35 cursor-pointer"
            >
              <span>Visit Live Website</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
            </a>
          )}

          {(project.githubLinkClient || project.githubLink) && (
            <a
              href={project.githubLinkClient || project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121622] hover:bg-sky-50/70 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-[#0077b6] dark:hover:text-[#90e0ef] text-sm font-medium transition-all duration-300 shadow-xs"
            >
              <i className="fa-brands fa-github text-sm" />
              <span>GitHub Client Repo</span>
            </a>
          )}

          {project.githubLinkServer && (
            <a
              href={project.githubLinkServer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121622] hover:bg-sky-50/70 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-[#0077b6] dark:hover:text-[#90e0ef] text-sm font-medium transition-all duration-300 shadow-xs"
            >
              <i className="fa-solid fa-server text-[#0077b6] dark:text-[#90e0ef] text-sm" />
              <span>GitHub Server Repo</span>
            </a>
          )}
        </div>

        {/* Technology Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 font-semibold">
              Technology Stack Used
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121622] px-4 py-2 text-sm text-slate-800 dark:text-slate-200 font-medium shadow-xs hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all duration-200"
                >
                  <TechIcon name={tech} className="w-4 h-4" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 font-semibold">
            Project Description
          </h2>
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#121622] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {project.fullDescription || project.shortDescription}
            </p>
          </div>
        </div>

        {/* Challenges Faced */}
        {challengesList.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 font-semibold">
              Challenges Faced During Development
            </h2>
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#121622] p-6 sm:p-8 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              {challengesList.map((challenge, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center shrink-0 mt-0.5 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
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
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 font-semibold">
              Potential Improvements & Future Plans
            </h2>
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#121622] p-6 sm:p-8 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              {futurePlansList.map((plan, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700 dark:text-emerald-400">
                    <i className="fa-solid fa-circle-check text-xs" />
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
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
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121622] hover:bg-sky-50 dark:hover:bg-slate-800 text-sm text-slate-800 dark:text-white hover:text-[#0077b6] dark:hover:text-[#90e0ef] font-medium shadow-sm transition-all duration-300"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            <span>Back to All Projects</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
