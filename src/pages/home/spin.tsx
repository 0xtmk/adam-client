import { HOST } from "@/configs/host.config"
import { useUserStore } from "@/hooks/stores/use-user-store"
import useUserInfo from "@/hooks/use-user-balance"
import { Text } from "@/libs/ui/text"
import { Service } from "@/services/app.service"
import { openLinkInNewTab } from "@/utils/common"
import { Modal } from "antd"
import React, { useRef, useState } from "react"

interface SpinReward {
  id: number
  name: string
  type: number
  amount: string
}

const rewards: (SpinReward & { icon?: string })[] = [
  { id: 4, name: "USDC", type: 2, amount: "5" },
  { id: 1, name: "POINTS", type: 1, amount: "5" },
  { id: 6, name: "USDC", type: 2, amount: "50" },
  { id: 2, name: "POINTS", type: 1, amount: "10" },
  { id: 5, name: "USDC", type: 2, amount: "10" },
  { id: 3, name: "POINTS", type: 1, amount: "15" },
]

const WHEEL_SIZE = 530
const CENTER = WHEEL_SIZE / 2
const SEGMENTS = rewards.length

function getRandomOffsetPerSegment() {
  return (Math.random() - 0.5) * (360 / SEGMENTS) * 0.1
}

const SpinWheel: React.FC<{ refreshSpinHistory?: any }> = ({ refreshSpinHistory }) => {
  const [spinning, setSpinning] = useState(false)
  const [angle, setAngle] = useState(0)
  const [resultIdx, setResultIdx] = useState<number | null>(null)
  const animRef = useRef<number | null>(null)
  const { userInfo } = useUserStore()

  const { mutateUserBalance } = useUserInfo()

  const handleSpin = async () => {
    if (spinning) return
    setSpinning(true)
    const response = await Service.spin.spinWheel()
    if (!response) return
    mutateUserBalance()
    const rewardIdx = rewards.findIndex((reward) => reward.id === response?.id)

    const minRounds = 3
    // const maxRounds = 6
    // const rounds = Math.floor(Math.random() * (maxRounds - minRounds + 1)) + minRounds
    const segmentAngle = 360 / SEGMENTS
    let segmentOffsetAngle = 15
    if (typeof window !== "undefined" && (window as any).segmentOffsetAngle !== undefined) {
      segmentOffsetAngle = (window as any).segmentOffsetAngle
    }
    const offset = getRandomOffsetPerSegment()
    const baseTargetAngle = 360 - (rewardIdx % SEGMENTS) * segmentAngle + offset - segmentOffsetAngle
    const minTargetAngle = angle + 360 * minRounds
    let targetAngle = baseTargetAngle
    while (targetAngle < minTargetAngle) {
      targetAngle += 360
    }

    const duration = 3500 // ms
    const start = performance.now()

    const from = angle
    let to = targetAngle
    while (to < from) {
      to += 360
    }

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setAngle(from + (to - from) * ease)
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        setSpinning(false)
        setResultIdx(rewardIdx)
        refreshSpinHistory()
        // toastContent({
        //   type: "success",
        //   message: `You won ${rewards[rewardIdx].amount} ${rewards[rewardIdx].name}!`,
        // })
        // setCurrentIdx(rewardIdx)
      }
    }
    animRef.current = requestAnimationFrame(animate)
  }

  const renderPointer = () => (
    <img
      src="/images/spin-pointer.png"
      alt="pointer"
      style={{
        position: "absolute",
        left: CENTER - 48,
        top: -8,
        width: 106,
        height: 94,
        zIndex: 2,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  )

  const renderOuterBorder = () => (
    <image href="/images/spin-wheel.png" x={0} y={0} width={WHEEL_SIZE} height={WHEEL_SIZE} />
  )

  const renderSpinButton = () => (
    <img
      src="/images/spin-button.png"
      alt="spin-button"
      width={150}
      height={150}
      onClick={handleSpin}
      style={{
        position: "absolute",
        left: CENTER - 75,
        top: CENTER - 75,
        zIndex: 3,
        cursor: "pointer",
        userSelect: "none",
      }}
      draggable={false}
    />
  )

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ position: "relative", width: WHEEL_SIZE, height: WHEEL_SIZE }}>
          {renderPointer()}
          <svg
            width={WHEEL_SIZE}
            height={WHEEL_SIZE}
            style={{ transform: `rotate(${angle}deg)`, transition: spinning ? undefined : "transform 0.2s" }}
          >
            {renderOuterBorder()}
            {/* {renderIconsAndTexts()} */}
          </svg>
          {renderSpinButton()}
        </div>
      </div>

      <Modal
        className="custom-modal relative"
        width={500}
        open={Boolean(resultIdx !== null)}
        onClose={() => setResultIdx(null)}
        footer={null}
        closeIcon={false}
      >
        {/* <img
          src="/images/light-1.png"
          className="absolute z-30 left-1/2 -translate-x-1/2 translate-y-[-420px] h-[50svh]"
          alt=""
        />
        <img
          src="/images/light-2.png"
          className="absolute z-30 left-1/2 -translate-x-1/2 -bottom-full h-[50svh]"
          alt=""
        /> */}
        <img
          onClick={() => setResultIdx(null)}
          src="/images/close.png"
          className="absolute -right-4 -top-4 z-30 h-12 w-12 cursor-pointer hover:scale-105 active:scale-95"
          alt=""
        />
        <div className="gradient-card">
          <div className="gradient-card-content relative overflow-hidden p-4">
            <img src="/images/reward-his-grid.png" className="absolute inset-0 h-full w-full translate-y-3" alt="" />
            <div className="relative">
              <Text className="font-neueMachinaBold text-center text-2xl">Congratulations!</Text>
              <Text className="mt-4 text-center text-lg">You Won</Text>
              <div className="mt-2">
                {resultIdx !== null && (
                  <div className="flex items-center justify-center gap-2">
                    <Text className="text-5xl font-bold">{rewards[resultIdx]?.amount}</Text>
                    <img
                      src={`/images/tokens/${rewards[resultIdx]?.name.toLowerCase()}.png`}
                      alt={rewards[resultIdx]?.name}
                      className="h-10 w-10"
                    />
                  </div>
                )}
              </div>
              <div className="mt-2 flex justify-center">
                <img src="/images/adam-circle.png" className="h-20 w-20" alt="" />
              </div>

              <Text
                onClick={() => {
                  if (!resultIdx) return
                  const context = `Wait... I just won ${rewards[resultIdx]?.amount} ${rewards[resultIdx]?.name} on @AdamGives_com 😱
Your turn: ${HOST}?ref_code=${userInfo?.referral_code}`
                  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(context)}`

                  openLinkInNewTab(tweetUrl)
                }}
                className="mt-4 cursor-pointer text-center hover:underline"
              >
                Share to earn 10 points
              </Text>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default SpinWheel
