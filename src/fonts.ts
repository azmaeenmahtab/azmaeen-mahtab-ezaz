import { JetBrains_Mono, Playfair_Display } from 'next/font/google'

export const jetbrainsmono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const playfairdisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export default { jetbrainsmono, playfairdisplay }
