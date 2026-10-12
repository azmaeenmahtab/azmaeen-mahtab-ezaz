import React from 'react'

interface ServiceCardTypes {
  icon?: string | React.ReactNode
  title: string
  shortDescription: string
}

const ServiceCard: React.FC<ServiceCardTypes> = ({ title, shortDescription, icon }) => {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#12151c]/80 hover:bg-[#161a23] hover:border-white/20 p-6 flex flex-col justify-between gap-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
      <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#c8b97a] group-hover:text-[#00e6b4] group-hover:border-[#00e6b4]/30 group-hover:bg-[#00e6b4]/10 transition-all">
        {typeof icon === 'string' ? (
          <span className="font-mono text-xs font-bold">{icon.slice(0, 2)}</span>
        ) : (
          icon
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-[#ede8df] text-base font-semibold group-hover:text-[#00e6b4] transition-colors">{title}</h3>
        <p className="text-[#8a9bb0] text-sm leading-relaxed">{shortDescription}</p>
      </div>
    </div>
  )
}

export default ServiceCard
