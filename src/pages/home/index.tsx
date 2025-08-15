import { Container } from "@/components/layouts/container"
import { MISSION_STATUS } from "@/constants/app"
import { useUserStore } from "@/hooks/stores/use-user-store"
import { Loading } from "@/libs/ui/loading"
import { Text } from "@/libs/ui/text"
import { Service } from "@/services/app.service"
import { cn } from "@/utils/classnames"
import { openLinkInNewTab } from "@/utils/common"
import { Button } from "antd"
import { FC, useEffect, useState } from "react"
import useSWR from "swr"
import { Spin } from "./spin"

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const { token, userInfo } = useUserStore()

  const [missionCheckingList, setMissionCheckingList] = useState<number[]>([])
  const [missionCountdowns, setMissionCountdowns] = useState<{ [id: number]: number }>({})
  const [missionDone, setMissionDone] = useState<{ [id: number]: boolean }>({})

  const { data: missionList, isLoading: gettingMissionList } = useSWR(["get-mission-list", token], async () => {
    if (!token) return
    const res = await Service.mission.getListMissions()
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
      <div className="card-daily-quest p-10 pb-20">
        <div className="flex items-center justify-between">
          <Text className="text-4xl">DAILY QUEST</Text>
          <Text className="text-2xl">Resets at 0:00 UTC</Text>
        </div>
        <Text className="mt-5 text-xl">Do all quests to activate....</Text>
        <div className="mt-[70px]">
          {gettingMissionList ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : !userInfo?.twitter_id ? (
            <div className="flex justify-center">
              <button
                onClick={handleConnectX}
                className="spin-btn flex h-10 w-32 items-center justify-center gap-1 rounded-full bg-[rgba(16,38,68,0.2)] shadow-[0_4px_0_rgba(0,0,0,0.25),inset_0_4px_4px_rgba(163,163,163,0.25)] backdrop-blur-[10px] active:scale-95"
              >
                <Text variant="span" className="font-neueMachinaBold text-base text-black">
                  Connect
                </Text>
                <img src="/images/twitter.png" className="h-3 w-3" alt="" />
              </button>
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
      </div>
      {/* spinning */}
      <div className="card-daily-quest mt-16 !rounded-b-none px-14 py-10">
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

        <div className="mt-4 flex items-center gap-6">
          {socials.map((item, index) => {
            return (
              <div className="cursor-pointer hover:scale-105 active:scale-95" key={index}>
                <img src={item.image} className="h-14 w-14" alt="" />
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

const socials = [
  {
    image: "/icons/x.png",
    href: "",
  },
  {
    image: "/icons/tele.png",
    href: "",
  },
  {
    image: "/icons/discord.png",
    href: "",
  },
]
