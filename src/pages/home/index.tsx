import { Container } from "@/components/layouts/container"
import { Button } from "@/libs/ui/button"
import { Text } from "@/libs/ui/text"
import { FC } from "react"

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  return (
    <Container>
      {/* daily quest */}
      <div className="card-daily-quest p-10 pb-20">
        <div className="flex items-center justify-between">
          <Text className="text-4xl">DAILY QUEST</Text>
          <Text className="text-2xl">Resets at 0:00 UTC</Text>
        </div>
        <Text className="mt-5 text-xl">Do all quests to activate....</Text>
        <div className="mt-[70px]">
          <div className="flex items-center justify-between rounded-xl bg-[#111B27] px-9 py-6 hover:bg-[#1E2835] ">
            <div className="flex items-center gap-9">
              <img src="/icons/twitter.png" className="h-10 w-10" alt="" />
              <Text className="text-2xl">Retweet X post</Text>
            </div>
            <Button className="bg-start h-9 min-w-40 !text-white">
              <Text className="font-neueMachinaBold text-xl">Start</Text>
            </Button>
          </div>
        </div>
      </div>
      {/* spinning */}
      <div></div>
    </Container>
  )
}
