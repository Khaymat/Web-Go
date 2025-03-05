"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DotNavigation from "@/components/dot-navigation"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully! I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus({
          success: false,
          message: "Failed to send message. Please try again later.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "An error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
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

  return (
    <motion.main
      className="relative min-h-screen py-20 contact-decoration"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <DotNavigation />

      <div className="container px-4 mx-auto">
        <motion.h1 className="text-4xl md:text-5xl font-bold mb-12 text-center" variants={itemVariants}>
          Get In <span className="text-primary">Touch</span>
        </motion.h1>

        <div className="max-w-5xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" variants={itemVariants}>
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Mail className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-primary">your.email@example.com</p>
              </CardContent>
            </Card>

            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <MapPin className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-primary">Your City, Country</p>
              </CardContent>
            </Card>

            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Phone className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-primary">+62 877-4775-5257</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>

                  {submitStatus.message && (
                    <div
                      className={`p-3 rounded-md ${submitStatus.success ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                    >
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.main>
  )
}

