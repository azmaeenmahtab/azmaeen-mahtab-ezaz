import { skillList } from '@/appData'
import About from '@/components/About/About'
import ContactSection from '@/components/Contact/ContactSection'
import Hero from '@/components/Hero/Hero'
import ProjectSection from '@/components/Projects/ProjectSection'
import QualificationSection from '@/components/Qualification/Qualification'
import ServiceSection from '@/components/Services/ServiceSection'
// import Skills from '@/components/Skills/Skills'
import SkillSection from '@/components/SkillSection/SkillSection'
import ReviewsSection from '@/components/Testimonials/TestimonialSection'
import TestimonialSection from '@/components/Testimonials/TestimonialSection'
import HackathonSpotlight from '@/components/Hackathons/HackathonSpotlight'
import { getAllProjects, getAllTestimonials } from '@/services'

export default async function Home() {
  const projects = await getAllProjects()
  const testimonials = await getAllTestimonials()

  return (
    <main className="min-h-screen bg-white/95 dark:bg-[#0c1017]/95 text-slate-800 dark:text-slate-200">
      <Hero />
      <About />
      <SkillSection />
      <QualificationSection />
      <ProjectSection projects={projects} />
      <ServiceSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  )
}
