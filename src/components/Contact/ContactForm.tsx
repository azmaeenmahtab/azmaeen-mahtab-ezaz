// ContactForm.tsx
'use client'

import action from '@/actions/contact-form'
import { useActionState } from 'react'

const inputClass = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[#ede8df] text-sm placeholder:text-[#8a9bb0]/50 focus:outline-none focus:border-white/20 transition-colors duration-200"
const labelClass = "text-[#8a9bb0] text-xs tracking-wide mb-1 block"

const ContactForm = () => {
  const [status, formAction, isPending] = useActionState(action, null)

  if (status?.success) {
    return (
      <p className="text-[#c8b97a] text-center text-lg font-medium py-16">{status.message}</p>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className={labelClass}>Name</label>
        <input className={inputClass} id="name" name="name" placeholder="Insert your Name" required />
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input className={inputClass} id="email" type="email" name="email" placeholder="Insert your email" required />
      </div>
      <div>
        <label className={labelClass}>Project</label>
        <textarea
          className={`${inputClass} resize-none`}
          id="message"
          name="message"
          placeholder="Write your project"
          rows={5}
          required
        />
      </div>
      {!status?.success && status?.message && (
        <p className="text-red-400 text-sm">{status.message}</p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/10 text-[#ede8df] text-sm py-3 transition-all duration-200 disabled:opacity-50"
      >
        {isPending ? 'Sending...' : 'Send Message'}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </form>
  )
}

export default ContactForm