import { Container } from "@/components/layouts/container"
import { MISSION_STATUS } from "@/constants/app"
import { useUserStore } from "@/hooks/stores/use-user-store"
import { Loading } from "@/libs/ui/loading"
import { Text } from "@/libs/ui/text"
import { Service } from "@/services/app.service"
import { openLinkInNewTab } from "@/utils/common"
import { Button } from "antd"
import { FC, useEffect, useState } from "react"
import useSWR from "swr"

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const { token } = useUserStore()

  const [missionCheckingList, setMissionCheckingList] = useState<number[]>([])
  const [missionCountdowns, setMissionCountdowns] = useState<{ [id: number]: number }>({})
  const [missionRetry, setMissionRetry] = useState<{ [id: number]: boolean }>({})
  const [missionDone, setMissionDone] = useState<{ [id: number]: boolean }>({})

  const { data: missionList, isLoading: gettingMissionList } = useSWR(["get-mission-list", token], async () => {
    const res = await Service.mission.getListMissions()
    return res
  })

  const handleCheckMission = async (missionId: number) => {
    const res = await Service.mission.checkMission(missionId)
    if (res?.url) {
      setMissionCheckingList((prev) => [...prev, missionId])
      setMissionCountdowns((prev) => ({ ...prev, [missionId]: 60 }))
      openLinkInNewTab(res?.url)
    }

    if(res === true){
      setMissionDone((prev) => ({ ...prev, [missionId]: true }))
    }
  }

  useEffect(() => {
    const idsToCheck = missionCheckingList.filter(
      (id) => missionCountdowns[id] === 0 && !missionDone[id] && !missionRetry[id],
    )
    if (idsToCheck.length === 0) return
    idsToCheck.forEach(async (id) => {
      const res = await Service.mission.checkMission(id)
      if (!res?.url) {
        setMissionDone((prev) => ({ ...prev, [id]: true }))
      } else {
        setMissionRetry((prev) => ({ ...prev, [id]: true }))
      }
    })
  }, [missionCountdowns, missionCheckingList, missionDone, missionRetry])

  useEffect(() => {
    missionCheckingList.forEach(async (id) => {
      if (missionCountdowns[id] === 0 && !missionDone[id] && !missionRetry[id]) {
        const res = await Service.mission.checkMission(id)
        if (!res?.url) {
          setMissionDone((prev) => ({ ...prev, [id]: true }))
        } else {
          setMissionRetry((prev) => ({ ...prev, [id]: true }))
        }
      }
    })
  }, [missionCountdowns, missionCheckingList, missionDone, missionRetry])

  console.log("missionList", missionList, missionCheckingList)

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
          ) : Number(missionList?.length) ? (
            <div className="space-y-6">
              {missionList?.map((item, index) => {
                const isChecking = missionCheckingList.includes(item?.id)
                const countdown = missionCountdowns[item?.id] || 0
                const isDone = missionDone[item?.id]
                const isRetry = missionRetry[item?.id]

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl bg-[#111B27] px-9 py-6 hover:bg-[#1E2835] "
                  >
                    <div className="flex items-center gap-9">
                      <img src="/icons/twitter.png" className="h-10 w-10" alt="" />
                      <Text className="text-2xl">{item?.name}</Text>
                    </div>
                    {item?.user_status === MISSION_STATUS.UNDONE && !isDone && (
                      <Button onClick={() => handleCheckMission(item?.id)} className="bg-start h-9 min-w-40">
                        <Text className="font-neueMachinaBold text-xl text-black">Start</Text>
                      </Button>
                    )}

                    {isChecking && countdown > 0 && (
                      <div className="flex h-9 min-w-40 items-center justify-center rounded border border-[#D9D9D9] bg-[#FF4444]">
                        <Text className="font-neueMachinaBold text-xl text-black">{countdown}s</Text>
                      </div>
                    )}

                    {(item?.user_status === MISSION_STATUS.DONE || isDone) && (
                      <div className="flex h-9 min-w-40 items-center justify-center rounded border border-[#D9D9D9] bg-[#C8C8C8]">
                        <Text className="font-neueMachinaBold text-xl text-black">Claimed</Text>
                      </div>
                    )}

                    {isChecking && countdown === 0 && isRetry && (
                      <Button className="h-9 min-w-40 !border-[#D9D9D9] !bg-[#FFCB3D]">
                        <Text className="font-neueMachinaBold text-xl text-black">Retry</Text>
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
      <div></div>
    </Container>
  )
}
