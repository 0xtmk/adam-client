import { useModalsStore } from "@/hooks/stores/use-modals-store"
import { FC } from "react"

interface GlobalModalProps {}

export const GlobalModal: FC<GlobalModalProps> = () => {
  const modalsStore = useModalsStore()
  return <div className="global-modal"></div>
}
