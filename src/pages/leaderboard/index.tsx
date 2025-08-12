import { Container } from "@/components/layouts/container"
import { Text } from "@/libs/ui/text"
import { cn } from "@/utils/classnames"
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

      <div className="card-leaderboard mx-auto mt-10 h-fit max-w-[1440px] rounded-t-3xl bg-[rgba(21,81,158,0.2)] p-10">
        <table className="font-neueMachinaBold w-full border-spacing-0 text-lg text-white">
          <thead>
            <tr className="z-20 text-xl">
              <th className="px-4 py-4 text-center">Rank</th>
              <th className="px-4 py-4 text-left">Name</th>
              <th className="px-4 py-4 text-center">Total Points</th>
              <th className="px-4 py-4 text-center">Invite</th>
            </tr>
          </thead>

          <tbody>
            <tr className="user-rank sticky top-0 z-10 h-24 text-xl">
              <td className="rounded-l-xl border border-r-0 border-[#5aa5ff] px-4 py-2 text-center">-</td>
              <td className="border border-x-0 border-[#5aa5ff] px-4 py-2 text-left">User</td>
              <td className="border border-x-0 border-[#5aa5ff] px-4 py-2 text-center">-</td>
              <td className="rounded-r-xl border border-l-0 border-[#5aa5ff] px-4 py-2 text-center">-</td>
            </tr>

            {Array.from({ length: 15 }, (_, idx) => idx + 1).map((rank, idx) => (
              <tr key={rank} className={cn("h-24 text-xl", idx % 2 === 0 ? "bg-[#1E2835]" : "bg-[#111B27]")}>
                <td className="rounded-l-xl px-4 py-3 text-center">
                  {idx === 0 && <img src="/images/top1.png" alt="1" className="inline-block w-20" />}
                  {idx === 1 && <img src="/images/top2.png" alt="2" className="inline-block w-20" />}
                  {idx === 2 && <img src="/images/top3.png" alt="3" className="inline-block w-20" />}
                  {idx > 2 && <span className="font-bold">{rank}</span>}
                </td>
                <td className="px-4 py-3 text-left">Ynhsfb...ahsdjk</td>
                <td className="px-4 py-3 text-center">100</td>
                <td className="rounded-r-xl px-4 py-3 text-center">100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
