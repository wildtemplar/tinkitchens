/** Source clip used for the scroll-scrubbed background (served from /public). */
export const VIDEO_URL = '/cabin-hero.mp4'

/** Anchor id of the empty zone that drives the fixed-cards reveal. */
export const CARDS_TRIGGER_ID = 'cards-trigger'

/**
 * Zoom factor applied to the scroll-scrubbed background, relative to a
 * full "cover" fit. 1 = fill/crop the viewport; <1 zooms out (shows more of
 * the frame, letterboxing against the dark container). 0.7 ≈ 30% zoomed out.
 */
export const HERO_ZOOM = 0.7

/** External destinations used across the site. */
export const SOCIAL = {
  tiktok: 'https://www.tiktok.com/@olahaskillz?_r=1&_t=ZN-97bB9lUrOhq',
  instagram: 'https://www.instagram.com/tinkitchens',
} as const

/** Paystack checkout for the OG Booth (also used by the hero CTA). */
export const BUY_OG_BOOTH_URL = 'https://paystack.com/buy/og-booth'

/** Contact phone (+234 814 700 5409) as tel: and WhatsApp links. */
export const PHONE_TEL = 'tel:+2348147005409'
export const WHATSAPP_URL = 'https://wa.me/2348147005409'
