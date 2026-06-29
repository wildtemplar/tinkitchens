import { AnimatedText, Eyebrow, GradientHeading, GradientButton, Magnet } from './primitives'
import { SOCIAL, PHONE_TEL, WHATSAPP_URL } from '../config'

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-10.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
  </svg>
)

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0c0c0c]">
      <Magnet className="absolute left-[3%] top-[6%] hidden w-[120px] sm:block">
        <a href={PHONE_TEL} aria-label="Call us">
          <img src="/media/call.png" alt="Call us" className="w-full" />
        </a>
      </Magnet>
      <Magnet className="absolute right-[3%] top-[6%] hidden w-[120px] sm:block">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp us"
        >
          <img src="/media/whatsapp.png" alt="WhatsApp us" className="w-full" />
        </a>
      </Magnet>

      <div className="mx-auto max-w-[1240px] px-5 pb-20 pt-32 text-center sm:px-8 md:px-10">
        <Eyebrow>Let's talk</Eyebrow>
        <GradientHeading>Contact</GradientHeading>
        <AnimatedText
          text="Your food hustle deserves a home. Tell us where you want to set up and we'll roll a booth to your door."
          className="mx-auto mt-8 max-w-[620px] font-medium leading-relaxed text-[#d7e2ea]"
        />
        <div className="mt-10 flex justify-center">
          <GradientButton
            href="https://docs.google.com/forms/d/e/1FAIpQLSfrrQUHG5NX7396F9yGqmVmNf_cWF_5JnqeXMT3uaJEqinYuQ/viewform?usp=sharing&ouid=113199017296121904724"
            external
          >
            Contact me
          </GradientButton>
        </div>

        {/* Tap-to-call / WhatsApp — only on mobile, where the corner icons are hidden */}
        <div className="mt-8 flex items-center justify-center gap-8 sm:hidden">
          <a href={PHONE_TEL} aria-label="Call us" className="w-16">
            <img src="/media/call.png" alt="Call us" className="w-full" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp us"
            className="w-16"
          >
            <img src="/media/whatsapp.png" alt="WhatsApp us" className="w-full" />
          </a>
        </div>
      </div>

      <footer className="border-t border-white/10 px-5 py-12 sm:px-8 md:px-10">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <img src="/tk-logo-ondark.png" alt="TinKitchens" className="mb-4 h-7" />
            <p className="max-w-xs text-sm leading-relaxed text-[#8a9099]">
              Moveable, compact, plug-and-play mini shops for the next generation of food
              entrepreneurs.
            </p>
          </div>
          <FooterCol
            title="Explore"
            links={[
              { label: 'Features', href: '#features' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'Pricing', href: '#pricing' },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: 'About', href: '#' },
              { label: 'Contact', href: '#contact' },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { label: 'Terms', href: '#' },
              { label: 'Privacy', href: '#' },
            ]}
          />
        </div>
        <div className="mx-auto mt-12 flex max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-[#8a9099]">
          <span>© 2026 TinKitchens. All rights reserved.</span>
          <div className="flex items-center gap-4 text-white">
            <a
              href={SOCIAL.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="transition-opacity hover:opacity-70"
            >
              <TikTokIcon />
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-70"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}

interface FooterLink {
  label: string
  href: string
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#d7e2ea]">
        {title}
      </h4>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className="block py-1 text-[0.92rem] text-[#8a9099] transition-colors hover:text-white"
        >
          {l.label}
        </a>
      ))}
    </div>
  )
}
