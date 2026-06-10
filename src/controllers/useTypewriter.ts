import { useState, useEffect, useRef } from 'react'

interface UseTypewriterOptions {
  strings: string[]
  speed?: number
  deleteSpeed?: number
  pauseDuration?: number
  loop?: boolean
}

export function useTypewriter({
  strings,
  speed = 60,
  deleteSpeed = 30,
  pauseDuration = 2000,
  loop = true,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [stringIndex, setStringIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const currentString = strings[stringIndex]

    const tick = () => {
      if (isPaused) return

      if (!isDeleting) {
        if (displayText.length < currentString.length) {
          setDisplayText(currentString.slice(0, displayText.length + 1))
          timeoutRef.current = setTimeout(tick, speed)
        } else {
          setIsPaused(true)
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false)
            if (loop || stringIndex < strings.length - 1) {
              setIsDeleting(true)
            }
          }, pauseDuration)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
          timeoutRef.current = setTimeout(tick, deleteSpeed)
        } else {
          setIsDeleting(false)
          setStringIndex((prev) => (prev + 1) % strings.length)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : speed)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayText, isDeleting, isPaused, stringIndex, strings, speed, deleteSpeed, pauseDuration, loop])

  return { displayText, isComplete: displayText === strings[stringIndex] }
}
