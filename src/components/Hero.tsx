import { useEffect, useRef } from 'react'
import { BUY_OG_BOOTH_URL } from '../config'

const ArrowRight = () => <span>&rarr;</span>

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-6 w-6 animate-bounce text-gray-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
)

/** First viewport: headline, install command, CTA. Fades out on scroll. */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const onScroll = () => {
      const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.3))
      section.style.opacity = String(fade)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative flex h-screen w-full flex-col">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-end px-6 pb-24 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gray-400">
          Our Purpose:
        </p>
        <h1 className="max-w-3xl text-[clamp(1.5rem,5vw,3.75rem)] font-semibold leading-[1.15]">
          Your food hustle deserves a home.{' '}
          <span className="relative inline-block">
            <span className="absolute bottom-1 left-0 h-2.5 w-full rounded-[2px] bg-accent" />
            <span className="relative">Start here.</span>
          </span>
        </h1>

        <div className="mt-10 flex justify-center">
          <a
            href={BUY_OG_BOOTH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-10 py-3.5 text-sm font-semibold text-[#1c1c1c] transition-colors hover:bg-accent-dark"
          >
            Buy Now <ArrowRight />
          </a>
        </div>
      </div>

      <div className="relative z-10 flex justify-center pb-8">
        <ChevronDown />
      </div>
    </section>
  )
}
