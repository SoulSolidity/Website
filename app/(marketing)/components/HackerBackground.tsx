import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

const CODE_SNIPPETS = [
  'pragma solidity ^0.8.0;',
  'contract ERC20 {',
  'function transfer()',
  'mapping(address => uint)',
  'uint256 public totalSupply;',
  'address payable owner;',
  'struct Stake {',
  'event Transfer(address,address)',
  'modifier onlyOwner() {',
  'require(msg.sender == owner);',
  'assert(balance >= amount);',
  'revert("Insufficient funds");',
  'emit Transfer(msg.sender,',
  'bytes32 public constant',
  'interface IERC20 {',
  'constructor() public {',
  'payable function deposit()',
  'keccak256(abi.encodePacked',
]

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

    // Clear any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    // Clear the canvas completely
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Clear canvas after resize
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Configuration
    const fontSize = 16
    const rows = Math.ceil(canvas.height / fontSize)
    const cols = Math.ceil(canvas.width / (fontSize * 16))
    
    // Create grid
    const grid = Array(cols).fill(null).map(() => ({
      positions: Array(rows).fill(null).map(() => ({
        text: '',
        opacity: 0
      })),
      nextDropTime: 0,
      startDropTime: 0 // Will be set to proper time in first animation frame
    }))

    ctx.font = `${fontSize}px "Fira Code", monospace`

    let lastTime = 0
    const animate = (currentTime: number) => {
      if (!ctx) return
      
      // Only update every 200ms
      if (currentTime - lastTime > 200) {
        lastTime = currentTime

        // Clear canvas completely
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw grid
        grid.forEach((column, x) => {
          // Reset startDropTime if it's the initial value
          if (column.startDropTime === 0) {
            column.startDropTime = currentTime + Math.random() * 3000
          }

          // Skip if column hasn't started yet
          if (currentTime < column.startDropTime) return;

          // Check if it's time for a new drop in this column
          if (currentTime >= column.nextDropTime) {
            // Add new character at top with random offset
            const offset = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
            const xPos = x * fontSize * 16 + (offset * fontSize * 2)
            
            column.positions[0] = {
              text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
              opacity: 0.3
            }
            
            // Set next drop time
            column.nextDropTime = currentTime + 2000 + Math.random() * 3000
          }

          // Draw and update each position
          column.positions.forEach((pos, y) => {
            if (pos.text) {
              const alpha = pos.opacity
              ctx.fillStyle = isDark 
                ? `rgba(0, 255, 0, ${alpha})` // Bright green for dark mode
                : `rgba(0, 0, 0, ${alpha})` // Black for light mode

              ctx.fillText(
                pos.text,
                x * fontSize * 16,
                y * fontSize
              )

              // Fade out
              pos.opacity = Math.max(0, pos.opacity - 0.01)
            }
          })

          // Move everything down one position
          for (let i = column.positions.length - 1; i > 0; i--) {
            column.positions[i] = column.positions[i - 1]
          }
          column.positions[0] = { text: '', opacity: 0 }
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