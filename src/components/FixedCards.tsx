import { useEffect, useRef } from 'react'
import { CARDS_TRIGGER_ID } from '../config'

interface CardData {
  title: string
  body: string
}

const CARDS: CardData[] = [
  {
    title: 'Moveable',
    body: 'Explore limitless possibilities for your food business. Our kiosks are crafted to be moveable while remaining robust and easy to set up.',
  },
  {
    title: 'Compact',
    body: 'Shop rent is growing increasingly expensive. Kiosks offer a cheaper alternative to yearly rent, plus you own the location.',
  },
  {
    title: 'Mini Shop',
    body: 'Our kiosks ship ready, plug and play, making setup effortless. You can start selling on Day 1.',
  },
]

/**
 * Fixed footer cards that fade in over the trigger zone and wipe-reveal
 * (horizontally on desktop, vertically on mobile) as it scrolls past.
 */
export function FixedCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const grid = gridRef.current
    if (!container || !grid) return

    let rafId = 0

    const tick = () => {
      const trigger = document.getElementById(CARDS_TRIGGER_ID)
      if (!trigger) {
        rafId = requestAnimationFrame(tick)
        return
      }

      const rect = trigger.getBoundingClientRect()
      const triggerTop = rect.top + window.scrollY
      const triggerHeight = rect.height
      const scrollY = window.scrollY
      const vh = window.innerHeight

      const start = triggerTop - vh * 0.5
      const end = triggerTop + triggerHeight - vh * 0.3
      const range = end - start

      let progress = range > 0 ? (scrollY - start) / range : 0
      progress = Math.max(0, Math.min(1, progress))

      const isActive = scrollY >= start - vh * 0.2 && scrollY <= end + vh * 0.3
      const fadeIn = Math.min(1, Math.max(0, (scrollY - (start - vh * 0.2)) / (vh * 0.2)))
      const fadeOut = Math.min(1, Math.max(0, (end + vh * 0.3 - scrollY) / (vh * 0.3)))
      const containerOpacity = isActive ? Math.min(fadeIn, fadeOut) : 0

      container.style.opacity = String(containerOpacity)
      container.style.pointerEvents = containerOpacity > 0.1 ? 'auto' : 'none'

      const isMobile = window.innerWidth < 768
      const revealPct = progress * 130
      const mask = isMobile
        ? `linear-gradient(to bottom, black ${revealPct}%, transparent ${revealPct + 20}%)`
        : `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`
      grid.style.maskImage = mask
      grid.style.webkitMaskImage = mask

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[4] px-4 py-6 opacity-0 md:px-10 md:py-8"
    >
      <div
        ref={gridRef}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-10"
      >
        {CARDS.map((card) => (
          <div key={card.title} className="card">
            <h3 className="mb-4 text-2xl font-bold text-white">{card.title}</h3>
            <p className="text-sm leading-relaxed text-gray-300">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
