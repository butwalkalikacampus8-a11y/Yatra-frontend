import type { Metadata } from 'next'
import { Space_Mono, Syne, Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'


const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})
const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Drishti — दृष्टि | Nepal Fiscal Transparency Protocol',
  description: 'Every government rupee, on-chain, in real time. Nepal\'s blockchain-powered budget transparency system.',
  openGraph: { images: ['/og-image.png'] },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable} ${inter.variable}`}>
      <body className="bg-[#050505] text-[#E8F4FF] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}