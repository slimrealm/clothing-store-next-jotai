import type { Metadata } from "next";
//import localFont from "next/font/local";
import { Inter } from 'next/font/google'
import "./globals.css";

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Provider } from 'jotai'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clothing Store',
  description: 'Next.js E-commerce App with Jotai',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
