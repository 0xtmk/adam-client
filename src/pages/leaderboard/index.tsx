import { Container } from "@/components/layouts/container"
import { useUserStore } from "@/hooks/stores/use-user-store"
import { Loading } from "@/libs/ui/loading"
import { Text } from "@/libs/ui/text"
import { Service } from "@/services/app.service"
import { cn } from "@/utils/classnames"
import { formatNumber } from "@/utils/number"
import { truncateAddress } from "@/utils/string"
import { Empty } from "antd"
import { FC } from "react"
import useSWR from "swr"

interface LeaderboardPageProps {}

export const LeaderboardPage: FC<LeaderboardPageProps> = () => {
  const { token } = useUserStore()
  const { data: leaderboardData, isLoading: isLoadingLeaderboard } = useSWR(["get-leaderboard", token], async () => {
    const response = await Service.user.getLeaderboard()
    return response
  })

  return (
    <div className="h-full">
      <img src="/images/bg-leaderboard.png" className="absolute left-0 right-0 top-0" alt="" />
      <img src="/images/leaderboard-light.png" className="absolute left-0 right-0 top-0 h-svh w-svw" alt="" />
      <img src="/images/beam-left.png" className="absolute left-0 top-0" alt="" />
      <img src="/images/beam-right.png" className="absolute right-0 top-0" alt="" />

      <Container size="blessing" className="relative pt-10">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-1 text-5xl">
            <Text>🏆</Text>
            <Text
              style={{
                background: "linear-gradient(92deg, #A1D5FF 5.57%, #FFF 111.38%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="font-neueMachinaBold"
            >
              LEADERBOARD
            </Text>
          </div>
          <Text className="text-center text-xl">
            Leaderboard updates every minute! Check your rank daily and steal the crown!
          </Text>
          <Text className="text-center text-2xl">Top 200 EDEN</Text>
        </div>
        <div className="mt-6 rounded-[32px] bg-[linear-gradient(92deg,#A1D5FF_5.57%,#3499FF_111.38%)] p-[2px]">
          <div className="h-full w-full overflow-hidden rounded-[32px] bg-[#1B2547]">
            <table className="w-full border-spacing-0">
              <thead className="bg-[#111932] text-white">
                <tr className="h-16 ">
                  <th className="font-neueMachinaBold w-[15%] pl-8 text-left text-xl">Rank</th>
                  <th className="font-neueMachinaBold w-[30%] text-left text-xl">Name</th>
                  <th className="font-neueMachinaBold w-[30%] text-left text-xl">Total Points</th>
                  <th className="font-neueMachinaBold w-[25%] text-left text-xl">Invite</th>
                </tr>
              </thead>

              <tbody>
                {leaderboardData?.user_rank?.rank && (
                  <tr>
                    <td colSpan={4} className="p-0">
                      <div className="h-14 bg-[linear-gradient(90deg,#26DDFF_0%,transparent_100%)] py-[1px]">
                        <div className="flex h-full w-full items-center bg-[linear-gradient(84deg,#000618_-1.75%,#005EBC_90.22%)]">
                          <div className="w-[15%] pl-12">{leaderboardData?.user_rank?.rank}</div>
                          <div className="w-[30%]">
                            {leaderboardData?.user_rank?.twitter_username ? (
                              <div className="flex items-center gap-1">
                                <img src={leaderboardData?.user_rank?.avatar} className="h-8 w-8 rounded-full" alt="" />
                                <Text>{leaderboardData?.user_rank?.twitter_username}</Text>
                              </div>
                            ) : (
                              truncateAddress(leaderboardData?.user_rank?.address || "")
                            )}
                          </div>
                          <div className="w-[30%]">
                            {formatNumber(Number(leaderboardData?.user_rank?.balance || 0))}
                          </div>
                          <div className="w-[25%]">{leaderboardData?.user_rank?.total_invite || 0}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {isLoadingLeaderboard && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center">
                      <Loading className="inline-block h-10 w-10" />
                    </td>
                  </tr>
                )}
                {!isLoadingLeaderboard && !leaderboardData?.list_top?.length && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center">
                      <Empty />
                    </td>
                  </tr>
                )}

                <tr>
                  <td colSpan={4} className="p-0">
                    <div className="modal-scroll-bar max-h-[450px] min-h-[250px] overflow-y-auto">
                      <table className="w-full border-spacing-0">
                        <tbody>
                          {leaderboardData?.list_top?.map((item, index) => (
                            <tr
                              key={item.id}
                              className={cn(
                                "h-14",
                                leaderboardData?.user_rank?.rank
                                  ? index % 2 === 0
                                    ? "bg-[#111932]"
                                    : "bg-[#1B2547]"
                                  : index % 2 === 0
                                    ? "bg-[#1B2547]"
                                    : "bg-[#111932]",
                              )}
                            >
                              <td className="w-[15%] pl-8">
                                {index === 0 && <img src="/images/top1.png" alt="1" className="w-11" />}
                                {index === 1 && <img src="/images/top2.png" alt="1" className="w-11" />}
                                {index === 2 && <img src="/images/top3.png" alt="1" className="w-11" />}
                                {index > 2 && <Text className="pl-4">{index + 1}</Text>}
                              </td>
                              <td className="w-[30%]">
                                {item.twitter_username ? (
                                  <div className="flex items-center gap-1">
                                    <img src={item.avatar} className="h-8 w-8 rounded-full" alt="" />
                                    <Text>{item.twitter_username}</Text>
                                  </div>
                                ) : (
                                  truncateAddress(item.address || "")
                                )}
                              </td>
                              <td className="w-[30%]">{formatNumber(Number(item.balance || 0))}</td>
                              <td className="w-[25%]">{item.total_invite || 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  )
}
