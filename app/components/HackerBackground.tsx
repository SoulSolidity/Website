import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

const HackerBackground: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme !== 'light'
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const lastUpdateRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      // Set canvas size accounting for device pixel ratio
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      // Scale context to ensure correct drawing operations
      ctx.scale(dpr, dpr)
      
      // Set CSS size
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Configuration
    const getResponsiveFontSize = () => {
      const width = window.innerWidth
      if (width < 640) return 10 // Small mobile
      if (width < 768) return 12 // Mobile
      if (width < 1024) return 14 // Tablet
      return 16 // Desktop
    }

    const fontSize = getResponsiveFontSize()
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = new Array(columns).fill(1)
    
    ctx.font = `${fontSize}px monospace`

    // Adjust animation speed based on screen size
    const getUpdateInterval = () => {
      const width = window.innerWidth
      if (width < 640) return 150 // Slower updates on mobile
      if (width < 1024) return 120 // Medium speed on tablet
      return 100 // Full speed on desktop
    }

    const animate = (timestamp: number) => {
      // Dynamic update interval based on device
      const updateInterval = getUpdateInterval()
      if (timestamp - lastUpdateRef.current < updateInterval) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastUpdateRef.current = timestamp

      // Add semi-transparent black rectangle to create fade effect
      ctx.fillStyle = isDark 
        ? 'rgba(0, 0, 0, 0.1)' 
        : 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))

      // Set color for the binary digits with reduced opacity
      ctx.fillStyle = isDark 
        ? 'rgba(0, 255, 0, 0.2)' // More transparent green for dark mode
        : 'rgba(0, 0, 0, 0.15)' // More transparent black for light mode

      // Reduce number of active columns on mobile
      const activeColumns = window.innerWidth < 640 
        ? Math.floor(drops.length * 0.6) 
        : drops.length

      // Loop over drops
      for (let i = 0; i < activeColumns; i++) {
        // Generate random binary digit
        const text = Math.random() > 0.5 ? '1' : '0'
        
        // Calculate position accounting for device pixel ratio
        const x = i * fontSize
        const y = drops[i] * fontSize
        
        // Draw the character
        ctx.fillText(text, x, y)

        // Move drop down (slower rate)
        if (y > canvas.height / (window.devicePixelRatio || 1) && Math.random() > 0.95) {
          drops[i] = 0
        }
        // Slow down the falling speed
        if (Math.random() > 0.1) { // Only increment 90% of the time
          drops[i]++
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isDark])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: 0.8 }}
      />
    </div>
  )
}

export default HackerBackground 