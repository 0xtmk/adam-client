import { Container } from "@/components/layouts/container"
import { MISSION_STATUS } from "@/constants/app"
import { useUserStore } from "@/hooks/stores/use-user-store"
import { Loading } from "@/libs/ui/loading"
import { Text } from "@/libs/ui/text"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { Service } from "@/services/app.service"
import { cn } from "@/utils/classnames"
import { openLinkInNewTab } from "@/utils/common"
import { Button } from "antd"
import { FC, useEffect, useState } from "react"
import useSWR from "swr"
import { Spin } from "./spin"

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const [missionCheckingList, setMissionCheckingList] = useState<number[]>([])
  const [missionCountdowns, setMissionCountdowns] = useState<{ [id: number]: number }>({})
  const [missionDone, setMissionDone] = useState<{ [id: number]: boolean }>({})

  const { userInfo, token } = useUserStore()
  const { address, connectWallet } = useSolanaWallet()

  const { data: missionList, isLoading: gettingMissionList } = useSWR(["get-mission-list", token], async () => {
    const res = await Service.mission.getListMissions()
    return res
  })

  const { data: missionStreak } = useSWR(["get-mission-streak", token], async () => {
    const res = await Service.mission.getMissionStreak()
    return res
  })

  const handleConnectX = async () => {
    try {
      const res = await Service.common.getTwitterUrl()
      if (res) {
        window.open(res)
      }
    } catch (error) {
      console.error("Error connecting:", error)
    }
  }
  const handleCheckMission = async (missionId: number) => {
    if (!address) {
      connectWallet()
      return
    }
    if (!userInfo?.twitter_id) {
      handleConnectX()
      return
    }
    const res = await Service.mission.checkMission(missionId)
    if (res?.url) {
      setMissionCheckingList((prev) => [...prev, missionId])
      setMissionCountdowns((prev) => ({ ...prev, [missionId]: 10 }))
      openLinkInNewTab(res?.url)
    }

    if (res === true) {
      setMissionDone((prev) => ({ ...prev, [missionId]: true }))
    }
  }

  useEffect(() => {
    if (missionCheckingList.length === 0) return
    const interval = setInterval(() => {
      setMissionCountdowns((prev) => {
        const updated = { ...prev }
        missionCheckingList.forEach((id) => {
          if (updated[id] > 0) updated[id] = updated[id] - 1
        })
        return updated
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [missionCheckingList])

  return (
    <Container>
      {/* daily quest */}
      <div
        className="
      rounded-[38px] bg-[linear-gradient(182deg,rgba(17,55,103,0.20)_-16.39%,rgba(0,102,255,0.20)_71.93%)] bg-fixed p-10
      pb-4 shadow-[0_4px_4px_0_rgba(163,163,163,0.25)_inset,0_4px_6.5px_0_rgba(0,0,0,0.25)] backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-5">
            <Text className="text-4xl">DAILY QUEST</Text>

            <Text className="mt-5 max-w-[615px] text-xl">
              Welcome to ADAM! Spin to win, earn exciting rewards, and join a mission to make the world a better place!
            </Text>
          </div>

          <div className="flex flex-col items-center justify-center gap-[10px]">
            <Text className="text-xl">Streaks</Text>
            <div className="relative h-7 w-[350px] rounded-3xl bg-white p-[2px]">
              <div
                className="absolute left-0 top-0 -z-10 h-full w-full rounded-3xl"
                style={{
                  background:
                    "radial-gradient(116.35% 236.22% at -5.14% 100%, #FFBB01 0%, #FFD45D 29.69%, #FFBB01 54.17%, #FFBB01 77.08%, #FFBB01 100%)",
                  filter: "blur(25px)",
                }}
              />
              <div
                style={{
                  width: `${(missionStreak?.streak / missionStreak?.total_streak) * 100}%`,
                }}
                className="h-full rounded-3xl bg-[linear-gradient(60deg,#DABB22_5.72%,#E97A3A_67.19%)]"
              ></div>
              <Text className="font-neueMachinaUltrabold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-[#BD5A1E]">
                {missionStreak?.streak}/{missionStreak?.total_streak}
              </Text>

              <img src="/images/chest.png" className="absolute -right-1 -top-5 h-16 w-16 animate-bounce" alt="" />
            </div>
          </div>
        </div>

        <div className="mt-[70px]">
          {gettingMissionList ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : Number(missionList?.length) ? (
            <div className="space-y-6">
              {missionList?.map((item, index) => {
                const isChecking = missionCheckingList.includes(item?.id)
                const countdown = missionCountdowns[item?.id] || 0
                const isDone = missionDone[item?.id] || item?.user_status === MISSION_STATUS.DONE

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl bg-[#111B27] px-9 py-6 hover:bg-[#1E2835] "
                  >
                    <div className="flex items-center gap-9">
                      <img src="/icons/twitter.png" className="h-10 w-10" alt="" />
                      <Text className="text-2xl">{item?.name}</Text>
                    </div>
                    {isDone ? (
                      <div className="flex h-9 min-w-40 items-center justify-center rounded border border-[#D9D9D9] bg-[#68FD7F]">
                        <Text className="font-neueMachinaBold text-xl text-black">Done</Text>
                      </div>
                    ) : isChecking ? (
                      countdown > 0 ? (
                        <div className="flex h-9 min-w-40 items-center justify-center rounded border border-[#D9D9D9] bg-[#FF4444]">
                          <Text className="font-neueMachinaBold text-xl text-black">{countdown}s</Text>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleCheckMission(item?.id)}
                          className="h-9 min-w-40 !border-[#D9D9D9] !bg-[#FFCB3D]"
                        >
                          <Text className="font-neueMachinaBold text-xl text-black">Retry</Text>
                        </Button>
                      )
                    ) : (
                      <Button onClick={() => handleCheckMission(item?.id)} className="bg-start h-9 min-w-40">
                        <Text className="font-neueMachinaBold text-xl text-black">Start</Text>
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-col gap-2 items-center">
          <Text className="text-2xl">Complete all quests</Text>
          <Text>The quest will be reset at 0am UTC</Text>
        </div>
      </div>
      {/* spinning */}
      <div
        className={cn(
          "mt-16 !rounded-b-none px-14 py-10",
          "rounded-[38px] bg-[linear-gradient(182deg,rgba(17,55,103,0.20)_-16.39%,rgba(0,102,255,0.20)_71.93%)] bg-fixed shadow-[0_4px_4px_0_rgba(163,163,163,0.25)_inset,0_4px_6.5px_0_rgba(0,0,0,0.25)] backdrop-blur-sm",
        )}
      >
        <div className={cn("flex items-start justify-between")}>
          <div className={cn("flex items-start justify-between", !userInfo?.twitter_id && "hidden")}>
            <img src={userInfo?.avatar} className="h-14 w-14 flex-shrink-0 rounded-full" alt="" />
            <Text className="font-neueMachinaBold">{userInfo?.twitter_full_name}</Text>
          </div>
          <Text className="text-4xl">SPIN THE WHEEL</Text>
          <img src="/images/guide.png" className="cursor-pointer hover:scale-105" alt="" />
        </div>

        <div className="mt-20">
          <Spin />
        </div>
      </div>
    </Container>
  )
}

// const socials = [
//   {
//     image: "/icons/x.png",
//     href: "",
//   },
//   {
//     image: "/icons/tele.png",
//     href: "",
//   },
//   {
//     image: "/icons/discord.png",
//     href: "",
//   },
// ]
