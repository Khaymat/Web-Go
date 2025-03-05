"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function DotNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState("/")

  useEffect(() => {
    setActiveSection(pathname)
  }, [pathname])

  const sections = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/work", label: "Work" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ]

  const handleClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed right-10 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col items-center space-y-4">
        {sections.map((section) => (
          <motion.button
            key={section.path}
            className="group relative"
            onClick={() => handleClick(section.path)}
            aria-label={`Navigate to ${section.label}`}
            whileHover={{ scale: 1.2 }}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.path
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/50 group-hover:bg-primary/50"
              }`}
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm">
              {section.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

