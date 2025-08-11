import { FC } from "react"
import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle, AiOutlineLoading } from "react-icons/ai"

import { cn } from "@/utils/classnames"
export interface ToastComponentProps {
  message: string
  type: "success" | "error" | "info" | "loading"
  title?: string
  hash?: string
}

const toastIcon = {
  success: <AiFillCheckCircle className="h-10 w-10 text-success-500" />,
  info: <AiFillInfoCircle className="h-10 w-10 text-4xl text-sky-500" />,
  error: <AiFillCloseCircle className="h-10 w-10 text-error-500" />,
  loading: <AiOutlineLoading className="text-primary-500 h-10 w-10 animate-spin" />,
}

export const ToastComponent: FC<ToastComponentProps> = ({ title, message, type, hash }) => {
  const _title = title || type

  return (
    <div className="flex items-center gap-3">
      {toastIcon[type]}
      <div className="space-y-1">
        <p className={cn("text-lg font-medium capitalize leading-none text-black")}>{_title}</p>
        <p className="text-sm text-stone-900 text-neueMachinaBold">{message}</p>
      </div>
      {/* <p
        className={cn(
          " absolute bottom-0 left-0 top-0 h-full w-2",
          type === "success" && "bg-success-500",
          type === "error" && "bg-error-500",
          type === "info" && "bg-sky-500",
          type === "loading" && "",
        )}
      ></p> */}
    </div>
  )
}
