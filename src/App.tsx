import { ScrollVideo } from './components/ScrollVideo'
import { Particles } from './components/Particles'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { FixedCards } from './components/FixedCards'
import { SectionThree } from './components/SectionThree'
import { Marquee } from './sections/Marquee'
import { Features } from './sections/Features'
import { Pricing } from './sections/Pricing'
import { Gallery } from './sections/Gallery'
import { Contact } from './sections/Contact'
import { CARDS_TRIGGER_ID } from './config'

export default function App() {
  return (
    <>
      <ScrollVideo />
      <Particles />
      <FixedCards />
      <Nav />

      <div id="top" className="relative z-[2]">
        <Hero />

        {/* Spacer */}
        <div className="h-[150vh]" />

        {/* Cards reveal trigger zone */}
        <div id={CARDS_TRIGGER_ID} className="h-[200vh]" />

        {/* Spacer */}
        <div className="h-screen" />

        <SectionThree />

        {/* Marks the end of the scroll-video content so the scrub completes
            here, exactly as before, even with the sections appended below. */}
        <div id="scroll-video-end" />

        <Marquee />
        <Features />
        <Pricing />
        <Gallery />
        <Contact />
      </div>
    </>
  )
}
