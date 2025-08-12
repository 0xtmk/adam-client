import { Container } from "@/components/layouts/container"
import { Text } from "@/libs/ui/text"
import { FC } from "react"

interface LeaderboardPageProps {}

export const LeaderboardPage: FC<LeaderboardPageProps> = () => {
  return (
    <div className="h-full">
      <Container className="pt-8">
        <div className="flex items-center justify-center gap-20">
          <img src="/icons/trophy.png" className="h-16 w-16 flex-shrink-0" alt="" />
          <div className="space-y-5 text-center">
            <Text className="font-neueMachinaBold text-5xl">LEADERBOARD</Text>
            <Text className="text-2xl">Discover the Best Accounts and Content on</Text>
          </div>
          <img src="/icons/trophy.png" className="h-16 w-16 flex-shrink-0" alt="" />
        </div>
      </Container>

      <Container size="retina" className="card-leaderboard mt-10 h-fit rounded-t-3xl bg-[rgba(21,81,158,0.2)]">
          <div className="w-[10px] p-10">
   Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, temporibus explicabo quisquam provident ratione alias possimus velit placeat tenetur. Qui repudiandae obcaecati odit sint magni non, perferendis architecto culpa expedita!
          </div>
      </Container>
    </div>
  )
}
