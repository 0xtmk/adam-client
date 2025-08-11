import { ToastComponent, ToastComponentProps } from "@/libs/ui/toast-component"
import { ToastOptions, toast } from "react-toastify"
import { cn } from "./classnames"

export const toastContent = ({ message, type, title, hash }: ToastComponentProps, options?: ToastOptions) => {
  return toast(<ToastComponent type={type} message={message} title={title} hash={hash} />, {
    closeButton: true,
    hideProgressBar: false,
    className: cn("bg-toast-custom"),
    ...options,
    autoClose: type === "loading" ? false : options?.autoClose,
  })
}
