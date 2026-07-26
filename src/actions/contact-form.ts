'use server'

const action = async (_: { success: boolean; message: string } | null, formData: FormData) => {
  try {
    const name = formData.get('name')
    if (!name)
      return {
        success: false,
        message: 'Please provide your name.',
      }

    const email = formData.get('email')
    if (!email)
      return {
        success: false,
        message: 'Please provide your email address.',
      }

    const message = formData.get('message')
    if (!message)
      return {
        success: false,
        message: 'Please provide a message.',
      }

    if (!formData.get('subject')) {
      formData.set('subject', `Portfolio Inquiry from ${name}`)
    }
    if (!formData.get('_subject')) {
      formData.set('_subject', `Portfolio Inquiry from ${name}`)
    }

    const actionUrl =
      process.env.CONTACT_FORM_ACTION_URL || 'https://formspree.io/f/myznlgdv'

    const res = await fetch(actionUrl, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })

    const data = await res.json().catch(() => null)

    if (res.ok && data?.success !== 'false' && data?.success !== false && data?.ok !== false) {
      return { success: true, message: 'Thanks for your submission! I will get back to you soon.' }
    } else {
      console.error('Contact form endpoint error:', data)
      let errorMsg = 'Oops! There was a problem submitting your form.'

      if (Array.isArray(data?.errors) && data.errors.length > 0) {
        errorMsg = data.errors.map((e: { field?: string; message: string }) => e.message).join(', ')
      } else if (data?.message) {
        errorMsg = data.message
      } else if (typeof data?.error === 'string') {
        errorMsg = data.error
      }

      return {
        success: false,
        message: errorMsg,
      }
    }
  } catch (error) {
    console.error('Contact form submission error: ' + error)
    return {
      success: false,
      message: 'Oops! There was a problem submitting your form. Please try again or email directly.',
    }
  }
}

export default action
