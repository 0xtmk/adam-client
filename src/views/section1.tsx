import { Container } from "@/components/layouts/container"
import { Video } from "@/libs/ui/video"
import { FC } from "react"

interface Section1Props {}

const Section1: FC<Section1Props> = () => {
  return (
    <Container className="flex flex-col items-center justify-center max-lg:pt-10">
      <div className="flex flex-col items-center justify-center gap-6 max-lg:gap-4">
        <div className="text-primary-500 font-UScream text-center text-[6rem] leading-[90%] max-lg:text-[4rem] max-lg:leading-[3.6rem]">
          Escape the Building. Find the Clues & Face the Truth.
        </div>
        <div className="text-secondary-400 max-w-[66.5rem] text-center text-xl font-medium max-lg:pb-[2.75rem] max-lg:text-base">
          Evil3vie is a Play-to-Earn horror puzzle game on Solana. Trapped in a forgotten school, you solve your way
          down — floor by floor. Each clue is a memory. Each memory is yours to keep. Escape... if the building lets
          you.
        </div>
        <div className="bg-[url('/images/bg-video.png')] bg-cover bg-center bg-no-repeat p-6 max-lg:p-4">
          <Video src="/videos/Evil3vie.mp4"></Video>
        </div>
      </div>
    </Container>
  )
}

export default Section1
