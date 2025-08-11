import { cn } from "@/utils/classnames"
import { Tooltip } from "antd"
import { FC, useMemo } from "react"
import { NumberUtils } from "../number-utils"

interface FormatNumberProps {
  value?: number | string
  maximumFractionDigits?: number
  compact?: boolean
  className?: string
  enableTitle?: boolean
  enableTooltip?: boolean
}

export const FormatNumber: FC<FormatNumberProps> = ({
  value = 0,
  className,
  maximumFractionDigits = 6,
  enableTitle = true,
  compact = false,
  enableTooltip = true,
}) => {
  const formattedValue = useMemo(() => {
    if (Number(value) < 1 && Number(value).toString().includes("e-")) {
      const [coefficient, exponent] = Number(value).toExponential().split("e")

      const formattedExponent = parseInt(exponent, 10)

      if (formattedExponent >= 0) {
        return value.toString()
      }

      const decimalPlaces = Math.abs(formattedExponent)

      return (
        <span
          className={cn("", className)}
          title={enableTitle && !enableTooltip ? NumberUtils.exactValue(value) : undefined}
        >
          0.0
          <span
            className="relative top-[0.2em] inline-block text-[0.8em]"
            style={{
              paddingInlineStart: "0.2em",
              paddingInlineEnd: "0.2em",
            }}
          >
            {decimalPlaces}
          </span>
          {coefficient.replace(".", "").slice(0, maximumFractionDigits)}
        </span>
      )
    }
    return (
      <span
        className={cn("", className)}
        title={enableTitle && !enableTooltip ? NumberUtils.exactValue(value) : undefined}
      >
        {NumberUtils.format(value, maximumFractionDigits, compact)}
      </span>
    )
  }, [className, compact, enableTitle, enableTooltip, maximumFractionDigits, value])

  if (enableTooltip) {
    return <Tooltip title={NumberUtils.exactValue(value)}>{formattedValue}</Tooltip>
  }

  return <>{formattedValue}</>
}
