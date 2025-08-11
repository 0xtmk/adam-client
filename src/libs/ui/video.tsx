import { forwardRef, VideoHTMLAttributes } from "react"

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src?: string
  type?: string
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ src, type = "video/mp4", ...props }, ref) => {
  return (
    <video autoPlay loop muted playsInline ref={ref} {...props}>
      <source src={src} type={type} />
    </video>
  )
})

Video.displayName = "Video"
