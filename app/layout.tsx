import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CursorEffect from "@/components/cursor-effect"
import { PageTransition } from "@/components/page-transition"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "Personal portfolio website showcasing my projects and skills",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="portfolio-theme">
          <div className="relative min-h-screen flex flex-col">
            <CursorEffect />
            <Header />
            <PageTransition>
              <main className="flex-grow">{children}</main>
            </PageTransition>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'