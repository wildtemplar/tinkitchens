import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'

const EASE = [0.25, 0.1, 0.25, 1] as const

/** Reveal-on-scroll wrapper. Fades + slides its children into view once. */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function Char({
  char,
  range,
  progress,
}: {
  char: string
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <motion.span style={{ opacity }}>
      {char === ' ' ? ' ' : char}
    </motion.span>
  )
}

/** Character-by-character reveal driven by the paragraph's scroll position. */
export function AnimatedText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const chars = [...text]
  return (
    <p ref={ref} className={className}>
      {chars.map((c, i) => {
        const start = i / chars.length
        const end = start + 1 / chars.length
        return (
          <Char key={i} char={c} range={[start, end]} progress={scrollYProgress} />
        )
      })}
    </p>
  )
}

/** Mouse-following magnetic hover. */
export function Magnet({
  children,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: {
  children: ReactNode
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    setActive(true)
    setPos({ x: dx / strength, y: dy / strength })
  }
  const reset = () => {
    setActive(false)
    setPos({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

/** Mono uppercase eyebrow label. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#ffb020]">
      {children}
    </p>
  )
}

/** Silver gradient display heading. */
export function GradientHeading({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={`gradient-heading font-extrabold uppercase leading-[0.9] tracking-tight ${className}`}
      style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
    >
      {children}
    </h2>
  )
}

const externalProps = (external: boolean) =>
  external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

export function GradientButton({
  children,
  href = '#',
  className = '',
  external = false,
}: {
  children: ReactNode
  href?: string
  className?: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...externalProps(external)}
      className={`btn-pill grad btn-amber-gradient ${className}`}
    >
      {children}
    </a>
  )
}

export function GhostButton({
  children,
  href = '#',
  className = '',
  external = false,
}: {
  children: ReactNode
  href?: string
  className?: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...externalProps(external)}
      className={`btn-pill ghost ${className}`}
    >
      {children}
    </a>
  )
}
