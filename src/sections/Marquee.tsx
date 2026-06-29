import { useEffect, useRef } from 'react'

const IMAGES = ['/media/wild1.png', '/media/wild2.png', '/media/wild3.png', '/media/wild4.png']
// Triple the set so each row stays filled while it translates with scroll.
const ROW1 = [...IMAGES, ...IMAGES, ...IMAGES]
const ROW2 = [...IMAGES.slice().reverse(), ...IMAGES, ...IMAGES]

function Tile({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt="TinKitchens kiosk in the wild"
      loading="lazy"
      className="h-[270px] w-[420px] flex-none rounded-2xl border border-white/10 object-cover"
    />
  )
}

/** Two image rows that scroll in opposite directions with page scroll. */
export function Marquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const section = sectionRef.current
      if (section && row1Ref.current && row2Ref.current) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        const offset =
          (window.scrollY - sectionTop + window.innerHeight) * 0.3
        const x = offset - 200
        row1Ref.current.style.transform = `translateX(${x}px)`
        row2Ref.current.style.transform = `translateX(${-x}px)`
      }
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-3 overflow-hidden bg-[#070707] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div ref={row1Ref} className="flex gap-3 will-change-transform">
        {ROW1.map((src, i) => (
          <Tile key={`a${i}`} src={src} />
        ))}
      </div>
      <div ref={row2Ref} className="flex gap-3 will-change-transform">
        {ROW2.map((src, i) => (
          <Tile key={`b${i}`} src={src} />
        ))}
      </div>
    </section>
  )
}
