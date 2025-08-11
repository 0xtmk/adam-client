import { FormatNumber } from "@/libs/ui/format-number"
import { FC } from "react"

interface FormatNumberExampleProps {}

export const FormatNumberExample: FC<FormatNumberExampleProps> = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="">Small number</span>
        <FormatNumber value={"0.00000001123123"} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="">e Number</span>
        <FormatNumber value={1e-8} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="">Compact number:</span>
        <FormatNumber value={123123123.12312312} maximumFractionDigits={2} compact />
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="">Maximum fraction digits:</span>
        <FormatNumber value={"123123.0092479274923"} maximumFractionDigits={10} />
      </div>
    </div>
  )
}
