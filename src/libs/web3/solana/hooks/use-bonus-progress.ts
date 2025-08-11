import { useEffect, useRef, useState } from "react"
import { NumberUtils } from "./../../../number-utils"

export const useBonusProgress = ({
  enabled = false,
  maxPercent = 9,
  isLoadedSuccess = false,
}: {
  maxPercent?: number
  isLoadedSuccess?: boolean
  enabled?: boolean
}) => {
  const [bonusProgress, setBonusProgress] = useState(0)

  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!enabled) {
      clearInterval(timerRef.current)
      setBonusProgress(0)
      return
    }

    timerRef.current = setInterval(() => {
      setBonusProgress((prevProgress) => {
        const result = prevProgress + NumberUtils.randomIntFromInterval(0, 1) / maxPercent / 2

        if (result >= Number(`${maxPercent.toFixed(0)}.99`)) {
          clearInterval(timerRef.current)
          return Number(`${maxPercent.toFixed(0)}.99`)
        }

        return result
      })
    }, 100)
  }, [enabled, maxPercent])

  useEffect(() => {
    if (isLoadedSuccess) {
      clearInterval(timerRef.current)
      setBonusProgress(0)
    } else {
      setBonusProgress(0)
    }
  }, [isLoadedSuccess])

  return {
    bonusProgress,
  }
}
