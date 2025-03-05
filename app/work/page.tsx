"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import DotNavigation from "@/components/dot-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  demoUrl: string
}

export default function Work() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [redirectToComingSoon, setRedirectToComingSoon] = useState(false)
  const [comingSoonProject, setComingSoonProject] = useState<Project | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleProjectClick = (project: Project, type: "github" | "demo") => {
    if (type === "github" && project.githubUrl === "coming-soon") {
      setComingSoonProject(project)
      setRedirectToComingSoon(true)
      router.push(`/coming-soon?title=${encodeURIComponent(project.title)}`)
    } else if (project.githubUrl && type === "github") {
      window.open(project.githubUrl, "_blank")
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <motion.div className="min-h-screen py-20" initial="hidden" animate="visible" variants={containerVariants}>
      <DotNavigation />
      <div className="container mx-auto px-4">
        <motion.h1 className="text-4xl font-bold mb-12" variants={itemVariants}>
          My Work
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={project.image || "/placeholder.svg?height=200&width=300"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleProjectClick(project, "github")}>
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

