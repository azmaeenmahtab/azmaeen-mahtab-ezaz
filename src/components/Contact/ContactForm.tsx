// ContactForm.tsx
'use client'

import action from '@/actions/contact-form'
import { useActionState } from 'react'

const inputClass = "w-full bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 shadow-sm transition-all duration-200"
const labelClass = "text-slate-600 dark:text-slate-400 text-xs font-mono font-medium tracking-wide mb-1 block"

const ContactForm = () => {
  const [status, formAction, isPending] = useActionState(action, null)

  if (status?.success) {
    return (
      <p className="text-emerald-700 text-center text-lg font-semibold py-16">{status.message}</p>
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
        <p className="text-rose-600 text-sm font-medium">{status.message}</p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0077b6] hover:bg-[#023e8a] text-white text-sm font-semibold py-3 shadow-md shadow-blue-900/15 transition-all duration-200 disabled:opacity-50"
      >
        {isPending ? 'Sending...' : 'Send Message'}
        <i className="fa-solid fa-paper-plane text-xs" />
      </button>
    </form>
  )
}

export default ContactForm