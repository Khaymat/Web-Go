"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface ComingSoonProps {
  title: string
  returnPath?: string
}

export default function ComingSoon({ title, returnPath = "/work" }: ComingSoonProps) {
  const router = useRouter()

  const handleReturn = () => {
    router.push(returnPath)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="coming-soon-container"
    >
      <div className="absolute top-10 right-10 opacity-10">
        <svg width="200" height="200" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="200" cy="200" r="80" />
            <line x1="120" y1="200" x2="40" y2="200" />
            <line x1="280" y1="200" x2="360" y2="200" />
            <line x1="200" y1="120" x2="200" y2="40" />
            <line x1="200" y1="280" x2="200" y2="360" />
            <circle cx="40" cy="200" r="5" />
            <circle cx="360" cy="200" r="5" />
            <circle cx="200" cy="40" r="5" />
            <circle cx="200" cy="360" r="5" />
          </g>
        </svg>
      </div>

      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl mb-8 text-muted-foreground">
        This project is currently under development. Check back soon for updates!
      </p>

      <div className="relative w-16 h-16 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </div>

      <Button onClick={handleReturn} variant="outline" className="group">
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Return to Projects
      </Button>

      <div className="absolute bottom-10 left-10 opacity-10">
        <svg width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor" />
          </pattern>
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>
    </motion.div>
  )
}

