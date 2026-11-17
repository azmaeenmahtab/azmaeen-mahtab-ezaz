import { Project, Testimonial } from '@/lib/types'

import p1 from '../../content/projects/project1.json'
import p2 from '../../content/projects/project2.json'
import p3 from '../../content/projects/project3.json'
import p4 from '../../content/projects/project4.json'
import p5 from '../../content/projects/project5.json'

import t1 from '../../content/testimonials/testimonial-1.json'
import t2 from '../../content/testimonials/testimonial-2.json'
import t3 from '../../content/testimonials/testimonial-3.json'
import t4 from '../../content/testimonials/testimonial-4.json'
import t5 from '../../content/testimonials/testimonial-5.json'

const allProjects: Project[] = [
  p1 as unknown as Project,
  p2 as unknown as Project,
  p3 as unknown as Project,
  p4 as unknown as Project,
  p5 as unknown as Project,
].sort((a, b) => a.priority - b.priority)

const allTestimonials: Testimonial[] = [
  t1 as unknown as Testimonial,
  t2 as unknown as Testimonial,
  t3 as unknown as Testimonial,
  t4 as unknown as Testimonial,
  t5 as unknown as Testimonial,
].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

// Function to get all projects
const getAllProjects = async (): Promise<Project[]> => {
  return allProjects
}

// Function to get a single project by id, priority, or slug
const getProjectById = async (id: string): Promise<Project | null> => {
  if (!id) return null
  const cleanId = decodeURIComponent(id).trim().toLowerCase()

  const found = allProjects.find((p) => {
    const pId = p.id ? String(p.id).toLowerCase() : ''
    const pPriority = String(p.priority)
    const pAlias = `project${p.priority}`
    const pTitleSlug = p.title ? p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : ''
    const pNameSlug = (p as any).name ? (p as any).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : ''

    return (
      pId === cleanId ||
      pPriority === cleanId ||
      pAlias === cleanId ||
      pTitleSlug === cleanId ||
      pNameSlug === cleanId ||
      (cleanId.startsWith('project') && cleanId.replace('project', '') === pPriority)
    )
  })

  return found || null
}

// Function to get all testimonials
const getAllTestimonials = async (): Promise<Testimonial[]> => {
  return allTestimonials
}

export { getAllProjects, getProjectById, getAllTestimonials }
