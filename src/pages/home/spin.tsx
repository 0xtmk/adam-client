import { toastContent } from "@/utils/toast"
import React, { useRef, useState } from "react"

interface SpinReward {
  id: number
  name: string
  type: number
  amount: string
}

const rewards: (SpinReward & { icon?: string })[] = [
  { id: 1, name: "POINT", type: 1, amount: "10" },
  { id: 2, name: "USDT", type: 2, amount: "5" },

  { id: 3, name: "POINT", type: 1, amount: "5" },
  { id: 4, name: "USDT", type: 2, amount: "50" },

  { id: 5, name: "POINT", type: 1, amount: "15" },
  { id: 6, name: "USDT", type: 2, amount: "10" },

  { id: 7, name: "POINT", type: 1, amount: "10" },
  { id: 8, name: "USDT", type: 2, amount: "5" },
]

const WHEEL_SIZE = 600
const CENTER = WHEEL_SIZE / 2
const SEGMENTS = rewards.length

function getRandomOffsetPerSegment() {
  // Offset nhỏ quanh giữa segment (±10% chiều rộng segment)
  return (Math.random() - 0.5) * (360 / SEGMENTS) * 0.1
}

const SpinWheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false)
  const [angle, setAngle] = useState(0)
  const [resultIdx, setResultIdx] = useState<number | null>(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null)
  const animRef = useRef<number | null>(null)

  const handleSpin = async () => {
    if (spinning) return
    setSpinning(true)

    const rewardIdx = Math.floor(Math.random() * SEGMENTS)
    const minRounds = 3
    const maxRounds = 6
    const rounds = Math.floor(Math.random() * (maxRounds - minRounds + 1)) + minRounds

    // Đảm bảo luôn quay ít nhất minRounds vòng từ góc hiện tại
    const segmentAngle = 360 / SEGMENTS
    // Lấy segmentOffsetAngle từ UI nếu có, hoặc mặc định 0
    let segmentOffsetAngle = 10.5
    if (typeof window !== "undefined" && (window as any).segmentOffsetAngle !== undefined) {
      segmentOffsetAngle = (window as any).segmentOffsetAngle
    }
    // Tính targetAngle để pointer trỏ đúng giữa vùng rewardIdx
    const offset = getRandomOffsetPerSegment()
    // Tính góc đích cho đúng giữa vùng rewardIdx
    const baseTargetAngle = 360 - (rewardIdx % SEGMENTS) * segmentAngle + offset - segmentOffsetAngle
    // Tìm số vòng cần thiết để đảm bảo quay đủ minRounds từ góc hiện tại
    const minTargetAngle = angle + 360 * minRounds
    let targetAngle = baseTargetAngle
    while (targetAngle < minTargetAngle) {
      targetAngle += 360
    }
    setHighlightIdx(rewardIdx)

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
        toastContent({
          type: "success",
          message: `You won ${rewards[rewardIdx].amount} ${rewards[rewardIdx].name}!`,
        })
        setCurrentIdx(rewardIdx)
        setHighlightIdx(null)
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
        left: CENTER - 32,
        top: -8,
        width: 64,
        height: 64,
        zIndex: 2,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  )

  const renderOuterBorder = () => (
    <image href="/images/spin-wheel.png" x={0} y={0} width={WHEEL_SIZE} height={WHEEL_SIZE} />
  )

  const renderIconsAndTexts = () => {
    const r = CENTER - 70
    const anglePer = 360 / SEGMENTS
    const arcR = CENTER - 30
    const arcW = 44
    // Góc offset để căn chỉnh segment SVG trùng với ảnh spin-wheel
    const segmentOffsetAngle = 10.5 // thử với 22.5 độ cho 8 segment, chỉnh lại nếu cần
    const pastelColors = [
      "#ffd6e0", // hồng nhạt
      "#ffe5b4", // cam nhạt
      "#fff9b1", // vàng nhạt
      "#d4f8e8", // xanh mint
      "#b5ead7", // xanh lá nhạt
      "#c7ceea", // tím nhạt
      "#f3c6ff", // tím hồng nhạt
      "#bde0fe", // xanh dương nhạt
    ]
    return rewards.map((reward, i) => {
      // Vẽ arc highlight cho tất cả các segment, mỗi cái 1 màu
      const startAngle = i * anglePer + segmentOffsetAngle
      const endAngle = (i + 1) * anglePer + segmentOffsetAngle
      const x1 = CENTER + arcR * Math.cos((Math.PI * startAngle) / 180)
      const y1 = CENTER + arcR * Math.sin((Math.PI * startAngle) / 180)
      const x2 = CENTER + arcR * Math.cos((Math.PI * endAngle) / 180)
      const y2 = CENTER + arcR * Math.sin((Math.PI * endAngle) / 180)
      const largeArc = anglePer > 180 ? 1 : 0
      const d = `M${CENTER},${CENTER} L${x1},${y1} A${arcR},${arcR} 0 ${largeArc} 1 ${x2},${y2} Z`
      const fillColor = pastelColors[i % pastelColors.length]
      const highlight = <path d={d} fill={fillColor} stroke="#fff" strokeWidth={2} />
      return (
        <g key={i} transform={`rotate(${i * anglePer + segmentOffsetAngle} ${CENTER} ${CENTER})`}>
          {/* {highlight} */}
          {reward.icon && (
            <g transform={`rotate(${-i * anglePer - segmentOffsetAngle} ${CENTER} ${CENTER - r})`}>
              <image href={reward.icon} x={CENTER - 22} y={CENTER - r - 22} width={44} height={44} />
            </g>
          )}
          <g transform={`rotate(${-i * anglePer - segmentOffsetAngle} ${CENTER} ${CENTER - r})`}>
            <text
              x={CENTER}
              y={CENTER - r + 38}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={22}
              fontWeight="bold"
              fill="#333"
            >
              {reward.amount + " " + reward.name}
            </text>
          </g>
        </g>
      )
    })
  }

  const renderSpinButton = () => (
    <img
      src="/images/spin-button.png"
      alt="spin-button"
      width={108}
      height={108}
      onClick={handleSpin}
      style={{
        position: "absolute",
        left: CENTER - 54,
        top: CENTER - 54,
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
    </>
  )
}

export default SpinWheel
