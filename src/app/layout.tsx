import '@/styles/globals.css'

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
        <h1 className="text-2xl font-extrabold py-4 px-8 bg-[#282b32] shadow border-b border-gray-500 uppercase">
          Hockeystack
        </h1>
        {children}
      </body>
    </html>
  )
}
