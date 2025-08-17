import { Container } from "@/components/layouts/container"
import { MISSION_STATUS } from "@/constants/app"
import { useUserStore } from "@/hooks/stores/use-user-store"
import useUserInfo from "@/hooks/use-user-info"
import { Loading } from "@/libs/ui/loading"
import { Text } from "@/libs/ui/text"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { Service } from "@/services/app.service"
import { cn } from "@/utils/classnames"
import { openLinkInNewTab } from "@/utils/common"
import { formatNumber } from "@/utils/number"
import { Button, Modal } from "antd"
import moment from "moment"
import { FC, useEffect, useState } from "react"
import useSWR from "swr"
import SpinWheel from "./spin"

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const [missionCheckingList, setMissionCheckingList] = useState<number[]>([])
  const [missionCountdowns, setMissionCountdowns] = useState<{ [id: number]: number }>({})
  const [missionDone, setMissionDone] = useState<{ [id: number]: boolean }>({})
  const [openSpinHistoryModal, setOpenSpinHistoryModal] = useState(false)
  const { userInfo, token } = useUserStore()
  const { address, connectWallet } = useSolanaWallet()
  const { userBalance } = useUserInfo()

  useEffect(() => {
    if (!token) {
      setMissionCheckingList([])
      setMissionCountdowns({})
      setMissionDone({})
    }
  }, [token])

  const { data: missionList, isLoading: gettingMissionList } = useSWR(["get-mission-list", token], async () => {
    const res = await Service.mission.getListMissions()
    return res
  })

  const { data: missionStreak } = useSWR(["get-mission-streak", token], async () => {
    const res = await Service.mission.getMissionStreak()
    return res
  })

  const { data: spinHistory, mutate: refreshSpinHistory } = useSWR(["get-spin-history", token], async () => {
    const response = await Service.spin.getHistory()
    return response.data
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
      pb-4 shadow-[0_4px_4px_0_rgba(163,163,163,0.25)_inset,0_4px_6.5px_0_rgba(0,0,0,0.25)] backdrop-blur-sm max-md:p-6 max-sm:px-4"
      >
        <div className="flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-4">
          <div className="space-y-5">
            <Text className="text-4xl max-md:text-xl">DAILY QUEST</Text>

            <Text className="mt-5 max-w-[615px] text-xl max-md:text-sm">
              Welcome to ADAM! Spin to win, earn exciting rewards, and join a mission to make the world a better place!
            </Text>
          </div>

          <div className="flex flex-col items-center justify-center gap-[10px] max-md:items-start">
            <Text className="text-xl max-md:text-base">Streaks</Text>
            <div className="relative h-7 w-[350px] rounded-3xl bg-white p-[2px] max-md:h-5 max-md:w-[280px]">
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
              <Text className="font-neueMachinaUltrabold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-[#BD5A1E] max-md:text-sm">
                {missionStreak?.streak}/{missionStreak?.total_streak}
              </Text>

              <img
                src="/images/chest.png"
                className="absolute -right-1 -top-5 h-16 w-16 animate-bounce max-md:-top-3 max-md:h-10 max-md:w-10"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="mt-[70px] max-md:mt-10">
          {gettingMissionList ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : Number(missionList?.length) ? (
            <div className="space-y-6 max-md:space-y-3">
              {missionList?.map((item, index) => {
                const isChecking = missionCheckingList.includes(item?.id)
                const countdown = missionCountdowns[item?.id] || 0
                const isDone = missionDone[item?.id] || item?.user_status === MISSION_STATUS.DONE

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl bg-[#111B27] px-9 py-6 hover:bg-[#1E2835] max-md:p-4"
                  >
                    <div className="flex items-center gap-9 max-md:gap-4 max-sm:gap-2">
                      <img src="/icons/twitter.png" className="h-10 w-10 max-md:h-8 max-md:w-8" alt="" />
                      <Text className="text-2xl max-md:text-base max-sm:text-sm">{item?.name}</Text>
                    </div>
                    {isDone ? (
                      <div className="flex h-9 w-40 items-center justify-center rounded border border-[#D9D9D9] bg-[#68FD7F] max-md:h-8 max-md:w-20">
                        <Text className="font-neueMachinaBold text-xl text-black max-md:text-sm">Done</Text>
                      </div>
                    ) : isChecking ? (
                      countdown > 0 ? (
                        <div className="flex h-9 w-40 items-center justify-center rounded border border-[#D9D9D9] bg-[#FF4444] max-md:h-8 max-md:w-20">
                          <Text className="font-neueMachinaBold text-xl text-black max-md:text-sm">{countdown}s</Text>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleCheckMission(item?.id)}
                          className="h-9 w-40 !border-[#D9D9D9] !bg-[#FFCB3D] max-md:h-8 max-md:w-20"
                        >
                          <Text className="font-neueMachinaBold text-xl text-black max-md:text-sm">Retry</Text>
                        </Button>
                      )
                    ) : (
                      <Button
                        onClick={() => handleCheckMission(item?.id)}
                        className="bg-start h-9 w-40 max-md:h-8  max-md:w-20"
                      >
                        <Text className="font-neueMachinaBold text-xl text-black max-md:text-sm">Start</Text>
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <Text className="text-2xl max-md:text-base">Complete all quests</Text>
          <Text className="max-md:text-sm">Quests will reset at 0:00 UTC</Text>
        </div>
      </div>
      {/* spinning */}
      <div
        className={cn(
          "mt-16 !rounded-b-none px-14 py-10",
          "rounded-[38px] bg-[linear-gradient(182deg,rgba(17,55,103,0.20)_-16.39%,rgba(0,102,255,0.20)_71.93%)] bg-fixed shadow-[0_4px_4px_0_rgba(163,163,163,0.25)_inset,0_4px_6.5px_0_rgba(0,0,0,0.25)] backdrop-blur-sm",
        )}
      >
        <div className={cn("flex justify-center")}>
          <Text className="text-4xl">SPIN TO WIN</Text>
        </div>

        <div className="mt-20">
          <SpinWheel />
        </div>

        <div className="font-neueMachinaBold mt-16 flex items-center justify-center gap-2 text-2xl">
          <Text>Spin count: {userBalance?.spin || 0}</Text>
          <Text>|</Text>
          <Text onClick={() => setOpenSpinHistoryModal(true)} className="hover:text-info-500 cursor-pointer underline">
            Spin history
          </Text>
        </div>
        <div className="mt-28 flex items-center gap-9">
          {socials.map((item, index) => {
            return (
              <div key={index}>
                <img className="h-20 w-20 cursor-pointer hover:scale-105 active:scale-95" src={item.image} alt="" />
              </div>
            )
          })}
        </div>
      </div>

      <Modal
        className="custom-modal relative"
        width={500}
        open={openSpinHistoryModal}
        onClose={() => setOpenSpinHistoryModal(false)}
        footer={null}
        closeIcon={null}
      >
        <img onClick={() => setOpenSpinHistoryModal(false)} src="/images/close.png" className="absolute hover:scale-105 cursor-pointer active:scale-95 h-12 w-12 -right-4 -top-4 z-30" alt="" />
        <div className="gradient-card">
          <div className="gradient-card-content relative p-4">
            <img src="/images/reward-his-grid.png" className="absolute inset-0 h-full w-full translate-y-3" alt="" />
            <div className="">
              <Text className="font-neueMachinaBold text-center text-2xl">Spin history</Text>
              <div className="max-h-80 w-full overflow-y-auto px-2">
                <table
                  className="font-neueMachinaBold relative mx-auto w-full max-w-[500px] border-separate text-xl text-white"
                  style={{ borderSpacing: 0 }}
                >
                  <thead>
                    <tr>
                      <th className="w-3/4 py-2 text-left text-base">Date</th>
                      <th className="w-0 py-2 text-center text-base" style={{ width: 40 }}>
                        |
                      </th>
                      <th className="w-1/4 py-2 text-right text-base">Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spinHistory?.map((row: any, idx: number) => (
                      <tr key={idx} className="border-b border-white/60 last:border-0">
                        <td className="py-3 text-left text-base">
                          {moment(row?.created_time).format("YYYY-MM-DD HH:mm:ss")}
                        </td>
                        <td className="py-3 text-center text-base font-bold">|</td>
                        <td className="py-3 text-right text-base">{formatNumber(+row?.reward)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>
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
