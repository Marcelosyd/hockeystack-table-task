import '@/styles/globals.css'

import { NavBar } from '@/components/NavBar'
import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'

const public_sans = Public_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hockeystack Table Task',
  description: 'Hockeystack data tables coding test',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={public_sans.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
