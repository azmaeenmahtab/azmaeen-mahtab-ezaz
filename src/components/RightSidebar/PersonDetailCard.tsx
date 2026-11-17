'use client'

import React from 'react'
import Image from 'next/image'
import { FollowedPerson } from '@/lib/types'

interface PersonDetailCardProps {
  person: FollowedPerson
  className?: string
}

export default function PersonDetailCard({ person, className = '' }: PersonDetailCardProps) {
  const { name, handle, platform, avatar, role, endorsement, tags = [], socialLinks = [], followUrl } = person

  return (
    <div
      className={`rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      {/* Top Row: Avatar, Name, Handle, Follow Button */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar with Platform Badge Overlay */}
          <div className="relative shrink-0">
            <div className="w-13 h-13 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
              <Image
                src={avatar}
                alt={name}
                width={52}
                height={52}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            {/* Platform Badge Overlay */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
              {platform.toLowerCase() === 'x' ? (
                <i className="fa-brands fa-x-twitter text-[10px] text-slate-900 dark:text-white" />
              ) : (
                <i className="fa-brands fa-github text-[10px] text-slate-900 dark:text-white" />
              )}
            </div>
          </div>

          {/* Name & Handle */}
          <div className="min-w-0">
            <h4 className="font-bold text-slate-900 dark:text-white text-[15px] leading-tight truncate">
              {name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              {handle} · {platform}
            </p>
          </div>
        </div>

        {/* Follow Button */}
        <a
          href={followUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 shadow-2xs hover:border-slate-300"
        >
          <span>Follow</span>
          <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
        </a>
      </div>

      {/* Role / Description */}
      <p className="text-[13px] text-slate-700 dark:text-slate-300 font-medium mt-3.5 leading-snug">
        {role}
      </p>

      {/* Endorsement / Quote */}
      {endorsement && (
        <div className="flex items-start gap-2 mt-3 pt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100/80 dark:border-slate-800/60">
          <i className="fa-solid fa-quote-left text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5 text-xs" />
          <span className="italic">{endorsement}</span>
        </div>
      )}

      {/* Bottom Row: Tags & Social Links */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100/80 dark:border-slate-800/60">
        {/* Topic Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-2 py-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2 shrink-0">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on ${link.platform}`}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1"
            >
              {link.platform.toLowerCase() === 'x' ? (
                <i className="fa-brands fa-x-twitter text-sm" />
              ) : link.platform.toLowerCase() === 'github' ? (
                <i className="fa-brands fa-github text-sm" />
              ) : (
                <i className="fa-solid fa-globe text-sm" />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
