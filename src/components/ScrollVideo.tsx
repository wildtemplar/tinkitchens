import { useRef } from 'react'
import { HERO_ZOOM, VIDEO_URL, HERO_POSTER_URL } from '../config'
import { useScrollVideo } from '../hooks/useScrollVideo'

/** Fixed, scroll-scrubbed background clip painted to a canvas. */
export function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useScrollVideo(canvasRef, videoRef)

  return (
    <div className="fixed inset-0 -top-[20%] -z-10 bg-[#0a0a0a]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        src={VIDEO_URL}
        poster={HERO_POSTER_URL}
        style={{ transform: `scale(${HERO_ZOOM})` }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}
