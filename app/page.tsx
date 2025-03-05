"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import MagicParticles from "@/components/magic-particles"
import { useTheme } from "next-themes"
import type { JSX } from "react"

interface Profile {
  name: string
  title: string
  description: string
  avatar: string
  socialLinks: Array<{
    platform: string
    url: string
  }>
}

export default function Home() {
  const { theme, resolvedTheme } = useTheme()
  const currentTheme = theme === "system" ? resolvedTheme : theme
  const isLightMode = currentTheme === "light"

  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`)
        if (!response.ok) {
          throw new Error("Failed to fetch profile data")
        }
        const data = await response.json()
        setProfile(data)
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Failed to load profile data</p>
      </div>
    )
  }

  // Map social links to icons
  const socialIcons: Record<string, JSX.Element> = {
    WhatsApp: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    GitHub: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
    LinkedIn: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    Instagram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    Email: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <MagicParticles />

      <div className="container px-4 mx-auto z-10">
        <div className="flex flex-col items-center justify-center gap-8 py-20">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary neon-glow">
            <Image
              src={profile.avatar || "/placeholder.svg?height=128&width=128"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className={`${isLightMode ? "text-primary" : "text-primary neon-glow"}`}>Hello,</span> I'm{" "}
              <span className={`${isLightMode ? "text-primary" : "text-primary neon-glow"}`}>{profile.name}</span>
            </h1>
            <p
              className={`text-xl md:text-2xl ${isLightMode ? "text-primary" : "font-semibold text-primary light-text"}`}
            >
              {profile.title}
            </p>
            <p className={`text-lg ${isLightMode ? "text-primary" : "font-medium text-primary/90 light-text"}`}>
              {profile.description}
            </p>
          </div>

          <div className="flex gap-4 mt-8">
            <Link
              href="/work"
              className={`group flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                isLightMode
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
              }`}
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className={`flex items-center gap-2 border px-6 py-3 rounded-full transition-all ${
                isLightMode
                  ? "border-primary text-primary hover:bg-primary/10"
                  : "border-primary text-primary hover:bg-primary/10 neon-glow"
              }`}
            >
              Contact Me
            </Link>
          </div>

          <div className="mt-8">
            <div className="flex justify-center space-x-4">
              {profile.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-foreground transition-colors"
                >
                  {socialIcons[link.platform] || <span>{link.platform}</span>}
                  <span className="sr-only">{link.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

