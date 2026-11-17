import { Roboto } from 'next/font/google'

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
})

// Unified font exports across the whole website
export const jetbrainsmono = roboto
export const playfairdisplay = roboto

export default { roboto, jetbrainsmono, playfairdisplay }
