import { HackathonProject } from "@/lib/types"

const hackathons: HackathonProject[] = [
  {
    id: "gridwise-llm",
    title: "GridWise LLM",
    tagline: "AI-orchestrated microgrid energy optimizer translating human operator intent into mathematically provable battery dispatch schedules.",
    hackathonName: "BUP CSE FEST 2026",
    edition: "Preliminary Round",
    awardOrRole: "Preliminary Qualifier",
    date: "September 2026",
    sprintDuration: "24 Hours",
    cover: "/gridwise.jpg",
    accentColor: "#f59e0b",
    accentColorSecondary: "#fde68a",
    githubLink: "https://github.com/Ahnaf181419/bup-hackathon",
    problemStatement:
      "Bangladesh's national power grid faces acute instability with rapid solar ramp-downs at dusk, unpredictable industrial demand surges, and costly under-utilization of battery energy storage systems (BESS). Grid operators must make time-critical dispatch decisions under uncertainty using only informal written notes — a process prone to human error and energy waste.",
    solution:
      "GridWise LLM is an end-to-end intelligent energy optimization platform that receives a 24-hour scenario of demand, solar generation, and tariff data alongside free-text operator notes, and outputs a mathematically optimal battery charge/discharge schedule. The system translates ambiguous natural language directives into structured constraints using Google Gemini, applies Linear Programming (LP) to minimize grid cost while respecting battery physics, and validates the output through a replay simulation engine.",
    coreAiInnovation:
      "The LLM Interpreter module sends operator notes to Google Gemini with a schema of supported directive types and returns a structured JSON array of constraints (e.g., 'HOLD_CHARGE', 'FORCE_DISCHARGE_WINDOW', 'PEAK_SHAVE'). This allows human intuition and domain knowledge to be seamlessly merged into the mathematical optimizer without any prompt engineering overhead for the end user.",
    architectureHighlights: [
      "Request Validation → LLM Interpretation → Guardrail Validation → LP Optimization → Replay Simulation → Response pipeline",
      "Gemini API called with responseMimeType: 'application/json' for structured directive extraction",
      "Linear Programming solver enforces battery physics: SoC bounds, charge/discharge rate limits, energy conservation",
      "Replay validation verifies the computed schedule against simulated grid conditions before dispatch",
      "Recharts-powered visualization dashboard for 24-hour energy flow and cost breakdown"
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Google Gemini API",
      "Linear Programming (LP Engine)",
      "Recharts",
      "Better Auth",
      "Docker"
    ],
    team: [
      { name: "Azmaeen Mahtab Ezaz", role: "Full-Stack & AI Pipeline Engineer" },
      { name: "Ahnaf", role: "Team Lead & Backend Architect" }
    ]
  },
  {
    id: "campusos",
    title: "CampusOS",
    tagline: "An AI-orchestrated, unified campus management platform powered by an autonomous Google Gemini AI Agent with real-time function calling.",
    hackathonName: "CSE Carnival 8.0",
    edition: "AI Build Hackathon",
    awardOrRole: "Hackathon Submission",
    date: "September 2026",
    sprintDuration: "48 Hours",
    cover: "/campusos.jpg",
    accentColor: "#10b981",
    accentColorSecondary: "#6ee7b7",
    githubLink: "https://github.com/Tawhid-exe/cse-carnival-8-aibuild-hackathon",
    problemStatement:
      "University campus operations — class schedules, room bookings, events, assignments, announcements — are managed across fragmented systems with no unified interface. Students and faculty waste significant time cross-referencing multiple platforms, and room double-bookings and scheduling conflicts are rampant with no intelligent prevention mechanism.",
    solution:
      "CampusOS is an AI-orchestrated unified campus management platform that consolidates class timetables, smart room bookings, campus events, assignments, and announcements into a single responsive interface. At its core is an autonomous Google Gemini AI Agent that accepts natural language queries and invokes verified database-grounded functions in real time — transforming how students and faculty interact with campus systems.",
    coreAiInnovation:
      "The AI Campus Concierge uses Google Gemini 1.5 Flash with transparent live tool-calling badges. When a user asks 'Which rooms are free for 30 people after 3 PM?' the agent invokes list_rooms(), checks live capacity and equipment, validates against the booking engine, and returns conflict-free recommendations — all with visible execution step badges showing every tool invoked.",
    architectureHighlights: [
      "Autonomous Gemini AI Agent with function calling: list_schedules, list_rooms, book_room, list_events, list_assignments",
      "Real-time conflict detection engine: prevents double-booking via atomic MongoDB transactions",
      "Live event capacity progress indicators with dynamic availability tracking",
      "Unified dashboard with 'Next Class Spotlight' integrating real-time class schedule tracking",
      "Better Auth for secure multi-role access (Student, Faculty, Admin) with session management"
    ],
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Express.js 4.19",
      "MongoDB Atlas",
      "Google Gemini 1.5 Flash (Function Calling)",
      "Better Auth",
      "TailwindCSS",
      "Mongoose"
    ],
    team: [
      { name: "Azmaeen Mahtab Ezaz", role: "AI Agent & Full-Stack Engineer" },
      { name: "Tawhid", role: "Team Lead & Backend Architect" }
    ]
  },
  {
    id: "mailmind",
    title: "MailMind (FacultyInbox AI)",
    tagline: "Intelligent email triage and workflow management for academic faculty — from inbox chaos to a calm, prioritized AI workspace.",
    hackathonName: "CSE Carnival 8.0",
    edition: "Onsite Final Round",
    awardOrRole: "Onsite Finalist",
    date: "September 2026",
    sprintDuration: "24 Hours (Onsite)",
    cover: "/mailmind.jpg",
    accentColor: "#8b5cf6",
    accentColorSecondary: "#c4b5fd",
    githubLink: "https://github.com/azmaeenmahtab/Hackathon-Carnival-8",
    problemStatement:
      "University faculty members receive dozens to hundreds of emails daily spanning class cancellations, grade dispute requests, administrative mandates, research committee updates, and student hardships. High-stakes time-sensitive messages — like grade re-evaluations or urgent exam logistics — get buried under routine correspondence with no intelligent triage, urgency scoring, or follow-up enforcement.",
    solution:
      "MailMind is an intelligent email intelligence and triage dashboard engineered for academia. Rather than presenting a flat chronological inbox, MailMind groups conversations into multi-turn threads, leverages Google Gemini AI to assess urgency, extract deadlines, and categorize content, and provides an AI Daily Digest alongside proactive follow-up monitoring for unanswered messages exceeding the 48-hour response threshold.",
    coreAiInnovation:
      "The Gemini AI pipeline analyzes each email thread holistically — assigning urgency scores, extracting concrete deadlines (dates, times, consequences), generating a 'Why This Matters' justification visible in a slide-out reasoning drawer, and compiling a personalized AI Daily Digest that surfaces the 3 most critical pending actions. This transforms reactive inbox management into proactive, intelligent workflow governance.",
    architectureHighlights: [
      "Multi-turn thread grouping engine: groups fragmented email chains by topic, sender, and temporal proximity",
      "Gemini urgency scoring: 5-level priority scale (Critical → Routine) with extracted deadlines and action items",
      "AI Daily Digest: automated morning synthesis of top 3 priority threads with recommended next actions",
      "48-hour follow-up alert queue: flags unanswered student and departmental messages for faculty attention",
      "Real-time Email Ingestion Simulator for interactive demo with realistic academic email scenarios"
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Express 4.21",
      "MongoDB Atlas / Mongoose 8",
      "Google Gemini 1.5 Flash",
      "Better Auth",
      "TailwindCSS"
    ],
    team: [
      { name: "Azmaeen Mahtab Ezaz", role: "Full-Stack & AI Integration Engineer" }
    ]
  }
]

export default hackathons
