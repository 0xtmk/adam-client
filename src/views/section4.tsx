import { Container } from "@/components/layouts/container"
import { FC } from "react"

interface Section4Props {}

const Section4: FC<Section4Props> = () => {
  return (
    <div>
      <Container size={"main"} className="flex min-h-screen items-center py-6">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center gap-6 max-lg:gap-4">
            <h1 className="text-primary-500 font-UScream text-center text-[5.5rem] !leading-none max-lg:text-[3.5rem]">
              On-Chain Memory Progression
            </h1>
            <p className="text-secondary-400 text-base font-medium">Gameplay Mechanic</p>
          </div>
          <div className="mx-auto mt-16 grid grid-cols-3 gap-6 max-lg:mt-11 max-lg:max-w-[500px] max-lg:grid-cols-1 max-lg:gap-4">
            {gameplays.map((item, index) => (
              <div
                key={item.title}
                className="bg-[url(/images/bg-gameplay.png)] bg-[length:100%_100%] bg-center p-6 !pb-8"
              >
                <img src={item.img} alt="" className="w-full" />
                <div className="mt-6 text-center text-2xl font-medium text-black max-xl:text-lg">{item.title}</div>
                <div className="text-center text-sm font-medium text-stone-950">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Section4

const gameplays = [
  {
    img: "/images/img-gameplay-1.png",
    title: "NFT-Based Items & Memories",
    description: "Collect rare artifacts and soulbound memories—some unlock hidden floors and secret paths.",
  },
  {
    img: "/images/img-gameplay-2.png",
    title: "Evil3vie's Token Utility",
    description:
      "Use tokens earned through gameplay to unlock sealed doors, access hidden floors, or recover lost memories.",
  },
  {
    img: "/images/img-gameplay-3.png",
    title: "Play-to-Own",
    description:
      "Every puzzle you solve, every choice you make — kept permanently on-chain. Earn by solving. Own what you uncover.",
  },
]
