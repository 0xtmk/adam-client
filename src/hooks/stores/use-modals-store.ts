import { storagePrefix } from "@/configs/storage.config"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface ModalsStoreProps {}

export const useModalsStore = create<ModalsStoreProps>()(
  devtools(
    (set) => {
      return {}
    },
    { name: storagePrefix, store: "modal" },
  ),
)
