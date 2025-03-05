"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import DotNavigation from "@/components/dot-navigation"
import { Card, CardContent } from "@/components/ui/card"

interface Skill {
  category: string
  items: string[]
}

interface Education {
  degree: string
  institution: string
  year: string
}

interface Profile {
  name: string
  title: string
  description: string
  avatar: string
  skills: Skill[]
  education: Education[]
  interests: string[]
}

export default function About() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
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

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Failed to load profile data</p>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen py-20 about-decoration relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <DotNavigation />
      <div className="container mx-auto px-4">
        <motion.h1 className="text-4xl font-bold mb-12" variants={itemVariants}>
          About Me
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-primary">My Journey</h2>
                <p className="mb-4 text-muted-foreground">
                  I'm a passionate developer with expertise in web development and cryptography. My journey began with a
                  fascination for building things on the web, which evolved into a deep interest in securing digital
                  communications and data.
                </p>
                <p className="mb-4 text-muted-foreground">
                  With over 5 years of experience, I've worked on various projects ranging from simple websites to
                  complex web applications with advanced security features. My focus has been on implementing
                  cutting-edge cryptographic solutions, particularly in the emerging field of post-quantum cryptography.
                </p>
                <p className="text-muted-foreground">
                  I believe in creating solutions that not only meet functional requirements but also adhere to the
                  highest security standards. My approach involves understanding client needs, planning meticulously,
                  and executing with attention to detail.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Skills</h2>
                <div className="space-y-4">
                  {profile.skills.map((skillGroup, index) => (
                    <div key={index}>
                      <h3 className="font-medium mb-2">{skillGroup.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Education</h2>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h3 className="font-medium">{edu.degree}</h3>
                      <div className="text-sm text-muted-foreground">
                        {edu.institution}, {edu.year}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

