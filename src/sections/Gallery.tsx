import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { FadeIn, Eyebrow, GradientHeading } from './primitives'

interface Project {
  num: string
  cat: string
  name: string
  size: string
  images: [string, string]
}

const PROJECTS: Project[] = [
  {
    num: '01',
    cat: 'Client',
    name: 'P.O.S Street Shop',
    size: '1.8m × 1.6m',
    images: ['/media/booth1.png', '/media/booth2.png'],
  },
  {
    num: '02',
    cat: 'Personal',
    name: "Maker's Market Stall",
    size: '2.5m × 1.8m',
    images: ['/media/booth3.png', '/media/booth4.png'],
  },
  {
    num: '03',
    cat: 'Client',
    name: 'Solaris Street Food',
    size: '3m × 2.4m',
    images: ['/media/booth5.png', '/media/booth6.png'],
  },
]

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <div className="flex h-[85vh] items-start justify-center">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="sticky top-24 w-full max-w-[1240px] rounded-[40px] border-2 border-[#d7e2ea] bg-[#0c0c0c] p-4 sm:p-6 md:top-32 md:p-8"
      >
        <div className="mb-6 flex flex-wrap items-center gap-4 md:gap-6">
          <div
            className="font-extrabold leading-[0.85] text-white/90"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 90px)' }}
          >
            {project.num}
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#ffb020]">
              {project.cat}
            </div>
            <div
              className="font-semibold"
              style={{ fontSize: 'clamp(1.3rem, 3vw, 2.4rem)' }}
            >
              {project.name}
            </div>
          </div>
          <span className="ml-auto rounded-[10px] bg-[#d7e2ea]/[0.08] px-4 py-2 text-[0.9rem] font-medium tracking-[0.02em] text-[#d7e2ea]">
            {project.size}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.name} booth`}
              loading="lazy"
              className="block aspect-[16/10] w-full rounded-[28px] border border-white/10 bg-[#101216] object-contain"
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="gallery" className="bg-[#070707] px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <FadeIn className="text-center" y={40}>
        <Eyebrow>In the wild</Eyebrow>
        <GradientHeading>Gallery</GradientHeading>
      </FadeIn>

      <div ref={containerRef} className="relative mt-10">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
