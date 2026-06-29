import { FadeIn, Eyebrow, GradientHeading, GradientButton, GhostButton } from './primitives'

interface Tier {
  name: string
  price: string
  from?: boolean
  features: string[]
  popular?: boolean
  cta: string
  href?: string
}

const TIERS: Tier[] = [
  {
    name: 'Pro Booth',
    price: '₦3.5M',
    from: true,
    features: [
      'Base Booth Shell',
      'Single Service Hydraulic Window',
      'Electrical Package',
      'ACP Cladding',
      'Branding',
      'Signage',
    ],
    cta: 'Choose Pro Booth',
    href: 'https://paystack.com/buy/probooth',
  },
  {
    name: 'OG Booth',
    price: '₦6.0M',
    popular: true,
    features: ['Everything in Pro Booth', 'Plumbing package', '24-month warranty'],
    cta: 'Choose OG Booth',
    href: 'https://paystack.com/buy/og-booth',
  },
  {
    name: 'Custom',
    price: "Let's talk",
    features: ['Bespoke layout & size', 'Multi-booth fleet pricing', 'Dedicated account lead'],
    cta: 'Enquire',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfrrQUHG5NX7396F9yGqmVmNf_cWF_5JnqeXMT3uaJEqinYuQ/viewform?usp=sharing&ouid=113199017296121904724',
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-[#0c0c0c] px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <FadeIn className="text-center" y={40}>
          <Eyebrow>Pricing</Eyebrow>
          <GradientHeading>Pricing</GradientHeading>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.1}>
              <div
                className={`flex h-full flex-col rounded-3xl border p-8 ${
                  tier.popular
                    ? 'border-[#ffb020] bg-[#ffb020]/[0.07]'
                    : 'border-white/10 bg-white/[0.025]'
                }`}
              >
                {tier.popular && (
                  <span className="mb-4 inline-block w-fit rounded-full bg-[#ffb020] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#2a1606]">
                    Most popular
                  </span>
                )}
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#8a9099]">
                  {tier.name}
                </p>
                <div className="my-1 text-[2.6rem] font-extrabold leading-none text-white">
                  {tier.from && (
                    <span className="text-[0.9rem] font-medium text-[#8a9099]">From </span>
                  )}
                  {tier.price}
                </div>
                <ul className="my-7 grid gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.95rem] text-[#cbd5e1]">
                      <span className="mt-[0.45rem] h-[7px] w-[7px] flex-none rounded-full bg-[#ffb020]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {tier.popular ? (
                    <GradientButton
                      href={tier.href}
                      external={Boolean(tier.href)}
                      className="w-full justify-center"
                    >
                      {tier.cta}
                    </GradientButton>
                  ) : (
                    <GhostButton
                      href={tier.href}
                      external={Boolean(tier.href)}
                      className="w-full justify-center"
                    >
                      {tier.cta}
                    </GhostButton>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
