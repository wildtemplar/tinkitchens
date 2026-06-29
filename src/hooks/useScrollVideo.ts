import { useEffect, type RefObject } from 'react'
import { HERO_ZOOM, VIDEO_URL } from '../config'

/**
 * Scrubs a background clip with page scroll.
 *
 * Strategy: try to pre-decode the clip into a set of `ImageBitmap` frames and
 * paint the one matching scroll progress onto a canvas (smooth, no per-frame
 * seeking). If decoding fails (CORS / codec), fall back to seeking the raw
 * <video> element directly.
 */
export function useScrollVideo(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current
    const videoEl = videoRef.current
    if (!canvas || !videoEl) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frames: ImageBitmap[] = []
    let framesReady = false
    let lastFrameIndex = -1
    let videoSeeking = false
    let rafId = 0
    let cancelled = false

    const resizeCanvas = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      const rect = canvas.getBoundingClientRect()
      const w = Math.round(rect.width * dpr)
      const h = Math.round(rect.height * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      lastFrameIndex = -1
    }

    const getScrollBounds = () => {
      const vh = window.innerHeight
      // Bind the scrub to the end of the original scroll-video content (marked
      // with #scroll-video-end) so sections appended below don't dilute it.
      // Falls back to the full document height when the marker is absent.
      const marker = document.getElementById('scroll-video-end')
      const contentBottom = marker
        ? marker.getBoundingClientRect().top + window.scrollY
        : document.documentElement.scrollHeight
      return { start: vh * 0.5, end: contentBottom - vh }
    }

    const getProgress = () => {
      const { start, end } = getScrollBounds()
      const range = end - start
      if (range <= 0) return 0
      return Math.max(0, Math.min(1, (window.scrollY - start) / range))
    }

    const drawFrame = (frame: ImageBitmap) => {
      const cw = canvas.width
      const ch = canvas.height
      const s = Math.max(cw / frame.width, ch / frame.height) * HERO_ZOOM
      const dw = frame.width * s
      const dh = frame.height * s
      // Clear first: when zoomed out the frame no longer fills the canvas, so
      // without clearing the previous frame would smear at the edges.
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    const tick = () => {
      const progress = getProgress()
      if (framesReady && frames.length > 0) {
        const idx = Math.round(progress * (frames.length - 1))
        if (idx !== lastFrameIndex) {
          lastFrameIndex = idx
          const frame = frames[idx]
          if (frame) drawFrame(frame)
        }
      } else if (
        videoEl.duration &&
        isFinite(videoEl.duration) &&
        videoEl.readyState >= 1
      ) {
        const target = progress * videoEl.duration
        if (!videoSeeking && Math.abs(videoEl.currentTime - target) > 0.001) {
          videoSeeking = true
          videoEl.currentTime = target
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    const extractFrames = async () => {
      try {
        const response = await fetch(VIDEO_URL, { mode: 'cors' })
        const blob = await response.blob()
        if (cancelled) return
        const objectUrl = URL.createObjectURL(blob)

        const video = document.createElement('video')
        video.muted = true
        video.playsInline = true
        video.crossOrigin = 'anonymous'
        video.preload = 'auto'
        video.src = objectUrl

        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => resolve()
          video.onerror = () => reject(new Error('metadata error'))
          setTimeout(() => reject(new Error('metadata timeout')), 15000)
        })
        if (cancelled) {
          URL.revokeObjectURL(objectUrl)
          return
        }

        const scale = Math.min(1, 1280 / video.videoWidth)
        const scaledWidth = Math.round(video.videoWidth * scale)
        const scaledHeight = Math.round(video.videoHeight * scale)
        const frameCount = Math.max(
          30,
          Math.min(120, Math.round(video.duration * 24)),
        )

        for (let i = 0; i < frameCount; i++) {
          if (cancelled) break
          const time = (i / (frameCount - 1)) * (video.duration - 0.05)
          video.currentTime = time
          await new Promise<void>((resolve, reject) => {
            const onSeeked = () => {
              video.removeEventListener('seeked', onSeeked)
              resolve()
            }
            video.addEventListener('seeked', onSeeked)
            setTimeout(() => {
              video.removeEventListener('seeked', onSeeked)
              reject(new Error('seek timeout'))
            }, 3000)
          })
          const bitmap = await createImageBitmap(video, {
            resizeWidth: scaledWidth,
            resizeHeight: scaledHeight,
          })
          frames.push(bitmap)
        }

        if (!cancelled && frames.length > 0) {
          framesReady = true
          canvas.style.visibility = 'visible'
          videoEl.style.display = 'none'
        }
        URL.revokeObjectURL(objectUrl)
      } catch {
        /* fall back to live <video> seeking */
      }
    }

    const onVideoSeeked = () => {
      videoSeeking = false
    }
    const onVideoStalled = () => {
      videoSeeking = false
    }
    const onVideoLoadedData = () => {
      videoEl.currentTime = 0
    }

    videoEl.addEventListener('seeked', onVideoSeeked)
    videoEl.addEventListener('stalled', onVideoStalled)
    videoEl.addEventListener('loadeddata', onVideoLoadedData)
    canvas.style.visibility = 'hidden'

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    rafId = requestAnimationFrame(tick)
    void extractFrames()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resizeCanvas)
      videoEl.removeEventListener('seeked', onVideoSeeked)
      videoEl.removeEventListener('stalled', onVideoStalled)
      videoEl.removeEventListener('loadeddata', onVideoLoadedData)
      frames.forEach((f) => f.close())
      frames = []
    }
  }, [canvasRef, videoRef])
}
