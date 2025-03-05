"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

export default function MagicParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()

  const currentTheme = theme === "system" ? resolvedTheme : theme

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const particles: Array<{
      x: number
      y: number
      dx: number
      dy: number
      size: number
    }> = []

    const particleCount = 50
    const particleSize = 2
    const particleSpeed = 0.5
    const connectionDistance = 150

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * particleSpeed,
        dy: (Math.random() - 0.5) * particleSpeed,
        size: particleSize,
      })
    }

    function getParticleColor() {
      return currentTheme === "dark" ? "hsla(142.1, 70.6%, 45.3%, 0.5)" : "rgba(0, 0, 0, 0.2)"
    }

    function getLineColor(alpha: number) {
      return currentTheme === "dark" ? `hsla(142.1, 70.6%, 45.3%, ${alpha})` : `rgba(0, 0, 0, ${alpha})`
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.x += particle.dx
        particle.y += particle.dy

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = getParticleColor()
        ctx.fill()

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = getLineColor(((connectionDistance - distance) / connectionDistance) * 0.2)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [currentTheme])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}

