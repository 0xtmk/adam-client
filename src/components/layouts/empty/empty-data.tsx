import { FC } from "react"

interface EmptyDataProps {}

export const EmptyData: FC<EmptyDataProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img srcSet="/images/empty.png 2x" />
      <div className="font-medium text-stone-950">No Data</div>
    </div>
  )
}
