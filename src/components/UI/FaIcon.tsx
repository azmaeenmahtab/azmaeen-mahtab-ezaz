import React from 'react'

export interface FaIconProps {
  name: string
  type?: 'solid' | 'regular' | 'brands'
  className?: string
  style?: React.CSSProperties
}

export default function FaIcon({ name, type = 'solid', className = '', style }: FaIconProps) {
  const prefix = type === 'brands' ? 'fa-brands' : type === 'regular' ? 'fa-regular' : 'fa-solid'
  const iconName = name.startsWith('fa-') ? name : `fa-${name}`
  return <i className={`${prefix} ${iconName} ${className}`} style={style} aria-hidden="true" />
}

