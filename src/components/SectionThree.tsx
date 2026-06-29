import { useEffect, useRef, useState } from 'react'

/** Closing reveal: blurs/slides into focus when scrolled into view. */
export function SectionThree() {
  const innerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(inner)
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(inner)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative flex min-h-screen items-end justify-center px-10 pb-32">
      <div
        ref={innerRef}
        className={`relative z-10 flex flex-col items-center text-center transition-[opacity,transform,filter] duration-1000 ease-out ${
          visible
            ? 'translate-y-0 opacity-100 blur-0'
            : 'translate-y-8 opacity-0 blur-lg'
        }`}
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gray-300">
          Presenting
        </p>
        <h2 className="text-[clamp(1.875rem,6vw,4.5rem)] font-bold">
          O.G Booth
        </h2>
      </div>
    </section>
  )
}
