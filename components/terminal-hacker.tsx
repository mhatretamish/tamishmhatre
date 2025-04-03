"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minimize2, Maximize2 } from "lucide-react"

export default function TerminalHacker() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const hackerLines = [
    "$ ssh tamish@portfolio.com",
    "Password: ********",
    "Access granted. Initializing system...",
    "$ cd /secrets",
    "$ cat real_achievements.txt",
    "File empty. No real achievements found.",
    "$ cat bank_account.txt",
    "Account balance: $0.37",
    "$ cat future_plans.txt",
    "1. Start another project",
    "2. Abandon it at 5% completion",
    "3. Repeat steps 1-2 indefinitely",
    "$ cat skills.txt",
    "- Professional excuse making",
    "- Advanced procrastination",
    "- Expert at starting things",
    "- PhD in quitting",
    "$ rm -rf /excuses/*",
    "Error: Cannot delete excuses. They are essential to system operation.",
    "$ sudo shutdown",
    "System will never shut down. It will just keep pretending to work on things.",
  ]

  useEffect(() => {
    // Show terminal after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible || isMinimized) return

    if (currentLine < hackerLines.length) {
      setIsTyping(true)
      const line = hackerLines[currentLine]

      const typingInterval = setInterval(() => {
        if (cursorPosition < line.length) {
          setCursorPosition((prev) => prev + 1)
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)

          // Move to next line after a pause
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1)
            setCursorPosition(0)
          }, 500)
        }
      }, 30)

      return () => clearInterval(typingInterval)
    }
  }, [isVisible, isMinimized, currentLine, cursorPosition])

  // Make terminal draggable
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove as any)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove as any)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove as any)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            maxWidth: isMinimized ? "200px" : "500px",
            width: isMinimized ? "auto" : "90vw",
          }}
        >
          <div className="bg-black border border-zinc-800 rounded-md overflow-hidden shadow-xl">
            {/* Terminal header */}
            <div
              className="bg-zinc-900 px-4 py-2 flex items-center justify-between cursor-move"
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-400 ml-2">tamish@portfolio:~</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal content */}
            {!isMinimized && (
              <div className="p-4 font-mono text-sm text-green-500 bg-black h-64 overflow-y-auto" ref={terminalRef}>
                {hackerLines.slice(0, currentLine).map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))}

                {currentLine < hackerLines.length && (
                  <div>
                    {hackerLines[currentLine].substring(0, cursorPosition)}
                    {isTyping && <span className="inline-block w-2 h-4 bg-green-500 ml-px animate-pulse"></span>}
                  </div>
                )}

                {currentLine >= hackerLines.length && (
                  <div className="flex items-center">
                    <span className="mr-1">$</span>
                    <span className="inline-block w-2 h-4 bg-green-500 ml-px animate-pulse"></span>
                  </div>
                )}
              </div>
            )}
          </div>

          {isMinimized && (
            <div className="absolute bottom-0 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded-bl-md rounded-tr-md">
              Terminal
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

