import { Container } from "@/components/layouts/container"
import { MISSION_STATUS, MissionConfigType } from "@/constants/app"
import { useUserStore } from "@/hooks/stores/use-user-store"
import useUserBalances from "@/hooks/use-user-balance"
import { Loading } from "@/libs/ui/loading"
import { Text } from "@/libs/ui/text"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { Service } from "@/services/app.service"
import { cn } from "@/utils/classnames"
import { openLinkInNewTab } from "@/utils/common"
import { FC, useEffect, useState } from "react"
import useSWR from "swr"
import { ModalAboutPoints } from "../components/modal-about-points"
import { ModalCongrats } from "../components/modal-congras"
import { ModalHowToPlay } from "../components/modal-how-to-play"
import { ModalIntroAdam } from "../components/modal-intro-adam"
import { ModalIntroPoints } from "../components/modal-intro-points"
import { ModalSpinHistory } from "../components/modal-spin-history"
import PrimaryButton from "../components/primary-btn"
import SpinWheel from "./spin"
import SquareRain from "./square-rain"
import { Button } from "@/libs/ui/button"

export const HomeNewPage: FC<any> = () => {
  const { userInfo, token } = useUserStore()
  const { address, connectWallet } = useSolanaWallet()
  const { userBalance, mutateUserBalance } = useUserBalances()

  const [missionCheckingList, setMissionCheckingList] = useState<number[]>([])
  const [missionCountdowns, setMissionCountdowns] = useState<{ [id: number]: number }>({})
  const [missionDone, setMissionDone] = useState<{ [id: number]: boolean }>({})
  const [openSpinHistory, setOpenSpinHistory] = useState(false)
  const [openModalCongrats, setOpenModalCongrats] = useState(false)
  const [openHowToPlay, setOpenHowToPlay] = useState(false)
  const [openAboutPoints, setOpenAboutPoints] = useState(false)
  const [openIntroAdam, setOpenIntroAdam] = useState(false)
  const [openIntroPoints, setOpenIntroPoints] = useState(false)

  const { data: missionList, isLoading: gettingMissionList } = useSWR(["get-mission-list", token], async () => {
    const res = await Service.mission.getListMissions()
    return res
  })

  const { data: missionStreak, mutate: refreshMissionStreak } = useSWR(["get-mission-streak", token], async () => {
    const res = await Service.mission.getMissionStreak()
    return res
  })

  const {
    data: spinHistory,
    isLoading: gettingSpinHistory,
    mutate: refreshSpinHistory,
  } = useSWR(["get-spin-history", token], async () => {
    const response = await Service.spin.getHistory()
    return response.data
  })

  const handleConnectX = async () => {
    try {
      const res = await Service.common.getTwitterUrl()
      if (res) {
        window.open(res, "_self")
      }
    } catch (error) {
      console.error("Error connecting:", error)
    }
  }

  const handleCheckMission = async (missionId: number, missionType?: MissionConfigType) => {
    if (!address) {
      connectWallet()
      return
    }

    if (!userInfo?.twitter_id && missionType === MissionConfigType.X) {
      handleConnectX()
      return
    }

    const res = await Service.mission.checkMission(missionId)
    if (res?.url) {
      setMissionCheckingList((prev) => [...prev, missionId])
      setMissionCountdowns((prev) => ({ ...prev, [missionId]: 10 }))
      openLinkInNewTab(res?.url)
    }

    if (res?.status === true) {
      setMissionDone((prev) => ({ ...prev, [missionId]: true }))
      if (res?.mission_success === res?.mission_config_in_day) {
        setOpenModalCongrats(true)
        refreshMissionStreak()
        mutateUserBalance()
      }
    }
  }

  const missionNode = () => {
    if (gettingMissionList)
      return (
        <div className="mt-4 flex justify-center">
          <Loading className="h-10 w-10" />
        </div>
      )

    return (
      <div className="mt-6 space-y-6 max-xl:space-y-3">
        {missionList?.map((item, index) => {
          const isChecking = missionCheckingList.includes(item?.id)
          const countdown = missionCountdowns[item?.id] || 0
          const isDone = missionDone[item?.id] || item?.user_status === MISSION_STATUS.DONE

          return (
            <div
              className={cn(
                "flex items-center justify-between rounded-[32px] bg-[#1B2547] p-5 backdrop-blur-[2px] transition-all hover:bg-[#111932] max-sm:p-3",
              )}
              key={index}
            >
              <div className="flex items-center gap-3">
                {item?.type === MissionConfigType.X && (
                  <img src="/icons/twitter-mission.png" className="h-8 w-8 max-sm:h-6 max-sm:w-6" alt="" />
                )}

                {item?.type === MissionConfigType.TELEGRAM && (
                  <img src="/icons/telegram-mission.png" className="h-8 w-8 max-sm:h-6 max-sm:w-6" alt="" />
                )}

                {item?.type === MissionConfigType.WEBSITE && (
                  <img src="/icons/website-mission.png" className="h-8 w-8 max-sm:h-6 max-sm:w-6" alt="" />
                )}

                {item?.type === MissionConfigType.DISCORD && (
                  <img src="/icons/discord-mission.png" className="h-8 w-8 max-sm:h-6 max-sm:w-6" alt="" />
                )}
                <Text className="text-xl max-sm:text-sm">{item.name}</Text>
              </div>
              <div>
                {isDone ? (
                  <div>
                    <img src="/icons/mission-done.png" className="h-7 w-7" alt="" />
                  </div>
                ) : isChecking ? (
                  countdown > 0 ? (
                    <PrimaryButton>
                      <Text className="font-neueMachinaBold text-base">{countdown}s</Text>
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton childClassName="w-[106px]" onClick={() => handleCheckMission(item.id, item?.type)}>
                      <div className="flex items-center gap-2">
                        <img src="/icons/retry.png" className="h-4 w-4" alt="" />
                        <Text className="font-neueMachinaBold text-base">Retry</Text>
                      </div>
                    </PrimaryButton>
                  )
                ) : (
                  <PrimaryButton
                    childClassName={cn("", (!token || !userInfo?.twitter_id) && "w-[101px]")}
                    onClick={() => handleCheckMission(item.id, item?.type)}
                  >
                    <Text className="font-neueMachinaBold text-base">
                      {!token
                        ? "Connect"
                        : !userInfo?.twitter_id && item?.type === MissionConfigType.X
                          ? "Connect"
                          : "Start"}
                    </Text>
                  </PrimaryButton>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  useEffect(() => {
    if (!Object.values(missionCountdowns).some((v) => v > 0)) return
    const interval = setInterval(() => {
      setMissionCountdowns((prev) => {
        const updated = { ...prev }
        let changed = false
        Object.keys(updated).forEach((id) => {
          const numId = Number(id)
          if (updated[numId] > 0) {
            updated[numId] = updated[numId] - 1
            changed = true
          }
        })
        return changed ? updated : prev
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [missionCountdowns])

  return (
    <div className="">
      <img src="/images/bg-blessing.png" className="absolute left-0 right-0 top-0" alt="" />
      <SquareRain />

      <Container
        size="blessing"
        className="max-retina:gap-0 relative z-30 flex gap-[90px] pt-16 max-lg:flex-col max-lg:gap-6 max-md:pt-4"
      >
        <div className="flex w-[616px] flex-col items-center justify-center max-xl:w-[500px] max-lg:order-2 max-lg:mx-auto max-md:w-[400px] max-sm:w-[350px]">
          <Text
            className="font-neueMachinaBold text-5xl max-md:text-3xl"
            style={{
              backgroundImage: "linear-gradient(92deg, #A1D5FF 5.57%, #FFF 111.38%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            SPIN TO WIN
          </Text>

          <div
            className={cn(
              "bg-fill mt-3 flex h-10 w-[175px] items-center justify-center bg-[url('/images/border-gradient.png')] bg-no-repeat hover:grayscale",
              !token && "hidden",
            )}
          >
            <Text className="font-neueMachinaBold text-base max-md:text-sm max-sm:text-xs">
              SPIN COUNT : {userBalance?.spin || 0}
            </Text>
          </div>

          <div className="relative mt-8">
            <div
              className="absolute h-[500px] w-[500px] bg-[#4B96FF] max-xl:h-[350px] max-xl:w-[350px]"
              style={{
                filter: "blur(220.12783813476562px)",
              }}
            ></div>
            <SpinWheel refreshSpinHistory={refreshSpinHistory} />
          </div>

          <div className="relative mt-8 flex items-center gap-10 max-sm:mt-4 max-sm:gap-4">
            <img
              src="/icons/pop-1.png"
              className="h-[52px] w-[52px] cursor-pointer transition-all hover:scale-105 max-sm:h-10 max-sm:w-10"
              alt=""
              onClick={() => setOpenIntroAdam(true)}
            />
            <img
              src="/icons/pop-2.png"
              className="h-[52px] w-[52px] cursor-pointer transition-all hover:scale-105 max-sm:h-10 max-sm:w-10"
              alt=""
              onClick={() => setOpenIntroPoints(true)}
            />
            <img
              onClick={() => setOpenHowToPlay(true)}
              src="/icons/pop-3.png"
              className="h-[52px] w-[52px] cursor-pointer transition-all hover:scale-105 max-sm:h-10 max-sm:w-10"
              alt=""
            />
            <img
              onClick={() => setOpenAboutPoints(true)}
              src="/icons/pop-4.png"
              className="h-[52px] w-[52px] cursor-pointer transition-all hover:scale-105 max-sm:h-10 max-sm:w-10"
              alt=""
            />
          </div>
          <Text onClick={() => setOpenSpinHistory(true)} className="mt-8 cursor-pointer text-[#40BFE5] underline">
            View spin history
          </Text>
        </div>

        <div className="bg-fill relative mt-10 h-fit flex-1 bg-[url('/images/border-mission.png')] px-8 pb-8 pt-20 max-xl:px-4 max-lg:mx-auto max-lg:max-w-[600px] max-sm:pb-6 max-sm:pt-14">
          <img
            src="/images/title-mission.png"
            className="absolute -top-10 left-1/2 -translate-x-1/2 max-sm:-top-6 max-sm:w-[70%]"
            alt=""
          />
          <Text className="text-center text-xl max-md:text-base">
            Welcome to ADAM! Spin to win, earn exciting rewards, and join a mission to make the world a better place!
          </Text>
          <div className="mx-auto mt-[30px] flex max-w-[343px] items-center justify-center gap-3">
            <Text className="text-xl max-sm:text-sm">Your streak</Text>
            <div className="relative h-7 flex-1 rounded-full bg-[#1B2547] p-1 max-sm:h-5">
              <div
                className="h-full rounded-full bg-[linear-gradient(92deg,#A1D5FF_5.57%,#3499FF_111.38%)]"
                style={{
                  width: `${(missionStreak?.streak / missionStreak?.total_streak) * 100}%`,
                }}
              ></div>
              <Text className="font-neueMachinaBold absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white max-sm:text-xs">
                {missionStreak?.streak}/{missionStreak?.total_streak}
              </Text>
              <img src="/images/chest.png" className="absolute -top-5 right-0 z-20 h-12 w-12 animate-bounce" alt="" />
            </div>
          </div>
          <div>{missionNode()}</div>
          <Text className="mt-6 text-center max-sm:mt-3 max-sm:text-sm">Quests will reset at 0:00 UTC</Text>
        </div>
      </Container>

      <ModalSpinHistory
        data={spinHistory}
        isLoading={gettingSpinHistory}
        open={openSpinHistory}
        onCancel={() => setOpenSpinHistory(false)}
        width={928}
      />

      <ModalHowToPlay width={569} open={openHowToPlay} onCancel={() => setOpenHowToPlay(false)} />
      <ModalAboutPoints width={569} open={openAboutPoints} onCancel={() => setOpenAboutPoints(false)} />
      <ModalIntroAdam width={569} open={openIntroAdam} onCancel={() => setOpenIntroAdam(false)} />
      <ModalIntroPoints width={569} open={openIntroPoints} onCancel={() => setOpenIntroPoints(false)} />

      <ModalCongrats open={openModalCongrats} onCancel={() => setOpenModalCongrats(false)} width={580}>
        <img
          onClick={() => setOpenModalCongrats(false)}
          src="/icons/close.png"
          className="absolute -right-10 top-0 z-20 h-8 w-8 cursor-pointer hover:scale-105 active:scale-95 max-md:hidden"
          alt=""
        />
        <div className="flex flex-col items-center space-y-[60px]">
          <div className="relative">
            <img src="/images/spin-modal.png" className="relative z-10 h-[200px] w-[200px]" alt="" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="animate-spin" style={{ animationDuration: "10s" }}>
                <img src="/images/congras-light.png" className="scale-[7]" alt="" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Text
              style={{
                background: "var(--Brand, linear-gradient(92deg, #A1D5FF 5.57%, #3499FF 111.38%))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="font-neueMachinaBold text-center text-[40px] max-md:text-4xl leading-[48px]"
            >
              Congratulations!
            </Text>
            <Text className="text-center text-xl max-sm:text-base">
              Congrats, you have completed all daily quests! Enjoy your Free Spin!
            </Text>

            <Button onClick={() => setOpenModalCongrats(false)} type="secondary" className={cn("w-full", "md:hidden")}>
              Close
            </Button>
          </div>
        </div>
      </ModalCongrats>
    </div>
  )
}
