"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DotNavigation from "@/components/dot-navigation"

interface ServiceTier {
  id: number
  name: string
  price: number
  period: string
  features: string[]
  popular?: boolean
}

interface Service {
  id: number
  title: string
  description: string
  icon: string
  tiers: ServiceTier[]
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<Service | null>(null)
  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`)
        if (!response.ok) {
          throw new Error("Failed to fetch services")
        }
        const data = await response.json()
        setServices(data)
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleOrderViaWhatsApp = () => {
    if (!selectedTier || !selectedCategory) return

    // Format the message for WhatsApp
    const whatsappMessage = `*New Order from Portfolio*
*Service:* ${selectedCategory.title}
*Plan:* ${selectedTier.name}
*Price:* ${formatPrice(selectedTier.price)} ${selectedTier.period}

I'm interested in this service. Please provide more information.`

    // Encode the message for a URL
    const encodedMessage = encodeURIComponent(whatsappMessage)

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/6287747755257?text=${encodedMessage}`, "_blank")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
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
    <motion.div
      className="min-h-screen py-20 services-decoration relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <DotNavigation />
      <div className="container mx-auto px-4">
        <motion.h1 className="text-4xl font-bold text-center mb-12" variants={itemVariants}>
          Our Services
        </motion.h1>

        {!selectedCategory ? (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16" variants={itemVariants}>
            {services.map((service) => (
              <Card
                key={service.id}
                className="hover:border-primary transition-all cursor-pointer"
                onClick={() => setSelectedCategory(service)}
              >
                <CardHeader>
                  <div className="text-4xl mb-4 text-center">{service.icon}</div>
                  <CardTitle className="text-2xl text-center">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 text-center">{service.description}</p>
                  <Button className="w-full group">
                    View Plans
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ) : !selectedTier ? (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
              <Button variant="outline" onClick={() => setSelectedCategory(null)} className="mb-6">
                ← Back to Services
              </Button>
              <h2 className="text-3xl font-bold mb-4">{selectedCategory.title}</h2>
              <p className="text-muted-foreground mb-8">{selectedCategory.description}</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {selectedCategory.tiers.map((tier) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={`relative overflow-hidden ${tier.popular ? "border-primary" : ""}`}>
                    {tier.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                        Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl text-center">{tier.name}</CardTitle>
                      <div className="text-center mt-2">
                        <span className="text-3xl font-bold">{formatPrice(tier.price)}</span>
                        <span className="text-muted-foreground ml-1">{tier.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        onClick={() => setSelectedTier(tier)}
                        variant={tier.popular ? "default" : "outline"}
                      >
                        Select Plan
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
            <Button variant="outline" onClick={() => setSelectedTier(null)} className="mb-6">
              ← Back to Plans
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>
                  Order {selectedCategory.title} - {selectedTier.name} Package
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h3 className="font-semibold mb-2">Package Details:</h3>
                    <p>
                      <strong>Service:</strong> {selectedCategory.title}
                    </p>
                    <p>
                      <strong>Plan:</strong> {selectedTier.name}
                    </p>
                    <p>
                      <strong>Price:</strong> {formatPrice(selectedTier.price)} {selectedTier.period}
                    </p>
                  </div>

                  <p className="text-muted-foreground">
                    Click the button below to contact me via WhatsApp to discuss your project requirements and place
                    your order.
                  </p>

                  <Button onClick={handleOrderViaWhatsApp} className="w-full">
                    Order via WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

