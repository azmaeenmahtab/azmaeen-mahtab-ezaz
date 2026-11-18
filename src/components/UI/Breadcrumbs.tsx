import React from 'react'
import Link from 'next/link'

export interface BreadcrumbItemProps {
  children: React.ReactNode
  href?: string
  isCurrent?: boolean
  className?: string
}

export function BreadcrumbItem({
  children,
  href,
  isCurrent = false,
  className = '',
}: BreadcrumbItemProps) {
  if (href && !isCurrent) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#0077b6] dark:hover:text-[#48cae4] transition-colors duration-200 ${className}`}
      >
        {children}
      </Link>
    )
  }

  return (
    <span
      aria-current={isCurrent ? 'page' : undefined}
      className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0077b6] dark:text-[#90e0ef] max-w-[220px] sm:max-w-md truncate ${className}`}
    >
      {children}
    </span>
  )
}

export interface BreadcrumbsProps {
  children: React.ReactNode
  className?: string
  separator?: React.ReactNode
  variant?: 'solid' | 'light' | 'bordered'
}

export function Breadcrumbs({
  children,
  className = '',
  separator = (
    <span className="text-slate-300 dark:text-slate-600 select-none text-xs">/</span>
  ),
  variant = 'solid',
}: BreadcrumbsProps) {
  const items = React.Children.toArray(children).filter(Boolean)

  const variantStyles = {
    solid:
      'bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xs',
    light: 'px-1 py-1',
    bordered:
      'border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 rounded-full backdrop-blur-xs',
  }

  return (
    <nav aria-label="Breadcrumbs" className="inline-flex">
      <ol
        className={`inline-flex flex-wrap items-center gap-1.5 sm:gap-2 list-none m-0 p-0 ${variantStyles[variant]} ${className}`}
      >
        {items.map((child, index) => {
          const isLast = index === items.length - 1

          // If the child is a BreadcrumbItem element, pass isCurrent to the last one
          let renderedChild = child
          if (React.isValidElement<BreadcrumbItemProps>(child)) {
            renderedChild = React.cloneElement(child, {
              isCurrent: child.props.isCurrent ?? isLast,
            })
          }

          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              {renderedChild}
              {!isLast && (
                <span className="flex items-center" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Support HeroUI compound component syntax: <Breadcrumbs.Item />
Breadcrumbs.Item = BreadcrumbItem
export const BreadcrumbsItem = BreadcrumbItem
export default Breadcrumbs
