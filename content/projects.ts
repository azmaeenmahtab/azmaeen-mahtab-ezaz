import { Project } from "@/lib/types"

const projects: Project[] = [
  {
    title: "Mess Expert",
    shortDescription: "A complete mess management system where you can manage mess members, their payments, daily meals, monthly bills and more.",
    priority: 1,
    cover: "/mess-expert.png",
    githubLink: "https://github.com/azmaeenmahtab/Mess-Expert",
    livePreview: "https://messexpert.netlify.app/",
    type: "Team Project",
    recognition: "1st place in AUST CSE Carnival",
    technologies: ["React", "Redux", "TailwindCSS", "Javascript", "Node.js", "Express.js", "JWT", "Supabase"],
  },
  {
    title: "Prestige Frontend",
    shortDescription: "A fully responsive landing page for a fictional SaaS product called Prestige, built with React and Tailwind CSS.",
    priority: 2,
    cover: "/prestige.png",
    githubLink: "https://github.com/azmaeenmahtab/Prestige",
    livePreview: "https://cheery-chebakia-d70b4e.netlify.app/",
    type: "Personal Project",
    technologies: ["React", "Tailwind CSS"],
  },
  {
    title: "Coaching Management System",
    shortDescription: "Basic frontend and CRUD API with JWT authentication. React frontend, Node.js/Express backend, Supabase database.",
    priority: 3,
    cover: "/ccm.png",
    githubLink: "https://github.com/azmaeenmahtab/Interview-Task-Backend",
    livePreview: "https://ccm-roan-one.vercel.app/",
    type: "Personal Project",
    technologies: ["React", "Node.js", "Express", "JWT", "Supabase"],
  },
  {
    title: "P-Tickets",
    shortDescription: "A platform landing page for event ticket discovery and booking, built with HTML, Tailwind CSS and vanilla JavaScript.",
    priority: 4,
    cover: "/p-paribahan.png",
    githubLink: "https://github.com/azmaeenmahtab/e-ticket",
    livePreview: "https://thriving-creponne-1ad0f8.netlify.app/",
    type: "Personal Project",
    technologies: ["HTML", "CSS", "TailwindCSS", "JavaScript"],
  },
]

export default projects