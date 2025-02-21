import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

// Using single characters for a cleaner matrix effect
const MATRIX_CHARS = '01'

const HackerBackground: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme !== 'light'
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Configuration
    const fontSize = 16
    const columnWidth = fontSize * 1.5 // Tighter spacing between columns
    const rows = Math.ceil(canvas.height / fontSize)
    const cols = Math.ceil(canvas.width / columnWidth)
    
    // Create grid
    const grid = Array(cols).fill(null).map(() => ({
      positions: Array(rows).fill(null).map(() => ({
        char: '',
        opacity: 0
      })),
      nextDropTime: 0,
      startDropTime: 0
    }))

    ctx.font = `${fontSize}px "Fira Code", monospace`
    ctx.textAlign = 'center' // Center the characters in their columns

    let lastTime = 0
    const animate = (currentTime: number) => {
      if (!ctx) return
      
      if (currentTime - lastTime > 100) { // Slower updates (changed from 50 to 100ms)
        lastTime = currentTime

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        grid.forEach((column, x) => {
          if (column.startDropTime === 0) {
            column.startDropTime = currentTime + Math.random() * 3000 // More delay before start
          }

          if (currentTime < column.startDropTime) return;

          if (currentTime >= column.nextDropTime) {
            column.positions[0] = {
              char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
              opacity: 0.8
            }
            
            column.nextDropTime = currentTime + 300 + Math.random() * 500 // Slower drops
          }

          column.positions.forEach((pos, y) => {
            if (pos.char) {
              const alpha = pos.opacity
              ctx.fillStyle = isDark 
                ? `rgba(0, 255, 0, ${alpha})`
                : `rgba(0, 0, 0, ${alpha})`

              ctx.fillText(
                pos.char,
                x * columnWidth + columnWidth / 2,
                y * fontSize
              )

              pos.opacity = Math.max(0, pos.opacity - 0.008) // Slower fade out
            }
          })

          for (let i = column.positions.length - 1; i > 0; i--) {
            column.positions[i] = column.positions[i - 1]
          }
          column.positions[0] = { char: '', opacity: 0 }
        })
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
    <div className="absolute top-0 left-0 right-0 h-[200px] -z-10">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  )
}

export default HackerBackground 