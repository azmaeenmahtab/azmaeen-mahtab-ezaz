'use client'

import React from 'react'
import Link from 'next/link'

export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  text?: string
  href?: string
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  target?: string
  rel?: string
}

export default function GradientButton({
  children,
  text,
  href,
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}: GradientButtonProps) {
  // Size variants
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  }[size]

  // Exact Skeuomorphic Emerald Gradient & Glass Specular Glow Effect
  // Matching user reference image with 3-stop vertical gradient, outer translucent halo ring,
  // top specular highlight rim, and soft emerald diffuse drop-shadow
  const baseClasses = `
    relative inline-flex items-center justify-center font-bold text-white tracking-tight rounded-full
    cursor-pointer select-none transition-all duration-300 ease-out
    active:scale-[0.97] hover:scale-[1.02]
    ${sizeClasses}
    ${className}
  `

  const inlineStyles: React.CSSProperties = {
    // 3-stop vertical ocean-to-navy blue gradient
    background: 'linear-gradient(180deg, #00b4d8 0%, #0077b6 52%, #03045e 100%)',
    // Multi-layered lighting:
    // 1. Outer diffuse blue bloom
    // 2. Translucent sky outer halo ring
    // 3. Crisp outer edge stroke
    // 4. Inset top specular white highlight
    // 5. Inset bottom dark shadow for dimensional depth
    boxShadow: `
      0 10px 22px -3px rgba(0, 119, 182, 0.38),
      0 0 0 3.5px rgba(144, 224, 239, 0.35),
      0 0 0 1px rgba(0, 119, 182, 0.45),
      inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.65),
      inset 0 -2.5px 4px 0 rgba(3, 4, 94, 0.35)
    `,
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.22)',
  }

  const content = (
    <span className="flex items-center gap-2">
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children || text}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </span>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        style={inlineStyles}
        target={props.target}
        rel={props.rel}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={props.type || 'button'}
      className={baseClasses}
      style={inlineStyles}
      {...props}
    >
      {content}
    </button>
  )
}

