"use client"
import { playfairdisplay } from '@/fonts'
import React, { useEffect, useRef } from 'react'

const reviews = [
  {
    name: "Jaid Ahmed",
    title: "Frontend Developer",
    feedback: "I had the pleasure of working with Mahtab on designing a landing page for my website, and I couldn't be happier with the outcome. He understood my requirements clearly, communicated well throughout the process, and delivered exactly what I was looking for. The design was clean, modern, and user-friendly. What I appreciated most was his attention to detail and quick response to feedback. Overall, it was a smooth and professional experience, and I would definitely recommend him to anyone looking for quality frontend development work.",
    image: "/jaid.png",
    stars: 5,
    createdAt: "2025-02-10",
  },
  {
    name: "Upwork Client",
    title: "Shopify & Frontend Client",
    feedback: "Great Work by Mahtab, very happy with the results. Detail oriented and committed to quality of the delivery.",
    image: "/upwork.png",
    stars: 5,
    createdAt: "2025-02-20",
  },
]

const marqueeItems = [
  ...reviews, ...reviews, ...reviews, ...reviews,
  ...reviews, ...reviews, ...reviews, ...reviews,
]

const StarIcon = () => (
  <i className="fa-solid fa-star text-amber-500 text-xs" />
)

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div style={{ flexShrink: 0, width: '380px', height: '220px', margin: '0 12px' }}
    className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#111622] p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(4,120,87,0.08)] hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all duration-300"
  >
    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-4">
      &ldquo;{review.feedback}&rdquo;
    </p>
    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center shrink-0">
          <img
            src={review.image}
            alt={review.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const t = e.currentTarget
              t.style.display = 'none'
              if (t.parentElement) {
                t.parentElement.innerHTML = `<span style="font-size:12px;color:#0077b6;font-weight:600">${review.name.charAt(0)}</span>`
              }
            }}
          />
        </div>
        <div>
          <p className="text-slate-900 dark:text-white text-sm font-semibold leading-none">{review.name}</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{review.title}</p>
        </div>
      </div>
      <div className="flex items-center gap-0.5 shrink-0">
        {Array.from({ length: review.stars }).map((_, i) => <StarIcon key={i} />)}
      </div>
    </div>
  </div>
)

const ReviewsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll<HTMLElement>("[data-reveal]")
            reveals.forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1"
                el.style.transform = "translateY(0)"
              }, i * 110)
            })
          }
        })
      },
      { threshold: 0.08 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="space-y-16 mt-20 mb-30" id="reviews" ref={sectionRef}>

      {/* Heading */}
      <div
        data-reveal
        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
        className="text-center"
      >
        <h2 className={`${playfairdisplay.className} text-4xl md:text-5xl text-slate-900 dark:text-white italic`}>
          My Clients Say
        </h2>
        <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-2 tracking-widest uppercase font-mono font-semibold">Testimonials</p>
      </div>

      {/* Marquee wrapper */}
      <div data-reveal
        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
        className="relative overflow-hidden"
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-primary to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-primary to-transparent" />

        {/* Scrolling track */}
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 40s linear infinite',
          }}
        >
          {marqueeItems.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

    </section>
  )
}

export default ReviewsSection