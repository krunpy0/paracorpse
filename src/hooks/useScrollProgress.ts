import { useState, useEffect } from 'react'
import type { SectionId } from '../types'

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState<SectionId>('news')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const portalHeight = window.innerHeight * 1.5
      const progress = Math.min(Math.max(scrollY / portalHeight, 0), 1)
      setScrollProgress(progress)

      const sections: SectionId[] = ['contact', 'about', 'join', 'news']
      for (const sec of sections) {
        const el = document.getElementById(sec)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sec)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    scrollProgress,
    activeSection,
    scrollTo
  }
}
