import { FadeIn, AnimatedText, Eyebrow, GradientHeading } from './primitives'

interface Feature {
  num: string
  name: string
  desc: string
}

const FEATURES: Feature[] = [
  {
    num: '01',
    name: 'Moveable',
    desc: 'A tow-ready frame on wheels. Relocate to wherever the footfall is — markets, festivals, forecourts, campuses.',
  },
  {
    num: '02',
    name: 'Compact',
    desc: 'Fits a single parking bay yet packs a full service line. A footprint that pays for itself fast.',
  },
  {
    num: '03',
    name: 'Plug & play',
    desc: "Runs off a standard outlet and ships ready. Switch it on and you're trading on day one.",
  },
  {
    num: '04',
    name: 'Built to last',
    desc: 'Weatherproof steel shell and commercial-grade fit-out designed for years of daily service.',
  },
  {
    num: '05',
    name: 'Made yours',
    desc: 'Wrap it in your brand, choose your layout, and stand out from the very first glance.',
  },
]

export function Features() {
  return (
    <section id="features" className="bg-[#070707] px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <FadeIn className="text-center" y={40}>
          <Eyebrow>What you get</Eyebrow>
          <GradientHeading>Features</GradientHeading>
        </FadeIn>

        <AnimatedText
          text="Every booth is engineered to roll into place and start trading — no lease, no fit-out crew, no months of waiting. Just your hustle, ready to serve."
          className="mx-auto mt-8 max-w-[620px] text-center font-medium leading-relaxed text-[#d7e2ea]"
        />

        <div className="mx-auto mt-12 max-w-5xl">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.num} delay={i * 0.1}>
              <div className="flex flex-col gap-2 border-t border-white/10 py-8 last:border-b sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:py-12">
                <div
                  className="w-[clamp(80px,12vw,180px)] flex-none bg-gradient-to-b from-[#ffb020] to-[#8a531a] bg-clip-text font-extrabold leading-[0.85] text-transparent"
                  style={{ fontSize: 'clamp(2.6rem, 9vw, 120px)' }}
                >
                  {f.num}
                </div>
                <div>
                  <h3
                    className="mb-2 font-semibold uppercase tracking-tight"
                    style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2rem)' }}
                  >
                    {f.name}
                  </h3>
                  <p
                    className="max-w-2xl font-light leading-relaxed text-[#d7e2ea]/60"
                    style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)' }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
