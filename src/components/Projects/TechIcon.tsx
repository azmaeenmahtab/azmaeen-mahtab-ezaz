import React from 'react'

interface TechIconProps {
  name: string
  className?: string
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-3.5 h-3.5' }) => {
  const normalized = name.toLowerCase().trim()

  // 1. Next.js
  if (normalized.includes('next')) {
    return (
      <svg viewBox="0 0 24 24" className={`${className} shrink-0 fill-slate-900 dark:fill-white`} role="img" aria-label="Next.js">
        <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
      </svg>
    )
  }

  // 2. Vercel
  if (normalized.includes('vercel')) {
    return (
      <svg viewBox="0 0 24 24" className={`${className} shrink-0 fill-slate-900 dark:fill-white`} role="img" aria-label="Vercel">
        <path d="m12 1 12 21H0Z" />
      </svg>
    )
  }

  // 3. React (exclude TanStack / React Query)
  if (normalized.includes('react') && !normalized.includes('query')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
        alt="React"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 4. TypeScript
  if (normalized.includes('typescript') || normalized === 'ts') {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
        alt="TypeScript"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 5. JavaScript
  if (normalized.includes('javascript') || normalized === 'js') {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
        alt="JavaScript"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 6. Tailwind CSS
  if (normalized.includes('tailwind')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
        alt="Tailwind CSS"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 7. Node.js
  if (normalized.includes('node')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
        alt="Node.js"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 8. Express.js
  if (normalized.includes('express')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
        alt="Express.js"
        className={`${className} object-contain shrink-0 dark:invert`}
        loading="lazy"
      />
    )
  }

  // 9. MongoDB
  if (normalized.includes('mongo')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
        alt="MongoDB"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 10. PostgreSQL
  if (normalized.includes('postgres') || normalized.includes('psql') || normalized.includes('sql')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
        alt="PostgreSQL"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 11. Supabase
  if (normalized.includes('supabase')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"
        alt="Supabase"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 12. Redux
  if (normalized.includes('redux')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
        alt="Redux"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 13. TanStack Query / React Query
  if (normalized.includes('query') || normalized.includes('tanstack')) {
    return (
      <img
        src="https://cdn.simpleicons.org/reactquery/FF4154"
        alt="TanStack Query"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 14. Better Auth
  if (normalized.includes('better auth') || normalized.includes('betterauth')) {
    return (
      <img
        src="https://cdn.simpleicons.org/betterauth/000000"
        alt="Better Auth"
        className={`${className} object-contain shrink-0 dark:invert`}
        loading="lazy"
      />
    )
  }

  // 15. Clerk
  if (normalized.includes('clerk')) {
    return (
      <img
        src="https://cdn.simpleicons.org/clerk/6C47FF"
        alt="Clerk"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 16. JWT
  if (normalized.includes('jwt') || normalized.includes('json web token')) {
    return (
      <img
        src="https://cdn.simpleicons.org/jsonwebtokens/000000"
        alt="JWT"
        className={`${className} object-contain shrink-0 dark:invert`}
        loading="lazy"
      />
    )
  }

  // 17. Google Gemini API
  if (normalized.includes('gemini')) {
    return (
      <img
        src="https://cdn.simpleicons.org/googlegemini/8E75B2"
        alt="Gemini API"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 18. Cloudinary
  if (normalized.includes('cloudinary')) {
    return (
      <img
        src="https://cdn.simpleicons.org/cloudinary/3448C5"
        alt="Cloudinary"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 19. Docker
  if (normalized.includes('docker')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
        alt="Docker"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 20. Python
  if (normalized.includes('python')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
        alt="Python"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 21. HTML
  if (normalized.includes('html')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
        alt="HTML5"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 22. CSS
  if (normalized === 'css' || normalized.includes('css3')) {
    return (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
        alt="CSS3"
        className={`${className} object-contain shrink-0`}
        loading="lazy"
      />
    )
  }

  // 23. Exif Metadata
  if (normalized.includes('exif') || normalized.includes('metadata')) {
    return (
      <i className="fa-solid fa-camera-rotate text-[11px] text-[#0077b6] dark:text-[#00b4d8] shrink-0" />
    )
  }

  // 24. REST APIs / API
  if (normalized.includes('rest') || normalized.includes('api')) {
    return (
      <i className="fa-solid fa-network-wired text-[11px] text-[#0077b6] dark:text-[#00b4d8] shrink-0" />
    )
  }

  // 25. Linear Programming / Math
  if (normalized.includes('linear programming') || normalized.includes('lp engine') || normalized.includes('lp')) {
    return (
      <i className="fa-solid fa-calculator text-[11px] text-amber-500 shrink-0" />
    )
  }

  // 26. Recharts / Data viz
  if (normalized.includes('recharts') || normalized.includes('chart')) {
    return (
      <i className="fa-solid fa-chart-line text-[11px] text-emerald-500 shrink-0" />
    )
  }

  return (
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shadow-[0_0_6px_#0077b6] shrink-0" />
  )
}

export default TechIcon
