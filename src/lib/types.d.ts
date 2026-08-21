export interface Project {
  id?: string
  priority: number
  title: string
  category?: 'fullstack' | 'frontend' | 'aiml' | string
  shortDescription: string
  fullDescription?: string
  cover: string
  livePreview?: string
  githubLink?: string
  githubLinkClient?: string
  githubLinkServer?: string
  visitors?: string
  earned?: string
  githubStars?: string
  ratings?: string
  numberOfSales?: string
  type: string
  siteAge?: string
  recognition?: string
  technologies?: string[]
  challenges?: string[] | string
  futurePlans?: string[] | string
}

export interface Heading {
  id: string
  title: string
  items: Heading[]
}

export interface Testimonial {
  name: string
  title?: string
  feedback: string
  image: string
  stars: number
  createdAt: string
}
