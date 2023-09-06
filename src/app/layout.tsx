"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '../../components/Navbar'
import ShoppingCartContextProvider, { useShoppingCartContext } from '../../context/ShoppingCartContext'
import ShowSidebar from '../../components/ShowSidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Shopping Cart Example',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { sidebarVisible } = useShoppingCartContext();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href='/icon.png'></link>
      </head>
      <body className={inter.className}>

        <ShoppingCartContextProvider >
          <Navbar />
          <ShowSidebar />
          <div className='pt-24 p-3 flex justify-center'>
            {children}
          </div>

        </ShoppingCartContextProvider>
      </body>
    </html>
  )
}
