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

      <div className="bg-fill mx-auto mt-10 w-full max-w-[1440px] bg-[url('/images/leaderboard-card.png')] bg-no-repeat p-10">
        <div className="max-h-[1514px] w-full overflow-auto">
          <table className="font-neueMachinaBold w-full text-lg text-white">
            <thead>
              <tr className="rounded-t-2xl bg-gradient-to-b from-[#59A1FF] to-[#3E86E4]">
                <th className="px-4 py-4 text-left">Rank</th>
                <th className="px-4 py-4 text-left">Name</th>
                <th className="px-4 py-4 text-center">Total Points</th>
                <th className="px-4 py-4 text-center">Invite</th>
              </tr>
              <tr className="bg-[rgba(89,161,255,0.2)]">
                <td className="px-4 py-2 text-center">-</td>
                <td className="px-4 py-2 text-left">User</td>
                <td className="px-4 py-2 text-center">1</td>
                <td className="px-4 py-2 text-center">1</td>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 200 }, (_, idx) => idx + 1).map((rank, idx) => (
                <tr key={rank} className={`$${idx < 3 ? "" : "bg-[rgba(255,255,255,0.04)]"} rounded-2xl`}>
                  <td className="px-4 py-3 text-center">
                    {idx === 0 && <img src="/icons/rank-1.png" alt="1" className="inline-block h-8 w-8" />}
                    {idx === 1 && <img src="/icons/rank-2.png" alt="2" className="inline-block h-8 w-8" />}
                    {idx === 2 && <img src="/icons/rank-3.png" alt="3" className="inline-block h-8 w-8" />}
                    {idx > 2 && <span className="font-bold">{rank}</span>}
                  </td>
                  <td className="px-4 py-3 text-left">Ynhsfb...ahsdjk</td>
                  <td className="px-4 py-3 text-center">100</td>
                  <td className="px-4 py-3 text-center">100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
