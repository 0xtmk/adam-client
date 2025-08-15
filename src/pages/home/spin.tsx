import { Service } from "@/services/app.service"
import { formatNumber } from "@/utils/number"
import { FC, useState } from "react"
import { Wheel } from "react-custom-roulette"
import useSWR from "swr"

interface SpinReward {
  id: number
  name: string
  type: number
  amount: string
}

export const Spin: FC = () => {
  const { data: rewardList } = useSWR(["get-spin-reward"], async () => {
    const response = await Service.spin.getListReward()
    return response
  })

  console.log("🚀 ~ Spin ~ rewardList:", rewardList)

  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [result, setResult] = useState<SpinReward | null>(null)
  const [spinning, setSpinning] = useState(false)

  const data = rewardList?.map((item: SpinReward) => ({
    option: `${formatNumber(Number(item.amount || 0))} ${item.name}`,
  }))

  console.log("🚀 ~ Spin ~ data:", data)

  const handleSpin = async () => {
    if (spinning || !rewardList) return
    setSpinning(true)
    try {
      const spinRes = await Service.spin.spinWheel()
      console.log("🚀 ~ handleSpin ~ spinRes:", spinRes)
      // Nếu API trả về reward_id thì dùng reward_id, nếu trả về id thì dùng id
      const rewardId = spinRes.reward_id ?? spinRes.id
      const idx = rewardList.findIndex((r: SpinReward) => r.id === rewardId)
      setPrizeNumber(idx >= 0 ? idx : 0)
      setMustSpin(true)
      setResult(null)
    } catch (e) {
      setSpinning(false)
    }
  }

  const handleStopSpinning = () => {
    setMustSpin(false)
    if (rewardList && typeof prizeNumber === "number") {
      setResult(rewardList[prizeNumber])
    }
    setSpinning(false)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {rewardList && (
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data || []}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
          onStopSpinning={handleStopSpinning}
        />
      )}
      <button className="spin-btn mt-6 px-8 py-2" onClick={handleSpin} disabled={spinning || !rewardList}>
        {spinning ? "Spinning..." : "Spin"}
      </button>
      {result && (
        <div className="mt-4 text-xl font-bold">
          You won: {formatNumber(Number(result.amount))} {result.name}
        </div>
      )}
    </div>
  )
}
