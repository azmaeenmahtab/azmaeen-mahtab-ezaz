import { socials } from '@/appData/personal'
import Logo from '../Navbar/Logo'

const footerNavLinks = [
  { title: "About", href: "#about" },
  { title: "Projects", href: "#projects" },
  { title: "Skills", href: "#skills" },
  { title: "Reviews", href: "#reviews" },
  { title: "Contact", href: "#contact" },
]

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-primary px-4 sm:px-6 lg:px-8 py-14  md:py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

        {/* Col 1 — Name + description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Logo width={28} height={22} />
            <span className="text-[#ede8df] text-base font-medium">Azmaeen Mahtab Ezaz</span>
          </div>
          <p className="text-[#8a9bb0] text-sm leading-relaxed max-w-xs">
            Full Stack Developer passionate about creating beautiful and functional web experiences.
          </p>
        </div>

        {/* Col 2 — Quick links */}
        <div className="space-y-4">
          <h6 className="text-[#ede8df] text-sm font-medium">Quick Links</h6>
          <ul className="space-y-3">
            {footerNavLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[#8a9bb0] text-sm hover:text-[#ede8df] transition-colors duration-300"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Connect */}
        <div className="space-y-4">
          <h6 className="text-[#ede8df] text-sm font-medium">Connect With Me</h6>
          <div className="flex items-center gap-4">
            {socials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-[#8a9bb0] hover:text-[#ede8df] transition-colors duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5">
        <p className="text-[#8a9bb0] text-xs text-center">
          © 2025 Azmaeen Mahtab Ezaz. All rights reserved. Built with Next.js & Tailwind CSS.
        </p>
      </div>

    </footer>
  )
}

export default Footer