import { Container } from "@/components/layouts/container"
import { useUserStore } from "@/hooks/stores/use-user-store"
import { Text } from "@/libs/ui/text"
import { Service } from "@/services/app.service"
import { cn } from "@/utils/classnames"
import { formatNumber } from "@/utils/number"
import { truncateAddress } from "@/utils/string"
import { FC } from "react"
import useSWR from "swr"

interface LeaderboardPageProps {}

export const LeaderboardPage: FC<LeaderboardPageProps> = () => {
  const { token } = useUserStore()
  const { data: leaderboardData } = useSWR(["get-leaderboard", token], async () => {
    const response = await Service.user.getLeaderboard()
    return response
  })
  console.log("leaderboardData", leaderboardData)
  return (
    <div className="h-full">
      <Container className="pt-4 max-md:pt-0">
        <div className="flex items-center justify-center gap-20">
          <div className="space-y-4 text-center">
            <Text
              className="font-neueMachinaBold animate-gradient-text bg-gradient-to-r from-white via-[#68A7FF] to-white bg-[length:200%_100%] bg-clip-text text-5xl text-transparent max-md:text-xl"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient(90deg, #FFF 0%, #68A7FF 50%, #FFF 100%)",
                backgroundSize: "200% 100%",
                animation: "gradient-slide 2.5s linear infinite",
              }}
            >
              LEADERBOARD
            </Text>

            <style>
              {`
                @keyframes gradient-slide {
                  0% { background-position: 0% 50%; }
                  100% { background-position: 100% 50%; }
                }
              `}
            </style>
            <Text className="max-w-[550px] text-2xl max-md:text-base">
              Leaderboard updates every 24h! Check your rank daily and steal the crown!
            </Text>
          </div>
        </div>
      </Container>

      <div className="card-leaderboard mx-auto mt-10 h-fit max-w-[1440px] rounded-t-3xl bg-[linear-gradient(182deg,rgba(17,55,103,0.20)_-16.39%,rgba(0,102,255,0.20)_71.93%)] bg-fixed p-10 max-lg:px-0 max-md:mt-6 max-md:pt-4">
        <table className="font-neueMachinaBold w-full border-spacing-0 text-lg text-white">
          <thead>
            <tr className="z-20 text-xl">
              <th className="p-4 text-center max-md:text-base max-sm:p-2 max-sm:text-xs">Rank</th>
              <th className="p-4 text-left max-md:text-base max-sm:p-2  max-sm:text-xs">Name</th>
              <th className="p-4 text-center max-md:text-base max-sm:p-2  max-sm:text-xs">Points</th>
              <th className="p-4 text-center max-md:text-base max-sm:p-2  max-sm:text-xs">Invite</th>
            </tr>
          </thead>

          <tbody>
            <tr className={cn("user-rank sticky top-44 z-10 h-24 text-xl max-md:h-16", !token && "hidden")}>
              <td className="rounded-l-xl border border-r-0 border-[#5aa5ff] px-4 py-2 text-center max-md:text-sm">
                {leaderboardData?.user_rank?.rank}
              </td>
              <td className="border border-x-0 border-[#5aa5ff] px-4 py-2 text-left max-md:text-sm max-sm:text-xs">
                {leaderboardData?.user_rank?.twitter_username
                  ? leaderboardData?.user_rank?.twitter_username
                  : truncateAddress(leaderboardData?.user_rank?.address || "") || "-"}
              </td>
              <td className="border border-x-0 border-[#5aa5ff] px-4 py-2 text-center max-md:text-sm max-sm:text-xs">
                {formatNumber(Number(leaderboardData?.user_rank?.balance || 0))}
              </td>
              <td className="rounded-r-xl border border-l-0 border-[#5aa5ff] px-4 py-2 text-center max-md:text-sm max-sm:text-xs">
                {formatNumber(Number(leaderboardData?.user_rank?.total_invite || 0))}
              </td>
            </tr>

            {leaderboardData?.list_top.map((rank, idx) => (
              <tr key={rank.id} className={cn("h-24 max-md:h-16 text-xl", idx % 2 === 0 ? "bg-[#1E2835]" : "bg-[#111B27]")}>
                <td className="rounded-l-xl px-4 py-3 text-center">
                  {idx === 0 && <img src="/images/top1.png" alt="1" className="inline-block w-20 max-md:w-10" />}
                  {idx === 1 && <img src="/images/top2.png" alt="2" className="inline-block w-20 max-md:w-10" />}
                  {idx === 2 && <img src="/images/top3.png" alt="3" className="inline-block w-20 max-md:w-10" />}
                  {idx > 2 && <span className="font-bold max-md:text-sm max-sm:text-xs">{idx + 1}</span>}
                </td>
                <td className="px-4 py-3 text-left max-md:text-sm max-sm:text-xs">
                  {rank?.twitter_username ? rank?.twitter_username : truncateAddress(rank?.address, 8) || "-"}
                </td>
                <td className="px-4 py-3 text-center max-md:text-sm max-sm:text-xs">{formatNumber(Number(rank?.balance || 0))}</td>
                <td className="rounded-r-xl px-4 py-3 text-center max-md:text-sm max-sm:text-xs">
                  {formatNumber(Number(rank?.total_invite || 0))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
