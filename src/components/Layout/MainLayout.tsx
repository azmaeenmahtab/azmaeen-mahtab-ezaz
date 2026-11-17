'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import RightSidebar from '@/components/RightSidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-collapsed')
      if (saved !== null) {
        setIsCollapsed(saved === 'true')
      }

      const handleCollapse = (e: Event) => {
        const customEvent = e as CustomEvent<{ isCollapsed: boolean }>
        if (customEvent.detail) {
          setIsCollapsed(customEvent.detail.isCollapsed)
        }
      }

      window.addEventListener('sidebar-collapse', handleCollapse)
      return () => window.removeEventListener('sidebar-collapse', handleCollapse)
    }
  }, [])

  return (
    <>
      <Sidebar />
      <div className={`transition-[padding] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-screen bg-white dark:bg-[#0c1017] ${isCollapsed ? 'lg:pl-[84px]' : 'lg:pl-[280px] xl:pl-[300px]'} xl:pr-[380px] 2xl:pr-[410px]`}>
        {children}
      </div>
      <RightSidebar />
    </>
  )
}

