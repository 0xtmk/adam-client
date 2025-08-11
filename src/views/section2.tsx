import { Container } from "@/components/layouts/container"
import { FC } from "react"

interface Section2Props {}

const Section2: FC<Section2Props> = () => {
  return (
    <Container className="flex flex-col gap-[204px] pt-[7.125rem] max-lg:gap-[2rem] max-lg:pt-[10rem]">
      <div className="inline-flex items-start gap-[128px] max-lg:flex-col max-lg:items-center max-lg:gap-6">
        <div className="font-UScream text-primary-500 max-w-[31rem] text-[5.5rem] leading-[90%] max-lg:w-full max-lg:text-[3.5rem]">
          <div className="max-w-[26rem] max-lg:w-full max-lg:text-center">Dare to Escape? Welcome to EviL3viE</div>
        </div>
        <div className="flex max-w-[37.5rem] flex-col gap-8 max-lg:gap-6">
          <div className="text-secondary-400 text-base font-medium">
            Evil3vie isn’t just an escape game. It’s a psychological descent — a P2E horror puzzle on Solana where
            memory, fear, and reward intertwine.
          </div>
          <div className="text-secondary-400 text-base font-medium">
            You awaken in a rotting school with no instructions. You don’t know why you’re here. But the building does.
            Each floor twists reality. Solve puzzles, face shadows and collect what’s left of yourself. Some pieces may
            not be yours... or real.
          </div>
          <div className="text-secondary-400 text-base font-medium">
            To escape, you’ll need more than logic. You’ll need to remember what you were meant to forget.
          </div>
        </div>
      </div>
      <div className="mx-auto grid grid-cols-4 items-center justify-center gap-4 max-lg:grid-cols-2">
        <img src="/images/item-1.png" alt="" />
        <img src="/images/item-2.png" alt="" />
        <img src="/images/item-3.png" alt="" />
        <img src="/images/item-4.png" alt="" />
      </div>
    </Container>
  )
}

export default Section2
