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
]

const marqueeItems = [
  ...reviews, ...reviews, ...reviews, ...reviews,
  ...reviews, ...reviews, ...reviews, ...reviews,
]

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-[#c8b97a]" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div style={{ flexShrink: 0, width: '380px', margin: '0 12px' }}
    className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6"
  >
    <p className="text-[#8a9bb0] text-sm leading-relaxed line-clamp-5">
      &ldquo;{review.feedback}&rdquo;
    </p>
    <div className="mt-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
          <img
            src={review.image}
            alt={review.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const t = e.currentTarget
              t.style.display = 'none'
              if (t.parentElement) {
                t.parentElement.innerHTML = `<span style="font-size:12px;color:#c8b97a;font-weight:500">${review.name.charAt(0)}</span>`
              }
            }}
          />
        </div>
        <div>
          <p className="text-[#ede8df] text-sm font-medium leading-none">{review.name}</p>
          <p className="text-[#8a9bb0] text-xs mt-1">{review.title}</p>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
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
        <h2 className={`${playfairdisplay.className} text-4xl md:text-5xl text-[#ede8df] italic`}>
          My Clients Say
        </h2>
        <p className="text-sm text-[#8a9bb0] mt-2 tracking-widest uppercase">Testimonials</p>
      </div>

      {/* Marquee wrapper — NO data-reveal here */}
      <div data-reveal
  style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
  className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-[#011627] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-[#011627] to-transparent" />

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