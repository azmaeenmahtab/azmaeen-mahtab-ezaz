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
import { getAllProjects, getAllTestimonials } from '@/services'

export default async function Home() {
  const projects = await getAllProjects()
  const testimonials = await getAllTestimonials()

  return (
    <main>
      <div className="bg-primary bg-small-glow bg-small-glow-position md:bg-large-glow-position lg:bg-large-glow min-h-screen bg-no-repeat">
<Hero />
      <About />
      </div>
      <SkillSection />
      <QualificationSection />
      {/* <Skills skills={skillList} /> */}
      <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
        <ProjectSection projects={projects} />
        <ServiceSection />
        {/* <TestimonialSection testimonials={testimonials} /> */}
        <ReviewsSection />
        <ContactSection />
      </div>
    </main>
  )
}
