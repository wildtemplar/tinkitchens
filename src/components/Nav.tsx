import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SOCIAL } from '../config'

/** Social icon link with a >=44px touch target (icon stays 20px, hit area padded). */
const SocialLink = ({
  label,
  href,
  children,
}: {
  label: string
  href: string
  children: ReactNode
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-70"
  >
    {children}
  </a>
)

const TikTokIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
    <path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
)

const InstagramIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-10.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
  </svg>
)

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-6 w-6"
  >
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    )}
  </svg>
)

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact Us', href: '#contact' },
] as const

/** Fixed top navigation bar. */
export function Nav() {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // While the mobile menu is open: close on outside tap or Escape, and lock
  // background scroll. All wiring is removed again when the menu closes.
  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 md:py-5"
    >
      <a href="#" aria-label="Home">
        <img
          src="/tk-logo-ondark.png"
          alt="TinKitchens"
          className="h-7 w-auto"
        />
      </a>

      {/* Desktop links — centered */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-sm text-gray-300 transition-colors hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="-my-2 hidden items-center gap-1 md:flex">
          <SocialLink label="TikTok" href={SOCIAL.tiktok}>
            <TikTokIcon />
          </SocialLink>
          <SocialLink label="Instagram" href={SOCIAL.instagram}>
            <InstagramIcon />
          </SocialLink>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="text-gray-200 transition-colors hover:text-white md:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`absolute inset-x-0 top-full origin-top overflow-hidden border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md transition-all duration-300 ease-out md:hidden ${
          open ? 'max-h-[28rem] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 py-2">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3.5 text-base text-gray-200 transition-colors last:border-b-0 hover:text-white"
            >
              {label}
            </a>
          ))}
          <div className="-mx-2 flex items-center gap-2 py-2">
            <SocialLink label="TikTok" href={SOCIAL.tiktok}>
              <TikTokIcon />
            </SocialLink>
            <SocialLink label="Instagram" href={SOCIAL.instagram}>
              <InstagramIcon />
            </SocialLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
