import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

import { storageKeyConfigs, storageKeys, storagePrefix } from "@/configs/storage.config"
import { Service } from "@/services/app.service"
import { UserInfo } from "@/types/user.type"

export interface UserStore {
  userInfo?: UserInfo
  token?: string
  isLoggedIn?: boolean

  refreshUserInfo(): void
  reset(): void
  setUserInfo(userInfo: UserInfo): void
  setIsLoggedIn(isLoggedIn: boolean): void
  updateUserInfo(userInfo: Partial<UserInfo>): void
  setToken(token: string): void
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, get) => {
        return {
          reset() {
            set({
              userInfo: undefined,
              token: undefined,
              isLoggedIn: false,
            })
          },
          setIsLoggedIn(isLoggedIn) {
            set({ isLoggedIn })
          },

          setToken(token) {
            set({ token })
          },
          setUserInfo(userInfo) {
            set({ userInfo })
            // set({ userInfo: { ...(get().userInfo ? { ...get().userInfo, ...userInfo } : userInfo) } })
          },
          updateUserInfo(userInfo) {
            if (get().userInfo) {
              set({ userInfo: { ...get().userInfo, ...userInfo } })
            } else {
              set({ userInfo })
            }
          },
          async refreshUserInfo() {
            const userInfo = await Service.user.getUser()
            console.log("🚀 ~ refreshUserInfo ~ userInfo:", userInfo)
            set((states) => ({ ...states, userInfo }))
          },
        }
      },
      {
        name: storageKeys.user,
        partialize(state) {
          return { token: state.token, userInfo: state.userInfo }
        },
      },
    ),
    {
      name: storagePrefix,
      store: storageKeyConfigs.user,
    },
  ),
)
