import { HOST } from "@/configs/host.config"
import { useUserStore } from "@/hooks/stores/use-user-store"
import useUserInfo from "@/hooks/use-user-balance"
import { Text } from "@/libs/ui/text"
import { Service } from "@/services/app.service"
import { cn } from "@/utils/classnames"
import { openLinkInNewTab } from "@/utils/common"
import { toastContent } from "@/utils/toast"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { confetti } from "tsparticles-confetti"
import { ModalCongrats } from "../components/modal-congras"
import PrimaryButton from "../components/primary-btn"

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

const count = 200
const defaults = { origin: { y: 0.7 } }

function fire(particleRatio: number, opts: any) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    }),
  )
}

function runConfetti() {
  fire(0.25, { spread: 26, startVelocity: 55 })
  fire(0.2, { spread: 60 })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
  fire(0.1, { spread: 120, startVelocity: 45 })
}

const SpinWheel: React.FC<{ refreshSpinHistory?: any }> = ({ refreshSpinHistory }) => {
  const [spinning, setSpinning] = useState(false)
  const [angle, setAngle] = useState(0)
  const [resultIdx, setResultIdx] = useState<number | null>(null)

  const animRef = useRef<number | null>(null)
  const { userInfo } = useUserStore()
  const { mutateUserBalance, userBalance } = useUserInfo()

  const itemResult = useMemo(() => {
    if (resultIdx === null) return null
    return rewards[resultIdx]
  }, [resultIdx])

  useEffect(() => {
    if (resultIdx !== null) {
      runConfetti()
    }
  }, [resultIdx])

  const handleSpin = async () => {
    if (+userBalance?.spin < 1) {
      toastContent({
        type: "error",
        message: "You don't have enough spins left.",
      })
      return
    }
    if (spinning) return
    setSpinning(true)
    const response = await Service.spin.spinWheel()
    if (!response) return
    mutateUserBalance()
    const rewardIdx = rewards.findIndex((reward) => reward.id === response?.id)

    const minRounds = 3
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

    const duration = 3500
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
      className={cn("active:scale-95", userBalance?.spin === 0 && "grayscale")}
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
          </svg>
          {renderSpinButton()}
        </div>
      </div>

      <ModalCongrats open={Boolean(resultIdx !== null)} onCancel={() => setResultIdx(null)} width={580}>
        <img
          onClick={() => setResultIdx(null)}
          src="/icons/close.png"
          className="absolute -right-10 top-0 z-20 h-8 w-8 cursor-pointer hover:scale-105 active:scale-95"
          alt=""
        />
        <div className="flex flex-col items-center space-y-[60px]">
          <div className="relative">
            <img
              src={`/images/tokens/${itemResult?.name.toLowerCase()}.png`}
              className="relative z-10 h-[200px] w-[200px]"
              alt=""
            />
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
              className="font-neueMachinaBold text-center text-[40px] leading-[48px]"
            >
              Congratulations!
            </Text>
            <Text className="text-center text-2xl">You won</Text>
            <Text className="font-neueMachinaBold text-center text-[40px] leading-[48px]">
              {itemResult?.amount} {itemResult?.name}
            </Text>
          </div>
          <PrimaryButton
            onClick={() => {
              if (!resultIdx) return
              const context = `Wait... I just won ${rewards[resultIdx]?.amount} ${rewards[resultIdx]?.name} on @AdamGives_com 😱
Your turn: ${HOST}?ref_code=${userInfo?.referral_code}`
              const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(context)}`

              openLinkInNewTab(tweetUrl)
            }}
            childClassName="w-[229px]"
          >
            <Text>Share to earn 10 points</Text>
          </PrimaryButton>
        </div>
      </ModalCongrats>
    </>
  )
}

export default SpinWheel
